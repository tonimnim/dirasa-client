"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceEmpty, ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { academicsApi } from "@/lib/api/academics";
import { enrolmentApi } from "@/lib/api/enrolment";
import { describeApiError } from "@/lib/api/errors";
import { peopleApi } from "@/lib/api/people";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";

export default function EnrolmentPage() {
  const { activeTenant, hasPermission } = useAuth();
  const [showCreate, setShowCreate] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resource = useApiResource(`${activeTenant?.id}:enrolments`, async () => {
    const [enrolments, students, years, grades, classes] = await Promise.all([
      enrolmentApi.list({ pageSize: 100 }), peopleApi.listStudents({ status: "enrolled", pageSize: 100 }), academicsApi.listYears({ pageSize: 100 }), academicsApi.listGradeLevels({ pageSize: 100 }), academicsApi.listClasses({ pageSize: 100 }),
    ]);
    return { enrolments, students: students.items, years: years.items, grades: grades.items, classes: classes.items };
  });
  const create = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); setPending(true); setError(null);
    try { await enrolmentApi.create({ studentId: String(form.get("studentId")), academicYearId: String(form.get("academicYearId")), gradeLevelId: String(form.get("gradeLevelId")), classSectionId: String(form.get("classSectionId")) || null, startDate: null, classSubjectIds: null, allowOverCapacity: false }); toast.success("Student enrolled"); setShowCreate(false); await resource.reload(); }
    catch (cause) { setError(describeApiError(cause)); }
    finally { setPending(false); }
  };
  return <AppShell header={{ title: "Enrolment", subtitle: "Year enrolments, grade assignments, class placements and subject choices" }}>
    {resource.loading ? <ResourceLoading label="Loading enrolments…" /> : resource.error || !resource.data ? <ResourceError error={resource.error} retry={() => void resource.reload()} /> : <>
      <div className="flex justify-end">{hasPermission("enrolment.manage") && <Button onClick={() => setShowCreate((value) => !value)}><Plus /> Enrol student</Button>}</div>
      {showCreate && <Card><CardHeader><CardTitle>New enrolment</CardTitle></CardHeader><CardContent><form onSubmit={create} className="grid gap-4 md:grid-cols-2">{error && <Alert variant="destructive" className="md:col-span-2"><AlertDescription>{describeApiError(error)}</AlertDescription></Alert>}<Select name="studentId" label="Student" required>{resource.data.students.map((student) => <option key={student.id} value={student.id}>{student.name.displayName} · {student.admissionNumber}</option>)}</Select><Select name="academicYearId" label="Academic year" required>{resource.data.years.map((year) => <option key={year.id} value={year.id}>{year.label}</option>)}</Select><Select name="gradeLevelId" label="Grade level" required>{resource.data.grades.map((grade) => <option key={grade.id} value={grade.id}>{grade.displayName}</option>)}</Select><Select name="classSectionId" label="Initial class"><option value="">No placement yet</option>{resource.data.classes.map((section) => <option key={section.id} value={section.id}>{section.name} · {section.academicYear.label}</option>)}</Select><div className="flex justify-end gap-2 md:col-span-2"><Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button><Button type="submit" disabled={pending}>Enrol student</Button></div></form></CardContent></Card>}
      {!resource.data.enrolments.items.length ? <ResourceEmpty title="No enrolments" description="Enrol an active student into an academic year." /> : <Card><CardContent className="overflow-x-auto p-0"><table className="w-full text-sm"><thead className="border-b bg-muted/50 text-xs text-muted-foreground"><tr><th className="px-4 py-3 text-start">Student</th><th className="px-4 py-3 text-start">Year</th><th className="px-4 py-3 text-start">Grade</th><th className="px-4 py-3 text-start">Class</th><th className="px-4 py-3 text-start">Status</th></tr></thead><tbody className="divide-y">{resource.data.enrolments.items.map((enrolment) => { const placement = enrolment.placements.find((item) => !item.endDate) ?? enrolment.placements.at(-1); return <tr key={enrolment.id}><td className="px-4 py-3"><p className="font-medium">{enrolment.student.displayName}</p><p className="text-xs text-muted-foreground">{enrolment.student.admissionNumber}</p></td><td className="px-4 py-3">{enrolment.academicYear.label}</td><td className="px-4 py-3">{enrolment.gradeLevel.displayName}</td><td className="px-4 py-3">{placement?.classSectionName ?? "Unplaced"}</td><td className="px-4 py-3"><Badge className="capitalize" variant={enrolment.status === "active" ? "default" : "secondary"}>{enrolment.status}</Badge></td></tr>; })}</tbody></table></CardContent></Card>}
    </>}
  </AppShell>;
}
function Select({ name, label, children, required }: { name: string; label: string; children: React.ReactNode; required?: boolean }) { return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><select id={name} name={name} required={required} className="h-9 w-full rounded-lg border bg-background px-3 text-sm">{children}</select></div>; }
