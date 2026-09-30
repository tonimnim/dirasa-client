"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/Button";
import {
  ChevronLeft,
  GraduationCap,
  BookOpen,
  UserCheck,
  Save,
  CheckCircle2,
} from "lucide-react";
import { INITIAL_TEACHERS } from "../../teachers/page";

export default function NewClassPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    className: "",
    gradeLevel: "Grade 7 (Year 8)",
    homeroomTeacher: "Ms. Sarah Wanjiru",
    room: "Building B - Room 104",
    capacity: 28,
    shift: "Morning (08:00 - 14:30)",
    academicPeriod: "Sep 2026 - Jul 2027",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.className.trim()) {
      alert("Please provide a Class Name.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/classes");
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
              href="/classes"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/" className="hover:text-slate-700">Home</Link>
              <span>/</span>
              <Link href="/classes" className="hover:text-slate-700">Classes</Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">New Class</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/classes">
              <Button variant="outline" size="sm" className="text-xs">
                Cancel
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[#10b981] hover:bg-[#059669] text-white font-bold gap-1.5 text-xs"
            >
              <Save className="h-3.5 w-3.5" />
              {isSubmitting ? "Creating..." : "Create Class"}
            </Button>
          </div>
        </header>

        <main className="p-6 max-w-4xl w-full mx-auto space-y-6">
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 animate-in fade-in duration-200">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-xs">Class Section Successfully Created!</p>
                <p className="text-[11px] text-emerald-600">Redirecting to classes directory...</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
            <div>
              <h1 className="text-lg font-bold text-slate-900">Create New Class Section</h1>
              <p className="text-xs text-slate-500">
                Configure a new homeroom or cohort group for student rosters and timetable scheduling.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <GraduationCap className="h-4 w-4" /> Class Identification & Level
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">
                      Class Section Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grade 10 - Robotics & AI"
                      value={formData.className}
                      onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Grade Level</label>
                    <select
                      value={formData.gradeLevel}
                      onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    >
                      <option>Grade 7 (Year 8)</option>
                      <option>Grade 8 (Year 9)</option>
                      <option>Grade 9 (Year 10)</option>
                      <option>Grade 10 (Year 11)</option>
                      <option>Grade 11 (Year 12)</option>
                      <option>Grade 12 (Year 13)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <UserCheck className="h-4 w-4" /> Staff & Facility Allocation
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Homeroom Teacher</label>
                    <select
                      value={formData.homeroomTeacher}
                      onChange={(e) => setFormData({ ...formData, homeroomTeacher: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    >
                      {INITIAL_TEACHERS.map((t) => (
                        <option key={t.id} value={t.name}>
                          {t.name} ({t.department})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Assigned Classroom / Room</label>
                    <input
                      type="text"
                      value={formData.room}
                      onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Max Student Capacity</label>
                    <input
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg font-bold focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Daily Schedule Shift</label>
                    <select
                      value={formData.shift}
                      onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    >
                      <option>Morning (08:00 - 14:30)</option>
                      <option>Afternoon (13:00 - 18:30)</option>
                      <option>Full Day (08:00 - 16:00)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <BookOpen className="h-4 w-4" /> Description & Academic Year
                </h3>

                <div className="text-xs">
                  <label className="block text-slate-600 font-semibold mb-1">Cohort Description / Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Provide curriculum track specifics, prerequisites, or pastoral cohort objectives..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 text-xs"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <Link href="/classes">
                  <Button variant="outline" size="sm" type="button" className="text-xs">
                    Cancel
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-bold gap-1.5 text-xs"
                >
                  <Save className="h-3.5 w-3.5" />
                  {isSubmitting ? "Creating Class Section..." : "Create Class Section"}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
