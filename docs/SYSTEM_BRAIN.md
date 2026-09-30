# Dirasa Client — Frontend System Brain & Complete Implementation Blueprint

This document is the engineering knowledge base, domain specification, and step-by-step implementation blueprint for `dirasa-client`, the official web client for the **Dirasa Multi-Tenant School Management System**.

---

## 1. Domain Map & Backend Alignment

The backend lives at `/home/crisstratus/dirasa`. It is a Clean Architecture .NET 10 solution using PostgreSQL, EF Core, and ASP.NET Core.

### 1.1 Architectural Pillars

1. **Multi-Tenancy**:
   - Each school is an isolated tenant.
   - Users authenticate with global credentials (`/api/v1/auth/login`) and receive their user profile, active tenant, and accessible memberships (`/api/v1/me`).
   - The active school can be switched on the fly via `POST /api/v1/auth/switch-tenant` without signing out.
2. **Security & Web Client Guard**:
   - Web clients MUST pass the HTTP header `X-Dirasa-Client: web` on every request.
   - Refresh tokens are managed via an `HttpOnly`, `SameSite=Lax`, `Secure` cookie named `__Host-dirasa_rt`.
   - Access tokens are short-lived JWTs held in memory.
   - The frontend generates a unique `X-Correlation-Id` on requests for end-to-end tracing.
3. **Data Scopes & RBAC**:
   - Authorization is based on explicit permission keys (e.g. `students.read`, `attendance.take`, `finance.billing.manage`), NOT role names.
   - Permissions operate under 4 scopes:
     - `All`: School-wide access (Principals, Managers, Bursars).
     - `AssignedClasses` (AC): Limited to students and sections assigned to that teacher.
     - `LinkedChildren` (LC): Limited to children linked to that verified guardian.
     - `Self`: Limited to the authenticated user's own record (payslips, student timetable, own inbox).
4. **Safeguarding & Custody Restrictions**:
   - Guardians connect to students via `GuardianLink`.
   - Links must be `Verified` before any data is accessible.
   - Active restrictions (`NoRecordAccess`, `NoContact`, `NoCollection`) immediately block access to academic, attendance, financial, and communication data.
   - In accordance with child protection policies, even emergency broadcasts are suppressed under `NoRecordAccess` or `NoContact` to prevent location exposure.
5. **Optimistic Concurrency Control**:
   - Modifiable entities track an `xmin uint` version token (`Version` in C#, `version` in JSON).
   - All update (`PUT`) and mutation commands must send `version`. A mismatch returns HTTP `409 Conflict` with `code: "concurrency_conflict"`.
6. **Multi-Lingual & RTL/LTR First**:
   - First-class support for Arabic (`ar`), English (`en`), French (`fr`), and Swahili (`sw`).
   - Names and descriptions use `LocalizedText` (JSON object with required `"en"` key and optional canonical BCP-47 keys like `"ar": "الصف الأول"`).
   - Layout strictly uses CSS logical properties (`ps-`, `pe-`, `ms-`, `me-`, `text-start`, `text-end`) and dynamic `dir="rtl"` / `dir="ltr"` HTML attributes.
7. **Currencies & Financial Ledger**:
   - Amounts are exact decimals paired with ISO 4217 currencies (e.g. `AED`, `KES`, `NGN`, `USD`, `GBP`).
   - Integrations for East African M-Pesa STK push and West/South African Paystack gateways.

---

## 2. API Endpoints & Contracts Directory

### 2.1 Authentication & Profile (`api/v1/auth`, `api/v1/me`)
- `POST /api/v1/auth/login`: `{ identifier, password, clientType: "web", rememberMe, tenantId? }` -> `TokenResponse { accessToken, expiresIn, tokenType, tenantId, roles, permissions }` + sets refresh cookie.
- `POST /api/v1/auth/refresh`: Uses cookie -> Returns fresh `TokenResponse` + rotates cookie.
- `POST /api/v1/auth/logout`: Clears cookie and invalidates session.
- `POST /api/v1/auth/switch-tenant`: `{ tenantId }` -> Switches session school context.
- `POST /api/v1/auth/password/forgot`: `{ email }` -> Sends reset email with link to `/reset-password#uid=...&token=...`.
- `POST /api/v1/auth/password/reset`: `{ userId, token, newPassword }` -> Sets new password.
- `POST /api/v1/auth/invitations/accept`: `{ tenantId, token, displayName?, password? }` -> Accepts invitation and creates/links account.
- `GET /api/v1/me`: Returns profile, active tenant, platform roles, tenant roles, effective permissions, and school memberships list.
- `POST /api/v1/me/password`: `{ currentPassword, newPassword }` -> Changes password.

### 2.2 School Administration (`api/v1/school`)
- `GET /api/v1/school`: School profile (name, slug, countryCode, subdivisionCode, timeZone, defaultCulture, currency).
- `GET /api/v1/school/members`: Paged list of school members.
- `PUT /api/v1/school/members/{id}/roles`: Change member roles (requires `version`).
- `POST /api/v1/school/members/{id}/suspend` & `reactivate`: Suspend/unsuspend member.
- `DELETE /api/v1/school/members/{id}?version=...`: Remove member from school.
- `POST /api/v1/school/invitations`: Invite new member by email with specified roles.
- `GET /api/v1/school/invitations`: List pending invitations.
- `DELETE /api/v1/school/invitations/{id}`: Revoke invitation.

### 2.3 People & Safeguarding (`api/v1/school/people`)
- **Students**:
  - `GET /api/v1/school/students`: Filter by `search`, `status` (`Enrolled`, `Withdrawn`, `Graduated`), page/pageSize.
  - `GET /api/v1/school/students/{id}`: Full student details including national identifiers and custody links.
  - `POST /api/v1/school/students`: Create student record.
  - `PUT /api/v1/school/students/{id}`: Update student details.
  - `POST /api/v1/school/students/{id}/withdraw` & `graduate`: Record leaving date and reason.
  - `POST /api/v1/school/students/{id}/identifiers`: Add official ID (Passport, National ID, Birth Certificate).
  - `POST /api/v1/school/students/{id}/account-link`: Link student to their own login account.
- **Guardians & Links**:
  - `GET /api/v1/school/guardians`: List parents/carers/sponsors.
  - `GET /api/v1/school/students/{studentId}/guardians`: List links for a student.
  - `POST /api/v1/school/guardian-links`: Link guardian to student with relationship type and correspondence flag.
  - `POST /api/v1/school/guardian-links/{id}/verify` & `reject`: Verification workflow.
  - `POST /api/v1/school/guardian-links/{id}/restrict`: Apply custody restrictions (`noRecordAccess`, `noCollection`, `noContact`, dates, court notes).
- **Staff**:
  - `GET /api/v1/school/staff`: Filter by `category` (`Teaching`, `NonTeaching`), `employmentStatus`.
  - `GET /api/v1/school/staff/{id}`: Contract terms, FTE, hours, status.
  - `GET /api/v1/school/staff/{id}/compensation`: Read base pay and frequency (`payroll.read_own` or `payroll.read`).

### 2.4 Academic Setup (`api/v1/school/academics`)
- `GET /api/v1/school/academics/years`: Academic years and periods (Terms/Semesters).
- `POST /api/v1/school/academics/years`: Create year with working week JSON and label format.
- `POST /api/v1/school/academics/years/{id}/activate`: Set active academic year.
- `GET /api/v1/school/academics/calendar`: Compute day status, delivery mode, and bell schedule overrides.
- `GET /api/v1/school/academics/stages` & `grade-levels`: Academic stages (Primary, Secondary) and grade levels.
- `GET /api/v1/school/academics/subjects`: School subject catalogue.
- `GET /api/v1/school/academics/classes`: Class sections (homerooms) and class subjects (teaching groups).
- `POST /api/v1/school/academics/templates/apply`: Apply curriculum template (British, US Common Core, Kenya CBC, Nigerian NERDC, etc.).

### 2.5 Enrolment & Teaching (`api/v1/school/enrolment`)
- Student year enrolment & grade assignments.
- Class placements with start/end dates and section capacity tracking.
- Elective subject choices for students.
- Teaching assignments (Lead Teacher, Co-Teacher, Assistant) per class subject.
- Homeroom/Class Teacher assignments for pastoral care.

### 2.6 Attendance Management (`api/v1/school/attendance`)
- AM/PM Daily registers & Per-Lesson registers.
- Statutory attendance codes (Present, Approved Activity, Authorised Absence, Unauthorised Absence, Late).
- Guardian absence notes review (Approve/Reject with evidence flags).
- Automated unexplained absence alert dispatch buffer.
- Follow-up queues for persistent absence (≥ 10%) and severe absence (≥ 50%).

### 2.7 Timetable & Events (`api/v1/school/timetable`, `events`)
- Physical & online rooms with capacity and clash checks.
- Bell schedules with sequence, times, and Ramadan/exam variants.
- Cycle timetable generator (e.g. 5-day cycle, 10-day cycle).
- Daily substitute cover board for teacher absences.
- School calendar events with audience targeting (School, Grade, Section, Roles).

### 2.8 Gradebook & Report Cards (`api/v1/school/grading`, `report-cards`)
- 13 national and international grading scales.
- Class subject gradebook with weighted assessment categories and items.
- Moderation workflow: Draft -> Submitted -> Approved / Returned -> Locked.
- Subject comments & homeroom teacher pastoral comments.
- Localized PDF report cards with automated attendance statistics.
- Official exam candidacies and candidate numbers.

### 2.9 Finance & Payments (`api/v1/school/finance`)
- Fee catalogue, fee categories, payment plans, instalment schedules.
- Split billing between multiple guardians/sponsors.
- Billing runs: automated draft invoice generation and batch issuing.
- Immutable double-entry financial ledger (invoices, credit notes, payments, allocations).
- M-Pesa STK push & Paystack checkout.
- Arrears tracking and statement exports.

### 2.10 Admissions Pipeline (`api/v1/school/admissions`, `api/v1/public/admissions`)
- Public admissions portal (`/apply/[schoolSlug]/[formSlug]`).
- Pipeline stages: Enquiry -> Applied -> Assessment -> Waitlisted -> Offered -> Accepted -> Enrolled.
- Age eligibility evaluator based on intake cut-off date.
- Applicant self-service portal (token-in-hash URL) for document uploads.
- 1-click conversion to enrolled student, verified guardians, and user invitations.
- GDPR automatic anonymization of unsuccessful submissions.

### 2.11 Communication & Notifications (`api/v1/school/communication`)
- Announcements composer with audience targeting and read receipts.
- Student pastoral/behavior notes with visibility levels (Staff only vs Guardians visible).
- Guardian <-> staff 1:1 messaging threads with administrative moderation.
- Unified notification dispatcher (in-app inbox, email, SMS).

---

## 3. Frontend Architecture

### 3.1 Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI & Styling**: React 19, Tailwind CSS v4, Lucide Icons, `clsx`, `tailwind-merge`
- **Networking**: Custom Fetch API Client with automatic interceptors, token refresh, and ProblemDetails parsing

### 3.2 Key Directories
```
src/
├── app/
│   ├── (auth)/             # Login, password reset, invitation accept
│   ├── (public)/           # Public admissions portal
│   └── (app)/              # Authenticated school portal
│       └── [tenantSlug]/
│           ├── dashboard/
│           ├── people/
│           ├── academics/
│           ├── enrolment/
│           ├── attendance/
│           ├── timetable/
│           ├── gradebook/
│           ├── finance/
│           ├── admissions/
│           ├── communication/
│           └── settings/
├── components/
│   ├── ui/                 # Atomic UI primitives
│   ├── layout/             # Shell, Sidebar, Header, SchoolSwitcher
│   └── shared/             # ProblemDetails alert, LocalizedText, ConcurrencyModal
├── lib/
│   ├── api/                # API client, types, error handling
│   ├── auth/               # Session & token store
│   └── i18n/               # Multi-language & RTL configuration
└── types/                  # TypeScript interfaces matching .NET backend
```

---

## 4. Multi-Phase Implementation Plan

- [x] **Phase 0**: Architecture Discovery, System Brain Documentation, and Foundation Setup.
- [ ] **Phase 1**: Core Auth & Session Management (Login, Password Recovery, Accept Invitation, Tenant Switcher, Typed API Client).
- [ ] **Phase 2**: People & Safeguarding Management (Student 360, Staff Directory & Pay, Guardians & Custody Restrictions).
- [ ] **Phase 3**: Academic Setup & Structure (Years, Terms, Working Week, Breaks, Stages, Grade Levels, Subjects, Curriculum Templates).
- [ ] **Phase 4**: Enrolment & Teaching Assignments (Class Placements, Electives, Teacher Assignments, Homeroom Tutors).
- [ ] **Phase 5**: Timetable Engine & Daily Attendance Registers (AM/PM & Lesson registers, Bell Schedules, Substitute Cover Board).
- [ ] **Phase 6**: Gradebook, Moderation & Report Cards (Weighted Assessments, Moderation Pipeline, Multi-lingual Report Card Generator).
- [ ] **Phase 7**: Finance, Invoicing & Regional Payments (Fee Plans, Billing Runs, Ledger, M-Pesa & Paystack Gateways).
- [ ] **Phase 8**: Admissions Funnel & Public Application Portal (Public Forms, Pipeline Kanban, 1-Click Conversion).
- [ ] **Phase 9**: Communication Center, Pastoral Notes & Guardian Messaging (Announcements, Notes, 1:1 Threads, Notifications).
