"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { academicsApi } from "@/lib/api/academics";
import { describeApiError } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";

export default function NewClassPage() {
  const router = useRouter();
  const { activeTenant } = useAuth();
  const options = useApiResource(`${activeTenant?.id}:class-options`, async () => {
    const [years, grades] = await Promise.all([academicsApi.listYears({ pageSize: 100 }), academicsApi.listGradeLevels({ pageSize: 100 })]);
    return { years: years.items, grades: grades.items };
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); setPending(true); setError(null);
    try {
      const section = await academicsApi.createClass({ academicYearId: String(form.get("academicYearId")), gradeLevelIds: form.getAll("gradeLevelIds").map(String), name: String(form.get("name")), code: String(form.get("code")) || null, capacity: form.get("capacity") ? Number(form.get("capacity")) : null, track: String(form.get("track")) || null, genderComposition: "mixed", shift: form.get("shift") as "fullDay" | "morning" | "afternoon", attendanceMode: form.get("attendanceMode") as "daily" | "perLesson", languagesOfInstruction: String(form.get("languages")).split(",").map((value) => value.trim()).filter(Boolean) });
      toast.success("Class created"); router.push(`/classes/${section.id}`);
    } catch (cause) { setError(describeApiError(cause)); setPending(false); }
  };
  return <AppShell header={{ title: "Add class", subtitle: "Create a section in an academic year" }}>{options.loading ? <ResourceLoading /> : options.error || !options.data ? <ResourceError error={options.error} retry={() => void options.reload()} /> : <Card className="mx-auto max-w-3xl"><CardHeader><CardTitle>Class details</CardTitle></CardHeader><CardContent><form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">{error && <Alert variant="destructive" className="sm:col-span-2"><AlertDescription>{describeApiError(error)}</AlertDescription></Alert>}<Field name="name" label="Class name" required /><Field name="code" label="Import code" /><Select name="academicYearId" label="Academic year" required>{options.data.years.map((year) => <option key={year.id} value={year.id}>{year.label}</option>)}</Select><div className="space-y-2"><Label htmlFor="gradeLevelIds">Grade levels</Label><select id="gradeLevelIds" name="gradeLevelIds" multiple required className="min-h-28 w-full rounded-lg border bg-background p-2 text-sm">{options.data.grades.map((grade) => <option key={grade.id} value={grade.id}>{grade.displayName}</option>)}</select><p className="text-xs text-muted-foreground">Hold Ctrl/Cmd to select a composite class.</p></div><Field name="capacity" label="Capacity" type="number" min="1" /><Field name="track" label="Track" /><Select name="shift" label="Shift"><option value="fullDay">Full day</option><option value="morning">Morning</option><option value="afternoon">Afternoon</option></Select><Select name="attendanceMode" label="Attendance mode"><option value="daily">Daily register</option><option value="perLesson">Per lesson</option></Select><Field name="languages" label="Languages of instruction" placeholder="en, sw" /><div className="flex justify-end gap-2 sm:col-span-2"><Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button><Button type="submit" disabled={pending}>Create class</Button></div></form></CardContent></Card>}</AppShell>;
}
function Field({ name, label, ...props }: { name: string; label: string } & React.ComponentProps<typeof Input>) { return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} {...props} /></div>; }
function Select({ name, label, children, required }: { name: string; label: string; children: React.ReactNode; required?: boolean }) { return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><select id={name} name={name} required={required} className="h-9 w-full rounded-lg border bg-background px-3 text-sm">{children}</select></div>; }
