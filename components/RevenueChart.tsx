"use client";
import useSWR from "swr";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { RevenueStream } from "@/app/api/revenue/route";
import ErrorCard from "@/components/ErrorCard";

interface ApiResponse {
  streams: RevenueStream[];
  total: number;
  asOf: string;
}
const fetcher = (url: string) => fetch(url).then((r) => r.json()) as Promise<ApiResponse>;

interface TProps {
  active?: boolean;
  payload?: { name: string; value: number; payload: RevenueStream }[];
}
function Tip({ active, payload }: TProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#0C1220", border: "1px solid #243044", borderRadius: 8, padding: "10px 14px", fontSize: 12, minWidth: 160 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, display: "inline-block" }} />
        <span style={{ fontWeight: 700, color: "#E8ECF4" }}>{d.name}</span>
      </div>
      <p style={{ color: "#8B97AA", marginBottom: 2 }}>Revenue: <strong style={{ color: "#E8ECF4" }}>${d.value}M</strong></p>
      <p style={{ color: "#8B97AA", marginBottom: 2 }}>Share: <strong style={{ color: d.color }}>{d.pct}%</strong></p>
      <p style={{ color: "#8B97AA" }}>MoM: <strong style={{ color: d.mom >= 0 ? "#00C896" : "#FF4F5B" }}>{d.mom >= 0 ? "+" : ""}${Math.abs(d.mom).toFixed(2)}M</strong></p>
    </div>
  );
}

function Skeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ height: 220, borderRadius: 8, background: "#1A2437", animation: "pulse 1.5s ease-in-out infinite" }} />
      {[0, 1, 2, 3].map((i) => (
        <div key={`rev-skeleton-${i}`} style={{ height: 16, borderRadius: 3, background: "#1A2437", animation: "pulse 1.5s ease-in-out infinite", animationDelay: `${i * 80}ms` }} />
      ))}
    </div>
  );
}

export default function RevenueChart() {
  const { data, isLoading, error, mutate } = useSWR("/api/revenue", fetcher, { refreshInterval: 60_000 });

  if (error) return <ErrorCard title="Revenue data unavailable" onRetry={() => mutate()} height={460} />;

  return (
    <div className="card-hover rounded-[10px] p-5" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4" }}>Revenue Breakdown</h2>
          <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 2 }}>All streams · Q1 2026 · Feb–Mar</p>
        </div>
        <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.07em", background: "rgba(154,112,48,0.1)", color: "#9A7030", border: "1px solid rgba(154,112,48,0.2)" }}>Q1 2026</span>
      </div>

      {isLoading || !data ? (
        <Skeleton />
      ) : (
        <>
          <div style={{ position: "relative", height: 220, width: "100%" }}>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie isAnimationActive={false}
                  data={data.streams} cx="50%" cy="50%"
                  innerRadius={68} outerRadius={96} paddingAngle={3}
                  dataKey="value" strokeWidth={0} startAngle={90} endAngle={-270}
                >
                  {data.streams.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip content={<Tip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: "#E8ECF4", lineHeight: 1, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em" }}>
                ${data.total.toFixed(1)}M
              </span>
              <span style={{ fontSize: 10, color: "#4E5E74", marginTop: 4 }}>Total Revenue</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
            {data.streams.map((s) => (
              <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                <span style={{ fontSize: 11, flex: 1, color: "#8B97AA" }}>{s.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#E8ECF4", fontVariantNumeric: "tabular-nums" }}>${s.value}M</span>
                <span style={{ fontSize: 10, fontWeight: 700, width: 28, textAlign: "right", color: s.color, fontVariantNumeric: "tabular-nums" }}>{s.pct}%</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #1A2437", marginTop: 14, paddingTop: 12 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4E5E74", marginBottom: 8 }}>MoM vs January</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
              {data.streams.map((s) => (
                <div key={s.name} style={{ display: "flex", justifyContent: "space-between", padding: "6px 10px", borderRadius: 6, background: "#060A12" }}>
                  <span style={{ fontSize: 10, color: "#4E5E74" }}>{s.name.split(" ")[0]}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: s.mom >= 0 ? "#00C896" : "#FF4F5B", fontVariantNumeric: "tabular-nums" }}>
                    {s.mom >= 0 ? "+" : ""}${Math.abs(s.mom).toFixed(2)}M
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </div>
  );
}
