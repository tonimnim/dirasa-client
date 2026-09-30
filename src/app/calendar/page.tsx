"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/layout/AppSidebar";
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
  Timer,
  Trash2,
  Edit2,
  Palette,
} from "lucide-react";

export interface CalendarLesson {
  id: string;
  title: string;
  courseName: string;
  className: string;
  teacher: string;
  dateStr: string; // e.g. "Wednesday, September 30, 2026, 9:00 AM"
  dayIndex: number; // 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat
  startTime: string; // "9:00 AM"
  endTime: string; // "10:00 AM"
  startHour: number; // 9.0
  durationHours: number; // 1.0
  durationLabel: string; // "1h"
  color: "orange" | "slate" | "peach" | "teal" | "navy" | "purple" | "green";
  isRecurring: boolean;
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
  room?: string;
  meetingLink?: string;
  password?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  dateStr: string;
  dayIndex: number;
  time: string;
  startHour: number;
  durationHours: number;
  durationLabel: string;
  color: "salmon" | "periwinkle" | "purple";
  colorName: string;
  description?: string;
  location?: string;
  visibleToStudents: boolean;
  visibleToTeachers: boolean;
}

export const INITIAL_LESSONS: CalendarLesson[] = [
  // --- Wednesday Sep 30, 2026 ---
  {
    id: "les-w1",
    title: "Math 1 (1st Grade...)",
    courseName: "Math 1 (1st Grade (Sample))",
    className: "1st Grade (Sample)",
    teacher: "-",
    dateStr: "Wednesday, September 30, 2026, 9:00 AM",
    dayIndex: 3,
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    startHour: 9.0,
    durationHours: 1.0,
    durationLabel: "1h",
    color: "orange",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
  {
    id: "les-w2",
    title: "Math 2 (2nd Grade)",
    courseName: "Math 2 (2nd Grade)",
    className: "2nd Grade",
    teacher: "-",
    dateStr: "Wednesday, September 30, 2026, 9:00 AM",
    dayIndex: 3,
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    startHour: 9.0,
    durationHours: 1.0,
    durationLabel: "1h",
    color: "slate",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
  {
    id: "les-w3",
    title: "Science 1 (1st Grade...)",
    courseName: "Science 1 (1st Grade (Sample))",
    className: "1st Grade (Sample)",
    teacher: "Robert Kim",
    dateStr: "Wednesday, September 30, 2026, 10:00 AM",
    dayIndex: 3,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    startHour: 10.0,
    durationHours: 1.0,
    durationLabel: "1h",
    color: "peach",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
  {
    id: "les-w4",
    title: "Science 2 (2nd Grade)",
    courseName: "Science 2 (2nd Grade)",
    className: "2nd Grade",
    teacher: "-",
    dateStr: "Wednesday, September 30, 2026, 10:00 AM",
    dayIndex: 3,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    startHour: 10.0,
    durationHours: 1.0,
    durationLabel: "1h",
    color: "teal",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
  {
    id: "les-w5",
    title: "Social Studies 1 (1st Grade (Sample))",
    courseName: "Social Studies 1 (1st Grade (Sample))",
    className: "1st Grade (Sample)",
    teacher: "James O'Connor",
    dateStr: "Wednesday, September 30, 2026, 11:00 AM",
    dayIndex: 3,
    startTime: "11:00 AM",
    endTime: "2:00 PM",
    startHour: 11.0,
    durationHours: 3.0,
    durationLabel: "3h",
    color: "navy",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },

  // --- Thursday Oct 1, 2026 (Today) ---
  {
    id: "les-th1",
    title: "Math 1 (1st Grade...)",
    courseName: "Math 1 (1st Grade (Sample))",
    className: "1st Grade (Sample)",
    teacher: "-",
    dateStr: "Thursday, October 1, 2026, 9:00 AM",
    dayIndex: 4,
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    startHour: 9.0,
    durationHours: 1.0,
    durationLabel: "1h",
    color: "orange",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
  {
    id: "les-th2",
    title: "Math 2 (2nd Grade)",
    courseName: "Math 2 (2nd Grade)",
    className: "2nd Grade",
    teacher: "-",
    dateStr: "Thursday, October 1, 2026, 9:00 AM",
    dayIndex: 4,
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    startHour: 9.0,
    durationHours: 1.0,
    durationLabel: "1h",
    color: "slate",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
  {
    id: "les-th3",
    title: "Science 2 (2nd Grade)",
    courseName: "Science 2 (2nd Grade)",
    className: "2nd Grade",
    teacher: "-",
    dateStr: "Thursday, October 1, 2026, 10:00 AM",
    dayIndex: 4,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    startHour: 10.0,
    durationHours: 1.0,
    durationLabel: "1h",
    color: "teal",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
  {
    id: "les-th4",
    title: "Social Studies 1 (1st Grade...)",
    courseName: "Social Studies 1 (1st Grade (Sample))",
    className: "1st Grade (Sample)",
    teacher: "James O'Connor",
    dateStr: "Thursday, October 1, 2026, 11:00 AM",
    dayIndex: 4,
    startTime: "11:00 AM",
    endTime: "2:00 PM",
    startHour: 11.0,
    durationHours: 3.0,
    durationLabel: "3h",
    color: "navy",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
  {
    id: "les-th5",
    title: "Social Studies 2 (2nd Grade)",
    courseName: "Social Studies 2 (2nd Grade)",
    className: "2nd Grade",
    teacher: "-",
    dateStr: "Thursday, October 1, 2026, 11:00 AM",
    dayIndex: 4,
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    startHour: 11.0,
    durationHours: 1.0,
    durationLabel: "1h",
    color: "purple",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
  {
    id: "les-th6",
    title: "English Language Arts",
    courseName: "English Language Arts 2 (2nd Grade)",
    className: "2nd Grade",
    teacher: "-",
    dateStr: "Thursday, October 1, 2026, 12:00 PM",
    dayIndex: 4,
    startTime: "12:00 PM",
    endTime: "1:00 PM",
    startHour: 12.0,
    durationHours: 1.0,
    durationLabel: "1h",
    color: "green",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },

  // --- Friday Oct 2, 2026 ---
  {
    id: "les-f1",
    title: "Math 1 (1st Grade...)",
    courseName: "Math 1 (1st Grade (Sample))",
    className: "1st Grade (Sample)",
    teacher: "-",
    dateStr: "Friday, October 2, 2026, 9:00 AM",
    dayIndex: 5,
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    startHour: 9.0,
    durationHours: 1.0,
    durationLabel: "1h",
    color: "orange",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
  {
    id: "les-f2",
    title: "Math 2 (2nd Grade)",
    courseName: "Math 2 (2nd Grade)",
    className: "2nd Grade",
    teacher: "-",
    dateStr: "Friday, October 2, 2026, 9:00 AM",
    dayIndex: 5,
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    startHour: 9.0,
    durationHours: 1.0,
    durationLabel: "1h",
    color: "slate",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
  {
    id: "les-f3",
    title: "Science 1 (1st Grade...)",
    courseName: "Science 1 (1st Grade (Sample))",
    className: "1st Grade (Sample)",
    teacher: "-",
    dateStr: "Friday, October 2, 2026, 10:00 AM",
    dayIndex: 5,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    startHour: 10.0,
    durationHours: 1.0,
    durationLabel: "1h",
    color: "peach",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
  {
    id: "les-f4",
    title: "Science 2 (2nd Grade)",
    courseName: "Science 2 (2nd Grade)",
    className: "2nd Grade",
    teacher: "-",
    dateStr: "Friday, October 2, 2026, 10:00 AM",
    dayIndex: 5,
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    startHour: 10.0,
    durationHours: 1.0,
    durationLabel: "1h",
    color: "teal",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
  {
    id: "les-f5",
    title: "Social Studies 1 (1st Grade (Sample))",
    courseName: "Social Studies 1 (1st Grade (Sample))",
    className: "1st Grade (Sample)",
    teacher: "James O'Connor",
    dateStr: "Friday, October 2, 2026, 11:00 AM",
    dayIndex: 5,
    startTime: "11:00 AM",
    endTime: "2:00 PM",
    startHour: 11.0,
    durationHours: 3.0,
    durationLabel: "3h",
    color: "navy",
    isRecurring: true,
    status: "SCHEDULED",
    room: "-",
  },
];

export const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: "ev-1",
    title: "Midweek School Meeting",
    dateStr: "Wednesday, September 30, 2026, 2:00 PM",
    dayIndex: 3,
    time: "2:00 PM",
    startHour: 14.0,
    durationHours: 1.0,
    durationLabel: "-",
    color: "salmon",
    colorName: "red-300",
    location: "Main Hall",
    visibleToStudents: true,
    visibleToTeachers: true,
  },
  {
    id: "ev-2",
    title: "Science Fair Exhibition",
    dateStr: "Wednesday, September 30, 2026, 3:30 PM",
    dayIndex: 3,
    time: "3:30 PM",
    startHour: 15.5,
    durationHours: 1.5,
    durationLabel: "-",
    color: "periwinkle",
    colorName: "purple-400",
    description: "Students will showcase their science projects and experiments to peers,...",
    location: "Auditorium",
    visibleToStudents: true,
    visibleToTeachers: true,
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

const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17];

export default function CalendarPage() {
  const [lessons, setLessons] = useState<CalendarLesson[]>(INITIAL_LESSONS);
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [primaryMode, setPrimaryMode] = useState<"Calendar" | "Lessons">("Calendar");
  const [activeView, setActiveView] = useState<"Day" | "Week" | "Month">("Week");
  const [eventsVisible, setEventsVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState("10/01/2026");

  // Dropdown states
  const [isJumpToOpen, setIsJumpToOpen] = useState(false);
  const [isPrintMenuOpen, setIsPrintMenuOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<CalendarLesson | null>(null);

  // Modals
  const [isAddRecurringModalOpen, setIsAddRecurringModalOpen] = useState(false);
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

  // Form states - Add Lesson (Single)
  const [formClass, setFormClass] = useState("1st Grade");
  const [formCourse, setFormCourse] = useState("Social Studies 1");
  const [formTeacher, setFormTeacher] = useState("James O'Connor");
  const [formDate, setFormDate] = useState("2026-09-28");
  const [formStartTime, setFormStartTime] = useState("10:00 AM");
  const [formDurationHours, setFormDurationHours] = useState(1);
  const [formDurationMinutes, setFormDurationMinutes] = useState(0);
  const [formTitle, setFormTitle] = useState("");
  const [formClassroom, setFormClassroom] = useState("");
  const [formMeetingLink, setFormMeetingLink] = useState("");
  const [formPassword, setFormPassword] = useState("");

  // Form states - Add Recurring Lesson
  const [recClass, setRecClass] = useState("1st Grade");
  const [recCourse, setRecCourse] = useState("Social Studies 1");
  const [recTeacher, setRecTeacher] = useState("James O'Connor");
  const [recStartDate, setRecStartDate] = useState("2026-09-30");
  const [recEndDate, setRecEndDate] = useState("2027-07-30");
  const [recDayOfWeek, setRecDayOfWeek] = useState<string[]>(["Monday"]);
  const [recStartTime, setRecStartTime] = useState("10:30 AM");
  const [recDurationHours, setRecDurationHours] = useState(1);
  const [recDurationMinutes, setRecDurationMinutes] = useState(0);
  const [recInterval, setRecInterval] = useState("WEEKLY");
  const [recTitle, setRecTitle] = useState("");
  const [recClassroom, setRecClassroom] = useState("");
  const [recMeetingLink, setRecMeetingLink] = useState("");

  // Form states - Add School Event
  const [eventTitle, setEventTitle] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventDate, setEventDate] = useState("2026-09-29");
  const [eventStartTime, setEventStartTime] = useState("10:30 AM");
  const [eventDurationHours, setEventDurationHours] = useState<number | "">("");
  const [eventDurationMinutes, setEventDurationMinutes] = useState(15);
  const [eventColor, setEventColor] = useState("purple-400");
  const [eventVisibleStudents, setEventVisibleStudents] = useState(true);
  const [eventVisibleTeachers, setEventVisibleTeachers] = useState(true);

const parseTimeToHour = (timeStr: string): number => {
  const match = timeStr.match(/(\d+):?(\d*)\s*(AM|PM)?/i);
  if (!match) return 9;
  let hour = parseInt(match[1], 10);
  const min = match[2] ? parseInt(match[2], 10) : 0;
  const ampm = (match[3] || "AM").toUpperCase();
  if (ampm === "PM" && hour < 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return hour + min / 60;
};

const formatHourToTimeStr = (hourVal: number): string => {
  const h = Math.floor(hourVal);
  const m = Math.round((hourVal - h) * 60);
  const ampm = h >= 12 ? "PM" : "AM";
  const displayH = h % 12 === 0 ? 12 : h % 12;
  const displayM = m < 10 ? `0${m}` : `${m}`;
  return `${displayH}:${displayM} ${ampm}`;
};

  // Submit Single Lesson
  const handleSaveSingleLesson = (e: React.FormEvent) => {
    e.preventDefault();
    const d = new Date(formDate + "T12:00:00");
    const dayIndex = isNaN(d.getDay()) ? 4 : d.getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const formattedDate = !isNaN(d.getTime())
      ? `${dayNames[dayIndex]}, ${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}, ${formStartTime}`
      : `Thursday, October 1, 2026, ${formStartTime}`;

    const startH = parseTimeToHour(formStartTime);
    const durH = (Number(formDurationHours) || 0) + (Number(formDurationMinutes) || 0) / 60;
    const endH = startH + (durH || 1.0);
    const endStr = formatHourToTimeStr(endH);

    const newLesson: CalendarLesson = {
      id: `les-${Date.now()}`,
      title: formTitle || `${formCourse} (${formClass})`,
      courseName: formCourse,
      className: formClass,
      teacher: formTeacher,
      dateStr: formattedDate,
      dayIndex: dayIndex,
      startTime: formStartTime,
      endTime: endStr,
      startHour: startH,
      durationHours: durH || 1.0,
      durationLabel: `${Number(formDurationHours) || 1}h`,
      color: "teal",
      isRecurring: false,
      status: "SCHEDULED",
      room: formClassroom || "-",
      meetingLink: formMeetingLink,
      password: formPassword,
    };

    setLessons([...lessons, newLesson]);
    setIsAddLessonModalOpen(false);
  };

  // Submit Recurring Lesson
  const handleSaveRecurringLesson = (e: React.FormEvent) => {
    e.preventDefault();
    const startH = parseTimeToHour(recStartTime);
    const durH = (Number(recDurationHours) || 0) + (Number(recDurationMinutes) || 0) / 60;
    const endH = startH + (durH || 1.0);
    const endStr = formatHourToTimeStr(endH);

    const dayMap: Record<string, { dayIndex: number; dateStr: string }> = {
      Sunday: { dayIndex: 0, dateStr: `Sunday, October 4, 2026, ${recStartTime}` },
      Monday: { dayIndex: 1, dateStr: `Monday, October 5, 2026, ${recStartTime}` },
      Tuesday: { dayIndex: 2, dateStr: `Tuesday, October 6, 2026, ${recStartTime}` },
      Wednesday: { dayIndex: 3, dateStr: `Wednesday, October 7, 2026, ${recStartTime}` },
      Thursday: { dayIndex: 4, dateStr: `Thursday, October 8, 2026, ${recStartTime}` },
      Friday: { dayIndex: 5, dateStr: `Friday, October 9, 2026, ${recStartTime}` },
      Saturday: { dayIndex: 6, dateStr: `Saturday, October 10, 2026, ${recStartTime}` },
    };

    const daysToGenerate = recDayOfWeek.length > 0 ? recDayOfWeek : ["Monday"];
    const newItems: CalendarLesson[] = daysToGenerate.map((dayName, idx) => {
      const info = dayMap[dayName] || { dayIndex: 1, dateStr: `Monday, October 5, 2026, ${recStartTime}` };
      return {
        id: `les-rec-${Date.now()}-${idx}`,
        title: recTitle || `${recCourse} (${recClass})`,
        courseName: recCourse,
        className: recClass,
        teacher: recTeacher,
        dateStr: info.dateStr,
        dayIndex: info.dayIndex,
        startTime: recStartTime,
        endTime: endStr,
        startHour: startH,
        durationHours: durH || 1.0,
        durationLabel: `${Number(recDurationHours) || 1}h`,
        color: "navy",
        isRecurring: true,
        status: "SCHEDULED",
        room: recClassroom || "-",
        meetingLink: recMeetingLink,
      };
    });

    setLessons([...lessons, ...newItems]);
    setIsAddRecurringModalOpen(false);
  };

  // Submit School Event
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const d = new Date(eventDate + "T12:00:00");
    const dayIndex = isNaN(d.getDay()) ? 4 : d.getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const formattedDate = !isNaN(d.getTime())
      ? `${dayNames[dayIndex]}, ${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}, ${eventStartTime}`
      : `Thursday, October 1, 2026, ${eventStartTime}`;

    const startH = parseTimeToHour(eventStartTime);
    const durH = (Number(eventDurationHours) || 0) + (Number(eventDurationMinutes) || 15) / 60;

    const newEv: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title: eventTitle,
      dateStr: formattedDate,
      dayIndex: dayIndex,
      time: eventStartTime,
      startHour: startH,
      durationHours: durH || 0.5,
      durationLabel: "-",
      color: "purple",
      colorName: eventColor,
      description: eventDesc,
      location: "Main Hall",
      visibleToStudents: eventVisibleStudents,
      visibleToTeachers: eventVisibleTeachers,
    };

    setEvents([...events, newEv]);
    setIsAddEventModalOpen(false);
    setEventTitle("");
    setEventDesc("");
  };

  const formatHourLabel = (h: number) => {
    if (h === 12) return "12 PM";
    if (h > 12) return `${h - 12} PM`;
    return `${h} AM`;
  };

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

  const combinedLessonsAndEvents = [
    ...lessons.map((l) => ({
      kind: "lesson" as const,
      id: l.id,
      dateStr: l.dateStr,
      dayIndex: l.dayIndex,
      startHour: l.startHour,
      durationLabel: l.durationLabel,
      title: l.courseName,
      isRecurring: l.isRecurring,
      room: l.room || "-",
      teacher: l.teacher,
      status: l.status,
      color: l.color,
      lessonObj: l,
    })),
    ...(eventsVisible
      ? events.map((e) => ({
          kind: "event" as const,
          id: e.id,
          dateStr: e.dateStr,
          dayIndex: e.dayIndex,
          startHour: e.startHour,
          durationLabel: "-",
          title: e.title,
          isRecurring: false,
          room: e.location || "-",
          teacher: "-",
          status: "School Event" as const,
          color: e.color,
          eventObj: e,
        }))
      : []),
  ].sort((a, b) => {
    if (a.dayIndex !== b.dayIndex) return a.dayIndex - b.dayIndex;
    return a.startHour - b.startHour;
  });

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

            {/* Plan Lesson / Event Dedicated Page Button */}
            <Link
              href="/calendar/new"
              className="bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Plan Lesson / Event</span>
            </Link>

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

        {/* Toolbar & Filter Controls Bar */}
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

            {/* Jump To Dropdown (Screenshot 3) */}
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
                      setIsJumpToOpen(false);
                      setIsAddRecurringModalOpen(true);
                    }}
                    className="w-full text-start px-4 py-2 hover:bg-slate-50 text-slate-800 transition-colors"
                  >
                    Add Recurring Lesson
                  </button>
                  <button
                    onClick={() => {
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
                  <div className="border-t border-slate-100 my-1" />
                  <Link
                    href="/calendar/new"
                    onClick={() => setIsJumpToOpen(false)}
                    className="flex items-center justify-between px-4 py-2 hover:bg-emerald-50 text-emerald-700 font-semibold transition-colors"
                  >
                    <span>Deep Full-Page Scheduler</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* View Selector: Day | Week | Month */}
            <div className="flex items-center rounded-lg border border-slate-300 p-0.5 bg-slate-50 text-xs font-semibold">
              {(["Day", "Week", "Month"] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => {
                    setActiveView(view);
                    setPrimaryMode("Calendar");
                  }}
                  className={`px-3 py-1 rounded transition-colors ${
                    activeView === view && primaryMode === "Calendar"
                      ? "bg-[#cbf4e5] text-[#065f46] font-bold shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* Right Controls: Calendar | Lessons switch (Screenshot 7), Events toggle, Print menu (Screenshot 8) */}
          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <div>
              <button
                onClick={() => setPrimaryMode("Calendar")}
                className={`font-bold transition-colors ${
                  primaryMode === "Calendar" ? "text-teal-700 underline" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Calendar
              </button>
              <span className="mx-1.5 text-slate-300">|</span>
              <button
                onClick={() => setPrimaryMode("Lessons")}
                className={`font-bold transition-colors ${
                  primaryMode === "Lessons" ? "text-teal-700 underline" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Lessons
              </button>
            </div>

            {/* Events Toggle Switch */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEventsVisible(!eventsVisible)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
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
              <span className="font-semibold text-slate-700 select-none">Events</span>
            </div>

            {/* Print Icon with Menu (Screenshot 8) */}
            <div className="relative">
              <button
                onClick={() => setIsPrintMenuOpen(!isPrintMenuOpen)}
                className="p-1.5 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100"
                title="Print Timetable"
              >
                <Printer className="h-4 w-4" />
              </button>

              {isPrintMenuOpen && (
                <div className="absolute top-full end-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 animate-in fade-in duration-100 text-xs font-medium text-slate-800">
                  <button
                    onClick={() => {
                      setIsPrintMenuOpen(false);
                      setPrimaryMode("Calendar");
                      setTimeout(() => window.print(), 100);
                    }}
                    className="w-full text-start px-4 py-2 hover:bg-slate-50 text-slate-800"
                  >
                    Print Calendar
                  </button>
                  <button
                    onClick={() => {
                      setIsPrintMenuOpen(false);
                      setPrimaryMode("Lessons");
                      setTimeout(() => window.print(), 100);
                    }}
                    className="w-full text-start px-4 py-2 hover:bg-slate-50 text-slate-800"
                  >
                    Print Lessons
                  </button>
                </div>
              )}
            </div>

            {/* Deep Scheduler Link Button */}
            <Link
              href="/calendar/new"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors"
            >
              <Plus className="h-3.5 w-3.5" /> Deep Scheduler
            </Link>

            {/* More Options */}
            <button className="p-1.5 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* PRIMARY VIEW 1: Calendar Grid (Screenshots 1-3) */}
        {primaryMode === "Calendar" && (
          <main className="flex-1 p-6 overflow-x-auto">
            <div className="min-w-[1100px] bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
              {/* Days Header Row */}
              <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-slate-200 bg-white">
                <div className="p-3 border-e border-slate-200" />

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
                    <div className="p-2.5 text-xs font-bold text-slate-700 border-e border-slate-200 text-center select-none">
                      {formatHourLabel(hour)}
                    </div>

                    {DAYS_OF_WEEK.map((day, dIdx) => (
                      <div
                        key={dIdx}
                        className={`relative border-e border-slate-100 last:border-e-0 group hover:bg-slate-50/50 transition-colors ${
                          day.isToday ? "bg-[#f0fdf4]/30" : ""
                        }`}
                      >
                        {/* Interactive Plus icon on cell hover (Screenshot 3) */}
                        <button
                          onClick={() => {
                            setFormDate(`2026-10-0${dIdx + 1}`);
                            setFormStartTime(`${formatHourLabel(hour)}`);
                            setIsAddLessonModalOpen(true);
                          }}
                          className="absolute inset-0 m-auto h-6 w-6 rounded-full bg-slate-300 hover:bg-teal-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-xs cursor-pointer"
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
                  const topPx = (les.startHour - 9.0) * 72 + 2;
                  const heightPx = les.durationHours * 72 - 4;
                  const colWidthPercent = 100 / 7;

                  const isWednesday9AM = les.dayIndex === 3 && les.startHour === 9.0;
                  const isWednesday10AM = les.dayIndex === 3 && les.startHour === 10.0;
                  const isThursday9AM = les.dayIndex === 4 && les.startHour === 9.0;
                  const isThursday11AM = les.dayIndex === 4 && les.startHour === 11.0 && les.durationHours === 1.0;
                  const isFriday9AM = les.dayIndex === 5 && les.startHour === 9.0;
                  const isFriday10AM = les.dayIndex === 5 && les.startHour === 10.0;

                  let leftOffsetPercent = les.dayIndex * colWidthPercent;
                  let widthPercent = colWidthPercent;

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
                      onClick={() => setSelectedLesson(les)}
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

                {/* Overlay: Render Events (Screenshot 1) */}
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
        )}

        {/* PRIMARY VIEW 2: Lessons List Table (Screenshot 7) */}
        {primaryMode === "Lessons" && (
          <main className="flex-1 p-6">
            <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs overflow-hidden">
              <table className="w-full text-start text-xs">
                <thead className="bg-[#f8fafc] border-b border-slate-200 text-slate-700 font-bold">
                  <tr>
                    <th className="py-3 px-6 text-start">Date</th>
                    <th className="py-3 px-4 text-start">Dur.</th>
                    <th className="py-3 px-4 text-start">Class Course</th>
                    <th className="py-3 px-4 text-start">Classroom</th>
                    <th className="py-3 px-4 text-start">Teachers</th>
                    <th className="py-3 px-6 text-end">Action / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {combinedLessonsAndEvents.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => {
                        if (row.kind === "lesson") setSelectedLesson(row.lessonObj);
                      }}
                      className={`hover:bg-slate-50 transition-colors ${
                        row.kind === "lesson" ? "cursor-pointer group" : ""
                      }`}
                    >
                      <td className="py-3.5 px-6 font-bold text-[#0d9488] group-hover:underline">
                        {row.dateStr}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{row.durationLabel}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-1.5">
                        <span>{row.title}</span>
                        {row.isRecurring && <Repeat className="h-3.5 w-3.5 text-teal-600" />}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{row.room}</td>
                      <td className="py-3.5 px-4 text-slate-600">{row.teacher}</td>
                      <td className="py-3.5 px-6 text-end">
                        {row.kind === "lesson" ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextStatusMap: Record<CalendarLesson["status"], CalendarLesson["status"]> = {
                                SCHEDULED: "IN_PROGRESS",
                                IN_PROGRESS: "COMPLETED",
                                COMPLETED: "CANCELLED",
                                CANCELLED: "SCHEDULED",
                              };
                              const nextStatus = nextStatusMap[row.lessonObj.status];
                              setLessons(
                                lessons.map((l) => (l.id === row.id ? { ...l, status: nextStatus } : l))
                              );
                            }}
                            className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-md transition-colors cursor-pointer ${
                              row.status === "SCHEDULED"
                                ? "bg-[#dbeafe] text-[#1d4ed8] hover:bg-[#bfdbfe]"
                                : row.status === "IN_PROGRESS"
                                ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                : row.status === "COMPLETED"
                                ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                            }`}
                            title="Click to cycle status"
                          >
                            <span>{row.status}</span>
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        ) : (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-md text-[11px] font-bold ${
                              row.color === "salmon"
                                ? "bg-[#fecdd3] text-[#9f1239]"
                                : "bg-[#e0e7ff] text-[#4338ca]"
                            }`}
                          >
                            School Event
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        )}
      </div>

      {/* Interactive Popover Card on clicking a lesson (matching Screenshot 2) */}
      {selectedLesson && (
        <div
          className="fixed inset-0 z-50 bg-black/10 backdrop-blur-2xs flex items-center justify-center p-4"
          onClick={() => setSelectedLesson(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl border border-slate-200 p-5 w-80 text-xs space-y-4 animate-in fade-in zoom-in-95 duration-100"
          >
            {/* Popover Title */}
            <div className="flex items-start gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0284c7] mt-1 shrink-0" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-tight">
                  {selectedLesson.title}
                </h3>
              </div>
            </div>

            {/* Time & Duration */}
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>
                {selectedLesson.startTime}-{selectedLesson.endTime}
              </span>
              <span className="text-slate-300">&bull;</span>
              <Timer className="h-3.5 w-3.5 text-slate-400" />
              <span>{selectedLesson.durationLabel}</span>
            </div>

            {/* Teacher pill */}
            <div>
              <span className="bg-slate-100 text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-md">
                {selectedLesson.teacher || "Unassigned"}
              </span>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded uppercase">
                {selectedLesson.status}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setLessons(lessons.filter((l) => l.id !== selectedLesson.id));
                    setSelectedLesson(null);
                  }}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-slate-50"
                  title="Delete Lesson"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-800 rounded hover:bg-slate-50"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: Add Recurring Lesson (matching Screenshot 4) */}
      {isAddRecurringModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Add Recurring Lesson</h3>
              <button
                onClick={() => setIsAddRecurringModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRecurringLesson} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Classes</label>
                <select
                  value={recClass}
                  onChange={(e) => setRecClass(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="1st Grade">1st Grade</option>
                  <option value="2nd Grade">2nd Grade</option>
                  <option value="Grade 7 - Blue">Grade 7 - Blue</option>
                  <option value="Grade 8 - Alpha">Grade 8 - Alpha</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Class Courses*</label>
                <select
                  value={recCourse}
                  onChange={(e) => setRecCourse(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="Social Studies 1">Social Studies 1</option>
                  <option value="Math 1">Math 1</option>
                  <option value="Math 2">Math 2</option>
                  <option value="Science 1">Science 1</option>
                  <option value="Science 2">Science 2</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Teachers</label>
                <select
                  value={recTeacher}
                  onChange={(e) => setRecTeacher(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="James O'Connor">James O'Connor</option>
                  <option value="Robert Kim">Robert Kim</option>
                  <option value="Sarah Wanjiru">Sarah Wanjiru</option>
                  <option value="David Okeke">David Okeke</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Start Date*</label>
                  <input
                    type="date"
                    value={recStartDate}
                    onChange={(e) => setRecStartDate(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">End Date*</label>
                  <input
                    type="date"
                    value={recEndDate}
                    onChange={(e) => setRecEndDate(e.target.value)}
                    className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Day of week*</label>
                <div className="p-2 border border-slate-300 rounded-lg flex items-center gap-1.5 flex-wrap">
                  {recDayOfWeek.map((d) => (
                    <span
                      key={d}
                      className="bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1"
                    >
                      {d}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setRecDayOfWeek(recDayOfWeek.filter((item) => item !== d))}
                      />
                    </span>
                  ))}
                  <select
                    onChange={(e) => {
                      if (!recDayOfWeek.includes(e.target.value)) {
                        setRecDayOfWeek([...recDayOfWeek, e.target.value]);
                      }
                    }}
                    className="text-xs bg-transparent border-0 focus:outline-none text-slate-500 cursor-pointer"
                  >
                    <option value="">+ Add Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Start Time*</label>
                <div className="relative">
                  <input
                    type="text"
                    value={recStartTime}
                    onChange={(e) => setRecStartTime(e.target.value)}
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
                      min={0}
                      max={8}
                      value={recDurationHours}
                      onChange={(e) => setRecDurationHours(Number(e.target.value))}
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
                      value={recDurationMinutes}
                      onChange={(e) => setRecDurationMinutes(Number(e.target.value))}
                      className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white mt-0.5"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Interval*</label>
                <select
                  value={recInterval}
                  onChange={(e) => setRecInterval(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white font-bold"
                >
                  <option value="WEEKLY">WEEKLY</option>
                  <option value="BIWEEKLY">BIWEEKLY</option>
                  <option value="MONTHLY">MONTHLY</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Title</label>
                <input
                  type="text"
                  placeholder="Optional custom title"
                  value={recTitle}
                  onChange={(e) => setRecTitle(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Classroom</label>
                <select
                  value={recClassroom}
                  onChange={(e) => setRecClassroom(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="">Select classroom</option>
                  <option value="Room 101">Room 101</option>
                  <option value="Room 102">Room 102</option>
                  <option value="Lab 2">Lab 2</option>
                  <option value="Lab 3">Lab 3</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Meeting link</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={recMeetingLink}
                  onChange={(e) => setRecMeetingLink(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddRecurringModalOpen(false)}
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

      {/* MODAL 2: Add Single Lesson (matching Screenshot 5) */}
      {isAddLessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Add Lesson</h3>
              <button
                onClick={() => setIsAddLessonModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSingleLesson} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">Classes*</label>
                <select
                  value={formClass}
                  onChange={(e) => setFormClass(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="1st Grade">1st Grade</option>
                  <option value="2nd Grade">2nd Grade</option>
                  <option value="Grade 7 - Blue">Grade 7 - Blue</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Class Course*</label>
                <select
                  value={formCourse}
                  onChange={(e) => setFormCourse(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="Social Studies 1">Social Studies 1</option>
                  <option value="Math 1">Math 1</option>
                  <option value="Science 1">Science 1</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Teachers</label>
                <select
                  value={formTeacher}
                  onChange={(e) => setFormTeacher(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="James O'Connor">James O'Connor</option>
                  <option value="Robert Kim">Robert Kim</option>
                  <option value="Sarah Wanjiru">Sarah Wanjiru</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Date*</label>
                <input
                  type="date"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Start Time*</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
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
                      value={formDurationHours}
                      onChange={(e) => setFormDurationHours(Number(e.target.value))}
                      className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white mt-0.5"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Minutes</span>
                    <input
                      type="number"
                      value={formDurationMinutes}
                      onChange={(e) => setFormDurationMinutes(Number(e.target.value))}
                      className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white mt-0.5"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Classroom</label>
                <select
                  value={formClassroom}
                  onChange={(e) => setFormClassroom(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                >
                  <option value="">Select classroom</option>
                  <option value="Room 101">Room 101</option>
                  <option value="Lab 2">Lab 2</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Meeting link</label>
                <input
                  type="text"
                  value={formMeetingLink}
                  onChange={(e) => setFormMeetingLink(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Password</label>
                <input
                  type="text"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

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

      {/* MODAL 3: Add School Event (matching Screenshot 6) */}
      {isAddEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
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
                <label className="font-bold text-slate-700">Title*</label>
                <input
                  type="text"
                  required
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Science Fair Exhibition"
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Description</label>
                <textarea
                  rows={2}
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Date*</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Start Time*</label>
                <div className="relative">
                  <input
                    type="text"
                    value={eventStartTime}
                    onChange={(e) => setEventStartTime(e.target.value)}
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
                      value={eventDurationHours}
                      onChange={(e) => setEventDurationHours(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full h-10 px-3 border border-slate-300 rounded-lg text-xs bg-white mt-0.5"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Minutes</span>
                    <input
                      type="number"
                      value={eventDurationMinutes}
                      onChange={(e) => setEventDurationMinutes(Number(e.target.value))}
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
                    value={eventColor}
                    onChange={(e) => setEventColor(e.target.value)}
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
                    checked={eventVisibleStudents}
                    onChange={(e) => setEventVisibleStudents(e.target.checked)}
                    className="h-4 w-4 rounded text-teal-600 focus:ring-teal-500 border-slate-300"
                  />
                  <span>Visible to students</span>
                </label>

                <label className="flex items-center gap-2 font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventVisibleTeachers}
                    onChange={(e) => setEventVisibleTeachers(e.target.checked)}
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
    </div>
  );
}
