"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/legacy-ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/legacy-ui/Card";
import { Badge } from "@/components/legacy-ui/Badge";
import {
  GraduationCap,
  Calendar,
  Users,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  AlertCircle,
  Copy,
  Printer,
  School,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";

interface UploadedDoc {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
}

export default function SchoolApplyPage() {
  const params = useParams();
  const rawSlug = (params?.schoolSlug as string) || "demo-school";

  const schoolName = useMemo(() => {
    return rawSlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace(/School/gi, "Academy");
  }, [rawSlug]);

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");
  const [copiedRef, setCopiedRef] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Student Demographics
    firstName: "Zayd",
    middleName: "Kareem",
    familyName: "Al-Mansoor",
    preferredName: "Zayd",
    nativeScriptName: "زيد كريم المنصور",
    dateOfBirth: "2015-04-12",
    gender: "Male",
    nationality: "United Arab Emirates",
    homeLanguage: "Arabic & English",

    // Step 2: Guardian Details
    guardianName: "Mariam Al-Mansoor",
    guardianRelationship: "Mother",
    guardianPhone: "+971 50 123 4567",
    guardianEmail: "mariam.mansoor@example.com",
    guardianOccupation: "Biomedical Engineer",
    isPrimaryEmergency: true,
    hasLegalCustody: true,
    hasSecondaryGuardian: true,
    secGuardianName: "Dr. Kareem Al-Mansoor",
    secGuardianRelationship: "Father",
    secGuardianPhone: "+971 50 987 6543",
    secGuardianEmail: "kareem.mansoor@example.com",

    // Step 3: Grade & Academics
    gradeLevel: "Year 6 / Grade 5",
    curriculumStream: "British National Curriculum (Key Stage 2/3)",
    previousSchool: "Al-Noor International Primary School",
    previousSchoolCity: "Dubai",
    previousSchoolCountry: "United Arab Emirates",
    reasonForTransfer: "Relocation to school catchment zone & interest in Dirasa STEM curriculum",
    hasSpecialNeeds: "No",
    specialNeedsDetails: "",

    // Step 5: Declaration
    termsAgreed: true,
    dataConsent: true,
  });

  // Uploaded documents state
  const [documents, setDocuments] = useState<UploadedDoc[]>([
    {
      id: "doc-1",
      name: "Zayd_Birth_Certificate.pdf",
      type: "Birth Certificate",
      size: "1.8 MB",
      uploadedAt: "Just now",
    },
    {
      id: "doc-2",
      name: "Zayd_Passport_Copy.pdf",
      type: "Passport / National ID",
      size: "2.4 MB",
      uploadedAt: "Just now",
    },
    {
      id: "doc-3",
      name: "Immunization_Record_MoH.pdf",
      type: "Immunization Records",
      size: "950 KB",
      uploadedAt: "Just now",
    },
  ]);

  // Calculate age on academic cut-off date (1st September 2026)
  const ageEligibility = useMemo(() => {
    if (!formData.dateOfBirth) return null;
    const dob = new Date(formData.dateOfBirth);
    const cutOff = new Date("2026-09-01");

    let years = cutOff.getFullYear() - dob.getFullYear();
    let months = cutOff.getMonth() - dob.getMonth();
    if (months < 0 || (months === 0 && cutOff.getDate() < dob.getDate())) {
      years--;
      months = (months + 12) % 12;
    }

    let recommendedGrade = "Grade Not Matched";
    if (years === 3) recommendedGrade = "Nursery / FS1";
    else if (years === 4) recommendedGrade = "Reception / FS2 / KG1";
    else if (years === 5) recommendedGrade = "Year 1 / Grade 1";
    else if (years === 6) recommendedGrade = "Year 2 / Grade 2";
    else if (years === 7) recommendedGrade = "Year 3 / Grade 3";
    else if (years === 8) recommendedGrade = "Year 4 / Grade 4";
    else if (years === 9) recommendedGrade = "Year 5 / Grade 5";
    else if (years === 10) recommendedGrade = "Year 6 / Grade 5";
    else if (years === 11) recommendedGrade = "Year 7 / Grade 6";
    else if (years === 12) recommendedGrade = "Year 8 / Grade 7";
    else if (years === 13) recommendedGrade = "Year 9 / Grade 8";
    else if (years === 14) recommendedGrade = "Year 10 / Grade 9 (IGCSE)";
    else if (years === 15) recommendedGrade = "Year 11 / Grade 10";
    else if (years >= 16) recommendedGrade = "Year 12-13 / Sixth Form / IB DP";

    return {
      years,
      months,
      recommendedGrade,
      isEligible: years >= 3 && years <= 18,
    };
  }, [formData.dateOfBirth]);

  const handleDocUpload = (type: string) => {
    const mockFile: UploadedDoc = {
      id: `doc-${Date.now()}`,
      name: `${formData.firstName}_${type.replace(/\s+/g, "_")}.pdf`,
      type,
      size: `${(Math.random() * 2 + 0.8).toFixed(1)} MB`,
      uploadedAt: "Just now",
    };
    setDocuments((prev) => [...prev.filter((d) => d.type !== type), mockFile]);
  };

  const removeDoc = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const validateStep = (step: number) => {
    setErrorMessage(null);
    if (step === 1) {
      if (!formData.firstName || !formData.familyName || !formData.dateOfBirth) {
        setErrorMessage("Please complete all required student demographic fields.");
        return false;
      }
      if (!ageEligibility?.isEligible) {
        setErrorMessage("The student's age must be between 3 and 18 years on the cut-off date.");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.guardianName || !formData.guardianPhone || !formData.guardianEmail) {
        setErrorMessage("Please complete primary guardian contact information.");
        return false;
      }
      if (!formData.hasLegalCustody) {
        setErrorMessage("The registering guardian must possess verified legal custody.");
        return false;
      }
    }
    if (step === 3) {
      if (!formData.gradeLevel || !formData.previousSchool) {
        setErrorMessage("Please specify the grade level applying for and previous schooling details.");
        return false;
      }
    }
    if (step === 4) {
      const hasBirthCert = documents.some((d) => d.type === "Birth Certificate");
      const hasId = documents.some((d) => d.type.includes("Passport") || d.type.includes("National ID"));
      if (!hasBirthCert || !hasId) {
        setErrorMessage("Please upload both the Birth Certificate and Passport / National ID.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setErrorMessage(null);
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAgreed || !formData.dataConsent) {
      setErrorMessage("Please accept the admissions declarations and parental consent statements.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const code = `APP-2026-${randomNum}`;
      setReferenceCode(code);
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  const copyRefToClipboard = () => {
    if (referenceCode) {
      navigator.clipboard.writeText(referenceCode);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const steps = [
    { number: 1, label: "Student", desc: "Demographics & Age" },
    { number: 2, label: "Guardians", desc: "Custody & Contacts" },
    { number: 3, label: "Academics", desc: "Grade & Previous School" },
    { number: 4, label: "Documents", desc: "Certificates & IDs" },
    { number: 5, label: "Review", desc: "Submit Application" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Top Admissions Banner & Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-xl bg-sky-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                D
              </div>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-slate-900 dark:text-white">
                  {schoolName}
                </span>
                <Badge variant="success" className="text-[10px] py-0 px-2">
                  2026/2027 Admissions Open
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official Dirasa Admissions Portal &bull; Multi-Curriculum Intake
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm" className="text-xs">
                Staff / Parent Portal Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        {!isSubmitted ? (
          <div className="space-y-8">
            {/* Admissions Intro & Progress Stepper */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-sky-600" /> Prospective Student Application
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Please ensure all student and legal guardian information is accurate for statutory registration.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Step {currentStep} of 5
                  </span>
                </div>
              </div>

              {/* Stepper Navigation */}
              <div className="pt-6">
                <div className="grid grid-cols-5 gap-2 sm:gap-4">
                  {steps.map((step) => {
                    const isPassed = currentStep > step.number;
                    const isCurrent = currentStep === step.number;

                    return (
                      <div
                        key={step.number}
                        className={`text-center relative ${
                          isCurrent
                            ? "text-sky-600 dark:text-sky-400 font-bold"
                            : isPassed
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-slate-400 dark:text-slate-600"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold transition-all mb-1 ${
                            isCurrent
                              ? "bg-sky-600 text-white ring-4 ring-sky-500/20 shadow-md"
                              : isPassed
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                          }`}
                        >
                          {isPassed ? <CheckCircle2 className="h-4 w-4" /> : step.number}
                        </div>
                        <p className="text-xs font-semibold hidden sm:block truncate">{step.label}</p>
                        <p className="text-[10px] text-slate-400 hidden md:block truncate">{step.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Error Notification */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/80 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2.5 shadow-xs">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="font-medium">{errorMessage}</span>
              </div>
            )}

            {/* Step Wizard Container */}
            <Card className="shadow-lg border-slate-200 dark:border-slate-800">
              {/* STEP 1: STUDENT DEMOGRAPHICS */}
              {currentStep === 1 && (
                <div>
                  <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-sky-600" />
                      Step 1: Student Demographics & Statutory Age Eligibility
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Enter student name as it appears on official passport or birth certificate.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 pt-6">
                    {/* Names Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Given / First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                          placeholder="e.g. Zayd"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Middle Name(s)
                        </label>
                        <input
                          type="text"
                          value={formData.middleName}
                          onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                          className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                          placeholder="e.g. Kareem"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Family / Surname *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.familyName}
                          onChange={(e) => setFormData({ ...formData, familyName: e.target.value })}
                          className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                          placeholder="e.g. Al-Mansoor"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Preferred Name / Known As
                        </label>
                        <input
                          type="text"
                          value={formData.preferredName}
                          onChange={(e) => setFormData({ ...formData, preferredName: e.target.value })}
                          className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                          placeholder="e.g. Zayd"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Native Script Name (Arabic / Local Alphabet)
                        </label>
                        <input
                          type="text"
                          dir="auto"
                          value={formData.nativeScriptName}
                          onChange={(e) => setFormData({ ...formData, nativeScriptName: e.target.value })}
                          className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                          placeholder="e.g. زيد كريم المنصور"
                        />
                      </div>
                    </div>

                    {/* Age Eligibility Calculator */}
                    <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-sky-900 dark:text-sky-200 flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-sky-600" />
                          Statutory Age & Cut-off Eligibility (Sept 1, 2026)
                        </span>
                        {ageEligibility && (
                          <Badge variant={ageEligibility.isEligible ? "success" : "danger"}>
                            {ageEligibility.isEligible ? "Eligible for Intake" : "Age Outside Range"}
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Date of Birth *
                          </label>
                          <input
                            type="date"
                            required
                            value={formData.dateOfBirth}
                            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                            className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Calculated Age on Cut-off Date
                          </label>
                          <div className="h-10 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                            <span>
                              {ageEligibility
                                ? `${ageEligibility.years} years, ${ageEligibility.months} months`
                                : "Enter date of birth"}
                            </span>
                            <span className="text-[11px] text-sky-600 dark:text-sky-400">
                              Cohort: {ageEligibility?.recommendedGrade}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gender, Nationality, Language */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Gender *
                        </label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Nationality *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nationality}
                          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                          className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                          placeholder="e.g. United Arab Emirates"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Primary Home Language
                        </label>
                        <input
                          type="text"
                          value={formData.homeLanguage}
                          onChange={(e) => setFormData({ ...formData, homeLanguage: e.target.value })}
                          className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                          placeholder="e.g. Arabic & English"
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-end gap-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={nextStep}
                      className="bg-sky-600 hover:bg-sky-700 gap-1.5 text-xs font-semibold h-10 px-5"
                    >
                      Next: Guardian Details <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </div>
              )}

              {/* STEP 2: GUARDIAN DETAILS */}
              {currentStep === 2 && (
                <div>
                  <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="h-4 w-4 text-sky-600" />
                      Step 2: Legal Guardian Details & Custody Rights
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Provide contact information for parents or court-appointed legal guardians.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 pt-6">
                    {/* Primary Guardian */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-sky-600" /> Primary Guardian Information
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.guardianName}
                            onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                            className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                            placeholder="e.g. Mariam Al-Mansoor"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Relationship to Student *
                          </label>
                          <select
                            value={formData.guardianRelationship}
                            onChange={(e) => setFormData({ ...formData, guardianRelationship: e.target.value })}
                            className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                          >
                            <option value="Mother">Mother</option>
                            <option value="Father">Father</option>
                            <option value="LegalGuardian">Legal Guardian (Court-Appointed)</option>
                            <option value="FosterParent">Foster Parent</option>
                            <option value="Stepmother">Stepmother</option>
                            <option value="Stepfather">Stepfather</option>
                            <option value="Grandparent">Grandparent</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.guardianPhone}
                            onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                            className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono"
                            placeholder="+971 50 123 4567"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.guardianEmail}
                            onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                            className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                            placeholder="mariam.mansoor@example.com"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Occupation / Employer
                          </label>
                          <input
                            type="text"
                            value={formData.guardianOccupation}
                            onChange={(e) => setFormData({ ...formData, guardianOccupation: e.target.value })}
                            className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                            placeholder="e.g. Biomedical Engineer"
                          />
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="hasLegalCustody"
                            checked={formData.hasLegalCustody}
                            onChange={(e) => setFormData({ ...formData, hasLegalCustody: e.target.checked })}
                            className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                          />
                          <label htmlFor="hasLegalCustody" className="text-xs font-semibold text-slate-800 dark:text-slate-200 select-none">
                            I declare that I hold full legal custody and parental responsibility for this student.
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="isPrimaryEmergency"
                            checked={formData.isPrimaryEmergency}
                            onChange={(e) => setFormData({ ...formData, isPrimaryEmergency: e.target.checked })}
                            className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                          />
                          <label htmlFor="isPrimaryEmergency" className="text-xs text-slate-600 dark:text-slate-400 select-none">
                            Designate as Primary Emergency Contact &amp; Invoicing Recipient
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Guardian */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-slate-400" /> Secondary Guardian / Emergency Contact
                        </h4>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="hasSecGuardian"
                            checked={formData.hasSecondaryGuardian}
                            onChange={(e) => setFormData({ ...formData, hasSecondaryGuardian: e.target.checked })}
                            className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4"
                          />
                          <label htmlFor="hasSecGuardian" className="text-xs text-slate-600 dark:text-slate-400">
                            Include Secondary Guardian
                          </label>
                        </div>
                      </div>

                      {formData.hasSecondaryGuardian && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Full Name
                            </label>
                            <input
                              type="text"
                              value={formData.secGuardianName}
                              onChange={(e) => setFormData({ ...formData, secGuardianName: e.target.value })}
                              className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                              placeholder="e.g. Dr. Kareem Al-Mansoor"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Relationship
                            </label>
                            <select
                              value={formData.secGuardianRelationship}
                              onChange={(e) => setFormData({ ...formData, secGuardianRelationship: e.target.value })}
                              className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                            >
                              <option value="Father">Father</option>
                              <option value="Mother">Mother</option>
                              <option value="LegalGuardian">Legal Guardian</option>
                              <option value="Grandparent">Grandparent</option>
                              <option value="Other">Other Family Member</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={formData.secGuardianPhone}
                              onChange={(e) => setFormData({ ...formData, secGuardianPhone: e.target.value })}
                              className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono"
                              placeholder="+971 50 987 6543"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              Email Address
                            </label>
                            <input
                              type="email"
                              value={formData.secGuardianEmail}
                              onChange={(e) => setFormData({ ...formData, secGuardianEmail: e.target.value })}
                              className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                              placeholder="kareem.mansoor@example.com"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <Button variant="ghost" onClick={prevStep} className="gap-1.5 text-xs">
                      <ArrowLeft className="h-4 w-4" /> Back: Student Info
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={nextStep}
                      className="bg-sky-600 hover:bg-sky-700 gap-1.5 text-xs font-semibold h-10 px-5"
                    >
                      Next: Grade & Academics <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </div>
              )}

              {/* STEP 3: GRADE LEVEL & PREVIOUS SCHOOL */}
              {currentStep === 3 && (
                <div>
                  <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-sky-600" />
                      Step 3: Grade Level Applying For & Educational History
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Select target entry grade, curriculum track, and previous academic schooling.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 pt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Grade / Year Group Applying For *
                        </label>
                        <select
                          value={formData.gradeLevel}
                          onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                          className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium"
                        >
                          <option value="Early Years / Nursery">Early Years / Nursery (Ages 3-4)</option>
                          <option value="Reception / KG1">Reception / KG1 (Ages 4-5)</option>
                          <option value="Year 1 / Grade 1">Year 1 / Grade 1 (Ages 5-6)</option>
                          <option value="Year 2 / Grade 2">Year 2 / Grade 2 (Ages 6-7)</option>
                          <option value="Year 3 / Grade 3">Year 3 / Grade 3 (Ages 7-8)</option>
                          <option value="Year 4 / Grade 4">Year 4 / Grade 4 (Ages 8-9)</option>
                          <option value="Year 5 / Grade 5">Year 5 / Grade 5 (Ages 9-10)</option>
                          <option value="Year 6 / Grade 5">Year 6 / Grade 5 (Ages 10-11 - Middle School Prep)</option>
                          <option value="Year 7 / Grade 6">Year 7 / Grade 6 (Ages 11-12 - Secondary)</option>
                          <option value="Year 8 / Grade 7">Year 8 / Grade 7 (Ages 12-13)</option>
                          <option value="Year 9 / Grade 8">Year 9 / Grade 8 (Ages 13-14 - Pre-IGCSE/WAEC)</option>
                          <option value="Year 10 / Grade 9">Year 10 / Grade 9 (Ages 14-15 - GCSE/WAEC/CBC)</option>
                          <option value="Year 11 / Grade 10">Year 11 / Grade 10 (Ages 15-16)</option>
                          <option value="Year 12 / Sixth Form / IB DP">Year 12 / Sixth Form / IB DP (Ages 16-17)</option>
                          <option value="Year 13 / Grade 12">Year 13 / Grade 12 (Ages 17-18)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Curriculum Stream *
                        </label>
                        <select
                          value={formData.curriculumStream}
                          onChange={(e) => setFormData({ ...formData, curriculumStream: e.target.value })}
                          className="w-full h-10 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                        >
                          <option value="British National Curriculum (Key Stage 2/3)">British National Curriculum (Key Stage 2/3)</option>
                          <option value="International Baccalaureate (IB PYP/MYP)">International Baccalaureate (IB PYP/MYP)</option>
                          <option value="US Common Core & Next Gen Science">US Common Core &amp; Next Gen Science</option>
                          <option value="Kenya CBC & Competency Framework">Kenya CBC &amp; Competency Framework</option>
                          <option value="West African WAEC / Cambridge Int.">West African WAEC / Cambridge Int.</option>
                          <option value="UAE Ministry of Education (MoE Bilingual)">UAE Ministry of Education (MoE Bilingual)</option>
                        </select>
                      </div>
                    </div>

                    {/* Previous School Info */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-4">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                        <School className="h-4 w-4 text-sky-600" /> Current / Previous Educational Institution
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-1 space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            School Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.previousSchool}
                            onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                            className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
                            placeholder="e.g. Al-Noor International School"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            City
                          </label>
                          <input
                            type="text"
                            value={formData.previousSchoolCity}
                            onChange={(e) => setFormData({ ...formData, previousSchoolCity: e.target.value })}
                            className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
                            placeholder="e.g. Dubai"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Country
                          </label>
                          <input
                            type="text"
                            value={formData.previousSchoolCountry}
                            onChange={(e) => setFormData({ ...formData, previousSchoolCountry: e.target.value })}
                            className="w-full h-10 px-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm"
                            placeholder="e.g. United Arab Emirates"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Reason for Transfer
                        </label>
                        <textarea
                          rows={2}
                          value={formData.reasonForTransfer}
                          onChange={(e) => setFormData({ ...formData, reasonForTransfer: e.target.value })}
                          className="w-full p-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs leading-relaxed"
                          placeholder="e.g. Relocating family to school catchment or seeking specialized STEM programs."
                        />
                      </div>
                    </div>

                    {/* SEN / Medical Disclosure */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                          Does the student have identified Special Educational Needs (SEN), Gifted &amp; Talented requirements, or medical alerts?
                        </label>
                        <select
                          value={formData.hasSpecialNeeds}
                          onChange={(e) => setFormData({ ...formData, hasSpecialNeeds: e.target.value })}
                          className="h-8 px-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>

                      {formData.hasSpecialNeeds === "Yes" && (
                        <textarea
                          rows={2}
                          value={formData.specialNeedsDetails}
                          onChange={(e) => setFormData({ ...formData, specialNeedsDetails: e.target.value })}
                          className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                          placeholder="Please provide details (e.g. Dyslexia accommodation, severe peanut allergy, EpiPen required)."
                        />
                      )}
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <Button variant="ghost" onClick={prevStep} className="gap-1.5 text-xs">
                      <ArrowLeft className="h-4 w-4" /> Back: Guardians
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={nextStep}
                      className="bg-sky-600 hover:bg-sky-700 gap-1.5 text-xs font-semibold h-10 px-5"
                    >
                      Next: Document Uploads <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </div>
              )}

              {/* STEP 4: DOCUMENT UPLOADS */}
              {currentStep === 4 && (
                <div>
                  <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-sky-600" />
                      Step 4: Statutory Document Verification Portal
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Upload required identity, health, and previous academic transcripts (PDF, PNG, JPG up to 10MB each).
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 pt-6">
                    {/* Required Documents Upload Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Doc 1: Birth Certificate */}
                      <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              Birth Certificate
                            </span>
                            <Badge variant="danger" className="text-[10px] py-0 px-1.5">Required</Badge>
                          </div>
                          <p className="text-[11px] text-slate-500 mb-3">
                            Official government birth registry verifying date of birth and parentage.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDocUpload("Birth Certificate")}
                          className="w-full text-xs gap-1.5 border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/50"
                        >
                          <Upload className="h-3.5 w-3.5" /> Upload File
                        </Button>
                      </div>

                      {/* Doc 2: Passport / National ID */}
                      <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              Passport / National ID
                            </span>
                            <Badge variant="danger" className="text-[10px] py-0 px-1.5">Required</Badge>
                          </div>
                          <p className="text-[11px] text-slate-500 mb-3">
                            Student passport bio page or national identification card.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDocUpload("Passport / National ID")}
                          className="w-full text-xs gap-1.5 border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/50"
                        >
                          <Upload className="h-3.5 w-3.5" /> Upload File
                        </Button>
                      </div>

                      {/* Doc 3: Immunization Records */}
                      <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">
                              Immunization Records
                            </span>
                            <Badge variant="danger" className="text-[10px] py-0 px-1.5">Required</Badge>
                          </div>
                          <p className="text-[11px] text-slate-500 mb-3">
                            Public health vaccination card and clinical history for school nursing records.
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDocUpload("Immunization Records")}
                          className="w-full text-xs gap-1.5 border-sky-300 dark:border-sky-800 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/50"
                        >
                          <Upload className="h-3.5 w-3.5" /> Upload File
                        </Button>
                      </div>
                    </div>

                    {/* Uploaded Documents List */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                          Uploaded Attachments ({documents.length})
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          All files encrypted &amp; stored under student safeguarding ID
                        </span>
                      </div>

                      <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                        {documents.map((doc) => (
                          <div key={doc.id} className="p-3.5 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                                <FileText className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                                  {doc.name}
                                </p>
                                <p className="text-[10px] text-slate-400">
                                  {doc.type} &bull; {doc.size} &bull; {doc.uploadedAt}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Badge variant="success" className="text-[10px] py-0 px-2 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> Ready
                              </Badge>
                              <button
                                type="button"
                                onClick={() => removeDoc(doc.id)}
                                className="text-xs text-rose-500 hover:underline px-1 py-0.5"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                    <Button variant="ghost" onClick={prevStep} className="gap-1.5 text-xs">
                      <ArrowLeft className="h-4 w-4" /> Back: Academics
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={nextStep}
                      className="bg-sky-600 hover:bg-sky-700 gap-1.5 text-xs font-semibold h-10 px-5"
                    >
                      Next: Review Application <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </div>
              )}

              {/* STEP 5: REVIEW & SUBMIT */}
              {currentStep === 5 && (
                <div>
                  <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-4">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-sky-600" />
                      Step 5: Review Details &amp; Submit Application
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Review all entered information before generating your official admissions reference number.
                    </CardDescription>
                  </CardHeader>

                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 pt-6">
                      {/* Summary Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Student Demographics Card */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
                          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <GraduationCap className="h-3.5 w-3.5 text-sky-600" /> Student Profile
                            </span>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(1)}
                              className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                            <p><strong>Name:</strong> {formData.firstName} {formData.middleName} {formData.familyName}</p>
                            <p><strong>Native Script:</strong> {formData.nativeScriptName}</p>
                            <p><strong>Date of Birth:</strong> {formData.dateOfBirth} ({ageEligibility?.years} years old on cut-off)</p>
                            <p><strong>Gender:</strong> {formData.gender} &bull; <strong>Nationality:</strong> {formData.nationality}</p>
                            <p><strong>Home Language:</strong> {formData.homeLanguage}</p>
                          </div>
                        </div>

                        {/* Guardian Contacts Card */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
                          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5 text-sky-600" /> Legal Guardian Contacts
                            </span>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(2)}
                              className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                            <p><strong>Primary:</strong> {formData.guardianName} ({formData.guardianRelationship})</p>
                            <p><strong>Phone:</strong> {formData.guardianPhone}</p>
                            <p><strong>Email:</strong> {formData.guardianEmail}</p>
                            <p><strong>Occupation:</strong> {formData.guardianOccupation}</p>
                            {formData.hasSecondaryGuardian && (
                              <p><strong>Secondary:</strong> {formData.secGuardianName} ({formData.secGuardianRelationship})</p>
                            )}
                          </div>
                        </div>

                        {/* Academics Card */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
                          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <School className="h-3.5 w-3.5 text-sky-600" /> Academic Placement
                            </span>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(3)}
                              className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                            <p><strong>Applying For:</strong> {formData.gradeLevel}</p>
                            <p><strong>Curriculum:</strong> {formData.curriculumStream}</p>
                            <p><strong>Previous School:</strong> {formData.previousSchool} ({formData.previousSchoolCity})</p>
                            <p><strong>Special Needs:</strong> {formData.hasSpecialNeeds}</p>
                          </div>
                        </div>

                        {/* Documents Card */}
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
                          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                              <FileCheck className="h-3.5 w-3.5 text-sky-600" /> Uploaded Records
                            </span>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(4)}
                              className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                            {documents.map((d) => (
                              <div key={d.id} className="flex items-center justify-between">
                                <span className="truncate max-w-[200px]">{d.name}</span>
                                <Badge variant="success" className="text-[9px] py-0 px-1.5">Verified</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Statutory Declarations Checkbox */}
                      <div className="p-4 rounded-xl bg-sky-50/60 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/80 space-y-3">
                        <div className="flex items-start gap-2.5">
                          <input
                            type="checkbox"
                            id="termsAgreed"
                            required
                            checked={formData.termsAgreed}
                            onChange={(e) => setFormData({ ...formData, termsAgreed: e.target.checked })}
                            className="mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4 cursor-pointer"
                          />
                          <label htmlFor="termsAgreed" className="text-xs text-slate-700 dark:text-slate-300 leading-snug cursor-pointer select-none">
                            <strong>Parental Declaration:</strong> I confirm that all information provided in this admissions application is accurate, genuine, and that no relevant educational, medical, or custody restrictions have been omitted.
                          </label>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <input
                            type="checkbox"
                            id="dataConsent"
                            required
                            checked={formData.dataConsent}
                            onChange={(e) => setFormData({ ...formData, dataConsent: e.target.checked })}
                            className="mt-0.5 rounded border-slate-300 text-sky-600 focus:ring-sky-500 h-4 w-4 cursor-pointer"
                          />
                          <label htmlFor="dataConsent" className="text-xs text-slate-700 dark:text-slate-300 leading-snug cursor-pointer select-none">
                            <strong>Safeguarding Consent:</strong> I authorize {schoolName} and the Dirasa School Information Platform to process these records solely for assessment, admissions evaluation, and statutory regulatory compliance.
                          </label>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="flex justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                      <Button variant="ghost" onClick={prevStep} className="gap-1.5 text-xs">
                        <ArrowLeft className="h-4 w-4" /> Back: Documents
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        isLoading={isSubmitting}
                        disabled={!formData.termsAgreed || !formData.dataConsent}
                        className="bg-emerald-600 hover:bg-emerald-700 gap-1.5 text-xs font-semibold h-11 px-6 shadow-md"
                      >
                        Submit Application to School <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </form>
                </div>
              )}
            </Card>
          </div>
        ) : (
          /* CONFIRMATION / SUCCESS SCREEN */
          <div className="max-w-2xl mx-auto space-y-6">
            <Card className="shadow-xl border-emerald-200 dark:border-emerald-800/60 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-8 text-white text-center space-y-3">
                <div className="h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto border border-white/20 shadow-inner">
                  <CheckCircle2 className="h-9 w-9 text-emerald-100" />
                </div>
                <h2 className="text-2xl font-black tracking-tight">
                  Admissions Application Submitted!
                </h2>
                <p className="text-emerald-100 text-xs max-w-md mx-auto leading-relaxed">
                  Your application for <span className="font-bold text-white">{formData.firstName} {formData.familyName}</span> has been successfully logged into {schoolName}&apos;s admissions registry for Academic Year 2026/2027.
                </p>
              </div>

              <CardContent className="p-6 space-y-6">
                {/* Instant Reference Code Box */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Application Tracking Reference Code
                  </span>
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-mono text-2xl font-black text-slate-900 dark:text-white tracking-widest bg-white dark:bg-slate-900 px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-inner">
                      {referenceCode}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyRefToClipboard}
                      className="h-10 px-3 text-xs gap-1.5"
                    >
                      {copiedRef ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                      {copiedRef ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    A confirmation email has been dispatched to <span className="text-slate-700 dark:text-slate-300 font-medium">{formData.guardianEmail}</span>.
                  </p>
                </div>

                {/* Admissions Roadmap */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-sky-600" /> Admissions Next Steps
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 space-y-1">
                      <span className="text-[10px] font-bold text-sky-600 uppercase">Stage 1</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Document Review</p>
                      <p className="text-[11px] text-slate-500">Admissions team audits birth certificates &amp; IDs (1-2 days).</p>
                    </div>

                    <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 space-y-1">
                      <span className="text-[10px] font-bold text-sky-600 uppercase">Stage 2</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Assessment &amp; Interview</p>
                      <p className="text-[11px] text-slate-500">Invitation for age-appropriate baseline assessment or family tour.</p>
                    </div>

                    <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 space-y-1">
                      <span className="text-[10px] font-bold text-sky-600 uppercase">Stage 3</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Enrollment Offer</p>
                      <p className="text-[11px] text-slate-500">Committee decision, fee schedule, and 1-click Dirasa student conversion.</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={() => window.print()}
                    className="flex-1 text-xs gap-1.5"
                  >
                    <Printer className="h-4 w-4" /> Print Application Summary
                  </Button>

                  <Link href="/login" className="flex-1">
                    <Button
                      variant="primary"
                      className="w-full text-xs font-semibold gap-1.5 bg-sky-600 hover:bg-sky-700"
                    >
                      <Sparkles className="h-4 w-4" /> Enter Dirasa Portal Demo
                    </Button>
                  </Link>
                </div>
              </CardContent>

              <CardFooter className="bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
                <span>{schoolName} &bull; Powered by Dirasa SMS</span>
                <Link href="/" className="text-sky-600 dark:text-sky-400 hover:underline">
                  Visit Main Website
                </Link>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
