"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, UserCheck } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceEmpty, ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { peopleApi } from "@/lib/api/people";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";
import { cn } from "@/lib/utils";

export function StaffDirectory({ teachingOnly = false }: { teachingOnly?: boolean }) {
  const { activeTenant, hasPermission } = useAuth();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"" | "active" | "onLeave" | "suspended" | "ended">("");
  useEffect(() => {
    const timer = setTimeout(() => setQuery(search.trim().length >= 2 ? search.trim() : ""), 300);
    return () => clearTimeout(timer);
  }, [search]);
  const resource = useApiResource(`${activeTenant?.id}:${teachingOnly}:${query}:${status}`, () => peopleApi.listStaff({ search: query || undefined, category: teachingOnly ? "teaching" : undefined, employmentStatus: status || undefined, page: 1, pageSize: 100 }));

  return <AppShell header={{ title: teachingOnly ? "Teachers" : "Staff", subtitle: "Live employment records for the active school" }}>
    <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex flex-1 flex-wrap gap-2"><div className="relative min-w-64 max-w-md flex-1"><Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="ps-9" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search staff" /></div><select className="h-9 rounded-lg border bg-background px-3 text-sm" value={status} onChange={(event) => setStatus(event.target.value as typeof status)}><option value="">All statuses</option><option value="active">Active</option><option value="onLeave">On leave</option><option value="suspended">Suspended</option><option value="ended">Ended</option></select></div>{hasPermission("staff.manage") && <Link href="/teachers/new" className={cn(buttonVariants(), "h-9")}><Plus /> Add staff member</Link>}</div>
    {resource.loading ? <ResourceLoading label="Loading staff…" /> : resource.error ? <ResourceError error={resource.error} retry={() => void resource.reload()} /> : !resource.data?.items.length ? <ResourceEmpty title="No staff found" description="Add the first staff record or change the current filters." /> : <Card><CardContent className="overflow-x-auto p-0"><table className="w-full text-sm"><thead className="border-b bg-muted/50 text-xs text-muted-foreground"><tr><th className="px-4 py-3 text-start">Staff member</th><th className="px-4 py-3 text-start">Number</th><th className="px-4 py-3 text-start">Category</th><th className="px-4 py-3 text-start">Department</th><th className="px-4 py-3 text-start">Status</th></tr></thead><tbody className="divide-y">{resource.data.items.map((staff) => <tr key={staff.id} className="hover:bg-muted/30"><td className="px-4 py-3"><Link href={`/teachers/${staff.id}`} className="flex items-center gap-3 font-medium hover:text-primary"><span className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary"><UserCheck className="size-4" /></span><span>{staff.name.displayName}<small className="block font-normal text-muted-foreground">{staff.jobTitle}</small></span></Link></td><td className="px-4 py-3 font-mono text-xs">{staff.staffNumber}</td><td className="px-4 py-3">{staff.category === "nonTeaching" ? "Non-teaching" : "Teaching"}</td><td className="px-4 py-3">{staff.department || "—"}</td><td className="px-4 py-3"><Badge className="capitalize" variant={staff.employmentStatus === "active" ? "default" : "secondary"}>{staff.employmentStatus === "onLeave" ? "On leave" : staff.employmentStatus}</Badge></td></tr>)}</tbody></table></CardContent></Card>}
  </AppShell>;
}
