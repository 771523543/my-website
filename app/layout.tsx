import type { Metadata } from 'next'
import './globals.css'

import Header from './components/Header'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export const metadata: Metadata = {
  metadataBase: new URL('https://hadeel-alpha.vercel.app'),

  title: {
    default: 'منصة هديل للخدمات الطلابية والأكاديمية',
    template: '%s | منصة هديل',
  },

  description:
    'منصة هديل للخدمات الطلابية والأكاديمية والبحثية والمهنية. نقدم خدمات البحوث الجامعية، التقارير، الواجبات، التكاليف، مشاريع التخرج، العروض التقديمية، دراسة الحالة، دراسات الجدوى والسيرة الذاتية.',

  keywords: [
    'منصة هديل',
    'منصة هديل للخدمات الطلابية',
    'منصة هديل للخدمات الأكاديمية',
    'خدمات طلابية',
    'خدمات أكاديمية',
    'خدمات جامعية',
    'خدمات بحثية',
    'بحوث جامعية',
    'تقارير جامعية',
    'واجبات جامعية',
    'تكاليف جامعية',
    'مشاريع تخرج',
    'عروض تقديمية',
    'دراسة حالة',
    'دراسات جدوى',
    'سيرة ذاتية',
  ],

  authors: [
    {
      name: 'منصة هديل للخدمات الطلابية والأكاديمية',
    },
  ],

  creator: 'منصة هديل',
  publisher: 'منصة هديل للخدمات الطلابية والأكاديمية',
  applicationName: 'منصة هديل',
  category: 'education',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://hadeel-alpha.vercel.app',
    siteName: 'منصة هديل للخدمات الطلابية والأكاديمية',

    title: 'منصة هديل للخدمات الطلابية والأكاديمية',

    description:
      'خدمات طلابية وأكاديمية وبحثية ومهنية تساعد الطلاب والباحثين في إنجاز متطلباتهم الدراسية والأكاديمية باحترافية.',

    images: [
      {
        url: '/images/hadeel-achievements.png',
        width: 1200,
        height: 630,
        alt: 'منصة هديل للخدمات الطلابية والأكاديمية',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'منصة هديل للخدمات الطلابية والأكاديمية',

    description:
      'خدمات طلابية وأكاديمية وبحثية ومهنية في منصة واحدة.',

    images: ['/images/hadeel-achievements.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'منصة هديل للخدمات الطلابية والأكاديمية',
        url: 'https://hadeel-alpha.vercel.app',
        logo: 'https://hadeel-alpha.vercel.app/images/hadeel-achievements.png',
        description:
          'منصة للخدمات الطلابية والأكاديمية والبحثية والمهنية.',
      },
      {
        '@type': 'WebSite',
        name: 'منصة هديل للخدمات الطلابية والأكاديمية',
        url: 'https://hadeel-alpha.vercel.app',
        inLanguage: 'ar',
      },
    ],
  }

  return (
    <html lang="ar" dir="rtl">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        <Header />

        {children}

        <Footer />

        <FloatingWhatsApp />
      </body>
    </html>
  )
}