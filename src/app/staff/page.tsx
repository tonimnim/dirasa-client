"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/legacy-ui/Card";
import { Badge } from "@/components/legacy-ui/Badge";
import { Button } from "@/components/legacy-ui/Button";
import {
  Users,
  GraduationCap,
  Briefcase,
  Calendar,
  DollarSign,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  UserX,
  Clock,
  FileText,
  Mail,
  Phone,
  ShieldAlert,
  Lock,
  Eye,
  EyeOff,
  X,
  ChevronRight,
  MoreVertical,
  Building,
  ArrowRight,
  Percent,
} from "lucide-react";
import { StaffCategory, EmploymentStatus, EmploymentType, PayBasis, PayFrequency } from "@/types/api";

export interface MockStaffMember {
  id: string;
  staffNumber: string;
  name: {
    givenName: string;
    familyName: string;
    displayName: string;
  };
  email: string;
  phone: string;
  category: StaffCategory;
  employmentStatus: EmploymentStatus;
  employmentType: EmploymentType;
  fte: number; // e.g. 1.0, 0.8, 0.5
  jobTitle: string;
  department: string;
  startDate: string;
  endDate?: string;
  leaveDetails?: {
    type: "Sick" | "Maternity" | "Paternity" | "Sabbatical" | "Annual" | "Unpaid";
    startDate: string;
    expectedReturnDate: string;
    coveringStaff?: string;
    notes?: string;
  };
  suspensionDetails?: {
    date: string;
    reason: string;
    investigationRef: string;
  };
  compensation: {
    baseAmount: number;
    currency: "AED" | "KES" | "USD";
    payBasis: PayBasis;
    payFrequency: PayFrequency;
    housingAllowance?: number;
    transportAllowance?: number;
  };
}

const INITIAL_STAFF: MockStaffMember[] = [
  {
    id: "stf-001",
    staffNumber: "STF-2021-008",
    name: {
      givenName: "Amira",
      familyName: "Al-Mansoor",
      displayName: "Dr. Amira Al-Mansoor",
    },
    email: "amira.mansoor@school.dirasa.ae",
    phone: "+971 50 234 5678",
    category: "Teaching",
    employmentStatus: "Active",
    employmentType: "FullTime",
    fte: 1.0,
    jobTitle: "Head of Science & Senior Biology Lead",
    department: "Sciences",
    startDate: "2021-08-15",
    compensation: {
      baseAmount: 22500,
      currency: "AED",
      payBasis: "Salary",
      payFrequency: "Monthly",
      housingAllowance: 7000,
      transportAllowance: 1500,
    },
  },
  {
    id: "stf-002",
    staffNumber: "STF-2022-042",
    name: {
      givenName: "Samuel",
      familyName: "Kimani",
      displayName: "Samuel Kimani",
    },
    email: "samuel.kimani@school.dirasa.ae",
    phone: "+254 711 345 678",
    category: "Teaching",
    employmentStatus: "Active",
    employmentType: "FullTime",
    fte: 1.0,
    jobTitle: "Mathematics Lead Teacher (Grades 7-9)",
    department: "Mathematics",
    startDate: "2022-08-20",
    compensation: {
      baseAmount: 18500,
      currency: "AED",
      payBasis: "Salary",
      payFrequency: "Monthly",
      housingAllowance: 5500,
      transportAllowance: 1200,
    },
  },
  {
    id: "stf-003",
    staffNumber: "STF-2020-015",
    name: {
      givenName: "Eleanor",
      familyName: "Vance",
      displayName: "Eleanor Vance",
    },
    email: "eleanor.vance@school.dirasa.ae",
    phone: "+44 7700 900881",
    category: "Teaching",
    employmentStatus: "OnLeave",
    employmentType: "FullTime",
    fte: 1.0,
    jobTitle: "English Literature Teacher & Form Tutor",
    department: "Humanities",
    startDate: "2020-09-01",
    leaveDetails: {
      type: "Maternity",
      startDate: "2026-09-01",
      expectedReturnDate: "2027-01-15",
      coveringStaff: "Chloe Davenport (Supply)",
      notes: "Statutory 18-week maternity leave approved by Board of Governors.",
    },
    compensation: {
      baseAmount: 17200,
      currency: "AED",
      payBasis: "Salary",
      payFrequency: "Monthly",
      housingAllowance: 5000,
      transportAllowance: 1000,
    },
  },
  {
    id: "stf-004",
    staffNumber: "STF-2023-091",
    name: {
      givenName: "Farid",
      familyName: "Al-Hassan",
      displayName: "Farid Al-Hassan",
    },
    email: "farid.hassan@school.dirasa.ae",
    phone: "+971 52 876 5432",
    category: "NonTeaching",
    employmentStatus: "Active",
    employmentType: "FullTime",
    fte: 1.0,
    jobTitle: "Director of Admissions & Registrar",
    department: "Administration",
    startDate: "2023-01-10",
    compensation: {
      baseAmount: 19800,
      currency: "AED",
      payBasis: "Salary",
      payFrequency: "Monthly",
      housingAllowance: 6000,
      transportAllowance: 1500,
    },
  },
  {
    id: "stf-005",
    staffNumber: "STF-2022-073",
    name: {
      givenName: "Zainab",
      familyName: "Olowo",
      displayName: "Zainab Olowo",
    },
    email: "zainab.olowo@school.dirasa.ae",
    phone: "+254 720 998877",
    category: "Teaching",
    employmentType: "PartTime",
    employmentStatus: "Active",
    fte: 0.6,
    jobTitle: "Visual Arts & Design Specialist",
    department: "Arts & PE",
    startDate: "2022-09-01",
    compensation: {
      baseAmount: 11500,
      currency: "AED",
      payBasis: "Salary",
      payFrequency: "Monthly",
      housingAllowance: 3500,
    },
  },
  {
    id: "stf-006",
    staffNumber: "STF-2019-002",
    name: {
      givenName: "Kareem",
      familyName: "Qasim",
      displayName: "Kareem Qasim",
    },
    email: "kareem.qasim@school.dirasa.ae",
    phone: "+971 50 991 2233",
    category: "NonTeaching",
    employmentStatus: "Suspended",
    employmentType: "FullTime",
    fte: 1.0,
    jobTitle: "Senior Transport & Campus Logistics Officer",
    department: "IT & Operations",
    startDate: "2019-04-01",
    suspensionDetails: {
      date: "2026-09-22",
      reason: "Internal compliance inquiry regarding vehicle maintenance procurement protocols.",
      investigationRef: "AUDIT-2026-08B",
    },
    compensation: {
      baseAmount: 14000,
      currency: "AED",
      payBasis: "Salary",
      payFrequency: "Monthly",
      housingAllowance: 4000,
    },
  },
  {
    id: "stf-007",
    staffNumber: "STF-2024-118",
    name: {
      givenName: "Faith",
      familyName: "Chebet",
      displayName: "Faith Chebet",
    },
    email: "faith.chebet@school.dirasa.ae",
    phone: "+254 700 123 987",
    category: "Teaching",
    employmentStatus: "Active",
    employmentType: "FullTime",
    fte: 1.0,
    jobTitle: "Computer Science & Robotics Instructor",
    department: "Sciences",
    startDate: "2024-08-15",
    compensation: {
      baseAmount: 16800,
      currency: "AED",
      payBasis: "Salary",
      payFrequency: "Monthly",
      housingAllowance: 5000,
      transportAllowance: 1000,
    },
  },
  {
    id: "stf-008",
    staffNumber: "STF-2021-061",
    name: {
      givenName: "Nadia",
      familyName: "Boutros",
      displayName: "Nadia Boutros",
    },
    email: "nadia.boutros@school.dirasa.ae",
    phone: "+971 55 432 1098",
    category: "NonTeaching",
    employmentStatus: "OnLeave",
    employmentType: "FullTime",
    fte: 1.0,
    jobTitle: "School Health Officer & Registered Nurse",
    department: "Safeguarding & Pastoral",
    startDate: "2021-11-01",
    leaveDetails: {
      type: "Annual",
      startDate: "2026-09-25",
      expectedReturnDate: "2026-10-08",
      coveringStaff: "Locum Nurse Sarah Jenkins",
      notes: "Approved annual statutory leave block.",
    },
    compensation: {
      baseAmount: 15500,
      currency: "AED",
      payBasis: "Salary",
      payFrequency: "Monthly",
      housingAllowance: 4500,
    },
  },
];

export default function StaffDirectoryPage() {
  const [staff, setStaff] = useState<MockStaffMember[]>(INITIAL_STAFF);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [departmentFilter, setDepartmentFilter] = useState<string>("All");

  // Selected Drawer
  const [selectedStaff, setSelectedStaff] = useState<MockStaffMember | null>(null);

  // Permission simulation for payroll.read
  const [hasPayrollReadPermission, setHasPayrollReadPermission] = useState(true);
  const [maskCompensation, setMaskCompensation] = useState(false);

  // Modals
  const [statusModalStaff, setStatusModalStaff] = useState<MockStaffMember | null>(null);
  const [statusAction, setStatusAction] = useState<"StartLeave" | "EndLeave" | "Suspend" | "Reinstate">("StartLeave");
  const [leaveType, setLeaveType] = useState<"Sick" | "Maternity" | "Paternity" | "Sabbatical" | "Annual" | "Unpaid">("Sick");
  const [leaveStartDate, setLeaveStartDate] = useState("2026-10-01");
  const [leaveReturnDate, setLeaveReturnDate] = useState("2026-10-15");
  const [coveringStaff, setCoveringStaff] = useState("");
  const [statusNotes, setStatusNotes] = useState("");

  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [newGivenName, setNewGivenName] = useState("");
  const [newFamilyName, setNewFamilyName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCategory, setNewCategory] = useState<StaffCategory>("Teaching");
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newDepartment, setNewDepartment] = useState("Sciences");
  const [newEmploymentType, setNewEmploymentType] = useState<EmploymentType>("FullTime");
  const [newFte, setNewFte] = useState(1.0);
  const [newStartDate, setNewStartDate] = useState("2026-10-01");
  const [newBaseAmount, setNewBaseAmount] = useState(18000);
  const [newCurrency, setNewCurrency] = useState<"AED" | "KES" | "USD">("AED");
  const [newPayFrequency, setNewPayFrequency] = useState<PayFrequency>("Monthly");

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // KPIs
  const totalStaffCount = staff.length;
  const teachingCount = staff.filter((s) => s.category === "Teaching").length;
  const nonTeachingCount = staff.filter((s) => s.category === "NonTeaching").length;
  const onLeaveCount = staff.filter((s) => s.employmentStatus === "OnLeave").length;

  // Filtered
  const filteredStaff = staff.filter((s) => {
    const q = search.toLowerCase();
    const matchesSearch =
      s.name.displayName.toLowerCase().includes(q) ||
      s.staffNumber.toLowerCase().includes(q) ||
      s.jobTitle.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q);

    const matchesCategory = categoryFilter === "All" || s.category === categoryFilter;
    const matchesStatus = statusFilter === "All" || s.employmentStatus === statusFilter;
    const matchesDept = departmentFilter === "All" || s.department === departmentFilter;

    return matchesSearch && matchesCategory && matchesStatus && matchesDept;
  });

  // Handle status update
  const handleApplyStatusChange = () => {
    if (!statusModalStaff) return;

    setStaff((prev) =>
      prev.map((s) => {
        if (s.id !== statusModalStaff.id) return s;

        if (statusAction === "StartLeave") {
          return {
            ...s,
            employmentStatus: "OnLeave",
            leaveDetails: {
              type: leaveType,
              startDate: leaveStartDate,
              expectedReturnDate: leaveReturnDate,
              coveringStaff: coveringStaff || undefined,
              notes: statusNotes,
            },
          };
        } else if (statusAction === "EndLeave" || statusAction === "Reinstate") {
          return {
            ...s,
            employmentStatus: "Active",
            leaveDetails: undefined,
            suspensionDetails: undefined,
          };
        } else if (statusAction === "Suspend") {
          return {
            ...s,
            employmentStatus: "Suspended",
            suspensionDetails: {
              date: new Date().toISOString().split("T")[0],
              reason: statusNotes || "Administrative suspension pending review.",
              investigationRef: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
            },
          };
        }
        return s;
      })
    );

    // If currently open in drawer, update drawer state too
    if (selectedStaff?.id === statusModalStaff.id) {
      setSelectedStaff((prev) => {
        if (!prev) return null;
        if (statusAction === "StartLeave") {
          return {
            ...prev,
            employmentStatus: "OnLeave",
            leaveDetails: {
              type: leaveType,
              startDate: leaveStartDate,
              expectedReturnDate: leaveReturnDate,
              coveringStaff: coveringStaff || undefined,
              notes: statusNotes,
            },
          };
        } else if (statusAction === "EndLeave" || statusAction === "Reinstate") {
          return {
            ...prev,
            employmentStatus: "Active",
            leaveDetails: undefined,
            suspensionDetails: undefined,
          };
        } else if (statusAction === "Suspend") {
          return {
            ...prev,
            employmentStatus: "Suspended",
            suspensionDetails: {
              date: new Date().toISOString().split("T")[0],
              reason: statusNotes || "Administrative suspension pending review.",
              investigationRef: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
            },
          };
        }
        return prev;
      });
    }

    showToast(`Status updated to ${statusAction} for ${statusModalStaff.name.displayName}`);
    setStatusModalStaff(null);
  };

  // Add staff
  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGivenName || !newFamilyName) return;

    const newMember: MockStaffMember = {
      id: `stf-${Date.now().toString().slice(-4)}`,
      staffNumber: `STF-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: {
        givenName: newGivenName,
        familyName: newFamilyName,
        displayName: `${newGivenName} ${newFamilyName}`,
      },
      email: newEmail || `${newGivenName.toLowerCase()}.${newFamilyName.toLowerCase()}@school.dirasa.ae`,
      phone: newPhone || "+971 50 000 0000",
      category: newCategory,
      employmentStatus: "Active",
      employmentType: newEmploymentType,
      fte: Number(newFte),
      jobTitle: newJobTitle || (newCategory === "Teaching" ? "Teacher" : "Officer"),
      department: newDepartment,
      startDate: newStartDate,
      compensation: {
        baseAmount: Number(newBaseAmount),
        currency: newCurrency,
        payBasis: "Salary",
        payFrequency: newPayFrequency,
      },
    };

    setStaff((prev) => [newMember, ...prev]);
    setIsAddStaffOpen(false);
    showToast(`Added ${newMember.name.displayName} to staff registry`);

    // Reset fields
    setNewGivenName("");
    setNewFamilyName("");
    setNewEmail("");
    setNewPhone("");
    setNewJobTitle("");
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
                  Faculty & Staff Management
                </h1>
                <Badge variant="info">HR & Academic Operations</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Personnel records, contract FTE, leave administration, and confidential payroll compensation
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsAddStaffOpen(true)}
                className="gap-2 text-xs bg-sky-600 hover:bg-sky-700"
              >
                <Plus className="h-4 w-4" /> Add Staff Member
              </Button>
            </div>
          </div>

          {/* Quick KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Total Staff</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {totalStaffCount}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Active institution employees</p>
            </Card>

            <Card className="p-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Teaching Faculty</p>
                  <p className="text-2xl font-bold text-sky-600 dark:text-sky-400 mt-1">
                    {teachingCount}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600">
                  <GraduationCap className="h-5 w-5" />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {((teachingCount / totalStaffCount) * 100).toFixed(0)}% instructional personnel
              </p>
            </Card>

            <Card className="p-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Non-Teaching Staff</p>
                  <p className="text-2xl font-bold text-slate-700 dark:text-slate-300 mt-1">
                    {nonTeachingCount}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <Briefcase className="h-5 w-5" />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">Admin, pastoral, medical & operations</p>
            </Card>

            <Card className="p-4 border-amber-200 dark:border-amber-900 bg-amber-50/20 dark:bg-amber-950/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-400">On Leave</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                    {onLeaveCount}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-300">
                  <Clock className="h-5 w-5" />
                </div>
              </div>
              <p className="text-[11px] text-amber-600/80 dark:text-amber-400/80 mt-2">
                Maternity, sick & annual absences
              </p>
            </Card>
          </div>

          {/* Filters Bar */}
          <Card>
            <CardContent className="p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="relative w-full lg:w-80">
                <Search className="h-4 w-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search staff name, code, title, department..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-9 ps-9 pe-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                {/* Category Filter */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400">Category:</span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs"
                  >
                    <option value="All">All Categories</option>
                    <option value="Teaching">Teaching Faculty</option>
                    <option value="NonTeaching">Non-Teaching Staff</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="OnLeave">On Leave</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Ended">Ended</option>
                  </select>
                </div>

                {/* Department Filter */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400">Dept:</span>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="h-8 px-2.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs"
                  >
                    <option value="All">All Departments</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Arts & PE">Arts & PE</option>
                    <option value="Administration">Administration</option>
                    <option value="IT & Operations">IT & Operations</option>
                    <option value="Safeguarding & Pastoral">Safeguarding & Pastoral</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Staff Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-start text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 text-start">Staff Member</th>
                    <th className="py-3.5 px-4 text-start">Staff ID</th>
                    <th className="py-3.5 px-4 text-start">Category & Role</th>
                    <th className="py-3.5 px-4 text-start">Department</th>
                    <th className="py-3.5 px-4 text-start">FTE / Terms</th>
                    <th className="py-3.5 px-4 text-start">Status</th>
                    <th className="py-3.5 px-4 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300 text-xs">
                  {filteredStaff.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        No staff members found matching the selected criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredStaff.map((member) => (
                      <tr
                        key={member.id}
                        className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        {/* Name & Email */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs ring-1 ring-slate-200 dark:ring-slate-700">
                              {member.name.givenName[0]}
                              {member.name.familyName[0]}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 dark:text-white">
                                {member.name.displayName}
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                {member.email}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Staff ID */}
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                          {member.staffNumber}
                        </td>

                        {/* Category & Role */}
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-slate-900 dark:text-slate-200">
                            {member.jobTitle}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                            {member.category === "Teaching" ? (
                              <span className="text-sky-600 dark:text-sky-400 font-medium">Teaching Faculty</span>
                            ) : (
                              <span className="text-slate-500 font-medium">Non-Teaching</span>
                            )}
                          </div>
                        </td>

                        {/* Department */}
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium">
                            {member.department}
                          </span>
                        </td>

                        {/* FTE & Contract */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                            <Percent className="h-3 w-3 text-slate-400" />
                            <span>{member.fte.toFixed(1)} FTE</span>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {member.employmentType} • Since {member.startDate.slice(0, 4)}
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <Badge
                            variant={
                              member.employmentStatus === "Active"
                                ? "success"
                                : member.employmentStatus === "OnLeave"
                                ? "warning"
                                : member.employmentStatus === "Suspended"
                                ? "danger"
                                : "outline"
                            }
                          >
                            {member.employmentStatus === "Active" && (
                              <CheckCircle2 className="h-3 w-3 mr-1 inline" />
                            )}
                            {member.employmentStatus === "OnLeave" && (
                              <Clock className="h-3 w-3 mr-1 inline" />
                            )}
                            {member.employmentStatus === "Suspended" && (
                              <ShieldAlert className="h-3 w-3 mr-1 inline" />
                            )}
                            {member.employmentStatus}
                          </Badge>
                          {member.leaveDetails && (
                            <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">
                              {member.leaveDetails.type} Leave
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-end">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setStatusModalStaff(member);
                                setStatusAction(
                                  member.employmentStatus === "OnLeave"
                                    ? "EndLeave"
                                    : member.employmentStatus === "Suspended"
                                    ? "Reinstate"
                                    : "StartLeave"
                                );
                              }}
                              className="h-7 text-xs px-2"
                              title="Transition Employment Status"
                            >
                              Status
                            </Button>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedStaff(member)}
                              className="h-7 text-xs text-sky-600 hover:text-sky-700 font-semibold gap-1"
                            >
                              View Profile <ChevronRight className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>

      {/* ============================================================== */}
      {/* DRAWER: STAFF PROFILE & BASE COMPENSATION VIEWER */}
      {/* ============================================================== */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-end">
          <div className="bg-white dark:bg-slate-900 h-full w-full max-w-lg shadow-2xl border-s border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold flex items-center justify-center text-base ring-1 ring-sky-200 dark:ring-sky-800">
                    {selectedStaff.name.givenName[0]}
                    {selectedStaff.name.familyName[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {selectedStaff.name.displayName}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-xs text-slate-400">
                        {selectedStaff.staffNumber}
                      </span>
                      <Badge
                        variant={
                          selectedStaff.employmentStatus === "Active"
                            ? "success"
                            : selectedStaff.employmentStatus === "OnLeave"
                            ? "warning"
                            : "danger"
                        }
                      >
                        {selectedStaff.employmentStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStaff(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Employment Terms Card */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Contract & Employment Terms
                  </h4>
                  <Badge variant="info">{selectedStaff.category}</Badge>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Official Role:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {selectedStaff.jobTitle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Academic Department:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {selectedStaff.department}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contract Engagement:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {selectedStaff.employmentType} ({selectedStaff.fte.toFixed(1)} FTE)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Start Date:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200">
                      {selectedStaff.startDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Institutional Email:</span>
                    <span className="font-mono text-sky-600 dark:text-sky-400">
                      {selectedStaff.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contact Telephone:</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {selectedStaff.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Leave or Suspension Card */}
              {selectedStaff.leaveDetails && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span>Active Statutory Leave: {selectedStaff.leaveDetails.type}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-amber-800 dark:text-amber-300">
                    <div>
                      <span className="text-slate-400 block">From:</span>
                      <span className="font-semibold">{selectedStaff.leaveDetails.startDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Expected Return:</span>
                      <span className="font-semibold">{selectedStaff.leaveDetails.expectedReturnDate}</span>
                    </div>
                  </div>
                  {selectedStaff.leaveDetails.coveringStaff && (
                    <div className="text-[11px]">
                      <span className="text-slate-500">Covering Faculty: </span>
                      <span className="font-medium">{selectedStaff.leaveDetails.coveringStaff}</span>
                    </div>
                  )}
                  {selectedStaff.leaveDetails.notes && (
                    <div className="text-[11px] italic bg-white/40 dark:bg-black/20 p-2 rounded">
                      "{selectedStaff.leaveDetails.notes}"
                    </div>
                  )}
                </div>
              )}

              {selectedStaff.suspensionDetails && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-rose-600">
                    <ShieldAlert className="h-4 w-4" />
                    <span>Administrative Suspension</span>
                  </div>
                  <div className="text-[11px] text-rose-800 dark:text-rose-300">
                    <div>Investigation Ref: <span className="font-mono font-bold">{selectedStaff.suspensionDetails.investigationRef}</span></div>
                    <div className="mt-1">Reason: {selectedStaff.suspensionDetails.reason}</div>
                  </div>
                </div>
              )}

              {/* Base Compensation Viewer (Confidential Payroll Simulation) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      Base Compensation & Payroll
                    </h4>
                  </div>
                  <button
                    onClick={() => setMaskCompensation(!maskCompensation)}
                    className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    {maskCompensation ? (
                      <>
                        <Eye className="h-3.5 w-3.5 text-sky-600" /> Show Figures
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-3.5 w-3.5 text-slate-400" /> Mask Figures
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-300">
                    <span className="flex items-center gap-1 font-semibold">
                      <Lock className="h-3 w-3" /> Privileged RBAC View: payroll.read
                    </span>
                    <span className="font-mono bg-emerald-100 dark:bg-emerald-900/60 px-1.5 py-0.5 rounded text-[10px]">
                      {selectedStaff.compensation.currency}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40 space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-slate-600 dark:text-slate-300">Contract Base Salary:</span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                        {maskCompensation ? (
                          "••••••••"
                        ) : (
                          `${selectedStaff.compensation.currency} ${selectedStaff.compensation.baseAmount.toLocaleString()} / mo`
                        )}
                      </span>
                    </div>

                    {selectedStaff.compensation.housingAllowance && (
                      <div className="flex justify-between items-baseline text-slate-500">
                        <span>Housing Allowance:</span>
                        <span className="font-mono">
                          {maskCompensation
                            ? "••••••"
                            : `${selectedStaff.compensation.currency} ${selectedStaff.compensation.housingAllowance.toLocaleString()}`}
                        </span>
                      </div>
                    )}

                    {selectedStaff.compensation.transportAllowance && (
                      <div className="flex justify-between items-baseline text-slate-500">
                        <span>Transport Allowance:</span>
                        <span className="font-mono">
                          {maskCompensation
                            ? "••••••"
                            : `${selectedStaff.compensation.currency} ${selectedStaff.compensation.transportAllowance.toLocaleString()}`}
                        </span>
                      </div>
                    )}

                    <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40 flex justify-between items-baseline font-bold text-emerald-900 dark:text-emerald-200">
                      <span>Total Gross Monthly Package:</span>
                      <span className="font-mono text-base">
                        {maskCompensation ? (
                          "••••••••"
                        ) : (
                          `${selectedStaff.compensation.currency} ${(
                            selectedStaff.compensation.baseAmount +
                            (selectedStaff.compensation.housingAllowance || 0) +
                            (selectedStaff.compensation.transportAllowance || 0)
                          ).toLocaleString()}`
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400">
                    Pay Frequency: {selectedStaff.compensation.payFrequency} • Basis: {selectedStaff.compensation.payBasis}
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Actions Footer */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <Button
                variant="outline"
                size="md"
                className="w-full text-xs font-semibold gap-2"
                onClick={() => {
                  setStatusModalStaff(selectedStaff);
                  setStatusAction(
                    selectedStaff.employmentStatus === "OnLeave"
                      ? "EndLeave"
                      : selectedStaff.employmentStatus === "Suspended"
                      ? "Reinstate"
                      : "StartLeave"
                  );
                }}
              >
                <Clock className="h-4 w-4 text-sky-600" /> Manage Status & Leave
              </Button>

              <Button
                variant="ghost"
                size="md"
                className="w-full text-xs"
                onClick={() => setSelectedStaff(null)}
              >
                Close Drawer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: STAFF STATUS ACTION (Start Leave / Suspend / Reinstate) */}
      {/* ============================================================== */}
      {statusModalStaff && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Update Employment Status
                  </h3>
                  <p className="text-xs text-slate-500">{statusModalStaff.name.displayName}</p>
                </div>
              </div>
              <button
                onClick={() => setStatusModalStaff(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Action
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(
                    [
                      { key: "StartLeave", label: "Start Leave" },
                      { key: "EndLeave", label: "End Leave" },
                      { key: "Suspend", label: "Suspend" },
                      { key: "Reinstate", label: "Reinstate" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setStatusAction(opt.key)}
                      className={`p-2 rounded-lg border text-xs font-semibold text-center transition-all ${
                        statusAction === opt.key
                          ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                          : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Action Fields */}
              {statusAction === "StartLeave" && (
                <div className="space-y-3 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Leave Type
                    </label>
                    <select
                      value={leaveType}
                      onChange={(e) => setLeaveType(e.target.value as any)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                    >
                      <option value="Sick">Sick Leave</option>
                      <option value="Maternity">Maternity Leave</option>
                      <option value="Paternity">Paternity Leave</option>
                      <option value="Sabbatical">Sabbatical / Study Leave</option>
                      <option value="Annual">Annual Recess</option>
                      <option value="Unpaid">Unpaid Personal Leave</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={leaveStartDate}
                        onChange={(e) => setLeaveStartDate(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Expected Return Date
                      </label>
                      <input
                        type="date"
                        value={leaveReturnDate}
                        onChange={(e) => setLeaveReturnDate(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Covering Faculty / Teacher
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Samuel Kimani or Supply Agency"
                      value={coveringStaff}
                      onChange={(e) => setCoveringStaff(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                    />
                  </div>
                </div>
              )}

              {statusAction === "Suspend" && (
                <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-200 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="h-4 w-4 text-rose-600" />
                    <span>Compliance Notice</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Suspending this staff member will immediately revoke SSO credentials, teacher gradebook access, and physical access badge authorization.
                  </p>
                </div>
              )}

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  HR & Administrative Notes
                </label>
                <textarea
                  rows={3}
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  placeholder="Record reasons, meeting references, or specific conditions..."
                  className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatusModalStaff(null)}
              >
                Cancel
              </Button>
              <Button
                variant={statusAction === "Suspend" ? "danger" : "primary"}
                size="sm"
                onClick={handleApplyStatusChange}
              >
                Apply {statusAction}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD NEW STAFF MEMBER */}
      {/* ============================================================== */}
      {isAddStaffOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-600">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Add New Staff Member
                  </h3>
                  <p className="text-xs text-slate-500">
                    Onboard teaching faculty or operational staff
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddStaffOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddStaff}>
              <div className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
                {/* Names */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Given Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq or Amina"
                      value={newGivenName}
                      onChange={(e) => setNewGivenName(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Family Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Al-Mansoor or Mwangi"
                      value={newFamilyName}
                      onChange={(e) => setNewFamilyName(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Institutional Email
                    </label>
                    <input
                      type="email"
                      placeholder="name@school.dirasa.ae"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Contact Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="+971 50 123 4567"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                    />
                  </div>
                </div>

                {/* Category & Department */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Staff Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as StaffCategory)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                    >
                      <option value="Teaching">Teaching Faculty</option>
                      <option value="NonTeaching">Non-Teaching Staff</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Department
                    </label>
                    <select
                      value={newDepartment}
                      onChange={(e) => setNewDepartment(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                    >
                      <option value="Sciences">Sciences</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Humanities">Humanities</option>
                      <option value="Languages">Languages</option>
                      <option value="Arts & PE">Arts & PE</option>
                      <option value="Administration">Administration</option>
                      <option value="IT & Operations">IT & Operations</option>
                      <option value="Safeguarding & Pastoral">Safeguarding & Pastoral</option>
                    </select>
                  </div>
                </div>

                {/* Job Title */}
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Job Title / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Physics Teacher, Head of Year, Registrar"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                  />
                </div>

                {/* Contract Terms */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Type
                    </label>
                    <select
                      value={newEmploymentType}
                      onChange={(e) => setNewEmploymentType(e.target.value as EmploymentType)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                    >
                      <option value="FullTime">Full Time</option>
                      <option value="PartTime">Part Time</option>
                      <option value="Contract">Fixed Term</option>
                      <option value="Casual">Casual / Supply</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      FTE Ratio
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="1.0"
                      value={newFte}
                      onChange={(e) => setNewFte(parseFloat(e.target.value) || 1.0)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newStartDate}
                      onChange={(e) => setNewStartDate(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                    />
                  </div>
                </div>

                {/* Initial Base Compensation */}
                <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200">
                    <DollarSign className="h-4 w-4" />
                    <span>Base Compensation Terms (Confidential)</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Amount
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="500"
                        value={newBaseAmount}
                        onChange={(e) => setNewBaseAmount(Number(e.target.value))}
                        className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Currency
                      </label>
                      <select
                        value={newCurrency}
                        onChange={(e) => setNewCurrency(e.target.value as any)}
                        className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                      >
                        <option value="AED">AED (UAE Dirham)</option>
                        <option value="KES">KES (Kenyan Shilling)</option>
                        <option value="USD">USD (US Dollar)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Frequency
                      </label>
                      <select
                        value={newPayFrequency}
                        onChange={(e) => setNewPayFrequency(e.target.value as any)}
                        className="w-full h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                      >
                        <option value="Monthly">Monthly</option>
                        <option value="BiWeekly">Bi-Weekly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddStaffOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-sky-600 hover:bg-sky-700"
                >
                  Register Staff Member
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
