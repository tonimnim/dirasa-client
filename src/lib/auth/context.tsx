"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { MeResponse, TenantSummary } from "@/types/api";
import { getMe, switchTenant as apiSwitchTenant, logout as apiLogout } from "@/lib/api/auth";

interface AuthContextValue {
  user: MeResponse | null;
  activeTenant: TenantSummary | null;
  roles: string[];
  permissions: string[];
  isLoading: boolean;
  error: string | null;
  hasPermission: (permissionKey: string) => boolean;
  hasAnyPermission: (...keys: string[]) => boolean;
  switchSchool: (tenantId: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const profile = await getMe();
      setUser(profile);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const hasPermission = useCallback(
    (permissionKey: string): boolean => {
      if (!user) return false;
      return user.permissions.includes(permissionKey);
    },
    [user]
  );

  const hasAnyPermission = useCallback(
    (...keys: string[]): boolean => {
      if (!user) return false;
      return keys.some((k) => user.permissions.includes(k));
    },
    [user]
  );

  const switchSchool = useCallback(
    async (tenantId: string) => {
      setIsLoading(true);
      try {
        await apiSwitchTenant(tenantId);
        await refreshProfile();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to switch school");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [refreshProfile]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiLogout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        activeTenant: user?.activeTenant ?? null,
        roles: user?.roles ?? [],
        permissions: user?.permissions ?? [],
        isLoading,
        error,
        hasPermission,
        hasAnyPermission,
        switchSchool,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
