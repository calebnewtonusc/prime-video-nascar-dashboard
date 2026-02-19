import Header from "@/components/Header";
import KPIStrip from "@/components/KPIStrip";
import KPICards from "@/components/KPICards";
import DemoBanner from "@/components/DemoBanner";
import ViewershipChart from "@/components/ViewershipChart";
import RevenueChart from "@/components/RevenueChart";
import CompetitorBenchmark from "@/components/CompetitorBenchmark";
import RaceSchedule from "@/components/RaceSchedule";
import DriverLeaderboard from "@/components/DriverLeaderboard";
import MarketingTracker from "@/components/MarketingTracker";
import AIInsights from "@/components/AIInsights";
import GeographicBreakdown from "@/components/GeographicBreakdown";
import EngagementFunnel from "@/components/EngagementFunnel";
import ExecSummary from "@/components/ExecSummary";
import AIAnalyst from "@/components/AIAnalyst";

function SectionHeader({ label, count, sublabel }: { label: string; count?: string; sublabel?: string }) {
  return (
    <div className="flex items-center gap-3 pb-3">
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4E5E74", whiteSpace: "nowrap" }}>
        {label}
      </span>
      {count && (
        <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 3, background: "rgba(0,168,255,0.08)", color: "#00A8FF", border: "1px solid rgba(0,168,255,0.15)", letterSpacing: "0.06em" }}>
          {count}
        </span>
      )}
      <div style={{ flex: 1, height: 1, background: "#1A2437" }} />
      {sublabel && (
        <span style={{ fontSize: 10, color: "#4E5E74", whiteSpace: "nowrap" }}>{sublabel}</span>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#060A12" }}>
      <Header />
      <KPIStrip />
      <DemoBanner />

      <main className="max-w-[1600px] mx-auto px-4 md:px-6">

        {/* ── GTM Recommendations — FIRST: strategy before data ── */}
        <div className="pt-5 pb-4">
          <SectionHeader label="GTM Recommendations" count="3 Priority Actions" sublabel="Q2 2026 Execution Plan" />
          <ExecSummary />
        </div>

        {/* ── KPI Summary Cards ── */}
        <div className="pb-4">
          <SectionHeader label="Performance Metrics" count="Q1 2026" sublabel="vs Q1 2025 · Live" />
          <KPICards />
        </div>

        {/* ── Row 1: Primary charts ── */}
        <div className="pb-2">
          <SectionHeader label="Viewership & Revenue" sublabel="Live data · Updates every 60s" />
        </div>
        <div className="grid gap-4 pb-5 grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <ViewershipChart />
          <div className="flex flex-col gap-4">
            <RevenueChart />
            <CompetitorBenchmark />
          </div>
        </div>

        {/* ── Row 2: Race + Driver ── */}
        <div className="pb-2">
          <SectionHeader label="Race Intelligence" sublabel="Q1 2026 · 6 races" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-5">
          <RaceSchedule />
          <DriverLeaderboard />
        </div>

        {/* ── Row 3: Marketing ── */}
        <div className="pb-2">
          <SectionHeader label="Campaign Attribution" count="10 Campaigns" sublabel="Sorted by ROAS" />
        </div>
        <div className="pb-5">
          <MarketingTracker />
        </div>

        {/* ── Row 4: AI Insights ── */}
        <div className="pb-2">
          <SectionHeader label="Amazon Bedrock AI" sublabel="5 models · Predictive signals" />
        </div>
        <div className="pb-5">
          <AIInsights />
        </div>

        {/* ── Row 5: AI Analyst chat ── */}
        <div className="pb-2">
          <SectionHeader label="AI Analyst" sublabel="Ollama · Local LLM · Ask anything about the data" />
        </div>
        <div className="pb-5">
          <AIAnalyst />
        </div>

        {/* ── Row 6: Geographic + Funnel ── */}
        <div className="pb-2">
          <SectionHeader label="Audience Intelligence" sublabel="Geographic breakdown · Conversion funnel" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-5">
          <GeographicBreakdown />
          <EngagementFunnel />
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
