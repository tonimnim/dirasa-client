import { ProblemDetails } from "@/types/api";

export class DirasaApiError extends Error {
  public status: number;
  public code: string;
  public problem: ProblemDetails;

  constructor(status: number, problem: ProblemDetails) {
    super(problem.detail || problem.title || `API Error: ${status}`);
    this.name = "DirasaApiError";
    this.status = status;
    this.code = problem.code || "unknown_error";
    this.problem = problem;
  }
}

// Memory-only access token storage to prevent XSS exfiltration
let inMemoryAccessToken: string | null = null;
let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

export function setAccessToken(token: string | null) {
  inMemoryAccessToken = token;
}

export function getAccessToken(): string | null {
  return inMemoryAccessToken;
}

function subscribeTokenRefresh(cb: (token: string | null) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string | null) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

/**
 * Base fetch client configured for Dirasa backend API.
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const headers = new Headers(options.headers || {});

  // Web Client Guard & Correlation
  headers.set("X-Dirasa-Client", "web");
  if (!headers.has("X-Correlation-Id")) {
    headers.set("X-Correlation-Id", crypto.randomUUID());
  }

  // Content type defaults
  if (!headers.has("Content-Type") && options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Bearer Token
  if (inMemoryAccessToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${inMemoryAccessToken}`);
  }

  // Include credentials for the HttpOnly refresh token cookie
  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: "include",
  };

  const response = await fetch(url, fetchOptions);

  // Success 204 No Content
  if (response.status === 204) {
    return null as T;
  }

  // 401 Unauthorized handling with refresh rotation
  if (response.status === 401 && !endpoint.includes("/auth/login") && !endpoint.includes("/auth/refresh")) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshResponse = await fetch(`${baseUrl}/api/v1/auth/refresh`, {
          method: "POST",
          headers: {
            "X-Dirasa-Client": "web",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          setAccessToken(data.accessToken);
          onRefreshed(data.accessToken);
          isRefreshing = false;

          // Retry the original request
          headers.set("Authorization", `Bearer ${data.accessToken}`);
          const retryRes = await fetch(url, { ...fetchOptions, headers });
          if (retryRes.status === 204) return null as T;
          return await retryRes.json();
        } else {
          setAccessToken(null);
          onRefreshed(null);
          isRefreshing = false;
        }
      } catch {
        setAccessToken(null);
        onRefreshed(null);
        isRefreshing = false;
      }
    } else {
      // Queue concurrent requests while token is refreshing
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh(async (token) => {
          if (!token) {
            reject(new DirasaApiError(401, { code: "session_expired", title: "Session Expired" }));
            return;
          }
          headers.set("Authorization", `Bearer ${token}`);
          try {
            const retryRes = await fetch(url, { ...fetchOptions, headers });
            if (retryRes.status === 204) return resolve(null as T);
            resolve(await retryRes.json());
          } catch (err) {
            reject(err);
          }
        });
      });
    }
  }

  if (!response.ok) {
    let problem: ProblemDetails;
    try {
      problem = await response.json();
    } catch {
      problem = {
        status: response.status,
        title: response.statusText,
        detail: await response.text().catch(() => undefined),
        code: "http_error",
      };
    }
    throw new DirasaApiError(response.status, problem);
  }

  return response.json();
}
