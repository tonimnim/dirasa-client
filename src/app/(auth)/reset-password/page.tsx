"use client";

import React, { useState } from "react";
import Link from "next/link";
import { resetPassword } from "@/lib/api/auth";
import { DirasaApiError } from "@/lib/api/client";
import { describeAuthError } from "@/lib/auth/errors";
import { useEmailLinkParams } from "@/lib/auth/linkParams";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { PasswordFields, isPasswordAcceptable } from "@/components/auth/PasswordFields";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle, ArrowRight, CheckCircle2, LinkIcon } from "lucide-react";

export default function ResetPasswordPage() {
  // Emailed link: {App:FrontendBaseUrl}/reset-password#uid={userId}&token={token}
  const linkParams = useEmailLinkParams();
  const userId = linkParams?.get("uid") ?? null;
  const token = linkParams?.get("token") ?? null;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLinkInvalid, setIsLinkInvalid] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSubmit = isPasswordAcceptable(newPassword, confirmPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !token || !canSubmit) return;

    setIsLoading(true);
    setErrorMessage(null);
    setPasswordErrors([]);

    try {
      await resetPassword(userId, token, newPassword);
      setIsSuccess(true);
    } catch (err) {
      if (err instanceof DirasaApiError && err.code === "invalid_or_expired_link") {
        setIsLinkInvalid(true);
      } else if (err instanceof DirasaApiError && err.fieldErrors.newPassword?.length) {
        // e.g. a common password, or one containing the user's own identifiers.
        setPasswordErrors(err.fieldErrors.newPassword);
      } else {
        setErrorMessage(describeAuthError(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!linkParams) {
    return (
      <AuthShell>
        <div className="flex justify-center text-muted-foreground">
          <Spinner />
        </div>
      </AuthShell>
    );
  }

  if (isSuccess) {
    return (
      <AuthShell>
        <AuthStatus
          icon={CheckCircle2}
          title="Password updated"
          description="Your password has been changed and you have been signed out on every device. Sign in again with your new password."
        >
          <Button size="lg" className="h-10" render={<Link href="/login" />} nativeButton={false}>
            Sign in <ArrowRight data-icon="inline-end" className="rtl:rotate-180" />
          </Button>
        </AuthStatus>
      </AuthShell>
    );
  }

  if (isLinkInvalid || !userId || !token) {
    return (
      <AuthShell>
        <AuthStatus
          icon={LinkIcon}
          title="This reset link can't be used"
          description={
            isLinkInvalid
              ? describeAuthError(new DirasaApiError(400, { code: "invalid_or_expired_link" }))
              : "Open the link from your password reset email, or request a new one."
          }
        >
          <Button render={<Link href="/forgot-password" />} nativeButton={false}>
            Request a new link
          </Button>
          <Button variant="ghost" render={<Link href="/login" />} nativeButton={false}>
            Back to sign in
          </Button>
        </AuthStatus>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Choose a new password"
      description="Use a long, unique password for your Dirasa account. A passphrase of several words works well."
    >
      <form onSubmit={handleSubmit} noValidate>
        <FieldGroup>
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          <PasswordFields
            password={newPassword}
            onPasswordChange={setNewPassword}
            confirmPassword={confirmPassword}
            onConfirmPasswordChange={setConfirmPassword}
            serverErrors={passwordErrors}
            label="New password"
          />
          <div className="flex flex-col gap-2">
            <Button type="submit" size="lg" className="h-10 w-full" disabled={!canSubmit || isLoading}>
              {isLoading && <Spinner data-icon="inline-start" />}
              Update password
            </Button>
            <Button variant="ghost" className="w-full" render={<Link href="/login" />} nativeButton={false}>
              Cancel
            </Button>
          </div>
        </FieldGroup>
      </form>
    </AuthShell>
  );
}
