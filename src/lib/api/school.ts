import { apiClient } from "./client";
import { encodePath, jsonBody, withQuery } from "./query";
import type { components } from "@/types/generated/school";

type Schema = components["schemas"];

export type SchoolProfile = Schema["SchoolResponse"];
export type Member = Schema["MemberResponse"];
export type Invitation = Schema["InvitationResponse"];
export type PagedMembers = Schema["PagedResponseOfMemberResponse"];
export type PagedInvitations = Schema["PagedResponseOfInvitationResponse"];

export const schoolApi = {
  get: () => apiClient<SchoolProfile>("/api/v1/school"),

  listMembers: (page = 1, pageSize = 50) =>
    apiClient<PagedMembers>(withQuery("/api/v1/school/members", { page, pageSize })),
  changeMemberRoles: (membershipId: string, input: Schema["ChangeMemberRolesRequest"]) =>
    apiClient<Member>(`/api/v1/school/members/${encodePath(membershipId)}/roles`, {
      method: "PUT",
      body: jsonBody(input),
    }),
  suspendMember: (membershipId: string, version: number | string) =>
    apiClient<void>(`/api/v1/school/members/${encodePath(membershipId)}/suspend`, {
      method: "POST",
      body: jsonBody({ version }),
    }),
  reactivateMember: (membershipId: string, version: number | string) =>
    apiClient<void>(`/api/v1/school/members/${encodePath(membershipId)}/reactivate`, {
      method: "POST",
      body: jsonBody({ version }),
    }),
  removeMember: (membershipId: string, version: number | string) =>
    apiClient<void>(withQuery(`/api/v1/school/members/${encodePath(membershipId)}`, { version }), {
      method: "DELETE",
    }),

  listInvitations: (page = 1, pageSize = 50) =>
    apiClient<PagedInvitations>(withQuery("/api/v1/school/invitations", { page, pageSize })),
  invite: (input: Schema["CreateInvitationRequest"]) =>
    apiClient<Schema["InvitationSentResponse"]>("/api/v1/school/invitations", {
      method: "POST",
      body: jsonBody(input),
      idempotencyKey: true,
    }),
  revokeInvitation: (invitationId: string) =>
    apiClient<void>(`/api/v1/school/invitations/${encodePath(invitationId)}`, { method: "DELETE" }),
};
