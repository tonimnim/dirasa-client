"use client";

import React, { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/lib/api/auth";
import { DirasaApiError } from "@/lib/api/client";
import { describeAuthError } from "@/lib/auth/errors";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle, ArrowLeft, Mail, MailCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError("Enter the email address of your account.");
      return;
    }

    setIsLoading(true);
    setEmailError(null);
    setErrorMessage(null);

    try {
      // The API answers the same for known and unknown addresses.
      await forgotPassword(email.trim());
      setIsSubmitted(true);
    } catch (err) {
      const fieldErrors = err instanceof DirasaApiError ? err.fieldErrors.email : undefined;
      if (fieldErrors?.length) {
        setEmailError(fieldErrors.join(" "));
      } else {
        setErrorMessage(describeAuthError(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const backToSignIn = (
    <Button variant="ghost" className="w-full" render={<Link href="/login" />} nativeButton={false}>
      <ArrowLeft data-icon="inline-start" className="rtl:rotate-180" /> Back to sign in
    </Button>
  );

  if (isSubmitted) {
    return (
      <AuthShell>
        <AuthStatus
          icon={MailCheck}
          title="Check your email"
          description={
            <>
              If an account uses <span className="font-medium text-foreground">{email.trim()}</span>, a reset link is
              on its way. It works once and expires after 30 minutes. No email after a few minutes? Check your spam
              folder or try again.
              {process.env.NODE_ENV === "development" && (
                <span className="mt-2 block text-xs">
                  Development: the backend delivers emails to its Mailpit inbox, not real mailboxes.
                </span>
              )}
            </>
          }
        >
          <Button variant="outline" onClick={() => setIsSubmitted(false)}>
            Use another email address
          </Button>
          {backToSignIn}
        </AuthStatus>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Reset your password"
      description="Enter the email address of your Dirasa account and we'll send you a link to choose a new password."
    >
      <form onSubmit={handleSubmit} noValidate>
        <FieldGroup>
          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <Field data-invalid={emailError ? true : undefined}>
            <FieldLabel htmlFor="email">Email address</FieldLabel>
            <InputGroup className="h-10">
              <InputGroupAddon>
                <Mail />
              </InputGroupAddon>
              <InputGroupInput
                id="email"
                type="email"
                autoFocus
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu"
                maxLength={256}
                aria-invalid={emailError ? true : undefined}
                required
              />
            </InputGroup>
            {emailError ? (
              <FieldError>{emailError}</FieldError>
            ) : (
              <FieldDescription>Reset links work once and expire after 30 minutes.</FieldDescription>
            )}
          </Field>

          <div className="flex flex-col gap-2">
            <Button type="submit" size="lg" className="h-10 w-full" disabled={isLoading}>
              {isLoading && <Spinner data-icon="inline-start" />}
              Send reset link
            </Button>
            {backToSignIn}
          </div>
        </FieldGroup>
      </form>
    </AuthShell>
  );
}
