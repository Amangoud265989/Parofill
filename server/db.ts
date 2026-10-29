import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Ensure data directory exists
const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = process.env.DATABASE_FILE || path.join(dataDir, 'parrofill.sqlite');
export const db = new DatabaseSync(dbPath);

// Enable WAL mode for high concurrency
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Initialize database schema
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      plan TEXT NOT NULL DEFAULT 'Free',
      quota_used INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'active',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS profiles (
      user_id TEXT PRIMARY KEY,
      data_json TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS resumes (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      target_role TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_size TEXT NOT NULL,
      summary TEXT NOT NULL,
      skills_json TEXT NOT NULL DEFAULT '[]',
      is_default INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS applications (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      company TEXT NOT NULL,
      position TEXT NOT NULL,
      location TEXT NOT NULL DEFAULT 'Remote',
      is_remote INTEGER NOT NULL DEFAULT 1,
      salary TEXT,
      job_url TEXT,
      stage TEXT NOT NULL DEFAULT 'applied',
      date_applied TEXT NOT NULL,
      resume_used_id TEXT,
      notes TEXT DEFAULT '',
      interview_date TEXT,
      contact_person TEXT,
      match_score INTEGER NOT NULL DEFAULT 85,
      created_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS cover_letters (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      company TEXT NOT NULL,
      job_title TEXT NOT NULL,
      tone TEXT NOT NULL DEFAULT 'Professional',
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS extension_tokens (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      last_used_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS pricing_plans (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      monthly_price INTEGER NOT NULL,
      annual_price INTEGER NOT NULL,
      popular INTEGER NOT NULL DEFAULT 0,
      features_json TEXT NOT NULL,
      cta_label TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      actor TEXT NOT NULL,
      event TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'info',
      timestamp TEXT NOT NULL
    );
  `);

  seedInitialData();
}

// Password hashing using Node.js native crypto scrypt
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, actualSalt, 64).toString('hex');
  return { hash, salt: actualSalt };
}

export function verifyPassword(password: string, salt: string, storedHash: string): boolean {
  try {
    const { hash } = hashPassword(password, salt);
    const hashBuf = Buffer.from(hash, 'hex');
    const storedBuf = Buffer.from(storedHash, 'hex');
    if (hashBuf.length !== storedBuf.length) {
      return false;
    }
    return crypto.timingSafeEqual(hashBuf, storedBuf);
  } catch {
    return false;
  }
}

// Seed initial default plans and demo candidate
function seedInitialData() {
  // 1. Seed Pricing Plans if table is empty
  const planCountStmt = db.prepare('SELECT COUNT(*) as count FROM pricing_plans');
  const planResult = planCountStmt.get() as { count: number };

  if (planResult.count === 0) {
    const insertPlan = db.prepare(`
      INSERT INTO pricing_plans (id, name, description, monthly_price, annual_price, popular, features_json, cta_label)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertPlan.run(
      'plan-free',
      'Free Starter',
      'Essential AI assistance for casual job hunters.',
      0,
      0,
      0,
      JSON.stringify([
        'Up to 15 AI autofill applications / month',
        '1 Reusable Smart Profile',
        'Store up to 2 Resumes',
        'Basic AI Application Assistant (20 questions / mo)',
        'Kanban Application Tracker (up to 20 jobs)',
        'Desktop Browser Extension access',
        '100% User Review & submission control',
      ]),
      'Get Started Free'
    );

    insertPlan.run(
      'plan-pro',
      'Pro Job Hunter',
      'For active applicants seeking accelerated interviews.',
      19,
      15,
      1,
      JSON.stringify([
        'Unlimited AI Autofill applications',
        'Full Browser Extension integration (Workday, Greenhouse, Lever, etc.)',
        'Unlimited AI Resume Tailoring with ATS Match Scores',
        'Unlimited AI Cover Letter generation & tone adjustments',
        'Intelligent 24/7 ParroFill AI Career Assistant',
        'Global Job Search with instant compatibility match',
        'Unlimited Kanban Application Tracker & export',
        'Priority field detection & updates',
      ]),
      'Start Pro Free Trial'
    );

    insertPlan.run(
      'plan-career',
      'Career Accelerator',
      'Maximum velocity for career transitions and international applicants.',
      49,
      39,
      0,
      JSON.stringify([
        'Everything in Pro, plus:',
        'Multi-Country Visa & Global Work Authorization helpers',
        'Multi-currency compensation benchmarking',
        'Multi-language profile exports',
        'Executive interview preparation simulation with AI',
        'Automated follow-up draft generator',
        'Direct priority support channel',
      ]),
      'Elevate My Career'
    );
  }

  // 2. Seed Default Demo User & Admin if not present
  const checkUserStmt = db.prepare('SELECT id FROM users WHERE email = ?');
  const demoUser = checkUserStmt.get('amangoud@example.com');

  if (!demoUser) {
    const demoId = 'usr-demo-aman';
    const { hash, salt } = hashPassword('password123');

    const insertUser = db.prepare(`
      INSERT INTO users (id, email, password_hash, salt, name, role, plan, quota_used, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertUser.run(
      demoId,
      'amangoud@example.com',
      hash,
      salt,
      'Aman Goud',
      'user',
      'Pro',
      42,
      'active',
      new Date().toISOString()
    );

    // Profile JSON
    const profileJson = JSON.stringify({
      firstName: 'Aman',
      lastName: 'Goud',
      email: 'amangoud@example.com',
      phone: '+1 (555) 234-5678',
      headline: 'Senior Full-Stack & Frontend Engineer',
      summary: 'Product-minded software engineer with 6+ years building scalable, user-centric web applications and distributed interfaces. Strong advocate for accessible design systems, resilient web performance, and collaborative agile engineering.',
      city: 'Toronto',
      country: 'Canada',
      postalCode: 'M5V 2T6',
      preferredCurrency: 'USD',
      dateFormat: 'YYYY-MM-DD',
      workAuthorization: 'Authorized to work in Canada and United States (TN eligible)',
      linkedInUrl: 'https://linkedin.com/in/amangoud',
      githubUrl: 'https://github.com/amangoud',
      portfolioUrl: 'https://amangoud.dev',
      personalWebsiteUrl: 'https://notes.amangoud.dev',
      experiences: [
        {
          id: 'exp-1',
          company: 'AuraCloud Labs',
          title: 'Senior Frontend Engineer',
          location: 'Remote / Toronto',
          startDate: '2023-01',
          endDate: '',
          isCurrent: true,
          highlights: [
            'Spearheaded redesign of core workflow console, improving client-side page load by 44% and reducing churn by 18%.',
            'Implemented enterprise-grade design system in TypeScript and Tailwind, adopted across 6 cross-functional engineering pods.',
            'Mentored 4 junior engineers and conducted technical interviews for candidate evaluations.'
          ]
        },
        {
          id: 'exp-2',
          company: 'Veloce Commerce',
          title: 'Frontend Software Engineer',
          location: 'Vancouver, Canada',
          startDate: '2020-06',
          endDate: '2022-12',
          isCurrent: false,
          highlights: [
            'Built real-time multi-currency checkout experience supporting over $12M in monthly transaction volume.',
            'Engineered responsive web apps ensuring 100% WCAG AA accessibility compliance.',
            'Collaborated with product designers to prototype 14 new feature variations in rapid A/B testing cycles.'
          ]
        }
      ],
      education: [
        {
          id: 'edu-1',
          institution: 'University of Waterloo',
          degree: 'Bachelor of Science (B.Sc.)',
          fieldOfStudy: 'Computer Science & Software Systems',
          startYear: '2016',
          endYear: '2020',
          gradeOrGpa: '3.85 / 4.0'
        }
      ],
      skills: [
        { id: 'sk-1', name: 'TypeScript', category: 'technical', level: 'Expert' },
        { id: 'sk-2', name: 'React & Next.js', category: 'technical', level: 'Expert' },
        { id: 'sk-3', name: 'Node.js & Express', category: 'technical', level: 'Advanced' },
        { id: 'sk-4', name: 'Tailwind CSS', category: 'technical', level: 'Expert' },
        { id: 'sk-5', name: 'System Architecture', category: 'technical', level: 'Advanced' },
        { id: 'sk-6', name: 'REST & GraphQL APIs', category: 'technical', level: 'Advanced' },
        { id: 'sk-7', name: 'Design Systems & Figma', category: 'design', level: 'Advanced' },
        { id: 'sk-8', name: 'Agile & Team Mentorship', category: 'management', level: 'Advanced' }
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'AWS Certified Solutions Architect - Associate',
          issuer: 'Amazon Web Services',
          issueDate: '2023-04',
          credentialUrl: 'https://aws.amazon.com/verification'
        }
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'HyperGrid UI Library',
          description: 'High-performance virtualized data grid for React handling 100k+ rows with smooth 60fps scrolling.',
          technologies: ['TypeScript', 'React', 'CSS Subgrid', 'Jest'],
          link: 'https://github.com/amangoud/hypergrid-ui'
        }
      ],
      languages: [
        { id: 'lang-1', language: 'English', proficiency: 'Native' },
        { id: 'lang-2', language: 'French', proficiency: 'Conversational' }
      ]
    });

    const insertProfile = db.prepare(`
      INSERT INTO profiles (user_id, data_json, updated_at) VALUES (?, ?, ?)
    `);
    insertProfile.run(demoId, profileJson, new Date().toISOString());

    // Resumes
    const insertResume = db.prepare(`
      INSERT INTO resumes (id, user_id, title, target_role, file_name, file_size, summary, skills_json, is_default, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertResume.run(
      'res-1',
      demoId,
      'Senior Software Engineer (General)',
      'Senior Frontend / Full-Stack Engineer',
      'Aman_Goud_Senior_Engineer_2026.pdf',
      '142 KB',
      'Focuses on scalable web engineering, design systems, TypeScript, and high-velocity frontend architecture.',
      JSON.stringify(['TypeScript', 'React', 'Node.js', 'Tailwind', 'Performance Optimization', 'Architecture']),
      1,
      '2026-10-15'
    );

    insertResume.run(
      'res-2',
      demoId,
      'Frontend Product Specialist',
      'Staff / Lead Product Engineer',
      'Aman_Goud_Product_Engineer.pdf',
      '138 KB',
      'Highlights A/B experimentation, UX collaboration, rapid prototyping, and checkout conversion growth.',
      JSON.stringify(['React', 'Experimentation', 'Design Systems', 'Checkout Workflows', 'Accessibility', 'Analytics']),
      0,
      '2026-09-28'
    );

    // Initial Applications
    const insertApp = db.prepare(`
      INSERT INTO applications (id, user_id, company, position, location, is_remote, salary, job_url, stage, date_applied, resume_used_id, notes, interview_date, contact_person, match_score, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertApp.run(
      'app-1',
      demoId,
      'Linear',
      'Senior Frontend Engineer',
      'Remote (Global)',
      1,
      '$165,000 - $190,000 USD',
      'https://linear.app/careers/senior-frontend',
      'interview',
      '2026-10-18',
      'res-1',
      'Completed system design interview. Technical team praised speed and clear communication.',
      '2026-11-03 14:00 EST',
      'Sarah Jenkins (Engineering Manager)',
      92,
      new Date().toISOString()
    );

    insertApp.run(
      'app-2',
      demoId,
      'Stripe',
      'Product Engineer - Billing UI',
      'Seattle, WA / Remote',
      1,
      '$180,000 - $210,000 USD',
      'https://stripe.com/jobs/product-engineer',
      'screening',
      '2026-10-22',
      'res-1',
      'Autofilled 18 fields via ParroFill extension. Recruiter phone chat scheduled.',
      null,
      'David Miller (Talent Lead)',
      88,
      new Date().toISOString()
    );

    insertApp.run(
      'app-3',
      demoId,
      'Figma',
      'Staff Design Technologist',
      'San Francisco, CA (Hybrid)',
      0,
      '$195,000 - $230,000 USD',
      'https://figma.com/careers/staff-technologist',
      'offer',
      '2026-09-30',
      'res-2',
      'Offer letter received! Reviewing equity package and remote flexibility options.',
      null,
      'Maya Lin (Director of Design Systems)',
      96,
      new Date().toISOString()
    );

    insertApp.run(
      'app-4',
      demoId,
      'Notion',
      'Frontend Systems Engineer',
      'Remote (US & Canada)',
      1,
      '$160,000 - $185,000 USD',
      'https://notion.so/careers',
      'applied',
      '2026-10-25',
      'res-1',
      'Applied with AI-tailored cover letter emphasizing component performance.',
      null,
      'Recruiting Team',
      84,
      new Date().toISOString()
    );

    insertApp.run(
      'app-5',
      demoId,
      'Vercel',
      'Developer Experience Engineer',
      'Remote (Worldwide)',
      1,
      '$150,000 - $180,000 USD',
      'https://vercel.com/careers',
      'saved',
      '2026-10-26',
      'res-1',
      'Need to tailor resume for Next.js app router specifics before submitting.',
      null,
      'DX Hiring Lead',
      89,
      new Date().toISOString()
    );

    insertApp.run(
      'app-6',
      demoId,
      'Datadog',
      'Full Stack Engineer - APM',
      'New York, NY',
      0,
      '$155,000 - $175,000 USD',
      'https://datadoghq.com/careers',
      'rejected',
      '2026-09-12',
      'res-1',
      'Position closed internally. Reached out for constructive feedback.',
      null,
      'Staff Recruiter',
      78,
      new Date().toISOString()
    );

    // Initial Cover Letter
    const insertCL = db.prepare(`
      INSERT INTO cover_letters (id, user_id, company, job_title, tone, content, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertCL.run(
      'cl-1',
      demoId,
      'Linear',
      'Senior Frontend Engineer',
      'Confident',
      `Dear Hiring Team at Linear,\n\nI have followed Linear's engineering philosophy for years—particularly your insistence on keyboard-first velocity, sub-100ms interactions, and thoughtful design systems. As a Senior Frontend Engineer with 6+ years building high-frequency web products, I would love to bring my technical craftsmanship to your product pod.\n\nIn my recent role at AuraCloud Labs, I led the core web architecture modernization, cutting Largest Contentful Paint by 44% and developing a strict component system now shared across six squads. I care deeply about the details: predictable state machines, flawless accessibility, and pixel-precise execution.\n\nI look forward to discussing how my experience can support your mission to build the fastest software on the planet.\n\nSincerely,\nAman Goud`,
      '2026-10-18'
    );

    // Extension Token for 1-click sync
    const insertToken = db.prepare(`
      INSERT INTO extension_tokens (token, user_id, created_at, last_used_at)
      VALUES (?, ?, ?, ?)
    `);
    insertToken.run('parro_sync_aman_2026', demoId, new Date().toISOString(), new Date().toISOString());

    // Audit Log
    const insertLog = db.prepare(`
      INSERT INTO audit_logs (id, actor, event, status, timestamp)
      VALUES (?, ?, ?, ?, ?)
    `);
    insertLog.run('log-1', 'Aman Goud', 'Database initialized and profile loaded', 'success', new Date().toISOString());
  }

  // Also seed Administrator
  const adminUser = checkUserStmt.get('admin@parrofill.io');
  if (!adminUser) {
    const adminId = 'usr-admin-system';
    const { hash, salt } = hashPassword('admin123');
    const insertUser = db.prepare(`
      INSERT INTO users (id, email, password_hash, salt, name, role, plan, quota_used, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertUser.run(
      adminId,
      'admin@parrofill.io',
      hash,
      salt,
      'System Administrator',
      'admin',
      'Career',
      0,
      'active',
      new Date().toISOString()
    );
  }
}
