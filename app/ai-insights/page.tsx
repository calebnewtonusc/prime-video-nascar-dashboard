"use client";

import Header from "@/components/Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { Zap, AlertTriangle, Lightbulb, Globe, Brain, Activity } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type InsightType = "PREDICTION" | "ALERT" | "RECOMMENDATION" | "OPPORTUNITY";

interface ModelHealth {
  name: string;
  metric: string;
  metricValue: string;
  status: "Healthy" | "Calibrating";
}

interface AIInsightExpanded {
  type: InsightType;
  title: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  metricBarPercent: number;
  accentColor: string;
  icon: React.ReactNode;
  confidence?: string;
}

interface ModelRow {
  model: string;
  type: string;
  accuracy: string;
  accuracyNum: number;
  dataPoints: string;
  lastRetrained: string;
  status: "Healthy" | "Calibrating";
}

interface ChurnCohort {
  label: string;
  risk: number;
  color: string;
  riskLevel: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const MODEL_HEALTH: ModelHealth[] = [
  { name: "Viewership Predictor", metric: "Accuracy", metricValue: "91.2%", status: "Healthy" },
  { name: "Churn Risk Classifier", metric: "Precision", metricValue: "87.4%", status: "Healthy" },
  { name: "Ad Placement Engine", metric: "CTR Lift", metricValue: "3.4\u00d7", status: "Healthy" },
  { name: "Content Recommender", metric: "Engagement", metricValue: "+28%", status: "Calibrating" },
  { name: "Audience Segmenter", metric: "Silhouette", metricValue: "0.84", status: "Healthy" },
];

const TYPE_STYLES: Record<InsightType, { bg: string; text: string; border: string }> = {
  PREDICTION: { bg: "rgba(19,153,255,0.10)", text: "#1399FF", border: "rgba(19,153,255,0.28)" },
  ALERT: { bg: "rgba(239,68,68,0.10)", text: "#EF4444", border: "rgba(239,68,68,0.28)" },
  RECOMMENDATION: { bg: "rgba(16,185,129,0.10)", text: "#10B981", border: "rgba(16,185,129,0.28)" },
  OPPORTUNITY: { bg: "rgba(255,153,0,0.10)", text: "#FF9900", border: "rgba(255,153,0,0.28)" },
};

const INSIGHTS: AIInsightExpanded[] = [
  {
    type: "PREDICTION",
    title: "Las Vegas Viewership Forecast",
    description:
      "Amazon ML model predicts 2.3M \u00b10.18M viewers for the Pennzoil 400 (Mar 1, 2026). Key drivers: oval track (+15% engagement vs road course), 2-week post-Daytona momentum window, pre-race social sentiment score 7.8/10 (bullish). Confidence: 87%.",
    metricLabel: "Confidence",
    metricValue: "87%",
    metricBarPercent: 87,
    accentColor: "#1399FF",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    type: "ALERT",
    title: "Post-Season Churn Risk Detected",
    description:
      "42,180 subscribers (12.4% of NASCAR cohort) flagged High churn probability. Behavioral signals: last content view >14 days ago (38K), only watched NASCAR — no cross-content (41K), no F1/IndyCar preview engagement (39K). Recommended intervention: F1 Australian GP trailer push (Mar 15) + curated Chase Elliott highlights.",
    metricLabel: "Risk",
    metricValue: "High",
    metricBarPercent: 82,
    accentColor: "#EF4444",
    icon: <AlertTriangle className="w-4 h-4" />,
  },
  {
    type: "RECOMMENDATION",
    title: "Optimal Push Notification Timing",
    description:
      "Analysis of 14.2M push notification delivery events shows the 2-hour pre-race window (1:00\u20132:00 PM ET) achieves 3.4\u00d7 CTR vs current average — 67% of notifications currently sent >4hrs early. Expected incremental reach: 890K users. A/B test running on 20% of NASCAR audience since Feb 14.",
    metricLabel: "Confidence",
    metricValue: "94%",
    metricBarPercent: 94,
    accentColor: "#10B981",
    icon: <Lightbulb className="w-4 h-4" />,
  },
  {
    type: "OPPORTUNITY",
    title: "International Expansion Opportunity",
    description:
      "NLP analysis on 2.8M international viewer reviews identifies Spanish (34%) and Portuguese (28%) as most-requested languages. Brazilian Portuguese speakers drove 29% of COTA viewership (road course appeal). Localization ROI: $0.42M investment \u2192 $2.1M ARR, payback in 7.3 months.",
    metricLabel: "Opportunity",
    metricValue: "$2.1M ARR",
    metricBarPercent: 68,
    accentColor: "#FF9900",
    icon: <Globe className="w-4 h-4" />,
  },
];

const CHURN_COHORTS: ChurnCohort[] = [
  { label: "NASCAR Only, <30 days", risk: 68, color: "#EF4444", riskLevel: "High" },
  { label: "NASCAR Only, 30\u201390 days", risk: 41, color: "#F97316", riskLevel: "Medium" },
  { label: "NASCAR + 1 other sport", risk: 22, color: "#F59E0B", riskLevel: "Low" },
  { label: "NASCAR + 2+ sports", risk: 8, color: "#10B981", riskLevel: "Very Low" },
  { label: "Multi-content power user", risk: 3, color: "#1399FF", riskLevel: "Minimal" },
];

const MODEL_TABLE_ROWS: ModelRow[] = [
  {
    model: "Viewership Predictor",
    type: "Time-series regression",
    accuracy: "91.2%",
    accuracyNum: 91.2,
    dataPoints: "48.3M events",
    lastRetrained: "Feb 10, 2026",
    status: "Healthy",
  },
  {
    model: "Churn Risk Classifier",
    type: "Gradient boosted tree",
    accuracy: "87.4%",
    accuracyNum: 87.4,
    dataPoints: "339K subscribers",
    lastRetrained: "Feb 14, 2026",
    status: "Healthy",
  },
  {
    model: "Ad Placement Engine",
    type: "Contextual bandit",
    accuracy: "3.4\u00d7 CTR lift",
    accuracyNum: 85,
    dataPoints: "14.2M impressions",
    lastRetrained: "Feb 16, 2026",
    status: "Healthy",
  },
  {
    model: "Content Recommender",
    type: "Collaborative filter",
    accuracy: "+28% engagement",
    accuracyNum: 72,
    dataPoints: "820K sessions",
    lastRetrained: "Feb 8, 2026",
    status: "Calibrating",
  },
  {
    model: "Audience Segmenter",
    type: "K-means clustering",
    accuracy: "Silhouette 0.84",
    accuracyNum: 84,
    dataPoints: "339K profiles",
    lastRetrained: "Feb 12, 2026",
    status: "Healthy",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ModelHealthBar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {MODEL_HEALTH.map((m) => {
        const isHealthy = m.status === "Healthy";
        const statusColor = isHealthy ? "#10B981" : "#F59E0B";
        const statusBg = isHealthy
          ? "rgba(16,185,129,0.10)"
          : "rgba(245,158,11,0.10)";
        const statusBorder = isHealthy
          ? "rgba(16,185,129,0.25)"
          : "rgba(245,158,11,0.25)";

        return (
          <div
            key={m.name}
            className="rounded-xl p-4"
            style={{
              backgroundColor: "#111827",
              border: `1px solid ${statusBorder}`,
            }}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: statusBg }}
              >
                <Activity className="w-3 h-3" style={{ color: statusColor }} />
              </div>
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide flex-shrink-0"
                style={{ backgroundColor: statusBg, color: statusColor }}
              >
                <span
                  className={`inline-block w-1.5 h-1.5 rounded-full${isHealthy ? "" : " animate-pulse"}`}
                  style={{ backgroundColor: statusColor }}
                />
                {m.status}
              </span>
            </div>
            <p className="text-[11px] font-semibold leading-snug mb-2" style={{ color: "#F9FAFB" }}>
              {m.name}
            </p>
            <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "#6B7280" }}>
              {m.metric}
            </p>
            <p className="text-base font-black" style={{ color: statusColor }}>
              {m.metricValue}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function InsightCard({ insight }: { insight: AIInsightExpanded }) {
  const ts = TYPE_STYLES[insight.type];
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden"
      style={{ backgroundColor: "#111827", border: `1px solid ${ts.border}` }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: insight.accentColor, opacity: 0.55 }}
      />

      {/* Type badge */}
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: ts.bg, color: ts.text, border: `1px solid ${ts.border}` }}
        >
          <span style={{ color: ts.text }}>{insight.icon}</span>
          {insight.type}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-sm font-bold leading-snug" style={{ color: "#F9FAFB" }}>
        {insight.title}
      </h3>

      {/* Description */}
      <p className="text-[11px] leading-relaxed flex-1" style={{ color: "#9CA3AF" }}>
        {insight.description}
      </p>

      {/* Metric bar */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-wider" style={{ color: "#6B7280" }}>
            {insight.metricLabel}
          </span>
          <span className="text-xs font-bold" style={{ color: insight.accentColor }}>
            {insight.metricValue}
          </span>
        </div>
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${insight.metricBarPercent}%`,
              backgroundColor: insight.accentColor,
              boxShadow: `0 0 6px ${insight.accentColor}70`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ChurnRiskChart() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ backgroundColor: "#111827", border: "1px solid #1F2937" }}
    >
      <h3 className="text-sm font-bold mb-1" style={{ color: "#F9FAFB" }}>
        Subscriber Churn Risk Cohorts
      </h3>
      <p className="text-[11px] mb-5" style={{ color: "#6B7280" }}>
        Churn probability by subscriber engagement profile
      </p>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={CHURN_COHORTS}
          layout="vertical"
          margin={{ top: 0, right: 56, bottom: 0, left: 0 }}
        >
          <XAxis
            type="number"
            domain={[0, 80]}
            tick={{ fill: "#6B7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fill: "#9CA3AF", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={160}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#F9FAFB",
              fontSize: "11px",
            }}
            formatter={(value: number, _: unknown, props: { payload?: ChurnCohort }) => [
              `${value}% — ${props.payload?.riskLevel}`,
              "Churn Risk",
            ]}
          />
          <Bar dataKey="risk" radius={[0, 4, 4, 0]}>
            {CHURN_COHORTS.map((entry) => (
              <Cell key={entry.label} fill={entry.color} />
            ))}
            <LabelList
              dataKey="risk"
              position="right"
              formatter={(v: number) => `${v}%`}
              style={{ fill: "#9CA3AF", fontSize: 10 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div
        className="mt-4 pt-3 flex items-start gap-3 rounded-lg p-3"
        style={{ backgroundColor: "#0D1117", border: "1px solid rgba(239,68,68,0.2)" }}
      >
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#EF4444" }} />
        <p className="text-[11px] leading-relaxed" style={{ color: "#9CA3AF" }}>
          <span className="font-semibold" style={{ color: "#F9FAFB" }}>Action required: </span>
          Cross-promote F1 Australian GP (Mar 16) to 42K at-risk subscribers in the{" "}
          <span style={{ color: "#EF4444" }}>NASCAR Only</span> cohorts to reduce churn risk by an estimated 18\u201324 percentage points.
        </p>
      </div>
    </div>
  );
}

function ModelPerformanceTable() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ backgroundColor: "#111827", border: "1px solid #1F2937" }}
    >
      <h3 className="text-sm font-bold mb-1" style={{ color: "#F9FAFB" }}>
        Model Performance Summary
      </h3>
      <p className="text-[11px] mb-5" style={{ color: "#6B7280" }}>
        All models running on Amazon Bedrock &middot; Auto-retrain threshold: 5% accuracy drift
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid #1F2937" }}>
              {["Model", "Type", "Accuracy", "Data Points", "Last Retrained", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="py-2.5 px-3 text-left text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: "#6B7280", whiteSpace: "nowrap" }}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {MODEL_TABLE_ROWS.map((row, i) => {
              const isHealthy = row.status === "Healthy";
              const statusColor = isHealthy ? "#10B981" : "#F59E0B";
              const accuracyColor =
                row.accuracyNum >= 90
                  ? "#10B981"
                  : row.accuracyNum >= 80
                  ? "#FF9900"
                  : "#F59E0B";

              return (
                <tr
                  key={row.model}
                  style={{
                    borderBottom:
                      i < MODEL_TABLE_ROWS.length - 1
                        ? "1px solid #1F2937"
                        : undefined,
                  }}
                >
                  <td className="py-3 px-3 font-semibold whitespace-nowrap" style={{ color: "#F9FAFB" }}>
                    {row.model}
                  </td>
                  <td className="py-3 px-3 text-xs whitespace-nowrap" style={{ color: "#9CA3AF" }}>
                    {row.type}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap"
                      style={{
                        backgroundColor: `${accuracyColor}15`,
                        color: accuracyColor,
                        border: `1px solid ${accuracyColor}30`,
                      }}
                    >
                      {row.accuracy}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-xs whitespace-nowrap" style={{ color: "#9CA3AF" }}>
                    {row.dataPoints}
                  </td>
                  <td className="py-3 px-3 text-xs whitespace-nowrap" style={{ color: "#9CA3AF" }}>
                    {row.lastRetrained}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                      style={{
                        backgroundColor: `${statusColor}12`,
                        color: statusColor,
                      }}
                    >
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full${!isHealthy ? " animate-pulse" : ""}`}
                        style={{ backgroundColor: statusColor }}
                      />
                      {row.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        className="mt-4 pt-3 flex items-center justify-between"
        style={{ borderTop: "1px solid #1F2937" }}
      >
        <p className="text-[10px]" style={{ color: "#6B7280" }}>
          Models refreshed every 6 hours &bull; Last run: Feb 18, 2026 at 6:00 AM ET
        </p>
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#10B981" }} />
          <span className="text-[10px]" style={{ color: "#6B7280" }}>4 of 5 models healthy</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page (default export) ────────────────────────────────────────────────────

export default function AIInsightsPage() {
  return (
    <div className="min-h-screen" style={{ background: "#080C14" }}>
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        {/* Page title */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <Brain className="w-5 h-5" style={{ color: "#1399FF" }} />
              <h1 className="text-xl font-black tracking-tight" style={{ color: "#F9FAFB" }}>
                AI-Powered Analytics
              </h1>
            </div>
            <p className="text-[12px]" style={{ color: "#6B7280" }}>
              Powered by Amazon Bedrock &middot; Updated Feb 18, 2026
            </p>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold flex-shrink-0"
            style={{
              backgroundColor: "rgba(19,153,255,0.10)",
              border: "1px solid rgba(19,153,255,0.25)",
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

        {/* Model health status bar */}
        <ModelHealthBar />

        {/* AI Insight Cards 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {INSIGHTS.map((insight) => (
            <InsightCard key={insight.title} insight={insight} />
          ))}
        </div>

        {/* Churn cohort chart */}
        <ChurnRiskChart />

        {/* Model performance table */}
        <ModelPerformanceTable />

        <footer className="text-center py-6 border-t" style={{ borderColor: "#1F2937" }}>
          <p className="text-[11px]" style={{ color: "#4B5563" }}>
            Amazon Prime Video &middot; NASCAR Cup Series AI Analytics &middot; Q1 2026 &middot;{" "}
            <span style={{ color: "#374151" }}>CONFIDENTIAL</span>
          </p>
          <p className="text-[11px] mt-1" style={{ color: "#374151" }}>
            Powered by Amazon Bedrock &middot; Data as of Feb 18, 2026
          </p>
        </footer>
      </main>
    </div>
  );
}
