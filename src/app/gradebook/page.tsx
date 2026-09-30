"use client";

import React, { useState, useMemo } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  FileSpreadsheet,
  Globe2,
  Lock,
  Unlock,
  CheckCircle2,
  Send,
  Printer,
  Download,
  Sliders,
  ChevronDown,
  Sparkles,
  AlertTriangle,
  X,
  FileCheck,
  User,
  ShieldCheck,
  Calendar,
  Layers,
} from "lucide-react";

// --- Country Grading Scales Definition ---
export interface GradingScale {
  id: string;
  name: string;
  country: string;
  region: string;
  description: string;
  evaluate: (percentage: number) => { grade: string; remark: string; badgeVariant: "success" | "info" | "warning" | "danger" | "default" };
}

export const GRADING_SCALES: GradingScale[] = [
  {
    id: "gcse",
    name: "GCSE 9-1",
    country: "United Kingdom",
    region: "UK / International",
    description: "Standard British National Curriculum 9-1 grading framework.",
    evaluate: (p) => {
      if (p >= 90) return { grade: "Grade 9", remark: "Exceptional Distinction", badgeVariant: "success" };
      if (p >= 80) return { grade: "Grade 8", remark: "High Distinction", badgeVariant: "success" };
      if (p >= 70) return { grade: "Grade 7", remark: "Distinction", badgeVariant: "info" };
      if (p >= 60) return { grade: "Grade 6", remark: "High Merit", badgeVariant: "info" };
      if (p >= 50) return { grade: "Grade 5", remark: "Strong Pass", badgeVariant: "default" };
      if (p >= 40) return { grade: "Grade 4", remark: "Standard Pass", badgeVariant: "warning" };
      if (p >= 30) return { grade: "Grade 3", remark: "Below Standard", badgeVariant: "warning" };
      if (p >= 20) return { grade: "Grade 2", remark: "Weak Pass", badgeVariant: "danger" };
      if (p >= 10) return { grade: "Grade 1", remark: "Minimal Pass", badgeVariant: "danger" };
      return { grade: "U", remark: "Ungraded", badgeVariant: "danger" };
    },
  },
  {
    id: "waec",
    name: "WAEC A1-F9",
    country: "West Africa",
    region: "Ghana, Nigeria, Sierra Leone, Gambia",
    description: "West African Examinations Council standard 9-tier grading scale.",
    evaluate: (p) => {
      if (p >= 75) return { grade: "A1", remark: "Excellent", badgeVariant: "success" };
      if (p >= 70) return { grade: "B2", remark: "Very Good", badgeVariant: "success" };
      if (p >= 65) return { grade: "B3", remark: "Good", badgeVariant: "info" };
      if (p >= 60) return { grade: "C4", remark: "Credit (High)", badgeVariant: "info" };
      if (p >= 55) return { grade: "C5", remark: "Credit", badgeVariant: "default" };
      if (p >= 50) return { grade: "C6", remark: "Credit (Pass)", badgeVariant: "default" };
      if (p >= 45) return { grade: "D7", remark: "Pass", badgeVariant: "warning" };
      if (p >= 40) return { grade: "E8", remark: "Pass", badgeVariant: "warning" };
      return { grade: "F9", remark: "Fail", badgeVariant: "danger" };
    },
  },
  {
    id: "kcse",
    name: "KCSE A-E",
    country: "Kenya",
    region: "East Africa",
    description: "Kenya Certificate of Secondary Education 12-point grading scale.",
    evaluate: (p) => {
      if (p >= 80) return { grade: "A", remark: "Plain A (12 Pts)", badgeVariant: "success" };
      if (p >= 75) return { grade: "A-", remark: "A Minus (11 Pts)", badgeVariant: "success" };
      if (p >= 70) return { grade: "B+", remark: "B Plus (10 Pts)", badgeVariant: "info" };
      if (p >= 65) return { grade: "B", remark: "Plain B (9 Pts)", badgeVariant: "info" };
      if (p >= 60) return { grade: "B-", remark: "B Minus (8 Pts)", badgeVariant: "default" };
      if (p >= 55) return { grade: "C+", remark: "University Min (7 Pts)", badgeVariant: "default" };
      if (p >= 50) return { grade: "C", remark: "Plain C (6 Pts)", badgeVariant: "warning" };
      if (p >= 45) return { grade: "C-", remark: "C Minus (5 Pts)", badgeVariant: "warning" };
      if (p >= 40) return { grade: "D+", remark: "D Plus (4 Pts)", badgeVariant: "warning" };
      if (p >= 35) return { grade: "D", remark: "Plain D (3 Pts)", badgeVariant: "danger" };
      if (p >= 30) return { grade: "D-", remark: "D Minus (2 Pts)", badgeVariant: "danger" };
      return { grade: "E", remark: "Grade E (1 Pt)", badgeVariant: "danger" };
    },
  },
  {
    id: "caps",
    name: "CAPS 1-7",
    country: "South Africa",
    region: "Southern Africa",
    description: "Curriculum and Assessment Policy Statement National 7-level codes.",
    evaluate: (p) => {
      if (p >= 80) return { grade: "Level 7", remark: "Outstanding Achievement", badgeVariant: "success" };
      if (p >= 70) return { grade: "Level 6", remark: "Meritorious Achievement", badgeVariant: "info" };
      if (p >= 60) return { grade: "Level 5", remark: "Substantial Achievement", badgeVariant: "info" };
      if (p >= 50) return { grade: "Level 4", remark: "Adequate Achievement", badgeVariant: "default" };
      if (p >= 40) return { grade: "Level 3", remark: "Moderate Achievement", badgeVariant: "warning" };
      if (p >= 30) return { grade: "Level 2", remark: "Elementary Achievement", badgeVariant: "danger" };
      return { grade: "Level 1", remark: "Not Achieved", badgeVariant: "danger" };
    },
  },
  {
    id: "cbse",
    name: "CBSE A1-E",
    country: "India",
    region: "South Asia / Gulf Expat Schools",
    description: "Central Board of Secondary Education 9-point positional grades.",
    evaluate: (p) => {
      if (p >= 91) return { grade: "A1", remark: "Top 1/8th of Passed", badgeVariant: "success" };
      if (p >= 81) return { grade: "A2", remark: "Next 1/8th", badgeVariant: "success" };
      if (p >= 71) return { grade: "B1", remark: "Next 1/8th", badgeVariant: "info" };
      if (p >= 61) return { grade: "B2", remark: "Next 1/8th", badgeVariant: "info" };
      if (p >= 51) return { grade: "C1", remark: "Next 1/8th", badgeVariant: "default" };
      if (p >= 41) return { grade: "C2", remark: "Next 1/8th", badgeVariant: "warning" };
      if (p >= 33) return { grade: "D", remark: "Qualifying Mark", badgeVariant: "warning" };
      return { grade: "E", remark: "Essential Repeat", badgeVariant: "danger" };
    },
  },
  {
    id: "uae_moe",
    name: "UAE MoE (A+-F)",
    country: "United Arab Emirates",
    region: "Middle East / GCC",
    description: "Ministry of Education UAE statutory 100-point scale with Arabic descriptors.",
    evaluate: (p) => {
      if (p >= 95) return { grade: "A+", remark: "امتياز مرتفع (High Distinction)", badgeVariant: "success" };
      if (p >= 90) return { grade: "A", remark: "امتياز (Distinction)", badgeVariant: "success" };
      if (p >= 85) return { grade: "B+", remark: "جيد جداً مرتفع (Very Good+)", badgeVariant: "info" };
      if (p >= 80) return { grade: "B", remark: "جيد جداً (Very Good)", badgeVariant: "info" };
      if (p >= 75) return { grade: "C+", remark: "جيد مرتفع (Good+)", badgeVariant: "default" };
      if (p >= 70) return { grade: "C", remark: "جيد (Good)", badgeVariant: "default" };
      if (p >= 60) return { grade: "D", remark: "مقبول (Satisfactory)", badgeVariant: "warning" };
      return { grade: "F", remark: "راسب (Unsatisfactory)", badgeVariant: "danger" };
    },
  },
  {
    id: "ib",
    name: "IB 1-7",
    country: "International",
    region: "Worldwide Baccalaureate",
    description: "International Baccalaureate MYP and DP 7-point achievement scale.",
    evaluate: (p) => {
      if (p >= 85) return { grade: "7", remark: "Excellent", badgeVariant: "success" };
      if (p >= 72) return { grade: "6", remark: "Very Good", badgeVariant: "success" };
      if (p >= 60) return { grade: "5", remark: "Good", badgeVariant: "info" };
      if (p >= 50) return { grade: "4", remark: "Satisfactory (Pass)", badgeVariant: "default" };
      if (p >= 40) return { grade: "3", remark: "Mediocre", badgeVariant: "warning" };
      if (p >= 28) return { grade: "2", remark: "Poor", badgeVariant: "danger" };
      return { grade: "1", remark: "Very Poor", badgeVariant: "danger" };
    },
  },
  {
    id: "us_gpa",
    name: "US GPA (4.0)",
    country: "United States",
    region: "North America / International",
    description: "Standard American 4.0 weighted grade point average and letter grades.",
    evaluate: (p) => {
      if (p >= 93) return { grade: "A (4.0)", remark: "Superior", badgeVariant: "success" };
      if (p >= 90) return { grade: "A- (3.7)", remark: "Excellent", badgeVariant: "success" };
      if (p >= 87) return { grade: "B+ (3.3)", remark: "Commendable", badgeVariant: "info" };
      if (p >= 83) return { grade: "B (3.0)", remark: "Above Average", badgeVariant: "info" };
      if (p >= 80) return { grade: "B- (2.7)", remark: "Good", badgeVariant: "default" };
      if (p >= 77) return { grade: "C+ (2.3)", remark: "Competent", badgeVariant: "default" };
      if (p >= 73) return { grade: "C (2.0)", remark: "Average", badgeVariant: "warning" };
      if (p >= 70) return { grade: "C- (1.7)", remark: "Marginal", badgeVariant: "warning" };
      if (p >= 60) return { grade: "D (1.0)", remark: "Passing", badgeVariant: "warning" };
      return { grade: "F (0.0)", remark: "Failing", badgeVariant: "danger" };
    },
  },
  {
    id: "french_bac",
    name: "French 0-20",
    country: "France / Francophone",
    region: "North & West Africa, Europe",
    description: "Traditional 20-point French Baccalauréat system with honors mentions.",
    evaluate: (p) => {
      const score20 = (p / 5).toFixed(1);
      if (p >= 80) return { grade: `${score20}/20`, remark: "Très Bien (With Honors)", badgeVariant: "success" };
      if (p >= 70) return { grade: `${score20}/20`, remark: "Bien", badgeVariant: "info" };
      if (p >= 60) return { grade: `${score20}/20`, remark: "Assez Bien", badgeVariant: "info" };
      if (p >= 50) return { grade: `${score20}/20`, remark: "Passable", badgeVariant: "default" };
      if (p >= 40) return { grade: `${score20}/20`, remark: "Rattrapage (Oral Exam)", badgeVariant: "warning" };
      return { grade: `${score20}/20`, remark: "Ajourné (Fail)", badgeVariant: "danger" };
    },
  },
  {
    id: "egypt_thanaweya",
    name: "Egypt Thanaweya",
    country: "Egypt",
    region: "Middle East & North Africa",
    description: "Egyptian Ministry of Education standard collegiate admission scale.",
    evaluate: (p) => {
      if (p >= 85) return { grade: "ممتاز (A)", remark: "Excellent / Mumtaz", badgeVariant: "success" };
      if (p >= 75) return { grade: "جيد جداً (B)", remark: "Very Good / Jayyid Jiddan", badgeVariant: "info" };
      if (p >= 65) return { grade: "جيد (C)", remark: "Good / Jayyid", badgeVariant: "default" };
      if (p >= 50) return { grade: "مقبول (D)", remark: "Pass / Maqbool", badgeVariant: "warning" };
      return { grade: "راسب (F)", remark: "Fail / Rasib", badgeVariant: "danger" };
    },
  },
  {
    id: "nigeria_neco",
    name: "NECO Senior School",
    country: "Nigeria",
    region: "West Africa",
    description: "National Examinations Council of Nigeria SSCE classification.",
    evaluate: (p) => {
      if (p >= 75) return { grade: "A1 (Distinction)", remark: "Distinction", badgeVariant: "success" };
      if (p >= 70) return { grade: "B2 (Very Good)", remark: "Very Good", badgeVariant: "success" };
      if (p >= 65) return { grade: "B3 (Good)", remark: "Good", badgeVariant: "info" };
      if (p >= 50) return { grade: "C4-C6 (Credit)", remark: "Credit Pass", badgeVariant: "default" };
      if (p >= 40) return { grade: "D7-E8 (Pass)", remark: "Pass", badgeVariant: "warning" };
      return { grade: "F9 (Fail)", remark: "Fail", badgeVariant: "danger" };
    },
  },
  {
    id: "australia_atar",
    name: "Australian ATAR (A-E)",
    country: "Australia",
    region: "Australasia",
    description: "Australian Curriculum Assessment Bands & Senior Secondary Levels.",
    evaluate: (p) => {
      if (p >= 85) return { grade: "Band 6 (A)", remark: "Excellent Achievement", badgeVariant: "success" };
      if (p >= 75) return { grade: "Band 5 (B)", remark: "High Achievement", badgeVariant: "info" };
      if (p >= 60) return { grade: "Band 4 (C)", remark: "Sound Achievement", badgeVariant: "default" };
      if (p >= 50) return { grade: "Band 3 (D)", remark: "Limited Achievement", badgeVariant: "warning" };
      return { grade: "Band 2-1 (E)", remark: "Very Limited Achievement", badgeVariant: "danger" };
    },
  },
  {
    id: "scottish_cfe",
    name: "Scottish CfE / Nat 5",
    country: "Scotland",
    region: "United Kingdom",
    description: "Scottish Qualifications Authority National 5 & Higher Bands.",
    evaluate: (p) => {
      if (p >= 70) return { grade: "Band A", remark: "Upper Pass", badgeVariant: "success" };
      if (p >= 60) return { grade: "Band B", remark: "Pass", badgeVariant: "info" };
      if (p >= 50) return { grade: "Band C", remark: "Lower Pass", badgeVariant: "default" };
      if (p >= 40) return { grade: "Band D", remark: "Near Miss", badgeVariant: "warning" };
      return { grade: "No Award", remark: "Fail", badgeVariant: "danger" };
    },
  },
];

interface AssessmentCategory {
  id: string;
  name: string;
  weight: number; // percentage e.g. 15 for 15%
}

interface StudentGradeEntry {
  studentId: string;
  admissionNo: string;
  nameEn: string;
  nameAr: string;
  gender: "Male" | "Female";
  attendanceRate: number;
  scores: Record<string, number>; // categoryId -> score (0 to 100)
  teacherRemarksEn: string;
  teacherRemarksAr: string;
}

type ModerationStatus = "Draft" | "SubmittedForApproval" | "ApprovedAndLocked";

export default function GradebookPage() {
  const [selectedSubjectClass, setSelectedSubjectClass] = useState("Mathematics 7-A");
  const [selectedScaleId, setSelectedScaleId] = useState<string>("gcse");
  const [moderationStatus, setModerationStatus] = useState<ModerationStatus>("Draft");
  const [moderatorComment, setModeratorComment] = useState("");
  const [isWeightsModalOpen, setIsWeightsModalOpen] = useState(false);
  const [isReportCardModalOpen, setIsReportCardModalOpen] = useState(false);
  const [selectedStudentForCard, setSelectedStudentForCard] = useState<StudentGradeEntry | null>(null);

  // Assessment Categories with Weights
  const [categories, setCategories] = useState<AssessmentCategory[]>([
    { id: "c1", name: "Homework & Prep", weight: 15 },
    { id: "c2", name: "Continuous Quizzes", weight: 25 },
    { id: "c3", name: "Mid-Term Examination", weight: 25 },
    { id: "c4", name: "Final Summative Exam", weight: 35 },
  ]);

  // Student Marks Entries
  const [entries, setEntries] = useState<StudentGradeEntry[]>([
    {
      studentId: "std-001",
      admissionNo: "ADM-2024-001",
      nameEn: "Tariq Mansoor",
      nameAr: "طارق منصور",
      gender: "Male",
      attendanceRate: 98.4,
      scores: { c1: 92, c2: 88, c3: 94, c4: 91 },
      teacherRemarksEn: "Tariq demonstrates exemplary problem solving in algebraic theorems. High active engagement.",
      teacherRemarksAr: "أظهر طارق تميزاً لافتاً في حل المعادلات الجبرية والتفكير المنطقي.",
    },
    {
      studentId: "std-002",
      admissionNo: "ADM-2024-002",
      nameEn: "Amina Al-Falasi",
      nameAr: "آمنة الفلاسي",
      gender: "Female",
      attendanceRate: 99.1,
      scores: { c1: 98, c2: 95, c3: 92, c4: 96 },
      teacherRemarksEn: "Superb analytical calculations and consistent homework perfection. Potential Olympiad candidate.",
      teacherRemarksAr: "أداء استثنائي متفوق في جميع الاختبارات ومثالية في إتمام الواجبات.",
    },
    {
      studentId: "std-003",
      admissionNo: "ADM-2024-003",
      nameEn: "Zayn Mwangi",
      nameAr: "زين موانغي",
      gender: "Male",
      attendanceRate: 92.0,
      scores: { c1: 72, c2: 78, c3: 74, c4: 79 },
      teacherRemarksEn: "Zayn has made steady progress this term. Recommend extra review on polynomial factorization.",
      teacherRemarksAr: "تحسن ملحوظ هذا الفصل. يُنصح بمزيد من المراجعة على تحليل الحدوديات.",
    },
    {
      studentId: "std-004",
      admissionNo: "ADM-2023-089",
      nameEn: "Fatima Zahra",
      nameAr: "فاطمة الزهراء",
      gender: "Female",
      attendanceRate: 96.5,
      scores: { c1: 85, c2: 84, c3: 88, c4: 86 },
      teacherRemarksEn: "Strong conceptual grasping of geometry and trigonometry proofs.",
      teacherRemarksAr: "استيعاب مفاهيمي قوي في الهندسة وإثبات النظريات المثلثية.",
    },
    {
      studentId: "std-005",
      admissionNo: "ADM-2024-012",
      nameEn: "Bilal El-Sayed",
      nameAr: "بلال السيد",
      gender: "Male",
      attendanceRate: 88.5,
      scores: { c1: 64, c2: 60, c3: 68, c4: 62 },
      teacherRemarksEn: "Capable student, needs improved attendance consistency and assignment turn-in speed.",
      teacherRemarksAr: "طالب ذو إمكانيات جيدة، يحتاج لانتظام أكبر في الحضور وتسليم التكليفات في موعدها.",
    },
    {
      studentId: "std-006",
      admissionNo: "ADM-2024-015",
      nameEn: "Layla Benali",
      nameAr: "ليلى بن علي",
      gender: "Female",
      attendanceRate: 94.2,
      scores: { c1: 80, c2: 83, c3: 85, c4: 82 },
      teacherRemarksEn: "Solid academic consistency with keen attention to mathematical notation and units.",
      teacherRemarksAr: "أداء مستقر ودقة عالية في كتابة الخطوات الحسابية والوحدات.",
    },
  ]);

  const activeScale = useMemo(() => {
    return GRADING_SCALES.find((s) => s.id === selectedScaleId) || GRADING_SCALES[0];
  }, [selectedScaleId]);

  // Compute weighted percentage for a student
  const computeStudentPercentage = (scores: Record<string, number>) => {
    const totalWeight = categories.reduce((sum, c) => sum + c.weight, 0);
    if (totalWeight === 0) return 0;
    const weightedSum = categories.reduce((sum, c) => {
      const score = scores[c.id] ?? 0;
      return sum + (score * c.weight);
    }, 0);
    return Math.round((weightedSum / totalWeight) * 10) / 10;
  };

  const handleScoreChange = (studentId: string, categoryId: string, value: string) => {
    if (moderationStatus === "ApprovedAndLocked") return;
    const num = Math.min(100, Math.max(0, parseFloat(value) || 0));
    setEntries((prev) =>
      prev.map((s) =>
        s.studentId === studentId
          ? { ...s, scores: { ...s.scores, [categoryId]: num } }
          : s
      )
    );
  };

  const totalWeight = categories.reduce((sum, c) => sum + c.weight, 0);

  const handleOpenReportCard = (student: StudentGradeEntry) => {
    setSelectedStudentForCard(student);
    setIsReportCardModalOpen(true);
  };

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
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Gradebook & Academic Assessment
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    13-Country Grading Engine, Real-Time Calculations, Moderation Sign-Off, and Bilingual Report Cards
                  </p>
                </div>
              </div>
            </div>

            {/* Workflow Action & Status */}
            <div className="flex flex-wrap items-center gap-2">
              {moderationStatus === "Draft" && (
                <>
                  <Badge variant="warning" className="px-3 py-1 text-xs">
                    Status: Draft In-Progress
                  </Badge>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setModerationStatus("SubmittedForApproval")}
                    className="gap-1.5 text-xs bg-sky-600 hover:bg-sky-700"
                  >
                    <Send className="h-3.5 w-3.5" /> Submit for Moderation
                  </Button>
                </>
              )}

              {moderationStatus === "SubmittedForApproval" && (
                <>
                  <Badge variant="info" className="px-3 py-1 text-xs">
                    Pending Dean Moderation
                  </Badge>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setModerationStatus("ApprovedAndLocked")}
                    className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Lock className="h-3.5 w-3.5" /> Approve & Lock Grades
                  </Button>
                </>
              )}

              {moderationStatus === "ApprovedAndLocked" && (
                <>
                  <Badge variant="success" className="px-3 py-1 text-xs gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Approved & Locked by Dean
                  </Badge>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setModerationStatus("Draft")}
                    className="gap-1.5 text-xs text-slate-600 dark:text-slate-300"
                  >
                    <Unlock className="h-3.5 w-3.5" /> Re-open (Admin Override)
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Selector Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Subject Class Selector */}
            <Card>
              <CardContent className="p-3.5 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Select Class Course:
                </label>
                <select
                  value={selectedSubjectClass}
                  onChange={(e) => setSelectedSubjectClass(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="Mathematics 7-A">Mathematics (Grade 7-A) &bull; Jenkins</option>
                  <option value="English Literature 7-A">English Literature (Grade 7-A) &bull; Mensah</option>
                  <option value="Biology 8-B">Biology (Grade 8-B) &bull; Dr. Ogun</option>
                  <option value="Computer Science 9-A">Computer Science (Grade 9-A) &bull; Al-Falasi</option>
                  <option value="Arabic Language 7-A">Arabic Language (Grade 7-A) &bull; Al-Hashemi</option>
                </select>
              </CardContent>
            </Card>

            {/* 13-Country Grading Scale Switcher */}
            <Card className="border-sky-300 dark:border-sky-800 bg-sky-50/30 dark:bg-sky-950/20">
              <CardContent className="p-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-sky-900 dark:text-sky-300 flex items-center gap-1.5">
                    <Globe2 className="h-3.5 w-3.5 text-sky-600" /> Country Grading Scale (13 Systems):
                  </label>
                  <Badge variant="info" className="text-[10px]">
                    {activeScale.region}
                  </Badge>
                </div>
                <select
                  value={selectedScaleId}
                  onChange={(e) => setSelectedScaleId(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-white dark:bg-slate-900 border border-sky-300 dark:border-sky-700 text-xs font-bold text-sky-950 dark:text-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {GRADING_SCALES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — {s.country}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>

            {/* Assessment Weights Summary */}
            <Card>
              <CardContent className="p-3.5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Category Weights:
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                    {categories.length} Categories ({totalWeight}% Total)
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    HW (15%), Quizzes (25%), Mid (25%), Final (35%)
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsWeightsModalOpen(true)}
                  disabled={moderationStatus === "ApprovedAndLocked"}
                  className="gap-1 text-xs"
                >
                  <Sliders className="h-3.5 w-3.5" /> Adjust
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Lock Banner if Approved */}
          {moderationStatus === "ApprovedAndLocked" && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-600" />
                <span>
                  <strong>Gradebook is Locked:</strong> Official grades have been signed off by the Academic Dean. Marks cannot be altered without administrative override.
                </span>
              </div>
              <Badge variant="success">Read Only</Badge>
            </div>
          )}

          {/* Interactive Marks Entry Grid */}
          <Card className="overflow-hidden">
            <CardHeader className="py-3 px-4 border-b border-slate-200 dark:border-slate-800 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white">
                  Student Assessment Roster: {selectedSubjectClass}
                </CardTitle>
                <CardDescription className="text-xs">
                  Active Formula: {categories.map((c) => `${c.name} (${c.weight}%)`).join(" + ")}
                </CardDescription>
              </div>

              <div className="text-xs font-mono text-slate-500">
                Evaluation Engine: <span className="font-bold text-sky-600 dark:text-sky-400">{activeScale.name}</span>
              </div>
            </CardHeader>

            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs border-collapse min-w-[850px]">
                <thead className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4 text-start w-56">Student Name</th>
                    <th className="py-3 px-4 text-start w-28">Admission #</th>
                    {categories.map((cat) => (
                      <th key={cat.id} className="py-3 px-3 text-center w-28">
                        <div>{cat.name}</div>
                        <div className="text-[10px] text-sky-600 dark:text-sky-400 font-normal">
                          Weight {cat.weight}%
                        </div>
                      </th>
                    ))}
                    <th className="py-3 px-4 text-center w-28 bg-slate-100/60 dark:bg-slate-800/80">
                      Calculated %
                    </th>
                    <th className="py-3 px-4 text-start w-40 bg-sky-50/50 dark:bg-sky-950/20">
                      {activeScale.name} Grade
                    </th>
                    <th className="py-3 px-4 text-end w-32">Report Card</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {entries.map((student) => {
                    const percentage = computeStudentPercentage(student.scores);
                    const evaluation = activeScale.evaluate(percentage);

                    return (
                      <tr
                        key={student.studentId}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Student Name */}
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          <div className="flex items-center gap-2.5">
                            <div className="h-7 w-7 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-xs shrink-0">
                              {student.nameEn.slice(0, 1)}
                            </div>
                            <div>
                              <div>{student.nameEn}</div>
                              <div className="text-[10px] text-slate-400 font-normal" dir="rtl">
                                {student.nameAr}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Admission # */}
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                          {student.admissionNo}
                        </td>

                        {/* Editable Category Marks */}
                        {categories.map((cat) => {
                          const val = student.scores[cat.id] ?? 0;
                          return (
                            <td key={cat.id} className="py-2 px-3 text-center">
                              <input
                                type="number"
                                min={0}
                                max={100}
                                disabled={moderationStatus === "ApprovedAndLocked"}
                                value={val}
                                onChange={(e) =>
                                  handleScoreChange(student.studentId, cat.id, e.target.value)
                                }
                                className={`w-16 h-8 text-center font-mono font-bold text-xs rounded-lg border transition-all ${
                                  moderationStatus === "ApprovedAndLocked"
                                    ? "bg-slate-100 dark:bg-slate-800 border-transparent text-slate-500 cursor-not-allowed"
                                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-white"
                                }`}
                              />
                            </td>
                          );
                        })}

                        {/* Computed Percentage */}
                        <td className="py-3 px-4 text-center font-mono font-bold text-sm bg-slate-100/50 dark:bg-slate-800/60 text-slate-900 dark:text-white">
                          {percentage.toFixed(1)}%
                        </td>

                        {/* Localized Grade Badge */}
                        <td className="py-3 px-4 bg-sky-50/30 dark:bg-sky-950/10">
                          <div className="flex flex-col items-start gap-0.5">
                            <Badge variant={evaluation.badgeVariant} className="font-bold text-xs">
                              {evaluation.grade}
                            </Badge>
                            <span className="text-[10px] text-slate-500 truncate max-w-[140px]">
                              {evaluation.remark}
                            </span>
                          </div>
                        </td>

                        {/* Generate Report Card Action */}
                        <td className="py-3 px-4 text-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenReportCard(student)}
                            className="text-xs text-sky-600 hover:text-sky-700 border-sky-200 dark:border-sky-800 gap-1"
                          >
                            <Printer className="h-3 w-3" /> Report Card
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          {/* MODAL 1: ASSESSMENT WEIGHTS CONFIGURATION */}
          {isWeightsModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Assessment Category Weights
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure percentage contribution for {selectedSubjectClass}. Must total 100%.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsWeightsModalOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {categories.map((cat, idx) => (
                    <div key={cat.id} className="flex items-center justify-between gap-3 text-xs">
                      <span className="font-medium text-slate-700 dark:text-slate-300 w-44 truncate">
                        {cat.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={cat.weight}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            const updated = [...categories];
                            updated[idx].weight = val;
                            setCategories(updated);
                          }}
                          className="w-16 h-8 px-2 text-center font-mono font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                        <span className="font-mono text-slate-500">%</span>
                      </div>
                    </div>
                  ))}

                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-between text-xs font-bold">
                    <span>Total Weight:</span>
                    <span
                      className={`font-mono ${
                        totalWeight === 100 ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {totalWeight}% {totalWeight !== 100 && "(Must equal 100%)"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="outline" size="sm" onClick={() => setIsWeightsModalOpen(false)}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={totalWeight !== 100}
                    onClick={() => setIsWeightsModalOpen(false)}
                    className="bg-sky-600 hover:bg-sky-700 text-xs"
                  >
                    Save Weights
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL 2: BILINGUAL ENGLISH/ARABIC REPORT CARD GENERATOR */}
          {isReportCardModalOpen && selectedStudentForCard && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6 my-8 animate-in fade-in zoom-in-95">
                {/* Modal Header */}
                <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div>
                    <Badge variant="info" className="mb-1 text-[10px]">
                      Official Bilingual Academic Transcript
                    </Badge>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Student Term Progress Report Card
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsReportCardModalOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Printable Certificate Layout Preview */}
                <div className="border-2 border-slate-300 dark:border-slate-700 rounded-xl p-6 bg-slate-50/60 dark:bg-slate-900/80 space-y-6 text-xs text-slate-800 dark:text-slate-200 shadow-inner">
                  {/* Bilingual School Header */}
                  <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-700 pb-4">
                    <div>
                      <div className="font-extrabold text-base text-slate-900 dark:text-white tracking-wide">
                        DIRASA INTERNATIONAL ACADEMY
                      </div>
                      <div className="text-[11px] text-slate-500">Ministry of Education Licensed School</div>
                      <div className="text-[10px] text-slate-400 font-mono">Academic Year 2026 / 2027 &bull; Term 1</div>
                    </div>

                    <div className="text-end" dir="rtl">
                      <div className="font-extrabold text-base text-slate-900 dark:text-white font-serif">
                        أكاديمية دراسة الدولية
                      </div>
                      <div className="text-[11px] text-slate-500">مرخصة من وزارة التربية والتعليم</div>
                      <div className="text-[10px] text-slate-400 font-mono">العام الدراسي 2026 / 2027 &bull; الفصل الأول</div>
                    </div>
                  </div>

                  {/* Student & Attendance Metadata */}
                  <div className="grid grid-cols-2 gap-4 p-3 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="space-y-1">
                      <div>
                        <span className="text-slate-400">Student Name: </span>
                        <strong className="text-slate-900 dark:text-white">{selectedStudentForCard.nameEn}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Admission No: </span>
                        <span className="font-mono">{selectedStudentForCard.admissionNo}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Class Section: </span>
                        <span>{selectedSubjectClass}</span>
                      </div>
                    </div>

                    <div className="text-end space-y-1" dir="rtl">
                      <div>
                        <span className="text-slate-400">اسم الطالب: </span>
                        <strong className="text-slate-900 dark:text-white">{selectedStudentForCard.nameAr}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">نسبة الحضور: </span>
                        <span className="font-mono font-bold text-emerald-600">{selectedStudentForCard.attendanceRate}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400">نظام التقييم: </span>
                        <span className="font-bold">{activeScale.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Marks Breakdown Table */}
                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800/60">
                    <table className="w-full text-start text-xs border-collapse">
                      <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                        <tr>
                          <th className="py-2 px-3 text-start">Assessment Component</th>
                          <th className="py-2 px-3 text-center">Weight</th>
                          <th className="py-2 px-3 text-center">Score (100)</th>
                          <th className="py-2 px-3 text-end">Weighted Contribution</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-700 font-mono text-[11px]">
                        {categories.map((cat) => {
                          const rawScore = selectedStudentForCard.scores[cat.id] ?? 0;
                          const weightedVal = ((rawScore * cat.weight) / 100).toFixed(1);
                          return (
                            <tr key={cat.id}>
                              <td className="py-2 px-3 font-sans font-medium text-slate-800 dark:text-slate-200">
                                {cat.name}
                              </td>
                              <td className="py-2 px-3 text-center text-slate-500">{cat.weight}%</td>
                              <td className="py-2 px-3 text-center font-bold">{rawScore}</td>
                              <td className="py-2 px-3 text-end font-bold text-sky-700 dark:text-sky-300">
                                {weightedVal}%
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="bg-slate-100/80 dark:bg-slate-800/90 font-bold border-t border-slate-200 dark:border-slate-700">
                        <tr>
                          <td className="py-2.5 px-3">Overall Composite Percentage</td>
                          <td className="py-2.5 px-3 text-center">100%</td>
                          <td colSpan={2} className="py-2.5 px-3 text-end font-mono text-sm text-sky-600 dark:text-sky-400">
                            {computeStudentPercentage(selectedStudentForCard.scores).toFixed(1)}% &bull;{" "}
                            {activeScale.evaluate(computeStudentPercentage(selectedStudentForCard.scores)).grade}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* Bilingual Teacher Narrative */}
                  <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900 space-y-2 text-xs">
                    <div>
                      <div className="font-semibold text-sky-900 dark:text-sky-300">
                        Instructor Qualitative Remarks:
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 italic mt-0.5">
                        &ldquo;{selectedStudentForCard.teacherRemarksEn}&rdquo;
                      </p>
                    </div>

                    <div className="pt-2 border-t border-sky-200 dark:border-sky-900" dir="rtl">
                      <div className="font-semibold text-sky-900 dark:text-sky-300 font-serif">
                        ملاحظات المعلم التقييمية:
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-serif mt-0.5">
                        &laquo;{selectedStudentForCard.teacherRemarksAr}&raquo;
                      </p>
                    </div>
                  </div>

                  {/* Signatures Block */}
                  <div className="pt-4 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-300 dark:border-slate-700">
                    <div className="text-center">
                      <div className="font-serif italic font-bold text-slate-800 dark:text-slate-200">
                        Sarah Jenkins, B.Sc
                      </div>
                      <div className="border-t border-slate-400 w-36 pt-1 mt-1">Class Teacher</div>
                    </div>

                    <div className="text-center">
                      <div className="h-8 flex items-center justify-center">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-600 border border-emerald-500 px-2 py-0.5 rounded">
                          OFFICIALLY VERIFIED
                        </span>
                      </div>
                      <div className="border-t border-slate-400 w-36 pt-1 mt-1">Registrar Stamp</div>
                    </div>

                    <div className="text-center">
                      <div className="font-serif italic font-bold text-slate-800 dark:text-slate-200">
                        Dr. Tariq Al-Hashimi
                      </div>
                      <div className="border-t border-slate-400 w-36 pt-1 mt-1">Academic Dean</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="outline" size="sm" onClick={() => setIsReportCardModalOpen(false)}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      alert(`Printing official localized report card for ${selectedStudentForCard.nameEn}...`);
                    }}
                    className="bg-sky-600 hover:bg-sky-700 text-xs gap-1.5"
                  >
                    <Download className="h-3.5 w-3.5" /> Download Official PDF
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
