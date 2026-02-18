"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { name: "Prime Subscriptions", value: 8.7, pct: 68, color: "#1399FF" },
  { name: "Advertising", value: 2.8, pct: 22, color: "#FF9900" },
  { name: "International", value: 1.1, pct: 9, color: "#10B981" },
  { name: "Merchandise", value: 0.2, pct: 1, color: "#8B5CF6" },
];

const momMetrics = [
  { label: "Prime Subs", delta: "+$0.8M", positive: true },
  { label: "Advertising", delta: "+$0.3M", positive: true },
  { label: "International", delta: "+$0.1M", positive: true },
  { label: "Merchandise", delta: "-$0.02M", positive: false },
];

interface TooltipPayloadItem {
  name: string;
  value: number;
  payload: { pct: number; color: string };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div style={{ background: "#1F2937", border: "1px solid #374151" }} className="rounded-lg p-3 shadow-xl">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.payload.color }} />
        <span className="font-semibold text-white text-xs">{item.name}</span>
      </div>
      <p className="text-gray-300 text-xs">Revenue: <span className="text-white font-bold">${item.value}M</span></p>
      <p className="text-gray-300 text-xs">Share: <span className="text-white font-bold">{item.payload.pct}%</span></p>
    </div>
  );
}

export default function RevenueChart() {
  const total = revenueData.reduce((s, d) => s + d.value, 0).toFixed(1);

  return (
    <div style={{ background: "#111827", border: "1px solid #1F2937" }} className="rounded-xl p-6 w-full h-full">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Revenue Breakdown</h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide" style={{ background: "rgba(255,153,0,0.12)", color: "#FF9900", border: "1px solid rgba(255,153,0,0.25)" }}>Q1 2026</span>
        </div>
        <p className="text-[11px] mt-0.5" style={{ color: "#6B7280" }}>All revenue sources &bull; Feb &ndash; Mar</p>
      </div>

      {/* Donut with absolute center text overlay — recharts does not support SVG children for center labels */}
      <div className="relative" style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={revenueData}
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
              startAngle={90}
              endAngle={-270}
            >
              {revenueData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} opacity={0.9} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[26px] font-black metric-value" style={{ color: "#F9FAFB", lineHeight: 1 }}>${total}M</span>
          <span className="text-[11px] mt-1" style={{ color: "#6B7280" }}>Total Revenue</span>
        </div>
      </div>

      <div className="space-y-2 mt-2">
        {revenueData.map((item) => (
          <div key={item.name} className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <span className="text-[11px] flex-1 truncate" style={{ color: "#9CA3AF" }}>{item.name}</span>
            <span className="text-[12px] font-bold text-white metric-value">${item.value}M</span>
            <span className="text-[10px] font-semibold w-8 text-right" style={{ color: item.color }}>{item.pct}%</span>
          </div>
        ))}
      </div>

      <div className="border-t mt-4 pt-4" style={{ borderColor: "#1F2937" }}>
        <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: "#6B7280" }}>MoM vs January</p>
        <div className="grid grid-cols-2 gap-1.5">
          {momMetrics.map((m) => (
            <div key={m.label} className="flex items-center justify-between px-2.5 py-1.5 rounded-lg" style={{ background: "#080C14" }}>
              <span className="text-[10px]" style={{ color: "#6B7280" }}>{m.label}</span>
              <span className="text-[11px] font-bold metric-value" style={{ color: m.positive ? "#10B981" : "#EF4444" }}>{m.delta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
