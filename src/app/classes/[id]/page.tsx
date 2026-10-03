"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { academicsApi } from "@/lib/api/academics";
import { enrolmentApi } from "@/lib/api/enrolment";
import { describeApiError } from "@/lib/api/errors";
import { teachingApi } from "@/lib/api/teaching";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";

export default function ClassDetailsPage() {
  const classId = String(useParams().id);
  const { activeTenant, hasPermission } = useAuth();
  const [pending, setPending] = useState(false);
  const resource = useApiResource(`${activeTenant?.id}:${classId}`, async () => {
    const [section, overview, roster, subjects, staff] = await Promise.all([
      academicsApi.getClass(classId),
      hasPermission("teaching.read") ? teachingApi.sectionOverview(classId) : Promise.resolve(null),
      hasPermission("enrolment.read") ? enrolmentApi.sectionRoster(classId, { pageSize: 100 }) : Promise.resolve(null),
      hasPermission("teaching.read") ? teachingApi.listClassSubjects({ classSectionId: classId, pageSize: 100 }) : Promise.resolve(null),
      hasPermission("teaching.read") ? teachingApi.listSectionStaff(classId) : Promise.resolve(null),
    ]);
    return { section, overview, roster, subjects, staff };
  });
  const generate = async () => { setPending(true); try { const result = await teachingApi.generateClassSubjects(classId); toast.success(`${result.created.length} class subjects created`); await resource.reload(); } catch (error) { toast.error(describeApiError(error)); } finally { setPending(false); } };
  return <AppShell header={{ title: resource.data?.section.name ?? "Class", subtitle: resource.data?.section.academicYear.label }}>
    {resource.loading ? <ResourceLoading label="Loading class…" /> : resource.error || !resource.data ? <ResourceError error={resource.error} retry={() => void resource.reload()} /> : <>
      <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2">{resource.data.section.gradeLevels.map((grade) => <Badge key={grade.id} variant="outline">{grade.displayName}</Badge>)}<Badge variant="secondary">{resource.data.overview ? `${resource.data.overview.placed} placed` : "Roster restricted"}</Badge></div>{hasPermission("academics.classes.manage") && <Button disabled={pending} onClick={() => void generate()}>Generate class subjects</Button>}</div>
      <div className="grid gap-5 lg:grid-cols-3"><Card><CardHeader><CardTitle>Class setup</CardTitle></CardHeader><CardContent className="space-y-3"><Datum label="Capacity" value={resource.data.section.capacity ? String(resource.data.section.capacity) : "No limit"} /><Datum label="Shift" value={resource.data.section.shift} /><Datum label="Attendance" value={resource.data.section.attendanceMode} /><Datum label="Languages" value={resource.data.section.languagesOfInstruction.join(", ")} /></CardContent></Card><Card><CardHeader><CardTitle>Class teachers</CardTitle></CardHeader><CardContent className="space-y-3">{resource.data.staff?.length ? resource.data.staff.map((assignment) => <div key={assignment.id}><p className="font-medium">{assignment.staffName}</p><p className="text-sm capitalize text-muted-foreground">{assignment.role}</p></div>) : <p className="text-sm text-muted-foreground">No class teacher assigned or access restricted.</p>}</CardContent></Card><Card><CardHeader><CardTitle>Warnings</CardTitle></CardHeader><CardContent>{resource.data.overview?.warnings.length ? <ul className="space-y-2 text-sm">{resource.data.overview.warnings.map((warning) => <li key={warning}>{warning.replaceAll("_", " ")}</li>)}</ul> : <p className="text-sm text-muted-foreground">No setup warnings.</p>}</CardContent></Card></div>
      <Card><CardHeader><CardTitle>Class subjects</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-2">{resource.data.subjects?.items.length ? resource.data.subjects.items.map((subject) => <div key={subject.id} className="rounded-lg border p-3"><div className="flex justify-between"><p className="font-medium">{subject.nameOverrideDisplayName || subject.subjectNameDisplayName}</p><Badge variant={subject.isActive ? "default" : "secondary"}>{subject.isActive ? "Active" : "Inactive"}</Badge></div><p className="mt-1 text-sm text-muted-foreground">{subject.subjectCode}{subject.choiceGroup ? ` · ${subject.choiceGroup}` : ""}</p></div>) : <p className="text-sm text-muted-foreground">No class subjects.</p>}</CardContent></Card>
      <Card><CardHeader><CardTitle>Roster</CardTitle></CardHeader><CardContent className="divide-y">{resource.data.roster?.items.length ? resource.data.roster.items.map((entry) => <div key={entry.enrolmentId} className="flex justify-between py-3"><div><p className="font-medium">{entry.student.displayName}</p><p className="text-sm text-muted-foreground">{entry.student.admissionNumber}</p></div><Badge variant="outline" className="capitalize">{entry.status}</Badge></div>) : <p className="text-sm text-muted-foreground">No placed students or roster access is restricted.</p>}</CardContent></Card>
    </>}
  </AppShell>;
}
function Datum({ label, value }: { label: string; value: string }) { return <div><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 capitalize">{value || "—"}</p></div>; }
