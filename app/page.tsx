import Header from "@/components/Header";
import DemoBanner from "@/components/DemoBanner";
import Link from "next/link";
import { TrendingUp, DollarSign, Megaphone, Brain, ChevronRight, ArrowUpRight } from "lucide-react";

const HERO_STATS = [
  { label: "Q1 Viewers",      value: "16.4M",   delta: "+23.1%", color: "#00A8FF" },
  { label: "Total Revenue",   value: "$12.8M",  delta: "+18.5%", color: "#00C896" },
  { label: "New Subscribers", value: "342K",    delta: "+31.0%", color: "#FF9900" },
  { label: "Avg Watch Time",  value: "127 min", delta: "+8.1%",  color: "#7C6FFF" },
];

const NAV_SECTIONS = [
  {
    href: "/viewership",
    icon: TrendingUp,
    title: "Viewership Analytics",
    sublabel: "Race trends · Demographics · Geographic breakdown · Race intelligence",
    metrics: ["21.7M Q1 viewers", "+12.8% YoY growth", "8.2M Daytona 500 peak"],
    color: "#00A8FF",
  },
  {
    href: "/revenue",
    icon: DollarSign,
    title: "Revenue Analytics",
    sublabel: "Subscriptions · Ad revenue · ARPU · International markets",
    metrics: ["$12.8M Q1 total", "+18% YoY", "$37.50 blended ARPU"],
    color: "#00C896",
  },
  {
    href: "/marketing",
    icon: Megaphone,
    title: "Marketing Attribution",
    sublabel: "Campaign performance · Channel mix · ROAS analysis",
    metrics: ["210K conversions", "$5.01 blended CPA", "31.2× email ROAS"],
    color: "#FF9900",
  },
  {
    href: "/ai-insights",
    icon: Brain,
    title: "AI-Powered Insights",
    sublabel: "Amazon Bedrock · Predictive signals · Churn analysis",
    metrics: ["4/5 models healthy", "4 active signals", "$2.4M Q2 opportunity"],
    color: "#7C6FFF",
  },
];

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#060A12" }}>
      <Header />
      <DemoBanner />

      <main className="max-w-[1600px] mx-auto px-4 md:px-8">

        {/* ── Hero: page title + 4 compact stat tiles ── */}
        <div className="pt-10 pb-8">
          <div className="mb-6">
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#E8ECF4", letterSpacing: "-0.02em", marginBottom: 4 }}>
              Q1 2026 — NASCAR Cup Series
            </h1>
            <p style={{ fontSize: 13, color: "#4E5E74" }}>
              Amazon Prime Video · Performance overview · Feb–Mar 2026
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {HERO_STATS.map(s => (
              <div
                key={s.label}
                style={{
                  background: "#0C1220",
                  border: "1px solid #1A2437",
                  borderLeft: `2px solid ${s.color}`,
                  borderRadius: 10,
                  padding: "16px 20px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
                }}
              >
                <p style={{ fontSize: 10, color: "#4E5E74", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 700 }}>
                  {s.label}
                </p>
                <p style={{ fontSize: 26, fontWeight: 800, color: "#E8ECF4", letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
                  {s.value}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight size={11} style={{ color: "#00C896" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#00C896" }}>{s.delta} YoY</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Deep Dive Navigation ── */}
        <div className="pb-10">
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: 2, height: 14, borderRadius: 2, background: "linear-gradient(180deg, #00A8FF 0%, #0047AB 100%)", flexShrink: 0 }} />
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00A8FF" }}>
              Deep Dive Reports
            </span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #1A2437 0%, transparent 100%)" }} />
            <span style={{ fontSize: 10, color: "#4E5E74", fontStyle: "italic" }}>Select a section to explore</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {NAV_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.href} href={section.href} style={{ textDecoration: "none" }}>
                  <div
                    className="card-hover rounded-[12px] h-full"
                    style={{
                      background: "#0C1220",
                      border: "1px solid #1A2437",
                      cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                      padding: "24px",
                    }}
                  >
                    {/* Icon + chevron */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: 11,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: `${section.color}12`,
                        border: `1px solid ${section.color}25`,
                        flexShrink: 0,
                      }}>
                        <Icon size={18} style={{ color: section.color }} />
                      </div>
                      <ChevronRight size={14} style={{ color: "#2E3F56", marginTop: 4 }} />
                    </div>

                    {/* Title + sublabel */}
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#E8ECF4", marginBottom: 6, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
                      {section.title}
                    </h3>
                    <p style={{ fontSize: 11, color: "#4E5E74", marginBottom: 20, lineHeight: 1.6 }}>
                      {section.sublabel}
                    </p>

                    {/* Metric bullets */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, borderTop: "1px solid #1A2437", paddingTop: 16 }}>
                      {section.metrics.map((metric) => (
                        <p key={metric} style={{ fontSize: 11, color: "#8B97AA", display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
                          <span style={{ width: 4, height: 4, borderRadius: "50%", background: section.color, flexShrink: 0, display: "inline-block", opacity: 0.75 }} />
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
