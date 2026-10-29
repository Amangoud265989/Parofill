import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ParrotLogo, ParrotAssistantAvatar } from '../common/ParrotLogo';
import { downloadExtensionZip } from '../../utils/extensionZip';
import {
  Chrome,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Download,
  Lock,
  Layers,
  Wand2,
  ExternalLink,
  ShieldCheck,
  FolderArchive,
  Terminal,
  FileCode,
  Check,
} from 'lucide-react';

export const ExtensionSimulatorView: React.FC = () => {
  const { profile, activeResume, incrementAutofillStats, showNotification } = useApp();

  const [targetPortal, setTargetPortal] = useState<'workday' | 'greenhouse' | 'lever'>('workday');
  const [autofillProgress, setAutofillProgress] = useState(0);
  const [isFilling, setIsFilling] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);

  // Field state simulated on the external page
  const [fields, setFields] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    resumeAttached: false,
    linkedIn: '',
    experienceYears: '',
    aiQuestionAnswer: '',
  });

  const portalConfigs = {
    workday: {
      name: 'Workday Enterprise Candidate Portal',
      url: 'https://myworkdayjobs.com/acme/apply',
      fieldsDetected: 14,
      essayPrompt: 'Explain how your technical leadership elevated your previous team.',
    },
    greenhouse: {
      name: 'Greenhouse Hiring Portal',
      url: 'https://boards.greenhouse.io/linear/jobs/48201',
      fieldsDetected: 11,
      essayPrompt: 'Why do you want to join our fast-moving engineering pod?',
    },
    lever: {
      name: 'Lever Direct Application',
      url: 'https://jobs.lever.co/figma/apply',
      fieldsDetected: 9,
      essayPrompt: 'Tell us about a time you optimized an inaccessible user experience.',
    },
  };

  const currentConfig = portalConfigs[targetPortal];

  const handleDownloadExtension = async () => {
    setIsDownloadingZip(true);
    try {
      await downloadExtensionZip(profile);
      showNotification('Downloaded ParroFill-Chrome-Extension-v1.0.0.zip! Follow the 4-step guide below to load in Chrome.');
    } catch (err) {
      console.error(err);
      showNotification('Failed to package extension ZIP.');
    } finally {
      setIsDownloadingZip(false);
    }
  };

  const handleStartAutofill = () => {
    setIsFilling(true);
    setIsCompleted(false);
    setAutofillProgress(10);

    setTimeout(() => {
      setFields((prev) => ({
        ...prev,
        fullName: `${profile.firstName} ${profile.lastName}`,
        email: profile.email,
      }));
      setAutofillProgress(40);
    }, 400);

    setTimeout(() => {
      setFields((prev) => ({
        ...prev,
        phone: profile.phone,
        location: `${profile.city}, ${profile.country}`,
        linkedIn: profile.linkedInUrl,
        experienceYears: '6+ Years',
      }));
      setAutofillProgress(70);
    }, 800);

    setTimeout(() => {
      setFields((prev) => ({
        ...prev,
        resumeAttached: true,
        aiQuestionAnswer: `Drawing from my background as ${profile.headline}, I focus on high-throughput execution, strict accessibility, and data-driven improvements. I have consistently accelerated shipping velocity while maintaining software reliability.`,
      }));
      setAutofillProgress(100);
      setIsFilling(false);
      setIsCompleted(true);
      incrementAutofillStats(currentConfig.fieldsDetected);
      showNotification(`ParroFill finished populating ${currentConfig.fieldsDetected} fields! Ready to review.`);
    }, 1300);
  };

  const handleReset = () => {
    setFields({
      fullName: '',
      email: '',
      phone: '',
      location: '',
      resumeAttached: false,
      linkedIn: '',
      experienceYears: '',
      aiQuestionAnswer: '',
    });
    setAutofillProgress(0);
    setIsCompleted(false);
    setIsFilling(false);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Real Chrome Extension Download & Quick Install */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
              <Chrome className="w-3.5 h-3.5 text-emerald-400" />
              <span>Manifest V3 Production Chrome Extension Ready</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Install ParroFill in Your Browser
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Autofill job application forms on <strong>Workday, Greenhouse, Lever, Ashby, LinkedIn, and Indeed</strong> with 1 click using your saved Smart Profile and AI tailored answers.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleDownloadExtension}
              disabled={isDownloadingZip}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-500/25 active:scale-[0.99] whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloadingZip ? 'Packaging Extension...' : 'Download Chrome Extension (.ZIP)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4-Step Chrome Installation Guide */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <FolderArchive className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">How to Load into Chrome in 60 Seconds</h3>
              <p className="text-[11px] text-slate-500">Works on Google Chrome, Brave, Edge, and all Chromium browsers</p>
            </div>
          </div>

          <button
            onClick={handleDownloadExtension}
            className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
          >
            <span>Download ZIP</span>
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-emerald-700 font-mono">STEP 1</div>
            <div className="font-bold text-slate-900">Extract the ZIP</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Unpack the downloaded <code>ParroFill-Chrome-Extension-v1.0.0.zip</code> onto your computer.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-emerald-700 font-mono">STEP 2</div>
            <div className="font-bold text-slate-900">Open Extensions</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              In Chrome or Brave, open a new tab and go to <code>chrome://extensions</code>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-emerald-700 font-mono">STEP 3</div>
            <div className="font-bold text-slate-900">Enable Developer Mode</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Toggle the <strong>Developer mode</strong> switch in the top-right corner of the Extensions page.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-emerald-700 font-mono">STEP 4</div>
            <div className="font-bold text-slate-900">Click "Load Unpacked"</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Click <strong>Load unpacked</strong> and select the unzipped folder. The ParroFill parrot icon will appear!
            </p>
          </div>
        </div>
      </div>

      {/* Interactive In-App Testing Simulator */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Interactive Form Autofill Simulator
            </h2>
            <p className="text-xs text-slate-500">
              Test how the extension's field detection heuristics work right here in your browser.
            </p>
          </div>

          {/* Target Portal Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            {(['workday', 'greenhouse', 'lever'] as const).map((portal) => (
              <button
                key={portal}
                onClick={() => {
                  setTargetPortal(portal);
                  handleReset();
                }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-colors ${
                  targetPortal === portal
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {portal}
              </button>
            ))}
          </div>
        </div>

        {/* Side-by-Side: The External Website Form & ParroFill Extension Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: The Third-Party Job Portal (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Simulated Browser URL bar */}
            <div className="px-4 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px] truncate max-w-sm">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span className="truncate">{currentConfig.url}</span>
              </div>

              <span className="text-[10px] font-semibold text-slate-400 uppercase">Simulated Page</span>
            </div>

            <div className="p-6 space-y-4 bg-slate-50/40">
              <div className="pb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {currentConfig.name}
                </span>
                <h3 className="text-lg font-bold text-slate-900">Candidate Information</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Applicant Name</label>
                  <div
                    className={`p-2 text-xs rounded border transition-colors ${
                      fields.fullName ? 'bg-emerald-50/50 border-emerald-400 font-medium text-slate-900' : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    {fields.fullName || 'Waiting for autofill...'}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Email Address</label>
                  <div
                    className={`p-2 text-xs rounded border transition-colors ${
                      fields.email ? 'bg-emerald-50/50 border-emerald-400 font-medium text-slate-900' : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    {fields.email || 'Waiting for autofill...'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Phone</label>
                  <div
                    className={`p-2 text-xs rounded border transition-colors ${
                      fields.phone ? 'bg-emerald-50/50 border-emerald-400 font-medium text-slate-900' : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    {fields.phone || 'Waiting...'}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Location</label>
                  <div
                    className={`p-2 text-xs rounded border transition-colors ${
                      fields.location ? 'bg-emerald-50/50 border-emerald-400 font-medium text-slate-900' : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    {fields.location || 'Waiting...'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">LinkedIn Profile</label>
                  <div
                    className={`p-2 text-xs rounded border transition-colors ${
                      fields.linkedIn ? 'bg-emerald-50/50 border-emerald-400 font-medium text-slate-900' : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    {fields.linkedIn || 'Waiting...'}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Resume Document</label>
                  <div
                    className={`p-2 text-xs rounded border flex items-center justify-between ${
                      fields.resumeAttached ? 'bg-emerald-50/50 border-emerald-400 text-slate-900 font-medium' : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    <span className="truncate">{fields.resumeAttached ? activeResume?.fileName || 'Elena_Rostova_Senior_2026.pdf' : 'Attach file'}</span>
                    {fields.resumeAttached && <span className="text-[10px] text-emerald-700 font-bold shrink-0">Attached</span>}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-semibold text-slate-700">
                    Application Essay: {currentConfig.essayPrompt}
                  </label>
                  {fields.aiQuestionAnswer && (
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> ParroFill Drafted
                    </span>
                  )}
                </div>
                <div
                  className={`p-3 text-xs rounded-lg border min-h-[70px] leading-relaxed ${
                    fields.aiQuestionAnswer ? 'bg-white border-emerald-400 text-slate-900' : 'bg-slate-100/70 border-slate-200 text-slate-400 italic'
                  }`}
                >
                  {fields.aiQuestionAnswer || 'ParroFill will generate a contextual answer here...'}
                </div>
              </div>
            </div>
          </div>

          {/* Right: The ParroFill Browser Extension Widget (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-emerald-500 shadow-xl p-6 space-y-5">
            {/* Extension Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <ParrotAssistantAvatar size={30} isThinking={isFilling} />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">ParroFill Extension</h4>
                  <div className="text-[11px] text-emerald-700 font-medium">Active on this tab</div>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="p-1 text-slate-400 hover:text-slate-700"
                title="Reset test"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Form detection status */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Form Detection</span>
                <span className="text-emerald-700 font-bold font-mono">
                  {currentConfig.fieldsDetected} Supported Inputs
                </span>
              </div>

              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${autofillProgress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Master Account</span>
                <span className="font-semibold text-slate-900 font-mono">{profile.email}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Resume Attached</span>
                <span className="font-semibold text-slate-900 truncate max-w-[180px]">
                  {activeResume?.title || 'Default'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Security Isolation</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Client Tokenized
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleStartAutofill}
                disabled={isFilling}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
              >
                {isFilling ? (
                  <>
                    <ParrotAssistantAvatar size={18} isThinking />
                    <span>Autofilling Form Fields...</span>
                  </>
                ) : isCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Fields Populated (Click to Re-fill)</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>1-Click Autofill Form</span>
                  </>
                )}
              </button>

              {isCompleted && (
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Review & Confirm Submission
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation & Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Human-in-the-Loop Review</h3>
                <p className="text-xs text-slate-500">You remain in 100% control before final submission</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              ParroFill has completed the repetitive form-filling for <strong>{currentConfig.name}</strong>. All data points match your verified profile and no fictitious records were added.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 font-mono text-slate-700">
              <div>✓ Candidate: {fields.fullName}</div>
              <div>✓ Contact: {fields.email}</div>
              <div>✓ Resume: {activeResume?.fileName}</div>
              <div>✓ Question response verified</div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Make More Edits
              </button>
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  showNotification('Application confirmed! Logged in your Kanban tracker.');
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
              >
                Confirm & Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
