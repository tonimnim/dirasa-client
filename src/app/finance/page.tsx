"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Smartphone,
  Building2,
  FileText,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Users,
  PieChart,
  ArrowUpRight,
  ArrowDownLeft,
  X,
  Receipt,
  Sparkles,
  ShieldCheck,
  Plus,
} from "lucide-react";

// --- Types ---
type InvoiceStatus = "Paid" | "Partial" | "Overdue" | "Draft";

interface SplitBillingConfig {
  payerName: string;
  relationship: string;
  percentage: number;
  amount: number;
}

interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  grade: string;
  term: string;
  totalAmount: number;
  paidAmount: number;
  currency: string;
  dueDate: string;
  status: InvoiceStatus;
  primaryPayer: string;
  splitBilling?: SplitBillingConfig[];
}

interface LedgerTransaction {
  id: string;
  date: string;
  reference: string;
  description: string;
  account: string;
  debit: number;
  credit: number;
  balance: number;
}

export default function FinancePage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRecord | null>(null);
  const [paymentDrawerOpen, setPaymentDrawerOpen] = useState(false);
  const [isLedgerModalOpen, setIsLedgerModalOpen] = useState(false);

  // Payment Drawer Modes: "mpesa" | "paystack" | "cash_bank"
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "paystack" | "cash_bank">("mpesa");

  // M-Pesa STK Push Form State
  const [mpesaPhone, setMpesaPhone] = useState("254712345678");
  const [mpesaAmount, setMpesaAmount] = useState<number>(500);
  const [mpesaStatus, setMpesaStatus] = useState<"idle" | "sending" | "waiting_pin" | "success" | "error">("idle");
  const [mpesaReceipt, setMpesaReceipt] = useState("");

  // Paystack Form State
  const [paystackEmail, setPaystackEmail] = useState("parent.finance@example.com");
  const [paystackCurrency, setPaystackCurrency] = useState("USD");
  const [paystackCardNumber, setPaystackCardNumber] = useState("4084 0000 0000 1284");
  const [paystackStatus, setPaystackStatus] = useState<"idle" | "processing" | "success">("idle");
  const [paystackRef, setPaystackRef] = useState("");

  // Cash / Bank Form State
  const [tellerRef, setTellerRef] = useState("BNK-TX-99214");
  const [cashAmount, setCashAmount] = useState<number>(500);
  const [cashNote, setCashNote] = useState("Direct wire transfer to School Operations Account");
  const [cashSuccess, setCashSuccess] = useState(false);

  // Invoices Dataset matching DreamClass exact figures ($33,600.00 overdue across 10 invoices, $0.00 collected)
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([
    {
      id: "inv-001",
      invoiceNumber: "INV-2026-0891",
      studentId: "std-001",
      studentName: "Mason Harrington",
      grade: "Grade 7 - Blue",
      term: "Term 1 2026/2027",
      totalAmount: 3360,
      paidAmount: 0,
      currency: "USD",
      dueDate: "2026-09-15",
      status: "Overdue",
      primaryPayer: "Robert Harrington (Father)",
    },
    {
      id: "inv-002",
      invoiceNumber: "INV-2026-0892",
      studentId: "std-002",
      studentName: "Caleb Bennett",
      grade: "Grade 7 - Blue",
      term: "Term 1 2026/2027",
      totalAmount: 3360,
      paidAmount: 0,
      currency: "USD",
      dueDate: "2026-09-15",
      status: "Overdue",
      primaryPayer: "Robert Bennett (Legal Guardian)",
    },
    {
      id: "inv-003",
      invoiceNumber: "INV-2026-0893",
      studentId: "std-003",
      studentName: "Adrian Orchard",
      grade: "Grade 8 - Alpha",
      term: "Term 1 2026/2027",
      totalAmount: 3360,
      paidAmount: 0,
      currency: "USD",
      dueDate: "2026-09-15",
      status: "Overdue",
      primaryPayer: "David Orchard (Father)",
    },
    {
      id: "inv-004",
      invoiceNumber: "INV-2026-0894",
      studentId: "std-006",
      studentName: "Zayn Mwangi",
      grade: "Grade 8 - Beta",
      term: "Term 1 2026/2027",
      totalAmount: 3360,
      paidAmount: 0,
      currency: "USD",
      dueDate: "2026-09-15",
      status: "Overdue",
      primaryPayer: "Eng. Joseph Mwangi (Father)",
    },
    {
      id: "inv-005",
      invoiceNumber: "INV-2026-0895",
      studentId: "std-007",
      studentName: "Fatima Zahra",
      grade: "Grade 9 - Science",
      term: "Term 1 2026/2027",
      totalAmount: 3360,
      paidAmount: 0,
      currency: "USD",
      dueDate: "2026-09-15",
      status: "Overdue",
      primaryPayer: "Mariam Zahra (Mother)",
    },
    {
      id: "inv-006",
      invoiceNumber: "INV-2026-0896",
      studentId: "std-008",
      studentName: "Chloe Dubois",
      grade: "Grade 7 - Gold",
      term: "Term 1 2026/2027",
      totalAmount: 3360,
      paidAmount: 0,
      currency: "USD",
      dueDate: "2026-09-15",
      status: "Overdue",
      primaryPayer: "Jean-Pierre Dubois (Father)",
    },
    {
      id: "inv-007",
      invoiceNumber: "INV-2026-0897",
      studentId: "std-009",
      studentName: "Lucas Silva",
      grade: "Grade 8 - Alpha",
      term: "Term 1 2026/2027",
      totalAmount: 3360,
      paidAmount: 0,
      currency: "USD",
      dueDate: "2026-09-15",
      status: "Overdue",
      primaryPayer: "Thiago Silva (Father)",
    },
    {
      id: "inv-008",
      invoiceNumber: "INV-2026-0898",
      studentId: "std-010",
      studentName: "Aisha Kamau",
      grade: "Grade 9 - Arts",
      term: "Term 1 2026/2027",
      totalAmount: 3360,
      paidAmount: 0,
      currency: "USD",
      dueDate: "2026-09-15",
      status: "Overdue",
      primaryPayer: "Samuel Kamau (Father)",
    },
    {
      id: "inv-009",
      invoiceNumber: "INV-2026-0899",
      studentId: "std-011",
      studentName: "Noah Kimani",
      grade: "Grade 8 - Beta",
      term: "Term 1 2026/2027",
      totalAmount: 3360,
      paidAmount: 0,
      currency: "USD",
      dueDate: "2026-09-15",
      status: "Overdue",
      primaryPayer: "Grace Kimani (Mother)",
    },
    {
      id: "inv-010",
      invoiceNumber: "INV-2026-0900",
      studentId: "std-014",
      studentName: "Sophia Chen",
      grade: "Grade 10 - Pre-Med",
      term: "Term 1 2026/2027",
      totalAmount: 3360,
      paidAmount: 0,
      currency: "USD",
      dueDate: "2026-09-15",
      status: "Overdue",
      primaryPayer: "Wei Chen (Father)",
    },
  ]);

  // Double-Entry Ledger Transactions
  const ledgerEntries: LedgerTransaction[] = [
    { id: "tx-101", date: "2026-09-01", reference: "SYS-BILL-T1", description: "Term 1 Tuition Billing Run - Grade 7-9", account: "Accounts Receivable (1100)", debit: 13450, credit: 0, balance: 13450 },
    { id: "tx-102", date: "2026-09-12", reference: "MPESA-QK89XYZ12", description: "M-Pesa Mobile Settlement - Tariq Mansoor", account: "Cash & Mobile Clearing (1010)", debit: 0, credit: 2400, balance: 11050 },
    { id: "tx-103", date: "2026-09-18", reference: "PSTK-TRX-4410", description: "Paystack Gateway Online Payment - Amina Al-Falasi", account: "Cash & Gateway Clearing (1010)", debit: 0, credit: 1200, balance: 9850 },
    { id: "tx-104", date: "2026-09-20", reference: "BNK-WIRE-0082", description: "Embassy Wire Transfer - Fatima Zahra Scholarship", account: "Operating Bank Account (1020)", debit: 0, credit: 2600, balance: 7250 },
    { id: "tx-105", date: "2026-09-25", reference: "CSH-RCP-0112", description: "Cash Desk Deposit - Bilal El-Sayed Partial", account: "Petty Cash & Till (1005)", debit: 0, credit: 700, balance: 6550 },
  ];

  // Financial Metrics Calculations
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  const collectedRevenue = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const outstandingArrears = totalInvoiced - collectedRevenue;
  const collectionRate = totalInvoiced > 0 ? ((collectedRevenue / totalInvoiced) * 100).toFixed(1) : "0";

  // Open Payment Drawer for Invoice
  const handleOpenPayment = (inv: InvoiceRecord) => {
    setSelectedInvoice(inv);
    const balanceRemaining = inv.totalAmount - inv.paidAmount;
    setMpesaAmount(balanceRemaining > 0 ? balanceRemaining : inv.totalAmount);
    setCashAmount(balanceRemaining > 0 ? balanceRemaining : inv.totalAmount);
    setMpesaStatus("idle");
    setPaystackStatus("idle");
    setCashSuccess(false);
    setPaymentDrawerOpen(true);
  };

  // M-Pesa STK Push Simulation
  const handleSendMpesaPush = () => {
    setMpesaStatus("sending");
    setTimeout(() => {
      setMpesaStatus("waiting_pin");
      setTimeout(() => {
        const ref = `QK${Math.floor(1000000 + Math.random() * 9000000)}`;
        setMpesaReceipt(ref);
        setMpesaStatus("success");
        // Update invoice balance
        if (selectedInvoice) {
          setInvoices((prev) =>
            prev.map((i) => {
              if (i.id !== selectedInvoice.id) return i;
              const newPaid = Math.min(i.totalAmount, i.paidAmount + mpesaAmount);
              return {
                ...i,
                paidAmount: newPaid,
                status: newPaid >= i.totalAmount ? "Paid" : "Partial",
              };
            })
          );
        }
      }, 2500);
    }, 1500);
  };

  // Paystack Simulation
  const handleProcessPaystack = () => {
    setPaystackStatus("processing");
    setTimeout(() => {
      const ref = `pstk_trx_${Math.floor(100000 + Math.random() * 900000)}`;
      setPaystackRef(ref);
      setPaystackStatus("success");
      if (selectedInvoice) {
        setInvoices((prev) =>
          prev.map((i) => {
            if (i.id !== selectedInvoice.id) return i;
            return {
              ...i,
              paidAmount: i.totalAmount,
              status: "Paid",
            };
          })
        );
      }
    }, 2000);
  };

  // Cash / Bank Transfer Receipt Issuance
  const handleIssueCashReceipt = () => {
    setCashSuccess(true);
    if (selectedInvoice) {
      setInvoices((prev) =>
        prev.map((i) => {
          if (i.id !== selectedInvoice.id) return i;
          const newPaid = Math.min(i.totalAmount, i.paidAmount + cashAmount);
          return {
            ...i,
            paidAmount: newPaid,
            status: newPaid >= i.totalAmount ? "Paid" : "Partial",
          };
        })
      );
    }
  };

  // Export Account Statement
  const handleExportStatement = () => {
    const csvContent =
      "Date,Reference,Description,Account,Debit,Credit,Balance\n" +
      ledgerEntries
        .map(
          (t) =>
            `"${t.date}","${t.reference}","${t.description}","${t.account}",${t.debit},${t.credit},${t.balance}`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Dirasa_Financial_Ledger_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Invoices
  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.studentName.toLowerCase().includes(search.toLowerCase()) ||
      inv.primaryPayer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || inv.status === statusFilter;
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
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400">
                  <DollarSign className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Finance & Tuition Billing
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Multi-Gateway Invoicing, M-Pesa STK Push, Paystack, Split Billing, and General Ledger
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsLedgerModalOpen(true)}
                className="gap-1.5 text-xs text-slate-700 dark:text-slate-300"
              >
                <FileText className="h-3.5 w-3.5" /> General Ledger
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={handleExportStatement}
                className="gap-1.5 text-xs text-slate-700 dark:text-slate-300"
              >
                <Download className="h-3.5 w-3.5" /> Export Statement
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => alert("Billing run initiated for 2026/2027 Term 1.")}
                className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700"
              >
                <Plus className="h-3.5 w-3.5" /> New Billing Run
              </Button>
            </div>
          </div>

          {/* 4 Financial KPI Cards matching DreamClass Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Payments Collected */}
            <div className="bg-[#def7ec] border border-[#bcf0da] rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between text-xs text-slate-700 font-semibold">
                <span>{invoices.filter((i) => i.status === "Paid").length} Payments</span>
                <span className="text-emerald-700 text-[10px] font-bold uppercase">Reconciled</span>
              </div>
              <div className="py-2">
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  ${collectedRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">Collected &middot; Last 30 days</div>
              </div>
            </div>

            {/* Card 2: Outstanding Invoices */}
            <div className="bg-[#fef9c3] border border-[#fef08a] rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <div className="text-xs text-slate-700 font-semibold">
                {invoices.filter((i) => i.status === "Overdue" || i.status === "Partial").length} Outstanding Invoices
              </div>
              <div className="py-2">
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  ${outstandingArrears.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">Issued until today</div>
              </div>
            </div>

            {/* Card 3: Overdue Invoices */}
            <div className="bg-[#ffe4e6] border border-[#fecdd3] rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <div className="text-xs text-slate-700 font-semibold">
                {invoices.filter((i) => i.status === "Overdue").length} Overdue Invoices
              </div>
              <div className="py-2">
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  ${outstandingArrears.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">Due until today</div>
              </div>
            </div>

            {/* Card 4: Uninvoiced Fees */}
            <div className="bg-[#e0f2fe] border border-[#bae6fd] rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <div className="text-xs text-slate-700 font-semibold">
                8 Uninvoiced Fees
              </div>
              <div className="py-2">
                <div className="text-2xl font-black text-slate-900 tracking-tight">$9,600.00</div>
                <div className="text-[11px] text-slate-600 mt-0.5">Due until end of month</div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <Card>
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search invoice #, student or payer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-9 ps-9 pe-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-500">Status:</span>
                {["All", "Paid", "Partial", "Overdue", "Draft"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      statusFilter === st
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Invoices Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4 text-start">Invoice #</th>
                    <th className="py-3 px-4 text-start">Student & Grade</th>
                    <th className="py-3 px-4 text-start">Payer & Split Scheme</th>
                    <th className="py-3 px-4 text-start">Due Date</th>
                    <th className="py-3 px-4 text-end">Total Amount</th>
                    <th className="py-3 px-4 text-end">Paid Amount</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-end">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {filteredInvoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {inv.invoiceNumber}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {inv.studentName}
                        </div>
                        <div className="text-[10px] text-slate-400">{inv.grade} &bull; {inv.term}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {inv.primaryPayer}
                        </div>
                        {inv.splitBilling ? (
                          <div className="mt-1 flex items-center gap-1.5">
                            <Badge variant="outline" className="text-[10px] border-indigo-300 text-indigo-700 dark:text-indigo-400 gap-1">
                              <PieChart className="h-3 w-3" /> Split:{" "}
                              {inv.splitBilling.map((s) => `${s.percentage}% ${s.relationship}`).join(" / ")}
                            </Badge>
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-400">100% Single Payer</div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                        {inv.dueDate}
                      </td>

                      <td className="py-3.5 px-4 text-end font-mono font-bold text-slate-900 dark:text-white">
                        ${inv.totalAmount.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-end font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        ${inv.paidAmount.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <Badge
                          variant={
                            inv.status === "Paid"
                              ? "success"
                              : inv.status === "Partial"
                              ? "info"
                              : inv.status === "Overdue"
                              ? "danger"
                              : "default"
                          }
                        >
                          {inv.status}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4 text-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenPayment(inv)}
                          className="text-xs text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 gap-1 font-semibold"
                        >
                          <Receipt className="h-3.5 w-3.5" /> Pay / Settle
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* INTERACTIVE PAYMENT DRAWER (SLIDE-OVER / MODAL) */}
          {paymentDrawerOpen && selectedInvoice && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                {/* Drawer Header */}
                <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <Badge variant="info" className="mb-1 text-[10px]">
                      Interactive Payment Gateway
                    </Badge>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Collect Fee: {selectedInvoice.invoiceNumber}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Student: <strong>{selectedInvoice.studentName}</strong> &bull; Total: ${selectedInvoice.totalAmount} (Paid: ${selectedInvoice.paidAmount})
                    </p>
                  </div>
                  <button
                    onClick={() => setPaymentDrawerOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Gateway Tabs */}
                <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setPaymentMethod("mpesa")}
                    className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === "mpesa"
                        ? "bg-white dark:bg-slate-900 text-emerald-600 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    <Smartphone className="h-4 w-4 text-emerald-500" /> M-Pesa STK Push
                  </button>
                  <button
                    onClick={() => setPaymentMethod("paystack")}
                    className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === "paystack"
                        ? "bg-white dark:bg-slate-900 text-sky-600 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    <CreditCard className="h-4 w-4 text-sky-500" /> Paystack
                  </button>
                  <button
                    onClick={() => setPaymentMethod("cash_bank")}
                    className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === "cash_bank"
                        ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                    }`}
                  >
                    <Building2 className="h-4 w-4 text-indigo-500" /> Cash / Bank
                  </button>
                </div>

                {/* TAB 1: M-PESA STK PUSH SIMULATION */}
                {paymentMethod === "mpesa" && (
                  <div className="space-y-4 text-xs">
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
                      <div className="font-bold text-emerald-900 dark:text-emerald-300">
                        M-Pesa Express (Daraja API STK Push)
                      </div>
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                        Prompts the guardian&apos;s mobile handset immediately with an official school Paybill PIN request.
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-slate-700 dark:text-slate-300 font-medium">
                        Kenyan Mobile Number (MSISDN):
                      </label>
                      <input
                        type="text"
                        placeholder="254712345678"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-slate-700 dark:text-slate-300 font-medium">
                        Amount to Collect (USD Equiv):
                      </label>
                      <input
                        type="number"
                        value={mpesaAmount}
                        onChange={(e) => setMpesaAmount(parseFloat(e.target.value) || 0)}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white"
                      />
                    </div>

                    {/* M-Pesa Interactive Status / Animation */}
                    {mpesaStatus === "sending" && (
                      <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-900 dark:text-amber-300 flex items-center gap-2">
                        <Clock className="h-4 w-4 animate-spin" />
                        <span>Sending STK Push to Safaricom Daraja Gateway...</span>
                      </div>
                    )}

                    {mpesaStatus === "waiting_pin" && (
                      <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 text-sky-900 dark:text-sky-300 flex items-center gap-2 animate-pulse">
                        <Smartphone className="h-4 w-4" />
                        <span>Push received on handset <strong>{mpesaPhone}</strong>! Simulating PIN entry...</span>
                      </div>
                    )}

                    {mpesaStatus === "success" && (
                      <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-900 dark:text-emerald-300 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          Payment Confirmed via M-Pesa!
                        </div>
                        <div className="text-[11px] font-mono">
                          Receipt: <strong>{mpesaReceipt}</strong> &bull; Amount: ${mpesaAmount} Credited.
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex justify-end gap-2">
                      <Button
                        variant="primary"
                        size="md"
                        disabled={mpesaStatus === "sending" || mpesaStatus === "waiting_pin"}
                        onClick={handleSendMpesaPush}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 font-semibold"
                      >
                        {mpesaStatus === "success" ? "Send Another Push" : "Simulate M-Pesa STK Push"}
                      </Button>
                    </div>
                  </div>
                )}

                {/* TAB 2: PAYSTACK GATEWAY SIMULATION */}
                {paymentMethod === "paystack" && (
                  <div className="space-y-4 text-xs">
                    <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900">
                      <div className="font-bold text-sky-900 dark:text-sky-300">
                        Paystack Pan-African Checkout
                      </div>
                      <div className="text-[11px] text-sky-700 dark:text-sky-400 mt-0.5">
                        Accepts Naira (NGN), Cedis (GHS), Rand (ZAR), Shillings (KES), and USD cards & EFT.
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                          Billing Currency:
                        </label>
                        <select
                          value={paystackCurrency}
                          onChange={(e) => setPaystackCurrency(e.target.value)}
                          className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="NGN">NGN (₦ - Nigeria)</option>
                          <option value="GHS">GHS (GH₵ - Ghana)</option>
                          <option value="ZAR">ZAR (R - South Africa)</option>
                          <option value="KES">KES (KSh - Kenya)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                          Guardian Email:
                        </label>
                        <input
                          type="email"
                          value={paystackEmail}
                          onChange={(e) => setPaystackEmail(e.target.value)}
                          className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                        Card Number:
                      </label>
                      <input
                        type="text"
                        value={paystackCardNumber}
                        onChange={(e) => setPaystackCardNumber(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white"
                      />
                    </div>

                    {paystackStatus === "processing" && (
                      <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 text-sky-900 dark:text-sky-300 flex items-center gap-2">
                        <Clock className="h-4 w-4 animate-spin text-sky-600" />
                        <span>Authorizing card via 3D Secure OTP...</span>
                      </div>
                    )}

                    {paystackStatus === "success" && (
                      <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-900 dark:text-emerald-300 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          Paystack Charge Approved!
                        </div>
                        <div className="text-[11px] font-mono">
                          Transaction Ref: <strong>{paystackRef}</strong> &bull; Settled in {paystackCurrency}.
                        </div>
                      </div>
                    )}

                    <Button
                      variant="primary"
                      size="md"
                      disabled={paystackStatus === "processing"}
                      onClick={handleProcessPaystack}
                      className="w-full bg-sky-600 hover:bg-sky-700 font-semibold"
                    >
                      {paystackStatus === "success" ? "Charge Another Card" : "Authorize Paystack Payment"}
                    </Button>
                  </div>
                )}

                {/* TAB 3: CASH / DIRECT BANK TRANSFER */}
                {paymentMethod === "cash_bank" && (
                  <div className="space-y-4 text-xs">
                    <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900">
                      <div className="font-bold text-indigo-900 dark:text-indigo-300">
                        Cashier Desk & Direct Wire Transfer
                      </div>
                      <div className="text-[11px] text-indigo-700 dark:text-indigo-400 mt-0.5">
                        Issue stamped physical receipts for cash paid at the bursar or matched bank wires.
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                          Bank Wire / Teller Ref:
                        </label>
                        <input
                          type="text"
                          value={tellerRef}
                          onChange={(e) => setTellerRef(e.target.value)}
                          className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-slate-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                          Cash Amount ($):
                        </label>
                        <input
                          type="number"
                          value={cashAmount}
                          onChange={(e) => setCashAmount(parseFloat(e.target.value) || 0)}
                          className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                        Bursar Notes / Memo:
                      </label>
                      <input
                        type="text"
                        value={cashNote}
                        onChange={(e) => setCashNote(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    {cashSuccess && (
                      <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>Official Receipt Issued! Ledger transaction posted to Petty Cash (1005).</span>
                      </div>
                    )}

                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleIssueCashReceipt}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 font-semibold"
                    >
                      Issue Official Cash/Bank Receipt
                    </Button>
                  </div>
                )}

                <div className="pt-2 flex justify-end border-t border-slate-100 dark:border-slate-800">
                  <Button variant="outline" size="sm" onClick={() => setPaymentDrawerOpen(false)}>
                    Close Drawer
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* GENERAL LEDGER MODAL (DOUBLE-ENTRY ACCOUNTING) */}
          {isLedgerModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 animate-in fade-in zoom-in-95">
                <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <Badge variant="info" className="mb-1 text-[10px]">
                      Double-Entry General Ledger
                    </Badge>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Institutional Financial Ledger
                    </h3>
                    <p className="text-xs text-slate-500">
                      Audit-ready journal records tracking Accounts Receivable, Clearing Accounts, and Tuition Revenues.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsLedgerModalOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                  <table className="w-full text-start text-xs border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                      <tr>
                        <th className="py-2.5 px-3 text-start">Date</th>
                        <th className="py-2.5 px-3 text-start">Ref #</th>
                        <th className="py-2.5 px-3 text-start">Description</th>
                        <th className="py-2.5 px-3 text-start">Account</th>
                        <th className="py-2.5 px-3 text-end">Debit ($)</th>
                        <th className="py-2.5 px-3 text-end">Credit ($)</th>
                        <th className="py-2.5 px-3 text-end">Balance ($)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                      {ledgerEntries.map((row) => (
                        <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                          <td className="py-2.5 px-3 text-slate-500 font-sans">{row.date}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{row.reference}</td>
                          <td className="py-2.5 px-3 font-sans max-w-[200px] truncate">{row.description}</td>
                          <td className="py-2.5 px-3 text-sky-700 dark:text-sky-300">{row.account}</td>
                          <td className="py-2.5 px-3 text-end text-rose-600">{row.debit > 0 ? `$${row.debit.toLocaleString()}` : "-"}</td>
                          <td className="py-2.5 px-3 text-end text-emerald-600">{row.credit > 0 ? `$${row.credit.toLocaleString()}` : "-"}</td>
                          <td className="py-2.5 px-3 text-end font-bold text-slate-900 dark:text-white">${row.balance.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportStatement}
                    className="gap-1.5 text-xs"
                  >
                    <Download className="h-3.5 w-3.5" /> Export Ledger CSV
                  </Button>
                  <Button variant="primary" size="sm" onClick={() => setIsLedgerModalOpen(false)} className="bg-slate-800 hover:bg-slate-900 text-xs">
                    Close Ledger
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
