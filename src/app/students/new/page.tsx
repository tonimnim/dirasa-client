"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { describeApiError } from "@/lib/api/errors";
import { peopleApi } from "@/lib/api/people";

export default function NewStudentPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    setError(null);
    try {
      const student = await peopleApi.createStudent({
        admissionNumber: String(form.get("admissionNumber")),
        name: {
          givenName: String(form.get("givenName")),
          middleNames: String(form.get("middleNames")) || null,
          familyName: String(form.get("familyName")),
          preferredName: String(form.get("preferredName")) || null,
          nativeScriptName: null,
        },
        dateOfBirth: String(form.get("dateOfBirth")),
        gender: form.get("gender") as "notRecorded" | "female" | "male" | "other",
        admissionDate: String(form.get("admissionDate")),
        nationalityCode: String(form.get("nationalityCode")) || null,
        homeLanguage: String(form.get("homeLanguage")) || null,
      });
      toast.success("Student created");
      router.push(`/students/${student.id}`);
    } catch (cause) {
      setError(describeApiError(cause));
      setPending(false);
    }
  };

  return (
    <AppShell header={{ title: "Add student", subtitle: "Create the core student record; enrolment and guardians are managed afterwards" }}>
      <Card className="mx-auto w-full max-w-3xl">
        <CardHeader><CardTitle>Student details</CardTitle><CardDescription>Fields marked required match the backend contract.</CardDescription></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
            {error && <Alert variant="destructive" className="sm:col-span-2"><AlertDescription>{describeApiError(error)}</AlertDescription></Alert>}
            <Field label="Admission number" name="admissionNumber" required />
            <Field label="Admission date" name="admissionDate" type="date" required />
            <Field label="Given name" name="givenName" required />
            <Field label="Family name" name="familyName" required />
            <Field label="Middle names" name="middleNames" />
            <Field label="Preferred name" name="preferredName" />
            <Field label="Date of birth" name="dateOfBirth" type="date" required />
            <div className="space-y-2"><Label htmlFor="gender">Gender</Label><select id="gender" name="gender" className="h-9 w-full rounded-lg border bg-background px-3 text-sm" defaultValue="notRecorded"><option value="notRecorded">Not recorded</option><option value="female">Female</option><option value="male">Male</option><option value="other">Other</option></select></div>
            <Field label="Nationality code" name="nationalityCode" placeholder="e.g. KE" />
            <Field label="Home language" name="homeLanguage" placeholder="e.g. sw" />
            <div className="flex justify-end gap-2 sm:col-span-2"><Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button><Button type="submit" disabled={pending}>{pending && <Spinner />}Create student</Button></div>
          </form>
        </CardContent>
      </Card>
    </AppShell>
  );
}

function Field({ label, name, ...props }: { label: string; name: string } & React.ComponentProps<typeof Input>) {
  return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} {...props} /></div>;
}
