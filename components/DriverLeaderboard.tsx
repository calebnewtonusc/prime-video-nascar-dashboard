"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const drivers = [
  { name: "Chase Elliott",     number: "9",  index: 2840, delta: 12, rank: 1 },
  { name: "Kyle Larson",       number: "5",  index: 2610, delta: 8,  rank: 2 },
  { name: "Denny Hamlin",      number: "11", index: 2380, delta: -3, rank: 3 },
  { name: "Ross Chastain",     number: "1",  index: 2150, delta: 21, rank: 4 },
  { name: "Ryan Blaney",       number: "12", index: 1990, delta: 5,  rank: 5 },
  { name: "Christopher Bell",  number: "20", index: 1820, delta: 14, rank: 6 },
  { name: "William Byron",     number: "24", index: 1680, delta: 9,  rank: 7 },
  { name: "Martin Truex Jr",   number: "19", index: 1520, delta: -1, rank: 8 },
  { name: "Tyler Reddick",     number: "45", index: 1380, delta: 18, rank: 9 },
  { name: "Alex Bowman",       number: "48", index: 1240, delta: 7,  rank: 10 },
];

interface TProps { active?: boolean; payload?: { payload: typeof drivers[0]; value: number }[]; }
function Tip({ active, payload }: TProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#0C1220", border: "1px solid #243044", borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 10, fontWeight: 800, padding: "2px 6px", borderRadius: 4, background: d.rank === 1 ? "#00A8FF" : "#1A2437", color: d.rank === 1 ? "#fff" : "#8B97AA" }}>#{d.number}</span>
        <span style={{ fontWeight: 700, color: "#E8ECF4" }}>{d.name}</span>
      </div>
      <p style={{ color: "#8B97AA" }}>Engagement Index: <strong style={{ color: "#E8ECF4" }}>{d.index.toLocaleString()}</strong></p>
      <p style={{ color: "#8B97AA" }}>vs Last Month: <strong style={{ color: d.delta >= 0 ? "#00C896" : "#FF4F5B" }}>{d.delta >= 0 ? "+" : ""}{d.delta}%</strong></p>
    </div>
  );
}

interface TickProps { x?: number; y?: number; payload?: { value: string }; }
function YTick({ x, y, payload }: TickProps) {
  if (!payload) return null;
  const d = drivers.find(dr => dr.name === payload.value);
  if (!d) return null;
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-170} y={-11} width={165} height={22}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 9, fontWeight: 800, padding: "1px 5px", borderRadius: 3, background: d.rank === 1 ? "#00A8FF" : "#1A2437", color: d.rank === 1 ? "#fff" : "#4E5E74", minWidth: 26, textAlign: "center", flexShrink: 0, border: d.rank === 1 ? "none" : "1px solid #243044" }}>
            #{d.number}
          </span>
          <span style={{ fontSize: 11, color: d.rank <= 3 ? "#E8ECF4" : "#8B97AA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {d.name}
          </span>
        </div>
      </foreignObject>
    </g>
  );
}

export default function DriverLeaderboard() {
  return (
    <div className="rounded-[10px] p-5 h-full" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#E8ECF4" }}>Driver Popularity Index</h2>
          <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 2 }}>Q1 2026 · Profile views + watch time, normalized to 3,000</p>
        </div>
      </div>
      <div style={{ height: 340 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={drivers} layout="vertical" margin={{ top: 4, right: 48, left: 170, bottom: 4 }}>
            <CartesianGrid horizontal={false} strokeDasharray="2 4" stroke="#1A2437" />
            <XAxis type="number" domain={[0, 3200]} tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(1)}K`} />
            <YAxis type="category" dataKey="name" width={170} tick={props => <YTick {...props} />} tickLine={false} axisLine={false} />
            <Tooltip content={<Tip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
            <Bar dataKey="index" radius={[0, 3, 3, 0]} maxBarSize={18}>
              {drivers.map(d => (
                <Cell key={d.name} fill={d.rank === 1 ? "#00A8FF" : d.rank <= 3 ? "#0076CC" : "#1A2437"} stroke={d.rank <= 3 ? "none" : "#243044"} strokeWidth={1} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p style={{ fontSize: 10, color: "#4E5E74", marginTop: 8, textAlign: "right" }}>
        Index = (Profile Views × 0.4) + (Watch Time × 0.6) · Normalized to 3,000-point scale
      </p>
    </div>
  );
}
