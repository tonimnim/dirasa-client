"use client";

import React, { useState } from "react";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { Eye, EyeOff, Lock } from "lucide-react";

/** The API's policy (NIST SP 800-63B): length only, no composition rules; it also rejects common passwords. */
export const MIN_PASSWORD_LENGTH = 10;
export const MAX_PASSWORD_LENGTH = 128;

export function isPasswordAcceptable(password: string, confirmPassword: string): boolean {
  return (
    password.length >= MIN_PASSWORD_LENGTH && password.length <= MAX_PASSWORD_LENGTH && password === confirmPassword
  );
}

function strengthOf(password: string) {
  if (password.length < MIN_PASSWORD_LENGTH) return { value: 25, label: "Too short" };
  if (password.length < 14) return { value: 60, label: "Good" };
  return { value: 100, label: "Strong" };
}

/** New password + confirmation, with the API's rules and any `errors.password`/`errors.newPassword` it returned. */
export function PasswordFields({
  password,
  onPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
  serverErrors = [],
  label = "Password",
}: {
  password: string;
  onPasswordChange: (value: string) => void;
  confirmPassword: string;
  onConfirmPasswordChange: (value: string) => void;
  serverErrors?: string[];
  label?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const strength = strengthOf(password);
  const mismatch = confirmPassword.length > 0 && confirmPassword !== password;

  return (
    <>
      <Field data-invalid={serverErrors.length > 0 || undefined}>
        <FieldLabel htmlFor="new-password">{label}</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <Lock />
          </InputGroupAddon>
          <InputGroupInput
            id="new-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            maxLength={MAX_PASSWORD_LENGTH}
            aria-invalid={serverErrors.length > 0 || undefined}
            aria-describedby="new-password-rules"
            required
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        {password.length > 0 && (
          <Progress value={strength.value} className="gap-1.5">
            <ProgressLabel className="text-xs font-normal text-muted-foreground">Strength</ProgressLabel>
            <ProgressValue className="text-xs">{() => strength.label}</ProgressValue>
          </Progress>
        )}
        <FieldDescription id="new-password-rules">
          At least {MIN_PASSWORD_LENGTH} characters. Avoid common passwords and anything containing your name or
          email.
        </FieldDescription>
        {serverErrors.length > 0 && <FieldError errors={serverErrors.map((message) => ({ message }))} />}
      </Field>

      <Field data-invalid={mismatch || undefined}>
        <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <Lock />
          </InputGroupAddon>
          <InputGroupInput
            id="confirm-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            maxLength={MAX_PASSWORD_LENGTH}
            aria-invalid={mismatch || undefined}
            required
          />
        </InputGroup>
        {mismatch && <FieldError>Passwords don&apos;t match yet.</FieldError>}
      </Field>
    </>
  );
}
