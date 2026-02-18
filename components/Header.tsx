import { Radio, ChevronDown, BarChart2 } from "lucide-react";
import NavTabs from "@/components/NavTabs";
import ExportButton from "@/components/ExportButton";

export default function Header() {
  return (
    <header
      className="relative w-full sticky top-0 z-50"
      style={{ backgroundColor: "#080C14", borderBottom: "1px solid #1F2937" }}
    >
      {/* Top accent gradient stripe */}
      <div
        className="h-0.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, #CC0000 0%, #1399FF 35%, #FF9900 65%, #10B981 100%)",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-6">
        {/* Main row */}
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Branding */}
          <div className="flex items-center gap-5 flex-shrink-0">
            <div className="flex flex-col leading-none select-none">
              <span className="text-[10px] font-black uppercase tracking-[0.26em]" style={{ color: "#1399FF" }}>prime</span>
              <span className="text-[20px] font-extrabold tracking-tight -mt-0.5" style={{ color: "#F9FAFB" }}>video</span>
            </div>

            <div className="h-8 w-px" style={{ background: "linear-gradient(180deg, transparent, #374151, transparent)" }} />

            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "rgba(204,0,0,0.15)", border: "1px solid rgba(204,0,0,0.3)" }}>
                  <BarChart2 size={12} style={{ color: "#FF4444" }} />
                </div>
                <span className="text-[13px] font-bold text-white tracking-wide">NASCAR Cup Series Analytics</span>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest" style={{ background: "rgba(204,0,0,0.12)", color: "#FF6666", border: "1px solid rgba(204,0,0,0.22)" }}>Q1 2026</span>
              </div>
              <p className="text-[11px] mt-0.5 ml-8" style={{ color: "#6B7280" }}>Go-To-Market Strategy &middot; Performance &amp; Audience Intelligence</p>
            </div>
          </div>

          {/* Center quick-stats */}
          <div className="hidden xl:flex items-center gap-8">
            {[
              { label: "Total Q1 Viewers", value: "16.4M", delta: "+23%", color: "#1399FF" },
              { label: "New Subscribers", value: "342K", delta: "+31%", color: "#FF9900" },
              { label: "Q1 Revenue", value: "$12.8M", delta: "+18%", color: "#10B981" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center gap-1.5 justify-center">
                  <span className="text-[16px] font-black metric-value" style={{ color: stat.color }}>{stat.value}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: `${stat.color}15`, color: stat.color }}>{stat.delta}</span>
                </div>
                <p className="text-[10px] mt-0.5" style={{ color: "#6B7280" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <Radio size={12} style={{ color: "#10B981" }} />
              <span className="text-[11px] font-semibold" style={{ color: "#10B981" }}>Live</span>
            </div>

            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] transition-colors hover:text-white" style={{ background: "#111827", border: "1px solid #1F2937", color: "#9CA3AF" }}>
              Feb – Mar 2026 <ChevronDown size={12} />
            </button>

            <ExportButton />
          </div>
        </div>

        {/* Nav tabs */}
        <NavTabs />
      </div>
    </header>
  );
}
