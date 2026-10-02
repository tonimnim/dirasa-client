"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/legacy-ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/legacy-ui/Card";
import { Badge } from "@/components/legacy-ui/Badge";
import {
  BarChart3,
  Download,
  Calendar,
  FileSpreadsheet,
  TrendingUp,
  Users,
  CreditCard,
  Printer,
  ChevronRight,
} from "lucide-react";

export default function ReportsCenterPage() {
  const [reportType, setReportType] = useState<"attendance" | "academic" | "financial" | "statutory">("attendance");

  const reports = [
    {
      category: "attendance",
      title: "Statutory Daily Attendance Summary",
      desc: "AM/PM attendance rates, persistent absence (<90%), and unexplained absences by grade level.",
      format: "PDF / Excel",
      updated: "Today, 01:00 AM",
    },
    {
      category: "attendance",
      title: "Class-by-Class Attendance Broadsheet",
      desc: "Complete period-by-period attendance log across all 11 classes for the selected month.",
      format: "CSV / Excel",
      updated: "Yesterday",
    },
    {
      category: "academic",
      title: "Term 1 Grade Distribution & Broadsheet",
      desc: "Aggregated marks across 44 courses with 13-country grading scales conversion.",
      format: "PDF / Excel",
      updated: "Sep 28, 2026",
    },
    {
      category: "academic",
      title: "Student Transcript & Permanent Record",
      desc: "Official certified academic transcripts with stamp verification for student alumni.",
      format: "Printable PDF",
      updated: "Sep 25, 2026",
    },
    {
      category: "financial",
      title: "Accounts Receivable & Fee Aging Analysis",
      desc: "Overdue fee invoices broken down by 30, 60, and 90+ days aging intervals.",
      format: "PDF / CSV",
      updated: "Today, 12:00 AM",
    },
    {
      category: "financial",
      title: "Collections & Payment Reconciliation",
      desc: "Ledger report of settled M-Pesa STK, Paystack, and direct bank transfer payments.",
      format: "Excel",
      updated: "Sep 30, 2026",
    },
    {
      category: "statutory",
      title: "Ministry of Education (KHDA / ADEK / DfE) Census",
      desc: "Government-compliant school enrollment, staff qualifications, and student demographics.",
      format: "Government XML / CSV",
      updated: "Sep 20, 2026",
    },
  ];

  const filtered = reports.filter((r) => r.category === reportType);

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-800 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#fafafa]">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-[#1e3a34]">Reports & Analytics</h1>
            <p className="text-xs text-slate-500">
              Statutory attendance records, academic broadsheets, and financial statements
            </p>
          </div>

          <Button variant="primary" size="sm" className="bg-[#10b981] hover:bg-[#059669] text-white font-bold gap-1.5">
            <Download className="h-4 w-4" /> Export All (ZIP)
          </Button>
        </header>

        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Overall Attendance</span>
                <div className="text-2xl font-black text-emerald-600 mt-0.5">96.4%</div>
                <span className="text-[10px] text-slate-400">Statutory compliant</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Tuition Collected</span>
                <div className="text-2xl font-black text-slate-900 mt-0.5">$33,600.00</div>
                <span className="text-[10px] text-slate-400">Term 1 billing cycle</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Total Courses</span>
                <div className="text-2xl font-black text-slate-900 mt-0.5">44 Courses</div>
                <span className="text-[10px] text-slate-400">Across 11 class sections</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Report Category Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            {[
              { id: "attendance", label: "Attendance Reports" },
              { id: "academic", label: "Academic Broadsheets" },
              { id: "financial", label: "Financial & Invoicing" },
              { id: "statutory", label: "Statutory / Government Census" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setReportType(tab.id as typeof reportType)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  reportType === tab.id
                    ? "bg-[#065f46] text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Reports List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((r, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:border-teal-400 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full uppercase">
                      {r.format}
                    </span>
                    <span className="text-[11px] text-slate-400">{r.updated}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{r.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{r.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">Ready to download</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs gap-1 border-slate-200">
                      <Printer className="h-3.5 w-3.5" /> Print
                    </Button>
                    <Button variant="primary" size="sm" className="h-8 text-xs gap-1 bg-teal-600 hover:bg-teal-700 text-white">
                      <Download className="h-3.5 w-3.5" /> Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
