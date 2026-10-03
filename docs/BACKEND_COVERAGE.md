# Backend-to-client coverage

Updated: 2026-10-03

| Backend area | Client API module | Live client surface | Status |
| --- | --- | --- | --- |
| Authentication, refresh, account recovery, invitations | `src/lib/api/auth.ts` | auth routes, auth provider | Live |
| Current user, tenant switching, sessions, password | `src/lib/api/auth.ts` | header and settings | Live |
| School, members, invitations | `src/lib/api/school.ts` | settings | Live |
| Students | `src/lib/api/people.ts` | students list/create/detail | Live |
| Guardians and safeguarding links | `src/lib/api/people.ts` | guardians list/create/detail; student links visible | Partly surfaced; every endpoint has a typed client wrapper |
| Staff, employment, compensation | `src/lib/api/people.ts` | staff/teachers list/create/detail | Live |
| Academic setup, years, calendar, grades, subjects, classes, templates | `src/lib/api/academics.ts` | academics, calendar, classes | Live core workflows; every endpoint has a typed client wrapper |
| Enrolment, promotion, rosters | `src/lib/api/enrolment.ts` | enrolment and class detail | Live core workflows; every endpoint has a typed client wrapper |
| Teaching assignments and class subjects | `src/lib/api/teaching.ts` | dashboard and class/staff detail | Live reads and class-subject generation; every endpoint has a typed client wrapper |
| Platform tenant administration | `src/lib/api/platform.ts` | platform | Live |
| Data protection | `src/lib/api/dataProtection.ts` | records and student detail | Live through temporary handwritten types; checked-in school OpenAPI still omits these endpoints |

Routes backed only by client prototype data are tracked in `BACKEND_REQUIREMENTS.md`. They must not be described as persisted or production-ready until their backend contracts ship.
