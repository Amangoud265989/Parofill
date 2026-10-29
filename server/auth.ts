import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { db } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'parrofill_production_jwt_signing_secret_key_2026';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  plan: 'Free' | 'Pro' | 'Career';
  quota_used: number;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

// Simple, high-performance, secure signed JWT implementation
export function createToken(payload: { id: string; email: string; role: string }): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 30 * 24 * 60 * 60; // 30 days
  const body = Buffer.from(JSON.stringify({ ...payload, iat: now, exp })).toString('base64url');

  const signature = crypto
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');

  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): { id: string; email: string; role: string } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, body, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');

    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;

    return payload;
  } catch (err) {
    return null;
  }
}

// Authentication middleware
export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  let token = '';

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.headers['x-auth-token']) {
    token = String(req.headers['x-auth-token']);
  }

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Authentication token is required' });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }

  // Fetch fresh user record from database
  const userStmt = db.prepare('SELECT id, email, name, role, plan, quota_used, status FROM users WHERE id = ?');
  const user = userStmt.get(payload.id) as AuthUser & { status: string } | undefined;

  if (!user || user.status === 'suspended') {
    return res.status(403).json({ error: 'Account not active or suspended' });
  }

  req.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    plan: user.plan,
    quota_used: user.quota_used,
  };

  next();
}

// Optional Auth (populates req.user if token valid, continues if not)
export function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  let token = '';
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.headers['x-auth-token']) {
    token = String(req.headers['x-auth-token']);
  }

  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      const userStmt = db.prepare('SELECT id, email, name, role, plan, quota_used, status FROM users WHERE id = ?');
      const user = userStmt.get(payload.id) as AuthUser & { status: string } | undefined;
      if (user && user.status === 'active') {
        req.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          plan: user.plan,
          quota_used: user.quota_used,
        };
      }
    }
  }
  next();
}

// Admin only middleware
export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admin privilege required' });
  }
  next();
}

// In-memory rate limiting map for security against brute-force
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function rateLimiter(limit: number = 60, windowMs: number = 60000) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now > entry.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (entry.count >= limit) {
      return res.status(429).json({
        error: 'Too many requests. Please slow down and try again shortly.',
      });
    }

    entry.count++;
    next();
  };
}
