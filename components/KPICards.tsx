"use client";

import { Eye, Users, DollarSign, Clock, TrendingUp, TrendingDown } from "lucide-react";
import clsx from "clsx";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SparkPoint {
  value: number;
}

interface KPICardData {
  id: string;
  label: string;
  value: string;
  change: string;
  changeLabel: string;
  trending: "up" | "down";
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  accentColor: string;
  sparkline: SparkPoint[];
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const KPI_DATA: KPICardData[] = [
  {
    id: "viewers",
    label: "Total Q1 Viewers",
    value: "16.4M",
    change: "+23%",
    changeLabel: "vs Q1 2025",
    trending: "up",
    icon: Eye,
    iconColor: "#1399FF",
    iconBg: "#1399FF18",
    accentColor: "#1399FF",
    sparkline: [
      { value: 60 },
      { value: 55 },
      { value: 68 },
      { value: 72 },
      { value: 65 },
      { value: 80 },
      { value: 88 },
      { value: 100 },
    ],
  },
  {
    id: "subscribers",
    label: "New Subscribers",
    value: "342K",
    change: "+31%",
    changeLabel: "vs Q1 2025",
    trending: "up",
    icon: Users,
    iconColor: "#FF9900",
    iconBg: "#FF990018",
    accentColor: "#FF9900",
    sparkline: [
      { value: 50 },
      { value: 58 },
      { value: 54 },
      { value: 67 },
      { value: 73 },
      { value: 78 },
      { value: 90 },
      { value: 100 },
    ],
  },
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$12.8M",
    change: "+18%",
    changeLabel: "vs Q1 2025",
    trending: "up",
    icon: DollarSign,
    iconColor: "#10B981",
    iconBg: "#10B98118",
    accentColor: "#10B981",
    sparkline: [
      { value: 62 },
      { value: 70 },
      { value: 66 },
      { value: 74 },
      { value: 71 },
      { value: 82 },
      { value: 91 },
      { value: 100 },
    ],
  },
  {
    id: "watchtime",
    label: "Avg Watch Time",
    value: "127 min",
    change: "+8%",
    changeLabel: "vs Q1 2025",
    trending: "up",
    icon: Clock,
    iconColor: "#A78BFA",
    iconBg: "#A78BFA18",
    accentColor: "#A78BFA",
    sparkline: [
      { value: 72 },
      { value: 68 },
      { value: 75 },
      { value: 80 },
      { value: 78 },
      { value: 85 },
      { value: 93 },
      { value: 100 },
    ],
  },
];

// ---------------------------------------------------------------------------
// MiniSparkline — pure SVG, zero external deps
// ---------------------------------------------------------------------------

function MiniSparkline({
  data,
  color,
}: {
  data: SparkPoint[];
  color: string;
}) {
  const width = 80;
  const height = 32;
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = [
    `0,${height}`,
    ...values.map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    }),
    `${width},${height}`,
  ].join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      aria-hidden="true"
    >
      {/* Gradient fill beneath the line */}
      <defs>
        <linearGradient
          id={`spark-grad-${color.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#spark-grad-${color.replace("#", "")})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Terminal dot */}
      {(() => {
        const last = values[values.length - 1];
        const lx = width;
        const ly = height - ((last - min) / range) * (height - 4) - 2;
        return (
          <circle cx={lx} cy={ly} r="3" fill={color} />
        );
      })()}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// KPICard
// ---------------------------------------------------------------------------

function KPICard({ card }: { card: KPICardData }) {
  const TrendIcon = card.trending === "up" ? TrendingUp : TrendingDown;
  const trendColor = card.trending === "up" ? "#10B981" : "#EF4444";
  const IconComponent = card.icon;

  return (
    <div
      className="relative flex flex-col gap-4 rounded-xl p-5 transition-all duration-200 hover:scale-[1.015] hover:shadow-xl cursor-default"
      style={{
        backgroundColor: "#1A1F2E",
        border: "1px solid #252D3D",
        borderLeft: `3px solid ${card.accentColor}`,
        boxShadow: `0 4px 24px rgba(0,0,0,0.35)`,
      }}
    >
      {/* Top row: icon + sparkline */}
      <div className="flex items-start justify-between">
        {/* Icon badge */}
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
          style={{ backgroundColor: card.iconBg }}
        >
          <IconComponent size={20} style={{ color: card.iconColor }} strokeWidth={2} />
        </div>

        {/* Sparkline */}
        <div className="opacity-80">
          <MiniSparkline data={card.sparkline} color={card.accentColor} />
        </div>
      </div>

      {/* Metric value */}
      <div>
        <p
          className="text-[32px] font-extrabold leading-none tracking-tight"
          style={{ color: "#F9FAFB" }}
        >
          {card.value}
        </p>
        <p
          className="text-[13px] mt-1.5 font-medium"
          style={{ color: "#9CA3AF" }}
        >
          {card.label}
        </p>
      </div>

      {/* Change badge */}
      <div className="flex items-center gap-1.5">
        <span
          className={clsx(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[12px] font-bold"
          )}
          style={{
            backgroundColor: card.trending === "up" ? "#10B98120" : "#EF444420",
            color: trendColor,
            border: `1px solid ${card.trending === "up" ? "#10B98140" : "#EF444440"}`,
          }}
        >
          <TrendIcon size={11} strokeWidth={2.5} />
          {card.change}
        </span>
        <span className="text-[12px]" style={{ color: "#6B7280" }}>
          {card.changeLabel}
        </span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// KPICards — exported grid
// ---------------------------------------------------------------------------

export default function KPICards() {
  return (
    <section aria-label="Key performance indicators">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPI_DATA.map((card) => (
          <KPICard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
