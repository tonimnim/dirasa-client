"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  UserCheck,
  Search,
  Plus,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  MoreVertical,
  ChevronRight,
} from "lucide-react";

interface TeacherItem {
  id: string;
  name: string;
  department: string;
  email: string;
  phone: string;
  coursesCount: number;
  classesCount: number;
  status: "Active" | "OnLeave";
}

export default function TeachersPage() {
  const [search, setSearch] = useState("");

  const teachers: TeacherItem[] = [
    {
      id: "t1",
      name: "Ms. Sarah Wanjiru",
      department: "Mathematics & Science",
      email: "s.wanjiru@redco.academy",
      phone: "+971 50 123 4567",
      coursesCount: 4,
      classesCount: 2,
      status: "Active",
    },
    {
      id: "t2",
      name: "Mr. David Okeke",
      department: "Humanities & History",
      email: "d.okeke@redco.academy",
      phone: "+971 50 234 5678",
      coursesCount: 3,
      classesCount: 2,
      status: "Active",
    },
    {
      id: "t3",
      name: "Dr. Fatima El-Khatib",
      department: "Chemistry & Biology",
      email: "f.khatib@redco.academy",
      phone: "+971 50 345 6789",
      coursesCount: 5,
      classesCount: 3,
      status: "Active",
    },
    {
      id: "t4",
      name: "Mr. Jean-Luc Mbida",
      department: "French & Modern Languages",
      email: "j.mbida@redco.academy",
      phone: "+971 50 456 7890",
      coursesCount: 4,
      classesCount: 2,
      status: "Active",
    },
    {
      id: "t5",
      name: "Ms. Amina Mansoor",
      department: "English Literature",
      email: "a.mansoor@redco.academy",
      phone: "+971 50 567 8901",
      coursesCount: 4,
      classesCount: 2,
      status: "Active",
    },
    {
      id: "t6",
      name: "Mr. Alex Mwangi",
      department: "Visual Arts & Design",
      email: "a.mwangi@redco.academy",
      phone: "+971 50 678 9012",
      coursesCount: 3,
      classesCount: 2,
      status: "Active",
    },
    {
      id: "t7",
      name: "Mr. Bilal El-Sayed",
      department: "Physical Education",
      email: "b.elsayed@redco.academy",
      phone: "+971 50 789 0123",
      coursesCount: 4,
      classesCount: 4,
      status: "Active",
    },
    {
      id: "t8",
      name: "Ms. Layla Benali",
      department: "Arabic Language & Studies",
      email: "l.benali@redco.academy",
      phone: "+971 50 890 1234",
      coursesCount: 5,
      classesCount: 3,
      status: "Active",
    },
    {
      id: "t9",
      name: "Mr. Mason Harrington",
      department: "Computer Science & Robotics",
      email: "m.harrington@redco.academy",
      phone: "+971 50 901 2345",
      coursesCount: 4,
      classesCount: 2,
      status: "Active",
    },
    {
      id: "t10",
      name: "Ms. Grace Nduta",
      department: "Music & Performing Arts",
      email: "g.nduta@redco.academy",
      phone: "+971 50 012 3456",
      coursesCount: 3,
      classesCount: 2,
      status: "OnLeave",
    },
  ];

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-800 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#fafafa]">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-[#1e3a34]">Teachers & Faculty</h1>
            <p className="text-xs text-slate-500">
              10 Faculty members &bull; Teaching assignments & timetable allocations
            </p>
          </div>

          <Button variant="primary" size="sm" className="bg-[#10b981] hover:bg-[#059669] text-white font-bold gap-1.5">
            <Plus className="h-4 w-4" /> Add Teacher
          </Button>
        </header>

        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* Search bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search teachers by name, subject, or email..."
                className="w-full h-9 ps-9 pe-4 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Showing {filtered.length} of {teachers.length} teachers
            </div>
          </div>

          {/* Grid of teachers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((teacher) => (
              <div
                key={teacher.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:border-teal-400 transition-all space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm">
                      {teacher.name.split(" ").slice(-1)[0][0]}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{teacher.name}</h3>
                      <p className="text-[11px] text-slate-500">{teacher.department}</p>
                    </div>
                  </div>
                  <Badge variant={teacher.status === "Active" ? "success" : "warning"}>
                    {teacher.status}
                  </Badge>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{teacher.phone}</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-2.5 flex items-center justify-between text-xs text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-teal-600" />
                    <span>{teacher.coursesCount} Courses</span>
                  </div>
                  <div className="text-slate-300">|</div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-teal-600" />
                    <span>{teacher.classesCount} Classes</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs font-semibold">
                  <Link
                    href={`/calendar?teacher=${teacher.id}`}
                    className="text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1"
                  >
                    View Timetable <ChevronRight className="h-3 w-3" />
                  </Link>
                  <Link href="/staff" className="text-slate-500 hover:text-slate-800">
                    Staff Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
