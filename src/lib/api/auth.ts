import { apiClient, acceptTokens, clearSession } from "./client";
import { LoginRequest, MeResponse, PagedResponse, SessionResponse, TokenResponse } from "@/types/api";

export async function login(request: Omit<LoginRequest, "clientType" | "deviceName">): Promise<TokenResponse> {
  const response = await apiClient<TokenResponse>("/api/v1/auth/login", {
    method: "POST",
    auth: false,
    webClient: true,
    body: JSON.stringify({ ...request, clientType: "web" } satisfies LoginRequest),
  });
  acceptTokens(response);
  return response;
}

/** Signs out this browser. Always clears the local session, even if the API cannot be reached. */
export async function logout(): Promise<void> {
  try {
    await apiClient("/api/v1/auth/logout", { method: "POST", auth: false, webClient: true });
  } finally {
    clearSession();
  }
}

/** Signs out every session of the user, on every device. */
export async function logoutAll(): Promise<void> {
  try {
    await apiClient("/api/v1/auth/logout-all", { method: "POST", webClient: true });
  } finally {
    clearSession();
  }
}

/** Moves the session to another of the user's schools. Reload `/me` afterwards. */
export async function switchTenant(tenantId: string): Promise<TokenResponse> {
  const response = await apiClient<TokenResponse>("/api/v1/auth/switch-tenant", {
    method: "POST",
    webClient: true,
    body: JSON.stringify({ tenantId }),
  });
  acceptTokens(response);
  return response;
}

export async function getMe(): Promise<MeResponse> {
  return apiClient<MeResponse>("/api/v1/me");
}

/** Changes the password; every other device is signed out and this one gets a new session. */
export async function changePassword(currentPassword: string, newPassword: string): Promise<TokenResponse> {
  const response = await apiClient<TokenResponse>("/api/v1/me/password", {
    method: "POST",
    webClient: true,
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  acceptTokens(response);
  return response;
}

export async function listSessions(
  page = 1,
  pageSize = 20
): Promise<Pick<PagedResponse<SessionResponse>, "items" | "page" | "pageSize" | "totalCount">> {
  return apiClient(`/api/v1/me/sessions?page=${page}&pageSize=${pageSize}`);
}

/** Signs out one of the user's sessions; its access tokens stop working immediately. */
export async function revokeSession(sessionId: string): Promise<void> {
  await apiClient(`/api/v1/me/sessions/${encodeURIComponent(sessionId)}`, { method: "DELETE" });
}

/** Always answers 202, whether or not an account uses the address. */
export async function forgotPassword(email: string): Promise<void> {
  await apiClient("/api/v1/auth/password/forgot", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ email }),
  });
}

/** Uses the `uid` and `token` of a reset link; signs the user out everywhere. */
export async function resetPassword(userId: string, token: string, newPassword: string): Promise<void> {
  await apiClient("/api/v1/auth/password/reset", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ userId, token, newPassword }),
  });
}

/**
 * Uses the `tenant` and `token` of an invitation link. `password` is required only when the address has no
 * account yet: the API then answers `validation_failed` with `errors.password`.
 */
export async function acceptInvitation(
  tenantId: string,
  token: string,
  account?: { password: string; displayName?: string }
): Promise<void> {
  await apiClient("/api/v1/auth/invitations/accept", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ tenantId, token, ...account }),
  });
}
