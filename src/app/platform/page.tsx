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
import { describeApiError } from "@/lib/api/errors";
import { platformApi } from "@/lib/api/platform";
import { useApiResource } from "@/lib/hooks/useApiResource";

export default function PlatformPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resource = useApiResource("platform-tenants", () => platformApi.listTenants(1, 100));
  const create = async (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = new FormData(event.currentTarget); setPending(true); setError(null); try { await platformApi.createTenant({ name: String(form.get("name")), slug: String(form.get("slug")), countryCode: String(form.get("countryCode")).toUpperCase(), subdivisionCode: String(form.get("subdivisionCode")) || null, timeZone: String(form.get("timeZone")), defaultCulture: String(form.get("defaultCulture")), currency: String(form.get("currency")).toUpperCase(), firstAdminEmail: String(form.get("firstAdminEmail")), firstAdminDisplayName: String(form.get("firstAdminDisplayName")) || null }); toast.success("School provisioned and manager invited"); setShowCreate(false); await resource.reload(); } catch (cause) { setError(describeApiError(cause)); } finally { setPending(false); } };
  const transition = async (id: string, version: number | string, active: boolean) => { try { if (active) await platformApi.reactivateTenant(id, version); else await platformApi.suspendTenant(id, version); toast.success(active ? "School reactivated" : "School suspended"); await resource.reload(); } catch (cause) { toast.error(describeApiError(cause)); } };
  return <AppShell header={{ title: "Platform operations", subtitle: "Provision and control schools in this deployment" }}><div className="flex justify-end"><Button onClick={() => setShowCreate((value) => !value)}>Provision school</Button></div>{showCreate && <Card><CardHeader><CardTitle>New school</CardTitle></CardHeader><CardContent><form onSubmit={create} className="grid gap-4 md:grid-cols-3">{error && <Alert variant="destructive" className="md:col-span-3"><AlertDescription>{describeApiError(error)}</AlertDescription></Alert>}<Field name="name" label="School name" required /><Field name="slug" label="Slug" required /><Field name="countryCode" label="Country code" required maxLength={2} /><Field name="subdivisionCode" label="Subdivision" placeholder="KE-30" /><Field name="timeZone" label="Time zone" placeholder="Africa/Nairobi" required /><Field name="defaultCulture" label="Default culture" defaultValue="en" required /><Field name="currency" label="Currency" defaultValue="KES" required maxLength={3} /><Field name="firstAdminEmail" label="First manager email" type="email" required /><Field name="firstAdminDisplayName" label="Manager name" /><div className="flex justify-end gap-2 md:col-span-3"><Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button><Button type="submit" disabled={pending}>Provision school</Button></div></form></CardContent></Card>}{resource.loading ? <ResourceLoading /> : resource.error ? <ResourceError error={resource.error} retry={() => void resource.reload()} /> : !resource.data?.items.length ? <ResourceEmpty title="No schools" description="Provision the first school in this cell." /> : <Card><CardContent className="divide-y p-0">{resource.data.items.map((tenant) => <div key={tenant.id} className="flex flex-wrap items-center justify-between gap-3 p-4"><div><p className="font-medium">{tenant.name}</p><p className="text-sm text-muted-foreground">{tenant.slug} · {tenant.homeRegion} · {tenant.countryCode}</p></div><div className="flex items-center gap-2"><Badge className="capitalize" variant={tenant.status === "active" ? "default" : "secondary"}>{tenant.status}</Badge>{tenant.status === "active" ? <Button variant="destructive" size="sm" onClick={() => void transition(tenant.id, tenant.version, false)}>Suspend</Button> : tenant.status === "suspended" ? <Button size="sm" onClick={() => void transition(tenant.id, tenant.version, true)}>Reactivate</Button> : null}</div></div>)}</CardContent></Card>}</AppShell>;
}
function Field({ name, label, ...props }: { name: string; label: string } & React.ComponentProps<typeof Input>) { return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} {...props} /></div>; }
