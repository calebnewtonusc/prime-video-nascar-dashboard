export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export interface KPIData {
  metric: string;
  value: string;
  raw: number;
  delta: number;     // percentage change vs prior year
  deltaLabel: string;
  invertDelta?: boolean; // for churn — down is good
  lastUpdated: string;
}

const BASE_KPIS: KPIData[] = [
  { metric: "Q1 VIEWERS",        value: "16.4M",   raw: 16_400_000, delta: 23.1, deltaLabel: "+23.1%", lastUpdated: "" },
  { metric: "NEW SUBSCRIBERS",   value: "342K",    raw: 342_000,    delta: 31.0, deltaLabel: "+31.0%", lastUpdated: "" },
  { metric: "TOTAL REVENUE",     value: "$12.8M",  raw: 12_800_000, delta: 18.5, deltaLabel: "+18.5%", lastUpdated: "" },
  { metric: "AVG WATCH TIME",    value: "127 min", raw: 127,        delta: 8.1,  deltaLabel: "+8.1%",  lastUpdated: "" },
  { metric: "SUB ARPU",          value: "$37.42",  raw: 37.42,      delta: 5.8,  deltaLabel: "+5.8%",  lastUpdated: "" },
  { metric: "AD CPM",            value: "$22.40",  raw: 22.40,      delta: 14.2, deltaLabel: "+14.2%", lastUpdated: "" },
  { metric: "30-DAY CHURN",      value: "2.3%",    raw: 2.3,        delta: -18.2, deltaLabel: "-18.2%", invertDelta: true, lastUpdated: "" },
  { metric: "ENGAGE SCORE",      value: "87/100",  raw: 87,         delta: 9.4,  deltaLabel: "+9.4%",  lastUpdated: "" },
];

export async function GET() {
  const now = new Date().toISOString();
  const kpis = BASE_KPIS.map((k) => ({ ...k, lastUpdated: now }));
  return NextResponse.json(
    { kpis, asOf: now, refreshIntervalMs: 60_000 },
    { headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" } }
  );
}
