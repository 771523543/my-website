'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const VISITOR_KEY = 'hadeel_analytics_visitor_v1'
const INSTALL_KEY = 'hadeel_analytics_install_recorded_v1'

function getVisitorId() {
  try {
    let id = window.localStorage.getItem(VISITOR_KEY)
    if (!id) {
      id = typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
          })
      window.localStorage.setItem(VISITOR_KEY, id)
    }
    return id
  } catch {
    return typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : '00000000-0000-4000-8000-000000000000'
  }
}

function getSourceMode(): 'website' | 'installed_app' {
  const standalone = window.matchMedia('(display-mode: standalone)').matches
    || Boolean((navigator as Navigator & { standalone?: boolean }).standalone)
  return standalone ? 'installed_app' : 'website'
}

export default function SiteAnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || pathname.startsWith('/admin')) return

    const visitorId = getVisitorId()
    const sourceMode = getSourceMode()

    void supabase.from('site_analytics_events').insert({
      event_type: 'page_view',
      source_mode: sourceMode,
      page_path: pathname.slice(0, 300),
      visitor_id: visitorId,
    })
  }, [pathname])

  useEffect(() => {
    const handleInstalled = () => {
      try {
        if (window.localStorage.getItem(INSTALL_KEY) === '1') return
        window.localStorage.setItem(INSTALL_KEY, '1')
      } catch {
        // The browser may block local storage; still attempt to record the event.
      }

      void supabase.from('site_analytics_events').insert({
        event_type: 'app_install',
        source_mode: 'installed_app',
        page_path: window.location.pathname.slice(0, 300) || '/',
        visitor_id: getVisitorId(),
      })
    }

    window.addEventListener('appinstalled', handleInstalled)
    return () => window.removeEventListener('appinstalled', handleInstalled)
  }, [])

  return null
}
