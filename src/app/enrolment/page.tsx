"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  BookOpen,
  Users,
  GraduationCap,
  ArrowRightLeft,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  X,
  Search,
  Sliders,
  Plus,
  ArrowRight,
  ShieldCheck,
  Percent,
  Sparkles,
  Edit2,
  Check,
} from "lucide-react";

export interface StudentInClass {
  id: string;
  name: string;
  admissionNumber: string;
  gender: "Male" | "Female";
  enrolledDate: string;
}

export interface ClassSection {
  id: string;
  name: string; // e.g. "Grade 7-A"
  gradeLevel: string; // e.g. "Grade 7"
  room: string;
  maxCapacity: number;
  allowOverCapacity: boolean;
  homeroomTutor: {
    name: string;
    staffNumber: string;
    email: string;
  };
  students: StudentInClass[];
}

export interface TeachingAssignment {
  id: string;
  subjectCode: string;
  subjectName: string;
  sectionName: string;
  leadTeacher: {
    name: string;
    staffNumber: string;
  };
  coTeacher?: {
    name: string;
    staffNumber: string;
    role: "CoTeacher" | "InclusionAssistant" | "LabTech";
  };
  homeroomTutor: string;
  periodsPerWeek: number;
  room: string;
}

export interface SeniorElectiveBlock {
  blockId: string;
  name: string;
  subjects: {
    id: string;
    name: string;
    code: string;
    enrolledCount: number;
    capacity: number;
  }[];
}

export interface StudentElectiveChoice {
  studentId: string;
  studentName: string;
  admissionNumber: string;
  gradeLevel: string;
  blockAChoice: string;
  blockBChoice: string;
  status: "Confirmed" | "Waitlisted" | "Conflict";
}

const INITIAL_SECTIONS: ClassSection[] = [
  {
    id: "sec-7a",
    name: "Grade 7-A",
    gradeLevel: "Grade 7",
    room: "Block B - Room 201",
    maxCapacity: 28,
    allowOverCapacity: false,
    homeroomTutor: {
      name: "Dr. Amira Al-Mansoor",
      staffNumber: "STF-2021-008",
      email: "amira.mansoor@school.dirasa.ae",
    },
    students: [
      { id: "std-001", name: "Tariq Mansoor", admissionNumber: "ADM-2024-001", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-002", name: "Amina Al-Falasi", admissionNumber: "ADM-2024-002", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-005", name: "Bilal El-Sayed", admissionNumber: "ADM-2024-012", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-006", name: "Layla Benali", admissionNumber: "ADM-2024-015", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-010", name: "Youssef Nabil", admissionNumber: "ADM-2024-031", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-011", name: "Nour Al-Sabah", admissionNumber: "ADM-2024-032", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-012", name: "Ibrahim Khalid", admissionNumber: "ADM-2024-033", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-013", name: "Mariam Qasim", admissionNumber: "ADM-2024-034", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-014", name: "Hamza Darwish", admissionNumber: "ADM-2024-035", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-015", name: "Salma Fayed", admissionNumber: "ADM-2024-036", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-016", name: "Karim Zaki", admissionNumber: "ADM-2024-037", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-017", name: "Lina Hadad", admissionNumber: "ADM-2024-038", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-018", name: "Omar Sherif", admissionNumber: "ADM-2024-039", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-019", name: "Dina Farouk", admissionNumber: "ADM-2024-040", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-020", name: "Rashid Sultan", admissionNumber: "ADM-2024-041", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-021", name: "Hana Rostom", admissionNumber: "ADM-2024-042", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-022", name: "Adam Nasser", admissionNumber: "ADM-2024-043", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-023", name: "Reem Al-Marri", admissionNumber: "ADM-2024-044", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-024", name: "Zaid Barakat", admissionNumber: "ADM-2024-045", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-025", name: "Maya Kazem", admissionNumber: "ADM-2024-046", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-026", name: "Saif Majed", admissionNumber: "ADM-2024-047", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-027", name: "Tala Hamdan", admissionNumber: "ADM-2024-048", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-028", name: "Faris Jamil", admissionNumber: "ADM-2024-049", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-029", name: "Jana Younes", admissionNumber: "ADM-2024-050", gender: "Female", enrolledDate: "2024-09-01" },
    ],
  },
  {
    id: "sec-7b",
    name: "Grade 7-B",
    gradeLevel: "Grade 7",
    room: "Block B - Room 203",
    maxCapacity: 28,
    allowOverCapacity: false,
    homeroomTutor: {
      name: "Samuel Kimani",
      staffNumber: "STF-2022-042",
      email: "samuel.kimani@school.dirasa.ae",
    },
    students: [
      { id: "std-030", name: "Aarav Sharma", admissionNumber: "ADM-2024-051", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-031", name: "Chloe Dupont", admissionNumber: "ADM-2024-052", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-032", name: "Lucas Rossi", admissionNumber: "ADM-2024-053", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-033", name: "Fatima Noor", admissionNumber: "ADM-2024-054", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-034", name: "Liam Chen", admissionNumber: "ADM-2024-055", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-035", name: "Ananya Patel", admissionNumber: "ADM-2024-056", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-036", name: "Kenji Sato", admissionNumber: "ADM-2024-057", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-037", name: "Sofia Silva", admissionNumber: "ADM-2024-058", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-038", name: "Musa Ndlovu", admissionNumber: "ADM-2024-059", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-039", name: "Elena Rostova", admissionNumber: "ADM-2024-060", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-040", name: "Babatunde Adeleke", admissionNumber: "ADM-2024-061", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-041", name: "Isabella Martinez", admissionNumber: "ADM-2024-062", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-042", name: "Zaidan Al-Attar", admissionNumber: "ADM-2024-063", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-043", name: "Nia Mutua", admissionNumber: "ADM-2024-064", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-044", name: "Arthur Pendelton", admissionNumber: "ADM-2024-065", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-045", name: "Rania Sabbagh", admissionNumber: "ADM-2024-066", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-046", name: "Joshua Taylor", admissionNumber: "ADM-2024-067", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-047", name: "Habiba Mostafa", admissionNumber: "ADM-2024-068", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-048", name: "Leo Zimmerman", admissionNumber: "ADM-2024-069", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-049", name: "Khadija Diop", admissionNumber: "ADM-2024-070", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-050", name: "Christian Berg", admissionNumber: "ADM-2024-071", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-051", name: "Zeina Ghanem", admissionNumber: "ADM-2024-072", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-052", name: "Faisal Bin Laden", admissionNumber: "ADM-2024-073", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-053", name: "Maya Lindqvist", admissionNumber: "ADM-2024-074", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-054", name: "Ibrahim Soro", admissionNumber: "ADM-2024-075", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-055", name: "Yara Sleiman", admissionNumber: "ADM-2024-076", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-056", name: "Ethan Walker", admissionNumber: "ADM-2024-077", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-057", name: "Nouran Hatem", admissionNumber: "ADM-2024-078", gender: "Female", enrolledDate: "2024-09-01" },
    ],
  },
  {
    id: "sec-7c",
    name: "Grade 7-C",
    gradeLevel: "Grade 7",
    room: "Block B - Room 205",
    maxCapacity: 28,
    allowOverCapacity: true,
    homeroomTutor: {
      name: "Faith Chebet",
      staffNumber: "STF-2024-118",
      email: "faith.chebet@school.dirasa.ae",
    },
    students: [
      { id: "std-058", name: "Kofi Mensah", admissionNumber: "ADM-2024-079", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-059", name: "Ayla Karimi", admissionNumber: "ADM-2024-080", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-060", name: "Mateo Rossi", admissionNumber: "ADM-2024-081", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-061", name: "Zara Sheikh", admissionNumber: "ADM-2024-082", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-062", name: "David Kim", admissionNumber: "ADM-2024-083", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-063", name: "Sana Mir", admissionNumber: "ADM-2024-084", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-064", name: "Noah Campbell", admissionNumber: "ADM-2024-085", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-065", name: "Amara Diallo", admissionNumber: "ADM-2024-086", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-066", name: "Rayan Haddad", admissionNumber: "ADM-2024-087", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-067", name: "Freja Olsen", admissionNumber: "ADM-2024-088", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-068", name: "Daniel Okafor", admissionNumber: "ADM-2024-089", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-069", name: "Mia Takahashi", admissionNumber: "ADM-2024-090", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-070", name: "Yusuf Kabbani", admissionNumber: "ADM-2024-091", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-071", name: "Leila Benhamou", admissionNumber: "ADM-2024-092", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-072", name: "Julian Novak", admissionNumber: "ADM-2024-093", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-073", name: "Simran Kaur", admissionNumber: "ADM-2024-094", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-074", name: "Ali Reda", admissionNumber: "ADM-2024-095", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-075", name: "Chloe Martin", admissionNumber: "ADM-2024-096", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-076", name: "Hassan Abbas", admissionNumber: "ADM-2024-097", gender: "Male", enrolledDate: "2024-09-01" },
      { id: "std-077", name: "Emma Larsson", admissionNumber: "ADM-2024-098", gender: "Female", enrolledDate: "2024-09-01" },
      { id: "std-078", name: "Tariq Ziyad", admissionNumber: "ADM-2024-099", gender: "Male", enrolledDate: "2024-09-01" },
    ],
  },
];

const INITIAL_ASSIGNMENTS: TeachingAssignment[] = [
  {
    id: "ta-1",
    subjectCode: "MATH-701",
    subjectName: "Mathematics 7",
    sectionName: "Grade 7-A",
    leadTeacher: { name: "Samuel Kimani", staffNumber: "STF-2022-042" },
    coTeacher: { name: "Zainab Olowo", staffNumber: "STF-2022-073", role: "InclusionAssistant" },
    homeroomTutor: "Dr. Amira Al-Mansoor",
    periodsPerWeek: 5,
    room: "Block B - Room 201",
  },
  {
    id: "ta-2",
    subjectCode: "SCI-701",
    subjectName: "Integrated Science 7",
    sectionName: "Grade 7-A",
    leadTeacher: { name: "Dr. Amira Al-Mansoor", staffNumber: "STF-2021-008" },
    coTeacher: { name: "Faith Chebet", staffNumber: "STF-2024-118", role: "LabTech" },
    homeroomTutor: "Dr. Amira Al-Mansoor",
    periodsPerWeek: 4,
    room: "Science Lab 3",
  },
  {
    id: "ta-3",
    subjectCode: "ENG-701",
    subjectName: "English Language & Lit",
    sectionName: "Grade 7-A",
    leadTeacher: { name: "Eleanor Vance (Cover)", staffNumber: "STF-2020-015" },
    homeroomTutor: "Dr. Amira Al-Mansoor",
    periodsPerWeek: 5,
    room: "Block B - Room 201",
  },
  {
    id: "ta-4",
    subjectCode: "ARB-701",
    subjectName: "Arabic Native Language",
    sectionName: "Grade 7-A",
    leadTeacher: { name: "Ustadh Hisham Barakat", staffNumber: "STF-2023-019" },
    homeroomTutor: "Dr. Amira Al-Mansoor",
    periodsPerWeek: 4,
    room: "Block B - Room 201",
  },
  {
    id: "ta-5",
    subjectCode: "CS-701",
    subjectName: "Computer Science & Robotics",
    sectionName: "Grade 7-A",
    leadTeacher: { name: "Faith Chebet", staffNumber: "STF-2024-118" },
    homeroomTutor: "Dr. Amira Al-Mansoor",
    periodsPerWeek: 2,
    room: "Innovation Hub Tech Lab",
  },
  {
    id: "ta-6",
    subjectCode: "ART-701",
    subjectName: "Visual Arts & Design",
    sectionName: "Grade 7-A",
    leadTeacher: { name: "Zainab Olowo", staffNumber: "STF-2022-073" },
    homeroomTutor: "Dr. Amira Al-Mansoor",
    periodsPerWeek: 2,
    room: "Creative Arts Studio",
  },
];

const SENIOR_ELECTIVE_BLOCKS: SeniorElectiveBlock[] = [
  {
    blockId: "block-a",
    name: "Block A (STEM Focus)",
    subjects: [
      { id: "el-cs", name: "Computer Science & AI", code: "CS-901", enrolledCount: 28, capacity: 30 },
      { id: "el-addmath", name: "Additional Pure Mathematics", code: "MTH-902", enrolledCount: 22, capacity: 25 },
      { id: "el-robotics", name: "Robotics & Embedded Systems", code: "ROB-901", enrolledCount: 24, capacity: 24 }, // Full
    ],
  },
  {
    blockId: "block-b",
    name: "Block B (Humanities & Social Sciences)",
    subjects: [
      { id: "el-econ", name: "Economics & Global Markets", code: "ECN-901", enrolledCount: 26, capacity: 30 },
      { id: "el-art", name: "Visual Arts & Graphic Communication", code: "ART-902", enrolledCount: 19, capacity: 25 },
      { id: "el-business", name: "Business Studies & Enterprise", code: "BUS-901", enrolledCount: 30, capacity: 30 }, // Full
    ],
  },
];

const INITIAL_ELECTIVE_STUDENTS: StudentElectiveChoice[] = [
  {
    studentId: "std-s1",
    studentName: "Zayn Mwangi",
    admissionNumber: "ADM-2024-003",
    gradeLevel: "Grade 9 / Form 1",
    blockAChoice: "Computer Science & AI",
    blockBChoice: "Economics & Global Markets",
    status: "Confirmed",
  },
  {
    studentId: "std-s2",
    studentName: "Fatima Zahra",
    admissionNumber: "ADM-2023-089",
    gradeLevel: "Grade 9 / Form 1",
    blockAChoice: "Robotics & Embedded Systems",
    blockBChoice: "Business Studies & Enterprise",
    status: "Confirmed",
  },
  {
    studentId: "std-s3",
    studentName: "Marcus Vance",
    admissionNumber: "ADM-2023-104",
    gradeLevel: "Grade 9 / Form 1",
    blockAChoice: "Robotics & Embedded Systems (Over Capacity)",
    blockBChoice: "Visual Arts & Graphic Communication",
    status: "Waitlisted",
  },
  {
    studentId: "std-s4",
    studentName: "Aaliyah Al-Shamsi",
    admissionNumber: "ADM-2023-112",
    gradeLevel: "Grade 9 / Form 1",
    blockAChoice: "Additional Pure Mathematics",
    blockBChoice: "Business Studies (Clash with Timetable)",
    status: "Conflict",
  },
];

export default function EnrolmentPlacementsPage() {
  const [selectedGrade, setSelectedGrade] = useState("Grade 7");
  const [sections, setSections] = useState<ClassSection[]>(INITIAL_SECTIONS);
  const [assignments, setAssignments] = useState<TeachingAssignment[]>(INITIAL_ASSIGNMENTS);
  const [electiveStudents, setElectiveStudents] = useState<StudentElectiveChoice[]>(INITIAL_ELECTIVE_STUDENTS);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"Sections" | "Assignments" | "Electives">("Sections");

  // Move Student Modal State
  const [moveModalData, setMoveModalData] = useState<{
    sourceSection: ClassSection;
    student: StudentInClass;
  } | null>(null);
  const [targetSectionId, setTargetSectionId] = useState<string>("");
  const [moveEffectiveDate, setMoveEffectiveDate] = useState("2026-10-01");
  const [moveReason, setMoveReason] = useState("Class demographic balance");
  const [moveNotes, setMoveNotes] = useState("");

  // Reassign Teacher Modal State
  const [reassigningAssignment, setReassigningAssignment] = useState<TeachingAssignment | null>(null);
  const [newLeadTeacherName, setNewLeadTeacherName] = useState("");
  const [newCoTeacherName, setNewCoTeacherName] = useState("");

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle Overcapacity
  const handleToggleOverCapacity = (sectionId: string) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;
        const updated = !sec.allowOverCapacity;
        showToast(
          updated
            ? `Over-capacity enrollment allowed for ${sec.name}`
            : `Capacity ceiling strictly enforced (max ${sec.maxCapacity}) for ${sec.name}`
        );
        return { ...sec, allowOverCapacity: updated };
      })
    );
  };

  // Open Move Modal
  const handleOpenMoveModal = (sourceSection: ClassSection, student: StudentInClass) => {
    setMoveModalData({ sourceSection, student });
    const otherSection = sections.find((s) => s.id !== sourceSection.id);
    if (otherSection) {
      setTargetSectionId(otherSection.id);
    }
  };

  // Execute Move Student
  const handleConfirmMove = () => {
    if (!moveModalData || !targetSectionId) return;

    const targetSec = sections.find((s) => s.id === targetSectionId);
    if (!targetSec) return;

    if (
      targetSec.students.length >= targetSec.maxCapacity &&
      !targetSec.allowOverCapacity
    ) {
      alert(`Cannot transfer: ${targetSec.name} has reached maximum seat capacity of ${targetSec.maxCapacity}. Enable 'Allow Over-Capacity' to bypass.`);
      return;
    }

    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === moveModalData.sourceSection.id) {
          return {
            ...sec,
            students: sec.students.filter((st) => st.id !== moveModalData.student.id),
          };
        }
        if (sec.id === targetSectionId) {
          return {
            ...sec,
            students: [...sec.students, moveModalData.student],
          };
        }
        return sec;
      })
    );

    showToast(
      `Successfully transferred ${moveModalData.student.name} from ${moveModalData.sourceSection.name} to ${targetSec.name} (Effective ${moveEffectiveDate})`
    );
    setMoveModalData(null);
  };

  // Reassign Teacher
  const handleConfirmReassign = () => {
    if (!reassigningAssignment) return;

    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id !== reassigningAssignment.id) return a;
        return {
          ...a,
          leadTeacher: newLeadTeacherName
            ? { name: newLeadTeacherName, staffNumber: "STF-UPDATED" }
            : a.leadTeacher,
          coTeacher: newCoTeacherName
            ? { name: newCoTeacherName, staffNumber: "STF-UPDATED", role: "CoTeacher" }
            : a.coTeacher,
        };
      })
    );

    showToast(`Updated teaching assignment for ${reassigningAssignment.subjectName}`);
    setReassigningAssignment(null);
  };

  // Resolve Elective Conflict
  const handleResolveConflict = (studentId: string) => {
    setElectiveStudents((prev) =>
      prev.map((s) =>
        s.studentId === studentId
          ? {
              ...s,
              blockAChoice: "Computer Science & AI",
              blockBChoice: "Economics & Global Markets",
              status: "Confirmed",
            }
          : s
      )
    );
    showToast("Resolved timetable conflict. Allocated to open stream.");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AppHeader />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Toast Notification */}
          {toastMessage && (
            <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Student Enrolment & Class Placements
                </h1>
                <Badge variant="info">Academic Year 2026/2027</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Class section rosters, seat capacity quotas, teaching faculty matrices, and senior elective choice allocations
              </p>
            </div>

            {/* Grade Level Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Select Grade:</span>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                <option value="Grade 7">Grade 7 (Key Stage 3 / Year 8)</option>
                <option value="Grade 8">Grade 8 (Middle School)</option>
                <option value="Form 1">Form 1 / Grade 9 (Senior Intake)</option>
                <option value="Year 10">Year 10 (GCSE / IGCSE Stream)</option>
              </select>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab("Sections")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === "Sections"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Users className="h-4 w-4" /> Class Sections & Capacity
            </button>

            <button
              onClick={() => setActiveTab("Assignments")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === "Assignments"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <GraduationCap className="h-4 w-4" /> Teaching Assignments Matrix
            </button>

            <button
              onClick={() => setActiveTab("Electives")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                activeTab === "Electives"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <BookOpen className="h-4 w-4" /> Senior Elective Subject Choices
            </button>
          </div>

          {/* ========================================================== */}
          {/* TAB 1: CLASS SECTIONS & CAPACITY */}
          {/* ========================================================== */}
          {activeTab === "Sections" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sections.map((section) => {
                  const currentCount = section.students.length;
                  const maxCap = section.maxCapacity;
                  const percent = Math.min(100, Math.round((currentCount / maxCap) * 100));
                  const isFull = currentCount >= maxCap;
                  const isOver = currentCount > maxCap;

                  const boysCount = section.students.filter((s) => s.gender === "Male").length;
                  const girlsCount = section.students.filter((s) => s.gender === "Female").length;

                  return (
                    <Card
                      key={section.id}
                      className={`p-5 flex flex-col justify-between transition-all ${
                        isFull && !section.allowOverCapacity
                          ? "border-amber-300 dark:border-amber-800"
                          : "border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      <div className="space-y-4">
                        {/* Section Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                              {section.gradeLevel}
                            </span>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                              {section.name}
                            </h3>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                              {section.room}
                            </p>
                          </div>

                          <Badge
                            variant={
                              isOver
                                ? "danger"
                                : isFull
                                ? "warning"
                                : "success"
                            }
                          >
                            {isOver ? "Over Capacity" : isFull ? "Capacity Reached" : "Seats Open"}
                          </Badge>
                        </div>

                        {/* Capacity Progress Bar */}
                        <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-600 dark:text-slate-300">
                              Enrolled Seats:
                            </span>
                            <span
                              className={`font-mono ${
                                isOver
                                  ? "text-rose-600 font-bold"
                                  : isFull
                                  ? "text-amber-600"
                                  : "text-emerald-600"
                              }`}
                            >
                              {currentCount} / {maxCap} Seats ({percent}%)
                            </span>
                          </div>

                          {/* Progress bar line */}
                          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                isOver
                                  ? "bg-rose-600"
                                  : isFull
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                              }`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>

                          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                            <span>Demographic: {boysCount}M / {girlsCount}F</span>
                            <span>{Math.max(0, maxCap - currentCount)} seats remaining</span>
                          </div>
                        </div>

                        {/* Over-capacity Toggle */}
                        <div className="flex items-center justify-between text-xs py-1">
                          <span className="text-slate-600 dark:text-slate-300 text-[11px]">
                            Allow Over-Capacity Enrolment
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleOverCapacity(section.id)}
                            className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                              section.allowOverCapacity ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-700"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                                section.allowOverCapacity ? "translate-x-4" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>

                        {/* Homeroom Tutor */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-[10px]">
                              {section.homeroomTutor.name.slice(0, 1)}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 dark:text-white text-[11px]">
                                {section.homeroomTutor.name}
                              </div>
                              <div className="text-[10px] text-slate-400">Homeroom Tutor</div>
                            </div>
                          </div>
                        </div>

                        {/* Student Sample Roster */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                          <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                            <span>Enrolled Pupils ({section.students.length})</span>
                            <span>Action</span>
                          </div>

                          <div className="max-h-48 overflow-y-auto space-y-1 pe-1">
                            {section.students.map((student) => (
                              <div
                                key={student.id}
                                className="flex items-center justify-between p-1.5 rounded bg-slate-50 dark:bg-slate-800/40 text-[11px] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              >
                                <div>
                                  <span className="font-medium text-slate-800 dark:text-slate-200">
                                    {student.name}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono ms-1.5">
                                    ({student.admissionNumber})
                                  </span>
                                </div>
                                <button
                                  onClick={() => handleOpenMoveModal(section, student)}
                                  className="text-sky-600 hover:text-sky-700 text-[10px] font-semibold flex items-center gap-0.5"
                                  title="Transfer student to another section"
                                >
                                  <ArrowRightLeft className="h-3 w-3" /> Move
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 2: TEACHING ASSIGNMENTS MATRIX */}
          {/* ========================================================== */}
          {activeTab === "Assignments" && (
            <Card className="overflow-hidden">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Subject Allocation & Teaching Roster Matrix
                  </h3>
                  <p className="text-xs text-slate-500">
                    Lead teachers, co-teachers / inclusion teaching assistants, and period timetables
                  </p>
                </div>

                <Badge variant="info">6 Core Subjects Scheduled</Badge>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-start text-sm">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4 text-start">Subject & Code</th>
                      <th className="py-3 px-4 text-start">Class Section</th>
                      <th className="py-3 px-4 text-start">Lead Teacher</th>
                      <th className="py-3 px-4 text-start">Co-Teacher / Inclusion</th>
                      <th className="py-3 px-4 text-start">Homeroom Tutor</th>
                      <th className="py-3 px-4 text-start">Periods / Wk</th>
                      <th className="py-3 px-4 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                    {assignments.map((assignment) => (
                      <tr
                        key={assignment.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Subject */}
                        <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                          <div>{assignment.subjectName}</div>
                          <div className="text-[10px] font-mono text-slate-400">
                            {assignment.subjectCode} • {assignment.room}
                          </div>
                        </td>

                        {/* Section */}
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-xs">
                            {assignment.sectionName}
                          </span>
                        </td>

                        {/* Lead Teacher */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-sky-600 dark:text-sky-400">
                            {assignment.leadTeacher.name}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">
                            {assignment.leadTeacher.staffNumber}
                          </div>
                        </td>

                        {/* Co-Teacher */}
                        <td className="py-3.5 px-4">
                          {assignment.coTeacher ? (
                            <div>
                              <div className="font-medium text-slate-800 dark:text-slate-200">
                                {assignment.coTeacher.name}
                              </div>
                              <span className="text-[9px] px-1.5 py-0.2 rounded font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                                {assignment.coTeacher.role}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400 italic">None assigned</span>
                          )}
                        </td>

                        {/* Homeroom Tutor */}
                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                          {assignment.homeroomTutor}
                        </td>

                        {/* Periods */}
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-slate-900 dark:text-white">
                            {assignment.periodsPerWeek}
                          </span>
                          <span className="text-slate-400 text-[11px]"> per week</span>
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setReassigningAssignment(assignment);
                              setNewLeadTeacherName(assignment.leadTeacher.name);
                              setNewCoTeacherName(assignment.coTeacher?.name || "");
                            }}
                            className="h-7 text-xs px-2 gap-1 text-sky-600"
                          >
                            <Edit2 className="h-3 w-3" /> Reassign
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* ========================================================== */}
          {/* TAB 3: SENIOR ELECTIVE SUBJECT CHOICES */}
          {/* ========================================================== */}
          {activeTab === "Electives" && (
            <div className="space-y-6">
              {/* Elective Blocks Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SENIOR_ELECTIVE_BLOCKS.map((block) => (
                  <Card key={block.blockId} className="p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {block.name}
                        </h3>
                        <p className="text-xs text-slate-500">Students must choose 1 subject</p>
                      </div>
                      <Badge variant="info">Year 10 / Form 1</Badge>
                    </div>

                    <div className="space-y-2.5">
                      {block.subjects.map((sub) => {
                        const isFull = sub.enrolledCount >= sub.capacity;
                        const pct = Math.round((sub.enrolledCount / sub.capacity) * 100);
                        return (
                          <div
                            key={sub.id}
                            className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 space-y-1.5 text-xs"
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-slate-900 dark:text-white">
                                {sub.name}
                              </span>
                              <Badge variant={isFull ? "danger" : "success"}>
                                {isFull ? "Stream Full" : "Open"}
                              </Badge>
                            </div>
                            <div className="flex justify-between text-[11px] text-slate-500">
                              <span className="font-mono">{sub.code}</span>
                              <span className="font-mono">
                                {sub.enrolledCount} / {sub.capacity} Seats ({pct}%)
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${isFull ? "bg-rose-500" : "bg-sky-500"}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Student Allocations & Conflicts */}
              <Card className="overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      Student Choice Allocations & Timetable Conflict Resolution
                    </h3>
                    <p className="text-xs text-slate-500">
                      Automated conflict validation against capacity limits and schedule clashes
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-start text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4 text-start">Student Name</th>
                        <th className="py-3 px-4 text-start">Admission #</th>
                        <th className="py-3 px-4 text-start">Block A Choice</th>
                        <th className="py-3 px-4 text-start">Block B Choice</th>
                        <th className="py-3 px-4 text-start">Allocation Status</th>
                        <th className="py-3 px-4 text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                      {electiveStudents.map((st) => (
                        <tr
                          key={st.studentId}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                            {st.studentName}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                            {st.admissionNumber}
                          </td>
                          <td className="py-3.5 px-4">{st.blockAChoice}</td>
                          <td className="py-3.5 px-4">{st.blockBChoice}</td>
                          <td className="py-3.5 px-4">
                            <Badge
                              variant={
                                st.status === "Confirmed"
                                  ? "success"
                                  : st.status === "Waitlisted"
                                  ? "warning"
                                  : "danger"
                              }
                            >
                              {st.status}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-4 text-end">
                            {st.status === "Conflict" ? (
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleResolveConflict(st.studentId)}
                                className="h-7 text-xs px-2"
                              >
                                Resolve Conflict
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => showToast(`Choices verified for ${st.studentName}`)}
                                className="h-7 text-xs text-sky-600"
                              >
                                Details
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================== */}
      {/* MODAL: MOVE STUDENT SECTION */}
      {/* ============================================================== */}
      {moveModalData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600">
                  <ArrowRightLeft className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Move Student Section Placement
                  </h3>
                  <p className="text-xs text-slate-500">
                    Inter-class transfer & seat quota management
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMoveModalData(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              {/* Student info */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-2 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Student:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {moveModalData.student.name} ({moveModalData.student.admissionNumber})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Current Section:</span>
                  <span className="font-bold text-sky-600 dark:text-sky-400">
                    {moveModalData.sourceSection.name}
                  </span>
                </div>
              </div>

              {/* Destination Section */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Destination Class Section
                </label>
                <select
                  value={targetSectionId}
                  onChange={(e) => setTargetSectionId(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                >
                  {sections
                    .filter((s) => s.id !== moveModalData.sourceSection.id)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.students.length} / {s.maxCapacity} seats{" "}
                        {s.students.length >= s.maxCapacity ? "- FULL" : ""})
                      </option>
                    ))}
                </select>
              </div>

              {/* Effective Date */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Effective Transfer Date
                </label>
                <input
                  type="date"
                  value={moveEffectiveDate}
                  onChange={(e) => setMoveEffectiveDate(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Transfer Rationale
                </label>
                <select
                  value={moveReason}
                  onChange={(e) => setMoveReason(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                >
                  <option value="Class demographic balance">Class demographic & gender balance</option>
                  <option value="Pastoral recommendation">Pastoral & Safeguarding recommendation</option>
                  <option value="Subject stream alignment">Subject stream / language track alignment</option>
                  <option value="Parental request approved">Parental request (Approved by Head of Year)</option>
                </select>
              </div>

              {/* Officer notes */}
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Registrar / Academic Office Notes
                </label>
                <textarea
                  rows={2}
                  value={moveNotes}
                  onChange={(e) => setMoveNotes(e.target.value)}
                  placeholder="Record justification, timetable synchronization verification..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMoveModalData(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmMove}
                className="bg-sky-600 hover:bg-sky-700"
              >
                Execute Section Transfer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: REASSIGN TEACHER */}
      {/* ============================================================== */}
      {reassigningAssignment && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Reassign Subject Teacher
              </h3>
              <button
                onClick={() => setReassigningAssignment(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-1">
                <div className="font-semibold text-slate-900 dark:text-white">
                  {reassigningAssignment.subjectName} ({reassigningAssignment.sectionName})
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  {reassigningAssignment.subjectCode} • {reassigningAssignment.periodsPerWeek} Periods/Wk
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Lead Teacher Name
                </label>
                <input
                  type="text"
                  value={newLeadTeacherName}
                  onChange={(e) => setNewLeadTeacherName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Co-Teacher / Inclusion Assistant Name (Optional)
                </label>
                <input
                  type="text"
                  value={newCoTeacherName}
                  onChange={(e) => setNewCoTeacherName(e.target.value)}
                  placeholder="e.g. Zainab Olowo"
                  className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setReassigningAssignment(null)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmReassign}
                className="bg-sky-600 hover:bg-sky-700"
              >
                Save Teaching Assignment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
