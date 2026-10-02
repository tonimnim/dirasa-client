import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  FileText,
  Globe,
  GraduationCap,
  HeartHandshake,
  KeyRound,
  Languages,
  MonitorSmartphone,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
} from "lucide-react";

/** Copy for the landing page sections. Every claim here is backed by the product and its API. */

export interface Highlight {
  icon: LucideIcon;
  title: string;
  text: string;
}

export const FACTS: Highlight[] = [
  { icon: Languages, title: "Four languages", text: "English, Arabic (right-to-left), French and Swahili" },
  { icon: Building2, title: "Many schools, one sign-in", text: "Switch campus from the header" },
  { icon: KeyRound, title: "Role-based access", text: "Teachers see their classes, parents their children" },
  { icon: Globe, title: "Hosted in region", text: "Each region runs its own deployment" },
];

export interface Feature {
  /** Anchor used by the footer's Solutions links. */
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}

export const FEATURES: Feature[] = [
  {
    id: "students-guardians",
    icon: Users,
    title: "Students & guardians",
    description:
      "One record per child with admission numbers, identity documents and every guardian link. Verify guardians before they get access, and record custody restrictions the whole school respects.",
    tags: ["Guardian verification", "Custody restrictions"],
  },
  {
    id: "academics-timetables",
    icon: BookOpen,
    title: "Academics & timetables",
    description:
      "Start from a curriculum template such as UAE British, with stages, grade levels and subjects ready, then build classes and the weekly timetable.",
    tags: ["Curriculum templates", "Timetables"],
  },
  {
    id: "attendance-grades",
    icon: ClipboardCheck,
    title: "Attendance & grades",
    description:
      "Teachers take lesson registers and record continuous assessment for the classes they teach. Report cards draw on the same marks.",
    tags: ["Registers", "Gradebook"],
  },
  {
    id: "fees-invoicing",
    icon: Wallet,
    title: "Fees & invoicing",
    description: "Set fee schedules, issue invoices and keep track of outstanding and overdue balances for every family.",
    tags: ["Invoices", "Balances"],
  },
  {
    id: "admissions",
    icon: FileText,
    title: "Admissions",
    description:
      "Every school gets its own online application form. Review applicants and move them into enrolment once they're accepted.",
    tags: ["Online applications", "Enrolment"],
  },
  {
    id: "staff-payroll",
    icon: BriefcaseBusiness,
    title: "Staff & payroll",
    description: "Staff records, employment terms and compensation history, visible only to the people who handle payroll.",
    tags: ["Employment", "Compensation"],
  },
];

export interface Role {
  value: string;
  label: string;
  /** Singular form for "What a … can reach". */
  singular: string;
  icon: LucideIcon;
  title: string;
  text: string;
  points: string[];
  scope: string;
  scopeText: string;
}

export const ROLES: Role[] = [
  {
    value: "leaders",
    label: "School leaders",
    singular: "school leader",
    icon: ShieldCheck,
    title: "The whole school at a glance",
    text: "Principals and managers set the school up, invite staff and families, and decide who can see what.",
    points: [
      "Invite staff, guardians and students by email",
      "Assign roles, and suspend access the moment someone leaves",
      "Follow attendance, fees and admissions across the school",
    ],
    scope: "Whole school",
    scopeText: "Every class, family and staff record their roles allow.",
  },
  {
    value: "teachers",
    label: "Teachers",
    singular: "teacher",
    icon: GraduationCap,
    title: "Your classes, without the noise",
    text: "Teachers work with the classes they are assigned to, from registers to marks.",
    points: ["Take lesson registers in seconds", "Record marks in the gradebook", "See the week's timetable"],
    scope: "Assigned classes",
    scopeText: "Students and guardians of the classes they teach.",
  },
  {
    value: "parents",
    label: "Parents",
    singular: "parent",
    icon: HeartHandshake,
    title: "Close to your children's school day",
    text: "Once the school verifies the link, parents see their own children, and only them.",
    points: ["Attendance and report cards", "Fees, invoices and balances", "Messages from the school"],
    scope: "Linked children",
    scopeText: "Only children whose guardian link the school has verified.",
  },
  {
    value: "students",
    label: "Students",
    singular: "student",
    icon: Sparkles,
    title: "Always know what's next",
    text: "Students get their timetable, assessments and results in one place.",
    points: ["A personal timetable", "Assessment feedback", "Their own results, never anyone else's"],
    scope: "Their own record",
    scopeText: "Nothing about classmates beyond what the school shares.",
  },
];

export const SECURITY: Highlight[] = [
  {
    icon: KeyRound,
    title: "Permissions on every request",
    text: "Each action is checked against the user's role in that school, and lists only ever contain records within their scope.",
  },
  {
    icon: ShieldAlert,
    title: "Custody rules on record",
    text: "No record access, no contact, no collection: restrictions live on the guardian link, with the notes visible only to safeguarding staff.",
  },
  {
    icon: MonitorSmartphone,
    title: "Sessions you can end",
    text: "Sign-ins expire within minutes unless renewed. Anyone can sign out all their devices, and suspending a member cuts access at once.",
  },
  {
    icon: Building2,
    title: "Schools kept apart",
    text: "Schools share the platform, never each other's records. A session for one school cannot read another's data.",
  },
  {
    icon: ScrollText,
    title: "An audit trail",
    text: "Sign-ins, password resets, invitations and membership changes are recorded, so you can always see who did what.",
  },
  {
    icon: Globe,
    title: "Data stays in region",
    text: "Each region runs its own deployment with its own database, built for local data-residency rules.",
  },
];

export const STEPS = [
  {
    title: "Set up your school",
    text: "Add your school profile and academic year, then apply a curriculum template to get stages, grades and subjects in place.",
  },
  {
    title: "Invite your community",
    text: "Staff, guardians and students receive an email invitation and choose their own password. Their role decides what they see.",
  },
  {
    title: "Run the year",
    text: "Registers, marks, fees and messages live in one place, on any device, in each person's own language.",
  },
];

export const FAQ = [
  {
    question: "Can one person belong to more than one school?",
    answer:
      "Yes. A teacher at two campuses, or a parent with children at different schools, uses one account and switches school from the header. Each school still decides that person's role.",
  },
  {
    question: "Which languages does Dirasa support?",
    answer:
      "English, Arabic with a full right-to-left layout, French and Swahili. Messages and emails follow each person's language.",
  },
  {
    question: "How do parents get access?",
    answer:
      "The school invites them by email. A parent only sees children whose guardian link the school has verified, and custody restrictions on that link are respected.",
  },
  {
    question: "What happens when a staff member leaves?",
    answer:
      "Suspending or removing them signs them out of that school straight away. Their past actions stay in the audit trail.",
  },
  {
    question: "Where is our data stored?",
    answer:
      "In the region your school belongs to. Each region runs its own deployment and database, and schools never share records.",
  },
];
