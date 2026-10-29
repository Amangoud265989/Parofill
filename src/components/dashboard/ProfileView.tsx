import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile, WorkExperience, EducationItem, SkillItem, CertificationItem, ProjectItem, LanguageItem } from '../../types';
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  FolderGit2,
  Globe,
  Link2,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, showNotification } = useApp();
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [activeSection, setActiveSection] = useState<'personal' | 'experience' | 'education' | 'skills' | 'links'>('personal');

  const handleFieldChange = (field: keyof UserProfile, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = () => {
    updateProfile(formData);
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: 'New Company',
      title: 'Software Engineer',
      location: 'Remote',
      startDate: '2024-01',
      endDate: '',
      isCurrent: true,
      highlights: ['Engineered key features and improved test coverage.'],
    };
    setFormData((prev) => ({ ...prev, experiences: [newExp, ...prev.experiences] }));
  };

  const removeExperience = (id: string) => {
    setFormData((prev) => ({ ...prev, experiences: prev.experiences.filter((e) => e.id !== id) }));
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: 'University / College',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startYear: '2020',
      endYear: '2024',
    };
    setFormData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const removeEducation = (id: string) => {
    setFormData((prev) => ({ ...prev, education: prev.education.filter((e) => e.id !== id) }));
  };

  // Skills handlers
  const [newSkillName, setNewSkillName] = useState('');
  const addSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkill: SkillItem = {
      id: `sk-${Date.now()}`,
      name: newSkillName.trim(),
      category: 'technical',
      level: 'Advanced',
    };
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, newSkill] }));
    setNewSkillName('');
  };

  const removeSkill = (id: string) => {
    setFormData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Smart Reusable Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            This master profile powers all autofill actions, AI resume tailoring, and cover letters worldwide.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 whitespace-nowrap shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Navigation tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-100 rounded-xl max-w-fit">
        <button
          onClick={() => setActiveSection('personal')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeSection === 'personal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Personal & Bio</span>
        </button>

        <button
          onClick={() => setActiveSection('experience')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeSection === 'experience' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Experience ({formData.experiences.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('education')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeSection === 'education' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Education</span>
        </button>

        <button
          onClick={() => setActiveSection('skills')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeSection === 'skills' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Skills ({formData.skills.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('links')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
            activeSection === 'links' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>Professional Links</span>
        </button>
      </div>

      {/* 1. Personal Section */}
      {activeSection === 'personal' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            Personal & Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleFieldChange('firstName', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleFieldChange('lastName', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number (with country code)
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Professional Headline / Target Role
            </label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => handleFieldChange('headline', e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Professional Summary
            </label>
            <textarea
              rows={4}
              value={formData.summary}
              onChange={(e) => handleFieldChange('summary', e.target.value)}
              className="w-full p-3 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">City / Region</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleFieldChange('city', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
              <input
                type="text"
                value={formData.country}
                onChange={(e) => handleFieldChange('country', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Postal / ZIP Code</label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleFieldChange('postalCode', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Currency</label>
              <select
                value={formData.preferredCurrency}
                onChange={(e) => handleFieldChange('preferredCurrency', e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="USD">USD ($) - US Dollar</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="CAD">CAD ($) - Canadian Dollar</option>
                <option value="AUD">AUD ($) - Australian Dollar</option>
                <option value="INR">INR (₹) - Indian Rupee</option>
                <option value="SGD">SGD ($) - Singapore Dollar</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Work Authorization</label>
              <input
                type="text"
                value={formData.workAuthorization}
                onChange={(e) => handleFieldChange('workAuthorization', e.target.value)}
                placeholder="e.g. Authorized to work in US / Canada, Visa sponsorship required, etc."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. Experience Section */}
      {activeSection === 'experience' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Work History</h3>
              <p className="text-xs text-slate-500">Add past and current employment records</p>
            </div>
            <button
              onClick={addExperience}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Experience</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.experiences.map((exp, index) => (
              <div key={exp.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">Position #{index + 1}</span>
                  <button
                    onClick={() => removeExperience(exp.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...formData.experiences];
                        updated[index].company = e.target.value;
                        setFormData((prev) => ({ ...prev, experiences: updated }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => {
                        const updated = [...formData.experiences];
                        updated[index].title = e.target.value;
                        setFormData((prev) => ({ ...prev, experiences: updated }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => {
                        const updated = [...formData.experiences];
                        updated[index].location = e.target.value;
                        setFormData((prev) => ({ ...prev, experiences: updated }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Start Date (YYYY-MM)</label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => {
                        const updated = [...formData.experiences];
                        updated[index].startDate = e.target.value;
                        setFormData((prev) => ({ ...prev, experiences: updated }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">End Date (or Present)</label>
                    <input
                      type="text"
                      value={exp.isCurrent ? 'Present' : exp.endDate}
                      onChange={(e) => {
                        const updated = [...formData.experiences];
                        updated[index].endDate = e.target.value;
                        setFormData((prev) => ({ ...prev, experiences: updated }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Key Accomplishments & Bullet Points (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={exp.highlights.join('\n')}
                    onChange={(e) => {
                      const updated = [...formData.experiences];
                      updated[index].highlights = e.target.value.split('\n');
                      setFormData((prev) => ({ ...prev, experiences: updated }));
                    }}
                    className="w-full p-2 text-xs rounded border border-slate-200 bg-white leading-relaxed"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Education Section */}
      {activeSection === 'education' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Education & Degrees</h3>
              <p className="text-xs text-slate-500">Degree details autofill university and higher-ed fields</p>
            </div>
            <button
              onClick={addEducation}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Degree</span>
            </button>
          </div>

          <div className="space-y-4">
            {formData.education.map((edu, index) => (
              <div key={edu.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800">Institution #{index + 1}</span>
                  <button
                    onClick={() => removeEducation(edu.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[index].institution = e.target.value;
                        setFormData((prev) => ({ ...prev, education: updated }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[index].degree = e.target.value;
                        setFormData((prev) => ({ ...prev, education: updated }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Field of Study</label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[index].fieldOfStudy = e.target.value;
                        setFormData((prev) => ({ ...prev, education: updated }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Graduation Year</label>
                    <input
                      type="text"
                      value={edu.endYear}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[index].endYear = e.target.value;
                        setFormData((prev) => ({ ...prev, education: updated }));
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">GPA / Grade</label>
                    <input
                      type="text"
                      value={edu.gradeOrGpa || ''}
                      onChange={(e) => {
                        const updated = [...formData.education];
                        updated[index].gradeOrGpa = e.target.value;
                        setFormData((prev) => ({ ...prev, education: updated }));
                      }}
                      placeholder="e.g. 3.8 / 4.0 or First Class"
                      className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Skills Section */}
      {activeSection === 'skills' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Skills & Competencies</h3>
            <p className="text-xs text-slate-500">Used for ATS compatibility matching and keyword density</p>
          </div>

          {/* Add skill input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. GraphQL, Kubernetes, Figma, Python..."
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-500"
            >
              Add Skill
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {formData.skills.map((skill) => (
              <div
                key={skill.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800"
              >
                <span>{skill.name}</span>
                <span className="text-[10px] text-slate-400">({skill.level})</span>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-slate-400 hover:text-rose-600 ml-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Professional Links */}
      {activeSection === 'links' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">Professional URLs & Social Presence</h3>
            <p className="text-xs text-slate-500">Automatically mapped into application link inputs</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
              <input
                type="url"
                value={formData.linkedInUrl}
                onChange={(e) => handleFieldChange('linkedInUrl', e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Profile</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => handleFieldChange('githubUrl', e.target.value)}
                placeholder="https://github.com/username"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Portfolio / Work Showcase</label>
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => handleFieldChange('portfolioUrl', e.target.value)}
                placeholder="https://myportfolio.dev"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Personal Website or Blog</label>
              <input
                type="url"
                value={formData.personalWebsiteUrl}
                onChange={(e) => handleFieldChange('personalWebsiteUrl', e.target.value)}
                placeholder="https://notes.domain.com"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
