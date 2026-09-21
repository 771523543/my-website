import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'الخدمات الطلابية والأكاديمية',
  description:
    'استكشف خدمات منصة هديل الطلابية والأكاديمية والبحثية والمهنية، وتعرّف على تفاصيل كل خدمة ومتطلباتها.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'الخدمات الطلابية والأكاديمية | منصة هديل',
    description:
      'استكشف خدمات منصة هديل الطلابية والأكاديمية والبحثية والمهنية.',
    url: '/services',
    type: 'website',
  },
}

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}