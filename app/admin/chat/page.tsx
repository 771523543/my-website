
import type { Metadata } from 'next'
import AdminChatClient from './AdminChatClient'

export const metadata: Metadata = {
  title: 'محادثات الطلاب | إدارة منصة هديل',
  description: 'لوحة إدارة المحادثات المباشرة في منصة هديل.',
}

export default function AdminChatPage() {
  return <AdminChatClient />
}
