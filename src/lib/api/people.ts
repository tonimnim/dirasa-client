import { apiClient } from "./client";
import {
  PagedResponse,
  StudentSummary,
  StudentDetails,
  StaffSummary,
  StaffDetails,
  CompensationView,
  GuardianSummary,
  GuardianDetails,
  GuardianLinkView,
  Gender,
  StudentStatus,
  StaffCategory,
  EmploymentStatus,
} from "@/types/api";

// --- Students ---
export interface StudentListParams {
  search?: string;
  status?: StudentStatus;
  page?: number;
  pageSize?: number;
}

export async function listStudents(params?: StudentListParams): Promise<PagedResponse<StudentSummary>> {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.status) query.set("status", params.status);
  if (params?.page) query.set("page", params.page.toString());
  if (params?.pageSize) query.set("pageSize", params.pageSize.toString());

  const qs = query.toString();
  return apiClient<PagedResponse<StudentSummary>>(`/api/v1/school/students${qs ? `?${qs}` : ""}`);
}

export async function getStudent(studentId: string): Promise<StudentDetails> {
  return apiClient<StudentDetails>(`/api/v1/school/students/${studentId}`);
}

export async function createStudent(input: {
  admissionNumber: string;
  name: { givenName: string; familyName: string; middleNames?: string; preferredName?: string; nativeScriptName?: string };
  dateOfBirth: string;
  gender: Gender;
  admissionDate: string;
  nationalityCode?: string;
  homeLanguage?: string;
}): Promise<StudentDetails> {
  return apiClient<StudentDetails>("/api/v1/school/students", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateStudent(
  studentId: string,
  input: {
    admissionNumber: string;
    name: { givenName: string; familyName: string; middleNames?: string; preferredName?: string; nativeScriptName?: string };
    dateOfBirth: string;
    gender: Gender;
    nationalityCode?: string;
    homeLanguage?: string;
    version: number;
  }
): Promise<StudentDetails> {
  return apiClient<StudentDetails>(`/api/v1/school/students/${studentId}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function listStudentGuardians(studentId: string): Promise<GuardianLinkView[]> {
  return apiClient<GuardianLinkView[]>(`/api/v1/school/students/${studentId}/guardians`);
}

// --- Guardians & Safeguarding Links ---
export interface GuardianListParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export async function listGuardians(params?: GuardianListParams): Promise<PagedResponse<GuardianSummary>> {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.page) query.set("page", params.page.toString());
  if (params?.pageSize) query.set("pageSize", params.pageSize.toString());

  const qs = query.toString();
  return apiClient<PagedResponse<GuardianSummary>>(`/api/v1/school/guardians${qs ? `?${qs}` : ""}`);
}

export async function getGuardian(guardianId: string): Promise<GuardianDetails> {
  return apiClient<GuardianDetails>(`/api/v1/school/guardians/${guardianId}`);
}

export async function verifyGuardianLink(
  linkId: string,
  input: { method: string; notes?: string; version: number }
): Promise<GuardianLinkView> {
  return apiClient<GuardianLinkView>(`/api/v1/school/guardian-links/${linkId}/verify`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function restrictGuardianLink(
  linkId: string,
  input: {
    noRecordAccess: boolean;
    noContact: boolean;
    noCollection: boolean;
    effectiveFrom?: string;
    effectiveTo?: string;
    notes?: string;
    version: number;
  }
): Promise<GuardianLinkView> {
  return apiClient<GuardianLinkView>(`/api/v1/school/guardian-links/${linkId}/restrict`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

// --- Staff & Payroll ---
export interface StaffListParams {
  search?: string;
  category?: StaffCategory;
  employmentStatus?: EmploymentStatus;
  page?: number;
  pageSize?: number;
}

export async function listStaff(params?: StaffListParams): Promise<PagedResponse<StaffSummary>> {
  const query = new URLSearchParams();
  if (params?.search) query.set("search", params.search);
  if (params?.category) query.set("category", params.category);
  if (params?.employmentStatus) query.set("employmentStatus", params.employmentStatus);
  if (params?.page) query.set("page", params.page.toString());
  if (params?.pageSize) query.set("pageSize", params.pageSize.toString());

  const qs = query.toString();
  return apiClient<PagedResponse<StaffSummary>>(`/api/v1/school/staff${qs ? `?${qs}` : ""}`);
}

export async function getStaffMember(staffMemberId: string): Promise<StaffDetails> {
  return apiClient<StaffDetails>(`/api/v1/school/staff/${staffMemberId}`);
}

export async function getStaffCompensation(staffMemberId: string): Promise<CompensationView | null> {
  return apiClient<CompensationView | null>(`/api/v1/school/staff/${staffMemberId}/compensation`);
}
