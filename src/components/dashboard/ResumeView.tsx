import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ResumeDocument } from '../../types';
import {
  FileText,
  Upload,
  CheckCircle2,
  Trash2,
  Download,
  Sparkles,
  Eye,
  Plus,
  Star,
  X,
  FileCheck,
} from 'lucide-react';

export const ResumeView: React.FC = () => {
  const { resumes, addResume, setDefaultResume, deleteResume, setActiveTab, showNotification, profile } = useApp();

  const [previewResume, setPreviewResume] = useState<ResumeDocument | null>(resumes[0] || null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newSummary, setNewSummary] = useState('');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addResume({
      title: newTitle.trim(),
      targetRole: newRole.trim() || 'Software Engineer',
      fileName: `${newTitle.trim().replace(/\s+/g, '_')}_2026.pdf`,
      fileSize: '148 KB',
      isDefault: resumes.length === 0,
      contentSummary: newSummary.trim() || 'Includes full stack development, React, and system architecture achievements.',
      skillsExtracted: ['TypeScript', 'React', 'Node.js', 'System Architecture'],
    });

    setShowUploadModal(false);
    setNewTitle('');
    setNewRole('');
    setNewSummary('');
  };

  const handleDownload = (resume: ResumeDocument) => {
    // Generate text simulation download
    const textContent = `PARROFILL VERIFIED RESUME
Candidate: ${profile.firstName} ${profile.lastName}
Target Role: ${resume.targetRole}
Email: ${profile.email} | Phone: ${profile.phone}
Location: ${profile.city}, ${profile.country}
Portfolio: ${profile.portfolioUrl}

SUMMARY:
${resume.contentSummary}

EXPERIENCE:
${profile.experiences
  .map(
    (e) => `• ${e.title} at ${e.company} (${e.startDate} - ${e.endDate || 'Present'})
  ${e.highlights.join('\n  ')}`
  )
  .join('\n\n')}

EDUCATION:
${profile.education.map((ed) => `• ${ed.degree} - ${ed.institution} (${ed.endYear})`).join('\n')}

SKILLS:
${profile.skills.map((s) => s.name).join(', ')}
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = resume.fileName.replace('.pdf', '.txt');
    link.click();
    URL.revokeObjectURL(url);
    showNotification(`Downloaded "${resume.title}"`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Resume Vault</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Store multiple targeted resumes. ParroFill selects your default resume when autofilling application portals.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 whitespace-nowrap shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload / Create Resume</span>
        </button>
      </div>

      {/* Main Grid: Left List, Right Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Resumes List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {resumes.map((resume) => {
            const isSelected = previewResume?.id === resume.id;
            return (
              <div
                key={resume.id}
                onClick={() => setPreviewResume(resume)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/40 border-emerald-400 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>{resume.title}</span>
                        {resume.isDefault && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                            Default
                          </span>
                        )}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{resume.targetRole}</p>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">
                        {resume.fileName} · {resume.fileSize}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions row */}
                <div className="pt-3 mt-3 border-t border-slate-100/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {!resume.isDefault && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDefaultResume(resume.id);
                        }}
                        className="text-[11px] font-semibold text-slate-600 hover:text-emerald-700 flex items-center gap-1"
                      >
                        <Star className="w-3 h-3 text-amber-500" />
                        <span>Set Default</span>
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(resume);
                      }}
                      className="p-1 text-slate-400 hover:text-slate-700"
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    {resumes.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteResume(resume.id);
                        }}
                        className="p-1 text-slate-400 hover:text-rose-600"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Clean Resume Document Preview (7 cols) */}
        <div className="lg:col-span-7">
          {previewResume ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Document Inspection
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{previewResume.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTab('tailor');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Tailor for Job</span>
                  </button>

                  <button
                    onClick={() => handleDownload(previewResume)}
                    className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg border border-slate-200"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Clean Document Body Preview */}
              <div className="bg-slate-50/70 p-6 rounded-xl border border-slate-100 font-sans space-y-5 text-xs text-slate-800">
                {/* Candidate Lockup */}
                <div className="text-center pb-4 border-b border-slate-200">
                  <h2 className="text-xl font-bold text-slate-900">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <div className="text-xs text-slate-600 font-medium mt-0.5">
                    {previewResume.targetRole}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap justify-center gap-x-3">
                    <span>{profile.email}</span>
                    <span>·</span>
                    <span>{profile.phone}</span>
                    <span>·</span>
                    <span>{profile.city}, {profile.country}</span>
                    <span>·</span>
                    <span>{profile.portfolioUrl}</span>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Professional Summary
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {previewResume.contentSummary}
                  </p>
                </div>

                {/* Experience */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                    Work Experience
                  </h4>
                  <div className="space-y-3">
                    {profile.experiences.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{exp.title} — {exp.company}</span>
                          <span className="font-mono text-slate-500 text-[10px]">
                            {exp.startDate} - {exp.endDate || 'Present'}
                          </span>
                        </div>
                        <ul className="list-disc list-inside text-slate-600 space-y-0.5 mt-1 text-[11px]">
                          {exp.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Key Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skills.map((s) => (
                      <span key={s.id} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-700">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
              Select or upload a resume to inspect.
            </div>
          )}
        </div>
      </div>

      {/* Upload / Create Resume Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Upload or Create Resume</h3>
              <button onClick={() => setShowUploadModal(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resume Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend / Full-Stack"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Role / Domain
                </label>
                <input
                  type="text"
                  placeholder="e.g. Staff Design Technologist"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Profile Focus Summary
                </label>
                <textarea
                  rows={3}
                  placeholder="Custom summary highlighting specific keywords..."
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                >
                  Save to Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
