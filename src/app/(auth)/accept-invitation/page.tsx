"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { acceptInvitation } from "@/lib/api/auth";
import { DirasaApiError } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/context";
import { describeAuthError } from "@/lib/auth/errors";
import { useEmailLinkParams } from "@/lib/auth/linkParams";
import { DASHBOARD_PATH } from "@/lib/auth/routes";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { PasswordFields, isPasswordAcceptable } from "@/components/auth/PasswordFields";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle, ArrowRight, CheckCircle2, LinkIcon, User } from "lucide-react";

type Step = "accept" | "create-account" | "accepted" | "invalid-link";

export default function AcceptInvitationPage() {
  const router = useRouter();
  const { status, switchSchool } = useAuth();
  // Emailed link: {App:FrontendBaseUrl}/accept-invitation#tenant={tenantId}&token={token}
  const linkParams = useEmailLinkParams();
  const tenantId = linkParams?.get("tenant") ?? null;
  const token = linkParams?.get("token") ?? null;

  const [step, setStep] = useState<Step>("accept");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const accept = async (account?: { password: string; displayName?: string }) => {
    if (!tenantId || !token) return;
    setIsLoading(true);
    setErrorMessage(null);
    setFieldErrors({});
    try {
      await acceptInvitation(tenantId, token, account);
      setStep("accepted");
    } catch (err) {
      if (!(err instanceof DirasaApiError)) {
        setErrorMessage(describeAuthError(err));
      } else if (err.code === "invalid_or_expired_link") {
        setStep("invalid-link");
      } else if (err.code === "validation_failed" && !account && err.fieldErrors.password) {
        // The address has no account yet: the API needs a password to create one.
        setStep("create-account");
      } else if (err.code === "validation_failed") {
        setFieldErrors(err.fieldErrors);
      } else {
        setErrorMessage(describeAuthError(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const openSchool = async () => {
    if (!tenantId) return;
    setIsLoading(true);
    try {
      await switchSchool(tenantId);
      toast.success("Welcome to your new school");
      router.replace(DASHBOARD_PATH);
    } catch (err) {
      setErrorMessage(describeAuthError(err));
      setIsLoading(false);
    }
  };

  const errorAlert = errorMessage && (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );

  if (!linkParams) {
    return (
      <AuthShell>
        <div className="flex justify-center text-muted-foreground">
          <Spinner />
        </div>
      </AuthShell>
    );
  }

  if (step === "invalid-link" || !tenantId || !token) {
    return (
      <AuthShell>
        <AuthStatus
          icon={LinkIcon}
          title="This invitation can't be used"
          description={
            step === "invalid-link"
              ? "The invitation is invalid, has expired or has already been accepted. Ask your school to send a new one."
              : "Open the link from your invitation email to join your school."
          }
        >
          <Button variant="outline" render={<Link href="/login" />} nativeButton={false}>
            Go to sign in
          </Button>
        </AuthStatus>
      </AuthShell>
    );
  }

  if (step === "accepted") {
    const signedIn = status === "authenticated";
    return (
      <AuthShell>
        <AuthStatus
          icon={CheckCircle2}
          title="Invitation accepted"
          description={
            signedIn
              ? "The school has been added to your account."
              : "Your school membership is active. Sign in to get started."
          }
        >
          {errorAlert}
          {signedIn ? (
            <Button size="lg" className="h-10" onClick={openSchool} disabled={isLoading}>
              {isLoading && <Spinner data-icon="inline-start" />}
              Open the school <ArrowRight data-icon="inline-end" className="rtl:rotate-180" />
            </Button>
          ) : (
            <Button size="lg" className="h-10" render={<Link href="/login" />} nativeButton={false}>
              Sign in <ArrowRight data-icon="inline-end" className="rtl:rotate-180" />
            </Button>
          )}
        </AuthStatus>
      </AuthShell>
    );
  }

  if (step === "create-account") {
    return (
      <AuthShell
        title="Create your account"
        description="This email address doesn't have a Dirasa account yet. Choose a password to create it and join the school."
      >
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (isPasswordAcceptable(password, confirmPassword)) {
              accept({ password, displayName: displayName.trim() || undefined });
            }
          }}
        >
          <FieldGroup>
            {errorAlert}
            <Field data-invalid={fieldErrors.displayName ? true : undefined}>
              <FieldLabel htmlFor="display-name">Your name</FieldLabel>
              <InputGroup className="h-10">
                <InputGroupAddon>
                  <User />
                </InputGroupAddon>
                <InputGroupInput
                  id="display-name"
                  autoFocus
                  autoComplete="name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  maxLength={200}
                  aria-invalid={fieldErrors.displayName ? true : undefined}
                />
              </InputGroup>
              <FieldDescription>Optional. Leave blank to use the name your school gave.</FieldDescription>
              {fieldErrors.displayName && (
                <FieldError errors={fieldErrors.displayName.map((message) => ({ message }))} />
              )}
            </Field>
            <PasswordFields
              password={password}
              onPasswordChange={setPassword}
              confirmPassword={confirmPassword}
              onConfirmPasswordChange={setConfirmPassword}
              serverErrors={fieldErrors.password}
            />
            <Button
              type="submit"
              size="lg"
              className="h-10 w-full"
              disabled={!isPasswordAcceptable(password, confirmPassword) || isLoading}
            >
              {isLoading && <Spinner data-icon="inline-start" />}
              Create account and join
            </Button>
          </FieldGroup>
        </form>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Join your school on Dirasa"
      description="Accept to add the school to your account. If this email address has no account yet, you'll create one next."
    >
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (agreedToPolicy) accept();
        }}
      >
        <FieldGroup>
          {errorAlert}
          <Field orientation="horizontal">
            <Checkbox
              id="safeguarding-policy"
              checked={agreedToPolicy}
              onCheckedChange={(checked) => setAgreedToPolicy(checked === true)}
            />
            <FieldLabel htmlFor="safeguarding-policy" className="leading-snug font-normal">
              I acknowledge Dirasa&apos;s safeguarding policy and custody disclosure limits, and agree to handle student
              data under applicable privacy laws.
            </FieldLabel>
          </Field>
          <div className="flex flex-col gap-2">
            <Button type="submit" size="lg" className="h-10 w-full" disabled={!agreedToPolicy || isLoading}>
              {isLoading && <Spinner data-icon="inline-start" />}
              Accept invitation
            </Button>
            <Button variant="ghost" className="w-full" render={<Link href="/login" />} nativeButton={false}>
              Not now
            </Button>
          </div>
        </FieldGroup>
      </form>
    </AuthShell>
  );
}
