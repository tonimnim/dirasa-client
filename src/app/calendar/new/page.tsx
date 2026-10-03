"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarOff, Clock3, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceEmpty, ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { academicsApi } from "@/lib/api/academics";
import { describeApiError } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";
import type { components } from "@/types/generated/school";

type BreakKind = components["schemas"]["BreakKind"];
type DeliveryMode = components["schemas"]["DeliveryMode"];

export default function CalendarConfigurationPage() {
  const { activeTenant } = useAuth();
  const [yearId, setYearId] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const years = useApiResource(`${activeTenant?.id}:calendar-years`, () => academicsApi.listYears({ pageSize: 100 }));

  useEffect(() => {
    if (!yearId && years.data?.items.length) {
      const timer = window.setTimeout(() => setYearId(years.data!.items.find((year) => year.isCurrent)?.id ?? years.data!.items[0].id), 0);
      return () => window.clearTimeout(timer);
    }
  }, [yearId, years.data]);

  const configuration = useApiResource(`${activeTenant?.id}:calendar-configuration:${yearId || "none"}`, async () => {
    if (!yearId) return { breaks: [], overrides: [] };
    const [breaks, overrides] = await Promise.all([academicsApi.listBreaks(yearId), academicsApi.listDayOverrides(yearId)]);
    return { breaks: breaks.items, overrides: overrides.items };
  });

  const createBreak = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true); setError(null);
    try {
      await academicsApi.createBreak(yearId, {
        name: { en: String(form.get("name")) }, kind: form.get("kind") as BreakKind,
        startDate: String(form.get("startDate")), endDate: String(form.get("endDate")),
        isProvisional: form.get("isProvisional") === "on", anchor: "date",
      });
      event.currentTarget.reset(); toast.success("Calendar break added"); await configuration.reload();
    } catch (cause) { setError(describeApiError(cause)); }
    finally { setPending(false); }
  };

  const createOverride = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true); setError(null);
    try {
      await academicsApi.createDayOverride(yearId, {
        name: { en: String(form.get("name")) }, startDate: String(form.get("startDate")), endDate: String(form.get("endDate")),
        deliveryMode: form.get("deliveryMode") as DeliveryMode, start: String(form.get("start")) || null, end: String(form.get("end")) || null,
      });
      event.currentTarget.reset(); toast.success("Day override added"); await configuration.reload();
    } catch (cause) { setError(describeApiError(cause)); }
    finally { setPending(false); }
  };

  const remove = async (kind: "break" | "override", id: string) => {
    setPending(true); setError(null);
    try {
      if (kind === "break") await academicsApi.deleteBreak(yearId, id); else await academicsApi.deleteDayOverride(yearId, id);
      toast.success(kind === "break" ? "Break removed" : "Override removed"); await configuration.reload();
    } catch (cause) { setError(describeApiError(cause)); }
    finally { setPending(false); }
  };

  return <AppShell header={{ title: "Configure school calendar", subtitle: "Maintain closures, holidays, remote days, and temporary hours", actionButton: <Button variant="outline" render={<Link href="/calendar" />}>Back to calendar</Button> }}>
    {years.loading ? <ResourceLoading /> : years.error ? <ResourceError error={years.error} retry={() => void years.reload()} /> : !years.data?.items.length ? <ResourceEmpty title="No academic years" description="Create an academic year before adding calendar rules." /> : <>
      <Card><CardContent className="flex flex-wrap items-end gap-3"><div className="min-w-64 space-y-2"><Label htmlFor="year">Academic year</Label><select id="year" className="h-9 w-full rounded-lg border bg-background px-3 text-sm" value={yearId} onChange={(event) => setYearId(event.target.value)}>{years.data.items.map((year) => <option key={year.id} value={year.id}>{year.label} · {year.status}</option>)}</select></div><p className="pb-2 text-sm text-muted-foreground">Calendar rules cannot be changed after the year is locked.</p></CardContent></Card>
      {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
      {configuration.loading ? <ResourceLoading label="Loading calendar rules…" /> : configuration.error || !configuration.data ? <ResourceError error={configuration.error} retry={() => void configuration.reload()} /> : <div className="grid gap-6 xl:grid-cols-2">
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><CalendarOff className="size-5" /> Breaks and closures</CardTitle><CardDescription>These dates are evaluated as non-school days.</CardDescription></CardHeader><CardContent className="space-y-5"><form onSubmit={createBreak} className="grid gap-3 sm:grid-cols-2"><Field name="name" label="Name" required placeholder="Mid-term break" /><Select name="kind" label="Kind"><option value="midTerm">Mid-term</option><option value="vacation">Vacation</option><option value="publicHoliday">Public holiday</option><option value="religiousHoliday">Religious holiday</option><option value="staffDevelopment">Staff development</option><option value="closure">Closure</option></Select><Field name="startDate" label="Starts" type="date" required /><Field name="endDate" label="Ends" type="date" required /><label className="flex items-center gap-2 text-sm"><input name="isProvisional" type="checkbox" /> Dates are provisional</label><div className="flex justify-end"><Button type="submit" disabled={pending || !yearId}><Plus /> Add break</Button></div></form><div className="divide-y rounded-lg border">{configuration.data.breaks.length ? configuration.data.breaks.map((item) => <div key={item.id} className="flex items-center justify-between gap-3 p-3"><div><p className="font-medium">{item.displayName}</p><p className="text-xs text-muted-foreground">{item.startDate} – {item.endDate}</p></div><div className="flex items-center gap-2"><Badge variant="outline" className="capitalize">{item.kind}</Badge><Button type="button" size="icon-sm" variant="ghost" aria-label={`Remove ${item.displayName}`} disabled={pending} onClick={() => void remove("break", item.id)}><Trash2 /></Button></div></div>) : <p className="p-4 text-sm text-muted-foreground">No breaks configured.</p>}</div></CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Clock3 className="size-5" /> Day overrides</CardTitle><CardDescription>Change delivery mode or opening hours for a date range.</CardDescription></CardHeader><CardContent className="space-y-5"><form onSubmit={createOverride} className="grid gap-3 sm:grid-cols-2"><Field name="name" label="Name" required placeholder="Ramadan hours" /><Select name="deliveryMode" label="Delivery mode"><option value="inPerson">In person</option><option value="remote">Remote</option></Select><Field name="startDate" label="Starts" type="date" required /><Field name="endDate" label="Ends" type="date" required /><Field name="start" label="Opening time" type="time" /><Field name="end" label="Closing time" type="time" /><div className="flex justify-end sm:col-span-2"><Button type="submit" disabled={pending || !yearId}><Plus /> Add override</Button></div></form><div className="divide-y rounded-lg border">{configuration.data.overrides.length ? configuration.data.overrides.map((item) => <div key={item.id} className="flex items-center justify-between gap-3 p-3"><div><p className="font-medium">{item.displayName}</p><p className="text-xs text-muted-foreground">{item.startDate} – {item.endDate}{item.start && item.end ? ` · ${item.start}–${item.end}` : ""}</p></div><div className="flex items-center gap-2"><Badge variant="outline" className="capitalize">{item.deliveryMode}</Badge><Button type="button" size="icon-sm" variant="ghost" aria-label={`Remove ${item.displayName}`} disabled={pending} onClick={() => void remove("override", item.id)}><Trash2 /></Button></div></div>) : <p className="p-4 text-sm text-muted-foreground">No day overrides configured.</p>}</div></CardContent></Card>
      </div>}
    </>}
  </AppShell>;
}

function Field({ name, label, ...props }: { name: string; label: string } & React.ComponentProps<typeof Input>) { return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} {...props} /></div>; }
function Select({ name, label, children }: { name: string; label: string; children: React.ReactNode }) { return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><select id={name} name={name} className="h-9 w-full rounded-lg border bg-background px-3 text-sm">{children}</select></div>; }
