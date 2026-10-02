"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/legacy-ui/Button";
import { Badge } from "@/components/legacy-ui/Badge";
import { INITIAL_CLASSES, ClassSection } from "../page";
import { INITIAL_STUDENTS, StudentProfile } from "../../students/page";
import {
  ChevronLeft,
  GraduationCap,
  BookOpen,
  UserCheck,
  Calendar,
  Clock,
  MapPin,
  Plus,
  ChevronRight,
} from "lucide-react";

export default function ClassDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const foundClass = INITIAL_CLASSES.find((c) => c.id === id);

  const classSection: ClassSection = foundClass || {
    id: id || "cls-unknown",
    name: "Class Section",
    gradeLevel: "Grade 7 (Year 8)",
    homeroomTeacher: "Ms. Sarah Wanjiru",
    studentsCount: 24,
    capacity: 28,
    coursesCount: 8,
    shift: "Morning (08:00 - 14:30)",
    room: "Building B - Room 101",
    sampleStudents: ["Mason Harrington", "Caleb Bennett", "Tariq Mansoor", "Amina Al-Falasi"],
  };

  const [activeTab, setActiveTab] = useState<"roster" | "courses" | "schedule" | "analytics">("roster");

  // Filter students who belong to this class section
  const rosterStudents = INITIAL_STUDENTS.filter(
    (s) => s.classSection.toLowerCase().includes(classSection.name.toLowerCase()) ||
           classSection.sampleStudents?.includes(s.name)
  );

  // If roster is empty (e.g. for classes where INITIAL_STUDENTS had fewer explicit matches), fallback with sample
  const displayedStudents = rosterStudents.length > 0 ? rosterStudents : INITIAL_STUDENTS.slice(0, 4);

  // Schedule for this class
  const classSchedule = [
    { period: "Period 1", time: "08:00 - 08:50", subject: "Mathematics 7", teacher: classSection.homeroomTeacher, room: classSection.room },
    { period: "Period 2", time: "08:55 - 09:45", subject: "English Literature 7", teacher: "Ms. Amina Mansoor", room: classSection.room },
    { period: "Break", time: "09:45 - 10:15", subject: "Morning Recess & Snack", teacher: "Campus Supervision", room: "Central Courtyard" },
    { period: "Period 3", time: "10:15 - 11:05", subject: "General Science 7", teacher: "Dr. Fatima El-Khatib", room: "Science Lab 2" },
    { period: "Period 4", time: "11:10 - 12:00", subject: "World History 7", teacher: "Mr. David Okeke", room: classSection.room },
    { period: "Lunch", time: "12:00 - 12:50", subject: "Lunch Break & Co-Curricular", teacher: "Campus Supervision", room: "Dining Pavilion" },
    { period: "Period 5", time: "12:50 - 13:40", subject: "Physical Education", teacher: "Mr. Bilal El-Sayed", room: "Gymnasium" },
    { period: "Period 6", time: "13:45 - 14:30", subject: "Robotics & Computing", teacher: "Mr. Mason Harrington", room: "Computer Lab 1" },
  ];

  const occupancy = Math.round((classSection.studentsCount / classSection.capacity) * 100);

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-800 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#fafafa]">
        {/* Breadcrumb Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <Link
              href="/classes"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/dashboard" className="hover:text-slate-700">Home</Link>
              <span>/</span>
              <Link href="/classes" className="hover:text-slate-700">Classes</Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">{classSection.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/attendance">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
                <Clock className="h-3.5 w-3.5 text-teal-600" /> Take Roll
              </Button>
            </Link>
            <Link href={`/calendar?class=${classSection.id}`}>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold">
                <Calendar className="h-3.5 w-3.5 text-teal-600" /> Timetable
              </Button>
            </Link>
            <Link href="/students/new">
              <Button variant="primary" size="sm" className="bg-[#10b981] hover:bg-[#059669] text-white font-bold gap-1.5 text-xs">
                <Plus className="h-3.5 w-3.5" /> Enroll Student
              </Button>
            </Link>
          </div>
        </header>

        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* Hero Class Banner */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-black text-2xl shadow-xs">
                  <GraduationCap className="h-10 w-10 text-teal-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-900">{classSection.name}</h1>
                    <Badge variant="outline" className="text-xs bg-slate-50 text-slate-700">
                      {classSection.gradeLevel}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <UserCheck className="h-3.5 w-3.5 text-teal-600" /> Homeroom Teacher: <strong>{classSection.homeroomTeacher}</strong>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" /> {classSection.room}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" /> {classSection.shift}
                    </span>
                  </p>
                </div>
              </div>

              {/* Quick Stat Pill Indicators */}
              <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-center min-w-[110px]">
                  <p className="text-lg font-bold text-slate-900">{classSection.studentsCount} / {classSection.capacity}</p>
                  <p className="text-[11px] font-semibold text-slate-500">Roster Capacity ({occupancy}%)</p>
                </div>
                <div className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-2.5 text-center min-w-[110px]">
                  <p className="text-lg font-bold text-teal-800">{classSection.coursesCount}</p>
                  <p className="text-[11px] font-semibold text-teal-600">Courses</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5 text-center min-w-[110px]">
                  <p className="text-lg font-bold text-emerald-700">98.2%</p>
                  <p className="text-[11px] font-semibold text-emerald-600">Avg Attendance</p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab("roster")}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === "roster"
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Enrolled Scholars Roster ({displayedStudents.length})
              </button>
              <button
                onClick={() => setActiveTab("courses")}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === "courses"
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Class Curriculum & Courses ({classSection.coursesCount})
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === "schedule"
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Weekly Timetable (Period Grid)
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === "analytics"
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                Class Analytics & Capacity
              </button>
            </div>
          </div>

          {/* Tab 1: Roster */}
          {activeTab === "roster" && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Enrolled Student Roster</h3>
                  <p className="text-xs text-slate-500">Click on any student row to view full 360 profile and safeguarding notes</p>
                </div>
                <Link href="/students/new">
                  <Button variant="outline" size="sm" className="text-xs font-semibold gap-1.5">
                    <Plus className="h-3.5 w-3.5 text-teal-600" /> Add Student to {classSection.name}
                  </Button>
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#f8fafc] border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4 text-start">Student Name</th>
                      <th className="py-3 px-4 text-start">Admission ID</th>
                      <th className="py-3 px-4 text-start">Primary Guardian</th>
                      <th className="py-3 px-4 text-start">Attendance</th>
                      <th className="py-3 px-4 text-start">Tuition Status</th>
                      <th className="py-3 px-4 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {displayedStudents.map((s) => (
                      <tr
                        key={s.id}
                        onClick={() => router.push(`/students/${s.id}`)}
                        className="hover:bg-teal-50/40 transition-colors cursor-pointer group"
                      >
                        <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-[#e6f8f1] text-[#0d9488] font-black flex items-center justify-center text-xs shrink-0 border border-[#ccfbf1]">
                            {s.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                          </div>
                          <div>
                            <div className="font-bold group-hover:text-teal-700 transition-colors">
                              {s.name}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {s.gender} &bull; DOB: {s.dob}
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono text-slate-600 text-[11px]">
                          {s.admissionNumber}
                        </td>

                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-800">{s.guardians[0]?.name || "Parent"}</div>
                          <div className="text-[10px] text-slate-400">{s.guardians[0]?.phone}</div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-semibold text-emerald-600">{s.attendanceRate}%</span>
                        </td>

                        <td className="py-3 px-4">
                          {s.balanceDue > 0 ? (
                            <span className="text-rose-600 font-bold bg-rose-50 border border-rose-200 px-2 py-0.5 rounded text-[10px]">
                              ${s.balanceDue.toLocaleString()} Due
                            </span>
                          ) : (
                            <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px]">
                              Settled
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-end">
                          <Link
                            href={`/students/${s.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-teal-700 hover:text-teal-900 font-semibold text-xs flex items-center gap-1 ms-auto justify-end"
                          >
                            Profile <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Courses */}
          {activeTab === "courses" && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Curriculum & Course Allocations</h3>
              <p className="text-xs text-slate-500">Subjects taught specifically in {classSection.name} for 2026/2027</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {[
                  { code: "MTH-07", title: "Mathematics 7", teacher: classSection.homeroomTeacher, hours: 5 },
                  { code: "ENG-07", title: "English Language & Lit 7", teacher: "Ms. Amina Mansoor", hours: 4 },
                  { code: "SCI-07", title: "General Science 7", teacher: "Dr. Fatima El-Khatib", hours: 4 },
                  { code: "HIS-07", title: "World History 7", teacher: "Mr. David Okeke", hours: 3 },
                  { code: "PED-07", title: "Physical Education", teacher: "Mr. Bilal El-Sayed", hours: 2 },
                  { code: "ARB-07", title: "Arabic Language Studies", teacher: "Ms. Layla Benali", hours: 3 },
                  { code: "CS-07", title: "Intro to Robotics & Code", teacher: "Mr. Mason Harrington", hours: 2 },
                  { code: "ART-07", title: "Visual Arts & Crafts", teacher: "Mr. Alex Mwangi", hours: 2 },
                ].map((course, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-[#fafafa] space-y-2 hover:border-teal-400 transition-colors">
                    <span className="font-mono text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      {course.code}
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs mt-1">{course.title}</h4>
                    <p className="text-[11px] text-slate-500">Teacher: {course.teacher}</p>
                    <p className="text-[10px] text-slate-400">{course.hours} Hours / Week &bull; 1.0 Credit</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Schedule */}
          {activeTab === "schedule" && (
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Daily Period Timetable</h3>
                  <p className="text-xs text-slate-500">Standard daily allocation for {classSection.name}</p>
                </div>
                <Link href={`/calendar?class=${classSection.id}`}>
                  <Button variant="primary" size="sm" className="bg-teal-600 hover:bg-teal-700 text-xs font-bold gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> Full Interactive Timetable
                  </Button>
                </Link>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#f8fafc] border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4 text-start">Period</th>
                      <th className="py-3 px-4 text-start">Time Slot</th>
                      <th className="py-3 px-4 text-start">Subject / Activity</th>
                      <th className="py-3 px-4 text-start">Teacher</th>
                      <th className="py-3 px-4 text-start">Room</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {classSchedule.map((slot, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="py-3 px-4 font-bold text-slate-900">{slot.period}</td>
                        <td className="py-3 px-4 font-mono text-slate-500">{slot.time}</td>
                        <td className="py-3 px-4 font-semibold text-teal-900">{slot.subject}</td>
                        <td className="py-3 px-4">{slot.teacher}</td>
                        <td className="py-3 px-4 text-slate-500">{slot.room}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 4: Analytics */}
          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Capacity & Occupancy</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-teal-700">{occupancy}%</span>
                  <span className="text-xs text-slate-500">{classSection.studentsCount} of {classSection.capacity} seats</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: `${occupancy}%` }} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {classSection.capacity - classSection.studentsCount} open seats remaining before class cap is reached.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Class Attendance Average</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-600">98.2%</span>
                  <span className="text-xs text-slate-500">Term 1 2026/2027</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Above institutional benchmark of 95.0%. Top performing section in {classSection.gradeLevel}.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Class Facility Allocation</h4>
                <div className="space-y-1">
                  <p className="text-base font-bold text-slate-900">{classSection.room}</p>
                  <p className="text-xs text-slate-500">Shift: {classSection.shift}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Equipped with interactive smartboard, 30 student desks, and high-speed Wi-Fi 6 access point.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
