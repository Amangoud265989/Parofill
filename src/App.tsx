import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/landing/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { ProofStats } from './components/landing/ProofStats';
import { HowItWorks } from './components/landing/HowItWorks';
import { AutofillDemo } from './components/landing/AutofillDemo';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { BrowserExtensionPromo } from './components/landing/BrowserExtensionPromo';
import { ProductSpotlights } from './components/landing/ProductSpotlights';
import { SecurityTrustSection } from './components/landing/SecurityTrustSection';
import { PricingSection } from './components/landing/PricingSection';
import { FAQSection } from './components/landing/FAQSection';
import { FinalCTA } from './components/landing/FinalCTA';
import { Footer } from './components/landing/Footer';
import { AuthModal } from './components/auth/AuthModal';

import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { OverviewView } from './components/dashboard/OverviewView';
import { ProfileView } from './components/dashboard/ProfileView';
import { ResumeView } from './components/dashboard/ResumeView';
import { TailorResumeView } from './components/dashboard/TailorResumeView';
import { CoverLetterView } from './components/dashboard/CoverLetterView';
import { JobSearchView } from './components/dashboard/JobSearchView';
import { ApplicationTrackerView } from './components/dashboard/ApplicationTrackerView';
import { AssistantView } from './components/dashboard/AssistantView';
import { ExtensionSimulatorView } from './components/dashboard/ExtensionSimulatorView';
import { SettingsView } from './components/dashboard/SettingsView';
import { BillingView } from './components/dashboard/BillingView';

import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckCircle2 } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { viewMode, activeTab, notification } = useApp();

  return (
    <div className="min-h-screen text-slate-900 selection:bg-emerald-500/20 selection:text-emerald-950 font-sans">
      {/* Global Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800 text-xs font-semibold animate-bounce-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* 1. Public Marketing Landing Mode */}
      {viewMode === 'landing' && (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <ProofStats />
            <HowItWorks />
            <AutofillDemo />
            <FeaturesSection />
            <BrowserExtensionPromo />
            <ProductSpotlights />
            <SecurityTrustSection />
            <PricingSection />
            <FAQSection />
            <FinalCTA />
          </main>
          <Footer />
        </div>
      )}

      {/* 2. Authenticated Dashboard Mode */}
      {viewMode === 'dashboard' && (
        <DashboardLayout>
          {activeTab === 'overview' && <OverviewView />}
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'resumes' && <ResumeView />}
          {activeTab === 'tailor' && <TailorResumeView />}
          {activeTab === 'cover-letter' && <CoverLetterView />}
          {activeTab === 'jobs' && <JobSearchView />}
          {activeTab === 'applications' && <ApplicationTrackerView />}
          {activeTab === 'assistant' && <AssistantView />}
          {activeTab === 'extension' && <ExtensionSimulatorView />}
          {activeTab === 'billing' && <BillingView />}
          {activeTab === 'settings' && <SettingsView />}
        </DashboardLayout>
      )}

      {/* 3. Admin Dashboard Mode */}
      {viewMode === 'admin' && <AdminDashboard />}

      {/* Auth Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
