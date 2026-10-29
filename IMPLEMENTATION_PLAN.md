# ParroFill — Comprehensive Implementation Plan

**Objective**: Elevate ParroFill into a secure, production-ready full-stack SaaS platform with database persistence, server-enforced authentication, robust AI quota controls, and a verified Chrome extension.

---

## Phase 1: Repository Audit & Baseline Verification (Completed)
- [x] Inspect project directory and dependencies.
- [x] Verify existing Vite, Express, Tailwind, and `@google/genai` integration.
- [x] Document architecture and security gaps in `PROJECT_AUDIT.md`.
- [x] Configure `.env.example` with safe placeholder definitions.

---

## Phase 2: Baseline Execution Checks (Completed)
- [x] Verify Node.js v22 environment compatibility.
- [x] Run `compile_applet` and verify 0 TypeScript compilation errors.
- [x] Run `lint_applet` and verify 0 syntax/lint errors.

---

## Phase 3: Critical Architecture Fixes & Server Modularization
- [ ] Create a dedicated server modular architecture:
  - `server/db.ts`: Robust database layer (SQLite with WAL mode and atomic statements) handling users, profiles, resumes, applications, cover letters, subscriptions, and audit logs.
  - `server/auth.ts`: Password hashing (`crypto.scrypt`), JWT session token generation, verification middleware, and RBAC.
  - `server/ai.ts`: Gemini AI client with strict tier quota tracking and usage counters.
  - `server/routes/`: RESTful routes for `/api/auth/*`, `/api/profile/*`, `/api/resumes/*`, `/api/applications/*`, `/api/extension/*`, `/api/billing/*`, and `/api/admin/*`.

---

## Phase 4: Real Database Persistence & User Isolation
- [ ] Implement database tables:
  - `users` (id, email, password_hash, salt, name, role, plan, quota_used, created_at)
  - `profiles` (user_id, data_json, updated_at)
  - `resumes` (id, user_id, title, target_role, file_name, file_size, summary, is_default, updated_at)
  - `applications` (id, user_id, company, position, stage, salary, location, notes, interview_date, created_at)
  - `cover_letters` (id, user_id, company, job_title, tone, content, created_at)
  - `extension_tokens` (id, user_id, token, last_used_at, created_at)
  - `subscriptions` (user_id, plan_id, status, current_period_end, cancel_at_period_end)
- [ ] Wire server-side authorization: each user only accesses their own records.
- [ ] Connect `AppContext.tsx` on the frontend to fetch and persist data to these REST endpoints with optimistic updates and fallback offline support.

---

## Phase 5: Complete AI Integrations & Quota Enforcement
- [ ] Enforce subscription limits at server API boundary:
  - Free tier: 15 AI actions/month.
  - Pro tier: Unlimited AI actions.
  - Career tier: Unlimited + priority speed.
- [ ] Input validation and output sanitization for prompt injection defense.
- [ ] Maintain resilient fallback when `GEMINI_API_KEY` is omitted or rate-limited.
- [ ] Track token and session usage in the database per user and platform-wide for admin analytics.

---

## Phase 6: Chrome Extension Production Hardening
- [ ] Add `/api/extension/sync` endpoint that authenticates via Extension Sync Token or user credentials and returns the current profile & default resume.
- [ ] Update `/public/extension/popup.js` and `content.js` to allow pasting or entering a sync code, saving to `chrome.storage.local`, and pulling real-time data from ParroFill Cloud.
- [ ] Test form detection on supported platforms: Workday, Greenhouse, Lever, Ashby, LinkedIn, Indeed, Taleo, Google Forms.
- [ ] Update `src/utils/extensionZip.ts` to automatically bundle the logged-in user's active sync credentials into the downloaded extension.

---

## Phase 7: Subscription Business Model & Payment Integration
- [ ] Create `/api/billing/checkout` and `/api/billing/webhook` simulation routes for test-mode payment processing.
- [ ] Support plan upgrades, downgrades, and cancellations.
- [ ] Provide configurable pricing from the Admin Dashboard, stored in the database.

---

## Phase 8: Security, Privacy & Quality Assurance
- [ ] Configure security headers, CORS origin restriction, rate limiting.
- [ ] Create automated test script (`tests/api.test.ts` or standalone verification suite).
- [ ] Update `PROGRESS.md` with test output and verification records.

---

## Phase 9: Deployment & Chrome Web Store Release Guide
- [ ] Document production hosting instructions (Hostinger, Cloud Run, VPS, Docker).
- [ ] Prepare Chrome Web Store developer submission package with asset specifications and privacy disclosures.
- [ ] Final comprehensive acceptance report.
