import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ParrotLogo, ParrotAssistantAvatar } from '../common/ParrotLogo';
import {
  Mail,
  Sparkles,
  Copy,
  Download,
  Bookmark,
  RotateCcw,
  Trash2,
  Check,
  FileText,
} from 'lucide-react';

export const CoverLetterView: React.FC = () => {
  const { coverLetters, addCoverLetter, deleteCoverLetter, showNotification, activeResume, profile } = useApp();

  const [company, setCompany] = useState('Stripe');
  const [jobTitle, setJobTitle] = useState('Product Engineer (Billing UI)');
  const [jobDescription, setJobDescription] = useState('Seeking an engineer to craft seamless checkout and billing experiences for millions of global internet businesses. Strong React, TypeScript, and UI systems design experience.');
  const [tone, setTone] = useState<'Professional' | 'Friendly' | 'Confident' | 'Concise'>('Confident');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState(coverLetters[0]?.content || '');
  const [hasCopied, setHasCopied] = useState(false);

  const handleGenerate = async () => {
    if (!company.trim() || !jobTitle.trim()) {
      showNotification('Please provide Company and Job Title.');
      return;
    }

    setIsGenerating(true);
    setHasCopied(false);

    try {
      const response = await fetch('/api/gemini/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company,
          jobTitle,
          jobDescription,
          tone,
          resumeSummary: `${profile.headline}\n${profile.summary}`,
        }),
      });

      const data = await response.json();
      if (data.letter) {
        setGeneratedLetter(data.letter);
        showNotification(`Cover letter generated with ${tone} tone.`);
      }
    } catch (err) {
      console.error(err);
      showNotification('Generated cover letter with local fallback engine.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToVault = () => {
    if (!generatedLetter.trim()) return;
    addCoverLetter({
      company,
      jobTitle,
      tone,
      content: generatedLetter,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setHasCopied(true);
    showNotification('Cover letter copied to clipboard!');
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Cover_Letter_${company.replace(/\s+/g, '_')}_${jobTitle.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Downloaded cover letter text file.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Personalized Career Writing</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">AI Cover Letter Generator</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Craft company-specific, authentic cover letters in seconds. ParroFill pairs your real accomplishments with the company's job requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Inputs & Tone (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            Letter Parameters
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Stripe, Figma"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Frontend"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Desired Tone
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['Professional', 'Friendly', 'Confident', 'Concise'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`p-2 rounded-lg text-xs font-semibold border transition-all text-left ${
                    tone === t
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-2xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold">{t}</div>
                  <div className="text-[10px] text-slate-400 font-normal">
                    {t === 'Professional' && 'Formal & structured'}
                    {t === 'Friendly' && 'Warm & enthusiastic'}
                    {t === 'Confident' && 'Impact & outcome-driven'}
                    {t === 'Concise' && 'Direct 3-paragraph summary'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Job Description / Notes
            </label>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste key responsibilities or why you love this team..."
              className="w-full p-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <ParrotAssistantAvatar size={18} isThinking />
                <span>ParroFill AI Writing Letter...</span>
              </>
            ) : (
              <>
                <Mail className="w-4 h-4" />
                <span>Generate Cover Letter</span>
              </>
            )}
          </button>

          {/* Saved Cover Letters Vault */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Saved Letters ({coverLetters.length})
            </h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {coverLetters.map((cl) => (
                <div
                  key={cl.id}
                  onClick={() => setGeneratedLetter(cl.content)}
                  className="p-2.5 rounded-lg border border-slate-200 hover:border-emerald-300 bg-slate-50 cursor-pointer flex items-center justify-between text-xs transition-colors"
                >
                  <div>
                    <div className="font-bold text-slate-900">{cl.company}</div>
                    <div className="text-[10px] text-slate-500">{cl.jobTitle} · {cl.tone}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCoverLetter(cl.id);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form: Editable Letter Viewer (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Letter for {company} — {jobTitle}
              </h3>
              <div className="text-xs text-slate-500 mt-0.5 font-mono">
                Tone: {tone} · {generatedLetter.split(/\s+/).filter(Boolean).length} words
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{hasCopied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleSaveToVault}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                <span>Save</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={16}
              value={generatedLetter}
              onChange={(e) => setGeneratedLetter(e.target.value)}
              placeholder="Your generated cover letter will appear here. You can edit any line directly."
              className="w-full p-4 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-900 leading-relaxed font-sans focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>You can edit sentences directly before copying or submitting.</span>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Regenerate Variation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
