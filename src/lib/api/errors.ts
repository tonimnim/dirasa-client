import { DirasaApiError } from "./client";

export function describeApiError(error: unknown): string {
  if (!(error instanceof DirasaApiError)) return "Something went wrong. Please try again.";
  if (error.code === "network_error") return "The Dirasa server could not be reached.";
  if (error.code === "concurrency_conflict") return "Someone changed this record. Reload it and try again.";
  if (error.code === "operation_in_progress") return "Another school setup operation is already running.";
  if (error.code === "forbidden") return "You do not have permission to perform this action.";
  if (error.code === "throttled") {
    return error.retryAfterSeconds
      ? `Too many requests. Try again in ${error.retryAfterSeconds} seconds.`
      : "Too many requests. Wait a moment and try again.";
  }
  return error.problem.detail || error.problem.title || error.message;
}
