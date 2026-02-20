"use client";
import Header from "@/components/Header";
import ViewershipChart from "@/components/ViewershipChart";
import RaceCalendarView from "@/components/RaceCalendarView";
import DriverLeaderboard from "@/components/DriverLeaderboard";
import GeographicBreakdown from "@/components/GeographicBreakdown";
import EngagementFunnel from "@/components/EngagementFunnel";
import FilterBar from "@/components/FilterBar";
import KPITrend from "@/components/KPITrend";
import KeyInsights from "@/components/KeyInsights";
import { FilterProvider } from "@/components/FilterContext";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie,
} from "recharts";

const weekly = [
  { week: "Feb 10", viewers: 1.1, minutes: 94 },
  { week: "Feb 17", viewers: 8.2, minutes: 186, note: "Daytona 500" },
  { week: "Feb 24", viewers: 1.9, minutes: 112 },
  { week: "Mar 3",  viewers: 2.1, minutes: 118 },
  { week: "Mar 10", viewers: 1.8, minutes: 108 },
  { week: "Mar 17", viewers: 2.4, minutes: 124 },
  { week: "Mar 24", viewers: 1.9, minutes: 115 },
  { week: "Mar 31", viewers: 2.3, minutes: 127 },
];

const devices = [
  { name: "Smart TV",      value: 42, color: "#00A8E0" },
  { name: "Mobile",        value: 28, color: "#7C6FFF" },
  { name: "Desktop/Web",   value: 18, color: "#00C896" },
  { name: "Tablet",        value: 7,  color: "#FF9900" },
  { name: "Other",         value: 5,  color: "#4E5E74" },
];

const demographics = [
  { group: "18–24", pct: 14, color: "#7C6FFF" },
  { group: "25–34", pct: 28, color: "#00A8E0" },
  { group: "35–44", pct: 26, color: "#00A8E0" },
  { group: "45–54", pct: 19, color: "#4E5E74" },
  { group: "55+",   pct: 13, color: "#4E5E74" },
];

const sessions = [
  { duration: "<15 min", count: 8, color: "#FF4F5B" },
  { duration: "15–30",   count: 12, color: "#FF9900" },
  { duration: "30–60",   count: 18, color: "#F59E0B" },
  { duration: "60–120",  count: 31, color: "#00A8E0" },
  { duration: "120–180", count: 22, color: "#00C896" },
  { duration: "180+",    count: 9,  color: "#00C896" },
];

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div style={{ width: 2, height: 14, borderRadius: 2, background: "linear-gradient(180deg, #00A8E0 0%, #0047AB 100%)", flexShrink: 0 }} />
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00A8E0" }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #1A2437 0%, transparent 100%)" }} />
    </div>
  );
}

// Skeleton components for loading states
function ChartSkeleton({ height = 240 }: { height?: number }) {
  return (
    <div style={{ height, display: "flex", alignItems: "flex-end", gap: 10, padding: "20px 16px 16px 40px" }}>
      {([
        { h: 60, id: "b0" }, { h: 40, id: "b1" }, { h: 50, id: "b2" }, { h: 35, id: "b3" },
        { h: 45, id: "b4" }, { h: 55, id: "b5" }, { h: 42, id: "b6" }, { h: 48, id: "b7" },
      ]).map(({ h, id }, i) => (
        <div
          key={id}
          className="skeleton-shimmer"
          style={{ flex: 1, height: `${h}%`, borderRadius: "3px 3px 0 0", animationDelay: `${i * 60}ms` }}
        />
      ))}
    </div>
  );
}

function CardSkeleton({ height = 120 }: { height?: number }) {
  return (
    <div style={{ height, padding: 20, display: "flex", flexDirection: "column", gap: 10 }}>
      <div className="skeleton-shimmer" style={{ height: 10, width: "40%", borderRadius: 4 }} />
      <div className="skeleton-shimmer" style={{ height: 28, width: "60%", borderRadius: 4, animationDelay: "80ms" }} />
      <div className="skeleton-shimmer" style={{ height: 8, width: "30%", borderRadius: 4, animationDelay: "160ms" }} />
    </div>
  );
}

export default function ViewershipPage() {
  const totalViews = weekly.reduce((s, w) => s + w.viewers, 0).toFixed(1);
  const peakWeek = weekly.reduce((m, w) => w.viewers > m.viewers ? w : m, weekly[0]);

  return (
    <FilterProvider>
      <div style={{ minHeight: "100vh", background: "#05080F" }}>
        <Header />
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-5 space-y-5">

          {/* Page title */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-3">
              <h1 style={{ fontSize: 18, fontWeight: 700, color: "#E8ECF4" }}>Viewership Analytics</h1>
              <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 3, background: "rgba(0,168,224,0.1)", color: "#00A8E0", border: "1px solid rgba(0,168,224,0.2)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Q1 2026</span>
            </div>
            {/* Summary stats — mobile compact */}
            <div className="flex gap-4 sm:ml-auto">
              {[
                { label: "Total Q1", value: "16.4M", color: "#00A8E0" },
                { label: "YoY", value: "+23%", color: "#00C896" },
                { label: "Peak", value: "8.2M", color: "#FF9900" },
              ].map(s => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: "#4E5E74", textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
                  <p style={{ fontSize: 16, fontWeight: 900, color: s.color, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" }}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Bar */}
          <FilterBar />

          {/* ── Key Insights ── */}
          <KeyInsights />

          {/* ── KPI Trend ── */}
          <KPITrend />

          {/* ── Race-by-Race Viewership ── */}
          <SectionDivider label="Race-by-Race Performance" />
          <ViewershipChart />

          {/* ── Weekly Trend + Device Breakdown ── */}
          <SectionDivider label="Weekly Trends & Platform" />
          <div className="grid gap-4" style={{ gridTemplateColumns: "minmax(0,3fr) minmax(0,2fr)" }}>
            <div className="rounded-[10px] p-4 sm:p-5" style={{ background: "#0B1119", border: "1px solid #182035" }}>
              <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                <div>
                  <h2 style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4" }}>Weekly Viewership</h2>
                  <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 1 }}>Unique viewers (M) · Feb–Mar 2026</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p style={{ fontSize: 11, color: "#4E5E74" }}>Q1 Total</p>
                    <p style={{ fontSize: 16, fontWeight: 800, color: "#E8ECF4", fontVariantNumeric: "tabular-nums" }}>{totalViews}M</p>
                  </div>
                  <div className="text-right">
                    <p style={{ fontSize: 11, color: "#4E5E74" }}>Peak</p>
                    <p style={{ fontSize: 16, fontWeight: 800, color: "#00C896", fontVariantNumeric: "tabular-nums" }}>{peakWeek.viewers}M</p>
                  </div>
                </div>
              </div>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weekly} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00A8E0" stopOpacity={0.22} />
                        <stop offset="95%" stopColor="#00A8E0" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#182035" strokeDasharray="2 4" />
                    <XAxis dataKey="week" tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={{ stroke: "#182035" }} />
                    <YAxis tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}M`} />
                    <Tooltip
                      contentStyle={{ background: "#0B1119", border: "1px solid #22304A", borderRadius: 8, fontSize: 12 }}
                      labelStyle={{ color: "#E8ECF4", fontWeight: 700 }}
                      formatter={(v: number) => [`${v}M viewers`, "Viewership"]}
                    />
                    <Area type="monotone" dataKey="viewers" stroke="#00A8E0" strokeWidth={2.5} fill="url(#wg)"
                      dot={{ fill: "#00A8E0", r: 3, strokeWidth: 0 }}
                      activeDot={{ r: 5, fill: "#00A8E0", stroke: "rgba(0,168,224,0.3)", strokeWidth: 4 }}
                      isAnimationActive={true} animationDuration={800} animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[10px] p-4 sm:p-5" style={{ background: "#0B1119", border: "1px solid #182035" }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4", marginBottom: 4 }}>Device Breakdown</h2>
              <p style={{ fontSize: 11, color: "#4E5E74", marginBottom: 12 }}>Platform share of Q1 streams</p>
              <div className="relative" style={{ height: 150 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={devices} cx="50%" cy="50%" innerRadius={46} outerRadius={68} paddingAngle={3} dataKey="value" strokeWidth={0} startAngle={90} endAngle={-270}
                      isAnimationActive={true} animationDuration={700}>
                      {devices.map(d => <Cell key={d.name} fill={d.color} opacity={0.9} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span style={{ fontSize: 18, fontWeight: 900, color: "#E8ECF4", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" }}>16.4M</span>
                  <span style={{ fontSize: 9, color: "#4E5E74" }}>Total</span>
                </div>
              </div>
              <div className="space-y-1.5 mt-3">
                {devices.map(d => (
                  <div key={d.name} className="flex items-center gap-2">
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, flex: 1, color: "#8B97AA" }}>{d.name}</span>
                    <div style={{ width: 60, height: 3, borderRadius: 2, background: "#182035", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${d.value}%`, background: d.color, borderRadius: 2, transition: "width 0.6s ease" }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#E8ECF4", fontVariantNumeric: "tabular-nums", width: 32, textAlign: "right" }}>{d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Demographics + Session Duration ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-[10px] p-4 sm:p-5" style={{ background: "#0B1119", border: "1px solid #182035" }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4", marginBottom: 4 }}>Age Demographics</h2>
              <p style={{ fontSize: 11, color: "#4E5E74", marginBottom: 14 }}>Viewer distribution by age group</p>
              <div style={{ height: 170 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={demographics} layout="vertical" margin={{ left: 0, right: 40, top: 0, bottom: 0 }}>
                    <CartesianGrid horizontal={false} stroke="#182035" strokeDasharray="2 4" />
                    <XAxis type="number" tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}%`} />
                    <YAxis type="category" dataKey="group" tick={{ fill: "#8B97AA", fontSize: 11 }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#0B1119", border: "1px solid #22304A", borderRadius: 8, fontSize: 12 }}
                      formatter={(v: number) => [`${v}%`, "Share"]}
                    />
                    <Bar dataKey="pct" radius={[0, 3, 3, 0]} maxBarSize={18} isAnimationActive={true} animationDuration={600}>
                      {demographics.map(d => <Cell key={d.group} fill={d.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 p-3 rounded-lg" style={{ background: "#05080F" }}>
                <p style={{ fontSize: 11, color: "#8B97AA" }}>
                  Core 25–44 demo: <strong style={{ color: "#E8ECF4" }}>54%</strong> of viewers ·{" "}
                  18–34 growing fastest at <strong style={{ color: "#00C896" }}>+34% YoY</strong>
                </p>
              </div>
            </div>

            <div className="rounded-[10px] p-4 sm:p-5" style={{ background: "#0B1119", border: "1px solid #182035" }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4", marginBottom: 4 }}>Session Duration</h2>
              <p style={{ fontSize: 11, color: "#4E5E74", marginBottom: 14 }}>% of sessions by length · Avg 127 min</p>
              <div style={{ height: 170 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sessions} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="#182035" strokeDasharray="2 4" />
                    <XAxis dataKey="duration" tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}%`} />
                    <Tooltip
                      contentStyle={{ background: "#0B1119", border: "1px solid #22304A", borderRadius: 8, fontSize: 12 }}
                      formatter={(v: number) => [`${v}%`, "of sessions"]}
                    />
                    <Bar dataKey="count" radius={[3, 3, 0, 0]} maxBarSize={36} isAnimationActive={true} animationDuration={600} animationEasing="ease-out">
                      {sessions.map(s => <Cell key={s.duration} fill={s.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 p-3 rounded-lg" style={{ background: "#05080F" }}>
                <p style={{ fontSize: 11, color: "#8B97AA" }}>
                  <strong style={{ color: "#E8ECF4" }}>62%</strong> of sessions exceed 60 min ·{" "}
                  Full-race viewers: <strong style={{ color: "#00C896" }}>+8% YoY</strong>
                </p>
              </div>
            </div>
          </div>

          {/* ── Race Intelligence ── */}
          <SectionDivider label="Race Intelligence" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RaceCalendarView />
            <DriverLeaderboard />
          </div>

          {/* ── Audience Intelligence ── */}
          <SectionDivider label="Audience Intelligence" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
            <GeographicBreakdown />
            <EngagementFunnel />
          </div>

        </div>
      </div>
    </FilterProvider>
  );
}
