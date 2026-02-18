"use client";

interface FunnelStage {
  label: string;
  value: number;
  displayValue: string;
  percentage: number;
  color: string;
  conversionFrom?: string;
}

const stages: FunnelStage[] = [
  {
    label: "Ad Impressions",
    value: 450_000_000,
    displayValue: "450M",
    percentage: 100,
    color: "#1399FF",
  },
  {
    label: "Platform Visits",
    value: 38_000_000,
    displayValue: "38M",
    percentage: 8.4,
    color: "#60B8FF",
    conversionFrom: "8.4% of impressions",
  },
  {
    label: "Race Page Views",
    value: 12_000_000,
    displayValue: "12M",
    percentage: 2.7,
    color: "#FF9900",
    conversionFrom: "31.6% of visits",
  },
  {
    label: "Trial Starts",
    value: 1_800_000,
    displayValue: "1.8M",
    percentage: 0.4,
    color: "#10B981",
    conversionFrom: "15.0% of page views",
  },
  {
    label: "Subscriptions",
    value: 342_000,
    displayValue: "342K",
    percentage: 0.076,
    color: "#F59E0B",
    conversionFrom: "19.0% of trials",
  },
];

const MIN_WIDTH = 30;
const MAX_WIDTH = 100;

function getWidth(percentage: number): number {
  const scale = Math.log10(percentage + 0.001) / Math.log10(100.001);
  return MIN_WIDTH + scale * (MAX_WIDTH - MIN_WIDTH);
}

export default function EngagementFunnel() {
  return (
    <div
      className="rounded-xl p-6"
      style={{ backgroundColor: "#1A1F2E", border: "1px solid #252D3D" }}
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-[#F9FAFB] leading-tight">
          Q1 Acquisition Funnel
        </h2>
        <p className="text-xs text-[#9CA3AF] mt-1">
          Impressions &rarr; Subscriptions
        </p>
      </div>

      {/* Funnel */}
      <div className="flex flex-col items-center gap-0">
        {stages.map((stage, i) => {
          const widthPct = getWidth(stage.percentage);
          const nextStage = stages[i + 1];
          const dropoffPct =
            nextStage && stage.value > 0
              ? (((stage.value - nextStage.value) / stage.value) * 100).toFixed(
                  1
                )
              : null;

          return (
            <div key={stage.label} className="w-full flex flex-col items-center">
              {/* Trapezoid bar */}
              <div className="relative w-full flex items-center justify-center">
                {/* Bar */}
                <div
                  className="relative flex items-center justify-between px-4 py-3 transition-all duration-300"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: stage.color,
                    clipPath: nextStage
                      ? `polygon(2% 0%, 98% 0%, ${100 - (widthPct - getWidth(nextStage.percentage)) / 2 / widthPct * 100}% 100%, ${(widthPct - getWidth(nextStage.percentage)) / 2 / widthPct * 100}% 100%)`
                      : "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)",
                    minHeight: "52px",
                    borderRadius: i === 0 ? "8px 8px 0 0" : i === stages.length - 1 ? "0 0 8px 8px" : "0",
                  }}
                >
                  <span className="text-white text-sm font-semibold drop-shadow">
                    {stage.label}
                  </span>
                  <div className="text-right">
                    <span className="text-white text-sm font-bold drop-shadow">
                      {stage.displayValue}
                    </span>
                    <span className="text-white/70 text-xs ml-1">
                      ({stage.percentage}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Conversion rate connector */}
              {dropoffPct && (
                <div className="flex items-center gap-2 py-1.5">
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: "#252D3D" }}
                  />
                  <div
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium"
                    style={{
                      backgroundColor: "#0F1117",
                      border: "1px solid #252D3D",
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      style={{ color: "#EF4444" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                    <span style={{ color: "#EF4444" }}>
                      {dropoffPct}% drop-off
                    </span>
                    <span style={{ color: "#9CA3AF" }}>
                      &bull; {nextStage?.conversionFrom}
                    </span>
                  </div>
                  <div
                    className="h-px flex-1"
                    style={{ backgroundColor: "#252D3D" }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary row */}
      <div
        className="mt-5 grid grid-cols-3 gap-3 pt-4"
        style={{ borderTop: "1px solid #252D3D" }}
      >
        <div className="text-center">
          <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">
            Top-of-Funnel
          </p>
          <p className="text-base font-bold text-[#1399FF] mt-0.5">450M</p>
          <p className="text-[10px] text-[#9CA3AF]">Impressions</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">
            Overall Conv.
          </p>
          <p className="text-base font-bold text-[#10B981] mt-0.5">0.076%</p>
          <p className="text-[10px] text-[#9CA3AF]">Imp. to Sub</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] text-[#9CA3AF] uppercase tracking-wider">
            New Subscribers
          </p>
          <p className="text-base font-bold text-[#F59E0B] mt-0.5">342K</p>
          <p className="text-[10px] text-[#9CA3AF]">Q1 Total</p>
        </div>
      </div>
    </div>
  );
}
