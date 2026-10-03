"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { DashboardSection, TaskLink } from "@/components/dashboard/DashboardParts";
import { FinanceDashboard, LeadershipDashboard, OperationsDashboard, StaffDashboard, TeacherDashboard } from "@/components/dashboard/RoleDashboards";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/context";
import { dashboardViews, type DashboardAudience } from "@/lib/dashboard/audience";

export default function DashboardPage() {
  const { activeTenant, user, roles, permissions } = useAuth();
  const views = dashboardViews(roles, permissions, user?.platformRoles, Boolean(activeTenant));
  const [choice, setChoice] = useState<{ tenantId: string; view: DashboardAudience } | null>(null);
  const view = choice && choice.tenantId === activeTenant?.id && views.includes(choice.view) ? choice.view : views[0];
  const titles = {
    leadership: "School overview",
    operations: "School operations",
    teacher: "My teaching",
    finance: "Finance workspace",
    staff: "My staff workspace",
    mobile: "Mobile access",
    platform: "Platform administration",
    limited: "Welcome to Dirasa",
  };

  return <AppShell header={{ title: titles[view], subtitle: activeTenant?.name ?? user?.displayName }}>
    {activeTenant && views.length > 1 && <div className="flex flex-wrap gap-2" aria-label="Dashboard view">
      {views.map((available) => <Button key={available} variant={view === available ? "default" : "outline"} onClick={() => setChoice({ tenantId: activeTenant.id, view: available })}>{titles[available]}</Button>)}
    </div>}
    {view === "leadership" && <LeadershipDashboard key={`${activeTenant?.id}:leadership`} />}
    {view === "operations" && <OperationsDashboard key={`${activeTenant?.id}:operations`} />}
    {view === "teacher" && <TeacherDashboard key={`${activeTenant?.id}:teacher`} />}
    {view === "finance" && <FinanceDashboard />}
    {view === "staff" && <StaffDashboard key={`${activeTenant?.id}:staff`} />}
    {view === "mobile" && <DashboardSection title="Parent and student access" description="Family features are planned for the mobile app."><p className="text-sm text-muted-foreground">The web portal focuses on school staff. You can still view school information available to your account.</p><div className="mt-4 flex flex-wrap gap-3"><Link className="text-sm font-medium text-primary underline" href="/calendar">School calendar</Link><Link className="text-sm font-medium text-primary underline" href="/settings">Account settings</Link></div></DashboardSection>}
    {view === "platform" && <DashboardSection title="Platform administration"><TaskLink href="/platform" title="Open platform" description="Manage schools and platform access." /></DashboardSection>}
    {view === "limited" && <DashboardSection title="No school workspace assigned"><p className="text-sm text-muted-foreground">Ask your school administrator to assign a web role, or choose another school from your account menu.</p></DashboardSection>}
  </AppShell>;
}
