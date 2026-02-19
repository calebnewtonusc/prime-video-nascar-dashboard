"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, LabelList,
} from "recharts";
import type { RaceViewershipRecord } from "@/app/api/viewership/route";
import ErrorCard from "@/components/ErrorCard";

interface ApiResponse {
  races: RaceViewershipRecord[];
  summary: { totalV26: number; totalV25: number; yoyPct: number; beatTarget: number; total: number };
  asOf: string;
}
const fetcher = (url: string) => fetch(url).then((r) => r.json()) as Promise<ApiResponse>;

interface TProps {
  active?: boolean;
  payload?: { payload: RaceViewershipRecord; value: number; dataKey: string }[];
}
function Tip({ active, payload }: TProps) {
  if (!active || !payload?.length) return null;
  const r = payload[0].payload;
  const delta = r.v26 - r.v25;
  const pct = ((delta / r.v25) * 100).toFixed(1);
  const beat = r.v26 >= r.target;
  return (
    <div style={{ background: "#0C1220", border: "1px solid #243044", borderRadius: 8, padding: "12px 14px", fontSize: 12, minWidth: 210 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid #1A2437" }}>
        <span style={{ fontWeight: 700, fontSize: 13, color: "#E8ECF4" }}>{r.full}</span>
        <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 3, textTransform: "uppercase",
          background: beat ? "rgba(0,200,150,0.12)" : "rgba(255,79,91,0.12)",
          color: beat ? "#00C896" : "#FF4F5B",
          border: `1px solid ${beat ? "rgba(0,200,150,0.25)" : "rgba(255,79,91,0.25)"}` }}>
          {beat ? "Beat Target" : "Missed"}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span style={{ color: "#4E5E74" }}>2026 Viewers</span>
          <span style={{ fontWeight: 700, color: "#00A8FF" }}>{r.v26}M</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span style={{ color: "#4E5E74" }}>2025 Viewers</span>
          <span style={{ color: "#8B97AA" }}>{r.v25}M</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span style={{ color: "#4E5E74" }}>Target</span>
          <span style={{ color: "#FF9900" }}>{r.target}M</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, paddingTop: 4, marginTop: 4, borderTop: "1px solid #1A2437" }}>
          <span style={{ color: "#4E5E74" }}>YoY</span>
          <span style={{ fontWeight: 700, color: delta >= 0 ? "#00C896" : "#FF4F5B" }}>
            {delta >= 0 ? "+" : ""}{delta.toFixed(1)}M ({delta >= 0 ? "+" : ""}{pct}%)
          </span>
        </div>
        {r.newSubs > 0 && (
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            <span style={{ color: "#4E5E74" }}>New Subs</span>
            <span style={{ color: "#E8ECF4" }}>{r.newSubs}K</span>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <span style={{ color: "#4E5E74" }}>Avg Watch</span>
          <span style={{ color: "#E8ECF4" }}>{r.avgWatchMin} min</span>
        </div>
      </div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div style={{ height: 340, display: "flex", alignItems: "flex-end", gap: 12, padding: "28px 16px 20px 40px" }}>
      {[180, 60, 50, 70, 55, 65].map((h, i) => (
        <div key={`vs-skeleton-${i}`} style={{ flex: 1, height: h, borderRadius: "3px 3px 0 0", background: "#1A2437", animation: "pulse 1.5s ease-in-out infinite", animationDelay: `${i * 80}ms` }} />
      ))}
    </div>
  );
}

export default function ViewershipChart() {
  const [dateParams, setDateParams] = useState("?from=2026-02-01&to=2026-03-31");

  useEffect(() => {
    function onDateChange(e: Event) {
      const { from, to } = (e as CustomEvent<{ from: string; to: string }>).detail;
      setDateParams(`?from=${from}&to=${to}`);
    }
    window.addEventListener("dateRangeChange", onDateChange);
    return () => window.removeEventListener("dateRangeChange", onDateChange);
  }, []);

  const { data, isLoading, error, mutate } = useSWR(`/api/viewership${dateParams}`, fetcher, { refreshInterval: 60_000 });

  if (error) return <ErrorCard title="Viewership data unavailable" onRetry={() => mutate()} height={460} />;

  return (
    <div className="rounded-[10px] p-5 h-full" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#E8ECF4" }}>Q1 Race Viewership</h2>
            <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.06em", background: "rgba(0,168,255,0.1)", color: "#00A8FF", border: "1px solid rgba(0,168,255,0.2)" }}>Live</span>
          </div>
          <p style={{ fontSize: 11, color: "#4E5E74" }}>Unique viewers (M) · Q1 2026 vs Q1 2025 · Orange = Daytona peak</p>
        </div>
        {data ? (
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 10, color: "#4E5E74" }}>Q1 Total</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: "#E8ECF4", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" }}>{data.summary.totalV26.toFixed(1)}M</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 10, color: "#4E5E74" }}>YoY Growth</p>
              <p style={{ fontSize: 18, fontWeight: 800, color: "#00C896", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" }}>+{data.summary.yoyPct}%</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 10, color: "#4E5E74" }}>vs Target</p>
              <p style={{ fontSize: 18, fontWeight: 800, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em", color: data.summary.beatTarget >= 5 ? "#00C896" : "#FF9900" }}>
                {data.summary.beatTarget}/{data.summary.total}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 20 }}>
            {[0, 1, 2].map((i) => (
              <div key={`vs-skeleton-${i}`} style={{ textAlign: "right" }}>
                <div style={{ height: 8, width: 40, borderRadius: 3, background: "#1A2437", marginBottom: 4 }} />
                <div style={{ height: 18, width: 52, borderRadius: 3, background: "#243044" }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bar chart */}
      <div style={{ height: 340 }}>
        {isLoading || !data ? (
          <ChartSkeleton />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.races} margin={{ top: 28, right: 16, left: 4, bottom: 0 }} barGap={4} barCategoryGap="30%">
              <CartesianGrid vertical={false} stroke="#1A2437" strokeDasharray="2 4" />
              <XAxis dataKey="short" tick={{ fill: "#8B97AA", fontSize: 11, fontWeight: 500 }} tickLine={false} axisLine={{ stroke: "#1A2437" }} />
              <YAxis tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}M`} domain={[0, 10]} />
              <Tooltip content={<Tip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar dataKey="v25" name="2025" isAnimationActive={false} radius={[3, 3, 0, 0]} maxBarSize={28}>
                {data.races.map((r) => <Cell key={r.short} fill="#243044" />)}
              </Bar>
              <Bar dataKey="v26" name="2026" isAnimationActive={false} radius={[3, 3, 0, 0]} maxBarSize={28}>
                {data.races.map((r, i) => <Cell key={r.short} fill={i === 0 ? "#FF9900" : "#00A8FF"} />)}
                <LabelList dataKey="v26" position="top" style={{ fill: "#8B97AA", fontSize: 10, fontWeight: 600, fontVariantNumeric: "tabular-nums" }} formatter={(v: number) => `${v}M`} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: "1px solid #1A2437" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 11, color: "#4E5E74" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: "#00A8FF", display: "inline-block" }} />2026
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: "#243044", display: "inline-block" }} />2025
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 2, background: "#FF9900", display: "inline-block" }} />Daytona (peak)
          </span>
        </div>
        <p style={{ fontSize: 11, color: "#4E5E74" }}>
          Daytona: <span style={{ color: "#FF9900", fontWeight: 700 }}>8.2M</span> viewers · 4× avg race
        </p>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}
