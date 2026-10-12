import type { Metadata } from 'next'
import AuthPanel from '@/app/components/AuthPanel'

export const metadata: Metadata = {
  title: 'تسجيل الدخول',
  description: 'تسجيل الدخول إلى حسابك في منصة هديل.',
}

export default function LoginPage() {
  return <AuthPanel initialMode="login" />
}