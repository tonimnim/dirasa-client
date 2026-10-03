import { apiClient } from "./client";
import { encodePath, jsonBody, withQuery } from "./query";
import type { components } from "@/types/generated/school";

type Schema = components["schemas"];
type Page = { page?: number; pageSize?: number };
const root = "/api/v1/school";

export const teachingApi = {
  listClassSubjects: (params: Page & {
    academicYearId?: string;
    classSectionId?: string;
    subjectId?: string;
    isActive?: boolean;
  } = {}) => apiClient<Schema["PagedResponseOfClassSubjectView"]>(withQuery(`${root}/academics/class-subjects`, params)),
  getClassSubject: (classSubjectId: string) =>
    apiClient<Schema["ClassSubjectView"]>(`${root}/academics/class-subjects/${encodePath(classSubjectId)}`),
  createClassSubject: (input: Schema["CreateClassSubjectInput"]) =>
    apiClient<Schema["ClassSubjectView"]>(`${root}/academics/class-subjects`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  updateClassSubject: (classSubjectId: string, input: Schema["UpdateClassSubjectInput"]) =>
    apiClient<Schema["ClassSubjectView"]>(`${root}/academics/class-subjects/${encodePath(classSubjectId)}`, { method: "PUT", body: jsonBody(input) }),
  deleteClassSubject: (classSubjectId: string) =>
    apiClient<Schema["ClassSubjectView"] | undefined>(`${root}/academics/class-subjects/${encodePath(classSubjectId)}`, { method: "DELETE" }),
  generateClassSubjects: (classSectionId: string) =>
    apiClient<Schema["GenerateClassSubjectsResult"]>(`${root}/academics/classes/${encodePath(classSectionId)}/class-subjects/generate`, { method: "POST", idempotencyKey: true }),

  listSectionStaff: (classSectionId: string, includeEnded = false) =>
    apiClient<Schema["SectionStaffView"][]>(withQuery(`${root}/academics/classes/${encodePath(classSectionId)}/staff`, { includeEnded })),
  getSectionStaff: (classSectionId: string, assignmentId: string) =>
    apiClient<Schema["SectionStaffView"]>(`${root}/academics/classes/${encodePath(classSectionId)}/staff/${encodePath(assignmentId)}`),
  assignSectionStaff: (classSectionId: string, input: Schema["AssignSectionStaffInput"]) =>
    apiClient<Schema["SectionStaffView"]>(`${root}/academics/classes/${encodePath(classSectionId)}/staff`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  endSectionStaff: (classSectionId: string, assignmentId: string, params: { version: number | string; endDate?: string }) =>
    apiClient<void>(withQuery(`${root}/academics/classes/${encodePath(classSectionId)}/staff/${encodePath(assignmentId)}`, params), { method: "DELETE" }),

  listAssignments: (params: Page & {
    academicYearId?: string;
    classSectionId?: string;
    classSubjectId?: string;
    staffMemberId?: string;
    includeEnded?: boolean;
  } = {}) => apiClient<Schema["PagedResponseOfTeachingAssignmentView"]>(withQuery(`${root}/teaching/assignments`, params)),
  getAssignment: (assignmentId: string) =>
    apiClient<Schema["TeachingAssignmentView"]>(`${root}/teaching/assignments/${encodePath(assignmentId)}`),
  createAssignment: (input: Schema["CreateTeachingAssignmentInput"]) =>
    apiClient<Schema["TeachingAssignmentResult"]>(`${root}/teaching/assignments`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  updateAssignment: (assignmentId: string, input: Schema["UpdateTeachingAssignmentInput"]) =>
    apiClient<Schema["TeachingAssignmentResult"]>(`${root}/teaching/assignments/${encodePath(assignmentId)}`, { method: "PUT", body: jsonBody(input) }),
  endAssignment: (assignmentId: string, params: { version: number | string; endDate?: string }) =>
    apiClient<void>(withQuery(`${root}/teaching/assignments/${encodePath(assignmentId)}`, params), { method: "DELETE" }),

  mine: (date?: string) => apiClient<Schema["MyTeachingView"]>(withQuery(`${root}/teaching/mine`, { date })),
  sectionOverview: (classSectionId: string, date?: string) =>
    apiClient<Schema["SectionOverviewView"]>(withQuery(`${root}/academics/classes/${encodePath(classSectionId)}/overview`, { date })),
};
