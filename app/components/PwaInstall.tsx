'use client'

import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export default function PwaInstall() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone)

    setIsInstalled(standalone)

    const handleBeforeInstall = (event: Event) => {
      event.preventDefault()
      setPromptEvent(event as InstallPromptEvent)
    }

    const handleInstalled = () => {
      setIsInstalled(true)
      setPromptEvent(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  const installApp = async () => {
    if (!promptEvent) return

    await promptEvent.prompt()
    const choice = await promptEvent.userChoice
    if (choice.outcome === 'accepted') setIsInstalled(true)
    setPromptEvent(null)
  }

  if (isInstalled || dismissed) return null

  return (
    <aside
      dir="rtl"
      aria-label="تثبيت تطبيق منصة هديل"
      style={{
        position: 'fixed',
        zIndex: 1000,
        bottom: 'max(16px, env(safe-area-inset-bottom))',
        left: 16,
        right: 16,
        maxWidth: 520,
        marginInline: 'auto',
        padding: '14px 16px',
        borderRadius: 18,
        background: '#fff',
        color: '#25271f',
        boxShadow: '0 8px 32px rgba(0,0,0,.18)',
        border: '1px solid rgba(111,118,87,.2)',
      }}
    >
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="إغلاق"
        style={{
          position: 'absolute',
          top: 8,
          left: 8,
          border: 0,
          background: 'transparent',
          color: '#666',
          padding: 6,
          cursor: 'pointer',
        }}
      >
        <X size={18} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img
          src="/hadeel-platform-logo.png"
          alt=""
          width="44"
          height="44"
          style={{ objectFit: 'contain', borderRadius: 10 }}
        />
        <strong style={{ flex: 1, minWidth: 0, fontSize: 15 }}>
          ثبت تطبيق منصة هديل
        </strong>
        <button
          type="button"
          onClick={installApp}
          disabled={!promptEvent}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            border: 0,
            borderRadius: 12,
            padding: '10px 13px',
            background: '#6f7657',
            color: '#fff',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            cursor: promptEvent ? 'pointer' : 'default',
            opacity: promptEvent ? 1 : 0.7,
          }}
        >
          <Download size={16} />
          ثبت التطبيق
        </button>
      </div>
    </aside>
  )
}
