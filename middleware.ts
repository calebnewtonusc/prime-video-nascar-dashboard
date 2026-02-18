import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, decodeSession } from "@/lib/auth";

// Paths that don't require auth
const PUBLIC_PATHS = ["/login", "/api/auth/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths and Next.js internals
  if (
    PUBLIC_PATHS.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Check session cookie
  const sessionToken = request.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const session = decodeSession(sessionToken);
  if (!session) {
    // Invalid or expired token — clear cookie and redirect
    const response = NextResponse.redirect(new URL("/login?expired=1", request.url));
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  // Pass user info to headers for server components
  const response = NextResponse.next();
  response.headers.set("x-user-email", session.email);
  response.headers.set("x-user-name", session.name);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
