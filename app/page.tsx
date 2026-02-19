import Header from "@/components/Header";
import KPIStrip from "@/components/KPIStrip";
import KPICards from "@/components/KPICards";
import DemoBanner from "@/components/DemoBanner";
import ExecSummary from "@/components/ExecSummary";
import Link from "next/link";
import { TrendingUp, DollarSign, Megaphone, Brain, ChevronRight } from "lucide-react";

function SectionHeader({ label, count, sublabel }: { label: string; count?: string; sublabel?: string }) {
  return (
    <div className="flex items-center gap-3 pb-3">
      <div style={{ width: 2, height: 14, borderRadius: 2, background: "linear-gradient(180deg, #00A8FF 0%, #0047AB 100%)", flexShrink: 0 }} />
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00A8FF", whiteSpace: "nowrap" }}>
        {label}
      </span>
      {count && (
        <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 7px", borderRadius: 3, background: "rgba(0,168,255,0.08)", color: "#00A8FF", border: "1px solid rgba(0,168,255,0.18)", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
          {count}
        </span>
      )}
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #1A2437 0%, transparent 100%)" }} />
      {sublabel && (
        <span style={{ fontSize: 10, color: "#4E5E74", whiteSpace: "nowrap", fontStyle: "italic" }}>{sublabel}</span>
      )}
    </div>
  );
}

const NAV_SECTIONS = [
  {
    href: "/viewership",
    icon: TrendingUp,
    title: "Viewership Analytics",
    sublabel: "Race trends · Demographics · Geographic · Race intel",
    metrics: ["21.7M Q1 viewers", "+12.8% YoY", "8.2M Daytona peak"],
    color: "#00A8FF",
  },
  {
    href: "/revenue",
    icon: DollarSign,
    title: "Revenue Analytics",
    sublabel: "Subscriptions · Ad revenue · ARPU · International",
    metrics: ["$12.8M Q1 total", "+18% YoY", "$37.50 ARPU"],
    color: "#00C896",
  },
  {
    href: "/marketing",
    icon: Megaphone,
    title: "Marketing Attribution",
    sublabel: "Campaign performance · Channel mix · ROAS",
    metrics: ["210K conversions", "$5.01 blended CPA", "31.2× best ROAS"],
    color: "#FF9900",
  },
  {
    href: "/ai-insights",
    icon: Brain,
    title: "AI-Powered Insights",
    sublabel: "Amazon Bedrock · Predictions · Churn analysis",
    metrics: ["4/5 models healthy", "4 active signals", "$2.4M Q2 opportunity"],
    color: "#7C6FFF",
  },
];

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#060A12" }}>
      <Header />
      <KPIStrip />
      <DemoBanner />

      <main className="max-w-[1600px] mx-auto px-4 md:px-6">

        {/* ── GTM Recommendations — FIRST: strategy before data ── */}
        <div className="pt-5 pb-4 section-in section-in-1">
          <SectionHeader label="GTM Recommendations" count="3 Priority Actions" sublabel="Q2 2026 Execution Plan" />
          <ExecSummary />
        </div>

        {/* ── KPI Summary Cards ── */}
        <div className="pb-4 section-in section-in-2">
          <SectionHeader label="Performance Metrics" count="Q1 2026" sublabel="vs Q1 2025 · Live" />
          <KPICards />
        </div>

        {/* ── Deep Dive Navigation ── */}
        <div className="section-in section-in-3">
          <div className="pb-2">
            <SectionHeader label="Deep Dive Reports" count="4 Sections" sublabel="Click to explore detailed analytics" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-5">
            {NAV_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.href} href={section.href} style={{ textDecoration: "none" }}>
                  <div
                    className="card-hover rounded-[10px] p-5 h-full"
                    style={{ background: "#0C1220", border: "1px solid #1A2437", cursor: "pointer" }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 8,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: `${section.color}15`, border: `1px solid ${section.color}28`, flexShrink: 0,
                      }}>
                        <Icon size={16} style={{ color: section.color }} />
                      </div>
                      <ChevronRight size={14} style={{ color: "#4E5E74", marginTop: 2 }} />
                    </div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: "#E8ECF4", marginBottom: 4 }}>{section.title}</h3>
                    <p style={{ fontSize: 10, color: "#4E5E74", marginBottom: 14, lineHeight: 1.5 }}>{section.sublabel}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {section.metrics.map((metric) => (
                        <p key={metric} style={{ fontSize: 11, color: "#8B97AA", display: "flex", alignItems: "center", gap: 7, margin: 0 }}>
                          <span style={{ width: 4, height: 4, borderRadius: "50%", background: section.color, flexShrink: 0, display: "inline-block" }} />
                          {metric}
                        </p>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <footer className="py-5" style={{ borderTop: "1px solid #1A2437" }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p style={{ fontSize: 11, color: "#4E5E74" }}>
              Amazon Prime Video · NASCAR Cup Series Analytics · Q1 2026 ·{" "}
              <span style={{ color: "#2E3F56" }}>CONFIDENTIAL — INTERNAL USE ONLY</span>
            </p>
            <p style={{ fontSize: 10, color: "#2E3F56", whiteSpace: "nowrap" }}>
              Built by Prime Video Strategy Team · Amazon Bedrock AI · Build 2026.02.19
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
