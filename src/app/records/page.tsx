"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  FileText,
  Search,
  Download,
  GraduationCap,
  Calendar,
  Lock,
  ChevronRight,
  ShieldCheck,
  Archive,
} from "lucide-react";

export default function RecordsPage() {
  const [search, setSearch] = useState("");

  const records = [
    {
      id: "rec-1",
      title: "Permanent Student Cumulative Record (Form 1 - Form 4)",
      student: "Tariq Mansoor",
      admissionNumber: "ADM-2024-001",
      type: "Cumulative Record",
      status: "Verified",
      archivedDate: "2026-09-30",
    },
    {
      id: "rec-2",
      title: "Statutory Health & Immunization Clearance Certificate",
      student: "Amina Al-Falasi",
      admissionNumber: "ADM-2024-002",
      type: "Health Record",
      status: "Verified",
      archivedDate: "2026-09-15",
    },
    {
      id: "rec-3",
      title: "Official High School Leaving Certificate & Transcript",
      student: "Omar Al-Khatib",
      admissionNumber: "ADM-2022-045",
      type: "Graduation Record",
      status: "Archived",
      archivedDate: "2026-06-30",
    },
    {
      id: "rec-4",
      title: "Family Legal Custody & Court Guardianship Order",
      student: "Fatima Zahra",
      admissionNumber: "ADM-2023-089",
      type: "Custody Order",
      status: "Confidential",
      archivedDate: "2026-08-20",
    },
  ];

  const filtered = records.filter(
    (r) =>
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.student.toLowerCase().includes(search.toLowerCase()) ||
      r.admissionNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-800 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#fafafa]">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-[#1e3a34]">Official Records Archive</h1>
            <p className="text-xs text-slate-500">
              Permanent student registries, legal custody files, and certified transcripts
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-slate-200 text-xs">
              <Archive className="h-4 w-4 mr-1 text-slate-500" /> Export Archive
            </Button>
          </div>
        </header>

        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search official student records or ID..."
                className="w-full h-9 ps-9 pe-4 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <span className="text-xs text-slate-500">
              Showing {filtered.length} permanent records
            </span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-start text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 text-start">Record Title</th>
                  <th className="py-3 px-4 text-start">Student & ID</th>
                  <th className="py-3 px-4 text-start">Record Type</th>
                  <th className="py-3 px-4 text-start">Status</th>
                  <th className="py-3 px-4 text-start">Archived Date</th>
                  <th className="py-3 px-4 text-end">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-2.5">
                      <FileText className="h-4 w-4 text-teal-600 shrink-0" />
                      <span>{r.title}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{r.student}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{r.admissionNumber}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                        {r.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          r.status === "Verified"
                            ? "success"
                            : r.status === "Confidential"
                            ? "danger"
                            : "default"
                        }
                      >
                        {r.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{r.archivedDate}</td>
                    <td className="py-3.5 px-4 text-end">
                      <Button variant="ghost" size="sm" className="h-8 text-teal-700 hover:text-teal-800 text-xs gap-1">
                        <Download className="h-3.5 w-3.5" /> Open
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
