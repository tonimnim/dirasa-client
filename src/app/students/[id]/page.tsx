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
import { dataProtectionApi } from "@/lib/api/dataProtection";
import { enrolmentApi } from "@/lib/api/enrolment";
import { peopleApi } from "@/lib/api/people";
import { useAuth } from "@/lib/auth/context";
import { useApiResource } from "@/lib/hooks/useApiResource";

export default function StudentDetailsPage() {
  const studentId = String(useParams().id);
  const { activeTenant, hasPermission } = useAuth();
  const canReadConsents = hasPermission("data_protection.consents.read");
  const [pending, setPending] = useState(false);
  const resource = useApiResource(`${activeTenant?.id}:${studentId}:${canReadConsents}`, async () => {
    const [student, guardians, schooling, consents] = await Promise.all([
      peopleApi.getStudent(studentId),
      peopleApi.listStudentGuardians(studentId),
      enrolmentApi.forStudent(studentId),
      canReadConsents ? dataProtectionApi.currentStudentConsents(studentId) : Promise.resolve(null),
    ]);
    return { student, guardians, schooling, consents };
  });

  const transition = async (action: "withdraw" | "graduate" | "reinstate") => {
    const student = resource.data?.student;
    if (!student) return;
    setPending(true);
    try {
      if (action === "reinstate") await peopleApi.reinstateStudent(student.id, student.version);
      else {
        const leavingDate = new Date().toISOString().slice(0, 10);
        const input = { leavingDate, reason: action === "graduate" ? "Graduated" : "Withdrawn", version: student.version };
        if (action === "graduate") await peopleApi.graduateStudent(student.id, input);
        else await peopleApi.withdrawStudent(student.id, input);
      }
      toast.success(`Student ${action === "reinstate" ? "reinstated" : action === "graduate" ? "graduated" : "withdrawn"}`);
      await resource.reload();
    } catch (error) {
      toast.error(describeApiError(error));
    } finally {
      setPending(false);
    }
  };

  return (
    <AppShell header={{ title: resource.data?.student.name.displayName ?? "Student", subtitle: resource.data?.student.admissionNumber }}>
      {resource.loading ? <ResourceLoading label="Loading student record…" /> : resource.error || !resource.data ? (
        <ResourceError error={resource.error} retry={() => void resource.reload()} />
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2"><Badge className="capitalize">{resource.data.student.status}</Badge>{resource.data.student.membershipId && <Badge variant="outline">Account linked</Badge>}</div>
            {hasPermission("students.manage") && <div className="flex gap-2">{resource.data.student.status === "enrolled" ? <><Button variant="outline" disabled={pending} onClick={() => void transition("withdraw")}>Withdraw</Button><Button disabled={pending} onClick={() => void transition("graduate")}>Graduate</Button></> : <Button disabled={pending} onClick={() => void transition("reinstate")}>Reinstate</Button>}</div>}
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            <Card className="lg:col-span-2"><CardHeader><CardTitle>Personal record</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><Datum label="Full name" value={resource.data.student.name.displayName} /><Datum label="Date of birth" value={resource.data.student.dateOfBirth} /><Datum label="Gender" value={resource.data.student.gender} /><Datum label="Admission date" value={resource.data.student.admissionDate} /><Datum label="Nationality" value={resource.data.student.nationalityCode} /><Datum label="Home language" value={resource.data.student.homeLanguage} /></CardContent></Card>
            <Card><CardHeader><CardTitle>Identifiers</CardTitle></CardHeader><CardContent className="space-y-3">{resource.data.student.identifiers.length ? resource.data.student.identifiers.map((identifier) => <div key={identifier.id}><p className="text-xs text-muted-foreground">{identifier.schemeName}</p><p className="font-mono text-sm">{identifier.value}</p></div>) : <p className="text-sm text-muted-foreground">No identifiers recorded.</p>}</CardContent></Card>
          </div>
          <Card><CardHeader><CardTitle>Guardians and safeguarding</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-2">{resource.data.guardians.length ? resource.data.guardians.map((link) => <div key={link.id} className="rounded-lg border p-4"><div className="flex justify-between gap-2"><p className="font-medium">{link.guardianDisplayName}</p><Badge variant={link.verificationStatus === "verified" ? "default" : "secondary"} className="capitalize">{link.verificationStatus}</Badge></div><p className="mt-1 text-sm text-muted-foreground">{link.relationship} · {link.receivesCorrespondence ? "Receives correspondence" : "No correspondence"}</p>{link.restriction && <p className="mt-2 text-sm text-destructive">Safeguarding restrictions are in force.</p>}</div>) : <p className="text-sm text-muted-foreground">No guardian links recorded.</p>}</CardContent></Card>
          <Card><CardHeader><CardTitle>Schooling</CardTitle></CardHeader><CardContent className="space-y-3">{resource.data.schooling.length ? resource.data.schooling.map(({ enrolment, classSectionId }) => <div key={enrolment.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border p-4"><div><p className="font-medium">{enrolment.academicYear.label} · {enrolment.gradeLevel.displayName}</p><p className="text-sm text-muted-foreground">{enrolment.startDate}{enrolment.endDate ? ` – ${enrolment.endDate}` : ""}</p></div><div className="flex gap-2"><Badge className="capitalize" variant="outline">{enrolment.status}</Badge>{classSectionId && <Badge variant="secondary">Placed</Badge>}</div></div>) : <p className="text-sm text-muted-foreground">No enrolments recorded.</p>}</CardContent></Card>
          {resource.data.consents && <Card><CardHeader><CardTitle>Current consent decisions</CardTitle></CardHeader><CardContent className="space-y-3">{resource.data.consents.length ? resource.data.consents.map((consent) => <div key={consent.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4"><div><p className="font-medium">{consent.kindName.en ?? Object.values(consent.kindName)[0] ?? "Consent"}</p><p className="text-sm text-muted-foreground">Recorded {new Date(consent.recordedAt).toLocaleDateString()} via {consent.channel}</p></div><div className="flex gap-2"><Badge className="capitalize" variant={consent.decision === "granted" && consent.isEffective ? "default" : "secondary"}>{consent.decision}</Badge>{!consent.isEffective && <Badge variant="outline">Not effective</Badge>}</div></div>) : <p className="text-sm text-muted-foreground">No consent decisions recorded.</p>}</CardContent></Card>}
        </>
      )}
    </AppShell>
  );
}

function Datum({ label, value }: { label: string; value?: string | null }) {
  return <div><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 capitalize">{value || "—"}</p></div>;
}
