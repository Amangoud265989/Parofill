import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ParrotLogo, ParrotAssistantAvatar } from '../common/ParrotLogo';
import { Wand2, CheckCircle2, RotateCcw, Sparkles, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export const AutofillDemo: React.FC = () => {
  const { profile, setViewMode } = useApp();

  const [activeJobTemplate, setActiveJobTemplate] = useState<'frontend' | 'product' | 'data'>('frontend');
  const [isFilling, setIsFilling] = useState(false);
  const [filledFields, setFilledFields] = useState<Record<string, string>>({});
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  const jobTemplates = {
    frontend: {
      company: 'Vercel',
      title: 'Senior Frontend Developer',
      location: 'Remote (Worldwide)',
      salary: '$150k - $180k USD',
      question: 'Why are you interested in building developer tooling at Vercel?',
      suggestedAnswer:
        "I've spent 6+ years refining developer workflows and building resilient design systems. Vercel's mission of making the Web SDK faster and more intuitive aligns directly with my engineering values.",
    },
    product: {
      company: 'Notion',
      title: 'Product Growth Specialist',
      location: 'San Francisco / Remote',
      salary: '$140k - $165k USD',
      question: 'Tell us about a time you optimized an onboarding flow that drove activation.',
      suggestedAnswer:
        'At my previous company, I led the checkout simplification initiative that eliminated 3 redundant form steps, increasing trial-to-paid conversions by 28% across 45,000 international accounts.',
    },
    data: {
      company: 'Datadog',
      title: 'Analytics Engineer',
      location: 'New York / Hybrid',
      salary: '$145k - $170k USD',
      question: 'How do you approach data modeling and stakeholder dashboards under tight delivery timelines?',
      suggestedAnswer:
        'I prioritize modular dbt models with automated schema validation. By building reusable metrics layers and clear documentation, I maintain high data trust while accelerating reporting cycles.',
    },
  };

  const currentJob = jobTemplates[activeJobTemplate];

  const handleRunAutofill = () => {
    setIsFilling(true);
    setShowReviewSuccess(false);
    setFilledFields({});

    // Step-by-step fill simulation
    setTimeout(() => {
      setFilledFields((prev) => ({
        ...prev,
        firstName: profile.firstName,
        lastName: profile.lastName,
      }));
    }, 300);

    setTimeout(() => {
      setFilledFields((prev) => ({
        ...prev,
        email: profile.email,
        phone: profile.phone,
      }));
    }, 700);

    setTimeout(() => {
      setFilledFields((prev) => ({
        ...prev,
        location: `${profile.city}, ${profile.country}`,
        linkedin: profile.linkedInUrl,
        portfolio: profile.portfolioUrl,
        resume: 'Elena_Rostova_Senior_Engineer_2026.pdf',
      }));
    }, 1100);

    setTimeout(() => {
      setFilledFields((prev) => ({
        ...prev,
        customAnswer: currentJob.suggestedAnswer,
      }));
      setIsFilling(false);
      setShowReviewSuccess(true);
    }, 1600);
  };

  const handleReset = () => {
    setFilledFields({});
    setShowReviewSuccess(false);
    setIsFilling(false);
  };

  return (
    <section id="autofill-demo" className="py-20 bg-white border-b border-slate-200/80 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            Try ParroFill Autofill Live
          </h2>
          <p className="text-sm sm:text-base text-slate-600 text-balance">
            Select a target company form below and click "Autofill with ParroFill" to see how our AI detects fields, loads your profile, and drafts tailored answers.
          </p>

          {/* Job Template Selector */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {(['frontend', 'product', 'data'] as const).map((role) => (
              <button
                key={role}
                onClick={() => {
                  setActiveJobTemplate(role);
                  handleReset();
                }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeJobTemplate === role
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {role === 'frontend' && 'Vercel (Engineering)'}
                {role === 'product' && 'Notion (Growth)'}
                {role === 'data' && 'Datadog (Analytics)'}
              </button>
            ))}
          </div>
        </div>

        {/* The Sandbox Card */}
        <div className="max-w-4xl mx-auto bg-slate-50/80 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* Header bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {currentJob.company} Job Portal
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-500 font-mono">{currentJob.location}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {currentJob.title}
              </h3>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleReset}
                disabled={isFilling || Object.keys(filledFields).length === 0}
                className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 disabled:opacity-40 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={handleRunAutofill}
                disabled={isFilling}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 rounded-xl transition-all shadow-sm shadow-emerald-600/20 whitespace-nowrap shrink-0"
              >
                {isFilling ? (
                  <>
                    <ParrotAssistantAvatar size={18} isThinking />
                    <span>Detecting & Filling...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Autofill with ParroFill</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Form Fields Simulation */}
          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  readOnly
                  placeholder="e.g. Elena"
                  value={filledFields.firstName || ''}
                  className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors ${
                    filledFields.firstName
                      ? 'bg-emerald-50/40 border-emerald-400 font-medium text-slate-900'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Last Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  readOnly
                  placeholder="e.g. Rostova"
                  value={filledFields.lastName || ''}
                  className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors ${
                    filledFields.lastName
                      ? 'bg-emerald-50/40 border-emerald-400 font-medium text-slate-900'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  readOnly
                  placeholder="e.g. candidate@domain.com"
                  value={filledFields.email || ''}
                  className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors ${
                    filledFields.email
                      ? 'bg-emerald-50/40 border-emerald-400 font-medium text-slate-900'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number (International format supported)
                </label>
                <input
                  type="text"
                  readOnly
                  placeholder="+1 (555) 000-0000"
                  value={filledFields.phone || ''}
                  className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors ${
                    filledFields.phone
                      ? 'bg-emerald-50/40 border-emerald-400 font-medium text-slate-900'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Current Location</label>
                <input
                  type="text"
                  readOnly
                  placeholder="City, Country"
                  value={filledFields.location || ''}
                  className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors ${
                    filledFields.location
                      ? 'bg-emerald-50/40 border-emerald-400 font-medium text-slate-900'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
                <input
                  type="text"
                  readOnly
                  placeholder="linkedin.com/in/..."
                  value={filledFields.linkedin || ''}
                  className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors ${
                    filledFields.linkedin
                      ? 'bg-emerald-50/40 border-emerald-400 font-medium text-slate-900'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Resume File</label>
                <div
                  className={`px-3 py-2 text-xs rounded-lg border flex items-center justify-between ${
                    filledFields.resume
                      ? 'bg-emerald-50/40 border-emerald-400 font-medium text-slate-900'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  <span className="truncate">{filledFields.resume || 'No resume attached'}</span>
                  {filledFields.resume && <FileText className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />}
                </div>
              </div>
            </div>

            {/* AI Synthesized Question Field */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-800">
                  Application Question: {currentJob.question}
                </label>
                {filledFields.customAnswer && (
                  <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    Generated from your profile
                  </span>
                )}
              </div>
              <textarea
                rows={3}
                readOnly
                placeholder="Click Autofill to generate personalized answer..."
                value={filledFields.customAnswer || ''}
                className={`w-full p-3 text-xs rounded-lg border transition-colors leading-relaxed ${
                  filledFields.customAnswer
                    ? 'bg-white border-emerald-500 shadow-sm text-slate-800'
                    : 'bg-slate-100/70 border-slate-200 text-slate-400'
                }`}
              />
            </div>
          </div>

          {/* Review banner when finished */}
          {showReviewSuccess && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    ParroFill finished the repetitive work. You're ready to review.
                  </div>
                  <div className="text-[11px] text-slate-600">
                    8 fields populated and personalized. You can make adjustments before submitting.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setViewMode('dashboard')}
                className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <span>Open Full App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
