"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceEmpty, ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { academicsApi } from "@/lib/api/academics";
import { describeApiError } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";

type Tab = "years" | "stages" | "grades" | "subjects" | "templates";

export default function AcademicsPage() {
  const { activeTenant, hasPermission } = useAuth();
  const canManage = hasPermission("academics.manage");
  const [tab, setTab] = useState<Tab>("years");
  const [showCreate, setShowCreate] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resource = useApiResource(`${activeTenant?.id}:academics:${canManage}`, async () => {
    const [settings, years, stages, grades, subjects, today, templates] = await Promise.all([
      academicsApi.getSettings(), academicsApi.listYears({ pageSize: 100 }), academicsApi.listStages({ pageSize: 100 }), academicsApi.listGradeLevels({ pageSize: 100, includeInactive: true }), academicsApi.listSubjects({ pageSize: 100, includeInactive: true }), academicsApi.calendarToday().catch(() => null), canManage ? academicsApi.listTemplates({ pageSize: 100 }) : Promise.resolve(null),
    ]);
    return { settings, years, stages, grades, subjects, today, templates };
  });

  const create = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); setPending(true); setError(null);
    try {
      if (tab === "years") await academicsApi.createYear({ label: String(form.get("label")) || null, startDate: String(form.get("startDate")), endDate: String(form.get("endDate")) });
      if (tab === "stages") await academicsApi.createStage({ code: String(form.get("code")), name: { en: String(form.get("name")) } });
      if (tab === "grades") await academicsApi.createGradeLevel({ code: String(form.get("code")), name: { en: String(form.get("name")) }, stageId: String(form.get("stageId")) || null });
      if (tab === "subjects") await academicsApi.createSubject({ code: String(form.get("code")), name: { en: String(form.get("name")) }, category: form.get("category") as "mathematics" | "sciences" | "humanities" | "languages" | "arts" | "technology" | "physicalEducation" | "religiousAndMoral" | "business" | "other" });
      toast.success("Academic record created"); setShowCreate(false); await resource.reload();
    } catch (cause) { setError(describeApiError(cause)); }
    finally { setPending(false); }
  };

  const applyTemplate = async (code: string) => {
    setPending(true); try { const result = await academicsApi.applyTemplate(code, { includeSubjects: true, addOfferingsToExistingGrades: false, dryRun: false }); toast.success(`Applied ${result.templateCode}`); await resource.reload(); } catch (cause) { toast.error(describeApiError(cause)); } finally { setPending(false); }
  };

  return <AppShell header={{ title: "Academic setup", subtitle: "Years, school calendar, stages, grade levels, subjects and curriculum templates" }}>
    {resource.loading ? <ResourceLoading label="Loading academic setup…" /> : resource.error || !resource.data ? <ResourceError error={resource.error} retry={() => void resource.reload()} /> : <>
      <div className="grid gap-4 md:grid-cols-3"><Metric label="Current year" value={resource.data.years.items.find((year) => year.isCurrent)?.label ?? "Not activated"} /><Metric label="Today" value={resource.data.today?.today.isSchoolDay ? "School day" : "Not a school day"} /><Metric label="Instructional minimum" value={`${resource.data.settings.instructionalDaysMinimum} days`} /></div>
      <div className="flex flex-wrap items-center justify-between gap-3"><Tabs value={tab} onValueChange={(value) => { setTab(value as Tab); setShowCreate(false); setError(null); }}><TabsList><TabsTrigger value="years">Years</TabsTrigger><TabsTrigger value="stages">Stages</TabsTrigger><TabsTrigger value="grades">Grades</TabsTrigger><TabsTrigger value="subjects">Subjects</TabsTrigger>{canManage && <TabsTrigger value="templates">Templates</TabsTrigger>}</TabsList></Tabs>{canManage && tab !== "templates" && <Button onClick={() => setShowCreate((value) => !value)}>Add {tab === "years" ? "year" : tab === "grades" ? "grade level" : tab.slice(0, -1)}</Button>}</div>
      {showCreate && <CreateCard tab={tab} stages={resource.data.stages.items} pending={pending} error={error} submit={create} cancel={() => setShowCreate(false)} />}
      {tab === "years" && <ListCard>{resource.data.years.items.map((year) => <Row key={year.id} title={year.label} detail={`${year.startDate} – ${year.endDate}`} badges={[year.status, year.isCurrent ? "current" : "", year.isLocked ? "locked" : "", year.isPublished ? "published" : ""]} />)}</ListCard>}
      {tab === "stages" && <ListCard>{resource.data.stages.items.map((stage) => <Row key={stage.id} title={stage.displayName} detail={stage.code} badges={[`Sequence ${stage.sequence}`]} />)}</ListCard>}
      {tab === "grades" && <ListCard>{resource.data.grades.items.map((grade) => <Row key={grade.id} title={grade.displayName} detail={[grade.code, grade.stage?.displayName].filter(Boolean).join(" · ")} badges={[grade.isActive ? "active" : "inactive", `Sequence ${grade.sequence}`]} />)}</ListCard>}
      {tab === "subjects" && <ListCard>{resource.data.subjects.items.map((subject) => <Row key={subject.id} title={subject.displayName} detail={`${subject.code} · ${subject.category}`} badges={[subject.isActive ? "active" : "inactive"]} />)}</ListCard>}
      {tab === "templates" && (resource.data.templates?.items.length ? <div className="grid gap-4 md:grid-cols-2">{resource.data.templates.items.map((template) => <Card key={template.code}><CardHeader><CardTitle>{template.displayName}</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-sm text-muted-foreground">{template.descriptionDisplayName}</p><div className="flex flex-wrap gap-2"><Badge variant="outline">{template.curriculumFamily}</Badge><Badge variant="secondary">{template.gradeLevelCount} grades</Badge><Badge variant="secondary">{template.subjectCount} subjects</Badge></div><Button disabled={pending} onClick={() => void applyTemplate(template.code)}>Apply template</Button></CardContent></Card>)}</div> : <ResourceEmpty title="No templates available" description="No curriculum templates match this school's country." />)}
    </>}
  </AppShell>;
}

function Metric({ label, value }: { label: string; value: string }) { return <Card><CardContent><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-lg font-semibold">{value}</p></CardContent></Card>; }
function ListCard({ children }: { children: React.ReactNode }) { return <Card><CardContent className="divide-y p-0">{children}</CardContent></Card>; }
function Row({ title, detail, badges }: { title: string; detail: string; badges: string[] }) { return <div className="flex flex-wrap items-center justify-between gap-3 p-4"><div><p className="font-medium">{title}</p><p className="text-sm text-muted-foreground">{detail}</p></div><div className="flex gap-2">{badges.filter(Boolean).map((badge) => <Badge key={badge} variant="outline" className="capitalize">{badge}</Badge>)}</div></div>; }

function CreateCard({ tab, stages, pending, error, submit, cancel }: { tab: Tab; stages: { id: string; displayName: string }[]; pending: boolean; error: string | null; submit: (event: React.FormEvent<HTMLFormElement>) => void; cancel: () => void }) {
  return <Card><CardHeader><CardTitle>Add {tab === "years" ? "academic year" : tab === "grades" ? "grade level" : tab.slice(0, -1)}</CardTitle></CardHeader><CardContent><form onSubmit={submit} className="grid gap-4 md:grid-cols-3">{error && <Alert variant="destructive" className="md:col-span-3"><AlertDescription>{describeApiError(error)}</AlertDescription></Alert>}{tab === "years" ? <><Field name="label" label="Label" placeholder="Generated if blank" /><Field name="startDate" label="Start date" type="date" required /><Field name="endDate" label="End date" type="date" required /></> : <><Field name="code" label="Stable code" required /><Field name="name" label="English name" required />{tab === "grades" && <Select name="stageId" label="Stage"><option value="">No stage</option>{stages.map((stage) => <option key={stage.id} value={stage.id}>{stage.displayName}</option>)}</Select>}{tab === "subjects" && <Select name="category" label="Category"><option value="mathematics">Mathematics</option><option value="sciences">Sciences</option><option value="humanities">Humanities</option><option value="languages">Languages</option><option value="arts">Arts</option><option value="technology">Technology</option><option value="physicalEducation">Physical education</option><option value="religiousAndMoral">Religious and moral</option><option value="business">Business</option><option value="other">Other</option></Select>}</>}<div className="flex justify-end gap-2 md:col-span-3"><Button type="button" variant="outline" onClick={cancel}>Cancel</Button><Button type="submit" disabled={pending}>Create</Button></div></form></CardContent></Card>;
}
function Field({ name, label, ...props }: { name: string; label: string } & React.ComponentProps<typeof Input>) { return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} {...props} /></div>; }
function Select({ name, label, children }: { name: string; label: string; children: React.ReactNode }) { return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><select id={name} name={name} className="h-9 w-full rounded-lg border bg-background px-3 text-sm">{children}</select></div>; }
