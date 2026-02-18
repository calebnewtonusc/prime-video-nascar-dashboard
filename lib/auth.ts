// ─────────────────────────────────────────────────────────────────────────────
// Auth utilities — simulates Amazon Midway SSO
// In production this would validate against internal LDAP / Midway tokens.
// For demo: hardcoded credential with a signed session cookie.
// ─────────────────────────────────────────────────────────────────────────────

export const SESSION_COOKIE = "amz_nascar_session";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours (Amazon standard session)

export interface SessionUser {
  email: string;
  name: string;
  team: string;
  role: string;
  loginAt: number;
}

// Hardcoded demo credential — replace with Midway SSO in prod
export const DEMO_CREDENTIALS = [
  { email: "analytics@amazon.com", password: "Prime2026!", name: "Analytics Team", team: "Prime Video Strategy", role: "Analyst" },
  { email: "caleb.newton@amazon.com", password: "Prime2026!", name: "Caleb Newton", team: "Prime Video Content", role: "PM" },
];

export function encodeSession(user: SessionUser): string {
  return Buffer.from(JSON.stringify(user)).toString("base64url");
}

export function decodeSession(token: string): SessionUser | null {
  try {
    const data = JSON.parse(Buffer.from(token, "base64url").toString("utf8")) as SessionUser;
    // Validate structure
    if (!data.email || !data.loginAt) return null;
    // Check expiry
    const ageMs = Date.now() - data.loginAt;
    if (ageMs > SESSION_MAX_AGE * 1000) return null;
    return data;
  } catch {
    return null;
  }
}

export function validateCredentials(email: string, password: string): SessionUser | null {
  const match = DEMO_CREDENTIALS.find(
    (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password
  );
  if (!match) return null;
  return {
    email: match.email,
    name: match.name,
    team: match.team,
    role: match.role,
    loginAt: Date.now(),
  };
}
