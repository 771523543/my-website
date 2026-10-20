
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ShieldCheck,
  ClipboardList,
  MessageCircle,
  FolderOpen,
  GraduationCap,
  UsersRound,
  Settings2,
  ArrowLeft,
  LogOut,
  LoaderCircle,
  LockKeyhole,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const sections = [
  {
    title: 'إدارة الطلبات',
    description:
      'تابع طلبات الطلاب، وحدّث حالاتها، وراجع الملفات المرفقة.',
    href: '/admin',
    icon: ClipboardList,
    theme: 'blue',
  },
  {
    title: 'إدارة محادثات الطلاب',
    description:
      'تابع محادثات الطلاب وانتقل إلى لوحة إدارة المحادثات.',
    href: '/admin/chat',
    icon: MessageCircle,
    theme: 'green',
  },
  {
    title: 'إدارة الأعمال السابقة',
    description:
      'أضف نماذج الأعمال، وصنّفها حسب الخدمة، وتحكّم في نشرها.',
    href: '/admin/previous-works',
    icon: FolderOpen,
    theme: 'purple',
  },
  {
    title: 'إدارة الجامعات',
    description:
      'أضف الجامعات وحدّث بياناتها وشعاراتها وروابط بوابات الطلاب، وأدر الكليات والتخصصات والملفات.',
    href: '/admin/universities',
    icon: GraduationCap,
    theme: 'orange',
  },
  {
    title: 'إدارة الحسابات',
    description:
      'مساحة مستقبلية لتنظيم حسابات المستخدمين وصلاحياتهم.',
    href: '',
    icon: UsersRound,
    theme: 'pink',
  },
  {
    title: 'إعدادات المنصة',
    description:
      'قسم مستقبلي لإدارة الإعدادات العامة لمنصة هديل.',
    href: '',
    icon: Settings2,
    theme: 'slate',
  },
]

export default function AdminCenterPage() {
  const router = useRouter()

  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function verifyAdmin() {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (!active) return

        if (authError || !user) {
          router.replace(
            '/auth/login?next=%2Fadmin%2Fcenter'
          )
          return
        }

        const { data, error: roleError } =
          await supabase.rpc('is_hadeel_admin')

        if (!active) return

        if (roleError) {
          setError(
            'تعذر التحقق من صلاحيات الإدارة. حاول مرة أخرى.'
          )
          setChecking(false)
          return
        }

        if (data !== true) {
          setAllowed(false)
          setChecking(false)
          return
        }

        setAllowed(true)
        setChecking(false)
      } catch {
        if (!active) return

        setError('حدث خطأ أثناء التحقق من الحساب.')
        setChecking(false)
      }
    }

    void verifyAdmin()

    return () => {
      active = false
    }
  }, [router])

  async function handleLogout() {
    const { error: logoutError } =
      await supabase.auth.signOut()

    if (logoutError) {
      setError('تعذر تسجيل الخروج. حاول مرة أخرى.')
      return
    }

    router.replace('/auth/login')
    router.refresh()
  }

  if (checking) {
    return (
      <main dir="rtl" className="hac-page">
        <div className="hac-state">
          <LoaderCircle
            size={32}
            className="hac-spin"
          />
          <p>جارٍ التحقق من صلاحيات الإدارة...</p>
        </div>

        <style jsx>{styles}</style>
      </main>
    )
  }

  if (!allowed) {
    return (
      <main dir="rtl" className="hac-page">
        <section className="hac-denied">
          <span className="hac-denied-icon">
            <LockKeyhole size={32} />
          </span>

          <h1>مركز إدارة هديل</h1>

          <p>
            {error ||
              'هذه الصفحة مخصصة لحسابات الإدارة المصرح لها فقط.'}
          </p>

          <button
            type="button"
            className="hac-primary"
            onClick={() => router.replace('/account')}
          >
            العودة إلى حسابي
            <ArrowLeft size={17} />
          </button>
        </section>

        <style jsx>{styles}</style>
      </main>
    )
  }

  return (
    <main dir="rtl" className="hac-page">
      <div className="hac-container">
        <header className="hac-header">
          <div className="hac-brand">
            <span className="hac-brand-icon">
              <ShieldCheck size={28} />
            </span>

            <div className="hac-brand-info">
              <span className="hac-eyebrow">
                منصة هديل
              </span>

              <h1>مركز الإدارة</h1>

              <p>
                جميع أدوات الإدارة في مكان واحد.
              </p>
            </div>
          </div>

          <div className="hac-header-actions">
            <button
              type="button"
              className="hac-secondary"
              onClick={() => router.push('/account')}
            >
              حسابي
              <ArrowLeft size={16} />
            </button>

            <button
              type="button"
              className="hac-logout"
              onClick={() => void handleLogout()}
            >
              <LogOut size={16} />
              خروج
            </button>
          </div>
        </header>

        {error && (
          <div className="hac-error" role="alert">
            {error}
          </div>
        )}

        <section className="hac-welcome">
          <span className="hac-welcome-icon">
            <ShieldCheck size={25} />
          </span>

          <div>
            <h2>أهلًا بك في إدارة منصة هديل</h2>

            <p>
              اختر القسم الذي تريد إدارته.
              يمكنك إضافة أقسام إدارية جديدة مستقبلًا
              دون تغيير الصفحات الحالية.
            </p>
          </div>
        </section>

        <section className="hac-section">
          <div className="hac-section-heading">
            <div>
              <h2>أقسام الإدارة</h2>
              <p>
                اختر البطاقة المناسبة للانتقال إلى القسم.
              </p>
            </div>

            <span className="hac-count">
              {sections.filter(
                (section) => Boolean(section.href)
              ).length}{' '}
              أقسام متاحة
            </span>
          </div>

          <div className="hac-grid">
            {sections.map((section) => {
              const Icon = section.icon
              const disabled = !section.href

              return (
                <article
                  key={section.title}
                  className={[
                    'hac-card',
                    `hac-${section.theme}`,
                    disabled ? 'hac-card-disabled' : '',
                  ].join(' ')}
                >
                  <div className="hac-card-top">
                    <span className="hac-card-icon">
                      <Icon
                        size={26}
                        strokeWidth={2}
                      />
                    </span>

                    <span
                      className={[
                        'hac-status',
                        disabled
                          ? 'hac-status-soon'
                          : 'hac-status-live',
                      ].join(' ')}
                    >
                      {disabled
                        ? 'قريبًا'
                        : 'متاح الآن'}
                    </span>
                  </div>

                  <h3>{section.title}</h3>

                  <p>{section.description}</p>

                  <div className="hac-card-bottom">
                    {disabled ? (
                      <span className="hac-disabled-label">
                        سيضاف لاحقًا
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          router.push(section.href)
                        }
                      >
                        فتح القسم
                        <ArrowLeft size={17} />
                      </button>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <footer className="hac-footer">
          <ShieldCheck size={17} />

          <span>
            مركز الإدارة محمي ويتطلب حسابًا إداريًا معتمدًا.
          </span>
        </footer>
      </div>

      <style jsx>{styles}</style>
    </main>
  )
}

const styles = `
  .hac-page {
    min-height: 100vh;
    padding: 28px 16px 56px;
    background: linear-gradient(
      180deg,
      #f5f8ff 0%,
      #fbfcff 45%,
      #f7f8fc 100%
    );
    color: #17233d;
  }

  .hac-container {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
  }

  .hac-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 26px;
  }

  .hac-brand {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }

  .hac-brand-icon {
    display: grid;
    place-items: center;
    flex: 0 0 56px;
    width: 56px;
    height: 56px;
    border-radius: 18px;
    color: white;
    background: linear-gradient(
      140deg,
      #2459a9,
      #5938a8
    );
    box-shadow: 0 9px 24px #294d9726;
  }

  .hac-eyebrow {
    color: #63718a;
    font-size: 13px;
    font-weight: 700;
  }

  .hac-brand h1 {
    margin: 3px 0 5px;
    font-size: clamp(24px, 3vw, 34px);
    line-height: 1.4;
  }

  .hac-brand p {
    margin: 0;
    color: #6b778c;
    font-size: 14px;
    line-height: 1.8;
  }

  .hac-header-actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }

  .hac-header-actions button,
  .hac-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 0;
    border-radius: 12px;
    padding: 11px 14px;
    font: inherit;
    font-size: 13px;
    font-weight: 750;
    cursor: pointer;
  }

  .hac-secondary {
    background: white;
    color: #35445d;
    border: 1px solid #e1e7f1 !important;
  }

  .hac-logout {
    background: #fff0f0;
    color: #b83c48;
  }

  .hac-welcome {
    display: flex;
    align-items: flex-start;
    gap: 13px;
    margin-bottom: 28px;
    padding: 20px;
    border: 1px solid #dce7fa;
    border-radius: 20px;
    background: linear-gradient(
      115deg,
      #edf4ff,
      #f7f3ff
    );
  }

  .hac-welcome-icon {
    display: grid;
    place-items: center;
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    border-radius: 14px;
    background: white;
    color: #365eaf;
  }

  .hac-welcome h2 {
    margin: 0 0 5px;
    font-size: 18px;
    line-height: 1.6;
  }

  .hac-welcome p {
    margin: 0;
    color: #65738a;
    font-size: 14px;
    line-height: 1.9;
  }

  .hac-section-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  .hac-section-heading h2 {
    margin: 0 0 5px;
    font-size: 22px;
  }

  .hac-section-heading p {
    margin: 0;
    color: #77839a;
    font-size: 13px;
    line-height: 1.8;
  }

  .hac-count {
    white-space: nowrap;
    padding: 7px 11px;
    border-radius: 999px;
    background: #eaf0fc;
    color: #365eaf;
    font-size: 12px;
    font-weight: 800;
  }

  .hac-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .hac-card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    min-height: 230px;
    padding: 20px;
    border: 1px solid #e5eaf3;
    border-radius: 20px;
    background: white;
    box-shadow: 0 8px 26px #1e335208;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;
  }

  .hac-card:not(.hac-card-disabled):hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 30px #1e335212;
  }

  .hac-card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }

  .hac-card-icon {
    display: grid;
    place-items: center;
    width: 54px;
    height: 54px;
    flex: 0 0 54px;
    border-radius: 17px;
  }

  .hac-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: 999px;
    padding: 6px 9px;
    font-size: 11px;
    font-weight: 800;
  }

  .hac-status-live {
    color: #14794d;
    background: #e8f8ef;
  }

  .hac-status-soon {
    color: #737e91;
    background: #f0f2f6;
  }

  .hac-card h3 {
    margin: 18px 0 7px;
    font-size: 18px;
    line-height: 1.6;
  }

  .hac-card > p {
    margin: 0;
    color: #6b778c;
    font-size: 13px;
    line-height: 1.9;
    overflow-wrap: anywhere;
  }

  .hac-card-bottom {
    margin-top: auto;
    padding-top: 18px;
  }

  .hac-card-bottom button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 11px 14px;
    border: 0;
    border-radius: 12px;
    color: white;
    background: var(--hac-accent);
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
    transition: filter 0.2s ease;
  }

  .hac-card-bottom button:hover {
    filter: brightness(0.94);
  }

  .hac-disabled-label {
    display: block;
    width: 100%;
    padding: 10px 14px;
    border-radius: 12px;
    background: #f4f5f8;
    color: #929bad;
    text-align: center;
    font-size: 13px;
    font-weight: 700;
  }

  .hac-blue {
    --hac-accent: #2865bd;
  }

  .hac-blue .hac-card-icon {
    background: #eaf2ff;
    color: #2865bd;
  }

  .hac-green {
    --hac-accent: #12845c;
  }

  .hac-green .hac-card-icon {
    background: #e5f8ef;
    color: #12845c;
  }

  .hac-purple {
    --hac-accent: #7546bd;
  }

  .hac-purple .hac-card-icon {
    background: #f1eaff;
    color: #7546bd;
  }

  .hac-orange {
    --hac-accent: #bd6a20;
  }

  .hac-orange .hac-card-icon {
    background: #fff0df;
    color: #bd6a20;
  }

  .hac-pink {
    --hac-accent: #bf4f83;
  }

  .hac-pink .hac-card-icon {
    background: #ffeaf3;
    color: #bf4f83;
  }

  .hac-slate {
    --hac-accent: #53627a;
  }

  .hac-slate .hac-card-icon {
    background: #edf0f5;
    color: #53627a;
  }

  .hac-card-disabled {
    background: #fcfcfe;
    border-style: dashed;
    box-shadow: none;
  }

  .hac-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 25px;
    color: #7b8799;
    font-size: 12px;
    line-height: 1.8;
    text-align: center;
  }

  .hac-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 55vh;
    gap: 12px;
    color: #6b778c;
  }

  .hac-spin {
    animation: hac-spin 1s linear infinite;
  }

  @keyframes hac-spin {
    to {
      transform: rotate(360deg);
    }
  }

  .hac-denied {
    width: 100%;
    max-width: 460px;
    margin: 8vh auto;
    padding: 30px 22px;
    border: 1px solid #e2e8f2;
    border-radius: 22px;
    background: white;
    text-align: center;
    box-shadow: 0 12px 34px #1c2e4d0a;
  }

  .hac-denied-icon {
    display: inline-grid;
    place-items: center;
    width: 66px;
    height: 66px;
    border-radius: 20px;
    color: #5367b2;
    background: #edf0ff;
  }

  .hac-denied h1 {
    margin: 16px 0 8px;
    font-size: 25px;
  }

  .hac-denied p {
    color: #6b778c;
    line-height: 1.9;
    overflow-wrap: anywhere;
  }

  .hac-primary {
    margin-top: 8px;
    color: white;
    background: #2459a9;
  }

  .hac-error {
    margin-bottom: 18px;
    padding: 13px 15px;
    border: 1px solid #f4cccc;
    border-radius: 12px;
    background: #fff3f3;
    color: #a52c39;
    font-size: 14px;
    line-height: 1.8;
  }

  @media (max-width: 850px) {
    .hac-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 600px) {
    .hac-page {
      padding: 20px 12px 38px;
    }

    .hac-header {
      align-items: stretch;
      flex-direction: column;
    }

    .hac-header-actions {
      width: 100%;
    }

    .hac-header-actions button {
      flex: 1;
    }

    .hac-brand {
      align-items: flex-start;
    }

    .hac-brand-icon {
      flex-basis: 48px;
      width: 48px;
      height: 48px;
      border-radius: 15px;
    }

    .hac-welcome {
      padding: 15px;
    }

    .hac-section-heading {
      align-items: flex-start;
      flex-direction: column;
    }

    .hac-grid {
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
    }

    .hac-card {
      min-height: 205px;
      padding: 17px;
    }

    .hac-card h3 {
      margin-top: 14px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hac-card,
    .hac-card-bottom button {
      transition: none;
    }

    .hac-spin {
      animation-duration: 2s;
    }
  }
`
