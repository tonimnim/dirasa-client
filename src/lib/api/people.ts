import { apiClient } from "./client";
import { encodePath, jsonBody, withQuery } from "./query";
import type { components } from "@/types/generated/school";

type Schema = components["schemas"];
type Version = number | string;

export type StudentSummary = Schema["StudentSummary"];
export type StudentDetails = Schema["StudentDetails"];
export type GuardianSummary = Schema["GuardianSummary"];
export type GuardianDetails = Schema["GuardianDetails"];
export type GuardianLink = Schema["GuardianLinkView"];
export type StaffSummary = Schema["StaffSummary"];
export type StaffDetails = Schema["StaffDetails"];
export type Compensation = Schema["CompensationView"];
export type IdentifierScheme = Schema["IdentifierSchemeView"];

export interface StudentListParams {
  search?: string;
  status?: Schema["StudentStatus"];
  page?: number;
  pageSize?: number;
}

export interface GuardianListParams {
  search?: string;
  page?: number;
  pageSize?: number;
}

export interface StaffListParams {
  search?: string;
  category?: Schema["StaffCategory"];
  employmentStatus?: Schema["EmploymentStatus"];
  page?: number;
  pageSize?: number;
}

export const peopleApi = {
  identifierSchemes: () => apiClient<IdentifierScheme[]>("/api/v1/school/identifier-schemes"),

  listStudents: (params: StudentListParams = {}) =>
    apiClient<Schema["PagedResponseOfStudentSummary"]>(withQuery("/api/v1/school/students", params)),
  getStudent: (studentId: string) => apiClient<StudentDetails>(`/api/v1/school/students/${encodePath(studentId)}`),
  createStudent: (input: Schema["CreateStudentInput"]) =>
    apiClient<StudentDetails>("/api/v1/school/students", {
      method: "POST", body: jsonBody(input), idempotencyKey: true,
    }),
  updateStudent: (studentId: string, input: Schema["UpdateStudentInput"]) =>
    apiClient<StudentDetails>(`/api/v1/school/students/${encodePath(studentId)}`, { method: "PUT", body: jsonBody(input) }),
  withdrawStudent: (studentId: string, input: Schema["StudentLeaveInput"]) =>
    apiClient<StudentDetails>(`/api/v1/school/students/${encodePath(studentId)}/withdraw`, { method: "POST", body: jsonBody(input) }),
  graduateStudent: (studentId: string, input: Schema["StudentLeaveInput"]) =>
    apiClient<StudentDetails>(`/api/v1/school/students/${encodePath(studentId)}/graduate`, { method: "POST", body: jsonBody(input) }),
  reinstateStudent: (studentId: string, version: Version) =>
    apiClient<StudentDetails>(`/api/v1/school/students/${encodePath(studentId)}/reinstate`, { method: "POST", body: jsonBody({ version }) }),
  deleteStudent: (studentId: string, version: Version) =>
    apiClient<void>(withQuery(`/api/v1/school/students/${encodePath(studentId)}`, { version }), { method: "DELETE" }),
  addStudentIdentifier: (studentId: string, input: Schema["IdentifierInput"]) =>
    apiClient<StudentDetails>(`/api/v1/school/students/${encodePath(studentId)}/identifiers`, {
      method: "POST", body: jsonBody(input), idempotencyKey: true,
    }),
  removeStudentIdentifier: (studentId: string, identifierId: string) =>
    apiClient<StudentDetails>(`/api/v1/school/students/${encodePath(studentId)}/identifiers/${encodePath(identifierId)}`, { method: "DELETE" }),
  linkStudentAccount: (studentId: string, input: Schema["LinkAccountInput"]) =>
    apiClient<StudentDetails>(`/api/v1/school/students/${encodePath(studentId)}/account-link`, { method: "POST", body: jsonBody(input) }),
  unlinkStudentAccount: (studentId: string, version: Version) =>
    apiClient<StudentDetails>(withQuery(`/api/v1/school/students/${encodePath(studentId)}/account-link`, { version }), { method: "DELETE" }),
  listStudentGuardians: (studentId: string) =>
    apiClient<GuardianLink[]>(`/api/v1/school/students/${encodePath(studentId)}/guardians`),

  listGuardians: (params: GuardianListParams = {}) =>
    apiClient<Schema["PagedResponseOfGuardianSummary"]>(withQuery("/api/v1/school/guardians", params)),
  getGuardian: (guardianId: string) => apiClient<GuardianDetails>(`/api/v1/school/guardians/${encodePath(guardianId)}`),
  createGuardian: (input: Schema["CreateGuardianInput"]) =>
    apiClient<GuardianDetails>("/api/v1/school/guardians", { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  updateGuardian: (guardianId: string, input: Schema["UpdateGuardianInput"]) =>
    apiClient<GuardianDetails>(`/api/v1/school/guardians/${encodePath(guardianId)}`, { method: "PUT", body: jsonBody(input) }),
  deleteGuardian: (guardianId: string, version: Version) =>
    apiClient<void>(withQuery(`/api/v1/school/guardians/${encodePath(guardianId)}`, { version }), { method: "DELETE" }),
  linkGuardianAccount: (guardianId: string, input: Schema["LinkAccountInput"]) =>
    apiClient<GuardianDetails>(`/api/v1/school/guardians/${encodePath(guardianId)}/account-link`, { method: "POST", body: jsonBody(input) }),
  unlinkGuardianAccount: (guardianId: string, version: Version) =>
    apiClient<GuardianDetails>(withQuery(`/api/v1/school/guardians/${encodePath(guardianId)}/account-link`, { version }), { method: "DELETE" }),

  getGuardianLink: (linkId: string) => apiClient<GuardianLink>(`/api/v1/school/guardian-links/${encodePath(linkId)}`),
  createGuardianLink: (input: Schema["CreateGuardianLinkInput"]) =>
    apiClient<GuardianLink>("/api/v1/school/guardian-links", { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  updateGuardianLink: (linkId: string, input: Schema["UpdateGuardianLinkInput"]) =>
    apiClient<GuardianLink>(`/api/v1/school/guardian-links/${encodePath(linkId)}`, { method: "PUT", body: jsonBody(input) }),
  verifyGuardianLink: (linkId: string, input: Schema["VerifyGuardianLinkInput"]) =>
    apiClient<GuardianLink>(`/api/v1/school/guardian-links/${encodePath(linkId)}/verify`, { method: "POST", body: jsonBody(input) }),
  rejectGuardianLink: (linkId: string, version: Version) =>
    apiClient<GuardianLink>(`/api/v1/school/guardian-links/${encodePath(linkId)}/reject`, { method: "POST", body: jsonBody({ version }) }),
  restrictGuardianLink: (linkId: string, input: Schema["RestrictGuardianLinkInput"]) =>
    apiClient<GuardianLink>(`/api/v1/school/guardian-links/${encodePath(linkId)}/restrict`, { method: "POST", body: jsonBody(input) }),
  liftGuardianRestriction: (linkId: string, version: Version) =>
    apiClient<GuardianLink>(`/api/v1/school/guardian-links/${encodePath(linkId)}/lift-restriction`, { method: "POST", body: jsonBody({ version }) }),
  endGuardianLink: (linkId: string, version: Version) =>
    apiClient<GuardianLink>(`/api/v1/school/guardian-links/${encodePath(linkId)}/end`, { method: "POST", body: jsonBody({ version }) }),

  listStaff: (params: StaffListParams = {}) =>
    apiClient<Schema["PagedResponseOfStaffSummary"]>(withQuery("/api/v1/school/staff", params)),
  getStaff: (staffMemberId: string) => apiClient<StaffDetails>(`/api/v1/school/staff/${encodePath(staffMemberId)}`),
  createStaff: (input: Schema["CreateStaffInput"]) =>
    apiClient<StaffDetails>("/api/v1/school/staff", { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  updateStaff: (staffMemberId: string, input: Schema["UpdateStaffInput"]) =>
    apiClient<StaffDetails>(`/api/v1/school/staff/${encodePath(staffMemberId)}`, { method: "PUT", body: jsonBody(input) }),
  updateEmployment: (staffMemberId: string, input: Schema["UpdateEmploymentTermsInput"]) =>
    apiClient<StaffDetails>(`/api/v1/school/staff/${encodePath(staffMemberId)}/employment`, { method: "PUT", body: jsonBody(input) }),
  staffTransition: (
    staffMemberId: string,
    action: "start-leave" | "return-from-leave" | "suspend" | "lift-suspension" | "reinstate",
    version: Version
  ) => apiClient<StaffDetails>(`/api/v1/school/staff/${encodePath(staffMemberId)}/${action}`, { method: "POST", body: jsonBody({ version }) }),
  endEmployment: (staffMemberId: string, input: Schema["EndEmploymentInput"]) =>
    apiClient<StaffDetails>(`/api/v1/school/staff/${encodePath(staffMemberId)}/end-employment`, { method: "POST", body: jsonBody(input) }),
  deleteStaff: (staffMemberId: string, version: Version) =>
    apiClient<void>(withQuery(`/api/v1/school/staff/${encodePath(staffMemberId)}`, { version }), { method: "DELETE" }),
  addStaffIdentifier: (staffMemberId: string, input: Schema["IdentifierInput"]) =>
    apiClient<StaffDetails>(`/api/v1/school/staff/${encodePath(staffMemberId)}/identifiers`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  removeStaffIdentifier: (staffMemberId: string, identifierId: string) =>
    apiClient<StaffDetails>(`/api/v1/school/staff/${encodePath(staffMemberId)}/identifiers/${encodePath(identifierId)}`, { method: "DELETE" }),
  linkStaffAccount: (staffMemberId: string, input: Schema["LinkAccountInput"]) =>
    apiClient<StaffDetails>(`/api/v1/school/staff/${encodePath(staffMemberId)}/account-link`, { method: "POST", body: jsonBody(input) }),
  unlinkStaffAccount: (staffMemberId: string, version: Version) =>
    apiClient<StaffDetails>(withQuery(`/api/v1/school/staff/${encodePath(staffMemberId)}/account-link`, { version }), { method: "DELETE" }),
  getCompensation: (staffMemberId: string) =>
    apiClient<Compensation | null>(`/api/v1/school/staff/${encodePath(staffMemberId)}/compensation`),
  setCompensation: (staffMemberId: string, input: Schema["SetCompensationInput"]) =>
    apiClient<Compensation>(`/api/v1/school/staff/${encodePath(staffMemberId)}/compensation`, { method: "PUT", body: jsonBody(input) }),
};

export const listStudents = peopleApi.listStudents;
export const getStudent = peopleApi.getStudent;
export const createStudent = peopleApi.createStudent;
export const updateStudent = peopleApi.updateStudent;
export const listStudentGuardians = peopleApi.listStudentGuardians;
export const listGuardians = peopleApi.listGuardians;
export const getGuardian = peopleApi.getGuardian;
export const verifyGuardianLink = peopleApi.verifyGuardianLink;
export const restrictGuardianLink = peopleApi.restrictGuardianLink;
export const listStaff = peopleApi.listStaff;
export const getStaffMember = peopleApi.getStaff;
export const getStaffCompensation = peopleApi.getCompensation;
