"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Users,
  Search,
  Plus,
  Mail,
  Phone,
  ShieldCheck,
  ShieldAlert,
  GraduationCap,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  X,
  CreditCard,
  Send,
} from "lucide-react";

export interface FamilyUnit {
  id: string;
  familyTitle: string;
  primaryGuardian: string;
  secondaryGuardian?: string;
  relationship: string;
  email: string;
  phone: string;
  students: { name: string; grade: string }[];
  isVerified: boolean;
  portalStatus: "Active" | "Invited" | "Pending";
  hasCustodyRestriction: boolean;
  restrictionNotes?: string;
  billingBalance: number;
}

export const INITIAL_FAMILIES: FamilyUnit[] = [
  {
    id: "fam-1",
    familyTitle: "The Harrington Family",
    primaryGuardian: "Robert Harrington",
    secondaryGuardian: "Sarah Harrington",
    relationship: "Parents",
    email: "r.harrington@tech.ae",
    phone: "+971 50 112 3344",
    students: [{ name: "Mason Harrington", grade: "Grade 7 - Blue" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: false,
    billingBalance: 3360,
  },
  {
    id: "fam-2",
    familyTitle: "The Bennett Family",
    primaryGuardian: "Robert Bennett",
    relationship: "Legal Guardian",
    email: "r.bennett@consulting.co.uk",
    phone: "+44 7700 900123",
    students: [{ name: "Caleb Bennett", grade: "Grade 7 - Blue" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: false,
    billingBalance: 3360,
  },
  {
    id: "fam-3",
    familyTitle: "The Orchard Family",
    primaryGuardian: "David Orchard",
    relationship: "Father",
    email: "d.orchard@globaltech.com",
    phone: "+971 50 666 7788",
    students: [{ name: "Adrian Orchard", grade: "Grade 8 - Alpha" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: false,
    billingBalance: 3360,
  },
  {
    id: "fam-4",
    familyTitle: "The Mansoor Family",
    primaryGuardian: "Mansoor Tariq",
    secondaryGuardian: "Zubaida Mansoor",
    relationship: "Parents",
    email: "mansoor.t@emirates.net",
    phone: "+971 50 111 2233",
    students: [{ name: "Tariq Mansoor", grade: "Grade 7 - Blue" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: false,
    billingBalance: 0,
  },
  {
    id: "fam-5",
    familyTitle: "The Al-Falasi Family",
    primaryGuardian: "H.E. Sultan Al-Falasi",
    relationship: "Father",
    email: "sultan.falasi@dubai.ae",
    phone: "+971 50 222 3344",
    students: [{ name: "Amina Al-Falasi", grade: "Grade 7 - Blue" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: false,
    billingBalance: 1200,
  },
  {
    id: "fam-6",
    familyTitle: "The Mwangi Family",
    primaryGuardian: "Eng. Joseph Mwangi",
    secondaryGuardian: "Dr. Faith Mwangi",
    relationship: "Parents",
    email: "j.mwangi@kenya.org",
    phone: "+254 712 345678",
    students: [{ name: "Zayn Mwangi", grade: "Grade 8 - Beta" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: false,
    billingBalance: 3360,
  },
  {
    id: "fam-7",
    familyTitle: "The Zahra Family",
    primaryGuardian: "Mariam Zahra",
    relationship: "Mother (Sole Custody)",
    email: "mariam.zahra@outlook.com",
    phone: "+971 50 444 5566",
    students: [{ name: "Fatima Zahra", grade: "Grade 9 - Science" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: true,
    restrictionNotes: "Court order on file: Sole maternal custody. Absolutely no contact or school collection by non-registered parties.",
    billingBalance: 3360,
  },
  {
    id: "fam-8",
    familyTitle: "The Dubois Family",
    primaryGuardian: "Jean-Pierre Dubois",
    relationship: "Father",
    email: "jp.dubois@paris.fr",
    phone: "+33 6 12 34 56 78",
    students: [{ name: "Chloe Dubois", grade: "Grade 7 - Gold" }],
    isVerified: true,
    portalStatus: "Invited",
    hasCustodyRestriction: false,
    billingBalance: 3360,
  },
  {
    id: "fam-9",
    familyTitle: "The Silva Family",
    primaryGuardian: "Thiago Silva",
    relationship: "Father",
    email: "thiago.silva@brasil.br",
    phone: "+55 11 98765 4321",
    students: [{ name: "Lucas Silva", grade: "Grade 8 - Alpha" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: false,
    billingBalance: 3360,
  },
  {
    id: "fam-10",
    familyTitle: "The Kamau Family",
    primaryGuardian: "Samuel Kamau",
    relationship: "Father",
    email: "s.kamau@nairobi.org",
    phone: "+254 722 001122",
    students: [{ name: "Aisha Kamau", grade: "Grade 9 - Arts" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: false,
    billingBalance: 3360,
  },
  {
    id: "fam-11",
    familyTitle: "The Kimani Family",
    primaryGuardian: "Grace Kimani",
    relationship: "Mother",
    email: "grace.kimani@law.co.ke",
    phone: "+254 733 445566",
    students: [{ name: "Noah Kimani", grade: "Grade 8 - Beta" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: false,
    billingBalance: 3360,
  },
  {
    id: "fam-12",
    familyTitle: "The Hassan Family",
    primaryGuardian: "Dr. Tariq Hassan",
    relationship: "Father",
    email: "dr.hassan@hospital.ae",
    phone: "+971 50 888 9900",
    students: [{ name: "Leila Hassan", grade: "Grade 7 - Gold" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: false,
    billingBalance: 3360,
  },
  {
    id: "fam-13",
    familyTitle: "The Adeyemi Family",
    primaryGuardian: "Oluwaseun Adeyemi",
    relationship: "Father",
    email: "o.adeyemi@lagos.ng",
    phone: "+234 803 112 2334",
    students: [{ name: "David Adeyemi", grade: "Grade 10 - Tech & Coding" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: false,
    billingBalance: 0,
  },
  {
    id: "fam-14",
    familyTitle: "The Chen Family",
    primaryGuardian: "Wei Chen",
    relationship: "Father",
    email: "wei.chen@trade.com",
    phone: "+971 50 555 4433",
    students: [{ name: "Sophia Chen", grade: "Grade 10 - Pre-Med" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: false,
    billingBalance: 3360,
  },
  {
    id: "fam-15",
    familyTitle: "The Osei Family",
    primaryGuardian: "Kwame Osei",
    relationship: "Father",
    email: "k.osei@accra.gov.gh",
    phone: "+233 24 555 6677",
    students: [{ name: "Marcus Osei", grade: "Grade 11 - STEM & Robotics" }],
    isVerified: true,
    portalStatus: "Active",
    hasCustodyRestriction: false,
    billingBalance: 0,
  },
];

export default function FamiliesPage() {
  const [families, setFamilies] = useState<FamilyUnit[]>(INITIAL_FAMILIES);
  const [search, setSearch] = useState("");
  const [selectedFamily, setSelectedFamily] = useState<FamilyUnit | null>(null);
  const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);

  // New Family Form State
  const [newTitle, setNewTitle] = useState("");
  const [newPrimaryGuardian, setNewPrimaryGuardian] = useState("");
  const [newRelationship, setNewRelationship] = useState("Parents");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleAddFamily = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newFam: FamilyUnit = {
      id: `fam-${families.length + 1}`,
      familyTitle: newTitle,
      primaryGuardian: newPrimaryGuardian,
      relationship: newRelationship,
      email: newEmail,
      phone: newPhone,
      students: [],
      isVerified: true,
      portalStatus: "Invited",
      hasCustodyRestriction: false,
      billingBalance: 0,
    };

    setFamilies([...families, newFam]);
    setIsAddFamilyModalOpen(false);
    setNewTitle("");
    setNewPrimaryGuardian("");
    setNewEmail("");
    setNewPhone("");
  };

  const handleSendInvite = (familyId: string, email: string) => {
    setFamilies(
      families.map((f) => (f.id === familyId ? { ...f, portalStatus: "Active" } : f))
    );
    setInviteSuccess(`Parent portal activation email sent to ${email}`);
    setTimeout(() => setInviteSuccess(null), 4000);
  };

  const filtered = families.filter(
    (f) =>
      f.familyTitle.toLowerCase().includes(search.toLowerCase()) ||
      f.primaryGuardian.toLowerCase().includes(search.toLowerCase()) ||
      f.students.some((s) => s.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-800 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#fafafa]">
        <AppHeader
          title="Families & Guardians"
          subtitle="15 Registered Family Accounts • Parent portal access & safeguarding custody"
          badge={`${families.length} Families`}
          actionButton={
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddFamilyModalOpen(true)}
              className="bg-[#10b981] hover:bg-[#059669] text-white font-bold gap-1.5 text-xs shadow-xs"
            >
              <Plus className="h-4 w-4" /> Add Family
            </Button>
          }
        />

        <main className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
          {inviteSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>{inviteSuccess}</span>
              </div>
              <button onClick={() => setInviteSuccess(null)}>
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Registered Families</span>
                <div className="text-2xl font-black text-slate-900 mt-0.5">{families.length}</div>
                <span className="text-[11px] text-teal-600 font-medium">15 Verified Households</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                <Users className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Parent Portal Adoption</span>
                <div className="text-2xl font-black text-emerald-600 mt-0.5">93.3%</div>
                <span className="text-[11px] text-slate-400">14 Active Accounts</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 font-medium">Safeguarding & Custody</span>
                <div className="text-2xl font-black text-rose-600 mt-0.5">1 Court Order</div>
                <span className="text-[11px] text-rose-600 font-medium">Strict pickup restrictions</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <ShieldAlert className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search families, parents, or student names..."
                className="w-full h-9 ps-9 pe-4 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 shadow-xs"
              />
            </div>
            <div className="text-xs text-slate-500 font-medium">
              Showing {filtered.length} of {families.length} families
            </div>
          </div>

          {/* Grid of families */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((fam) => (
              <div
                key={fam.id}
                onClick={() => setSelectedFamily(fam)}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:border-teal-400 transition-all space-y-4 cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {fam.familyTitle}
                    </h3>
                    <p className="text-[11px] text-slate-500">{fam.relationship}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {fam.hasCustodyRestriction && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                        <ShieldAlert className="h-3 w-3" /> Restricted
                      </span>
                    )}
                    <Badge variant={fam.portalStatus === "Active" ? "success" : "info"}>
                      {fam.portalStatus === "Active" ? "Portal Active" : "Invited"}
                    </Badge>
                  </div>
                </div>

                {fam.restrictionNotes && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px] leading-tight flex items-start gap-1.5">
                    <ShieldAlert className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>{fam.restrictionNotes}</span>
                  </div>
                )}

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="font-semibold text-slate-900">{fam.primaryGuardian}</div>
                  {fam.secondaryGuardian && (
                    <div className="text-slate-500">{fam.secondaryGuardian}</div>
                  )}
                  <div className="flex items-center gap-2 pt-1 text-slate-500">
                    <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{fam.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{fam.phone}</span>
                  </div>
                </div>

                {/* Linked Children */}
                <div className="bg-slate-50 rounded-lg p-2.5 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Linked Children ({fam.students.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {fam.students.length > 0 ? (
                      fam.students.map((st) => (
                        <span
                          key={st.name}
                          className="bg-white border border-slate-200 text-slate-800 text-[11px] px-2 py-0.5 rounded-md font-medium flex items-center gap-1 shadow-xs"
                        >
                          <GraduationCap className="h-3 w-3 text-teal-600" />
                          {st.name} <span className="text-slate-400">({st.grade})</span>
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">No linked children</span>
                    )}
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs font-semibold">
                  <span className="text-teal-700 group-hover:text-teal-800 group-hover:underline flex items-center gap-1">
                    Family File <ChevronRight className="h-3 w-3" />
                  </span>
                  <span className="text-slate-500">
                    {fam.billingBalance > 0 ? (
                      <span className="text-rose-600 font-bold">${fam.billingBalance.toLocaleString()} Due</span>
                    ) : (
                      <span className="text-emerald-600 font-bold">Settled $0.00</span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Family File Slide-over Drawer */}
      {selectedFamily && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
          <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
            <div className="p-6 bg-[#0d1527] text-white flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">{selectedFamily.familyTitle}</h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Primary Contact: {selectedFamily.primaryGuardian} &bull; {selectedFamily.relationship}
                </p>
              </div>
              <button
                onClick={() => setSelectedFamily(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
              {selectedFamily.hasCustodyRestriction && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-rose-800">
                    <ShieldAlert className="h-4 w-4" /> Legal Custody Order Active
                  </div>
                  <p className="text-[11px] leading-relaxed">{selectedFamily.restrictionNotes}</p>
                </div>
              )}

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">Contact Details</h3>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Primary Email:</span>
                    <span className="font-semibold text-slate-800">{selectedFamily.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phone:</span>
                    <span className="font-semibold text-slate-800">{selectedFamily.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Parent Portal:</span>
                    <span className="font-bold text-emerald-600">{selectedFamily.portalStatus}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">Enrolled Children</h3>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden bg-white">
                  {selectedFamily.students.map((st, i) => (
                    <div key={i} className="p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-teal-600" />
                        <div>
                          <p className="font-bold text-slate-900">{st.name}</p>
                          <p className="text-[10px] text-slate-400">{st.grade}</p>
                        </div>
                      </div>
                      <Link
                        href="/students"
                        className="text-teal-700 hover:underline font-semibold text-[11px]"
                      >
                        View Profile &rarr;
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900">Billing Account Status</h3>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Outstanding Due</span>
                    <p className="font-black text-rose-600 text-lg mt-0.5">
                      ${selectedFamily.billingBalance.toLocaleString()}
                    </p>
                  </div>
                  <Link
                    href="/fees"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg"
                  >
                    View Invoices
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedFamily(null)}
              >
                Close
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleSendInvite(selectedFamily.id, selectedFamily.email)}
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" /> Re-send Portal Invite
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Family Modal */}
      {isAddFamilyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 bg-[#0d1527] text-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">Add Family Unit</h3>
                <p className="text-xs text-slate-300">Register parent/guardian household</p>
              </div>
              <button
                onClick={() => setIsAddFamilyModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddFamily} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Family Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Vance Family"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Primary Guardian Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Marcus Vance"
                  value={newPrimaryGuardian}
                  onChange={(e) => setNewPrimaryGuardian(e.target.value)}
                  className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Relationship</label>
                <select
                  value={newRelationship}
                  onChange={(e) => setNewRelationship(e.target.value)}
                  className="w-full h-9 px-2 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="Parents">Parents</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Legal Guardian">Legal Guardian</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Phone</label>
                  <input
                    type="text"
                    placeholder="+971 50..."
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Email</label>
                  <input
                    type="email"
                    placeholder="parent@..."
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full h-9 px-3 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddFamilyModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-bold"
                >
                  Save Family
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
