import type { Metadata } from 'next'
import MarketingClient from './MarketingClient'

export const metadata: Metadata = {
  title: 'NASCAR Marketing Dashboard | Prime Video',
  description: 'Campaign performance and marketing analytics for NASCAR Prime Video Q1 2026.',
}

export default function Page() {
  return <MarketingClient />
}
