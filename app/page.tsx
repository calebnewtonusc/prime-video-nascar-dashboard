import Header from "@/components/Header";
import DemoBanner from "@/components/DemoBanner";
import Link from "next/link";
import { BarChart2, DollarSign, Target, Cpu, ArrowRight, ArrowUpRight } from "lucide-react";

const STATS = [
  { label: "Q1 Unique Viewers", value: "16.4M",   delta: "+23.1%", sub: "vs Q1 2025" },
  { label: "Total Revenue",     value: "$12.8M",  delta: "+18.5%", sub: "vs Q1 2025" },
  { label: "New Subscribers",   value: "342K",    delta: "+31.0%", sub: "Daytona 500" },
  { label: "Avg Session",       value: "127 min", delta: "+8.1%",  sub: "per viewer"  },
];

const SECTIONS = [
  {
    href: "/viewership",
    icon: BarChart2,
    color: "#00A8E0",
    title: "Viewership Analytics",
    description: "Race-by-race audience trends, age and device demographics, geographic reach, and session depth analysis.",
    kpis: [{ label: "Q1 viewers", value: "16.4M" }, { label: "YoY growth", value: "+23.1%" }, { label: "Daytona peak", value: "8.2M" }],
    badge: "Live",
    badgeColor: "#00A8E0",
  },
  {
    href: "/revenue",
    icon: DollarSign,
    color: "#FF9900",
    title: "Revenue Analytics",
    description: "Subscription, advertising, and international revenue streams with ARPU tracking and cohort analysis.",
    kpis: [{ label: "Q1 revenue", value: "$12.8M" }, { label: "Sub revenue", value: "$8.7M" }, { label: "ARPU", value: "$37.42" }],
    badge: "Updated",
    badgeColor: "#FF9900",
  },
  {
    href: "/marketing",
    icon: Target,
    color: "#00A8E0",
    title: "Marketing Attribution",
    description: "Full-funnel campaign tracking, channel ROAS comparison, CPA by source, and budget optimization.",
    kpis: [{ label: "Conversions", value: "210K" }, { label: "Blended CPA", value: "$5.01" }, { label: "Best ROAS", value: "31.2×" }],
    badge: "Active",
    badgeColor: "#00A8E0",
  },
  {
    href: "/ai-insights",
    icon: Cpu,
    color: "#FF9900",
    title: "AI Insights",
    description: "Amazon Bedrock models for churn prediction, audience segmentation, and Q2 revenue forecasting.",
    kpis: [{ label: "Active signals", value: "4" }, { label: "Q2 upside", value: "$2.4M" }, { label: "Churn rate", value: "2.3%" }],
    badge: "Beta",
    badgeColor: "#FF9900",
  },
];

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#05080F" }}>
      <Header />
      <DemoBanner />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10">

        {/* Page heading */}
        <div style={{ paddingTop: 36, paddingBottom: 24 }}>
          <div className="flex items-baseline gap-3 mb-1">
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#CBD8E8", letterSpacing: "-0.025em" }}>
              NASCAR Cup Series
            </h1>
            <span style={{ fontSize: 13, color: "#2E4560", fontWeight: 500 }}>Q1 2026 · Feb – Mar</span>
          </div>
          <p style={{ fontSize: 12, color: "#2E4560" }}>
            Amazon Prime Video — Internal performance overview
          </p>
        </div>

        {/* ── Stats bar ── */}
        <div style={{
          background: "#0B1119",
          border: "1px solid #182035",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 36,
        }}>
          <div style={{ height: 2, background: "linear-gradient(90deg, #00A8E0 0%, #0047AB 60%, #FF9900 100%)" }} />
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "20px 22px",
                  borderRight: i < STATS.length - 1 ? "1px solid #182035" : "none",
                }}
              >
                <p style={{
                  fontSize: 9, fontWeight: 700, color: "#2E4560",
                  textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 8,
                }}>
                  {s.label}
                </p>
                <p style={{
                  fontSize: 26, fontWeight: 800, color: "#C8D8E8",
                  fontVariantNumeric: "tabular-nums", letterSpacing: "-0.03em",
                  lineHeight: 1, marginBottom: 8,
                }}>
                  {s.value}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <ArrowUpRight size={10} style={{ color: "#138A60" }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#138A60" }}>{s.delta}</span>
                  <span style={{ fontSize: 10, color: "#2E4560" }}>{s.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Race progress bar ── */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.09em", color: "#4E5E74" }}>Q1 Race Season Progress</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#00A8E0" }}>3 of 6 complete</span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: "#182035", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", inset: "0 50% 0 0", background: "linear-gradient(90deg, #00A8E0, #FF9900)", borderRadius: 3 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {["Daytona", "Las Vegas", "Atlanta", "Phoenix", "COTA", "Bristol"].map((r, i) => (
              <div key={r} style={{ textAlign: "center" }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", margin: "0 auto 3px",
                  background: i < 3 ? "#00A8E0" : "#182035",
                  border: i === 2 ? "2px solid #FF9900" : "none",
                }} />
                <span style={{ fontSize: 8, color: i < 3 ? "#4E5E74" : "#2E4560", fontWeight: i < 3 ? 600 : 400 }}>{r}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Analytics sections ── */}
        <div style={{ paddingBottom: 52 }}>
          <p style={{
            fontSize: 10, fontWeight: 700, color: "#263D55",
            textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14,
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
                      background: "#0B1119",
                      border: "1px solid #182035",
                      borderRadius: 10,
                      padding: "20px 20px 18px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Top accent line */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: section.color + "44", borderRadius: "10px 10px 0 0" }} />

                    {/* Icon row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 8,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: section.color + "15",
                        border: `1px solid ${section.color}28`,
                      }}>
                        <Icon size={15} style={{ color: section.color }} />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{
                          fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 3,
                          background: section.badgeColor + "15", color: section.badgeColor,
                          border: `1px solid ${section.badgeColor}30`,
                          textTransform: "uppercase", letterSpacing: "0.06em",
                        }}>
                          {section.badge}
                        </span>
                        <ArrowRight size={12} style={{ color: "#2E4560" }} />
                      </div>
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: 14, fontWeight: 700, color: "#C0D0E2",
                        letterSpacing: "-0.01em", marginBottom: 6, lineHeight: 1.3,
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
                      borderTop: "1px solid #12202F", paddingTop: 12, marginTop: "auto",
                    }}>
                      {section.kpis.map((k, i) => (
                        <div
                          key={k.label}
                          style={{
                            paddingRight: i < 2 ? 8 : 0,
                            paddingLeft: i > 0 ? 8 : 0,
                            borderRight: i < 2 ? "1px solid #12202F" : "none",
                          }}
                        >
                          <p style={{
                            fontSize: 13, fontWeight: 800, color: section.color,
                            fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em", lineHeight: 1,
                          }}>
                            {k.value}
                          </p>
                          <p style={{ fontSize: 9, color: "#253D55", marginTop: 3, lineHeight: 1.2 }}>
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
