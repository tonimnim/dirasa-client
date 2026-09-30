"use client";

import React from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  GraduationCap,
  ShieldCheck,
  ClipboardList,
  Calendar,
  FileSpreadsheet,
  DollarSign,
  UserCheck,
  Megaphone,
  CheckCircle2,
  Lock,
  Globe2,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const subsystems = [
    {
      title: "People & Safeguarding",
      desc: "Student 360, Staff contracts & pay, Guardians with verified legal custody links.",
      icon: ShieldCheck,
      badge: "Active",
      badgeVariant: "success" as const,
      stat: "1,240 Students",
      action: "Review Custody",
    },
    {
      title: "Academic Setup & Structure",
      desc: "Years, terms/periods, working weeks, Ramadan variants, and curriculum templates.",
      icon: Calendar,
      badge: "Configured",
      badgeVariant: "info" as const,
      stat: "2026/2027 Active",
      action: "Setup Years",
    },
    {
      title: "Attendance Management",
      desc: "Statutory AM/PM daily & lesson registers, automated absence alert buffer.",
      icon: ClipboardList,
      badge: "Operational",
      badgeVariant: "success" as const,
      stat: "96.4% Rate Today",
      action: "Take Register",
    },
    {
      title: "Timetable & Bell Schedules",
      desc: "Cycle timetables, bell schedules (standard & Ramadan), daily teacher cover board.",
      icon: Calendar,
      badge: "Scheduled",
      badgeVariant: "default" as const,
      stat: "Cycle Day 3 (A)",
      action: "View Grid",
    },
    {
      title: "Gradebook & Report Cards",
      desc: "13 country scales (GCSE, WAEC, KCSE, CAPS), weighted marks, multi-lingual cards.",
      icon: FileSpreadsheet,
      badge: "Term 1 Open",
      badgeVariant: "warning" as const,
      stat: "42 Class Courses",
      action: "Enter Marks",
    },
    {
      title: "Finance & Gateways",
      desc: "Fee catalogues, split billing, billing runs, invoices, M-Pesa STK push & Paystack.",
      icon: DollarSign,
      badge: "Reconciled",
      badgeVariant: "success" as const,
      stat: "$184,200 Collected",
      action: "Billing Run",
    },
    {
      title: "Admissions Pipeline",
      desc: "Public application forms, age cut-offs, document portal, 1-click student conversion.",
      icon: UserCheck,
      badge: "Open Intake",
      badgeVariant: "info" as const,
      stat: "85 In Pipeline",
      action: "Review Apps",
    },
    {
      title: "Communication Center",
      desc: "Audience targeted announcements, pastoral notes, secure 1:1 guardian threads.",
      icon: Megaphone,
      badge: "Dispatched",
      badgeVariant: "default" as const,
      stat: "4 Announcements",
      action: "New Broadcast",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Dynamic Nav Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AppHeader />

        <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Hero Banner with Security & Tenancy Highlight */}
          <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 md:p-8 shadow-sm border border-slate-800 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="info" className="bg-sky-500/20 text-sky-200 border-sky-400/30">
                  Clean Architecture v1.0
                </Badge>
                <Badge variant="success" className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30">
                  Data-Scoped RBAC
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  Bi-Directional RTL/LTR
                </Badge>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Dirasa School Information & Management System
              </h1>

              <p className="text-slate-300 text-sm leading-relaxed">
                Enterprise multi-tenant frontend engineered for schools across the Middle East, Africa, UK, and international curricula. Fully aligned with the .NET backend domain specifications, strict custody safeguarding, and optimistic concurrency.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm" className="bg-sky-500 hover:bg-sky-600 text-white">
                  Take Today&apos;s Register <ArrowRight className="h-3.5 w-3.5 ms-1" />
                </Button>
                <Button variant="outline" size="sm" className="text-white border-slate-700 hover:bg-slate-800">
                  Manage Admissions
                </Button>
              </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute end-0 top-0 bottom-0 w-96 bg-gradient-to-s from-sky-500/10 to-transparent pointer-events-none" />
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Active Students</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">1,240</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <GraduationCap className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Attendance Rate</p>
                  <p className="text-xl font-bold text-emerald-600 mt-0.5">96.4%</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Safeguarding Alerts</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">0 Active</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-rose-50 dark:bg-rose-950 flex items-center justify-center text-rose-600 dark:text-rose-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Fee Collection</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">92.1%</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <DollarSign className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subsystems Status & Control Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  System Architecture & Subsystems
                </h2>
                <p className="text-xs text-slate-500">
                  Backend domain mapping and live operational modules
                </p>
              </div>
              <Badge variant="outline" className="text-slate-600 text-xs">
                All Systems Normal
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {subsystems.map((subsystem) => {
                const Icon = subsystem.icon;
                return (
                  <Card key={subsystem.title} className="hover:border-sky-300 dark:hover:border-sky-700 transition-all flex flex-col justify-between">
                    <CardHeader className="p-5 pb-3 border-none">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                          <Icon className="h-4 w-4" />
                        </div>
                        <Badge variant={subsystem.badgeVariant}>{subsystem.badge}</Badge>
                      </div>
                      <CardTitle className="text-sm font-semibold">{subsystem.title}</CardTitle>
                      <CardDescription className="text-xs text-slate-500 line-clamp-2">
                        {subsystem.desc}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-5 pb-5 pt-0">
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          {subsystem.stat}
                        </span>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-sky-600 dark:text-sky-400 p-0 hover:bg-transparent">
                          {subsystem.action} →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Architecture & Safeguarding Invariants Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-sky-600" />
                  Safeguarding & Data Scope Invariants
                </CardTitle>
                <CardDescription>
                  Strict security rules enforced by the backend and respected by the client UI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Custody Restrictions:</strong> <code className="text-[11px] bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">NoRecordAccess</code> and <code className="text-[11px] bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">NoContact</code> legally suppress all notifications and emergency alerts to prevent child location leakage.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Teacher Scope (AC):</strong> Teachers only see students enrolled in sections or courses they explicitly teach or homeroom-tutor.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>PostgreSQL xmin Concurrency:</strong> Every aggregate mutation passes the read <code className="text-[11px] bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">version</code> token to guarantee zero lost updates.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>CSRF WebClientGuard:</strong> Browser calls send <code className="text-[11px] bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">X-Dirasa-Client: web</code> and use <code className="text-[11px] bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">__Host-dirasa_rt</code> HttpOnly cookies.
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-sky-600" />
                  Localization & Multi-Script
                </CardTitle>
                <CardDescription>
                  International curricula support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-1">
                  <p className="font-semibold text-slate-900 dark:text-white">Supported Languages</p>
                  <p className="text-slate-500">English (en), Arabic (ar - RTL), French (fr), Swahili (sw).</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-1">
                  <p className="font-semibold text-slate-900 dark:text-white">Grading Systems</p>
                  <p className="text-slate-500">GCSE 9-1, WAEC A1-F9, KCSE, CAPS 1-7, CBSE, UAE MoE, IB.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-1">
                  <p className="font-semibold text-slate-900 dark:text-white">Regional Gateways</p>
                  <p className="text-slate-500">Kenya M-Pesa STK push & C2B, West/South Africa Paystack, Stripe.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
