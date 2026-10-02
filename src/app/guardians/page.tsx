"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/legacy-ui/Card";
import { Badge } from "@/components/legacy-ui/Badge";
import { Button } from "@/components/legacy-ui/Button";
import {
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Search,
  Filter,
  Phone,
  Mail,
  Users,
  AlertTriangle,
  FileCheck,
  X,
  Calendar,
  Lock,
  EyeOff,
  UserX,
  PhoneOff,
  CheckCircle2,
  FileText,
  Building,
  GraduationCap,
  ExternalLink,
  ChevronRight,
  Info,
} from "lucide-react";

export type VerificationStatus = "Verified" | "Pending" | "Rejected";

export interface GuardianStudentLink {
  studentId: string;
  studentName: string;
  admissionNumber: string;
  grade: string;
  relationship: "Mother" | "Father" | "LegalGuardian" | "Stepmother" | "Stepfather" | "Grandparent" | "Sponsor" | "Other";
  isPrimaryContact: boolean;
  isEmergencyContact: boolean;
  emergencyPriority: number;
  receivesCorrespondence: boolean;
  verificationStatus: VerificationStatus;
  verifiedAt?: string;
  verifiedMethod?: string;
  verificationNotes?: string;
  restrictions?: {
    noRecordAccess: boolean;
    noContact: boolean;
    noCollection: boolean;
    effectiveFrom?: string;
    effectiveTo?: string;
    courtReference?: string;
    notes?: string;
  };
}

export interface MockGuardian {
  id: string;
  name: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  nationalIdNumber: string;
  occupation?: string;
  address?: string;
  preferredLanguage: string;
  links: GuardianStudentLink[];
}

const INITIAL_GUARDIANS: MockGuardian[] = [
  {
    id: "g-001",
    name: "Dr. Tariq Mansoor Sr.",
    email: "tariq.mansoor@health.ae",
    phone: "+971 50 123 4567",
    alternatePhone: "+971 4 399 8877",
    nationalIdNumber: "784-1982-1294812-1",
    occupation: "Consultant Pediatrician",
    preferredLanguage: "Arabic / English",
    links: [
      {
        studentId: "std-001",
        studentName: "Tariq Mansoor Jr.",
        admissionNumber: "ADM-2024-001",
        grade: "Grade 7-A",
        relationship: "Father",
        isPrimaryContact: true,
        isEmergencyContact: true,
        emergencyPriority: 1,
        receivesCorrespondence: true,
        verificationStatus: "Verified",
        verifiedAt: "2024-09-02",
        verifiedMethod: "Government ID (Emirates ID Biometric)",
        verificationNotes: "Original Emirates ID verified in-person at Registrar's office.",
      },
    ],
  },
  {
    id: "g-002",
    name: "Sarah Al-Nuaimi",
    email: "sarah.nuaimi@holding.ae",
    phone: "+971 55 987 6543",
    nationalIdNumber: "784-1986-9041284-3",
    occupation: "Investment Director",
    preferredLanguage: "English / Arabic",
    links: [
      {
        studentId: "std-002",
        studentName: "Amina Al-Falasi",
        admissionNumber: "ADM-2024-002",
        grade: "Grade 7-A",
        relationship: "Mother",
        isPrimaryContact: true,
        isEmergencyContact: true,
        emergencyPriority: 1,
        receivesCorrespondence: true,
        verificationStatus: "Verified",
        verifiedAt: "2024-08-28",
        verifiedMethod: "Court Order & Government ID",
        verificationNotes: "Dubai Personal Status Court Decree Sole Custody verified by Legal Dept.",
        restrictions: {
          noRecordAccess: false,
          noContact: false,
          noCollection: false,
        },
      },
    ],
  },
  {
    id: "g-003",
    name: "Rashid Al-Falasi",
    email: "rashid.falasi@invest.com",
    phone: "+971 50 443 2199",
    nationalIdNumber: "784-1980-8743120-2",
    occupation: "Civil Engineer",
    preferredLanguage: "Arabic",
    links: [
      {
        studentId: "std-002",
        studentName: "Amina Al-Falasi",
        admissionNumber: "ADM-2024-002",
        grade: "Grade 7-A",
        relationship: "Father",
        isPrimaryContact: false,
        isEmergencyContact: false,
        emergencyPriority: 99,
        receivesCorrespondence: false,
        verificationStatus: "Verified",
        verifiedAt: "2024-09-10",
        verifiedMethod: "Court Order Ref #DFC-2024-8812",
        verificationNotes: "Restraining order filed with school safeguarding office. No gate access permitted.",
        restrictions: {
          noRecordAccess: true,
          noContact: true,
          noCollection: true,
          effectiveFrom: "2024-09-01",
          effectiveTo: "2027-09-01",
          courtReference: "Dubai Family Court Order #DFC-2024-8812",
          notes: "Sole custody awarded to mother. Contact and school perimeter presence strictly barred by judicial injunction.",
        },
      },
    ],
  },
  {
    id: "g-004",
    name: "Grace Wanjiku Mwangi",
    email: "grace.mwangi@kenya-agri.org",
    phone: "+254 722 884411",
    nationalIdNumber: "ID-KE-28491024",
    occupation: "Agronomist",
    preferredLanguage: "English / Swahili",
    links: [
      {
        studentId: "std-003",
        studentName: "Zayn Mwangi",
        admissionNumber: "ADM-2024-003",
        grade: "Grade 8-B",
        relationship: "Mother",
        isPrimaryContact: true,
        isEmergencyContact: true,
        emergencyPriority: 1,
        receivesCorrespondence: true,
        verificationStatus: "Verified",
        verifiedAt: "2024-08-30",
        verifiedMethod: "In-Person Verification",
        verificationNotes: "Kenyan passport and pupil birth certificate certified.",
      },
    ],
  },
  {
    id: "g-005",
    name: "David Ochieng Mwangi",
    email: "david.ochieng@eastafricacargo.com",
    phone: "+254 733 992200",
    nationalIdNumber: "ID-KE-19402911",
    occupation: "Logistics Manager",
    preferredLanguage: "English / Swahili",
    links: [
      {
        studentId: "std-003",
        studentName: "Zayn Mwangi",
        admissionNumber: "ADM-2024-003",
        grade: "Grade 8-B",
        relationship: "Father",
        isPrimaryContact: false,
        isEmergencyContact: true,
        emergencyPriority: 2,
        receivesCorrespondence: true,
        verificationStatus: "Pending",
        verificationNotes: "National ID scanned copy received via portal. Requires in-person sighting of original.",
        restrictions: {
          noRecordAccess: false,
          noContact: false,
          noCollection: true,
          effectiveFrom: "2025-01-10",
          effectiveTo: "2026-12-31",
          courtReference: "Parental Agreement Mutual Stipulation #KE-NRB-2025",
          notes: "Collection restricted to designated school transport or mother only during weekdays.",
        },
      },
    ],
  },
  {
    id: "g-006",
    name: "Mariam Benali",
    email: "mariam.benali@casamar.ma",
    phone: "+971 52 334 1122",
    nationalIdNumber: "784-1991-3329011-5",
    occupation: "Architect",
    preferredLanguage: "French / Arabic",
    links: [
      {
        studentId: "std-006",
        studentName: "Layla Benali",
        admissionNumber: "ADM-2024-015",
        grade: "Grade 7-A",
        relationship: "Mother",
        isPrimaryContact: true,
        isEmergencyContact: true,
        emergencyPriority: 1,
        receivesCorrespondence: true,
        verificationStatus: "Pending",
        verificationNotes: "Awaiting uploaded residency visa document.",
      },
    ],
  },
  {
    id: "g-007",
    name: "Marcus Sterling",
    email: "marcus.sterling@sterling-legal.co.uk",
    phone: "+44 7700 900321",
    nationalIdNumber: "UK-PP-559281903",
    occupation: "Barrister",
    preferredLanguage: "English",
    links: [
      {
        studentId: "std-007",
        studentName: "Oliver Sterling",
        admissionNumber: "ADM-2024-044",
        grade: "Year 9-B",
        relationship: "LegalGuardian",
        isPrimaryContact: true,
        isEmergencyContact: true,
        emergencyPriority: 1,
        receivesCorrespondence: true,
        verificationStatus: "Verified",
        verifiedAt: "2024-09-01",
        verifiedMethod: "Court Order",
        verificationNotes: "UK High Court of Justice Special Guardianship Order inspected.",
      },
    ],
  },
  {
    id: "g-008",
    name: "Khalid El-Sayed",
    email: "khalid.elsayed@cairogroup.eg",
    phone: "+971 58 776 5432",
    nationalIdNumber: "784-1985-5542109-8",
    occupation: "Accountant",
    preferredLanguage: "Arabic",
    links: [
      {
        studentId: "std-005",
        studentName: "Bilal El-Sayed",
        admissionNumber: "ADM-2024-012",
        grade: "Grade 7-A",
        relationship: "Father",
        isPrimaryContact: true,
        isEmergencyContact: true,
        emergencyPriority: 1,
        receivesCorrespondence: true,
        verificationStatus: "Rejected",
        verificationNotes: "Submitted expired national identity document. Requested renewed copy.",
      },
    ],
  },
];

export default function GuardiansDirectoryPage() {
  const [guardians, setGuardians] = useState<MockGuardian[]>(INITIAL_GUARDIANS);
  const [search, setSearch] = useState("");
  const [tabFilter, setTabFilter] = useState<"All" | "Verified" | "Pending" | "Restricted">("All");

  // Selected for modals
  const [verifyingLink, setVerifyingLink] = useState<{
    guardian: MockGuardian;
    link: GuardianStudentLink;
  } | null>(null);

  const [restrictingLink, setRestrictingLink] = useState<{
    guardian: MockGuardian;
    link: GuardianStudentLink;
  } | null>(null);

  const [viewingGuardian, setViewingGuardian] = useState<MockGuardian | null>(null);

  // Form states for Verify modal
  const [verifyMethod, setVerifyMethod] = useState("Government ID");
  const [verifyDocumentId, setVerifyDocumentId] = useState("");
  const [verifyNotes, setVerifyNotes] = useState("");

  // Form states for Custody Restrictions modal
  const [noRecordAccess, setNoRecordAccess] = useState(false);
  const [noContact, setNoContact] = useState(false);
  const [noCollection, setNoCollection] = useState(false);
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [effectiveTo, setEffectiveTo] = useState("");
  const [courtReference, setCourtReference] = useState("");
  const [custodyNotes, setCustodyNotes] = useState("");

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Open Verify Modal
  const handleOpenVerifyModal = (guardian: MockGuardian, link: GuardianStudentLink) => {
    setVerifyingLink({ guardian, link });
    setVerifyMethod(link.verifiedMethod || "Government ID");
    setVerifyDocumentId(guardian.nationalIdNumber);
    setVerifyNotes(link.verificationNotes || "Verified against government identity document.");
  };

  // Submit Verification
  const handleSubmitVerification = (status: VerificationStatus) => {
    if (!verifyingLink) return;

    setGuardians((prev) =>
      prev.map((g) => {
        if (g.id !== verifyingLink.guardian.id) return g;
        return {
          ...g,
          links: g.links.map((lnk) => {
            if (lnk.studentId !== verifyingLink.link.studentId) return lnk;
            return {
              ...lnk,
              verificationStatus: status,
              verifiedAt: status === "Verified" ? new Date().toISOString().split("T")[0] : undefined,
              verifiedMethod: status === "Verified" ? verifyMethod : undefined,
              verificationNotes: verifyNotes,
            };
          }),
        };
      })
    );

    showToast(
      status === "Verified"
        ? `Guardian link verified for ${verifyingLink.guardian.name} -> ${verifyingLink.link.studentName}`
        : `Guardian verification status updated to ${status}`
    );
    setVerifyingLink(null);
  };

  // Open Custody Modal
  const handleOpenCustodyModal = (guardian: MockGuardian, link: GuardianStudentLink) => {
    setRestrictingLink({ guardian, link });
    const r = link.restrictions;
    setNoRecordAccess(r?.noRecordAccess || false);
    setNoContact(r?.noContact || false);
    setNoCollection(r?.noCollection || false);
    setEffectiveFrom(r?.effectiveFrom || "2026-09-01");
    setEffectiveTo(r?.effectiveTo || "2027-08-31");
    setCourtReference(r?.courtReference || "");
    setCustodyNotes(r?.notes || "");
  };

  // Save Custody Restrictions
  const handleSaveCustodyRestrictions = () => {
    if (!restrictingLink) return;

    const hasAnyRestriction = noRecordAccess || noContact || noCollection;

    setGuardians((prev) =>
      prev.map((g) => {
        if (g.id !== restrictingLink.guardian.id) return g;
        return {
          ...g,
          links: g.links.map((lnk) => {
            if (lnk.studentId !== restrictingLink.link.studentId) return lnk;
            return {
              ...lnk,
              restrictions: hasAnyRestriction
                ? {
                    noRecordAccess,
                    noContact,
                    noCollection,
                    effectiveFrom,
                    effectiveTo,
                    courtReference,
                    notes: custodyNotes,
                  }
                : undefined,
            };
          }),
        };
      })
    );

    showToast(`Custody restrictions updated for ${restrictingLink.guardian.name} & ${restrictingLink.link.studentName}`);
    setRestrictingLink(null);
  };

  // KPI Calculations
  const totalGuardians = guardians.length;
  const verifiedCount = guardians.filter((g) =>
    g.links.every((l) => l.verificationStatus === "Verified")
  ).length;
  const pendingCount = guardians.filter((g) =>
    g.links.some((l) => l.verificationStatus === "Pending")
  ).length;
  const restrictedCount = guardians.filter((g) =>
    g.links.some(
      (l) =>
        l.restrictions &&
        (l.restrictions.noRecordAccess || l.restrictions.noContact || l.restrictions.noCollection)
    )
  ).length;

  // Filtered List
  const filteredGuardians = guardians.filter((g) => {
    const q = search.toLowerCase();
    const matchesSearch =
      g.name.toLowerCase().includes(q) ||
      g.phone.toLowerCase().includes(q) ||
      g.email.toLowerCase().includes(q) ||
      g.nationalIdNumber.toLowerCase().includes(q) ||
      g.links.some(
        (l) =>
          l.studentName.toLowerCase().includes(q) ||
          l.admissionNumber.toLowerCase().includes(q) ||
          l.grade.toLowerCase().includes(q)
      );

    if (!matchesSearch) return false;

    if (tabFilter === "Verified") {
      return g.links.some((l) => l.verificationStatus === "Verified");
    }
    if (tabFilter === "Pending") {
      return g.links.some((l) => l.verificationStatus === "Pending");
    }
    if (tabFilter === "Restricted") {
      return g.links.some(
        (l) =>
          l.restrictions &&
          (l.restrictions.noRecordAccess || l.restrictions.noContact || l.restrictions.noCollection)
      );
    }
    return true;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AppHeader />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Guardians & Legal Custody
                </h1>
                <Badge variant="info">Safeguarding Registry</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Verified parental relationships, court-ordered custody limitations, and emergency communication suppression
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="md"
                className="gap-2 text-xs"
                onClick={() => {
                  const firstPending = guardians.find((g) =>
                    g.links.some((l) => l.verificationStatus === "Pending")
                  );
                  if (firstPending) {
                    const link = firstPending.links.find((l) => l.verificationStatus === "Pending")!;
                    handleOpenVerifyModal(firstPending, link);
                  } else {
                    showToast("No pending verifications awaiting review.");
                  }
                }}
              >
                <FileCheck className="h-4 w-4 text-sky-600" /> Verify Pending Queue
              </Button>
            </div>
          </div>

          {/* Quick Safeguarding KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Total Guardians</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {totalGuardians}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Active parent & guardian profiles</p>
            </Card>

            <Card className="p-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Verified Links</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {verifiedCount}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {((verifiedCount / totalGuardians) * 100).toFixed(0)}% verified with government IDs
              </p>
            </Card>

            <Card className="p-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Pending Review</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                    {pendingCount}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600">
                  <ShieldQuestion className="h-5 w-5" />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Awaiting registrar inspection</p>
            </Card>

            <Card className="p-4 border-rose-200 dark:border-rose-900 bg-rose-50/30 dark:bg-rose-950/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-rose-700 dark:text-rose-400">
                    Custody Restrictions
                  </p>
                  <p className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
                    {restrictedCount}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-rose-100 dark:bg-rose-900 flex items-center justify-center text-rose-600 dark:text-rose-300">
                  <ShieldAlert className="h-5 w-5" />
                </div>
              </div>
              <p className="text-[11px] text-rose-600/80 dark:text-rose-400/80 mt-2">
                Legal alerts & communication suppression
              </p>
            </Card>
          </div>

          {/* Search & Filter Bar */}
          <Card>
            <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-96">
                <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by guardian name, phone, email, student, ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-9 ps-9 pe-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <span className="text-xs text-slate-500 flex-shrink-0">Filter:</span>
                {(["All", "Verified", "Pending", "Restricted"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTabFilter(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                      tabFilter === tab
                        ? "bg-sky-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {tab === "Restricted" ? "Custody Restricted" : tab}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guardians Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 text-start">Guardian</th>
                    <th className="py-3.5 px-4 text-start">Contact Info</th>
                    <th className="py-3.5 px-4 text-start">Linked Students</th>
                    <th className="py-3.5 px-4 text-start">Verification Status</th>
                    <th className="py-3.5 px-4 text-start">Custody Safeguards</th>
                    <th className="py-3.5 px-4 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                  {filteredGuardians.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        No guardians matching the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredGuardians.map((guardian) => {
                      const primaryLink = guardian.links[0];
                      const hasRestrictions = guardian.links.some(
                        (l) =>
                          l.restrictions &&
                          (l.restrictions.noRecordAccess ||
                            l.restrictions.noContact ||
                            l.restrictions.noCollection)
                      );

                      return (
                        <tr
                          key={guardian.id}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          {/* Guardian Name & National ID */}
                          <td className="py-4 px-4 font-medium text-slate-900 dark:text-white">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs ring-1 ring-slate-200 dark:ring-slate-700">
                                {guardian.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join("")}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                                  {guardian.name}
                                </div>
                                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                                  ID: {guardian.nationalIdNumber}
                                </div>
                                {guardian.occupation && (
                                  <div className="text-[10px] text-slate-500 mt-0.5">
                                    {guardian.occupation}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Contact Info */}
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                                <Phone className="h-3.5 w-3.5 text-slate-400" />
                                <span>{guardian.phone}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                <Mail className="h-3.5 w-3.5 text-slate-400" />
                                <span className="truncate max-w-[180px]">{guardian.email}</span>
                              </div>
                            </div>
                          </td>

                          {/* Linked Students */}
                          <td className="py-4 px-4">
                            <div className="space-y-1.5">
                              {guardian.links.map((link) => (
                                <div
                                  key={link.studentId}
                                  className="flex flex-col gap-0.5 p-1.5 rounded-md bg-slate-100/70 dark:bg-slate-800/60 max-w-xs"
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                                      {link.studentName}
                                    </span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                                      {link.relationship}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                                    <span>{link.grade}</span>
                                    <span>•</span>
                                    <span className="font-mono">{link.admissionNumber}</span>
                                    {link.isPrimaryContact && (
                                      <span className="text-sky-600 dark:text-sky-400 font-medium">
                                        (Primary)
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>

                          {/* Verification Status */}
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              {guardian.links.map((link) => (
                                <div key={link.studentId} className="flex items-center gap-1.5">
                                  <Badge
                                    variant={
                                      link.verificationStatus === "Verified"
                                        ? "success"
                                        : link.verificationStatus === "Pending"
                                        ? "warning"
                                        : "danger"
                                    }
                                  >
                                    {link.verificationStatus === "Verified" && (
                                      <ShieldCheck className="h-3 w-3 mr-1 inline" />
                                    )}
                                    {link.verificationStatus === "Pending" && (
                                      <ShieldQuestion className="h-3 w-3 mr-1 inline" />
                                    )}
                                    {link.verificationStatus === "Rejected" && (
                                      <ShieldAlert className="h-3 w-3 mr-1 inline" />
                                    )}
                                    {link.verificationStatus}
                                  </Badge>
                                </div>
                              ))}
                              {primaryLink.verifiedAt && (
                                <div className="text-[10px] text-slate-400">
                                  Verified: {primaryLink.verifiedAt}
                                </div>
                              )}
                            </div>
                          </td>

                          {/* Custody Safeguards */}
                          <td className="py-4 px-4">
                            {hasRestrictions ? (
                              <div className="space-y-1.5 max-w-[210px]">
                                {guardian.links.map((link) => {
                                  if (!link.restrictions) return null;
                                  return (
                                    <div key={link.studentId} className="space-y-1">
                                      <div className="flex flex-wrap gap-1">
                                        {link.restrictions.noRecordAccess && (
                                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                                            <EyeOff className="h-3 w-3" /> NoRecordAccess
                                          </span>
                                        )}
                                        {link.restrictions.noContact && (
                                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                                            <PhoneOff className="h-3 w-3" /> NoContact
                                          </span>
                                        )}
                                        {link.restrictions.noCollection && (
                                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                                            <UserX className="h-3 w-3" /> NoCollection
                                          </span>
                                        )}
                                      </div>
                                      {link.restrictions.courtReference && (
                                        <div className="text-[10px] font-mono text-rose-600 dark:text-rose-400 truncate">
                                          {link.restrictions.courtReference}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <span className="text-[11px] text-slate-400 italic">
                                No restrictions active
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-4 text-end">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenVerifyModal(guardian, primaryLink)}
                                className="h-7 text-xs px-2"
                                title="Verify Identity & Documentation"
                              >
                                <FileCheck className="h-3.5 w-3.5 text-sky-600 mr-1" /> Verify
                              </Button>

                              <Button
                                variant={hasRestrictions ? "danger" : "outline"}
                                size="sm"
                                onClick={() => handleOpenCustodyModal(guardian, primaryLink)}
                                className={`h-7 text-xs px-2 ${
                                  hasRestrictions
                                    ? "bg-rose-600 hover:bg-rose-700 text-white"
                                    : "text-amber-600 border-amber-200 dark:border-amber-800 hover:bg-amber-50"
                                }`}
                                title="Manage Legal Custody Restrictions"
                              >
                                <ShieldAlert className="h-3.5 w-3.5 mr-1" /> Custody
                              </Button>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setViewingGuardian(guardian)}
                                className="h-7 w-7 p-0 text-slate-400 hover:text-slate-600"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: VERIFY GUARDIAN LINK */}
      {/* ============================================================== */}
      {verifyingLink && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Verify Guardian Link
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official safeguarding & parental identity audit
                  </p>
                </div>
              </div>
              <button
                onClick={() => setVerifyingLink(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-2 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Guardian Name:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {verifyingLink.guardian.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Linked Student:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {verifyingLink.link.studentName} ({verifyingLink.link.grade})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Declared Relationship:</span>
                  <span className="font-semibold text-sky-600 dark:text-sky-400">
                    {verifyingLink.link.relationship}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Verification Method
                </label>
                <select
                  value={verifyMethod}
                  onChange={(e) => setVerifyMethod(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-xs"
                >
                  <option value="Government ID">Government ID (Passport / Emirates ID / National ID)</option>
                  <option value="Court Order">Court Custody Decree / Guardianship Order</option>
                  <option value="In-Person Verification">In-Person Verification by School Registrar</option>
                  <option value="Birth Certificate">Official Birth / Adoption Certificate</option>
                  <option value="Notarized Power of Attorney">Notarized Power of Attorney / Deed</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Document Reference / National ID #
                </label>
                <input
                  type="text"
                  value={verifyDocumentId}
                  onChange={(e) => setVerifyDocumentId(e.target.value)}
                  placeholder="e.g. 784-1985-1234567-1 or PP-KE-482910"
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Registrar / Officer Inspection Notes
                </label>
                <textarea
                  rows={3}
                  value={verifyNotes}
                  onChange={(e) => setVerifyNotes(e.target.value)}
                  placeholder="Document inspected in original, biometric matching verified, no legal discrepancies observed..."
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 text-[11px]">
                <Info className="h-4 w-4 flex-shrink-0" />
                <span>
                  Verifying this link will grant access to student portal updates and emergency communication channels.
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSubmitVerification("Rejected")}
                className="text-rose-600 border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                Reject Verification
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setVerifyingLink(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => handleSubmitVerification("Verified")}
                >
                  <ShieldCheck className="h-4 w-4 mr-1.5" /> Confirm & Verify Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: EDIT CUSTODY RESTRICTIONS (CRITICAL SAFEGUARDING) */}
      {/* ============================================================== */}
      {restrictingLink && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-rose-200 dark:border-rose-900 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-rose-50 dark:bg-rose-950/40 border-b border-rose-100 dark:border-rose-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-rose-600 text-white flex items-center justify-center">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-rose-900 dark:text-rose-100">
                    Legal Custody & Access Restrictions
                  </h3>
                  <p className="text-xs text-rose-700 dark:text-rose-300">
                    Statutory Child Protection & Judicial Orders
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRestrictingLink(null)}
                className="text-rose-500 hover:text-rose-700 dark:hover:text-rose-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
              {/* Critical Legal Explanation Banner */}
              <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-200 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <AlertTriangle className="h-4 w-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
                  <span>CRITICAL SAFEGUARDING PROTOCOL:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-rose-700 dark:text-rose-300">
                  Selecting <strong>NoRecordAccess</strong> or <strong>NoContact</strong> legally suppresses all automated SMS, emails, report cards, portal logins, and emergency alerts for this guardian. All reception desks and security gates will receive immediate perimeter alerts.
                </p>
              </div>

              {/* Context Summary */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">Guardian Subject</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {restrictingLink.guardian.name}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Affected Student</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {restrictingLink.link.studentName} ({restrictingLink.link.grade})
                  </span>
                </div>
              </div>

              {/* Restriction Checkboxes */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Restriction Flags
                </label>

                {/* Flag 1: NoRecordAccess */}
                <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={noRecordAccess}
                    onChange={(e) => setNoRecordAccess(e.target.checked)}
                    className="mt-0.5 h-4 w-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <EyeOff className="h-3.5 w-3.5 text-rose-600" />
                      <span className="font-semibold text-slate-900 dark:text-white">
                        NoRecordAccess (Block Academic & Medical Records)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Suppresses gradebook report cards, transcripts, attendance registers, and health clinic notes. Revokes portal login credentials immediately.
                    </p>
                  </div>
                </label>

                {/* Flag 2: NoContact */}
                <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={noContact}
                    onChange={(e) => setNoContact(e.target.checked)}
                    className="mt-0.5 h-4 w-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <PhoneOff className="h-3.5 w-3.5 text-rose-600" />
                      <span className="font-semibold text-slate-900 dark:text-white">
                        NoContact (Prohibit Communications & Broadcasts)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Legally bars teachers, staff, and automated systems from transmitting phone calls, SMS, WhatsApp, and email messages to this individual.
                    </p>
                  </div>
                </label>

                {/* Flag 3: NoCollection */}
                <label className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={noCollection}
                    onChange={(e) => setNoCollection(e.target.checked)}
                    className="mt-0.5 h-4 w-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <UserX className="h-3.5 w-3.5 text-amber-600" />
                      <span className="font-semibold text-slate-900 dark:text-white">
                        NoCollection (Bar Physical Gate Pickup & Dismissal)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Guardian is not authorized to collect student from school grounds, bus pickup, or co-curricular activities without court escort.
                    </p>
                  </div>
                </label>
              </div>

              {/* Date Ranges */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Effective From
                  </label>
                  <input
                    type="date"
                    value={effectiveFrom}
                    onChange={(e) => setEffectiveFrom(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Effective To (Leave empty if Indefinite)
                  </label>
                  <input
                    type="date"
                    value={effectiveTo}
                    onChange={(e) => setEffectiveTo(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                  />
                </div>
              </div>

              {/* Court Reference & Case Number */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Court Reference / Case Order Number
                </label>
                <input
                  type="text"
                  value={courtReference}
                  onChange={(e) => setCourtReference(e.target.value)}
                  placeholder="e.g. Dubai Family Court Order #DFC-2025-8812 / High Court Ruling"
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                />
              </div>

              {/* Custody Case Notes */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Legal Rationale & Safeguarding Officer Notes
                </label>
                <textarea
                  rows={3}
                  value={custodyNotes}
                  onChange={(e) => setCustodyNotes(e.target.value)}
                  placeholder="Official notes from court ruling, specific injunction caveats, designated authorized representatives..."
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setNoRecordAccess(false);
                  setNoContact(false);
                  setNoCollection(false);
                  setCourtReference("");
                  setCustodyNotes("");
                }}
                className="text-slate-500 text-xs"
              >
                Clear All Restrictions
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setRestrictingLink(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleSaveCustodyRestrictions}
                >
                  <Lock className="h-4 w-4 mr-1.5" /> Save Custody Restrictions
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* DRAWER / DETAILS MODAL: GUARDIAN PROFILE 360 */}
      {/* ============================================================== */}
      {viewingGuardian && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-end">
          <div className="bg-white dark:bg-slate-900 h-full w-full max-w-md shadow-2xl border-s border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold flex items-center justify-center text-sm">
                    {viewingGuardian.name.slice(0, 1)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {viewingGuardian.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {viewingGuardian.nationalIdNumber}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setViewingGuardian(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 text-xs">
                <h4 className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                  Contact & Profile
                </h4>
                <div className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Primary Phone:</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {viewingGuardian.phone}
                    </span>
                  </div>
                  {viewingGuardian.alternatePhone && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Alternate Phone:</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {viewingGuardian.alternatePhone}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email:</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {viewingGuardian.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Preferred Language:</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      {viewingGuardian.preferredLanguage}
                    </span>
                  </div>
                  {viewingGuardian.occupation && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Occupation:</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {viewingGuardian.occupation}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Linked Students Details */}
              <div className="space-y-3 text-xs">
                <h4 className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                  Linked Students & Custody Status
                </h4>
                <div className="space-y-3">
                  {viewingGuardian.links.map((link) => (
                    <div
                      key={link.studentId}
                      className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {link.studentName}
                        </span>
                        <Badge
                          variant={
                            link.verificationStatus === "Verified"
                              ? "success"
                              : link.verificationStatus === "Pending"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {link.verificationStatus}
                        </Badge>
                      </div>
                      <div className="text-[11px] text-slate-500 flex justify-between">
                        <span>{link.grade} • {link.admissionNumber}</span>
                        <span className="font-medium text-sky-600 dark:text-sky-400">
                          {link.relationship}
                        </span>
                      </div>

                      {link.restrictions && (
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1">
                          <span className="text-[10px] font-semibold text-rose-600 uppercase">
                            Active Custody Injunction
                          </span>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300">
                            {link.restrictions.courtReference}
                          </div>
                          {link.restrictions.notes && (
                            <div className="text-[10px] text-slate-400 italic">
                              "{link.restrictions.notes}"
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={() => setViewingGuardian(null)}
              >
                Close Drawer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
