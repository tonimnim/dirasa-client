export type DashboardAudience = "leadership" | "operations" | "teacher" | "finance" | "staff" | "mobile" | "platform" | "limited";

const leadershipRoles = new Set(["owner", "director", "principal"]);
const operationsRoles = new Set(["manager", "deputy"]);
const financeRoles = new Set(["finance", "bursar", "accountant"]);

export function canViewLeadership(roles: readonly string[]): boolean {
  return roles.some((role) => leadershipRoles.has(role) || role === "manager");
}

export function canViewOperations(roles: readonly string[]): boolean {
  return roles.some((role) => operationsRoles.has(role) || leadershipRoles.has(role));
}

/** Picks a home view from the active school's roles and effective permissions. */
export function dashboardAudience(
  roles: readonly string[],
  permissions: readonly string[],
  platformRoles: readonly string[] = [],
  hasSchool = true,
): DashboardAudience {
  if (!hasSchool) return platformRoles.includes("super_admin") ? "platform" : "limited";
  if (roles.some((role) => leadershipRoles.has(role))) return "leadership";
  if (roles.some((role) => operationsRoles.has(role))) return "operations";
  if (roles.some((role) => financeRoles.has(role)) || permissions.some((permission) => permission.startsWith("finance."))) return "finance";
  if (roles.includes("teacher")) return "teacher";
  if (roles.includes("staff")) return "staff";
  if (roles.includes("parent") || roles.includes("student")) return "mobile";
  return "limited";
}

/** Workspaces the user may choose when they hold several school roles. */
export function dashboardViews(
  roles: readonly string[],
  permissions: readonly string[],
  platformRoles: readonly string[] = [],
  hasSchool = true,
): DashboardAudience[] {
  const preferred = dashboardAudience(roles, permissions, platformRoles, hasSchool);
  if (preferred === "platform" || preferred === "mobile" || preferred === "limited") return [preferred];
  const views: DashboardAudience[] = [];
  if (canViewLeadership(roles)) views.push("leadership");
  if (canViewOperations(roles)) views.push("operations");
  if (roles.includes("teacher") && permissions.includes("teaching.read")) views.push("teacher");
  if (roles.some((role) => financeRoles.has(role)) || permissions.some((permission) => permission.startsWith("finance."))) views.push("finance");
  if (roles.includes("staff") && permissions.includes("staff.read")) views.push("staff");
  return [preferred, ...views.filter((view) => view !== preferred)];
}
