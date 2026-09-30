"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  GraduationCap,
  Search,
  Plus,
  Filter,
  ShieldCheck,
  ChevronRight,
  UserCheck,
} from "lucide-react";

interface MockStudent {
  id: string;
  admissionNumber: string;
  name: string;
  gender: "Male" | "Female";
  grade: string;
  status: "Enrolled" | "Withdrawn" | "Graduated";
  admissionDate: string;
  guardiansCount: number;
}

export default function StudentsDirectoryPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const students: MockStudent[] = [
    {
      id: "std-001",
      admissionNumber: "ADM-2024-001",
      name: "Tariq Mansoor",
      gender: "Male",
      grade: "Grade 7-A",
      status: "Enrolled",
      admissionDate: "2024-09-01",
      guardiansCount: 2,
    },
    {
      id: "std-002",
      admissionNumber: "ADM-2024-002",
      name: "Amina Al-Falasi",
      gender: "Female",
      grade: "Grade 7-A",
      status: "Enrolled",
      admissionDate: "2024-09-01",
      guardiansCount: 1,
    },
    {
      id: "std-003",
      admissionNumber: "ADM-2024-003",
      name: "Zayn Mwangi",
      gender: "Male",
      grade: "Grade 8-B",
      status: "Enrolled",
      admissionDate: "2024-09-02",
      guardiansCount: 2,
    },
    {
      id: "std-004",
      admissionNumber: "ADM-2023-089",
      name: "Fatima Zahra",
      gender: "Female",
      grade: "Grade 9-A",
      status: "Enrolled",
      admissionDate: "2023-09-01",
      guardiansCount: 2,
    },
    {
      id: "std-005",
      admissionNumber: "ADM-2022-045",
      name: "Omar Al-Khatib",
      gender: "Male",
      grade: "Alumni",
      status: "Graduated",
      admissionDate: "2022-09-01",
      guardiansCount: 1,
    },
  ];

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                  Students Directory
                </h1>
                <Badge variant="info">1,240 Enrolled</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Official student registry, academic status, and safeguarding links
              </p>
            </div>

            <Button variant="primary" size="md" className="gap-2 bg-sky-600 hover:bg-sky-700">
              <Plus className="h-4 w-4" /> Enroll New Student
            </Button>
          </div>

          {/* Filters Bar */}
          <Card>
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by student name or admission #..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-9 ps-9 pe-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-500">Status:</span>
                {["All", "Enrolled", "Graduated", "Withdrawn"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      statusFilter === st
                        ? "bg-sky-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 text-start">Student</th>
                    <th className="py-3 px-4 text-start">Admission #</th>
                    <th className="py-3 px-4 text-start">Current Grade</th>
                    <th className="py-3 px-4 text-start">Status</th>
                    <th className="py-3 px-4 text-start">Guardians</th>
                    <th className="py-3 px-4 text-start">Admitted</th>
                    <th className="py-3 px-4 text-end">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                  {filtered.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-xs">
                          {student.name.slice(0, 1)}
                        </div>
                        <div>
                          <div>{student.name}</div>
                          <div className="text-[10px] text-slate-400 font-normal">
                            {student.gender}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                        {student.admissionNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-900 dark:text-slate-200">
                          {student.grade}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            student.status === "Enrolled"
                              ? "success"
                              : student.status === "Graduated"
                              ? "info"
                              : "warning"
                          }
                        >
                          {student.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          {student.guardiansCount} Verified
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {student.admissionDate}
                      </td>
                      <td className="py-3.5 px-4 text-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-sky-600 hover:text-sky-700 gap-1 text-xs"
                        >
                          View 360 <ChevronRight className="h-3.5 w-3.5" />
                        </Button>
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
