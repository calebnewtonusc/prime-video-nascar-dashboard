import Header from "@/components/Header";
import ExecSummary from "@/components/ExecSummary";
import KPICards from "@/components/KPICards";
import ViewershipChart from "@/components/ViewershipChart";
import RevenueChart from "@/components/RevenueChart";
import RaceSchedule from "@/components/RaceSchedule";
import DriverLeaderboard from "@/components/DriverLeaderboard";
import EngagementFunnel from "@/components/EngagementFunnel";
import GeographicBreakdown from "@/components/GeographicBreakdown";
import CompetitorBenchmark from "@/components/CompetitorBenchmark";
import AIInsights from "@/components/AIInsights";
import MarketingTracker from "@/components/MarketingTracker";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4E5E74" }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: "#1A2437" }} />
    </div>
  );
}

export default function Page() {
  return (
    <div style={{ minHeight: "100vh", background: "#060A12" }}>
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 py-5 space-y-8">

        {/* Strategic Priorities */}
        <ExecSummary />

        {/* KPIs */}
        <section>
          <SectionLabel>Performance Overview · Q1 2026</SectionLabel>
          <KPICards />
        </section>

        {/* Primary Charts */}
        <section>
          <SectionLabel>Viewership &amp; Revenue</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2"><ViewershipChart /></div>
            <div><RevenueChart /></div>
          </div>
        </section>

        {/* Race + Driver */}
        <section>
          <SectionLabel>Race Schedule &amp; Driver Popularity</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <RaceSchedule />
            <DriverLeaderboard />
          </div>
        </section>

        {/* Audience */}
        <section>
          <SectionLabel>Audience Intelligence</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <GeographicBreakdown />
            <EngagementFunnel />
          </div>
        </section>

        {/* Competitive */}
        <section>
          <SectionLabel>Competitive Landscape</SectionLabel>
          <CompetitorBenchmark />
        </section>

        {/* AI */}
        <section>
          <SectionLabel>AI &amp; Predictive Insights</SectionLabel>
          <AIInsights />
        </section>

        {/* Marketing */}
        <section>
          <SectionLabel>Marketing Performance</SectionLabel>
          <MarketingTracker />
        </section>

        <footer className="text-center py-5" style={{ borderTop: "1px solid #1A2437" }}>
          <p style={{ fontSize: 11, color: "#4E5E74" }}>
            Amazon Prime Video · NASCAR Cup Series Analytics · Q1 2026 ·{" "}
            <span style={{ color: "#2E3F56" }}>CONFIDENTIAL — INTERNAL USE ONLY</span>
          </p>
          <p style={{ fontSize: 10, color: "#2E3F56", marginTop: 4 }}>
            Data refreshed: Feb 18, 2026 09:14 UTC · Powered by Amazon Bedrock AI · Build 2026.02.18
          </p>
        </footer>
      </main>
    </div>
  );
}
