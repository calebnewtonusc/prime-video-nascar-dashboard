import type { Metadata } from 'next'
import ViewershipClient from './ViewershipClient'

export const metadata: Metadata = {
  title: 'Viewership Analytics | NASCAR Prime Video',
  description: 'Race-by-race viewership trends, device breakdown, demographics, and audience intelligence for NASCAR Q1 2026.',
}

export default function Page() {
  return <ViewershipClient />
}
