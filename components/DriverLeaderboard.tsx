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
} from "recharts";

const drivers = [
  { name: "Chase Elliott", number: "9", viewers: 2840, color: "#1399FF" },
  { name: "Kyle Larson", number: "5", viewers: 2610, color: "#FF9900" },
  { name: "Denny Hamlin", number: "11", viewers: 2380, color: "#10B981" },
  { name: "Ross Chastain", number: "1", viewers: 2150, color: "#8B5CF6" },
  { name: "Ryan Blaney", number: "12", viewers: 1990, color: "#EC4899" },
  { name: "Christopher Bell", number: "20", viewers: 1820, color: "#F59E0B" },
  { name: "William Byron", number: "24", viewers: 1680, color: "#06B6D4" },
  { name: "Martin Truex Jr", number: "19", viewers: 1520, color: "#84CC16" },
  { name: "Tyler Reddick", number: "45", viewers: 1380, color: "#F97316" },
  { name: "Alex Bowman", number: "48", viewers: 1240, color: "#A78BFA" },
];

interface TooltipPayload {
  value: number;
  payload: {
    name: string;
    number: string;
    viewers: number;
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
      style={{ backgroundColor: "#1A1F2E", border: "1px solid #252D3D" }}
      className="rounded-lg p-3 shadow-xl"
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: d.color }}
        >
          #{d.number}
        </span>
        <span className="text-sm font-semibold text-[#F9FAFB]">{d.name}</span>
      </div>
      <p className="text-xs text-[#9CA3AF]">
        Engagement Index:{" "}
        <span className="text-[#F9FAFB] font-bold">
          {d.viewers.toLocaleString()}
        </span>
      </p>
    </div>
  );
}

interface CustomYAxisTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };

}

function CustomYAxisTick({ x, y, payload }: CustomYAxisTickProps) {
  if (!payload) return null;
  const driver = drivers.find((d) => d.name === payload.value);
  const color = driver?.color ?? "#9CA3AF";
  const number = driver?.number ?? "";

  return (
    <g transform={`translate(${x},${y})`}>
      <foreignObject x={-170} y={-12} width={165} height={24}>
        <div
          style={{ display: "flex", alignItems: "center", gap: "6px" }}
        >
          <span
            style={{
              backgroundColor: color,
              color: "#fff",
              fontSize: "10px",
              fontWeight: 700,
              borderRadius: "4px",
              padding: "1px 5px",
              minWidth: "26px",
              textAlign: "center",
              flexShrink: 0,
            }}
          >
            #{number}
          </span>
          <span
            style={{
              color: "#F9FAFB",
              fontSize: "12px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {payload.value}
          </span>
        </div>
      </foreignObject>
    </g>
  );
}

export default function DriverLeaderboard() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ backgroundColor: "#1A1F2E", border: "1px solid #252D3D" }}
    >
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-[#F9FAFB] leading-tight">
          Driver Popularity on Prime Video
        </h2>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Q1 2026 &bull; Profile Views + Watch Time Index
        </p>
      </div>

      {/* Chart */}
      <div style={{ height: 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={drivers}
            layout="vertical"
            margin={{ top: 4, right: 32, left: 170, bottom: 4 }}
          >
            <CartesianGrid
              horizontal={false}
              strokeDasharray="3 3"
              stroke="#252D3D"
            />
            <XAxis
              type="number"
              domain={[0, 3200]}
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={170}
              tick={(props) => <CustomYAxisTick {...props} />}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
            />
            <Bar dataKey="viewers" radius={[0, 4, 4, 0]} maxBarSize={22}>
              {drivers.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer note */}
      <p className="text-[10px] text-[#9CA3AF] mt-3 text-right">
        Index = (Profile Views &times; 0.4) + (Watch Time &times; 0.6) &bull;
        Normalized to 1,000-point scale
      </p>
    </div>
  );
}
