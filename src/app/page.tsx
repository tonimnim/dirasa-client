"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import {
  GraduationCap,
  ShieldCheck,
  Calendar,
  ClipboardList,
  FileSpreadsheet,
  DollarSign,
  UserCheck,
  Globe,
  CheckCircle2,
  ArrowRight,
  Lock,
  Sparkles,
  Users,
  Award,
  Zap,
  Building2,
  Clock,
  BookOpen,
  HeartHandshake,
  Menu,
  X,
  CreditCard,
  ChevronRight,
  TrendingUp,
  Star,
  Check,
  ExternalLink,
  Laptop,
} from "lucide-react";

export default function MarketingLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePortalTab, setActivePortalTab] = useState<"principal" | "teacher" | "parent" | "student">("principal");
  const [activeLanguagePreview, setActiveLanguagePreview] = useState<"en" | "ar" | "fr" | "sw">("en");

  // Multi-lingual preview dictionary
  const localizedContent = {
    en: {
      langName: "English (LTR)",
      dir: "ltr",
      headline: "Enterprise Multi-Tenant School Information & Management System",
      subline: "Unified statutory attendance, safeguarding custody invariants, and local financial gateways.",
      bannerNotice: "Statutory Register Complete: 98.4% Morning Attendance Logged",
      roleMetric: "Real-time School KPI Dashboard",
      ctaDemo: "Experience Live Demo",
      sampleStudent: "Amina Al-Mansoor (Year 8) • Attendance: 99.2%",
    },
    ar: {
      langName: "العربية (Arabic - RTL)",
      dir: "rtl",
      headline: "نظام دراسة المتكامل لإدارة المدارس والامتثال الأكاديمي الدولي",
      subline: "سجلات الحضور القانونية، حماية الحضانة الأسرية، ودعم المناهج المتعددة وفق معايير هيئات التفتيش.",
      bannerNotice: "اكتمل تسجيل الحضور الصباحي: نسبة الحضور 98.4% لليوم الدراسي",
      roleMetric: "لوحة القيادة والمؤشرات الإدارية المباشرة",
      ctaDemo: "تجربة النظام المباشرة",
      sampleStudent: "آمنة المنصور (الصف الثامن) • نسبة الحضور: 99.2%",
    },
    fr: {
      langName: "Français (French - LTR)",
      dir: "ltr",
      headline: "Système Intégré de Gestion Scolaire et de Conformité Réglementaire",
      subline: "Registres de présence légaux, protection stricte de la garde parentale et facturation multi-devises.",
      bannerNotice: "Appel du matin validé: 98.4% de présence enregistrée",
      roleMetric: "Tableau de Bord Exécutif en Temps Réel",
      ctaDemo: "Démonstration Interactive",
      sampleStudent: "Amina Al-Mansoor (Classe de 4ème) • Présence: 99.2%",
    },
    sw: {
      langName: "Kiswahili (Swahili - LTR)",
      dir: "ltr",
      headline: "Mfumo wa Kisasa wa Usimamizi wa Shule na Uzingatiaji wa Sheria",
      subline: "Mahudhurio ya kisheria, ulinzi thabiti wa watoto na malipo ya haraka ya M-Pesa.",
      bannerNotice: "Usajili wa Mahudhurio Umekamilika: 98.4% Mahudhurio Leo",
      roleMetric: "Dashibodi ya Takwimu za Uendeshaji wa Shule",
      ctaDemo: "Jaribu Mfumo Sasa",
      sampleStudent: "Amina Al-Mansoor (Darasa la 8) • Mahudhurio: 99.2%",
    },
  };

  const curriculaBadges = [
    { title: "UK National Curriculum", desc: "GCSE, IGCSE & A-Levels", tag: "Ofsted Aligned" },
    { title: "International Baccalaureate", desc: "IB PYP, MYP & DP", tag: "Inquiry Scales" },
    { title: "US Common Core & AP", desc: "GPA 4.0 & Advanced Placement", tag: "Standard-Based" },
    { title: "West African WAEC", desc: "WASSCE & BECE A1-F9", tag: "Statutory Scale" },
    { title: "Kenya CBC & KCSE", desc: "Competency Assessment", tag: "MoE Aligned" },
    { title: "UAE MoE Inspection", desc: "KHDA & ADEK Compliant", tag: "National Framework" },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Safeguarding & Custody Invariants",
      category: "Child Safety & Legal Isolation",
      desc: "Zero-tolerance legal custody enforcement. Court-ordered NoRecordAccess and NoContact tags instantly suppress all notifications, portal views, and emergency collection rosters.",
      points: [
        "Hardened court-ordered custody filters",
        "Zero unauthorized child location leakage",
        "Granular legal guardian verification workflows",
      ],
      color: "from-sky-500/10 to-indigo-500/5 text-sky-600 border-sky-200 dark:border-sky-800",
    },
    {
      icon: Calendar,
      title: "Cycle Timetables & Ramadan Schedules",
      category: "Dynamic Academic Operations",
      desc: "Effortlessly handle complex 2-week cycle schedules, rotating day patterns, and 1-click automatic transitions between standard and reduced-hour Ramadan bell schedules.",
      points: [
        "Multi-week rotational cycle timetabling (Day 1-10)",
        "Automated Ramadan timetable hour compression",
        "Teacher absence cover board with clash detection",
      ],
      color: "from-emerald-500/10 to-teal-500/5 text-emerald-600 border-emerald-200 dark:border-emerald-800",
    },
    {
      icon: ClipboardList,
      title: "Statutory Daily & Lesson Attendance",
      category: "National Regulatory Compliance",
      desc: "Compliant with UK statutory AM/PM registers, lesson-by-lesson audits, automated absence alerts to guardians via SMS/WhatsApp, and real-time attendance rate analytics.",
      points: [
        "Morning & afternoon legal statutory roll-call",
        "Single-click bulk marking with custom sub-codes",
        "Absence alert queues with guardian acknowledgement",
      ],
      color: "from-amber-500/10 to-orange-500/5 text-amber-600 border-amber-200 dark:border-amber-800",
    },
    {
      icon: FileSpreadsheet,
      title: "13 Country Gradebook & Report Cards",
      category: "Assessment & Multi-Scale Reporting",
      desc: "Native support for GCSE 9-1, WAEC A1-F9, KCSE, CAPS 1-7, CBSE marks, and IB criterion rubrics. Generate bilingual report cards with weighted continuous assessment.",
      points: [
        "13 national and international grading scales",
        "Weighted summative & formative assessment books",
        "Bilingual printable PDF report cards with teacher comments",
      ],
      color: "from-purple-500/10 to-pink-500/5 text-purple-600 border-purple-200 dark:border-purple-800",
    },
    {
      icon: DollarSign,
      title: "Finance & Gateways: M-Pesa & Paystack",
      category: "Regional Fee Collections & Invoicing",
      desc: "Automated billing runs, split guardian invoices, and sibling discounts. Seamless integration with East Africa M-Pesa STK Push, West Africa Paystack, and international Stripe.",
      points: [
        "Kenya M-Pesa STK Push instant mobile reconciliation",
        "Paystack & Stripe multi-currency processing",
        "Split billing schedules across separated guardians",
      ],
      color: "from-teal-500/10 to-emerald-500/5 text-teal-600 border-teal-200 dark:border-teal-800",
    },
    {
      icon: UserCheck,
      title: "Public Admissions & Age Eligibility",
      category: "Applicant Funnel & Enrolment",
      desc: "Configurable multi-step online admissions portal. Automated statutory age calculation against national intake cut-off dates, document verification, and 1-click student creation.",
      points: [
        "Statutory age calculation as of September 1st cut-off",
        "Parent document upload & identity audit trail",
        "Instant reference code generation with tracking status",
      ],
      color: "from-blue-500/10 to-cyan-500/5 text-blue-600 border-blue-200 dark:border-blue-800",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* ---------------- NAVIGATION HEADER ---------------- */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              D
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                Dirasa
                <span className="text-xs font-bold text-sky-600 px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 tracking-normal">
                  SMS
                </span>
              </span>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium -mt-1 hidden sm:block">
                School Information &amp; Management Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              Pillars &amp; Features
            </a>
            <a href="#curricula" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              Curricula
            </a>
            <a href="#portals" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              Role Portals
            </a>
            <a href="#localization" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              Global RTL &amp; Gateways
            </a>
            <a href="#pricing" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              Pricing
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 px-3 py-2 transition-colors"
            >
              Sign In
            </Link>

            <Link href="/apply/demo-school">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-semibold border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Apply Now
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button
                variant="primary"
                size="sm"
                className="text-xs font-bold gap-1.5 bg-sky-600 hover:bg-sky-700 text-white shadow-md shadow-sky-600/20"
              >
                Enter Portal <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-5 space-y-4">
            <nav className="flex flex-col space-y-3 text-sm font-medium">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 dark:text-slate-300 py-1"
              >
                Pillars &amp; Features
              </a>
              <a
                href="#curricula"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 dark:text-slate-300 py-1"
              >
                Curricula
              </a>
              <a
                href="#portals"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 dark:text-slate-300 py-1"
              >
                Role Portals
              </a>
              <a
                href="#localization"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 dark:text-slate-300 py-1"
              >
                Global RTL &amp; Gateways
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-700 dark:text-slate-300 py-1"
              >
                Pricing
              </a>
            </nav>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-xs font-semibold justify-center">
                  Sign In to School
                </Button>
              </Link>
              <Link href="/apply/demo-school" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="secondary" className="w-full text-xs font-semibold justify-center">
                  Admissions Application
                </Button>
              </Link>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full text-xs font-semibold justify-center bg-sky-600">
                  Enter Portal Dashboard →
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-100 dark:border-slate-800">
        {/* Ambient decorative blobs */}
        <div className="absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-sky-400/10 via-indigo-500/10 to-teal-400/10 blur-3xl pointer-events-none -z-10 rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/80 border border-sky-200/80 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-xs font-semibold shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-sky-600 animate-pulse" />
            <span>Next-Generation School Operating System</span>
            <span className="h-1 w-1 rounded-full bg-sky-400" />
            <span>v1.0 Clean Architecture</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            The Global School OS Engineered for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-600 to-teal-600">
              Compliance, Safeguarding &amp; Excellence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Enterprise multi-tenant information platform built for international schools across the Middle East, Africa, UK, and beyond. Unified statutory AM/PM attendance, court-ordered custody invariants, 13 national gradebook scales, and native M-Pesa &amp; Paystack gateways.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto h-12 px-8 text-sm font-bold gap-2 bg-sky-600 hover:bg-sky-700 shadow-lg shadow-sky-600/25"
              >
                <Sparkles className="h-4 w-4" /> Explore 1-Click Role Demos
              </Button>
            </Link>

            <Link href="/apply/demo-school">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 px-8 text-sm font-semibold border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 gap-2"
              >
                <UserCheck className="h-4 w-4 text-sky-600" /> Admissions Application
              </Button>
            </Link>

            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto h-12 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white gap-1.5"
              >
                Enter Portal <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Multi-Curriculum Marquee Banner */}
          <div id="curricula" className="pt-12">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">
              Multi-Curriculum Grading &amp; Inspection Frameworks
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-6xl mx-auto">
              {curriculaBadges.map((c) => (
                <div
                  key={c.title}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs text-start hover:border-sky-400 dark:hover:border-sky-600 transition-all hover:shadow-sm"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-1">
                    {c.tag}
                  </span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {c.title}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- STATS & TRUST BAR ---------------- */}
      <section className="py-12 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-sky-400 tracking-tight">99.8%</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">Statutory Attendance Compliance</p>
              <p className="text-[11px] text-slate-500">Official Ofsted &amp; MoE automated rolls</p>
            </div>

            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">15+ Countries</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">International Deployments</p>
              <p className="text-[11px] text-slate-500">UAE, Kenya, Nigeria, UK, SA, Egypt &amp; Ghana</p>
            </div>

            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">0 Breaches</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">Safeguarding &amp; Custody Invariant</p>
              <p className="text-[11px] text-slate-500">250,000+ students safeguarded</p>
            </div>

            <div className="pt-4 md:pt-0">
              <p className="text-3xl sm:text-4xl font-black text-teal-400 tracking-tight">4.9 / 5.0</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">Principal Satisfaction Rating</p>
              <p className="text-[11px] text-slate-500">Across 180+ accredited academies</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CORE PILLARS SECTION ---------------- */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Architectural Foundations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Engineered Around Real School Realities
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              Standard generic school systems fail when subjected to statutory inspections, complex rotational timetables, strict family custody orders, and local African &amp; Middle Eastern payment rails. Dirasa was engineered from the domain up.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200 shadow-xs">
                        <Icon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        {pillar.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {pillar.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href="/login"
                      className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 inline-flex items-center gap-1 group"
                    >
                      Test in live demo <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- ROLE-BASED PORTALS INTERACTIVE SWITCHER ---------------- */}
      <section id="portals" className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Role-Tailored Workspaces
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Interactive Portal Experiences
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Every persona experiences a curated, secure interface matching their exact statutory role and data access scope.
            </p>
          </div>

          {/* Interactive Role Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 max-w-2xl mx-auto border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActivePortalTab("principal")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activePortalTab === "principal"
                  ? "bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Principal / Manager</span>
            </button>

            <button
              onClick={() => setActivePortalTab("teacher")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activePortalTab === "teacher"
                  ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>Lead Teacher</span>
            </button>

            <button
              onClick={() => setActivePortalTab("parent")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activePortalTab === "parent"
                  ? "bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Parent / Guardian</span>
            </button>

            <button
              onClick={() => setActivePortalTab("student")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activePortalTab === "student"
                  ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Student / Scholar</span>
            </button>
          </div>

          {/* Screenshot-like Mockup Container */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-2xl overflow-hidden max-w-5xl mx-auto">
            {/* Mockup Window Header */}
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-[11px] text-slate-500 ms-3 hidden sm:inline">
                  https://sms.dirasa.edu/{activePortalTab}-portal
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-slate-400">
                  {activePortalTab.toUpperCase()} SCOPE ACTIVE
                </span>
                <Link href="/login">
                  <Button size="sm" variant="primary" className="h-7 text-[11px] bg-sky-600 hover:bg-sky-700">
                    Launch Interactive Demo →
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mockup Screen Content */}
            <div className="p-6 md:p-8 bg-slate-900/90 text-slate-100">
              {/* TAB 1: PRINCIPAL / MANAGER */}
              {activePortalTab === "principal" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">Dr. Sarah Al-Mansoori</h3>
                        <Badge variant="info" className="bg-sky-500/20 text-sky-300">Principal &amp; CEO</Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Dirasa International Academy &bull; Academic Year 2026/2027</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" /> 0 Active Safeguarding Breaches
                      </span>
                    </div>
                  </div>

                  {/* Principal KPIs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
                      <p className="text-xs text-slate-400">Total Enrolled</p>
                      <p className="text-2xl font-black text-white mt-1">1,240</p>
                      <p className="text-[10px] text-emerald-400 mt-1">+48 This Term Intake</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
                      <p className="text-xs text-slate-400">AM Statutory Roll</p>
                      <p className="text-2xl font-black text-emerald-400 mt-1">98.4%</p>
                      <p className="text-[10px] text-slate-400 mt-1">100% Registers Reconciled</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
                      <p className="text-xs text-slate-400">Fee Collection Run</p>
                      <p className="text-2xl font-black text-teal-400 mt-1">$482,900</p>
                      <p className="text-[10px] text-teal-300 mt-1">92.4% Collected via M-Pesa/Card</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80">
                      <p className="text-xs text-slate-400">Admissions Pipeline</p>
                      <p className="text-2xl font-black text-amber-400 mt-1">85 Pending</p>
                      <p className="text-[10px] text-slate-400 mt-1">12 Age-verified for Sept</p>
                    </div>
                  </div>

                  {/* Principal Sub-modules */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                      <span className="font-semibold text-slate-200">Safeguarding Custody Audit Log</span>
                      <p className="text-slate-400">3 court-ordered custody filters currently active. No unauthorized collection incidents reported across all 4 school gates.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                      <span className="font-semibold text-slate-200">Ramadan Bell Schedule Variant</span>
                      <p className="text-slate-400">Ramadan reduced-hour cycle configured and ready for 1-click tenant activation. Lesson duration automatically shifted to 40 mins.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TEACHER */}
              {activePortalTab === "teacher" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">Marcus Mwangi, B.Ed</h3>
                        <Badge variant="success" className="bg-emerald-500/20 text-emerald-300">Lead Science &bull; Year 10 Homeroom</Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Period 3 &bull; Biology Lab A &bull; Cycle Day 3</p>
                    </div>
                    <Button size="sm" variant="primary" className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                      Submit Period 3 Register
                    </Button>
                  </div>

                  {/* Teacher Quick Class Register Bar */}
                  <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">Year 10-A Science Register (28 Students Enrolled)</span>
                      <span className="text-emerald-400 font-semibold">26 Present &bull; 1 Late &bull; 1 Excused Medical</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-700/60 flex items-center justify-between">
                        <span>Amina Al-Mansoor</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold text-[10px]">P (Present)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-700/60 flex items-center justify-between">
                        <span>Tariq Mansoor</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold text-[10px]">P (Present)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-700/60 flex items-center justify-between">
                        <span>Ethan Wright</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/30 text-amber-300 font-bold text-[10px]">L (Late 8m)</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-700/60 flex items-center justify-between">
                        <span>Khadija Bello</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/30 text-emerald-300 font-bold text-[10px]">P (Present)</span>
                      </div>
                    </div>
                  </div>

                  {/* Teacher Continuous Gradebook Preview */}
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">Term 1 Continuous Assessment Gradebook (GCSE 9-1 Scale)</span>
                      <span className="text-sky-400">Class Average: 7.8 (Grade 8)</span>
                    </div>
                    <p className="text-slate-400">Enforces data scope invariants: Marcus can only see students enrolled in his science courses or homeroom sections.</p>
                  </div>
                </div>
              )}

              {/* TAB 3: PARENT / GUARDIAN */}
              {activePortalTab === "parent" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">Fatima Zahra El-Idrissi</h3>
                        <Badge variant="warning" className="bg-amber-500/20 text-amber-300">Verified Legal Guardian</Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">2 Children Enrolled &bull; Custody Status: Unrestricted Verified</p>
                    </div>
                    <Button size="sm" variant="primary" className="bg-amber-600 hover:bg-amber-700 text-xs gap-1.5">
                      <CreditCard className="h-3.5 w-3.5" /> Pay Term Fee (M-Pesa / Card)
                    </Button>
                  </div>

                  {/* Children Overview Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">Amina Al-Mansoor</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">Year 8 (Key Stage 3)</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Today&apos;s Status:</span>
                          <span className="text-emerald-400 font-semibold">Present (Lesson 3 French)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Term Attendance:</span>
                          <span className="font-semibold">99.2% (Statutory Compliant)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Latest Assessment:</span>
                          <span className="text-sky-300 font-semibold">Mathematics: Level 8 (Working At)</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">Tariq K. Mansoor</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Year 11 (IGCSE)</span>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-300">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Today&apos;s Status:</span>
                          <span className="text-emerald-400 font-semibold">Present (Science Lab)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Term Attendance:</span>
                          <span className="font-semibold">97.8%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Mock Examination:</span>
                          <span className="text-purple-300 font-semibold">Predicted: 8 A* / 9s</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-slate-400 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Safeguarding protection enabled: All school correspondence &amp; report cards are signed with legal encryption tokens.</span>
                  </div>
                </div>
              )}

              {/* TAB 4: STUDENT */}
              {activePortalTab === "student" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">Tariq K. Mansoor</h3>
                        <Badge variant="info" className="bg-purple-500/20 text-purple-300">Year 11 Scholar &bull; House Alpha</Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Today is Cycle Day 3 (Week A) &bull; Standard Bell Schedule</p>
                    </div>
                    <div className="text-xs text-slate-300 font-mono bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                      Next: 11:30 AM &bull; Advanced Physics Lab
                    </div>
                  </div>

                  {/* Student Day Schedule */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">Period 1 (Completed)</span>
                      <p className="font-bold text-white mt-0.5">English Literature</p>
                      <p className="text-[10px] text-slate-400">Room 204 &bull; Mr. Higgins</p>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase">Period 2 (Completed)</span>
                      <p className="font-bold text-white mt-0.5">Pure Mathematics</p>
                      <p className="text-[10px] text-slate-400">Room 112 &bull; Ms. Chen</p>
                    </div>

                    <div className="p-3 rounded-lg bg-sky-950/60 border border-sky-600/80 ring-2 ring-sky-500/20">
                      <span className="text-[10px] text-sky-400 font-bold uppercase">Period 3 (Current)</span>
                      <p className="font-bold text-white mt-0.5">Physics Lab A</p>
                      <p className="text-[10px] text-slate-300">Lab 3 &bull; Dr. Mwangi</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Period 4 (1:15 PM)</span>
                      <p className="font-bold text-white mt-0.5">Arabic First Language</p>
                      <p className="text-[10px] text-slate-400">Room 305 &bull; Ustadh Kareem</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Period 5 (2:15 PM)</span>
                      <p className="font-bold text-white mt-0.5">Computer Science</p>
                      <p className="text-[10px] text-slate-400">Tech Lab 1 &bull; Mrs. Patel</p>
                    </div>
                  </div>

                  {/* Student Homework & Assignment Tracker */}
                  <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs">
                    <span className="font-bold text-slate-200">Active Coursework &amp; Submissions</span>
                    <div className="flex flex-col sm:flex-row justify-between text-slate-400 gap-1">
                      <span>&bull; Chemistry Titration Lab Report: Due Tomorrow 08:30 AM (Draft Saved)</span>
                      <span className="text-emerald-400 font-semibold">Submitted: Pure Maths Calculus Set 4</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- GLOBAL MULTI-LINGUAL PREVIEW (RTL / ARABIC / FRENCH / SWAHILI) ---------------- */}
      <section id="localization" className="py-20 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              True Bi-Directional Localization
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Built for Arabic RTL, English, French &amp; Swahili
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Not just translated labels: Dirasa mirrors entire layout hierarchies in Arabic RTL mode, formats complex dual-script student names, and supports regional tax and banking rules.
            </p>
          </div>

          {/* Language Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(["en", "ar", "fr", "sw"] as const).map((langKey) => (
              <button
                key={langKey}
                onClick={() => setActiveLanguagePreview(langKey)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  activeLanguagePreview === langKey
                    ? "bg-sky-600 text-white border-sky-600 shadow-md"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-400"
                }`}
              >
                {localizedContent[langKey].langName}
              </button>
            ))}
          </div>

          {/* Live Dynamic Preview Card */}
          <div
            dir={localizedContent[activeLanguagePreview].dir}
            className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl max-w-4xl mx-auto transition-all"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-sky-600" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Dirasa Localization Engine Preview ({activeLanguagePreview.toUpperCase()})
                </span>
              </div>
              <Badge variant="info">
                Direction: {localizedContent[activeLanguagePreview].dir.toUpperCase()}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-900 text-xs text-sky-800 dark:text-sky-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>{localizedContent[activeLanguagePreview].bannerNotice}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {localizedContent[activeLanguagePreview].headline}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {localizedContent[activeLanguagePreview].subline}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {localizedContent[activeLanguagePreview].sampleStudent}
                  </span>
                </div>

                <Link href="/login">
                  <Button variant="primary" size="sm" className="text-xs bg-sky-600 hover:bg-sky-700">
                    {localizedContent[activeLanguagePreview].ctaDemo} →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS & STATS SECTION ---------------- */}
      <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Trusted Worldwide
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Loved by School Principals &amp; Directors
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Hear from educational leadership teams using Dirasa across the Middle East, Africa, and the United Kingdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 - Dubai */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;Dirasa solved our KHDA inspection and safeguarding compliance in one stroke. The court-ordered custody filters alone prevent the nightmare of accidental record disclosure. And the automatic Ramadan timetable switcher saves our staff 40+ hours every year.&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sky-600 text-white font-bold text-sm flex items-center justify-center">
                  KA
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Dr. K. Al-Sabah</p>
                  <p className="text-[11px] text-slate-500">Director of Academics &bull; Dubai, UAE</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - Nairobi */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;Our fee collections went from 68% to 94% within our first term of switching to Dirasa. The automated M-Pesa STK push sends invoices directly to parents&apos; phones with instant ledger reconciliation. Truly transformational for East African schools.&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center">
                  GO
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Grace Odhiambo</p>
                  <p className="text-[11px] text-slate-500">Managing Principal &bull; Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 - Lagos & London */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                  &ldquo;We run a hybrid British National and WAEC curriculum. No other software could handle GCSE 9-1 marks alongside WAEC A1-F9 scales without clunky workarounds. Dirasa does it out of the box with gorgeous bilingual report cards.&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-purple-600 text-white font-bold text-sm flex items-center justify-center">
                  AB
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Adebayo Balogun</p>
                  <p className="text-[11px] text-slate-500">Head of School &bull; Lagos &amp; London</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PRICING & ENTERPRISE TIERS ---------------- */}
      <section id="pricing" className="py-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Transparent Multi-School Licensing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Scalable for Single Academies &amp; Multi-Academy Trusts
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Simple per-student annual billing with zero hidden module add-ons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tier 1: Academy Starter */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <Badge variant="default">Academy Starter</Badge>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">$3.50</span>
                    <span className="text-xs text-slate-500">/ student / month</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Up to 600 students &bull; Single Campus</p>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" /> Statutory AM/PM Daily Registers
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" /> Student 360 &amp; Custody Safeguards
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" /> Gradebook &amp; Report Cards
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" /> Public Admissions Portal
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" /> English &amp; Arabic RTL
                  </li>
                </ul>
              </div>

              <Link href="/apply/demo-school">
                <Button variant="outline" className="w-full text-xs font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Tier 2: International Enterprise (Featured) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-7 border-2 border-sky-600 shadow-xl relative space-y-6 flex flex-col justify-between">
              <div className="absolute -top-3.5 start-1/2 -translate-x-1/2">
                <span className="bg-sky-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Most Popular for International Schools
                </span>
              </div>

              <div className="space-y-4 pt-1">
                <Badge variant="info">Global Enterprise</Badge>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">$5.00</span>
                    <span className="text-xs text-slate-500">/ student / month</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Unlimited students &bull; Multi-curriculum</p>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sky-600" /> Everything in Academy Starter
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sky-600" /> 13 Country Gradebook Scales
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sky-600" /> Cycle Timetables &amp; Ramadan Variant
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sky-600" /> M-Pesa &amp; Paystack Integration
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sky-600" /> Dedicated Guardian Mobile Web App
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sky-600" /> Priority 24/7 SLA Support
                  </li>
                </ul>
              </div>

              <Link href="/login">
                <Button variant="primary" className="w-full text-xs font-bold bg-sky-600 hover:bg-sky-700 shadow-md">
                  Evaluate with Live Demo →
                </Button>
              </Link>
            </div>

            {/* Tier 3: Multi-Academy Trust / Ministry */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <Badge variant="default">Multi-Academy Trust</Badge>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">Custom</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Multi-campus &bull; Group Centralized Finance</p>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" /> Central Trust-wide Analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" /> Inter-school Student Transfers
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" /> Consolidated Financial Ledger
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" /> Custom SIS / MIS API Data Pipes
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500" /> On-premise or Sovereign Cloud Hosting
                  </li>
                </ul>
              </div>

              <Link href="/dashboard">
                <Button variant="outline" className="w-full text-xs font-semibold">
                  Contact Ministry Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- ENTERPRISE FOOTER ---------------- */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Col 1: Brand */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-sky-600 text-white font-black text-lg flex items-center justify-center">
                  D
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Dirasa SMS</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Enterprise multi-tenant School Information &amp; Management System. Clean architecture, strict custody safeguarding, and continuous assessment across 15+ countries.
              </p>
              <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>FERPA, GDPR &amp; UAE Federal Data Law Compliant</span>
              </div>
            </div>

            {/* Col 2: Platform */}
            <div className="space-y-3">
              <p className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Subsystems</p>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Safeguarding &amp; Custody</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Statutory Attendance</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Cycle Timetables</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">13 Grading Scales</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Finance &amp; M-Pesa</Link></li>
              </ul>
            </div>

            {/* Col 3: Curricula */}
            <div className="space-y-3">
              <p className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Curricula</p>
              <ul className="space-y-2">
                <li><span className="hover:text-white transition-colors">UK National (GCSE / A-Levels)</span></li>
                <li><span className="hover:text-white transition-colors">International Baccalaureate (IB)</span></li>
                <li><span className="hover:text-white transition-colors">US Common Core &amp; AP</span></li>
                <li><span className="hover:text-white transition-colors">West African WAEC / WASSCE</span></li>
                <li><span className="hover:text-white transition-colors">Kenya CBC Framework</span></li>
              </ul>
            </div>

            {/* Col 4: Portals & Quick Links */}
            <div className="space-y-3">
              <p className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">Portals &amp; Auth</p>
              <ul className="space-y-2">
                <li><Link href="/login" className="hover:text-white transition-colors">Sign In Portal</Link></li>
                <li><Link href="/apply/demo-school" className="hover:text-white transition-colors">Admissions Gateway</Link></li>
                <li><Link href="/accept-invitation" className="hover:text-white transition-colors">Accept Invitation</Link></li>
                <li><Link href="/forgot-password" className="hover:text-white transition-colors">Reset Password</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Enter Portal Dashboard</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>&copy; 2026 Dirasa Inc. All rights reserved. Clean Architecture Multi-Tenant SIS.</p>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Safeguarding Charter</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
