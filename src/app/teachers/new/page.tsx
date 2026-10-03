"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { describeApiError } from "@/lib/api/errors";
import { peopleApi } from "@/lib/api/people";

export default function NewStaffPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true); setError(null);
    try {
      const staff = await peopleApi.createStaff({
        staffNumber: String(form.get("staffNumber")),
        name: { givenName: String(form.get("givenName")), familyName: String(form.get("familyName")), middleNames: String(form.get("middleNames")) || null },
        category: form.get("category") as "teaching" | "nonTeaching",
        jobTitle: String(form.get("jobTitle")),
        department: String(form.get("department")) || null,
        workEmail: String(form.get("workEmail")) || null,
        phoneNumber: String(form.get("phoneNumber")) || null,
        employment: { type: form.get("employmentType") as "permanent" | "fixedTerm" | "partTime" | "casual" | "contractor" | "intern" | "volunteer" | "seconded", startDate: String(form.get("startDate")), endDate: null, fullTimeEquivalent: Number(form.get("fte")) },
      });
      toast.success("Staff member created");
      router.push(`/teachers/${staff.id}`);
    } catch (cause) { setError(describeApiError(cause)); setPending(false); }
  };
  return <AppShell header={{ title: "Add staff member", subtitle: "Create an employment record" }}><Card className="mx-auto max-w-3xl"><CardHeader><CardTitle>Staff and employment details</CardTitle></CardHeader><CardContent><form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">{error && <Alert variant="destructive" className="sm:col-span-2"><AlertDescription>{describeApiError(error)}</AlertDescription></Alert>}<Field name="staffNumber" label="Staff number" required /><Field name="jobTitle" label="Job title" required /><Field name="givenName" label="Given name" required /><Field name="familyName" label="Family name" required /><Field name="middleNames" label="Middle names" /><Field name="department" label="Department" /><Field name="workEmail" label="Work email" type="email" /><Field name="phoneNumber" label="Phone number" /><Select name="category" label="Category"><option value="teaching">Teaching</option><option value="nonTeaching">Non-teaching</option></Select><Select name="employmentType" label="Employment type"><option value="permanent">Permanent</option><option value="fixedTerm">Fixed term</option><option value="partTime">Part time</option><option value="casual">Casual</option><option value="contractor">Contractor</option><option value="intern">Intern</option></Select><Field name="startDate" label="Start date" type="date" required /><Field name="fte" label="Full-time equivalent" type="number" min="0.01" max="1" step="0.01" defaultValue="1" required /><div className="flex justify-end gap-2 sm:col-span-2"><Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button><Button type="submit" disabled={pending}>Create staff member</Button></div></form></CardContent></Card></AppShell>;
}

function Field({ name, label, ...props }: { name: string; label: string } & React.ComponentProps<typeof Input>) { return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} {...props} /></div>; }
function Select({ name, label, children }: { name: string; label: string; children: React.ReactNode }) { return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><select id={name} name={name} className="h-9 w-full rounded-lg border bg-background px-3 text-sm">{children}</select></div>; }
