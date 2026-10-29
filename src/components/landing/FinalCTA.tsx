import React from 'react';
import { useApp } from '../../context/AppContext';
import { ParrotLogo } from '../common/ParrotLogo';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const { setIsAuthModalOpen, setAuthMode, setViewMode } = useApp();

  return (
    <section className="relative overflow-hidden py-20 lg:py-28 bg-slate-950 text-white text-center">
      {/* Decorative emerald gradient sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="inline-flex items-center justify-center mb-2">
          <ParrotLogo size="lg" showWordmark={false} animated />
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white text-balance leading-tight">
          Stop Repeating.{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
            Start ParroFilling.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto text-balance leading-relaxed">
          Join thousands of professionals, graduates, and career changers worldwide who save 15+ hours a week and submit better, personalized job applications.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setAuthMode('signup');
              setIsAuthModalOpen(true);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/25 active:scale-[0.99] whitespace-nowrap shrink-0"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setViewMode('dashboard')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors whitespace-nowrap shrink-0"
          >
            <span>Explore App Live Demo</span>
          </button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Free starter plan included</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Takes under 2 minutes to set up</span>
          </div>
        </div>
      </div>
    </section>
  );
};
