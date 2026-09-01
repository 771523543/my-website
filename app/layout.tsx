import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'منصة هديل للخدمات الطلابية والأكاديمية',
  description: 'منصة هديل للخدمات الطلابية والأكاديمية. حلول احترافية، جودة عالية، ومتابعة مستمرة تساعدك على إنجاز أعمالك بثقة.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
