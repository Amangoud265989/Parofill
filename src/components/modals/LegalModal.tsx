import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { ParrotLogo } from '../common/ParrotLogo';

export type LegalDocType = 'privacy' | 'terms' | 'security' | 'cookies';

interface LegalModalProps {
  type: LegalDocType | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap: Record<
    LegalDocType,
    { title: string; subtitle: string; lastUpdated: string; sections: { heading: string; body: string }[] }
  > = {
    privacy: {
      title: 'Privacy Policy',
      subtitle: 'How ParroFill protects, processes, and respects your candidate data worldwide.',
      lastUpdated: 'October 2026',
      sections: [
        {
          heading: '1. Information We Collect',
          body: 'ParroFill collects information you explicitly provide: contact details, employment history, education, uploaded resumes, and custom application answers. We do not scrape your device or monitor activities outside supported job application domains.',
        },
        {
          heading: '2. How Your Data Is Utilized',
          body: 'Your data is strictly utilized to assist in autofilling application forms, generating cover letters, matching relevant jobs, and tailoring resumes. We never sell, rent, or trade your personal or career records to third-party data brokers or marketing services.',
        },
        {
          heading: '3. Data Retention and Deletion Rights',
          body: 'You retain complete ownership over your career profile. You can export your data in standard JSON or PDF format at any time. When you request account deletion, all personal data, uploaded resumes, and application logs are permanently expunged within 24 hours.',
        },
        {
          heading: '4. International Data Transfers (GDPR & CCPA)',
          body: 'ParroFill adheres to standard contractual clauses for transatlantic data transfers, fulfilling European General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA) standards.',
        },
      ],
    },
    terms: {
      title: 'Terms of Service',
      subtitle: 'Clear rules and agreements for using the ParroFill platform and browser extensions.',
      lastUpdated: 'October 2026',
      sections: [
        {
          heading: '1. Human-in-the-Loop Agreement',
          body: 'ParroFill provides intelligent automation to reduce repetitive data entry. Users agree and acknowledge that all final applications are reviewed and submitted by the user. ParroFill does not assume liability for employment decisions made by hiring companies.',
        },
        {
          heading: '2. Prohibited Conduct',
          body: 'Users agree not to input fraudulent certifications, counterfeit licenses, or knowingly deceptive employment histories. Using ParroFill to spam job postings with automated non-reviewed submissions violates our fair-use policy.',
        },
        {
          heading: '3. Subscription, Cancellation & Refunds',
          body: 'Subscriptions renew automatically according to the selected monthly or annual cadence. You may cancel at any time from your Billing dashboard. We offer a full 14-day money-back guarantee for first-time Pro subscribers.',
        },
        {
          heading: '4. Intellectual Property',
          body: 'You own all intellectual property rights to your personal resume content and profile notes. ParroFill owns the proprietary software, parrot brand marks, and autofill detection algorithms.',
        },
      ],
    },
    security: {
      title: 'Security Architecture & Practices',
      subtitle: 'Our technical measures to safeguard your sensitive career history.',
      lastUpdated: 'October 2026',
      sections: [
        {
          heading: '1. Cryptographic Standards',
          body: 'All communications between your browser, our API servers, and database repositories are encrypted using TLS 1.3 with AES-256 at rest.',
        },
        {
          heading: '2. Browser Extension Isolation',
          body: 'The ParroFill extension operates inside a sandboxed content script context. It only activates when the user visits recognized job portals. Sensitive master keys are never stored inside client-side storage.',
        },
        {
          heading: '3. Principle of Least Privilege',
          body: 'Internal access to candidate databases is strictly restricted through multi-factor authentication (MFA) and automated audit logging. No employee views user resumes without explicit consent for troubleshooting.',
        },
      ],
    },
    cookies: {
      title: 'Cookie & Tracking Policy',
      subtitle: 'Minimal, functional cookies designed for security and authentication.',
      lastUpdated: 'October 2026',
      sections: [
        {
          heading: '1. Strictly Necessary Cookies',
          body: 'We use session cookies solely to maintain your authenticated login state, CSRF security tokens, and user preferences (e.g. currency selection).',
        },
        {
          heading: '2. Zero Third-Party Advertising Trackers',
          body: 'ParroFill does not load invasive ad trackers, Facebook pixels, or behavioral retargeting scripts.',
        },
      ],
    },
  };

  const doc = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <ParrotLogo size="sm" showWordmark={false} />
            <div>
              <h3 className="text-lg font-bold text-slate-900">{doc.title}</h3>
              <p className="text-xs text-slate-500">Effective as of {doc.lastUpdated}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-600 leading-relaxed">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{doc.subtitle}</span>
          </div>

          {doc.sections.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              <h4 className="text-sm font-bold text-slate-900">{section.heading}</h4>
              <p className="text-xs sm:text-sm text-slate-600">{section.body}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">ParroFill Global Compliance</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
