"use client";
import { useState } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricPoint {
  race: string;
  short: string;
  viewers: number;
  subs: number;
  revenue: number;
  watchTime: number;
  streamShare: number;
}

const RACE_DATA: MetricPoint[] = [
  { race: "Daytona 500",        short: "Daytona", viewers: 8.2, subs: 342, revenue: 4.6, watchTime: 187, streamShare: 38 },
  { race: "Pennzoil 400",       short: "Las Vegas", viewers: 2.1, subs: 74, revenue: 1.2, watchTime: 142, streamShare: 41 },
  { race: "Ambetter Health 400",short: "Atlanta",  viewers: 2.4, subs: 88, revenue: 1.4, watchTime: 148, streamShare: 43 },
  { race: "United Rentals 500", short: "Phoenix",  viewers: null as unknown as number, subs: null as unknown as number, revenue: null as unknown as number, watchTime: null as unknown as number, streamShare: null as unknown as number },
  { race: "EchoPark Grand Prix",short: "COTA",     viewers: null as unknown as number, subs: null as unknown as number, revenue: null as unknown as number, watchTime: null as unknown as number, streamShare: null as unknown as number },
  { race: "Food City 500",      short: "Bristol",  viewers: null as unknown as number, subs: null as unknown as number, revenue: null as unknown as number, watchTime: null as unknown as number, streamShare: null as unknown as number },
];

// Fill projected values
const PROJECTED: Partial<MetricPoint>[] = [
  {},
  {},
  {},
  { viewers: 1.9, subs: 62, revenue: 1.1, watchTime: 138, streamShare: 44 },
  { viewers: 2.6, subs: 96, revenue: 1.5, watchTime: 155, streamShare: 46 },
  { viewers: 3.1, subs: 118, revenue: 1.8, watchTime: 162, streamShare: 48 },
];

const METRICS = [
  { key: "viewers" as const, label: "Viewers", unit: "M", color: "#00A8E0", format: (v: number) => `${v}M` },
  { key: "subs" as const, label: "New Subs", unit: "K", color: "#FF9900", format: (v: number) => `${v}K` },
  { key: "revenue" as const, label: "Revenue", unit: "$M", color: "#00C896", format: (v: number) => `$${v}M` },
  { key: "watchTime" as const, label: "Avg Watch", unit: "min", color: "#7C6FFF", format: (v: number) => `${v}m` },
  { key: "streamShare" as const, label: "Stream Share", unit: "%", color: "#F59E0B", format: (v: number) => `${v}%` },
];

function RaceToRaceChange({ current, previous, format }: { current: number; previous: number; format: (v: number) => string }) {
  if (!previous || !current) return null;
  const diff = current - previous;
  const pct = ((diff / previous) * 100).toFixed(1);
  const up = diff >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 700, color: up ? "#00C896" : "#FF4F5B" }}>
      <Icon size={11} strokeWidth={2.5} />
      {up ? "+" : ""}{pct}%
    </span>
  );
}

interface TooltipPayload {
  payload: MetricPoint;
  value: number;
  name: string;
}

function CustomTooltip({ active, payload, label, metric }: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  metric: typeof METRICS[0];
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const value = d[metric.key];
  if (value === null) return null;
  return (
    <div style={{ background: "#0C1220", border: "1px solid #243044", borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
      <p style={{ fontWeight: 700, color: "#E8ECF4", marginBottom: 4 }}>{label}</p>
      <p style={{ color: "#8B97AA" }}>{metric.label}: <strong style={{ color: metric.color }}>{metric.format(value)}</strong></p>
    </div>
  );
}

export default function KPITrend() {
  const [activeMetric, setActiveMetric] = useState(METRICS[0]);

  const completedData = RACE_DATA.filter(d => d[activeMetric.key] !== null && d[activeMetric.key] !== undefined);
  const lastCompleted = completedData[completedData.length - 1];
  const secondLast = completedData[completedData.length - 2];

  const chartData = RACE_DATA.map((d, i) => ({
    ...d,
    actual: d[activeMetric.key],
    projected: d[activeMetric.key] === null || d[activeMetric.key] === undefined
      ? PROJECTED[i]?.[activeMetric.key] ?? null
      : null,
  }));

  const totalCompleted = completedData.reduce((s, d) => s + (d[activeMetric.key] ?? 0), 0);

  return (
    <div style={{ background: "#0C1220", border: "1px solid #1A2437", borderRadius: 10, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A2437" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#E8ECF4" }}>Race-over-Race KPI Trends</h2>
            <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 2 }}>Select a metric to track · Projected races shown as dashed</p>
          </div>
          {lastCompleted && secondLast && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 11, color: "#4E5E74" }}>Last race vs prior:</span>
              <RaceToRaceChange
                current={lastCompleted[activeMetric.key]}
                previous={secondLast[activeMetric.key]}
                format={activeMetric.format}
              />
            </div>
          )}
        </div>

        {/* Metric tabs */}
        <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
          {METRICS.map(m => (
            <button
              key={m.key}
              onClick={() => setActiveMetric(m)}
              style={{
                padding: "5px 12px", borderRadius: 6,
                background: activeMetric.key === m.key ? m.color + "18" : "transparent",
                border: activeMetric.key === m.key ? `1px solid ${m.color}40` : "1px solid #1A2437",
                color: activeMetric.key === m.key ? m.color : "#4E5E74",
                fontSize: 11, fontWeight: activeMetric.key === m.key ? 700 : 500,
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ padding: "16px 20px 8px" }}>
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 16, left: 4, bottom: 0 }}>
              <defs>
                <linearGradient id={`kpt-${activeMetric.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeMetric.color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={activeMetric.color} stopOpacity={0} />
                </linearGradient>
                <linearGradient id={`kpt-proj-${activeMetric.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={activeMetric.color} stopOpacity={0.08} />
                  <stop offset="95%" stopColor={activeMetric.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#1A2437" strokeDasharray="2 4" />
              <XAxis dataKey="short" tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={{ stroke: "#1A2437" }} />
              <YAxis tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => activeMetric.format(v)} />
              <Tooltip content={props => <CustomTooltip {...props as {active?: boolean; payload?: TooltipPayload[]; label?: string}} metric={activeMetric} />} cursor={{ stroke: activeMetric.color, strokeWidth: 1, strokeDasharray: "3 3", strokeOpacity: 0.5 }} />
              <ReferenceLine y={0} stroke="#1A2437" />
              {/* Actual */}
              <Area
                type="monotone" dataKey="actual" name="Actual"
                stroke={activeMetric.color} strokeWidth={2.5} fill={`url(#kpt-${activeMetric.key})`}
                dot={{ fill: activeMetric.color, r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: activeMetric.color, stroke: activeMetric.color + "44", strokeWidth: 4 }}
                connectNulls={false}
                isAnimationActive={true} animationDuration={700} animationEasing="ease-out"
              />
              {/* Projected */}
              <Area
                type="monotone" dataKey="projected" name="Projected"
                stroke={activeMetric.color} strokeWidth={1.5} strokeDasharray="5 4"
                strokeOpacity={0.5} fill={`url(#kpt-proj-${activeMetric.key})`}
                dot={{ fill: activeMetric.color, r: 3, strokeWidth: 0, fillOpacity: 0.5 }}
                connectNulls={false}
                isAnimationActive={true} animationDuration={700}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Race-by-race cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4, marginTop: 12 }}>
          {RACE_DATA.map((d, i) => {
            const val = d[activeMetric.key];
            const proj = PROJECTED[i]?.[activeMetric.key];
            const hasActual = val !== null && val !== undefined;
            const prevVal = i > 0 ? RACE_DATA[i - 1][activeMetric.key] : null;
            const change = hasActual && prevVal !== null ? ((val - prevVal) / prevVal * 100) : null;
            return (
              <div key={d.short} style={{
                padding: "8px 8px",
                borderRadius: 6,
                background: hasActual ? "#0A1525" : "transparent",
                border: hasActual ? "1px solid #1A2437" : "1px solid #0D1929",
                opacity: hasActual ? 1 : 0.65,
              }}>
                <p style={{ fontSize: 9, fontWeight: 700, color: "#4E5E74", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {d.short}
                </p>
                <p style={{ fontSize: 13, fontWeight: 800, color: hasActual ? activeMetric.color : "#2E4560", fontVariantNumeric: "tabular-nums" }}>
                  {hasActual ? activeMetric.format(val) : proj ? activeMetric.format(proj as number) : "—"}
                </p>
                {change !== null && (
                  <span style={{ fontSize: 9, fontWeight: 700, color: change >= 0 ? "#00C896" : "#FF4F5B" }}>
                    {change >= 0 ? "+" : ""}{change.toFixed(0)}%
                  </span>
                )}
                {!hasActual && (
                  <span style={{ fontSize: 8, color: "#2E4560", fontWeight: 600 }}>proj</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div style={{ display: "flex", gap: 16, marginTop: 12, paddingTop: 10, borderTop: "1px solid #1A2437" }}>
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#4E5E74", marginBottom: 2 }}>Q1 Total (to date)</p>
            <p style={{ fontSize: 18, fontWeight: 900, color: activeMetric.color, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" }}>
              {activeMetric.format(parseFloat(totalCompleted.toFixed(1)))}
            </p>
          </div>
          {lastCompleted && secondLast && (
            <div>
              <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#4E5E74", marginBottom: 2 }}>Race-over-Race</p>
              <RaceToRaceChange
                current={lastCompleted[activeMetric.key]}
                previous={secondLast[activeMetric.key]}
                format={activeMetric.format}
              />
            </div>
          )}
          <div style={{ marginLeft: "auto" }}>
            <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#4E5E74", marginBottom: 2 }}>Daytona Premium</p>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#FF9900" }}>
              {activeMetric.format(RACE_DATA[0][activeMetric.key])} <span style={{ fontSize: 10, color: "#4E5E74" }}>({(RACE_DATA[0][activeMetric.key] / (totalCompleted / completedData.length) * 100).toFixed(0)}% of avg)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
