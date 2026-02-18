import Header from "@/components/Header";
import KPICards from "@/components/KPICards";
import ViewershipChart from "@/components/ViewershipChart";
import RevenueChart from "@/components/RevenueChart";
import RaceSchedule from "@/components/RaceSchedule";
import DriverLeaderboard from "@/components/DriverLeaderboard";
import EngagementFunnel from "@/components/EngagementFunnel";
import GeographicBreakdown from "@/components/GeographicBreakdown";
import AIInsights from "@/components/AIInsights";
import MarketingTracker from "@/components/MarketingTracker";

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0F1117]">
      <Header />
      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
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

        {/* Race schedule + drivers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RaceSchedule />
          <DriverLeaderboard />
        </div>

        {/* Geographic + Funnel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GeographicBreakdown />
          <EngagementFunnel />
        </div>

        {/* AI Insights - full width */}
        <AIInsights />

        {/* Marketing tracker - full width */}
        <MarketingTracker />

        {/* Footer */}
        <footer className="text-center text-[#6B7280] text-sm py-4 border-t border-[#252D3D]">
          <p>Amazon Prime Video · NASCAR Cup Series Analytics · Q1 2026 · Confidential</p>
          <p className="mt-1">Data as of February 17, 2026 · Powered by Amazon Bedrock AI</p>
        </footer>
      </main>
    </div>
  );
}
