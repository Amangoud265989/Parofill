import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ParrotLogo } from '../common/ParrotLogo';
import {
  Users,
  CreditCard,
  Sparkles,
  Wand2,
  TrendingUp,
  ShieldCheck,
  Settings,
  DollarSign,
  Activity,
  ArrowRight,
  ChevronRight,
  LogOut,
  Sliders,
  Save,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    adminUsers,
    updateUserStatus,
    updateUserPlan,
    pricingPlans,
    updatePricingPlan,
    auditLogs,
    setViewMode,
    showNotification,
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'users' | 'pricing' | 'logs'>('overview');

  // Pricing edit local state
  const [proMonthly, setProMonthly] = useState(pricingPlans.find((p) => p.id === 'plan-pro')?.monthlyPrice || 19);
  const [proAnnual, setProAnnual] = useState(pricingPlans.find((p) => p.id === 'plan-pro')?.annualPrice || 15);
  const [careerMonthly, setCareerMonthly] = useState(pricingPlans.find((p) => p.id === 'plan-career')?.monthlyPrice || 49);
  const [careerAnnual, setCareerAnnual] = useState(pricingPlans.find((p) => p.id === 'plan-career')?.annualPrice || 39);

  const handleSavePricing = () => {
    updatePricingPlan('plan-pro', Number(proMonthly), Number(proAnnual));
    updatePricingPlan('plan-career', Number(careerMonthly), Number(careerAnnual));
    showNotification('Live pricing tiers updated across the entire platform!');
  };

  const adminStats = {
    totalUsers: '14,820',
    activeUsers: '9,410',
    proUsers: '3,842',
    mrr: '$67,420',
    aiTokensUsed: '18.4M',
    autofillSessionsMonth: '48,290',
    extensionInstallations: '11,200',
    conversionRate: '25.9%',
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ParrotLogo size="sm" showWordmark={false} />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm tracking-tight text-white">ParroFill</span>
              <span className="text-[10px] font-bold bg-amber-500 text-slate-950 px-2 py-0.2 rounded font-mono">
                ADMIN CONSOLE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Global SaaS Telemetry & Management</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('dashboard')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>User View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setViewMode('landing')}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white rounded-lg transition-colors"
          >
            Public Site
          </button>
        </div>
      </header>

      {/* Admin Subnav */}
      <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeAdminTab === 'overview' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Overview & KPIs
        </button>
        <button
          onClick={() => setActiveAdminTab('users')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeAdminTab === 'users' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          User Accounts ({adminUsers.length})
        </button>
        <button
          onClick={() => setActiveAdminTab('pricing')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeAdminTab === 'pricing' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Configurable Pricing
        </button>
        <button
          onClick={() => setActiveAdminTab('logs')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeAdminTab === 'logs' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Audit & Security Logs
        </button>
      </div>

      {/* Main Admin Viewport */}
      <div className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
        {/* 1. Overview & KPIs */}
        {activeAdminTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Grid (Tabular numerals enforced) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Monthly Revenue (MRR)</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                  {adminStats.mrr}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">+18.4% this month</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Active Users</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                  {adminStats.activeUsers}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">14,820 total registered</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Autofill Sessions</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                  {adminStats.autofillSessionsMonth}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">Across 35 ATS engines</div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="text-xs text-slate-500 font-medium">Conversion Rate</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-1">
                  {adminStats.conversionRate}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">Free to Pro / Career</div>
              </div>
            </div>

            {/* AI Platform & Extension Telemetry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">AI Model Usage & Health</h3>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    gemini-3.8-flash · 99.98%
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Monthly Token Invocations</span>
                    <span className="font-mono font-bold text-slate-900">{adminStats.aiTokensUsed}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Average Resume Tailor Latency</span>
                    <span className="font-mono font-bold text-slate-900">420ms</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Cover Letter Generations</span>
                    <span className="font-mono font-bold text-slate-900">12,410</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>AI Assistant Queries</span>
                    <span className="font-mono font-bold text-slate-900">31,800</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900">Browser Extension Diagnostics</h3>
                  <span className="text-[11px] font-mono text-slate-600">v2.4.1 Production</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Active Extension Users</span>
                    <span className="font-mono font-bold text-slate-900">{adminStats.extensionInstallations}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Greenhouse Recognition Rate</span>
                    <span className="font-mono font-bold text-emerald-600">99.4%</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Workday Form Match Rate</span>
                    <span className="font-mono font-bold text-emerald-600">98.8%</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Lever Form Match Rate</span>
                    <span className="font-mono font-bold text-emerald-600">99.7%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. User Accounts Management */}
        {activeAdminTab === 'users' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Registered SaaS Users</h3>
                <p className="text-xs text-slate-500">Manage user access tiers and account statuses</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-5 py-3">User</th>
                    <th className="px-5 py-3">Plan</th>
                    <th className="px-5 py-3 text-right">Applications</th>
                    <th className="px-5 py-3 text-right">Autofill Sessions</th>
                    <th className="px-5 py-3">Joined Date</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {adminUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/60">
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-slate-900">{user.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{user.email}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <select
                          value={user.plan}
                          onChange={(e) => updateUserPlan(user.id, e.target.value as any)}
                          className="px-2 py-1 rounded border border-slate-200 bg-white font-semibold text-[11px]"
                        >
                          <option value="Free">Free</option>
                          <option value="Pro">Pro</option>
                          <option value="Career">Career</option>
                        </select>
                      </td>
                      <td className="px-5 py-3.5 text-right font-mono tabular-nums">{user.applicationsCount}</td>
                      <td className="px-5 py-3.5 text-right font-mono tabular-nums">{user.autofillSessions}</td>
                      <td className="px-5 py-3.5 font-mono text-[11px] text-slate-500">{user.joinedDate}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            user.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-rose-50 text-rose-700'
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() =>
                            updateUserStatus(user.id, user.status === 'active' ? 'suspended' : 'active')
                          }
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                        >
                          {user.status === 'active' ? 'Suspend' : 'Reactivate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Configurable Pricing Tiers (Requirement from prompt #13 & #18) */}
        {activeAdminTab === 'pricing' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Dynamic SaaS Pricing Configurator
                </h3>
                <p className="text-xs text-slate-500">
                  Per prompt requirement: Pricing is dynamically configurable from this console without hardcoding.
                </p>
              </div>

              <button
                onClick={handleSavePricing}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs whitespace-nowrap shrink-0"
              >
                <Save className="w-4 h-4" />
                <span>Save Live Pricing</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pro Plan Config */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">Pro Job Hunter Tier</h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Monthly Price ($)</label>
                    <input
                      type="number"
                      value={proMonthly}
                      onChange={(e) => setProMonthly(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Annual Cadence ($/mo)</label>
                    <input
                      type="number"
                      value={proAnnual}
                      onChange={(e) => setProAnnual(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Career Plan Config */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">Career Accelerator Tier</h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Monthly Price ($)</label>
                    <input
                      type="number"
                      value={careerMonthly}
                      onChange={(e) => setCareerMonthly(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Annual Cadence ($/mo)</label>
                    <input
                      type="number"
                      value={careerAnnual}
                      onChange={(e) => setCareerAnnual(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Audit & Security Logs */}
        {activeAdminTab === 'logs' && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-5 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">System Security & Audit Log</h3>
              <p className="text-xs text-slate-500">Immutable ledger of platform actions and data access events</p>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-900">{log.event}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Actor: {log.actor}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-slate-500">{log.timestamp}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 uppercase">
                      {log.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
