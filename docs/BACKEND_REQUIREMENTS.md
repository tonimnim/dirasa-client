# Backend requirements from the current client UI

Updated: 2026-10-03

This file is the handoff from `dirasa-client` to the backend. It lists product flows already represented by client routes but not exposed by the checked-in backend API. It is intentionally separate from `BACKEND_COVERAGE.md`: an item here is a requirement, not a working integration.

## Contract rules for every new module

- Publish the endpoints and schemas in the checked-in OpenAPI documents under `../dirasa/docs/api/` before the client integrates them.
- Keep tenant isolation and return `404` for records outside the caller's permitted data scope.
- Define read and manage permissions, including `AssignedClasses`, `LinkedChildren`, or `Self` scopes where the data calls for them.
- Return paged list resources with stable filtering and ordering. Mutable resources need a `version` concurrency token and must return `409 concurrency_conflict` for stale writes.
- Support `Idempotency-Key` on creates, bulk actions, payment initiation, message sends, exports, and other safely repeatable commands.
- Use school-local dates and the school's IANA time zone. Money must carry an ISO 4217 currency and an exact decimal amount.
- Files need short-lived upload/download URLs, tenant-bound object keys, content type and size validation, malware scanning state, and authorization on every download.
- Safeguarding restrictions must be enforced in the service layer. A guardian with `NoRecordAccess` or `NoContact` must not receive protected data or messages.

## P0: daily school operations

### Attendance — `/attendance`

The UI needs daily AM/PM and lesson attendance registers.

- Register queries by date and class section or class subject, returning the dated roster, current marks, lock state, and last editor.
- Bulk upsert marks: present, late, authorised absence, unauthorised absence, with minutes late and an optional reason/note.
- Submit, reopen, and lock a register with optimistic concurrency and an audit trail.
- Attendance summaries by student, class, grade, and date range; persistent-absence calculation.
- Absence notification jobs with per-recipient delivery status and safeguarding suppression reasons.
- Suggested permissions: `attendance.read`, `attendance.take`, `attendance.manage`, with assigned-class and linked-child scopes.

### Timetable and events — `/timetable`, `/calendar/new`

The existing academic calendar API evaluates school days, but it does not schedule lessons or events.

- Rooms/resources with capacity and availability.
- Timetable cycles, periods/bells, and dated validity ranges.
- Single and recurring lesson allocations joining class subject, section, teacher, room, weekday/cycle day, start, and end.
- School events and milestones with audience visibility.
- Conflict preview and enforced collision checks for teachers, sections, and rooms.
- List endpoints by date range, teacher, student, class, and room; copy/publish/lock a timetable version.
- Suggested permissions: `timetable.read`, `timetable.manage`, `events.read`, `events.manage`.

### Assessment, gradebook, moderation, and report cards — `/gradebook`, `/grading`

- School grading scales and boundaries, including localized labels and pass/fail semantics.
- Assessment categories and weights per class subject and academic period.
- Assessments with maximum mark, due/date taken, visibility, and status.
- Bulk score entry, absent/exempt flags, teacher comments, validation, and computed totals.
- Moderation workflow: draft, submit, return, approve, lock, reopen; preserve reviewer comments and audit history.
- Report-card templates, generation jobs, per-student previews, publish/unpublish, guardian visibility, and PDF download.
- Transcript/permanent-result views that remain available after an enrolment ends.
- Suggested permissions: `assessment.read`, `assessment.mark`, `assessment.moderate`, `reports.publish`, with assigned-class and linked-child scopes.

### Fees, invoices, payments, and ledger — `/fees`, `/fees/new`, `/finance`

- Fee catalogs and fee structures by academic year, grade, term, and optional service.
- Invoice creation for one student or a bulk cohort, line items, discounts, credits, due dates, voiding, and immutable numbering.
- Payer allocation/split billing across verified guardians or sponsors.
- Accounts receivable list with paid, partial, overdue, draft, and void states plus aging totals.
- Payment recording and allocation; refunds, reversals, receipts, and an append-only ledger.
- M-Pesa STK initiation/status/callback reconciliation and Paystack checkout/verification. The client must receive an opaque provider reference and status, never card details.
- Cash/bank payment approval and reconciliation with teller/reference uniqueness.
- Statements and receipt PDFs by student/payer.
- Suggested permissions: `finance.read`, `finance.billing.manage`, `finance.payments.manage`, `finance.reconcile`, plus linked-child/self scopes.

### Admissions and public applications — `/admissions`, `/apply/[schoolSlug]`

- Public school lookup by slug exposing only published admissions branding, open intakes, grades, deadlines, requirements, and supported cultures.
- Draft application create/resume using a secure applicant token; student, guardian, prior-school, medical/support, and consent sections.
- Direct document upload with document type, verification state, rejection reason, and resubmission.
- Idempotent final submission and a human-readable reference code; status lookup without exposing other applicants.
- Staff applicant queue with search/filter/pagination and a configurable stage workflow.
- Notes, tasks, interviews, document verification, offers, accept/decline/waitlist/reject/withdraw actions, and a complete audit trail.
- Atomic conversion of an accepted application into student, guardians, verified links, and optionally an enrolment. Return the created identifiers and handle duplicate people.
- Suggested permissions: `admissions.read`, `admissions.review`, `admissions.manage`; public endpoints require rate limiting and abuse protection.

## P1: engagement and compliance

### Announcements, pastoral notes, and messaging — `/communication`, `/messages`

- Audience targeting by school, role, grade, class, or explicit recipients, with a server-side preview count.
- Announcement drafts, scheduling, publishing, expiry, attachments, priority, and in-app/email/SMS channels.
- Delivery state per recipient/channel, retry state, read receipts, and aggregate metrics.
- Pastoral notes tied to a student, typed as positive/concern/incident/award, with visibility, points, follow-up state, and restricted/confidential access.
- Guardian/staff/student conversation threads, participants, messages, attachments, unread counts, archive/mute, and pagination/cursors.
- Enforce custody/no-contact restrictions when resolving recipients and return suppression counts without leaking protected identities.
- Suggested permissions: `communications.read`, `communications.send`, `pastoral.read`, `pastoral.manage`, plus linked-child/self scopes.

### Files and official records — `/files`, `/records`

- Folder taxonomy and document metadata: owner, category, tags, description, retention class, confidentiality, checksum, size, MIME type, and scan status.
- Upload session, finalize, list/search/filter, version replacement, archive/delete, and short-lived authorized download.
- Link a document to students, staff, guardians, applications, messages, assessments, or school-wide policies without copying the file.
- Official record lifecycle: draft, verified, archived, superseded; verifier identity/time and tamper-evident audit history.
- Transcript/certificate generation and batch archive export jobs with status and expiring downloads.
- Suggested permissions: `files.read`, `files.manage`, `records.read`, `records.certify`; confidential records need a separate grant.

### Reports and exports — `/reports`

- Report catalog describing parameters, formats, required permission, and whether the report is synchronous or a background job.
- Attendance summaries, academic broadsheets, transcripts, fee aging, payment reconciliation, enrolment/staff census, and statutory exports.
- Start/export job, poll status/progress, cancel, and download an expiring artifact.
- CSV/XLSX/PDF plus regulator-specific XML where applicable. Include school time zone, filters, generation time, and data-as-of time.
- Suggested permissions should compose the source-domain read permission with `reports.export`; report jobs must re-check scope when executed.

### Family households — `/families`

The shipped guardian links model covers safeguarding relationships but not a household/account grouping shown in this UI.

- Household/family unit with display name, address, preferred language, primary billing contact, and active state.
- Add/remove existing guardians and students without replacing `GuardianLink` as the source of relationship/custody truth.
- Portal invitation/account status and resend/revoke actions.
- Consolidated family view of children, contacts, balances, messages, and restrictions, filtered by the caller's access.
- If households are not a desired domain concept, retire `/families` and use the guardian and guardian-link APIs exclusively.

### Consent and subject access contract publication

Data-protection controllers exist in backend source for consent kinds, student consent history/recording, and subject-access export, but these paths are missing from `docs/api/school.openapi.json` at this revision. Regenerate and commit the OpenAPI contract so client types can be generated rather than maintained manually.

Also needed by the records UI:

- Asynchronous/streaming export when a subject-access payload is too large for a direct JSON response.
- Erasure/restriction/correction request workflows, legal-hold and retention decisions, status history, and evidence.
- Permissions beyond the existing consent/export keys as those workflows are introduced.

## P2: fundraising and broader administration

### Donations and endowments — `/donations`

- Donors, campaigns/funds, pledges, donations, allocations, anonymous/public recognition preference, and restricted-purpose notes.
- Payment/reconciliation link to the finance ledger, receipt numbering and downloadable tax/acknowledgement receipts.
- Search and reporting by donor, campaign, date, currency, method, and reconciliation status.
- Suggested permissions: `fundraising.read`, `fundraising.manage`, `fundraising.receipts.issue`.

### School profile and branding

`GET /api/v1/school` is read-only. The settings and public application experiences need:

- Update school name, subdivision, time zone, default culture, currency, contact details, and admissions/public-profile fields with a version token.
- Logo/crest and brand asset upload through the file service.
- Published public profile by school slug if the backend is intended to drive school-specific public pages.

### Notifications and dashboard aggregates

The header currently has a notification affordance and domain pages need reliable counts.

- Notification inbox, unread count, mark read/all read, deep-link target, and realtime or polling cursor.
- A scoped dashboard summary endpoint for student/staff/enrolment/class counts and current school-day/teaching summary to avoid many parallel list calls.
- Do not return guessed trial/billing state; expose subscription/trial status only if the platform owns it.

## Acceptance criteria for a backend handoff

For each module, the backend handoff is ready when controller and application tests pass, permission/data-scope behavior is covered, idempotency and concurrency behavior is documented, the OpenAPI file is regenerated, example errors are stable, and any webhook/background-job lifecycle has a testable local path. The client can then regenerate types with `npm run api:generate` and replace the corresponding prototype route.
