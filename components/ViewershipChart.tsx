"use client";

import {
  ComposedChart, Area, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer, Cell,
} from "recharts";

const races = [
  { name: "Daytona 500",   short: "Daytona",  date: "Feb 16", v26: 8.2, v25: 6.7, target: 7.0, milestone: "Season opener" },
  { name: "Las Vegas",     short: "Las Vegas",date: "Mar 2",  v26: 2.1, v25: 1.8, target: 2.0 },
  { name: "Atlanta",       short: "Atlanta",  date: "Mar 9",  v26: 1.8, v25: 1.5, target: 1.8 },
  { name: "Phoenix",       short: "Phoenix",  date: "Mar 16", v26: 2.4, v25: 2.1, target: 2.2 },
  { name: "COTA",          short: "COTA",     date: "Mar 23", v26: 1.9, v25: 1.6, target: 1.8 },
  { name: "Bristol Dirt",  short: "Bristol",  date: "Mar 30", v26: 2.3, v25: 2.0, target: 2.1, milestone: "Fan favorite" },
];

const totalV26 = races.reduce((s, r) => s + r.v26, 0);
const totalV25 = races.reduce((s, r) => s + r.v25, 0);
const yoyPct = (((totalV26 - totalV25) / totalV25) * 100).toFixed(1);
const peakRace = races.reduce((m, r) => r.v26 > m.v26 ? r : m, races[0]);
const aboveTarget = races.filter(r => r.v26 >= r.target).length;

interface TProps { active?: boolean; payload?: { payload: typeof races[0]; value: number; name: string; color: string }[]; label?: string; }

function Tip({ active, payload }: TProps) {
  if (!active || !payload?.length) return null;
  const r = payload[0].payload;
  const delta = r.v26 - r.v25;
  const pct = ((delta / r.v25) * 100).toFixed(1);
  const beat = r.v26 >= r.target;
  return (
    <div className="rounded-lg p-3 text-xs shadow-xl" style={{ background: "#0C1220", border: "1px solid #243044", minWidth: 180 }}>
      <div className="flex items-center justify-between mb-2 pb-2" style={{ borderBottom: "1px solid #1A2437" }}>
        <span className="font-bold text-[13px]" style={{ color: "#E8ECF4" }}>{r.name}</span>
        <span className="badge" style={{ background: beat ? "rgba(0,200,150,0.12)" : "rgba(255,79,91,0.12)", color: beat ? "#00C896" : "#FF4F5B", border: `1px solid ${beat ? "rgba(0,200,150,0.25)" : "rgba(255,79,91,0.25)"}`, fontSize: "10px", padding: "2px 6px", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>
          {beat ? "BEAT TARGET" : "MISSED"}
        </span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span style={{ color: "#4E5E74" }}>2026 Viewers</span>
          <span className="font-bold" style={{ color: "#00A8FF" }}>{r.v26}M</span>
        </div>
        <div className="flex justify-between gap-4">
          <span style={{ color: "#4E5E74" }}>2025 Viewers</span>
          <span style={{ color: "#8B97AA" }}>{r.v25}M</span>
        </div>
        <div className="flex justify-between gap-4">
          <span style={{ color: "#4E5E74" }}>Target</span>
          <span style={{ color: "#FF9900" }}>{r.target}M</span>
        </div>
        <div className="flex justify-between gap-4 pt-1 mt-1" style={{ borderTop: "1px solid #1A2437" }}>
          <span style={{ color: "#4E5E74" }}>YoY change</span>
          <span className="font-bold" style={{ color: delta >= 0 ? "#00C896" : "#FF4F5B" }}>
            {delta >= 0 ? "+" : ""}{delta.toFixed(1)}M ({delta >= 0 ? "+" : ""}{pct}%)
          </span>
        </div>
      </div>
      {r.milestone && <p className="mt-2 text-[10px]" style={{ color: "#4E5E74" }}>{r.milestone}</p>}
    </div>
  );
}

export default function ViewershipChart() {
  return (
    <div className="rounded-[10px] p-5" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-[15px] font-bold" style={{ color: "#E8ECF4" }}>Q1 Race Viewership</h2>
            <span className="badge badge-blue">Live</span>
          </div>
          <p className="text-[12px]" style={{ color: "#4E5E74" }}>Unique viewers (M) · Q1 2026 vs Q1 2025 · Target line at race-level goals</p>
        </div>
        {/* Summary pills */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <p className="text-[11px]" style={{ color: "#4E5E74" }}>Q1 Total</p>
            <p className="text-[16px] font-black t-num" style={{ color: "#E8ECF4" }}>{totalV26.toFixed(1)}M</p>
          </div>
          <div className="text-right">
            <p className="text-[11px]" style={{ color: "#4E5E74" }}>YoY Growth</p>
            <p className="text-[16px] font-black t-num" style={{ color: "#00C896" }}>+{yoyPct}%</p>
          </div>
          <div className="text-right">
            <p className="text-[11px]" style={{ color: "#4E5E74" }}>vs Target</p>
            <p className="text-[16px] font-black t-num" style={{ color: aboveTarget >= 5 ? "#00C896" : "#FF9900" }}>{aboveTarget}/{races.length}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={races} margin={{ top: 16, right: 12, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="vg26" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#00A8FF" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00A8FF" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="vg25" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#4E5E74" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#4E5E74" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="2 4" stroke="#1A2437" />
            <XAxis
              dataKey="short"
              tick={{ fill: "#4E5E74", fontSize: 11, fontWeight: 500 }}
              tickLine={false} axisLine={{ stroke: "#1A2437" }}
            />
            <YAxis
              tick={{ fill: "#4E5E74", fontSize: 11 }}
              tickLine={false} axisLine={false}
              tickFormatter={(v: number) => `${v}M`}
              domain={[0, 10]}
            />
            <Tooltip content={<Tip />} cursor={{ stroke: "#243044", strokeWidth: 1 }} />
            <ReferenceLine
              y={7}
              stroke="#FF9900"
              strokeDasharray="4 3"
              strokeWidth={1.5}
            />
            <Area
              type="monotone" dataKey="v25" name="2025"
              stroke="#2E3F56" strokeWidth={1.5}
              fill="url(#vg25)"
              dot={false} activeDot={{ r: 4, fill: "#4E5E74", strokeWidth: 0 }}
            />
            <Area
              type="monotone" dataKey="v26" name="2026"
              stroke="#00A8FF" strokeWidth={2.5}
              fill="url(#vg26)"
              dot={{ fill: "#00A8FF", r: 3.5, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#00A8FF", stroke: "rgba(0,168,255,0.3)", strokeWidth: 4 }}
            />
            <Line
              type="monotone" dataKey="target" name="Target"
              stroke="#FF9900" strokeWidth={1.5}
              strokeDasharray="5 3"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend + race badges */}
      <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid #1A2437" }}>
        <div className="flex items-center gap-4 text-[11px]" style={{ color: "#4E5E74" }}>
          <span className="flex items-center gap-1.5"><span style={{ width: 16, height: 2, display: "inline-block", background: "#00A8FF", borderRadius: 1 }} />2026</span>
          <span className="flex items-center gap-1.5"><span style={{ width: 16, height: 2, display: "inline-block", background: "#2E3F56", borderRadius: 1 }} />2025</span>
          <span className="flex items-center gap-1.5"><span style={{ width: 16, height: 1, display: "inline-block", background: "#FF9900", borderRadius: 1, borderTop: "1px dashed #FF9900" }} />Target</span>
        </div>
        <p className="text-[11px]" style={{ color: "#4E5E74" }}>Peak: <span style={{ color: "#E8ECF4", fontWeight: 600 }}>{peakRace.name}</span> — {peakRace.v26}M viewers</p>
      </div>
    </div>
  );
}
