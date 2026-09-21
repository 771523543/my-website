import type { MetadataRoute } from 'next'

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
  const mainPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/previous-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  const servicePages: MetadataRoute.Sitemap = serviceIds.map((id) => ({
    url: `${baseUrl}/services/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const packagePages: MetadataRoute.Sitemap = packageIds.map((id) => ({
    url: `${baseUrl}/packages/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [
    ...mainPages,
    ...servicePages,
    ...packagePages,
  ]
}