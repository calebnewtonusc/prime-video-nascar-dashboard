export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, decodeSession, encodeSession, SESSION_MAX_AGE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return NextResponse.json({ error: "No session" }, { status: 401 });

  const session = decodeSession(token);
  if (!session) return NextResponse.json({ error: "Invalid session" }, { status: 401 });

  // Refresh loginAt to now
  const newSession = { ...session, loginAt: Date.now() };
  const newToken = encodeSession(newSession);

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: newToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  return response;
}
