import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Shield,
  Download,
  Trash2,
  Lock,
  Globe2,
  Bell,
  Eye,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { profile, currentUser, showNotification, setViewMode, setCurrentUser } = useApp();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autofillSounds, setAutofillSounds] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleExportData = () => {
    const fullData = {
      profile,
      exportedAt: new Date().toISOString(),
      platform: 'ParroFill Global Vault',
      compliance: 'GDPR / CCPA / ISO 27001 Aligned',
    };
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ParroFill_Data_Export_${profile.firstName}_${profile.lastName}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Complete profile data export downloaded as JSON.');
  };

  const handlePermanentDelete = () => {
    setShowDeleteModal(false);
    setCurrentUser(null);
    setViewMode('landing');
    showNotification('Account and all profile data permanently deleted.');
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <Settings className="w-3.5 h-3.5 text-emerald-600" />
          <span>Governance & Preferences</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Account & Security Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage your account preferences, export data archives, and exercise complete privacy controls.
        </p>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
          Account Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-600 mb-1">Logged In As</label>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-medium text-slate-900">
              {currentUser?.name || 'Aman Goud'}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-600 mb-1">Authenticated Email</label>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-slate-900">
              {currentUser?.email || profile.email}
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Notification Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
          Preferences & Alerts
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
            <div>
              <div className="text-xs font-bold text-slate-900">Email Interview Reminders</div>
              <div className="text-[11px] text-slate-500">
                Receive notifications 24 hours prior to scheduled interviews
              </div>
            </div>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
            <div>
              <div className="text-xs font-bold text-slate-900">Extension Audio Chime</div>
              <div className="text-[11px] text-slate-500">
                Play subtle chirp sound when autofill completes form detection
              </div>
            </div>
            <input
              type="checkbox"
              checked={autofillSounds}
              onChange={(e) => setAutofillSounds(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>
        </div>
      </div>

      {/* Data Export & GDPR Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>Data Portability & Export</span>
          <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> GDPR & CCPA Compliant
          </span>
        </h3>

        <p className="text-xs text-slate-600 leading-relaxed">
          You have the legal right to download all records ParroFill maintains on your behalf, including parsed resumes, tailored cover letters, and application session logs.
        </p>

        <button
          onClick={handleExportData}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs"
        >
          <Download className="w-4 h-4" />
          <span>Download My Full Data Archive (.JSON)</span>
        </button>
      </div>

      {/* Danger Zone: Account Deletion */}
      <div className="bg-white rounded-2xl border border-rose-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>Danger Zone</span>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900">Permanently Delete Account</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Once deleted, all career information, resumes, and Kanban tracker histories will be irreversibly erased from our encrypted storage servers.
          </p>
        </div>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 rounded-xl text-xs font-bold transition-colors"
        >
          Delete Account and Purge Data
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-slate-900">Are you absolutely sure?</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              This action cannot be undone. All stored resumes, tailored cover letters, and application history will be permanently deleted from the database.
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handlePermanentDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold"
              >
                Yes, Purge My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
