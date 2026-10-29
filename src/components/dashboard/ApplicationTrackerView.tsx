import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApplicationStage, JobApplication } from '../../types';
import {
  KanbanSquare,
  Plus,
  Calendar,
  Building,
  User,
  ExternalLink,
  Trash2,
  Edit2,
  DollarSign,
  FileText,
  X,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export const ApplicationTrackerView: React.FC = () => {
  const { applications, updateApplicationStage, addApplication, deleteApplication, showNotification, resumes } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  // New Application Form State
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('Remote');
  const [salary, setSalary] = useState('');
  const [stage, setStage] = useState<ApplicationStage>('applied');
  const [notes, setNotes] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [contactPerson, setContactPerson] = useState('');

  const columns: { stage: ApplicationStage; title: string; color: string }[] = [
    { stage: 'saved', title: 'Saved', color: 'bg-slate-100 text-slate-800 border-slate-300' },
    { stage: 'applied', title: 'Applied', color: 'bg-blue-50 text-blue-800 border-blue-200' },
    { stage: 'screening', title: 'Screening', color: 'bg-amber-50 text-amber-800 border-amber-200' },
    { stage: 'interview', title: 'Interview', color: 'bg-purple-50 text-purple-800 border-purple-200' },
    { stage: 'offer', title: 'Offer', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    { stage: 'rejected', title: 'Archived', color: 'bg-slate-50 text-slate-500 border-slate-200' },
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !position.trim()) return;

    addApplication({
      company: company.trim(),
      position: position.trim(),
      location: location.trim() || 'Remote',
      isRemote: location.toLowerCase().includes('remote'),
      salary: salary.trim(),
      stage,
      notes: notes.trim(),
      interviewDate: interviewDate.trim(),
      contactPerson: contactPerson.trim(),
    });

    setShowAddModal(false);
    setCompany('');
    setPosition('');
    setSalary('');
    setNotes('');
    setInterviewDate('');
    setContactPerson('');
  };

  const moveStage = (appId: string, currentStage: ApplicationStage, direction: 'next' | 'prev') => {
    const stages: ApplicationStage[] = ['saved', 'applied', 'screening', 'interview', 'offer', 'rejected'];
    const currentIndex = stages.indexOf(currentStage);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < stages.length) {
      updateApplicationStage(appId, stages[newIndex]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <KanbanSquare className="w-3.5 h-3.5 text-emerald-600" />
            <span>Application Management</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Application Tracker</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Track your pipeline from first save to final offer. Manage interview dates, contacts, and salary offers.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Application</span>
        </button>
      </div>

      {/* Kanban Board Container (Horizontal Scrollable for all 6 columns) */}
      <div className="overflow-x-auto pb-6">
        <div className="grid grid-cols-6 gap-4 min-w-[1100px]">
          {columns.map((col) => {
            const colApps = applications.filter((a) => a.stage === col.stage);
            return (
              <div key={col.stage} className="bg-slate-100/60 rounded-xl p-3 border border-slate-200 flex flex-col min-h-[500px]">
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{col.title}</span>
                    <span className="text-[11px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-white border border-slate-200 text-slate-600">
                      {colApps.length}
                    </span>
                  </div>
                </div>

                {/* Cards List */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:border-emerald-400 transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-xs font-bold text-slate-900 leading-snug">
                            {app.position}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {app.company}
                          </div>
                        </div>

                        <span className="text-[10px] font-bold text-emerald-700 font-mono">
                          {app.matchScore}%
                        </span>
                      </div>

                      {app.salary && (
                        <div className="text-[10px] text-slate-600 font-mono">
                          {app.salary}
                        </div>
                      )}

                      {app.interviewDate && (
                        <div className="p-1.5 rounded bg-purple-50 text-purple-800 text-[10px] font-semibold flex items-center gap-1 border border-purple-200">
                          <Calendar className="w-3 h-3" />
                          <span className="truncate">{app.interviewDate}</span>
                        </div>
                      )}

                      {/* Direction Shift Buttons */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-slate-400 font-mono">
                          {app.dateApplied || 'Draft'}
                        </span>

                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                          {col.stage !== 'saved' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                moveStage(app.id, col.stage, 'prev');
                              }}
                              title="Move to previous stage"
                              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {col.stage !== 'rejected' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                moveStage(app.id, col.stage, 'next');
                              }}
                              title="Advance to next stage"
                              className="p-1 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {colApps.length === 0 && (
                    <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-center p-3 text-slate-400 text-[11px]">
                      No applications in {col.title}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Track New Application</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Linear"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Position</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Frontend"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="saved">Saved</option>
                    <option value="applied">Applied</option>
                    <option value="screening">Screening</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Salary Benchmark</label>
                  <input
                    type="text"
                    placeholder="e.g. $160k - $185k"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Interview Date & Time (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 2026-11-04 14:00 EST"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Person / Recruiter</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins (Talent Lead)"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Notes / Highlights</label>
                <textarea
                  rows={2}
                  placeholder="Notes from initial conversation..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                >
                  Add to Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Application Details Inspection Drawer / Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {selectedApp.company}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{selectedApp.position}</h3>
                <div className="text-xs text-slate-500">{selectedApp.location}</div>
              </div>
              <button onClick={() => setSelectedApp(null)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
                  <span className="font-bold text-slate-900 capitalize">{selectedApp.stage}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Salary</span>
                  <span className="font-mono text-slate-900">{selectedApp.salary || 'Not specified'}</span>
                </div>
              </div>

              {selectedApp.interviewDate && (
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-purple-900">
                  <div className="font-bold">Scheduled Interview:</div>
                  <div className="text-xs font-mono mt-0.5">{selectedApp.interviewDate}</div>
                </div>
              )}

              {selectedApp.contactPerson && (
                <div>
                  <span className="text-[11px] font-bold text-slate-500">Contact / Recruiter:</span>
                  <p className="font-medium text-slate-900">{selectedApp.contactPerson}</p>
                </div>
              )}

              {selectedApp.notes && (
                <div>
                  <span className="text-[11px] font-bold text-slate-500">Candidate Notes:</span>
                  <p className="mt-1 p-2.5 rounded-lg bg-slate-50 border border-slate-200 leading-relaxed text-slate-700">
                    {selectedApp.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  deleteApplication(selectedApp.id);
                  setSelectedApp(null);
                }}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Application</span>
              </button>

              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
