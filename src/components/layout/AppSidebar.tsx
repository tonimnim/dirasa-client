"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth/context";
import {
  GraduationCap,
  Users,
  Calendar,
  Clock,
  BookOpen,
  DollarSign,
  UserCheck,
  Megaphone,
  Settings,
  ShieldCheck,
  ClipboardList,
  FileSpreadsheet,
  Layers,
  LayoutDashboard,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  permission?: string;
  badge?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export function AppSidebar() {
  const pathname = usePathname();
  const { user, activeTenant, hasPermission } = useAuth();

  const sections: NavSection[] = [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "People & Safeguarding",
      items: [
        {
          title: "Students Directory",
          href: "/students",
          icon: GraduationCap,
          permission: "students.read",
        },
        {
          title: "Guardians & Custody",
          href: "/guardians",
          icon: ShieldCheck,
          permission: "guardians.read",
        },
        {
          title: "Staff & Faculty",
          href: "/staff",
          icon: Users,
          permission: "staff.read",
        },
      ],
    },
    {
      title: "Academics & Enrolment",
      items: [
        {
          title: "Academic Structure",
          href: "/academics",
          icon: Layers,
          permission: "academics.read",
        },
        {
          title: "Enrolment & Classes",
          href: "/enrolment",
          icon: BookOpen,
          permission: "enrolment.read",
        },
      ],
    },
    {
      title: "Daily Operations",
      items: [
        {
          title: "Attendance Registers",
          href: "/attendance",
          icon: ClipboardList,
          permission: "attendance.read",
        },
        {
          title: "Timetable & Calendar",
          href: "/timetable",
          icon: Clock,
          permission: "timetable.read",
        },
      ],
    },
    {
      title: "Assessment & Finance",
      items: [
        {
          title: "Gradebook & Reports",
          href: "/gradebook",
          icon: FileSpreadsheet,
          permission: "gradebook.read",
        },
        {
          title: "Finance & Invoicing",
          href: "/finance",
          icon: DollarSign,
          permission: "finance.billing.read",
        },
        {
          title: "Admissions Funnel",
          href: "/admissions",
          icon: UserCheck,
          permission: "admissions.read",
        },
      ],
    },
    {
      title: "Engagement & Administration",
      items: [
        {
          title: "Communication",
          href: "/communication",
          icon: Megaphone,
          permission: "announcements.read",
        },
        {
          title: "School Settings",
          href: "/settings",
          icon: Settings,
          permission: "school.settings.read",
        },
      ],
    },
  ];

  return (
    <aside className="w-64 border-e border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-screen select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
          D
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-bold text-slate-900 dark:text-white truncate text-base leading-tight">
            Dirasa SMS
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {activeTenant?.name || "School Portal"}
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {sections.map((section) => {
          const visibleItems = section.items.filter(
            (item) => !item.permission || hasPermission(item.permission) || !user
          );

          if (visibleItems.length === 0) return null;

          return (
            <div key={section.title} className="space-y-1">
              <h4 className="px-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {section.title}
              </h4>
              <div className="space-y-0.5 mt-1">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-sky-600 dark:text-sky-400" : "text-slate-400")} />
                      <span className="truncate">{item.title}</span>
                      {item.badge && (
                        <span className="ms-auto text-[10px] px-1.5 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* User Context & Active Role Footer */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-700 dark:text-slate-200">
            {user?.displayName ? user.displayName.slice(0, 2).toUpperCase() : "US"}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
              {user?.displayName || "System User"}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {user?.roles?.join(", ") || "School Staff"}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
