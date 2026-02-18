"use client";
import useSWR from "swr";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { KPIData } from "@/app/api/kpis/route";

const fetcher = (url: string) => fetch(url).then((r) => r.json()) as Promise<{ kpis: KPIData[] }>;

// Skeleton for loading state
function KPISkeletonCell({ last }: { last: boolean }) {
  return (
    <div
      className="flex flex-col justify-center py-2.5 px-3"
      style={{ borderRight: last ? "none" : "1px solid #1A2437", minHeight: 52 }}
    >
      <div style={{ height: 8, width: 60, borderRadius: 3, background: "#1A2437", marginBottom: 6 }} />
      <div style={{ height: 14, width: 48, borderRadius: 3, background: "#243044" }} />
    </div>
  );
}

export default function KPIStrip() {
  const { data, isLoading } = useSWR("/api/kpis", fetcher, { refreshInterval: 60_000 });

  if (isLoading || !data) {
    return (
      <div style={{ background: "#0A0F1E", borderBottom: "1px solid #1A2437" }}>
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="grid grid-cols-4 lg:grid-cols-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <KPISkeletonCell key={i} last={i === 7} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#0A0F1E", borderBottom: "1px solid #1A2437" }}>
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-4 lg:grid-cols-8">
          {data.kpis.map((k, i) => {
            const up = k.delta > 0;
            const positive = k.invertDelta ? !up : up;
            const Icon = up ? ArrowUpRight : ArrowDownRight;
            return (
              <div
                key={k.metric}
                className="flex flex-col justify-center py-2.5 px-3"
                style={{
                  borderRight: i < data.kpis.length - 1 ? "1px solid #1A2437" : "none",
                  minHeight: 52,
                }}
              >
                <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#4E5E74", marginBottom: 2, whiteSpace: "nowrap" }}>
                  {k.metric}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span style={{ fontSize: 15, fontWeight: 800, color: "#E8ECF4", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {k.value}
                  </span>
                  <span
                    className="inline-flex items-center gap-0.5"
                    style={{ fontSize: 10, fontWeight: 700, color: positive ? "#00C896" : "#FF4F5B" }}
                  >
                    <Icon size={9} strokeWidth={3} />
                    {Math.abs(k.delta).toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
