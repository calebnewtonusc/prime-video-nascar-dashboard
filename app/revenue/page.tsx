"use client";

import Link from "next/link";
import Header from "@/components/Header";
import RevenueChart from "@/components/RevenueChart";
import CompetitorBenchmark from "@/components/CompetitorBenchmark";
import { ArrowLeft, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  PieChart,
  Pie,
} from "recharts";

// ─── Data ───────────────────────────────────────────────────────────────────

const monthlyData = [
  { month: "January", subs: 2.1, ads: 0.6, intl: 0.2 },
  { month: "February", subs: 3.8, ads: 1.2, intl: 0.4 },
  { month: "March (proj)", subs: 2.8, ads: 1.0, intl: 0.5 },
  { month: "Q1 Total", subs: 8.7, ads: 2.8, intl: 1.1 },
];

const revenuePerRace = [
  { race: "Daytona 500", revenue: 3.2, color: "#FF9900" },
  { race: "Phoenix", revenue: 0.9, color: "#1399FF" },
  { race: "Las Vegas", revenue: 0.9, color: "#10B981" },
  { race: "Bristol", revenue: 0.8, color: "#8B5CF6" },
  { race: "COTA", revenue: 0.8, color: "#EC4899" },
  { race: "Atlanta", revenue: 0.7, color: "#F59E0B" },
];

const adBreakdownData = [
  { name: "Daytona 500", value: 1.2, color: "#FF9900" },
  { name: "Las Vegas (proj)", value: 0.4, color: "#1399FF" },
  { name: "Phoenix (proj)", value: 0.4, color: "#10B981" },
  { name: "Other Races", value: 0.8, color: "#8B5CF6" },
  { name: "Non-race Content", value: 0.2, color: "#6B7280" },
];

const waterfallData = [
  { label: "January Base", value: 89, isBase: true, cumulative: 89 },
  { label: "Daytona Surge", value: 186, isPositive: true, cumulative: 275 },
  { label: "Organic Growth", value: 67, isPositive: true, cumulative: 342 },
  { label: "Churn", value: -8, isPositive: false, cumulative: 334 },
  { label: "March Balance", value: 334, isBase: true, cumulative: 334 },
];

const internationalData = [
  { country: "UK", revenue: "$380K", growth: "+89%", flag: "GB" },
  { country: "Brazil", revenue: "$290K", growth: "+112%", flag: "BR" },
  { country: "Canada", revenue: "$180K", growth: "+45%", flag: "CA" },
  { country: "Rest of World", revenue: "$250K", growth: "+51%", flag: "XX" },
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
      <span className="text-[26px] font-black leading-none metric-value" style={{ color: accent }}>
        {value}
      </span>
      <span className="text-[11px]" style={{ color: "#9CA3AF" }}>
        {sub}
      </span>
    </div>
  );
}

// ─── Monthly Revenue Trend (client) ─────────────────────────────────────────

interface MonthlyTooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface MonthlyTooltipProps {
  active?: boolean;
  payload?: MonthlyTooltipPayload[];
  label?: string;
}

function MonthlyTooltip({ active, payload, label }: MonthlyTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const total = payload.reduce((s, p) => s + p.value, 0).toFixed(1);
  return (
    <div
      className="rounded-lg p-3 shadow-xl text-xs"
      style={{ background: "#1F2937", border: "1px solid #374151" }}
    >
      <p className="font-bold text-white mb-1.5">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <span className="font-bold text-white">${p.value}M</span>
        </p>
      ))}
      <div className="border-t mt-1.5 pt-1.5" style={{ borderColor: "#374151" }}>
        <p style={{ color: "#9CA3AF" }}>
          Total: <span className="font-bold text-white">${total}M</span>
        </p>
      </div>
    </div>
  );
}

function MonthlyRevenueTrend() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "#111827", border: "1px solid #1F2937" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-base font-bold text-white">Monthly Revenue by Source</h2>
          <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>
            Jan – Mar 2026 &bull; Grouped by revenue stream
          </p>
        </div>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide"
          style={{ background: "rgba(255,153,0,0.12)", color: "#FF9900", border: "1px solid rgba(255,153,0,0.25)" }}
        >
          Q1 2026
        </span>
      </div>
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}M`}
            />
            <Tooltip content={<MonthlyTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Legend
              wrapperStyle={{ fontSize: 11, color: "#9CA3AF", paddingTop: 12 }}
              formatter={(value) => (
                <span style={{ color: "#9CA3AF" }}>{value}</span>
              )}
            />
            <Bar dataKey="subs" name="Subscriptions" fill="#1399FF" radius={[4, 4, 0, 0]} opacity={0.9} />
            <Bar dataKey="ads" name="Advertising" fill="#FF9900" radius={[4, 4, 0, 0]} opacity={0.9} />
            <Bar dataKey="intl" name="International" fill="#10B981" radius={[4, 4, 0, 0]} opacity={0.9} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Revenue Per Race (client) ───────────────────────────────────────────────

interface RaceTooltipPayload {
  value: number;
  payload: { color: string };
}

interface RaceTooltipProps {
  active?: boolean;
  payload?: RaceTooltipPayload[];
  label?: string;
}

function RaceTooltip({ active, payload, label }: RaceTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div
      className="rounded-lg p-3 shadow-xl text-xs"
      style={{ background: "#1F2937", border: "1px solid #374151" }}
    >
      <p className="font-semibold text-white mb-1">{label}</p>
      <p style={{ color: "#9CA3AF" }}>
        Revenue: <span className="font-bold text-white">${payload[0].value}M</span>
      </p>
    </div>
  );
}

function RevenuePerRaceChart() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "#111827", border: "1px solid #1F2937" }}
    >
      <div className="mb-4">
        <h2 className="text-base font-bold text-white">Revenue per Race</h2>
        <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>
          Sorted by total revenue contribution &bull; Q1 2026
        </p>
      </div>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenuePerRace}
            layout="vertical"
            margin={{ top: 0, right: 40, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" horizontal={false} vertical={true} />
            <XAxis
              type="number"
              tick={{ fill: "#6B7280", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v}M`}
            />
            <YAxis
              type="category"
              dataKey="race"
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={90}
            />
            <Tooltip content={<RaceTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
            <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
              {revenuePerRace.map((entry) => (
                <Cell key={entry.race} fill={entry.color} opacity={0.9} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Subscriber Waterfall (client) ───────────────────────────────────────────

function SubscriberWaterfall() {
  const maxValue = 334;
  const barHeight = 36;
  const chartWidth = 100;

  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "#111827", border: "1px solid #1F2937" }}
    >
      <div className="mb-5">
        <h2 className="text-base font-bold text-white">Subscriber Revenue Waterfall</h2>
        <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>
          Q1 subscriber growth &bull; Jan Base → March Balance
        </p>
      </div>

      <div className="space-y-3">
        {waterfallData.map((item, idx) => {
          const isBase = item.isBase;
          const isPositive = item.isPositive;
          const barColor = isBase ? "#1399FF" : isPositive ? "#10B981" : "#EF4444";
          const barWidth = Math.abs(
            isBase ? (item.value / maxValue) * chartWidth : (item.value / maxValue) * chartWidth
          );
          const displayValue = isBase ? item.value : Math.abs(item.value);

          return (
            <div key={idx} className="flex items-center gap-3">
              <div className="text-[11px] w-28 flex-shrink-0 text-right pr-2" style={{ color: "#9CA3AF" }}>
                {item.label}
              </div>
              <div className="flex-1 relative" style={{ height: barHeight }}>
                {/* Background track */}
                <div
                  className="absolute inset-y-0 left-0 right-0 rounded-md"
                  style={{ background: "#0D1117" }}
                />
                {/* Bar fill */}
                <div
                  className="absolute inset-y-0 left-0 rounded-md flex items-center justify-end pr-2 transition-all"
                  style={{
                    width: `${barWidth}%`,
                    background: barColor,
                    opacity: 0.85,
                  }}
                />
                {/* Value label */}
                <div
                  className="absolute inset-y-0 flex items-center pl-2"
                  style={{ left: `${barWidth}%` }}
                >
                  <span
                    className="text-[11px] font-bold ml-1 metric-value"
                    style={{ color: barColor }}
                  >
                    {isPositive === false ? "-" : isBase ? "" : "+"}
                    {displayValue}K
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mt-5 pt-4 border-t grid grid-cols-3 gap-3"
        style={{ borderColor: "#1F2937" }}
      >
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "#6B7280" }}>Jan Base</p>
          <p className="text-[16px] font-black metric-value" style={{ color: "#1399FF" }}>89K</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "#6B7280" }}>Net Added</p>
          <p className="text-[16px] font-black metric-value" style={{ color: "#10B981" }}>+245K</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "#6B7280" }}>March Balance</p>
          <p className="text-[16px] font-black metric-value" style={{ color: "#FF9900" }}>334K</p>
        </div>
      </div>
    </div>
  );
}

// ─── Ad Revenue Breakdown (client) ───────────────────────────────────────────

interface AdTooltipPayload {
  name: string;
  value: number;
  payload: { color: string };
}

interface AdTooltipProps {
  active?: boolean;
  payload?: AdTooltipPayload[];
}

function AdTooltip({ active, payload }: AdTooltipProps) {
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
        Revenue: <span className="font-bold text-white">${item.value}M</span>
      </p>
    </div>
  );
}

function AdRevenueChart() {
  const total = adBreakdownData.reduce((s, d) => s + d.value, 0).toFixed(1);

  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "#111827", border: "1px solid #1F2937" }}
    >
      <div className="mb-4">
        <h2 className="text-base font-bold text-white">Ad Revenue Breakdown</h2>
        <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>
          By race event &bull; Q1 2026
        </p>
      </div>
      <div className="relative" style={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={adBreakdownData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
              startAngle={90}
              endAngle={-270}
            >
              {adBreakdownData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} opacity={0.9} />
              ))}
            </Pie>
            <Tooltip content={<AdTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[22px] font-black metric-value" style={{ color: "#F9FAFB", lineHeight: 1 }}>
            ${total}M
          </span>
          <span className="text-[10px] mt-1" style={{ color: "#6B7280" }}>
            Ad Revenue
          </span>
        </div>
      </div>
      <div className="space-y-2 mt-3">
        {adBreakdownData.map((item) => (
          <div key={item.name} className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <span className="text-[11px] flex-1 truncate" style={{ color: "#9CA3AF" }}>{item.name}</span>
            <span className="text-[12px] font-bold text-white metric-value">${item.value}M</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── International Revenue Cards ─────────────────────────────────────────────

function InternationalRevenue() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: "#111827", border: "1px solid #1F2937" }}
    >
      <div className="mb-4">
        <h2 className="text-base font-bold text-white">International Revenue Growth</h2>
        <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>
          YoY growth by region &bull; Q1 2026
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {internationalData.map((item) => {
          const growth = parseFloat(item.growth.replace("+", "").replace("%", ""));
          const isHigh = growth >= 100;

          return (
            <div
              key={item.country}
              className="rounded-lg p-4"
              style={{ background: "#080C14", border: "1px solid #1F2937" }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[13px] font-bold text-white">{item.country}</span>
                <span
                  className="text-[10px] font-black px-2 py-0.5 rounded"
                  style={{
                    background: isHigh ? "rgba(16,185,129,0.15)" : "rgba(19,153,255,0.12)",
                    color: isHigh ? "#10B981" : "#1399FF",
                    border: `1px solid ${isHigh ? "rgba(16,185,129,0.3)" : "rgba(19,153,255,0.25)"}`,
                  }}
                >
                  {item.growth} YoY
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-[20px] font-black metric-value" style={{ color: "#F9FAFB" }}>
                  {item.revenue}
                </span>
                <TrendingUp size={14} style={{ color: "#10B981", marginBottom: 3 }} />
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mt-4 pt-4 border-t rounded-lg p-3"
        style={{ borderColor: "#1F2937", background: "rgba(19,153,255,0.05)", border: "1px solid rgba(19,153,255,0.15)" }}
      >
        <p className="text-[11px] font-semibold" style={{ color: "#1399FF" }}>
          Opportunity Signal
        </p>
        <p className="text-[10px] mt-0.5" style={{ color: "#6B7280" }}>
          Brazil +112% and high Spanish/Portuguese-speaking viewership suggests a significant opportunity for localized commentary and content.
        </p>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function RevenuePage() {
  return (
    <div className="min-h-screen" style={{ background: "#080C14" }}>
      <Header />
      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">

        {/* A) Page header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Revenue Analytics</h1>
            <p className="text-[12px] mt-1" style={{ color: "#6B7280" }}>
              Q1 2026 &middot; All Sources
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

        {/* B) 4 KPI cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <KpiCard
            label="Q1 Revenue"
            value="$12.8M"
            sub="+18% YoY"
            accent="#10B981"
          />
          <KpiCard
            label="Prime Sub Revenue"
            value="$8.7M"
            sub="68% of total"
            accent="#1399FF"
          />
          <KpiCard
            label="Ad Revenue"
            value="$2.8M"
            sub="+31% YoY"
            accent="#FF9900"
          />
          <KpiCard
            label="ARPU"
            value="$37.50"
            sub="Per new subscriber"
            accent="#8B5CF6"
          />
        </div>

        {/* C) Revenue overview charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart />
          <CompetitorBenchmark />
        </div>

        {/* D) Monthly revenue trend */}
        <MonthlyRevenueTrend />

        {/* E) Revenue per race + Subscriber waterfall */}
        <div className="grid grid-cols-2 gap-6">
          <RevenuePerRaceChart />
          <SubscriberWaterfall />
        </div>

        {/* F) Ad revenue breakdown + International growth */}
        <div className="grid grid-cols-2 gap-6">
          <AdRevenueChart />
          <InternationalRevenue />
        </div>

      </main>
    </div>
  );
}
