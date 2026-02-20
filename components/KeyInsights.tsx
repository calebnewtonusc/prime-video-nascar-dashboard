"use client";
import { useState, useEffect, useRef } from "react";
import { Sparkles, TrendingUp, AlertTriangle, Target, Zap, ChevronRight } from "lucide-react";

interface Insight {
  icon: typeof TrendingUp;
  color: string;
  badge: string;
  badgeColor: string;
  title: string;
  detail: string;
  metric: string;
  metricColor: string;
  priority: "critical" | "high" | "medium";
}

const INSIGHTS: Insight[] = [
  {
    icon: TrendingUp,
    color: "#00A8E0",
    badge: "Growth Signal",
    badgeColor: "#00A8E0",
    title: "Daytona 500 delivered 4× the average race viewership at 8.2M — the biggest Prime Video sports event in Q1.",
    detail: "New subscribers acquired: 342K (+28% vs 2025). Avg watch time hit 187 min vs platform avg of 127 min.",
    metric: "+23% YoY viewership",
    metricColor: "#00C896",
    priority: "high",
  },
  {
    icon: AlertTriangle,
    color: "#F59E0B",
    badge: "Retention Risk",
    badgeColor: "#F59E0B",
    title: "18% of Daytona trial subscribers show low engagement — 61.6K at-risk accounts before Las Vegas.",
    detail: "Win-back email sequence projected to save 19K subs ($712K ARR). Launch recommended by Feb 20.",
    metric: "61.6K at risk",
    metricColor: "#FF4F5B",
    priority: "critical",
  },
  {
    icon: Zap,
    color: "#7C6FFF",
    badge: "Revenue Opportunity",
    badgeColor: "#7C6FFF",
    title: "Bristol Dirt predicted to be Q1's 2nd biggest race at 3.1M viewers — 29% above Atlanta baseline.",
    detail: "Recommend +15% ad inventory increase the week prior. Model confidence: 87%.",
    metric: "3.1M projected",
    metricColor: "#F59E0B",
    priority: "high",
  },
  {
    icon: Target,
    color: "#00C896",
    badge: "Channel Insight",
    badgeColor: "#00C896",
    title: "Email marketing delivers $11.60 ROAS — 4.2× the next best channel. Increase budget by $150K through Q1.",
    detail: "Race Day Email campaign: $310K spend, 312K conversions, $0.99 CPA. Highest efficiency in portfolio.",
    metric: "11.6× ROAS",
    metricColor: "#00C896",
    priority: "high",
  },
  {
    icon: TrendingUp,
    color: "#FF9900",
    badge: "International",
    badgeColor: "#FF9900",
    title: "International viewership up 41% YoY, led by Brazil (+89%) and UK (+74%). COTA race expected to spike.",
    detail: "Road-course format correlates with +34% international share. Spanish-language creatives recommended by Mar 15.",
    metric: "+41% intl YoY",
    metricColor: "#FF9900",
    priority: "medium",
  },
  {
    icon: AlertTriangle,
    color: "#FF4F5B",
    badge: "Cost Alert",
    badgeColor: "#FF4F5B",
    title: "Programmatic CPMs rose 22% in 10 days due to Super Bowl cookie-pool competition — CPA targets at risk.",
    detail: "Shift $400K from display to paid social to protect Q1 CPA. Ad Bid Optimizer drift alert at 3.1%.",
    metric: "+22% CPM inflation",
    metricColor: "#FF4F5B",
    priority: "critical",
  },
];

const PRIORITY_ORDER: Insight["priority"][] = ["critical", "high", "medium"];

function TypewriterText({ text, speed = 18 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    idx.current = 0;
    const timer = setInterval(() => {
      if (idx.current >= text.length) {
        setDone(true);
        clearInterval(timer);
        return;
      }
      setDisplayed(text.slice(0, idx.current + 1));
      idx.current++;
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className="ai-cursor" style={{ color: "#00A8E0" }}>|</span>}
    </span>
  );
}

export default function KeyInsights() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const sorted = [...INSIGHTS].sort((a, b) => PRIORITY_ORDER.indexOf(a.priority) - PRIORITY_ORDER.indexOf(b.priority));

  function handleExpand(i: number) {
    if (expanded === i) { setExpanded(null); return; }
    setAnimating(true);
    setExpanded(i);
    setTimeout(() => setAnimating(false), 400);
  }

  return (
    <div style={{ background: "#0C1220", border: "1px solid #1A2437", borderRadius: 10, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A2437", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(124,111,255,0.12)", border: "1px solid rgba(124,111,255,0.25)",
        }}>
          <Sparkles size={13} style={{ color: "#7C6FFF" }} />
        </div>
        <div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#E8ECF4" }}>Key Insights</h2>
          <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 1 }}>AI-generated · Ranked by business priority · Amazon Bedrock</p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          {(["critical", "high", "medium"] as const).map(p => {
            const count = INSIGHTS.filter(i => i.priority === p).length;
            const color = p === "critical" ? "#FF4F5B" : p === "high" ? "#F59E0B" : "#8B97AA";
            return (
              <span key={p} style={{ fontSize: 9, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: color + "15", color, border: `1px solid ${color}30`, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {count} {p}
              </span>
            );
          })}
        </div>
      </div>

      {/* Insights list */}
      <div style={{ padding: "8px 0" }}>
        {sorted.map((insight, i) => {
          const Icon = insight.icon;
          const isOpen = expanded === i;
          const priorityColors = {
            critical: { bar: "#FF4F5B", bg: "rgba(255,79,91,0.04)" },
            high: { bar: "#F59E0B", bg: "rgba(245,158,11,0.03)" },
            medium: { bar: "#4E5E74", bg: "transparent" },
          };
          const pc = priorityColors[insight.priority];

          return (
            <div
              key={i}
              style={{
                borderBottom: i < sorted.length - 1 ? "1px solid #12202F" : "none",
                transition: "background 0.2s",
                background: isOpen ? pc.bg : "transparent",
              }}
            >
              <button
                onClick={() => handleExpand(i)}
                style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 20px",
                  textAlign: "left",
                }}
              >
                {/* Priority bar */}
                <div style={{ width: 2, alignSelf: "stretch", borderRadius: 2, background: pc.bar, flexShrink: 0, marginTop: 2 }} />

                {/* Icon */}
                <div style={{
                  width: 28, height: 28, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center",
                  background: insight.color + "12", border: `1px solid ${insight.color}25`, flexShrink: 0, marginTop: 1,
                }}>
                  <Icon size={12} style={{ color: insight.color }} />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                    <span style={{
                      fontSize: 9, fontWeight: 800, padding: "1px 6px", borderRadius: 3,
                      background: insight.badgeColor + "15", color: insight.badgeColor,
                      border: `1px solid ${insight.badgeColor}30`,
                      textTransform: "uppercase", letterSpacing: "0.07em",
                    }}>
                      {insight.badge}
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: insight.metricColor, fontVariantNumeric: "tabular-nums" }}>
                      {insight.metric}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: "#C0D0E2", lineHeight: 1.55, fontWeight: 500 }}>
                    {isOpen && animating ? <TypewriterText text={insight.title} /> : insight.title}
                  </p>
                  {isOpen && (
                    <p style={{ fontSize: 11, color: "#8B97AA", lineHeight: 1.6, marginTop: 6, animation: "fadeUp 0.25s ease" }}>
                      {insight.detail}
                    </p>
                  )}
                </div>

                {/* Expand arrow */}
                <ChevronRight
                  size={13}
                  style={{
                    color: "#4E5E74", flexShrink: 0, marginTop: 6,
                    transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ padding: "10px 20px", borderTop: "1px solid #1A2437", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#7C6FFF", animation: "pulse-ring 2s ease-in-out infinite" }} />
        <span style={{ fontSize: 10, color: "#4E5E74" }}>Powered by Amazon Bedrock · Refreshed every 60 min · Claude 3 Sonnet</span>
        <span style={{ marginLeft: "auto", fontSize: 10, color: "#2E4560" }}>Updated {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </div>
  );
}
