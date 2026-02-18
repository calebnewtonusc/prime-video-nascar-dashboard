"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

const data = [
  { race: "Daytona 500", short: "Daytona", viewers2026: 8.2, viewers2025: 6.7, target: 7.0 },
  { race: "Las Vegas", short: "Las Vegas", viewers2026: 2.1, viewers2025: 1.8, target: 2.0, projected: true },
  { race: "Atlanta", short: "Atlanta", viewers2026: 1.8, viewers2025: 1.5, target: 1.8, projected: true },
  { race: "Phoenix", short: "Phoenix", viewers2026: 2.4, viewers2025: 2.1, target: 2.2, projected: true },
  { race: "COTA", short: "COTA", viewers2026: 1.9, viewers2025: 1.6, target: 1.8, projected: true },
  { race: "Bristol Dirt", short: "Bristol", viewers2026: 2.3, viewers2025: 2.0, target: 2.1, projected: true },
];

interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const row = data.find((d) => d.short === label);
  const v2026 = payload.find((p) => p.name === "2026 Viewership")?.value ?? 0;
  const v2025 = payload.find((p) => p.name === "2025 Comparison")?.value ?? 0;
  const delta = (v2026 - v2025).toFixed(1);
  const pct = v2025 > 0 ? (((v2026 - v2025) / v2025) * 100).toFixed(1) : "0.0";

  return (
    <div
      style={{ background: "#252D3D", border: "1px solid #374151" }}
      className="rounded-lg p-3 text-sm shadow-xl"
    >
      <p className="font-semibold text-white mb-2">
        {row?.race ?? label}
        {row?.projected && (
          <span className="ml-2 text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">PROJ</span>
        )}
      </p>
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#1399FF" }} />
          <span className="text-gray-300">2026:</span>
          <span className="text-white font-medium">{v2026}M</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#6B7280" }} />
          <span className="text-gray-300">2025:</span>
          <span className="text-white font-medium">{v2025}M</span>
        </div>
        <div className="border-t border-gray-600 pt-1 mt-1 flex items-center gap-2">
          <span className="text-gray-400">Delta:</span>
          <span className={Number(delta) >= 0 ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>
            {Number(delta) >= 0 ? "+" : ""}{delta}M ({Number(pct) >= 0 ? "+" : ""}{pct}%)
          </span>
        </div>
      </div>
    </div>
  );
}

interface LegendPayloadItem {
  color: string;
  value: string;
}

interface CustomLegendProps {
  payload?: LegendPayloadItem[];
}

function CustomLegend({ payload }: CustomLegendProps) {
  return (
    <div className="flex items-center justify-center gap-6 mt-2">
      {payload?.map((entry) => (
        <div key={entry.value} className="flex items-center gap-1.5 text-sm text-gray-400">
          <span className="w-3 h-3 rounded-sm" style={{ background: entry.color }} />
          {entry.value}
        </div>
      ))}
      <div className="flex items-center gap-1.5 text-sm text-gray-400">
        <svg width="20" height="4">
          <line x1="0" y1="2" x2="20" y2="2" stroke="#FF9900" strokeWidth="2" strokeDasharray="4 2" />
        </svg>
        Target
      </div>
    </div>
  );
}

export default function ViewershipChart() {
  const totalViews = data.reduce((sum, d) => sum + d.viewers2026, 0).toFixed(1);
  const total2025 = data.reduce((sum, d) => sum + d.viewers2025, 0).toFixed(1);
  const growthPct = (((Number(totalViews) - Number(total2025)) / Number(total2025)) * 100).toFixed(1);
  const peakRace = data.reduce((max, d) => (d.viewers2026 > max.viewers2026 ? d : max), data[0]);

  return (
    <div
      style={{ background: "#1A1F2E", border: "1px solid #252D3D" }}
      className="rounded-xl p-6 w-full"
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-white">Q1 Race Viewership</h2>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ background: "#1399FF22", color: "#1399FF", border: "1px solid #1399FF44" }}
          >
            LIVE DATA
          </span>
        </div>
        <p className="text-sm text-gray-400 mt-0.5">Millions of Viewers &bull; Q1 2026 vs Q1 2025</p>
      </div>

      {/* Race badges */}
      <div className="flex gap-2 flex-wrap mb-4">
        {data.map((d) => (
          <span
            key={d.short}
            className="text-xs px-2 py-0.5 rounded font-medium"
            style={
              !d.projected
                ? { background: "#10B98122", color: "#10B981", border: "1px solid #10B98144" }
                : { background: "#374151", color: "#9CA3AF" }
            }
          >
            {d.short}: {!d.projected ? "LIVE" : "PROJECTED"}
          </span>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="grad2026" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1399FF" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#1399FF" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="grad2025" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6B7280" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#6B7280" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#252D3D" vertical={false} />
          <XAxis
            dataKey="short"
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            axisLine={{ stroke: "#252D3D" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${v}M`}
            domain={[0, 10]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#374151", strokeWidth: 1 }} />
          <Legend content={<CustomLegend />} />
          <ReferenceLine
            y={7}
            stroke="#FF9900"
            strokeDasharray="5 3"
            strokeWidth={1.5}
            label={{ value: "Target 7.0M", fill: "#FF9900", fontSize: 11, position: "insideTopRight" }}
          />
          <Area
            type="monotone"
            dataKey="viewers2025"
            name="2025 Comparison"
            stroke="#6B7280"
            strokeWidth={2}
            fill="url(#grad2025)"
            dot={{ fill: "#6B7280", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#6B7280" }}
          />
          <Area
            type="monotone"
            dataKey="viewers2026"
            name="2026 Viewership"
            stroke="#1399FF"
            strokeWidth={2.5}
            fill="url(#grad2026)"
            dot={{ fill: "#1399FF", r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#1399FF", stroke: "#1399FF33", strokeWidth: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Summary bar */}
      <div
        className="mt-4 grid grid-cols-3 divide-x rounded-lg overflow-hidden"
        style={{ background: "#0F1117", borderColor: "#252D3D", border: "1px solid #252D3D" }}
      >
        <div className="px-4 py-3 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Total Views</p>
          <p className="text-lg font-bold text-white">{totalViews}M</p>
          <p className="text-xs text-gray-500">Q1 2026</p>
        </div>
        <div className="px-4 py-3 text-center" style={{ borderColor: "#252D3D" }}>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Peak Race</p>
          <p className="text-base font-bold text-white">{peakRace.race}</p>
          <p className="text-xs font-semibold" style={{ color: "#1399FF" }}>{peakRace.viewers2026}M viewers</p>
        </div>
        <div className="px-4 py-3 text-center" style={{ borderColor: "#252D3D" }}>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">YoY Growth</p>
          <p className="text-lg font-bold text-green-400">+{growthPct}%</p>
          <p className="text-xs text-gray-500">vs Q1 2025</p>
        </div>
      </div>
    </div>
  );
}
