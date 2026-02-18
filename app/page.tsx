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

export default function Page() {
  return (
    <div className="min-h-screen" style={{ background: "#080C14" }}>
      <Header />

      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">

        {/* Executive Summary */}
        <ExecSummary />

        {/* KPI Cards */}
        <KPICards />

        {/* Main charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ViewershipChart />
          </div>
          <div>
            <RevenueChart />
          </div>
        </div>

        {/* Race schedule + driver leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RaceSchedule />
          <DriverLeaderboard />
        </div>

        {/* Geographic breakdown + Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GeographicBreakdown />
          <EngagementFunnel />
        </div>

        {/* Competitive landscape — full width */}
        <CompetitorBenchmark />

        {/* AI Insights — full width */}
        <AIInsights />

        {/* Marketing tracker — full width */}
        <MarketingTracker />

        <footer className="text-center py-6 border-t" style={{ borderColor: "#1F2937" }}>
          <p className="text-[11px]" style={{ color: "#4B5563" }}>
            Amazon Prime Video &middot; NASCAR Cup Series Analytics &middot; Q1 2026 &middot;{" "}
            <span style={{ color: "#374151" }}>CONFIDENTIAL</span>
          </p>
          <p className="text-[11px] mt-1" style={{ color: "#374151" }}>
            Data as of Feb 18, 2026 &middot; Powered by Amazon Bedrock AI
          </p>
        </footer>
      </main>
    </div>
  );
}
