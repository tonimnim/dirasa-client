import { ProblemDetails, TokenResponse } from "@/types/api";

/**
 * Base URL of the Dirasa API. Empty by default: requests go to this app's own origin and `src/proxy.ts`
 * forwards `/api/*` to the API, which keeps the `SameSite=Strict` refresh cookie working in development.
 */
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/+$/, "");

/** Refresh this long before the access token expires (backend guidance: about 60 seconds). */
const REFRESH_AHEAD_MS = 60_000;
/** An access token closer than this to expiry is refreshed before a request rather than sent. */
const MIN_TOKEN_VALIDITY_MS = 30_000;

export class DirasaApiError extends Error {
  public status: number;
  public code: string;
  public problem: ProblemDetails;
  /** Seconds from the `Retry-After` header of a 429, if any. */
  public retryAfterSeconds: number | null;

  constructor(status: number, problem: ProblemDetails, retryAfterSeconds: number | null = null) {
    super(problem.detail || problem.title || `API Error: ${status}`);
    this.name = "DirasaApiError";
    this.status = status;
    this.code = problem.code || "unknown_error";
    this.problem = problem;
    this.retryAfterSeconds = retryAfterSeconds;
  }

  /** `validation_failed` messages keyed by camelCase field name. */
  get fieldErrors(): Record<string, string[]> {
    return this.problem.errors ?? {};
  }
}

// --- Session state ---------------------------------------------------------------------------------------
// The access token lives only in memory (never localStorage); the refresh token is an HttpOnly cookie that
// this code never sees. Tabs share tokens over a BroadcastChannel and take turns refreshing under a Web Lock.

export type SessionEvent =
  | { type: "token"; tenantId: string | null; fromOtherTab: boolean }
  | { type: "signed-out" }
  /** The active school changed or was revoked server-side: reload `/me`. */
  | { type: "profile-stale" };

type BroadcastMessage =
  | { type: "token"; accessToken: string; expiresAt: number; tenantId: string | null }
  | { type: "signed-out" };

let accessToken: string | null = null;
let expiresAtMs = 0;
let refreshTimer: ReturnType<typeof setTimeout> | null = null;
let inFlightRefresh: Promise<string | null> | null = null;
let channel: BroadcastChannel | null = null;
const listeners = new Set<(event: SessionEvent) => void>();

export function onSessionEvent(listener: (event: SessionEvent) => void): () => void {
  ensureChannel();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function emit(event: SessionEvent) {
  listeners.forEach((listener) => listener(event));
}

function ensureChannel() {
  if (channel || typeof BroadcastChannel === "undefined") return;
  channel = new BroadcastChannel("dirasa-auth");
  channel.onmessage = (event: MessageEvent<BroadcastMessage>) => {
    const message = event.data;
    if (message.type === "token") {
      setToken(message.accessToken, message.expiresAt);
      emit({ type: "token", tenantId: message.tenantId, fromOtherTab: true });
    } else if (message.type === "signed-out") {
      setToken(null, 0);
      emit({ type: "signed-out" });
    }
  };
}

function setToken(token: string | null, expiresAt: number) {
  accessToken = token;
  expiresAtMs = expiresAt;
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = null;
  if (token && typeof window !== "undefined") {
    const delay = Math.max(expiresAt - Date.now() - REFRESH_AHEAD_MS, 10_000);
    refreshTimer = setTimeout(() => {
      // Errors surface on the next request, which refreshes again before sending.
      refreshAccessToken(token).catch(() => undefined);
    }, delay);
  }
}

/** Stores the tokens of a login, refresh, switch-tenant or change-password response and tells the other tabs. */
export function acceptTokens(response: TokenResponse) {
  ensureChannel();
  const expiresAt = Date.parse(response.expiresAt);
  const tenantId = response.tenant?.id ?? null;
  setToken(response.accessToken, expiresAt);
  channel?.postMessage({ type: "token", accessToken: response.accessToken, expiresAt, tenantId } satisfies BroadcastMessage);
  emit({ type: "token", tenantId, fromOtherTab: false });
}

/** Forgets the session in this tab and every other tab. */
export function clearSession() {
  ensureChannel();
  setToken(null, 0);
  channel?.postMessage({ type: "signed-out" } satisfies BroadcastMessage);
  emit({ type: "signed-out" });
}

/**
 * Exchanges the refresh cookie for a new access token, once across all tabs.
 *
 * `staleToken` is the token the caller considers unusable (null on page load). If another tab already replaced
 * it while this one waited for the lock, the new token is returned without another rotation.
 * Resolves to null when there is no session (401 `session_expired`); throws for throttling or outages.
 */
export function refreshAccessToken(staleToken: string | null = accessToken): Promise<string | null> {
  if (!inFlightRefresh) {
    inFlightRefresh = withRefreshLock(async () => {
      if (accessToken && accessToken !== staleToken) return accessToken;
      return refreshWithCookie(true);
    }).finally(() => {
      inFlightRefresh = null;
    });
  }
  return inFlightRefresh;
}

async function withRefreshLock<T>(callback: () => Promise<T>): Promise<T> {
  if (typeof navigator !== "undefined" && navigator.locks) {
    // The lock is held until the callback's promise settles.
    return await navigator.locks.request("dirasa-refresh", callback);
  }
  return callback();
}

async function refreshWithCookie(retryAfterRevokedSchool: boolean): Promise<string | null> {
  const response = await send("/api/v1/auth/refresh", { method: "POST" }, { token: null, webClient: true });
  if (response.ok) {
    acceptTokens((await response.json()) as TokenResponse);
    return accessToken;
  }

  const problem = await readProblem(response);
  if (response.status === 401 && problem.code === "tenant_access_revoked" && retryAfterRevokedSchool) {
    // The school was dropped from the session; the next refresh succeeds without it.
    emit({ type: "profile-stale" });
    return refreshWithCookie(false);
  }
  if (response.status === 401) {
    // Only announce a sign-out if this tab had a session: a failed restore on a signed-out page must not
    // sign out a tab that has just signed in.
    if (accessToken) clearSession();
    return null;
  }
  throw new DirasaApiError(response.status, problem, retryAfter(response));
}

async function getValidAccessToken(): Promise<string | null> {
  if (accessToken && expiresAtMs - Date.now() > MIN_TOKEN_VALIDITY_MS) return accessToken;
  return refreshAccessToken(accessToken);
}

// --- Requests ----------------------------------------------------------------------------------------------

export interface ApiRequestOptions extends RequestInit {
  /** Send the bearer token, refreshing it when needed (default true). */
  auth?: boolean;
  /**
   * Token endpoints (login, refresh, logout, logout-all, switch-tenant, change password): send
   * `X-Dirasa-Client: web` and include credentials so the browser stores and sends the refresh cookie.
   */
  webClient?: boolean;
}

/**
 * Calls the Dirasa API. Throws `DirasaApiError` for every failure, with `code` taken from the
 * ProblemDetails body (`network_error` when the API cannot be reached).
 */
export async function apiClient<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  const { auth = true, webClient = false, ...init } = options;

  let token = auth ? await getValidAccessToken() : null;
  if (auth && !token) {
    throw new DirasaApiError(401, { status: 401, code: "session_expired", title: "Your session has ended." });
  }

  let response = await send(endpoint, init, { token, webClient });

  if (auth && response.status === 401) {
    const problem = await readProblem(response.clone());
    if (problem.code === "unauthenticated" || problem.code === "tenant_access_revoked") {
      // Refresh once and retry once.
      token = await refreshAccessToken(token);
      if (!token) {
        throw new DirasaApiError(401, { status: 401, code: "session_expired", title: "Your session has ended." });
      }
      response = await send(endpoint, init, { token, webClient });
    }
  }

  if (!response.ok) {
    const problem = await readProblem(response);
    if (problem.code === "tenant_required" || problem.code === "tenant_access_revoked") {
      emit({ type: "profile-stale" });
    }
    throw new DirasaApiError(response.status, problem, retryAfter(response));
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

async function send(
  endpoint: string,
  init: RequestInit,
  { token, webClient }: { token: string | null; webClient: boolean }
): Promise<Response> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  const headers = new Headers(init.headers);

  if (!headers.has("X-Correlation-Id")) headers.set("X-Correlation-Id", crypto.randomUUID());
  if (!headers.has("Accept-Language") && typeof document !== "undefined" && document.documentElement.lang) {
    // Error titles and emails come back in this language (en, ar, fr, sw).
    headers.set("Accept-Language", document.documentElement.lang);
  }
  if (!headers.has("Content-Type") && init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (webClient) headers.set("X-Dirasa-Client", "web");

  try {
    return await fetch(url, { ...init, headers, credentials: webClient ? "include" : init.credentials });
  } catch {
    throw new DirasaApiError(0, { code: "network_error", title: "The Dirasa server could not be reached." });
  }
}

async function readProblem(response: Response): Promise<ProblemDetails> {
  const contentType = response.headers.get("Content-Type") ?? "";
  if (contentType.includes("json")) {
    try {
      const problem = (await response.json()) as ProblemDetails;
      return { ...problem, code: problem.code || "http_error" };
    } catch {
      // Fall through to the generic problem below.
    }
  }
  // A non-JSON 5xx comes from the dev proxy when the API is down, not from the API itself.
  const unreachable = response.status >= 500;
  return {
    status: response.status,
    title: unreachable ? "The Dirasa server could not be reached." : response.statusText,
    code: unreachable ? "network_error" : "http_error",
  };
}

function retryAfter(response: Response): number | null {
  const value = response.headers.get("Retry-After");
  if (!value) return null;
  const seconds = Number(value);
  if (Number.isFinite(seconds)) return seconds;
  const date = Date.parse(value);
  return Number.isNaN(date) ? null : Math.max(0, Math.ceil((date - Date.now()) / 1000));
}
