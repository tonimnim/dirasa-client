"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/legacy-ui/Button";
import { Badge } from "@/components/legacy-ui/Badge";
import { INITIAL_TEACHERS, TeacherItem } from "../page";
import {
  ChevronLeft,
  Mail,
  Phone,
  Calendar,
  Clock,
  MessageSquare,
  MapPin,
  Award,
  Layers,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function TeacherProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const foundTeacher = INITIAL_TEACHERS.find((t) => t.id === id);

  // Fallback if ID is newly added or custom
  const teacher: TeacherItem = foundTeacher || {
    id: id || "t-unknown",
    name: "Faculty Member",
    department: "General Academics",
    email: "faculty@redco.academy",
    phone: "+971 50 000 0000",
    coursesCount: 3,
    classesCount: 2,
    status: "Active",
    room: "Building B - Room 101",
    joinedYear: "2023",
    qualification: "M.Ed. Secondary Education",
  };

  const [activeTab, setActiveTab] = useState<"overview" | "classes" | "timetable" | "performance">("overview");

  // Mock Assigned Classes
  const assignedClasses = [
    {
      id: "cls-1",
      name: "Grade 7 - Blue",
      subject: "Primary Discipline",
      room: teacher.room || "Building B - 101",
      studentsCount: 24,
      period: "Period 1 & 2 (08:30 - 10:15)",
    },
    {
      id: "cls-3",
      name: "Grade 8 - Alpha",
      subject: "Advanced Discipline",
      room: teacher.room || "Building B - 201",
      studentsCount: 26,
      period: "Period 3 & 4 (10:30 - 12:15)",
    },
    ...(teacher.classesCount > 2
      ? [
          {
            id: "cls-5",
            name: "Grade 9 - Science",
            subject: "Elective Lab",
            room: "Science Wing - Lab 3",
            studentsCount: 20,
            period: "Period 5 (13:00 - 14:15)",
          },
        ]
      : []),
  ];

  // Mock Timetable Allocations
  const scheduleSlots = [
    { day: "Monday", time: "08:30 - 09:30", course: "Subject Core A", class: "Grade 7 - Blue", room: teacher.room },
    { day: "Monday", time: "10:00 - 11:00", course: "Subject Core B", class: "Grade 8 - Alpha", room: teacher.room },
    { day: "Tuesday", time: "08:30 - 09:30", course: "Subject Core A", class: "Grade 7 - Blue", room: teacher.room },
    { day: "Wednesday", time: "09:00 - 10:00", course: "Subject Core A", class: "Grade 7 - Blue", room: teacher.room },
    { day: "Wednesday", time: "11:00 - 12:00", course: "Subject Elective", class: "Grade 8 - Alpha", room: teacher.room },
    { day: "Thursday", time: "08:30 - 09:30", course: "Subject Core A", class: "Grade 7 - Blue", room: teacher.room },
    { day: "Friday", time: "10:00 - 11:30", course: "Seminar & Lab", class: "Grade 8 - Alpha", room: "Lab Center" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        {/* Header with Breadcrumb hierarchy: Home > Teachers > [Teacher Name] */}
        <AppHeader
          title={teacher.name}
          subtitle={`${teacher.department} • Room: ${teacher.room || "Building B"}`}
          badge={teacher.status === "Active" ? "Active Faculty" : "On Leave"}
          breadcrumbs={[
            { label: "Home", href: "/dashboard" },
            { label: "Teachers", href: "/teachers" },
            { label: teacher.name, current: true },
          ]}
          actionButton={
            <div className="flex items-center gap-2">
              <Link href={`/calendar?teacher=${teacher.id}`}>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold cursor-pointer">
                  <Calendar className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" /> View Timetable
                </Button>
              </Link>
              <Link href={`/messages?teacher=${teacher.id}`}>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold cursor-pointer">
                  <MessageSquare className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" /> Send Message
                </Button>
              </Link>
            </div>
          }
        />

        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* Faculty Hero Profile Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-2xl bg-teal-600 text-white font-black text-2xl flex items-center justify-center shadow-sm shrink-0 border border-teal-500">
                  {teacher.name.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{teacher.name}</h1>
                    <Badge variant={teacher.status === "Active" ? "success" : "warning"}>
                      {teacher.status === "OnLeave" ? "On Leave" : teacher.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-teal-700 dark:text-teal-400 mt-0.5">{teacher.department}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" /> {teacher.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" /> {teacher.phone}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" /> {teacher.room || "Building B"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stat Counter Badges */}
              <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <div className="bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 rounded-xl px-4 py-2.5 text-center min-w-[100px]">
                  <p className="text-lg font-bold text-teal-800 dark:text-teal-300">{teacher.coursesCount}</p>
                  <p className="text-[11px] font-semibold text-teal-700 dark:text-teal-400">Assigned Courses</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-center min-w-[100px]">
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{teacher.classesCount}</p>
                  <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Class Sections</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl px-4 py-2.5 text-center min-w-[100px]">
                  <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300">98.5%</p>
                  <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">Punctuality</p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 mt-6 pt-4 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-teal-600 text-white shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Faculty Overview
              </button>
              <button
                onClick={() => setActiveTab("classes")}
                className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "classes"
                    ? "bg-teal-600 text-white shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Assigned Classes ({assignedClasses.length})
              </button>
              <button
                onClick={() => setActiveTab("timetable")}
                className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "timetable"
                    ? "bg-teal-600 text-white shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Weekly Timetable ({scheduleSlots.length} Slots)
              </button>
              <button
                onClick={() => setActiveTab("performance")}
                className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === "performance"
                    ? "bg-teal-600 text-white shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Attendance & Appraisal
              </button>
            </div>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="h-4 w-4 text-teal-600 dark:text-teal-400" /> Academic & Professional Background
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Highest Qualification</p>
                      <p className="font-bold text-slate-800 dark:text-slate-100 mt-1">{teacher.qualification || "Postgraduate Degree in Education"}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Department</p>
                      <p className="font-bold text-slate-800 dark:text-slate-100 mt-1">{teacher.department}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Joined Institution</p>
                      <p className="font-bold text-slate-800 dark:text-slate-100 mt-1">September {teacher.joinedYear || "2021"}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Contract Type</p>
                      <p className="font-bold text-slate-800 dark:text-slate-100 mt-1">Full-Time Academic Faculty</p>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <p>
                      {teacher.name} is an experienced instructor at Redco Academy dedicated to curricular excellence, student pastoral care, and fostering critical inquiry across {teacher.department}. Supervises co-curricular academic clubs and term examinations.
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-teal-600 dark:text-teal-400" /> Safeguarding & Compliance
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60 font-medium">
                      <span>Police Background Clearance & Vetting</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">Verified (2026/2027)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-800/60 font-medium">
                      <span>First Aid & Adolescent Safeguarding Certification</span>
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">Current</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium">
                      <span>Ministry Teacher License Number</span>
                      <span className="font-mono text-slate-800 dark:text-slate-100">MOE-LIC-882910</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Quick Info */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Direct Contact Information</h3>
                  <div className="space-y-3 text-slate-600 dark:text-slate-300">
                    <div>
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Work Email</p>
                      <a href={`mailto:${teacher.email}`} className="text-teal-700 dark:text-teal-400 font-bold hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 rounded">
                        {teacher.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Work Telephone</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{teacher.phone}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Assigned Base Room</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{teacher.room || "Building B - Room 101"}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Office Consultation Hours</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">Mon, Wed 14:30 - 15:30</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 dark:bg-slate-800/90 text-white rounded-2xl p-5 shadow-xs space-y-3 border border-slate-800 dark:border-slate-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Timetable Deep Link</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    View complete synchronized calendar sessions, substitution duties, and exam invigilation schedules for this teacher.
                  </p>
                  <Link href={`/calendar?teacher=${teacher.id}`} className="block">
                    <Button variant="primary" size="sm" className="w-full bg-teal-500 hover:bg-teal-600 font-bold text-xs gap-1.5 cursor-pointer">
                      <Calendar className="h-3.5 w-3.5" /> Open Full Timetable
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Assigned Classes */}
          {activeTab === "classes" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Current Class Allocations</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Classes where {teacher.name} serves as homeroom or subject instructor</p>
                </div>
                <Link href="/classes/new">
                  <Button variant="outline" size="sm" className="text-xs font-semibold gap-1 cursor-pointer">
                    <Layers className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" /> Allocate Class
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {assignedClasses.map((cls) => (
                  <div
                    key={cls.id}
                    onClick={() => router.push(`/classes/${cls.id}`)}
                    className="border border-slate-200 dark:border-slate-800 bg-[#fafafa] dark:bg-slate-800/50 rounded-xl p-4 hover:border-teal-500 dark:hover:border-teal-500 hover:shadow-xs transition-all cursor-pointer group space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                          {cls.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{cls.subject}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">
                        {cls.studentsCount} Students
                      </Badge>
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                        <span>{cls.room}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                        <span>{cls.period}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-teal-700 dark:text-teal-400">
                      <span>View Class Roster</span>
                      <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Timetable */}
          {activeTab === "timetable" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Weekly Teaching Allocation</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fixed weekly timetable periods for {teacher.name}</p>
                </div>
                <Link href={`/calendar?teacher=${teacher.id}`}>
                  <Button variant="primary" size="sm" className="bg-teal-600 hover:bg-teal-700 text-xs font-bold gap-1.5 cursor-pointer">
                    <Calendar className="h-3.5 w-3.5" /> Switch to Interactive Timetable
                  </Button>
                </Link>
              </div>

              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#f8fafc] dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4 text-start">Day of Week</th>
                      <th className="py-3 px-4 text-start">Time Slot</th>
                      <th className="py-3 px-4 text-start">Course Title</th>
                      <th className="py-3 px-4 text-start">Class Section</th>
                      <th className="py-3 px-4 text-start">Room Allocation</th>
                      <th className="py-3 px-4 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {scheduleSlots.map((slot, index) => (
                      <tr key={index} className="hover:bg-teal-50/30 dark:hover:bg-slate-800/60 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{slot.day}</td>
                        <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">{slot.time}</td>
                        <td className="py-3 px-4 font-medium text-teal-900 dark:text-teal-300">{slot.course}</td>
                        <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">{slot.class}</td>
                        <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{slot.room}</td>
                        <td className="py-3 px-4 text-end">
                          <Link href={`/calendar?teacher=${teacher.id}`} className="text-teal-700 dark:text-teal-400 font-semibold hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 rounded">
                            Details &rarr;
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 4: Performance & Appraisal */}
          {activeTab === "performance" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">Attendance & Punctuality</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">98.5%</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Term 1 2026/2027</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  0 unexcused absences, 1 late check-in due to verified transit delay.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">Leave Entitlements</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-800 dark:text-slate-100">18 / 21</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Days Remaining</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  3 casual leave days taken. Status currently marked as {teacher.status}.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">Annual Appraisal Rating</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-teal-700 dark:text-teal-400">4.9 / 5.0</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Exemplary Faculty</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Commended for curriculum innovation, parent satisfaction index (96%), and student engagement.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
