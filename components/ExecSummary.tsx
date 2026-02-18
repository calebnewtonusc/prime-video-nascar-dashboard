import { TrendingUp, AlertCircle, Globe } from "lucide-react";

const priorities = [
  {
    icon: TrendingUp,
    tag: "HIGHEST ROI LEVER",
    tagColor: "#00A8FF",
    tagBg: "rgba(0,168,255,0.1)",
    tagBorder: "rgba(0,168,255,0.2)",
    headline: "Marquee events drive 42% of Q1 viewership",
    body: "Daytona 500 delivered 8.2M viewers — 4× any other Q1 race. Prioritize premium event rights and exclusive pre-race content to maximize subscriber acquisition cost efficiency.",
    metrics: [
      { label: "Daytona viewers", value: "8.2M", delta: "+22%", up: true },
      { label: "Subs acquired",   value: "94K",  delta: "+31%", up: true },
    ],
  },
  {
    icon: AlertCircle,
    tag: "BUDGET REALLOCATION",
    tagColor: "#FF9900",
    tagBg: "rgba(255,153,0,0.1)",
    tagBorder: "rgba(255,153,0,0.2)",
    headline: "Shift $200K from TV spots to email & influencer",
    body: "Email ROAS is 31.2× vs 4.1× for TV spend. Driver Fanbase campaign outperforms at $3.87 CPA. Reallocating drives an estimated +$680K in incremental Q2 conversions.",
    metrics: [
      { label: "Email ROAS",   value: "31.2×", delta: "vs 4.1× TV", up: true },
      { label: "Q2 upside",    value: "$680K", delta: "estimated",  up: true },
    ],
  },
  {
    icon: Globe,
    tag: "GROWTH OPPORTUNITY",
    tagColor: "#00C896",
    tagBg: "rgba(0,200,150,0.1)",
    tagBorder: "rgba(0,200,150,0.2)",
    headline: "International localization = $2.1M ARR upside",
    body: "International viewership +67% YoY — fastest-growing segment. Spanish & Portuguese commentary for UK/Brazil unlocks 340K subscribers at near-zero marginal cost.",
    metrics: [
      { label: "Intl. YoY growth", value: "+67%", delta: "fastest segment", up: true },
      { label: "ARR potential",    value: "$2.1M", delta: "low marginal cost", up: true },
    ],
  },
];

export default function ExecSummary() {
  return (
    <section>
      <div className="flex items-center gap-3 mb-3">
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4E5E74" }}>
          Strategic Priorities · Q1 2026
        </span>
        <div style={{ flex: 1, height: 1, background: "#1A2437" }} />
        <span style={{ fontSize: 10, color: "#4E5E74" }}>3 action items</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {priorities.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="rounded-[10px] p-4"
              style={{ background: "#0C1220", border: "1px solid #1A2437", borderTop: `2px solid ${item.tagColor}` }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 7px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.08em", background: item.tagBg, color: item.tagColor, border: `1px solid ${item.tagBorder}` }}>
                  {item.tag}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${item.tagColor}15` }}>
                  <Icon size={13} style={{ color: item.tagColor }} />
                </div>
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#E8ECF4", lineHeight: 1.4, marginBottom: 8 }}>
                    {item.headline}
                  </h3>
                  <p style={{ fontSize: 11, color: "#8B97AA", lineHeight: 1.6, marginBottom: 12 }}>
                    {item.body}
                  </p>
                  <div className="flex items-center gap-4">
                    {item.metrics.map(m => (
                      <div key={m.label}>
                        <p style={{ fontSize: 15, fontWeight: 800, color: item.tagColor, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>{m.value}</p>
                        <p style={{ fontSize: 10, color: "#4E5E74" }}>{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
