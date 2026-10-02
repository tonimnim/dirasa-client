"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/legacy-ui/Card";
import { Badge } from "@/components/legacy-ui/Badge";
import { Button } from "@/components/legacy-ui/Button";
import {
  Megaphone,
  MessageSquare,
  HeartHandshake,
  Send,
  Plus,
  Search,
  Filter,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Lock,
  Mail,
  Smartphone,
  X,
  Sparkles,
  Award,
  AlertCircle,
  ThumbsUp,
  FileText,
  User,
  Check,
} from "lucide-react";

// --- Types ---
type CommunicationTab = "announcements" | "pastoral" | "chat";

interface AnnouncementRecord {
  id: string;
  title: string;
  body: string;
  senderName: string;
  senderRole: string;
  dateSent: string;
  priority: "Normal" | "Urgent" | "Critical";
  targetAudience: string[];
  channels: ("InApp" | "Email" | "SMS")[];
  stats: {
    sent: number;
    delivered: number;
    read: number;
  };
}

interface PastoralNoteRecord {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  type: "Positive" | "Neutral" | "Concern";
  category: string;
  authorName: string;
  date: string;
  points?: number;
  content: string;
  visibility: "StaffOnly" | "GuardiansVisible";
}

interface ChatMessage {
  id: string;
  sender: "staff" | "guardian";
  text: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

interface ChatThread {
  id: string;
  guardianName: string;
  guardianPhone: string;
  studentName: string;
  studentGrade: string;
  staffName: string;
  staffRole: string;
  unreadCount: number;
  lastMessageTime: string;
  messages: ChatMessage[];
}

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState<CommunicationTab>("announcements");

  // Announcements State
  const [announcements, setAnnouncements] = useState<AnnouncementRecord[]>([
    {
      id: "ann-01",
      title: "Ramadan Working Hours & Timetable Alterations",
      body: "Please be advised that from next Sunday, periods will be shortened to 35 minutes in observance of the holy month. Morning gates open at 08:15 and student dismissal is at 13:40.",
      senderName: "Principal Tariq Al-Mansoor",
      senderRole: "Head of School",
      dateSent: "2026-09-28 09:30",
      priority: "Urgent",
      targetAudience: ["All School", "Guardians", "Staff"],
      channels: ["InApp", "Email", "SMS"],
      stats: { sent: 1240, delivered: 1198, read: 984 },
    },
    {
      id: "ann-02",
      title: "Term 1 Parent-Teacher Conferences Booking Open",
      body: "Individual conference slots for Grade 7-9 are now live on the parent portal. Please reserve your 15-minute consultations with core subject faculty before Thursday.",
      senderName: "Sarah Jenkins",
      senderRole: "Academic Dean",
      dateSent: "2026-09-25 14:15",
      priority: "Normal",
      targetAudience: ["Grade 7-9", "Guardians"],
      channels: ["InApp", "Email"],
      stats: { sent: 480, delivered: 472, read: 421 },
    },
    {
      id: "ann-03",
      title: "Urgent Safeguarding Notice: Severe Dust Storm Advisory",
      body: "Due to high wind advisory, all outdoor P.E. and after-school sports clubs are moved indoors to the air-conditioned gymnasium. Bus departures remain on normal schedule.",
      senderName: "Operations & Health Team",
      senderRole: "Safety Office",
      dateSent: "2026-09-22 11:00",
      priority: "Critical",
      targetAudience: ["All School", "Staff", "Guardians"],
      channels: ["InApp", "SMS"],
      stats: { sent: 1240, delivered: 1225, read: 1150 },
    },
  ]);

  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [newAnnTitle, setNewAnnTitle] = useState("");
  const [newAnnBody, setNewAnnBody] = useState("");
  const [newAnnPriority, setNewAnnPriority] = useState<AnnouncementRecord["priority"]>("Normal");
  const [newAnnAudience, setNewAnnAudience] = useState<string[]>(["Guardians", "Staff"]);
  const [newAnnChannels, setNewAnnChannels] = useState<("InApp" | "Email" | "SMS")[]>(["InApp", "Email"]);

  // Pastoral Notes State
  const [pastoralNotes, setPastoralNotes] = useState<PastoralNoteRecord[]>([
    {
      id: "pn-01",
      studentId: "std-001",
      studentName: "Tariq Mansoor",
      grade: "Grade 7-A",
      type: "Positive",
      category: "Academic Merit",
      authorName: "Sarah Jenkins (Math)",
      date: "2026-09-29",
      points: 5,
      content: "Tariq represented our school exceptionally in the regional math olympiad qualifying round, answering 98% of mental arithmetic proofs.",
      visibility: "GuardiansVisible",
    },
    {
      id: "pn-02",
      studentId: "std-003",
      studentName: "Zayn Mwangi",
      grade: "Grade 8-B",
      type: "Concern",
      category: "Missing Homework",
      authorName: "Kwame Mensah (English)",
      date: "2026-09-27",
      points: -2,
      content: "Third consecutive unsubmitted poetry analysis assignment. Recommended after-school homework club assistance.",
      visibility: "GuardiansVisible",
    },
    {
      id: "pn-03",
      studentId: "std-005",
      studentName: "Bilal El-Sayed",
      grade: "Grade 7-A",
      type: "Concern",
      category: "Safeguarding Observation",
      authorName: "Dr. Adebayo Ogun (Science)",
      date: "2026-09-26",
      content: "Student seemed withdrawn and reported fatigue during morning labs. Counselors requested to review home welfare background.",
      visibility: "StaffOnly",
    },
    {
      id: "pn-04",
      studentId: "std-002",
      studentName: "Amina Al-Falasi",
      grade: "Grade 7-A",
      type: "Positive",
      category: "Values & Integrity",
      authorName: "Sheikh Tariq Omar (Islamic)",
      date: "2026-09-24",
      points: 5,
      content: "Amina volunteered during break to assist new international students orienting themselves to classroom transitions.",
      visibility: "GuardiansVisible",
    },
  ]);

  const [isPastoralModalOpen, setIsPastoralModalOpen] = useState(false);
  const [pastoralTypeFilter, setPastoralTypeFilter] = useState("All");
  const [newNoteStudent, setNewNoteStudent] = useState("Tariq Mansoor (Grade 7-A)");
  const [newNoteType, setNewNoteType] = useState<PastoralNoteRecord["type"]>("Positive");
  const [newNoteCategory, setNewNoteCategory] = useState("Academic Excellence");
  const [newNoteVisibility, setNewNoteVisibility] = useState<PastoralNoteRecord["visibility"]>("GuardiansVisible");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [newNotePoints, setNewNotePoints] = useState<number>(3);

  // 1:1 Guardian-Staff Chat State
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([
    {
      id: "th-01",
      guardianName: "Mansoor Al-Falasi",
      guardianPhone: "+971 50 123 4567",
      studentName: "Tariq Mansoor",
      studentGrade: "Grade 7-A",
      staffName: "Sarah Jenkins",
      staffRole: "Homeroom & Math Teacher",
      unreadCount: 0,
      lastMessageTime: "10:45 AM",
      messages: [
        { id: "m1", sender: "guardian", text: "Good morning Ms. Jenkins. I wanted to verify Tariq's schedule for Thursday's math contest.", timestamp: "10:30 AM", status: "read" },
        { id: "m2", sender: "staff", text: "Good morning Mr. Al-Falasi! Tariq will be participating during Period 3 in the IT Hub. He is well prepared!", timestamp: "10:42 AM", status: "read" },
        { id: "m3", sender: "guardian", text: "Excellent news, thank you for guiding him. We will ensure he gets plenty of rest.", timestamp: "10:45 AM", status: "read" },
      ],
    },
    {
      id: "th-02",
      guardianName: "Patrick Mwangi",
      guardianPhone: "+254 722 999 888",
      studentName: "Zayn Mwangi",
      studentGrade: "Grade 8-B",
      staffName: "Kwame Mensah",
      staffRole: "English Faculty",
      unreadCount: 1,
      lastMessageTime: "Yesterday",
      messages: [
        { id: "m1", sender: "staff", text: "Hello Mr. Mwangi. I noticed Zayn forgot his literature textbook today. Could you remind him this evening?", timestamp: "Yesterday 2:15 PM", status: "read" },
        { id: "m2", sender: "guardian", text: "Thank you for letting me know, Mr. Mensah. I have placed it in his bag for tomorrow.", timestamp: "Yesterday 5:20 PM", status: "delivered" },
      ],
    },
  ]);

  const [selectedThreadId, setSelectedThreadId] = useState<string>("th-01");
  const [chatInputText, setChatInputText] = useState("");

  const activeThread = chatThreads.find((t) => t.id === selectedThreadId) || chatThreads[0];

  // Send message in active chat thread
  const handleSendMessage = () => {
    if (!chatInputText.trim() || !activeThread) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "staff",
      text: chatInputText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "delivered",
    };

    setChatThreads((prev) =>
      prev.map((th) =>
        th.id === activeThread.id
          ? {
              ...th,
              messages: [...th.messages, newMsg],
              lastMessageTime: newMsg.timestamp,
            }
          : th
      )
    );
    setChatInputText("");
  };

  // Submit New Announcement
  const handleCreateAnnouncement = () => {
    if (!newAnnTitle || !newAnnBody) return;
    const newRec: AnnouncementRecord = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle,
      body: newAnnBody,
      senderName: "Operations Specialist",
      senderRole: "School Leadership",
      dateSent: new Date().toISOString().replace("T", " ").slice(0, 16),
      priority: newAnnPriority,
      targetAudience: newAnnAudience,
      channels: newAnnChannels,
      stats: { sent: 1240, delivered: 1210, read: 1 },
    };
    setAnnouncements([newRec, ...announcements]);
    setIsComposerOpen(false);
    setNewAnnTitle("");
    setNewAnnBody("");
  };

  // Submit New Pastoral Note
  const handleCreatePastoralNote = () => {
    if (!newNoteContent) return;
    const newNote: PastoralNoteRecord = {
      id: `pn-${Date.now()}`,
      studentId: "std-001",
      studentName: newNoteStudent.split(" (")[0],
      grade: newNoteStudent.includes("7-A") ? "Grade 7-A" : "Grade 8-B",
      type: newNoteType,
      category: newNoteCategory,
      authorName: "Faculty Lead",
      date: new Date().toISOString().split("T")[0],
      points: newNoteType === "Positive" ? newNotePoints : newNoteType === "Concern" ? -newNotePoints : 0,
      content: newNoteContent,
      visibility: newNoteVisibility,
    };
    setPastoralNotes([newNote, ...pastoralNotes]);
    setIsPastoralModalOpen(false);
    setNewNoteContent("");
  };

  const filteredPastoral = pastoralNotes.filter((p) => {
    return pastoralTypeFilter === "All" || p.type === pastoralTypeFilter;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <AppHeader />

        <main className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-600/10 text-sky-600 dark:text-sky-400">
                  <Megaphone className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    Communication & Pastoral Center
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Targeted Announcements, Pastoral Notes, and Safeguarded 1:1 Guardian-Faculty Messaging
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action depending on tab */}
            <div className="flex items-center gap-2">
              {activeTab === "announcements" && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsComposerOpen(true)}
                  className="gap-1.5 text-xs bg-sky-600 hover:bg-sky-700"
                >
                  <Plus className="h-3.5 w-3.5" /> Compose Announcement
                </Button>
              )}
              {activeTab === "pastoral" && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsPastoralModalOpen(true)}
                  className="gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-700"
                >
                  <Award className="h-3.5 w-3.5" /> Log Pastoral Note
                </Button>
              )}
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab("announcements")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "announcements"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Megaphone className="h-3.5 w-3.5" />
              Audience Announcements ({announcements.length})
            </button>
            <button
              onClick={() => setActiveTab("pastoral")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "pastoral"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <HeartHandshake className="h-3.5 w-3.5" />
              Pastoral & Behavior Notes ({pastoralNotes.length})
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "chat"
                  ? "bg-sky-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              1:1 Guardian-Staff Chat
              <Badge variant="info" className="text-[10px] px-1.5 py-0 ms-1">
                Safeguarded
              </Badge>
            </button>
          </div>

          {/* TAB 1: ANNOUNCEMENTS */}
          {activeTab === "announcements" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {announcements.map((ann) => {
                  const readPct = ((ann.stats.read / ann.stats.sent) * 100).toFixed(1);
                  return (
                    <Card key={ann.id} className="hover:border-sky-500/50 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  ann.priority === "Critical"
                                    ? "danger"
                                    : ann.priority === "Urgent"
                                    ? "warning"
                                    : "info"
                                }
                                className="text-[10px]"
                              >
                                {ann.priority} Priority
                              </Badge>
                              <span className="text-[11px] text-slate-400 font-mono">
                                {ann.dateSent} &bull; By {ann.senderName} ({ann.senderRole})
                              </span>
                            </div>
                            <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
                              {ann.title}
                            </CardTitle>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {ann.channels.map((ch) => (
                              <span
                                key={ch}
                                className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                              >
                                {ch === "InApp" && "App Push"}
                                {ch === "Email" && "Email"}
                                {ch === "SMS" && "SMS / WhatsApp"}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 text-xs">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {ann.body}
                        </p>

                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-slate-500">Audience:</span>
                            {ann.targetAudience.map((aud) => (
                              <Badge key={aud} variant="outline" className="text-[10px]">
                                {aud}
                              </Badge>
                            ))}
                          </div>

                          {/* Read Receipts Stats Bar */}
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-slate-500 font-mono">
                              <Eye className="h-3.5 w-3.5 text-sky-600" />
                              <span>
                                {ann.stats.read} / {ann.stats.sent} Read ({readPct}%)
                              </span>
                            </div>
                            <div className="w-24 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-sky-600 h-full rounded-full"
                                style={{ width: `${readPct}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: PASTORAL & BEHAVIOR STUDENT NOTES */}
          {activeTab === "pastoral" && (
            <div className="space-y-4">
              {/* Filter Bar */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Filter Severity:</span>
                  {["All", "Positive", "Neutral", "Concern"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setPastoralTypeFilter(f)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        pastoralTypeFilter === f
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Lock className="h-3 w-3 text-amber-500" /> Staff Only
                  </span>
                  <span className="flex items-center gap-1 ms-2">
                    <Eye className="h-3 w-3 text-emerald-500" /> Guardian Visible
                  </span>
                </div>
              </div>

              {/* Pastoral Notes List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPastoral.map((note) => (
                  <Card key={note.id} className="border-l-4 border-l-current">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                note.type === "Positive"
                                  ? "success"
                                  : note.type === "Concern"
                                  ? "danger"
                                  : "default"
                              }
                              className="text-[10px]"
                            >
                              {note.category}
                            </Badge>
                            {note.points !== undefined && note.points !== 0 && (
                              <span
                                className={`text-[11px] font-mono font-bold ${
                                  note.points > 0 ? "text-emerald-600" : "text-rose-600"
                                }`}
                              >
                                {note.points > 0 ? `+${note.points}` : note.points} Pts
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                            {note.studentName} &bull; {note.grade}
                          </CardTitle>
                        </div>

                        {note.visibility === "StaffOnly" ? (
                          <Badge variant="warning" className="text-[10px] gap-1">
                            <Lock className="h-3 w-3" /> Staff Only (Safeguarded)
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] gap-1 border-emerald-300 text-emerald-700 dark:text-emerald-400">
                            <Eye className="h-3 w-3" /> Guardians Portal Visible
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 text-xs">
                      <p className="text-slate-700 dark:text-slate-300 italic">
                        &ldquo;{note.content}&rdquo;
                      </p>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>Logged by {note.authorName}</span>
                        <span>{note.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: 1:1 GUARDIAN-STAFF CHAT */}
          {activeTab === "chat" && (
            <div className="space-y-4">
              {/* Safeguarding Legal Banner */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200">
                <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0" />
                <span>
                  <strong>Single-Guardian Safeguarding Policy:</strong> All conversations are strictly monitored by school child protection coordinators. Chat is restricted to verified guardians and assigned faculty.
                </span>
              </div>

              {/* Chat Split Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs h-[550px]">
                {/* Conversations Sidebar */}
                <div className="border-e border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-y-auto">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 font-semibold text-xs text-slate-600 dark:text-slate-300">
                    Active Messaging Threads
                  </div>
                  {chatThreads.map((th) => (
                    <div
                      key={th.id}
                      onClick={() => setSelectedThreadId(th.id)}
                      className={`p-3.5 cursor-pointer transition-colors ${
                        th.id === selectedThreadId
                          ? "bg-sky-50 dark:bg-sky-950/40 border-s-4 border-s-sky-600"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          {th.guardianName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {th.lastMessageTime}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Child: {th.studentName} ({th.studentGrade})
                      </div>
                      <div className="text-[10px] text-sky-600 dark:text-sky-400 mt-1 truncate">
                        Faculty: {th.staffName}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Active Chat Conversation View */}
                <div className="md:col-span-2 flex flex-col justify-between h-full bg-slate-50/50 dark:bg-slate-950/50">
                  {/* Chat Top Bar */}
                  <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-sky-600" />
                        {activeThread.guardianName} &bull; Guardian of {activeThread.studentName}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Staff Participant: {activeThread.staffName} ({activeThread.staffRole})
                      </div>
                    </div>
                    <Badge variant="success" className="text-[10px]">
                      Encrypted & Logged
                    </Badge>
                  </div>

                  {/* Messages Bubble Stream */}
                  <div className="p-4 space-y-3 overflow-y-auto flex-1 text-xs">
                    {activeThread.messages.map((m) => {
                      const isStaff = m.sender === "staff";
                      return (
                        <div
                          key={m.id}
                          className={`flex flex-col ${isStaff ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`max-w-md p-3 rounded-2xl ${
                              isStaff
                                ? "bg-sky-600 text-white rounded-br-xs"
                                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-bl-xs shadow-2xs"
                            }`}
                          >
                            <p className="leading-relaxed">{m.text}</p>
                          </div>
                          <span className="text-[9px] text-slate-400 font-mono mt-1 flex items-center gap-1">
                            {m.timestamp} {isStaff && <Check className="h-2.5 w-2.5 text-sky-500" />}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Message Composer Input */}
                  <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type a verified message to guardian..."
                      value={chatInputText}
                      onChange={(e) => setChatInputText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-900 dark:text-white"
                    />
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSendMessage}
                      className="bg-sky-600 hover:bg-sky-700 text-xs gap-1"
                    >
                      <Send className="h-3.5 w-3.5" /> Send
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODAL 1: COMPOSE ANNOUNCEMENT */}
          {isComposerOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Compose Targeted Announcement
                    </h3>
                    <p className="text-xs text-slate-500">
                      Dispatches immediate institutional broadcasts with read-receipt tracking.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsComposerOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Broadcast Title:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. End of Term Examination Schedule"
                      value={newAnnTitle}
                      onChange={(e) => setNewAnnTitle(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                        Priority Level:
                      </label>
                      <select
                        value={newAnnPriority}
                        onChange={(e) =>
                          setNewAnnPriority(e.target.value as AnnouncementRecord["priority"])
                        }
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Critical">Critical (Immediate Alert)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                        Target Audience:
                      </label>
                      <select
                        onChange={(e) => setNewAnnAudience([e.target.value])}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="All School">Whole School Community</option>
                        <option value="Guardians">Guardians Only</option>
                        <option value="Staff">Faculty & Staff Only</option>
                        <option value="Grade 7-9">Grade 7-9 Middle School</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Delivery Channels:
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newAnnChannels.includes("InApp")}
                          onChange={(e) => {
                            if (e.target.checked) setNewAnnChannels([...newAnnChannels, "InApp"]);
                            else setNewAnnChannels(newAnnChannels.filter((c) => c !== "InApp"));
                          }}
                        />
                        <span>In-App Feed</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newAnnChannels.includes("Email")}
                          onChange={(e) => {
                            if (e.target.checked) setNewAnnChannels([...newAnnChannels, "Email"]);
                            else setNewAnnChannels(newAnnChannels.filter((c) => c !== "Email"));
                          }}
                        />
                        <span>Email Digest</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newAnnChannels.includes("SMS")}
                          onChange={(e) => {
                            if (e.target.checked) setNewAnnChannels([...newAnnChannels, "SMS"]);
                            else setNewAnnChannels(newAnnChannels.filter((c) => c !== "SMS"));
                          }}
                        />
                        <span>SMS / WhatsApp</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Message Content:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Write message details..."
                      value={newAnnBody}
                      onChange={(e) => setNewAnnBody(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="outline" size="sm" onClick={() => setIsComposerOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleCreateAnnouncement}
                    className="bg-sky-600 hover:bg-sky-700 text-xs font-semibold"
                  >
                    Dispatch Broadcast
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL 2: LOG PASTORAL NOTE */}
          {isPastoralModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Log Pastoral & Behavior Note
                    </h3>
                    <p className="text-xs text-slate-500">
                      Record student achievements, behavioral observations, or safeguarding notes.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPastoralModalOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Student:
                    </label>
                    <select
                      value={newNoteStudent}
                      onChange={(e) => setNewNoteStudent(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="Tariq Mansoor (Grade 7-A)">Tariq Mansoor (Grade 7-A)</option>
                      <option value="Amina Al-Falasi (Grade 7-A)">Amina Al-Falasi (Grade 7-A)</option>
                      <option value="Zayn Mwangi (Grade 8-B)">Zayn Mwangi (Grade 8-B)</option>
                      <option value="Bilal El-Sayed (Grade 7-A)">Bilal El-Sayed (Grade 7-A)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                        Type:
                      </label>
                      <select
                        value={newNoteType}
                        onChange={(e) =>
                          setNewNoteType(e.target.value as PastoralNoteRecord["type"])
                        }
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="Positive">Positive (Merit)</option>
                        <option value="Neutral">Neutral (Informational)</option>
                        <option value="Concern">Concern (Demerit/Welfare)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                        Audience Visibility:
                      </label>
                      <select
                        value={newNoteVisibility}
                        onChange={(e) =>
                          setNewNoteVisibility(e.target.value as PastoralNoteRecord["visibility"])
                        }
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                      >
                        <option value="GuardiansVisible">Guardians Visible (Parent Portal)</option>
                        <option value="StaffOnly">Staff Only (Internal Safeguarding)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Category Description:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Integrity & Leadership Award"
                      value={newNoteCategory}
                      onChange={(e) => setNewNoteCategory(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Observation Narrative:
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe the incident or praise..."
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="outline" size="sm" onClick={() => setIsPastoralModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleCreatePastoralNote}
                    className="bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold"
                  >
                    Save Pastoral Note
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
