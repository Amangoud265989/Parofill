import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  ResumeDocument,
  JobApplication,
  JobListing,
  CoverLetterDoc,
  ChatMessage,
  PricingPlan,
  AdminUser,
  AuditLog,
  ViewMode,
  DashboardTab,
  ApplicationStage,
} from '../types';

interface AppContextType {
  // Navigation & View state
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authMode: 'login' | 'signup' | 'forgot';
  setAuthMode: (mode: 'login' | 'signup' | 'forgot') => void;
  currentUser: { name: string; email: string; role: 'user' | 'admin'; plan: 'Free' | 'Pro' | 'Career' } | null;
  setCurrentUser: (user: any) => void;

  // Profile
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  profileCompletionPercentage: number;

  // Resumes
  resumes: ResumeDocument[];
  addResume: (resume: Omit<ResumeDocument, 'id' | 'updatedAt'>) => void;
  setDefaultResume: (id: string) => void;
  deleteResume: (id: string) => void;
  activeResume: ResumeDocument | undefined;

  // Applications
  applications: JobApplication[];
  addApplication: (app: Omit<JobApplication, 'id' | 'dateApplied' | 'matchScore'>) => void;
  updateApplicationStage: (id: string, stage: ApplicationStage) => void;
  updateApplication: (id: string, updates: Partial<JobApplication>) => void;
  deleteApplication: (id: string) => void;

  // Jobs
  jobs: JobListing[];
  savedJobIds: string[];
  toggleSaveJob: (id: string) => void;

  // Cover Letters
  coverLetters: CoverLetterDoc[];
  addCoverLetter: (doc: Omit<CoverLetterDoc, 'id' | 'createdAt'>) => void;
  deleteCoverLetter: (id: string) => void;

  // AI Chat
  chatMessages: ChatMessage[];
  sendAssistantMessage: (content: string) => Promise<void>;
  isAssistantThinking: boolean;
  clearChat: () => void;

  // Autofill Simulation
  autofillStats: {
    totalFieldsAutofilled: number;
    hoursSaved: number;
    sessionsCompleted: number;
  };
  incrementAutofillStats: (fieldsCount: number) => void;

  // Admin & Pricing Configuration
  pricingPlans: PricingPlan[];
  updatePricingPlan: (id: string, monthly: number, annual: number) => void;
  adminUsers: AdminUser[];
  updateUserStatus: (id: string, status: 'active' | 'suspended') => void;
  updateUserPlan: (id: string, plan: 'Free' | 'Pro' | 'Career') => void;
  auditLogs: AuditLog[];

  // Global notifications
  notification: string | null;
  showNotification: (msg: string) => void;
}

const initialProfile: UserProfile = {
  firstName: 'Aman',
  lastName: 'Goud',
  email: 'amangoud@example.com',
  phone: '+1 (555) 234-5678',
  headline: 'Senior Full-Stack & Frontend Engineer',
  summary:
    'Product-minded software engineer with 6+ years building scalable, user-centric web applications and distributed interfaces. Strong advocate for accessible design systems, resilient web performance, and collaborative agile engineering.',
  city: 'Toronto',
  country: 'Canada',
  postalCode: 'M5V 2T6',
  preferredCurrency: 'USD',
  dateFormat: 'YYYY-MM-DD',
  workAuthorization: 'Authorized to work in Canada and United States (TN eligible)',
  linkedInUrl: 'https://linkedin.com/in/amangoud',
  githubUrl: 'https://github.com/amangoud',
  portfolioUrl: 'https://amangoud.dev',
  personalWebsiteUrl: 'https://notes.amangoud.dev',
  experiences: [
    {
      id: 'exp-1',
      company: 'AuraCloud Labs',
      title: 'Senior Frontend Engineer',
      location: 'Remote / Toronto',
      startDate: '2023-01',
      endDate: '',
      isCurrent: true,
      highlights: [
        'Spearheaded redesign of core workflow console, improving client-side page load by 44% and reducing churn by 18%.',
        'Implemented enterprise-grade design system in TypeScript and Tailwind, adopted across 6 cross-functional engineering pods.',
        'Mentored 4 junior engineers and conducted technical interviews for candidate evaluations.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Veloce Commerce',
      title: 'Frontend Software Engineer',
      location: 'Vancouver, Canada',
      startDate: '2020-06',
      endDate: '2022-12',
      isCurrent: false,
      highlights: [
        'Built real-time multi-currency checkout experience supporting over $12M in monthly transaction volume.',
        'Engineered responsive web apps ensuring 100% WCAG AA accessibility compliance.',
        'Collaborated with product designers to prototype 14 new feature variations in rapid A/B testing cycles.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of Waterloo',
      degree: 'Bachelor of Science (B.Sc.)',
      fieldOfStudy: 'Computer Science & Software Systems',
      startYear: '2016',
      endYear: '2020',
      gradeOrGpa: '3.85 / 4.0',
    },
  ],
  skills: [
    { id: 'sk-1', name: 'TypeScript', category: 'technical', level: 'Expert' },
    { id: 'sk-2', name: 'React & Next.js', category: 'technical', level: 'Expert' },
    { id: 'sk-3', name: 'Node.js & Express', category: 'technical', level: 'Advanced' },
    { id: 'sk-4', name: 'Tailwind CSS', category: 'technical', level: 'Expert' },
    { id: 'sk-5', name: 'System Architecture', category: 'technical', level: 'Advanced' },
    { id: 'sk-6', name: 'REST & GraphQL APIs', category: 'technical', level: 'Advanced' },
    { id: 'sk-7', name: 'Design Systems & Figma', category: 'design', level: 'Advanced' },
    { id: 'sk-8', name: 'Agile & Team Mentorship', category: 'management', level: 'Advanced' },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      issueDate: '2023-04',
      credentialUrl: 'https://aws.amazon.com/verification',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'HyperGrid UI Library',
      description: 'High-performance virtualized data grid for React handling 100k+ rows with smooth 60fps scrolling.',
      technologies: ['TypeScript', 'React', 'CSS Subgrid', 'Jest'],
      link: 'https://github.com/amangoud/hypergrid-ui',
    },
  ],
  languages: [
    { id: 'lang-1', language: 'English', proficiency: 'Native' },
    { id: 'lang-2', language: 'French', proficiency: 'Conversational' },
  ],
};

const initialResumes: ResumeDocument[] = [
  {
    id: 'res-1',
    title: 'Senior Software Engineer (General)',
    targetRole: 'Senior Frontend / Full-Stack Engineer',
    fileName: 'Aman_Goud_Senior_Engineer_2026.pdf',
    fileSize: '142 KB',
    updatedAt: '2026-10-15',
    isDefault: true,
    contentSummary: 'Focuses on scalable web engineering, design systems, TypeScript, and high-velocity frontend architecture.',
    skillsExtracted: ['TypeScript', 'React', 'Node.js', 'Tailwind', 'Performance Optimization', 'Architecture'],
  },
  {
    id: 'res-2',
    title: 'Frontend Product Specialist',
    targetRole: 'Staff / Lead Product Engineer',
    fileName: 'Aman_Goud_Product_Engineer.pdf',
    fileSize: '138 KB',
    updatedAt: '2026-09-28',
    isDefault: false,
    contentSummary: 'Highlights A/B experimentation, UX collaboration, rapid prototyping, and checkout conversion growth.',
    skillsExtracted: ['React', 'Experimentation', 'Design Systems', 'Checkout Workflows', 'Accessibility', 'Analytics'],
  },
];

const initialApplications: JobApplication[] = [
  {
    id: 'app-1',
    company: 'Linear',
    position: 'Senior Frontend Engineer',
    location: 'Remote (Global)',
    isRemote: true,
    salary: '$165,000 - $190,000 USD',
    jobUrl: 'https://linear.app/careers/senior-frontend',
    stage: 'interview',
    dateApplied: '2026-10-18',
    resumeUsedId: 'res-1',
    resumeUsedTitle: 'Senior Software Engineer (General)',
    contactPerson: 'Sarah Jenkins (Engineering Manager)',
    interviewDate: '2026-11-03 14:00 EST',
    notes: 'Completed system design interview. Technical team praised speed and clear communication.',
    matchScore: 92,
  },
  {
    id: 'app-2',
    company: 'Stripe',
    position: 'Product Engineer - Billing UI',
    location: 'Seattle, WA / Remote',
    isRemote: true,
    salary: '$180,000 - $210,000 USD',
    jobUrl: 'https://stripe.com/jobs/product-engineer',
    stage: 'screening',
    dateApplied: '2026-10-22',
    resumeUsedId: 'res-1',
    resumeUsedTitle: 'Senior Software Engineer (General)',
    contactPerson: 'David Miller (Talent Lead)',
    notes: 'Autofilled 18 fields via ParroFill extension. Recruiter phone chat scheduled.',
    matchScore: 88,
  },
  {
    id: 'app-3',
    company: 'Figma',
    position: 'Staff Design Technologist',
    location: 'San Francisco, CA (Hybrid)',
    isRemote: false,
    salary: '$195,000 - $230,000 USD',
    jobUrl: 'https://figma.com/careers/staff-technologist',
    stage: 'offer',
    dateApplied: '2026-09-30',
    resumeUsedId: 'res-2',
    resumeUsedTitle: 'Frontend Product Specialist',
    contactPerson: 'Maya Lin (Director of Design Systems)',
    notes: 'Offer letter received! Reviewing equity package and remote flexibility options.',
    matchScore: 96,
  },
  {
    id: 'app-4',
    company: 'Notion',
    position: 'Frontend Systems Engineer',
    location: 'Remote (US & Canada)',
    isRemote: true,
    salary: '$160,000 - $185,000 USD',
    stage: 'applied',
    dateApplied: '2026-10-25',
    resumeUsedId: 'res-1',
    resumeUsedTitle: 'Senior Software Engineer (General)',
    notes: 'Applied with AI-tailored cover letter emphasizing component performance.',
    matchScore: 84,
  },
  {
    id: 'app-5',
    company: 'Vercel',
    position: 'Developer Experience Engineer',
    location: 'Remote (Worldwide)',
    isRemote: true,
    salary: '$150,000 - $180,000 USD',
    stage: 'saved',
    dateApplied: '',
    notes: 'Need to tailor resume for Next.js app router specifics before submitting.',
    matchScore: 89,
  },
  {
    id: 'app-6',
    company: 'Datadog',
    position: 'Full Stack Engineer - APM',
    location: 'New York, NY',
    isRemote: false,
    salary: '$155,000 - $175,000 USD',
    stage: 'rejected',
    dateApplied: '2026-09-12',
    notes: 'Position closed internally. Reached out for constructive feedback.',
    matchScore: 78,
  },
];

const initialJobs: JobListing[] = [
  {
    id: 'job-1',
    title: 'Staff Frontend Engineer',
    company: 'Linear',
    location: 'Remote (North America, Europe)',
    isRemote: true,
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryRange: '$170,000 - $205,000 USD',
    postedDate: '1 day ago',
    description: 'Help craft the next generation of software project management tools. You will build high-frequency keyboard navigation, offline synchronization, and frictionless team collaboration features.',
    requiredSkills: ['TypeScript', 'React', 'Design Systems', 'Performance Optimization', 'WebSockets'],
    matchScore: 94,
    source: 'ParroFill Verified Direct',
  },
  {
    id: 'job-2',
    title: 'Senior Frontend Architect',
    company: 'Canva',
    location: 'Sydney, Australia / Remote',
    isRemote: true,
    type: 'Full-time',
    experienceLevel: 'Lead',
    salaryRange: '$160,000 - $190,000 AUD',
    postedDate: '2 days ago',
    description: 'Scale our client-side editor architecture used by over 150 million monthly active users worldwide. Deep expertise in HTML Canvas, WebGL, or complex React state systems desired.',
    requiredSkills: ['TypeScript', 'React', 'HTML5 Canvas', 'Architecture', 'REST APIs'],
    matchScore: 86,
    source: 'ParroFill Verified Direct',
  },
  {
    id: 'job-3',
    title: 'Product Engineer (International Growth)',
    company: 'Shopify',
    location: 'Toronto, Canada / Remote',
    isRemote: true,
    type: 'Full-time',
    experienceLevel: 'Senior',
    salaryRange: '$150,000 - $185,000 CAD',
    postedDate: '3 days ago',
    description: 'Empower independent merchants globally. Work across checkout localization, multi-currency, and high-conversion mobile storefronts.',
    requiredSkills: ['React', 'TypeScript', 'GraphQL', 'Localization', 'Tailwind CSS'],
    matchScore: 91,
    source: 'ParroFill Verified Direct',
  },
  {
    id: 'job-4',
    title: 'Lead UI/UX Engineer',
    company: 'Raycast',
    location: 'London, UK / Remote',
    isRemote: true,
    type: 'Full-time',
    experienceLevel: 'Lead',
    salaryRange: '£95,000 - £120,000 GBP',
    postedDate: 'Just now',
    description: 'Craft buttery-smooth desktop experiences and developer extensions. Obsessive attention to micro-interactions, speed, and clean code.',
    requiredSkills: ['TypeScript', 'React', 'Node.js', 'Design Systems', 'UI/UX'],
    matchScore: 89,
    source: 'ParroFill Verified Direct',
  },
  {
    id: 'job-5',
    title: 'Full Stack Web Developer',
    company: 'Supabase',
    location: 'Singapore / Remote',
    isRemote: true,
    type: 'Full-time',
    experienceLevel: 'Mid-Level',
    salaryRange: '$120,000 - $150,000 USD',
    postedDate: '4 days ago',
    description: 'Build developer console features, database visualization tooling, and open-source cloud management interfaces.',
    requiredSkills: ['TypeScript', 'React', 'PostgreSQL', 'Tailwind CSS', 'REST APIs'],
    matchScore: 82,
    source: 'ParroFill Partner Network',
  },
];

const initialPricingPlans: PricingPlan[] = [
  {
    id: 'plan-free',
    name: 'Free Starter',
    description: 'Essential AI assistance for casual job hunters.',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      'Up to 15 AI autofill applications / month',
      '1 Reusable Smart Profile',
      'Store up to 2 Resumes',
      'Basic AI Application Assistant (20 questions / mo)',
      'Kanban Application Tracker (up to 20 jobs)',
      'Desktop Browser Extension access',
      '100% User Review & submission control',
    ],
    ctaLabel: 'Get Started Free',
  },
  {
    id: 'plan-pro',
    name: 'Pro Job Hunter',
    description: 'For active applicants seeking accelerated interviews.',
    monthlyPrice: 19,
    annualPrice: 15,
    popular: true,
    features: [
      'Unlimited AI Autofill applications',
      'Full Browser Extension integration (Workday, Greenhouse, Lever, etc.)',
      'Unlimited AI Resume Tailoring with ATS Match Scores',
      'Unlimited AI Cover Letter generation & tone adjustments',
      'Intelligent 24/7 ParroFill AI Career Assistant',
      'Global Job Search with instant compatibility match',
      'Unlimited Kanban Application Tracker & export',
      'Priority field detection & updates',
    ],
    ctaLabel: 'Start Pro Free Trial',
  },
  {
    id: 'plan-career',
    name: 'Career Accelerator',
    description: 'Maximum velocity for career transitions and international applicants.',
    monthlyPrice: 49,
    annualPrice: 39,
    features: [
      'Everything in Pro, plus:',
      'Multi-Country Visa & Global Work Authorization helpers',
      'Multi-currency compensation benchmarking',
      'Multi-language profile exports',
      'Executive interview preparation simulation with AI',
      'Automated follow-up draft generator',
      'Direct priority support channel',
    ],
    ctaLabel: 'Elevate My Career',
  },
];

const initialAdminUsers: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Aman Goud',
    email: 'amangoud@example.com',
    plan: 'Pro',
    joinedDate: '2026-08-14',
    applicationsCount: 42,
    autofillSessions: 58,
    status: 'active',
  },
  {
    id: 'usr-2',
    name: 'Marcus Vance',
    email: 'marcus.v@company.org',
    plan: 'Career',
    joinedDate: '2026-09-02',
    applicationsCount: 89,
    autofillSessions: 114,
    status: 'active',
  },
  {
    id: 'usr-3',
    name: 'Aisha Al-Mansoor',
    email: 'aisha.m@techmail.ae',
    plan: 'Pro',
    joinedDate: '2026-10-01',
    applicationsCount: 31,
    autofillSessions: 46,
    status: 'active',
  },
  {
    id: 'usr-4',
    name: 'David Kim',
    email: 'dkim@univ.edu',
    plan: 'Free',
    joinedDate: '2026-10-21',
    applicationsCount: 9,
    autofillSessions: 12,
    status: 'active',
  },
];

const initialAuditLogs: AuditLog[] = [
  { id: 'log-1', timestamp: '2026-10-29 11:42:10', actor: 'Aman Goud', event: 'Autofilled application form at Linear (14 fields)', status: 'success' },
  { id: 'log-2', timestamp: '2026-10-29 10:15:33', actor: 'Marcus Vance', event: 'Generated tailored resume for Staff Engineer role', status: 'success' },
  { id: 'log-3', timestamp: '2026-10-28 18:20:05', actor: 'System Security', event: 'Encrypted backup of profile storage completed', status: 'info' },
  { id: 'log-4', timestamp: '2026-10-28 14:02:18', actor: 'Aisha Al-Mansoor', event: 'Upgraded subscription tier to Pro (Stripe)', status: 'success' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    email: string;
    role: 'user' | 'admin';
    plan: 'Free' | 'Pro' | 'Career';
  } | null>({
    name: 'Aman Goud',
    email: 'amangoud@example.com',
    role: 'user',
    plan: 'Pro',
  });

  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [resumes, setResumes] = useState<ResumeDocument[]>(initialResumes);
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);
  const [jobs] = useState<JobListing[]>(initialJobs);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1', 'job-3']);
  const [coverLetters, setCoverLetters] = useState<CoverLetterDoc[]>([
    {
      id: 'cl-1',
      company: 'Linear',
      jobTitle: 'Senior Frontend Engineer',
      tone: 'Confident',
      content: `Dear Hiring Team at Linear,\n\nI have followed Linear's engineering philosophy for years—particularly your insistence on keyboard-first velocity, sub-100ms interactions, and thoughtful design systems. As a Senior Frontend Engineer with 6+ years building high-frequency web products, I would love to bring my technical craftsmanship to your product pod.\n\nIn my recent role at AuraCloud Labs, I led the core web architecture modernization, cutting Largest Contentful Paint by 44% and developing a strict component system now shared across six squads. I care deeply about the details: predictable state machines, flawless accessibility, and pixel-precise execution.\n\nI look forward to discussing how my experience can support your mission to build the fastest software on the planet.\n\nSincerely,\nAman Goud`,
      createdAt: '2026-10-18',
    },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      content:
        "Hello Aman! I'm ParroFill, your intelligent application assistant. I can help you tailor your resume, draft authentic answers to application questions, prepare for upcoming interviews, or optimize your cover letters. What are we working on today?",
      timestamp: '10:00 AM',
    },
  ]);
  const [isAssistantThinking, setIsAssistantThinking] = useState(false);

  const [autofillStats, setAutofillStats] = useState({
    totalFieldsAutofilled: 148,
    hoursSaved: 19.5,
    sessionsCompleted: 24,
  });

  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>(initialPricingPlans);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(initialAdminUsers);
  const [auditLogs] = useState<AuditLog[]>(initialAuditLogs);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3800);
  };

  // Helper for auth headers
  const getAuthHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('parrofill_token') : null;
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  // Load user data and state from persistent backend on mount
  useEffect(() => {
    const token = localStorage.getItem('parrofill_token');

    // 1. Fetch live pricing plans
    fetch('/api/billing/plans')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setPricingPlans(data);
        }
      })
      .catch((err) => console.log('Could not fetch pricing plans:', err));

    // 2. Fetch authenticated session
    if (token) {
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => (r.ok ? r.json() : null))
        .then((userData) => {
          if (userData && userData.user) {
            setCurrentUser(userData.user);

            // Fetch profile
            fetch('/api/profile', { headers: { Authorization: `Bearer ${token}` } })
              .then((r) => (r.ok ? r.json() : null))
              .then((profData) => {
                if (profData && profData.profile) {
                  setProfile(profData.profile);
                }
              })
              .catch(console.error);

            // Fetch resumes
            fetch('/api/resumes', { headers: { Authorization: `Bearer ${token}` } })
              .then((r) => (r.ok ? r.json() : null))
              .then((resumesData) => {
                if (Array.isArray(resumesData) && resumesData.length > 0) {
                  setResumes(resumesData);
                }
              })
              .catch(console.error);

            // Fetch applications
            fetch('/api/applications', { headers: { Authorization: `Bearer ${token}` } })
              .then((r) => (r.ok ? r.json() : null))
              .then((appsData) => {
                if (Array.isArray(appsData) && appsData.length > 0) {
                  setApplications(appsData);
                }
              })
              .catch(console.error);

            // Fetch cover letters
            fetch('/api/cover-letters', { headers: { Authorization: `Bearer ${token}` } })
              .then((r) => (r.ok ? r.json() : null))
              .then((clData) => {
                if (Array.isArray(clData) && clData.length > 0) {
                  setCoverLetters(clData);
                }
              })
              .catch(console.error);
          }
        })
        .catch((err) => console.log('Auth me check failed:', err));
    }
  }, []);

  // Calculate profile completeness score
  const calculateProfileCompletion = (): number => {
    let score = 0;
    if (profile.firstName && profile.lastName) score += 15;
    if (profile.email && profile.phone) score += 15;
    if (profile.headline && profile.summary) score += 20;
    if (profile.experiences.length > 0) score += 20;
    if (profile.skills.length >= 4) score += 15;
    if (profile.education.length > 0) score += 10;
    if (profile.linkedInUrl || profile.portfolioUrl) score += 5;
    return Math.min(score, 100);
  };

  const profileCompletionPercentage = calculateProfileCompletion();

  const updateProfile = (updated: Partial<UserProfile>) => {
    const newProfile = { ...profile, ...updated };
    setProfile(newProfile);
    showNotification('Profile updated successfully!');

    // Persist to backend database
    fetch('/api/profile', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(newProfile),
    }).catch((err) => console.error('Failed to sync profile with database:', err));
  };

  const addResume = (newResume: Omit<ResumeDocument, 'id' | 'updatedAt'>) => {
    const tempId = `res-${Date.now()}`;
    const resume: ResumeDocument = {
      ...newResume,
      id: tempId,
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setResumes((prev) => [resume, ...prev]);
    showNotification(`Resume "${resume.title}" added to your vault.`);

    // Persist to backend
    fetch('/api/resumes', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(resume),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((saved) => {
        if (saved && saved.id) {
          setResumes((prev) => prev.map((r) => (r.id === tempId ? saved : r)));
        }
      })
      .catch((err) => console.error('Failed to save resume to database:', err));
  };

  const setDefaultResume = (id: string) => {
    setResumes((prev) =>
      prev.map((r) => ({
        ...r,
        isDefault: r.id === id,
      }))
    );
    showNotification('Default resume updated.');

    fetch(`/api/resumes/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ isDefault: true }),
    }).catch(console.error);
  };

  const deleteResume = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    showNotification('Resume removed.');

    fetch(`/api/resumes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).catch(console.error);
  };

  const activeResume = resumes.find((r) => r.isDefault) || resumes[0];

  const addApplication = (newApp: Omit<JobApplication, 'id' | 'dateApplied' | 'matchScore'>) => {
    const tempId = `app-${Date.now()}`;
    const app: JobApplication = {
      ...newApp,
      id: tempId,
      dateApplied: new Date().toISOString().split('T')[0],
      matchScore: Math.floor(Math.random() * 15) + 85,
    };
    setApplications((prev) => [app, ...prev]);
    showNotification(`Added application for ${app.position} at ${app.company}.`);

    fetch('/api/applications', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(app),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((saved) => {
        if (saved && saved.id) {
          setApplications((prev) => prev.map((a) => (a.id === tempId ? saved : a)));
        }
      })
      .catch(console.error);
  };

  const updateApplicationStage = (id: string, stage: ApplicationStage) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, stage } : app))
    );
    const targetApp = applications.find((a) => a.id === id);
    if (targetApp) {
      showNotification(`Moved ${targetApp.company} to ${stage.toUpperCase()}.`);
    }

    fetch(`/api/applications/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ stage }),
    }).catch(console.error);
  };

  const updateApplication = (id: string, updates: Partial<JobApplication>) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updates } : app))
    );
    showNotification('Application details saved.');

    fetch(`/api/applications/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    }).catch(console.error);
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    showNotification('Application removed.');

    fetch(`/api/applications/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).catch(console.error);
  };

  const toggleSaveJob = (id: string) => {
    setSavedJobIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addCoverLetter = (doc: Omit<CoverLetterDoc, 'id' | 'createdAt'>) => {
    const tempId = `cl-${Date.now()}`;
    const newDoc: CoverLetterDoc = {
      ...doc,
      id: tempId,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCoverLetters((prev) => [newDoc, ...prev]);
    showNotification(`Saved cover letter for ${newDoc.company}.`);

    fetch('/api/cover-letters', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(newDoc),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((saved) => {
        if (saved && saved.id) {
          setCoverLetters((prev) => prev.map((cl) => (cl.id === tempId ? saved : cl)));
        }
      })
      .catch(console.error);
  };

  const deleteCoverLetter = (id: string) => {
    setCoverLetters((prev) => prev.filter((doc) => doc.id !== id));
    showNotification('Cover letter deleted.');

    fetch(`/api/cover-letters/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }).catch(console.error);
  };

  const sendAssistantMessage = async (content: string) => {
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsAssistantThinking(true);

    try {
      const response = await fetch('/api/gemini/assistant-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg],
          userProfile: profile,
        }),
      });

      const data = await response.json();
      const replyContent = data.reply || "I've reviewed your request. Let's make your application standout!";

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        content: `I've analyzed your question based on your ${profile.headline} profile. Always emphasize measurable achievements, lead with business outcomes, and maintain an authentic, confident voice.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsAssistantThinking(false);
    }
  };

  const clearChat = () => {
    setChatMessages([
      {
        id: 'msg-cleared',
        sender: 'assistant',
        content: "Chat cleared! What application question or career task should we tackle next?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const incrementAutofillStats = (fieldsCount: number) => {
    setAutofillStats((prev) => ({
      totalFieldsAutofilled: prev.totalFieldsAutofilled + fieldsCount,
      hoursSaved: +(prev.hoursSaved + (fieldsCount * 1.5) / 60).toFixed(1),
      sessionsCompleted: prev.sessionsCompleted + 1,
    }));
  };

  const updatePricingPlan = (id: string, monthly: number, annual: number) => {
    setPricingPlans((prev) =>
      prev.map((plan) => (plan.id === id ? { ...plan, monthlyPrice: monthly, annualPrice: annual } : plan))
    );
    showNotification('Pricing plan updated in database.');

    fetch('/api/admin/plans', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ id, monthlyPrice: monthly, annualPrice: annual }),
    }).catch(console.error);
  };

  const updateUserStatus = (id: string, status: 'active' | 'suspended') => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status } : u))
    );
    showNotification(`User account status updated to ${status}.`);
  };

  const updateUserPlan = (id: string, plan: 'Free' | 'Pro' | 'Career') => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, plan } : u))
    );
    showNotification(`User tier updated to ${plan}.`);
  };

  return (
    <AppContext.Provider
      value={{
        viewMode,
        setViewMode,
        activeTab,
        setActiveTab,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        currentUser,
        setCurrentUser,
        profile,
        updateProfile,
        profileCompletionPercentage,
        resumes,
        addResume,
        setDefaultResume,
        deleteResume,
        activeResume,
        applications,
        addApplication,
        updateApplicationStage,
        updateApplication,
        deleteApplication,
        jobs,
        savedJobIds,
        toggleSaveJob,
        coverLetters,
        addCoverLetter,
        deleteCoverLetter,
        chatMessages,
        sendAssistantMessage,
        isAssistantThinking,
        clearChat,
        autofillStats,
        incrementAutofillStats,
        pricingPlans,
        updatePricingPlan,
        adminUsers,
        updateUserStatus,
        updateUserPlan,
        auditLogs,
        notification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
