"use client";

import React, { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Settings,
  Building,
  Users,
  ShieldCheck,
  Mail,
  Clock,
  Globe2,
  DollarSign,
  Plus,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  UserX,
  UserCheck,
  Lock,
  Key,
} from "lucide-react";

interface MemberItem {
  id: string;
  displayName: string;
  email: string;
  roles: ("Manager" | "Teacher" | "Staff" | "Parent" | "Student")[];
  status: "Active" | "Suspended";
  joinedAt: string;
}

interface PendingInvitation {
  id: string;
  email: string;
  displayName: string;
  roles: string[];
  invitedBy: string;
  expiresAt: string;
  status: "Pending" | "Expired";
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "members" | "invitations">("profile");

  // School Profile Form State
  const [legalName, setLegalName] = useState("Dirasa International Academy");
  const [slug, setSlug] = useState("dirasa-intl-academy");
  const [countryCode, setCountryCode] = useState("AE");
  const [timeZone, setTimeZone] = useState("Asia/Dubai");
  const [currency, setCurrency] = useState("AED");
  const [defaultCulture, setDefaultCulture] = useState("ar-AE");
  const [academicYear, setAcademicYear] = useState("2026/2027");
  const [isSavedProfile, setIsSavedProfile] = useState(false);

  // Members Management State
  const [members, setMembers] = useState<MemberItem[]>([
    {
      id: "m-01",
      displayName: "Tariq Al-Mansoor",
      email: "principal@dirasa.school",
      roles: ["Manager"],
      status: "Active",
      joinedAt: "2024-01-15",
    },
    {
      id: "m-02",
      displayName: "Sarah Jenkins",
      email: "s.jenkins@dirasa.school",
      roles: ["Teacher"],
      status: "Active",
      joinedAt: "2024-08-20",
    },
    {
      id: "m-03",
      displayName: "Kwame Mensah",
      email: "k.mensah@dirasa.school",
      roles: ["Teacher"],
      status: "Active",
      joinedAt: "2024-08-25",
    },
    {
      id: "m-04",
      displayName: "Fatima Al-Falasi",
      email: "f.alfalasi@dirasa.school",
      roles: ["Staff", "Teacher"],
      status: "Active",
      joinedAt: "2025-01-10",
    },
    {
      id: "m-05",
      displayName: "Patrick Mwangi",
      email: "p.mwangi@parent.dirasa.school",
      roles: ["Parent"],
      status: "Active",
      joinedAt: "2025-09-01",
    },
    {
      id: "m-06",
      displayName: "Marcus Van Zyl",
      email: "m.vanzyl@external.dirasa.school",
      roles: ["Staff"],
      status: "Suspended",
      joinedAt: "2024-11-05",
    },
  ]);

  // Pending Invitations State
  const [invitations, setInvitations] = useState<PendingInvitation[]>([
    {
      id: "inv-01",
      email: "z.hashemi@dirasa.school",
      displayName: "Zainab Al-Hashemi",
      roles: ["Teacher"],
      invitedBy: "Tariq Al-Mansoor",
      expiresAt: "2026-10-08",
      status: "Pending",
    },
    {
      id: "inv-02",
      email: "bursar.lead@dirasa.school",
      displayName: "Chief Bursar",
      roles: ["Manager", "Staff"],
      invitedBy: "Tariq Al-Mansoor",
      expiresAt: "2026-10-12",
      status: "Pending",
    },
    {
      id: "inv-03",
      email: "c.nwachukwu@dirasa.school",
      displayName: "Chidi Nwachukwu",
      roles: ["Teacher"],
      invitedBy: "Sarah Jenkins",
      expiresAt: "2026-09-28",
      status: "Expired",
    },
  ]);

  // Invite Modal State
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<"Manager" | "Teacher" | "Staff" | "Parent" | "Student">("Teacher");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavedProfile(true);
    setTimeout(() => setIsSavedProfile(false), 3000);
  };

  const handleToggleMemberStatus = (memberId: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== memberId) return m;
        return {
          ...m,
          status: m.status === "Active" ? "Suspended" : "Active",
        };
      })
    );
  };

  const handleSendInvite = () => {
    if (!inviteEmail) return;
    const newInv: PendingInvitation = {
      id: `inv-${Date.now()}`,
      email: inviteEmail,
      displayName: inviteName || inviteEmail.split("@")[0],
      roles: [inviteRole],
      invitedBy: "Current Administrator",
      expiresAt: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      status: "Pending",
    };
    setInvitations([newInv, ...invitations]);
    setIsInviteModalOpen(false);
    setInviteEmail("");
    setInviteName("");
  };

  const handleRevokeInvitation = (id: string) => {
    setInvitations((prev) => prev.filter((inv) => inv.id !== id));
  };

  const handleResendInvitation = (id: string) => {
    setInvitations((prev) =>
      prev.map((inv) => {
        if (inv.id !== id) return inv;
        return {
          ...inv,
          status: "Pending",
          expiresAt: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
        };
      })
    );
    alert("Invitation link refreshed and email re-dispatched.");
  };

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
                <div className="p-2.5 rounded-xl bg-slate-800 text-white dark:bg-slate-800 dark:text-sky-400">
                  <Settings className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    School & Tenant Settings
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Institution profile, localized jurisdictions, member credentials, and role authorizations
                  </p>
                </div>
              </div>
            </div>

            {activeTab === "members" && (
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsInviteModalOpen(true)}
                className="gap-1.5 text-xs bg-sky-600 hover:bg-sky-700"
              >
                <Plus className="h-3.5 w-3.5" /> Invite New Member
              </Button>
            )}
          </div>

          {/* Settings Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "profile"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Building className="h-3.5 w-3.5" /> School Institutional Profile
            </button>
            <button
              onClick={() => setActiveTab("members")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "members"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Users className="h-3.5 w-3.5" /> Members & Roles ({members.length})
            </button>
            <button
              onClick={() => setActiveTab("invitations")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "invitations"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Mail className="h-3.5 w-3.5" /> Pending Invitations ({invitations.length})
            </button>
          </div>

          {/* TAB 1: SCHOOL PROFILE */}
          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Institutional Identity & Regional Localization</CardTitle>
                  <CardDescription className="text-xs">
                    Jurisdiction, currency, default calendar culture, and academic timezones.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        School Legal Name:
                      </label>
                      <input
                        type="text"
                        value={legalName}
                        onChange={(e) => setLegalName(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Tenant Domain Slug:
                      </label>
                      <div className="flex items-center">
                        <span className="h-9 px-3 inline-flex items-center bg-slate-100 dark:bg-slate-800 border border-e-0 border-slate-200 dark:border-slate-700 rounded-s-lg text-slate-400 font-mono text-[11px]">
                          dirasa.school/
                        </span>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                          className="w-full h-9 px-3 rounded-e-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Country Code (ISO 3166):
                      </label>
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="AE">United Arab Emirates (AE)</option>
                        <option value="KE">Kenya (KE)</option>
                        <option value="NG">Nigeria (NG)</option>
                        <option value="ZA">South Africa (ZA)</option>
                        <option value="SA">Saudi Arabia (SA)</option>
                        <option value="EG">Egypt (EG)</option>
                        <option value="GB">United Kingdom (GB)</option>
                        <option value="US">United States (US)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Official Operating Timezone:
                      </label>
                      <select
                        value={timeZone}
                        onChange={(e) => setTimeZone(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="Asia/Dubai">Asia/Dubai (GST +04:00)</option>
                        <option value="Africa/Nairobi">Africa/Nairobi (EAT +03:00)</option>
                        <option value="Africa/Lagos">Africa/Lagos (WAT +01:00)</option>
                        <option value="Africa/Johannesburg">Africa/Johannesburg (SAST +02:00)</option>
                        <option value="Asia/Riyadh">Asia/Riyadh (AST +03:00)</option>
                        <option value="Europe/London">Europe/London (GMT/BST)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Primary Billing Currency:
                      </label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                      >
                        <option value="AED">AED - Emirati Dirham</option>
                        <option value="KES">KES - Kenyan Shilling</option>
                        <option value="NGN">NGN - Nigerian Naira</option>
                        <option value="USD">USD - US Dollar</option>
                        <option value="ZAR">ZAR - South African Rand</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="SAR">SAR - Saudi Riyal</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Default System Culture & Locale:
                      </label>
                      <select
                        value={defaultCulture}
                        onChange={(e) => setDefaultCulture(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      >
                        <option value="ar-AE">Arabic (UAE) - العربية</option>
                        <option value="en-US">English (United States)</option>
                        <option value="en-GB">English (United Kingdom)</option>
                        <option value="sw-KE">Swahili (Kenya)</option>
                        <option value="fr-FR">French (Francophone)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                        Active Academic Session:
                      </label>
                      <input
                        type="text"
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                  </div>

                  {isSavedProfile && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Institutional profile successfully saved and cached across tenant nodes.</span>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <Button variant="primary" size="md" type="submit" className="bg-sky-600 hover:bg-sky-700 font-semibold">
                      Save Profile Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          )}

          {/* TAB 2: MEMBERS & ROLES */}
          {activeTab === "members" && (
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Institutional Faculty, Staff & Member Roster</CardTitle>
                  <CardDescription className="text-xs">
                    Manage active logins, administrative roles, and security suspensions.
                  </CardDescription>
                </CardHeader>
                <div className="overflow-x-auto">
                  <table className="w-full text-start text-xs border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-800/70 border-y border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase">
                      <tr>
                        <th className="py-3 px-4 text-start">Member Name</th>
                        <th className="py-3 px-4 text-start">Email Address</th>
                        <th className="py-3 px-4 text-start">Assigned Roles</th>
                        <th className="py-3 px-4 text-start">Status</th>
                        <th className="py-3 px-4 text-start">Joined</th>
                        <th className="py-3 px-4 text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {members.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                          <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                            <div className="h-7 w-7 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs">
                              {m.displayName.slice(0, 1)}
                            </div>
                            {m.displayName}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                            {m.email}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex gap-1">
                              {m.roles.map((r) => (
                                <Badge
                                  key={r}
                                  variant={
                                    r === "Manager"
                                      ? "danger"
                                      : r === "Teacher"
                                      ? "info"
                                      : r === "Parent"
                                      ? "success"
                                      : "outline"
                                  }
                                >
                                  {r}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <Badge variant={m.status === "Active" ? "success" : "warning"}>
                              {m.status}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                            {m.joinedAt}
                          </td>
                          <td className="py-3.5 px-4 text-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleMemberStatus(m.id)}
                              className={`text-xs gap-1 ${
                                m.status === "Active"
                                  ? "text-rose-600 border-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                                  : "text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                              }`}
                            >
                              {m.status === "Active" ? (
                                <>
                                  <UserX className="h-3 w-3" /> Suspend
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-3 w-3" /> Reactivate
                                </>
                              )}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Roles & Permissions Matrix Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Key className="h-4 w-4 text-sky-600" /> Role Permissions Matrix
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Platform capabilities assigned by system governance tier.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-start text-xs border-collapse">
                      <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
                        <tr>
                          <th className="py-2.5 px-4 text-start">Module Feature</th>
                          <th className="py-2.5 px-4 text-center">Manager</th>
                          <th className="py-2.5 px-4 text-center">Teacher</th>
                          <th className="py-2.5 px-4 text-center">Staff</th>
                          <th className="py-2.5 px-4 text-center">Parent</th>
                          <th className="py-2.5 px-4 text-center">Student</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                        <tr>
                          <td className="py-2 px-4 font-semibold">Student 360 & Safeguarding</td>
                          <td className="py-2 px-4 text-center text-emerald-600">Full Access</td>
                          <td className="py-2 px-4 text-center text-emerald-600">Assigned Classes</td>
                          <td className="py-2 px-4 text-center text-slate-400">View Only</td>
                          <td className="py-2 px-4 text-center text-slate-400">Own Child</td>
                          <td className="py-2 px-4 text-center text-slate-400">Self</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-semibold">Gradebook & Marks Entry</td>
                          <td className="py-2 px-4 text-center text-emerald-600">Approve & Lock</td>
                          <td className="py-2 px-4 text-center text-emerald-600">Enter & Edit</td>
                          <td className="py-2 px-4 text-center text-slate-400">None</td>
                          <td className="py-2 px-4 text-center text-slate-400">Report Cards</td>
                          <td className="py-2 px-4 text-center text-slate-400">View Marks</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-semibold">Finance & Tuition Payments</td>
                          <td className="py-2 px-4 text-center text-emerald-600">Full Invoicing</td>
                          <td className="py-2 px-4 text-center text-slate-400">None</td>
                          <td className="py-2 px-4 text-center text-emerald-600">Cashier Desk</td>
                          <td className="py-2 px-4 text-center text-emerald-600">Pay Invoices</td>
                          <td className="py-2 px-4 text-center text-slate-400">None</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4 font-semibold">School Broadcast Announcements</td>
                          <td className="py-2 px-4 text-center text-emerald-600">School-Wide</td>
                          <td className="py-2 px-4 text-center text-emerald-600">Class Sections</td>
                          <td className="py-2 px-4 text-center text-slate-400">None</td>
                          <td className="py-2 px-4 text-center text-slate-400">Read Only</td>
                          <td className="py-2 px-4 text-center text-slate-400">Read Only</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 3: PENDING INVITATIONS */}
          {activeTab === "invitations" && (
            <Card className="overflow-hidden">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Pending Institutional Invitations</CardTitle>
                  <CardDescription className="text-xs">
                    Track outstanding account access emails, revoke unwanted tokens, or resend links.
                  </CardDescription>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsInviteModalOpen(true)}
                  className="gap-1.5 text-xs bg-sky-600 hover:bg-sky-700"
                >
                  <Plus className="h-3.5 w-3.5" /> Send Invitation
                </Button>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-800/70 border-y border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase">
                    <tr>
                      <th className="py-3 px-4 text-start">Invitee Email</th>
                      <th className="py-3 px-4 text-start">Designated Name</th>
                      <th className="py-3 px-4 text-start">Proposed Roles</th>
                      <th className="py-3 px-4 text-start">Invited By</th>
                      <th className="py-3 px-4 text-start">Expiry Date</th>
                      <th className="py-3 px-4 text-start">Status</th>
                      <th className="py-3 px-4 text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {invitations.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                          {inv.email}
                        </td>
                        <td className="py-3.5 px-4">{inv.displayName}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex gap-1">
                            {inv.roles.map((r) => (
                              <Badge key={r} variant="outline">
                                {r}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{inv.invitedBy}</td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                          {inv.expiresAt}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant={inv.status === "Pending" ? "info" : "danger"}>
                            {inv.status}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-end">
                          <div className="flex justify-end gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleResendInvitation(inv.id)}
                              className="text-xs text-sky-600 hover:text-sky-700 border-sky-200 gap-1"
                            >
                              <RefreshCw className="h-3 w-3" /> Resend
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRevokeInvitation(inv.id)}
                              className="text-xs text-rose-600 hover:text-rose-700 border-rose-200 gap-1"
                            >
                              <Trash2 className="h-3 w-3" /> Revoke
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* MODAL: INVITE MEMBER */}
          {isInviteModalOpen && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Invite Member to School
                    </h3>
                    <p className="text-xs text-slate-500">
                      Dispatches secure tokenized sign-up email for portal authentication.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsInviteModalOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Recipient Email Address:
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. educator@dirasa.school"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Full Display Name:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dr. Hisham Al-Hashemi"
                      value={inviteName}
                      onChange={(e) => setInviteName(e.target.value)}
                      className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      Assign Primary Role:
                    </label>
                    <select
                      value={inviteRole}
                      onChange={(e) =>
                        setInviteRole(
                          e.target.value as "Manager" | "Teacher" | "Staff" | "Parent" | "Student"
                        )
                      }
                      className="w-full h-9 px-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                    >
                      <option value="Teacher">Teacher / Faculty</option>
                      <option value="Manager">Manager / Academic Administrator</option>
                      <option value="Staff">Operations / Bursar Staff</option>
                      <option value="Parent">Parent / Guardian</option>
                      <option value="Student">Student Portal User</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <Button variant="outline" size="sm" onClick={() => setIsInviteModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleSendInvite}
                    className="bg-sky-600 hover:bg-sky-700 text-xs font-semibold"
                  >
                    Send Invitation
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
