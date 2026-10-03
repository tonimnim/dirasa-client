"use client";

import Link from "next/link";
import { BookOpen, CalendarDays, GraduationCap, School, UserCheck, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { academicsApi } from "@/lib/api/academics";
import { enrolmentApi } from "@/lib/api/enrolment";
import { peopleApi } from "@/lib/api/people";
import { schoolApi } from "@/lib/api/school";
import { teachingApi } from "@/lib/api/teaching";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";

export default function DashboardPage() {
  const { activeTenant, user, hasPermission } = useAuth();
  const resource = useApiResource(`${activeTenant?.id}:dashboard`, async () => {
    const [school, today, years, students, staff, classes, enrolments, teaching] = await Promise.all([
      schoolApi.get(),
      hasPermission("academics.read") ? academicsApi.calendarToday().catch(() => null) : Promise.resolve(null),
      hasPermission("academics.read") ? academicsApi.listYears({ pageSize: 20 }) : Promise.resolve(null),
      hasPermission("students.read") ? peopleApi.listStudents({ pageSize: 1 }) : Promise.resolve(null),
      hasPermission("staff.read") ? peopleApi.listStaff({ pageSize: 1 }) : Promise.resolve(null),
      hasPermission("academics.read") ? academicsApi.listClasses({ pageSize: 1 }) : Promise.resolve(null),
      hasPermission("enrolment.read") ? enrolmentApi.list({ status: "active", pageSize: 1 }) : Promise.resolve(null),
      hasPermission("teaching.read") ? teachingApi.mine() : Promise.resolve(null),
    ]);
    return { school, today, years, students, staff, classes, enrolments, teaching };
  });
  return <AppShell header={{ title: `Welcome, ${user?.displayName?.split(" ")[0] ?? ""}`, subtitle: activeTenant?.name }}>
    {resource.loading ? <ResourceLoading label="Loading your school…" /> : resource.error || !resource.data ? <ResourceError error={resource.error} retry={() => void resource.reload()} /> : <>
      <Card className="bg-primary text-primary-foreground"><CardContent className="flex flex-wrap items-center justify-between gap-4 py-6"><div><p className="text-sm opacity-80">{resource.data.school.countryCode} · {resource.data.school.timeZone}</p><h2 className="mt-1 text-2xl font-semibold">{resource.data.school.name}</h2><p className="mt-2 text-sm opacity-80">{resource.data.years?.items.find((year) => year.isCurrent)?.label ?? "No active academic year"}</p></div><School className="size-12 opacity-70" /></CardContent></Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric href="/students" icon={Users} label="Students" value={resource.data.students?.totalCount} /><Metric href="/staff" icon={UserCheck} label="Staff" value={resource.data.staff?.totalCount} /><Metric href="/classes" icon={GraduationCap} label="Classes" value={resource.data.classes?.totalCount} /><Metric href="/enrolment" icon={BookOpen} label="Active enrolments" value={resource.data.enrolments?.totalCount} /></div>
      <div className="grid gap-5 lg:grid-cols-2"><Card><CardHeader><CardTitle className="flex items-center gap-2"><CalendarDays className="size-5" /> School day</CardTitle></CardHeader><CardContent>{resource.data.today ? <div className="space-y-3"><div className="flex items-center justify-between"><span>{resource.data.today.today.date}</span><Badge variant={resource.data.today.today.isSchoolDay ? "default" : "secondary"}>{resource.data.today.today.isSchoolDay ? "School day" : "Closed"}</Badge></div><p className="text-sm text-muted-foreground capitalize">{resource.data.today.today.dayType.replaceAll(/([A-Z])/g, " $1")}{resource.data.today.today.period ? ` · ${resource.data.today.today.period.displayName}` : ""}</p>{resource.data.today.nextSchoolDay && <p className="text-sm">Next school day: {resource.data.today.nextSchoolDay}</p>}</div> : <p className="text-sm text-muted-foreground">Academic calendar access is unavailable.</p>}</CardContent></Card><Card><CardHeader><CardTitle>My teaching</CardTitle></CardHeader><CardContent>{resource.data.teaching ? <div className="space-y-3"><p className="text-sm text-muted-foreground">{resource.data.teaching.date}</p><div className="grid grid-cols-2 gap-3"><div className="rounded-lg border p-3"><p className="text-2xl font-semibold">{resource.data.teaching.sections.length}</p><p className="text-xs text-muted-foreground">Pastoral classes</p></div><div className="rounded-lg border p-3"><p className="text-2xl font-semibold">{resource.data.teaching.classSubjects.length}</p><p className="text-xs text-muted-foreground">Class subjects</p></div></div></div> : <p className="text-sm text-muted-foreground">No linked teaching record or teaching access.</p>}</CardContent></Card></div>
    </>}
  </AppShell>;
}

function Metric({ href, icon: Icon, label, value }: { href: string; icon: typeof Users; label: string; value?: number | string }) { return <Link href={href}><Card className="h-full transition hover:ring-primary/40"><CardContent className="flex items-center gap-4"><span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"><Icon className="size-5" /></span><div><p className="text-2xl font-semibold">{value ?? "—"}</p><p className="text-sm text-muted-foreground">{label}</p></div></CardContent></Card></Link>; }
