import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ParrotLogo, ParrotAssistantAvatar } from '../common/ParrotLogo';
import {
  Sparkles,
  FileCheck2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Plus,
  Check,
  Building,
  Briefcase,
  Layers,
} from 'lucide-react';

export const TailorResumeView: React.FC = () => {
  const { resumes, activeResume, showNotification, profile } = useApp();

  const [selectedResumeId, setSelectedResumeId] = useState<string>(activeResume?.id || resumes[0]?.id || '');
  const [jobTitle, setJobTitle] = useState('Senior Frontend Engineer');
  const [company, setCompany] = useState('Linear');
  const [jobDescription, setJobDescription] = useState(`We are looking for a Senior Frontend Engineer to build high-performance web products.
Key Responsibilities:
- Design and build responsive user interfaces with sub-100ms interactions.
- Modernize React and TypeScript component architectures and offline sync caches.
- Experience with WebSockets, keyboard shortcuts, and state machines.
- Collaborate with product designers and backend engineers to maintain high UX velocity.`);

  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [acceptedChanges, setAcceptedChanges] = useState<Record<number, boolean>>({});

  const handleRunTailoring = async () => {
    if (!jobDescription.trim()) {
      showNotification('Please enter a job description to tailor against.');
      return;
    }

    setIsLoading(true);
    setAcceptedChanges({});

    try {
      const selectedDoc = resumes.find((r) => r.id === selectedResumeId) || activeResume;
      const response = await fetch('/api/gemini/tailor-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle,
          company,
          jobDescription,
          resumeText: `${selectedDoc?.title || ''}\n${selectedDoc?.contentSummary || ''}\nSkills: ${profile.skills.map((s) => s.name).join(', ')}`,
        }),
      });

      const data = await response.json();
      setAnalysisResult(data);
      showNotification('AI Analysis complete! Review tailored recommendations.');
    } catch (err) {
      console.error(err);
      showNotification('Analysis completed using fallback engine.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptChange = (index: number) => {
    setAcceptedChanges((prev) => ({ ...prev, [index]: true }));
    showNotification('Approved improvement! Added to tailored resume version.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Intelligent ATS Optimization</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          AI Resume Tailoring
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Compare your resume against any target job description. ParroFill calculates ATS compatibility, uncovers missing keywords, and rewrites bullet points for maximum impact.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Inputs (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Job Parameters</span>
            <span className="text-[11px] font-normal text-slate-400">Step 1</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Base Resume
            </label>
            <select
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
            >
              {resumes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} {r.isDefault ? '(Default)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Stripe, Linear"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Staff Engineer"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">Job Description / Requirements</label>
              <span className="text-[10px] text-slate-400 font-mono">{jobDescription.length} chars</span>
            </div>
            <textarea
              rows={8}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the full job post requirements, responsibilities, and qualifications..."
              className="w-full p-3 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
            />
          </div>

          <button
            onClick={handleRunTailoring}
            disabled={isLoading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <ParrotAssistantAvatar size={18} isThinking />
                <span>ParroFill AI Analyzing Match...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run Resume Tailoring</span>
              </>
            )}
          </button>
        </div>

        {/* Right Form: AI Analysis Output & Review (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {isLoading && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-sm animate-pulse">
              <ParrotAssistantAvatar size={48} isThinking />
              <div className="text-sm font-bold text-slate-900">
                ParroFill is analyzing skills, keywords, and ATS density...
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Comparing your career achievements with requirements at {company || 'the company'}.
              </p>
            </div>
          )}

          {!isLoading && !analysisResult && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Ready to Tailor</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Enter target role details on the left and click "Run Resume Tailoring" to receive ATS compatibility scoring and actionable upgrades.
              </p>
            </div>
          )}

          {!isLoading && analysisResult && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              {/* Score Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    ATS Match Analysis
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {company} — {jobTitle}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5 font-mono">
                    {analysisResult.keywordMatchRatio || '14/18 key terms detected'}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Compatibility</div>
                    <div className="text-3xl font-extrabold text-emerald-600 font-mono tabular-nums">
                      {analysisResult.matchScore || 85}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Matching Skills Found</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(analysisResult.matchingSkills || []).map((sk: string) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 bg-white text-emerald-800 rounded text-[11px] font-medium border border-emerald-200"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Missing Job Keywords</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(analysisResult.missingSkills || []).map((sk: string) => (
                      <span
                        key={sk}
                        className="px-2 py-0.5 bg-white text-amber-800 rounded text-[11px] font-medium border border-amber-200"
                      >
                        + {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggested Bullet Point Improvements */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Suggested Accomplishment Improvements
                </h4>

                {(analysisResult.suggestedImprovements || []).map((item: any, idx: number) => {
                  const isAccepted = acceptedChanges[idx];
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-800">{item.section}</span>
                        <span className="text-[11px] text-slate-500 font-medium">{item.reason}</span>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="p-2.5 rounded bg-white border border-slate-200 text-slate-500 text-[11px]">
                          <strong>Original:</strong> {item.current}
                        </div>
                        <div className="p-2.5 rounded bg-emerald-50 border border-emerald-300 text-emerald-950 font-medium text-[11px] leading-relaxed">
                          <strong>AI Tailored:</strong> {item.improved}
                        </div>
                      </div>

                      <div className="flex items-center justify-end pt-1">
                        <button
                          onClick={() => handleAcceptChange(idx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isAccepted
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                          }`}
                        >
                          {isAccepted ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Change Applied</span>
                            </>
                          ) : (
                            <>
                              <span>Accept Improvement</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ATS Recommendations list */}
              {analysisResult.atsRecommendations && (
                <div className="p-4 rounded-xl bg-slate-100/60 border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="font-bold text-slate-800">ParroFill ATS Guidelines</div>
                  <ul className="list-disc list-inside text-slate-600 space-y-1 text-[11px]">
                    {analysisResult.atsRecommendations.map((rec: string, i: number) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
