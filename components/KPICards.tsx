"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Spark { v: number; }

interface KPI {
  label: string;
  sub: string;
  value: string;
  raw: number;
  unit: "M" | "K" | "$" | "%" | "x" | "min" | "pts";
  vsYoY: number;    // % change vs Q1 2025
  vsQoQ: number;    // % change vs Q4 2025
  spark: Spark[];
  color: string;
}

const KPIS: KPI[] = [
  {
    label: "Total Q1 Viewers", sub: "Unique viewers",
    value: "16.4M", raw: 16.4, unit: "M",
    vsYoY: 23.1, vsQoQ: 8.4,
    color: "#3A6FA8",
    spark: [{ v: 60 },{ v: 55 },{ v: 68 },{ v: 72 },{ v: 65 },{ v: 80 },{ v: 88 },{ v: 100 }],
  },
  {
    label: "New Subscribers", sub: "Q1 net adds",
    value: "342K", raw: 342, unit: "K",
    vsYoY: 31.0, vsQoQ: 12.5,
    color: "#9A7030",
    spark: [{ v: 50 },{ v: 58 },{ v: 54 },{ v: 67 },{ v: 73 },{ v: 78 },{ v: 90 },{ v: 100 }],
  },
  {
    label: "Total Revenue", sub: "All streams",
    value: "$12.8M", raw: 12.8, unit: "$",
    vsYoY: 18.5, vsQoQ: 6.2,
    color: "#00C896",
    spark: [{ v: 62 },{ v: 70 },{ v: 66 },{ v: 74 },{ v: 71 },{ v: 82 },{ v: 91 },{ v: 100 }],
  },
  {
    label: "Avg Watch Time", sub: "Per session",
    value: "127 min", raw: 127, unit: "min",
    vsYoY: 8.1, vsQoQ: 3.7,
    color: "#7C6FFF",
    spark: [{ v: 72 },{ v: 68 },{ v: 75 },{ v: 80 },{ v: 78 },{ v: 85 },{ v: 93 },{ v: 100 }],
  },
  {
    label: "Subscriber ARPU", sub: "Monthly avg",
    value: "$37.42", raw: 37.42, unit: "$",
    vsYoY: 5.8, vsQoQ: 2.1,
    color: "#9A7030",
    spark: [{ v: 80 },{ v: 82 },{ v: 79 },{ v: 84 },{ v: 86 },{ v: 88 },{ v: 94 },{ v: 100 }],
  },
  {
    label: "Ad Revenue CPM", sub: "Effective CPM",
    value: "$22.40", raw: 22.40, unit: "$",
    vsYoY: 14.2, vsQoQ: 4.8,
    color: "#3A6FA8",
    spark: [{ v: 65 },{ v: 70 },{ v: 68 },{ v: 75 },{ v: 80 },{ v: 84 },{ v: 90 },{ v: 100 }],
  },
  {
    label: "30-Day Churn", sub: "Subscriber churn",
    value: "2.3%", raw: 2.3, unit: "%",
    vsYoY: -18.2, vsQoQ: -4.4,
    color: "#00C896",
    spark: [{ v: 100 },{ v: 95 },{ v: 90 },{ v: 85 },{ v: 80 },{ v: 78 },{ v: 74 },{ v: 70 }],
  },
  {
    label: "Engagement Score", sub: "Content rating",
    value: "87 / 100", raw: 87, unit: "pts",
    vsYoY: 9.4, vsQoQ: 3.2,
    color: "#7C6FFF",
    spark: [{ v: 58 },{ v: 62 },{ v: 65 },{ v: 71 },{ v: 75 },{ v: 80 },{ v: 84 },{ v: 100 }],
  },
];

function Sparkline({ data, color }: { data: Spark[]; color: string }) {
  const W = 72; const H = 28;
  const vals = data.map(d => d.v);
  const min = Math.min(...vals); const max = Math.max(...vals);
  const rng = max - min || 1;
  const pts = vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * W;
    const y = H - ((v - min) / rng) * (H - 4) - 2;
    return [x, y] as [number, number];
  });
  const polyline = pts.map(([x, y]) => `${x},${y}`).join(" ");
  const area = [`0,${H}`, ...pts.map(([x, y]) => `${x},${y}`), `${W},${H}`].join(" ");
  const gid = `sg-${color.replace("#", "")}`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${gid})`} />
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      {(() => {
        const [lx, ly] = pts[pts.length - 1];
        return <circle cx={lx} cy={ly} r="2.5" fill={color} />;
      })()}
    </svg>
  );
}

function Delta({ val, suffix = "%" }: { val: number; suffix?: string }) {
  const up = val >= 0;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className="inline-flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded"
      style={{
        background: up ? "rgba(19,138,96,0.12)" : "rgba(192,64,74,0.12)",
        color: up ? "#138A60" : "#C0404A",
        border: `1px solid ${up ? "rgba(19,138,96,0.2)" : "rgba(192,64,74,0.2)"}`,
      }}
    >
      <Icon size={9} strokeWidth={2.5} />
      {Math.abs(val).toFixed(1)}{suffix}
    </span>
  );
}

function KPICard({ k }: { k: KPI }) {
  return (
    <div
      className="kpi-card flex flex-col gap-4 p-5 rounded-[10px] relative overflow-hidden"
      style={{
        background: "#0A1525",
        border: "1px solid #162033",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p style={{ fontSize: 10, fontWeight: 600, color: "#263D55", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {k.sub}
          </p>
          <p style={{ fontSize: 12, color: "#3D5570", marginTop: 3 }} className="truncate">{k.label}</p>
        </div>
        <Sparkline data={k.spark} color="#2B5C8A" />
      </div>

      <p
        className="t-num"
        style={{ fontSize: 26, fontWeight: 700, color: "#C0D2E4", letterSpacing: "-0.03em", lineHeight: 1 }}
      >
        {k.value}
      </p>

      <div className="flex items-center gap-2">
        <Delta val={k.vsYoY} />
        <span style={{ fontSize: 11, color: "#263D55" }}>YoY</span>
        <span style={{ fontSize: 11, color: "#1D3048" }}>·</span>
        <span
          style={{ fontSize: 11, fontWeight: 600, color: k.vsQoQ >= 0 ? "#138A60" : "#C0404A" }}
        >
          {k.vsQoQ >= 0 ? "+" : ""}{k.vsQoQ.toFixed(1)}% QoQ
        </span>
      </div>
    </div>
  );
}

export default function KPICards() {
  return (
    <section aria-label="Key performance indicators">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPIS.map(k => <KPICard key={k.label} k={k} />)}
      </div>
    </section>
  );
}
