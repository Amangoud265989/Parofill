import React, { useState } from 'react';
import { ShieldCheck, Lock, UserCheck, Trash2, Download, EyeOff, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SecurityTrustSection: React.FC = () => {
  const { showNotification } = useApp();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const pillars = [
    {
      icon: UserCheck,
      title: '100% User Submission Control',
      description:
        'ParroFill is an intelligent assistant, not a blind crawler bot. You review and approve every filled field before sending an application.',
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption in Transit',
      description:
        'All candidate profile records, resumes, and communications are encrypted using industry-standard TLS 1.3 and stored in secure data vaults.',
    },
    {
      icon: EyeOff,
      title: 'No Sale of Candidate Data',
      description:
        'We never sell your resume or personal contact details to third-party data brokers or marketing lists. Your profile belongs exclusively to you.',
    },
    {
      icon: Trash2,
      title: 'Total Data Deletion & Export',
      description:
        'Export your entire career profile as clean JSON or PDF at any time. One-click account purge permanently erases all stored data from our systems.',
    },
  ];

  return (
    <section id="security" className="py-20 lg:py-28 bg-white border-b border-slate-200/80 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Trust & Data Governance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            Your Career Data Stays Secure and Private
          </h2>

          <p className="text-base text-slate-600 text-balance">
            Job applications contain your most sensitive professional and personal information. We treat security as a foundational architecture requirement.
          </p>
        </div>

        {/* 4 Security Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Responsible AI Notice Box */}
        <div className="mt-12 max-w-3xl mx-auto p-5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">
              Responsible AI Standard: No Fabrications
            </h4>
            <p className="text-xs text-slate-600">
              ParroFill's AI prompts strictly prohibit inventing non-existent degrees, employers, or certifications. AI answers are grounded in your true experience.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => showNotification('Data export initiated. Profile downloaded as JSON archive.')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Data</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
