
'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  UserRound,
  ClipboardList,
  ChartNoAxesCombined,
  GraduationCap,
  Phone,
  BookOpen,
  School,
  Save,
  LogOut,
  ArrowLeft,
  ChevronUp,
  Clock3,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

type StudentProfile = {
  full_name: string
  phone: string
  university: string
  major: string
  academic_level: string
}

const emptyProfile: StudentProfile = {
  full_name: '',
  phone: '',
  university: '',
  major: '',
  academic_level: '',
}

const dashboardItems = [
  {
    id: 'profile',
    title: 'البيانات الشخصية',
    description: 'عرض بياناتك الشخصية وتعديلها',
    icon: UserRound,
    tone: 'blue',
  },
  {
    id: 'requests',
    title: 'طلباتي',
    description: 'عرض الطلبات التي قدمتها',
    icon: ClipboardList,
    tone: 'gold',
  },
  {
    id: 'tracking',
    title: 'متابعة الطلبات',
    description: 'معرفة حالة طلباتك وتحديثاتها',
    icon: ChartNoAxesCombined,
    tone: 'green',
  },
  {
    id: 'services',
    title: 'الخدمات الطلابية',
    description: 'استكشف الخدمات المتاحة في هديل',
    icon: GraduationCap,
    tone: 'purple',
  },
] as const

export default function AccountPage() {
  const router = useRouter()

  const [profile, setProfile] =
    useState<StudentProfile>(emptyProfile)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadAccount() {
      try {
        const { data, error: userError } =
          await supabase.auth.getUser()

        if (userError || !data.user) {
          router.replace('/auth/login')
          return
        }

        if (!active) return

        const { data: student, error: profileError } =
          await supabase
            .from('student_profiles')
            .select(
              'full_name, phone, university, major, academic_level'
            )
            .eq('id', data.user.id)
            .maybeSingle()

        if (profileError) throw profileError
        if (!active) return

        if (student) {
          setProfile({
            full_name: student.full_name ?? '',
            phone: student.phone ?? '',
            university: student.university ?? '',
            major: student.major ?? '',
            academic_level: student.academic_level ?? '',
          })
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'تعذر تحميل بيانات الحساب.'
          )
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadAccount()

    return () => {
      active = false
    }
  }, [router])

  function updateField(
    field: keyof StudentProfile,
    value: string
  ) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function saveProfile(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()
    setError('')
    setMessage('')
    setSaving(true)

    try {
      const { data, error: userError } =
        await supabase.auth.getUser()

      if (userError || !data.user) {
        router.replace('/auth/login')
        return
      }

      const { error: saveError } = await supabase
        .from('student_profiles')
        .upsert(
          {
            id: data.user.id,
            full_name: profile.full_name.trim() || null,
            phone: profile.phone.trim() || null,
            university: profile.university.trim() || null,
            major: profile.major.trim() || null,
            academic_level:
              profile.academic_level.trim() || null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )

      if (saveError) throw saveError

      setMessage('تم حفظ بياناتك بنجاح.')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر حفظ البيانات. حاول مرة أخرى.'
      )
    } finally {
      setSaving(false)
    }
  }

  async function signOut() {
    if (signingOut) return

    setError('')
    setMessage('')
    setSigningOut(true)

    try {
      const { error: signOutError } =
        await supabase.auth.signOut()

      if (signOutError) throw signOutError

      router.replace('/auth/login')
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر تسجيل الخروج. حاول مرة أخرى.'
      )
    } finally {
      setSigningOut(false)
    }
  }

  function handleCard(
    id: (typeof dashboardItems)[number]['id']
  ) {
    setMessage('')
    setError('')

    if (id === 'profile') {
      setProfileOpen(true)

      window.setTimeout(() => {
        document
          .getElementById('student-profile')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
      }, 0)

      return
    }

    if (id === 'requests') {
      router.push('/account/requests')
      return
    }

    if (id === 'tracking') {
      router.push('/account/tracking')
      return
    }

    if (id === 'services') {
      router.push('/services')
    }
  }

  const fields: {
    key: keyof StudentProfile
    label: string
    placeholder: string
    type?: string
    icon: typeof UserRound
  }[] = [
    {
      key: 'full_name',
      label: 'الاسم الكامل',
      placeholder: 'اكتب اسمك الكامل',
      icon: UserRound,
    },
    {
      key: 'phone',
      label: 'رقم الهاتف',
      placeholder: 'اكتب رقم الهاتف',
      type: 'tel',
      icon: Phone,
    },
    {
      key: 'university',
      label: 'الجامعة',
      placeholder: 'اسم الجامعة',
      icon: School,
    },
    {
      key: 'major',
      label: 'التخصص',
      placeholder: 'التخصص الدراسي',
      icon: BookOpen,
    },
    {
      key: 'academic_level',
      label: 'المستوى الدراسي',
      placeholder: 'مثال: المستوى الثالث',
      icon: GraduationCap,
    },
  ]

  if (loading) {
    return (
      <main dir="rtl" className="account-page">
        <div className="account-loading">
          <span className="account-loading-dot" />
          جارٍ تحميل بيانات حسابك...
        </div>

        <style jsx>{`
          .account-page {
            min-height: 70vh;
            padding: 24px 16px;
            background: #f7f9fd;
          }

          .account-loading {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            min-height: 240px;
            color: #697791;
            font-size: 14px;
          }

          .account-loading-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #2455c4;
          }
        `}</style>
      </main>
    )
  }

  return (
    <main dir="rtl" className="account-page">
      <div className="account-container">
        <header className="account-welcome">
          <div className="account-welcome-icon">
            <GraduationCap size={32} strokeWidth={1.8} />
          </div>

          <div className="account-welcome-copy">
            <span className="account-welcome-label">
              منصة هديل
            </span>

            <h1>حساب الطالب</h1>

            <p>
              مرحبًا بك في منصة هديل للخدمات الطلابية
            </p>
          </div>
        </header>

        <section
          className="account-dashboard"
          aria-labelledby="account-dashboard-title"
        >
          <div className="account-section-heading">
            <span className="account-heading-mark" />

            <div>
              <h2 id="account-dashboard-title">
                لوحة حسابك
              </h2>
              <p>اختر القسم الذي تريد الوصول إليه</p>
            </div>
          </div>

          <div className="account-cards">
            {dashboardItems.map((item) => {
              const Icon = item.icon

              const actionLabel = {
                profile: 'عرض البيانات',
                requests: 'عرض طلباتي',
                tracking: 'متابعة الحالة',
                services: 'استعراض الخدمات',
              }[item.id]

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`account-action-card account-tone-${item.tone}`}
                  onClick={() => handleCard(item.id)}
                >
                  <span className="account-action-icon">
                    <Icon size={29} strokeWidth={1.8} />
                  </span>

                  <span className="account-action-title">
                    {item.title}
                  </span>

                  <span className="account-action-description">
                    {item.description}
                  </span>

                  <span className="account-action-link">
                    {actionLabel}
                    <ArrowLeft size={15} />
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        {message && (
          <div
            role="status"
            className="account-notice account-notice-success"
          >
            <Save size={18} />
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="account-notice account-notice-error"
          >
            {error}
          </div>
        )}

        {profileOpen && (
          <section
            id="student-profile"
            className="account-profile-panel"
          >
            <button
              type="button"
              className="account-profile-toggle"
              onClick={() => setProfileOpen(false)}
              aria-expanded={profileOpen}
            >
              <span className="account-profile-title">
                <UserRound size={21} />

                <span>
                  <strong>البيانات الشخصية</strong>
                  <small>
                    يمكنك تعديل بياناتك في أي وقت،
                    وجميع الحقول اختيارية.
                  </small>
                </span>
              </span>

              <ChevronUp size={21} />
            </button>

            <div className="account-profile-content">
              <form
                onSubmit={saveProfile}
                className="account-profile-form"
              >
                {fields.map((field) => {
                  const Icon = field.icon

                  return (
                    <div
                      className="account-field"
                      key={field.key}
                    >
                      <label htmlFor={field.key}>
                        {field.label}{' '}
                        <span>(اختياري)</span>
                      </label>

                      <div className="account-field-control">
                        <Icon size={18} aria-hidden="true" />

                        <input
                          id={field.key}
                          type={field.type ?? 'text'}
                          value={profile[field.key]}
                          onChange={(event) =>
                            updateField(
                              field.key,
                              event.target.value
                            )
                          }
                          placeholder={field.placeholder}
                          autoComplete={
                            field.key === 'full_name'
                              ? 'name'
                              : field.key === 'phone'
                                ? 'tel'
                                : 'off'
                          }
                        />
                      </div>
                    </div>
                  )
                })}

                <button
                  type="submit"
                  disabled={saving}
                  className="account-save-button"
                >
                  <Save size={18} />
                  {saving ? 'جارٍ الحفظ...' : 'حفظ البيانات'}
                </button>
              </form>
            </div>
          </section>
        )}

        <footer className="account-footer">
          <Link
            href="/services"
            className="account-footer-link"
          >
            <GraduationCap size={18} />
            العودة إلى الخدمات الطلابية
          </Link>

          <button
            type="button"
            onClick={signOut}
            disabled={signingOut}
            className="account-logout-button"
          >
            <LogOut size={17} />
            {signingOut ? 'جارٍ تسجيل الخروج...' : 'تسجيل الخروج'}
          </button>
        </footer>
      </div>

      <style jsx>{`
        .account-page {
          --account-blue: #2455c4;
          --account-navy: #17233d;
          --account-muted: #697791;
          min-height: 70vh;
          padding: 34px 16px 56px;
          background: #f7f9fd;
          color: var(--account-navy);
        }

        .account-container {
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
        }

        .account-welcome {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 30px 32px;
          border-radius: 24px;
          background: linear-gradient(
            120deg,
            #2455c4 0%,
            #1b429e 100%
          );
          color: #fff;
          box-shadow: 0 14px 34px #2455c426;
        }

        .account-welcome-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 66px;
          width: 66px;
          height: 66px;
          border: 1px solid #ffffff45;
          border-radius: 20px;
          background: #ffffff1c;
          color: #fff;
        }

        .account-welcome-copy {
          min-width: 0;
        }

        .account-welcome-label {
          display: inline-block;
          margin-bottom: 5px;
          color: #e1eaff;
          font-size: 12px;
          font-weight: 800;
        }

        .account-welcome h1 {
          margin: 0;
          color: #fff;
          font-size: clamp(25px, 4vw, 32px);
          font-weight: 900;
          line-height: 1.45;
        }

        .account-welcome p {
          margin: 5px 0 0;
          color: #fff;
          font-size: 14px;
          line-height: 1.8;
        }

        .account-dashboard {
          padding: 32px 0 12px;
        }

        .account-section-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .account-heading-mark {
          width: 5px;
          height: 42px;
          border-radius: 8px;
          background: #2455c4;
        }

        .account-section-heading h2 {
          margin: 0;
          color: #17233d;
          font-size: 21px;
          font-weight: 900;
        }

        .account-section-heading p {
          margin: 4px 0 0;
          color: #697791;
          font-size: 13px;
        }

        .account-cards {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .account-action-card {
          display: flex;
          min-width: 0;
          min-height: 205px;
          flex-direction: column;
          align-items: center;
          padding: 22px 13px 17px;
          border: 1px solid #e6ebf4;
          border-radius: 20px;
          background: #fff;
          color: #17233d;
          text-align: center;
          font-family: inherit;
          cursor: pointer;
          box-shadow: 0 5px 18px #17233d08;
          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            border-color 0.18s ease;
        }

        .account-action-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 26px #17233d12;
          border-color: #cbd8f2;
        }

        .account-action-card:focus-visible,
        .account-profile-toggle:focus-visible,
        .account-save-button:focus-visible,
        .account-logout-button:focus-visible,
        .account-footer-link:focus-visible {
          outline: 3px solid #2455c455;
          outline-offset: 3px;
        }

        .account-action-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          margin-bottom: 15px;
          border-radius: 18px;
        }

        .account-tone-blue .account-action-icon {
          background: #eaf1ff;
          color: #2455c4;
        }

        .account-tone-gold .account-action-icon {
          background: #fff1df;
          color: #b97918;
        }

        .account-tone-green .account-action-icon {
          background: #e5f7ef;
          color: #21845b;
        }

        .account-tone-purple .account-action-icon {
          background: #f2eaff;
          color: #7c45ba;
        }

        .account-action-title {
          font-size: 15px;
          font-weight: 900;
          line-height: 1.7;
        }

        .account-action-description {
          margin-top: 5px;
          color: #697791;
          font-size: 11px;
          line-height: 1.8;
        }

        .account-action-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: auto;
          padding-top: 13px;
          color: #2455c4;
          font-size: 11px;
          font-weight: 800;
        }

        .account-notice {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          margin: 14px 0;
          padding: 13px 15px;
          border-radius: 13px;
          font-size: 13px;
          line-height: 1.8;
        }

        .account-notice-error {
          border: 1px solid #f3cccc;
          background: #fff5f5;
          color: #a72d35;
        }

        .account-notice-success {
          border: 1px solid #ccebd8;
          background: #f1fbf5;
          color: #176c40;
        }

        .account-profile-panel {
          margin-top: 24px;
          overflow: hidden;
          border: 1px solid #e4ebf4;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 6px 20px #17233d08;
          scroll-margin-top: 20px;
        }

        .account-profile-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          padding: 20px 22px;
          border: 0;
          background: #fff;
          color: #2455c4;
          font-family: inherit;
          text-align: right;
          cursor: pointer;
        }

        .account-profile-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .account-profile-title > span {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .account-profile-title strong {
          color: #17233d;
          font-size: 16px;
        }

        .account-profile-title small {
          color: #697791;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.8;
        }

        .account-profile-content {
          padding: 0 22px 24px;
          border-top: 1px solid #edf0f5;
        }

        .account-profile-form {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          padding-top: 22px;
        }

        .account-field {
          min-width: 0;
        }

        .account-field label {
          display: block;
          margin-bottom: 8px;
          color: #303d56;
          font-size: 13px;
          font-weight: 800;
        }

        .account-field label span {
          color: #8994a8;
          font-size: 11px;
          font-weight: 500;
        }

        .account-field-control {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          min-height: 49px;
          padding: 0 13px;
          border: 1px solid #e4ebf4;
          border-radius: 12px;
          background: #fbfcfe;
          color: #8290a8;
        }

        .account-field-control:focus-within {
          border-color: #2455c4;
          background: #fff;
          box-shadow: 0 0 0 3px #2455c414;
        }

        .account-field-control svg {
          flex-shrink: 0;
        }

        .account-field-control input {
          width: 100%;
          min-width: 0;
          height: 46px;
          padding: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #17233d;
          font-family: inherit;
          font-size: 13px;
        }

        .account-field-control input::placeholder {
          color: #a0a9b8;
        }

        .account-save-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          grid-column: 1 / -1;
          min-height: 49px;
          padding: 12px 18px;
          border: 0;
          border-radius: 12px;
          background: #2455c4;
          color: #fff;
          font-family: inherit;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
        }

        .account-save-button:hover:not(:disabled) {
          background: #1b429e;
        }

        .account-save-button:disabled,
        .account-logout-button:disabled {
          cursor: not-allowed;
          opacity: 0.65;
        }

        .account-footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 13px;
          margin-top: 26px;
          padding-top: 20px;
          border-top: 1px solid #e4ebf4;
        }

        .account-footer-link,
        .account-logout-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 42px;
          padding: 10px 14px;
          border-radius: 11px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
        }

        .account-footer-link {
          border: 1px solid #dce5f5;
          background: #fff;
          color: #2455c4;
        }

        .account-logout-button {
          border: 1px solid #e4ebf4;
          background: transparent;
          color: #697791;
          cursor: pointer;
        }

        .account-logout-button:hover:not(:disabled) {
          border-color: #f0caca;
          background: #fff5f5;
          color: #a72d35;
        }

        @media (max-width: 850px) {
          .account-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 520px) {
          .account-page {
            padding: 20px 12px 36px;
          }

          .account-welcome {
            align-items: flex-start;
            gap: 13px;
            padding: 23px 18px;
            border-radius: 19px;
          }

          .account-welcome-icon {
            flex: 0 0 50px;
            width: 50px;
            height: 50px;
            border-radius: 15px;
          }

          .account-welcome h1 {
            font-size: 25px;
          }

          .account-welcome p {
            font-size: 12px;
          }

          .account-dashboard {
            padding-top: 26px;
          }

          .account-cards {
            gap: 11px;
          }

          .account-action-card {
            min-height: 190px;
            padding: 18px 9px 14px;
            border-radius: 16px;
          }

          .account-action-icon {
            width: 52px;
            height: 52px;
            margin-bottom: 11px;
            border-radius: 15px;
          }

          .account-action-title {
            font-size: 13px;
          }

          .account-action-description {
            font-size: 10px;
          }

          .account-profile-toggle {
            padding: 17px 14px;
          }

          .account-profile-content {
            padding: 0 14px 18px;
          }

          .account-profile-form {
            grid-template-columns: minmax(0, 1fr);
            gap: 15px;
          }

          .account-footer {
            align-items: stretch;
            flex-direction: column;
          }

          .account-footer-link,
          .account-logout-button {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .account-action-card {
            transition: none;
          }
        }
      `}</style>
    </main>
  )
}
