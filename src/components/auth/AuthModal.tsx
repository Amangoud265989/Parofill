import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ParrotLogo } from '../common/ParrotLogo';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authMode, setAuthMode, setCurrentUser, setViewMode, showNotification } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      if (authMode === 'forgot') {
        setForgotSent(true);
        showNotification('Password reset link sent to your email.');
        return;
      }

      const userName = name.trim() || (email ? email.split('@')[0] : 'Elena Rostova');
      setCurrentUser({
        name: userName,
        email: email || 'elena.rostova@example.com',
        role: 'user',
        plan: 'Pro',
      });

      setIsAuthModalOpen(false);
      setViewMode('dashboard');
      showNotification(`Welcome to ParroFill, ${userName}!`);
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentUser({
        name: 'Elena Rostova',
        email: 'elena.rostova@example.com',
        role: 'user',
        plan: 'Pro',
      });
      setIsAuthModalOpen(false);
      setViewMode('dashboard');
      showNotification('Signed in securely with Google.');
    }, 500);
  };

  const handleAdminQuickSwitch = () => {
    setCurrentUser({
      name: 'System Administrator',
      email: 'admin@parrofill.io',
      role: 'admin',
      plan: 'Career',
    });
    setIsAuthModalOpen(false);
    setViewMode('admin');
    showNotification('Switched to ParroFill Admin Dashboard.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-0 flex items-center justify-between">
          <ParrotLogo size="sm" />
          <button
            onClick={() => {
              setIsAuthModalOpen(false);
              setForgotSent(false);
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-slate-900">
              {authMode === 'login' && 'Sign in to ParroFill'}
              {authMode === 'signup' && 'Create your free account'}
              {authMode === 'forgot' && 'Reset your password'}
            </h3>
            <p className="text-xs text-slate-500">
              {authMode === 'login' && 'Access your resumes, autofill vault, and applications'}
              {authMode === 'signup' && 'Start autofilling job applications in under 2 minutes'}
              {authMode === 'forgot' && 'Enter your email to receive a secure recovery link'}
            </p>
          </div>

          {/* 1-Click Google Login Button */}
          {authMode !== 'forgot' && (
            <button
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2.5 text-xs font-bold text-slate-700 shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          )}

          {authMode !== 'forgot' && (
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-slate-200" />
              <span className="absolute bg-white px-3 text-[11px] text-slate-400 uppercase tracking-wider">
                Or with email
              </span>
            </div>
          )}

          {/* Form */}
          {forgotSent ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="text-xs font-bold text-slate-900">Check Your Inbox</div>
              <p className="text-[11px] text-slate-600">
                We sent password reset instructions to <strong>{email || 'your email'}</strong>.
              </p>
              <button
                onClick={() => {
                  setForgotSent(false);
                  setAuthMode('login');
                }}
                className="text-xs text-emerald-700 font-bold hover:underline pt-2 block mx-auto"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {authMode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">Password</label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-[11px] text-emerald-700 font-medium hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 flex items-center justify-center gap-1.5 mt-2"
              >
                <span>
                  {isSubmitting
                    ? 'Processing...'
                    : authMode === 'login'
                    ? 'Sign In'
                    : authMode === 'signup'
                    ? 'Create Free Account'
                    : 'Send Reset Link'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Switch Modes */}
          <div className="pt-2 text-center text-xs text-slate-500">
            {authMode === 'login' ? (
              <span>
                Don't have an account?{' '}
                <button
                  onClick={() => setAuthMode('signup')}
                  className="font-bold text-emerald-700 hover:underline"
                >
                  Sign up free
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="font-bold text-emerald-700 hover:underline"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>

          {/* Quick Demo Admin Switcher for review */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Demo Testing:</span>
            <button
              onClick={handleAdminQuickSwitch}
              className="text-slate-600 hover:text-emerald-700 font-semibold underline"
            >
              Sign in as Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
