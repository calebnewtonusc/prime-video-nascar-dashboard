import type { Metadata } from 'next'
import RevenueClient from './RevenueClient'

export const metadata: Metadata = {
  title: 'Revenue Analytics | NASCAR Prime Video',
  description: 'Q1 2026 revenue breakdown by subscriptions, advertising, and international markets for NASCAR on Prime Video.',
}

export default function Page() {
  return <RevenueClient />
}
