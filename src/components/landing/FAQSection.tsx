import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is ParroFill?',
      answer:
        'ParroFill is an AI-powered job application automation and career management platform. It securely remembers your professional history, automatically fills repetitive job application fields, generates personalized cover letters, tailors resumes to specific job descriptions, and tracks all your applications in one organized dashboard.',
    },
    {
      question: 'How does ParroFill autofill applications?',
      answer:
        'ParroFill utilizes an intelligent browser companion that recognizes form fields across supported applicant tracking systems (such as Workday, Greenhouse, Lever, Taleo, and LinkedIn). It maps the field types to your saved profile details (name, experience, education, portfolio links) and generates context-aware answers for custom questions based on your background.',
    },
    {
      question: 'Does ParroFill apply to jobs automatically?',
      answer:
        'No. ParroFill does not blindly submit applications behind your back. We believe that applying without review leads to poor outcomes and spam rejections. ParroFill prepares and populates the application in seconds, but you always have the final review before clicking submit.',
    },
    {
      question: 'Can I review applications before submitting them?',
      answer:
        'Yes, absolutely. Every autofilled field and every AI-generated paragraph is clearly presented for your approval. You can edit any sentence, change attached resume versions, or swap contact details before final submission.',
    },
    {
      question: 'Is ParroFill available worldwide?',
      answer:
        'Yes! ParroFill was built from day one for international candidates. We support international dialing codes, global address formats, multiple currency symbols, various date formats, and international visa/work authorization parameters.',
    },
    {
      question: 'Can I use multiple resumes?',
      answer:
        'Yes. You can store multiple specialized resumes (e.g. Frontend Engineer, Product Lead, Engineering Manager) in your ParroFill vault. You can set a default resume or select which version to attach on a per-application basis.',
    },
    {
      question: 'Does ParroFill work with browser extensions?',
      answer:
        'Yes. ParroFill features a dedicated desktop browser extension for Chrome, Brave, Edge, and other Chromium browsers. It communicates with your secure ParroFill account via encrypted tokens without exposing your private credentials.',
    },
    {
      question: 'How does ParroFill protect my information?',
      answer:
        'All data is encrypted in transit using TLS 1.3 and stored in isolated vaults. We never sell your resume or personal information to third-party data brokers. You also have complete control to export all your profile data or delete your account permanently with a single click.',
    },
    {
      question: 'Can I cancel my subscription?',
      answer:
        'Yes. You can cancel, downgrade, or pause your subscription at any time directly from the Billing settings panel. You will retain full access until the end of your current billing period with zero cancellation fees.',
    },
  ];

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white border-b border-slate-200/80 scroll-mt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            Everything You Need to Know About ParroFill
          </h2>
          <p className="text-base text-slate-600 text-balance">
            Got questions? We have clear, straightforward answers.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
