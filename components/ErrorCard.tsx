"use client";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorCardProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  height?: number;
}

export default function ErrorCard({ title = "Failed to load", message = "Unable to fetch data. Check your connection.", onRetry, height = 200 }: ErrorCardProps) {
  return (
    <div
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        height, gap: 12, background: "#0C1220", borderRadius: 10, border: "1px solid #1A2437",
      }}
    >
      <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,79,91,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AlertTriangle size={16} color="#FF4F5B" />
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#E8ECF4", marginBottom: 4 }}>{title}</p>
        <p style={{ fontSize: 11, color: "#4E5E74", maxWidth: 220 }}>{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "6px 14px",
            borderRadius: 6, border: "1px solid #243044", background: "#0A0F1E",
            color: "#8B97AA", fontSize: 11, fontWeight: 600, cursor: "pointer",
          }}
        >
          <RefreshCw size={11} />
          Retry
        </button>
      )}
    </div>
  );
}
