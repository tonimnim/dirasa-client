import { DirasaApiError } from "@/lib/api/client";

function formatWait(seconds: number): string {
  if (seconds < 60) return `${seconds} second${seconds === 1 ? "" : "s"}`;
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} minute${minutes === 1 ? "" : "s"}`;
}

/** A user-facing message for a failed auth request. Branches on the API's `code`, never on its title. */
export function describeAuthError(error: unknown): string {
  if (!(error instanceof DirasaApiError)) return "Something went wrong. Please try again.";

  switch (error.code) {
    case "invalid_credentials":
      return "The email, user name or password is incorrect.";
    case "throttled":
      return error.retryAfterSeconds
        ? `Too many attempts. Try again in ${formatWait(error.retryAfterSeconds)}.`
        : "Too many attempts. Please wait a moment and try again.";
    case "network_error":
      return "The Dirasa server could not be reached. Check your connection and try again.";
    case "service_unavailable":
      return "Sign-in is temporarily unavailable. Please try again shortly.";
    case "invalid_or_expired_link":
      return "This link is invalid, has expired or has already been used. Please request a new one.";
    case "session_expired":
      return "Your session has ended. Please sign in again.";
    case "internal_error": {
      const reference = error.problem.correlationId;
      return `Something went wrong on our side. Please try again${reference ? ` (reference ${reference})` : ""}.`;
    }
    default:
      // Titles are localized by the API from Accept-Language.
      return error.problem.title || error.message;
  }
}
