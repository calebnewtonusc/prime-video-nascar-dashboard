import Header from "@/components/Header";
import KPIStrip from "@/components/KPIStrip";
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

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#060A12" }}>
      <Header />
      <KPIStrip />

      <main className="max-w-[1600px] mx-auto px-6">

        {/* ── Row 1: Primary view — fills remaining viewport height ── */}
        <div className="grid gap-4 py-4" style={{ gridTemplateColumns: "minmax(0,3fr) minmax(0,2fr)" }}>
          {/* Left: Main chart */}
          <ViewershipChart />

          {/* Right: Revenue + Competitive stacked */}
          <div className="flex flex-col gap-4">
            <RevenueChart />
            <CompetitorBenchmark />
          </div>
        </div>

        {/* ── Row 2: Race + Driver ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
          <RaceSchedule />
          <DriverLeaderboard />
        </div>

        {/* ── Row 3: Marketing table — full width ── */}
        <div className="pb-4">
          <MarketingTracker />
        </div>

        {/* ── Row 4: AI Insights — full width ── */}
        <div className="pb-4">
          <AIInsights />
        </div>

        {/* ── Row 5: Geographic + Funnel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
          <GeographicBreakdown />
          <EngagementFunnel />
        </div>

        {/* ── Row 6: Strategic summary at bottom ── */}
        <div className="pb-4">
          <ExecSummary />
        </div>

        <footer className="py-5" style={{ borderTop: "1px solid #1A2437" }}>
          <div className="flex items-center justify-between">
            <p style={{ fontSize: 11, color: "#4E5E74" }}>
              Amazon Prime Video · NASCAR Cup Series Analytics · Q1 2026 ·{" "}
              <span style={{ color: "#2E3F56" }}>CONFIDENTIAL — INTERNAL USE ONLY</span>
            </p>
            <p style={{ fontSize: 10, color: "#2E3F56" }}>
              Data refreshed: Feb 18, 2026 09:14 UTC · Amazon Bedrock AI · Build 2026.02.18
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
