import React from 'react';
import { Clock, CheckCheck, Globe2, ShieldCheck } from 'lucide-react';

export const ProofStats: React.FC = () => {
  const supportedPortals = [
    'Workday',
    'Greenhouse',
    'Lever',
    'Ashby',
    'LinkedIn',
    'Indeed',
    'BambooHR',
    'SmartRecruiters',
    'Taleo',
  ];

  return (
    <section className="py-12 border-y border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Metric Strips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pb-10 border-b border-slate-100 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
              4.2<span className="text-emerald-600 font-sans">x</span>
            </div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
              Faster Application Velocity
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Verified across 10,000+ candidate submissions
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
              100<span className="text-emerald-600 font-sans">%</span>
            </div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
              User Review Control
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Zero automated blind submissions
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
              35<span className="text-emerald-600 font-sans">+</span>
            </div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
              ATS Platforms Supported
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Greenhouse, Workday, Lever, Ashby, etc.
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
              60<span className="text-emerald-600 font-sans">+</span>
            </div>
            <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
              Countries & Currencies
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Tailored for worldwide remote applicants
            </div>
          </div>
        </div>

        {/* Supported Portals Bar */}
        <div className="pt-8">
          <div className="text-center text-xs font-semibold tracking-wide text-slate-600 uppercase mb-5">
            Works smoothly across all major applicant tracking platforms
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {supportedPortals.map((portal) => (
              <div
                key={portal}
                className="px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700"
              >
                {portal}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
