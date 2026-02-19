"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import MarketingTracker from "@/components/MarketingTracker";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────

type SortField = "cpa" | "roas" | "budget" | "impressions" | "conv" | "none";
type SortDir = "asc" | "desc";
type CampaignStatus = "COMPLETED" | "ACTIVE";

interface Campaign {
  name: string;
  channel: string;
  channelKey: string;
  budget: number;
  impressions: string;
  impressionsRaw: number;
  clicks: string;
  conv: number;
  cpa: number;
  roas: number;
  status: CampaignStatus;
  isBest?: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CAMPAIGNS: Campaign[] = [
  {
    name: "Daytona Takeover",
    channel: "Social",
    channelKey: "S",
    budget: 280,
    impressions: "48M",
    impressionsRaw: 48,
    clicks: "890K",
    conv: 62,
    cpa: 4.52,
    roas: 8.2,
    status: "COMPLETED",
  },
  {
    name: "NASCAR Everywhere",
    channel: "Programmatic",
    channelKey: "P",
    budget: 195,
    impressions: "82M",
    impressionsRaw: 82,
    clicks: "420K",
    conv: 28,
    cpa: 6.96,
    roas: 5.8,
    status: "ACTIVE",
  },
  {
    name: "Speed & Drama",
    channel: "TV Spots",
    channelKey: "T",
    budget: 440,
    impressions: "28M",
    impressionsRaw: 28,
    clicks: "—",
    conv: 41,
    cpa: 10.73,
    roas: 4.1,
    status: "COMPLETED",
  },
  {
    name: "Driver Fanbase",
    channel: "Influencer",
    channelKey: "I",
    budget: 120,
    impressions: "18M",
    impressionsRaw: 18,
    clicks: "1.2M",
    conv: 31,
    cpa: 3.87,
    roas: 9.4,
    status: "ACTIVE",
  },
  {
    name: "Race Day Email",
    channel: "Email",
    channelKey: "E",
    budget: 18,
    impressions: "8.4M",
    impressionsRaw: 8.4,
    clicks: "980K",
    conv: 48,
    cpa: 0.38,
    roas: 31.2,
    status: "ACTIVE",
    isBest: true,
  },
];

const CHANNEL_MIX = [
  { name: "TV Spots", value: 41.8, color: "#1399FF" },
  { name: "Social", value: 26.6, color: "#FF9900" },
  { name: "Programmatic", value: 18.5, color: "#10B981" },
  { name: "Influencer", value: 11.4, color: "#F59E0B" },
  { name: "Email", value: 1.7, color: "#8B5CF6" },
];

const ROAS_BY_CHANNEL = [
  { channel: "TV", roas: 4.1 },
  { channel: "Programmatic", roas: 5.8 },
  { channel: "Social", roas: 8.2 },
  { channel: "Influencer", roas: 9.4 },
  { channel: "Email", roas: 31.2 },
];

const RECOMMENDATIONS = [
  {
    number: "01",
    title: "Reallocate TV Budget",
    body: "Shift $220K from TV Spots to Email + Influencer for estimated +960K conversions at same spend.",
    accentColor: "#1399FF",
  },
  {
    number: "02",
    title: "Scale Race Day Email",
    body: "31.2\u00d7 ROAS at $0.38 CPA — increase list size to 12M with NASCAR fan acquisition from Daytona 500 data.",
    accentColor: "#10B981",
  },
  {
    number: "03",
    title: "Double Influencer for COTA & Phoenix",
    body: "Driver Fanbase outperformed by 2.3\u00d7 vs programmatic — book early for March races.",
    accentColor: "#FF9900",
  },
];

const MAX_ROAS = 31.2;
const TOTAL_BUDGET = CAMPAIGNS.reduce((s, c) => s + c.budget, 0);
const TOTAL_CONV = CAMPAIGNS.reduce((s, c) => s + c.conv, 0);
const BLENDED_CPA = (TOTAL_BUDGET * 1000) / (TOTAL_CONV * 1000);

const STATUS_STYLE: Record<CampaignStatus, { bg: string; text: string }> = {
  COMPLETED: { bg: "rgba(16,185,129,0.12)", text: "#10B981" },
  ACTIVE: { bg: "rgba(19,153,255,0.12)", text: "#1399FF" },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: "#111827", border: "1px solid #1F2937" }}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-wider mb-2"
        style={{ color: "#6B7280" }}
      >
        {label}
      </p>
      <p className="text-2xl font-black leading-none" style={{ color }}>
        {value}
      </p>
      <p className="text-[11px] mt-1.5" style={{ color: "#4B5563" }}>
        {sub}
      </p>
    </div>
  );
}

function RoasBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min((value / max) * 100, 100);
  const color =
    pct >= 80
      ? "#10B981"
      : pct >= 50
      ? "#FF9900"
      : pct >= 25
      ? "#F59E0B"
      : "#6B7280";
  return (
    <div className="flex items-center gap-2 min-w-[130px]">
      <span
        className="text-sm font-bold tabular-nums"
        style={{ color, minWidth: "42px" }}
      >
        {value}\u00d7
      </span>
      <div
        className="flex-1 h-1.5 rounded-full overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            backgroundColor: color,
            boxShadow: `0 0 5px ${color}70`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Sortable Campaign Table (client component) ───────────────────────────────

function CampaignTable() {
  const [sortField, setSortField] = useState<SortField>("none");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [search, setSearch] = useState("");

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  const filtered = useMemo(() => {
    let rows = [...CAMPAIGNS];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.channel.toLowerCase().includes(q)
      );
    }
    if (sortField !== "none") {
      rows.sort((a, b) => {
        const av =
          sortField === "cpa"
            ? a.cpa
            : sortField === "roas"
            ? a.roas
            : sortField === "budget"
            ? a.budget
            : sortField === "conv"
            ? a.conv
            : a.impressionsRaw;
        const bv =
          sortField === "cpa"
            ? b.cpa
            : sortField === "roas"
            ? b.roas
            : sortField === "budget"
            ? b.budget
            : sortField === "conv"
            ? b.conv
            : b.impressionsRaw;
        return sortDir === "asc" ? av - bv : bv - av;
      });
    }
    return rows;
  }, [sortField, sortDir, search]);

  function exportCSV() {
    const headers = [
      "Campaign",
      "Channel",
      "Budget ($K)",
      "Impressions",
      "Clicks",
      "Conversions (K)",
      "CPA ($)",
      "ROAS (x)",
      "Status",
    ];
    const rows = CAMPAIGNS.map((c) => [
      c.name,
      c.channel,
      c.budget,
      c.impressions,
      c.clicks,
      c.conv,
      c.cpa,
      c.roas,
      c.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nascar-q1-2026-campaigns.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  type ColDef = {
    key: string;
    label: string;
    sortable: SortField;
    align?: string;
  };

  const COLS: ColDef[] = [
    { key: "campaign", label: "Campaign", sortable: "none" },
    { key: "channel", label: "Channel", sortable: "none" },
    { key: "budget", label: "Budget", sortable: "budget" },
    { key: "impressions", label: "Impressions", sortable: "impressions" },
    { key: "clicks", label: "Clicks", sortable: "none" },
    { key: "conv", label: "Conv.", sortable: "conv" },
    { key: "cpa", label: "CPA", sortable: "cpa" },
    { key: "roas", label: "ROAS", sortable: "roas" },
    { key: "status", label: "Status", sortable: "none" },
  ];

  function SortIcon({ field }: { field: SortField }) {
    if (field === "none") {
      return (
        <svg
          className="w-3 h-3 opacity-25"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16V4m0 0L3 8m4-4l4 4m6 8v-8m0 8l4-4m-4 4l-4-4"
          />
        </svg>
      );
    }
    const isActive = sortField === field;
    const isAsc = isActive && sortDir === "asc";
    return (
      <svg
        className="w-3 h-3 transition-opacity"
        style={{ opacity: isActive ? 1 : 0.35, color: isActive ? "#1399FF" : "currentColor" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {isAsc ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        )}
      </svg>
    );
  }

  return (
    <div
      className="rounded-xl p-6"
      style={{ backgroundColor: "#111827", border: "1px solid #1F2937" }}
    >
      {/* Table header row */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <div>
          <h2 className="text-base font-bold" style={{ color: "#F9FAFB" }}>
            Campaign Performance
          </h2>
          <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>
            Q1 2026 · All campaigns · Click columns to sort
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg px-3 py-1.5 text-xs outline-none placeholder-[#4B5563] transition-colors"
            style={{
              backgroundColor: "#0D1117",
              border: "1px solid #1F2937",
              color: "#F9FAFB",
              width: "180px",
            }}
          />
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:opacity-80"
            style={{
              backgroundColor: "rgba(19,153,255,0.12)",
              border: "1px solid rgba(19,153,255,0.3)",
              color: "#1399FF",
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid #1F2937" }}>
              {COLS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== "none" && handleSort(col.sortable)}
                  className="py-3 px-3 text-left text-[10px] font-semibold uppercase tracking-wider select-none"
                  style={{
                    color: sortField === col.sortable && col.sortable !== "none" ? "#1399FF" : "#6B7280",
                    cursor: col.sortable !== "none" ? "pointer" : "default",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    <SortIcon field={col.sortable} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const ss = STATUS_STYLE[c.status];
              return (
                <tr
                  key={c.name}
                  style={{
                    borderBottom:
                      i < filtered.length - 1 ? "1px solid #1F2937" : undefined,
                    backgroundColor: c.isBest
                      ? "rgba(245,158,11,0.05)"
                      : "transparent",
                  }}
                >
                  {/* Campaign */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      {c.isBest && (
                        <span
                          className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
                          style={{
                            backgroundColor: "rgba(245,158,11,0.18)",
                            color: "#F59E0B",
                            border: "1px solid rgba(245,158,11,0.35)",
                          }}
                        >
                          Best
                        </span>
                      )}
                      <span className="font-semibold" style={{ color: "#F9FAFB" }}>
                        {c.name}
                      </span>
                    </div>
                  </td>

                  {/* Channel */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <span
                        className="inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-bold"
                        style={{
                          backgroundColor: "#1F2937",
                          color: "#9CA3AF",
                        }}
                      >
                        {c.channelKey}
                      </span>
                      <span className="text-xs" style={{ color: "#9CA3AF" }}>
                        {c.channel}
                      </span>
                    </div>
                  </td>

                  {/* Budget */}
                  <td className="py-3 px-3 font-medium whitespace-nowrap" style={{ color: "#F9FAFB" }}>
                    ${c.budget}K
                  </td>

                  {/* Impressions */}
                  <td className="py-3 px-3 whitespace-nowrap" style={{ color: "#9CA3AF" }}>
                    {c.impressions}
                  </td>

                  {/* Clicks */}
                  <td className="py-3 px-3 whitespace-nowrap" style={{ color: "#9CA3AF" }}>
                    {c.clicks}
                  </td>

                  {/* Conv. */}
                  <td className="py-3 px-3 font-medium whitespace-nowrap" style={{ color: "#F9FAFB" }}>
                    {c.conv}K
                  </td>

                  {/* CPA */}
                  <td
                    className="py-3 px-3 font-semibold whitespace-nowrap"
                    style={{
                      color:
                        c.cpa <= 1
                          ? "#10B981"
                          : c.cpa <= 5
                          ? "#FF9900"
                          : "#9CA3AF",
                    }}
                  >
                    ${c.cpa.toFixed(2)}
                  </td>

                  {/* ROAS */}
                  <td className="py-3 px-3">
                    <RoasBar value={c.roas} max={MAX_ROAS} />
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                      style={{ backgroundColor: ss.bg, color: ss.text }}
                    >
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full${c.status === "ACTIVE" ? " animate-pulse" : ""}`}
                        style={{ backgroundColor: ss.text }}
                      />
                      {c.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div
        className="mt-4 pt-3 flex items-center justify-between"
        style={{ borderTop: "1px solid #1F2937" }}
      >
        <p className="text-[11px]" style={{ color: "#6B7280" }}>
          Showing {filtered.length} of {CAMPAIGNS.length} campaigns
          {search && (
            <span
              className="ml-2 cursor-pointer underline underline-offset-2"
              style={{ color: "#1399FF" }}
              onClick={() => setSearch("")}
            >
              Clear filter
            </span>
          )}
        </p>
        <p className="text-[10px]" style={{ color: "#4B5563" }}>
          Data as of Feb 18, 2026 · Conversions = paid subscriptions (30-day attribution)
        </p>
      </div>
    </div>
  );
}

// ─── Channel Mix Donut ────────────────────────────────────────────────────────

function ChannelMixChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div
      className="rounded-xl p-6 h-full"
      style={{ backgroundColor: "#111827", border: "1px solid #1F2937" }}
    >
      <h3 className="text-sm font-bold mb-1" style={{ color: "#F9FAFB" }}>
        Channel Mix
      </h3>
      <p className="text-[11px] mb-4" style={{ color: "#6B7280" }}>
        Budget allocation by channel
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Donut */}
        <div className="relative flex-shrink-0" style={{ width: 200, height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CHANNEL_MIX}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {CHANNEL_MIX.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                    opacity={
                      activeIndex === null || activeIndex === index ? 1 : 0.45
                    }
                    stroke="transparent"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                  fontSize: "11px",
                }}
                formatter={(value: number) => [`${value}%`, "Share"]}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <span className="text-[13px] font-black" style={{ color: "#F9FAFB" }}>
              $1.05M
            </span>
            <span className="text-[9px] uppercase tracking-wider mt-0.5" style={{ color: "#6B7280" }}>
              Total
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 flex-1 w-full">
          {CHANNEL_MIX.map((item, i) => (
            <div
              key={item.name}
              className="flex items-center justify-between gap-3 cursor-default"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span
                  className="text-xs"
                  style={{
                    color: activeIndex === i ? "#F9FAFB" : "#9CA3AF",
                    transition: "color 0.15s",
                  }}
                >
                  {item.name}
                </span>
              </div>
              <span
                className="text-xs font-bold tabular-nums"
                style={{ color: item.color }}
              >
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ROAS by Channel Bar Chart ────────────────────────────────────────────────

function RoasByChannelChart() {
  return (
    <div
      className="rounded-xl p-6 h-full"
      style={{ backgroundColor: "#111827", border: "1px solid #1F2937" }}
    >
      <h3 className="text-sm font-bold mb-1" style={{ color: "#F9FAFB" }}>
        ROAS by Channel
      </h3>
      <p className="text-[11px] mb-4" style={{ color: "#6B7280" }}>
        Return on ad spend ranking · Avg 11.7\u00d7
      </p>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={ROAS_BY_CHANNEL}
          layout="vertical"
          margin={{ top: 0, right: 48, bottom: 0, left: 0 }}
        >
          <XAxis
            type="number"
            domain={[0, 35]}
            tick={{ fill: "#6B7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}\u00d7`}
          />
          <YAxis
            type="category"
            dataKey="channel"
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={88}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F9FAFB",
              fontSize: "11px",
            }}
            formatter={(value: number) => [`${value}\u00d7`, "ROAS"]}
          />
          <ReferenceLine
            x={11.7}
            stroke="#FF9900"
            strokeDasharray="4 3"
            strokeOpacity={0.6}
            label={{
              value: "Avg 11.7\u00d7",
              position: "insideTopRight",
              fill: "#FF9900",
              fontSize: 9,
              dy: -4,
            }}
          />
          <Bar dataKey="roas" radius={[0, 4, 4, 0]}>
            {ROAS_BY_CHANNEL.map((entry, index) => {
              const intensity = (index + 1) / ROAS_BY_CHANNEL.length;
              const r = Math.round(19 + intensity * (19 - 19));
              const g = Math.round(153 * intensity);
              const b = Math.round(255 * intensity);
              return (
                <Cell
                  key={entry.channel}
                  fill={`rgba(19,${Math.round(50 + intensity * 103)},255,${0.55 + intensity * 0.45})`}
                />
              );
            })}
            <LabelList
              dataKey="roas"
              position="right"
              formatter={(v: number) => `${v}\u00d7`}
              style={{ fill: "#9CA3AF", fontSize: 10 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Recommendations Card ─────────────────────────────────────────────────────

function RecommendationsCard() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ backgroundColor: "#111827", border: "1px solid #1F2937" }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: "rgba(19,153,255,0.12)",
            border: "1px solid rgba(19,153,255,0.25)",
          }}
        >
          <svg className="w-3.5 h-3.5" style={{ color: "#1399FF" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-bold" style={{ color: "#F9FAFB" }}>
            Strategic Recommendations
          </h3>
          <p className="text-[10px]" style={{ color: "#6B7280" }}>
            Based on Q1 2026 campaign performance analysis
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {RECOMMENDATIONS.map((rec) => (
          <div
            key={rec.number}
            className="rounded-lg p-4"
            style={{
              backgroundColor: "#0D1117",
              border: `1px solid ${rec.accentColor}30`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-[10px] font-black tabular-nums"
                style={{ color: rec.accentColor }}
              >
                {rec.number}
              </span>
              <div className="h-px flex-1" style={{ backgroundColor: `${rec.accentColor}25` }} />
            </div>
            <p
              className="text-xs font-bold mb-1.5 leading-snug"
              style={{ color: "#F9FAFB" }}
            >
              {rec.title}
            </p>
            <p className="text-[11px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              {rec.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page (default export) ───────────────────────────────────────────────────

export default function MarketingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#080C14" }}>
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        {/* Page title */}
        <div>
          <h1 className="text-xl font-black tracking-tight" style={{ color: "#F9FAFB" }}>
            Marketing Campaign Tracker
          </h1>
          <p className="text-[12px] mt-1" style={{ color: "#6B7280" }}>
            Q1 2026 NASCAR Go-To-Market &middot; All campaigns &middot; Feb 18, 2026
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Total Spend"
            value="$1.053M"
            sub="5 campaigns"
            color="#1399FF"
          />
          <KpiCard
            label="Total Conversions"
            value="210K"
            sub="subscribers acquired"
            color="#10B981"
          />
          <KpiCard
            label="Blended CPA"
            value="$5.01"
            sub="average across all channels"
            color="#FF9900"
          />
          <KpiCard
            label="Best ROAS"
            value="31.2\u00d7"
            sub="Race Day Email"
            color="#F59E0B"
          />
        </div>

        {/* Full campaign attribution tracker */}
        <MarketingTracker />

        {/* Sortable table */}
        <CampaignTable />

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChannelMixChart />
          <RoasByChannelChart />
        </div>

        {/* Recommendations */}
        <RecommendationsCard />

        <footer className="text-center py-6 border-t" style={{ borderColor: "#1F2937" }}>
          <p className="text-[11px]" style={{ color: "#4B5563" }}>
            Amazon Prime Video &middot; NASCAR Cup Series Marketing Analytics &middot; Q1 2026 &middot;{" "}
            <span style={{ color: "#374151" }}>CONFIDENTIAL</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
