/**
 * Dirasa System Types matching .NET 10 API DTOs and Domain Models
 */

// --- RFC 7807 ProblemDetails ---
export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  code?: string;
  traceId?: string;
  correlationId?: string;
  errors?: Record<string, string[]>;
  [key: string]: unknown;
}

// --- Paging Models ---
export interface PagedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface PageQuery {
  page?: number;
  pageSize?: number;
}

// --- Auth & Identity (docs/api/auth.openapi.json in the backend repo) ---
export type ClientChannel = "web" | "mobile";

export interface LoginRequest {
  /** Email address or user name. */
  identifier: string;
  password: string;
  clientType: ClientChannel;
  /** Web only: keep the refresh cookie after the browser closes. */
  rememberMe?: boolean;
  tenantId?: string;
  deviceName?: string;
}

export interface TenantSummary {
  id: string;
  name: string;
  slug: string;
}

/** Returned by login, refresh, switch-tenant and change password. Web clients get the refresh token as a cookie. */
export interface TokenResponse {
  accessToken: string;
  tokenType: "Bearer";
  /** ISO date-time; refresh shortly before. */
  expiresAt: string;
  tenant: TenantSummary | null;
  tenants: TenantSummary[];
  /** True when no school is active but the user has some: show a picker. */
  requiresTenantSelection: boolean;
}

export type MembershipStatus = "invited" | "active" | "suspended" | "left";

export interface MembershipSummary {
  tenantId: string;
  name: string;
  slug: string;
  roles: string[];
  status: MembershipStatus;
}

export interface MeResponse {
  id: string;
  displayName: string;
  email: string | null;
  preferredCulture: string | null;
  /** e.g. `super_admin`; web sessions only. */
  platformRoles: string[];
  activeTenant: TenantSummary | null;
  /** Tenant role keys in the active school, e.g. `manager`. */
  roles: string[];
  /** Effective permission keys, e.g. `students.read`. */
  permissions: string[];
  memberships: MembershipSummary[];
}

export interface SessionResponse {
  id: string;
  clientType: ClientChannel;
  deviceName: string | null;
  createdAt: string;
  lastUsedAt: string;
  current: boolean;
}

// --- School Profile ---
export interface SchoolProfile {
  id: string;
  name: string;
  slug: string;
  countryCode: string;
  subdivisionCode?: string;
  timeZone: string;
  defaultCulture: string;
  currency: string;
}

// --- Common Entities ---
export type LocalizedText = Record<string, string>;

export interface IdentifierView {
  id: string;
  schemeCode: string;
  schemeName: string;
  value: string;
}

export interface PersonNameView {
  givenName: string;
  middleNames?: string;
  familyName: string;
  preferredName?: string;
  nativeScriptName?: string;
  displayName: string;
}

// --- Students ---
export type Gender = "Male" | "Female" | "Other" | "Undisclosed";
export type StudentStatus = "Enrolled" | "Withdrawn" | "Graduated";

export interface StudentSummary {
  id: string;
  admissionNumber: string;
  name: PersonNameView;
  gender: Gender;
  status: StudentStatus;
  admissionDate: string;
}

export interface StudentDetails {
  id: string;
  admissionNumber: string;
  name: PersonNameView;
  dateOfBirth: string;
  gender: Gender;
  nationalityCode?: string;
  homeLanguage?: string;
  admissionDate: string;
  status: StudentStatus;
  leavingDate?: string;
  leavingReason?: string;
  membershipId?: string;
  identifiers: IdentifierView[];
  createdAt: string;
  updatedAt?: string;
  version: number;
}

// --- Guardians & Safeguarding Links ---
export type GuardianRelationship =
  | "Mother"
  | "Father"
  | "Stepmother"
  | "Stepfather"
  | "Grandparent"
  | "FosterParent"
  | "LegalGuardian"
  | "SocialWorker"
  | "Sponsor"
  | "Other";

export type GuardianVerificationStatus = "Pending" | "Verified" | "Rejected";

export interface AccessRestrictionsView {
  noRecordAccess: boolean;
  noContact: boolean;
  noCollection: boolean;
  effectiveFrom?: string;
  effectiveTo?: string;
  notes?: string;
}

export interface GuardianSummary {
  id: string;
  name: PersonNameView;
  phoneNumber?: string;
  email?: string;
  verifiedStudentsCount: number;
}

export interface GuardianDetails {
  id: string;
  name: PersonNameView;
  phoneNumber?: string;
  alternatePhoneNumber?: string;
  email?: string;
  preferredCulture?: string;
  occupation?: string;
  membershipId?: string;
  createdAt: string;
  updatedAt?: string;
  version: number;
}

export interface GuardianLinkView {
  id: string;
  studentId: string;
  guardianId: string;
  guardianName: PersonNameView;
  studentName: PersonNameView;
  relationship: GuardianRelationship;
  isPrimaryContact: boolean;
  isEmergencyContact: boolean;
  emergencyPriority?: number;
  receivesCorrespondence: boolean;
  verificationStatus: GuardianVerificationStatus;
  verifiedAt?: string;
  endedAt?: string;
  restrictions?: AccessRestrictionsView;
  version: number;
}

// --- Staff & Employment ---
export type StaffCategory = "Teaching" | "NonTeaching";
export type EmploymentStatus = "Active" | "OnLeave" | "Suspended" | "Ended";
export type EmploymentType = "FullTime" | "PartTime" | "Contract" | "Casual" | "Volunteer";
export type PayBasis = "Salary" | "Hourly" | "Daily";
export type PayFrequency = "Monthly" | "BiWeekly" | "Weekly";

export interface StaffSummary {
  id: string;
  staffNumber: string;
  name: PersonNameView;
  category: StaffCategory;
  employmentStatus: EmploymentStatus;
  jobTitle?: string;
}

export interface CompensationView {
  id: string;
  baseAmount: string;
  currency: string;
  payBasis: PayBasis;
  payFrequency: PayFrequency;
  effectiveFrom: string;
  version: number;
}

export interface StaffDetails {
  id: string;
  staffNumber: string;
  name: PersonNameView;
  dateOfBirth?: string;
  gender?: Gender;
  email?: string;
  phoneNumber?: string;
  category: StaffCategory;
  employmentStatus: EmploymentStatus;
  employmentType: EmploymentType;
  startDate: string;
  endDate?: string;
  jobTitle?: string;
  department?: string;
  membershipId?: string;
  identifiers: IdentifierView[];
  version: number;
}

// --- Invitations ---
export interface InvitationResponse {
  id: string;
  email: string;
  displayName?: string;
  roles: string[];
  expiresAt: string;
  isExpired: boolean;
  status: "Pending" | "Accepted" | "Revoked" | "Expired";
}

// --- School Members ---
export interface MemberResponse {
  membershipId: string;
  userId: string;
  displayName: string;
  email?: string;
  roles: string[];
  status: "Active" | "Suspended";
  joinedAt: string;
  version: number;
}
