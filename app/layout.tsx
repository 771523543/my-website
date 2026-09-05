import { Analytics } from '@vercel/analytics/next'
import { Noto_Sans_Arabic } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const arabicFont = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'منصة هديل | للخدمات الطلابية والأكاديمية',
  description: 'منصة هديل للخدمات الطلابية والأكاديمية: بحوث، عروض، واجبات، سير ذاتية، بلاك بورد وخدمات احترافية للطلاب والباحثين.',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    siteName: 'منصة هديل',
    url: siteUrl,
    locale: 'ar_SA',
    title: 'منصة هديل | للخدمات الطلابية والأكاديمية',
    description: 'منصة هديل للخدمات الطلابية والأكاديمية والبحوث والعروض والواجبات وخدمات البلاك بورد.',
    images: [{ url: '/hadeel-platform-logo.png', width: 1080, height: 1080, alt: 'شعار منصة هديل للخدمات الطلابية' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'منصة هديل للخدمات الطلابية',
    description: 'خدمات أكاديمية متكاملة للطلاب والباحثين.',
    images: ['/hadeel-platform-logo.png'],
  },
  icons: {
    icon: [{ url: '/hadeel-platform-logo.png', type: 'image/png' }],
    apple: '/hadeel-platform-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="bg-background">
      <body className={`${arabicFont.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'منصة هديل للخدمات الطلابية',
          description: 'منصة هديل للخدمات الطلابية والأكاديمية والبحوث والعروض والواجبات وخدمات البلاك بورد.',
          logo: `${siteUrl}/hadeel-platform-logo.png`,
          image: `${siteUrl}/hadeel-platform-logo.png`,
          url: siteUrl,
        }) }} />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
