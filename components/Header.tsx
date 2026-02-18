import { Radio, ChevronDown } from "lucide-react";
import NavTabs from "@/components/NavTabs";
import ExportButton from "@/components/ExportButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: "#060A12", borderBottom: "1px solid #1A2437" }}>
      <div style={{ height: 2, background: "linear-gradient(90deg, #00A8FF 0%, #0047AB 100%)" }} />
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex items-center justify-between gap-6" style={{ height: 48 }}>

          {/* Branding */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex items-baseline gap-1.5 select-none">
              <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.2em", color: "#00A8FF", textTransform: "uppercase" }}>prime</span>
              <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", color: "#E8ECF4" }}>video</span>
            </div>
            <div style={{ width: 1, height: 22, background: "#1A2437" }} />
            <div className="flex items-center gap-2">
              <span style={{ fontSize: 13, fontWeight: 700, color: "#E8ECF4" }}>NASCAR Cup Series Analytics</span>
              <span style={{ fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.07em", background: "rgba(255,79,91,0.12)", color: "#FF4F5B", border: "1px solid rgba(255,79,91,0.2)" }}>
                Confidential
              </span>
              <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3, textTransform: "uppercase", letterSpacing: "0.07em", background: "rgba(0,168,255,0.1)", color: "#00A8FF", border: "1px solid rgba(0,168,255,0.2)" }}>
                Q1 2026
              </span>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md"
              style={{ background: "rgba(0,200,150,0.07)", border: "1px solid rgba(0,200,150,0.15)" }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#00C896" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#00C896" }} />
              </span>
              <Radio size={10} style={{ color: "#00C896" }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#00C896" }}>Live</span>
            </div>
            <button className="flex items-center gap-1 rounded-md"
              style={{ background: "#0A0F1E", border: "1px solid #1A2437", color: "#8B97AA", fontSize: 11, padding: "5px 9px", cursor: "pointer" }}>
              Feb–Mar 2026 <ChevronDown size={10} />
            </button>
            <ExportButton />
          </div>
        </div>
        <NavTabs />
      </div>
    </header>
  );
}
