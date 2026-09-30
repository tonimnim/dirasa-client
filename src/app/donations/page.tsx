"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import {
  HeartHandshake,
  Search,
  Plus,
  DollarSign,
  TrendingUp,
  Award,
  Download,
  Calendar,
  ChevronRight,
} from "lucide-react";

interface DonationRecord {
  id: string;
  donorName: string;
  fund: string;
  amount: string;
  date: string;
  paymentMethod: string;
  receiptNumber: string;
  isAnonymous: boolean;
}

export default function DonationsPage() {
  const [search, setSearch] = useState("");

  const donations: DonationRecord[] = [
    {
      id: "don-1",
      donorName: "H.E. Sultan Al-Falasi",
      fund: "STEM & Robotics Innovation Lab",
      amount: "$15,000.00",
      date: "2026-09-20",
      paymentMethod: "Bank Wire",
      receiptNumber: "DON-2026-0042",
      isAnonymous: false,
    },
    {
      id: "don-2",
      donorName: "Alumni Class of 2020",
      fund: "Annual Merit Scholarship Fund",
      amount: "$5,500.00",
      date: "2026-09-18",
      paymentMethod: "Paystack Online",
      receiptNumber: "DON-2026-0041",
      isAnonymous: false,
    },
    {
      id: "don-3",
      donorName: "Anonymous Philanthropist",
      fund: "Student Sports & Gymnasium Pavilion",
      amount: "$10,000.00",
      date: "2026-08-30",
      paymentMethod: "M-Pesa STK Business",
      receiptNumber: "DON-2026-0040",
      isAnonymous: true,
    },
  ];

  const filtered = donations.filter(
    (d) =>
      d.donorName.toLowerCase().includes(search.toLowerCase()) ||
      d.fund.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-800 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#fafafa]">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-[#1e3a34]">Donations & Endowments</h1>
            <p className="text-xs text-slate-500">
              Alumni giving, capital campaign funds, and scholarship contributions
            </p>
          </div>

          <Button variant="primary" size="sm" className="bg-[#10b981] hover:bg-[#059669] text-white font-bold gap-1.5">
            <Plus className="h-4 w-4" /> Record Donation
          </Button>
        </header>

        <main className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* KPI strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Total Funds Raised</span>
                <div className="text-2xl font-black text-emerald-600 mt-0.5">$30,500.00</div>
                <span className="text-[10px] text-slate-400">Current academic year</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <HeartHandshake className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Active Campaigns</span>
                <div className="text-2xl font-black text-slate-900 mt-0.5">3 Initiatives</div>
                <span className="text-[10px] text-slate-400">STEM, Sports, Scholarships</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Registered Donors</span>
                <div className="text-2xl font-black text-slate-900 mt-0.5">14 Supporters</div>
                <span className="text-[10px] text-slate-400">Families and Alumni</span>
              </div>
              <div className="h-10 w-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                <Award className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search donor or campaign fund..."
                className="w-full h-9 ps-9 pe-4 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
            <span className="text-xs text-slate-500">
              Showing {filtered.length} contributions
            </span>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-start text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 text-start">Donor</th>
                  <th className="py-3 px-4 text-start">Allocated Fund</th>
                  <th className="py-3 px-4 text-start">Amount</th>
                  <th className="py-3 px-4 text-start">Date</th>
                  <th className="py-3 px-4 text-start">Payment Channel</th>
                  <th className="py-3 px-4 text-end">Tax Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {d.donorName}
                    </td>
                    <td className="py-3.5 px-4 text-teal-800 font-medium">
                      {d.fund}
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                      {d.amount}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{d.date}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{d.paymentMethod}</td>
                    <td className="py-3.5 px-4 text-end">
                      <Button variant="ghost" size="sm" className="h-8 text-teal-700 hover:text-teal-800 text-xs gap-1">
                        <Download className="h-3.5 w-3.5" /> {d.receiptNumber}
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
