import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'أعمالنا السابقة',
  description:
    'استعرض أعمال ونماذج منصة هديل السابقة وتعرّف على الخدمات الطلابية والأكاديمية التي نقدمها.',
  alternates: {
    canonical: '/previous-works',
  },
  openGraph: {
    title: 'أعمالنا السابقة | منصة هديل',
    description:
      'استعرض أعمال ونماذج منصة هديل السابقة وتعرّف على خدماتنا الطلابية والأكاديمية.',
    url: '/previous-works',
    type: 'website',
  },
}

export default function PreviousWorksLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}