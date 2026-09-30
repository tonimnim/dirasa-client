"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
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
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      {/* Exact DreamClass Left Sidebar */}
      <AppSidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        {/* App Header with Breadcrumbs, theme toggle, and actions */}
        <AppHeader
          title="Dashboard"
          subtitle="Sep 2026 - Jul 2027 • Redco Academy"
          badge="Academic Year 2026/27"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
          actionButton={
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#10b981] hover:bg-[#059669] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Play className="h-3.5 w-3.5 fill-white" /> Book Demo
            </button>
          }
        />

        {/* Dashboard Main Content Area */}
        <main className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left & Center Main Column (approx 8.5 cols) */}
            <div className="xl:col-span-8 space-y-6">
              {/* Top Overview Cards Strip */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-wrap lg:flex-nowrap items-center justify-between gap-6">
                {/* School Year Card */}
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">School Year</span>
                  <div className="flex items-center gap-2">
                    <div className="bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 px-3.5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border border-teal-200 dark:border-teal-800">
                      <span>Sep 2026 - Jul 2027</span>
                      <span className="text-[11px] font-normal text-slate-600 dark:text-slate-400">Duration 10 Months</span>
                      <Link href="/settings" className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 ml-1 cursor-pointer">
                        <Settings className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Studies Card */}
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Studies</span>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/classes"
                      className="bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 px-3.5 py-2 rounded-lg text-sm font-bold flex items-center gap-1.5 transition-colors border border-emerald-200 dark:border-emerald-800 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      <span className="text-lg">11</span>
                      <GraduationCap className="h-4 w-4" />
                      <span className="text-xs font-semibold">Classes</span>
                    </Link>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-0.5">
                    Curriculum:{" "}
                    <Link href="/curriculum" className="text-sky-600 dark:text-sky-400 hover:underline font-semibold cursor-pointer">
                      44 Courses
                    </Link>
                  </div>
                </div>

                {/* People Card */}
                <div className="space-y-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">People</span>
                  <div className="flex items-center gap-1.5">
                    <Link
                      href="/students"
                      className="bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900/50 text-sky-800 dark:text-sky-300 px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors border border-sky-200 dark:border-sky-800 cursor-pointer"
                    >
                      <span className="text-sm">16</span>
                      <User className="h-3.5 w-3.5" />
                      <span>Students</span>
                    </Link>

                    <Link
                      href="/families"
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                    >
                      <span className="text-sm">15</span>
                      <Users className="h-3.5 w-3.5" />
                      <span>Families</span>
                    </Link>

                    <Link
                      href="/teachers"
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
                    >
                      <span className="text-sm">10</span>
                      <UserCheck className="h-3.5 w-3.5" />
                      <span>Teachers</span>
                    </Link>
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-0.5">
                    Admissions:{" "}
                    <Link href="/admissions" className="text-sky-600 dark:text-sky-400 hover:underline font-semibold cursor-pointer">
                      1 New Applications
                    </Link>
                  </div>
                </div>

                {/* Remove Sample Data Link */}
                <div className="self-start pt-1">
                  <button
                    onClick={() => setIsResetModalOpen(true)}
                    className="text-[11px] text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 flex items-center gap-1 font-medium hover:underline cursor-pointer"
                  >
                    <RotateCw className="h-3 w-3" /> Remove sample data
                  </button>
                </div>
              </div>

              {/* Timeline / Today Schedule Filter Bar */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Segmented Buttons */}
                  <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800 text-xs font-semibold">
                    {(["Past", "Now", "Next"] as const).map((seg) => (
                      <button
                        key={seg}
                        onClick={() => setTimelineSegment(seg)}
                        className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                          timelineSegment === seg
                            ? "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 font-bold shadow-xs"
                            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {seg}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono flex items-center gap-1">
                    01:19AM{" "}
                    <RotateCw
                      onClick={() => setTimelineSegment("Now")}
                      className="h-3 w-3 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                    />
                  </span>
                </div>

                {/* Range Slider Visualization */}
                <div className="flex-1 max-w-md hidden md:flex flex-col items-center px-4">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <span className="text-slate-500 dark:text-slate-400 font-normal">Today</span> Oct 1, 2026
                  </div>
                  <div className="w-full relative mt-1 flex items-center">
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
                    <div
                      className={`absolute h-2.5 w-2.5 rounded-full bg-slate-900 dark:bg-sky-400 transition-all ${
                        timelineSegment === "Past" ? "left-[1%]" : timelineSegment === "Now" ? "left-[3%]" : "left-[6%]"
                      }`}
                    />
                  </div>
                  <div className="w-full flex justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
                    <span>09/30/2026</span>
                    <span>07/30/2027</span>
                  </div>
                </div>

                {/* Full Calendar Button */}
                <Link
                  href="/calendar"
                  className="bg-[#2a9d8f] hover:bg-[#21867a] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  View full calendar
                </Link>
              </div>

              {/* Dynamic Hero Courses Widget based on Past / Now / Next */}
              {timelineSegment === "Now" && (
                <div className="bg-[#fcf2f4] dark:bg-rose-950/20 rounded-xl border border-rose-100/90 dark:border-rose-900/40 p-8 flex flex-col md:flex-row items-center gap-8 shadow-xs">
                  {/* Illustration Box */}
                  <div className="relative w-44 h-36 shrink-0 flex items-center justify-center">
                    <svg
                      viewBox="0 0 200 160"
                      className="w-full h-full text-slate-400 dark:text-slate-500 stroke-current fill-none stroke-[1.5]"
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
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                      No courses in progress.
                    </h3>
                    <button
                      onClick={() => setTimelineSegment("Next")}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors group cursor-pointer"
                    >
                      <span>&rarr; Coming up next: 6 scheduled courses</span>
                    </button>
                  </div>
                </div>
              )}

              {timelineSegment === "Past" && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Earlier Today: 2 Periods Completed
                      </h3>
                    </div>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      Attendance Recorded
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Period 1 &bull; 08:00 - 08:45 AM</span>
                      <h4 className="font-bold text-slate-900 dark:text-white">Middle School Mathematics 7</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">Ms. Sarah Wanjiru &bull; Grade 7 - Blue (Room 101)</p>
                    </div>

                    <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Period 2 &bull; 08:50 - 09:35 AM</span>
                      <h4 className="font-bold text-slate-900 dark:text-white">English Literature & Composition</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">Ms. Amina Mansoor &bull; Grade 7 - Blue (Room 101)</p>
                    </div>
                  </div>
                </div>
              )}

              {timelineSegment === "Next" && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Coming Up Next: 6 Scheduled Courses
                      </h3>
                    </div>
                    <Link href="/timetable" className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">
                      Full Timetable Grid &rarr;
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 space-y-1">
                      <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase">Period 3 &bull; 09:55 AM</span>
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">Pre-Algebra 8</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">Ms. Sarah Wanjiru &bull; Room 201</p>
                    </div>

                    <div className="p-3 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 space-y-1">
                      <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase">Period 3 &bull; 09:55 AM</span>
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">Physical Science 8</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">Dr. Fatima El-Khatib &bull; Lab 3</p>
                    </div>

                    <div className="p-3 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 space-y-1">
                      <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase">Period 3 &bull; 09:55 AM</span>
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">Introductory Robotics</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">Mr. Mason Harrington &bull; Makerspace</p>
                    </div>

                    <div className="p-3 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 space-y-1">
                      <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase">Period 4 &bull; 10:45 AM</span>
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">World History 7</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">Mr. David Okeke &bull; Room 101</p>
                    </div>

                    <div className="p-3 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 space-y-1">
                      <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase">Period 4 &bull; 10:45 AM</span>
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">Studio Art 9</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">Mr. Alex Mwangi &bull; Studio 2</p>
                    </div>

                    <div className="p-3 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 space-y-1">
                      <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase">Period 4 &bull; 10:45 AM</span>
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">Introductory French 7</h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">Mr. Jean-Luc Mbida &bull; Room 102</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Financial Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                      Financial
                    </h2>
                  </div>
                  <Link href="/fees" className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline cursor-pointer">
                    View Invoicing Center &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Payments */}
                  <Link
                    href="/fees"
                    className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-200 font-semibold">
                      <span>0 Payments</span>
                      <button className="text-slate-500 hover:text-slate-800 dark:hover:text-white">
                        <MoreVertical className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="py-2">
                      <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">$0.00</div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">Collected &middot; Last 30 days</div>
                    </div>
                  </Link>

                  {/* Card 2: Outstanding */}
                  <Link
                    href="/fees"
                    className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-amber-400 dark:hover:border-amber-600 transition-colors cursor-pointer"
                  >
                    <div className="text-xs text-slate-700 dark:text-slate-200 font-semibold">
                      10 Outstanding Invoices
                    </div>
                    <div className="py-2">
                      <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">$33,600.00</div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">Issued until today</div>
                    </div>
                  </Link>

                  {/* Card 3: Overdue */}
                  <Link
                    href="/fees"
                    className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-rose-400 dark:hover:border-rose-600 transition-colors cursor-pointer"
                  >
                    <div className="text-xs text-slate-700 dark:text-slate-200 font-semibold">
                      10 Overdue Invoices
                    </div>
                    <div className="py-2">
                      <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">$33,600.00</div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">Due until today</div>
                    </div>
                  </Link>

                  {/* Card 4: Uninvoiced Fees */}
                  <Link
                    href="/fees"
                    className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-xl p-4 flex flex-col justify-between shadow-xs hover:border-sky-400 dark:hover:border-sky-600 transition-colors cursor-pointer"
                  >
                    <div className="text-xs text-slate-700 dark:text-slate-200 font-semibold">
                      8 Uninvoiced Fees
                    </div>
                    <div className="py-2">
                      <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">$9,600.00</div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">Due until end of month</div>
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
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-3 shadow-xs space-y-2.5 cursor-pointer hover:border-teal-400 dark:hover:border-teal-500 transition-all group"
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
                  <div className="h-7 w-7 rounded-full bg-teal-600 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    D
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                      DreamClass quick demo
                    </h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-1">
                      How to effortlessly manage your admin operations, from student enrollment to grading...
                    </p>
                  </div>
                </div>
              </div>

              {/* School Events Card */}
              <div className="bg-emerald-50/60 dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 rounded-xl p-4 shadow-xs space-y-3">
                <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                  <CalendarDays className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
                    School Events
                  </h3>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium">Next 6 days events</span>

                  {events.map((ev) => (
                    <div
                      key={ev.id}
                      className={`rounded-lg p-3 shadow-xs space-y-2 border ${
                        ev.color === "salmon"
                          ? "bg-rose-200 dark:bg-rose-950 text-slate-900 dark:text-rose-100 border-rose-300 dark:border-rose-800"
                          : "bg-indigo-600 dark:bg-indigo-900 text-white border-indigo-500 dark:border-indigo-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold leading-tight">{ev.title}</span>
                        <div className={`flex items-center gap-1 ${ev.color === "salmon" ? "text-slate-700 dark:text-rose-200" : "text-white/80"}`}>
                          {ev.isRecurring && <Repeat className="h-3 w-3" />}
                          {ev.hasAttendees && <Users className="h-3 w-3" />}
                        </div>
                      </div>
                      <div className={`flex items-center gap-1.5 text-[11px] font-medium ${ev.color === "salmon" ? "text-slate-800 dark:text-rose-100" : "text-white/90"}`}>
                        <Clock className="h-3 w-3" />
                        <span>
                          {ev.date} {ev.time}
                        </span>
                      </div>
                      {ev.description && (
                        <p className={`text-[10px] line-clamp-2 leading-tight ${ev.color === "salmon" ? "text-slate-700 dark:text-rose-200" : "text-white/80"}`}>
                          {ev.description}
                        </p>
                      )}
                      {ev.location && (
                        <div className={`flex items-center gap-1 text-[10px] ${ev.color === "salmon" ? "text-slate-700 dark:text-rose-200" : "text-white/80"}`}>
                          <MapPin className="h-3 w-3" />
                          <span>{ev.location}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-1 text-[11px] text-center text-emerald-700 dark:text-emerald-400 font-semibold">
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
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                    <Cake className="h-4 w-4 text-pink-500" />
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">Student Birthdays</h3>
                  </div>
                  <button
                    onClick={() => setShowBirthdays(!showBirthdays)}
                    className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 cursor-pointer"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                </div>

                {showBirthdays && (
                  <div className="space-y-4 text-xs">
                    {/* Today */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Today</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">No student birthdays today</p>
                    </div>

                    {/* Upcoming */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Upcoming</span>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">10/08 - Thursday</div>
                      <Link
                        href="/students/std-001"
                        className="flex items-center gap-2 pt-0.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 p-1 rounded transition-colors cursor-pointer"
                      >
                        <div className="h-6 w-6 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold text-[10px]">
                          MH
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">Mason Harrington</span>
                      </Link>
                    </div>

                    {/* Recent */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Recent</span>

                      <div className="text-[10px] text-slate-500 dark:text-slate-400">09/28 - Monday</div>
                      <Link
                        href="/students/std-002"
                        className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 p-1 rounded transition-colors cursor-pointer"
                      >
                        <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-[10px]">
                          CB
                        </div>
                        <span className="font-medium text-slate-800 dark:text-slate-200 text-[11px]">Caleb Bennett</span>
                      </Link>

                      <div className="text-[10px] text-slate-500 dark:text-slate-400 pt-1">09/29 - Tuesday</div>
                      <Link
                        href="/students/std-003"
                        className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/60 p-1 rounded transition-colors cursor-pointer"
                      >
                        <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-[10px]">
                          AO
                        </div>
                        <span className="font-medium text-slate-800 dark:text-slate-200 text-[11px]">Adrian Orchard</span>
                      </Link>

                      <div className="text-[10px] text-slate-500 dark:text-slate-400 pt-1">09/30 - Wednesday</div>
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
          className="h-12 w-12 rounded-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          title="Support & In-App Help"
          aria-label="Support & In-App Help"
        >
          {isChatOpen ? <X className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
        </button>
      </div>

      {/* Support Chat Drawer */}
      {isChatOpen && (
        <div className="fixed bottom-20 end-5 w-96 max-w-[calc(100vw-2rem)] h-[480px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden z-50 animate-in slide-in-from-bottom-5 duration-200">
          <div className="p-4 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-xs">
                DC
              </div>
              <div>
                <h4 className="text-xs font-bold">DreamClass In-App Support</h4>
                <p className="text-[10px] text-teal-300">Live school assistant</p>
              </div>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white cursor-pointer p-1">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs bg-slate-50 dark:bg-slate-950">
            {chatMessages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-xs ${
                    m.sender === "user"
                      ? "bg-teal-600 text-white font-medium shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-xs"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendChat} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask anything about DreamClass..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="h-9 w-9 bg-teal-600 hover:bg-teal-700 text-white rounded-lg flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Video Demo Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4 text-teal-400" />
                <h3 className="font-bold text-sm">DreamClass Admin Overview (13:55)</h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="aspect-video bg-slate-950 relative flex items-center justify-center p-6 text-center text-white">
              <div className="space-y-3 max-w-md">
                <div className="h-16 w-16 rounded-full bg-teal-500 mx-auto flex items-center justify-center shadow-lg">
                  <Play className="h-8 w-8 fill-white text-white ms-1" />
                </div>
                <h4 className="text-base font-bold text-white">DreamClass System Walkthrough</h4>
                <p className="text-xs text-slate-300">
                  Comprehensive tour of student admissions, timetable scheduling, multi-scale gradebook, M-Pesa STK fees, and safeguarding controls.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsVideoModalOpen(false)}
                    className="bg-white text-slate-900 font-bold text-xs px-4 py-2 rounded-lg hover:bg-slate-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add School Event Modal */}
      {isAddEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {isRecurringEvent ? "Add Recurring School Event" : "Add School Event"}
              </h3>
              <button
                onClick={() => setIsAddEventModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Title*</label>
                <input
                  type="text"
                  required
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="e.g. Science Fair Exhibition"
                  className="w-full h-10 px-3 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Description</label>
                <textarea
                  rows={2}
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  placeholder="Event agenda or notes..."
                  className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Date*</label>
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Start Time*</label>
                <div className="relative">
                  <input
                    type="text"
                    value={newEventStartTime}
                    onChange={(e) => setNewEventStartTime(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <Clock className="h-4 w-4 text-slate-400 absolute end-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Duration*</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Hours</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={newEventDurationHours}
                      onChange={(e) => setNewEventDurationHours(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full h-10 px-3 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white mt-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Minutes</span>
                    <input
                      type="number"
                      value={newEventDurationMinutes}
                      onChange={(e) => setNewEventDurationMinutes(Number(e.target.value))}
                      className="w-full h-10 px-3 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white mt-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Color*</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={newEventColor}
                    onChange={(e) => setNewEventColor(e.target.value)}
                    className="w-full h-10 ps-3 pe-10 border border-slate-300 dark:border-slate-700 rounded-lg text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="absolute end-3 h-5 w-5 rounded-full bg-purple-500 flex items-center justify-center text-white">
                    <Palette className="h-3 w-3" />
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEventVisibleStudents}
                    onChange={(e) => setNewEventVisibleStudents(e.target.checked)}
                    className="h-4 w-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 dark:border-slate-700"
                  />
                  <span>Visible to students</span>
                </label>

                <label className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newEventVisibleTeachers}
                    onChange={(e) => setNewEventVisibleTeachers(e.target.checked)}
                    className="h-4 w-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300 dark:border-slate-700"
                  />
                  <span>Visible to teachers</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddEventModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden p-6 space-y-4 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="h-12 w-12 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center border border-rose-200 dark:border-rose-900">
              <RotateCw className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">Remove Sample Data?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                This will clear all pre-populated DreamClass demo courses, students, and invoices so you can import your school&apos;s real records.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="flex-1 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              >
                Keep Sample Data
              </button>
              <button
                onClick={() => {
                  alert("Sample data cleared. Clean slate ready for production import.");
                  setIsResetModalOpen(false);
                }}
                className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
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
