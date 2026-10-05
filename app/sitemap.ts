import type { MetadataRoute } from 'next'

import { universities } from '@/app/components/universities/data'

const baseUrl = 'https://hadeel-alpha.vercel.app'

const serviceIds = [
  'research',
  'reports',
  'assignments',
  'homework',
  'lms',
  'presentation',
  'cv',
  'case-study',
  'feasibility',
  'graduation',
]

const packageIds = [
  'full-term',
  'academic-excellence',
  'future-generation',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  /*
   * الصفحات الرئيسية
   */
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/universities`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/previous-works`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  /*
   * صفحات الخدمات
   */
  const servicePages: MetadataRoute.Sitemap = serviceIds.map((id) => ({
    url: `${baseUrl}/services/${id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  /*
   * صفحات الباقات
   */
  const packagePages: MetadataRoute.Sitemap = packageIds.map((id) => ({
    url: `${baseUrl}/packages/${id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  /*
   * صفحة كل جامعة
   *
   * يتم أخذ الـ slug مباشرة من data.ts
   * حتى لا نضيف أي جامعة غير موجودة فعليًا.
   */
  const universityPages: MetadataRoute.Sitemap = universities.flatMap(
    (university) => [
      {
        url: `${baseUrl}/universities/${university.slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      },

      /*
       * صفحة الكليات والتخصصات لكل جامعة
       */
      {
        url: `${baseUrl}/universities/${university.slug}/colleges`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      },
    ],
  )

  /*
   * جميع روابط الـ Sitemap
   */
  return [
    ...mainPages,
    ...servicePages,
    ...packagePages,
    ...universityPages,
  ]
}