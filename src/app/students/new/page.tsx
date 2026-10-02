"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/legacy-ui/Button";
import {
  User,
  GraduationCap,
  Users,
  ShieldCheck,
  ShieldAlert,
  Heart,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function NewStudentPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "Male",
    dob: "2013-05-15",
    admissionNumber: "ADM-2026-017",
    admissionDate: "2026-09-01",
    grade: "Grade 7",
    classSection: "Grade 7 - Blue",
    guardianName: "",
    guardianRelation: "Father",
    guardianPhone: "",
    guardianEmail: "",
    canPickup: true,
    medicalNotes: "",
    custodyAlert: "",
    initialTuition: 3360,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.guardianName) {
      alert("Please provide the Student Name and Primary Guardian Name.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/students");
      }, 1200);
    }, 600);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <AppHeader
          title="Enroll New Student"
          subtitle="Register a new scholar into the institutional Student Information System (SIS)"
          breadcrumbs={[
            { label: "Home", href: "/dashboard" },
            { label: "Students", href: "/students" },
            { label: "New Student", current: true },
          ]}
          actionButton={
            <div className="flex items-center gap-2">
              <Link href="/students">
                <Button variant="outline" size="sm" className="text-xs cursor-pointer">
                  Cancel
                </Button>
              </Link>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <Save className="h-3.5 w-3.5" />
                {isSubmitting ? "Enrolling..." : "Enroll Student"}
              </Button>
            </div>
          }
        />

        <main className="p-6 max-w-4xl w-full mx-auto space-y-6">
          {success && (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 p-4 rounded-xl flex items-center gap-3 animate-in fade-in duration-200">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-xs">Student Successfully Enrolled!</p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400">Generated profile and redirecting to students directory...</p>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-6">
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">Student Enrollment Form</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Register a new scholar into the institutional Student Information System (SIS).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Student Identity */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <User className="h-4 w-4" /> 1. Student Identity & Biodata
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="md:col-span-2">
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mason Harrington"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Admission Number</label>
                    <input
                      type="text"
                      value={formData.admissionNumber}
                      onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Admission Date</label>
                    <input
                      type="date"
                      value={formData.admissionDate}
                      onChange={(e) => setFormData({ ...formData, admissionDate: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Academic Class Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <GraduationCap className="h-4 w-4" /> 2. Academic Placement
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Grade Level</label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                    >
                      <option>Grade 7</option>
                      <option>Grade 8</option>
                      <option>Grade 9</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Class Section</label>
                    <select
                      value={formData.classSection}
                      onChange={(e) => setFormData({ ...formData, classSection: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                    >
                      <option>Grade 7 - Blue</option>
                      <option>Grade 7 - Gold</option>
                      <option>Grade 8 - Alpha</option>
                      <option>Grade 8 - Beta</option>
                      <option>Grade 9 - Science</option>
                      <option>Grade 9 - Arts</option>
                      <option>Grade 10 - Pre-Med</option>
                      <option>Grade 10 - Tech & Coding</option>
                      <option>Grade 11 - Humanities</option>
                      <option>Grade 11 - STEM & Robotics</option>
                      <option>Grade 12 - Senior Scholars</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Guardian Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Users className="h-4 w-4" /> 3. Primary Guardian Contact
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Guardian Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Robert Harrington"
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Relationship</label>
                    <select
                      value={formData.guardianRelation}
                      onChange={(e) => setFormData({ ...formData, guardianRelation: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                    >
                      <option>Father</option>
                      <option>Mother</option>
                      <option>Legal Guardian</option>
                      <option>Sponsor</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+971 50 112 3344"
                      value={formData.guardianPhone}
                      onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="parent@example.com"
                      value={formData.guardianEmail}
                      onChange={(e) => setFormData({ ...formData, guardianEmail: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.canPickup}
                      onChange={(e) => setFormData({ ...formData, canPickup: e.target.checked })}
                      className="rounded border-slate-300 dark:border-slate-700 text-teal-600 focus:ring-teal-500"
                    />
                    <span>Guardian is authorized for campus pick-up and emergency custody release</span>
                  </label>
                </div>
              </div>

              {/* Section 4: Health & Safeguarding */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Heart className="h-4 w-4" /> 4. Health, Allergies & Safeguarding Alerts
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Medical Conditions or Allergies</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Asthma inhaler with nurse, peanut allergy (EpiPen)"
                      value={formData.medicalNotes}
                      onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Custody Restriction / Court Orders</label>
                    <textarea
                      rows={2}
                      placeholder="Leave blank if standard parental custody applies"
                      value={formData.custodyAlert}
                      onChange={(e) => setFormData({ ...formData, custodyAlert: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <Link href="/students">
                  <Button variant="outline" size="sm" type="button" className="text-xs cursor-pointer">
                    Cancel
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <Save className="h-3.5 w-3.5" />
                  {isSubmitting ? "Enrolling Student..." : "Enroll Scholar into SIS"}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
