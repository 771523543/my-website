import type { Metadata } from 'next'
import AuthPanel from '@/app/components/AuthPanel'

export const metadata: Metadata = {
  title: 'إنشاء حساب طالب',
  description: 'إنشاء حساب في منصة هديل للخدمات الطلابية.',
}

export default function RegisterPage() {
  return <AuthPanel initialMode="register" />
}