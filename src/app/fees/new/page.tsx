"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { INITIAL_STUDENTS } from "../../students/page";
import {
  ChevronLeft,
  Receipt,
  User,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  PieChart,
} from "lucide-react";

interface FeeItem {
  id: string;
  description: string;
  category: "Tuition" | "Lab" | "Activity" | "Materials" | "Transport" | "Meals";
  amount: number;
}

export default function NewFeeInvoicePage() {
  const router = useRouter();

  const [selectedStudentId, setSelectedStudentId] = useState(INITIAL_STUDENTS[0]?.id || "std-001");
  const student = INITIAL_STUDENTS.find((s) => s.id === selectedStudentId) || INITIAL_STUDENTS[0];

  const [invoiceNumber] = useState("INV-2026-0901");
  const [term, setTerm] = useState("Term 1 2026/2027");
  const [dueDate, setDueDate] = useState("2026-10-15");
  const [currency, setCurrency] = useState("USD");
  const [isSplitBilling, setIsSplitBilling] = useState(false);
  const [splitPayer1Ratio, setSplitPayer1Ratio] = useState(60);

  const [lineItems, setLineItems] = useState<FeeItem[]>([
    { id: "1", description: "Term 1 Tuition Core Curriculum", category: "Tuition", amount: 2800 },
    { id: "2", description: "STEM Science & Computer Lab Fee", category: "Lab", amount: 300 },
    { id: "3", description: "Sports Pavilion & Co-Curricular Fee", category: "Activity", amount: 160 },
    { id: "4", description: "Digital Learning & Library Materials", category: "Materials", amount: 100 },
  ]);

  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemAmount, setNewItemAmount] = useState<number>(100);
  const [newItemCategory, setNewItemCategory] = useState<FeeItem["category"]>("Activity");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalAmount = lineItems.reduce((acc, item) => acc + Number(item.amount || 0), 0);

  const handleAddLineItem = () => {
    if (!newItemDesc.trim() || newItemAmount <= 0) return;
    setLineItems([
      ...lineItems,
      {
        id: `item-${Date.now()}`,
        description: newItemDesc,
        category: newItemCategory,
        amount: Number(newItemAmount),
      },
    ]);
    setNewItemDesc("");
    setNewItemAmount(100);
  };

  const handleRemoveLineItem = (id: string) => {
    setLineItems(lineItems.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lineItems.length === 0) {
      alert("Please add at least one fee line item.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/fees");
      }, 1200);
    }, 600);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-800 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#fafafa]">
        {/* Breadcrumb Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-3">
            <Link
              href="/fees"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/" className="hover:text-slate-700">Home</Link>
              <span>/</span>
              <Link href="/fees" className="hover:text-slate-700">Fees & Invoicing</Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">Create Invoice</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/fees">
              <Button variant="outline" size="sm" className="text-xs">
                Cancel
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 text-xs"
            >
              <Save className="h-3.5 w-3.5" />
              {isSubmitting ? "Generating..." : "Generate Invoice"}
            </Button>
          </div>
        </header>

        <main className="p-6 max-w-5xl w-full mx-auto space-y-6">
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 animate-in fade-in duration-200">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-xs">Invoice {invoiceNumber} Successfully Created!</p>
                <p className="text-[11px] text-emerald-600">Issued to {student.name} and redirecting to finance hub...</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
            <div>
              <h1 className="text-lg font-bold text-slate-900">Create Tuition Fee Invoice</h1>
              <p className="text-xs text-slate-500">
                Generate an official fee assessment with multi-gateway M-Pesa STK push and Paystack enablement.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Scholar Selection & Terms */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <User className="h-4 w-4" /> 1. Student Selection & Billing Period
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Select Student</label>
                    <select
                      value={selectedStudentId}
                      onChange={(e) => setSelectedStudentId(e.target.value)}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg font-semibold focus:outline-none focus:border-teal-500"
                    >
                      {INITIAL_STUDENTS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.classSection})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Invoice Number</label>
                    <input
                      type="text"
                      value={invoiceNumber}
                      readOnly
                      className="w-full h-9 px-3 bg-slate-100 border border-slate-200 rounded-lg font-mono font-bold text-slate-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Billing Period / Term</label>
                    <select
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    >
                      <option>Term 1 2026/2027</option>
                      <option>Term 2 2026/2027</option>
                      <option>Term 3 2026/2027</option>
                      <option>Annual Full Session 2026/2027</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Invoice Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Billing Currency</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg font-bold focus:outline-none focus:border-teal-500"
                    >
                      <option value="USD">USD ($) - US Dollar</option>
                      <option value="KES">KES (KSh) - Kenya Shilling</option>
                      <option value="AED">AED (د.إ) - UAE Dirham</option>
                      <option value="NGN">NGN (₦) - Nigerian Naira</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Primary Registered Payer</label>
                    <input
                      type="text"
                      value={student.guardians[0]?.name || "Parent/Guardian"}
                      readOnly
                      className="w-full h-9 px-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Fee Line Items */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5">
                    <Receipt className="h-4 w-4" /> 2. Assessment Line Items
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    Subtotal: ${totalAmount.toLocaleString()}.00
                  </span>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-xs text-start">
                    <thead className="bg-[#f8fafc] border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-2.5 px-4 text-start">Fee Description</th>
                        <th className="py-2.5 px-4 text-start">Category</th>
                        <th className="py-2.5 px-4 text-end">Amount ({currency})</th>
                        <th className="py-2.5 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {lineItems.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-4 font-medium text-slate-900">{item.description}</td>
                          <td className="py-2.5 px-4">
                            <Badge variant="outline" className="text-[10px]">
                              {item.category}
                            </Badge>
                          </td>
                          <td className="py-2.5 px-4 text-end font-mono font-bold text-slate-900">
                            ${item.amount.toLocaleString()}.00
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => handleRemoveLineItem(item.id)}
                              className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50/80 border-t border-slate-200 font-bold text-xs text-slate-900">
                      <tr>
                        <td colSpan={2} className="py-3 px-4 text-end">
                          Total Assessment Amount:
                        </td>
                        <td className="py-3 px-4 text-end font-mono text-sm text-emerald-700">
                          ${totalAmount.toLocaleString()}.00
                        </td>
                        <td />
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Add Line Item Bar */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-3 text-xs">
                  <input
                    type="text"
                    placeholder="Custom fee item (e.g. Bus Route A, Uniform Kit)"
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    className="flex-1 h-9 px-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  />
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as FeeItem["category"])}
                    className="h-9 px-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                  >
                    <option value="Tuition">Tuition</option>
                    <option value="Lab">Lab</option>
                    <option value="Activity">Activity</option>
                    <option value="Materials">Materials</option>
                    <option value="Transport">Transport</option>
                    <option value="Meals">Meals</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={newItemAmount}
                    onChange={(e) => setNewItemAmount(Number(e.target.value))}
                    className="w-28 h-9 px-3 bg-white border border-slate-200 rounded-lg font-bold text-end focus:outline-none focus:border-teal-500"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddLineItem}
                    className="h-9 bg-white text-xs font-semibold gap-1 shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5 text-teal-600" /> Add Line
                  </Button>
                </div>
              </div>

              {/* Section 3: Split Billing Scheme */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <PieChart className="h-4 w-4" /> 3. Split Billing Configuration
                </h3>

                <div className="text-xs space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={isSplitBilling}
                      onChange={(e) => setIsSplitBilling(e.target.checked)}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span>Enable Dual Payer / Split Billing Scheme (e.g. Co-Parenting / Corporate Sponsor)</span>
                  </label>

                  {isSplitBilling && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in">
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">
                          Primary Payer ({student.guardians[0]?.name || "Father"}): {splitPayer1Ratio}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="90"
                          step="5"
                          value={splitPayer1Ratio}
                          onChange={(e) => setSplitPayer1Ratio(Number(e.target.value))}
                          className="w-full accent-teal-600"
                        />
                        <p className="text-slate-500 font-mono mt-1">
                          Amount: ${(totalAmount * (splitPayer1Ratio / 100)).toFixed(2)}
                        </p>
                      </div>

                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">
                          Secondary Payer (Mother / Sponsor): {100 - splitPayer1Ratio}%
                        </label>
                        <p className="text-slate-500 font-mono mt-4">
                          Amount: ${(totalAmount * ((100 - splitPayer1Ratio) / 100)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <Link href="/fees">
                  <Button variant="outline" size="sm" type="button" className="text-xs">
                    Cancel
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 text-xs"
                >
                  <Save className="h-3.5 w-3.5" />
                  {isSubmitting ? "Generating Assessment..." : "Generate & Post Invoice"}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
