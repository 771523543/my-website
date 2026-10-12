
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LoaderCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function completeLogin() {
      try {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        const oauthError =
          params.get('error_description') || params.get('error')

        if (oauthError) {
          throw new Error(oauthError)
        }

        if (!code) {
          throw new Error(
            'لم يصل رمز تسجيل الدخول. حاول تسجيل الدخول باستخدام Google مرة أخرى.'
          )
        }

        const { error: sessionError } =
          await supabase.auth.exchangeCodeForSession(code)

        if (sessionError) throw sessionError

        if (active) {
          router.replace('/account')
          router.refresh()
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'تعذر إكمال تسجيل الدخول. حاول مرة أخرى.'
          )
        }
      }
    }

    completeLogin()

    return () => {
      active = false
    }
  }, [router])

  return (
    <main
      dir="rtl"
      className="flex min-h-[60vh] items-center justify-center px-4 py-12"
    >
      <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        {error ? (
          <>
            <h1 className="text-xl font-bold text-red-700">
              تعذر تسجيل الدخول
            </h1>

            <p className="mt-4 break-words text-sm leading-7 text-gray-600">
              {error}
            </p>

            <Link
              href="/auth/login"
              className="mt-6 inline-flex rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
              العودة إلى تسجيل الدخول
            </Link>
          </>
        ) : (
          <>
            <LoaderCircle
              className="mx-auto animate-spin text-blue-700"
              size={36}
            />

            <h1 className="mt-4 text-xl font-bold text-gray-900">
              جارٍ إكمال تسجيل الدخول
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              انتظر قليلًا، سننقلك إلى حسابك في منصة هديل.
            </p>
          </>
        )}
      </section>
    </main>
  )
}
