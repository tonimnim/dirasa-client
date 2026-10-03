"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { ResourceError, ResourceLoading } from "@/components/api/ResourceState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { describeApiError } from "@/lib/api/errors";
import { peopleApi } from "@/lib/api/people";
import { teachingApi } from "@/lib/api/teaching";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";

export default function StaffDetailsPage() {
  const staffId = String(useParams().id);
  const { activeTenant, hasPermission, hasAnyPermission } = useAuth();
  const [pending, setPending] = useState(false);
  const canReadPay = hasAnyPermission("payroll.read", "payroll.read_own", "payroll.manage");
  const resource = useApiResource(`${activeTenant?.id}:${staffId}`, async () => {
    const [staff, compensation, assignments] = await Promise.all([
      peopleApi.getStaff(staffId),
      canReadPay ? peopleApi.getCompensation(staffId) : Promise.resolve(null),
      hasPermission("teaching.read") ? teachingApi.listAssignments({ staffMemberId: staffId, includeEnded: true, pageSize: 100 }) : Promise.resolve(null),
    ]);
    return { staff, compensation, assignments };
  });
  const transition = async (action: "start-leave" | "return-from-leave" | "suspend" | "lift-suspension" | "reinstate") => {
    if (!resource.data) return;
    setPending(true);
    try { await peopleApi.staffTransition(staffId, action, resource.data.staff.version); toast.success("Employment status updated"); await resource.reload(); }
    catch (error) { toast.error(describeApiError(error)); }
    finally { setPending(false); }
  };
  const status = resource.data?.staff.employment.status;
  return <AppShell header={{ title: resource.data?.staff.name.displayName ?? "Staff member", subtitle: resource.data?.staff.staffNumber }}>
    {resource.loading ? <ResourceLoading label="Loading staff record…" /> : resource.error || !resource.data ? <ResourceError error={resource.error} retry={() => void resource.reload()} /> : <>
      <div className="flex flex-wrap items-center justify-between gap-3"><div className="flex gap-2"><Badge className="capitalize">{status === "onLeave" ? "On leave" : status}</Badge><Badge variant="outline">{resource.data.staff.category === "nonTeaching" ? "Non-teaching" : "Teaching"}</Badge></div>{hasPermission("staff.manage") && <div className="flex flex-wrap gap-2">{status === "active" && <><Button variant="outline" disabled={pending} onClick={() => void transition("start-leave")}>Start leave</Button><Button variant="destructive" disabled={pending} onClick={() => void transition("suspend")}>Suspend</Button></>}{status === "onLeave" && <Button disabled={pending} onClick={() => void transition("return-from-leave")}>Return from leave</Button>}{status === "suspended" && <Button disabled={pending} onClick={() => void transition("lift-suspension")}>Lift suspension</Button>}{status === "ended" && <Button disabled={pending} onClick={() => void transition("reinstate")}>Reinstate</Button>}</div>}</div>
      <div className="grid gap-5 lg:grid-cols-3"><Card className="lg:col-span-2"><CardHeader><CardTitle>Employment record</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><Datum label="Name" value={resource.data.staff.name.displayName} /><Datum label="Job title" value={resource.data.staff.jobTitle} /><Datum label="Department" value={resource.data.staff.department} /><Datum label="Work email" value={resource.data.staff.workEmail} /><Datum label="Phone" value={resource.data.staff.phoneNumber} /><Datum label="Employment type" value={resource.data.staff.employment.type} /><Datum label="Start date" value={resource.data.staff.employment.startDate} /><Datum label="FTE" value={String(resource.data.staff.employment.fullTimeEquivalent)} /></CardContent></Card><Card><CardHeader><CardTitle>Compensation</CardTitle></CardHeader><CardContent>{!canReadPay ? <p className="text-sm text-muted-foreground">You do not have payroll access.</p> : resource.data.compensation ? <div className="space-y-3"><Datum label="Base amount" value={`${resource.data.compensation.currency} ${resource.data.compensation.baseAmount}`} /><Datum label="Basis" value={resource.data.compensation.payBasis} /><Datum label="Frequency" value={resource.data.compensation.payFrequency} /><Datum label="Effective from" value={resource.data.compensation.effectiveFrom} /></div> : <p className="text-sm text-muted-foreground">No compensation record.</p>}</CardContent></Card></div>
      {resource.data.assignments && <Card><CardHeader><CardTitle>Teaching assignments</CardTitle></CardHeader><CardContent className="space-y-2">{resource.data.assignments.items.length ? resource.data.assignments.items.map((assignment) => <div key={assignment.id} className="flex justify-between gap-3 rounded-lg border p-3"><div><p className="font-medium">{assignment.staffName}</p><p className="text-sm text-muted-foreground">Class subject {assignment.classSubjectId}</p></div><Badge variant="outline" className="capitalize">{assignment.role}</Badge></div>) : <p className="text-sm text-muted-foreground">No teaching assignments.</p>}</CardContent></Card>}
    </>}
  </AppShell>;
}

function Datum({ label, value }: { label: string; value?: string | null }) { return <div><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 capitalize">{value || "—"}</p></div>; }
