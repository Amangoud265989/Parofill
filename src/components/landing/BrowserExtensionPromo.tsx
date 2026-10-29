import React, { useState } from 'react';
import { ParrotLogo, ParrotAssistantAvatar } from '../common/ParrotLogo';
import { useApp } from '../../context/AppContext';
import { downloadExtensionZip } from '../../utils/extensionZip';
import { Chrome, Download, CheckCircle2, Shield, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';

export const BrowserExtensionPromo: React.FC = () => {
  const { setViewMode, setActiveTab, showNotification, profile } = useApp();
  const [activeTab, setActiveTabDemo] = useState<'fill' | 'answers' | 'sync'>('fill');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleInstallClick = async () => {
    setIsDownloading(true);
    try {
      await downloadExtensionZip(profile);
      showNotification('Downloaded ParroFill-Chrome-Extension-v1.0.0.zip! Opening installation guide.');
      setActiveTab('extension');
      setViewMode('dashboard');
    } catch (e) {
      setActiveTab('extension');
      setViewMode('dashboard');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="extension" className="py-20 lg:py-28 bg-white border-y border-slate-200/80 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Architecture */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              <Chrome className="w-3.5 h-3.5 text-emerald-600" />
              <span>Desktop Browser Companion</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance leading-tight">
              ParroFill Works Where You Apply
            </h2>

            <p className="text-base text-slate-600 leading-relaxed text-balance">
              The ParroFill browser extension seamlessly assists you while you navigate online application forms on company websites, LinkedIn, Greenhouse, and Workday.
            </p>

            {/* Key Extension Capabilities */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Instant Field Recognition</h4>
                  <p className="text-xs text-slate-500">
                    Recognizes text inputs, dropdowns, date pickers, and file upload fields without breaking page scripts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">On-Page AI Assistant Drawer</h4>
                  <p className="text-xs text-slate-500">
                    Summon the ParroFill assistant directly beside any essay prompt to refine answers or tailor bullet points.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">Encrypted Account Sync</h4>
                  <p className="text-xs text-slate-500">
                    Syncs tokenized profile data securely with your ParroFill cloud account. No API keys exposed in browser scripts.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleInstallClick}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all shadow-md shadow-emerald-600/20 whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Install Extension</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('extension');
                  setViewMode('dashboard');
                }}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <span>Learn More</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-[11px] text-slate-600">
              Compatible with Chrome, Brave, Edge, and all Chromium browsers.
            </div>
          </div>

          {/* Right Column: Realistic Desktop Browser + Extension Popup Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-800 text-slate-100">
              {/* Browser mockup header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs text-slate-400 font-mono">Job Application Page</span>
                </div>

                {/* Extension Pin */}
                <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-md text-xs border border-slate-700">
                  <ParrotLogo size="sm" showWordmark={false} className="w-4 h-4" />
                  <span className="font-semibold text-emerald-400">ParroFill Extension</span>
                </div>
              </div>

              {/* Extension UI Simulation Body */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
                {/* Simulated Underlying Page (Left 6 cols) */}
                <div className="md:col-span-6 bg-slate-800/60 rounded-xl p-4 border border-slate-700/60 space-y-3 text-xs">
                  <div className="text-[11px] text-emerald-400 font-mono">greenhouse.io/embed/job_app</div>
                  <div className="font-semibold text-white">Application for Senior Engineer</div>

                  <div className="space-y-2 pt-1 opacity-70">
                    <div className="h-7 bg-slate-700/80 rounded px-2 flex items-center text-[10px] text-slate-300">
                      First Name: Aman
                    </div>
                    <div className="h-7 bg-slate-700/80 rounded px-2 flex items-center text-[10px] text-slate-300">
                      Last Name: Goud
                    </div>
                    <div className="h-7 bg-slate-700/80 rounded px-2 flex items-center text-[10px] text-slate-300">
                      Resume: Aman_Goud_Senior_2026.pdf
                    </div>
                    <div className="h-12 bg-slate-700/80 rounded p-2 text-[10px] text-slate-300">
                      Why this role: 6+ yrs engineering...
                    </div>
                  </div>
                </div>

                {/* ParroFill Floating Popup Widget (Right 6 cols) */}
                <div className="md:col-span-6 bg-white rounded-xl p-4 text-slate-900 shadow-xl border border-slate-200 space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <ParrotAssistantAvatar size={24} />
                      <span className="text-xs font-bold text-slate-900">ParroFill Companion</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Page Detected
                    </span>
                  </div>

                  <div className="text-xs text-slate-600">
                    Detected <strong>14 fillable fields</strong> on this Greenhouse application form.
                  </div>

                  {/* Progress gauge */}
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1.5">
                    <div className="flex justify-between text-[11px] text-slate-600 font-medium">
                      <span>Autofill Ready</span>
                      <span className="text-emerald-600 font-bold">14 / 14 Fields</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full w-full" />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Default Resume</span>
                      <span className="font-semibold text-slate-800">Aman_Goud_Senior.pdf</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Essay Question</span>
                      <span className="font-semibold text-emerald-600">AI Draft Ready</span>
                    </div>
                  </div>

                  <button
                    onClick={handleInstallClick}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                  >
                    1-Click Fill & Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
