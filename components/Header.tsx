import { Radio, ChevronDown } from "lucide-react";
import NavTabs from "@/components/NavTabs";
import ExportButton from "@/components/ExportButton";

const quickStats = [
  { label: "Q1 Viewers",   value: "16.4M", delta: "+23%", up: true  },
  { label: "New Subs",     value: "342K",  delta: "+31%", up: true  },
  { label: "Revenue",      value: "$12.8M",delta: "+18%", up: true  },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: "#060A12", borderBottom: "1px solid #1A2437" }}>
      {/* 2px blue accent stripe */}
      <div style={{ height: 2, background: "linear-gradient(90deg, #00A8FF 0%, #0076CC 60%, transparent 100%)" }} />

      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex items-center justify-between gap-6" style={{ height: 56 }}>

          {/* Left: branding */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex flex-col leading-none select-none">
              <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: "0.24em", color: "#00A8FF", textTransform: "uppercase" }}>prime</span>
              <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", color: "#E8ECF4", marginTop: -1 }}>video</span>
            </div>

            <div style={{ width: 1, height: 28, background: "linear-gradient(180deg, transparent, #243044, transparent)" }} />

            <div>
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 13, fontWeight: 700, color: "#E8ECF4", letterSpacing: "-0.01em" }}>
                  NASCAR Cup Series Analytics
                </span>
                <span className="badge badge-muted" style={{ fontSize: 10, padding: "1px 6px" }}>Q1 2026</span>
                <span className="badge" style={{ background: "rgba(255,79,91,0.1)", color: "#FF4F5B", border: "1px solid rgba(255,79,91,0.22)", fontSize: 10, padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>CONFIDENTIAL</span>
              </div>
              <p style={{ fontSize: 11, color: "#4E5E74", marginTop: 2 }}>
                Go-To-Market Strategy · Performance &amp; Audience Intelligence
              </p>
            </div>
          </div>

          {/* Center: KPIs (hidden on small screens) */}
          <div className="hidden xl:flex items-center gap-6">
            {quickStats.map(s => (
              <div key={s.label} className="text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.03em", color: "#E8ECF4", fontVariantNumeric: "tabular-nums" }}>
                    {s.value}
                  </span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 3,
                    background: s.up ? "rgba(0,200,150,0.1)" : "rgba(255,79,91,0.1)",
                    color: s.up ? "#00C896" : "#FF4F5B",
                    border: `1px solid ${s.up ? "rgba(0,200,150,0.2)" : "rgba(255,79,91,0.2)"}`,
                  }}>
                    {s.delta}
                  </span>
                </div>
                <p style={{ fontSize: 10, color: "#4E5E74", marginTop: 1 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Right: controls */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Live indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(0,200,150,0.07)", border: "1px solid rgba(0,200,150,0.18)" }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#00C896" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "#00C896" }} />
              </span>
              <Radio size={11} style={{ color: "#00C896" }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#00C896" }}>Live</span>
            </div>

            <button
              className="flex items-center gap-1.5 rounded-lg text-[12px] transition-colors"
              style={{ background: "#0C1220", border: "1px solid #1A2437", color: "#8B97AA", padding: "6px 10px" }}
            >
              Feb – Mar 2026 <ChevronDown size={11} />
            </button>

            <ExportButton />
          </div>
        </div>

        <NavTabs />
      </div>
    </header>
  );
}
