'use client'

import '@/app/auth/auth.css'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  UserRound,
  Mail,
  LockKeyhole,
  Phone,
  GraduationCap,
  BookOpen,
  LoaderCircle,
  ShieldCheck,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

type AuthMode = 'register' | 'login'

type AuthPanelProps = {
  initialMode?: AuthMode
}

export default function AuthPanel({
  initialMode = 'register',
}: AuthPanelProps) {
  const router = useRouter()

  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [university, setUniversity] = useState('')
  const [major, setMajor] = useState('')
  const [academicLevel, setAcademicLevel] = useState('')

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode)
    setError('')
    setMessage('')
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')

    if (!email.trim() || !password) {
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
            email: email.trim(),
            password,
            options: {
              data: {
                full_name: fullName.trim() || null,
                phone: phone.trim() || null,
                university: university.trim() || null,
                major: major.trim() || null,
                academic_level: academicLevel.trim() || null,
              },
            },
          })

        if (signUpError) throw signUpError

        if (data.session) {
          setMessage('تم إنشاء الحساب وتسجيل الدخول بنجاح.')
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
            email: email.trim(),
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
    'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100'

  const labelClass =
    'mb-2 block text-sm font-medium text-gray-700'

  return (
    <main
      dir="rtl"
      className="auth-page mx-auto w-full max-w-xl px-4 py-8 sm:py-12"
    >
      <section className="auth-card overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="auth-heading bg-blue-700 px-6 py-8 text-center text-white sm:px-10">
          <div className="auth-brand-icon mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <GraduationCap size={30} />
          </div>

          <h1 className="text-2xl font-bold">
            {verifying
              ? 'تأكيد البريد الإلكتروني'
              : mode === 'register'
                ? 'إنشاء حساب طالب'
                : 'تسجيل الدخول'}
          </h1>

          <p className="mt-3 text-sm leading-7 text-blue-50">
            {verifying
              ? 'أدخل رمز التحقق الذي أرسلناه إلى بريدك الإلكتروني.'
              : mode === 'register'
                ? 'أنشئ حسابك للوصول إلى الخدمات الطلابية.'
                : 'سجّل دخولك لمتابعة حسابك وطلباتك الطلابية.'}
          </p>
        </div>

        <div className="auth-form p-5 sm:p-8">
          {!verifying && (
            <div className="auth-tabs mb-7 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => changeMode('register')}
                className={`auth-tab rounded-lg px-3 py-3 text-sm font-semibold transition ${
                  mode === 'register'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                إنشاء حساب
              </button>

              <button
                type="button"
                onClick={() => changeMode('login')}
                className={`auth-tab rounded-lg px-3 py-3 text-sm font-semibold transition ${
                  mode === 'login'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-gray-600'
                }`}
              >
                تسجيل الدخول
              </button>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="auth-alert auth-alert-error mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
            >
              {error}
            </div>
          )}

          {message && (
            <div
              role="status"
              className="auth-alert auth-alert-success mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
            >
              {message}
            </div>
          )}

          {verifying ? (
            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label className={labelClass} htmlFor="otp">
                  رمز التحقق
                </label>

                <div className="relative">
                  <ShieldCheck
                    className="absolute right-3 top-3.5 text-gray-400"
                    size={19}
                  />

                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    placeholder="أدخل الرمز المرسل إليك"
                    className={`${inputClass} pr-10`}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="auth-submit flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3.5 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && (
                  <LoaderCircle className="animate-spin" size={19} />
                )}
                تأكيد البريد الإلكتروني
              </button>

              <button
                type="button"
                onClick={resendCode}
                disabled={loading}
                className="auth-text-button w-full py-2 text-sm font-medium text-blue-700 hover:underline disabled:opacity-60"
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
                className="auth-text-button w-full py-2 text-sm text-gray-600 hover:underline"
              >
                العودة إلى التسجيل
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'register' && (
                <>
                  <p className="text-xs leading-6 text-gray-500">
                    الحقول التالية اختيارية، ويمكنك تركها فارغة وإكمالها
                    لاحقًا.
                  </p>

                  <div>
                    <label className={labelClass} htmlFor="fullName">
                      الاسم الكامل (اختياري)
                    </label>

                    <div className="relative">
                      <UserRound
                        className="absolute right-3 top-3.5 text-gray-400"
                        size={19}
                      />

                      <input
                        id="fullName"
                        autoComplete="name"
                        value={fullName}
                        onChange={(event) =>
                          setFullName(event.target.value)
                        }
                        placeholder="اسم الطالب"
                        className={`${inputClass} pr-10`}
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className={labelClass} htmlFor="email">
                  البريد الإلكتروني
                </label>

                <div className="relative">
                  <Mail
                    className="absolute right-3 top-3.5 text-gray-400"
                    size={19}
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="student@example.com"
                    className={`${inputClass} pr-10`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="password">
                  كلمة المرور
                </label>

                <div className="relative">
                  <LockKeyhole
                    className="absolute right-3 top-3.5 text-gray-400"
                    size={19}
                  />

                  <input
                    id="password"
                    type="password"
                    autoComplete={
                      mode === 'register'
                        ? 'new-password'
                        : 'current-password'
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    placeholder="6 أحرف على الأقل"
                    className={`${inputClass} pr-10`}
                    minLength={6}
                    required
                  />
                </div>
              </div>

              {mode === 'register' && (
                <>
                  <div>
                    <label className={labelClass} htmlFor="phone">
                      رقم الهاتف (اختياري)
                    </label>

                    <div className="relative">
                      <Phone
                        className="absolute right-3 top-3.5 text-gray-400"
                        size={19}
                      />

                      <input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(event) =>
                          setPhone(event.target.value)
                        }
                        placeholder="رقم الهاتف"
                        className={`${inputClass} pr-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="university">
                      الجامعة (اختياري)
                    </label>

                    <div className="relative">
                      <GraduationCap
                        className="absolute right-3 top-3.5 text-gray-400"
                        size={19}
                      />

                      <input
                        id="university"
                        value={university}
                        onChange={(event) =>
                          setUniversity(event.target.value)
                        }
                        placeholder="اسم الجامعة"
                        className={`${inputClass} pr-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="major">
                      التخصص (اختياري)
                    </label>

                    <div className="relative">
                      <BookOpen
                        className="absolute right-3 top-3.5 text-gray-400"
                        size={19}
                      />

                      <input
                        id="major"
                        value={major}
                        onChange={(event) => setMajor(event.target.value)}
                        placeholder="التخصص الدراسي"
                        className={`${inputClass} pr-10`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className={labelClass}
                      htmlFor="academicLevel"
                    >
                      المستوى الدراسي (اختياري)
                    </label>

                    <input
                      id="academicLevel"
                      value={academicLevel}
                      onChange={(event) =>
                        setAcademicLevel(event.target.value)
                      }
                      placeholder="مثال: المستوى الثالث"
                      className={inputClass}
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="auth-submit flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-3.5 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && (
                  <LoaderCircle className="animate-spin" size={19} />
                )}

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
                    className="text-sm text-blue-700 hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>
              )}

              <p className="text-center text-sm text-gray-600">
                {mode === 'register'
                  ? 'لديك حساب بالفعل؟'
                  : 'ليس لديك حساب؟'}{' '}

                <button
                  type="button"
                  onClick={() =>
                    changeMode(
                      mode === 'register' ? 'login' : 'register'
                    )
                  }
                  className="font-semibold text-blue-700 hover:underline"
                >
                  {mode === 'register'
                    ? 'تسجيل الدخول'
                    : 'إنشاء حساب'}
                </button>
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}