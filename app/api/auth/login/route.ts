export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, encodeSession, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json() as { email?: string; password?: string };
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const user = validateCredentials(email, password);
  if (!user) {
    // Deliberate delay to prevent brute force
    await new Promise((r) => setTimeout(r, 800));
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = encodeSession(user);
  const response = NextResponse.json({ ok: true, user: { email: user.email, name: user.name, role: user.role, team: user.team } });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  return response;
}
