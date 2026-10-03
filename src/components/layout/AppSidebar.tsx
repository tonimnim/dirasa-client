"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/context";
import { dashboardAudience } from "@/lib/dashboard/audience";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  Home,
  Calendar,
  GraduationCap,
  User,
  Users,
  UserCheck,
  BookOpen,
  Settings,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const { user, activeTenant, hasPermission, roles } = useAuth();
  const isMobileRole = dashboardAudience(roles, user?.permissions ?? [], user?.platformRoles, Boolean(activeTenant)) === "mobile";
  const isSchoolLeader = roles.some((role) => ["manager", "deputy", "owner", "director", "principal"].includes(role));

  const primaryNav = [
    { title: "Home", href: "/dashboard", icon: Home },
    ...(hasPermission("academics.read") ? [{ title: "Calendar", href: "/calendar", icon: Calendar }] : []),
    { type: "spacer" as const },
    ...(hasPermission("academics.read") && !isMobileRole ? [{ title: "Classes", href: "/classes", icon: GraduationCap }] : []),
    { type: "spacer" as const },
    ...(hasPermission("students.read") && !isMobileRole ? [{ title: "Students", href: "/students", icon: User }] : []),
    ...(hasPermission("staff.read") && !isMobileRole ? [{ title: "Staff", href: "/staff", icon: UserCheck }] : []),
    ...(hasPermission("guardians.read") && !isMobileRole ? [{ title: "Guardians", href: "/guardians", icon: Users }] : []),
    ...(hasPermission("enrolment.read") && !isMobileRole ? [{ title: "Enrolment", href: "/enrolment", icon: BookOpen }] : []),
  ];

  const mySchoolNav = [
    ...(hasPermission("academics.read") && isSchoolLeader ? [{ title: "Academics", href: "/academics", icon: BookOpen }] : []),
    ...((hasPermission("data_protection.export") || hasPermission("data_protection.consents.read")) && !isMobileRole ? [{ title: "Data protection", href: "/records", icon: Users, hasArrow: true }] : []),
  ];

  const bottomNav = [
    { title: "Settings", href: "/settings", icon: Settings },
    ...(user?.platformRoles.includes("super_admin")
      ? [{ title: "Platform", href: "/platform", icon: ShieldCheck }]
      : []),
  ];

  return (
    <aside className="w-60 bg-[#0d1527] text-slate-300 flex flex-col h-screen select-none shrink-0 border-e border-slate-800/80 text-[13px]">
      {/* Top Logo placeholder & School selector */}
      <div className="p-4 pb-3 border-b border-slate-800/60 space-y-3">
        {/* Dashed Logo Area */}
        <div className="border border-dashed border-slate-600/70 rounded-md p-3 text-center cursor-pointer hover:border-slate-400 transition-colors bg-slate-900/30">
          <p className="text-[11px] text-slate-400 font-medium leading-tight">
            Place your<br />logo here
          </p>
        </div>

        {/* School Name & Academic Period */}
        <Link
          href="/settings"
          className="flex items-center justify-between group cursor-pointer pt-1"
        >
          <div className="min-w-0">
            <h2 className="text-xs font-bold text-white tracking-wide uppercase truncate group-hover:text-sky-400 transition-colors">
              {activeTenant?.name ?? "No school selected"}
            </h2>
            <p className="text-[11px] text-slate-400 truncate">
              Active school
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors shrink-0" />
        </Link>
      </div>

      {/* Main Nav Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 scrollbar-thin scrollbar-thumb-slate-800">
        {primaryNav.map((item, idx) => {
          if ("type" in item && item.type === "spacer") {
            return <div key={`spacer-${idx}`} className="h-2" />;
          }

          if (!("title" in item)) return null;

          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400",
                isActive
                  ? "bg-slate-800/90 text-white font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-sky-400" : "text-slate-400")} />
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}

        {/* Section: MY SCHOOL */}
        {mySchoolNav.length > 0 && <div className="pt-4 pb-1 px-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            MY SCHOOL
          </span>
        </div>}

        {mySchoolNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-1.5 rounded-md font-medium transition-colors justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400",
                isActive
                  ? "bg-slate-800/90 text-white font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-sky-400" : "text-slate-400")} />
                <span className="truncate">{item.title}</span>
              </div>
              {item.hasArrow && (
                <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              )}
            </Link>
          );
        })}

        <div className="h-2" />

        {/* Bottom Nav Items */}
        {bottomNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400",
                isActive
                  ? "bg-slate-800/90 text-white font-semibold"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/50"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-sky-400" : "text-slate-400")} />
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </div>

      {/* User Profile & Theme Toggle at Bottom */}
      <div className="p-3 border-t border-slate-800/60 bg-[#090f1d]">
        <div className="flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-2 min-w-0 flex-1 p-1 rounded-md hover:bg-slate-800/50 transition-colors cursor-pointer group">
            <div className="h-7 w-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-200 shrink-0">
              <User className="h-4 w-4" />
            </div>
            <span className="text-xs font-medium text-slate-200 truncate max-w-[96px]">
              {user?.displayName}
            </span>
          </div>
          <div className="shrink-0">
            <ThemeToggle size="sm" />
          </div>
        </div>
      </div>
    </aside>
  );
}
