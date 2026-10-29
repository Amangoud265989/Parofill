import React from 'react';
import { useApp } from '../../context/AppContext';
import { ParrotLogo, ParrotAssistantAvatar } from '../common/ParrotLogo';
import {
  FileText,
  Send,
  Calendar,
  Bookmark,
  CheckCircle2,
  Wand2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  ExternalLink,
  Plus,
} from 'lucide-react';

export const OverviewView: React.FC = () => {
  const {
    profile,
    applications,
    resumes,
    savedJobIds,
    autofillStats,
    profileCompletionPercentage,
    setActiveTab,
    activeResume,
  } = useApp();

  const applicationsThisMonth = applications.filter((a) => a.dateApplied.startsWith('2026-10')).length;
  const completedApps = applications.filter((a) => a.stage !== 'saved').length;
  const upcomingInterviews = applications.filter((a) => a.stage === 'interview' || Boolean(a.interviewDate));
  const recentApplications = applications.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="absolute right-0 top-0 w-80 h-full bg-radial from-emerald-500/10 to-transparent pointer-events-none" />

        <div className="relative max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Career Assistant Active</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome back, {profile.firstName || 'Candidate'}!
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            ParroFill has automated{' '}
            <strong className="text-white font-mono">{autofillStats.totalFieldsAutofilled} form fields</strong> for you
            this month, saving approximately{' '}
            <strong className="text-emerald-400 font-mono">{autofillStats.hoursSaved} hours</strong> of repetitive data entry.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('extension')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-sm"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Autofill Next Application</span>
            </button>

            <button
              onClick={() => setActiveTab('tailor')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tailor Resume for New Job</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Grid (Tabular numerals enforced) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-medium">
            <span>Monthly Applications</span>
            <Send className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {applicationsThisMonth}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span>{completedApps} completed overall</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-medium">
            <span>Upcoming Interviews</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {upcomingInterviews.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Next: {upcomingInterviews[0]?.company || 'None scheduled'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-medium">
            <span>Saved Jobs</span>
            <Bookmark className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {savedJobIds.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Ready to autofill & apply
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-2 font-medium">
            <span>Profile Completion</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-mono tabular-nums">
            {profileCompletionPercentage}%
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${profileCompletionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Secondary Stats: Resume Status & Autofill Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Resume Status */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Active Master Resume
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Default
              </span>
            </div>

            <div className="flex items-start gap-3 mt-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  {activeResume?.title || 'No default resume'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  {activeResume?.fileName || 'Upload your primary resume'}
                </p>
                <div className="text-[10px] text-slate-600 mt-1">
                  Updated: {activeResume?.updatedAt || 'Recent'}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
            <span className="text-xs text-slate-500 font-mono">
              {resumes.length} {resumes.length === 1 ? 'version' : 'versions'} saved
            </span>
            <button
              onClick={() => setActiveTab('resumes')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <span>Manage Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Autofill & AI Usage Metrics */}
        <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
              Autofill Activity
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Fields Autofilled</span>
                <span className="font-bold text-slate-900 font-mono tabular-nums">
                  {autofillStats.totalFieldsAutofilled}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Hours Saved</span>
                <span className="font-bold text-emerald-600 font-mono tabular-nums">
                  ~{autofillStats.hoursSaved} hrs
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Forms Assisted</span>
                <span className="font-bold text-slate-900 font-mono tabular-nums">
                  {autofillStats.sessionsCompleted} sessions
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
            <span className="text-xs text-emerald-700 font-semibold">Ready to autofill</span>
            <button
              onClick={() => setActiveTab('extension')}
              className="text-xs font-bold text-slate-900 hover:text-emerald-600 flex items-center gap-1"
            >
              <span>Test Simulator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* AI Assistant Quick Prompt */}
        <div className="bg-emerald-50/50 p-6 rounded-xl border border-emerald-200/90 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ParrotAssistantAvatar size={24} />
              <span className="text-xs font-bold text-emerald-900">ParroFill Assistant</span>
            </div>

            <p className="text-xs text-emerald-950/80 leading-relaxed">
              "Need interview prep for your upcoming Linear call or want me to tailor your cover letter for Shopify? I have your profile loaded!"
            </p>
          </div>

          <button
            onClick={() => setActiveTab('assistant')}
            className="w-full mt-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>Ask ParroFill</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Recent Applications Pipeline */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Applications</h3>
            <p className="text-xs text-slate-500">Live status of your submitted and active pipelines</p>
          </div>

          <button
            onClick={() => setActiveTab('applications')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>View All Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentApplications.map((app) => (
            <div key={app.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                  {app.company.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{app.position}</div>
                  <div className="text-xs text-slate-500">
                    {app.company} · {app.location} · {app.salary || 'Salary not listed'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto text-xs">
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                    app.stage === 'interview'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : app.stage === 'offer'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : app.stage === 'screening'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {app.stage}
                </span>

                <span className="font-mono text-slate-600 text-xs">
                  {app.dateApplied || 'Draft'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
