"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/legacy-ui/Button";
import { INITIAL_TEACHERS } from "../../teachers/page";
import { INITIAL_CLASSES } from "../../classes/page";
import {
  ChevronLeft,
  Calendar,
  Clock,
  BookOpen,
  Repeat,
  Palette,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function DeepCalendarSchedulerPage() {
  const router = useRouter();

  const [scheduleType, setScheduleType] = useState<"lesson" | "recurring" | "event">("lesson");

  // Form State
  const [title, setTitle] = useState("Mathematics 7 - Algebraic Geometry");
  const [courseName, setCourseName] = useState("Mathematics 7");
  const [className, setClassName] = useState("Grade 7 - Blue");
  const [teacher, setTeacher] = useState("Ms. Sarah Wanjiru");
  const [date, setDate] = useState("2026-10-01");
  const [startTime, setStartTime] = useState("09:00 AM");
  const [durationHours, setDurationHours] = useState<number>(1);
  const [durationMinutes, setDurationMinutes] = useState<number>(0);
  const [room, setRoom] = useState("Building B - Room 101");
  const [virtualLink, setVirtualLink] = useState("");
  const [color, setColor] = useState<"orange" | "slate" | "peach" | "teal" | "navy" | "purple" | "green">("teal");
  const [selectedDays, setSelectedDays] = useState<number[]>([1, 3, 5]); // Mon, Wed, Fri
  const [visibleToStudents, setVisibleToStudents] = useState(true);
  const [visibleToGuardians, setVisibleToGuardians] = useState(true);
  const [visibleToFaculty, setVisibleToFaculty] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const daysOfWeek = [
    { label: "Mon", dayIndex: 1 },
    { label: "Tue", dayIndex: 2 },
    { label: "Wed", dayIndex: 3 },
    { label: "Thu", dayIndex: 4 },
    { label: "Fri", dayIndex: 5 },
    { label: "Sat", dayIndex: 6 },
    { label: "Sun", dayIndex: 0 },
  ];

  const toggleDay = (idx: number) => {
    if (selectedDays.includes(idx)) {
      setSelectedDays(selectedDays.filter((d) => d !== idx));
    } else {
      setSelectedDays([...selectedDays, idx]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a title for the scheduled lesson/event.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/calendar");
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
              href="/calendar"
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/dashboard" className="hover:text-slate-700">Home</Link>
              <span>/</span>
              <Link href="/calendar" className="hover:text-slate-700">Calendar & Timetable</Link>
              <span>/</span>
              <span className="text-slate-800 font-bold">Deep Full-Page Scheduler</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/calendar">
              <Button variant="outline" size="sm" className="text-xs">
                Cancel
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 text-xs shadow-xs"
            >
              <Save className="h-3.5 w-3.5" />
              {isSubmitting ? "Saving Schedule..." : "Save to Timetable"}
            </Button>
          </div>
        </header>

        <main className="p-6 max-w-4xl w-full mx-auto space-y-6">
          {success && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 animate-in fade-in duration-200">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-xs">Schedule Entry Successfully Created!</p>
                <p className="text-[11px] text-emerald-600">Synchronized with academic timetable and redirecting...</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
            <div>
              <h1 className="text-lg font-bold text-slate-900">Deep Academic & School Scheduler</h1>
              <p className="text-xs text-slate-500">
                Configure timetable lessons, recurring multi-day periods, or institutional campus events.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setScheduleType("lesson")}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  scheduleType === "lesson" ? "bg-white text-teal-800 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <BookOpen className="h-4 w-4 text-teal-600" /> Single Timetable Lesson
              </button>
              <button
                type="button"
                onClick={() => setScheduleType("recurring")}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  scheduleType === "recurring" ? "bg-white text-teal-800 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Repeat className="h-4 w-4 text-teal-600" /> Recurring Lesson Cycle
              </button>
              <button
                type="button"
                onClick={() => setScheduleType("event")}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  scheduleType === "event" ? "bg-white text-teal-800 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Calendar className="h-4 w-4 text-teal-600" /> School Event / Milestone
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Lesson & Course Context */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <BookOpen className="h-4 w-4" /> 1. Subject & Title Specification
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="md:col-span-2">
                    <label className="block text-slate-600 font-semibold mb-1">
                      Session Title <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Mathematics 7 - Algebraic Geometry"
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Subject / Curriculum Course</label>
                    <select
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    >
                      <option>Mathematics 7</option>
                      <option>General Science 7</option>
                      <option>English Literature 7</option>
                      <option>World History 7</option>
                      <option>Robotics & Mechatronics</option>
                      <option>AP Calculus BC</option>
                      <option>Organic Chemistry</option>
                      <option>Physical Education</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Target Class Section</label>
                    <select
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-semibold"
                    >
                      {INITIAL_CLASSES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name} ({c.gradeLevel})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Instructor / Faculty Member</label>
                    <select
                      value={teacher}
                      onChange={(e) => setTeacher(e.target.value)}
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
                    <label className="block text-slate-600 font-semibold mb-1">Campus Room / Facility</label>
                    <input
                      type="text"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Timing & Recurrence */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Clock className="h-4 w-4" /> 2. Schedule Timing & Recurrence
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Date / Start Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Start Time</label>
                    <select
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-semibold"
                    >
                      <option>08:00 AM</option>
                      <option>08:30 AM</option>
                      <option>09:00 AM</option>
                      <option>09:30 AM</option>
                      <option>10:00 AM</option>
                      <option>10:30 AM</option>
                      <option>11:00 AM</option>
                      <option>11:30 AM</option>
                      <option>12:00 PM</option>
                      <option>12:30 PM</option>
                      <option>01:00 PM</option>
                      <option>02:00 PM</option>
                      <option>03:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">Duration</label>
                    <div className="flex items-center gap-2">
                      <select
                        value={durationHours}
                        onChange={(e) => setDurationHours(Number(e.target.value))}
                        className="w-1/2 h-9 px-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      >
                        <option value={0}>0 hours</option>
                        <option value={1}>1 hour</option>
                        <option value={2}>2 hours</option>
                        <option value={3}>3 hours</option>
                      </select>
                      <select
                        value={durationMinutes}
                        onChange={(e) => setDurationMinutes(Number(e.target.value))}
                        className="w-1/2 h-9 px-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500"
                      >
                        <option value={0}>0 mins</option>
                        <option value={15}>15 mins</option>
                        <option value={30}>30 mins</option>
                        <option value={45}>45 mins</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Recurrence Days Selector */}
                {scheduleType === "recurring" && (
                  <div className="pt-2 animate-in fade-in">
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Weekly Recurring Days
                    </label>
                    <div className="flex items-center gap-2">
                      {daysOfWeek.map((day) => (
                        <button
                          key={day.dayIndex}
                          type="button"
                          onClick={() => toggleDay(day.dayIndex)}
                          className={`h-8 w-11 rounded-lg text-xs font-bold transition-all ${
                            selectedDays.includes(day.dayIndex)
                              ? "bg-teal-600 text-white shadow-xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {day.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Section 3: Visual Color Tag & Online Links */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Palette className="h-4 w-4" /> 3. Visual Color Palette & Virtual Classroom
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-600 font-semibold mb-1.5">Calendar Badge Color</label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {(["teal", "orange", "slate", "peach", "navy", "purple", "green"] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setColor(c)}
                          className={`h-7 px-3 rounded-lg text-[11px] font-bold capitalize transition-all border ${
                            color === c
                              ? "ring-2 ring-teal-500 ring-offset-1 border-transparent text-white bg-slate-900"
                              : "border-slate-200 text-slate-700 bg-slate-50"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 font-semibold mb-1">
                      Virtual Classroom Link (Google Meet / Zoom)
                    </label>
                    <input
                      type="url"
                      placeholder="https://meet.google.com/xyz-abcd-efg"
                      value={virtualLink}
                      onChange={(e) => setVirtualLink(e.target.value)}
                      className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 font-mono text-[11px]"
                    />
                  </div>
                </div>

                {/* Visibility Checkboxes */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-700 font-medium">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleToStudents}
                      onChange={(e) => setVisibleToStudents(e.target.checked)}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span>Visible to Students</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleToGuardians}
                      onChange={(e) => setVisibleToGuardians(e.target.checked)}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span>Visible to Guardians / Parents</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={visibleToFaculty}
                      onChange={(e) => setVisibleToFaculty(e.target.checked)}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span>Visible to Faculty / Instructors</span>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <Link href="/calendar">
                  <Button variant="outline" size="sm" type="button" className="text-xs">
                    Cancel
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 text-xs shadow-xs"
                >
                  <Save className="h-3.5 w-3.5" />
                  {isSubmitting ? "Saving Schedule..." : "Confirm & Schedule Lesson"}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
