"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  UserCheck,
  UserPlus,
  Users,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  Calendar,
  FileText,
  ShieldCheck,
  Mail,
  Phone,
  Sparkles,
  X,
  Check,
  ExternalLink,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

// --- Types ---
export type AdmissionStage =
  | "Enquiry"
  | "Applied"
  | "Assessment"
  | "Waitlisted"
  | "Offered"
  | "Accepted"
  | "Enrolled";

export interface DocumentVerificationItem {
  id: string;
  name: string;
  status: "Verified" | "Pending" | "Missing";
  fileName?: string;
}

export interface ApplicantRecord {
  id: string;
  applicationNumber: string;
  studentName: string;
  dob: string; // YYYY-MM-DD
  gender: "Male" | "Female";
  nationality: string;
  targetGrade: string;
  appliedDate: string;
  stage: AdmissionStage;
  guardianName: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianRelationship: string;
  assessmentScore?: number;
  documents: DocumentVerificationItem[];
  enrolledAdmissionNumber?: string;
  enrolledSection?: string;
}

const STAGES: { id: AdmissionStage; label: string; color: string; badgeVariant: "default" | "info" | "warning" | "success" | "danger" | "outline" }[] = [
  { id: "Enquiry", label: "1. Enquiry", color: "border-slate-300 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-900/50", badgeVariant: "default" },
  { id: "Applied", label: "2. Applied", color: "border-sky-300 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/20", badgeVariant: "info" },
  { id: "Assessment", label: "3. Assessment", color: "border-indigo-300 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/20", badgeVariant: "info" },
  { id: "Waitlisted", label: "4. Waitlisted", color: "border-amber-300 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20", badgeVariant: "warning" },
  { id: "Offered", label: "5. Offered", color: "border-purple-300 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20", badgeVariant: "outline" },
  { id: "Accepted", label: "6. Accepted", color: "border-teal-300 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/20", badgeVariant: "success" },
  { id: "Enrolled", label: "7. Enrolled", color: "border-emerald-400 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/30", badgeVariant: "success" },
];

export default function AdmissionsPage() {
  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("All");
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantRecord | null>(null);
  const [isDetailsDrawerOpen, setIsDetailsDrawerOpen] = useState(false);
  const [enrolledSuccessModal, setEnrolledSuccessModal] = useState<ApplicantRecord | null>(null);

  // Initial Applicants Data
  const [applicants, setApplicants] = useState<ApplicantRecord[]>([
    {
      id: "app-101",
      applicationNumber: "APP-2026-0042",
      studentName: "Hamdan Al-Nuaimi",
      dob: "2014-03-15",
      gender: "Male",
      nationality: "United Arab Emirates",
      targetGrade: "Grade 7",
      appliedDate: "2026-09-02",
      stage: "Enquiry",
      guardianName: "Rashid Al-Nuaimi",
      guardianEmail: "r.alnuaimi@example.ae",
      guardianPhone: "+971 50 123 4567",
      guardianRelationship: "Father",
      documents: [
        { id: "d1", name: "Birth Certificate", status: "Pending" },
        { id: "d2", name: "Previous School Report", status: "Missing" },
        { id: "d3", name: "Immunization Record", status: "Missing" },
        { id: "d4", name: "Guardian National ID", status: "Pending" },
      ],
    },
    {
      id: "app-102",
      applicationNumber: "APP-2026-0043",
      studentName: "Nia Otieno",
      dob: "2013-11-20",
      gender: "Female",
      nationality: "Kenya",
      targetGrade: "Grade 8",
      appliedDate: "2026-09-05",
      stage: "Applied",
      guardianName: "Grace Otieno",
      guardianEmail: "grace.otieno@example.co.ke",
      guardianPhone: "+254 722 000 111",
      guardianRelationship: "Mother",
      documents: [
        { id: "d1", name: "Birth Certificate", status: "Verified", fileName: "nia_birth_cert.pdf" },
        { id: "d2", name: "Previous School Report", status: "Verified", fileName: "kcpe_transcript.pdf" },
        { id: "d3", name: "Immunization Record", status: "Pending" },
        { id: "d4", name: "Guardian National ID", status: "Verified", fileName: "grace_national_id.pdf" },
      ],
    },
    {
      id: "app-103",
      applicationNumber: "APP-2026-0044",
      studentName: "Ibrahim Chukwu",
      dob: "2014-06-10",
      gender: "Male",
      nationality: "Nigeria",
      targetGrade: "Grade 7",
      appliedDate: "2026-09-08",
      stage: "Assessment",
      assessmentScore: 88,
      guardianName: "Emeka Chukwu",
      guardianEmail: "emeka.c@example.ng",
      guardianPhone: "+234 803 123 4567",
      guardianRelationship: "Father",
      documents: [
        { id: "d1", name: "Birth Certificate", status: "Verified", fileName: "ibrahim_birth.pdf" },
        { id: "d2", name: "Previous School Report", status: "Verified", fileName: "jss1_term3.pdf" },
        { id: "d3", name: "Immunization Record", status: "Verified", fileName: "vaccine_card.pdf" },
        { id: "d4", name: "Guardian National ID", status: "Verified", fileName: "emeka_passport.pdf" },
      ],
    },
    {
      id: "app-104",
      applicationNumber: "APP-2026-0045",
      studentName: "Maryam Al-Khatib",
      dob: "2012-08-25",
      gender: "Female",
      nationality: "Jordan",
      targetGrade: "Grade 9",
      appliedDate: "2026-09-10",
      stage: "Waitlisted",
      assessmentScore: 74,
      guardianName: "Tareq Al-Khatib",
      guardianEmail: "t.khatib@example.com",
      guardianPhone: "+962 79 555 1234",
      guardianRelationship: "Father",
      documents: [
        { id: "d1", name: "Birth Certificate", status: "Verified", fileName: "maryam_cert.pdf" },
        { id: "d2", name: "Previous School Report", status: "Verified" },
        { id: "d3", name: "Immunization Record", status: "Verified" },
        { id: "d4", name: "Guardian National ID", status: "Verified" },
      ],
    },
    {
      id: "app-105",
      applicationNumber: "APP-2026-0046",
      studentName: "Liam Van Der Merwe",
      dob: "2013-02-14",
      gender: "Male",
      nationality: "South Africa",
      targetGrade: "Grade 8",
      appliedDate: "2026-09-12",
      stage: "Offered",
      assessmentScore: 92,
      guardianName: "Johann Van Der Merwe",
      guardianEmail: "johann.vdm@example.co.za",
      guardianPhone: "+27 82 444 8888",
      guardianRelationship: "Father",
      documents: [
        { id: "d1", name: "Birth Certificate", status: "Verified" },
        { id: "d2", name: "Previous School Report", status: "Verified" },
        { id: "d3", name: "Immunization Record", status: "Verified" },
        { id: "d4", name: "Guardian National ID", status: "Verified" },
      ],
    },
    {
      id: "app-106",
      applicationNumber: "APP-2026-0047",
      studentName: "Noor Al-Zahrani",
      dob: "2014-01-30",
      gender: "Female",
      nationality: "Saudi Arabia",
      targetGrade: "Grade 7",
      appliedDate: "2026-09-14",
      stage: "Accepted",
      assessmentScore: 95,
      guardianName: "Sultan Al-Zahrani",
      guardianEmail: "sultan.zahrani@example.sa",
      guardianPhone: "+966 50 999 8888",
      guardianRelationship: "Father",
      documents: [
        { id: "d1", name: "Birth Certificate", status: "Verified" },
        { id: "d2", name: "Previous School Report", status: "Verified" },
        { id: "d3", name: "Immunization Record", status: "Verified" },
        { id: "d4", name: "Guardian National ID", status: "Verified" },
      ],
    },
    {
      id: "app-107",
      applicationNumber: "APP-2026-0038",
      studentName: "Kofi Annan Jr.",
      dob: "2012-05-18",
      gender: "Male",
      nationality: "Ghana",
      targetGrade: "Grade 9",
      appliedDate: "2026-08-20",
      stage: "Enrolled",
      assessmentScore: 91,
      guardianName: "Kwabena Annan",
      guardianEmail: "k.annan@example.com.gh",
      guardianPhone: "+233 24 000 9999",
      guardianRelationship: "Father",
      enrolledAdmissionNumber: "ADM-2026-098",
      enrolledSection: "Grade 9-A",
      documents: [
        { id: "d1", name: "Birth Certificate", status: "Verified" },
        { id: "d2", name: "Previous School Report", status: "Verified" },
        { id: "d3", name: "Immunization Record", status: "Verified" },
        { id: "d4", name: "Guardian National ID", status: "Verified" },
      ],
    },
  ]);

  // Advance or Demote Pipeline Stage
  const moveApplicantStage = (applicantId: string, direction: "next" | "prev") => {
    setApplicants((prev) =>
      prev.map((app) => {
        if (app.id !== applicantId) return app;
        const currentIdx = STAGES.findIndex((s) => s.id === app.stage);
        if (direction === "next" && currentIdx < STAGES.length - 1) {
          const nextStage = STAGES[currentIdx + 1].id;
          return { ...app, stage: nextStage };
        }
        if (direction === "prev" && currentIdx > 0) {
          const prevStage = STAGES[currentIdx - 1].id;
          return { ...app, stage: prevStage };
        }
        return app;
      })
    );
  };

  // Age Eligibility Calculation
  const calculateAgeEligibility = (dobString: string, targetGrade: string) => {
    const dob = new Date(dobString);
    const cutoffDate = new Date("2026-09-01"); // Academic intake cutoff
    let ageYears = cutoffDate.getFullYear() - dob.getFullYear();
    let ageMonths = cutoffDate.getMonth() - dob.getMonth();
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    // Typical grade expected age rules
    let expectedAge = 12;
    if (targetGrade === "Grade 7") expectedAge = 12;
    else if (targetGrade === "Grade 8") expectedAge = 13;
    else if (targetGrade === "Grade 9") expectedAge = 14;
    else if (targetGrade === "Grade 10") expectedAge = 15;

    const isCompliant = Math.abs(ageYears - expectedAge) <= 1;

    return {
      ageFormatted: `${ageYears} yrs, ${ageMonths} mos`,
      isCompliant,
      expectedRange: `${expectedAge - 1} - ${expectedAge + 1} yrs`,
    };
  };

  // 1-Click "Convert to Enrolled Student"
  const handleConvertToEnrolled = (applicant: ApplicantRecord) => {
    const newAdmNumber = `ADM-2026-${Math.floor(100 + Math.random() * 900)}`;
    const assignedClass = `${applicant.targetGrade}-A`;

    const updated: ApplicantRecord = {
      ...applicant,
      stage: "Enrolled",
      enrolledAdmissionNumber: newAdmNumber,
      enrolledSection: assignedClass,
    };

    setApplicants((prev) => prev.map((a) => (a.id === applicant.id ? updated : a)));
    setSelectedApplicant(updated);
    setEnrolledSuccessModal(updated);
  };

  // Toggle document verification in drawer
  const handleToggleDocStatus = (docId: string) => {
    if (!selectedApplicant) return;
    const nextStatusMap: Record<DocumentVerificationItem["status"], DocumentVerificationItem["status"]> = {
      Missing: "Pending",
      Pending: "Verified",
      Verified: "Missing",
    };

    const updatedDocs = selectedApplicant.documents.map((d) =>
      d.id === docId ? { ...d, status: nextStatusMap[d.status] } : d
    );

    const updatedApplicant = { ...selectedApplicant, documents: updatedDocs };
    setSelectedApplicant(updatedApplicant);
    setApplicants((prev) => prev.map((a) => (a.id === selectedApplicant.id ? updatedApplicant : a)));
  };

  // Open applicant detail drawer
  const openDetails = (app: ApplicantRecord) => {
    setSelectedApplicant(app);
    setIsDetailsDrawerOpen(true);
  };

  // Filtered applicants
  const filteredApplicants = applicants.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(search.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(search.toLowerCase()) ||
      app.guardianName.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = gradeFilter === "All" || app.targetGrade === gradeFilter;
    return matchesSearch && matchesGrade;
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
                <div className="p-2.5 rounded-xl bg-purple-600/10 text-purple-600 dark:text-purple-400">
                  <UserPlus className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Admissions Pipeline & Enrolment
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Visual 7-Stage Kanban Board, Age Cutoff Verification, and 1-Click Enrolment Conversion
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => alert("Opening public application submission wizard...")}
                className="gap-1.5 text-xs bg-purple-600 hover:bg-purple-700"
              >
                <UserPlus className="h-3.5 w-3.5" /> New Applicant
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <Card>
            <CardContent className="p-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search applicant name, app # or guardian..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-9 ps-9 pe-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="h-4 w-4 text-slate-400" />
                <span className="text-xs text-slate-500">Target Grade:</span>
                {["All", "Grade 7", "Grade 8", "Grade 9"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGradeFilter(g)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      gradeFilter === g
                        ? "bg-purple-600 text-white shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Visual 7-Stage Kanban Board */}
          <div className="overflow-x-auto pb-4">
            <div className="grid grid-cols-7 gap-3 min-w-[1250px]">
              {STAGES.map((col) => {
                const stageApplicants = filteredApplicants.filter((a) => a.stage === col.id);

                return (
                  <div
                    key={col.id}
                    className={`flex flex-col rounded-xl border p-3 min-h-[550px] ${col.color}`}
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-current/15">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {col.label}
                      </span>
                      <Badge variant={col.badgeVariant} className="text-[10px] px-1.5 py-0">
                        {stageApplicants.length}
                      </Badge>
                    </div>

                    {/* Applicants Cards List */}
                    <div className="space-y-2.5 flex-1">
                      {stageApplicants.map((app) => (
                        <div
                          key={app.id}
                          onClick={() => openDetails(app)}
                          className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-md hover:border-purple-400 dark:hover:border-purple-600 transition-all cursor-pointer group"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-mono text-[10px] text-slate-400">
                              {app.applicationNumber}
                            </span>
                            <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                              {app.targetGrade}
                            </Badge>
                          </div>

                          <div className="font-bold text-xs text-slate-900 dark:text-white mt-1 group-hover:text-purple-600 transition-colors">
                            {app.studentName}
                          </div>

                          <div className="text-[10px] text-slate-500 mt-0.5 flex items-center justify-between">
                            <span>{app.nationality}</span>
                            {app.assessmentScore && (
                              <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                                Score: {app.assessmentScore}%
                              </span>
                            )}
                          </div>

                          {/* Documents Mini Indicator */}
                          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px]">
                            <div className="flex items-center gap-1 text-slate-500">
                              <ShieldCheck className="h-3 w-3 text-emerald-600" />
                              <span>
                                {app.documents.filter((d) => d.status === "Verified").length}/
                                {app.documents.length} Docs
                              </span>
                            </div>

                            {/* Enrolled Badge or Advance Arrow */}
                            {app.stage === "Enrolled" ? (
                              <span className="font-mono text-[9px] font-bold text-emerald-600">
                                {app.enrolledAdmissionNumber}
                              </span>
                            ) : (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveApplicantStage(app.id, "next");
                                }}
                                title="Advance Stage"
                                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-purple-600"
                              >
                                <ArrowRight className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      {stageApplicants.length === 0 && (
                        <div className="h-32 flex items-center justify-center text-center text-slate-400 text-xs italic">
                          No applicants in this stage
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* APPLICATION DETAILS DRAWER */}
          {isDetailsDrawerOpen && selectedApplicant && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-end p-0">
              <div className="bg-white dark:bg-slate-900 h-full max-w-lg w-full shadow-2xl border-s border-slate-200 dark:border-slate-800 p-6 space-y-5 overflow-y-auto animate-in slide-in-from-right duration-200">
                {/* Drawer Top */}
                <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="info" className="text-[10px]">
                        Stage: {selectedApplicant.stage}
                      </Badge>
                      <span className="font-mono text-xs text-slate-400">
                        {selectedApplicant.applicationNumber}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                      {selectedApplicant.studentName}
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsDetailsDrawerOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* 1-Click Convert to Enrolled Button Banner */}
                {selectedApplicant.stage !== "Enrolled" && (
                  <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-purple-950 dark:text-purple-200 flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-purple-600" /> Convert to Enrolled Student
                      </span>
                      <Badge variant="success">Instant Placement</Badge>
                    </div>
                    <p className="text-[11px] text-purple-700 dark:text-purple-400">
                      Creates official student record, assigns admission number, links verified guardians, and dispatches welcome portal invite.
                    </p>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => handleConvertToEnrolled(selectedApplicant)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-xs font-semibold gap-1.5"
                    >
                      <GraduationCap className="h-4 w-4" /> 1-Click Enrol Student
                    </Button>
                  </div>
                )}

                {/* Enrolled Details Banner */}
                {selectedApplicant.stage === "Enrolled" && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-900 dark:text-emerald-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Officially Enrolled Student
                    </div>
                    <div className="text-xs font-mono">
                      Admission #: <strong>{selectedApplicant.enrolledAdmissionNumber}</strong> &bull; Class:{" "}
                      <strong>{selectedApplicant.enrolledSection}</strong>
                    </div>
                  </div>
                )}

                {/* Age Eligibility Check Box */}
                {(() => {
                  const eligibility = calculateAgeEligibility(
                    selectedApplicant.dob,
                    selectedApplicant.targetGrade
                  );
                  return (
                    <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Age Cutoff Verification:
                        </span>
                        <Badge variant={eligibility.isCompliant ? "success" : "warning"}>
                          {eligibility.isCompliant ? "Compliant (Pass)" : "Age Waiver Needed"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-slate-400">Applicant Age: </span>
                          <strong className="text-slate-900 dark:text-white">
                            {eligibility.ageFormatted}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-400">Permitted Range: </span>
                          <span>{eligibility.expectedRange}</span>
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Evaluated as of institutional September 1 statutory cutoff date.
                      </div>
                    </div>
                  );
                })()}

                {/* Applicant Bio & Guardian Details */}
                <div className="space-y-3 text-xs">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    Applicant Information:
                  </h3>
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div>
                      <span className="text-slate-400">Date of Birth: </span>
                      <div className="font-semibold">{selectedApplicant.dob}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Gender: </span>
                      <div className="font-semibold">{selectedApplicant.gender}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Nationality: </span>
                      <div className="font-semibold">{selectedApplicant.nationality}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Target Grade: </span>
                      <div className="font-semibold">{selectedApplicant.targetGrade}</div>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white pt-2">
                    Primary Guardian:
                  </h3>
                  <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {selectedApplicant.guardianName}
                      </span>
                      <Badge variant="outline">{selectedApplicant.guardianRelationship}</Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                      <Mail className="h-3 w-3 text-purple-600" /> {selectedApplicant.guardianEmail}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                      <Phone className="h-3 w-3 text-emerald-600" /> {selectedApplicant.guardianPhone}
                    </div>
                  </div>
                </div>

                {/* Mandatory Documents Checklist */}
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      Document Compliance Checklist:
                    </h3>
                    <span className="text-[10px] text-slate-400">Click badge to toggle status</span>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                    {selectedApplicant.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40"
                      >
                        <div>
                          <div className="font-medium text-slate-900 dark:text-white">
                            {doc.name}
                          </div>
                          {doc.fileName && (
                            <div className="text-[10px] text-slate-400 font-mono">
                              File: {doc.fileName}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => handleToggleDocStatus(doc.id)}
                          className="cursor-pointer transition-transform hover:scale-105"
                        >
                          <Badge
                            variant={
                              doc.status === "Verified"
                                ? "success"
                                : doc.status === "Pending"
                                ? "warning"
                                : "danger"
                            }
                          >
                            {doc.status}
                          </Badge>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Advance Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveApplicantStage(selectedApplicant.id, "prev")}
                    className="gap-1 text-xs"
                  >
                    <ArrowLeft className="h-3 w-3" /> Previous Stage
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveApplicantStage(selectedApplicant.id, "next")}
                    className="gap-1 text-xs"
                  >
                    Next Stage <ArrowRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* CELEBRATION MODAL: ENROLLED CONFIRMATION */}
          {enrolledSuccessModal && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl border border-emerald-300 dark:border-emerald-800 p-6 space-y-4 text-center animate-in zoom-in-95">
                <div className="h-14 w-14 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Student Successfully Enrolled!
                  </h3>
                  <p className="text-xs text-slate-500">
                    Candidate <strong>{enrolledSuccessModal.studentName}</strong> has been converted to an active registered student.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono text-xs space-y-1 text-start">
                  <div>
                    <span className="text-slate-400">Admission Number: </span>
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      {enrolledSuccessModal.enrolledAdmissionNumber}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Assigned Classroom: </span>
                    <strong className="text-slate-900 dark:text-white">
                      {enrolledSuccessModal.enrolledSection}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Guardian Invitation: </span>
                    <span className="text-sky-600">Sent to {enrolledSuccessModal.guardianEmail}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setEnrolledSuccessModal(null)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 font-semibold"
                >
                  Done & Back to Pipeline
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
