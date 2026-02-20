"use client";
import { useEffect, useState, useRef } from "react";
import { Clock, RefreshCw } from "lucide-react";

const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;     // 8 hours
const WARN_BEFORE_MS      = 15 * 60 * 1000;          // warn 15 min before

export default function SessionWarning() {
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [extending, setExtending] = useState(false);
  const loginTime = useRef<number>(Date.now()); // In prod: read from session cookie

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - loginTime.current;
      const remaining = SESSION_DURATION_MS - elapsed;

      if (remaining <= 0) {
        // Session expired — redirect to login
        window.location.href = "/login?expired=1";
        return;
      }

      if (remaining <= WARN_BEFORE_MS) {
        setShowWarning(true);
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        setCountdown(`${mins}:${String(secs).padStart(2, "0")}`);
      } else {
        setShowWarning(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function extendSession() {
    setExtending(true);
    try {
      const res = await fetch("/api/auth/extend", { method: "POST" });
      if (res.ok) {
        loginTime.current = Date.now(); // Reset timer
        setShowWarning(false);
      }
    } catch { /* ignore */ }
    finally { setExtending(false); }
  }

  if (!showWarning) return null;

  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 3000, backdropFilter: "blur(3px)" }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        zIndex: 3001, width: 380, background: "#0C1220", border: "1px solid #243044",
        borderRadius: 12, padding: "28px 24px", boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(154,112,48,0.1)", border: "1px solid rgba(154,112,48,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Clock size={20} color="#9A7030" />
          </div>

          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#E8ECF4", marginBottom: 6 }}>Session Expiring Soon</h2>
            <p style={{ fontSize: 12, color: "#8B97AA", lineHeight: 1.6 }}>
              Your Midway session expires in{" "}
              <strong style={{ color: "#9A7030", fontVariantNumeric: "tabular-nums" }}>{countdown}</strong>.
              Unsaved work may be lost.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, width: "100%" }}>
            <button
              onClick={() => window.location.href = "/login?expired=1"}
              style={{ flex: 1, padding: "9px 0", borderRadius: 6, border: "1px solid #243044", background: "transparent", color: "#8B97AA", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              Sign out
            </button>
            <button
              onClick={extendSession}
              disabled={extending}
              style={{ flex: 2, padding: "9px 0", borderRadius: 6, border: "none", background: "#9A7030", color: "#060A12", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              {extending ? <RefreshCw size={12} style={{ animation: "spin 1s linear infinite" }} /> : null}
              Extend Session
            </button>
          </div>
        </div>
        <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    </>
  );
}
