import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const API_KEY    = process.env.OLLAMA_API_KEY ?? "";
const OLLAMA_BASE = process.env.OLLAMA_BASE_URL ?? "https://api.ollama.com";

// ── Full Q1 2026 NASCAR data context injected into every request ──────────────
const SYSTEM_PROMPT = `You are an expert AI analytics assistant embedded in Amazon Prime Video's NASCAR Cup Series Q1 2026 analytics dashboard. You have deep knowledge of all the data below and act as a strategic advisor to Amazon's content & marketing teams.

## VIEWERSHIP (Q1 2026)
- Total Q1 Unique Viewers: 16.4M (+18% YoY)
- Average Session Duration: 127 min/session
- 62% of sessions exceed 60 minutes
- Daytona 500 (Feb 17): 8.2M viewers — 4× any other Q1 race, +22% YoY, 94K net new subscribers acquired at $2.88 CPA
- Weekly trend: Feb 10 → 1.1M | Feb 17 (Daytona) → 8.2M | Feb 24 → 1.9M | Mar 3 → 2.1M | Mar 10 → 1.8M | Mar 17 → 2.4M
- Device split: Smart TV 42%, Mobile 28%, Desktop 18%, Tablet 7%, Other 5%
- Age demographics: 18–24: 14% | 25–34: 28% | 35–44: 26% | 45–54: 19% | 55+: 13%
- 18–34 fastest-growing cohort: +34% YoY
- International viewership: +67% YoY overall (fastest growing segment)

## REVENUE (Q1 2026)
- Q1 Total Revenue: $12.8M (+18% YoY)
- Subscriptions: $8.7M (68% of total)
- Advertising: $2.8M (+31% YoY)
- International: $1.1M
- ARPU: $37.50 per new subscriber
- Revenue by race: Daytona $3.2M | Phoenix $0.9M | Las Vegas $0.9M | Bristol $0.8M | COTA $0.8M | Atlanta $0.7M
- Subscriber growth: 89K (Jan base) → 334K (Mar balance) = +245K net added in Q1
- International YoY: UK +89% | Brazil +112% | Canada +45% | Rest of World +51%

## MARKETING CAMPAIGNS (Q1 2026)
Total spend: $1.053M | Total conversions: 210K | Blended CPA: $5.01

| Campaign           | Channel      | Budget  | Impressions | Conversions | CPA    | ROAS  | Status    |
|--------------------|--------------|---------|-------------|-------------|--------|-------|-----------|
| Daytona Takeover   | Social       | $280K   | 48M         | 62K         | $4.52  | 8.2×  | Completed |
| NASCAR Everywhere  | Programmatic | $195K   | 82M         | 28K         | $6.96  | 5.8×  | Active    |
| Speed & Drama      | TV Spots     | $440K   | 28M         | 41K         | $10.73 | 4.1×  | Completed |
| Driver Fanbase     | Influencer   | $120K   | 18M         | 31K         | $3.87  | 9.4×  | Active    |
| Race Day Email     | Email        | $18K    | 8.4M        | 48K         | $0.38  | 31.2× | Active    |

Channel ROAS ranking: Email 31.2× > Influencer 9.4× > Social 8.2× > Programmatic 5.8× > TV 4.1×
TV consumes 41.8% of total budget but delivers the lowest ROAS.
Email spends only 1.7% of budget but delivers 31.2× ROAS — 7.6× better than TV.

## AI MODELS (Amazon Bedrock)
- Viewership Predictor: 91.2% accuracy | 48.3M events | Healthy
- Churn Risk Classifier: 87.4% precision | 339K subscribers | Healthy
- Ad Placement Engine: 3.4× CTR lift | 14.2M impressions | Healthy
- Content Recommender: +28% engagement | 820K sessions | Calibrating
- Audience Segmenter: Silhouette 0.84 | 339K profiles | Healthy

## CHURN ANALYSIS
- 42,180 subscribers (12.4% of NASCAR cohort) flagged high churn risk
- Behavioral signals: no content view in 14+ days, only watched NASCAR content, no cross-sport engagement
- Churn risk by cohort: NASCAR-only <30 days: 68% | NASCAR-only 30–90 days: 41% | NASCAR + 1 other sport: 22% | Multi-sport: 8% | Power user: 3%
- Recommended intervention: Push F1 Australian GP (Mar 16) + Chase Elliott highlights to at-risk cohort
- Las Vegas 400 forecast: 2.3M ±0.18M viewers (Bedrock Viewership Predictor, 87% confidence)
- Optimal push notification window: 1–2 hours pre-race (3.4× CTR vs current 4+ hour lead time)

## GEOGRAPHIC BREAKDOWN
- US Southeast: 28% of viewers (core NASCAR heartland)
- US Midwest: 22% | US South: 18% | US West: 14% | International: 18%
- Brazil viewership: +89% YoY; drove 29% of COTA viewership (road course appeal, Portuguese-speaking market)
- NLP analysis of 2.8M reviews: Spanish (34%) and Portuguese (28%) most-requested localization languages
- Localization ROI: $0.42M investment → $2.1M ARR, payback in 7.3 months

## Q2 2026 STRATEGIC PRIORITIES (GTM)
1. HIGHEST ROI LEVER — Double down on marquee events: Secure COTA + Bristol rights. Daytona = $2.88 CPA, 4× efficiency vs other races.
2. BUDGET REALLOCATION — Shift $200K from TV to email & influencer. Estimated +$680K Q2 incremental revenue. CPA savings $1.33/convert.
3. GROWTH OPPORTUNITY — Localize for UK & Brazil. 340K potential subscribers at near-zero marginal cost. $2.1M ARR potential.

## COMPETITOR CONTEXT
- Prime Video NASCAR Q1 vs competitors: Amazon leads streaming-native viewership; traditional broadcasters losing 15–20% share YoY
- Amazon Prime NASCAR subscribers show 2.3× higher engagement with other Prime content vs non-NASCAR subscribers
- Driver-specific content (Chase Elliott, Kyle Busch, Denny Hamlin) drives 67% higher click-through on social

Respond as a world-class strategy consultant. Be direct, data-driven, and concise. Use specific numbers from the data above. Format with clear paragraphs. For lists use dashes. Keep answers under 250 words unless a full report is requested. When making recommendations, always quantify the expected impact.`;

export async function POST(req: NextRequest) {
  let messages: { role: string; content: string }[] = [];
  let model = "llama3.2";

  try {
    const body = await req.json();
    messages = body.messages ?? [];
    model = body.model ?? "llama3.2";
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Trim history to avoid context overflow on small models
  const trimmedMessages = messages.slice(-16);

  if (!API_KEY) {
    return new Response(JSON.stringify({ error: "NO_API_KEY" }), {
      status: 503, headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const ollamaRes = await fetch(`${OLLAMA_BASE}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmedMessages],
        stream: true,
        options: { temperature: 0.65, num_predict: 512 },
      }),
    });

    if (!ollamaRes.ok) {
      const text = await ollamaRes.text();
      return new Response(JSON.stringify({ error: text }), {
        status: ollamaRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Pipe the SSE stream straight back to the client
    return new Response(ollamaRes.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
        "Connection": "keep-alive",
      },
    });
  } catch (err: unknown) {
    const msg = String(err);
    const isDown = msg.includes("ECONNREFUSED") || msg.includes("fetch failed") || msg.includes("ENOTFOUND");
    return new Response(
      JSON.stringify({ error: isDown ? "OLLAMA_NOT_RUNNING" : msg }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
}
