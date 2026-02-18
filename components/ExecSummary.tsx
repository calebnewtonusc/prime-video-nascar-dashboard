import { TrendingUp, AlertCircle, Globe } from "lucide-react";

const priorities = [
  {
    icon: "TrendingUp",
    color: "#1399FF",
    bgColor: "rgba(19,153,255,0.07)",
    borderColor: "rgba(19,153,255,0.18)",
    tag: "HIGHEST ROI LEVER",
    headline: "Marquee events drive 42% of Q1 viewership",
    body: "Daytona 500 delivered 8.2M viewers — 4× any other Q1 race. Prioritize premium event rights and exclusive pre-race content to maximize subscriber acquisition.",
  },
  {
    icon: "AlertCircle",
    color: "#FF9900",
    bgColor: "rgba(255,153,0,0.07)",
    borderColor: "rgba(255,153,0,0.18)",
    tag: "BUDGET REALLOCATION",
    headline: "Shift $200K from TV spots to email & influencer",
    body: "Email ROAS is 31.2× vs 4.1× for TV. Driver Fanbase campaign outperforms at $3.87 CPA. Reallocating drives an estimated +680K additional conversions in Q2.",
  },
  {
    icon: "Globe",
    color: "#10B981",
    bgColor: "rgba(16,185,129,0.07)",
    borderColor: "rgba(16,185,129,0.18)",
    tag: "GROWTH OPPORTUNITY",
    headline: "International localization = $2.1M ARR upside",
    body: "International viewership +67% YoY — fastest-growing segment. Spanish & Portuguese commentary for UK/Brazil could unlock 340K subscribers at near-zero marginal cost.",
  },
];

const IconMap = { TrendingUp, AlertCircle, Globe };

export default function ExecSummary() {
  return (
    <section className="animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(19,153,255,0.4), transparent)" }} />
        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#6B7280" }}>
          Executive Summary &middot; 3 Strategic Priorities
        </span>
        <div className="h-px flex-1" style={{ background: "linear-gradient(270deg, rgba(16,185,129,0.4), transparent)" }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {priorities.map((item, i) => {
          const Icon = IconMap[item.icon as keyof typeof IconMap];
          return (
            <div
              key={i}
              className="relative rounded-xl p-5 animate-fade-in-up"
              style={{ background: item.bgColor, border: `1px solid ${item.borderColor}`, animationDelay: `${i * 0.08}s` }}
            >
              <div className="absolute top-0 left-8 right-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}15`, border: `1px solid ${item.color}28` }}>
                  <Icon size={16} style={{ color: item.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: item.color }}>{item.tag}</p>
                  <h3 className="text-[13px] font-bold text-white leading-snug mb-2">{item.headline}</h3>
                  <p className="text-[11px] leading-relaxed" style={{ color: "#9CA3AF" }}>{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
