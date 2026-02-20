"use client";
import { useState } from "react";
import { Info, X } from "lucide-react";

export default function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div style={{
      background: "rgba(0,168,224,0.04)",
      borderBottom: "1px solid rgba(0,168,224,0.1)",
      padding: "7px 24px",
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00A8E0", flexShrink: 0, animation: "pulse 2s ease-in-out infinite" }} />
      <Info size={11} style={{ color: "#00A8E0", flexShrink: 0 }} />
      <p style={{ fontSize: 11, color: "#8B97AA", flex: 1 }}>
        <strong style={{ color: "#00A8E0", fontWeight: 700 }}>Prototype Environment</strong>
        {" · "}Data is illustrative (Q1 2026 projections based on industry benchmarks).
        {" "}Production integration:{" "}
        <span style={{ color: "#4E5E74" }}>Amazon Redshift · Kinesis Data Streams · Bedrock</span>
      </p>
      <button
        onClick={() => setDismissed(true)}
        style={{ background: "none", border: "none", cursor: "pointer", color: "#4E5E74", padding: 4, borderRadius: 4, display: "flex", alignItems: "center", flexShrink: 0 }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8B97AA")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#4E5E74")}
        title="Dismiss"
      >
        <X size={12} />
      </button>
    </div>
  );
}
