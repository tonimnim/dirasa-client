"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/legacy-ui/Button";
import {
  UserCheck,
  Mail,
  BookOpen,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function NewTeacherPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "Ms.",
    fullName: "",
    gender: "Female",
    dob: "1990-05-15",
    nationalId: "784-1990-1234567-1",
    email: "",
    phone: "",
    department: "Mathematics & Science",
    role: "Senior Subject Teacher",
    qualification: "M.Sc. Mathematics Education",
    room: "Building B - Room 104",
    status: "Active",
    contractType: "Full-Time",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      alert("Please fill in the required fields (Name and Email).");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/teachers");
      }, 1200);
    }, 600);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <AppHeader
          title="Add New Faculty Member"
          subtitle="Register an academic instructor or pastoral supervisor into the institutional records"
          breadcrumbs={[
            { label: "Home", href: "/dashboard" },
            { label: "Teachers", href: "/teachers" },
            { label: "New Teacher", current: true },
          ]}
          actionButton={
            <div className="flex items-center gap-2">
              <Link href="/teachers">
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
                {isSubmitting ? "Registering..." : "Register Teacher"}
              </Button>
            </div>
          }
        />

        <main className="p-6 max-w-4xl w-full mx-auto space-y-6">
          {success && (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 p-4 rounded-xl flex items-center gap-3 animate-in fade-in duration-200">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-xs">Faculty Member Successfully Registered!</p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400">Redirecting to teachers directory...</p>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-xs space-y-6">
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">Faculty Registration Details</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Please complete the form fields below to assign departmental and room allocations.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Personal Details */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <UserCheck className="h-4 w-4" /> Personal & Identification
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Prefix / Title</label>
                    <select
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-500"
                    >
                      <option>Ms.</option>
                      <option>Mr.</option>
                      <option>Dr.</option>
                      <option>Prof.</option>
                      <option>Mrs.</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-500"
                    >
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Date of Birth</label>
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">National ID / Passport</label>
                    <input
                      type="text"
                      value={formData.nationalId}
                      onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Mail className="h-4 w-4" /> Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                      Institutional Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="teacher.name@redco.academy"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Mobile / Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+971 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Academic Department & Role */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <BookOpen className="h-4 w-4" /> Academic Assignment & Qualification
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Primary Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-500"
                    >
                      <option>Mathematics & Science</option>
                      <option>Humanities & History</option>
                      <option>Chemistry & Biology</option>
                      <option>French & Modern Languages</option>
                      <option>English Literature</option>
                      <option>Visual Arts & Design</option>
                      <option>Physical Education</option>
                      <option>Arabic Language & Studies</option>
                      <option>Computer Science & Robotics</option>
                      <option>Music & Performing Arts</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Academic Role / Designation</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Highest Degree / Qualification</label>
                    <input
                      type="text"
                      value={formData.qualification}
                      onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Assigned Base Room</label>
                    <input
                      type="text"
                      value={formData.room}
                      onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Contract Type</label>
                    <select
                      value={formData.contractType}
                      onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-500"
                    >
                      <option>Full-Time</option>
                      <option>Part-Time</option>
                      <option>Adjunct / Visiting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 focus-visible:ring-1 focus-visible:ring-teal-500"
                    >
                      <option value="Active">Active</option>
                      <option value="OnLeave">On Leave</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Footer actions */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
                <Link href="/teachers">
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
                  {isSubmitting ? "Registering Teacher..." : "Register Faculty Member"}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
