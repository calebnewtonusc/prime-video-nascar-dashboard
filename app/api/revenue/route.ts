export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export interface RevenueStream {
  name: string;
  value: number;
  pct: number;
  color: string;
  mom: number;
}

const STREAMS: RevenueStream[] = [
  { name: "Prime Subscriptions", value: 8.7,  pct: 68, color: "#3A6FA8", mom:  0.8  },
  { name: "Advertising",         value: 2.8,  pct: 22, color: "#9A7030", mom:  0.3  },
  { name: "International",       value: 1.1,  pct: 9,  color: "#00C896", mom:  0.1  },
  { name: "Merchandise",         value: 0.2,  pct: 1,  color: "#4E5E74", mom: -0.02 },
];

const MONTHLY = [
  { month: "January",      subscriptions: 2.1, advertising: 0.6, international: 0.2, merchandise: 0.06 },
  { month: "February",     subscriptions: 3.8, advertising: 1.2, international: 0.4, merchandise: 0.08 },
  { month: "March (proj)", subscriptions: 2.8, advertising: 1.0, international: 0.5, merchandise: 0.06 },
];

export async function GET() {
  const total = STREAMS.reduce((s, r) => s + r.value, 0);
  return NextResponse.json(
    {
      streams: STREAMS,
      monthly: MONTHLY,
      total: +total.toFixed(1),
      asOf: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" } }
  );
}
