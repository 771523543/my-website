import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'منصة هديل للخدمات الطلابية والأكاديمية',
  description:
    'منصة هديل وجهتك الأولى والموثوقة للحلول الأكاديمية المتكاملة، إعداد البحوث، تصميم الشرائح، حل الواجبات، وصياغة السيرة الذاتية باحترافية عالية ومتابعة مستمرة لضمان تميزك.',
  openGraph: {
    title: 'منصة هديل للخدمات الطلابية والأكاديمية',
    description:
      'منصة هديل وجهتك الأولى والموثوقة للحلول الأكاديمية المتكاملة، إعداد البحوث، تصميم الشرائح، حل الواجبات، وصياغة السيرة الذاتية باحترافية عالية ومتابعة مستمرة لضمان تميزك.',
    images: [
      {
        url: '/hadeel-platform-logo.png',
        width: 1200,
        height: 630,
        alt: 'منصة هديل للخدمات الأكاديمية',
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}