"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { MeResponse, TenantSummary } from "@/types/api";
import { getMe, switchTenant as apiSwitchTenant, logout as apiLogout } from "@/lib/api/auth";
import { DEMO_ACCOUNTS, DemoRoleKey } from "./demoUsers";

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
  setMockUser: (user: MeResponse | null) => void;
  loginAsDemo: (roleKey: DemoRoleKey) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const DEMO_STORAGE_KEY = "dirasa_demo_user";

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
      if (typeof window !== "undefined") {
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(profile));
      }
    } catch {
      // Backend unavailable or no session; check localStorage for demo user
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(DEMO_STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored) as MeResponse;
            setUser(parsed);
            return;
          } catch {
            localStorage.removeItem(DEMO_STORAGE_KEY);
          }
        }
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const setMockUser = useCallback((newUser: MeResponse | null) => {
    setUser(newUser);
    if (typeof window !== "undefined") {
      if (newUser) {
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(DEMO_STORAGE_KEY);
      }
    }
  }, []);

  const loginAsDemo = useCallback((roleKey: DemoRoleKey) => {
    const demoInfo = DEMO_ACCOUNTS[roleKey];
    if (demoInfo) {
      setMockUser(demoInfo.profile);
    }
  }, [setMockUser]);

  const hasPermission = useCallback(
    (permissionKey: string): boolean => {
      if (!user) return false;
      // Admins and Principals have full access
      if (
        user.roles.includes("SchoolAdmin") ||
        user.roles.includes("Principal") ||
        user.permissions.includes("*")
      ) {
        return true;
      }
      // Normalize both dot and colon notation (e.g. students.read vs students:read)
      const dotNotation = permissionKey.replace(/:/g, ".");
      const colonNotation = permissionKey.replace(/\./g, ":");

      return user.permissions.some(
        (p) =>
          p === permissionKey ||
          p === dotNotation ||
          p === colonNotation
      );
    },
    [user]
  );

  const hasAnyPermission = useCallback(
    (...keys: string[]): boolean => {
      if (!user) return false;
      return keys.some((k) => hasPermission(k));
    },
    [user, hasPermission]
  );

  const switchSchool = useCallback(
    async (tenantId: string) => {
      setIsLoading(true);
      try {
        await apiSwitchTenant(tenantId);
        await refreshProfile();
      } catch {
        // If API switch fails or in demo mode, update local user's active tenant
        if (user && user.memberships) {
          const targetMembership = user.memberships.find((m) => m.tenantId === tenantId);
          if (targetMembership) {
            const updatedUser: MeResponse = {
              ...user,
              activeTenant: {
                id: targetMembership.tenantId,
                name: targetMembership.schoolName,
                slug: targetMembership.schoolSlug,
              },
            };
            setMockUser(updatedUser);
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [user, refreshProfile, setMockUser]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiLogout();
    } catch {
      // Ignore API errors on logout
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem(DEMO_STORAGE_KEY);
      }
      setUser(null);
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
        setMockUser,
        loginAsDemo,
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
