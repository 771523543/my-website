import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'منصة هديل للخدمات الطلابية والأكاديمية',
    short_name: 'منصة هديل',
    description:
      'منصة هديل للخدمات الطلابية والأكاديمية والبحثية والمهنية.',
    lang: 'ar',
    dir: 'rtl',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#6f7657',
    icons: [
      {
        src: '/hadeel-platform-logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/hadeel-platform-logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
