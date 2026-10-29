import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wand2,
  Bot,
  FileCheck2,
  Mail,
  UserCheck2,
  KanbanSquare,
  Compass,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const { setViewMode, setActiveTab } = useApp();

  const features = [
    {
      id: 'autofill',
      title: 'AI Autofill',
      description:
        'Automatically populates repetitive application fields across Workday, Greenhouse, Lever, and custom portals using your verified profile data.',
      icon: Wand2,
      benefit: 'Reduces 25-minute forms to under 90 seconds',
      actionTab: 'extension' as const,
    },
    {
      id: 'assistant',
      title: 'AI Application Assistant',
      description:
        'Generates insightful, authentic answers for complex application essay questions based strictly on your true career achievements.',
      icon: Bot,
      benefit: 'Never get stuck on open-ended questions',
      actionTab: 'assistant' as const,
    },
    {
      id: 'tailor',
      title: 'Resume Tailoring',
      description:
        'Analyzes target job descriptions, scores ATS compatibility, identifies missing keywords, and recommends punchy bullet point upgrades.',
      icon: FileCheck2,
      benefit: 'Average match score increase of +24%',
      actionTab: 'tailor' as const,
    },
    {
      id: 'cover-letter',
      title: 'AI Cover Letter Generator',
      description:
        'Generates personalized, company-specific cover letters in seconds with adjustable tones: Professional, Friendly, Confident, or Concise.',
      icon: Mail,
      benefit: 'Zero generic templates or clichés',
      actionTab: 'cover-letter' as const,
    },
    {
      id: 'profile',
      title: 'Smart Reusable Profile',
      description:
        'Maintain a single source of truth containing your contact information, work history, education, skills, certifications, and portfolio links.',
      icon: UserCheck2,
      benefit: 'Update once, available everywhere',
      actionTab: 'profile' as const,
    },
    {
      id: 'tracker',
      title: 'Kanban Application Tracker',
      description:
        'Organize your entire job pipeline in visual columns: Saved, Applied, Screening, Interview, Offer, and Rejected with notes and salary benchmarks.',
      icon: KanbanSquare,
      benefit: 'Stay ahead of upcoming interviews and follow-ups',
      actionTab: 'applications' as const,
    },
    {
      id: 'matching',
      title: 'Intelligent Job Matching',
      description:
        'Discover relevant global remote and hybrid opportunities scored automatically against your skill set and career trajectory.',
      icon: Compass,
      benefit: 'Worldwide remote & local market coverage',
      actionTab: 'jobs' as const,
    },
  ];

  const handleFeatureClick = (tab: any) => {
    setActiveTab(tab);
    setViewMode('dashboard');
  };

  return (
    <section id="features" className="py-20 lg:py-28 bg-slate-50/60 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Comprehensive AI Toolkit
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            Everything You Need to Apply Faster and Better
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed text-balance">
            A cohesive suite of intelligent career tools designed to eliminate repetitive administrative labor and elevate the quality of your applications.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                onClick={() => handleFeatureClick(feat.actionTab)}
                className="group relative bg-white rounded-xl p-6 border border-slate-200/90 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-700">{feat.benefit}</span>
                  <span className="text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}

          {/* 8th Card: Global Compatibility Accent */}
          <div className="rounded-xl p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-11 h-11 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Engineered for Global Job Seekers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                ParroFill doesn't assume US-only formats. Full support for international phone dialing, multiple currencies, varied date conventions, and international visa authorizations.
              </p>
            </div>

            <button
              onClick={() => {
                setActiveTab('profile');
                setViewMode('dashboard');
              }}
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>Explore Global Smart Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
