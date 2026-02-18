"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const streams = [
  { name: "Prime Subscriptions", value: 8.7, pct: 68, color: "#00A8FF", mom: 0.8  },
  { name: "Advertising",         value: 2.8, pct: 22, color: "#FF9900", mom: 0.3  },
  { name: "International",       value: 1.1, pct: 9,  color: "#00C896", mom: 0.1  },
  { name: "Merchandise",         value: 0.2, pct: 1,  color: "#4E5E74", mom: -0.02 },
];

interface TProps {
  active?: boolean;
  payload?: { name: string; value: number; payload: typeof streams[0] }[];
}
function Tip({ active, payload }: TProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#0C1220", border: "1px solid #243044", borderRadius: 8, padding: "10px 14px", fontSize: 12, minWidth: 160 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, display: "inline-block" }} />
        <span style={{ fontWeight: 700, color: "#E8ECF4" }}>{d.name}</span>
      </div>
      <p style={{ color: "#8B97AA", marginBottom: 2 }}>Revenue: <strong style={{ color: "#E8ECF4" }}>${d.value}M</strong></p>
      <p style={{ color: "#8B97AA", marginBottom: 2 }}>Share: <strong style={{ color: d.color }}>{d.pct}%</strong></p>
      <p style={{ color: "#8B97AA" }}>MoM: <strong style={{ color: d.mom >= 0 ? "#00C896" : "#FF4F5B" }}>{d.mom >= 0 ? "+" : ""}${Math.abs(d.mom).toFixed(2)}M</strong></p>
    </div>
  );
}

export default function RevenueChart() {
  const total = streams.reduce((s, d) => s + d.value, 0).toFixed(1);
  return (
    <div className="rounded-[10px] p-5" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4" }}>Revenue Breakdown</h2>
          <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 2 }}>All streams · Q1 2026 · Feb–Mar</p>
        </div>
        <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.07em", background: "rgba(255,153,0,0.1)", color: "#FF9900", border: "1px solid rgba(255,153,0,0.2)" }}>Q1 2026</span>
      </div>

      {/* Donut — MUST use absolute div overlay for center label, never SVG children */}
      <div style={{ position: "relative", height: 220, width: "100%" }}>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie isAnimationActive={false}
              data={streams}
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={96}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
              startAngle={90}
              endAngle={-270}
            >
              {streams.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip content={<Tip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Absolute center label overlay */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
          <span style={{ fontSize: 26, fontWeight: 900, color: "#E8ECF4", lineHeight: 1, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" }}>
            ${total}M
          </span>
          <span style={{ fontSize: 10, color: "#4E5E74", marginTop: 4 }}>Total Revenue</span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
        {streams.map(s => (
          <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, flex: 1, color: "#8B97AA" }}>{s.name}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#E8ECF4", fontVariantNumeric: "tabular-nums" }}>${s.value}M</span>
            <span style={{ fontSize: 10, fontWeight: 700, width: 28, textAlign: "right", color: s.color, fontVariantNumeric: "tabular-nums" }}>{s.pct}%</span>
          </div>
        ))}
      </div>

      {/* MoM */}
      <div style={{ borderTop: "1px solid #1A2437", marginTop: 14, paddingTop: 12 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4E5E74", marginBottom: 8 }}>MoM vs January</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {streams.map(s => (
            <div key={s.name} style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", borderRadius: 6, background: "#060A12" }}>
              <span style={{ fontSize: 10, color: "#4E5E74" }}>{s.name.split(" ")[0]}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: s.mom >= 0 ? "#00C896" : "#FF4F5B", fontVariantNumeric: "tabular-nums" }}>
                {s.mom >= 0 ? "+" : ""}${Math.abs(s.mom).toFixed(2)}M
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
