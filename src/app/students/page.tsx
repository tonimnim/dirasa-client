"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, UserRound } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceEmpty, ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth/context";
import { peopleApi } from "@/lib/api/people";
import { useApiResource } from "@/lib/hooks/useApiResource";
import { cn } from "@/lib/utils";

type StudentStatus = "enrolled" | "withdrawn" | "graduated";

export default function StudentsPage() {
  const { activeTenant, hasPermission } = useAuth();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StudentStatus | "">("");

  useEffect(() => {
    const timer = setTimeout(() => setQuery(search.trim().length >= 2 ? search.trim() : ""), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const resource = useApiResource(
    `${activeTenant?.id}:${query}:${status}`,
    () => peopleApi.listStudents({ search: query || undefined, status: status || undefined, page: 1, pageSize: 100 })
  );
  const students = resource.data?.items ?? [];

  return (
    <AppShell header={{ title: "Students", subtitle: "Live student records from the active school" }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap gap-2">
          <div className="relative min-w-64 flex-1 max-w-md">
            <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="ps-9" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name or admission number" />
          </div>
          <select className="h-9 rounded-lg border bg-background px-3 text-sm" value={status} onChange={(event) => setStatus(event.target.value as StudentStatus | "")}>
            <option value="">All statuses</option>
            <option value="enrolled">Enrolled</option>
            <option value="withdrawn">Withdrawn</option>
            <option value="graduated">Graduated</option>
          </select>
        </div>
        {hasPermission("students.manage") && (
          <Link href="/students/new" className={cn(buttonVariants(), "h-9")}><Plus /> Add student</Link>
        )}
      </div>

      {resource.loading ? <ResourceLoading label="Loading students…" /> : resource.error ? (
        <ResourceError error={resource.error} retry={() => void resource.reload()} />
      ) : students.length === 0 ? (
        <ResourceEmpty title="No students found" description={query || status ? "Try a different filter." : "Add the first student record for this school."} />
      ) : (
        <Card>
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50 text-start text-xs text-muted-foreground">
                <tr><th className="px-4 py-3 text-start">Student</th><th className="px-4 py-3 text-start">Admission number</th><th className="px-4 py-3 text-start">Date of birth</th><th className="px-4 py-3 text-start">Status</th><th className="px-4 py-3 text-start">Account</th></tr>
              </thead>
              <tbody className="divide-y">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <Link href={`/students/${student.id}`} className="flex items-center gap-3 font-medium hover:text-primary">
                        <span className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary"><UserRound className="size-4" /></span>
                        {student.name.displayName}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{student.admissionNumber}</td>
                    <td className="px-4 py-3">{student.dateOfBirth}</td>
                    <td className="px-4 py-3"><Badge variant={student.status === "enrolled" ? "default" : "secondary"} className="capitalize">{student.status}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{student.hasAccount ? "Linked" : "Not linked"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
      {resource.data && <p className="text-xs text-muted-foreground">{resource.data.totalCount} student{Number(resource.data.totalCount) === 1 ? "" : "s"}</p>}
    </AppShell>
  );
}
