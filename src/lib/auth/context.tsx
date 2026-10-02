"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { MembershipSummary, MeResponse, TenantSummary } from "@/types/api";
import { DirasaApiError, onSessionEvent, refreshAccessToken } from "@/lib/api/client";
import {
  getMe,
  login as apiLogin,
  logout as apiLogout,
  logoutAll as apiLogoutAll,
  switchTenant as apiSwitchTenant,
} from "@/lib/api/auth";

/**
 * - `loading`: restoring the session on page load.
 * - `unavailable`: the API could not answer (outage, throttling); the session may still be valid.
 */
export type AuthStatus = "loading" | "authenticated" | "unauthenticated" | "unavailable";

interface AuthContextValue {
  status: AuthStatus;
  user: MeResponse | null;
  activeTenant: TenantSummary | null;
  roles: string[];
  permissions: string[];
  /** Schools the user can switch to (active memberships). */
  schools: MembershipSummary[];
  /** Signed in with schools available but none active: show the school picker. */
  needsSchoolSelection: boolean;
  /** Why the status is `unavailable`. */
  error: DirasaApiError | null;
  hasPermission: (permissionKey: string) => boolean;
  hasAnyPermission: (...keys: string[]) => boolean;
  signIn: (identifier: string, password: string, rememberMe: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  signOutEverywhere: () => Promise<void>;
  switchSchool: (tenantId: string) => Promise<void>;
  reloadProfile: () => Promise<void>;
  /** Restores the session again after `unavailable`. */
  retry: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function toApiError(error: unknown): DirasaApiError {
  return error instanceof DirasaApiError
    ? error
    : new DirasaApiError(0, { code: "unknown_error", title: "Something went wrong." });
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUser] = useState<MeResponse | null>(null);
  const [error, setError] = useState<DirasaApiError | null>(null);
  const userRef = useRef<MeResponse | null>(null);
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const signedOut = useCallback(() => {
    setUser(null);
    setError(null);
    setStatus("unauthenticated");
  }, []);

  const loadProfile = useCallback(async () => {
    try {
      const profile = await getMe();
      setUser(profile);
      setError(null);
      setStatus("authenticated");
    } catch (err) {
      const apiError = toApiError(err);
      if (apiError.code === "session_expired") {
        signedOut();
      } else {
        setError(apiError);
        setStatus("unavailable");
      }
    }
  }, [signedOut]);

  // The refresh cookie is the only thing that survives a page load.
  const restore = useCallback(
    () =>
      refreshAccessToken(null).then(
        (token) => (token ? loadProfile() : signedOut()),
        (err: unknown) => {
          setError(toApiError(err));
          setStatus("unavailable");
        }
      ),
    [loadProfile, signedOut]
  );

  // Status starts as "loading".
  useEffect(() => {
    restore();
  }, [restore]);

  const retry = useCallback(async () => {
    setStatus("loading");
    await restore();
  }, [restore]);

  useEffect(
    () =>
      onSessionEvent((event) => {
        if (event.type === "signed-out") {
          signedOut();
        } else if (event.type === "profile-stale") {
          loadProfile();
        } else if (event.fromOtherTab) {
          // Another tab signed in, or switched school: follow it.
          const current = userRef.current;
          if (!current || (current.activeTenant?.id ?? null) !== event.tenantId) {
            loadProfile();
          }
        }
      }),
    [loadProfile, signedOut]
  );

  const signIn = useCallback(
    async (identifier: string, password: string, rememberMe: boolean) => {
      await apiLogin({ identifier, password, rememberMe });
      await loadProfile();
    },
    [loadProfile]
  );

  const signOut = useCallback(async () => {
    try {
      await apiLogout();
    } catch {
      // The local session is cleared regardless; the refresh cookie expires on its own.
    }
    signedOut();
  }, [signedOut]);

  const signOutEverywhere = useCallback(async () => {
    try {
      await apiLogoutAll();
    } catch {
      // As above: never leave the user signed in locally because the API failed.
    }
    signedOut();
  }, [signedOut]);

  const switchSchool = useCallback(
    async (tenantId: string) => {
      await apiSwitchTenant(tenantId);
      await loadProfile();
    },
    [loadProfile]
  );

  const value = useMemo<AuthContextValue>(() => {
    const permissions = user?.permissions ?? [];
    const schools = user?.memberships.filter((m) => m.status === "active") ?? [];
    const hasPermission = (key: string) => permissions.includes(key);
    return {
      status,
      user,
      activeTenant: user?.activeTenant ?? null,
      roles: user?.roles ?? [],
      permissions,
      schools,
      needsSchoolSelection: status === "authenticated" && !user?.activeTenant && schools.length > 0,
      error,
      hasPermission,
      hasAnyPermission: (...keys: string[]) => keys.some(hasPermission),
      signIn,
      signOut,
      signOutEverywhere,
      switchSchool,
      reloadProfile: loadProfile,
      retry,
    };
  }, [status, user, error, signIn, signOut, signOutEverywhere, switchSchool, loadProfile, retry]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
