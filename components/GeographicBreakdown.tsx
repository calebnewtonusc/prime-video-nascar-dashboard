"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const regions = [
  { region: "Southeast", viewers: 4820, growth: 28, color: "#1399FF" },
  { region: "South Central", viewers: 3640, growth: 31, color: "#FF9900" },
  { region: "Midwest", viewers: 2890, growth: 19, color: "#10B981" },
  { region: "Mountain West", viewers: 2140, growth: 24, color: "#8B5CF6" },
  { region: "Pacific West", viewers: 1820, growth: 15, color: "#EC4899" },
  { region: "Northeast", viewers: 1560, growth: 12, color: "#F59E0B" },
  { region: "International", viewers: 890, growth: 67, color: "#06B6D4" },
];

interface TooltipPayload {
  value: number;
  payload: {
    region: string;
    viewers: number;
    growth: number;
    color: string;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0].payload;

  return (
    <div
      className="rounded-lg p-3 shadow-xl"
      style={{ backgroundColor: "#1A1F2E", border: "1px solid #252D3D" }}
    >
      <p className="text-sm font-semibold text-[#F9FAFB] mb-2">{d.region}</p>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-6">
          <span className="text-xs text-[#9CA3AF]">Viewers</span>
          <span className="text-xs font-bold text-[#F9FAFB]">
            {d.viewers.toLocaleString()}K
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="text-xs text-[#9CA3AF]">YoY Growth</span>
          <span
            className="text-xs font-bold"
            style={{ color: d.growth >= 50 ? "#10B981" : d.growth >= 25 ? "#FF9900" : "#1399FF" }}
          >
            +{d.growth}%
          </span>
        </div>
      </div>
    </div>
  );
}

interface GrowthLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
  index?: number;
}

function GrowthLabel({ x, y, width, value, index }: GrowthLabelProps) {
  if (x === undefined || y === undefined || width === undefined || value === undefined || index === undefined) return null;
  const region = regions[index];
  if (!region) return null;

  const isHighGrowth = region.growth >= 50;
  const bgColor = isHighGrowth ? "#10B981" : region.growth >= 25 ? "#FF9900" : "#1399FF";

  return (
    <g>
      <rect
        x={x + width / 2 - 20}
        y={y - 22}
        width={40}
        height={18}
        rx={4}
        fill={bgColor}
        opacity={0.9}
      />
      <text
        x={x + width / 2}
        y={y - 9}
        textAnchor="middle"
        fill="#ffffff"
        fontSize={10}
        fontWeight={700}
      >
        +{region.growth}%
      </text>
    </g>
  );
}

export default function GeographicBreakdown() {
  const totalViewers = regions.reduce((sum, r) => sum + r.viewers, 0);

  return (
    <div
      className="rounded-xl p-6"
      style={{ backgroundColor: "#1A1F2E", border: "1px solid #252D3D" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-[#F9FAFB] leading-tight">
            Viewership by Region
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-1">
            Q1 2026 &bull; Thousands of Viewers
          </p>
        </div>
        <div
          className="px-3 py-1.5 rounded-lg text-right"
          style={{ backgroundColor: "#0F1117", border: "1px solid #252D3D" }}
        >
          <p className="text-[10px] text-[#9CA3AF]">Total</p>
          <p className="text-sm font-bold text-[#F9FAFB]">
            {totalViewers.toLocaleString()}K
          </p>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={regions}
            margin={{ top: 30, right: 16, left: 0, bottom: 4 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#252D3D"
            />
            <XAxis
              dataKey="region"
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v.toLocaleString()}`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="viewers" radius={[4, 4, 0, 0]} maxBarSize={52}>
              {regions.map((r) => (
                <Cell key={r.region} fill={r.color} />
              ))}
              <LabelList content={<GrowthLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend strip */}
      <div
        className="mt-4 pt-4 flex flex-wrap gap-2"
        style={{ borderTop: "1px solid #252D3D" }}
      >
        {regions.map((r) => (
          <div key={r.region} className="flex items-center gap-1.5">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: r.color }}
            />
            <span className="text-[11px] text-[#9CA3AF]">{r.region}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1.5">
          <span
            className="inline-block w-2 h-2 rounded-sm"
            style={{ backgroundColor: "#10B981" }}
          />
          <span className="text-[11px] text-[#9CA3AF]">50%+ growth</span>
          <span
            className="inline-block w-2 h-2 rounded-sm ml-2"
            style={{ backgroundColor: "#FF9900" }}
          />
          <span className="text-[11px] text-[#9CA3AF]">25-49%</span>
          <span
            className="inline-block w-2 h-2 rounded-sm ml-2"
            style={{ backgroundColor: "#1399FF" }}
          />
          <span className="text-[11px] text-[#9CA3AF]">&lt;25%</span>
        </div>
      </div>
    </div>
  );
}
