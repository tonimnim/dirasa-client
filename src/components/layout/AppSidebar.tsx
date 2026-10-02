"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/context";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  Home,
  Calendar,
  GraduationCap,
  User,
  Users,
  UserCheck,
  CalendarCheck,
  FileCheck,
  CreditCard,
  FileText,
  Mail,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  FolderOpen,
  Settings,
  HeartHandshake,
  ChevronRight,
  MoreHorizontal,
  Plus,
} from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const { user, activeTenant } = useAuth();

  const primaryNav = [
    { title: "Home", href: "/dashboard", icon: Home },
    { title: "Calendar", href: "/calendar", icon: Calendar },
    { type: "spacer" as const },
    { title: "Classes", href: "/classes", icon: GraduationCap },
    { type: "spacer" as const },
    { title: "Students", href: "/students", icon: User },
    { title: "Teachers", href: "/teachers", icon: UserCheck },
    { title: "Families", href: "/families", icon: Users },
    { type: "spacer" as const },
    { title: "Attendance", href: "/attendance", icon: CalendarCheck },
    { title: "Grading", href: "/grading", icon: FileCheck },
    { title: "Fees & Invoicing", href: "/fees", icon: CreditCard },
    { title: "Admissions & Forms", href: "/admissions", icon: FileText },
    { title: "My Messages", href: "/messages", icon: Mail },
    { title: "Communication", href: "/communication", icon: ArrowUpRight },
    { title: "Reports", href: "/reports", icon: BarChart3 },
  ];

  const mySchoolNav = [
    { title: "Curriculum", href: "/curriculum", icon: BookOpen },
    { title: "Records", href: "/records", icon: Users, hasArrow: true },
    { title: "Donations", href: "/donations", icon: HeartHandshake },
  ];

  const bottomNav = [
    { title: "School File Center", href: "/files", icon: FolderOpen },
    { title: "Settings", href: "/settings", icon: Settings },
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
              Sep 2026 - Jul 2027
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
        <div className="pt-4 pb-1 px-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            MY SCHOOL
          </span>
        </div>

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
