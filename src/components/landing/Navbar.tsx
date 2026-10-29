import React, { useState } from 'react';
import { ParrotLogo } from '../common/ParrotLogo';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Menu, X, ShieldCheck, Sparkles, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setViewMode, setIsAuthModalOpen, setAuthMode, currentUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-left focus:outline-none shrink-0"
        >
          <ParrotLogo size="md" />
        </button>

        {/* Zone 2: Navigation Links (single line, no pill badges) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => scrollTo('how-it-works')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('autofill-demo')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>Live Demo</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </button>
          <button
            onClick={() => scrollTo('features')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
          >
            Features
          </button>
          <button
            onClick={() => scrollTo('extension')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
          >
            Extension
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollTo('security')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
          >
            Security
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {currentUser ? (
            <button
              onClick={() => setViewMode('dashboard')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Go to App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-3.5 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors shadow-sm shadow-emerald-600/20 whitespace-nowrap shrink-0"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setViewMode('dashboard')}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-md"
          >
            Launch App
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollTo('how-it-works')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-emerald-600"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('autofill-demo')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-emerald-600"
          >
            Live Autofill Demo
          </button>
          <button
            onClick={() => scrollTo('features')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-emerald-600"
          >
            AI Features
          </button>
          <button
            onClick={() => scrollTo('extension')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-emerald-600"
          >
            Browser Extension
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-emerald-600"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollTo('security')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-emerald-600"
          >
            Trust & Security
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-emerald-600"
          >
            FAQ
          </button>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setViewMode('dashboard');
              }}
              className="w-full text-center py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg"
            >
              Open Dashboard
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setViewMode('admin');
              }}
              className="w-full text-center py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Admin Console View
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
