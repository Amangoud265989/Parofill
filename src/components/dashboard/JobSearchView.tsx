import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JobListing } from '../../types';
import {
  Search,
  MapPin,
  Building,
  Briefcase,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  Wand2,
  Filter,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const JobSearchView: React.FC = () => {
  const { jobs, savedJobIds, toggleSaveJob, setActiveTab, showNotification, addApplication } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [remoteFilter, setRemoteFilter] = useState<'all' | 'remote' | 'onsite'>('all');
  const [experienceLevel, setExperienceLevel] = useState('all');

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.requiredSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocation =
      selectedLocation === 'all' || job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesRemote =
      remoteFilter === 'all' ||
      (remoteFilter === 'remote' && job.isRemote) ||
      (remoteFilter === 'onsite' && !job.isRemote);

    const matchesExp = experienceLevel === 'all' || job.experienceLevel === experienceLevel;

    return matchesSearch && matchesLocation && matchesRemote && matchesExp;
  });

  const handleApplyWithParroFill = (job: JobListing) => {
    // Automatically record to application tracker and prompt autofill
    addApplication({
      company: job.company,
      position: job.title,
      location: job.location,
      isRemote: job.isRemote,
      salary: job.salaryRange,
      stage: 'applied',
      notes: `Applied with ParroFill 1-Click assistance (${job.matchScore || 88}% match score).`,
    });

    showNotification(`Recorded application for ${job.title} at ${job.company}! Launching Autofill Simulator.`);
    setActiveTab('extension');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
          <Search className="w-3.5 h-3.5 text-emerald-600" />
          <span>Global Discovery</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Global Job Search</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Discover verified roles scored automatically against your Smart Profile. Click "Apply with ParroFill" to streamline submission.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-4">
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by job title, company, or skills (e.g. React, TypeScript, Product Manager)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Work Arrangement</label>
            <select
              value={remoteFilter}
              onChange={(e) => setRemoteFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
            >
              <option value="all">All Arrangements</option>
              <option value="remote">Remote Only</option>
              <option value="onsite">Hybrid / On-site</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Experience Level</label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
            >
              <option value="all">All Experience Levels</option>
              <option value="Entry">Entry Level</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead / Staff</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Location / Hub</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white"
            >
              <option value="all">Worldwide / Any Location</option>
              <option value="Remote">Remote</option>
              <option value="Canada">Canada</option>
              <option value="Sydney">Australia</option>
              <option value="London">United Kingdom</option>
              <option value="Singapore">Singapore</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Showing {filteredJobs.length} verified listings</span>
        <span className="text-[11px] text-slate-600">Direct ATS integrations updated daily</span>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => {
          const isSaved = savedJobIds.includes(job.id);
          return (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{job.company}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-[11px] text-slate-500 font-mono">{job.postedDate}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">{job.title}</h3>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Profile Match</div>
                      <div className="text-sm font-bold text-emerald-600 font-mono">
                        {job.matchScore || 85}% Compatible
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2 rounded-xl border transition-colors ${
                        isSaved
                          ? 'bg-amber-50 border-amber-300 text-amber-700'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700'
                      }`}
                      title={isSaved ? 'Job Saved' : 'Save Job'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Metadata Pills (unboxed text separators per constitution) */}
                <div className="py-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location}</span>
                  </div>

                  <span className="text-slate-300">·</span>

                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.type} ({job.experienceLevel})</span>
                  </div>

                  <span className="text-slate-300">·</span>

                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono">{job.salaryRange}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {job.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {job.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-600 font-mono">
                  Source: {job.source}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleApplyWithParroFill(job)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-emerald-600/20 whitespace-nowrap shrink-0"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                    <span>Apply with ParroFill</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
