import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const API_KEY    = process.env.OLLAMA_API_KEY ?? "";
const OLLAMA_BASE = process.env.OLLAMA_BASE_URL ?? "https://api.ollama.com";

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json(
      { status: "error", message: "NO_API_KEY" },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(`${OLLAMA_BASE}/api/tags`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      signal: AbortSignal.timeout(5_000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { status: "error", message: "Ollama Cloud returned non-200" },
        { status: 503 }
      );
    }

    const data = (await res.json()) as { models?: { name: string }[] };
    const models = (data.models ?? []).map((m) => m.name);
    const defaultModel =
      models.find((m) => m.includes("llama3")) ??
      models.find((m) => m.includes("gpt-oss")) ??
      models.find((m) => m.includes("deepseek")) ??
      models.find((m) => m.includes("mistral")) ??
      models.find((m) => m.includes("qwen")) ??
      models[0] ??
      "llama3.2";

    return NextResponse.json({ status: "ok", models, defaultModel });
  } catch {
    return NextResponse.json(
      { status: "error", message: "CLOUD_UNREACHABLE" },
      { status: 503 }
    );
  }
}
