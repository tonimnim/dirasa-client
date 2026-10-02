import { NextResponse, type NextRequest } from "next/server";

/**
 * Same-origin proxy for the Dirasa API.
 *
 * The web refresh token is an HttpOnly `SameSite=Strict` cookie, so the browser must see the API on the same
 * site as the app. Forwarding `/api/*` from the Next.js server keeps every browser request same-origin, whether
 * the API runs on localhost or behind an ngrok tunnel. The browser's `Origin` and `Sec-Fetch-Site` headers are
 * forwarded unchanged, so the API's web client guard still sees this app's origin.
 *
 * Set `DIRASA_API_URL` (server-side only) to the API's base URL. Leave it unset when the app calls the API
 * directly through `NEXT_PUBLIC_API_URL`.
 */
export function proxy(request: NextRequest) {
  const target = process.env.DIRASA_API_URL;
  if (!target) {
    return NextResponse.next();
  }

  const destination = new URL(request.nextUrl.pathname + request.nextUrl.search, target);
  const headers = new Headers(request.headers);
  // ngrok's free tier answers browser GETs with an HTML warning page unless this header is present.
  if (/\.ngrok(-free)?\.(app|dev|io)$/.test(destination.hostname)) {
    headers.set("ngrok-skip-browser-warning", "1");
  }

  return NextResponse.rewrite(destination, { request: { headers } });
}

export const config = {
  matcher: "/api/:path*",
};
