"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { ArrowLeft } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

// ─── Data ───────────────────────────────────────────────────────────────────

const weeklyData = [
  { week: "Jan 6", live: 1.2, replay: 0.3 },
  { week: "Jan 13", live: 1.4, replay: 0.35 },
  { week: "Jan 20", live: 1.8, replay: 0.45 },
  { week: "Jan 27", live: 2.1, replay: 0.6 },
  { week: "Feb 3", live: 2.4, replay: 0.8 },
  { week: "Feb 10", live: 8.2, replay: 3.1, isRaceWeek: true, race: "Daytona 500" },
  { week: "Feb 17", live: 1.6, replay: 1.4 },
  { week: "Feb 24", live: 1.9, replay: 0.7 },
  { week: "Mar 3", live: 2.1, replay: 0.8, isRaceWeek: true, race: "Las Vegas" },
  { week: "Mar 10", live: 1.8, replay: 0.6, isRaceWeek: true, race: "Atlanta" },
  { week: "Mar 17", live: 2.4, replay: 0.9, isRaceWeek: true, race: "Phoenix" },
  { week: "Mar 24", live: 2.0, replay: 0.7, isRaceWeek: true, race: "COTA" },
];

const deviceData = [
  { name: "TV/CTV", value: 47, color: "#1399FF" },
  { name: "Mobile", value: 32, color: "#FF9900" },
  { name: "Desktop", value: 16, color: "#10B981" },
  { name: "Tablet", value: 5, color: "#8B5CF6" },
];

const sessionData = [
  { bucket: "<15min", pct: 8, color: "#374151" },
  { bucket: "15-30min", pct: 14, color: "#4B5563" },
  { bucket: "30-60min", pct: 19, color: "#6B7280" },
  { bucket: "1-2hrs", pct: 23, color: "#1399FF" },
  { bucket: "2-3hrs", pct: 21, color: "#0D7FCC" },
  { bucket: "Full Race 3hr+", pct: 15, color: "#FF9900" },
];

const demographicData = [
  { age: "18-24", pct: 12 },
  { age: "25-34", pct: 24 },
  { age: "35-44", pct: 31 },
  { age: "45-54", pct: 22 },
  { age: "55+", pct: 11 },
];

const timeOfDayData = [
  { window: "Morning 6am-12pm", pct: 8, color: "#1F4E7A" },
  { window: "Afternoon 12pm-6pm", pct: 34, color: "#1A6FAD" },
  { window: "Prime Time 6pm-10pm", pct: 43, color: "#1399FF" },
  { window: "Late Night 10pm+", pct: 15, color: "#0D7FCC" },
];

// ─── KPI Mini-Card ───────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent: string;
}) {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-1"
      style={{ background: "#111827", border: "1px solid #1F2937" }}
    >
      <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#6B7280" }}>
        {label}
      </span>
      <span className="text-[28px] font-black leading-none metric-value" style={{ color: accent }}>
        {value}
      </span>
      <span className="text-[11px]" style={{ color: "#9CA3AF" }}>
        {sub}
      </span>
    </div>
  );
}

// ─── Weekly Viewership Trend (client) ────────────────────────────────────────

interface WeeklyTooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface WeeklyTooltipProps {
  active?: boolean;
  payload?: WeeklyTooltipPayload[];
  label?: string;
}

function WeeklyTooltip({ active, payload, label }: WeeklyTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const live = payload.find((p) => p.name === "Weekly Unique Viewers")?.value ?? 0;
  const replay = payload.find((p) => p.name === "Replay/VOD")?.value ?? 0;
  const total = (live + replay).toFixed(1);
  return (
    <div
      className="rounded-lg p-3 shadow-xl text-xs"
      style={{ background: "#1F2937", border: "1px solid #374151" }}
    >
      <p className="font-bold text-white mb-1.5">{label}</p>
      <p style={{ color: "#1399FF" }}>
        Live Viewers: <span className="font-bold text-white">{live}M</span>
      </p>
      <p style={{ color: "#FF9900" }}>
        Replay/VOD: <span className="font-bold text-white">{replay}M</span>
      </p>
      <div className="border-t mt-1.5 pt-1.5" style={{ borderColor: "#374151" }}>
        <p style={{ color: "#9CA3AF" }}>
          Total: <span className="font-bold text-white">{total}M</span>
        </p>
      </div>
    </div>
  );
}

function WeeklyTrendChart() {
  const avgLive =
    weeklyData.reduce((s, d) => s + d.live, 0) / weeklyData.length;
  const daytonaLive = weeklyData.find((d) => (d as { isRaceWeek?: boolean }).isRaceWeek && (d as { race?: string }).race === "Daytona 500")?.live ?? 0;
  const spikeFactor = (daytonaLive / avgLive).toFixed(1);
  const totalReplay = weeklyData.reduce((s, d) => s + d.replay, 0).toFixed(1);
  const totalLive = weeklyData.reduce((s, d) => s + d.live, 0);
  const replayRate = ((parseFloat(totalReplay) / (totalLive + parseFloat(totalReplay))) * 100).toFixed(0);

  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "#111827", border: "1px solid #1F2937" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-white">Weekly Viewership Trend</h2>
          <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>
            Jan 6 – Mar 29, 2026 &bull; Live + Replay/VOD
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded" style={{ background: "#1399FF", display: "inline-block" }} />
            <span style={{ color: "#9CA3AF" }}>Weekly Unique Viewers</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded" style={{ background: "#FF9900", display: "inline-block" }} />
            <span style={{ color: "#9CA3AF" }}>Replay/VOD</span>
          </span>
        </div>
      </div>

      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="liveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1399FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1399FF" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="replayGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF9900" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FF9900" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
            <XAxis
              dataKey="week"
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}M`}
            />
            <Tooltip content={<WeeklyTooltip />} />
            <ReferenceLine
              x="Feb 10"
              stroke="#FF9900"
              strokeDasharray="4 2"
              strokeWidth={1.5}
              label={{
                value: "Daytona 500",
                position: "top",
                fill: "#FF9900",
                fontSize: 10,
                fontWeight: 700,
              }}
            />
            <Area
              type="monotone"
              dataKey="live"
              name="Weekly Unique Viewers"
              stroke="#1399FF"
              strokeWidth={2}
              fill="url(#liveGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#1399FF" }}
            />
            <Area
              type="monotone"
              dataKey="replay"
              name="Replay/VOD"
              stroke="#FF9900"
              strokeWidth={2}
              fill="url(#replayGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#FF9900" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary bar */}
      <div
        className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t"
        style={{ borderColor: "#1F2937" }}
      >
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "#6B7280" }}>
            Avg Weekly Viewers
          </p>
          <p className="text-[18px] font-black metric-value" style={{ color: "#1399FF" }}>
            {(totalLive / weeklyData.length).toFixed(1)}M
          </p>
        </div>
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "#6B7280" }}>
            Daytona Spike Factor
          </p>
          <p className="text-[18px] font-black metric-value" style={{ color: "#FF9900" }}>
            {spikeFactor}x average
          </p>
        </div>
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "#6B7280" }}>
            Replay Rate
          </p>
          <p className="text-[18px] font-black metric-value" style={{ color: "#10B981" }}>
            {replayRate}%
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Device Breakdown Donut (client) ─────────────────────────────────────────

interface DeviceTooltipPayload {
  name: string;
  value: number;
  payload: { color: string };
}

interface DeviceTooltipProps {
  active?: boolean;
  payload?: DeviceTooltipPayload[];
}

function DeviceTooltip({ active, payload }: DeviceTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div
      className="rounded-lg p-3 shadow-xl text-xs"
      style={{ background: "#1F2937", border: "1px solid #374151" }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.payload.color }} />
        <span className="font-semibold text-white">{item.name}</span>
      </div>
      <p style={{ color: "#9CA3AF" }}>
        Share: <span className="font-bold text-white">{item.value}%</span>
      </p>
    </div>
  );
}

function DeviceBreakdownChart() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "#111827", border: "1px solid #1F2937" }}
    >
      <div className="mb-4">
        <h2 className="text-base font-bold text-white">Device Breakdown</h2>
        <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>
          Viewing platform share &bull; Q1 2026
        </p>
      </div>
      <div className="relative" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={deviceData}
              cx="50%"
              cy="50%"
              innerRadius={64}
              outerRadius={92}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
              startAngle={90}
              endAngle={-270}
            >
              {deviceData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} opacity={0.9} />
              ))}
            </Pie>
            <Tooltip content={<DeviceTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[22px] font-black metric-value" style={{ color: "#F9FAFB", lineHeight: 1 }}>
            4 Devices
          </span>
          <span className="text-[10px] mt-1" style={{ color: "#6B7280" }}>
            Platforms
          </span>
        </div>
      </div>
      <div className="space-y-2 mt-3">
        {deviceData.map((item) => (
          <div key={item.name} className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <span className="text-[11px] flex-1" style={{ color: "#9CA3AF" }}>{item.name}</span>
            <span className="text-[12px] font-bold text-white metric-value">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Session Duration (client) ───────────────────────────────────────────────

interface SessionTooltipPayload {
  value: number;
  payload: { color: string };
}

interface SessionTooltipProps {
  active?: boolean;
  payload?: SessionTooltipPayload[];
  label?: string;
}

function SessionTooltip({ active, payload, label }: SessionTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="rounded-lg p-3 shadow-xl text-xs"
      style={{ background: "#1F2937", border: "1px solid #374151" }}
    >
      <p className="font-semibold text-white mb-1">{label}</p>
      <p style={{ color: "#9CA3AF" }}>
        Sessions: <span className="font-bold text-white">{payload[0].value}%</span>
      </p>
    </div>
  );
}

function SessionDurationChart() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "#111827", border: "1px solid #1F2937" }}
    >
      <div className="mb-4">
        <h2 className="text-base font-bold text-white">Watch Session Duration</h2>
        <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>
          Distribution of session lengths &bull; All content
        </p>
      </div>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sessionData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" horizontal={true} vertical={false} />
            <XAxis
              dataKey="bucket"
              tick={{ fill: "#6B7280", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<SessionTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
              {sessionData.map((entry) => (
                <Cell key={entry.bucket} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Demographic Breakdown (client) ──────────────────────────────────────────

interface DemoTooltipPayload {
  value: number;
}

interface DemoTooltipProps {
  active?: boolean;
  payload?: DemoTooltipPayload[];
  label?: string;
}

function DemoTooltip({ active, payload, label }: DemoTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="rounded-lg p-3 shadow-xl text-xs"
      style={{ background: "#1F2937", border: "1px solid #374151" }}
    >
      <p className="font-semibold text-white mb-1">Age {label}</p>
      <p style={{ color: "#9CA3AF" }}>
        Share: <span className="font-bold text-white">{payload[0].value}%</span>
      </p>
    </div>
  );
}

function DemographicChart() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "#111827", border: "1px solid #1F2937" }}
    >
      <div className="mb-4">
        <h2 className="text-base font-bold text-white">Demographic Breakdown</h2>
        <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>
          Age distribution &bull; Q1 2026
        </p>
      </div>
      <div style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={demographicData}
            layout="vertical"
            margin={{ top: 0, right: 30, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" horizontal={false} vertical={true} />
            <XAxis
              type="number"
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="age"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<DemoTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="pct" fill="#1399FF" radius={[0, 4, 4, 0]} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Gender split */}
      <div
        className="mt-4 pt-4 border-t"
        style={{ borderColor: "#1F2937" }}
      >
        <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "#6B7280" }}>
          Gender Split
        </p>
        <div className="flex items-center gap-4">
          {[
            { label: "Male", pct: "67%", color: "#1399FF" },
            { label: "Female", pct: "31%", color: "#FF9900" },
            { label: "Other", pct: "2%", color: "#8B5CF6" },
          ].map((g) => (
            <div key={g.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: g.color }} />
              <span className="text-[11px]" style={{ color: "#9CA3AF" }}>{g.label}</span>
              <span className="text-[12px] font-bold" style={{ color: g.color }}>{g.pct}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Time of Day Distribution (client) ───────────────────────────────────────

interface TimeTooltipPayload {
  value: number;
  payload: { color: string };
}

interface TimeTooltipProps {
  active?: boolean;
  payload?: TimeTooltipPayload[];
  label?: string;
}

function TimeTooltip({ active, payload, label }: TimeTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="rounded-lg p-3 shadow-xl text-xs"
      style={{ background: "#1F2937", border: "1px solid #374151" }}
    >
      <p className="font-semibold text-white mb-1">{label}</p>
      <p style={{ color: "#9CA3AF" }}>
        Sessions: <span className="font-bold text-white">{payload[0].value}%</span>
      </p>
    </div>
  );
}

function TimeDistributionChart() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "#111827", border: "1px solid #1F2937" }}
    >
      <div className="mb-4">
        <h2 className="text-base font-bold text-white">Viewing Time Distribution</h2>
        <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>
          When viewers watch &bull; Q1 2026
        </p>
      </div>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={timeOfDayData} margin={{ top: 5, right: 5, left: -20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" horizontal={true} vertical={false} />
            <XAxis
              dataKey="window"
              tick={{ fill: "#6B7280", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-12}
              textAnchor="end"
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<TimeTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
              {timeOfDayData.map((entry) => (
                <Cell key={entry.window} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ViewershipPage() {
  return (
    <div className="min-h-screen" style={{ background: "#080C14" }}>
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">

        {/* A) Page header row */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Viewership Analytics</h1>
            <p className="text-[12px] mt-1" style={{ color: "#6B7280" }}>
              Deep Dive &middot; Q1 2026
            </p>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-[12px] font-semibold px-3 py-2 rounded-lg transition-colors hover:text-white"
            style={{ color: "#9CA3AF", background: "#111827", border: "1px solid #1F2937" }}
          >
            <ArrowLeft size={14} />
            Back to Overview
          </Link>
        </div>

        {/* B) 3 KPI cards */}
        <div className="grid grid-cols-3 gap-4">
          <KpiCard
            label="Peak Race"
            value="8.2M"
            sub="Daytona 500"
            accent="#1399FF"
          />
          <KpiCard
            label="Total Q1 Viewers"
            value="18.7M"
            sub="All content incl. highlights & replays"
            accent="#FF9900"
          />
          <KpiCard
            label="Completion Rate"
            value="73%"
            sub="+4pp YoY"
            accent="#10B981"
          />
        </div>

        {/* C) Weekly viewership trend */}
        <WeeklyTrendChart />

        {/* D) Device breakdown + Session duration */}
        <div className="grid grid-cols-2 gap-6">
          <DeviceBreakdownChart />
          <SessionDurationChart />
        </div>

        {/* E) Demographics + Time of day */}
        <div className="grid grid-cols-2 gap-6">
          <DemographicChart />
          <TimeDistributionChart />
        </div>

      </main>
    </div>
  );
}
