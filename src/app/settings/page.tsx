"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { changePassword, listSessions, revokeSession } from "@/lib/api/auth";
import { describeApiError } from "@/lib/api/errors";
import { schoolApi } from "@/lib/api/school";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";

type Tab = "school" | "members" | "invitations" | "sessions" | "password";

export default function SettingsPage() {
  const { activeTenant, hasPermission } = useAuth();
  const [tab, setTab] = useState<Tab>("school");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const canReadMembers = hasPermission("members.read");
  const canInvite = hasPermission("members.invite");
  const resource = useApiResource(`${activeTenant?.id}:settings:${canReadMembers}:${canInvite}`, async () => {
    const [school, members, invitations, sessions] = await Promise.all([
      schoolApi.get(), canReadMembers ? schoolApi.listMembers() : Promise.resolve(null), canInvite ? schoolApi.listInvitations() : Promise.resolve(null), listSessions(1, 100),
    ]);
    return { school, members, invitations, sessions };
  });

  const invite = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); setPending(true); setError(null);
    try { await schoolApi.invite({ email: String(form.get("email")), displayName: String(form.get("displayName")) || null, roles: String(form.get("roles")).split(",").map((role) => role.trim()).filter(Boolean), personKind: null, personId: null }); toast.success("Invitation sent"); event.currentTarget.reset(); await resource.reload(); }
    catch (cause) { setError(cause); }
    finally { setPending(false); }
  };
  const password = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); setPending(true); setError(null);
    try { await changePassword(String(form.get("currentPassword")), String(form.get("newPassword"))); toast.success("Password changed; other sessions were signed out"); event.currentTarget.reset(); await resource.reload(); }
    catch (cause) { setError(cause); }
    finally { setPending(false); }
  };

  return <AppShell header={{ title: "Settings", subtitle: "School, access, invitations, sessions and account security" }}>
    {resource.loading ? <ResourceLoading label="Loading settings…" /> : resource.error || !resource.data ? <ResourceError error={resource.error} retry={() => void resource.reload()} /> : <>
      <Tabs value={tab} onValueChange={(value) => { setTab(value as Tab); setError(null); }}><TabsList><TabsTrigger value="school">School</TabsTrigger>{canReadMembers && <TabsTrigger value="members">Members</TabsTrigger>}{canInvite && <TabsTrigger value="invitations">Invitations</TabsTrigger>}<TabsTrigger value="sessions">Sessions</TabsTrigger><TabsTrigger value="password">Password</TabsTrigger></TabsList></Tabs>
      {error && <Alert variant="destructive"><AlertDescription>{describeApiError(error)}</AlertDescription></Alert>}
      {tab === "school" && <Card><CardHeader><CardTitle>{resource.data.school.name}</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><Datum label="Slug" value={resource.data.school.slug} /><Datum label="Country" value={[resource.data.school.countryCode, resource.data.school.subdivisionCode].filter(Boolean).join(" · ")} /><Datum label="Time zone" value={resource.data.school.timeZone} /><Datum label="Default language" value={resource.data.school.defaultCulture} /><Datum label="Currency" value={resource.data.school.currency} /><Datum label="School id" value={resource.data.school.id} /></CardContent></Card>}
      {tab === "members" && <Card><CardContent className="divide-y p-0">{resource.data.members?.items.map((member) => <div key={member.id} className="flex flex-wrap items-center justify-between gap-3 p-4"><div><p className="font-medium">{member.displayName}</p><p className="text-sm text-muted-foreground">{member.email || "No email"}</p></div><div className="flex flex-wrap gap-2">{member.roles.map((role) => <Badge key={role} variant="outline">{role}</Badge>)}<Badge className="capitalize" variant={member.status === "active" ? "default" : "secondary"}>{member.status}</Badge></div></div>)}</CardContent></Card>}
      {tab === "invitations" && <div className="grid gap-5 lg:grid-cols-[360px_1fr]"><Card><CardHeader><CardTitle>Invite a member</CardTitle></CardHeader><CardContent><form onSubmit={invite} className="space-y-4"><Field name="email" label="Email" type="email" required /><Field name="displayName" label="Display name" /><Field name="roles" label="Role keys" placeholder="teacher, staff" required /><Button type="submit" disabled={pending}>Send invitation</Button></form></CardContent></Card><Card><CardHeader><CardTitle>Invitations</CardTitle></CardHeader><CardContent className="divide-y">{resource.data.invitations?.items.map((invitation) => <div key={invitation.id} className="flex justify-between gap-3 py-3"><div><p className="font-medium">{invitation.email}</p><p className="text-sm text-muted-foreground">Expires {new Date(invitation.expiresAt).toLocaleDateString()}</p></div><Badge className="capitalize" variant="outline">{invitation.status}</Badge></div>)}</CardContent></Card></div>}
      {tab === "sessions" && <Card><CardHeader><CardTitle>Signed-in devices</CardTitle></CardHeader><CardContent className="divide-y">{resource.data.sessions.items.map((session) => <div key={session.id} className="flex flex-wrap items-center justify-between gap-3 py-3"><div><p className="font-medium">{session.deviceName || `${session.clientType} session`} {session.current && <Badge className="ms-2">Current</Badge>}</p><p className="text-sm text-muted-foreground">Last used {new Date(session.lastUsedAt).toLocaleString()}</p></div>{!session.current && <Button variant="outline" onClick={async () => { try { await revokeSession(session.id); toast.success("Session revoked"); await resource.reload(); } catch (cause) { toast.error(describeApiError(cause)); } }}>Sign out device</Button>}</div>)}</CardContent></Card>}
      {tab === "password" && <Card className="max-w-lg"><CardHeader><CardTitle>Change password</CardTitle></CardHeader><CardContent><form onSubmit={password} className="space-y-4"><Field name="currentPassword" label="Current password" type="password" required /><Field name="newPassword" label="New password" type="password" minLength={12} required /><Button type="submit" disabled={pending}>Change password</Button></form></CardContent></Card>}
    </>}
  </AppShell>;
}
function Datum({ label, value }: { label: string; value: string }) { return <div><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1">{value || "—"}</p></div>; }
function Field({ name, label, ...props }: { name: string; label: string } & React.ComponentProps<typeof Input>) { return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} {...props} /></div>; }
