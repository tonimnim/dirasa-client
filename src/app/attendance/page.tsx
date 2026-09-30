"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ClipboardList,
  Check,
  Clock,
  AlertTriangle,
  XCircle,
  Calendar,
  Save,
  CheckCircle2,
} from "lucide-react";

type MarkKind = "Present" | "Late" | "AuthorisedAbsence" | "UnauthorisedAbsence";

interface StudentRegisterItem {
  id: string;
  name: string;
  admissionNumber: string;
  mark: MarkKind;
  minutesLate?: number;
  note?: string;
}

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState("2026-10-01");
  const [selectedSection, setSelectedSection] = useState("Grade 7-A (Homeroom)");
  const [sessionKind, setSessionKind] = useState<"AM" | "PM">("AM");
  const [isSaved, setIsSaved] = useState(false);

  const [roster, setRoster] = useState<StudentRegisterItem[]>([
    { id: "s1", name: "Tariq Mansoor", admissionNumber: "ADM-2024-001", mark: "Present" },
    { id: "s2", name: "Amina Al-Falasi", admissionNumber: "ADM-2024-002", mark: "Present" },
    { id: "s3", name: "Zayn Mwangi", admissionNumber: "ADM-2024-003", mark: "Late", minutesLate: 12 },
    { id: "s4", name: "Fatima Zahra", admissionNumber: "ADM-2023-089", mark: "Present" },
    { id: "s5", name: "Bilal El-Sayed", admissionNumber: "ADM-2024-012", mark: "AuthorisedAbsence", note: "Medical appointment" },
    { id: "s6", name: "Layla Benali", admissionNumber: "ADM-2024-015", mark: "Present" },
  ]);

  const updateMark = (id: string, newMark: MarkKind) => {
    setIsSaved(false);
    setRoster((prev) =>
      prev.map((item) => (item.id === id ? { ...item, mark: newMark } : item))
    );
  };

  const markAllPresent = () => {
    setIsSaved(false);
    setRoster((prev) => prev.map((item) => ({ ...item, mark: "Present" })));
  };

  const presentCount = roster.filter((r) => r.mark === "Present").length;
  const lateCount = roster.filter((r) => r.mark === "Late").length;
  const absentAuth = roster.filter((r) => r.mark === "AuthorisedAbsence").length;
  const absentUnauth = roster.filter((r) => r.mark === "UnauthorisedAbsence").length;
  const attendanceRate = (((presentCount + lateCount) / roster.length) * 100).toFixed(1);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AppHeader />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Daily Attendance Register
                </h1>
                <Badge variant="success">Register Open</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Statutory roll call with grace-period alerts and automated guardian notifications
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="md"
                onClick={markAllPresent}
                className="gap-1.5 text-xs font-semibold"
              >
                <Check className="h-4 w-4 text-emerald-600" /> Mark All Present
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsSaved(true)}
                className="gap-1.5 text-xs font-semibold bg-sky-600 hover:bg-sky-700"
              >
                <Save className="h-4 w-4" /> Save Register
              </Button>
            </div>
          </div>

          {/* Session Selector & Summary Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card className="lg:col-span-3">
              <CardContent className="p-4 flex flex-wrap items-center gap-4 justify-between">
                <div className="flex items-center gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">Section</span>
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none"
                    >
                      <option>Grade 7-A (Homeroom)</option>
                      <option>Grade 7-B (Homeroom)</option>
                      <option>Grade 8-A (Homeroom)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">Date</span>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">Session</span>
                    <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800">
                      <button
                        onClick={() => setSessionKind("AM")}
                        className={`px-3 py-1 text-xs font-semibold rounded ${
                          sessionKind === "AM"
                            ? "bg-sky-600 text-white shadow-sm"
                            : "text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        Morning (AM)
                      </button>
                      <button
                        onClick={() => setSessionKind("PM")}
                        className={`px-3 py-1 text-xs font-semibold rounded ${
                          sessionKind === "PM"
                            ? "bg-sky-600 text-white shadow-sm"
                            : "text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        Afternoon (PM)
                      </button>
                    </div>
                  </div>
                </div>

                {isSaved && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="h-4 w-4" /> Register Recorded
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">Attendance</span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                    {attendanceRate}%
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {presentCount + lateCount} of {roster.length} present
                  </span>
                </div>
                <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 font-bold">
                  %
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Roster Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 text-start">Student</th>
                    <th className="py-3 px-4 text-start">Admission #</th>
                    <th className="py-3 px-4 text-start">Attendance Mark</th>
                    <th className="py-3 px-4 text-start">Notes / Minutes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                  {roster.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
                          {student.name.slice(0, 1)}
                        </div>
                        {student.name}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                        {student.admissionNumber}
                      </td>
                      <td className="py-3 px-4">
                        <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800/60 gap-1">
                          <button
                            onClick={() => updateMark(student.id, "Present")}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                              student.mark === "Present"
                                ? "bg-emerald-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700"
                            }`}
                          >
                            Present (/)
                          </button>
                          <button
                            onClick={() => updateMark(student.id, "Late")}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                              student.mark === "Late"
                                ? "bg-amber-500 text-white shadow-sm"
                                : "text-slate-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-amber-700"
                            }`}
                          >
                            Late (L)
                          </button>
                          <button
                            onClick={() => updateMark(student.id, "AuthorisedAbsence")}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                              student.mark === "AuthorisedAbsence"
                                ? "bg-sky-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-sky-700"
                            }`}
                          >
                            Excused (M)
                          </button>
                          <button
                            onClick={() => updateMark(student.id, "UnauthorisedAbsence")}
                            className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                              student.mark === "UnauthorisedAbsence"
                                ? "bg-rose-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-700"
                            }`}
                          >
                            Unexcused (N)
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {student.mark === "Late" && (
                          <span className="text-amber-600 font-medium">
                            {student.minutesLate || 10} mins late
                          </span>
                        )}
                        {student.note && (
                          <span className="italic">{student.note}</span>
                        )}
                        {student.mark === "Present" && <span className="text-slate-400">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
