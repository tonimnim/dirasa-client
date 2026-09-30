"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/layout/AppSidebar";
import {
  Calendar,
  Clock,
  Settings,
  RotateCw,
  GraduationCap,
  User,
  Users,
  UserCheck,
  CreditCard,
  MoreVertical,
  Play,
  CalendarDays,
  Repeat,
  Cake,
  Eye,
  ArrowRight,
  MessageSquare,
  ChevronRight,
  ExternalLink,
  X,
  CheckCircle2,
  BookOpen,
  MapPin,
  Send,
  HelpCircle,
  FileText,
  Palette,
} from "lucide-react";

export default function DreamClassDashboard() {
  const [timelineSegment, setTimelineSegment] = useState<"Past" | "Now" | "Next">("Now");
  const [showBirthdays, setShowBirthdays] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Dynamic School Events
  const [events, setEvents] = useState([
    {
      id: "ev-1",
      title: "Midweek School Meeting",
      date: "09/30/2026",
      time: "2:00 PM - 3:00 PM",
      location: "Main Hall",
      isRecurring: true,
      hasAttendees: true,
      color: "salmon",
      colorName: "red-300",
      description: "Weekly staff & student assembly to review weekly academic milestones.",
    },
    {
      id: "ev-2",
      title: "Science Fair Exhibition",
      date: "09/30/2026",
      time: "3:30 PM - 5:00 PM",
      location: "Auditorium",
      isRecurring: false,
      hasAttendees: true,
      color: "periwinkle",
      colorName: "purple-400",
      description: "Students will showcase their science projects and experiments to peers,...",
    },
  ]);

  // New Event Form State (Screenshot 6)
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDesc, setNewEventDesc] = useState("");
  const [newEventDate, setNewEventDate] = useState("2026-09-30");
  const [newEventStartTime, setNewEventStartTime] = useState("10:30 AM");
  const [newEventDurationHours, setNewEventDurationHours] = useState<number | "">("");
  const [newEventDurationMinutes, setNewEventDurationMinutes] = useState(15);
  const [newEventColor, setNewEventColor] = useState("purple-400");
  const [newEventVisibleStudents, setNewEventVisibleStudents] = useState(true);
  const [newEventVisibleTeachers, setNewEventVisibleTeachers] = useState(true);
  const [isRecurringEvent, setIsRecurringEvent] = useState(false);

  // In-App Chat State
  const [chatMessages, setChatMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    {
      sender: "bot",
      text: "Hello Moses! Welcome to Redco Academy. How can I help you manage your school operations today?",
    },
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputMsg("");

    setTimeout(() => {
      let reply = "I can guide you through student enrollment, class setups, fee schedules, or timetable creation.";
      if (userText.toLowerCase().includes("grade") || userText.toLowerCase().includes("report")) {
        reply = "You can view, enter marks, and generate standardized multi-country report cards in the Grading hub (/grading).";
      } else if (userText.toLowerCase().includes("fee") || userText.toLowerCase().includes("invoice")) {
        reply = "The Fees & Invoicing hub (/fees) manages 10 overdue invoices totaling $33,600.00, supporting direct M-Pesa STK push and Paystack online checkout.";
      } else if (userText.toLowerCase().includes("student")) {
        reply = "You have 16 enrolled students across 11 classes. Head over to the Students directory (/students) to view complete 360 profiles and safeguarding records.";
      }
      setChatMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 800);
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    setEvents((prev) => [
      ...prev,
      {
        id: `ev-${Date.now()}`,
        title: newEventTitle,
        date: newEventDate,
        time: `${newEventStartTime} (${newEventDurationHours || 0}h ${newEventDurationMinutes}m)`,
        location: "Main Hall",
        isRecurring: isRecurringEvent,
        hasAttendees: true,
        color: "periwinkle",
        colorName: newEventColor,
        description: newEventDesc,
      },
    ]);
    setIsAddEventModalOpen(false);
    setNewEventTitle("");
    setNewEventDesc("");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-800 font-sans">
      {/* Exact DreamClass Left Sidebar */}
      <AppSidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#fafafa]">
        {/* Top Header with Free Trial Banner */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
          <h1 className="text-xl font-bold text-[#1e3a34]">Dashboard</h1>

          {/* Trial Banner */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 bg-[#1e3a8a] text-white text-xs px-4 py-1.5 rounded-md font-medium shadow-sm">
              <span>You have 30 days left in your free trial.</span>
              <button
                onClick={() => alert("Free trial extended for Redco Academy.")}
                className="bg-[#172554] hover:bg-[#0f172a] text-white px-2.5 py-1 rounded text-[11px] font-semibold transition-colors"
              >
                Upgrade
              </button>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="bg-[#10b981] hover:bg-[#059669] text-white px-3 py-1 rounded text-[11px] font-bold transition-colors shadow-xs"
              >
                Book Demo!
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Main Content Area */}
        <main className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left & Center Main Column (approx 8.5 cols) */}
            <div className="xl:col-span-8 space-y-6">
              {/* Top Overview Cards Strip */}
              <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex flex-wrap lg:flex-nowrap items-center justify-between gap-6">
                {/* School Year Card */}
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-medium">School Year</span>
                  <div className="flex items-center gap-2">
                    <div className="bg-[#e6f8f1] text-[#0d9488] px-3.5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-[#ccfbf1]">
                      <span>Sep 2026 - Jul 2027</span>
                      <span className="text-[11px] font-normal text-slate-500">Duration 10 Months</span>
                      <Link href="/settings" className="text-slate-400 hover:text-slate-700 ml-1">
                        <Settings className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Studies Card */}
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-medium">Studies</span>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/classes"
                      className="bg-[#cbf4e5] hover:bg-[#b7ebd7] text-[#065f46] px-3.5 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors border border-[#a7f3d0]"
                    >
                      <span className="text-lg">11</span>
                      <GraduationCap className="h-4 w-4" />
                      <span className="text-xs font-semibold">Classes</span>
                    </Link>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-0.5">
                    Curriculum:{" "}
                    <Link href="/curriculum" className="text-[#0284c7] hover:underline font-semibold">
                      44 Courses
                    </Link>
                  </div>
                </div>

                {/* People Card */}
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 font-medium">People</span>
                  <div className="flex items-center gap-1.5">
                    <Link
                      href="/students"
                      className="bg-[#e0f2fe] hover:bg-[#bae6fd] text-[#0369a1] px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <span className="text-sm">16</span>
                      <User className="h-3.5 w-3.5" />
                      <span>Students</span>
                    </Link>

                    <Link
                      href="/families"
                      className="bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#334155] px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <span className="text-sm">15</span>
                      <Users className="h-3.5 w-3.5" />
                      <span>Families</span>
                    </Link>

                    <Link
                      href="/teachers"
                      className="bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#475569] px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors border border-slate-200"
                    >
                      <span className="text-sm">10</span>
                      <UserCheck className="h-3.5 w-3.5" />
                      <span>Teachers</span>
                    </Link>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-0.5">
                    Admissions:{" "}
                    <Link href="/admissions" className="text-[#0284c7] hover:underline font-semibold">
                      1 New Applications
                    </Link>
                  </div>
                </div>

                {/* Remove Sample Data Link */}
                <div className="self-start pt-1">
                  <button
                    onClick={() => setIsResetModalOpen(true)}
                    className="text-[11px] text-[#0d9488] hover:text-[#0f766e] flex items-center gap-1 font-medium hover:underline"
                  >
                    <RotateCw className="h-3 w-3" /> Remove sample data
                  </button>
                </div>
              </div>

              {/* Timeline / Today Schedule Filter Bar */}
              <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Segmented Buttons */}
                  <div className="flex items-center rounded-lg border border-slate-300 p-0.5 bg-slate-50 text-xs font-semibold">
                    {(["Past", "Now", "Next"] as const).map((seg) => (
                      <button
                        key={seg}
                        onClick={() => setTimelineSegment(seg)}
                        className={`px-3 py-1 rounded transition-colors ${
                          timelineSegment === seg
                            ? "bg-[#cbf4e5] text-[#065f46] font-bold shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        {seg}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    01:19AM{" "}
                    <RotateCw
                      onClick={() => setTimelineSegment("Now")}
                      className="h-3 w-3 text-slate-400 hover:text-slate-700 cursor-pointer"
                    />
                  </span>
                </div>

                {/* Range Slider Visualization */}
                <div className="flex-1 max-w-md hidden md:flex flex-col items-center px-4">
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <span className="text-slate-400 font-normal">Today</span> Oct 1, 2026
                  </div>
                  <div className="w-full relative mt-1 flex items-center">
                    <div className="w-full h-1 bg-slate-200 rounded-full" />
                    <div
                      className={`absolute h-2.5 w-2.5 rounded-full bg-slate-800 transition-all ${
                        timelineSegment === "Past" ? "left-[1%]" : timelineSegment === "Now" ? "left-[3%]" : "left-[6%]"
                      }`}
                    />
                  </div>
                  <div className="w-full flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>09/30/2026</span>
                    <span>07/30/2027</span>
                  </div>
                </div>

                {/* Full Calendar Button */}
                <Link
                  href="/calendar"
                  className="bg-[#2a9d8f] hover:bg-[#21867a] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs"
                >
                  View full calendar
                </Link>
              </div>

              {/* Dynamic Hero Courses Widget based on Past / Now / Next */}
              {timelineSegment === "Now" && (
                <div className="bg-[#fcf2f4] rounded-xl border border-rose-100/90 p-8 flex flex-col md:flex-row items-center gap-8 shadow-xs">
                  {/* Illustration Box */}
                  <div className="relative w-44 h-36 shrink-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 200 160"
                      className="w-full h-full text-slate-400 stroke-current fill-none stroke-[1.5]"
                    >
                      <path d="M40 100 C60 90, 95 90, 100 100 C105 90, 140 90, 160 100 L160 130 C140 120, 105 120, 100 130 C95 120, 60 120, 40 130 Z" />
                      <path d="M100 100 L100 130" />
                      <ellipse cx="60" cy="50" rx="20" ry="8" transform="rotate(-30 60 50)" />
                      <ellipse cx="60" cy="50" rx="20" ry="8" transform="rotate(30 60 50)" />
                      <circle cx="60" cy="50" r="3" className="fill-current" />
                      <path d="M140 40 L140 60 A6 6 0 1 1 134 54 L134 35 L155 30 L155 50 A6 6 0 1 1 149 44" />
                      <path d="M110 30 L118 45 L102 70 L126 70 L110 30" />
                      <rect x="75" y="20" width="18" height="18" rx="2" />
                      <circle cx="81" cy="26" r="2" />
                      <path d="M77 34 L83 29 L91 35" />
                    </svg>
                  </div>

                  <div className="space-y-2 text-center md:text-start">
                    <h3 className="text-base font-bold text-slate-800">
                      No courses in progress.
                    </h3>
                    <button
                      onClick={() => setTimelineSegment("Next")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8b5cf6] hover:text-[#7c3aed] transition-colors group cursor-pointer"
                    >
                      <span>&rarr; Coming up next: 6 scheduled courses</span>
                    </button>
                  </div>
                </div>
              )}

              {timelineSegment === "Past" && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-teal-600" />
                      <h3 className="text-sm font-bold text-slate-900">
                        Earlier Today: 2 Periods Completed
                      </h3>
                    </div>
                    <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      Attendance Recorded
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Period 1 &bull; 08:00 - 08:45 AM</span>
                      <h4 className="font-bold text-slate-900">Middle School Mathematics 7</h4>
                      <p className="text-[11px] text-slate-500">Ms. Sarah Wanjiru &bull; Grade 7 - Blue (Room 101)</p>
                    </div>

                    <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Period 2 &bull; 08:50 - 09:35 AM</span>
                      <h4 className="font-bold text-slate-900">English Literature & Composition</h4>
                      <p className="text-[11px] text-slate-500">Ms. Amina Mansoor &bull; Grade 7 - Blue (Room 101)</p>
                    </div>
                  </div>
                </div>
              )}

              {timelineSegment === "Next" && (
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-purple-600" />
                      <h3 className="text-sm font-bold text-slate-900">
                        Coming Up Next: 6 Scheduled Courses
                      </h3>
                    </div>
                    <Link href="/timetable" className="text-xs font-semibold text-purple-600 hover:underline">
                      Full Timetable Grid &rarr;
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-lg border border-purple-100 bg-purple-50/40 space-y-1">
                      <span className="text-[10px] font-bold text-purple-700 uppercase">Period 3 &bull; 09:55 AM</span>
                      <h4 className="font-bold text-slate-900 truncate">Pre-Algebra 8</h4>
                      <p className="text-[11px] text-slate-500">Ms. Sarah Wanjiru &bull; Room 201</p>
                    </div>

                    <div className="p-3 rounded-lg border border-purple-100 bg-purple-50/40 space-y-1">
                      <span className="text-[10px] font-bold text-purple-700 uppercase">Period 3 &bull; 09:55 AM</span>
                      <h4 className="font-bold text-slate-900 truncate">Physical Science 8</h4>
                      <p className="text-[11px] text-slate-500">Dr. Fatima El-Khatib &bull; Lab 3</p>
                    </div>

                    <div className="p-3 rounded-lg border border-purple-100 bg-purple-50/40 space-y-1">
                      <span className="text-[10px] font-bold text-purple-700 uppercase">Period 3 &bull; 09:55 AM</span>
                      <h4 className="font-bold text-slate-900 truncate">Introductory Robotics</h4>
                      <p className="text-[11px] text-slate-500">Mr. Mason Harrington &bull; Makerspace</p>
                    </div>

                    <div className="p-3 rounded-lg border border-purple-100 bg-purple-50/40 space-y-1">
                      <span className="text-[10px] font-bold text-purple-700 uppercase">Period 4 &bull; 10:45 AM</span>
                      <h4 className="font-bold text-slate-900 truncate">World History 7</h4>
                      <p className="text-[11px] text-slate-500">Mr. David Okeke &bull; Room 101</p>
                    </div>

                    <div className="p-3 rounded-lg border border-purple-100 bg-purple-50/40 space-y-1">
                      <span className="text-[10px] font-bold text-purple-700 uppercase">Period 4 &bull; 10:45 AM</span>
                      <h4 className="font-bold text-slate-900 truncate">Studio Art 9</h4>
                      <p className="text-[11px] text-slate-500">Mr. Alex Mwangi &bull; Studio 2</p>
                    </div>

                    <div className="p-3 rounded-lg border border-purple-100 bg-purple-50/40 space-y-1">
                      <span className="text-[10px] font-bold text-purple-700 uppercase">Period 4 &bull; 10:45 AM</span>
                      <h4 className="font-bold text-slate-900 truncate">Introductory French 7</h4>
                      <p className="text-[11px] text-slate-500">Mr. Jean-Luc Mbida &bull; Room 102</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Financial Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-slate-700" />
                    <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Financial
                    </h2>
                  </div>
                  <Link href="/fees" className="text-xs font-semibold text-teal-700 hover:underline">
                    View Invoicing Center &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Payments */}
                  <Link
                    href="/fees"
                    className="bg-[#def7ec] border border-[#bcf0da] rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-emerald-400 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-700 font-semibold">
                      <span>0 Payments</span>
                      <button className="text-slate-500 hover:text-slate-800">
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="py-2">
                      <div className="text-2xl font-black text-slate-900 tracking-tight">$0.00</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">Collected &middot; Last 30 days</div>
                    </div>
                  </Link>

                  {/* Card 2: Outstanding */}
                  <Link
                    href="/fees"
                    className="bg-[#fef9c3] border border-[#fef08a] rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-yellow-400 transition-colors"
                  >
                    <div className="text-xs text-slate-700 font-semibold">
                      10 Outstanding Invoices
                    </div>
                    <div className="py-2">
                      <div className="text-2xl font-black text-slate-900 tracking-tight">$33,600.00</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">Issued until today</div>
                    </div>
                  </Link>

                  {/* Card 3: Overdue */}
                  <Link
                    href="/fees"
                    className="bg-[#ffe4e6] border border-[#fecdd3] rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-rose-400 transition-colors"
                  >
                    <div className="text-xs text-slate-700 font-semibold">
                      10 Overdue Invoices
                    </div>
                    <div className="py-2">
                      <div className="text-2xl font-black text-slate-900 tracking-tight">$33,600.00</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">Due until today</div>
                    </div>
                  </Link>

                  {/* Card 4: Uninvoiced Fees */}
                  <Link
                    href="/fees"
                    className="bg-[#e0f2fe] border border-[#bae6fd] rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-sky-400 transition-colors"
                  >
                    <div className="text-xs text-slate-700 font-semibold">
                      8 Uninvoiced Fees
                    </div>
                    <div className="py-2">
                      <div className="text-2xl font-black text-slate-900 tracking-tight">$9,600.00</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">Due until end of month</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Video Demo, School Events, Birthdays (approx 3.5 cols) */}
            <div className="xl:col-span-4 space-y-6">
              {/* Quick Demo Video Card */}
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="bg-white rounded-xl border border-slate-200/80 p-3 shadow-xs space-y-2.5 cursor-pointer hover:border-teal-400 transition-all group"
              >
                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
                  <div className="absolute top-2 start-2 text-[10px] text-white/90 bg-black/60 px-2 py-0.5 rounded">
                    Admin Dashboard Overview
                  </div>
                  <div className="h-11 w-11 rounded-full bg-white/90 group-hover:bg-white text-slate-900 flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                    <Play className="h-5 w-5 fill-slate-900 text-slate-900 ms-0.5" />
                  </div>
                  <div className="absolute bottom-2 end-2 text-[10px] font-mono font-bold bg-black/70 text-white px-1.5 py-0.5 rounded">
                    13:55
                  </div>
                </div>

                <div className="flex items-start gap-2.5 px-1 pt-1">
                  <div className="h-7 w-7 rounded-full bg-[#0d9488] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    D
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-teal-700 transition-colors">
                      DreamClass quick demo
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      How to effortlessly manage your admin operations, from student enrollment to grading...
                    </p>
                  </div>
                </div>
              </div>

              {/* School Events Card */}
              <div className="bg-[#eafaf4] border border-[#a7f3d0] rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center gap-1.5 text-slate-800">
                  <CalendarDays className="h-4 w-4 text-[#065f46]" />
                  <h3 className="text-xs font-bold uppercase tracking-wide text-[#065f46]">
                    School Events
                  </h3>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] text-slate-600 font-medium">Next 6 days events</span>

                  {events.map((ev) => (
                    <div
                      key={ev.id}
                      className={`rounded-lg p-3 shadow-xs space-y-2 border ${
                        ev.color === "salmon"
                          ? "bg-[#fda4af] text-slate-900 border-rose-300"
                          : "bg-[#818cf8] text-white border-indigo-400"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold leading-tight">{ev.title}</span>
                        <div className={`flex items-center gap-1 ${ev.color === "salmon" ? "text-slate-700" : "text-white/80"}`}>
                          {ev.isRecurring && <Repeat className="h-3 w-3" />}
                          {ev.hasAttendees && <Users className="h-3 w-3" />}
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 text-[11px] font-medium ${ev.color === "salmon" ? "text-slate-800" : "text-white/90"}`}>
                        <Clock className="h-3 w-3" />
                        <span>
                          {ev.date} {ev.time}
                        </span>
                      </div>
                      {ev.description && (
                        <p className={`text-[10px] line-clamp-2 leading-tight ${ev.color === "salmon" ? "text-slate-700" : "text-white/80"}`}>
                          {ev.description}
                        </p>
                      )}
                      {ev.location && (
                        <div className={`flex items-center gap-1 text-[10px] ${ev.color === "salmon" ? "text-slate-700" : "text-white/80"}`}>
                          <MapPin className="h-3 w-3" />
                          <span>{ev.location}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-1 text-[11px] text-center text-[#047857] font-semibold">
                  <button
                    onClick={() => {
                      setIsRecurringEvent(false);
                      setIsAddEventModalOpen(true);
                    }}
                    className="hover:underline cursor-pointer"
                  >
                    Add event
                  </button>{" "}
                  |{" "}
                  <button
                    onClick={() => {
                      setIsRecurringEvent(true);
                      setIsAddEventModalOpen(true);
                    }}
                    className="hover:underline cursor-pointer"
                  >
                    Add recurring event
                  </button>
                </div>
              </div>

              {/* Student Birthdays Card */}
              <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-800">
                    <Cake className="h-4 w-4 text-pink-500" />
                    <h3 className="text-xs font-bold text-slate-900">Student Birthdays</h3>
                  </div>
                  <button
                    onClick={() => setShowBirthdays(!showBirthdays)}
                    className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                </div>

                {showBirthdays && (
                  <div className="space-y-4 text-xs">
                    {/* Today */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-700">Today</span>
                      <p className="text-[11px] text-slate-400 italic">No student birthdays today</p>
                    </div>

                    {/* Upcoming */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-700">Upcoming</span>
                      <div className="text-[10px] text-slate-400">10/08 - Thursday</div>
                      <Link
                        href="/students"
                        className="flex items-center gap-2 pt-0.5 hover:bg-slate-50 p-1 rounded transition-colors"
                      >
                        <div className="h-6 w-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-[10px]">
                          MH
                        </div>
                        <span className="font-semibold text-slate-800 text-[11px]">Mason Harrington</span>
                      </Link>
                    </div>

                    {/* Recent */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-700">Recent</span>

                      <div className="text-[10px] text-slate-400">09/28 - Monday</div>
                      <Link
                        href="/students"
                        className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded transition-colors"
                      >
                        <div className="h-6 w-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-[10px]">
                          CB
                        </div>
                        <span className="font-medium text-slate-800 text-[11px]">Caleb Bennett</span>
                      </Link>

                      <div className="text-[10px] text-slate-400 pt-1">09/29 - Tuesday</div>
                      <Link
                        href="/students"
                        className="flex items-center gap-2 hover:bg-slate-50 p-1 rounded transition-colors"
                      >
                        <div className="h-6 w-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-[10px]">
                          AO
                        </div>
                        <span className="font-medium text-slate-800 text-[11px]">Adrian Orchard</span>
                      </Link>

                      <div className="text-[10px] text-slate-400 pt-1">09/30 - Wednesday</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Chat Bubble (Bottom Right) */}
      <div className="fixed bottom-5 end-5 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="h-12 w-12 rounded-full bg-[#0284c7] hover:bg-[#0369a1] text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer"
          title="Support & In-App Help"
        >
          {isChatOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
        </button>
      </div>

      {/* Support Chat Drawer */}
      {isChatOpen && (
        <div className="fixed bottom-20 end-5 w-96 max-w-[calc(100vw-2rem)] h-[480px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className="p-4 bg-[#0d1527] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-xs">
                DC
              </div>
              <div>
                <h4 className="text-xs font-bold">DreamClass In-App Support</h4>
                <p className="text-[10px] text-teal-300">Live school assistant</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-slate-50">
            {chatMessages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-xs ${
                    m.sender === "user"
                      ? "bg-teal-600 text-white font-medium"
                      : "bg-white text-slate-800 border border-slate-200 shadow-xs"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about DreamClass..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="h-9 w-9 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center justify-center shrink-0 cursor-pointer"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Video Demo Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-[#0d1527] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4 text-teal-400" />
                <h3 className="font-bold text-sm">DreamClass Admin Overview (13:55)</h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="aspect-video bg-slate-900 relative flex items-center justify-center p-6 text-center text-white">
              <div className="space-y-3 max-w-md">
                <div className="h-16 w-16 rounded-full bg-teal-500 mx-auto flex items-center justify-center shadow-lg">
                  <Play className="h-8 w-8 fill-white text-white ms-1" />
                </div>
                <h4 className="text-base font-bold">DreamClass System Walkthrough</h4>
                <p className="text-xs text-slate-300">
                  Comprehensive tour of student admissions, timetable scheduling, multi-scale gradebook, M-Pesa STK fees, and safeguarding controls.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsVideoModalOpen(false)}
                    className="bg-white text-slate-900 font-bold text-xs px-4 py-2 rounded-lg hover:bg-slate-100"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add School Event Modal (matching Screenshot 6) */}
      {isAddEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">
                {isRecurringEvent ? "Add Recurring School Event" : "Add School Event"}
              </h3>
              <button
                onClick={() => setIsAddEventModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Title*</label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Science Fair Exhibition"
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Description</label>
                <textarea
                  rows={2}
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  placeholder="Event agenda or notes..."
                  className="w-full p-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Date*</label>
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Start Time*</label>
                <div className="relative">
                  <input
                    type="text"
                    value={newEventStartTime}
                    onChange={(e) => setNewEventStartTime(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                  <Clock className="h-4 w-4 text-slate-400 absolute end-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Duration*</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500">Hours</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={newEventDurationHours}
                      onChange={(e) => setNewEventDurationHours(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white mt-0.5"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Minutes</span>
                    <input
                      type="number"
                      value={newEventDurationMinutes}
                      onChange={(e) => setNewEventDurationMinutes(Number(e.target.value))}
                      className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white mt-0.5"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Color*</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={newEventColor}
                    onChange={(e) => setNewEventColor(e.target.value)}
                    className="w-full h-10 ps-3 pe-10 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                  <span className="absolute end-3 h-5 w-5 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    <Palette className="h-3 w-3" />
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEventVisibleStudents}
                    onChange={(e) => setNewEventVisibleStudents(e.target.checked)}
                    className="h-4 w-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                  />
                  <span>Visible to students</span>
                </label>

                <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEventVisibleTeachers}
                    onChange={(e) => setNewEventVisibleTeachers(e.target.checked)}
                    className="h-4 w-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                  />
                  <span>Visible to teachers</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddEventModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-[#0d9488] hover:bg-[#0f766e] shadow-xs"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove Sample Data Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden p-6 space-y-4 text-center">
            <div className="h-12 w-12 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
              <RotateCw className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Remove Sample Data?</h3>
              <p className="text-xs text-slate-500 mt-1">
                This will clear all pre-populated DreamClass demo courses, students, and invoices so you can import your school&apos;s real records.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="flex-1 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Keep Sample Data
              </button>
              <button
                onClick={() => {
                  alert("Sample data cleared. Clean slate ready for production import.");
                  setIsResetModalOpen(false);
                }}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
