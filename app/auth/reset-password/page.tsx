'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [checking, setChecking] = useState(true)
  const [loading, setLoading] = useState(false)
  const [sessionReady, setSessionReady] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function checkSession() {
      const { data, error: sessionError } =
        await supabase.auth.getSession()

      if (!active) return

      if (sessionError) {
        setError(sessionError.message)
      }

      setSessionReady(Boolean(data.session))
      setChecking(false)
    }

    checkSession()

    return () => {
      active = false
    }
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (password.length < 6) {
      setError('يجب ألا تقل كلمة المرور عن 6 أحرف.')
      return
    }

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين.')
      return
    }

    setLoading(true)

    try {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        setSessionReady(false)
        throw new Error(
          'رابط الاستعادة غير صالح أو انتهت صلاحيته. اطلب رابطًا جديدًا.'
        )
      }

      const { error: updateError } =
        await supabase.auth.updateUser({ password })

      if (updateError) throw updateError

      setMessage(
        'تم تغيير كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.'
      )

      window.setTimeout(() => {
        router.replace('/auth/login')
      }, 1500)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر تغيير كلمة المرور.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (checking) {
    return (
      <main
        dir="rtl"
        className="mx-auto max-w-lg px-4 py-16 text-center"
      >
        جارٍ التحقق من رابط الاستعادة...
      </main>
    )
  }

  return (
    <main
      dir="rtl"
      className="mx-auto w-full max-w-lg px-4 py-10 sm:py-16"
    >
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          تعيين كلمة مرور جديدة
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-600">
          اختر كلمة مرور جديدة لحسابك.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
          >
            {error}
          </div>
        )}

        {message && (
          <div
            role="status"
            className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
          >
            {message}
          </div>
        )}

        {!sessionReady && !message ? (
          <Link
            href="/auth/forgot-password"
            className="mt-6 block rounded-xl bg-blue-700 px-4 py-3 text-center font-semibold text-white hover:bg-blue-800"
          >
            طلب رابط استعادة جديد
          </Link>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                كلمة المرور الجديدة
              </label>

              <input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={6}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                تأكيد كلمة المرور
              </label>

              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                minLength={6}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-700 px-4 py-3.5 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
            >
              {loading ? 'جارٍ الحفظ...' : 'حفظ كلمة المرور الجديدة'}
            </button>
          </form>
        )}
      </section>
    </main>
  )
}