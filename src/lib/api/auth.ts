import { apiClient, setAccessToken } from "./client";
import {
  LoginRequest,
  TokenResponse,
  MeResponse,
} from "@/types/api";

export async function login(request: Omit<LoginRequest, "clientType">): Promise<TokenResponse> {
  const payload: LoginRequest = {
    ...request,
    clientType: "web",
  };

  const response = await apiClient<TokenResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (response?.accessToken) {
    setAccessToken(response.accessToken);
  }

  return response;
}

export async function refresh(): Promise<TokenResponse> {
  const response = await apiClient<TokenResponse>("/api/v1/auth/refresh", {
    method: "POST",
  });

  if (response?.accessToken) {
    setAccessToken(response.accessToken);
  }

  return response;
}

export async function logout(): Promise<void> {
  try {
    await apiClient("/api/v1/auth/logout", {
      method: "POST",
    });
  } finally {
    setAccessToken(null);
  }
}

export async function logoutAll(): Promise<void> {
  try {
    await apiClient("/api/v1/auth/logout-all", {
      method: "POST",
    });
  } finally {
    setAccessToken(null);
  }
}

export async function switchTenant(tenantId: string): Promise<TokenResponse> {
  const response = await apiClient<TokenResponse>("/api/v1/auth/switch-tenant", {
    method: "POST",
    body: JSON.stringify({ tenantId }),
  });

  if (response?.accessToken) {
    setAccessToken(response.accessToken);
  }

  return response;
}

export async function forgotPassword(email: string): Promise<void> {
  await apiClient("/api/v1/auth/password/forgot", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(
  userId: string,
  token: string,
  newPassword: string
): Promise<void> {
  await apiClient("/api/v1/auth/password/reset", {
    method: "POST",
    body: JSON.stringify({ userId, token, newPassword }),
  });
}

export async function acceptInvitation(
  tenantId: string,
  token: string,
  password?: string,
  displayName?: string
): Promise<void> {
  await apiClient("/api/v1/auth/invitations/accept", {
    method: "POST",
    body: JSON.stringify({ tenantId, token, password, displayName }),
  });
}

export async function getMe(): Promise<MeResponse> {
  return apiClient<MeResponse>("/api/v1/me");
}
