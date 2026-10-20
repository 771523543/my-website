
import type { MetadataRoute } from 'next'
import { readdirSync, statSync } from 'node:fs'
import path from 'node:path'

import { services } from './components/Services'
import { packagesData } from './components/packagesData'
import { universities } from './components/universities/data'

const baseUrl = 'https://hadeel-alpha.vercel.app'
const appDirectory = path.join(process.cwd(), 'app')

// صفحات لا نريد ظهورها في نتائج محركات البحث.
const excludedRoutes = [
  '/account',
  '/admin',
  '/auth',
  '/chat',
  '/request-service',
  '/search',
  '/api',
  '/services/order',
]

function isExcludedRoute(route: string): boolean {
  return excludedRoutes.some(
    (excluded) =>
      route === excluded || route.startsWith(`${excluded}/`)
  )
}

// اكتشاف الصفحات الثابتة من ملفات page.tsx و page.ts.
// لا ننشئ روابط من ملفات الصفحات الديناميكية مثل [slug].
function discoverStaticPages(
  directory: string,
  segments: string[] = []
): string[] {
  let entries

  try {
    entries = readdirSync(directory, { withFileTypes: true })
  } catch {
    return []
  }

  const routes: string[] = []

  const hasPage = entries.some(
    (entry) =>
      entry.isFile() &&
      /^page\.(tsx|ts|jsx|js)$/.test(entry.name)
  )

  if (hasPage) {
    const routeSegments = segments.filter(
      (segment) =>
        !segment.startsWith('(') &&
        !segment.startsWith('@')
    )

    // المجلدات ذات الأسماء الديناميكية تحتاج إلى بيانات فعلية.
    const isDynamic = routeSegments.some(
      (segment) =>
        segment.startsWith('[') || segment.startsWith(']')
    )

    if (!isDynamic) {
      const route =
        routeSegments.length === 0
          ? '/'
          : `/${routeSegments.join('/')}`

      if (!isExcludedRoute(route)) {
        routes.push(route)
      }
    }
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue

    // تجاهل مجلدات API والمجلدات الداخلية الخاصة.
    if (
      entry.name === 'api' ||
      entry.name.startsWith('_') ||
      entry.name.startsWith('@')
    ) {
      continue
    }

    const childPath = path.join(directory, entry.name)

    try {
      if (!statSync(childPath).isDirectory()) continue
    } catch {
      continue
    }

    routes.push(
      ...discoverStaticPages(childPath, [
        ...segments,
        entry.name,
      ])
    )
  }

  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // الصفحات الثابتة المكتشفة تلقائيًا.
  const discoveredRoutes = discoverStaticPages(appDirectory)

  // الروابط الديناميكية التي نعرف بياناتها بالفعل.
  const dynamicRoutes = [
    ...services.map((service) => `/services/${service.id}`),

    ...packagesData.map((item) => `/packages/${item.id}`),

    ...universities.flatMap((university) => [
      `/universities/${university.slug}`,
      `/universities/${university.slug}/colleges`,
    ]),
  ]

  // إزالة التكرار واستبعاد أي مسار خاص.
  const allRoutes = [
    ...new Set([...discoveredRoutes, ...dynamicRoutes]),
  ].filter((route) => !isExcludedRoute(route))

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route === '/' ? '' : route}`,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority:
      route === '/'
        ? 1
        : [
              '/services',
              '/universities',
              '/previous-works',
            ].includes(route)
          ? 0.9
          : 0.7,
    lastModified: now,
  }))
}
