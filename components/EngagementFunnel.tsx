"use client";

const funnel = [
  { stage: "Impressions",        count: 31_200_000, pct: 100,   convRate: null,   color: "#3A6FA8" },
  { stage: "Landing Page Visits",count: 4_368_000,  pct: 14.0,  convRate: 14.0,   color: "#3A6FA8" },
  { stage: "Trial Starts",       count: 874_000,    pct: 2.80,  convRate: 20.0,   color: "#7C6FFF" },
  { stage: "Trial Completions",  count: 612_000,    pct: 1.96,  convRate: 70.0,   color: "#7C6FFF" },
  { stage: "Paid Conversions",   count: 342_000,    pct: 1.10,  convRate: 55.9,   color: "#00C896" },
  { stage: "Retained at 30 Days",count: 263_000,    pct: 0.84,  convRate: 76.9,   color: "#00C896" },
];

const insights = [
  { label: "Trial→Paid CVR",      value: "55.9%", benchmark: "48% industry avg", good: true },
  { label: "30-Day Retention",    value: "76.9%", benchmark: "72% Q1 2025",       good: true },
  { label: "Impression→Trial",    value: "2.80%", benchmark: "2.1% benchmark",    good: true },
  { label: "Cost Per Conversion", value: "$3.87", benchmark: "$5.20 competitor",  good: true },
];

export default function EngagementFunnel() {
  return (
    <div className="card-hover rounded-[10px] overflow-hidden h-full" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
      <div className="px-5 py-4" style={{ borderBottom: "1px solid #1A2437" }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "#E8ECF4" }}>Conversion Funnel</h2>
        <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 2 }}>Impressions to paid subscribers · Q1 2026</p>
      </div>

      <div className="p-5">
        {/* Funnel rows */}
        <div className="space-y-2 mb-5">
          {funnel.map((stage, i) => {
            const barWidth = `${stage.pct === 100 ? 100 : Math.max((stage.pct / 14) * 100, 4)}%`;
            return (
              <div key={stage.stage}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#4E5E74", width: 14 }}>{i + 1}</span>
                    <span style={{ fontSize: 12, color: i === 0 ? "#E8ECF4" : i < 4 ? "#8B97AA" : "#00C896", fontWeight: i === 0 || i === 4 || i === 5 ? 600 : 400 }}>{stage.stage}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {stage.convRate !== null && (
                      <span style={{ fontSize: 10, color: "#4E5E74" }}>CVR: <span style={{ color: "#8B97AA", fontWeight: 600 }}>{stage.convRate}%</span></span>
                    )}
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#E8ECF4", fontVariantNumeric: "tabular-nums", minWidth: 80, textAlign: "right" }}>
                      {stage.count >= 1_000_000
                        ? `${(stage.count / 1_000_000).toFixed(2)}M`
                        : `${(stage.count / 1_000).toFixed(0)}K`}
                    </span>
                    <span style={{ fontSize: 10, color: stage.color, fontWeight: 600, minWidth: 42, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                      {stage.pct.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div style={{ height: 6, background: "#1A2437", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: barWidth, background: stage.color, borderRadius: 3, opacity: i === 0 ? 1 : 0.8, transition: "width 0.5s ease" }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Key metrics */}
        <div style={{ borderTop: "1px solid #1A2437", paddingTop: 14 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4E5E74", marginBottom: 10 }}>vs Benchmarks</p>
          <div className="grid grid-cols-2 gap-2">
            {insights.map(m => (
              <div key={m.label} className="px-3 py-2.5 rounded-lg" style={{ background: "#060A12" }}>
                <p style={{ fontSize: 15, fontWeight: 800, color: m.good ? "#00C896" : "#FF4F5B", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{m.value}</p>
                <p style={{ fontSize: 11, color: "#E8ECF4", fontWeight: 600 }}>{m.label}</p>
                <p style={{ fontSize: 10, color: "#4E5E74", marginTop: 1 }}>{m.benchmark}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
