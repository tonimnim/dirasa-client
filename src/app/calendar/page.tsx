"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Settings,
  Printer,
  MoreVertical,
  X,
  Repeat,
  Check,
  CheckCircle2,
  MapPin,
  User,
  BookOpen,
  Video,
  Layers,
  Search,
  Timer,
  Trash2,
  Edit2,
  ExternalLink,
} from "lucide-react";

export interface CalendarLesson {
  id: string;
  title: string;
  courseName: string;
  className: string;
  teacher: string;
  dayIndex: number; // 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat
  startTime: string; // "09:00"
  endTime: string; // "10:00"
  startHour: number; // 9.0
  durationHours: number; // 1.0
  color: "orange" | "slate" | "peach" | "teal" | "navy" | "purple" | "green" | "pink" | "indigo";
  isRecurring: boolean;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED";
  room?: string;
  meetingLink?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  dayIndex: number;
  time: string;
  startHour: number;
  durationHours: number;
  color: "salmon" | "periwinkle";
  description?: string;
  location?: string;
}

export const INITIAL_LESSONS: CalendarLesson[] = [
  // --- Wednesday Sep 30 ---
  {
    id: "les-w1",
    title: "Math 1 (1st Grade...)",
    courseName: "Mathematics 1",
    className: "1st Grade",
    teacher: "Sarah Wanjiru",
    dayIndex: 3,
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    startHour: 9.0,
    durationHours: 1.0,
    color: "orange",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Room 101",
  },
  {
    id: "les-w2",
    title: "Math 2 (2nd Grade)",
    courseName: "Mathematics 2",
    className: "2nd Grade",
    teacher: "David Okeke",
    dayIndex: 3,
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    startHour: 9.0,
    durationHours: 1.0,
    color: "slate",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Room 102",
  },
  {
    id: "les-w3",
    title: "Science 1 (1st Grade...)",
    courseName: "General Science 1",
    className: "1st Grade",
    teacher: "Fatima El-Khatib",
    dayIndex: 3,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    startHour: 10.0,
    durationHours: 1.0,
    color: "peach",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Lab 3",
  },
  {
    id: "les-w4",
    title: "Science 2 (2nd Grade)",
    courseName: "General Science 2",
    className: "2nd Grade",
    teacher: "Fatima El-Khatib",
    dayIndex: 3,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    startHour: 10.0,
    durationHours: 1.0,
    color: "teal",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Lab 2",
  },
  {
    id: "les-w5",
    title: "Social Studies 1 (1st Grade (Sample))",
    courseName: "Social Studies 1",
    className: "1st Grade (Sample)",
    teacher: "James O'Connor",
    dayIndex: 3,
    startTime: "11:00 AM",
    endTime: "2:00 PM",
    startHour: 11.0,
    durationHours: 3.0,
    color: "navy",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Room 101",
  },

  // --- Thursday Oct 1 (Today) ---
  {
    id: "les-th1",
    title: "Math 1 (1st Grade...)",
    courseName: "Mathematics 1",
    className: "1st Grade",
    teacher: "Sarah Wanjiru",
    dayIndex: 4,
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    startHour: 9.0,
    durationHours: 1.0,
    color: "orange",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Room 101",
  },
  {
    id: "les-th2",
    title: "Math 2 (2nd Grade)",
    courseName: "Mathematics 2",
    className: "2nd Grade",
    teacher: "David Okeke",
    dayIndex: 4,
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    startHour: 9.0,
    durationHours: 1.0,
    color: "slate",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Room 102",
  },
  {
    id: "les-th3",
    title: "Science 2 (2nd Grade)",
    courseName: "General Science 2",
    className: "2nd Grade",
    teacher: "Fatima El-Khatib",
    dayIndex: 4,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    startHour: 10.0,
    durationHours: 1.0,
    color: "teal",
    isRecurring: false,
    status: "SCHEDULED",
    room: "Lab 2",
  },
  {
    id: "les-th4",
    title: "Social Studies 1 (1st Grade...)",
    courseName: "Social Studies 1",
    className: "1st Grade (Sample)",
    teacher: "James O'Connor",
    dayIndex: 4,
    startTime: "11:00 AM",
    endTime: "2:00 PM",
    startHour: 11.0,
    durationHours: 3.0,
    color: "navy",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Room 101",
  },
  {
    id: "les-th5",
    title: "Social Studies 2 (2nd Grade)",
    courseName: "Social Studies 2",
    className: "2nd Grade",
    teacher: "David Okeke",
    dayIndex: 4,
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    startHour: 11.0,
    durationHours: 1.0,
    color: "purple",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Room 102",
  },
  {
    id: "les-th6",
    title: "English Language Arts",
    courseName: "English Language Arts",
    className: "2nd Grade",
    teacher: "Amina Mansoor",
    dayIndex: 4,
    startTime: "12:00 PM",
    endTime: "1:00 PM",
    startHour: 12.0,
    durationHours: 1.0,
    color: "green",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Room 102",
  },

  // --- Friday Oct 2 ---
  {
    id: "les-f1",
    title: "Math 1 (1st Grade...)",
    courseName: "Mathematics 1",
    className: "1st Grade",
    teacher: "Sarah Wanjiru",
    dayIndex: 5,
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    startHour: 9.0,
    durationHours: 1.0,
    color: "orange",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Room 101",
  },
  {
    id: "les-f2",
    title: "Math 2 (2nd Grade)",
    courseName: "Mathematics 2",
    className: "2nd Grade",
    teacher: "David Okeke",
    dayIndex: 5,
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    startHour: 9.0,
    durationHours: 1.0,
    color: "slate",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Room 102",
  },
  {
    id: "les-f3",
    title: "Science 1 (1st Grade...)",
    courseName: "General Science 1",
    className: "1st Grade",
    teacher: "Fatima El-Khatib",
    dayIndex: 5,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    startHour: 10.0,
    durationHours: 1.0,
    color: "peach",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Lab 3",
  },
  {
    id: "les-f4",
    title: "Science 2 (2nd Grade)",
    courseName: "General Science 2",
    className: "2nd Grade",
    teacher: "Fatima El-Khatib",
    dayIndex: 5,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    startHour: 10.0,
    durationHours: 1.0,
    color: "teal",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Lab 2",
  },
  {
    id: "les-f5",
    title: "Social Studies 1 (1st Grade (Sample))",
    courseName: "Social Studies 1",
    className: "1st Grade (Sample)",
    teacher: "James O'Connor",
    dayIndex: 5,
    startTime: "11:00 AM",
    endTime: "2:00 PM",
    startHour: 11.0,
    durationHours: 3.0,
    color: "navy",
    isRecurring: true,
    status: "SCHEDULED",
    room: "Room 101",
  },
];

export const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: "ev-1",
    title: "Midweek School Meeting",
    dayIndex: 3, // Wednesday
    time: "2:00 PM",
    startHour: 14.0,
    durationHours: 1.0,
    color: "salmon",
    location: "Main Hall",
  },
  {
    id: "ev-2",
    title: "Science Fair Exhibition",
    dayIndex: 3, // Wednesday
    time: "3:30 PM",
    startHour: 15.5,
    durationHours: 1.5,
    color: "periwinkle",
    description: "Students will showcase their science projects and experiments to peers,...",
    location: "Auditorium",
  },
];

const DAYS_OF_WEEK = [
  { name: "Sunday", date: "Sep 27", isWeekend: true },
  { name: "Monday", date: "Sep 28", isWeekend: false },
  { name: "Tuesday", date: "Sep 29", isWeekend: false },
  { name: "Wednesday", date: "Sep 30", isWeekend: false },
  { name: "Thursday", date: "Oct 1", isToday: true, isWeekend: false },
  { name: "Friday", date: "Oct 2", isWeekend: false },
  { name: "Saturday", date: "Oct 3", isWeekend: true },
];

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17]; // 9 AM to 5 PM

export default function CalendarPage() {
  const [lessons, setLessons] = useState<CalendarLesson[]>(INITIAL_LESSONS);
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [activeView, setActiveView] = useState<"Day" | "Week" | "Month">("Week");
  const [eventsVisible, setEventsVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState("10/01/2026");

  // Dropdowns & Popovers
  const [isJumpToOpen, setIsJumpToOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<{
    lesson: CalendarLesson;
    x: number;
    y: number;
  } | null>(null);

  // Modals
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isRecurringMode, setIsRecurringMode] = useState(false);

  // Add Lesson Form State
  const [formClass, setFormClass] = useState("1st Grade");
  const [formCourse, setFormCourse] = useState("Social Studies 1");
  const [formTeacher, setFormTeacher] = useState("James O'Connor");
  const [formDate, setFormDate] = useState("2026-10-01");
  const [formStartTime, setFormStartTime] = useState("10:00 AM");
  const [formDurationHours, setFormDurationHours] = useState(1);
  const [formDurationMinutes, setFormDurationMinutes] = useState(0);
  const [formTitle, setFormTitle] = useState("");
  const [formClassroom, setFormClassroom] = useState("Room 101");
  const [formMeetingLink, setFormMeetingLink] = useState("");
  const [formPassword, setFormPassword] = useState("");

  // Add Event Form State
  const [eventTitle, setEventTitle] = useState("");
  const [eventDayIndex, setEventDayIndex] = useState(4);
  const [eventTime, setEventTime] = useState("2:00 PM");
  const [eventDuration, setEventDuration] = useState(1.0);
  const [eventLocation, setEventLocation] = useState("Main Hall");
  const [eventDesc, setEventDesc] = useState("");

  const handleSaveLesson = (e: React.FormEvent) => {
    e.preventDefault();
    const newLesson: CalendarLesson = {
      id: `les-${Date.now()}`,
      title: formTitle || `${formCourse} (${formClass})`,
      courseName: formCourse,
      className: formClass,
      teacher: formTeacher,
      dayIndex: 4, // default to Thursday or parsed from date
      startTime: formStartTime,
      endTime: "11:00 AM",
      startHour: 10.0,
      durationHours: formDurationHours + formDurationMinutes / 60,
      color: "teal",
      isRecurring: isRecurringMode,
      status: "SCHEDULED",
      room: formClassroom,
      meetingLink: formMeetingLink,
    };

    setLessons([...lessons, newLesson]);
    setIsAddLessonModalOpen(false);
    setFormTitle("");
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const newEv: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title: eventTitle,
      dayIndex: Number(eventDayIndex),
      time: eventTime,
      startHour: 14.0,
      durationHours: Number(eventDuration),
      color: "salmon",
      location: eventLocation,
      description: eventDesc,
    };

    setEvents([...events, newEv]);
    setIsAddEventModalOpen(false);
    setEventTitle("");
  };

  const handleDeleteLesson = (id: string) => {
    setLessons(lessons.filter((l) => l.id !== id));
    setSelectedLesson(null);
  };

  const formatHourLabel = (h: number) => {
    if (h === 12) return "12 PM";
    if (h > 12) return `${h - 12} PM`;
    return `${h} AM`;
  };

  // Helper to get color classes
  const getLessonBadgeStyle = (color: CalendarLesson["color"]) => {
    switch (color) {
      case "orange":
        return "bg-[#ea580c] hover:bg-[#c2410c] text-white border-amber-700/30";
      case "slate":
        return "bg-[#475569] hover:bg-[#334155] text-white border-slate-700/30";
      case "peach":
        return "bg-[#fed7aa] hover:bg-[#fdba74] text-[#9a3412] border-amber-300";
      case "teal":
        return "bg-[#0891b2] hover:bg-[#0e7490] text-white border-cyan-800/30";
      case "navy":
        return "bg-[#0f3b4c] hover:bg-[#0a2733] text-white border-slate-800";
      case "purple":
        return "bg-[#9333ea] hover:bg-[#7e22ce] text-white border-purple-800/30";
      case "green":
        return "bg-[#16a34a] hover:bg-[#15803d] text-white border-green-800/30";
      default:
        return "bg-slate-700 text-white";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white text-slate-800 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#fafafa]">
        {/* Top Header matching exact screenshot */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between gap-4 sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-[#0d9488]" />
            <h1 className="text-xl font-bold text-[#1e3a34]">Calendar</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Free Trial Banner */}
            <div className="hidden sm:flex items-center gap-3 bg-[#1e3a8a] text-white text-xs px-4 py-1.5 rounded-md font-medium shadow-sm">
              <span>You have 30 days left in your free trial.</span>
              <button className="bg-[#172554] hover:bg-[#0f172a] text-white px-2.5 py-1 rounded text-[11px] font-semibold transition-colors">
                Upgrade
              </button>
              <button className="bg-[#10b981] hover:bg-[#059669] text-white px-3 py-1 rounded text-[11px] font-bold transition-colors">
                Book Demo!
              </button>
            </div>

            {/* Settings Button */}
            <Link
              href="/settings"
              className="bg-[#0f766e] hover:bg-[#115e59] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </div>
        </header>

        {/* Toolbar & Filter Controls Bar matching exact screenshot */}
        <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-4 sticky top-16 z-10">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            {/* Filter Funnel Button */}
            <button
              className="p-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition-colors"
              title="Filter lessons and events"
            >
              <Filter className="h-4 w-4" />
            </button>

            {/* Date Display / Picker */}
            <div className="flex items-center gap-2 px-3 py-1 border border-slate-300 rounded-lg text-xs font-semibold bg-white">
              <span>{selectedDate}</span>
              <CalendarIcon className="h-3.5 w-3.5 text-slate-500" />
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1 text-slate-600">
              <button
                onClick={() => setSelectedDate("09/24/2026")}
                className="p-1 rounded hover:bg-slate-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setSelectedDate("10/08/2026")}
                className="p-1 rounded hover:bg-slate-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Jump To Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsJumpToOpen(!isJumpToOpen)}
                className="flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-slate-900 px-2.5 py-1 rounded-md hover:bg-slate-100"
              >
                <span>Jump to</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
              </button>

              {/* Jump to Dropdown Menu */}
              {isJumpToOpen && (
                <div className="absolute top-full start-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 animate-in fade-in duration-100 text-xs font-medium text-slate-800">
                  <button
                    onClick={() => {
                      setIsRecurringMode(true);
                      setIsJumpToOpen(false);
                      setIsAddLessonModalOpen(true);
                    }}
                    className="w-full text-start px-4 py-2 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    Add Recurring Lesson
                  </button>
                  <button
                    onClick={() => {
                      setIsRecurringMode(false);
                      setIsJumpToOpen(false);
                      setIsAddLessonModalOpen(true);
                    }}
                    className="w-full text-start px-4 py-2 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    Add Single Lesson
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    onClick={() => {
                      setIsJumpToOpen(false);
                      setIsAddEventModalOpen(true);
                    }}
                    className="w-full text-start px-4 py-2 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    Add Recurring School Event
                  </button>
                  <button
                    onClick={() => {
                      setIsJumpToOpen(false);
                      setIsAddEventModalOpen(true);
                    }}
                    className="w-full text-start px-4 py-2 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    Add School Event
                  </button>
                </div>
              )}
            </div>

            {/* View Selector: Day | Week | Month */}
            <div className="flex items-center rounded-lg border border-slate-300 p-0.5 bg-slate-50 text-xs font-semibold">
              {(["Day", "Week", "Month"] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeView === view
                      ? "bg-[#cbf4e5] text-[#065f46] font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <div>
              <span className="text-teal-700 font-bold hover:underline cursor-pointer">Calendar</span>
              <span className="mx-1 text-slate-300">|</span>
              <span className="text-teal-700 font-bold hover:underline cursor-pointer">Lessons</span>
            </div>

            {/* Events Toggle Switch */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEventsVisible(!eventsVisible)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  eventsVisible ? "bg-[#0d9488]" : "bg-slate-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform flex items-center justify-center ${
                    eventsVisible ? "translate-x-5" : "translate-x-0"
                  }`}
                >
                  {eventsVisible && <Check className="h-2.5 w-2.5 text-[#0d9488]" />}
                </div>
              </button>
              <span className="font-semibold text-slate-700">Events</span>
            </div>

            {/* Print Icon */}
            <button
              onClick={() => window.print()}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100"
              title="Print Timetable"
            >
              <Printer className="h-4 w-4" />
            </button>

            {/* Actions Menu */}
            <button className="p-1.5 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Grid View */}
        <main className="flex-1 p-6 overflow-x-auto">
          <div className="min-w-[1100px] bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
            {/* Days Header Row */}
            <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-slate-200 bg-white">
              {/* Corner */}
              <div className="p-3 border-e border-slate-200" />

              {/* 7 Days Columns */}
              {DAYS_OF_WEEK.map((day, idx) => (
                <div
                  key={day.name}
                  className={`p-3 text-center border-e border-slate-200 last:border-e-0 ${
                    day.isToday ? "bg-[#f0fdf4]" : ""
                  }`}
                >
                  <div className="text-xs font-bold text-slate-800">{day.name}</div>
                  <div
                    className={`text-xs mt-0.5 font-medium ${
                      day.isWeekend ? "text-rose-500 font-semibold" : "text-slate-500"
                    }`}
                  >
                    {day.date}
                  </div>
                </div>
              ))}
            </div>

            {/* Time Rows Grid */}
            <div className="relative">
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-slate-100 min-h-[72px]"
                >
                  {/* Time label */}
                  <div className="p-2.5 text-xs font-bold text-slate-700 border-e border-slate-200 text-center select-none">
                    {formatHourLabel(hour)}
                  </div>

                  {/* 7 Columns for this hour */}
                  {DAYS_OF_WEEK.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      className={`relative border-e border-slate-100 last:border-e-0 group hover:bg-slate-50/50 transition-colors ${
                        day.isToday ? "bg-[#f0fdf4]/30" : ""
                      }`}
                    >
                      {/* Plus icon on hover for slot */}
                      <button
                        onClick={() => {
                          setFormDate(`2026-10-0${dIdx + 1}`);
                          setFormStartTime(`${formatHourLabel(hour)}`);
                          setIsAddLessonModalOpen(true);
                        }}
                        className="absolute inset-0 m-auto h-6 w-6 rounded-full bg-teal-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-xs cursor-pointer"
                        title={`Add lesson on ${day.name} at ${formatHourLabel(hour)}`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ))}

              {/* Overlay: Render Lessons */}
              {lessons.map((les) => {
                // Calculate position:
                // Column 0 is time (80px), columns 1 to 7 are the days
                // Start hour relative to 9 AM (hour 9 = 0px, 1 hour = 72px)
                const topPx = (les.startHour - 9.0) * 72 + 2;
                const heightPx = les.durationHours * 72 - 4;
                const colWidthPercent = 100 / 7;

                // Adjust parallel cards on same slot:
                const isWednesday9AM = les.dayIndex === 3 && les.startHour === 9.0;
                const isWednesday10AM = les.dayIndex === 3 && les.startHour === 10.0;
                const isThursday9AM = les.dayIndex === 4 && les.startHour === 9.0;
                const isThursday11AM = les.dayIndex === 4 && les.startHour === 11.0 && les.durationHours === 1.0;
                const isFriday9AM = les.dayIndex === 5 && les.startHour === 9.0;
                const isFriday10AM = les.dayIndex === 5 && les.startHour === 10.0;

                let leftOffsetPercent = (les.dayIndex - 0) * colWidthPercent;
                let widthPercent = colWidthPercent;

                // Multi-lesson split columns for parallel classes:
                if (isWednesday9AM || isThursday9AM || isFriday9AM) {
                  if (les.color === "orange") {
                    widthPercent = colWidthPercent * 0.5 - 0.2;
                  } else {
                    leftOffsetPercent += colWidthPercent * 0.5;
                    widthPercent = colWidthPercent * 0.5 - 0.2;
                  }
                } else if (isWednesday10AM || isFriday10AM) {
                  if (les.color === "peach") {
                    widthPercent = colWidthPercent * 0.5 - 0.2;
                  } else {
                    leftOffsetPercent += colWidthPercent * 0.5;
                    widthPercent = colWidthPercent * 0.5 - 0.2;
                  }
                } else if (isThursday11AM) {
                  // Social Studies 2 sits beside Social Studies 1
                  leftOffsetPercent += colWidthPercent * 0.52;
                  widthPercent = colWidthPercent * 0.46;
                } else if (les.dayIndex === 4 && les.startHour === 12.0 && les.color === "green") {
                  leftOffsetPercent += colWidthPercent * 0.52;
                  widthPercent = colWidthPercent * 0.46;
                } else if (les.dayIndex === 4 && les.startHour === 11.0 && les.durationHours === 3.0) {
                  widthPercent = colWidthPercent * 0.5 - 0.2;
                }

                return (
                  <div
                    key={les.id}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setSelectedLesson({
                        lesson: les,
                        x: rect.left,
                        y: rect.top,
                      });
                    }}
                    style={{
                      position: "absolute",
                      top: `${topPx}px`,
                      left: `calc(80px + ${leftOffsetPercent}%)`,
                      width: `calc(${widthPercent}% - 6px)`,
                      height: `${heightPx}px`,
                    }}
                    className={`rounded-lg p-2.5 text-xs font-semibold cursor-pointer shadow-xs border transition-transform hover:scale-[1.01] z-20 flex flex-col justify-between overflow-hidden ${getLessonBadgeStyle(
                      les.color
                    )}`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1 text-[11px] opacity-95">
                        {les.isRecurring && <Repeat className="h-3 w-3 shrink-0" />}
                        <span className="truncate">
                          {les.startTime}-{les.endTime}
                        </span>
                      </div>
                      <div className="font-bold leading-tight line-clamp-2">{les.title}</div>
                      {les.teacher && (
                        <div className="text-[10px] opacity-90 truncate">{les.teacher}</div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Overlay: Render Events (Midweek Meeting & Science Fair) */}
              {eventsVisible &&
                events.map((ev) => {
                  const topPx = (ev.startHour - 9.0) * 72 + 2;
                  const heightPx = ev.durationHours * 72 - 4;
                  const colWidthPercent = 100 / 7;
                  const leftOffsetPercent = ev.dayIndex * colWidthPercent;

                  return (
                    <div
                      key={ev.id}
                      style={{
                        position: "absolute",
                        top: `${topPx}px`,
                        left: `calc(80px + ${leftOffsetPercent}%)`,
                        width: `calc(${colWidthPercent}% - 6px)`,
                        height: `${heightPx}px`,
                      }}
                      className={`rounded-lg p-2.5 text-xs cursor-pointer shadow-xs border z-20 flex flex-col justify-between overflow-hidden ${
                        ev.color === "salmon"
                          ? "bg-[#fda4af] hover:bg-[#fb7185] text-slate-900 border-rose-300"
                          : "bg-[#818cf8] hover:bg-[#6366f1] text-white border-indigo-400"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[11px] font-bold">
                          <CalendarIcon className="h-3 w-3 shrink-0" />
                          <span>{ev.time}</span>
                        </div>
                        <div className="font-bold leading-tight">{ev.title}</div>
                        {ev.description && (
                          <p className="text-[10px] opacity-90 line-clamp-2 leading-tight">
                            {ev.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
      </div>

      {/* Interactive Popover Card on clicking a lesson (matching Screenshot 2) */}
      {selectedLesson && (
        <div
          className="fixed inset-0 z-50 bg-black/10 backdrop-blur-2xs flex items-center justify-center"
          onClick={() => setSelectedLesson(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl border border-slate-200 p-5 w-80 text-xs space-y-4 animate-in fade-in zoom-in-95 duration-100"
          >
            {/* Popover Title */}
            <div className="flex items-start gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-500 mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-tight">
                  {selectedLesson.lesson.title}
                </h3>
              </div>
            </div>

            {/* Time & Duration */}
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>
                {selectedLesson.lesson.startTime}-{selectedLesson.lesson.endTime}
              </span>
              <span className="text-slate-300">&bull;</span>
              <Timer className="h-3.5 w-3.5 text-slate-400" />
              <span>{selectedLesson.lesson.durationHours}h</span>
            </div>

            {/* Teacher pill */}
            <div>
              <span className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                {selectedLesson.lesson.teacher}
              </span>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded uppercase">
                {selectedLesson.lesson.status}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleDeleteLesson(selectedLesson.lesson.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-50 transition-colors"
                  title="Delete Lesson"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    alert(`Editing ${selectedLesson.lesson.title}`);
                    setSelectedLesson(null);
                  }}
                  className="p-1.5 text-slate-400 hover:text-slate-800 rounded hover:bg-slate-50 transition-colors"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lesson Modal matching exact Screenshot 4 */}
      {isAddLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">
                {isRecurringMode ? "Add Recurring Lesson" : "Add Lesson"}
              </h3>
              <button
                onClick={() => setIsAddLessonModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveLesson} className="p-6 space-y-4 text-xs">
              {/* Classes* */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Classes*</label>
                <select
                  value={formClass}
                  onChange={(e) => setFormClass(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  <option value="1st Grade">1st Grade</option>
                  <option value="2nd Grade">2nd Grade</option>
                  <option value="Grade 7 - Blue">Grade 7 - Blue</option>
                  <option value="Grade 8 - Alpha">Grade 8 - Alpha</option>
                  <option value="Grade 9 - Science">Grade 9 - Science</option>
                </select>
              </div>

              {/* Class Course* */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Class Course*</label>
                <select
                  value={formCourse}
                  onChange={(e) => setFormCourse(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  <option value="Social Studies 1">Social Studies 1</option>
                  <option value="Mathematics 1">Mathematics 1</option>
                  <option value="Science 1">Science 1</option>
                  <option value="English Language Arts">English Language Arts</option>
                  <option value="Visual Arts">Visual Arts</option>
                </select>
              </div>

              {/* Teachers */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Teachers</label>
                <select
                  value={formTeacher}
                  onChange={(e) => setFormTeacher(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  <option value="James O'Connor">James O'Connor</option>
                  <option value="Sarah Wanjiru">Sarah Wanjiru</option>
                  <option value="David Okeke">David Okeke</option>
                  <option value="Fatima El-Khatib">Fatima El-Khatib</option>
                  <option value="Amina Mansoor">Amina Mansoor</option>
                </select>
              </div>

              {/* Date* */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Date*</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>

              {/* Start Time* */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Start Time*</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
                    placeholder="10:00 AM"
                    className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                  <Clock className="h-4 w-4 text-slate-400 absolute end-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Duration* */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Duration*</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500">Hours</span>
                    <input
                      type="number"
                      min={0}
                      max={8}
                      value={formDurationHours}
                      onChange={(e) => setFormDurationHours(Number(e.target.value))}
                      className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white mt-0.5"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Minutes</span>
                    <input
                      type="number"
                      min={0}
                      max={55}
                      step={5}
                      value={formDurationMinutes}
                      onChange={(e) => setFormDurationMinutes(Number(e.target.value))}
                      className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white mt-0.5"
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Title</label>
                <input
                  type="text"
                  placeholder="Optional custom title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              {/* Classroom */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Classroom</label>
                <select
                  value={formClassroom}
                  onChange={(e) => setFormClassroom(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="Room 101">Room 101</option>
                  <option value="Room 102">Room 102</option>
                  <option value="Lab 2">Lab 2</option>
                  <option value="Lab 3">Lab 3</option>
                  <option value="Auditorium">Auditorium</option>
                </select>
              </div>

              {/* Meeting Link & Password */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Meeting link</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={formMeetingLink}
                  onChange={(e) => setFormMeetingLink(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Password</label>
                <input
                  type="text"
                  placeholder="Passcode for remote students"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              {/* Footer */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddLessonModalOpen(false)}
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

      {/* Add School Event Modal */}
      {isAddEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Add School Event</h3>
              <button
                onClick={() => setIsAddEventModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Midweek School Meeting"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Day</label>
                  <select
                    value={eventDayIndex}
                    onChange={(e) => setEventDayIndex(Number(e.target.value))}
                    className="w-full h-10 px-2 border border-slate-300 rounded-lg text-xs bg-white"
                  >
                    <option value={1}>Monday Sep 28</option>
                    <option value={2}>Tuesday Sep 29</option>
                    <option value={3}>Wednesday Sep 30</option>
                    <option value={4}>Thursday Oct 1</option>
                    <option value={5}>Friday Oct 2</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Start Time</label>
                  <input
                    type="text"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    placeholder="2:00 PM"
                    className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Location</label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="Main Hall"
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Description</label>
                <textarea
                  rows={2}
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  placeholder="Event agenda and attendee notes..."
                  className="w-full p-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
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
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
