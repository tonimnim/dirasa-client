"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  GraduationCap,
  Search,
  Plus,
  Filter,
  ShieldCheck,
  ShieldAlert,
  ChevronRight,
  User,
  Users,
  Calendar,
  Heart,
  CreditCard,
  FileText,
  Mail,
  Phone,
  Download,
  X,
  CheckCircle2,
  Clock,
  BookOpen,
} from "lucide-react";

export interface StudentProfile {
  id: string;
  admissionNumber: string;
  name: string;
  gender: "Male" | "Female";
  grade: string;
  classSection: string;
  status: "Enrolled" | "Withdrawn" | "Graduated";
  dob: string;
  admissionDate: string;
  guardians: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
    isPrimary: boolean;
    canPickup: boolean;
  }[];
  custodyAlert?: string;
  medicalNotes?: string;
  attendanceRate: number;
  unexcusedAbsences: number;
  tardies: number;
  balanceDue: number;
  enrolledCourses: string[];
}

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: "std-001",
    admissionNumber: "ADM-2024-001",
    name: "Mason Harrington",
    gender: "Male",
    grade: "Grade 7",
    classSection: "Grade 7 - Blue",
    status: "Enrolled",
    dob: "2013-10-08",
    admissionDate: "2024-09-01",
    guardians: [
      { name: "Robert Harrington", relationship: "Father", phone: "+971 50 112 3344", email: "r.harrington@tech.ae", isPrimary: true, canPickup: true },
      { name: "Sarah Harrington", relationship: "Mother", phone: "+971 50 112 3345", email: "s.harrington@gmail.com", isPrimary: false, canPickup: true }
    ],
    medicalNotes: "Asthma inhaler kept with school nurse.",
    attendanceRate: 98.4,
    unexcusedAbsences: 0,
    tardies: 1,
    balanceDue: 3360,
    enrolledCourses: ["Mathematics 7", "English Lit 7", "General Science 7", "World History 7"]
  },
  {
    id: "std-002",
    admissionNumber: "ADM-2024-002",
    name: "Caleb Bennett",
    gender: "Male",
    grade: "Grade 7",
    classSection: "Grade 7 - Blue",
    status: "Enrolled",
    dob: "2013-09-28",
    admissionDate: "2024-09-01",
    guardians: [
      { name: "Robert Bennett", relationship: "Legal Guardian", phone: "+44 7700 900123", email: "r.bennett@consulting.co.uk", isPrimary: true, canPickup: true }
    ],
    attendanceRate: 97.2,
    unexcusedAbsences: 1,
    tardies: 2,
    balanceDue: 3360,
    enrolledCourses: ["Mathematics 7", "English Lit 7", "General Science 7", "Physical Education"]
  },
  {
    id: "std-003",
    admissionNumber: "ADM-2024-003",
    name: "Adrian Orchard",
    gender: "Male",
    grade: "Grade 8",
    classSection: "Grade 8 - Alpha",
    status: "Enrolled",
    dob: "2012-09-29",
    admissionDate: "2024-09-01",
    guardians: [
      { name: "David Orchard", relationship: "Father", phone: "+971 50 666 7788", email: "d.orchard@globaltech.com", isPrimary: true, canPickup: true }
    ],
    attendanceRate: 96.0,
    unexcusedAbsences: 0,
    tardies: 3,
    balanceDue: 3360,
    enrolledCourses: ["Mathematics 8", "English Lit 8", "Chemistry Prep", "Robotics 1"]
  },
  {
    id: "std-004",
    admissionNumber: "ADM-2024-004",
    name: "Tariq Mansoor",
    gender: "Male",
    grade: "Grade 7",
    classSection: "Grade 7 - Blue",
    status: "Enrolled",
    dob: "2013-04-14",
    admissionDate: "2024-09-01",
    guardians: [
      { name: "Mansoor Tariq", relationship: "Father", phone: "+971 50 111 2233", email: "mansoor.t@emirates.net", isPrimary: true, canPickup: true },
      { name: "Zubaida Mansoor", relationship: "Mother", phone: "+971 50 111 2234", email: "zubaida.m@gmail.com", isPrimary: false, canPickup: true }
    ],
    attendanceRate: 99.1,
    unexcusedAbsences: 0,
    tardies: 0,
    balanceDue: 0,
    enrolledCourses: ["Mathematics 7", "English Lit 7", "Arabic Studies", "General Science 7"]
  },
  {
    id: "std-005",
    admissionNumber: "ADM-2024-005",
    name: "Amina Al-Falasi",
    gender: "Female",
    grade: "Grade 7",
    classSection: "Grade 7 - Blue",
    status: "Enrolled",
    dob: "2013-06-22",
    admissionDate: "2024-09-01",
    guardians: [
      { name: "H.E. Sultan Al-Falasi", relationship: "Father", phone: "+971 50 222 3344", email: "sultan.falasi@dubai.ae", isPrimary: true, canPickup: true }
    ],
    attendanceRate: 98.0,
    unexcusedAbsences: 0,
    tardies: 1,
    balanceDue: 1200,
    enrolledCourses: ["Mathematics 7", "English Lit 7", "Visual Arts", "French 1"]
  },
  {
    id: "std-006",
    admissionNumber: "ADM-2024-006",
    name: "Zayn Mwangi",
    gender: "Male",
    grade: "Grade 8",
    classSection: "Grade 8 - Beta",
    status: "Enrolled",
    dob: "2012-11-15",
    admissionDate: "2024-09-02",
    guardians: [
      { name: "Eng. Joseph Mwangi", relationship: "Father", phone: "+254 712 345678", email: "j.mwangi@kenya.org", isPrimary: true, canPickup: true },
      { name: "Dr. Faith Mwangi", relationship: "Mother", phone: "+254 712 345679", email: "faith.mwangi@health.go.ke", isPrimary: false, canPickup: true }
    ],
    attendanceRate: 94.5,
    unexcusedAbsences: 1,
    tardies: 4,
    balanceDue: 3360,
    enrolledCourses: ["Mathematics 8", "English Lit 8", "Biology Prep", "Swahili Studies"]
  },
  {
    id: "std-007",
    admissionNumber: "ADM-2024-007",
    name: "Fatima Zahra",
    gender: "Female",
    grade: "Grade 9",
    classSection: "Grade 9 - Science",
    status: "Enrolled",
    dob: "2011-03-10",
    admissionDate: "2023-09-01",
    guardians: [
      { name: "Mariam Zahra", relationship: "Mother", phone: "+971 50 444 5566", email: "mariam.zahra@outlook.com", isPrimary: true, canPickup: true }
    ],
    custodyAlert: "Court Custody Order: Sole maternal custody. Father has NO contact or collection rights.",
    medicalNotes: "Severe peanut allergy. EpiPen carried at all times.",
    attendanceRate: 97.8,
    unexcusedAbsences: 0,
    tardies: 1,
    balanceDue: 3360,
    enrolledCourses: ["AP Biology Prep", "Advanced Chemistry", "Pure Mathematics", "World History"]
  },
  {
    id: "std-008",
    admissionNumber: "ADM-2024-008",
    name: "Chloe Dubois",
    gender: "Female",
    grade: "Grade 7",
    classSection: "Grade 7 - Gold",
    status: "Enrolled",
    dob: "2013-05-18",
    admissionDate: "2024-09-01",
    guardians: [
      { name: "Jean-Pierre Dubois", relationship: "Father", phone: "+33 6 12 34 56 78", email: "jp.dubois@paris.fr", isPrimary: true, canPickup: true }
    ],
    attendanceRate: 96.5,
    unexcusedAbsences: 0,
    tardies: 2,
    balanceDue: 3360,
    enrolledCourses: ["Mathematics 7", "French Literature", "General Science 7", "Performing Arts"]
  },
  {
    id: "std-009",
    admissionNumber: "ADM-2024-009",
    name: "Lucas Silva",
    gender: "Male",
    grade: "Grade 8",
    classSection: "Grade 8 - Alpha",
    status: "Enrolled",
    dob: "2012-07-09",
    admissionDate: "2024-09-01",
    guardians: [
      { name: "Thiago Silva", relationship: "Father", phone: "+55 11 98765 4321", email: "thiago.silva@brasil.br", isPrimary: true, canPickup: true }
    ],
    attendanceRate: 98.9,
    unexcusedAbsences: 0,
    tardies: 0,
    balanceDue: 3360,
    enrolledCourses: ["Mathematics 8", "English Lit 8", "Physics Prep", "Physical Education"]
  },
  {
    id: "std-010",
    admissionNumber: "ADM-2024-010",
    name: "Aisha Kamau",
    gender: "Female",
    grade: "Grade 9",
    classSection: "Grade 9 - Arts",
    status: "Enrolled",
    dob: "2011-08-25",
    admissionDate: "2024-09-01",
    guardians: [
      { name: "Samuel Kamau", relationship: "Father", phone: "+254 722 001122", email: "s.kamau@nairobi.org", isPrimary: true, canPickup: true }
    ],
    attendanceRate: 99.4,
    unexcusedAbsences: 0,
    tardies: 0,
    balanceDue: 3360,
    enrolledCourses: ["Studio Art 1", "English Literature 9", "Global Geography", "Music Composition"]
  },
  {
    id: "std-011",
    admissionNumber: "ADM-2024-011",
    name: "Noah Kimani",
    gender: "Male",
    grade: "Grade 8",
    classSection: "Grade 8 - Beta",
    status: "Enrolled",
    dob: "2012-12-01",
    admissionDate: "2024-09-01",
    guardians: [
      { name: "Grace Kimani", relationship: "Mother", phone: "+254 733 445566", email: "grace.kimani@law.co.ke", isPrimary: true, canPickup: true }
    ],
    attendanceRate: 95.0,
    unexcusedAbsences: 1,
    tardies: 3,
    balanceDue: 3360,
    enrolledCourses: ["Mathematics 8", "General Science 8", "English Lit 8", "Physical Education"]
  },
  {
    id: "std-012",
    admissionNumber: "ADM-2024-012",
    name: "Leila Hassan",
    gender: "Female",
    grade: "Grade 7",
    classSection: "Grade 7 - Gold",
    status: "Enrolled",
    dob: "2013-02-14",
    admissionDate: "2024-09-01",
    guardians: [
      { name: "Dr. Tariq Hassan", relationship: "Father", phone: "+971 50 888 9900", email: "dr.hassan@hospital.ae", isPrimary: true, canPickup: true }
    ],
    attendanceRate: 97.6,
    unexcusedAbsences: 0,
    tardies: 1,
    balanceDue: 3360,
    enrolledCourses: ["Mathematics 7", "English Lit 7", "Arabic Studies", "General Science 7"]
  },
  {
    id: "std-013",
    admissionNumber: "ADM-2024-013",
    name: "David Adeyemi",
    gender: "Male",
    grade: "Grade 10",
    classSection: "Grade 10 - Tech & Coding",
    status: "Enrolled",
    dob: "2010-05-30",
    admissionDate: "2023-09-01",
    guardians: [
      { name: "Oluwaseun Adeyemi", relationship: "Father", phone: "+234 803 112 2334", email: "o.adeyemi@lagos.ng", isPrimary: true, canPickup: true }
    ],
    attendanceRate: 99.0,
    unexcusedAbsences: 0,
    tardies: 0,
    balanceDue: 0,
    enrolledCourses: ["Computer Science 10", "Advanced Algebra", "Physics 1", "Engineering Foundations"]
  },
  {
    id: "std-014",
    admissionNumber: "ADM-2024-014",
    name: "Sophia Chen",
    gender: "Female",
    grade: "Grade 10",
    classSection: "Grade 10 - Pre-Med",
    status: "Enrolled",
    dob: "2010-09-12",
    admissionDate: "2023-09-01",
    guardians: [
      { name: "Wei Chen", relationship: "Father", phone: "+971 50 555 4433", email: "wei.chen@trade.com", isPrimary: true, canPickup: true }
    ],
    attendanceRate: 100.0,
    unexcusedAbsences: 0,
    tardies: 0,
    balanceDue: 3360,
    enrolledCourses: ["Human Anatomy", "Organic Chemistry Basics", "Pre-Calculus", "Latin for Science"]
  },
  {
    id: "std-015",
    admissionNumber: "ADM-2024-015",
    name: "Marcus Osei",
    gender: "Male",
    grade: "Grade 11",
    classSection: "Grade 11 - STEM & Robotics",
    status: "Enrolled",
    dob: "2009-01-20",
    admissionDate: "2022-09-01",
    guardians: [
      { name: "Kwame Osei", relationship: "Father", phone: "+233 24 555 6677", email: "k.osei@accra.gov.gh", isPrimary: true, canPickup: true }
    ],
    attendanceRate: 96.8,
    unexcusedAbsences: 1,
    tardies: 1,
    balanceDue: 0,
    enrolledCourses: ["Robotics Engineering", "AP Calculus BC", "AP Physics C", "Microeconomics"]
  },
  {
    id: "std-016",
    admissionNumber: "ADM-2024-016",
    name: "Elena Rostova Jr",
    gender: "Female",
    grade: "Grade 12",
    classSection: "Grade 12 - Senior Scholars",
    status: "Enrolled",
    dob: "2008-11-04",
    admissionDate: "2021-09-01",
    guardians: [
      { name: "Dmitri Rostov", relationship: "Father", phone: "+971 50 999 1122", email: "d.rostov@aviation.ae", isPrimary: true, canPickup: true }
    ],
    attendanceRate: 98.5,
    unexcusedAbsences: 0,
    tardies: 1,
    balanceDue: 0,
    enrolledCourses: ["AP English Literature", "Multivariable Calculus", "International Relations", "AP Statistics"]
  }
];

export default function StudentsDirectoryPage() {
  const [students, setStudents] = useState<StudentProfile[]>(INITIAL_STUDENTS);
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "guardians" | "academics" | "billing">("overview");

  // New Student Form State
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentGender, setNewStudentGender] = useState<"Male" | "Female">("Male");
  const [newStudentGrade, setNewStudentGrade] = useState("Grade 7");
  const [newStudentClass, setNewStudentClass] = useState("Grade 7 - Blue");
  const [newStudentDob, setNewStudentDob] = useState("2013-05-15");
  const [newGuardianName, setNewGuardianName] = useState("");
  const [newGuardianPhone, setNewGuardianPhone] = useState("");
  const [newGuardianEmail, setNewGuardianEmail] = useState("");

  const handleEnrollStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const newStudent: StudentProfile = {
      id: `std-0${students.length + 1}`,
      admissionNumber: `ADM-2024-0${students.length + 1}`,
      name: newStudentName,
      gender: newStudentGender,
      grade: newStudentGrade,
      classSection: newStudentClass,
      status: "Enrolled",
      dob: newStudentDob,
      admissionDate: "2026-10-01",
      guardians: [
        {
          name: newGuardianName || "Primary Guardian",
          relationship: "Parent",
          phone: newGuardianPhone || "+971 50 000 0000",
          email: newGuardianEmail || "parent@example.com",
          isPrimary: true,
          canPickup: true,
        }
      ],
      attendanceRate: 100,
      unexcusedAbsences: 0,
      tardies: 0,
      balanceDue: 3360,
      enrolledCourses: ["Core Mathematics", "English Language", "General Science", "Physical Education"],
    };

    setStudents([newStudent, ...students]);
    setIsEnrollModalOpen(false);
    setNewStudentName("");
    setNewGuardianName("");
    setNewGuardianPhone("");
    setNewGuardianEmail("");
  };

  const exportCSV = () => {
    const headers = "Admission #,Name,Gender,Grade,Class,Status,Guardians,Attendance %,Balance Due\n";
    const rows = students
      .map(
        (s) =>
          `"${s.admissionNumber}","${s.name}","${s.gender}","${s.grade}","${s.classSection}","${s.status}","${s.guardians.map((g) => g.name).join("; ")}",${s.attendanceRate}%,$${s.balanceDue}`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "DreamClass_Redco_Student_Directory.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.classSection.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = gradeFilter === "All" || s.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-800 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#fafafa]">
        <AppHeader
          title="Students Directory"
          subtitle="16 Active Students • Complete SIS profiles, safeguarding, academic records & balances"
          badge={`${students.length} Enrolled`}
          actionButton={
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={exportCSV}
                className="gap-1.5 text-xs text-slate-700 bg-white border-slate-200 hover:bg-slate-50"
              >
                <Download className="h-3.5 w-3.5" /> Export CSV
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsEnrollModalOpen(true)}
                className="bg-[#10b981] hover:bg-[#059669] text-white font-bold gap-1.5 text-xs shadow-xs"
              >
                <Plus className="h-4 w-4" /> Enroll Student
              </Button>
            </div>
          }
        />

        <main className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Top Quick KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Total Students</span>
                <div className="text-2xl font-black text-slate-900 mt-0.5">{students.length}</div>
                <span className="text-[11px] text-teal-600 font-medium">100% Verified Identities</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Users className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Average Attendance</span>
                <div className="text-2xl font-black text-emerald-600 mt-0.5">97.4%</div>
                <span className="text-[11px] text-slate-400">Above 95% target</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Clock className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Safeguarding Flags</span>
                <div className="text-2xl font-black text-rose-600 mt-0.5">1 Alert</div>
                <span className="text-[11px] text-rose-600 font-medium">Court custody order active</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <ShieldAlert className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Outstanding Balances</span>
                <div className="text-2xl font-black text-amber-600 mt-0.5">10 Overdue</div>
                <span className="text-[11px] text-slate-500">$33,600.00 Total Due</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by student name, admission #, or class..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 ps-9 pe-4 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-500 font-medium shrink-0">Grade:</span>
              {["All", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((g) => (
                <button
                  key={g}
                  onClick={() => setGradeFilter(g)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                    gradeFilter === g
                      ? "bg-[#cbf4e5] text-[#065f46]"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Students Directory Data Table */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead className="bg-[#f8fafc] border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4 text-start">Student Name</th>
                    <th className="py-3 px-4 text-start">Admission ID</th>
                    <th className="py-3 px-4 text-start">Class Section</th>
                    <th className="py-3 px-4 text-start">Guardians</th>
                    <th className="py-3 px-4 text-start">Attendance</th>
                    <th className="py-3 px-4 text-start">Fee Balance</th>
                    <th className="py-3 px-4 text-start">Status</th>
                    <th className="py-3 px-4 text-end">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filtered.map((s) => (
                    <tr
                      key={s.id}
                      onClick={() => {
                        setSelectedStudent(s);
                        setActiveTab("overview");
                      }}
                      className="hover:bg-teal-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#e6f8f1] text-[#0d9488] font-black flex items-center justify-center text-xs shrink-0 border border-[#ccfbf1]">
                          {s.name
                            .split(" ")
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold group-hover:text-teal-700 transition-colors truncate">
                            {s.name}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 font-normal">
                            <span>{s.gender}</span>
                            <span>&bull;</span>
                            <span>DOB: {s.dob}</span>
                            {s.custodyAlert && (
                              <span className="text-rose-600 font-bold flex items-center gap-0.5">
                                &bull; <ShieldAlert className="h-3 w-3" /> Custody Alert
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 font-mono text-slate-600 text-[11px]">
                        {s.admissionNumber}
                      </td>

                      <td className="py-3 px-4">
                        <span className="bg-slate-100 text-slate-800 font-semibold px-2 py-0.5 rounded text-[11px]">
                          {s.classSection}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="text-[11px] font-medium text-slate-800">
                          {s.guardians[0]?.name || "None"}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {s.guardians[0]?.relationship} &bull; {s.guardians[0]?.phone}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                s.attendanceRate >= 95 ? "bg-emerald-500" : "bg-amber-500"
                              }`}
                              style={{ width: `${s.attendanceRate}%` }}
                            />
                          </div>
                          <span className="font-semibold text-slate-800">{s.attendanceRate}%</span>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {s.balanceDue > 0 ? (
                          <span className="text-rose-600 font-bold bg-rose-50 border border-rose-200 px-2 py-0.5 rounded text-[11px]">
                            ${s.balanceDue.toLocaleString()} Due
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                            Settled $0.00
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <Badge variant="success">Enrolled</Badge>
                      </td>

                      <td className="py-3 px-4 text-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudent(s);
                            setActiveTab("overview");
                          }}
                          className="text-teal-700 hover:text-teal-900 font-semibold text-xs flex items-center gap-1 ms-auto"
                        >
                          View 360 <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Student 360 Slide-over Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            {/* Drawer Header */}
            <div className="p-6 bg-[#0d1527] text-white flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-teal-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                  {selectedStudent.name
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold">{selectedStudent.name}</h2>
                    <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-teal-500/30">
                      {selectedStudent.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {selectedStudent.admissionNumber} &bull; {selectedStudent.classSection}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Tabs */}
            <div className="flex items-center border-b border-slate-200 px-6 bg-slate-50 text-xs font-semibold">
              {[
                { id: "overview", label: "Overview & Personal" },
                { id: "guardians", label: "Guardians & Safeguarding" },
                { id: "academics", label: "Courses & Classes" },
                { id: "billing", label: "Fee Ledger" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-3 border-b-2 font-bold transition-colors ${
                    activeTab === tab.id
                      ? "border-teal-600 text-teal-700 bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Drawer Body Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
              {activeTab === "overview" && (
                <div className="space-y-5">
                  {selectedStudent.custodyAlert && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-rose-800">
                        <ShieldAlert className="h-4 w-4" /> Legal Custody Restriction Active
                      </div>
                      <p className="text-[11px] leading-relaxed">{selectedStudent.custodyAlert}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Date of Birth</span>
                      <p className="font-semibold text-slate-800 text-sm mt-0.5">{selectedStudent.dob}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Gender</span>
                      <p className="font-semibold text-slate-800 text-sm mt-0.5">{selectedStudent.gender}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Admission Date</span>
                      <p className="font-semibold text-slate-800 text-sm mt-0.5">{selectedStudent.admissionDate}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Attendance Rate</span>
                      <p className="font-semibold text-emerald-600 text-sm mt-0.5">{selectedStudent.attendanceRate}%</p>
                    </div>
                  </div>

                  {selectedStudent.medicalNotes && (
                    <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900">
                      <span className="text-[10px] text-amber-700 font-bold uppercase flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5 text-rose-500" /> Medical & Health Alert
                      </span>
                      <p className="font-medium text-xs mt-1">{selectedStudent.medicalNotes}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900">Enrolled Courses (4 Courses)</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedStudent.enrolledCourses.map((c) => (
                        <div key={c} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-teal-600" />
                          <span className="font-medium text-slate-800">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "guardians" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Authorized Guardians & Contacts</h3>
                    <span className="text-[10px] text-slate-500 font-medium">Safeguarded Directory</span>
                  </div>

                  {selectedStudent.guardians.map((g, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm">{g.name}</h4>
                            {g.isPrimary && (
                              <span className="text-[10px] font-bold bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full">
                                Primary Billing & Contact
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{g.relationship}</p>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>{g.canPickup ? "Authorized Pickup" : "No Collection"}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-slate-400" />
                          <span>{g.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-slate-400" />
                          <span className="truncate">{g.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "academics" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-900">Academic Progress & Attendance</h3>
                  <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Academic Year</span>
                      <span className="font-bold text-slate-900">Sep 2026 - Jul 2027</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Current Homeroom Section</span>
                      <span className="font-bold text-teal-700">{selectedStudent.classSection}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Tardy Count</span>
                      <span className="font-bold text-slate-700">{selectedStudent.tardies} incidents</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Unexcused Absences</span>
                      <span className="font-bold text-slate-700">{selectedStudent.unexcusedAbsences} days</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <Link
                      href="/grading"
                      className="text-teal-700 hover:underline font-bold text-xs flex items-center gap-1"
                    >
                      Open Gradebook Broadsheet &rarr;
                    </Link>
                    <Link
                      href="/attendance"
                      className="text-teal-700 hover:underline font-bold text-xs flex items-center gap-1"
                    >
                      View Full Attendance Register &rarr;
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "billing" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 font-medium">Outstanding Balance</span>
                      <div className="text-2xl font-black text-rose-600 mt-0.5">
                        ${selectedStudent.balanceDue.toLocaleString()}
                      </div>
                      <span className="text-[11px] text-slate-400">Term 1 2026/2027 Tuition</span>
                    </div>
                    <Link
                      href="/fees"
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg"
                    >
                      Receive Payment
                    </Link>
                  </div>

                  <h3 className="font-bold text-slate-900 pt-2">Recent Invoices</h3>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">INV-2026-0891</p>
                      <p className="text-[11px] text-slate-400">Due Sep 15, 2026</p>
                    </div>
                    <div className="text-end">
                      <p className="font-bold text-slate-900">${selectedStudent.balanceDue.toLocaleString()}</p>
                      <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">
                        {selectedStudent.balanceDue > 0 ? "Overdue" : "Settled"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedStudent(null)}
                className="text-xs"
              >
                Close Profile
              </Button>
              <div className="flex items-center gap-2">
                <Link
                  href={`/messages?student=${selectedStudent.id}`}
                  className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  <Mail className="h-3.5 w-3.5 text-teal-600" /> Message Family
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enroll Student Modal */}
      {isEnrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-[#0d1527] text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Enroll New Student</h3>
                <p className="text-xs text-slate-300">Official registry entry & homeroom assignment</p>
              </div>
              <button
                onClick={() => setIsEnrollModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEnrollStudent} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mason Harrington"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Gender</label>
                  <select
                    value={newStudentGender}
                    onChange={(e) => setNewStudentGender(e.target.value as any)}
                    className="w-full h-9 px-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Date of Birth</label>
                  <input
                    type="date"
                    value={newStudentDob}
                    onChange={(e) => setNewStudentDob(e.target.value)}
                    className="w-full h-9 px-2 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Grade Level</label>
                  <select
                    value={newStudentGrade}
                    onChange={(e) => setNewStudentGrade(e.target.value)}
                    className="w-full h-9 px-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
                    <option value="Grade 11">Grade 11</option>
                    <option value="Grade 12">Grade 12</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Class Section</label>
                  <select
                    value={newStudentClass}
                    onChange={(e) => setNewStudentClass(e.target.value)}
                    className="w-full h-9 px-2 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Grade 7 - Blue">Grade 7 - Blue</option>
                    <option value="Grade 7 - Gold">Grade 7 - Gold</option>
                    <option value="Grade 8 - Alpha">Grade 8 - Alpha</option>
                    <option value="Grade 8 - Beta">Grade 8 - Beta</option>
                    <option value="Grade 9 - Science">Grade 9 - Science</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-3">
                <span className="font-bold text-slate-800 uppercase text-[10px] tracking-wider block">
                  Primary Guardian Information
                </span>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Guardian Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Robert Harrington"
                    value={newGuardianName}
                    onChange={(e) => setNewGuardianName(e.target.value)}
                    className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+971 50..."
                      value={newGuardianPhone}
                      onChange={(e) => setNewGuardianPhone(e.target.value)}
                      className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      placeholder="parent@..."
                      value={newGuardianEmail}
                      onChange={(e) => setNewGuardianEmail(e.target.value)}
                      className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEnrollModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-bold"
                >
                  Confirm & Enroll
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
