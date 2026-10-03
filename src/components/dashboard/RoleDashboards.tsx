"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ResourceEmpty, ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { DashboardSection, formatSchoolDay, SummaryCard, TaskLink } from "@/components/dashboard/DashboardParts";
import { academicsApi } from "@/lib/api/academics";
import { enrolmentApi } from "@/lib/api/enrolment";
import { peopleApi } from "@/lib/api/people";
import { teachingApi } from "@/lib/api/teaching";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";
import type { components } from "@/types/generated/school";

type Schema = components["schemas"];
type Calendar = Schema["SchoolCalendarToday"];

function SchoolDay({ calendar }: { calendar: Calendar | null }) {
  return <DashboardSection title="Today at school">
    {calendar ? <div className="space-y-2 text-sm"><div className="flex flex-wrap items-center gap-2"><span>{calendar.today.date}</span><Badge variant={calendar.today.isSchoolDay ? "default" : "secondary"}>{calendar.today.isSchoolDay ? "School day" : "Closed"}</Badge></div><p className="text-muted-foreground">{formatSchoolDay(calendar.today.dayType)}{calendar.today.period ? ` · ${calendar.today.period.displayName}` : ""}</p>{calendar.nextSchoolDay && <p>Next school day: {calendar.nextSchoolDay}</p>}</div> : <p className="text-sm text-muted-foreground">Calendar information is not available.</p>}
  </DashboardSection>;
}

export function LeadershipDashboard() {
  const { activeTenant, hasPermission } = useAuth();
  const resource = useApiResource(`${activeTenant?.id}:leadership`, async () => {
    const [years, calendar] = await Promise.all([
      academicsApi.listYears({ pageSize: 20 }),
      academicsApi.calendarToday(),
    ]);
    const current = years.items.find((year) => year.isCurrent);
    const [students, staff, classes, enrolments] = await Promise.all([
      hasPermission("students.read") ? peopleApi.listStudents({ status: "enrolled", pageSize: 1 }) : Promise.resolve(null),
      hasPermission("staff.read") ? peopleApi.listStaff({ pageSize: 1 }) : Promise.resolve(null),
      current ? academicsApi.listClasses({ academicYearId: current.id, pageSize: 1 }) : Promise.resolve(null),
      current && hasPermission("enrolment.read") ? enrolmentApi.list({ academicYearId: current.id, status: "active", pageSize: 1 }) : Promise.resolve(null),
    ]);
    return { years, calendar, students, staff, classes, enrolments };
  });
  if (resource.loading) return <ResourceLoading label="Loading school overview…" />;
  if (resource.error || !resource.data) return <ResourceError error={resource.error} retry={() => void resource.reload()} />;
  const { years, calendar, students, staff, classes, enrolments } = resource.data;
  return <div className="space-y-5">
    <p className="text-sm text-muted-foreground">{years.items.find((year) => year.isCurrent)?.label ?? "No active academic year"} · School-wide overview</p>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><SummaryCard label="Enrolled students" value={students?.totalCount} href={students ? "/students" : undefined} /><SummaryCard label="Staff records" value={staff?.totalCount} href={staff ? "/staff" : undefined} /><SummaryCard label="Classes this year" value={classes?.totalCount} href="/classes" /><SummaryCard label="Active enrolments this year" value={enrolments?.totalCount} href={enrolments ? "/enrolment" : undefined} /></div>
    <div className="grid gap-5 lg:grid-cols-2"><SchoolDay calendar={calendar} /><DashboardSection title="Review the school"><div className="space-y-2"><TaskLink href="/academics" title="Academic setup" description="Review years, grades and subjects." />{(hasPermission("data_protection.export") || hasPermission("data_protection.consents.read")) && <TaskLink href="/records" title="Data protection" description="Review consent purposes and authorized exports." />}</div></DashboardSection></div>
  </div>;
}

export function OperationsDashboard() {
  const { activeTenant, hasPermission } = useAuth();
  const resource = useApiResource(`${activeTenant?.id}:operations`, async () => {
    const [years, calendar] = await Promise.all([academicsApi.listYears({ pageSize: 20 }), academicsApi.calendarToday()]);
    const current = years.items.find((year) => year.isCurrent);
    const [classes, enrolments] = await Promise.all([
      current ? academicsApi.listClasses({ academicYearId: current.id, pageSize: 100 }) : Promise.resolve(null),
      current && hasPermission("enrolment.read") ? enrolmentApi.list({ academicYearId: current.id, status: "active", pageSize: 1 }) : Promise.resolve(null),
    ]);
    const previews = await Promise.allSettled((classes?.items ?? []).slice(0, 4).map((section) => teachingApi.sectionOverview(section.id)));
    return { current, calendar, classes, enrolments, previews };
  });
  if (resource.loading) return <ResourceLoading label="Loading school operations…" />;
  if (resource.error || !resource.data) return <ResourceError error={resource.error} retry={() => void resource.reload()} />;
  const { current, calendar, classes, enrolments, previews } = resource.data;
  const checked = previews.flatMap((result) => result.status === "fulfilled" ? [result.value] : []);
  const flagged = checked.filter((section) => section.warnings.length > 0 || Number(section.studentsMissingChoices) > 0);
  return <div className="space-y-5">
    <p className="text-sm text-muted-foreground">{current?.label ?? "No active academic year"} · Daily coordination</p>
    <div className="grid gap-4 sm:grid-cols-3"><SummaryCard label="Classes this year" value={classes?.totalCount} href="/classes" /><SummaryCard label="Active enrolments" value={enrolments?.totalCount} href={enrolments ? "/enrolment" : undefined} /><SummaryCard label="Sections checked" value={checked.length} detail="First four classes only" /></div>
    <div className="grid gap-5 lg:grid-cols-2"><SchoolDay calendar={calendar} /><DashboardSection title="Class setup checks" description="A preview of up to four sections in the current year.">{!current ? <p className="text-sm text-muted-foreground">Activate an academic year to see class checks.</p> : flagged.length ? <div className="space-y-2">{flagged.map((section) => <TaskLink key={section.classSectionId} href={`/classes/${section.classSectionId}`} title={section.name} description={[...section.warnings, Number(section.studentsMissingChoices) > 0 ? `${section.studentsMissingChoices} students missing subject choices` : ""].filter(Boolean).join(" · ")} />)}</div> : <p className="text-sm text-muted-foreground">{previews.some((result) => result.status === "rejected") ? "Some class checks could not be loaded. Open a class to review it." : "No setup warnings in the sections checked."}</p>}</DashboardSection></div>
    <DashboardSection title="Manage school operations"><div className="grid gap-2 md:grid-cols-2"><TaskLink href="/classes" title="Classes and assignments" description="Review class sections and teachers." /><TaskLink href="/enrolment" title="Enrolments" description="Place and move students." /><TaskLink href="/staff" title="Staff directory" description="Review teaching and non-teaching staff." /><TaskLink href="/calendar" title="School calendar" description="Review terms, breaks and school days." /></div></DashboardSection>
  </div>;
}

export function TeacherDashboard() {
  const { activeTenant, hasPermission } = useAuth();
  const resource = useApiResource(`${activeTenant?.id}:teacher`, async () => {
    const [teaching, calendar] = await Promise.all([teachingApi.mine(), academicsApi.calendarToday()]);
    const targets = [
      ...teaching.sections.slice(0, 2).map((section) => ({ id: section.classSectionId, sectionId: section.classSectionId, name: section.name, role: section.role, students: section.students, kind: "section" as const })),
      ...teaching.classSubjects.slice(0, 2).map((subject) => ({ id: subject.classSubjectId, sectionId: subject.classSectionId, name: `${subject.displayName} · ${subject.classSectionName}`, role: subject.role, students: subject.students, kind: "subject" as const })),
    ];
    const rosters = await Promise.allSettled(targets.map((target) => target.kind === "section"
      ? enrolmentApi.sectionRoster(target.id, { date: teaching.date, pageSize: 5 })
      : enrolmentApi.classSubjectRoster(target.id, { date: teaching.date, pageSize: 5 })));
    return { teaching, calendar, targets, rosters };
  });
  if (resource.loading) return <ResourceLoading label="Loading your teaching…" />;
  if (resource.error || !resource.data) return <ResourceError error={resource.error} retry={() => void resource.reload()} />;
  const { teaching, calendar, targets, rosters } = resource.data;
  return <div className="space-y-5">
    <div className="grid gap-4 sm:grid-cols-3"><SummaryCard label="My pastoral classes" value={teaching.sections.length} /><SummaryCard label="My class subjects" value={teaching.classSubjects.length} /><SummaryCard label="Pupils in pastoral classes" value={teaching.sections.reduce((total, section) => total + Number(section.students), 0)} /></div>
    {!teaching.staffMemberId && <DashboardSection title="Staff account not linked"><p className="text-sm text-muted-foreground">Ask a school manager to link your login to your staff record so teaching assignments appear here.</p></DashboardSection>}
    <div className="grid gap-5 lg:grid-cols-2"><SchoolDay calendar={calendar} /><DashboardSection title="My subjects" description={`Assignments for ${teaching.date}`}>{teaching.classSubjects.length ? <div className="space-y-2">{teaching.classSubjects.map((subject) => <TaskLink key={subject.classSubjectId} href={`/classes/${subject.classSectionId}`} title={`${subject.displayName} · ${subject.classSectionName}`} description={`${subject.students} pupils · ${formatSchoolDay(subject.role)}`} />)}</div> : <p className="text-sm text-muted-foreground">No subject assignments for this date.</p>}</DashboardSection></div>
    <DashboardSection title="My classes and students" description="Pupils shown here come from your assigned class and subject rosters.">{!targets.length ? <ResourceEmpty title="No classes assigned" description="Class and subject assignments are managed by the school." /> : <div className="grid gap-4 lg:grid-cols-2">{targets.map((target, index) => <div key={`${target.kind}:${target.id}`} className="rounded-lg border p-4"><div className="flex items-center justify-between gap-3"><Link className="font-semibold text-primary underline" href={`/classes/${target.sectionId}`}>{target.name}</Link><Badge variant="secondary">{target.students} pupils</Badge></div><p className="mt-1 text-xs text-muted-foreground">{formatSchoolDay(target.role)}</p>{rosters[index].status === "fulfilled" ? <div className="mt-3 space-y-1">{rosters[index].value.items.length ? rosters[index].value.items.map((entry) => <Link key={entry.student.id} href={`/students/${entry.student.id}`} className="block rounded px-2 py-1 text-sm hover:bg-muted">{entry.student.displayName} <span className="text-muted-foreground">· {entry.student.admissionNumber}</span></Link>) : <p className="text-sm text-muted-foreground">No pupils in this class today.</p>}</div> : <p className="mt-3 text-sm text-muted-foreground">Roster unavailable. Open the class to retry.</p>}</div>)}</div>}</DashboardSection>
    {hasPermission("students.read") && <TaskLink href="/students" title="Student records" description="Browse the pupils your school has assigned to you." />}
  </div>;
}

export function StaffDashboard() {
  const { activeTenant, hasPermission } = useAuth();
  const resource = useApiResource(`${activeTenant?.id}:staff`, async () => {
    const [staff, calendar] = await Promise.all([
      hasPermission("staff.read") ? peopleApi.listStaff({ pageSize: 1 }) : Promise.resolve(null),
      hasPermission("academics.read") ? academicsApi.calendarToday() : Promise.resolve(null),
    ]);
    return { member: staff?.items[0] ?? null, calendar };
  });
  if (resource.loading) return <ResourceLoading label="Loading your staff workspace…" />;
  if (resource.error || !resource.data) return <ResourceError error={resource.error} retry={() => void resource.reload()} />;
  const { member, calendar } = resource.data;
  return <div className="grid gap-5 lg:grid-cols-2"><DashboardSection title="My staff record">{member ? <div className="space-y-2 text-sm"><p className="text-lg font-semibold">{member.name.displayName}</p><p>{member.jobTitle}{member.department ? ` · ${member.department}` : ""}</p><p className="text-muted-foreground">Staff number {member.staffNumber} · {formatSchoolDay(member.employmentStatus)}</p><Link href={`/teachers/${member.id}`} className="inline-block font-medium text-primary underline">View my staff record</Link></div> : <p className="text-sm text-muted-foreground">No staff record is linked to your account. Ask a manager to connect it.</p>}</DashboardSection><SchoolDay calendar={calendar} /><DashboardSection title="Your workspace"><div className="space-y-2"><TaskLink href="/settings" title="Account settings" description="Manage your sign-in and school selection." />{hasPermission("academics.read") && <TaskLink href="/calendar" title="School calendar" description="Review school days and breaks." />}</div></DashboardSection></div>;
}

export function FinanceDashboard() {
  const { hasPermission } = useAuth();
  return <div className="grid gap-5 lg:grid-cols-2"><DashboardSection title="Finance workspace" description="A dedicated web view for bursars, accountants and finance staff."><p className="text-sm text-muted-foreground">Billing, collections, balances and reconciliation will appear when the school finance API and permissions are available. No financial amounts are shown until they come from that API.</p></DashboardSection><DashboardSection title="Available school tools"><div className="space-y-2"><TaskLink href="/settings" title="Account settings" description="Manage your account and school selection." />{hasPermission("academics.read") && <TaskLink href="/calendar" title="School calendar" description="Review school days and breaks." />}</div></DashboardSection></div>;
}
