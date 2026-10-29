import React, { useState } from 'react';
import { ParrotLogo } from '../common/ParrotLogo';
import { useApp } from '../../context/AppContext';
import { LegalModal, LegalDocType } from '../modals/LegalModal';
import { ShieldCheck, Heart, Globe2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setViewMode, setActiveTab } = useApp();
  const [legalModalType, setLegalModalType] = useState<LegalDocType | null>(null);

  const navigateToTab = (tab: any) => {
    setActiveTab(tab);
    setViewMode('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-100">
            {/* Col 1: Brand & Bio */}
            <div className="col-span-2 space-y-4">
              <ParrotLogo size="md" />
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
                Your AI assistant for applying faster. ParroFill eliminates repetitive application forms, creates tailored resumes and cover letters, and empowers candidates worldwide to focus on interview preparation.
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ISO 27001 Aligned Security</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-emerald-600" />
                  <span>Global Availability</span>
                </span>
              </div>
            </div>

            {/* Col 2: Product */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li>
                  <button onClick={() => scrollTo('features')} className="hover:text-emerald-600 transition-colors">
                    Features Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToTab('extension')} className="hover:text-emerald-600 transition-colors">
                    AI Autofill
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToTab('resumes')} className="hover:text-emerald-600 transition-colors">
                    Resume Manager
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToTab('cover-letter')} className="hover:text-emerald-600 transition-colors">
                    AI Cover Letter
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToTab('jobs')} className="hover:text-emerald-600 transition-colors">
                    Global Job Search
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToTab('applications')} className="hover:text-emerald-600 transition-colors">
                    Application Tracker
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('extension')} className="hover:text-emerald-600 transition-colors">
                    Browser Extension
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Company & Resources */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Company & Resources
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li>
                  <button onClick={() => scrollTo('how-it-works')} className="hover:text-emerald-600 transition-colors">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('pricing')} className="hover:text-emerald-600 transition-colors">
                    Pricing Plans
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollTo('faq')} className="hover:text-emerald-600 transition-colors">
                    FAQ & Help Center
                  </button>
                </li>
                <li>
                  <button onClick={() => setViewMode('admin')} className="hover:text-emerald-600 transition-colors">
                    Admin Portal (Demo)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      alert('ParroFill Careers: We are currently hiring Remote Full-Stack and AI Systems Engineers. Send your profile through ParroFill!');
                    }}
                    className="hover:text-emerald-600 transition-colors flex items-center gap-1"
                  >
                    <span>Careers</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">We're hiring</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Legal & Privacy */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
                Legal & Privacy
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li>
                  <button onClick={() => setLegalModalType('privacy')} className="hover:text-emerald-600 transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setLegalModalType('terms')} className="hover:text-emerald-600 transition-colors">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => setLegalModalType('security')} className="hover:text-emerald-600 transition-colors">
                    Security Architecture
                  </button>
                </li>
                <li>
                  <button onClick={() => setLegalModalType('cookies')} className="hover:text-emerald-600 transition-colors">
                    Cookie Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div>
              © {new Date().getFullYear()} ParroFill Inc. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <span>English (Global)</span>
              <span>·</span>
              <span>TLS 1.3 Encrypted</span>
              <span>·</span>
              <button
                onClick={() => setViewMode('dashboard')}
                className="font-semibold text-slate-800 hover:text-emerald-700"
              >
                App Dashboard
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Legal Modal */}
      <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
    </>
  );
};
