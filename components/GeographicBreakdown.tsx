"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const markets = [
  { market: "Charlotte, NC",  region: "Southeast", viewers: 1840, share: 11.2, yoy: 28, color: "#00A8FF" },
  { market: "Los Angeles, CA",region: "West",       viewers: 1620, share: 9.9,  yoy: 18, color: "#00A8FF" },
  { market: "Atlanta, GA",    region: "Southeast",  viewers: 1490, share: 9.1,  yoy: 31, color: "#00A8FF" },
  { market: "Dallas, TX",     region: "South",      viewers: 1280, share: 7.8,  yoy: 22, color: "#00A8FF" },
  { market: "New York, NY",   region: "Northeast",  viewers: 1140, share: 6.9,  yoy: 19, color: "#7C6FFF" },
  { market: "Chicago, IL",    region: "Midwest",    viewers: 980,  share: 6.0,  yoy: 14, color: "#7C6FFF" },
  { market: "Phoenix, AZ",    region: "Southwest",  viewers: 870,  share: 5.3,  yoy: 41, color: "#00C896" },
  { market: "Miami, FL",      region: "Southeast",  viewers: 760,  share: 4.6,  yoy: 67, color: "#00C896" },
];

const intl = [
  { country: "United Kingdom", viewers: 420, yoy: 74, flag: "🇬🇧" },
  { country: "Brazil",         viewers: 310, yoy: 89, flag: "🇧🇷" },
  { country: "Australia",      viewers: 195, yoy: 52, flag: "🇦🇺" },
  { country: "Canada",         viewers: 840, yoy: 31, flag: "🇨🇦" },
];

interface TProps { active?: boolean; payload?: { payload: typeof markets[0]; value: number }[]; }
function GeoTip({ active, payload }: TProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#0C1220", border: "1px solid #243044", borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
      <p style={{ fontWeight: 700, color: "#E8ECF4", marginBottom: 6 }}>{d.market}</p>
      <p style={{ color: "#8B97AA" }}>Viewers: <strong style={{ color: "#00A8FF" }}>{d.viewers.toLocaleString()}</strong></p>
      <p style={{ color: "#8B97AA" }}>Market share: <strong style={{ color: "#E8ECF4" }}>{d.share}%</strong></p>
      <p style={{ color: "#8B97AA" }}>YoY growth: <strong style={{ color: "#00C896" }}>+{d.yoy}%</strong></p>
    </div>
  );
}

export default function GeographicBreakdown() {
  return (
    <div className="card-hover rounded-[10px] overflow-hidden h-full" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #1A2437" }}>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#E8ECF4" }}>Geographic Breakdown</h2>
          <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 2 }}>Top markets by viewership · Q1 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 11, color: "#4E5E74" }}>Intl. viewers:</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#7C6FFF", fontVariantNumeric: "tabular-nums" }}>1.77M</span>
          <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "rgba(0,200,150,0.1)", color: "#00C896", border: "1px solid rgba(0,200,150,0.2)" }}>+67% YoY</span>
        </div>
      </div>

      <div className="p-5">
        {/* Chart */}
        <div style={{ height: 180, marginBottom: 16 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={markets} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#1A2437" strokeDasharray="2 4" />
              <XAxis dataKey="market" tick={{ fill: "#4E5E74", fontSize: 9 }} tickLine={false} axisLine={false} tickFormatter={v => v.split(",")[0]} />
              <YAxis tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${v}`} />
              <Tooltip content={<GeoTip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar isAnimationActive={false} dataKey="viewers" radius={[3, 3, 0, 0]} maxBarSize={32}>
                {markets.map(m => <Cell key={m.market} fill={m.yoy > 40 ? "#00C896" : "#00A8FF"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top markets table */}
        <div className="space-y-1.5 mb-4">
          {markets.slice(0, 4).map((m, i) => (
            <div key={m.market} className="flex items-center gap-3">
              <span style={{ fontSize: 10, color: "#4E5E74", width: 14, textAlign: "right" }}>{i + 1}</span>
              <span style={{ fontSize: 12, color: "#E8ECF4", flex: 1 }}>{m.market}</span>
              <span style={{ fontSize: 11, color: "#8B97AA", fontVariantNumeric: "tabular-nums" }}>{m.viewers.toLocaleString()}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#00C896", minWidth: 44, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>+{m.yoy}%</span>
            </div>
          ))}
        </div>

        {/* International breakdown */}
        <div style={{ borderTop: "1px solid #1A2437", paddingTop: 12 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4E5E74", marginBottom: 8 }}>International Markets</p>
          <div className="grid grid-cols-2 gap-2">
            {intl.map(c => (
              <div key={c.country} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "#060A12" }}>
                <span style={{ fontSize: 16 }}>{c.flag}</span>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 11, color: "#E8ECF4", fontWeight: 600 }}>{c.country}</p>
                  <p style={{ fontSize: 10, color: "#4E5E74" }}>{c.viewers}K viewers</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#7C6FFF" }}>+{c.yoy}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
