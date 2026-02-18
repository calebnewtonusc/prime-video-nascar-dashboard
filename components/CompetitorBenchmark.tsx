"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";

const platforms = [
  { name: "Prime Video",   short: "Prime", share: 38, growth: 8,  subs: "16.4M", color: "#00A8FF", isPrimary: true,  desc: "New entrant, strong growth trajectory" },
  { name: "Peacock",       short: "Peacock",share: 28, growth: -3, subs: "12.1M", color: "#8B97AA", isPrimary: false, desc: "Incumbent, losing share YoY" },
  { name: "Fox Sports GO", short: "Fox",   share: 19, growth: 1,  subs: "8.3M",  color: "#8B97AA", isPrimary: false, desc: "Stable, legacy audience" },
  { name: "NBC Sports",    short: "NBC",   share: 9,  growth: -4, subs: "3.9M",  color: "#8B97AA", isPrimary: false, desc: "Declining rapidly" },
  { name: "Tubi / Other",  short: "Other", share: 6,  growth: 2,  subs: "2.6M",  color: "#4E5E74", isPrimary: false, desc: "Free/ad-supported tier" },
];

interface TProps { active?: boolean; payload?: { payload: typeof platforms[0] }[]; }
function ShareTip({ active, payload }: TProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#0C1220", border: "1px solid #243044", borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
      <p style={{ fontWeight: 700, color: "#E8ECF4", marginBottom: 4 }}>{d.name}</p>
      <p style={{ color: "#8B97AA" }}>Share: <strong style={{ color: d.isPrimary ? "#00A8FF" : "#E8ECF4" }}>{d.share}%</strong></p>
      <p style={{ color: "#8B97AA" }}>YoY: <strong style={{ color: d.growth > 0 ? "#00C896" : "#FF4F5B" }}>{d.growth > 0 ? "+" : ""}{d.growth}pp</strong></p>
      <p style={{ color: "#8B97AA" }}>Subs: <strong style={{ color: "#E8ECF4" }}>{d.subs}</strong></p>
      <p style={{ fontSize: 10, color: "#4E5E74", marginTop: 4 }}>{d.desc}</p>
    </div>
  );
}

export default function CompetitorBenchmark() {
  return (
    <div className="rounded-[10px] overflow-hidden" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #1A2437" }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#E8ECF4" }}>Competitive Landscape</h2>
          <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 2 }}>NASCAR streaming market share · Q1 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 11, color: "#4E5E74" }}>Prime Video rank:</span>
          <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.08em", background: "rgba(0,168,255,0.1)", color: "#00A8FF", border: "1px solid rgba(0,168,255,0.22)" }}>#1 Streamer</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Chart */}
        <div className="p-5" style={{ borderRight: "1px solid #1A2437" }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4E5E74", marginBottom: 12 }}>Market Share by Platform</p>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platforms} margin={{ top: 16, right: 16, left: 0, bottom: 4 }}>
                <CartesianGrid vertical={false} strokeDasharray="2 4" stroke="#1A2437" />
                <XAxis dataKey="short" tick={{ fill: "#4E5E74", fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} domain={[0, 50]} />
                <Tooltip content={<ShareTip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <ReferenceLine y={38} stroke="#00A8FF" strokeDasharray="3 3" strokeWidth={1} label={{ value: "Prime 38%", fill: "#00A8FF", fontSize: 10, position: "insideTopRight" }} />
                <Bar dataKey="share" radius={[4, 4, 0, 0]} maxBarSize={48}>
                  {platforms.map(p => <Cell key={p.name} fill={p.isPrimary ? "#00A8FF" : "#1A2437"} stroke={p.isPrimary ? "#00A8FF" : "#243044"} strokeWidth={1} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Platform table */}
        <div className="p-5">
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4E5E74", marginBottom: 12 }}>Platform Snapshot</p>
          <div className="space-y-2">
            {platforms.map(p => (
              <div key={p.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ background: p.isPrimary ? "rgba(0,168,255,0.06)" : "#060A12", border: `1px solid ${p.isPrimary ? "rgba(0,168,255,0.18)" : "#1A2437"}` }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.isPrimary ? "#00A8FF" : "#2E3F56", flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: p.isPrimary ? 700 : 500, flex: 1, color: p.isPrimary ? "#E8ECF4" : "#8B97AA" }}>
                  {p.name}
                  {p.isPrimary && <span style={{ marginLeft: 6, fontSize: 9, fontWeight: 800, color: "#00A8FF" }}>YOU</span>}
                </span>
                <span style={{ fontSize: 13, fontWeight: 800, color: p.isPrimary ? "#00A8FF" : "#E8ECF4", fontVariantNumeric: "tabular-nums" }}>{p.share}%</span>
                <span style={{ fontSize: 11, fontWeight: 700, width: 40, textAlign: "right", color: p.growth > 0 ? "#00C896" : p.growth < -2 ? "#FF4F5B" : "#8B97AA", fontVariantNumeric: "tabular-nums" }}>
                  {p.growth > 0 ? "+" : ""}{p.growth}pp
                </span>
                <span style={{ fontSize: 10, width: 36, textAlign: "right", color: "#4E5E74" }}>{p.subs}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 10, color: "#4E5E74", marginTop: 12 }}>
            Source: Nielsen Digital · Q1 2026 · YoY change in percentage points
          </p>
        </div>
      </div>
    </div>
  );
}
