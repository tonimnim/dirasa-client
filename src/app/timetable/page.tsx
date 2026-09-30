"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Calendar,
  Clock,
  Plus,
  Filter,
  Users,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Download,
  ExternalLink,
  Copy,
  Check,
  UserX,
  UserCheck,
  Sun,
  Moon,
  ChevronRight,
  BookOpen,
  X,
  Sparkles,
  MapPin,
  Video,
} from "lucide-react";

// --- Types ---
type BellScheduleType = "standard" | "ramadan" | "exam";
type ActiveTab = "grid" | "cover" | "events" | "schedules";

interface PeriodSlot {
  periodNumber: number;
  name: string;
  standardTime: string;
  ramadanTime: string;
  examTime: string;
  isBreak?: boolean;
}

interface TimetableCell {
  id: string;
  day: string; // "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday"
  periodNumber: number;
  subject: string;
  teacher: string;
  teacherId: string;
  room: string;
  meetingLink?: string;
  syllabusUnit?: string;
  color: string;
}

interface AbsenceRecord {
  id: string;
  teacherName: string;
  teacherId: string;
  date: string;
  reason: "Sick Leave" | "Bereavement" | "Professional Training" | "Personal Emergency";
  affectedPeriods: number[];
  assignedCovers: Record<number, { coverTeacherName: string; coverTeacherId: string }>;
  status: "Uncovered" | "Partially Covered" | "Fully Covered";
}

interface TeacherAvailability {
  id: string;
  name: string;
  subject: string;
  freePeriods: number[];
}

interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  audience: "All School" | "Grade 7-9" | "Faculty Only" | "Guardians & PTA";
  description: string;
  category: "Academic" | "Cultural & Religious" | "Sports" | "Administrative";
}

// --- Data Constants ---
const BELL_PERIODS: PeriodSlot[] = [
  { periodNumber: 1, name: "Period 1", standardTime: "08:00 - 08:45", ramadanTime: "08:30 - 09:05", examTime: "09:00 - 10:30" },
  { periodNumber: 2, name: "Period 2", standardTime: "08:50 - 09:35", ramadanTime: "09:10 - 09:45", examTime: "10:30 - 11:00 (Break)", isBreak: false },
  { periodNumber: 0, name: "Morning Break / Recess", standardTime: "09:35 - 09:55", ramadanTime: "09:45 - 10:00", examTime: "11:00 - 11:15", isBreak: true },
  { periodNumber: 3, name: "Period 3", standardTime: "09:55 - 10:40", ramadanTime: "10:00 - 10:35", examTime: "11:15 - 12:45" },
  { periodNumber: 4, name: "Period 4", standardTime: "10:45 - 11:30", ramadanTime: "10:40 - 11:15", examTime: "12:45 - 13:15 (Study)", isBreak: false },
  { periodNumber: 5, name: "Period 5", standardTime: "11:35 - 12:20", ramadanTime: "11:20 - 11:55", examTime: "Dismissal", isBreak: false },
  { periodNumber: -1, name: "Lunch & Dhuhr Prayer", standardTime: "12:20 - 13:10", ramadanTime: "11:55 - 12:25", examTime: "Dismissal", isBreak: true },
  { periodNumber: 6, name: "Period 6", standardTime: "13:10 - 13:55", ramadanTime: "12:25 - 13:00", examTime: "Independent Study" },
  { periodNumber: 7, name: "Period 7", standardTime: "14:00 - 14:45", ramadanTime: "13:05 - 13:40", examTime: "Tutoring" },
  { periodNumber: 8, name: "Period 8", standardTime: "14:50 - 15:30", ramadanTime: "Dismissal (13:40)", examTime: "Staff Meeting" },
];

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const INITIAL_SCHEDULE: TimetableCell[] = [
  // Monday
  { id: "m1", day: "Monday", periodNumber: 1, subject: "Mathematics", teacher: "Sarah Jenkins", teacherId: "t-01", room: "Lab 2B", meetingLink: "https://meet.google.com/mth-7a-01", syllabusUnit: "Algebraic Expressions", color: "border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-950 dark:text-sky-200" },
  { id: "m2", day: "Monday", periodNumber: 2, subject: "English Lit", teacher: "Kwame Mensah", teacherId: "t-02", room: "Room 104", meetingLink: "https://teams.microsoft.com/l/meet/eng7a", syllabusUnit: "Post-Colonial Poetry", color: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200" },
  { id: "m3", day: "Monday", periodNumber: 3, subject: "Arabic Language", teacher: "Zainab Al-Hashemi", teacherId: "t-03", room: "Room 108", meetingLink: "https://meet.google.com/arb-7a-zn", syllabusUnit: "Classical Grammar", color: "border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200" },
  { id: "m4", day: "Monday", periodNumber: 4, subject: "General Science", teacher: "Dr. Adebayo Ogun", teacherId: "t-04", room: "Science Lab 1", meetingLink: "https://meet.google.com/sci-7a-lab", syllabusUnit: "Cellular Mitosis", color: "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200" },
  { id: "m5", day: "Monday", periodNumber: 5, subject: "Islamic Studies / Ethics", teacher: "Sheikh Tariq Omar", teacherId: "t-05", room: "Room 202", meetingLink: "https://meet.google.com/isl-7a-om", syllabusUnit: "Fiqh & Moral Reasoning", color: "border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-950 dark:text-teal-200" },
  { id: "m6", day: "Monday", periodNumber: 6, subject: "Computer Science", teacher: "Fatima Al-Falasi", teacherId: "t-06", room: "IT Hub 3", meetingLink: "https://meet.google.com/cs-7a-it", syllabusUnit: "Python Loops & Lists", color: "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-950 dark:text-cyan-200" },
  { id: "m7", day: "Monday", periodNumber: 7, subject: "History & Geography", teacher: "David Kimani", teacherId: "t-07", room: "Room 105", meetingLink: "https://teams.microsoft.com/l/meet/his7a", syllabusUnit: "East African Trade Routes", color: "border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-950 dark:text-orange-200" },
  { id: "m8", day: "Monday", periodNumber: 8, subject: "Physical Education", teacher: "Coach Musa Bello", teacherId: "t-08", room: "Gymnasium", syllabusUnit: "Track & Field Readiness", color: "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200" },

  // Tuesday
  { id: "t1", day: "Tuesday", periodNumber: 1, subject: "Arabic Language", teacher: "Zainab Al-Hashemi", teacherId: "t-03", room: "Room 108", meetingLink: "https://meet.google.com/arb-7a-zn", syllabusUnit: "Reading Comprehension", color: "border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200" },
  { id: "t2", day: "Tuesday", periodNumber: 2, subject: "Mathematics", teacher: "Sarah Jenkins", teacherId: "t-01", room: "Lab 2B", meetingLink: "https://meet.google.com/mth-7a-01", syllabusUnit: "Linear Equations", color: "border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-950 dark:text-sky-200" },
  { id: "t3", day: "Tuesday", periodNumber: 3, subject: "General Science", teacher: "Dr. Adebayo Ogun", teacherId: "t-04", room: "Science Lab 1", meetingLink: "https://meet.google.com/sci-7a-lab", syllabusUnit: "Osmosis Experiment", color: "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200" },
  { id: "t4", day: "Tuesday", periodNumber: 4, subject: "English Lit", teacher: "Kwame Mensah", teacherId: "t-02", room: "Room 104", meetingLink: "https://teams.microsoft.com/l/meet/eng7a", syllabusUnit: "Essay Composition", color: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200" },
  { id: "t5", day: "Tuesday", periodNumber: 5, subject: "French / Kiswahili", teacher: "Marie Dubois", teacherId: "t-09", room: "Room 112", meetingLink: "https://meet.google.com/lang-7a", syllabusUnit: "Conversational Dialogues", color: "border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-950 dark:text-purple-200" },
  { id: "t6", day: "Tuesday", periodNumber: 6, subject: "Art & Design", teacher: "Leila Haddad", teacherId: "t-10", room: "Studio 2", meetingLink: "https://meet.google.com/art-7a", syllabusUnit: "Islamic Geometric Tile Design", color: "border-pink-500 bg-pink-50 dark:bg-pink-950/40 text-pink-950 dark:text-pink-200" },
  { id: "t7", day: "Tuesday", periodNumber: 7, subject: "Mathematics", teacher: "Sarah Jenkins", teacherId: "t-01", room: "Lab 2B", meetingLink: "https://meet.google.com/mth-7a-01", syllabusUnit: "Quadratic Patterns", color: "border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-950 dark:text-sky-200" },
  { id: "t8", day: "Tuesday", periodNumber: 8, subject: "Study Hall & Remedial", teacher: "Kwame Mensah", teacherId: "t-02", room: "Library", syllabusUnit: "Supervised Homework", color: "border-slate-500 bg-slate-100 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200" },

  // Wednesday
  { id: "w1", day: "Wednesday", periodNumber: 1, subject: "General Science", teacher: "Dr. Adebayo Ogun", teacherId: "t-04", room: "Science Lab 1", meetingLink: "https://meet.google.com/sci-7a-lab", syllabusUnit: "Chemical Elements & Compounds", color: "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200" },
  { id: "w2", day: "Wednesday", periodNumber: 2, subject: "Computer Science", teacher: "Fatima Al-Falasi", teacherId: "t-06", room: "IT Hub 3", meetingLink: "https://meet.google.com/cs-7a-it", syllabusUnit: "Algorithms & Flowcharts", color: "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-950 dark:text-cyan-200" },
  { id: "w3", day: "Wednesday", periodNumber: 3, subject: "Mathematics", teacher: "Sarah Jenkins", teacherId: "t-01", room: "Lab 2B", meetingLink: "https://meet.google.com/mth-7a-01", syllabusUnit: "Fractions & Decimals Review", color: "border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-950 dark:text-sky-200" },
  { id: "w4", day: "Wednesday", periodNumber: 4, subject: "Islamic Studies / Ethics", teacher: "Sheikh Tariq Omar", teacherId: "t-05", room: "Room 202", meetingLink: "https://meet.google.com/isl-7a-om", syllabusUnit: "Hadith Studies", color: "border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-950 dark:text-teal-200" },
  { id: "w5", day: "Wednesday", periodNumber: 5, subject: "English Lit", teacher: "Kwame Mensah", teacherId: "t-02", room: "Room 104", meetingLink: "https://teams.microsoft.com/l/meet/eng7a", syllabusUnit: "Shakespeare Drama", color: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200" },
  { id: "w6", day: "Wednesday", periodNumber: 6, subject: "Music & Performing Arts", teacher: "Chidi Nwachukwu", teacherId: "t-11", room: "Auditorium", meetingLink: "https://meet.google.com/mus-7a", syllabusUnit: "Rhythmic Percussion", color: "border-violet-500 bg-violet-50 dark:bg-violet-950/40 text-violet-950 dark:text-violet-200" },
  { id: "w7", day: "Wednesday", periodNumber: 7, subject: "History & Geography", teacher: "David Kimani", teacherId: "t-07", room: "Room 105", meetingLink: "https://teams.microsoft.com/l/meet/his7a", syllabusUnit: "Geographical GIS Mapping", color: "border-orange-500 bg-orange-50 dark:bg-orange-950/40 text-orange-950 dark:text-orange-200" },
  { id: "w8", day: "Wednesday", periodNumber: 8, subject: "Arabic Language", teacher: "Zainab Al-Hashemi", teacherId: "t-03", room: "Room 108", meetingLink: "https://meet.google.com/arb-7a-zn", syllabusUnit: "Dictation & Calligraphy", color: "border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200" },

  // Thursday
  { id: "th1", day: "Thursday", periodNumber: 1, subject: "English Lit", teacher: "Kwame Mensah", teacherId: "t-02", room: "Room 104", meetingLink: "https://teams.microsoft.com/l/meet/eng7a", syllabusUnit: "Creative Storyboarding", color: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200" },
  { id: "th2", day: "Thursday", periodNumber: 2, subject: "French / Kiswahili", teacher: "Marie Dubois", teacherId: "t-09", room: "Room 112", meetingLink: "https://meet.google.com/lang-7a", syllabusUnit: "Grammar Conjugation", color: "border-purple-500 bg-purple-50 dark:bg-purple-950/40 text-purple-950 dark:text-purple-200" },
  { id: "th3", day: "Thursday", periodNumber: 3, subject: "General Science", teacher: "Dr. Adebayo Ogun", teacherId: "t-04", room: "Science Lab 1", meetingLink: "https://meet.google.com/sci-7a-lab", syllabusUnit: "States of Matter", color: "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200" },
  { id: "th4", day: "Thursday", periodNumber: 4, subject: "Mathematics", teacher: "Sarah Jenkins", teacherId: "t-01", room: "Lab 2B", meetingLink: "https://meet.google.com/mth-7a-01", syllabusUnit: "Geometry: Angles & Polygons", color: "border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-950 dark:text-sky-200" },
  { id: "th5", day: "Thursday", periodNumber: 5, subject: "Computer Science", teacher: "Fatima Al-Falasi", teacherId: "t-06", room: "IT Hub 3", meetingLink: "https://meet.google.com/cs-7a-it", syllabusUnit: "Web Dev HTML & CSS", color: "border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-950 dark:text-cyan-200" },
  { id: "th6", day: "Thursday", periodNumber: 6, subject: "Physical Education", teacher: "Coach Musa Bello", teacherId: "t-08", room: "Gymnasium", syllabusUnit: "Basketball Fundamentals", color: "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200" },
  { id: "th7", day: "Thursday", periodNumber: 7, subject: "Arabic Language", teacher: "Zainab Al-Hashemi", teacherId: "t-03", room: "Room 108", meetingLink: "https://meet.google.com/arb-7a-zn", syllabusUnit: "Poetry Analysis", color: "border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200" },
  { id: "th8", day: "Thursday", periodNumber: 8, subject: "Club & Co-curricular", teacher: "Faculty Leads", teacherId: "t-all", room: "Campus Grounds", syllabusUnit: "Robotics & Debate", color: "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200" },

  // Friday
  { id: "f1", day: "Friday", periodNumber: 1, subject: "Mathematics", teacher: "Sarah Jenkins", teacherId: "t-01", room: "Lab 2B", meetingLink: "https://meet.google.com/mth-7a-01", syllabusUnit: "Weekly Quiz & Formative", color: "border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-950 dark:text-sky-200" },
  { id: "f2", day: "Friday", periodNumber: 2, subject: "Arabic Language", teacher: "Zainab Al-Hashemi", teacherId: "t-03", room: "Room 108", meetingLink: "https://meet.google.com/arb-7a-zn", syllabusUnit: "Spelling & Morphology", color: "border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200" },
  { id: "f3", day: "Friday", periodNumber: 3, subject: "English Lit", teacher: "Kwame Mensah", teacherId: "t-02", room: "Room 104", meetingLink: "https://teams.microsoft.com/l/meet/eng7a", syllabusUnit: "Spelling Bee Prep", color: "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200" },
  { id: "f4", day: "Friday", periodNumber: 4, subject: "Islamic Studies / Juma'a Prep", teacher: "Sheikh Tariq Omar", teacherId: "t-05", room: "Mosque / Hall", meetingLink: "https://meet.google.com/isl-7a-om", syllabusUnit: "Friday Khutbah Reflection", color: "border-teal-500 bg-teal-50 dark:bg-teal-950/40 text-teal-950 dark:text-teal-200" },
  { id: "f5", day: "Friday", periodNumber: 5, subject: "Early Weekend Assembly", teacher: "Principal H. Al-Mansoor", teacherId: "t-dir", room: "Central Hall", syllabusUnit: "Weekly Honors & Values", color: "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-200" },
];

const AVAILABLE_TEACHERS: TeacherAvailability[] = [
  { id: "t-04", name: "Dr. Adebayo Ogun", subject: "Science", freePeriods: [1, 2, 5, 7, 8] },
  { id: "t-06", name: "Fatima Al-Falasi", subject: "Computer Science", freePeriods: [1, 3, 4, 7, 8] },
  { id: "t-07", name: "David Kimani", subject: "Humanities", freePeriods: [2, 3, 4, 5, 8] },
  { id: "t-11", name: "Chidi Nwachukwu", subject: "Creative Arts", freePeriods: [1, 2, 3, 4, 5, 7] },
  { id: "t-09", name: "Marie Dubois", subject: "Languages", freePeriods: [1, 3, 4, 6, 7, 8] },
];

const INITIAL_EVENTS: SchoolEvent[] = [
  { id: "ev-01", title: "Term 1 STEM Fair & Robotics Showcase", date: "2026-10-15", time: "09:00 - 13:00", location: "Main Gymnasium", audience: "All School", category: "Academic", description: "Annual scientific innovation showcase featuring Grade 6-12 engineering projects and live drone navigation." },
  { id: "ev-02", title: "Ramadan Transition & Bell Schedule Orientation", date: "2026-10-22", time: "16:00 - 17:30", location: "Auditorium & Virtual Stream", audience: "Guardians & PTA", category: "Cultural & Religious", description: "Briefing on holy month timetable alterations, fasting student safeguarding, and shortened school hours." },
  { id: "ev-03", title: "Inter-House Athletics Championship", date: "2026-11-04", time: "08:00 - 14:00", location: "Sports Stadium", audience: "Grade 7-9", category: "Sports", description: "Annual track and field competition across Falcon, Oasis, Cedar, and Dunes houses." },
  { id: "ev-04", title: "Curriculum Moderation & Staff In-Service Day", date: "2026-11-12", time: "08:30 - 15:30", location: "Staff Conference Center", audience: "Faculty Only", category: "Administrative", description: "Cross-departmental standardisation of WAEC, GCSE, and IB internal assessments." },
];

export default function TimetablePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("grid");
  const [bellSchedule, setBellSchedule] = useState<BellScheduleType>("standard");
  const [selectedClass, setSelectedClass] = useState("Grade 7-A");
  const [selectedCell, setSelectedCell] = useState<TimetableCell | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Substitute Cover Board State
  const [absences, setAbsences] = useState<AbsenceRecord[]>([
    {
      id: "abs-01",
      teacherName: "Sarah Jenkins",
      teacherId: "t-01",
      date: "2026-10-01",
      reason: "Sick Leave",
      affectedPeriods: [2, 5],
      assignedCovers: {
        2: { coverTeacherName: "Dr. Adebayo Ogun", coverTeacherId: "t-04" },
      },
      status: "Partially Covered",
    },
    {
      id: "abs-02",
      teacherName: "Kwame Mensah",
      teacherId: "t-02",
      date: "2026-10-01",
      reason: "Professional Training",
      affectedPeriods: [4, 6],
      assignedCovers: {},
      status: "Uncovered",
    },
  ]);

  const [selectedAbsenceForCover, setSelectedAbsenceForCover] = useState<{
    absence: AbsenceRecord;
    periodNumber: number;
  } | null>(null);

  // New Absence Form Modal
  const [isReportAbsenceOpen, setIsReportAbsenceOpen] = useState(false);
  const [newAbsenceTeacher, setNewAbsenceTeacher] = useState("Zainab Al-Hashemi");
  const [newAbsenceReason, setNewAbsenceReason] = useState<AbsenceRecord["reason"]>("Sick Leave");
  const [newAbsencePeriods, setNewAbsencePeriods] = useState<number[]>([1, 2]);

  // Calendar Event Audience Filter
  const [eventAudienceFilter, setEventAudienceFilter] = useState<string>("All");
  const [eventsList, setEventsList] = useState<SchoolEvent[]>(INITIAL_EVENTS);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("2026-11-20");
  const [newEventTime, setNewEventTime] = useState("10:00 - 12:00");
  const [newEventLocation, setNewEventLocation] = useState("Auditorium");
  const [newEventAudience, setNewEventAudience] = useState<SchoolEvent["audience"]>("All School");
  const [newEventCategory, setNewEventCategory] = useState<SchoolEvent["category"]>("Academic");
  const [newEventDesc, setNewEventDesc] = useState("");

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const handleAssignCover = (teacherId: string, teacherName: string) => {
    if (!selectedAbsenceForCover) return;
    const { absence, periodNumber } = selectedAbsenceForCover;

    setAbsences((prev) =>
      prev.map((rec) => {
        if (rec.id !== absence.id) return rec;
        const updatedCovers = {
          ...rec.assignedCovers,
          [periodNumber]: { coverTeacherName: teacherName, coverTeacherId: teacherId },
        };
        const allCovered = rec.affectedPeriods.every((p) => updatedCovers[p]);
        return {
          ...rec,
          assignedCovers: updatedCovers,
          status: allCovered ? "Fully Covered" : "Partially Covered",
        };
      })
    );
    setSelectedAbsenceForCover(null);
  };

  const handleCreateAbsence = () => {
    const newRecord: AbsenceRecord = {
      id: `abs-${Date.now()}`,
      teacherName: newAbsenceTeacher,
      teacherId: `t-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      reason: newAbsenceReason,
      affectedPeriods: newAbsencePeriods,
      assignedCovers: {},
      status: "Uncovered",
    };
    setAbsences([newRecord, ...absences]);
    setIsReportAbsenceOpen(false);
  };

  const handleCreateEvent = () => {
    if (!newEventTitle) return;
    const item: SchoolEvent = {
      id: `ev-${Date.now()}`,
      title: newEventTitle,
      date: newEventDate,
      time: newEventTime,
      location: newEventLocation,
      audience: newEventAudience,
      category: newEventCategory,
      description: newEventDesc || "School sanctioned gathering.",
    };
    setEventsList([item, ...eventsList]);
    setIsAddEventOpen(false);
    setNewEventTitle("");
    setNewEventDesc("");
  };

  const exportIcsCalendar = () => {
    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Dirasa SMS//School Events Timetable//EN",
      "CALSCALE:GREGORIAN",
    ];

    eventsList.forEach((ev) => {
      const cleanDate = ev.date.replace(/-/g, "");
      icsLines.push("BEGIN:VEVENT");
      icsLines.push(`UID:${ev.id}@dirasa.school`);
      icsLines.push(`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`);
      icsLines.push(`DTSTART;VALUE=DATE:${cleanDate}`);
      icsLines.push(`SUMMARY:${ev.title}`);
      icsLines.push(`DESCRIPTION:${ev.description} (Audience: ${ev.audience})`);
      icsLines.push(`LOCATION:${ev.location}`);
      icsLines.push("END:VEVENT");
    });

    icsLines.push("END:VCALENDAR");
    const blob = new Blob([icsLines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Dirasa_Events_Calendar_${new Date().getFullYear()}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEvents = eventsList.filter((e) => {
    return eventAudienceFilter === "All" || e.audience === eventAudienceFilter;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AppHeader />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-600/10 text-sky-600 dark:text-sky-400">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Timetable & Bell Schedules
                    {bellSchedule === "ramadan" && (
                      <Badge variant="warning" className="gap-1 animate-pulse">
                        <Moon className="h-3 w-3" /> Ramadan Mode Active
                      </Badge>
                    )}
                    {bellSchedule === "exam" && (
                      <Badge variant="danger" className="gap-1">
                        Exam Blocks Active
                      </Badge>
                    )}
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Cycle schedule matrix, Ramadan & Exam variations, cover dispatch, and school calendar
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsReportAbsenceOpen(true)}
                className="gap-1.5 text-xs text-rose-600 border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                <UserX className="h-3.5 w-3.5" /> Report Absence
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={exportIcsCalendar}
                className="gap-1.5 text-xs text-slate-700 dark:text-slate-300"
              >
                <Download className="h-3.5 w-3.5" /> Export Calendar (.ics)
              </Button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("grid")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "grid"
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Timetable Grid
              </button>
              <button
                onClick={() => setActiveTab("cover")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                  activeTab === "cover"
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Substitute Cover Board
                {absences.some((a) => a.status !== "Fully Covered") && (
                  <span className="ms-1.5 inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "events"
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                School Events Calendar ({eventsList.length})
              </button>
              <button
                onClick={() => setActiveTab("schedules")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === "schedules"
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                Bell Schedule Definitions
              </button>
            </div>

            {/* Bell Schedule Mode Selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs">
              <span className="text-[11px] font-medium text-slate-500 px-2 flex items-center gap-1">
                <Clock className="h-3 w-3" /> Schedule Mode:
              </span>
              <button
                onClick={() => setBellSchedule("standard")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  bellSchedule === "standard"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Standard (45m)
              </button>
              <button
                onClick={() => setBellSchedule("ramadan")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  bellSchedule === "ramadan"
                    ? "bg-amber-500 text-white shadow-xs font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-amber-600"
                }`}
              >
                <Moon className="h-3 w-3" /> Ramadan (35m)
              </button>
              <button
                onClick={() => setBellSchedule("exam")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  bellSchedule === "exam"
                    ? "bg-indigo-600 text-white shadow-xs font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-indigo-600"
                }`}
              >
                Exam Blocks (90m)
              </button>
            </div>
          </div>

          {/* TAB 1: TIMETABLE GRID */}
          {activeTab === "grid" && (
            <div className="space-y-4">
              {/* Filter / Class Selector Bar */}
              <Card>
                <CardContent className="p-3.5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Class Section:
                    </span>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="h-8 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    >
                      <option value="Grade 7-A">Grade 7-A (Middle School)</option>
                      <option value="Grade 7-B">Grade 7-B (Middle School)</option>
                      <option value="Grade 8-A">Grade 8-A (Middle School)</option>
                      <option value="Grade 9-A">Grade 9-A (IGCSE / WAEC)</option>
                      <option value="Grade 10-C">Grade 10-C (IB Diploma / CAPS)</option>
                    </select>
                    <Badge variant="info">Cycle Week A - 5 Days</Badge>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-sky-500" /> Math / Science
                    </div>
                    <div className="flex items-center gap-1.5 ms-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Languages
                    </div>
                    <div className="flex items-center gap-1.5 ms-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500" /> Arabic / Islamic
                    </div>
                    <div className="flex items-center gap-1.5 ms-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-500" /> Tech / Arts
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timetable Matrix */}
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 shadow-xs">
                <table className="w-full text-start border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-slate-100/75 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs">
                      <th className="p-3 text-start w-36 font-semibold">
                        Period & Timing
                      </th>
                      {DAYS_OF_WEEK.map((day) => (
                        <th key={day} className="p-3 text-start font-semibold border-s border-slate-200 dark:border-slate-800">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {BELL_PERIODS.map((slot, index) => {
                      const timeStr =
                        bellSchedule === "ramadan"
                          ? slot.ramadanTime
                          : bellSchedule === "exam"
                          ? slot.examTime
                          : slot.standardTime;

                      if (slot.isBreak) {
                        return (
                          <tr
                            key={`break-${index}`}
                            className="bg-amber-50/50 dark:bg-amber-950/20 text-slate-600 dark:text-slate-300"
                          >
                            <td className="p-2.5 font-medium text-amber-900 dark:text-amber-400">
                              <div className="flex items-center gap-1.5">
                                <Sun className="h-3.5 w-3.5 text-amber-500" />
                                <span className="font-semibold text-[11px]">{slot.name}</span>
                              </div>
                              <div className="text-[10px] text-slate-500 font-mono mt-0.5">{timeStr}</div>
                            </td>
                            <td colSpan={5} className="p-2.5 text-center text-xs font-medium text-amber-800 dark:text-amber-300 tracking-wide border-s border-slate-200 dark:border-slate-800">
                              {slot.name} — All Classes Intermission & Supervision
                            </td>
                          </tr>
                        );
                      }

                      return (
                        <tr key={`p-${slot.periodNumber}`} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                          <td className="p-3 font-medium bg-slate-50/60 dark:bg-slate-800/40 w-36">
                            <div className="font-bold text-slate-900 dark:text-white">
                              {slot.name}
                            </div>
                            <div className="font-mono text-[11px] text-sky-700 dark:text-sky-400 mt-0.5">
                              {timeStr}
                            </div>
                          </td>

                          {DAYS_OF_WEEK.map((day) => {
                            const cell = INITIAL_SCHEDULE.find(
                              (c) => c.day === day && c.periodNumber === slot.periodNumber
                            );

                            if (!cell) {
                              return (
                                <td
                                  key={`${day}-${slot.periodNumber}`}
                                  className="p-2 border-s border-slate-200 dark:border-slate-800 text-slate-400 italic text-[11px]"
                                >
                                  Free / Prep Period
                                </td>
                              );
                            }

                            return (
                              <td
                                key={cell.id}
                                onClick={() => setSelectedCell(cell)}
                                className="p-2 border-s border-slate-200 dark:border-slate-800 align-top cursor-pointer group"
                              >
                                <div
                                  className={`p-2.5 rounded-lg border transition-all duration-150 hover:shadow-md ${cell.color}`}
                                >
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="font-bold text-[12px] truncate">{cell.subject}</span>
                                    {cell.meetingLink && (
                                      <span
                                        title="Virtual Link Available"
                                        className="text-sky-600 dark:text-sky-300 flex-shrink-0"
                                      >
                                        <Video className="h-3 w-3" />
                                      </span>
                                    )}
                                  </div>

                                  <div className="text-[11px] opacity-90 truncate mt-1 flex items-center gap-1">
                                    <Users className="h-2.5 w-2.5" />
                                    <span>{cell.teacher}</span>
                                  </div>

                                  <div className="flex items-center justify-between text-[10px] opacity-75 mt-1.5 pt-1 border-t border-current/15">
                                    <span className="flex items-center gap-0.5">
                                      <MapPin className="h-2.5 w-2.5" /> {cell.room}
                                    </span>
                                    <span className="group-hover:translate-x-0.5 transition-transform text-sky-700 dark:text-sky-300">
                                      Details &rarr;
                                    </span>
                                  </div>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: SUBSTITUTE COVER BOARD */}
          {activeTab === "cover" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-sky-50 dark:bg-sky-950/30 p-4 rounded-xl border border-sky-200 dark:border-sky-900">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-sky-600 text-white rounded-lg">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-sky-900 dark:text-sky-200">
                      Automated Conflict-Free Cover Dispatch
                    </h2>
                    <p className="text-xs text-sky-700 dark:text-sky-400 mt-0.5">
                      Allocates non-contact faculty to absent teachers with instant timetable clash detection.
                    </p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsReportAbsenceOpen(true)}
                  className="bg-sky-600 hover:bg-sky-700 text-xs gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" /> Report Faculty Absence
                </Button>
              </div>

              {/* Active Absence Requests Table */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Today’s Unplanned Absences & Coverage Roster (2026-10-01)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Assign standby teachers to prevent unsupervised classrooms.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-start text-xs">
                      <thead className="bg-slate-50 dark:bg-slate-800/60 border-y border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase">
                        <tr>
                          <th className="py-3 px-4 text-start">Absent Teacher</th>
                          <th className="py-3 px-4 text-start">Reason</th>
                          <th className="py-3 px-4 text-start">Affected Periods</th>
                          <th className="py-3 px-4 text-start">Status</th>
                          <th className="py-3 px-4 text-start">Assigned Cover Teachers</th>
                          <th className="py-3 px-4 text-end">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        {absences.map((rec) => (
                          <tr key={rec.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                            <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                              <div className="h-7 w-7 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-xs">
                                {rec.teacherName.slice(0, 1)}
                              </div>
                              {rec.teacherName}
                            </td>
                            <td className="py-3.5 px-4">
                              <Badge variant="outline" className="border-rose-300 text-rose-700 dark:text-rose-400">
                                {rec.reason}
                              </Badge>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex gap-1">
                                {rec.affectedPeriods.map((p) => (
                                  <span
                                    key={p}
                                    className={`px-2 py-0.5 rounded font-mono text-[11px] font-semibold ${
                                      rec.assignedCovers[p]
                                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                                        : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                                    }`}
                                  >
                                    Period {p}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <Badge
                                variant={
                                  rec.status === "Fully Covered"
                                    ? "success"
                                    : rec.status === "Partially Covered"
                                    ? "warning"
                                    : "danger"
                                }
                              >
                                {rec.status}
                              </Badge>
                            </td>
                            <td className="py-3.5 px-4">
                              {Object.keys(rec.assignedCovers).length === 0 ? (
                                <span className="text-slate-400 italic">No covers assigned</span>
                              ) : (
                                <div className="space-y-1">
                                  {Object.entries(rec.assignedCovers).map(([period, cover]) => (
                                    <div key={period} className="flex items-center gap-1.5 text-[11px]">
                                      <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                      <span className="font-semibold">P{period}:</span> {cover.coverTeacherName}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-end">
                              <div className="flex justify-end gap-1.5">
                                {rec.affectedPeriods
                                  .filter((p) => !rec.assignedCovers[p])
                                  .map((p) => (
                                    <Button
                                      key={p}
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setSelectedAbsenceForCover({ absence: rec, periodNumber: p })}
                                      className="text-xs bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-300 hover:bg-sky-100"
                                    >
                                      Cover Period {p}
                                    </Button>
                                  ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Standby Free Staff Roster */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Faculty Non-Contact Period Directory</CardTitle>
                  <CardDescription className="text-xs">
                    Teachers currently on preparation time who can be deployed for emergency substitute lessons.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {AVAILABLE_TEACHERS.map((teacher) => (
                      <div
                        key={teacher.id}
                        className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold text-xs text-slate-900 dark:text-slate-100">
                            {teacher.name}
                          </div>
                          <div className="text-[10px] text-slate-500">{teacher.subject} Faculty</div>
                          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                            Free Periods: {teacher.freePeriods.join(", ")}
                          </div>
                        </div>
                        <Badge variant="info">Standby</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 3: SCHOOL EVENTS CALENDAR */}
          {activeTab === "events" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Audience Filter:</span>
                  {["All", "All School", "Grade 7-9", "Faculty Only", "Guardians & PTA"].map((aud) => (
                    <button
                      key={aud}
                      onClick={() => setEventAudienceFilter(aud)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        eventAudienceFilter === aud
                          ? "bg-sky-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      }`}
                    >
                      {aud}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={exportIcsCalendar}
                    className="gap-1.5 text-xs text-slate-700 dark:text-slate-200"
                  >
                    <Download className="h-3.5 w-3.5" /> Download .ICS
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setIsAddEventOpen(true)}
                    className="gap-1.5 text-xs bg-sky-600 hover:bg-sky-700"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add School Event
                  </Button>
                </div>
              </div>

              {/* Events Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvents.map((ev) => (
                  <Card key={ev.id} className="hover:border-sky-500/50 transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Badge
                            variant={
                              ev.category === "Academic"
                                ? "info"
                                : ev.category === "Cultural & Religious"
                                ? "warning"
                                : ev.category === "Sports"
                                ? "success"
                                : "outline"
                            }
                            className="mb-1 text-[10px]"
                          >
                            {ev.category}
                          </Badge>
                          <CardTitle className="text-sm font-bold text-slate-900 dark:text-white">
                            {ev.title}
                          </CardTitle>
                        </div>
                        <Badge variant="outline" className="text-[11px]">
                          {ev.audience}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                      <p className="line-clamp-2">{ev.description}</p>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="h-3.5 w-3.5 text-sky-600" /> {ev.date}
                        </span>
                        <span className="flex items-center gap-1 font-mono">
                          <Clock className="h-3.5 w-3.5 text-sky-600" /> {ev.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-rose-500" /> {ev.location}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BELL SCHEDULE DEFINITIONS */}
          {activeTab === "schedules" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Institutional Bell Schedule Presets</CardTitle>
                  <CardDescription className="text-xs">
                    Comparison between Regular 45-minute periods, Ramadan 35-minute shortened blocks, and Examination windows.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-start text-xs border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                        <tr>
                          <th className="py-3 px-4 text-start">Period #</th>
                          <th className="py-3 px-4 text-start">Period Name</th>
                          <th className="py-3 px-4 text-start bg-sky-50/50 dark:bg-sky-950/20 text-sky-900 dark:text-sky-300">
                            Standard Schedule (45m)
                          </th>
                          <th className="py-3 px-4 text-start bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300">
                            Ramadan Schedule (35m)
                          </th>
                          <th className="py-3 px-4 text-start bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-900 dark:text-indigo-300">
                            Exam Schedule (90m)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                        {BELL_PERIODS.map((slot, i) => (
                          <tr
                            key={i}
                            className={slot.isBreak ? "bg-amber-50/30 dark:bg-amber-950/10 font-sans" : ""}
                          >
                            <td className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-300">
                              {slot.periodNumber > 0 ? `P${slot.periodNumber}` : "Break"}
                            </td>
                            <td className="py-2.5 px-4 font-sans font-medium text-slate-900 dark:text-white">
                              {slot.name}
                            </td>
                            <td className="py-2.5 px-4 text-sky-800 dark:text-sky-300 font-medium">
                              {slot.standardTime}
                            </td>
                            <td className="py-2.5 px-4 text-amber-800 dark:text-amber-300 font-medium">
                              {slot.ramadanTime}
                            </td>
                            <td className="py-2.5 px-4 text-indigo-800 dark:text-indigo-300 font-medium">
                              {slot.examTime}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* DETAIL MODAL: TIMETABLE CELL INSPECTOR */}
          {selectedCell && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="info" className="mb-1 text-[10px]">
                      {selectedCell.day} &bull; Period {selectedCell.periodNumber}
                    </Badge>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {selectedCell.subject}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCell(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Instructor:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {selectedCell.teacher}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Classroom / Lab:</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {selectedCell.room}
                      </span>
                    </div>
                    {selectedCell.syllabusUnit && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Syllabus Topic:</span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {selectedCell.syllabusUnit}
                        </span>
                      </div>
                    )}
                  </div>

                  {selectedCell.meetingLink && (
                    <div className="space-y-1.5">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        Online Classroom Link:
                      </span>
                      <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-mono text-sky-600 dark:text-sky-400 break-all">
                        <Video className="h-4 w-4 shrink-0 text-sky-500" />
                        <span className="truncate">{selectedCell.meetingLink}</span>
                        <button
                          onClick={() => handleCopyLink(selectedCell.meetingLink!)}
                          className="p-1 text-slate-500 hover:text-slate-900 shrink-0"
                          title="Copy Link"
                        >
                          {copiedLink === selectedCell.meetingLink ? (
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <a
                          href={selectedCell.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 text-slate-500 hover:text-sky-600 shrink-0"
                          title="Open Video Call"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="outline" size="sm" onClick={() => setSelectedCell(null)}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-sky-600 hover:bg-sky-700"
                    onClick={() => {
                      alert(`Syllabus and lesson plan for ${selectedCell.subject} synced.`);
                      setSelectedCell(null);
                    }}
                  >
                    View Lesson Plan
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL: ALLOCATE COVER TEACHER (WITH CLASH CHECK) */}
          {selectedAbsenceForCover && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 animate-in fade-in zoom-in-95">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="warning" className="mb-1 text-[10px]">
                      Period {selectedAbsenceForCover.periodNumber} Cover Assignment
                    </Badge>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Select Cover for {selectedAbsenceForCover.absence.teacherName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      System automatically validates faculty timetable conflicts for Period{" "}
                      {selectedAbsenceForCover.periodNumber}.
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedAbsenceForCover(null)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Faculty Availability Roster:
                  </h4>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-60 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                    {AVAILABLE_TEACHERS.map((teacher) => {
                      const isFree = teacher.freePeriods.includes(
                        selectedAbsenceForCover.periodNumber
                      );
                      return (
                        <div
                          key={teacher.id}
                          className="p-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 text-xs"
                        >
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                              {teacher.name}
                              <span className="text-[10px] text-slate-500 font-normal">
                                ({teacher.subject})
                              </span>
                            </div>
                            <div className="text-[11px] mt-0.5">
                              {isFree ? (
                                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                                  <CheckCircle2 className="h-3 w-3" /> Free in Period{" "}
                                  {selectedAbsenceForCover.periodNumber} (No Clash)
                                </span>
                              ) : (
                                <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium">
                                  <AlertCircle className="h-3 w-3" /> Timetable Clash: In Class
                                </span>
                              )}
                            </div>
                          </div>

                          <Button
                            variant={isFree ? "primary" : "outline"}
                            size="sm"
                            disabled={!isFree}
                            onClick={() => handleAssignCover(teacher.id, teacher.name)}
                            className={
                              isFree
                                ? "bg-sky-600 hover:bg-sky-700 text-xs"
                                : "opacity-40 cursor-not-allowed text-xs"
                            }
                          >
                            Assign Cover
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedAbsenceForCover(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL: REPORT TEACHER ABSENCE */}
          {isReportAbsenceOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Report Faculty Absence
                    </h3>
                    <p className="text-xs text-slate-500">
                      Log unscheduled staff leave to open coverage slots.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsReportAbsenceOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Faculty Member:
                    </label>
                    <select
                      value={newAbsenceTeacher}
                      onChange={(e) => setNewAbsenceTeacher(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      <option value="Zainab Al-Hashemi">Zainab Al-Hashemi (Arabic)</option>
                      <option value="Sarah Jenkins">Sarah Jenkins (Mathematics)</option>
                      <option value="Kwame Mensah">Kwame Mensah (English)</option>
                      <option value="Dr. Adebayo Ogun">Dr. Adebayo Ogun (Science)</option>
                      <option value="Fatima Al-Falasi">Fatima Al-Falasi (CompSci)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Absence Reason:
                    </label>
                    <select
                      value={newAbsenceReason}
                      onChange={(e) =>
                        setNewAbsenceReason(e.target.value as AbsenceRecord["reason"])
                      }
                      className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    >
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Bereavement">Bereavement</option>
                      <option value="Professional Training">Professional Training</option>
                      <option value="Personal Emergency">Personal Emergency</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Affected Periods:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => {
                        const checked = newAbsencePeriods.includes(p);
                        return (
                          <button
                            type="button"
                            key={p}
                            onClick={() => {
                              if (checked) {
                                setNewAbsencePeriods(newAbsencePeriods.filter((x) => x !== p));
                              } else {
                                setNewAbsencePeriods([...newAbsencePeriods, p]);
                              }
                            }}
                            className={`py-1.5 rounded-lg border font-mono font-semibold transition-all ${
                              checked
                                ? "bg-rose-600 text-white border-rose-600"
                                : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            P{p}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="outline" size="sm" onClick={() => setIsReportAbsenceOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleCreateAbsence}
                    className="bg-rose-600 hover:bg-rose-700 text-xs"
                  >
                    Post Absence & Open Cover
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL: ADD SCHOOL EVENT */}
          {isAddEventOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Create School Event
                    </h3>
                    <p className="text-xs text-slate-500">
                      Add to institutional calendar with targeted community notification.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddEventOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Event Title:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Science Olympiad Finals"
                      value={newEventTitle}
                      onChange={(e) => setNewEventTitle(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Date:
                      </label>
                      <input
                        type="date"
                        value={newEventDate}
                        onChange={(e) => setNewEventDate(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Time Window:
                      </label>
                      <input
                        type="text"
                        placeholder="10:00 - 12:00"
                        value={newEventTime}
                        onChange={(e) => setNewEventTime(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Location:
                      </label>
                      <input
                        type="text"
                        placeholder="Auditorium"
                        value={newEventLocation}
                        onChange={(e) => setNewEventLocation(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                        Audience:
                      </label>
                      <select
                        value={newEventAudience}
                        onChange={(e) =>
                          setNewEventAudience(e.target.value as SchoolEvent["audience"])
                        }
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="All School">All School</option>
                        <option value="Grade 7-9">Grade 7-9</option>
                        <option value="Faculty Only">Faculty Only</option>
                        <option value="Guardians & PTA">Guardians & PTA</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 dark:text-slate-400 font-medium mb-1">
                      Description:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Brief details regarding event protocol..."
                      value={newEventDesc}
                      onChange={(e) => setNewEventDesc(e.target.value)}
                      className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="outline" size="sm" onClick={() => setIsAddEventOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleCreateEvent}
                    className="bg-sky-600 hover:bg-sky-700 text-xs"
                  >
                    Save & Broadcast Event
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
