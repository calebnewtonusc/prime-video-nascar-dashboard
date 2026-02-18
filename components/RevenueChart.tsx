"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { name: "Prime Subscriptions", value: 8.7, pct: 68, color: "#1399FF" },
  { name: "Advertising", value: 2.8, pct: 22, color: "#FF9900" },
  { name: "International", value: 1.1, pct: 9, color: "#10B981" },
  { name: "Merchandise", value: 0.2, pct: 1, color: "#8B5CF6" },
];

const momMetrics = [
  { label: "vs Jan (Prime Subs)", delta: "+$0.8M", positive: true },
  { label: "vs Jan (Advertising)", delta: "+$0.3M", positive: true },
  { label: "vs Jan (International)", delta: "+$0.1M", positive: true },
  { label: "vs Jan (Merchandise)", delta: "-$0.02M", positive: false },
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
    <div
      style={{ background: "#252D3D", border: "1px solid #374151" }}
      className="rounded-lg p-3 text-sm shadow-xl"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.payload.color }} />
        <span className="font-semibold text-white">{item.name}</span>
      </div>
      <p className="text-gray-300">
        Revenue: <span className="text-white font-bold">${item.value}M</span>
      </p>
      <p className="text-gray-300">
        Share: <span className="text-white font-bold">{item.payload.pct}%</span>
      </p>
    </div>
  );
}

interface CenterLabelProps {
  cx?: number;
  cy?: number;
}

function CenterLabel({ cx = 0, cy = 0 }: CenterLabelProps) {
  return (
    <>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#F9FAFB" fontSize={22} fontWeight={700}>
        $12.8M
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#9CA3AF" fontSize={12}>
        Total Revenue
      </text>
    </>
  );
}

export default function RevenueChart() {
  const total = revenueData.reduce((s, d) => s + d.value, 0).toFixed(1);

  return (
    <div
      style={{ background: "#1A1F2E", border: "1px solid #252D3D" }}
      className="rounded-xl p-6 w-full"
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-white">Revenue Breakdown</h2>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ background: "#FF990022", color: "#FF9900", border: "1px solid #FF990044" }}
          >
            Q1 2026
          </span>
        </div>
        <p className="text-sm text-gray-400 mt-0.5">Q1 2026 &bull; All Sources</p>
      </div>

      {/* Donut chart */}
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={revenueData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {revenueData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <CenterLabel cx={undefined} cy={undefined} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-1">
        {revenueData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <span className="text-xs text-gray-400 truncate">{item.name}</span>
            <span className="ml-auto text-xs font-semibold text-white">{item.pct}%</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t mt-4 mb-4" style={{ borderColor: "#252D3D" }} />

      {/* MoM growth metrics */}
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Month-over-Month vs January</p>
        <div className="grid grid-cols-2 gap-2">
          {momMetrics.map((m) => (
            <div
              key={m.label}
              className="flex items-center justify-between px-3 py-2 rounded-lg"
              style={{ background: "#0F1117" }}
            >
              <span className="text-xs text-gray-400 truncate pr-2">{m.label}</span>
              <span
                className="text-xs font-bold flex-shrink-0"
                style={{ color: m.positive ? "#10B981" : "#EF4444" }}
              >
                {m.delta}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer total */}
      <div
        className="mt-4 flex items-center justify-between px-4 py-3 rounded-lg"
        style={{ background: "#0F1117", border: "1px solid #252D3D" }}
      >
        <span className="text-sm text-gray-400 font-medium">Q1 2026 Total</span>
        <span className="text-lg font-bold" style={{ color: "#1399FF" }}>
          ${total}M
        </span>
      </div>
    </div>
  );
}
