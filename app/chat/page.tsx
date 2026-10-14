
import type { Metadata } from 'next'
import ChatClient from './ChatClient'

export const metadata: Metadata = {
  title: 'المحادثة المباشرة | منصة هديل',
  description: 'تواصل مباشرة مع فريق منصة هديل بعد تسجيل الدخول إلى حسابك.',
}

export default function ChatPage() {
  return <ChatClient />
}
