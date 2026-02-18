"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";

const platforms = [
  { name: "Prime Video", share: 38, growth: 8, color: "#1399FF", isPrimary: true, subs: "16.4M", desc: "New entrant, strong growth" },
  { name: "Peacock", share: 28, growth: -3, color: "#9333EA", isPrimary: false, subs: "12.1M", desc: "Incumbent, losing share" },
  { name: "Fox Sports GO", share: 19, growth: 1, color: "#F59E0B", isPrimary: false, subs: "8.3M", desc: "Stable, legacy audience" },
  { name: "NBC Sports", share: 9, growth: -4, color: "#EF4444", isPrimary: false, subs: "3.9M", desc: "Declining rapidly" },
  { name: "Tubi / Other", share: 6, growth: 2, color: "#6B7280", isPrimary: false, subs: "2.6M", desc: "Free/ad-supported" },
];

interface TooltipPayload {
  payload: { name: string; share: number; growth: number; desc: string; color: string };
}
interface TooltipProps { active?: boolean; payload?: TooltipPayload[]; }

function ShareTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg p-3 shadow-xl text-xs" style={{ background: "#1F2937", border: "1px solid #374151" }}>
      <p className="font-bold text-white mb-1">{d.name}</p>
      <p className="text-gray-300">Share: <span className="text-white font-bold">{d.share}%</span></p>
      <p className="text-gray-300">YoY: <span className="font-bold" style={{ color: d.growth > 0 ? "#10B981" : "#EF4444" }}>{d.growth > 0 ? "+" : ""}{d.growth}pp</span></p>
      <p className="mt-1 text-[10px]" style={{ color: "#9CA3AF" }}>{d.desc}</p>
    </div>
  );
}

export default function CompetitorBenchmark() {
  return (
    <div className="rounded-xl p-6" style={{ background: "#111827", border: "1px solid #1F2937" }}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-white">Competitive Landscape</h2>
          <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>NASCAR streaming market share &bull; Q1 2026</p>
        </div>
        <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide" style={{ background: "rgba(19,153,255,0.1)", color: "#1399FF", border: "1px solid rgba(19,153,255,0.22)" }}>#1 STREAMER</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: "#6B7280" }}>Market Share by Platform (%)</p>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platforms} margin={{ top: 12, right: 16, left: 0, bottom: 4 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#1F2937" />
                <XAxis dataKey="name" tick={{ fill: "#9CA3AF", fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "#9CA3AF", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} domain={[0, 50]} />
                <Tooltip content={<ShareTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <ReferenceLine y={38} stroke="#1399FF" strokeDasharray="4 3" strokeWidth={1.5} label={{ value: "Prime 38%", fill: "#1399FF", fontSize: 10, position: "insideTopRight" }} />
                <Bar dataKey="share" radius={[4, 4, 0, 0]} maxBarSize={44}>
                  {platforms.map((p) => (
                    <Cell key={p.name} fill={p.color} opacity={p.isPrimary ? 1 : 0.5} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#6B7280" }}>Platform Snapshot</p>
          {platforms.map((p) => (
            <div key={p.name} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ background: p.isPrimary ? "rgba(19,153,255,0.06)" : "#080C14", border: `1px solid ${p.isPrimary ? "rgba(19,153,255,0.2)" : "#1F2937"}` }}>
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
              <span className="text-[12px] font-semibold flex-1 truncate" style={{ color: p.isPrimary ? "#F9FAFB" : "#9CA3AF" }}>
                {p.name}
                {p.isPrimary && <span className="ml-1.5 text-[9px] font-black" style={{ color: "#1399FF" }}>YOU</span>}
              </span>
              <span className="text-[13px] font-black metric-value" style={{ color: p.color }}>{p.share}%</span>
              <span className="text-[11px] font-bold w-10 text-right" style={{ color: p.growth > 0 ? "#10B981" : p.growth < -2 ? "#EF4444" : "#9CA3AF" }}>
                {p.growth > 0 ? "↑" : "↓"}{Math.abs(p.growth)}pp
              </span>
              <span className="text-[10px] w-10 text-right" style={{ color: "#4B5563" }}>{p.subs}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
