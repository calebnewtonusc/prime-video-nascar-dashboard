"use client";
import { useState, useCallback } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, AreaChart, Area,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Minus, X, TrendingUp, Eye, Star, Share2 } from "lucide-react";
import { useFilters } from "@/components/FilterContext";

interface Driver {
  name: string;
  number: string;
  team: string;
  manufacturer: string;
  index: number;
  prevIndex: number;
  rank: number;
  prevRank: number;
  viewers: number;      // thousands
  profileViews: number; // thousands
  socialMentions: number;
  favoritePercentage: number;
  trend: number[];      // 8-week sparkline data (normalized 0-100)
}

const DRIVERS: Driver[] = [
  { rank: 1, prevRank: 1, name: "Chase Elliott",    number: "9",  team: "Hendrick Motorsports", manufacturer: "Chevrolet", index: 2840, prevIndex: 2531, viewers: 2840, profileViews: 1260, socialMentions: 184200, favoritePercentage: 22.4, trend: [60, 68, 72, 78, 82, 90, 95, 100] },
  { rank: 2, prevRank: 3, name: "Kyle Larson",      number: "5",  team: "Hendrick Motorsports", manufacturer: "Chevrolet", index: 2610, prevIndex: 2290, viewers: 2610, profileViews: 1140, socialMentions: 163700, favoritePercentage: 18.9, trend: [50, 60, 65, 70, 75, 82, 90, 100] },
  { rank: 3, prevRank: 2, name: "Denny Hamlin",     number: "11", team: "Joe Gibbs Racing",     manufacturer: "Toyota",    index: 2380, prevIndex: 2430, viewers: 2290, profileViews: 980,  socialMentions: 141300, favoritePercentage: 14.6, trend: [80, 85, 90, 88, 85, 82, 80, 79] },
  { rank: 4, prevRank: 7, name: "Ross Chastain",    number: "1",  team: "Trackhouse Racing",    manufacturer: "Chevrolet", index: 2150, prevIndex: 1580, viewers: 2050, profileViews: 870,  socialMentions: 128500, favoritePercentage: 12.1, trend: [40, 48, 55, 63, 70, 80, 88, 100] },
  { rank: 5, prevRank: 4, name: "Ryan Blaney",      number: "12", team: "Team Penske",          manufacturer: "Ford",      index: 1990, prevIndex: 1920, viewers: 1870, profileViews: 790,  socialMentions: 112900, favoritePercentage: 10.8, trend: [62, 68, 72, 76, 80, 84, 88, 100] },
  { rank: 6, prevRank: 5, name: "Christopher Bell", number: "20", team: "Joe Gibbs Racing",     manufacturer: "Toyota",    index: 1820, prevIndex: 1740, viewers: 1640, profileViews: 690,  socialMentions: 97400,  favoritePercentage: 8.7,  trend: [55, 62, 68, 72, 78, 82, 90, 100] },
  { rank: 7, prevRank: 6, name: "William Byron",    number: "24", team: "Hendrick Motorsports", manufacturer: "Chevrolet", index: 1680, prevIndex: 1620, viewers: 1490, profileViews: 620,  socialMentions: 88100,  favoritePercentage: 7.5,  trend: [50, 58, 64, 70, 74, 80, 86, 100] },
  { rank: 8, prevRank: 9, name: "Martin Truex Jr.", number: "19", team: "Joe Gibbs Racing",     manufacturer: "Toyota",    index: 1520, prevIndex: 1380, viewers: 1330, profileViews: 550,  socialMentions: 76300,  favoritePercentage: 6.2,  trend: [48, 55, 60, 66, 72, 80, 88, 100] },
  { rank: 9, prevRank: 8, name: "Tyler Reddick",    number: "45", team: "23XI Racing",          manufacturer: "Toyota",    index: 1380, prevIndex: 1410, viewers: 1180, profileViews: 490,  socialMentions: 68900,  favoritePercentage: 5.4,  trend: [55, 58, 62, 65, 70, 72, 75, 78] },
  { rank: 10, prevRank: 10, name: "Alex Bowman",    number: "48", team: "Hendrick Motorsports", manufacturer: "Chevrolet", index: 1240, prevIndex: 1190, viewers: 1020, profileViews: 420,  socialMentions: 59600,  favoritePercentage: 4.3, trend: [52, 56, 60, 65, 70, 76, 82, 100] },
];

function PositionChange({ current, previous }: { current: number; previous: number }) {
  const diff = previous - current; // positive = moved up
  if (diff === 0) return <Minus size={10} style={{ color: "#4E5E74" }} />;
  if (diff > 0) return (
    <span style={{ display: "flex", alignItems: "center", gap: 2, color: "#00C896", fontSize: 10, fontWeight: 800 }}>
      <ArrowUpRight size={10} strokeWidth={2.5} />+{diff}
    </span>
  );
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 2, color: "#FF4F5B", fontSize: 10, fontWeight: 800 }}>
      <ArrowDownRight size={10} strokeWidth={2.5} />{diff}
    </span>
  );
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const rng = max - min || 1;
  const W = 48, H = 20;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / rng) * (H - 3) - 1;
    return [x, y] as [number, number];
  });
  const polyline = pts.map(([x, y]) => `${x},${y}`).join(" ");
  const area = [`0,${H}`, ...pts.map(([x, y]) => `${x},${y}`), `${W},${H}`].join(" ");
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden>
      <defs>
        <linearGradient id={`dl-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#dl-${color.replace("#", "")})`} />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface DrillDownModalProps {
  driver: Driver;
  onClose: () => void;
}

function DrillDownModal({ driver, onClose }: DrillDownModalProps) {
  const raceData = [
    { race: "Daytona", viewers: Math.round(driver.viewers * 0.45), rating: 5.1, finish: Math.floor(Math.random() * 10) + 1 },
    { race: "Las Vegas", viewers: Math.round(driver.viewers * 0.18), rating: 1.4, finish: Math.floor(Math.random() * 15) + 1 },
    { race: "Atlanta", viewers: Math.round(driver.viewers * 0.20), rating: 1.6, finish: Math.floor(Math.random() * 15) + 1 },
    { race: "Phoenix", viewers: Math.round(driver.viewers * 0.17), rating: 1.2, finish: Math.floor(Math.random() * 20) + 1 },
  ];

  const indexChange = driver.index - driver.prevIndex;
  const pctChange = ((indexChange / driver.prevIndex) * 100).toFixed(1);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${driver.name} driver details`}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(4,8,18,0.88)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16, animation: "fadeIn 0.2s ease",
      }}
      onClick={e => e.target === e.currentTarget && onClose()}
      onKeyDown={e => e.key === "Escape" && onClose()}
      tabIndex={-1}
    >
      <div style={{
        background: "#0C1220", border: "1px solid #243044", borderRadius: 12,
        width: "100%", maxWidth: 640, maxHeight: "90vh", overflowY: "auto",
        boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        animation: "fadeUp 0.25s ease",
      }}>
        {/* Header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #1A2437", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 10,
              background: driver.rank === 1 ? "rgba(0,168,224,0.15)" : "#111827",
              border: driver.rank === 1 ? "1px solid rgba(0,168,224,0.3)" : "1px solid #1A2437",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 9, fontWeight: 800, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.05em" }}>#{driver.number}</span>
              <span style={{ fontSize: 16, fontWeight: 900, color: driver.rank <= 3 ? "#00A8E0" : "#E8ECF4", lineHeight: 1 }}>
                {driver.rank}
              </span>
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#E8ECF4", letterSpacing: "-0.02em" }}>{driver.name}</h2>
              <p style={{ fontSize: 12, color: "#4E5E74", marginTop: 2 }}>{driver.team} · {driver.manufacturer}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <X size={16} color="#4E5E74" />
          </button>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, borderBottom: "1px solid #1A2437" }}>
          {[
            { label: "Engagement Index", value: driver.index.toLocaleString(), sub: `${indexChange >= 0 ? "+" : ""}${pctChange}% vs last month`, color: "#00A8E0" },
            { label: "Q1 Viewers", value: `${driver.viewers.toLocaleString()}K`, sub: "Unique viewers", color: "#9A7030" },
            { label: "Favorited By", value: `${driver.favoritePercentage}%`, sub: "of NASCAR subscribers", color: "#00C896" },
          ].map((s, i) => (
            <div key={s.label} style={{ padding: "16px 18px", borderRight: i < 2 ? "1px solid #1A2437" : "none" }}>
              <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4E5E74", marginBottom: 6 }}>{s.label}</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: s.color, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 10, color: "#2E4560" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Engagement trend */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #1A2437" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#8B97AA", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Engagement Trend (8 Weeks)</p>
          <div style={{ height: 80 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={driver.trend.map((v, i) => ({ week: `W${i + 1}`, v }))} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="dm-trend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00A8E0" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#00A8E0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#1A2437" strokeDasharray="2 4" />
                <XAxis dataKey="week" tick={{ fill: "#4E5E74", fontSize: 9 }} tickLine={false} axisLine={false} />
                <YAxis hide domain={[0, 110]} />
                <Tooltip
                  contentStyle={{ background: "#0C1220", border: "1px solid #243044", borderRadius: 6, fontSize: 11 }}
                  formatter={(v: number) => [`${v}`, "Index"]}
                />
                <Area type="monotone" dataKey="v" stroke="#00A8E0" strokeWidth={2} fill="url(#dm-trend)"
                  dot={false} activeDot={{ r: 4, fill: "#00A8E0" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Per-race breakdown */}
        <div style={{ padding: "20px 24px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#8B97AA", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Race-by-Race Viewership</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {raceData.map(r => (
              <div key={r.race} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, color: "#8B97AA", width: 70, flexShrink: 0 }}>{r.race}</span>
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: "#1A2437", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(r.viewers / driver.viewers) * 100}%`, background: "#00A8E0", borderRadius: 2, transition: "width 0.6s ease" }} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#E8ECF4", width: 52, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{r.viewers.toLocaleString()}K</span>
                <span style={{ fontSize: 10, color: "#4E5E74", width: 44, textAlign: "right" }}>P{r.finish}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
            {[
              { icon: Eye, label: "Profile Views", value: `${driver.profileViews.toLocaleString()}K`, color: "#7C6FFF" },
              { icon: Share2, label: "Social Mentions", value: `${(driver.socialMentions / 1000).toFixed(0)}K`, color: "#9A7030" },
              { icon: Star, label: "Fan Favorite", value: `${driver.favoritePercentage}%`, color: "#F59E0B" },
            ].map(s => {
              const Icon = s.icon;
              return (
                <div key={s.label} style={{ padding: "12px 14px", borderRadius: 8, background: "#060A12", border: "1px solid #1A2437" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <Icon size={11} style={{ color: s.color }} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</span>
                  </div>
                  <span style={{ fontSize: 18, fontWeight: 800, color: s.color, fontVariantNumeric: "tabular-nums" }}>{s.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TProps { active?: boolean; payload?: { payload: Driver; value: number }[]; }
function Tip({ active, payload }: TProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const change = d.index - d.prevIndex;
  const pct = ((change / d.prevIndex) * 100).toFixed(1);
  return (
    <div style={{ background: "#0C1220", border: "1px solid #243044", borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 10, fontWeight: 800, padding: "2px 6px", borderRadius: 4, background: d.rank === 1 ? "#00A8E0" : "#1A2437", color: d.rank === 1 ? "#fff" : "#8B97AA" }}>#{d.number}</span>
        <span style={{ fontWeight: 700, color: "#E8ECF4" }}>{d.name}</span>
      </div>
      <p style={{ color: "#8B97AA", marginBottom: 2 }}>Index: <strong style={{ color: "#E8ECF4" }}>{d.index.toLocaleString()}</strong></p>
      <p style={{ color: "#8B97AA", marginBottom: 2 }}>
        vs Last Month: <strong style={{ color: change >= 0 ? "#00C896" : "#FF4F5B" }}>
          {change >= 0 ? "+" : ""}{pct}%
        </strong>
      </p>
      <p style={{ color: "#4E5E74", fontSize: 10, marginTop: 4 }}>Click to drill down</p>
    </div>
  );
}

interface TickProps { x?: number; y?: number; payload?: { value: string }; }
function YTick({ x, y, payload, drivers }: TickProps & { drivers: Driver[] }) {
  if (!payload) return null;
  const d = drivers.find(dr => dr.name === payload.value);
  if (!d) return null;
  const posChange = d.prevRank - d.rank;
  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-188} y={-12} width={183} height={24}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, height: 24 }}>
          <div style={{ width: 18, flexShrink: 0, display: "flex", justifyContent: "center" }}>
            {posChange === 0
              ? <Minus size={9} style={{ color: "#2E4560" }} />
              : posChange > 0
              ? <span style={{ fontSize: 9, fontWeight: 800, color: "#00C896" }}>+{posChange}</span>
              : <span style={{ fontSize: 9, fontWeight: 800, color: "#FF4F5B" }}>{posChange}</span>
            }
          </div>
          <span style={{ fontSize: 9, fontWeight: 800, padding: "1px 5px", borderRadius: 3, background: d.rank === 1 ? "#00A8E0" : "#1A2437", color: d.rank === 1 ? "#fff" : "#4E5E74", minWidth: 26, textAlign: "center", flexShrink: 0, border: d.rank === 1 ? "none" : "1px solid #243044" }}>
            #{d.number}
          </span>
          <span style={{ fontSize: 11, color: d.rank <= 3 ? "#E8ECF4" : "#8B97AA", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {d.name.split(" ").slice(-1)[0]}
          </span>
          <MiniSparkline data={d.trend} color={d.rank <= 3 ? "#00A8E0" : "#243044"} />
        </div>
      </foreignObject>
    </g>
  );
}

export default function DriverLeaderboard() {
  const { filters } = useFilters();
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const filteredDrivers = DRIVERS.filter(d => {
    if (filters.selectedDriver !== "all" && d.name !== filters.selectedDriver) return false;
    if (filters.selectedTeam !== "all" && d.team !== filters.selectedTeam) return false;
    if (filters.selectedManufacturer !== "all" && d.manufacturer !== filters.selectedManufacturer) return false;
    return true;
  });

  const handleBarClick = useCallback((data: { activePayload?: { payload: Driver }[] }) => {
    if (data?.activePayload?.[0]?.payload) {
      setSelectedDriver(data.activePayload[0].payload);
    }
  }, []);

  const isFiltered = filteredDrivers.length < DRIVERS.length;

  return (
    <>
      <div className="card-hover rounded-[10px] p-5 h-full" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#E8ECF4" }}>Driver Popularity Index</h2>
            <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 2 }}>
              Q1 2026 · Click a bar to drill down · Arrows = rank change vs last race
            </p>
          </div>
          {isFiltered && (
            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "rgba(0,168,224,0.1)", color: "#00A8E0", border: "1px solid rgba(0,168,224,0.2)" }}>
              {filteredDrivers.length} shown
            </span>
          )}
        </div>

        {filteredDrivers.length === 0 ? (
          <div style={{ height: 320, display: "flex", alignItems: "center", justifyContent: "center", color: "#4E5E74", fontSize: 13 }}>
            No drivers match current filters
          </div>
        ) : (
          <div style={{ height: filteredDrivers.length < 5 ? filteredDrivers.length * 50 + 20 : 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredDrivers}
                layout="vertical"
                margin={{ top: 4, right: 52, left: 190, bottom: 4 }}
                onClick={handleBarClick}
                style={{ cursor: "pointer" }}
              >
                <CartesianGrid horizontal={false} strokeDasharray="2 4" stroke="#1A2437" />
                <XAxis type="number" domain={[0, 3200]} tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000).toFixed(1)}K`} />
                <YAxis
                  type="category" dataKey="name" width={190}
                  tick={props => <YTick {...props} drivers={filteredDrivers} />}
                  tickLine={false} axisLine={false}
                />
                <Tooltip content={<Tip />} cursor={{ fill: "rgba(0,168,224,0.04)" }} />
                <Bar dataKey="index" radius={[0, 4, 4, 0]} maxBarSize={20} isAnimationActive={true} animationDuration={600} animationEasing="ease-out">
                  {filteredDrivers.map(d => (
                    <Cell
                      key={d.name}
                      fill={d.rank === 1 ? "#00A8E0" : d.rank <= 3 ? "#0076CC" : "#1A2437"}
                      stroke={d.rank <= 3 ? "none" : "#243044"}
                      strokeWidth={1}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <p style={{ fontSize: 10, color: "#4E5E74", marginTop: 8, textAlign: "right" }}>
          Index = (Profile Views × 0.4) + (Watch Time × 0.6) · Normalized to 3,000-point scale
        </p>
      </div>

      {selectedDriver && (
        <DrillDownModal driver={selectedDriver} onClose={() => setSelectedDriver(null)} />
      )}
    </>
  );
}
