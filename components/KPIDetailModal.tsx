"use client";
import { X, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from "recharts";

interface KPIDetailModalProps {
  metric: string;
  value: string;
  delta: number;
  invertDelta?: boolean;
  onClose: () => void;
}

// Simulated weekly trend data per metric
function getTrend(metric: string) {
  const base: Record<string, { label: string; v: number; prev: number }[]> = {
    "Q1 VIEWERS": [
      { label: "W1 Feb", v: 1.1, prev: 0.9 },
      { label: "W2 Feb", v: 8.2, prev: 6.7 },
      { label: "W3 Feb", v: 1.9, prev: 1.5 },
      { label: "W4 Feb", v: 2.1, prev: 1.8 },
      { label: "W1 Mar", v: 1.8, prev: 1.5 },
      { label: "W2 Mar", v: 2.4, prev: 2.1 },
    ],
    "NEW SUBSCRIBERS": [
      { label: "W1 Feb", v: 28,  prev: 21 },
      { label: "W2 Feb", v: 342, prev: 266 },
      { label: "W3 Feb", v: 41,  prev: 32 },
      { label: "W4 Feb", v: 74,  prev: 58 },
      { label: "W1 Mar", v: 61,  prev: 48 },
      { label: "W2 Mar", v: 88,  prev: 69 },
    ],
    "TOTAL REVENUE": [
      { label: "W1 Feb", v: 1.1, prev: 0.8 },
      { label: "W2 Feb", v: 4.6, prev: 3.4 },
      { label: "W3 Feb", v: 1.2, prev: 1.0 },
      { label: "W4 Feb", v: 1.8, prev: 1.4 },
      { label: "W1 Mar", v: 1.4, prev: 1.1 },
      { label: "W2 Mar", v: 2.7, prev: 2.1 },
    ],
  };
  return base[metric] ?? [
    { label: "W1", v: 80, prev: 70 }, { label: "W2", v: 85, prev: 74 },
    { label: "W3", v: 82, prev: 72 }, { label: "W4", v: 88, prev: 75 },
    { label: "W5", v: 90, prev: 78 }, { label: "W6", v: 87, prev: 74 },
  ];
}

interface TipProps { active?: boolean; payload?: { payload: { label: string; v: number; prev: number }; value: number; dataKey: string }[]; }
function Tip({ active, payload }: TipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const delta = d.v - d.prev;
  return (
    <div style={{ background: "#0C1220", border: "1px solid #243044", borderRadius: 6, padding: "8px 12px", fontSize: 11 }}>
      <p style={{ fontWeight: 700, color: "#E8ECF4", marginBottom: 4 }}>{d.label}</p>
      <p style={{ color: "#8B97AA" }}>2026: <strong style={{ color: "#00A8FF" }}>{d.v}</strong></p>
      <p style={{ color: "#8B97AA" }}>2025: <strong style={{ color: "#4E5E74" }}>{d.prev}</strong></p>
      <p style={{ color: "#8B97AA" }}>YoY: <strong style={{ color: delta >= 0 ? "#00C896" : "#FF4F5B" }}>{delta >= 0 ? "+" : ""}{delta.toFixed(1)}</strong></p>
    </div>
  );
}

export default function KPIDetailModal({ metric, value, delta, invertDelta, onClose }: KPIDetailModalProps) {
  const trend = getTrend(metric);
  const positive = invertDelta ? delta < 0 : delta > 0;
  const Icon = delta > 0 ? TrendingUp : TrendingDown;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 2000, backdropFilter: "blur(2px)" }}
        onClick={onClose}
      />
      {/* Modal */}
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        zIndex: 2001, width: 540, background: "#0C1220", border: "1px solid #243044",
        borderRadius: 12, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
      }}>
        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A2437", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4E5E74", marginBottom: 4 }}>{metric}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: "#E8ECF4", letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>{value}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 13, fontWeight: 700, color: positive ? "#00C896" : "#FF4F5B" }}>
                <Icon size={13} />
                {Math.abs(delta).toFixed(1)}% YoY
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#4E5E74" }}>
            <X size={18} />
          </button>
        </div>

        {/* Trend chart */}
        <div style={{ padding: "16px 20px 8px" }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#4E5E74", marginBottom: 12 }}>Weekly trend — 2026 vs 2025</p>
          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }} barGap={2} barCategoryGap="35%">
                <XAxis dataKey="label" tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "#4E5E74", fontSize: 9 }} tickLine={false} axisLine={false} />
                <Tooltip content={<Tip />} cursor={{ fill: "rgba(255,255,255,0.02)" }} />
                <Bar dataKey="prev" isAnimationActive={false} fill="#1A2437" radius={[2, 2, 0, 0]} maxBarSize={20} />
                <Bar dataKey="v" isAnimationActive={false} radius={[2, 2, 0, 0]} maxBarSize={20}>
                  {trend.map((_, i) => <Cell key={i} fill="#00A8FF" />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div style={{ padding: "8px 20px 20px" }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#4E5E74", marginBottom: 8 }}>Period breakdown</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0", border: "1px solid #1A2437", borderRadius: 6, overflow: "hidden" }}>
            {["Period", "2026", "2025", "YoY"].map((h) => (
              <div key={h} style={{ padding: "6px 10px", background: "#060A12", fontSize: 9, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "#4E5E74", borderBottom: "1px solid #1A2437" }}>{h}</div>
            ))}
            {trend.map((row, i) => {
              const d = row.v - row.prev;
              return [
                <div key={`${i}-l`} style={{ padding: "8px 10px", fontSize: 11, color: "#8B97AA", borderBottom: i < trend.length - 1 ? "1px solid #1A2437" : "none" }}>{row.label}</div>,
                <div key={`${i}-v`} style={{ padding: "8px 10px", fontSize: 11, fontWeight: 700, color: "#E8ECF4", fontVariantNumeric: "tabular-nums", borderBottom: i < trend.length - 1 ? "1px solid #1A2437" : "none" }}>{row.v}</div>,
                <div key={`${i}-p`} style={{ padding: "8px 10px", fontSize: 11, color: "#4E5E74", fontVariantNumeric: "tabular-nums", borderBottom: i < trend.length - 1 ? "1px solid #1A2437" : "none" }}>{row.prev}</div>,
                <div key={`${i}-d`} style={{ padding: "8px 10px", fontSize: 11, fontWeight: 700, color: d >= 0 ? "#00C896" : "#FF4F5B", fontVariantNumeric: "tabular-nums", borderBottom: i < trend.length - 1 ? "1px solid #1A2437" : "none" }}>{d >= 0 ? "+" : ""}{d.toFixed(1)}</div>,
              ];
            })}
          </div>
        </div>
      </div>
    </>
  );
}
