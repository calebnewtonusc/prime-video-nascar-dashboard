![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=flat-square&logo=react&logoColor=white)
![Amazon Bedrock](https://img.shields.io/badge/Amazon_Bedrock-FF9900?style=flat-square&logo=amazonaws&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-black?style=flat-square&logo=vercel&logoColor=white)

# Amazon Prime Video — NASCAR KPI Dashboard

A go-to-market strategy and KPI analytics dashboard for Amazon Prime Video's Q1 2026 NASCAR Cup Series launch, built for Avenues Tech Consulting. The platform tracks 16.4M unique viewers, $12.8M in revenue, and 342K new subscribers across four analytics domains — viewership, revenue, marketing attribution, and AI-powered forecasting.

**Live:** [prime-video-nascar-dashboard.vercel.app](https://prime-video-nascar-dashboard.vercel.app)

> Screenshot

## Features

- **Viewership Analytics** — Race-by-race audience trends, age and device demographics, geographic reach, and session depth analysis (127 min average per viewer)
- **Revenue Analytics** — Subscription, advertising, and international revenue streams with ARPU tracking ($37.42) and cohort-level analysis
- **Marketing Attribution** — Full-funnel campaign tracking, channel ROAS comparison (up to 31.2x), CPA by source, and budget optimization insights
- **AI Insights (Amazon Bedrock)** — Churn prediction, audience segmentation models, and Q2 revenue forecasting with $2.4M upside signal
- **Driver Leaderboard & Race Calendar** — Live standings, campaign tracker, and race schedule visualization
- **Session Authentication** — Cookie-based session guard with login redirect and expiry handling

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Data Fetching | SWR |
| Markdown | react-markdown + remark-gfm |
| Icons | Lucide React |
| Auth | JWT session cookies (middleware-gated) |
| Deployment | Vercel |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # Production build
npm start       # Production server
npm run lint    # ESLint check
```

## Project Context

Built for Avenues Tech Consulting Spring 2026 engagement. The dashboard serves as an internal performance overview for the Amazon Prime Video strategy team, covering the Q1 2026 NASCAR Cup Series broadcast window (February – March). All data is illustrative and modeled against realistic streaming platform benchmarks.

## Author

**Caleb Newton** — [calebnewton.me](https://calebnewton.me)
