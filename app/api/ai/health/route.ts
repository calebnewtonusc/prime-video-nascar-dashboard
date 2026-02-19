import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const OLLAMA_BASE = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";

export async function GET() {
  try {
    const res = await fetch(`${OLLAMA_BASE}/api/tags`, {
      signal: AbortSignal.timeout(3_000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { status: "error", message: "Ollama returned non-200" },
        { status: 503 }
      );
    }

    const data = (await res.json()) as { models?: { name: string }[] };
    const models = (data.models ?? []).map((m) => m.name);
    const defaultModel =
      models.find((m) => m.startsWith("llama3")) ??
      models.find((m) => m.startsWith("mistral")) ??
      models.find((m) => m.startsWith("qwen")) ??
      models[0] ??
      "llama3.2";

    return NextResponse.json({ status: "ok", models, defaultModel });
  } catch {
    return NextResponse.json(
      { status: "error", message: "OLLAMA_NOT_RUNNING" },
      { status: 503 }
    );
  }
}
