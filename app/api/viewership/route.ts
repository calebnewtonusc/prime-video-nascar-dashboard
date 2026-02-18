export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";

export interface RaceViewershipRecord {
  short: string;
  full: string;
  date: string;
  v26: number;
  v25: number;
  target: number;
  status: "completed" | "projected" | "live";
  newSubs: number;
  avgWatchMin: number;
  peak: number;
}

const ALL_RACES: RaceViewershipRecord[] = [
  { short: "Daytona",   full: "Daytona 500",              date: "2026-02-16", v26: 8.2,  v25: 6.7,  target: 7.0, status: "completed",  newSubs: 342, avgWatchMin: 187, peak: 5.4 },
  { short: "Las Vegas", full: "Pennzoil 400",              date: "2026-03-02", v26: 2.1,  v25: 1.8,  target: 2.0, status: "completed",  newSubs: 74,  avgWatchMin: 142, peak: 1.6 },
  { short: "Atlanta",   full: "Ambetter Health 400",       date: "2026-03-09", v26: 1.8,  v25: 1.5,  target: 1.8, status: "completed",  newSubs: 61,  avgWatchMin: 138, peak: 1.4 },
  { short: "Phoenix",   full: "Shriners Children's 500",  date: "2026-03-16", v26: 2.4,  v25: 2.1,  target: 2.2, status: "projected",  newSubs: 88,  avgWatchMin: 148, peak: 1.9 },
  { short: "COTA",      full: "EchoPark Texas GP",         date: "2026-03-23", v26: 1.9,  v25: 1.6,  target: 1.8, status: "projected",  newSubs: 66,  avgWatchMin: 144, peak: 1.5 },
  { short: "Bristol",   full: "Food City 500",             date: "2026-03-30", v26: 2.3,  v25: 2.0,  target: 2.1, status: "projected",  newSubs: 82,  avgWatchMin: 158, peak: 1.8 },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  let races = ALL_RACES;
  if (from) races = races.filter((r) => r.date >= from);
  if (to)   races = races.filter((r) => r.date <= to);

  const totalV26 = races.reduce((s, r) => s + r.v26, 0);
  const totalV25 = races.reduce((s, r) => s + r.v25, 0);
  const yoyPct   = totalV25 > 0 ? (((totalV26 - totalV25) / totalV25) * 100) : 0;
  const beatTarget = races.filter((r) => r.v26 >= r.target).length;

  return NextResponse.json(
    {
      races,
      summary: {
        totalV26: +totalV26.toFixed(1),
        totalV25: +totalV25.toFixed(1),
        yoyPct: +yoyPct.toFixed(1),
        beatTarget,
        total: races.length,
      },
      asOf: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" } }
  );
}
