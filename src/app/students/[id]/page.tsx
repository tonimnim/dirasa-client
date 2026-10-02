"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/legacy-ui/Button";
import { Badge } from "@/components/legacy-ui/Badge";
import { INITIAL_STUDENTS, StudentProfile } from "../page";
import {
  ChevronLeft,
  GraduationCap,
  User,
  CreditCard,
  Mail,
  Phone,
  ShieldAlert,
  CheckCircle2,
  Clock,
  BookOpen,
  Heart,
  MessageSquare,
  Printer,
  Receipt,
  Smartphone,
  ChevronRight,
} from "lucide-react";

export default function StudentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const foundStudent = INITIAL_STUDENTS.find((s) => s.id === id);

  // Fallback for custom or newly enrolled ID
  const student: StudentProfile = foundStudent || {
    id: id || "std-unknown",
    admissionNumber: "ADM-2024-999",
    name: "Enrolled Student",
    gender: "Male",
    grade: "Grade 7",
    classSection: "Grade 7 - Blue",
    status: "Enrolled",
    dob: "2013-01-01",
    admissionDate: "2024-09-01",
    guardians: [
      {
        name: "Primary Guardian",
        relationship: "Parent",
        phone: "+971 50 000 0000",
        email: "guardian@example.com",
        isPrimary: true,
        canPickup: true,
      },
    ],
    attendanceRate: 98.0,
    unexcusedAbsences: 0,
    tardies: 1,
    balanceDue: 3360,
    enrolledCourses: ["Mathematics 7", "General Science 7", "English Lit 7", "Physical Education"],
  };

  const [activeTab, setActiveTab] = useState<"overview" | "guardians" | "academics" | "billing" | "safeguarding">("overview");

  // In-page M-Pesa / Card payment simulation state
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [payGateway, setPayGateway] = useState<"mpesa" | "paystack">("mpesa");
  const [payPhone, setPayPhone] = useState(student.guardians[0]?.phone || "254712345678");
  const [payAmount, setPayAmount] = useState(student.balanceDue || 500);
  const [payStatus, setPayStatus] = useState<"idle" | "sending" | "success">("idle");
  const [receiptNumber, setReceiptNumber] = useState("");

  const handleSimulatePayment = () => {
    setPayStatus("sending");
    setTimeout(() => {
      setPayStatus("success");
      setReceiptNumber(`REC-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1200);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <AppHeader
          title={student.name}
          subtitle={`${student.admissionNumber} • ${student.classSection}`}
          badge={student.status}
          breadcrumbs={[
            { label: "Home", href: "/dashboard" },
            { label: "Students", href: "/students" },
            { label: student.name, current: true },
          ]}
          actionButton={
            <div className="flex items-center gap-2">
              <Link href={`/messages?student=${student.id}`}>
                <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold cursor-pointer">
                  <MessageSquare className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" /> Send Message
                </Button>
              </Link>
              <Link href="/attendance">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold cursor-pointer">
                  <Clock className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" /> Attendance
                </Button>
              </Link>
              <Link href="/grading">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold cursor-pointer">
                  <Printer className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" /> Report Card
                </Button>
              </Link>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setPayStatus("idle");
                  setIsPayModalOpen(true);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <CreditCard className="h-3.5 w-3.5" /> Record Fee Payment
              </Button>
            </div>
          }
        />

        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* Safeguarding Alert Banners */}
          {student.custodyAlert && (
            <div className="bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 rounded-xl p-4 flex items-start gap-3 shadow-xs animate-in fade-in">
              <ShieldAlert className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-rose-900 dark:text-rose-200 uppercase tracking-wide">
                  Legal Safeguarding & Custody Restriction Order Active
                </h4>
                <p className="text-xs text-rose-800 dark:text-rose-300 mt-0.5 leading-relaxed font-medium">
                  {student.custodyAlert}
                </p>
              </div>
            </div>
          )}

          {student.medicalNotes && (
            <div className="bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3 shadow-xs">
              <Heart className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wide">
                  Medical & Health Action Plan
                </h4>
                <p className="text-xs text-amber-800 dark:text-amber-300 mt-0.5 leading-relaxed font-medium">
                  {student.medicalNotes}
                </p>
              </div>
            </div>
          )}

          {/* Student Hero 360 Header */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-2xl bg-[#e6f8f1] dark:bg-teal-950/80 text-[#0d9488] dark:text-teal-300 font-black text-2xl flex items-center justify-center border border-[#ccfbf1] dark:border-teal-800 shadow-xs">
                  {student.name
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{student.name}</h1>
                    <Badge variant="success">Enrolled</Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded font-semibold">
                      {student.admissionNumber}
                    </span>
                    <span>&bull;</span>
                    <span className="font-semibold text-teal-800 dark:text-teal-300">{student.classSection}</span>
                    <span>&bull;</span>
                    <span>{student.gender}</span>
                    <span>&bull;</span>
                    <span>DOB: {student.dob}</span>
                  </div>
                </div>
              </div>

              {/* KPI Strip */}
              <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 rounded-xl px-4 py-2.5 text-center min-w-[110px]">
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">{student.attendanceRate}%</p>
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Attendance</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-center min-w-[110px]">
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{student.tardies}</p>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Tardies</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-center min-w-[110px]">
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-100">{student.unexcusedAbsences}</p>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Unexcused</p>
                </div>
                <div
                  className={`rounded-xl px-4 py-2.5 text-center min-w-[120px] border ${
                    student.balanceDue > 0
                      ? "bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300"
                      : "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  <p className="text-lg font-bold">
                    {student.balanceDue > 0 ? `$${student.balanceDue.toLocaleString()}` : "$0.00"}
                  </p>
                  <p className="text-[11px] font-semibold">
                    {student.balanceDue > 0 ? "Fee Due" : "Settled"}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs font-semibold overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-teal-600 text-white shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Profile 360
              </button>
              <button
                onClick={() => setActiveTab("guardians")}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "guardians"
                    ? "bg-teal-600 text-white shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Guardians & Safeguarding ({student.guardians.length})
              </button>
              <button
                onClick={() => setActiveTab("academics")}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "academics"
                    ? "bg-teal-600 text-white shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Courses & Timetable ({student.enrolledCourses.length})
              </button>
              <button
                onClick={() => setActiveTab("billing")}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "billing"
                    ? "bg-teal-600 text-white shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Fees & Payment Ledger
              </button>
              <button
                onClick={() => setActiveTab("safeguarding")}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === "safeguarding"
                    ? "bg-teal-600 text-white shadow-xs font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Medical & Emergency Notes
              </button>
            </div>
          </div>

          {/* Tab 1: Profile 360 Overview */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <User className="h-4 w-4 text-teal-600 dark:text-teal-400" /> Student Identity & Bio
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Full Legal Name</p>
                      <p className="font-bold text-slate-900 dark:text-slate-100 mt-1">{student.name}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Admission ID</p>
                      <p className="font-mono font-bold text-slate-900 dark:text-slate-100 mt-1">{student.admissionNumber}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Assigned Class Section</p>
                      <p className="font-bold text-teal-800 dark:text-teal-300 mt-1">{student.classSection}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Date of Birth</p>
                      <p className="font-bold text-slate-900 dark:text-slate-100 mt-1">{student.dob}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Gender</p>
                      <p className="font-bold text-slate-900 dark:text-slate-100 mt-1">{student.gender}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60">
                      <p className="text-slate-400 dark:text-slate-400 font-medium">Admission Enrolled Date</p>
                      <p className="font-bold text-slate-900 dark:text-slate-100 mt-1">{student.admissionDate}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Clock className="h-4 w-4 text-teal-600 dark:text-teal-400" /> Attendance Records
                  </h3>
                  <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-100 dark:border-teal-800/60 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-teal-900 dark:text-teal-200">Term 1 2026/2027 Attendance Rate: {student.attendanceRate}%</p>
                      <p className="text-teal-700 dark:text-teal-400 mt-0.5">
                        {student.unexcusedAbsences} unexcused absence, {student.tardies} late arrival recorded to date.
                      </p>
                    </div>
                    <Link href="/attendance">
                      <Button variant="outline" size="sm" className="bg-white dark:bg-slate-800 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-700 text-xs cursor-pointer">
                        View Register
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Side Card: Primary Contact & Actions */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs space-y-4 text-xs">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Primary Contact (Parent)</h3>
                  {student.guardians[0] ? (
                    <div className="space-y-3">
                      <div>
                        <p className="text-slate-400 dark:text-slate-400 font-medium">Name</p>
                        <p className="font-bold text-slate-900 dark:text-slate-100">{student.guardians[0].name}</p>
                        <Badge variant="outline" className="text-[10px] mt-1 bg-slate-50 dark:bg-slate-800 dark:border-slate-700">
                          {student.guardians[0].relationship}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-slate-400 dark:text-slate-400 font-medium">Phone</p>
                        <a href={`tel:${student.guardians[0].phone}`} className="font-semibold text-teal-700 dark:text-teal-400 hover:underline">
                          {student.guardians[0].phone}
                        </a>
                      </div>
                      <div>
                        <p className="text-slate-400 dark:text-slate-400 font-medium">Email</p>
                        <a href={`mailto:${student.guardians[0].email}`} className="font-semibold text-teal-700 dark:text-teal-400 hover:underline">
                          {student.guardians[0].email}
                        </a>
                      </div>
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Authorized for School Pick-up
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-400 dark:text-slate-500">No guardian on file</p>
                  )}
                </div>

                <div className="bg-slate-900 dark:bg-slate-800/90 text-white rounded-2xl p-5 shadow-xs space-y-3 border dark:border-slate-700">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">Class Section Roster</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    View fellow classmates, homeroom teacher schedule, and room assignment in {student.classSection}.
                  </p>
                  <Link href={`/classes`} className="block">
                    <Button variant="primary" size="sm" className="w-full bg-teal-500 hover:bg-teal-600 font-bold text-xs gap-1.5 cursor-pointer">
                      <GraduationCap className="h-3.5 w-3.5" /> Open Class View
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Guardians */}
          {activeTab === "guardians" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Guardian Directory & Contact Permissions</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Individuals authorized for pastoral contact, billing, and campus pickup</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.guardians.map((g, idx) => (
                  <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-slate-50/50 dark:bg-slate-800/50 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{g.name}</h4>
                        <p className="text-xs text-teal-800 dark:text-teal-400 font-medium">{g.relationship}</p>
                      </div>
                      {g.isPrimary && (
                        <Badge variant="success" className="text-[10px]">
                          Primary Contact
                        </Badge>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 border-t border-slate-200/60 dark:border-slate-700 pt-3">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                        <span>{g.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                        <span>{g.email}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Campus Pickup:</span>
                      <span className={`font-bold ${g.canPickup ? "text-emerald-700 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {g.canPickup ? "Authorized" : "Not Authorized"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Academics & Courses */}
          {activeTab === "academics" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Enrolled Subjects & Curriculum Modules</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Active coursework for {student.grade} - 2026/2027 Academic Year</p>
                </div>
                <Link href="/calendar">
                  <Button variant="outline" size="sm" className="text-xs font-semibold gap-1.5 cursor-pointer">
                    <Clock className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" /> View Weekly Timetable
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {student.enrolledCourses.map((course, idx) => (
                  <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-[#fafafa] dark:bg-slate-800/60 space-y-2 hover:border-teal-400 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">{course}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">4 Hours / Week &bull; 1.0 Credit</p>
                    <Badge variant="outline" className="text-[10px] bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">
                      Enrolled &bull; In Progress
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Billing & Payment Ledger */}
          {activeTab === "billing" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Tuition & Ancillary Fees Ledger</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Financial invoices, split billing configuration, and instant payment checkout</p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setPayStatus("idle");
                    setIsPayModalOpen(true);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <CreditCard className="h-3.5 w-3.5" /> Pay Now via M-Pesa / Card
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Total Invoiced (Term 1)</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">$3,360.00</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Standard Tuition & Lab Fees</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800 rounded-xl p-4">
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold">Amount Paid</p>
                  <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">
                    ${(3360 - student.balanceDue).toLocaleString()}.00
                  </p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">Reconciled Payments</p>
                </div>
                <div
                  className={`rounded-xl p-4 border ${
                    student.balanceDue > 0
                      ? "bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300"
                      : "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
                  }`}
                >
                  <p className="text-xs font-semibold">Outstanding Balance</p>
                  <p className="text-2xl font-black mt-1">${student.balanceDue.toLocaleString()}.00</p>
                  <p className="text-[11px] mt-0.5">{student.balanceDue > 0 ? "Due: September 15, 2026" : "Account in Good Standing"}</p>
                </div>
              </div>

              {/* Invoice Table */}
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-xs text-start">
                  <thead className="bg-[#f8fafc] dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4 text-start">Invoice #</th>
                      <th className="py-3 px-4 text-start">Term / Period</th>
                      <th className="py-3 px-4 text-start">Due Date</th>
                      <th className="py-3 px-4 text-end">Amount</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/60">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">INV-2026-0891</td>
                      <td className="py-3 px-4">Term 1 2026/2027</td>
                      <td className="py-3 px-4 font-mono text-slate-500 dark:text-slate-400">2026-09-15</td>
                      <td className="py-3 px-4 text-end font-mono font-bold text-slate-900 dark:text-white">$3,360.00</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant={student.balanceDue > 0 ? "danger" : "success"}>
                          {student.balanceDue > 0 ? "Overdue" : "Paid"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setPayStatus("idle");
                            setIsPayModalOpen(true);
                          }}
                          className="text-xs text-emerald-700 dark:text-emerald-400 font-bold gap-1 cursor-pointer"
                        >
                          <Receipt className="h-3 w-3" /> Pay / Settle
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 5: Safeguarding & Medical */}
          {activeTab === "safeguarding" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Safeguarding, Health & Legal Registry</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Confidential medical, dietary, and custody records</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
                    <Heart className="h-4 w-4 text-rose-500" /> Medical Notes & Allergies
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {student.medicalNotes || "No special chronic medical condition or allergies recorded on file."}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide flex items-center gap-1.5">
                    <ShieldAlert className="h-4 w-4 text-amber-500" /> Legal Custody & Collection Guidelines
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {student.custodyAlert || "Standard parental joint custody. Both registered guardians are authorized for campus pickup."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Interactive Payment Modal for M-Pesa STK Push / Paystack */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200 text-slate-900 dark:text-slate-100">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <Badge variant="info" className="text-[10px] mb-1">
                  Tuition Gateway
                </Badge>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Collect Tuition: {student.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Outstanding: ${student.balanceDue.toLocaleString()}</p>
              </div>
              <button onClick={() => setIsPayModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                &times;
              </button>
            </div>

            {/* Gateway Selector */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setPayGateway("mpesa")}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  payGateway === "mpesa" ? "bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                <Smartphone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> M-Pesa STK Push
              </button>
              <button
                onClick={() => setPayGateway("paystack")}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  payGateway === "paystack" ? "bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-sm" : "text-slate-600 dark:text-slate-400"
                }`}
              >
                <CreditCard className="h-4 w-4 text-sky-600 dark:text-sky-400" /> Paystack Online
              </button>
            </div>

            {payStatus === "success" ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center space-y-2">
                <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">Payment Succeeded!</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 font-mono">Receipt: {receiptNumber}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Instant SMS confirmation sent to guardian.</p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsPayModalOpen(false)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-xs mt-2 cursor-pointer"
                >
                  Done
                </Button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                {payGateway === "mpesa" ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">M-Pesa Mobile Number</label>
                      <input
                        type="text"
                        value={payPhone}
                        onChange={(e) => setPayPhone(e.target.value)}
                        className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg font-mono focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Amount (USD equivalent)</label>
                      <input
                        type="number"
                        value={payAmount}
                        onChange={(e) => setPayAmount(Number(e.target.value))}
                        className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg font-bold focus:outline-none focus:border-teal-500"
                      />
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSimulatePayment}
                      disabled={payStatus === "sending"}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-9 cursor-pointer"
                    >
                      {payStatus === "sending" ? "Sending STK Push Prompt..." : "Send STK Push to Phone"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Guardian Billing Email</label>
                      <input
                        type="email"
                        value={student.guardians[0]?.email || "parent@example.com"}
                        readOnly
                        className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Amount (USD)</label>
                      <input
                        type="number"
                        value={payAmount}
                        onChange={(e) => setPayAmount(Number(e.target.value))}
                        className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg font-bold focus:outline-none"
                      />
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSimulatePayment}
                      disabled={payStatus === "sending"}
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold h-9 cursor-pointer"
                    >
                      {payStatus === "sending" ? "Connecting to Paystack..." : "Launch Paystack Checkout"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
