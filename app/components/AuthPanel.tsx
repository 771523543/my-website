
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

/**
 * يعيد المسار الداخلي الذي طلبه المستخدم.
 * يمنع إعادة التوجيه إلى مواقع خارجية.
 */
function getNextPath() {
  if (typeof window === 'undefined') return '/account'

  const requested = new URLSearchParams(
    window.location.search
  ).get('next')

  return requested &&
    requested.startsWith('/') &&
    !requested.startsWith('//')
    ? requested
    : '/account'
}

function GoogleLogo() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="22"
      height="22"
      aria-hidden="true"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.61l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 38.04 46.98 31.91 46.98 24.55Z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.89 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
      />
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
            redirectTo: `${window.location.origin}${getNextPath()}`,
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

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
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
          router.push(getNextPath())
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

        router.push(getNextPath())
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

  async function handleVerify(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!otp.trim()) {
      setError(
        'أدخل رمز التحقق الذي وصلك عبر البريد الإلكتروني.'
      )
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
      router.push(getNextPath())
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

      setMessage(
        'طلبنا إرسال رمز جديد إلى بريدك الإلكتروني.'
      )
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
    'w-full min-w-0 rounded-[14px] border border-gray-200 bg-gray-50 px-12 py-4 text-right text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-blue-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100'

  const labelClass =
    'mb-3 flex items-center justify-start gap-2 text-right text-sm font-bold text-gray-700'

  return (
    <main dir="rtl" className="auth-page">
      <section className="auth-card">
        <div className="auth-heading">
          <div className="auth-brand-icon">
            <GraduationCap size={34} strokeWidth={1.8} />
          </div>

          <h1>
            {verifying
              ? 'تأكيد البريد الإلكتروني'
              : mode === 'register'
                ? 'إنشاء حساب طالب'
                : 'تسجيل الدخول'}
          </h1>

          <p>
            {verifying
              ? 'أدخل رمز التحقق الذي أرسلناه إلى بريدك الإلكتروني.'
              : mode === 'register'
                ? 'أنشئ حسابك للوصول إلى خدماتك الطلابية بسهولة.'
                : 'أهلًا بك مجددًا، سجّل دخولك لمتابعة حسابك وطلباتك.'}
          </p>
        </div>

        <div className="auth-form">
          {!verifying && (
            <div className="auth-tabs">
              <button
                type="button"
                onClick={() => changeMode('register')}
                aria-pressed={mode === 'register'}
                className={`auth-tab ${
                  mode === 'register' ? 'active' : ''
                }`}
              >
                <UserRound size={19} />
                <span>إنشاء حساب</span>
              </button>

              <button
                type="button"
                onClick={() => changeMode('login')}
                aria-pressed={mode === 'login'}
                className={`auth-tab ${
                  mode === 'login' ? 'active' : ''
                }`}
              >
                <LockKeyhole size={19} />
                <span>تسجيل الدخول</span>
              </button>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="auth-alert auth-alert-error"
            >
              {error}
            </div>
          )}

          {message && (
            <div
              role="status"
              className="auth-alert auth-alert-success"
            >
              {message}
            </div>
          )}

          {verifying ? (
            <form onSubmit={handleVerify}>
              <div>
                <label className={labelClass} htmlFor="otp">
                  <ShieldCheck size={19} />
                  رمز التحقق
                </label>

                <input
                  id="otp"
                  type="text"
                  dir="ltr"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(event) =>
                    setOtp(event.target.value)
                  }
                  placeholder="أدخل الرمز المرسل إليك"
                  className={inputClass}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="auth-submit"
              >
                {loading && (
                  <LoaderCircle
                    className="animate-spin"
                    size={20}
                  />
                )}
                <span>تأكيد البريد الإلكتروني</span>
              </button>

              <button
                type="button"
                onClick={resendCode}
                disabled={loading}
                className="auth-text-button"
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
                className="auth-text-button"
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
                className="auth-google"
              >
                {googleLoading ? (
                  <LoaderCircle
                    className="animate-spin"
                    size={21}
                  />
                ) : (
                  <GoogleLogo />
                )}

                <span>
                  {googleLoading
                    ? 'جارٍ الانتقال إلى Google...'
                    : 'المتابعة باستخدام Google'}
                </span>
              </button>

              <div className="auth-divider">
                <span />
                <span>أو باستخدام البريد الإلكتروني</span>
                <span />
              </div>

              <form onSubmit={handleSubmit}>
                <div>
                  <label
                    className={labelClass}
                    htmlFor="email"
                  >
                    <Mail size={19} />
                    البريد الإلكتروني
                  </label>

                  <div className="relative">
                    <Mail
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                      size={20}
                      aria-hidden="true"
                    />

                    <input
                      id="email"
                      type="email"
                      dir="ltr"
                      autoComplete="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      placeholder="name@example.com"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    className={labelClass}
                    htmlFor="password"
                  >
                    <LockKeyhole size={19} />
                    كلمة المرور
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
                      size={20}
                      aria-hidden="true"
                    />

                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      dir="ltr"
                      autoComplete={
                        mode === 'register'
                          ? 'new-password'
                          : 'current-password'
                      }
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
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
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      aria-label={
                        showPassword
                          ? 'إخفاء كلمة المرور'
                          : 'إظهار كلمة المرور'
                      }
                      aria-pressed={showPassword}
                      className="auth-password-toggle"
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {mode === 'login' && (
                  <div className="auth-forgot">
                    <Link href="/auth/forgot-password">
                      نسيت كلمة المرور؟
                    </Link>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || googleLoading}
                  className="auth-submit"
                >
                  {loading && (
                    <LoaderCircle
                      className="animate-spin"
                      size={20}
                    />
                  )}

                  <span>
                    {loading
                      ? 'يرجى الانتظار...'
                      : mode === 'register'
                        ? 'إنشاء الحساب'
                        : 'تسجيل الدخول'}
                  </span>
                </button>

                <p className="auth-switch">
                  {mode === 'register'
                    ? 'لديك حساب بالفعل؟'
                    : 'ليس لديك حساب؟'}

                  <button
                    type="button"
                    onClick={() =>
                      changeMode(
                        mode === 'register'
                          ? 'login'
                          : 'register'
                      )
                    }
                  >
                    {mode === 'register'
                      ? 'تسجيل الدخول'
                      : 'إنشاء حساب'}
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
