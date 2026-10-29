import React, { useState, useEffect } from 'react';
import { ParrotLogo, ParrotAssistantAvatar } from '../common/ParrotLogo';
import { useApp } from '../../context/AppContext';
import { ArrowRight, CheckCircle2, Sparkles, Shield, Play, RotateCcw, ExternalLink } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setViewMode, setIsAuthModalOpen, setAuthMode } = useApp();

  // Animated autofill sequence simulation for the Hero graphic
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 2400);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/50">
      {/* Subtle organic ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-200/20 via-teal-100/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Quiet unboxed kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-800 bg-emerald-50/80 px-3 py-1 rounded-md border border-emerald-200/60">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Next-Generation Career Automation</span>
              <span aria-hidden="true" className="text-emerald-300">·</span>
              <span>100% User Control</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 text-balance leading-[1.12]">
              Apply to Jobs Faster with{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                AI
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed text-balance max-w-xl mx-auto lg:mx-0">
              ParroFill remembers your information, fills applications automatically, and helps you create better applications in less time.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setIsAuthModalOpen(true);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/25 active:scale-[0.99] whitespace-nowrap shrink-0"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm whitespace-nowrap shrink-0"
              >
                <Play className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                <span>See How It Works</span>
              </button>
            </div>

            {/* Quiet human proof markers */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero fabricated credentials</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>You approve every field before submit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Works on 35+ global job portals</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Animated Application Simulator */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative background glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-sky-500/20 rounded-2xl blur-lg opacity-70" />

              {/* Main Simulated Browser Window */}
              <div className="relative bg-white rounded-xl shadow-xl border border-slate-200/90 overflow-hidden">
                {/* Browser Top Chrome */}
                <div className="px-4 py-3 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>

                  <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-md border border-slate-200 text-slate-600 font-mono text-[11px] max-w-[240px] sm:max-w-xs truncate">
                    <span className="text-emerald-600 font-bold">🔒</span>
                    <span className="truncate">workday.apply.io/careers/senior-frontend</span>
                  </div>

                  {/* ParroFill Extension Active Badge */}
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-200">
                    <ParrotLogo size="sm" showWordmark={false} className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">ParroFill Active</span>
                  </div>
                </div>

                {/* Application Form Body */}
                <div className="p-5 sm:p-6 space-y-4 bg-slate-50/50">
                  {/* Job Header */}
                  <div className="flex items-start justify-between pb-3 border-b border-slate-200">
                    <div>
                      <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Acme Corp Careers</div>
                      <h3 className="text-base font-bold text-slate-900">Senior Frontend Engineer</h3>
                      <div className="text-xs text-slate-500">Toronto, ON (Remote) · $160k - $185k</div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-2 py-0.5 text-[11px] font-medium text-emerald-700 bg-emerald-100 rounded">
                        {step === 0 && 'Detecting Form...'}
                        {step === 1 && 'Filling Bio Data...'}
                        {step === 2 && 'Matching Skills...'}
                        {step === 3 && 'Synthesizing Answer...'}
                        {step >= 4 && 'Ready for Review!'}
                      </span>
                    </div>
                  </div>

                  {/* Form Fields being populated live */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Full Legal Name</label>
                        <div className={`p-2 text-xs rounded border transition-all duration-300 ${
                          step >= 1
                            ? 'bg-emerald-50/50 border-emerald-400 text-slate-900 font-medium'
                            : 'bg-white border-slate-200 text-slate-400'
                        }`}>
                          {step >= 1 ? 'Elena Rostova' : 'Detecting field...'}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Email Address</label>
                        <div className={`p-2 text-xs rounded border transition-all duration-300 ${
                          step >= 1
                            ? 'bg-emerald-50/50 border-emerald-400 text-slate-900 font-medium'
                            : 'bg-white border-slate-200 text-slate-400'
                        }`}>
                          {step >= 1 ? 'elena.rostova@example.com' : '...'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">Primary Resume</label>
                        <div className={`p-2 text-xs rounded border transition-all duration-300 flex items-center justify-between ${
                          step >= 2
                            ? 'bg-emerald-50/50 border-emerald-400 text-slate-900 font-medium'
                            : 'bg-white border-slate-200 text-slate-400'
                        }`}>
                          <span className="truncate">{step >= 2 ? 'Elena_Rostova_Senior_2026.pdf' : 'Attach resume'}</span>
                          {step >= 2 && <span className="text-[10px] text-emerald-700 font-bold shrink-0">94% ATS</span>}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-600 mb-1">LinkedIn Profile</label>
                        <div className={`p-2 text-xs rounded border transition-all duration-300 ${
                          step >= 2
                            ? 'bg-emerald-50/50 border-emerald-400 text-slate-900 font-medium'
                            : 'bg-white border-slate-200 text-slate-400'
                        }`}>
                          {step >= 2 ? 'linkedin.com/in/elena-rostova' : '...'}
                        </div>
                      </div>
                    </div>

                    {/* AI Application Question */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-medium text-slate-700">
                          Why are you a great fit for this team?
                        </label>
                        {step >= 3 && (
                          <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> ParroFill AI Suggested
                          </span>
                        )}
                      </div>

                      <div className={`p-2.5 text-xs rounded-lg border transition-all duration-500 min-h-[64px] ${
                        step >= 3
                          ? 'bg-white border-emerald-500 shadow-sm text-slate-800'
                          : 'bg-slate-100/70 border-slate-200 text-slate-400 italic'
                      }`}>
                        {step >= 3 ? (
                          <p className="leading-relaxed">
                            "With 6+ years specializing in high-performance React architectures and component systems, I have delivered 44% load-time improvements at scale. I am energized by Acme Corp's focus on accessible developer tooling and would love to hit the ground running."
                          </p>
                        ) : (
                          <span>ParroFill analyzing candidate experience to draft response...</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ParroFill Smart Control Bar inside application */}
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ParrotAssistantAvatar size={28} isThinking={step < 4} />
                      <div className="text-[11px]">
                        <span className="font-semibold text-slate-900">
                          {step >= 4 ? 'Autofill complete! Ready to review.' : 'ParroFill Assistant working...'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setStep(0)}
                        title="Replay animation"
                        className="p-1.5 text-slate-400 hover:text-slate-700 rounded transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setViewMode('dashboard')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          step >= 4
                            ? 'bg-emerald-600 text-white shadow hover:bg-emerald-500'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {step >= 4 ? 'Review & Submit' : 'Autofilling (14/14)'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Context Pill */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-slate-900 text-white p-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700/80 text-xs">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <div className="font-semibold text-white">4.2x Faster Applications</div>
                  <div className="text-[11px] text-slate-400">Average candidate saves 22 minutes per form</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
