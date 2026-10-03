import { apiClient } from "./client";
import { encodePath, jsonBody, withQuery } from "./query";
import type { components } from "@/types/generated/school";

type Schema = components["schemas"];
type Page = { page?: number; pageSize?: number };
const root = "/api/v1/school";

export type Enrolment = Schema["EnrolmentView"];

export const enrolmentApi = {
  list: (params: Page & {
    academicYearId?: string;
    gradeLevelId?: string;
    classSectionId?: string;
    studentId?: string;
    status?: Schema["EnrolmentStatus"];
  } = {}) => apiClient<Schema["PagedResponseOfEnrolmentView"]>(withQuery(`${root}/enrolments`, params)),
  get: (enrolmentId: string) => apiClient<Enrolment>(`${root}/enrolments/${encodePath(enrolmentId)}`),
  create: (input: Schema["EnrolStudentInput"]) =>
    apiClient<Enrolment>(`${root}/enrolments`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  bulkCreate: (input: Schema["BulkEnrolInput"]) =>
    apiClient<Schema["BulkEnrolResult"]>(`${root}/enrolments/bulk`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  move: (enrolmentId: string, input: Schema["MoveEnrolmentInput"]) =>
    apiClient<Enrolment>(`${root}/enrolments/${encodePath(enrolmentId)}/move`, { method: "POST", body: jsonBody(input) }),
  changeGrade: (enrolmentId: string, input: Schema["ChangeGradeInput"]) =>
    apiClient<Enrolment>(`${root}/enrolments/${encodePath(enrolmentId)}/change-grade`, { method: "POST", body: jsonBody(input) }),
  complete: (enrolmentId: string, input: Schema["CompleteEnrolmentInput"]) =>
    apiClient<Enrolment>(`${root}/enrolments/${encodePath(enrolmentId)}/complete`, { method: "POST", body: jsonBody(input) }),
  withdraw: (enrolmentId: string, input: Schema["WithdrawEnrolmentInput"]) =>
    apiClient<Enrolment>(`${root}/enrolments/${encodePath(enrolmentId)}/withdraw`, { method: "POST", body: jsonBody(input) }),
  setSubjectChoices: (enrolmentId: string, input: Schema["SetSubjectChoicesInput"]) =>
    apiClient<Schema["SubjectChoicesResult"]>(`${root}/enrolments/${encodePath(enrolmentId)}/subject-choices`, { method: "PUT", body: jsonBody(input) }),
  forStudent: (studentId: string) =>
    apiClient<Schema["StudentSchoolingView"][]>(`${root}/students/${encodePath(studentId)}/enrolments`),
  promote: (yearId: string, input: Schema["PromotionInput"]) =>
    apiClient<Schema["PromotionResult"]>(`${root}/academics/years/${encodePath(yearId)}/promotion`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  sectionRoster: (classSectionId: string, params: Page & { date?: string } = {}) =>
    apiClient<Schema["PagedResponseOfRosterEntryView"]>(withQuery(`${root}/academics/classes/${encodePath(classSectionId)}/roster`, params)),
  classSubjectRoster: (classSubjectId: string, params: Page & { date?: string } = {}) =>
    apiClient<Schema["PagedResponseOfRosterEntryView"]>(withQuery(`${root}/academics/class-subjects/${encodePath(classSubjectId)}/roster`, params)),
};
