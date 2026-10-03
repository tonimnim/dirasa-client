"use client";

import Link from "next/link";
import { Plus, School } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceEmpty, ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { academicsApi } from "@/lib/api/academics";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";
import { cn } from "@/lib/utils";

export default function ClassesPage() {
  const { activeTenant, hasPermission } = useAuth();
  const resource = useApiResource(`${activeTenant?.id}:classes`, () => academicsApi.listClasses({ page: 1, pageSize: 100 }));
  return <AppShell header={{ title: "Classes", subtitle: "Registration and homeroom groups across academic years" }}>
    <div className="flex justify-end">{hasPermission("academics.classes.manage") && <Link href="/classes/new" className={cn(buttonVariants(), "h-9")}><Plus /> Add class</Link>}</div>
    {resource.loading ? <ResourceLoading label="Loading classes…" /> : resource.error ? <ResourceError error={resource.error} retry={() => void resource.reload()} /> : !resource.data?.items.length ? <ResourceEmpty title="No classes configured" description="Create an academic year and grade levels, then add the first class section." /> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{resource.data.items.map((section) => <Link key={section.id} href={`/classes/${section.id}`}><Card className="h-full transition hover:ring-primary/40"><CardContent className="space-y-4"><div className="flex items-start justify-between gap-3"><span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"><School className="size-5" /></span><Badge variant="outline">{section.academicYear.label}</Badge></div><div><h2 className="text-lg font-semibold">{section.name}</h2><p className="mt-1 text-sm text-muted-foreground">{section.gradeLevels.map((grade) => grade.displayName).join(", ")}</p></div><div className="flex flex-wrap gap-2 text-xs text-muted-foreground"><span>{section.capacity ? `Capacity ${section.capacity}` : "No capacity limit"}</span><span>·</span><span className="capitalize">{section.shift}</span><span>·</span><span className="capitalize">{section.attendanceMode} attendance</span></div></CardContent></Card></Link>)}</div>}
  </AppShell>;
}
