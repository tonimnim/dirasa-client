"use client";

import React from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/context";
import { describeAuthError } from "@/lib/auth/errors";
import { Breadcrumbs, BreadcrumbItem } from "@/components/legacy-ui/Breadcrumbs";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Check, ChevronDown, Globe, LogOut, MonitorSmartphone, School } from "lucide-react";

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase() || "?";
}

export interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actionButton?: React.ReactNode;
}

export function AppHeader({ title, subtitle, badge, breadcrumbs, actionButton }: AppHeaderProps = {}) {
  const { user, activeTenant, schools, switchSchool, signOut, signOutEverywhere } = useAuth();

  const changeSchool = async (tenantId: string, name: string) => {
    if (tenantId === activeTenant?.id) return;
    try {
      await switchSchool(tenantId);
      toast.success(`Switched to ${name}`);
    } catch (err) {
      toast.error(describeAuthError(err));
    }
  };

  const signOutAllDevices = async () => {
    await signOutEverywhere();
    toast.success("Signed out on every device");
  };

  const toggleDirection = (locale: string) => {
    const isRtl = locale === "ar";
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", locale);
  };

  return (
    <header className="min-h-16 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0 transition-colors">
      {/* Left: Breadcrumbs + Title or School Switcher */}
      <div className="flex flex-col justify-center min-w-0 py-0.5">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-1">
            <Breadcrumbs items={breadcrumbs} showHomeIcon />
          </div>
        )}

        {title ? (
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white truncate tracking-tight">{title}</h1>
              {badge && (
                <span className="text-[10px] font-bold bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{subtitle}</p>}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* School Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" size="sm" aria-label="Switch school" />}>
                <School data-icon="inline-start" className="text-teal-600 dark:text-teal-400" />
                <span className="max-w-[160px] truncate">{activeTenant?.name ?? "No school selected"}</span>
                <ChevronDown data-icon="inline-end" className="text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Switch school</DropdownMenuLabel>
                  {schools.map((school) => (
                    <DropdownMenuItem key={school.tenantId} onClick={() => changeSchool(school.tenantId, school.name)}>
                      <span className="flex-1 truncate">{school.name}</span>
                      {activeTenant?.id === school.tenantId ? (
                        <Check className="text-primary" />
                      ) : (
                        <span className="text-[10px] uppercase text-muted-foreground">{school.roles[0]}</span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Right: Actions + Theme + Menus */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Custom Action Button */}
        {actionButton && <div>{actionButton}</div>}

        {/* Theme Toggle (Light / Dark Mode) */}
        <ThemeToggle variant="compact" />

        {/* Multi-language / RTL switcher */}
        <div className="hidden sm:flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-800">
          <Globe className="h-3.5 w-3.5 text-slate-400 ms-1.5" />
          <button
            onClick={() => toggleDirection("en")}
            className="px-2 py-1 text-[11px] font-medium rounded hover:bg-white dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            EN
          </button>
          <button
            onClick={() => toggleDirection("ar")}
            className="px-2 py-1 text-[11px] font-medium rounded hover:bg-white dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200 cursor-pointer"
          >
            العربية (RTL)
          </button>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="h-9 gap-2 px-1.5" aria-label="Account menu" />}>
            <Avatar size="sm">
              <AvatarFallback className="bg-teal-600 text-[10px] font-bold text-white">
                {initialsOf(user?.displayName ?? "")}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-xs font-medium xl:inline-block">{user?.displayName}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex flex-col gap-0.5">
                <span className="truncate text-sm font-semibold text-foreground">{user?.displayName}</span>
                {user?.email && <span className="truncate font-normal">{user.email}</span>}
                {activeTenant && (
                  <span className="truncate font-normal capitalize">
                    {activeTenant.name} · {user?.roles.join(", ")}
                  </span>
                )}
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => signOut()}>
                <LogOut /> Sign out
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={signOutAllDevices}>
                <MonitorSmartphone /> Sign out of all devices
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
