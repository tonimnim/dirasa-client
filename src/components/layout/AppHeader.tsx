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

export interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  actionButton?: React.ReactNode;
}

export function AppHeader({ title, subtitle, badge, actionButton }: AppHeaderProps = {}) {
  const { user, activeTenant, switchSchool, logout } = useAuth();
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const toggleDirection = (locale: string) => {
    const isRtl = locale === "ar";
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", locale);
  };

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
      {/* Left: Title or School Switcher & Search */}
      <div className="flex items-center gap-4 min-w-0">
        {title ? (
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[#1e3a34] truncate">{title}</h1>
              {badge && (
                <span className="text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* School Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowSchoolDropdown(!showSchoolDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <School className="h-3.5 w-3.5 text-teal-600" />
                <span className="truncate max-w-[160px]">
                  {activeTenant?.name || "REDCO ACADEMY"}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {showSchoolDropdown && user?.memberships && user.memberships.length > 0 && (
                <div className="absolute top-full mt-1.5 start-0 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
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
                      className={`w-full text-start px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-100 transition-colors ${
                        activeTenant?.id === membership.tenantId
                          ? "text-teal-600 font-semibold bg-teal-50"
                          : "text-slate-700"
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

      {/* Right: DreamClass Trial Banner + Actions + Menus */}
      <div className="flex items-center gap-3 shrink-0">
        {/* DreamClass Free Trial Banner */}
        <div className="hidden lg:flex items-center gap-2.5 bg-[#1e3a8a] text-white text-xs px-3.5 py-1.5 rounded-md font-medium shadow-sm">
          <span>You have 30 days left in your free trial.</span>
          <button className="bg-[#172554] hover:bg-[#0f172a] text-white px-2 py-0.5 rounded text-[11px] font-semibold transition-colors">
            Upgrade
          </button>
          <button className="bg-[#10b981] hover:bg-[#059669] text-white px-2.5 py-0.5 rounded text-[11px] font-bold transition-colors">
            Book Demo!
          </button>
        </div>

        {/* Custom Action Button */}
        {actionButton && <div>{actionButton}</div>}

        {/* Multi-language / RTL switcher */}
        <div className="hidden sm:flex items-center gap-1 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
          <Globe className="h-3.5 w-3.5 text-slate-400 ms-1.5" />
          <button
            onClick={() => toggleDirection("en")}
            className="px-2 py-1 text-[11px] font-medium rounded hover:bg-white transition-colors text-slate-700"
          >
            EN
          </button>
          <button
            onClick={() => toggleDirection("ar")}
            className="px-2 py-1 text-[11px] font-medium rounded hover:bg-white transition-colors text-slate-700"
          >
            العربية (RTL)
          </button>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 text-slate-500 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 end-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div className="h-7 w-7 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center">
              {user?.displayName ? user.displayName.slice(0, 1) : "M"}
            </div>
            <span className="text-xs font-medium text-slate-700 hidden xl:inline-block">
              {user?.displayName || "moses wetan..."}
            </span>
          </button>

          {showUserDropdown && (
            <div className="absolute top-full mt-1.5 end-0 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-900 truncate">
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
                className="w-full text-start px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors"
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
