"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth/context";
import {
  Bell,
  Search,
  School,
  Globe,
  LogOut,
  ChevronDown,
} from "lucide-react";

export function AppHeader() {
  const { user, activeTenant, switchSchool, logout } = useAuth();
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleDirection = (locale: string) => {
    const isRtl = locale === "ar";
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", locale);
  };

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left: School Switcher & Search */}
      <div className="flex items-center gap-4 flex-1">
        {/* School Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowSchoolDropdown(!showSchoolDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors"
          >
            <School className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
            <span className="truncate max-w-[160px]">
              {activeTenant?.name || "Select School"}
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {showSchoolDropdown && user?.memberships && user.memberships.length > 0 && (
            <div className="absolute top-full mt-1.5 start-0 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
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
                  className={`w-full text-start px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                    activeTenant?.id === membership.tenantId
                      ? "text-sky-600 font-semibold bg-sky-50 dark:bg-sky-950/40"
                      : "text-slate-700 dark:text-slate-300"
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

        {/* Global Search Bar */}
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students, staff, classes, or records... (⌘K)"
            className="w-full h-9 ps-9 pe-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-900 dark:text-slate-100"
          />
        </div>
      </div>

      {/* Right: Language Switcher, Notifications, User Menu */}
      <div className="flex items-center gap-2">
        {/* Multi-language / RTL switcher */}
        <div className="flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-800">
          <Globe className="h-3.5 w-3.5 text-slate-400 ms-1.5" />
          <button
            onClick={() => toggleDirection("en")}
            className="px-2 py-1 text-[11px] font-medium rounded hover:bg-white dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200"
          >
            EN
          </button>
          <button
            onClick={() => toggleDirection("ar")}
            className="px-2 py-1 text-[11px] font-medium rounded hover:bg-white dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-200"
          >
            العربية (RTL)
          </button>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 end-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="h-7 w-7 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
              {user?.displayName ? user.displayName.slice(0, 1) : "U"}
            </div>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-200 hidden lg:inline-block">
              {user?.displayName || "Account"}
            </span>
          </button>

          {showUserDropdown && (
            <div className="absolute top-full mt-1.5 end-0 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                  {user?.displayName || "User"}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {user?.email || "user@dirasa.edu"}
                </p>
              </div>
              <button
                onClick={() => {
                  logout();
                  setShowUserDropdown(false);
                }}
                className="w-full text-start px-3 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 transition-colors"
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
