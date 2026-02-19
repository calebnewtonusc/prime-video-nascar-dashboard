import Header from "@/components/Header";
import DemoBanner from "@/components/DemoBanner";
import Link from "next/link";
import { BarChart2, DollarSign, Target, Cpu, ArrowRight, ArrowUpRight } from "lucide-react";

const STATS = [
  { label: "Q1 Unique Viewers", value: "16.4M",   delta: "+23.1%" },
  { label: "Total Revenue",     value: "$12.8M",  delta: "+18.5%" },
  { label: "New Subscribers",   value: "342K",    delta: "+31.0%" },
  { label: "Avg Session Length",value: "127 min", delta: "+8.1%"  },
];

const SECTIONS = [
  {
    href: "/viewership",
    icon: BarChart2,
    title: "Viewership Analytics",
    description: "Race-by-race audience trends, age and device demographics, geographic reach, and session depth analysis.",
    kpis: [{ label: "Q1 viewers", value: "16.4M" }, { label: "YoY growth", value: "+23.1%" }, { label: "Daytona peak", value: "8.2M" }],
  },
  {
    href: "/revenue",
    icon: DollarSign,
    title: "Revenue Analytics",
    description: "Subscription, advertising, and international revenue streams with ARPU tracking and cohort analysis.",
    kpis: [{ label: "Q1 revenue", value: "$12.8M" }, { label: "Sub revenue", value: "$8.7M" }, { label: "ARPU", value: "$37.42" }],
  },
  {
    href: "/marketing",
    icon: Target,
    title: "Marketing Attribution",
    description: "Full-funnel campaign tracking, channel ROAS comparison, CPA by source, and budget optimization.",
    kpis: [{ label: "Conversions", value: "210K" }, { label: "Blended CPA", value: "$5.01" }, { label: "Best ROAS", value: "31.2×" }],
  },
  {
    href: "/ai-insights",
    icon: Cpu,
    title: "AI Insights",
    description: "Amazon Bedrock models for churn prediction, audience segmentation, and Q2 revenue forecasting.",
    kpis: [{ label: "Active signals", value: "4" }, { label: "Q2 upside", value: "$2.4M" }, { label: "Churn rate", value: "2.3%" }],
  },
];

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#06090F" }}>
      <Header />
      <DemoBanner />

      <main className="max-w-[1400px] mx-auto px-6 md:px-10">

        {/* Page heading */}
        <div style={{ paddingTop: 44, paddingBottom: 32 }}>
          <div className="flex items-baseline gap-3 mb-1">
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#CBD8E8", letterSpacing: "-0.025em" }}>
              NASCAR Cup Series
            </h1>
            <span style={{ fontSize: 13, color: "#2E4560", fontWeight: 500 }}>Q1 2026 · Feb – Mar</span>
          </div>
          <p style={{ fontSize: 13, color: "#2E4560" }}>
            Amazon Prime Video — Internal performance overview
          </p>
        </div>

        {/* ── Stats bar ── */}
        <div style={{
          background: "#0A1525",
          border: "1px solid #162033",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 40,
        }}>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "22px 24px",
                  borderRight: i < STATS.length - 1 ? "1px solid #162033" : "none",
                  borderBottom: "none",
                }}
              >
                <p style={{
                  fontSize: 10, fontWeight: 600, color: "#2E4560",
                  textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 10,
                }}>
                  {s.label}
                </p>
                <p style={{
                  fontSize: 28, fontWeight: 700, color: "#C8D8E8",
                  fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em",
                  lineHeight: 1, marginBottom: 8,
                }}>
                  {s.value}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <ArrowUpRight size={11} style={{ color: "#138A60" }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#138A60" }}>{s.delta}</span>
                  <span style={{ fontSize: 11, color: "#233A52" }}>vs Q1 2025</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Analytics sections ── */}
        <div style={{ paddingBottom: 52 }}>
          <p style={{
            fontSize: 10, fontWeight: 700, color: "#263D55",
            textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16,
          }}>
            Analytics Sections
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.href} href={section.href} style={{ textDecoration: "none", display: "block" }}>
                  <div
                    className="nav-card"
                    style={{
                      background: "#0A1525",
                      border: "1px solid #162033",
                      borderRadius: 10,
                      padding: "22px 22px 20px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                      cursor: "pointer",
                    }}
                  >
                    {/* Icon row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 7,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: "#0F1D30", border: "1px solid #1A2E44",
                      }}>
                        <Icon size={15} style={{ color: "#3D5A78" }} />
                      </div>
                      <ArrowRight size={13} style={{ color: "#1E3248", marginTop: 3 }} />
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: 14, fontWeight: 600, color: "#C0D0E2",
                        letterSpacing: "-0.01em", marginBottom: 8, lineHeight: 1.3,
                      }}>
                        {section.title}
                      </h3>
                      <p style={{ fontSize: 12, color: "#364E65", lineHeight: 1.6 }}>
                        {section.description}
                      </p>
                    </div>

                    {/* KPI strip */}
                    <div style={{
                      display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                      borderTop: "1px solid #12202F", paddingTop: 14, marginTop: "auto",
                    }}>
                      {section.kpis.map((k, i) => (
                        <div
                          key={k.label}
                          style={{
                            paddingRight: i < 2 ? 10 : 0,
                            paddingLeft: i > 0 ? 10 : 0,
                            borderRight: i < 2 ? "1px solid #12202F" : "none",
                          }}
                        >
                          <p style={{
                            fontSize: 14, fontWeight: 700, color: "#B0C4DA",
                            fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em", lineHeight: 1,
                          }}>
                            {k.value}
                          </p>
                          <p style={{ fontSize: 10, color: "#253D55", marginTop: 4, lineHeight: 1.2 }}>
                            {k.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <footer style={{ borderTop: "1px solid #0F1D2E", paddingTop: 20, paddingBottom: 32 }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p style={{ fontSize: 11, color: "#1A2F45" }}>
              Amazon Prime Video · NASCAR Cup Series Analytics · Q1 2026 · CONFIDENTIAL
            </p>
            <p style={{ fontSize: 10, color: "#162535" }}>
              Prime Video Strategy Team · Amazon Bedrock · Build 2026.02.19
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
