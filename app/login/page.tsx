import type { Metadata } from 'next'
import LoginClient from './LoginClient'

export const metadata: Metadata = {
  title: 'Sign In | NASCAR Prime Video Analytics',
  description: 'Amazon Midway federated sign-in for the NASCAR Prime Video analytics dashboard.',
}

export default function Page() {
  return <LoginClient />
}
