"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { DirasaApiError } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/context";
import { describeAuthError } from "@/lib/auth/errors";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle, Eye, EyeOff, TriangleAlert } from "lucide-react";

type FieldErrors = { identifier?: string; password?: string };

/**
 * Email-or-username sign-in form. Signs in through the AuthProvider and calls `onSignedIn` on success; where to
 * go next is the caller's decision (the /login page redirects, a dialog could simply close).
 */
export function LoginForm({ onSignedIn, autoFocus = true }: { onSignedIn?: () => void; autoFocus?: boolean }) {
  const { signIn } = useAuth();
  const identifierInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FieldErrors = {};
    if (!identifier.trim()) errors.identifier = "Enter your email or user name.";
    if (!password) errors.password = "Enter your password.";
    setFieldErrors(errors);
    if (errors.identifier || errors.password) {
      (errors.identifier ? identifierInput : passwordInput).current?.focus();
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      await signIn(identifier.trim(), password, rememberMe);
      // Stay busy: the caller navigates away or closes.
      onSignedIn?.();
    } catch (err) {
      setErrorMessage(describeAuthError(err));
      setIsLoading(false);
      if (err instanceof DirasaApiError && err.code === "invalid_credentials") {
        passwordInput.current?.select();
      }
    }
  };

  const trackCapsLock = (e: React.KeyboardEvent<HTMLInputElement>) => setCapsLockOn(e.getModifierState("CapsLock"));

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FieldGroup>
        {errorMessage && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Field data-invalid={fieldErrors.identifier ? true : undefined}>
          <FieldLabel htmlFor="identifier">Email or user name</FieldLabel>
          <InputGroup className="h-10">
            <InputGroupInput
              id="identifier"
              ref={identifierInput}
              autoFocus={autoFocus}
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              maxLength={256}
              aria-invalid={fieldErrors.identifier ? true : undefined}
              required
            />
          </InputGroup>
          {fieldErrors.identifier && <FieldError>{fieldErrors.identifier}</FieldError>}
        </Field>

        <Field data-invalid={fieldErrors.password ? true : undefined}>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link href="/forgot-password" className="ms-auto text-sm text-primary underline-offset-4 hover:underline">
              Forgot password?
            </Link>
          </div>
          <InputGroup className="h-10">
            <InputGroupInput
              id="password"
              ref={passwordInput}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={trackCapsLock}
              onKeyUp={trackCapsLock}
              onBlur={() => setCapsLockOn(false)}
              maxLength={128}
              aria-invalid={fieldErrors.password ? true : undefined}
              required
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          {capsLockOn && (
            <FieldDescription role="status" className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
              <TriangleAlert className="size-3.5" /> Caps Lock is on
            </FieldDescription>
          )}
          {fieldErrors.password && <FieldError>{fieldErrors.password}</FieldError>}
        </Field>

        <Field orientation="horizontal">
          <Checkbox id="remember-me" checked={rememberMe} onCheckedChange={(checked) => setRememberMe(checked === true)} />
          <FieldLabel htmlFor="remember-me" className="font-normal">
            Keep me signed in
          </FieldLabel>
        </Field>

        <Button type="submit" size="lg" className="h-10 w-full" disabled={isLoading}>
          {isLoading && <Spinner data-icon="inline-start" />}
          {isLoading ? "Signing in…" : "Sign in"}
        </Button>
      </FieldGroup>
    </form>
  );
}
