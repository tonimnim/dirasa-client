"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import { describeAuthError } from "@/lib/auth/errors";
import { isPublicPath, loginPathFor } from "@/lib/auth/routes";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle, ChevronRight, CloudOff, LogOut, RotateCw, School } from "lucide-react";

/**
 * Client-side route protection. The refresh cookie belongs to the API's host, so the Next.js server cannot see
 * the session: pages render only once the AuthProvider has restored it in the browser. The API still
 * enforces every permission.
 */
export function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status, needsSchoolSelection } = useAuth();
  const isPublic = isPublicPath(pathname);

  useEffect(() => {
    if (!isPublic && status === "unauthenticated") {
      router.replace(loginPathFor(pathname, window.location.search));
    }
  }, [isPublic, status, pathname, router]);

  if (isPublic) return <>{children}</>;
  if (status === "authenticated") return needsSchoolSelection ? <SchoolPicker /> : <>{children}</>;
  if (status === "unavailable") return <ServerUnavailable />;
  return <SessionSplash />;
}

function SessionSplash() {
  return (
    <AuthShell>
      <div role="status" className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Spinner /> Restoring your session…
      </div>
    </AuthShell>
  );
}

function ServerUnavailable() {
  const { error, retry, signOut } = useAuth();
  return (
    <AuthShell>
      <AuthStatus icon={CloudOff} title="We couldn't load your session" description={describeAuthError(error)}>
        <Button onClick={() => retry()}>
          <RotateCw data-icon="inline-start" /> Try again
        </Button>
        <Button variant="ghost" onClick={() => signOut()}>
          Sign out
        </Button>
      </AuthStatus>
    </AuthShell>
  );
}

/** Shown when the session has no active school but the user has some (`requiresTenantSelection`). */
function SchoolPicker() {
  const { user, schools, switchSchool, signOut } = useAuth();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const choose = async (tenantId: string) => {
    setPendingId(tenantId);
    setErrorMessage(null);
    try {
      await switchSchool(tenantId);
    } catch (err) {
      setErrorMessage(describeAuthError(err));
      setPendingId(null);
    }
  };

  return (
    <AuthShell
      title="Choose a school"
      description={`${user?.displayName ? `${user.displayName}, your` : "Your"} account belongs to several schools. Pick the one to work in; you can switch later from the header.`}
    >
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <ItemGroup className="gap-2">
        {schools.map((school) => (
          <Item
            key={school.tenantId}
            variant="outline"
            render={<button type="button" disabled={pendingId !== null} />}
            onClick={() => choose(school.tenantId)}
            className="cursor-pointer text-start hover:bg-muted disabled:opacity-60"
          >
            <ItemMedia variant="icon">
              <School />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{school.name}</ItemTitle>
              <ItemDescription className="capitalize">{school.roles.join(", ")}</ItemDescription>
            </ItemContent>
            <ItemActions>
              {pendingId === school.tenantId ? <Spinner /> : <ChevronRight className="size-4 rtl:rotate-180" />}
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
      <Button variant="ghost" className="w-full" onClick={() => signOut()}>
        <LogOut data-icon="inline-start" /> Sign out
      </Button>
    </AuthShell>
  );
}
