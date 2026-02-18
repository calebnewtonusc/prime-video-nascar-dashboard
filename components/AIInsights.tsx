"use client";

import { Zap, AlertTriangle, Lightbulb, Globe, Brain } from "lucide-react";

type InsightType = "PREDICTION" | "ALERT" | "RECOMMENDATION" | "OPPORTUNITY";
type ImpactLevel = "High" | "Medium";

interface Insight {
  type: InsightType;
  impact: ImpactLevel;
  title: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  metricBarPercent: number;
  accentColor: string;
  icon: React.ReactNode;
}

const TYPE_STYLES: Record<InsightType, { bg: string; text: string; border: string }> = {
  PREDICTION: { bg: "rgba(19,153,255,0.12)", text: "#1399FF", border: "rgba(19,153,255,0.3)" },
  ALERT: { bg: "rgba(239,68,68,0.12)", text: "#EF4444", border: "rgba(239,68,68,0.3)" },
  RECOMMENDATION: { bg: "rgba(16,185,129,0.12)", text: "#10B981", border: "rgba(16,185,129,0.3)" },
  OPPORTUNITY: { bg: "rgba(255,153,0,0.12)", text: "#FF9900", border: "rgba(255,153,0,0.3)" },
};

const IMPACT_STYLES: Record<ImpactLevel, { bg: string; text: string }> = {
  High: { bg: "rgba(239,68,68,0.15)", text: "#EF4444" },
  Medium: { bg: "rgba(245,158,11,0.15)", text: "#F59E0B" },
};

const insights: Insight[] = [
  {
    type: "PREDICTION",
    impact: "High",
    title: "Las Vegas Race Viewership Forecast",
    description:
      "Projected 2.3M viewers (\u21919.5% vs 2025). High-speed oval track historically drives 15% more engagement. Push notification campaign recommended 48hrs before race.",
    metricLabel: "Confidence",
    metricValue: "87%",
    metricBarPercent: 87,
    accentColor: "#1399FF",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    type: "ALERT",
    impact: "High",
    title: "Post-Season Churn Risk Detected",
    description:
      "12.4% of NASCAR-only subscribers (42K users) show high churn probability after Q1 season ends. Recommend cross-promoting F1, IndyCar, and WWE content before March 30.",
    metricLabel: "Risk",
    metricValue: "High",
    metricBarPercent: 82,
    accentColor: "#EF4444",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  {
    type: "RECOMMENDATION",
    impact: "Medium",
    title: "Optimal Push Notification Window",
    description:
      "Race-day notifications sent 2\u20133 hours before green flag show 3.4x higher CTR. Current timing shows 67% of alerts sent too early. Adjust campaign schedule to 1:00\u20132:00 PM ET on race days.",
    metricLabel: "Confidence",
    metricValue: "94%",
    metricBarPercent: 94,
    accentColor: "#10B981",
    icon: <Lightbulb className="w-4 h-4" />,
  },
  {
    type: "OPPORTUNITY",
    impact: "Medium",
    title: "International Market Expansion",
    description:
      "International viewership grew 67% YoY driven by UK and Brazil. Daytona 500 drove 890K international viewers. Localized Spanish/Portuguese commentary could capture additional 340K subscribers.",
    metricLabel: "Opportunity",
    metricValue: "$2.1M ARR",
    metricBarPercent: 68,
    accentColor: "#FF9900",
    icon: <Globe className="w-4 h-4" />,
  },
];

interface InsightCardProps {
  insight: Insight;
}

function InsightCard({ insight }: InsightCardProps) {
  const typeStyle = TYPE_STYLES[insight.type];
  const impactStyle = IMPACT_STYLES[insight.impact];

  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden"
      style={{
        backgroundColor: "#0F1117",
        border: `1px solid ${typeStyle.border}`,
      }}
    >
      {/* Subtle top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: insight.accentColor, opacity: 0.6 }}
      />

      {/* Type + Impact badges */}
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{
            backgroundColor: typeStyle.bg,
            color: typeStyle.text,
            border: `1px solid ${typeStyle.border}`,
          }}
        >
          <span style={{ color: typeStyle.text }}>{insight.icon}</span>
          {insight.type}
        </span>
        <span
          className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
          style={{
            backgroundColor: impactStyle.bg,
            color: impactStyle.text,
          }}
        >
          {insight.impact} Impact
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold text-[#F9FAFB] leading-snug">
        {insight.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-[#9CA3AF] leading-relaxed flex-1">
        {insight.description}
      </p>

      {/* Metric bar */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">
            {insight.metricLabel}
          </span>
          <span
            className="text-xs font-bold"
            style={{ color: insight.accentColor }}
          >
            {insight.metricValue}
          </span>
        </div>
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${insight.metricBarPercent}%`,
              backgroundColor: insight.accentColor,
              boxShadow: `0 0 6px ${insight.accentColor}80`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function AIInsights() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ backgroundColor: "#1A1F2E", border: "1px solid #252D3D" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[#1399FF]" />
            <h2 className="text-lg font-bold text-[#F9FAFB]">
              AI-Powered Insights
            </h2>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-1 ml-7">
            Powered by Amazon Bedrock
          </p>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold"
          style={{
            backgroundColor: "rgba(19,153,255,0.12)",
            border: "1px solid rgba(19,153,255,0.3)",
            color: "#1399FF",
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: "#1399FF" }}
          />
          Live Analysis
        </div>
      </div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <InsightCard key={insight.title} insight={insight} />
        ))}
      </div>

      {/* Footer */}
      <div
        className="mt-4 pt-4 flex items-center justify-between"
        style={{ borderTop: "1px solid #252D3D" }}
      >
        <p className="text-[10px] text-[#9CA3AF]">
          Models refreshed every 6 hours &bull; Last run: Feb 17, 2026 at 6:00 AM ET
        </p>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#10B981" }}
          />
          <span className="text-[10px] text-[#9CA3AF]">All models healthy</span>
        </div>
      </div>
    </div>
  );
}
