"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Search, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceEmpty, ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { describeApiError } from "@/lib/api/errors";
import { peopleApi } from "@/lib/api/people";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";

export default function GuardiansPage() {
  const { activeTenant, hasPermission } = useAuth();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [mutationError, setMutationError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setQuery(search.trim().length >= 2 ? search.trim() : ""), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const list = useApiResource(`${activeTenant?.id}:${query}`, () => peopleApi.listGuardians({ search: query || undefined, page: 1, pageSize: 100 }));
  const details = useApiResource(`${activeTenant?.id}:${selectedId ?? "none"}`, () => selectedId ? peopleApi.getGuardian(selectedId) : Promise.resolve(null));

  const create = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setMutationError(null);
    try {
      const guardian = await peopleApi.createGuardian({
        name: { givenName: String(form.get("givenName")), familyName: String(form.get("familyName")) },
        email: String(form.get("email")) || null,
        phoneNumber: String(form.get("phoneNumber")) || null,
        preferredCulture: String(form.get("preferredCulture")) || null,
        occupation: String(form.get("occupation")) || null,
      });
      toast.success("Guardian created");
      setShowCreate(false);
      setSelectedId(guardian.id);
      await list.reload();
    } catch (error) {
      setMutationError(describeApiError(error));
    } finally {
      setPending(false);
    }
  };

  return (
    <AppShell header={{ title: "Guardians", subtitle: "Contacts, verified student links, and custody safeguards" }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative min-w-64 max-w-md flex-1"><Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="ps-9" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search guardians" /></div>
        {hasPermission("guardians.manage") && <Button onClick={() => setShowCreate((value) => !value)}><Plus /> Add guardian</Button>}
      </div>

      {showCreate && <Card><CardHeader><CardTitle>New guardian</CardTitle></CardHeader><CardContent><form onSubmit={create} className="grid gap-4 md:grid-cols-3">{mutationError && <Alert variant="destructive" className="md:col-span-3"><AlertDescription>{describeApiError(mutationError)}</AlertDescription></Alert>}<Field name="givenName" label="Given name" required /><Field name="familyName" label="Family name" required /><Field name="email" label="Email" type="email" /><Field name="phoneNumber" label="Phone number" /><Field name="occupation" label="Occupation" /><Field name="preferredCulture" label="Language" placeholder="en, ar, fr, sw" /><div className="flex justify-end gap-2 md:col-span-3"><Button type="button" variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button><Button type="submit" disabled={pending}>Create guardian</Button></div></form></CardContent></Card>}

      {list.loading ? <ResourceLoading label="Loading guardians…" /> : list.error ? <ResourceError error={list.error} retry={() => void list.reload()} /> : !list.data?.items.length ? <ResourceEmpty title="No guardians found" description="Create a guardian, then link them to a student for verification." /> : (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)]">
          <Card><CardContent className="divide-y p-0">{list.data.items.map((guardian) => <button type="button" key={guardian.id} onClick={() => setSelectedId(guardian.id)} className="flex w-full items-center justify-between gap-4 p-4 text-start hover:bg-muted/40"><div><p className="font-medium">{guardian.name.displayName}</p><p className="text-sm text-muted-foreground">{guardian.email || guardian.phoneNumber || "No contact details"}</p></div><Badge variant={guardian.hasAccount ? "default" : "outline"}>{guardian.hasAccount ? "Account linked" : "No account"}</Badge></button>)}</CardContent></Card>
          <Card><CardHeader><CardTitle>Guardian record</CardTitle></CardHeader><CardContent>{!selectedId ? <p className="text-sm text-muted-foreground">Select a guardian to inspect verified links and restrictions.</p> : details.loading ? <ResourceLoading /> : details.error ? <ResourceError error={details.error} retry={() => void details.reload()} /> : details.data ? <div className="space-y-5"><div><p className="font-medium">{details.data.name.displayName}</p><p className="text-sm text-muted-foreground">{details.data.email || "No email"} · {details.data.phoneNumber || "No phone"}</p></div><div className="space-y-3">{details.data.links.length ? details.data.links.map((link) => <div key={link.id} className="rounded-lg border p-3"><div className="flex justify-between gap-2"><p className="font-medium">{link.studentDisplayName}</p><Badge className="capitalize" variant={link.verificationStatus === "verified" ? "default" : "secondary"}>{link.verificationStatus}</Badge></div><p className="mt-1 text-sm text-muted-foreground">{link.relationship}</p>{link.restriction && <p className="mt-2 flex items-center gap-1 text-sm text-destructive"><ShieldAlert className="size-4" /> Restriction in force</p>}</div>) : <p className="text-sm text-muted-foreground">No student links.</p>}</div></div> : null}</CardContent></Card>
        </div>
      )}
    </AppShell>
  );
}

function Field({ name, label, ...props }: { name: string; label: string } & React.ComponentProps<typeof Input>) {
  return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} {...props} /></div>;
}
