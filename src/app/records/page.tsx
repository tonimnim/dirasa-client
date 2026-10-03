"use client";

import { useState } from "react";
import { Download, Plus, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceEmpty, ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { dataProtectionApi, type SubjectKind } from "@/lib/api/dataProtection";
import { describeApiError } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";

export default function RecordsPage() {
  const { activeTenant, hasPermission } = useAuth();
  const canReadConsents = hasPermission("data_protection.consents.read");
  const canManageConsents = hasPermission("data_protection.consents.manage");
  const canExport = hasPermission("data_protection.export");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const kinds = useApiResource(`${activeTenant?.id}:consent-kinds:${canReadConsents}`, () => canReadConsents ? dataProtectionApi.listConsentKinds() : Promise.resolve(null));

  const createKind = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); setPending(true); setError(null);
    try {
      await dataProtectionApi.createConsentKind({ code: String(form.get("code")), name: { en: String(form.get("name")) }, statement: { en: String(form.get("statement")) }, allowStudentDecision: form.get("allowStudentDecision") === "on" });
      event.currentTarget.reset(); toast.success("Consent purpose created"); await kinds.reload();
    } catch (cause) { setError(describeApiError(cause)); }
    finally { setPending(false); }
  };

  const seed = async () => {
    setPending(true); setError(null);
    try { const created = await dataProtectionApi.seedConsentKinds(); toast.success(`${created.length} consent purposes added`); await kinds.reload(); }
    catch (cause) { setError(describeApiError(cause)); }
    finally { setPending(false); }
  };

  const exportSubject = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); setPending(true); setError(null);
    try {
      const result = await dataProtectionApi.exportSubject(form.get("kind") as SubjectKind, String(form.get("subjectId")));
      const url = URL.createObjectURL(new Blob([JSON.stringify(result, null, 2)], { type: "application/json" }));
      const anchor = document.createElement("a"); anchor.href = url; anchor.download = `dirasa-subject-access-${result.kind}-${result.subjectId}.json`; anchor.click(); URL.revokeObjectURL(url);
      toast.success("Subject access export generated");
    } catch (cause) { setError(describeApiError(cause)); }
    finally { setPending(false); }
  };

  return <AppShell header={{ title: "Data protection", subtitle: "Consent purposes and audited subject access exports" }}>
    {error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
    {!canReadConsents && !canExport ? <ResourceEmpty title="No data-protection access" description="Your current school permissions do not allow consent administration or subject access exports." /> : <div className="grid gap-6 xl:grid-cols-2">
      {canReadConsents && <Card><CardHeader><div className="flex items-start justify-between gap-3"><div><CardTitle className="flex items-center gap-2"><ShieldCheck className="size-5" /> Consent purposes</CardTitle><CardDescription>Versioned wording used when recording student consent.</CardDescription></div>{canManageConsents && <Button variant="outline" size="sm" disabled={pending} onClick={() => void seed()}><RefreshCw /> Add market defaults</Button>}</div></CardHeader><CardContent className="space-y-5">
        {canManageConsents && <form onSubmit={createKind} className="grid gap-3 sm:grid-cols-2"><Field name="code" label="Stable code" required placeholder="photos-media" /><Field name="name" label="Display name" required placeholder="Photos and media" /><div className="sm:col-span-2"><Field name="statement" label="Consent statement" required placeholder="Allow the school to use photographs…" /></div><label className="flex items-center gap-2 text-sm"><input type="checkbox" name="allowStudentDecision" /> Student may decide</label><div className="flex justify-end"><Button type="submit" disabled={pending}><Plus /> Add purpose</Button></div></form>}
        {kinds.loading ? <ResourceLoading /> : kinds.error ? <ResourceError error={kinds.error} retry={() => void kinds.reload()} /> : kinds.data?.items.length ? <div className="divide-y rounded-lg border">{kinds.data.items.map((kind) => <div key={kind.id} className="p-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-medium">{kind.name.en ?? Object.values(kind.name)[0] ?? kind.code}</p><div className="flex gap-2"><Badge variant="outline">Revision {kind.revision}</Badge><Badge variant={kind.isActive ? "default" : "secondary"}>{kind.isActive ? "Active" : "Inactive"}</Badge></div></div><p className="mt-1 text-sm text-muted-foreground">{kind.statement.en ?? Object.values(kind.statement)[0]}</p><p className="mt-2 font-mono text-xs text-muted-foreground">{kind.code}</p></div>)}</div> : <ResourceEmpty title="No consent purposes" description="Add a purpose or seed the defaults for this school's market." />}
      </CardContent></Card>}
      {canExport && <Card><CardHeader><CardTitle className="flex items-center gap-2"><Download className="size-5" /> Subject access export</CardTitle><CardDescription>Generate an audited JSON export for one person in this school.</CardDescription></CardHeader><CardContent><form onSubmit={exportSubject} className="space-y-4"><div className="space-y-2"><Label htmlFor="kind">Record type</Label><select id="kind" name="kind" className="h-9 w-full rounded-lg border bg-background px-3 text-sm"><option value="student">Student</option><option value="guardian">Guardian</option><option value="staff">Staff</option><option value="member">School member</option></select></div><Field name="subjectId" label="Record ID" required placeholder="UUID" /><Alert><ShieldCheck /><AlertDescription>The server records this request and builds the export inside a repeatable-read snapshot.</AlertDescription></Alert><Button type="submit" disabled={pending}><Download /> Generate and download JSON</Button></form></CardContent></Card>}
    </div>}
  </AppShell>;
}

function Field({ name, label, ...props }: { name: string; label: string } & React.ComponentProps<typeof Input>) { return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} {...props} /></div>; }
