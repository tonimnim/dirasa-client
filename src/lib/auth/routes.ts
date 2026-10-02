import { INFO_PAGES } from "@/config/site";

/** Where signed-in users land by default. */
export const DASHBOARD_PATH = "/dashboard";

/** Pages that work without a session (the landing page at `/` only as an exact match). Everything else requires sign-in. */
const PUBLIC_PATHS = [
  "/login",
  "/forgot-password",
  "/reset-password",
  "/accept-invitation",
  "/apply",
  ...INFO_PAGES.map((page) => `/${page.slug}`),
];

export function isPublicPath(pathname: string): boolean {
  return pathname === "/" || PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function loginPathFor(pathname: string, search: string): string {
  const next = pathname + search;
  return next === DASHBOARD_PATH ? "/login" : `/login?next=${encodeURIComponent(next)}`;
}

/**
 * Where to go after sign-in: the `next` query parameter if it is a protected path inside this app, else the
 * dashboard. Never trust it as a URL: `//evil.example` or `javascript:` must not reach `router.replace`.
 */
export function nextPathFromLocation(): string {
  const next = new URLSearchParams(window.location.search).get("next");
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return DASHBOARD_PATH;
  const pathname = next.split(/[?#]/, 1)[0];
  return isPublicPath(pathname) ? DASHBOARD_PATH : next;
}
