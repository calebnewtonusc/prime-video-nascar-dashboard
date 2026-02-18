"use client";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const KPIS = [
  { label: "Q1 Viewers",       value: "16.4M",  vsYoY: 23.1, vsQoQ:  8.4 },
  { label: "New Subscribers",  value: "342K",   vsYoY: 31.0, vsQoQ: 12.5 },
  { label: "Total Revenue",    value: "$12.8M", vsYoY: 18.5, vsQoQ:  6.2 },
  { label: "Avg Watch Time",   value: "127 min",vsYoY:  8.1, vsQoQ:  3.7 },
  { label: "Sub ARPU",         value: "$37.42", vsYoY:  5.8, vsQoQ:  2.1 },
  { label: "Ad CPM",           value: "$22.40", vsYoY: 14.2, vsQoQ:  4.8 },
  { label: "30-Day Churn",     value: "2.3%",   vsYoY:-18.2, vsQoQ: -4.4 },
  { label: "Engage Score",     value: "87/100", vsYoY:  9.4, vsQoQ:  3.2 },
];

export default function KPIStrip() {
  return (
    <div style={{ background: "#0A0F1E", borderBottom: "1px solid #1A2437" }}>
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-4 lg:grid-cols-8">
          {KPIS.map((k, i) => {
            const up = k.vsYoY > 0;
            // Churn: down is good
            const positive = k.label === "30-Day Churn" ? !up : up;
            const Icon = up ? ArrowUpRight : ArrowDownRight;
            return (
              <div
                key={k.label}
                className="flex flex-col justify-center py-2.5 px-3"
                style={{
                  borderRight: i < KPIS.length - 1 ? "1px solid #1A2437" : "none",
                  minHeight: 52,
                }}
              >
                <p style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#4E5E74", marginBottom: 2, whiteSpace: "nowrap" }}>
                  {k.label}
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
                    {Math.abs(k.vsYoY).toFixed(1)}%
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
