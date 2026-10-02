"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/legacy-ui/Button";
import { Badge } from "@/components/legacy-ui/Badge";
import {
  UserCheck,
  Search,
  Plus,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  ChevronRight,
  Download,
  Filter,
} from "lucide-react";

export interface TeacherItem {
  id: string;
  name: string;
  department: string;
  email: string;
  phone: string;
  coursesCount: number;
  classesCount: number;
  status: "Active" | "OnLeave";
  room?: string;
  joinedYear?: string;
  qualification?: string;
}

export const INITIAL_TEACHERS: TeacherItem[] = [
  {
    id: "t1",
    name: "Ms. Sarah Wanjiru",
    department: "Mathematics & Science",
    email: "s.wanjiru@redco.academy",
    phone: "+971 50 123 4567",
    coursesCount: 4,
    classesCount: 2,
    status: "Active",
    room: "Building B - Room 101",
    joinedYear: "2021",
    qualification: "M.Sc. Mathematics Education",
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
    room: "Building B - Room 102",
    joinedYear: "2022",
    qualification: "M.A. Modern World History",
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
    room: "Science Wing - Lab 3",
    joinedYear: "2019",
    qualification: "Ph.D. Biochemistry",
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
    room: "Building B - Room 202",
    joinedYear: "2020",
    qualification: "B.Ed. Modern European Languages",
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
    room: "Building B - Room 201",
    joinedYear: "2022",
    qualification: "M.A. Comparative Literature",
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
    room: "Arts Atelier - Studio 2",
    joinedYear: "2023",
    qualification: "B.F.A. Fine Arts & Graphic Media",
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
    room: "Sports Pavilion - Gym 1",
    joinedYear: "2021",
    qualification: "B.Sc. Sports Science & Kinesiology",
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
    room: "Building A - Room 105",
    joinedYear: "2020",
    qualification: "M.A. Arabic Linguistics & Islamic Studies",
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
    room: "Innovation Hub - Computer Lab 1",
    joinedYear: "2022",
    qualification: "M.Sc. Software Engineering & AI",
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
    room: "Music Pavilion - Studio 4",
    joinedYear: "2021",
    qualification: "B.Mus. Classical & Contemporary Performance",
  },
];

export default function TeachersPage() {
  const router = useRouter();
  const [teachers] = useState<TeacherItem[]>(INITIAL_TEACHERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "OnLeave">("All");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");

  const departments = ["All", ...Array.from(new Set(teachers.map((t) => t.department)))];

  const filtered = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    const matchesDepartment = departmentFilter === "All" || t.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Department", "Email", "Phone", "Courses", "Classes", "Status"];
    const rows = filtered.map((t) => [
      t.id,
      `"${t.name}"`,
      `"${t.department}"`,
      t.email,
      t.phone,
      t.coursesCount,
      t.classesCount,
      t.status,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `teachers_faculty_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        {/* Header with Breadcrumbs */}
        <AppHeader
          title="Teachers & Faculty"
          subtitle={`${teachers.length} Faculty members • Teaching assignments & timetable allocations`}
          badge="10 Faculty"
          breadcrumbs={[{ label: "Home", href: "/dashboard" }, { label: "Teachers" }]}
          actionButton={
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="text-xs font-semibold gap-1.5"
              >
                <Download className="h-3.5 w-3.5" /> Export CSV
              </Button>
              <Link href="/teachers/new">
                <Button variant="primary" size="sm" className="bg-[#10b981] hover:bg-[#059669] text-white font-bold gap-1.5 text-xs shadow-xs">
                  <Plus className="h-4 w-4" /> Add Teacher
                </Button>
              </Link>
            </div>
          }
        />

        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* Quick Actions & Filters Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search teachers by name, subject, or email..."
                className="w-full h-9 ps-9 pe-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Department Dropdown Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                <Filter className="h-3.5 w-3.5 text-slate-400" />
                <span>Dept:</span>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md py-1 px-2 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Tabs */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700">
                {(["All", "Active", "OnLeave"] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                      statusFilter === status
                        ? "bg-white dark:bg-slate-700 text-teal-800 dark:text-teal-300 shadow-xs font-bold"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {status === "OnLeave" ? "On Leave" : status}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Showing {filtered.length} of {teachers.length}
              </div>
            </div>
          </div>

          {/* Grid of teachers - clickable cards navigating to /teachers/[id] */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((teacher) => (
              <div
                key={teacher.id}
                onClick={() => router.push(`/teachers/${teacher.id}`)}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-md transition-all space-y-4 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    router.push(`/teachers/${teacher.id}`);
                  }
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-105 transition-transform border border-teal-200 dark:border-teal-800">
                      {teacher.name.split(" ").slice(-1)[0][0]}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                        {teacher.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{teacher.department}</p>
                    </div>
                  </div>
                  <Badge variant={teacher.status === "Active" ? "success" : "warning"}>
                    {teacher.status === "OnLeave" ? "On Leave" : teacher.status}
                  </Badge>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                    <span className="truncate">{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                    <span>{teacher.phone}</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-2.5 flex items-center justify-between text-xs text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                    <span>{teacher.coursesCount} Courses</span>
                  </div>
                  <div className="text-slate-300 dark:text-slate-600">|</div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />
                    <span>{teacher.classesCount} Classes</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs font-semibold">
                  <Link
                    href={`/calendar?teacher=${teacher.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 hover:underline flex items-center gap-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500 rounded"
                  >
                    View Timetable <ChevronRight className="h-3 w-3" />
                  </Link>
                  <span className="text-slate-500 dark:text-slate-400 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors flex items-center gap-0.5 text-xs">
                    View Profile &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-500 dark:text-slate-400">
              <UserCheck className="h-10 w-10 mx-auto text-slate-400 dark:text-slate-500 mb-3" />
              <p className="font-semibold text-slate-900 dark:text-white">No teachers found</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
