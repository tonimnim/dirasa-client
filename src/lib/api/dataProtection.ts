import { apiClient } from "./client";
import { encodePath, jsonBody, withQuery } from "./query";
import type { LocalizedText, PagedResponse } from "@/types/api";

// These backend endpoints are newer than the checked-in school OpenAPI document. Keep the
// explicit types here only until that document is regenerated (see docs/BACKEND_REQUIREMENTS.md).
export type ConsentDecision = "granted" | "refused" | "withdrawn";
export type ConsentChannel = "portal" | "paper" | "telephone" | "inPerson" | "imported";
export type SubjectKind = "student" | "guardian" | "staff" | "member";

export interface ConsentKind {
  id: string;
  code: string;
  name: LocalizedText;
  statement: LocalizedText;
  revision: number;
  allowStudentDecision: boolean;
  isActive: boolean;
  templateMarket: string | null;
  templateVersion: number | null;
  version: number | string;
}

export interface ConsentRecord {
  id: string;
  studentId: string;
  consentKindId: string;
  sequence: number | string;
  decision: ConsentDecision;
  givenByGuardianId: string | null;
  recordedByUserId: string;
  occurredAt: string;
  recordedAt: string;
  channel: ConsentChannel;
  expiresAt: string | null;
  evidenceReference: string | null;
  kindRevision: number;
  kindName: LocalizedText;
  statement: LocalizedText;
  isEffective: boolean;
  streamVersion: number | string;
}

export interface SubjectAccessExport {
  schemaVersion: number;
  exportId: string;
  generatedAt: string;
  tenantId: string;
  kind: SubjectKind;
  subjectId: string;
  sections: Record<string, { schemaVersion: number; data: unknown }>;
}

const root = "/api/v1/school/data-protection";

export const dataProtectionApi = {
  listConsentKinds: (page = 1, pageSize = 100) => apiClient<PagedResponse<ConsentKind>>(withQuery(`${root}/consent-kinds`, { page, pageSize })),
  getConsentKind: (kindId: string) => apiClient<ConsentKind>(`${root}/consent-kinds/${encodePath(kindId)}`),
  createConsentKind: (input: { code: string; name: LocalizedText; statement: LocalizedText; allowStudentDecision: boolean }) =>
    apiClient<ConsentKind>(`${root}/consent-kinds`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  updateConsentKind: (kindId: string, input: { name: LocalizedText; statement: LocalizedText; allowStudentDecision: boolean; isActive: boolean; version: number | string }) =>
    apiClient<ConsentKind>(`${root}/consent-kinds/${encodePath(kindId)}`, { method: "PUT", body: jsonBody(input) }),
  seedConsentKinds: () => apiClient<ConsentKind[]>(`${root}/consent-kinds/seed`, { method: "POST", idempotencyKey: true }),
  currentStudentConsents: (studentId: string) => apiClient<ConsentRecord[]>(`${root}/students/${encodePath(studentId)}/consents`),
  studentConsentHistory: (studentId: string, params: { consentKindId?: string; page?: number; pageSize?: number } = {}) =>
    apiClient<PagedResponse<ConsentRecord>>(withQuery(`${root}/students/${encodePath(studentId)}/consents/history`, params)),
  recordStudentConsent: (studentId: string, input: { consentKindId: string; kindRevision: number; decision: ConsentDecision; givenByGuardianId: string | null; channel: ConsentChannel; occurredAt: string | null; expiresAt: string | null; evidenceReference: string | null; streamVersion: number | string }) =>
    apiClient<ConsentRecord>(`${root}/students/${encodePath(studentId)}/consents`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  exportSubject: (kind: SubjectKind, subjectId: string) =>
    apiClient<SubjectAccessExport>(`${root}/subjects/${kind}/${encodePath(subjectId)}/export`, { method: "POST", idempotencyKey: true }),
};
