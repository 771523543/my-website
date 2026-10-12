'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo:
              `${window.location.origin}/auth/reset-password`,
          }
        )

      if (resetError) throw resetError

      setMessage(
        'إذا كان البريد الإلكتروني مسجلًا، فستصلك رسالة لاستعادة كلمة المرور. تحقق من صندوق الوارد والرسائل غير المرغوب فيها.'
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر إرسال رسالة الاستعادة.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      dir="rtl"
      className="mx-auto w-full max-w-lg px-4 py-10 sm:py-16"
    >
      <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          استعادة كلمة المرور
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-600">
          أدخل البريد الإلكتروني المرتبط بحسابك لطلب رابط
          إعادة تعيين كلمة المرور.
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              البريد الإلكتروني
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="student@example.com"
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 px-4 py-3.5 font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
          >
            {loading ? 'جارٍ الإرسال...' : 'إرسال رابط الاستعادة'}
          </button>
        </form>

        <Link
          href="/auth/login"
          className="mt-6 block text-center text-sm font-semibold text-blue-700 hover:underline"
        >
          العودة إلى تسجيل الدخول
        </Link>
      </section>
    </main>
  )
}