"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, AlertCircle, Loader2, Copy, Check } from "lucide-react";

const DEMO_EMAIL = "analytics@amazon.com";
const DEMO_PASS = "Prime2026!";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button
      onClick={copy}
      style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#00C896" : "#4E5E74", padding: "2px 4px", borderRadius: 3, display: "flex", alignItems: "center", gap: 3 }}
      title="Copy"
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
    </button>
  );
}

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const expired = params.get("expired") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(expired ? "Session expired. Please sign in again." : "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json() as { error?: string; user?: { name: string; email: string; role: string; team: string } };
      if (!res.ok) {
        setError(data.error || "Sign-in failed. Check credentials and try again.");
        return;
      }
      if (data.user) localStorage.setItem("amz_user", JSON.stringify(data.user));
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function fillDemo() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASS);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#060A12", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      {/* Top stripe */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #00A8FF 0%, #0047AB 100%)" }} />

      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Logo — matches Header.tsx branding exactly */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/prime-video-logo.png" alt="Prime Video" style={{ height: 72, width: "auto" }} />
            <div style={{ width: 1, height: 64, background: "#1A2437", flexShrink: 0 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nascar-logo-white.png" alt="NASCAR" style={{ height: 56, width: "auto" }} />
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.08em", background: "rgba(255,153,0,0.1)", color: "#FF9900", border: "1px solid rgba(255,153,0,0.2)" }}>
              Demo Environment
            </span>
            <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.08em", background: "rgba(255,79,91,0.12)", color: "#FF4F5B", border: "1px solid rgba(255,79,91,0.2)" }}>
              Confidential
            </span>
          </div>
        </div>

        {/* Demo credentials box — use this to sign in */}
        <div style={{ background: "rgba(0,168,255,0.05)", border: "1px solid rgba(0,168,255,0.15)", borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#00A8FF", textTransform: "uppercase", letterSpacing: "0.07em" }}>Demo Access</p>
            <button
              onClick={fillDemo}
              style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 4, background: "rgba(0,168,255,0.12)", color: "#00A8FF", border: "1px solid rgba(0,168,255,0.25)", cursor: "pointer", letterSpacing: "0.03em" }}
            >
              Fill credentials →
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px", background: "#060A12", borderRadius: 6 }}>
              <span style={{ fontSize: 10, color: "#4E5E74", width: 60 }}>Email</span>
              <span style={{ fontSize: 12, fontFamily: "monospace", color: "#E8ECF4", flex: 1 }}>{DEMO_EMAIL}</span>
              <CopyButton value={DEMO_EMAIL} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px", background: "#060A12", borderRadius: 6 }}>
              <span style={{ fontSize: 10, color: "#4E5E74", width: 60 }}>Password</span>
              <span style={{ fontSize: 12, fontFamily: "monospace", color: "#E8ECF4", flex: 1, letterSpacing: "0.05em" }}>{DEMO_PASS}</span>
              <CopyButton value={DEMO_PASS} />
            </div>
          </div>
        </div>

        {/* Auth card */}
        <div style={{ background: "#0C1220", border: "1px solid #1A2437", borderRadius: 12, padding: "28px" }}>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 17, fontWeight: 700, color: "#E8ECF4", marginBottom: 3 }}>Sign in with Midway</h1>
            <p style={{ fontSize: 12, color: "#4E5E74" }}>Amazon federated identity — internal access only</p>
          </div>

          {error && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 6, background: "rgba(255,79,91,0.08)", border: "1px solid rgba(255,79,91,0.2)", marginBottom: 16 }}>
              <AlertCircle size={13} color="#FF4F5B" />
              <span style={{ fontSize: 12, color: "#FF4F5B" }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label htmlFor="email" style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
                Amazon Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@amazon.com"
                style={{
                  width: "100%", padding: "9px 12px", background: "#060A12",
                  border: "1px solid #243044", borderRadius: 6, color: "#E8ECF4",
                  fontSize: 13, outline: "none", boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00A8FF")}
                onBlur={(e) => (e.target.style.borderColor = "#243044")}
              />
            </div>

            <div>
              <label htmlFor="password" style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: "100%", padding: "9px 12px", background: "#060A12",
                  border: "1px solid #243044", borderRadius: 6, color: "#E8ECF4",
                  fontSize: 13, outline: "none", boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00A8FF")}
                onBlur={(e) => (e.target.style.borderColor = "#243044")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 4, padding: "10px 0", borderRadius: 6, border: "none",
                background: loading ? "#0047AB" : "#00A8FF", color: "#060A12",
                fontSize: 13, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                transition: "background 0.15s",
              }}
            >
              {loading && <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />}
              {loading ? "Authenticating…" : "Sign in with Midway →"}
            </button>
          </form>

          <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid #1A2437" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Lock size={10} color="#2E3F56" />
              <p style={{ fontSize: 10, color: "#2E3F56" }}>
                Access is logged and monitored. Authorized personnel only.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <p style={{ fontSize: 10, color: "#2E3F56", marginBottom: 4 }}>
            Amazon Prime Video · NASCAR Cup Series · Q1 2026 GTM Strategy
          </p>
          <p style={{ fontSize: 10, color: "#1A2437" }}>
            Built by Prime Video Strategy Team · 2 Strategy · 1 Design · 1 Tech
          </p>
        </div>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "#060A12", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00A8FF" }} />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
