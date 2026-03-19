import { Metadata } from 'next'
import LoginClient from './_client'

export const metadata: Metadata = {
  title: 'Admin Login - I Am Visible Today',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return <LoginClient />
}
