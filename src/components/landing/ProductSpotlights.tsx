import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ParrotLogo, ParrotAssistantAvatar } from '../common/ParrotLogo';
import {
  FileText,
  Mail,
  KanbanSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Search,
  ExternalLink,
} from 'lucide-react';

export const ProductSpotlights: React.FC = () => {
  const { setViewMode, setActiveTab, showNotification } = useApp();

  // Active showcase tab
  const [activeShowcase, setActiveShowcase] = useState<'resume' | 'cover' | 'kanban' | 'search'>('resume');

  // Resume state in demo
  const [acceptedResumeChange, setAcceptedResumeChange] = useState(false);

  // Cover letter state in demo
  const [selectedTone, setSelectedTone] = useState<'Professional' | 'Friendly' | 'Confident' | 'Concise'>('Confident');

  const coverLetterSnippets = {
    Professional:
      "Dear Hiring Team, I am writing to express my focused interest in the Senior Engineer role. My 6 years of experience architecting resilient web platforms and mentoring engineering pods aligns closely with your team's technical milestones.",
    Friendly:
      "Hi there! I've been a huge fan of your product journey and team culture. When I saw the opening for Senior Engineer, I knew I had to reach out. I'd love to bring my energy for delightful user experiences to your squad!",
    Confident:
      "Dear Hiring Manager, If you're looking for an engineer who cuts page load latency by 44% and turns complex designs into accessible, scalable code, I am ready to make an immediate impact on Day 1.",
    Concise:
      "Dear Team, With 6+ years in modern TypeScript and React systems, I have delivered high-throughput web apps supporting millions of users. I welcome the opportunity to discuss technical alignment.",
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="text-xs font-semibold tracking-wider text-emerald-700 uppercase">
            Deep Product Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
            Designed for Every Stage of the Job Hunt
          </h2>
          <p className="text-base text-slate-600 text-balance">
            From smart resume tailoring to automated tracking and global discovery, explore how each tool accelerates your job search.
          </p>

          {/* Segmented Controller */}
          <div className="inline-flex p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
            <button
              onClick={() => setActiveShowcase('resume')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeShowcase === 'resume'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AI Resume Tailoring
            </button>
            <button
              onClick={() => setActiveShowcase('cover')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeShowcase === 'cover'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              AI Cover Letter
            </button>
            <button
              onClick={() => setActiveShowcase('kanban')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeShowcase === 'kanban'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Application Tracker
            </button>
            <button
              onClick={() => setActiveShowcase('search')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeShowcase === 'search'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Global Job Search
            </button>
          </div>
        </div>

        {/* Dynamic Display based on activeShowcase */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
          {/* 1. Resume Tailoring Showcase */}
          {activeShowcase === 'resume' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs font-bold text-emerald-700 uppercase">Target Analysis</div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Senior Frontend Engineer at Linear
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-slate-500 font-medium">ATS Compatibility Score</div>
                    <div className="text-2xl font-black font-mono text-emerald-600">88% Match</div>
                  </div>
                </div>
              </div>

              {/* Skills Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Identified Matching Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['TypeScript', 'React.js', 'Design Systems', 'Web Performance', 'Accessibility'].map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-white text-emerald-800 rounded text-[11px] font-medium border border-emerald-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Suggested Missing Keywords</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['Offline Sync', 'Keyboard Navigation', 'WebSockets', 'State Machines'].map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-white text-amber-800 rounded text-[11px] font-medium border border-amber-200">
                        + {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Proposed Bullet Point Improvement */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">ParroFill AI Bullet Point Tailoring</span>
                  <span className="text-slate-500 text-[11px]">Experience Section</span>
                </div>

                <div className="text-xs space-y-2">
                  <div className="p-2.5 rounded bg-white border border-slate-200 text-slate-500 line-through">
                    "Built web components and made the web app load faster."
                  </div>
                  <div className="p-2.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-950 font-medium">
                    "Architected modular TypeScript design components and offline cache strategies, driving a 44% decrease in LCP and seamless keyboard-first navigation."
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-500">
                    {acceptedResumeChange ? '✓ Change accepted into resume draft' : 'Review change before applying'}
                  </span>
                  <button
                    onClick={() => {
                      setAcceptedResumeChange(true);
                      showNotification('Resume draft updated with improved bullet point.');
                    }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      acceptedResumeChange
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {acceptedResumeChange ? 'Applied to Resume' : 'Accept Improvement'}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setActiveTab('tailor');
                    setViewMode('dashboard');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  <span>Open Full AI Resume Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* 2. AI Cover Letter Showcase */}
          {activeShowcase === 'cover' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs font-bold text-emerald-700 uppercase">Cover Letter Generator</div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Target Role: Staff Product Engineer at Figma
                  </h3>
                </div>

                {/* Tone selector */}
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
                  {(['Professional', 'Friendly', 'Confident', 'Concise'] as const).map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                        selectedTone === tone
                          ? 'bg-white text-slate-900 shadow-sm font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans min-h-[140px] whitespace-pre-wrap">
                {coverLetterSnippets[selectedTone]}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Tone: {selectedTone}</span>
                  <span>·</span>
                  <span>Personalized with your experience</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(coverLetterSnippets[selectedTone]);
                      showNotification('Copied cover letter to clipboard!');
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('cover-letter');
                      setViewMode('dashboard');
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>Full Generator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. Kanban Application Tracker Showcase */}
          {activeShowcase === 'kanban' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs font-bold text-emerald-700 uppercase">Kanban Pipeline</div>
                  <h3 className="text-lg font-bold text-slate-900">Track Applications Across Stages</h3>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('applications');
                    setViewMode('dashboard');
                  }}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Open Full Tracker</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Simplified mini-kanban view */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>Applied (2)</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 shadow-xs mb-2">
                    <div className="font-bold text-xs text-slate-900">Notion</div>
                    <div className="text-[11px] text-slate-500">Frontend Systems</div>
                    <div className="text-[10px] text-slate-400 mt-1">Applied Oct 25</div>
                  </div>
                </div>

                <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-900 mb-2">
                    <span>Interview (1)</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-emerald-300 shadow-xs mb-2">
                    <div className="font-bold text-xs text-slate-900">Linear</div>
                    <div className="text-[11px] text-slate-500">Senior Frontend</div>
                    <div className="text-[10px] font-semibold text-emerald-600 mt-1">Interview: Nov 3</div>
                  </div>
                </div>

                <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-2">
                    <span>Offer (1)</span>
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                  </div>
                  <div className="p-2.5 bg-white rounded-lg border border-amber-300 shadow-xs mb-2">
                    <div className="font-bold text-xs text-slate-900">Figma</div>
                    <div className="text-[11px] text-slate-500">Staff Technologist</div>
                    <div className="text-[10px] font-bold text-amber-700 mt-1">$195k - $230k Offer</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Global Job Search Showcase */}
          {activeShowcase === 'search' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs font-bold text-emerald-700 uppercase">Worldwide Discovery</div>
                  <h3 className="text-lg font-bold text-slate-900">Matched to Your Verified Profile</h3>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('jobs');
                    setViewMode('dashboard');
                  }}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>Explore All Global Jobs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">Staff Frontend Engineer</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        94% Profile Match
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Linear · Remote (Worldwide) · $170k - $205k USD
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('jobs');
                      setViewMode('dashboard');
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold whitespace-nowrap self-start sm:self-auto"
                  >
                    Apply with ParroFill
                  </button>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">Product Engineer (Growth)</span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        91% Profile Match
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Shopify · Toronto, CA / Remote · $150k - $185k CAD
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('jobs');
                      setViewMode('dashboard');
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold whitespace-nowrap self-start sm:self-auto"
                  >
                    Apply with ParroFill
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
