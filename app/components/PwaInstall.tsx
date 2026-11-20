'use client'

import { useEffect, useState } from 'react'
import { Download, Share, X } from 'lucide-react'

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export default function PwaInstall() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showIOSHelp, setShowIOSHelp] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone)

    setIsInstalled(standalone)
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent))

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
    if (promptEvent) {
      await promptEvent.prompt()
      const choice = await promptEvent.userChoice
      if (choice.outcome === 'accepted') setIsInstalled(true)
      setPromptEvent(null)
      return
    }

    if (isIOS) {
      setShowIOSHelp(true)
      return
    }

    setShowIOSHelp(true)
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
        <div style={{ flex: 1, minWidth: 0 }}>
          <strong style={{ display: 'block', fontSize: 15 }}>منصة هديل كتطبيق</strong>
          <span style={{ display: 'block', fontSize: 12, color: '#666', marginTop: 3 }}>
            ثبّت المنصة على شاشة جوالك للوصول إليها بسهولة
          </span>
        </div>
        <button
          type="button"
          onClick={installApp}
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
            cursor: 'pointer',
          }}
        >
          <Download size={16} />
          تثبيت
        </button>
      </div>

      {showIOSHelp && (
        <div
          role="dialog"
          aria-label="طريقة تثبيت منصة هديل"
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            background: '#f5f5f0',
            fontSize: 13,
            lineHeight: 1.8,
          }}
        >
          <strong>طريقة التثبيت على جهازك:</strong>
          {isIOS ? (
            <p style={{ margin: '5px 0 0' }}>
              افتح الموقع في Safari، ثم اضغط زر المشاركة <Share size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />،
              واختر «إضافة إلى الشاشة الرئيسية»، ثم اضغط «إضافة».
            </p>
          ) : (
            <p style={{ margin: '5px 0 0' }}>
              افتح الموقع في Chrome، ثم اضغط قائمة ⋮ واختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».
            </p>
          )}
        </div>
      )}
    </aside>
  )
}
