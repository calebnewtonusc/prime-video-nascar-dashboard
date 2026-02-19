import { TrendingUp, AlertCircle, Globe, ArrowRight, Calendar, DollarSign } from "lucide-react";

const priorities = [
  {
    number: "01",
    icon: TrendingUp,
    tag: "HIGHEST ROI LEVER",
    tagColor: "#00A8FF",
    tagBg: "rgba(0,168,255,0.08)",
    tagBorder: "rgba(0,168,255,0.18)",
    headline: "Double down on marquee events",
    subhead: "Daytona 500 drove 42% of all Q1 viewership",
    body: "Daytona 500 delivered 8.2M viewers — 4× any other Q1 race and 94K net new subscribers. Premium event rights and exclusive pre-race content maximize subscriber acquisition efficiency.",
    metrics: [
      { label: "Daytona viewers", value: "8.2M", sub: "+22% YoY" },
      { label: "Subs acquired",   value: "94K",  sub: "+31% YoY" },
      { label: "Acq. cost",       value: "$2.88", sub: "per sub" },
    ],
    action: "Secure COTA + Bristol rights",
    timeline: "Q2 2026",
    owner: "Content Strategy",
  },
  {
    number: "02",
    icon: DollarSign,
    tag: "BUDGET REALLOCATION",
    tagColor: "#FF9900",
    tagBg: "rgba(255,153,0,0.08)",
    tagBorder: "rgba(255,153,0,0.18)",
    headline: "Shift $200K from TV to email & influencer",
    subhead: "Email ROAS is 7.6× higher than TV/CTV spend",
    body: "Email ROAS is 31.2× vs 4.1× for TV spend. Driver Fanbase campaign outperforms at $3.87 CPA. Reallocating 25% of TV budget to email and social drives an estimated +$680K in Q2 conversions.",
    metrics: [
      { label: "Email ROAS",  value: "31.2×", sub: "vs 4.1× TV" },
      { label: "Q2 upside",   value: "$680K", sub: "incremental" },
      { label: "CPA savings", value: "$1.33", sub: "per convert" },
    ],
    action: "Reallocate $200K budget",
    timeline: "Immediate",
    owner: "Marketing",
  },
  {
    number: "03",
    icon: Globe,
    tag: "GROWTH OPPORTUNITY",
    tagColor: "#00C896",
    tagBg: "rgba(0,200,150,0.08)",
    tagBorder: "rgba(0,200,150,0.18)",
    headline: "Localize for UK & Brazil — $2.1M ARR",
    subhead: "International viewership +67% YoY — fastest growing segment",
    body: "Spanish & Portuguese commentary for UK/Brazil markets unlocks 340K subscribers at near-zero marginal cost. Brazil viewership grew +89% YoY with no localization investment.",
    metrics: [
      { label: "Intl. YoY growth", value: "+67%",  sub: "fastest segment" },
      { label: "ARR potential",    value: "$2.1M", sub: "incremental" },
      { label: "Target markets",   value: "2",     sub: "UK + Brazil" },
    ],
    action: "Launch localization sprint",
    timeline: "Q2–Q3 2026",
    owner: "International",
  },
];

export default function ExecSummary() {
  return (
    <div style={{ background: "#0C1220", border: "1px solid #1A2437", borderRadius: 12, overflow: "hidden" }}>
      {/* Section header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4"
        style={{ borderBottom: "1px solid #1A2437", background: "#060A12" }}
      >
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: "#E8ECF4", letterSpacing: "-0.02em" }}>
            Q1 2026 — Go-To-Market Strategy
          </h2>
          <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 2 }}>
            Amazon Prime Video · NASCAR Cup Series · 3 priority recommendations for Q2 execution
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span style={{ fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.07em", background: "rgba(0,200,150,0.1)", color: "#00C896", border: "1px solid rgba(0,200,150,0.2)" }}>
            Ready for Q2
          </span>
          <span style={{ fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.07em", background: "rgba(0,168,255,0.1)", color: "#00A8FF", border: "1px solid rgba(0,168,255,0.2)" }}>
            Confidential
          </span>
        </div>
      </div>

      {/* Priority cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1A2437]">
        {priorities.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.number}
              className="card-hover p-5 flex flex-col gap-4"
              style={{
                borderTop: "1px solid #1A2437",
                borderLeft: `3px solid ${item.tagColor}`,
              }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: item.tagBg, border: `1px solid ${item.tagBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={14} style={{ color: item.tagColor }} />
                  </div>
                  <div>
                    <span style={{ fontSize: 9, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.09em", color: item.tagColor }}>{item.tag}</span>
                    <p style={{ fontSize: 12, fontWeight: 800, color: "#4E5E74", fontVariantNumeric: "tabular-nums" }}>{item.number}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0" style={{ fontSize: 10, color: "#4E5E74", background: "#060A12", border: "1px solid #1A2437", borderRadius: 4, padding: "3px 6px" }}>
                  <Calendar size={9} />
                  <span>{item.timeline}</span>
                </div>
              </div>

              {/* Headline */}
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4", lineHeight: 1.35, marginBottom: 4 }}>
                  {item.headline}
                </h3>
                <p style={{ fontSize: 11, fontWeight: 600, color: item.tagColor }}>
                  {item.subhead}
                </p>
              </div>

              {/* Body */}
              <p style={{ fontSize: 11, color: "#8B97AA", lineHeight: 1.65 }}>
                {item.body}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2">
                {item.metrics.map(m => (
                  <div key={m.label} style={{ background: "#060A12", borderRadius: 6, padding: "8px 10px" }}>
                    <p style={{ fontSize: 16, fontWeight: 800, color: item.tagColor, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em", lineHeight: 1 }}>
                      {m.value}
                    </p>
                    <p style={{ fontSize: 9, color: "#4E5E74", marginTop: 3, lineHeight: 1.3 }}>{m.label}</p>
                    <p style={{ fontSize: 9, color: "#2E3F56", marginTop: 1 }}>{m.sub}</p>
                  </div>
                ))}
              </div>

              {/* Action footer */}
              <div style={{ marginTop: "auto", paddingTop: 4, borderTop: "1px solid #1A2437", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="flex items-center gap-1.5" style={{ fontSize: 11, fontWeight: 700, color: item.tagColor }}>
                  <ArrowRight size={12} />
                  {item.action}
                </div>
                <span style={{ fontSize: 10, color: "#4E5E74" }}>Owner: {item.owner}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
