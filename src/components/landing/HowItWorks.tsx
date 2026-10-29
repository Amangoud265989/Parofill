import React from 'react';
import { UserCheck, Search, Wand2, Send, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { setViewMode } = useApp();

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Add your resume, work experience, education, skills, certifications, and links once. ParroFill stores them in your private, secure vault.',
      icon: UserCheck,
      details: ['One reusable career master record', 'Universal international formatting', 'Supports multiple specialized resumes'],
    },
    {
      number: '02',
      title: 'Find a Job',
      description: 'Search for jobs across global markets using ParroFill or open any application form on Greenhouse, Workday, Lever, LinkedIn, or company career portals.',
      icon: Search,
      details: ['Real-time skill match calculation', 'Salary & remote filter insights', 'Works directly in your desktop browser'],
    },
    {
      number: '03',
      title: 'Let ParroFill Assist',
      description: 'ParroFill automatically detects application form fields and intelligently uses your saved information to populate them in seconds.',
      icon: Wand2,
      details: ['Detects personal, work, and link fields', 'Synthesizes custom question answers with AI', 'Tailors resume bullet points to the job description'],
    },
    {
      number: '04',
      title: 'Review & Apply',
      description: 'Review every auto-completed field, make edits if you wish, and submit the application yourself. You always stay in 100% control.',
      icon: Send,
      details: ['Zero blind submissions or hidden bots', 'Edit any AI suggestion before sending', 'Automatically logged in your Kanban tracker'],
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50/70 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Four Simple Steps
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            How ParroFill Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed text-balance">
            Applying to 50 jobs shouldn't mean typing your work history 50 times. ParroFill eliminates the manual friction while keeping you in the driver's seat.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-emerald-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-emerald-600/40">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-1.5">
                  {step.details.map((item, i) => (
                    <div key={i} className="text-[11px] text-slate-500 flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* User Control Commitment Callout */}
        <div className="mt-12 bg-white rounded-xl p-6 border border-slate-200/90 shadow-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-slate-900">
              Our Safety Promise: You Are Always in Control
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
              ParroFill never submits applications without your explicit review and confirmation. We never invent fake job titles, companies, or degrees.
            </p>
          </div>
          <button
            onClick={() => setViewMode('dashboard')}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
          >
            Try in Dashboard
          </button>
        </div>
      </div>
    </section>
  );
};
