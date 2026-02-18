"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const expired = params.get("expired") === "1";

  const [email, setEmail] = useState("caleb.newton@amazon.com");
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
        setError(data.error || "Sign-in failed");
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

  return (
    <div style={{ minHeight: "100vh", background: "#060A12", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      {/* Top stripe */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #00A8FF 0%, #0047AB 100%)" }} />

      <div style={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", color: "#00A8FF", textTransform: "uppercase" }}>prime</span>
            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", color: "#E8ECF4" }}>video</span>
          </div>
          <p style={{ fontSize: 12, color: "#4E5E74", letterSpacing: "0.04em" }}>INTERNAL ANALYTICS PLATFORM</p>
        </div>

        {/* Card */}
        <div style={{ background: "#0C1220", border: "1px solid #1A2437", borderRadius: 12, padding: "32px 28px" }}>
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: "#E8ECF4", marginBottom: 4 }}>Sign in with Midway</h1>
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
              <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>
                Amazon Email
              </label>
              <input
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                  Password
                </label>
                <span style={{ fontSize: 11, color: "#4E5E74" }}>Demo: Prime2026!</span>
              </div>
              <input
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
              {loading ? "Authenticating…" : "Sign in with Midway"}
            </button>
          </form>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #1A2437" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Lock size={10} color="#2E3F56" />
              <p style={{ fontSize: 10, color: "#2E3F56" }}>
                Access is logged and monitored. Authorized personnel only.
              </p>
            </div>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 10, color: "#2E3F56", marginTop: 20 }}>
          Amazon Prime Video · NASCAR Cup Series Analytics · CONFIDENTIAL
        </p>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
