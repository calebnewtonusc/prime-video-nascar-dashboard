"use client";
import { Brain, TrendingUp, AlertTriangle, Target, Zap, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const models = [
  { name: "Churn Prediction",   acc: 94.2, f1: 91.8, drift: 0.8,  healthy: true  },
  { name: "LTV Forecasting",    acc: 87.6, f1: 85.4, drift: 1.2,  healthy: true  },
  { name: "Content Recommender",acc: 91.3, f1: 88.7, drift: 0.4,  healthy: true  },
  { name: "Ad Bid Optimizer",   acc: 89.1, f1: 86.2, drift: 3.1,  healthy: false },
  { name: "Audience Segmenter", acc: 93.7, f1: 90.3, drift: 0.6,  healthy: true  },
];

const churnRisk = [
  { segment: "Trial (0-7 days)",       risk: 38, users: 12400, color: "#FF4F5B" },
  { segment: "Casual (1-2 races/mo)",  risk: 22, users: 38200, color: "#F59E0B" },
  { segment: "NASCAR-only",            risk: 18, users: 54100, color: "#F59E0B" },
  { segment: "Multi-sport",            risk: 8,  users: 89300, color: "#00C896" },
  { segment: "Prime Bundle",           risk: 4,  users: 148500,color: "#00C896" },
];

const signals = [
  {
    icon: TrendingUp, color: "#00A8FF",
    title: "Daytona 500 Halo Effect",
    value: "+41% subscribe intent",
    desc: "Chase Elliott viewers show 41% higher subscription intent in the 7 days post-Daytona. Recommend targeted re-engagement campaign for 280K non-subscribers who streamed the race.",
    confidence: 96,
    action: "Launch retargeting",
  },
  {
    icon: AlertTriangle, color: "#F59E0B",
    title: "Churn Risk: Trial Cohort",
    value: "38% 30-day churn risk",
    desc: "12,400 trial users acquired during Daytona weekend show elevated churn signals. Personalized 'Next Race' push notifications reduce churn by 31% per A/B test results.",
    confidence: 91,
    action: "Activate retention flow",
  },
  {
    icon: Target, color: "#00C896",
    title: "Email Revenue Opportunity",
    value: "$2.4M Q2 upside",
    desc: "Model identifies 94,000 lapsed subscribers with high reactivation probability. Email series at $0.08 cost-per-send projects $2.4M incremental ARR at 31x historical ROAS.",
    confidence: 88,
    action: "Queue email series",
  },
  {
    icon: Zap, color: "#7C6FFF",
    title: "Ad CPM Optimization",
    value: "+$3.80 CPM achievable",
    desc: "Ad Bid Optimizer (drift alert: 3.1%) underperforming benchmark by $3.80 CPM. Retraining on Q1 2026 data projected to recover $420K in Q2 ad revenue.",
    confidence: 83,
    action: "Trigger model retrain",
  },
];

interface TProps { active?: boolean; payload?: { payload: typeof churnRisk[0]; value: number }[]; }
function ChurnTip({ active, payload }: TProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#0C1220", border: "1px solid #243044", borderRadius: 8, padding: "10px 14px", fontSize: 12 }}>
      <p style={{ fontWeight: 700, color: "#E8ECF4", marginBottom: 4 }}>{d.segment}</p>
      <p style={{ color: "#8B97AA" }}>Churn risk: <strong style={{ color: d.color }}>{d.risk}%</strong></p>
      <p style={{ color: "#8B97AA" }}>Users at risk: <strong style={{ color: "#E8ECF4" }}>{(d.users * d.risk / 100).toLocaleString()}</strong></p>
      <p style={{ color: "#4E5E74", fontSize: 11, marginTop: 4 }}>Total segment: {d.users.toLocaleString()}</p>
    </div>
  );
}

export default function AIInsights() {
  return (
    <div className="space-y-4">
      {/* Model Health */}
      <div className="rounded-[10px] overflow-hidden" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid #1A2437" }}>
          <Brain size={15} style={{ color: "#7C6FFF" }} />
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4" }}>Amazon Bedrock AI Models</h2>
            <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 1 }}>Production model health · Live inference metrics</p>
          </div>
          <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "rgba(124,111,255,0.1)", color: "#7C6FFF", border: "1px solid rgba(124,111,255,0.25)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {models.filter(m => m.healthy).length}/{models.length} Healthy
          </span>
        </div>
        <div className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "#060A12" }}>
                {["Model", "Accuracy", "F1 Score", "Data Drift", "Status"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4E5E74", borderBottom: "1px solid #1A2437", whiteSpace: "nowrap" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {models.map(m => (
                <tr key={m.name} style={{ borderBottom: "1px solid #1A2437" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, color: "#E8ECF4" }}>{m.name}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <div className="flex items-center gap-2">
                      <div style={{ width: 60, height: 4, background: "#1A2437", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${m.acc}%`, background: m.acc > 90 ? "#00C896" : "#F59E0B", borderRadius: 2 }} />
                      </div>
                      <span style={{ color: m.acc > 90 ? "#00C896" : "#F59E0B", fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>{m.acc}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 12px", fontVariantNumeric: "tabular-nums", color: "#8B97AA" }}>{m.f1}%</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, fontVariantNumeric: "tabular-nums", color: m.drift < 1.5 ? "#4E5E74" : m.drift < 2.5 ? "#F59E0B" : "#FF4F5B" }}>
                      {m.drift > 2 ? "! " : ""}{m.drift.toFixed(1)}%
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", background: m.healthy ? "rgba(0,200,150,0.1)" : "rgba(245,158,11,0.1)", color: m.healthy ? "#00C896" : "#F59E0B", border: `1px solid ${m.healthy ? "rgba(0,200,150,0.25)" : "rgba(245,158,11,0.25)"}` }}>
                      {m.healthy ? "Healthy" : "Drift Alert"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights + Churn chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Signals */}
        <div className="lg:col-span-2 rounded-[10px] overflow-hidden" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
          <div className="px-5 py-4" style={{ borderBottom: "1px solid #1A2437" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4" }}>Predictive Signals</h3>
            <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 1 }}>AI-generated recommendations · Ranked by confidence</p>
          </div>
          <div className="divide-y" style={{ borderColor: "#1A2437" }}>
            {signals.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="flex items-start gap-4 px-5 py-4" style={{ borderBottom: "1px solid #1A2437" }}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15`, border: `1px solid ${s.color}28` }}>
                    <Icon size={14} style={{ color: s.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#E8ECF4" }}>{s.title}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: s.color }}>{s.value}</span>
                    </div>
                    <p style={{ fontSize: 11, color: "#8B97AA", lineHeight: 1.6, marginBottom: 8 }}>{s.desc}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div style={{ width: 60, height: 3, background: "#1A2437", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${s.confidence}%`, background: s.color, borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 10, color: "#4E5E74" }}>Confidence {s.confidence}%</span>
                      </div>
                      <button style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 4, background: `${s.color}15`, color: s.color, border: `1px solid ${s.color}30`, cursor: "pointer", letterSpacing: "0.03em" }}>
                        {s.action} &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Churn Risk by Segment */}
        <div className="rounded-[10px] overflow-hidden" style={{ background: "#0C1220", border: "1px solid #1A2437" }}>
          <div className="px-5 py-4" style={{ borderBottom: "1px solid #1A2437" }}>
            <div className="flex items-center gap-2">
              <Users size={13} style={{ color: "#FF4F5B" }} />
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4" }}>30-Day Churn Risk</h3>
            </div>
            <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 1 }}>By subscriber segment</p>
          </div>
          <div className="p-5 pb-4">
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={churnRisk} layout="vertical" margin={{ left: 0, right: 40, top: 4, bottom: 4 }}>
                  <CartesianGrid horizontal={false} stroke="#1A2437" strokeDasharray="2 4" />
                  <XAxis type="number" tick={{ fill: "#4E5E74", fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} domain={[0, 45]} />
                  <YAxis
                    type="category" dataKey="segment" width={130}
                    tick={{ fill: "#8B97AA", fontSize: 10 }}
                    tickLine={false} axisLine={false}
                    tickFormatter={v => v.split("(")[0].trim()}
                  />
                  <Tooltip content={<ChurnTip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar isAnimationActive={false} dataKey="risk" radius={[0, 3, 3, 0]} maxBarSize={16}>
                    {churnRisk.map(d => <Cell key={d.segment} fill={d.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-3">
              {churnRisk.map(s => (
                <div key={s.segment} className="flex items-center justify-between text-[11px]">
                  <span style={{ color: "#8B97AA" }}>{s.segment.split("(")[0].trim()}</span>
                  <div className="flex items-center gap-2">
                    <span style={{ color: "#4E5E74" }}>{s.users.toLocaleString()} users</span>
                    <span style={{ color: s.color, fontWeight: 700, minWidth: 36, textAlign: "right" }}>{s.risk}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
