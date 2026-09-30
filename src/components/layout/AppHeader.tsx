"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  Bell,
  Search,
  School,
  Globe,
  LogOut,
  ChevronDown,
} from "lucide-react";

export interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  actionButton?: React.ReactNode;
}

export function AppHeader({ title, subtitle, badge, breadcrumbs, actionButton }: AppHeaderProps = {}) {
  const { user, activeTenant, switchSchool, logout } = useAuth();
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

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
            <div className="relative">
              <button
                onClick={() => setShowSchoolDropdown(!showSchoolDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer transition-colors"
                aria-label="Switch school"
                aria-expanded={showSchoolDropdown}
              >
                <School className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                <span className="truncate max-w-[160px]">
                  {activeTenant?.name || "REDCO ACADEMY"}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {showSchoolDropdown && user?.memberships && user.memberships.length > 0 && (
                <div className="absolute top-full mt-1.5 start-0 w-64 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-1 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch School
                  </div>
                  {user.memberships.map((membership) => (
                    <button
                      key={membership.tenantId}
                      onClick={async () => {
                        await switchSchool(membership.tenantId);
                        setShowSchoolDropdown(false);
                      }}
                      className={`w-full text-start px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                        activeTenant?.id === membership.tenantId
                          ? "text-teal-600 dark:text-teal-400 font-semibold bg-teal-50 dark:bg-teal-950/40"
                          : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      <span className="truncate">{membership.schoolName}</span>
                      <span className="text-[10px] text-slate-400 uppercase">
                        {membership.roles[0]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right: DreamClass Trial Banner + Actions + Theme + Menus */}
      <div className="flex items-center gap-3 shrink-0">
        {/* DreamClass Free Trial Banner */}
        <div className="hidden lg:flex items-center gap-2.5 bg-[#1e3a8a] text-white text-xs px-3.5 py-1.5 rounded-md font-medium shadow-sm">
          <span>You have 30 days left in your free trial.</span>
          <button className="bg-[#172554] hover:bg-[#0f172a] text-white px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer">
            Upgrade
          </button>
          <button className="bg-[#10b981] hover:bg-[#059669] text-white px-2.5 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer">
            Book Demo!
          </button>
        </div>

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
          <span className="absolute top-1.5 end-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
            aria-label="User Profile Menu"
            aria-expanded={showUserDropdown}
          >
            <div className="h-7 w-7 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
              {user?.displayName ? user.displayName.slice(0, 1) : "M"}
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-200 hidden xl:inline-block">
              {user?.displayName || "Moses Wetangula"}
            </span>
          </button>

          {showUserDropdown && (
            <div className="absolute top-full mt-1.5 end-0 w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-1 z-50">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {user?.displayName || "Moses Wetangula"}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {user?.email || "moses@redco.academy"}
                </p>
              </div>
              <button
                onClick={() => {
                  logout();
                  setShowUserDropdown(false);
                }}
                className="w-full text-start px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
