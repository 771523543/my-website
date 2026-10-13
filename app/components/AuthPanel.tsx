
'use client'

import '@/app/auth/auth.css'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Mail,
  LockKeyhole,
  GraduationCap,
  LoaderCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  UserRound,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

type AuthMode = 'register' | 'login'

type AuthPanelProps = {
  initialMode?: AuthMode
}

function GoogleLogo() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.61l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 38.04 46.98 31.91 46.98 24.55Z" />
      <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
    </svg>
  )
}

export default function AuthPanel({
  initialMode = 'register',
}: AuthPanelProps) {
  const router = useRouter()

  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode)
    setError('')
    setMessage('')
    setShowPassword(false)
  }

  async function handleGoogleLogin() {
    setError('')
    setMessage('')
    setGoogleLoading(true)

    try {
      const { error: googleError } =
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/account`,
          },
        })

      if (googleError) throw googleError
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر تسجيل الدخول باستخدام Google. حاول مرة أخرى.'
      )
      setGoogleLoading(false)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')

    const cleanEmail = email.trim()

    if (!cleanEmail || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور.')
      return
    }

    if (password.length < 6) {
      setError('يجب ألا تقل كلمة المرور عن 6 أحرف.')
      return
    }

    setLoading(true)

    try {
      if (mode === 'register') {
        const { data, error: signUpError } =
          await supabase.auth.signUp({
            email: cleanEmail,
            password,
          })

        if (signUpError) throw signUpError

        if (data.session) {
          setMessage('تم إنشاء الحساب بنجاح.')
          router.push('/account')
          router.refresh()
          return
        }

        if (data.user) {
          setVerifying(true)
          setMessage(
            'أرسلنا رمز التحقق إلى بريدك الإلكتروني. أدخل الرمز لإكمال التسجيل.'
          )
        } else {
          setError('لم يكتمل إنشاء الحساب. حاول مرة أخرى.')
        }
      } else {
        const { error: loginError } =
          await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password,
          })

        if (loginError) throw loginError

        router.push('/account')
        router.refresh()
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'حدث خطأ غير متوقع. حاول مرة أخرى.'
      )
    } finally {
      setLoading(false)
    }
  }

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!otp.trim()) {
      setError('أدخل رمز التحقق الذي وصلك عبر البريد الإلكتروني.')
      return
    }

    setLoading(true)

    try {
      const { error: verifyError } =
        await supabase.auth.verifyOtp({
          email: email.trim(),
          token: otp.trim(),
          type: 'signup',
        })

      if (verifyError) throw verifyError

      setMessage('تم تأكيد بريدك الإلكتروني بنجاح.')
      router.push('/account')
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر التحقق من الرمز. تأكد من صحته وحاول مجددًا.'
      )
    } finally {
      setLoading(false)
    }
  }

  async function resendCode() {
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const { error: resendError } =
        await supabase.auth.resend({
          type: 'signup',
          email: email.trim(),
        })

      if (resendError) throw resendError

      setMessage('طلبنا إرسال رمز جديد إلى بريدك الإلكتروني.')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر إرسال رمز جديد. حاول لاحقًا.'
      )
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-gray-50 px-12 py-4 text-center text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100'

  const labelClass =
    'mb-3 flex items-center justify-center gap-2 text-center text-sm font-bold text-gray-700'

  return (
    <main
      dir="rtl"
      className="auth-page mx-auto w-full max-w-xl px-4 py-8 sm:py-12"
    >
      <section className="auth-card overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg shadow-gray-200/50">
        <div className="auth-heading bg-blue-700 px-6 py-9 text-center text-white sm:px-10">
          <div className="auth-brand-icon mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 shadow-inner">
            <GraduationCap size={34} strokeWidth={1.8} />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight">
            {verifying
              ? 'تأكيد البريد الإلكتروني'
              : mode === 'register'
                ? 'إنشاء حساب طالب'
                : 'تسجيل الدخول'}
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-blue-50">
            {verifying
              ? 'أدخل رمز التحقق الذي أرسلناه إلى بريدك الإلكتروني.'
              : mode === 'register'
                ? 'أنشئ حسابك للوصول إلى خدماتك الطلابية بسهولة.'
                : 'أهلًا بك مجددًا، سجّل دخولك لمتابعة حسابك وطلباتك.'}
          </p>
        </div>

        <div className="auth-form p-5 text-center sm:p-9">
          {!verifying && (
            <div className="auth-tabs mb-7 grid grid-cols-2 gap-2 rounded-2xl bg-gray-100 p-1.5">
              <button
                type="button"
                onClick={() => changeMode('register')}
                className={`auth-tab flex items-center justify-center gap-2 rounded-xl px-3 py-3.5 text-sm font-bold transition ${
                  mode === 'register'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <UserRound size={19} />
                إنشاء حساب
              </button>

              <button
                type="button"
                onClick={() => changeMode('login')}
                className={`auth-tab flex items-center justify-center gap-2 rounded-xl px-3 py-3.5 text-sm font-bold transition ${
                  mode === 'login'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <LockKeyhole size={19} />
                تسجيل الدخول
              </button>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="auth-alert auth-alert-error mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-center text-sm leading-6 text-red-700"
            >
              {error}
            </div>
          )}

          {message && (
            <div
              role="status"
              className="auth-alert auth-alert-success mb-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-center text-sm leading-6 text-green-800"
            >
              {message}
            </div>
          )}

          {verifying ? (
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className={labelClass} htmlFor="otp">
                  <ShieldCheck size={19} className="text-blue-600" />
                  رمز التحقق
                </label>

                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value)}
                  placeholder="أدخل الرمز المرسل إليك"
                  className={inputClass}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="auth-submit flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-4 font-bold text-white shadow-md shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && <LoaderCircle className="animate-spin" size={20} />}
                تأكيد البريد الإلكتروني
              </button>

              <button
                type="button"
                onClick={resendCode}
                disabled={loading}
                className="auth-text-button w-full py-2 text-sm font-semibold text-blue-700 hover:underline disabled:opacity-60"
              >
                إعادة إرسال الرمز
              </button>

              <button
                type="button"
                onClick={() => {
                  setVerifying(false)
                  setOtp('')
                  setError('')
                  setMessage('')
                }}
                className="auth-text-button w-full py-2 text-sm text-gray-500 hover:text-gray-800 hover:underline"
              >
                العودة إلى التسجيل
              </button>
            </form>
          ) : (
            <>
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={googleLoading || loading}
                className="auth-google mb-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-4 font-bold text-gray-800 shadow-sm transition hover:border-gray-400 hover:bg-gray-50 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {googleLoading ? (
                  <LoaderCircle className="animate-spin" size={21} />
                ) : (
                  <GoogleLogo />
                )}

                <span>
                  {googleLoading
                    ? 'جارٍ الانتقال إلى Google...'
                    : 'المتابعة باستخدام Google'}
                </span>
              </button>

              <div className="mb-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="whitespace-nowrap text-xs font-medium text-gray-400">
                  أو باستخدام البريد الإلكتروني
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className={labelClass} htmlFor="email">
                    <Mail size={19} className="text-blue-600" />
                    البريد الإلكتروني
                  </label>

                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-600"
                      size={20}
                    />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="أدخل بريدك الإلكتروني"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="password">
                    <LockKeyhole size={19} className="text-blue-600" />
                    كلمة المرور
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-blue-600"
                      size={20}
                    />

                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={
                        mode === 'register'
                          ? 'new-password'
                          : 'current-password'
                      }
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder={
                        mode === 'register'
                          ? '6 أحرف على الأقل'
                          : 'أدخل كلمة المرور'
                      }
                      className={inputClass}
                      minLength={6}
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword
                          ? 'إخفاء كلمة المرور'
                          : 'إظهار كلمة المرور'
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-blue-700"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="auth-submit flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-4 font-bold text-white shadow-md shadow-blue-700/20 transition hover:bg-blue-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading && <LoaderCircle className="animate-spin" size={20} />}

                  {loading
                    ? 'يرجى الانتظار...'
                    : mode === 'register'
                      ? 'إنشاء الحساب'
                      : 'تسجيل الدخول'}
                </button>

                {mode === 'login' && (
                  <div className="text-center">
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm font-semibold text-blue-700 hover:underline"
                    >
                      نسيت كلمة المرور؟
                    </Link>
                  </div>
                )}

                <p className="text-center text-sm leading-7 text-gray-600">
                  {mode === 'register'
                    ? 'لديك حساب بالفعل؟'
                    : 'ليس لديك حساب؟'}{' '}
                  <button
                    type="button"
                    onClick={() =>
                      changeMode(mode === 'register' ? 'login' : 'register')
                    }
                    className="font-bold text-blue-700 hover:underline"
                  >
                    {mode === 'register' ? 'تسجيل الدخول' : 'إنشاء حساب'}
                  </button>
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
