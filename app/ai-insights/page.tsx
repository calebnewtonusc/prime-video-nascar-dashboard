import type { Metadata } from 'next'
import AIInsightsClient from './AIInsightsClient'

export const metadata: Metadata = {
  title: 'AI-Powered Analytics | NASCAR Prime Video',
  description: 'Amazon Bedrock AI insights, model health, churn risk, and predictive analytics for NASCAR Q1 2026.',
}

export default function Page() {
  return <AIInsightsClient />
}
