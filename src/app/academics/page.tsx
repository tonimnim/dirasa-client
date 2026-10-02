"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/legacy-ui/Card";
import { Badge } from "@/components/legacy-ui/Badge";
import { Button } from "@/components/legacy-ui/Button";
import {
  Calendar,
  Layers,
  Clock,
  BookOpen,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Moon,
  Sun,
  Plus,
  ArrowRight,
  Globe,
  Settings2,
  Sparkles,
  X,
  FileCheck,
  ChevronRight,
  ShieldCheck,
  Sliders,
  Check,
} from "lucide-react";

export type AcademicYearStatus = "Active" | "Planned" | "Closed";
export type PeriodType = "Terms" | "Semesters" | "Trimesters" | "Quarters";

export interface AcademicPeriod {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "InProgress" | "Planned" | "Closed";
  isLocked: boolean;
  instructionalDays: number;
}

export interface AcademicYear {
  id: string;
  name: string; // e.g. "2026/2027"
  status: AcademicYearStatus;
  periodType: PeriodType;
  startDate: string;
  endDate: string;
  periods: AcademicPeriod[];
}

export interface CalendarBreak {
  id: string;
  name: string;
  category: "National" | "Religious" | "Recess";
  startDate: string;
  endDate: string;
  daysCount: number;
}

export interface CurriculumTemplate {
  id: string;
  name: string;
  region: string;
  flag: string;
  stages: string[];
  keyFeatures: string[];
  gradingScales: string;
  subjectsCount: number;
  description: string;
}

const INITIAL_YEARS: AcademicYear[] = [
  {
    id: "ay-2026-2027",
    name: "2026/2027",
    status: "Active",
    periodType: "Terms",
    startDate: "2026-09-01",
    endDate: "2027-07-02",
    periods: [
      {
        id: "p-t1",
        name: "Term 1 (Autumn)",
        startDate: "2026-09-01",
        endDate: "2026-12-18",
        status: "InProgress",
        isLocked: false,
        instructionalDays: 74,
      },
      {
        id: "p-t2",
        name: "Term 2 (Spring)",
        startDate: "2027-01-05",
        endDate: "2027-03-26",
        status: "Planned",
        isLocked: false,
        instructionalDays: 58,
      },
      {
        id: "p-t3",
        name: "Term 3 (Summer)",
        startDate: "2027-04-12",
        endDate: "2027-07-02",
        status: "Planned",
        isLocked: true,
        instructionalDays: 55,
      },
    ],
  },
  {
    id: "ay-2027-2028",
    name: "2027/2028",
    status: "Planned",
    periodType: "Terms",
    startDate: "2027-09-01",
    endDate: "2028-07-05",
    periods: [
      {
        id: "p-27-t1",
        name: "Term 1",
        startDate: "2027-09-01",
        endDate: "2027-12-17",
        status: "Planned",
        isLocked: true,
        instructionalDays: 75,
      },
      {
        id: "p-27-t2",
        name: "Term 2",
        startDate: "2028-01-04",
        endDate: "2028-03-24",
        status: "Planned",
        isLocked: true,
        instructionalDays: 57,
      },
      {
        id: "p-27-t3",
        name: "Term 3",
        startDate: "2028-04-10",
        endDate: "2028-07-05",
        status: "Planned",
        isLocked: true,
        instructionalDays: 56,
      },
    ],
  },
  {
    id: "ay-2025-2026",
    name: "2025/2026",
    status: "Closed",
    periodType: "Terms",
    startDate: "2025-09-01",
    endDate: "2026-06-30",
    periods: [
      {
        id: "p-25-t1",
        name: "Term 1",
        startDate: "2025-09-01",
        endDate: "2025-12-19",
        status: "Closed",
        isLocked: true,
        instructionalDays: 75,
      },
      {
        id: "p-25-t2",
        name: "Term 2",
        startDate: "2026-01-05",
        endDate: "2026-03-27",
        status: "Closed",
        isLocked: true,
        instructionalDays: 59,
      },
      {
        id: "p-25-t3",
        name: "Term 3",
        startDate: "2026-04-13",
        endDate: "2026-06-30",
        status: "Closed",
        isLocked: true,
        instructionalDays: 54,
      },
    ],
  },
];

const INITIAL_BREAKS: CalendarBreak[] = [
  {
    id: "brk-1",
    name: "Autumn Half-Term Break",
    category: "Recess",
    startDate: "2026-10-19",
    endDate: "2026-10-23",
    daysCount: 5,
  },
  {
    id: "brk-2",
    name: "Commemoration & UAE National Day",
    category: "National",
    startDate: "2026-12-01",
    endDate: "2026-12-03",
    daysCount: 3,
  },
  {
    id: "brk-3",
    name: "Winter Vacation & New Year",
    category: "Recess",
    startDate: "2026-12-21",
    endDate: "2027-01-01",
    daysCount: 10,
  },
  {
    id: "brk-4",
    name: "Spring Vacation & Eid Al-Fitr Holiday",
    category: "Religious",
    startDate: "2027-03-29",
    endDate: "2027-04-09",
    daysCount: 10,
  },
];

const CURRICULUM_TEMPLATES: CurriculumTemplate[] = [
  {
    id: "cur-uk",
    name: "UK National Curriculum & GCSE / A-Levels",
    region: "United Kingdom & International British Schools",
    flag: "🇬🇧",
    stages: ["EYFS (Reception)", "Key Stage 1 (Y1-Y2)", "Key Stage 2 (Y3-Y6)", "Key Stage 3 (Y7-Y9)", "Key Stage 4 (GCSE / IGCSE)", "Sixth Form (A-Levels)"],
    keyFeatures: [
      "DfE statutory subject catalogues & Key Stages",
      "Tiered 9-1 GCSE grading scale with WAEC/Edexcel mapping",
      "Linear assessment with standardized Attainment 8 tracking",
    ],
    gradingScales: "GCSE 9-1 / A*-G / A-Level A*-E",
    subjectsCount: 48,
    description: "Standard British curriculum compliant with BSO (British Schools Overseas) and Pearson / Cambridge International examinations.",
  },
  {
    id: "cur-us",
    name: "US Common Core & AP (Advanced Placement)",
    region: "United States & American International Schools",
    flag: "🇺🇸",
    stages: ["Kindergarten", "Elementary (Grades 1-5)", "Middle School (Grades 6-8)", "High School (Grades 9-12 with AP Tracks)"],
    keyFeatures: [
      "CCSS Math & ELA standards alignment with NGSS Science",
      "GPA credit weighting (4.0 unweighted / 5.0 weighted AP)",
      "High School transcript generation & Carnegie units",
    ],
    gradingScales: "Letter Grades (A+ to F) & 4.0/5.0 GPA Scale",
    subjectsCount: 56,
    description: "Accredited US curriculum framework featuring College Board AP electives and standard American high school graduation diploma pathways.",
  },
  {
    id: "cur-cbc",
    name: "Kenya CBC (Competency-Based Curriculum)",
    region: "Kenya & East African Regional Schools",
    flag: "🇰🇪",
    stages: ["Early Years (Pre-Primary 1-2 & Grades 1-3)", "Middle School (Grades 4-6 & Junior School 7-9)", "Senior School (Grades 10-12)"],
    keyFeatures: [
      "KICD approved strands, sub-strands, and learning outcomes",
      "Rubric-based assessment: EE (Exceeding), ME (Meeting), AE (Approaching), BE (Below)",
      "Senior school pathway election: STEM, Social Sciences, Arts & Sports",
    ],
    gradingScales: "CBC 4-Level Performance Rubric (EE, ME, AE, BE) + KCSE Scale",
    subjectsCount: 42,
    description: "Fully aligned with Kenya Institute of Curriculum Development (KICD) standards for Junior School transition and continuous assessment tests (CAT).",
  },
  {
    id: "cur-nerdc",
    name: "Nigerian NERDC & WAEC / WASSCE Curriculum",
    region: "Nigeria & West African Regional Schools",
    flag: "🇳🇬",
    stages: ["Lower Basic (Basic 1-3)", "Middle Basic (Basic 4-6)", "Upper Basic / JSS (Basic 7-9)", "Senior Secondary / SSS (SS1-SS3)"],
    keyFeatures: [
      "Universal Basic Education (UBE) guidelines from NERDC",
      "Compulsory Trade and Entrepreneurship subject offerings",
      "Senior Secondary division into Science, Humanities, Business, and Technology",
    ],
    gradingScales: "WAEC 9-Point Scale (A1, B2, B3, C4-C6, D7, E8, F9)",
    subjectsCount: 45,
    description: "Comprehensive Nigerian educational framework structured for WAEC WASSCE and NECO external examination readiness with vocational trade electives.",
  },
];

export default function AcademicsStructurePage() {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>(INITIAL_YEARS);
  const [activeYearId, setActiveYearId] = useState("ay-2026-2027");

  // Working Week Settings
  const [weekPreset, setWeekPreset] = useState<"MENA" | "International" | "SixDay">("MENA");
  const [workingDays, setWorkingDays] = useState<{ [day: string]: boolean }>({
    Sunday: true,
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: false,
    Saturday: false,
  });
  const [dailyStartTime, setDailyStartTime] = useState("07:45");
  const [dailyEndTime, setDailyEndTime] = useState("15:15");
  const [fridayHalfDay, setFridayHalfDay] = useState(false);
  const [fridayEndTime, setFridayEndTime] = useState("12:00");

  // Calendar Breaks
  const [breaks, setBreaks] = useState<CalendarBreak[]>(INITIAL_BREAKS);
  const [newBreakName, setNewBreakName] = useState("");
  const [newBreakCategory, setNewBreakCategory] = useState<"National" | "Religious" | "Recess">("Recess");
  const [newBreakStart, setNewBreakStart] = useState("2026-11-01");
  const [newBreakEnd, setNewBreakEnd] = useState("2026-11-03");
  const [isAddBreakOpen, setIsAddBreakOpen] = useState(false);

  // Ramadan Variant Schedule
  const [ramadanScheduleActive, setRamadanScheduleActive] = useState(false);
  const [ramadanStartTime, setRamadanStartTime] = useState("08:30");
  const [ramadanEndTime, setRamadanEndTime] = useState("13:30");
  const [ramadanPeriodDuration, setRamadanPeriodDuration] = useState(35); // minutes
  const standardPeriodDuration = 50; // minutes

  // Active Curriculum
  const [appliedCurriculumId, setAppliedCurriculumId] = useState("cur-uk");
  const [previewingCurriculum, setPreviewingCurriculum] = useState<CurriculumTemplate | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const currentYear = academicYears.find((y) => y.id === activeYearId) || academicYears[0];

  // Lock / Unlock Period
  const handleToggleLockPeriod = (periodId: string) => {
    setAcademicYears((prev) =>
      prev.map((yr) => {
        if (yr.id !== activeYearId) return yr;
        return {
          ...yr,
          periods: yr.periods.map((p) => {
            if (p.id !== periodId) return p;
            const newLocked = !p.isLocked;
            showToast(
              newLocked
                ? `Period "${p.name}" has been locked. Historical registers and marks are frozen.`
                : `Period "${p.name}" has been unlocked for modifications.`
            );
            return { ...p, isLocked: newLocked };
          }),
        };
      })
    );
  };

  // Change Working Week Preset
  const handleApplyPreset = (preset: "MENA" | "International" | "SixDay") => {
    setWeekPreset(preset);
    if (preset === "MENA") {
      setWorkingDays({
        Sunday: true,
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: false,
        Saturday: false,
      });
      setFridayHalfDay(false);
      showToast("Applied Sun-Thu (MENA Standard) working week.");
    } else if (preset === "International") {
      setWorkingDays({
        Sunday: false,
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: true,
        Saturday: false,
      });
      setFridayHalfDay(true);
      showToast("Applied Mon-Fri (UK / Kenya / International Standard) working week.");
    } else if (preset === "SixDay") {
      setWorkingDays({
        Sunday: false,
        Monday: true,
        Tuesday: true,
        Wednesday: true,
        Thursday: true,
        Friday: true,
        Saturday: true,
      });
      setFridayHalfDay(false);
      showToast("Applied Mon-Sat (6-Day Intensive / Boarding) working week.");
    }
  };

  // Toggle Day
  const handleToggleDay = (day: string) => {
    setWorkingDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  // Add Calendar Break
  const handleAddBreak = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBreakName) return;

    const b: CalendarBreak = {
      id: `brk-${Date.now().toString().slice(-4)}`,
      name: newBreakName,
      category: newBreakCategory,
      startDate: newBreakStart,
      endDate: newBreakEnd,
      daysCount: 3,
    };

    setBreaks((prev) => [...prev, b]);
    setIsAddBreakOpen(false);
    setNewBreakName("");
    showToast(`Added holiday break: ${b.name}`);
  };

  // Apply Template
  const handleApplyCurriculumTemplate = (template: CurriculumTemplate) => {
    setAppliedCurriculumId(template.id);
    setPreviewingCurriculum(null);
    showToast(`Applied ${template.name} as active school curriculum framework!`);
  };

  // Compute instructional hours
  const activeDaysCount = Object.values(workingDays).filter(Boolean).length;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AppHeader />

        <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Academic Structure & Governance
                </h1>
                <Badge variant="info">Year 2026/2027 Active</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Academic calendar cycles, working weeks, Ramadan statutory schedules, and national curriculum templates
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Active Year Context:</span>
              <select
                value={activeYearId}
                onChange={(e) => setActiveYearId(e.target.value)}
                className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                {academicYears.map((y) => (
                  <option key={y.id} value={y.id}>
                    {y.name} ({y.status})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ========================================================== */}
          {/* SECTION 1: ACADEMIC YEARS & PERIODS MANAGER */}
          {/* ========================================================== */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-sky-600" /> Academic Years & Period Locks
                </h2>
                <p className="text-xs text-slate-500">
                  Manage start/end milestones, period types (Terms, Semesters), and immutable register lock states
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Structure:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {currentYear.periodType} (3 Periods)
                </span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <Badge
                  variant={
                    currentYear.status === "Active"
                      ? "success"
                      : currentYear.status === "Planned"
                      ? "info"
                      : "outline"
                  }
                >
                  {currentYear.status}
                </Badge>
              </div>
            </div>

            {/* Periods Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentYear.periods.map((period, idx) => (
                <Card
                  key={period.id}
                  className={`p-5 transition-all ${
                    period.isLocked
                      ? "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40"
                      : "border-sky-200 dark:border-sky-900/60 shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                        Period 0{idx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {period.name}
                      </h3>
                    </div>
                    <Badge
                      variant={
                        period.status === "InProgress"
                          ? "success"
                          : period.status === "Planned"
                          ? "info"
                          : "outline"
                      }
                    >
                      {period.status}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400">Date Range:</span>
                      <span className="font-mono text-[11px]">
                        {period.startDate} → {period.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400">Instructional Days:</span>
                      <span className="font-semibold">{period.instructionalDays} Days</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400">Registers & Marks Lock:</span>
                      <span
                        className={`inline-flex items-center gap-1 font-semibold text-[11px] ${
                          period.isLocked ? "text-rose-600" : "text-emerald-600"
                        }`}
                      >
                        {period.isLocked ? (
                          <>
                            <Lock className="h-3 w-3" /> Locked (Frozen)
                          </>
                        ) : (
                          <>
                            <Unlock className="h-3 w-3" /> Open for Entry
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      {period.isLocked ? "Modifications blocked" : "Active grading period"}
                    </span>
                    <Button
                      variant={period.isLocked ? "outline" : "secondary"}
                      size="sm"
                      onClick={() => handleToggleLockPeriod(period.id)}
                      className="h-7 text-xs px-2 gap-1.5"
                    >
                      {period.isLocked ? (
                        <>
                          <Unlock className="h-3.5 w-3.5 text-emerald-600" /> Unlock Period
                        </>
                      ) : (
                        <>
                          <Lock className="h-3.5 w-3.5 text-rose-500" /> Lock Period
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* ========================================================== */}
          {/* SECTION 2: WORKING WEEK CONFIGURATION */}
          {/* ========================================================== */}
          <section className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders className="h-4 w-4 text-sky-600" /> Working Week & Instructional Schedule
              </h2>
              <p className="text-xs text-slate-500">
                Configure official teaching weekdays, standard bell hours, and regional statutory adjustments
              </p>
            </div>

            <Card className="p-6">
              <div className="space-y-6">
                {/* Presets Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Regional Calendar Presets:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant={weekPreset === "MENA" ? "primary" : "outline"}
                      size="sm"
                      onClick={() => handleApplyPreset("MENA")}
                      className="text-xs"
                    >
                      Sun - Thu (MENA / Gulf)
                    </Button>
                    <Button
                      variant={weekPreset === "International" ? "primary" : "outline"}
                      size="sm"
                      onClick={() => handleApplyPreset("International")}
                      className="text-xs"
                    >
                      Mon - Fri (UK / Kenya / Int'l)
                    </Button>
                    <Button
                      variant={weekPreset === "SixDay" ? "primary" : "outline"}
                      size="sm"
                      onClick={() => handleApplyPreset("SixDay")}
                      className="text-xs"
                    >
                      Mon - Sat (6-Day Intensive)
                    </Button>
                  </div>
                </div>

                {/* Weekday Toggles */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Active Instruction Days ({activeDaysCount} Days / Week)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                    {[
                      { key: "Sunday", label: "Sunday" },
                      { key: "Monday", label: "Monday" },
                      { key: "Tuesday", label: "Tuesday" },
                      { key: "Wednesday", label: "Wednesday" },
                      { key: "Thursday", label: "Thursday" },
                      { key: "Friday", label: "Friday" },
                      { key: "Saturday", label: "Saturday" },
                    ].map((d) => {
                      const isActive = workingDays[d.key];
                      return (
                        <button
                          key={d.key}
                          type="button"
                          onClick={() => handleToggleDay(d.key)}
                          className={`p-3 rounded-lg border text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1 ${
                            isActive
                              ? "bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-700 text-sky-800 dark:text-sky-200 shadow-xs"
                              : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-100"
                          }`}
                        >
                          <span>{d.label}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded font-normal ${
                              isActive
                                ? "bg-sky-200 dark:bg-sky-900 text-sky-800 dark:text-sky-200"
                                : "text-slate-400"
                            }`}
                          >
                            {isActive ? "School Open" : "Weekend"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hours & Friday Shortened Hours */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Standard Daily Timetable Start
                    </label>
                    <input
                      type="time"
                      value={dailyStartTime}
                      onChange={(e) => setDailyStartTime(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Morning roll call & registration
                    </span>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Standard Daily Dismissal Time
                    </label>
                    <input
                      type="time"
                      value={dailyEndTime}
                      onChange={(e) => setDailyEndTime(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      End of statutory instruction
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-medium text-slate-700 dark:text-slate-300">
                        Friday Shortened Day
                      </label>
                      <input
                        type="checkbox"
                        checked={fridayHalfDay}
                        onChange={(e) => setFridayHalfDay(e.target.checked)}
                        className="h-4 w-4 text-sky-600 rounded"
                      />
                    </div>
                    <input
                      type="time"
                      disabled={!fridayHalfDay}
                      value={fridayEndTime}
                      onChange={(e) => setFridayEndTime(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs disabled:opacity-40"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Statutory Friday dismissal (e.g. UAE KHDA / Gulf)
                    </span>
                  </div>
                </div>

                {/* Footer Save */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-500">
                    Calculated Statutory Capacity:{" "}
                    <strong className="text-slate-900 dark:text-white">
                      {(activeDaysCount * 7.5).toFixed(1)} hrs / week
                    </strong>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => showToast("Working week schedule saved successfully.")}
                    className="bg-sky-600 hover:bg-sky-700"
                  >
                    Save Working Week
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          {/* ========================================================== */}
          {/* SECTION 3: CALENDAR BREAKS & RAMADAN DAY OVERRIDES */}
          {/* ========================================================== */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Moon className="h-4 w-4 text-amber-500" /> Calendar Recesses & Ramadan Variant Schedule
                </h2>
                <p className="text-xs text-slate-500">
                  Statutory holiday calendar and regulatory shortened Ramadan instructional timetable
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddBreakOpen(true)}
                className="gap-1.5 text-xs"
              >
                <Plus className="h-4 w-4 text-sky-600" /> Add Holiday Break
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Holidays List */}
              <Card className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Scheduled Breaks & Recesses (2026/2027)
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {breaks.reduce((acc, b) => acc + b.daysCount, 0)} Total Days Off
                  </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {breaks.map((b) => (
                    <div key={b.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{b.name}</span>
                          <span
                            className={`text-[9px] px-1.5 py-0.2 rounded font-semibold uppercase ${
                              b.category === "Religious"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                                : b.category === "National"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                : "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300"
                            }`}
                          >
                            {b.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {b.startDate} → {b.endDate}
                        </div>
                      </div>
                      <Badge variant="outline">{b.daysCount} Days</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Right: Ramadan Day Schedule Override */}
              <Card
                className={`p-5 space-y-4 transition-all ${
                  ramadanScheduleActive
                    ? "border-amber-300 dark:border-amber-800 bg-amber-50/20 dark:bg-amber-950/20"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-amber-500" />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Ramadan Timetable Mode
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Statutory 5-hour daily cap & shortened class periods
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ramadanScheduleActive}
                      onChange={(e) => {
                        setRamadanScheduleActive(e.target.checked);
                        showToast(
                          e.target.checked
                            ? "Ramadan timetable mode ACTIVATED across all school registers."
                            : "Standard school hours restored."
                        );
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>

                <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                    <span>Statutory Authority Requirement (KHDA / MOE)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-800 dark:text-amber-300">
                    During the Holy Month of Ramadan, instructional school days must not exceed 5 hours. Periods are typically reduced from {standardPeriodDuration} mins to {ramadanPeriodDuration} mins.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Ramadan Morning Start
                    </label>
                    <input
                      type="time"
                      value={ramadanStartTime}
                      onChange={(e) => setRamadanStartTime(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Ramadan Early Dismissal
                    </label>
                    <input
                      type="time"
                      value={ramadanEndTime}
                      onChange={(e) => setRamadanEndTime(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Lesson Duration: {ramadanPeriodDuration} minutes (vs Standard {standardPeriodDuration} min)
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="45"
                    step="5"
                    value={ramadanPeriodDuration}
                    onChange={(e) => setRamadanPeriodDuration(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </Card>
            </div>
          </section>

          {/* ========================================================== */}
          {/* SECTION 4: CURRICULUM TEMPLATE RUNNER */}
          {/* ========================================================== */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-sky-600" /> Curriculum Template Runner
                </h2>
                <p className="text-xs text-slate-500">
                  Pre-configured international frameworks with grade stage mappings, subject catalogues, and grading scales
                </p>
              </div>

              <Badge variant="success">
                Current Applied:{" "}
                {CURRICULUM_TEMPLATES.find((c) => c.id === appliedCurriculumId)?.name.split(" ")[0]}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CURRICULUM_TEMPLATES.map((tmpl) => {
                const isCurrent = tmpl.id === appliedCurriculumId;
                return (
                  <Card
                    key={tmpl.id}
                    className={`p-5 flex flex-col justify-between transition-all ${
                      isCurrent
                        ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/20 dark:bg-emerald-950/20 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{tmpl.flag}</span>
                          <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                              {tmpl.name}
                            </h3>
                            <p className="text-[11px] text-slate-400">{tmpl.region}</p>
                          </div>
                        </div>

                        {isCurrent ? (
                          <Badge variant="success">Active Framework</Badge>
                        ) : (
                          <Badge variant="outline">{tmpl.subjectsCount} Subjects</Badge>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {tmpl.description}
                      </p>

                      <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                        <span className="font-semibold text-slate-500 block uppercase text-[10px]">
                          Key Framework Features
                        </span>
                        {tmpl.keyFeatures.map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="h-3.5 w-3.5 text-sky-600 flex-shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 text-[11px] text-slate-500">
                        <span>Grading System: </span>
                        <strong className="text-slate-800 dark:text-slate-200 font-mono">
                          {tmpl.gradingScales}
                        </strong>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPreviewingCurriculum(tmpl)}
                        className="text-xs text-sky-600 hover:text-sky-700 font-semibold"
                      >
                        Preview Structure
                      </Button>

                      {isCurrent ? (
                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Check className="h-4 w-4" /> Applied
                        </span>
                      ) : (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApplyCurriculumTemplate(tmpl)}
                          className="text-xs bg-sky-600 hover:bg-sky-700 gap-1"
                        >
                          <Sparkles className="h-3.5 w-3.5" /> Apply Template
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </main>
      </div>

      {/* ============================================================== */}
      {/* MODAL: PREVIEW CURRICULUM TEMPLATE */}
      {/* ============================================================== */}
      {previewingCurriculum && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{previewingCurriculum.flag}</span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {previewingCurriculum.name}
                  </h3>
                  <p className="text-xs text-slate-500">{previewingCurriculum.region}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewingCurriculum(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[10px] mb-2">
                  Mapped Key Stages & Year Groups
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {previewingCurriculum.stages.map((stg, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-medium text-slate-800 dark:text-slate-200"
                    >
                      {stg}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[10px] mb-2">
                  Standard Grading & Assessment Scales
                </h4>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-sky-600 dark:text-sky-400">
                  {previewingCurriculum.gradingScales}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[10px] mb-2">
                  Subject Catalogue Injection ({previewingCurriculum.subjectsCount} Pre-configured Subjects)
                </h4>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 leading-relaxed">
                  Applying this template automatically registers statutory subject codes, credits, and syllabus frameworks into the school course catalogue.
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewingCurriculum(null)}
              >
                Close Preview
              </Button>

              <Button
                variant="primary"
                size="sm"
                className="bg-sky-600 hover:bg-sky-700"
                onClick={() => handleApplyCurriculumTemplate(previewingCurriculum)}
              >
                Apply Framework to School
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD HOLIDAY BREAK */}
      {/* ============================================================== */}
      {isAddBreakOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add Calendar Break / Holiday
              </h3>
              <button
                onClick={() => setIsAddBreakOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddBreak}>
              <div className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Break Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. End of Term Vacation or Eid Holiday"
                    value={newBreakName}
                    onChange={(e) => setNewBreakName(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newBreakCategory}
                    onChange={(e) => setNewBreakCategory(e.target.value as any)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                  >
                    <option value="Recess">School Term Recess</option>
                    <option value="National">National Statutory Holiday</option>
                    <option value="Religious">Religious Observance</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newBreakStart}
                      onChange={(e) => setNewBreakStart(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newBreakEnd}
                      onChange={(e) => setNewBreakEnd(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddBreakOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-sky-600 hover:bg-sky-700"
                >
                  Save Holiday
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
