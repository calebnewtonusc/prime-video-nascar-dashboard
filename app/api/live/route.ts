import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Simulates a live race window: Sun Feb 16 2026, race runs 13:00–17:30 EST
// Outside that window, status = "idle". During = "live".
// For demo purposes, we always pretend the Daytona 500 is in progress so
// the SSE stream shows live viewership ticking up.

function getLiveState() {
  // In production: check race schedule from DB, compare against current time
  // For demo: always "live" with a simulated current viewer count
  const BASE = 5_200_000;
  const jitter = Math.floor((Math.random() - 0.5) * 40_000); // ±20K
  const currentViewers = BASE + jitter;

  return {
    status: "live" as const,
    race: "Daytona 500",
    currentViewers,
    currentViewersFormatted: `${(currentViewers / 1_000_000).toFixed(2)}M`,
    peakToday: 5_440_000,
    peakTodayFormatted: "5.44M",
    minutesRemaining: 47,
    lap: 184,
    totalLaps: 200,
    leader: "Chase Elliott",
    timestamp: new Date().toISOString(),
  };
}

export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      // Send initial event immediately
      const send = () => {
        const data = getLiveState();
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      send();
      const interval = setInterval(send, 4_000); // push every 4 seconds

      // Clean up after 50s on Vercel Hobby (60s function limit), longer on Pro
      const MAX_MS = process.env.VERCEL_ENV === "production" ? 50_000 : 5 * 60 * 1000;
      const timeout = setTimeout(() => {
        clearInterval(interval);
        controller.close();
      }, MAX_MS);

      // Handle client disconnect
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
