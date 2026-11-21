const CACHE_VERSION = 'hadeel-offline-v1'
const APP_CACHE = `${CACHE_VERSION}-pages`
const ASSET_CACHE = `${CACHE_VERSION}-assets`
const OFFLINE_URL = '/offline.html'

const PRIVATE_PATHS = [
  /^\/admin(?:\/|$)/,
  /^\/api(?:\/|$)/,
  /^\/auth(?:\/|$)/,
  /^\/login(?:\/|$)/,
  /^\/signup(?:\/|$)/,
  /^\/profile(?:\/|$)/,
  /^\/dashboard(?:\/|$)/,
  /^\/orders?(?:\/|$)/,
  /^\/requests?(?:\/|$)/,
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_CACHE)
      .then((cache) => cache.addAll([OFFLINE_URL, '/']))
      .catch(() => caches.open(APP_CACHE).then((cache) => cache.add(OFFLINE_URL)))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('hadeel-offline-') && ![APP_CACHE, ASSET_CACHE].includes(key))
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // Never store API responses, authenticated pages, or user-submitted data.
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.startsWith('/_next/data/') ||
    PRIVATE_PATHS.some((pattern) => pattern.test(url.pathname))
  ) return

  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(APP_CACHE)
      const cacheKey = new Request(url.origin + url.pathname)
      try {
        const response = await fetch(request)
        if (response && response.ok && response.type === 'basic') {
          await cache.put(cacheKey, response.clone())
        }
        return response
      } catch {
        const savedPage = await cache.match(cacheKey)
        if (savedPage) return savedPage
        return (await cache.match(OFFLINE_URL)) || new Response(
          'أنتِ غير متصلة بالإنترنت. أعيدي الاتصال وحاولي مرة أخرى.',
          { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
        )
      }
    })())
    return
  }

  // Cache same-origin Next.js build assets and public images/styles/scripts.
  if (
    url.pathname.startsWith('/_next/static/') ||
    /\.(?:css|js|mjs|png|jpg|jpeg|webp|svg|ico|woff2?)$/i.test(url.pathname)
  ) {
    event.respondWith((async () => {
      const cache = await caches.open(ASSET_CACHE)
      const cached = await cache.match(request)
      if (cached) return cached
      try {
        const response = await fetch(request)
        if (response && response.ok && response.type === 'basic') {
          await cache.put(request, response.clone())
        }
        return response
      } catch {
        return cached || Response.error()
      }
    })())
  }
})
