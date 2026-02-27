import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { status: "error", message: "NO_API_KEY" },
      { status: 503 }
    );
  }

  return NextResponse.json({
    status: "ok",
    model: "claude-sonnet-4-6",
    provider: "Anthropic",
  });
}
