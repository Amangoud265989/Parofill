export type ViewMode = 'landing' | 'dashboard' | 'admin';

export type DashboardTab =
  | 'overview'
  | 'profile'
  | 'resumes'
  | 'tailor'
  | 'cover-letter'
  | 'jobs'
  | 'applications'
  | 'assistant'
  | 'extension'
  | 'settings'
  | 'billing';

export interface WorkExperience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: string;
  endYear: string;
  gradeOrGpa?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'technical' | 'design' | 'management' | 'tool' | 'soft';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: 'Basic' | 'Conversational' | 'Professional' | 'Fluent' | 'Native';
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  headline: string;
  summary: string;
  city: string;
  country: string;
  postalCode: string;
  preferredCurrency: string;
  dateFormat: string;
  workAuthorization: string;
  linkedInUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  personalWebsiteUrl: string;
  experiences: WorkExperience[];
  education: EducationItem[];
  skills: SkillItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
  languages: LanguageItem[];
}

export interface ResumeDocument {
  id: string;
  title: string;
  targetRole: string;
  fileName: string;
  fileSize: string;
  updatedAt: string;
  isDefault: boolean;
  contentSummary: string;
  skillsExtracted: string[];
}

export type ApplicationStage = 'saved' | 'applied' | 'screening' | 'interview' | 'offer' | 'rejected';

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  isRemote: boolean;
  salary?: string;
  jobUrl?: string;
  stage: ApplicationStage;
  dateApplied: string;
  resumeUsedId?: string;
  resumeUsedTitle?: string;
  coverLetterSnippet?: string;
  contactPerson?: string;
  contactEmail?: string;
  interviewDate?: string;
  notes: string;
  matchScore: number;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  type: 'Full-time' | 'Contract' | 'Part-time' | 'Internship';
  experienceLevel: 'Entry' | 'Mid-Level' | 'Senior' | 'Lead';
  salaryRange: string;
  postedDate: string;
  description: string;
  requiredSkills: string[];
  matchScore?: number;
  source: string;
}

export interface CoverLetterDoc {
  id: string;
  company: string;
  jobTitle: string;
  tone: 'Professional' | 'Friendly' | 'Confident' | 'Concise';
  content: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actionSnippet?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  features: string[];
  ctaLabel: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  plan: 'Free' | 'Pro' | 'Career';
  joinedDate: string;
  applicationsCount: number;
  autofillSessions: number;
  status: 'active' | 'suspended';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  event: string;
  status: 'success' | 'warn' | 'info';
}
