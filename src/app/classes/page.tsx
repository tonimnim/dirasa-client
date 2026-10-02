"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/legacy-ui/Button";
import { Badge } from "@/components/legacy-ui/Badge";
import {
  GraduationCap,
  Users,
  BookOpen,
  UserCheck,
  Search,
  Plus,
  ChevronRight,
  MoreVertical,
  Calendar,
  Layers,
  X,
  Clock,
  MapPin,
  CheckCircle2,
} from "lucide-react";

export interface ClassSection {
  id: string;
  name: string;
  gradeLevel: string;
  homeroomTeacher: string;
  studentsCount: number;
  capacity: number;
  coursesCount: number;
  shift: string;
  room: string;
  sampleStudents: string[];
}

export interface CourseItem {
  id: string;
  code: string;
  title: string;
  department: string;
  teacher: string;
  gradeLevel: string;
  credits: number;
  enrolledStudents: number;
}

export const INITIAL_CLASSES: ClassSection[] = [
  {
    id: "cls-1",
    name: "Grade 7 - Blue",
    gradeLevel: "Grade 7 (Year 8)",
    homeroomTeacher: "Ms. Sarah Wanjiru",
    studentsCount: 24,
    capacity: 28,
    coursesCount: 8,
    shift: "Morning (08:00 - 14:30)",
    room: "Building B - Room 101",
    sampleStudents: ["Mason Harrington", "Caleb Bennett", "Tariq Mansoor", "Amina Al-Falasi"],
  },
  {
    id: "cls-2",
    name: "Grade 7 - Gold",
    gradeLevel: "Grade 7 (Year 8)",
    homeroomTeacher: "Mr. David Okeke",
    studentsCount: 22,
    capacity: 28,
    coursesCount: 8,
    shift: "Morning (08:00 - 14:30)",
    room: "Building B - Room 102",
    sampleStudents: ["Chloe Dubois", "Leila Hassan"],
  },
  {
    id: "cls-3",
    name: "Grade 8 - Alpha",
    gradeLevel: "Grade 8 (Year 9)",
    homeroomTeacher: "Ms. Amina Mansoor",
    studentsCount: 26,
    capacity: 30,
    coursesCount: 9,
    shift: "Morning (08:00 - 14:30)",
    room: "Building B - Room 201",
    sampleStudents: ["Adrian Orchard", "Lucas Silva"],
  },
  {
    id: "cls-4",
    name: "Grade 8 - Beta",
    gradeLevel: "Grade 8 (Year 9)",
    homeroomTeacher: "Mr. Jean-Luc Mbida",
    studentsCount: 25,
    capacity: 30,
    coursesCount: 9,
    shift: "Morning (08:00 - 14:30)",
    room: "Building B - Room 202",
    sampleStudents: ["Zayn Mwangi", "Noah Kimani"],
  },
  {
    id: "cls-5",
    name: "Grade 9 - Science",
    gradeLevel: "Grade 9 (Year 10)",
    homeroomTeacher: "Dr. Fatima El-Khatib",
    studentsCount: 20,
    capacity: 25,
    coursesCount: 10,
    shift: "Morning (08:00 - 14:30)",
    room: "Science Wing - Lab 3",
    sampleStudents: ["Fatima Zahra"],
  },
  {
    id: "cls-6",
    name: "Grade 9 - Arts",
    gradeLevel: "Grade 9 (Year 10)",
    homeroomTeacher: "Mr. Alex Mwangi",
    studentsCount: 18,
    capacity: 25,
    coursesCount: 9,
    shift: "Morning (08:00 - 14:30)",
    room: "Arts Atelier - Studio 2",
    sampleStudents: ["Aisha Kamau"],
  },
  {
    id: "cls-7",
    name: "Grade 10 - Pre-Med",
    gradeLevel: "Grade 10 (Year 11)",
    homeroomTeacher: "Dr. Aris Thorne",
    studentsCount: 21,
    capacity: 25,
    coursesCount: 10,
    shift: "Morning (08:00 - 14:30)",
    room: "Science Wing - Biology Lab",
    sampleStudents: ["Sophia Chen"],
  },
  {
    id: "cls-8",
    name: "Grade 10 - Tech & Coding",
    gradeLevel: "Grade 10 (Year 11)",
    homeroomTeacher: "Ms. Elena Rostova",
    studentsCount: 23,
    capacity: 25,
    coursesCount: 10,
    shift: "Morning (08:00 - 14:30)",
    room: "Innovation Hub - Computer Lab 1",
    sampleStudents: ["David Adeyemi"],
  },
  {
    id: "cls-9",
    name: "Grade 11 - Humanities",
    gradeLevel: "Grade 11 (Year 12)",
    homeroomTeacher: "Mr. Samuel Kimani",
    studentsCount: 19,
    capacity: 25,
    coursesCount: 9,
    shift: "Morning (08:00 - 14:30)",
    room: "Building C - Lecture Hall A",
    sampleStudents: ["Marcus Osei"],
  },
  {
    id: "cls-10",
    name: "Grade 11 - STEM & Robotics",
    gradeLevel: "Grade 11 (Year 12)",
    homeroomTeacher: "Dr. Marcus Vance",
    studentsCount: 22,
    capacity: 25,
    coursesCount: 11,
    shift: "Morning (08:00 - 14:30)",
    room: "Robotics Workshop",
    sampleStudents: ["Marcus Osei"],
  },
  {
    id: "cls-11",
    name: "Grade 12 - Senior Scholars",
    gradeLevel: "Grade 12 (Year 13)",
    homeroomTeacher: "Mrs. Grace Oladipo",
    studentsCount: 18,
    capacity: 20,
    coursesCount: 10,
    shift: "Morning (08:00 - 14:30)",
    room: "Senior Seminar Room",
    sampleStudents: ["Elena Rostova Jr"],
  },
];

export const SAMPLE_COURSES: CourseItem[] = [
  // Middle School Courses
  { id: "c-01", code: "MTH-701", title: "Middle School Mathematics 7", department: "STEM", teacher: "Ms. Sarah Wanjiru", gradeLevel: "Grade 7", credits: 4, enrolledStudents: 46 },
  { id: "c-02", code: "ENG-701", title: "English Literature & Composition 7", department: "Humanities", teacher: "Ms. Amina Mansoor", gradeLevel: "Grade 7", credits: 4, enrolledStudents: 46 },
  { id: "c-03", code: "SCI-701", title: "General Integrated Science 7", department: "STEM", teacher: "Ms. Sarah Wanjiru", gradeLevel: "Grade 7", credits: 4, enrolledStudents: 46 },
  { id: "c-04", code: "HST-701", title: "World History & Geography 7", department: "Humanities", teacher: "Mr. David Okeke", gradeLevel: "Grade 7", credits: 3, enrolledStudents: 46 },
  { id: "c-05", code: "ARB-701", title: "Arabic Language & Culture 7", department: "Languages", teacher: "Ms. Layla Benali", gradeLevel: "Grade 7", credits: 3, enrolledStudents: 46 },
  { id: "c-06", code: "FRN-701", title: "Introductory French 7", department: "Languages", teacher: "Mr. Jean-Luc Mbida", gradeLevel: "Grade 7", credits: 3, enrolledStudents: 46 },
  { id: "c-07", code: "ART-701", title: "Visual Arts Exploration 7", department: "Arts", teacher: "Mr. Alex Mwangi", gradeLevel: "Grade 7", credits: 2, enrolledStudents: 46 },
  { id: "c-08", code: "PED-701", title: "Physical Education & Wellness 7", department: "Athletics", teacher: "Mr. Bilal El-Sayed", gradeLevel: "Grade 7", credits: 2, enrolledStudents: 46 },

  // Grade 8 Courses
  { id: "c-09", code: "MTH-801", title: "Pre-Algebra & Foundations 8", department: "STEM", teacher: "Ms. Sarah Wanjiru", gradeLevel: "Grade 8", credits: 4, enrolledStudents: 51 },
  { id: "c-10", code: "ENG-801", title: "English Literature & Essay Writing 8", department: "Humanities", teacher: "Ms. Amina Mansoor", gradeLevel: "Grade 8", credits: 4, enrolledStudents: 51 },
  { id: "c-11", code: "SCI-801", title: "Physical & Earth Science 8", department: "STEM", teacher: "Dr. Fatima El-Khatib", gradeLevel: "Grade 8", credits: 4, enrolledStudents: 51 },
  { id: "c-12", code: "ROB-801", title: "Introductory Robotics & Logic", department: "STEM", teacher: "Mr. Mason Harrington", gradeLevel: "Grade 8", credits: 3, enrolledStudents: 51 },
  { id: "c-13", code: "HST-801", title: "African & Middle Eastern History 8", department: "Humanities", teacher: "Mr. David Okeke", gradeLevel: "Grade 8", credits: 3, enrolledStudents: 51 },
  { id: "c-14", code: "ARB-801", title: "Intermediate Arabic 8", department: "Languages", teacher: "Ms. Layla Benali", gradeLevel: "Grade 8", credits: 3, enrolledStudents: 51 },
  { id: "c-15", code: "FRN-801", title: "French Communication 8", department: "Languages", teacher: "Mr. Jean-Luc Mbida", gradeLevel: "Grade 8", credits: 3, enrolledStudents: 51 },
  { id: "c-16", code: "MUS-801", title: "Music Theory & Performance 8", department: "Arts", teacher: "Ms. Grace Nduta", gradeLevel: "Grade 8", credits: 2, enrolledStudents: 51 },
  { id: "c-17", code: "PED-801", title: "Physical Education 8", department: "Athletics", teacher: "Mr. Bilal El-Sayed", gradeLevel: "Grade 8", credits: 2, enrolledStudents: 51 },

  // Grade 9 Courses
  { id: "c-18", code: "BIO-901", title: "General Biology & Cell Systems", department: "STEM", teacher: "Dr. Fatima El-Khatib", gradeLevel: "Grade 9", credits: 4, enrolledStudents: 38 },
  { id: "c-19", code: "CHM-901", title: "Introductory Chemistry & Lab", department: "STEM", teacher: "Dr. Fatima El-Khatib", gradeLevel: "Grade 9", credits: 4, enrolledStudents: 20 },
  { id: "c-20", code: "MTH-901", title: "Algebra 1 & Functions", department: "STEM", teacher: "Ms. Sarah Wanjiru", gradeLevel: "Grade 9", credits: 4, enrolledStudents: 38 },
  { id: "c-21", code: "ENG-901", title: "World Literature 9", department: "Humanities", teacher: "Ms. Amina Mansoor", gradeLevel: "Grade 9", credits: 4, enrolledStudents: 38 },
  { id: "c-22", code: "ART-901", title: "Studio Painting & Sculpture 9", department: "Arts", teacher: "Mr. Alex Mwangi", gradeLevel: "Grade 9", credits: 3, enrolledStudents: 18 },
  { id: "c-23", code: "GEO-901", title: "Global Human Geography", department: "Humanities", teacher: "Mr. David Okeke", gradeLevel: "Grade 9", credits: 3, enrolledStudents: 38 },
  { id: "c-24", code: "CMP-901", title: "Computer Science Principles", department: "STEM", teacher: "Ms. Elena Rostova", gradeLevel: "Grade 9", credits: 3, enrolledStudents: 20 },
  { id: "c-25", code: "FRN-901", title: "French Literature 9", department: "Languages", teacher: "Mr. Jean-Luc Mbida", gradeLevel: "Grade 9", credits: 3, enrolledStudents: 38 },
  { id: "c-26", code: "PED-901", title: "Sports Athletics 9", department: "Athletics", teacher: "Mr. Bilal El-Sayed", gradeLevel: "Grade 9", credits: 2, enrolledStudents: 38 },

  // Grade 10 Courses
  { id: "c-27", code: "BIO-101", title: "Human Anatomy & Physiology", department: "STEM", teacher: "Dr. Fatima El-Khatib", gradeLevel: "Grade 10", credits: 4, enrolledStudents: 21 },
  { id: "c-28", code: "CHM-101", title: "Organic & Physical Chemistry", department: "STEM", teacher: "Dr. Fatima El-Khatib", gradeLevel: "Grade 10", credits: 4, enrolledStudents: 21 },
  { id: "c-29", code: "CS-101", title: "Data Structures & Python Programming", department: "STEM", teacher: "Ms. Elena Rostova", gradeLevel: "Grade 10", credits: 4, enrolledStudents: 23 },
  { id: "c-30", code: "CS-102", title: "Web Engineering & Database Design", department: "STEM", teacher: "Ms. Elena Rostova", gradeLevel: "Grade 10", credits: 3, enrolledStudents: 23 },
  { id: "c-31", code: "MTH-101", title: "Geometry & Pre-Calculus", department: "STEM", teacher: "Ms. Sarah Wanjiru", gradeLevel: "Grade 10", credits: 4, enrolledStudents: 44 },
  { id: "c-32", code: "ENG-101", title: "American & Postcolonial Literature", department: "Humanities", teacher: "Ms. Amina Mansoor", gradeLevel: "Grade 10", credits: 4, enrolledStudents: 44 },
  { id: "c-33", code: "ECN-101", title: "Introductory Economics & Commerce", department: "Humanities", teacher: "Mr. David Okeke", gradeLevel: "Grade 10", credits: 3, enrolledStudents: 44 },
  { id: "c-34", code: "PED-101", title: "Physical Education 10", department: "Athletics", teacher: "Mr. Bilal El-Sayed", gradeLevel: "Grade 10", credits: 2, enrolledStudents: 44 },

  // Grade 11 & 12 Advanced Courses
  { id: "c-35", code: "AP-CALC", title: "AP Calculus BC", department: "STEM", teacher: "Ms. Sarah Wanjiru", gradeLevel: "Grade 11-12", credits: 5, enrolledStudents: 40 },
  { id: "c-36", code: "AP-PHYS", title: "AP Physics C: Mechanics", department: "STEM", teacher: "Dr. Fatima El-Khatib", gradeLevel: "Grade 11-12", credits: 5, enrolledStudents: 22 },
  { id: "c-37", code: "AP-ROB", title: "Advanced Robotics & Mechatronics", department: "STEM", teacher: "Mr. Mason Harrington", gradeLevel: "Grade 11", credits: 4, enrolledStudents: 22 },
  { id: "c-38", code: "AP-ENG", title: "AP English Literature & Composition", department: "Humanities", teacher: "Ms. Amina Mansoor", gradeLevel: "Grade 11-12", credits: 5, enrolledStudents: 37 },
  { id: "c-39", code: "AP-HIST", title: "AP European & World History", department: "Humanities", teacher: "Mr. David Okeke", gradeLevel: "Grade 11", credits: 5, enrolledStudents: 19 },
  { id: "c-40", code: "AP-ECON", title: "AP Macro & Microeconomics", department: "Humanities", teacher: "Mr. David Okeke", gradeLevel: "Grade 11-12", credits: 5, enrolledStudents: 37 },
  { id: "c-41", code: "AP-STAT", title: "AP Statistics & Data Analytics", department: "STEM", teacher: "Ms. Sarah Wanjiru", gradeLevel: "Grade 12", credits: 5, enrolledStudents: 18 },
  { id: "c-42", code: "GOV-120", title: "International Relations & Diplomacy", department: "Humanities", teacher: "Mr. David Okeke", gradeLevel: "Grade 12", credits: 4, enrolledStudents: 18 },
  { id: "c-43", code: "ART-120", title: "Senior Portfolio & Curatorial Studies", department: "Arts", teacher: "Mr. Alex Mwangi", gradeLevel: "Grade 12", credits: 4, enrolledStudents: 18 },
  { id: "c-44", code: "CAP-120", title: "Senior Capstone Research Thesis", department: "Academics", teacher: "Ms. Sarah Wanjiru", gradeLevel: "Grade 12", credits: 4, enrolledStudents: 18 },
];

export default function ClassesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<ClassSection[]>(INITIAL_CLASSES);
  const [courses] = useState<CourseItem[]>(SAMPLE_COURSES);
  const [activeTab, setActiveTab] = useState<"classes" | "courses" | "rooms">("classes");
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<ClassSection | null>(null);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);

  // New Class Form State
  const [newClassName, setNewClassName] = useState("");
  const [newGradeLevel, setNewGradeLevel] = useState("Grade 7 (Year 8)");
  const [newTeacher, setNewTeacher] = useState("Ms. Sarah Wanjiru");
  const [newCapacity, setNewCapacity] = useState(28);
  const [newRoom, setNewRoom] = useState("Building B - Room 103");

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    const newCls: ClassSection = {
      id: `cls-${classes.length + 1}`,
      name: newClassName,
      gradeLevel: newGradeLevel,
      homeroomTeacher: newTeacher,
      studentsCount: 0,
      capacity: Number(newCapacity),
      coursesCount: 8,
      shift: "Morning (08:00 - 14:30)",
      room: newRoom,
      sampleStudents: [],
    };

    setClasses([...classes, newCls]);
    setIsAddClassModalOpen(false);
    setNewClassName("");
  };

  const filteredClasses = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.homeroomTeacher.toLowerCase().includes(search.toLowerCase()) ||
      c.gradeLevel.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher.toLowerCase().includes(search.toLowerCase()) ||
      c.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <AppHeader
          title="Studies & Classes"
          subtitle="11 Active Classes • 44 Curriculum Courses • Academic period Sep 2026 - Jul 2027"
          badge="11 Classes & 44 Courses"
          breadcrumbs={[
            { label: "Home", href: "/dashboard" },
            { label: "Classes", current: true },
          ]}
          actionButton={
            <Link href="/classes/new">
              <Button
                variant="primary"
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 text-xs shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                <Plus className="h-4 w-4" /> Add Class
              </Button>
            </Link>
          }
        />

        <main className="p-6 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Tabs Bar */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab("classes")}
                className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                  activeTab === "classes"
                    ? "border-teal-600 dark:border-teal-400 text-teal-700 dark:text-teal-300"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                <span>Classes ({classes.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("courses")}
                className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                  activeTab === "courses"
                    ? "border-teal-600 dark:border-teal-400 text-teal-700 dark:text-teal-300"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Courses & Syllabi ({courses.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("rooms")}
                className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
                  activeTab === "rooms"
                    ? "border-teal-600 dark:border-teal-400 text-teal-700 dark:text-teal-300"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Shifts & Classrooms</span>
              </button>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium pb-2 hidden sm:block">
              School Year: Sep 2026 - Jul 2027
            </div>
          </div>

          {/* Search bar */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="h-4 w-4 text-slate-400 dark:text-slate-500 absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  activeTab === "classes"
                    ? "Search classes, homeroom teachers..."
                    : "Search courses, codes, or subjects..."
                }
                className="w-full h-9 ps-9 pe-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 dark:focus:border-teal-400 shadow-xs"
              />
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {activeTab === "classes"
                ? `Showing ${filteredClasses.length} of ${classes.length} classes`
                : `Showing ${filteredCourses.length} of ${courses.length} courses`}
            </div>
          </div>

          {/* TAB 1: Classes Grid */}
          {activeTab === "classes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredClasses.map((cls) => {
                const occupancy = Math.round((cls.studentsCount / cls.capacity) * 100);
                return (
                  <div
                    key={cls.id}
                    onClick={() => router.push(`/classes/${cls.id}`)}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs hover:border-teal-400 dark:hover:border-teal-500 hover:shadow-md transition-all space-y-4 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-2 py-0.5 rounded-full uppercase">
                          {cls.gradeLevel}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                          {cls.name}
                        </h3>
                      </div>
                      <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1 cursor-pointer">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                        <span>Homeroom: <strong className="text-slate-800 dark:text-slate-100">{cls.homeroomTeacher}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                        <span>{cls.coursesCount} Scheduled Courses</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                        <span>{cls.room}</span>
                      </div>
                    </div>

                    {/* Capacity Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500 dark:text-slate-400">Roster Capacity</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">
                          {cls.studentsCount} / {cls.capacity} ({occupancy}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            occupancy > 90 ? "bg-amber-500" : "bg-teal-500"
                          }`}
                          style={{ width: `${occupancy}%` }}
                        />
                      </div>
                    </div>

                    {/* Actions Footer */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 group-hover:text-teal-800 dark:group-hover:text-teal-300 flex items-center gap-1">
                        Manage Roster <ChevronRight className="h-3 w-3" />
                      </span>
                      <Link
                        href="/attendance"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        Take Roll &rarr;
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: Courses Catalog (44 Courses) */}
          {activeTab === "courses" && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs">
                  <thead className="bg-[#f8fafc] dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4 text-start">Course Code</th>
                      <th className="py-3 px-4 text-start">Course Title</th>
                      <th className="py-3 px-4 text-start">Department</th>
                      <th className="py-3 px-4 text-start">Assigned Faculty</th>
                      <th className="py-3 px-4 text-start">Grade Level</th>
                      <th className="py-3 px-4 text-center">Credits</th>
                      <th className="py-3 px-4 text-end">Enrolled</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {filteredCourses.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-teal-700 dark:text-teal-400 text-[11px]">
                          {c.code}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                          {c.title}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              c.department === "STEM"
                                ? "bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800"
                                : c.department === "Humanities"
                                ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                                : c.department === "Languages"
                                ? "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                                : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            }`}
                          >
                            {c.department}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                          {c.teacher}
                        </td>
                        <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                          {c.gradeLevel}
                        </td>
                        <td className="py-3 px-4 text-center font-bold text-slate-700 dark:text-slate-300">
                          {c.credits}
                        </td>
                        <td className="py-3 px-4 text-end font-semibold text-slate-900 dark:text-white">
                          {c.enrolledStudents} Students
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Shifts & Rooms */}
          {activeTab === "rooms" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: "Building B - Room 101", type: "Homeroom Class", capacity: 30, assigned: "Grade 7 - Blue" },
                { name: "Building B - Room 102", type: "Homeroom Class", capacity: 30, assigned: "Grade 7 - Gold" },
                { name: "Building B - Room 201", type: "Homeroom Class", capacity: 30, assigned: "Grade 8 - Alpha" },
                { name: "Building B - Room 202", type: "Homeroom Class", capacity: 30, assigned: "Grade 8 - Beta" },
                { name: "Science Wing - Lab 3", type: "Wet Laboratory", capacity: 25, assigned: "Grade 9 - Science" },
                { name: "Arts Atelier - Studio 2", type: "Creative Studio", capacity: 25, assigned: "Grade 9 - Arts" },
                { name: "Innovation Hub - Lab 1", type: "Computer Lab", capacity: 28, assigned: "Grade 10 - Tech & Coding" },
                { name: "Robotics Workshop", type: "Makerspace", capacity: 25, assigned: "Grade 11 - STEM & Robotics" },
                { name: "Main Auditorium / Hall", type: "Assembly", capacity: 300, assigned: "School-wide Events" },
              ].map((r, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 space-y-3 shadow-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{r.name}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{r.type}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 px-2 py-0.5 rounded">
                      Max {r.capacity}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 dark:text-slate-500">Current Allocation</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{r.assigned}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Class Details Slide-Over Drawer */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200 border-s border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <div className="p-6 bg-[#0d1527] dark:bg-slate-950 text-white flex items-start justify-between border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded uppercase">
                  {selectedClass.gradeLevel}
                </span>
                <h2 className="text-lg font-bold mt-1.5">{selectedClass.name}</h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Homeroom: {selectedClass.homeroomTeacher} &bull; {selectedClass.room}
                </p>
              </div>
              <button
                onClick={() => setSelectedClass(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs text-slate-700 dark:text-slate-300">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase">Enrolled Students</span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                    {selectedClass.studentsCount} / {selectedClass.capacity}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 dark:text-slate-400 font-bold uppercase">Scheduled Courses</span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                    {selectedClass.coursesCount} Courses
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white">Enrolled Student Roster</h3>
                <div className="divide-y divide-slate-100 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                  {selectedClass.sampleStudents.length > 0 ? (
                    selectedClass.sampleStudents.map((name, i) => (
                      <div key={i} className="p-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 font-bold text-[10px] flex items-center justify-center">
                            {name[0]}
                          </div>
                          <span className="font-medium text-slate-900 dark:text-slate-100">{name}</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                          Attending
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-slate-400 dark:text-slate-500">
                      Roster records allocated via student directory.
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white">Shift & Timetable Details</h3>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span>Shift Hours:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{selectedClass.shift}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assigned Room:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{selectedClass.room}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Academic Year:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">Sep 2026 - Jul 2027</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedClass(null)}
                className="cursor-pointer"
              >
                Close
              </Button>
              <Link
                href="/attendance"
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg cursor-pointer"
              >
                Launch Roll Call
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Add Class Modal */}
      {isAddClassModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <div className="p-5 bg-[#0d1527] dark:bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
              <div>
                <h3 className="font-bold text-base">Add Class Section</h3>
                <p className="text-xs text-slate-300">Create a new class section for 2026/2027</p>
              </div>
              <button
                onClick={() => setIsAddClassModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Class Section Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grade 10 - Honors"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 dark:focus:border-teal-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Academic Stage / Grade</label>
                <select
                  value={newGradeLevel}
                  onChange={(e) => setNewGradeLevel(e.target.value)}
                  className="w-full h-9 px-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg text-xs"
                >
                  <option value="Grade 7 (Year 8)">Grade 7 (Year 8)</option>
                  <option value="Grade 8 (Year 9)">Grade 8 (Year 9)</option>
                  <option value="Grade 9 (Year 10)">Grade 9 (Year 10)</option>
                  <option value="Grade 10 (Year 11)">Grade 10 (Year 11)</option>
                  <option value="Grade 11 (Year 12)">Grade 11 (Year 12)</option>
                  <option value="Grade 12 (Year 13)">Grade 12 (Year 13)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Homeroom Teacher</label>
                <select
                  value={newTeacher}
                  onChange={(e) => setNewTeacher(e.target.value)}
                  className="w-full h-9 px-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg text-xs"
                >
                  <option value="Ms. Sarah Wanjiru">Ms. Sarah Wanjiru (Math & Science)</option>
                  <option value="Mr. David Okeke">Mr. David Okeke (Humanities)</option>
                  <option value="Dr. Fatima El-Khatib">Dr. Fatima El-Khatib (Chemistry)</option>
                  <option value="Mr. Jean-Luc Mbida">Mr. Jean-Luc Mbida (Languages)</option>
                  <option value="Ms. Amina Mansoor">Ms. Amina Mansoor (English)</option>
                  <option value="Mr. Alex Mwangi">Mr. Alex Mwangi (Visual Arts)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Capacity</label>
                  <input
                    type="number"
                    value={newCapacity}
                    onChange={(e) => setNewCapacity(Number(e.target.value))}
                    className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Classroom</label>
                  <input
                    type="text"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    className="w-full h-9 px-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddClassModalOpen(false)}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Create Class
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
