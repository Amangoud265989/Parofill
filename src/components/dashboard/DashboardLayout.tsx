import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ParrotLogo, ParrotAssistantAvatar } from '../common/ParrotLogo';
import { DashboardTab } from '../../types';
import {
  LayoutDashboard,
  User,
  FileText,
  Sparkles,
  Mail,
  Search,
  KanbanSquare,
  Bot,
  Chrome,
  Settings,
  CreditCard,
  LogOut,
  ExternalLink,
  Bell,
  Menu,
  X,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const {
    activeTab,
    setActiveTab,
    setViewMode,
    currentUser,
    setCurrentUser,
    profileCompletionPercentage,
    showNotification,
  } = useApp();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems: { id: DashboardTab; label: string; icon: any; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Smart Profile', icon: User, badge: `${profileCompletionPercentage}%` },
    { id: 'resumes', label: 'Resume Vault', icon: FileText },
    { id: 'tailor', label: 'AI Resume Tailor', icon: Sparkles, badge: 'AI' },
    { id: 'cover-letter', label: 'AI Cover Letter', icon: Mail, badge: 'AI' },
    { id: 'jobs', label: 'Job Search', icon: Search },
    { id: 'applications', label: 'Application Tracker', icon: KanbanSquare },
    { id: 'assistant', label: 'ParroFill AI Assistant', icon: Bot, badge: 'Live' },
    { id: 'extension', label: 'Browser Extension', icon: Chrome },
    { id: 'billing', label: 'Billing & Plan', icon: CreditCard },
    { id: 'settings', label: 'Settings & Security', icon: Settings },
  ];

  const handleTabSelect = (tab: DashboardTab) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setViewMode('landing');
    showNotification('Signed out safely.');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <button onClick={() => setViewMode('landing')}>
          <ParrotLogo size="sm" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleTabSelect('extension')}
            className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center gap-1"
          >
            <Chrome className="w-3.5 h-3.5" />
            <span>Extension</span>
          </button>

          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar (260px width) */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 transition-transform duration-200 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 flex flex-col h-full overflow-y-auto">
          {/* Logo & Public site link */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-100">
            <button
              onClick={() => setViewMode('landing')}
              className="text-left focus:outline-none"
              title="Return to ParroFill homepage"
            >
              <ParrotLogo size="md" />
            </button>
            <button
              onClick={() => setViewMode('landing')}
              className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors text-xs"
              title="View Public Landing Page"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Assistant Status Box */}
          <div className="my-4 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-2.5">
            <ParrotAssistantAvatar size={28} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">ParroFill Engine</div>
              <div className="text-[11px] text-emerald-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Autofill Ready</span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer User Profile Pill & Role Switcher */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {currentUser?.name || 'Elena Rostova'}
                </div>
                <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span>{currentUser?.plan || 'Pro'} Plan</span>
                  <span>·</span>
                  <span>Global</span>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Demo Switcher to Admin View */}
            <button
              onClick={() => setViewMode('admin')}
              className="w-full py-1.5 px-2 text-[11px] font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShieldAlert className="w-3 h-3 text-amber-500" />
              <span>Switch to Admin Console</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Viewport */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        {/* Top Header Bar strictly adhering to Top Bar Contract */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Breadcrumb Trail */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={() => setViewMode('landing')}
              className="hover:text-slate-900 transition-colors"
            >
              ParroFill
            </button>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className="capitalize text-slate-900 font-bold">
              {navItems.find((n) => n.id === activeTab)?.label || activeTab}
            </span>
          </div>

          {/* Right Action zone */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleTabSelect('extension')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors whitespace-nowrap shrink-0"
            >
              <Chrome className="w-3.5 h-3.5 text-emerald-600" />
              <span>Simulate Form Fill</span>
            </button>

            <button
              onClick={() => handleTabSelect('assistant')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ask ParroFill</span>
            </button>
          </div>
        </header>

        {/* Dynamic Content Viewport */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
