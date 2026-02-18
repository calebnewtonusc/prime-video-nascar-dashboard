import { Download, Activity, Flag } from "lucide-react";

export default function Header() {
  return (
    <header
      className="w-full border-b"
      style={{
        backgroundColor: "#0F1117",
        borderColor: "#252D3D",
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">

          {/* Left: Branding */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Amazon Prime Video wordmark */}
            <div className="flex flex-col leading-none">
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "#1399FF" }}
              >
                prime
              </span>
              <span className="text-white text-[15px] font-bold tracking-wide -mt-0.5">
                video
              </span>
            </div>

            {/* Divider */}
            <div
              className="h-8 w-px"
              style={{ backgroundColor: "#252D3D" }}
            />

            {/* NASCAR badge */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md"
              style={{ backgroundColor: "#CC000022", border: "1px solid #CC000066" }}
            >
              <Flag
                size={13}
                style={{ color: "#CC0000" }}
                strokeWidth={2.2}
              />
              <span
                className="text-[12px] font-semibold tracking-wide uppercase"
                style={{ color: "#FF4444" }}
              >
                NASCAR Cup Series
              </span>
            </div>
          </div>

          {/* Center: Dashboard title */}
          <div className="flex flex-col items-center text-center flex-1 min-w-0">
            <h1
              className="text-[17px] font-bold tracking-tight truncate"
              style={{ color: "#F9FAFB" }}
            >
              Q1 2026 Sports Analytics Dashboard
            </h1>
            <p
              className="text-[12px] mt-0.5 tracking-wide"
              style={{ color: "#9CA3AF" }}
            >
              Amazon Prime Video &mdash; Performance &amp; Audience Intelligence
            </p>
          </div>

          {/* Right: Status + Action */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Live data indicator */}
            <div className="flex items-center gap-2">
              {/* Pulsing green dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                  style={{ backgroundColor: "#10B981" }}
                />
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ backgroundColor: "#10B981" }}
                />
              </span>

              <div className="flex flex-col leading-none">
                <span
                  className="text-[11px] font-medium"
                  style={{ color: "#F9FAFB" }}
                >
                  Feb 17, 2026
                </span>
                <span
                  className="text-[10px] mt-0.5 font-semibold uppercase tracking-wide"
                  style={{ color: "#10B981" }}
                >
                  Live Data
                </span>
              </div>

              <Activity
                size={15}
                style={{ color: "#10B981" }}
                strokeWidth={2}
              />
            </div>

            {/* Divider */}
            <div
              className="h-7 w-px"
              style={{ backgroundColor: "#252D3D" }}
            />

            {/* Download Report button */}
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{
                backgroundColor: "#1399FF",
                color: "#ffffff",
                border: "1px solid #1399FF",
                boxShadow: "0 0 12px #1399FF33",
              }}
            >
              <Download size={14} strokeWidth={2.5} />
              Download Report
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
