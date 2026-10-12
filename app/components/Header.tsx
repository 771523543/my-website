
'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  Menu,
  MessageCircle,
  Search,
  Sparkles,
  UserRound,
  UserRoundPlus,
  LogIn,
  X,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const whatsapp = 'https://wa.me/967776280186'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const isServicesPage = pathname.startsWith('/services')

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        setIsLoggedIn(Boolean(data.session))
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session))
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const handleSearch = () => {
    closeMenu()
    router.push('/search')
  }

  const homeLink = isServicesPage ? '/' : '#top'

  return (
    <>
      <div className="announcement">
        <Sparkles size={15} />
        خصم خاص على خدمات منصة هديل لفترة محدودة
        <ArrowLeft size={15} />
      </div>

      <header className="site-header">
        <div className="container nav-wrap">
          <a
            className="brand"
            href={homeLink}
            onClick={closeMenu}
          >
            <Image
              className="brand-logo"
              src="/hadeel-platform-logo.png"
              alt="شعار منصة هديل للخدمات الطلابية"
              width={54}
              height={54}
              priority
            />

            <span>
              منصة هديل
              <span className="brand-dot">.</span>
            </span>
          </a>

          <nav
            className={
              menuOpen
                ? 'nav-links mobile-open'
                : 'nav-links'
            }
          >
            <a href={homeLink} onClick={closeMenu}>
              الرئيسية
            </a>

            <a
              href={isServicesPage ? '/#story' : '#story'}
              onClick={closeMenu}
            >
              قصتنا
            </a>

            <a
              href={isServicesPage ? '/#services' : '#services'}
              onClick={closeMenu}
            >
              خدماتنا
            </a>

            <a
              href={
                isServicesPage
                  ? '/#gpa-calculator'
                  : '#gpa-calculator'
              }
              onClick={closeMenu}
            >
              حاسبة المعدل
            </a>

            <a
              href={
                isServicesPage
                  ? '/#testimonials'
                  : '#testimonials'
              }
              onClick={closeMenu}
            >
              آراء العملاء
            </a>

            <a
              href={isServicesPage ? '/#faq' : '#faq'}
              onClick={closeMenu}
            >
              الأسئلة الشائعة
            </a>

            <a
              href={isServicesPage ? '/#contact' : '#contact'}
              onClick={closeMenu}
            >
              اتصل بنا
            </a>

            {isLoggedIn ? (
              <a
                href="/account"
                onClick={closeMenu}
                aria-label="الانتقال إلى حساب الطالب"
              >
                <UserRound
                  size={17}
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    marginLeft: '6px',
                  }}
                />
                حسابي
              </a>
            ) : (
              <>
                <a
                  href="/auth/login"
                  onClick={closeMenu}
                  aria-label="تسجيل الدخول إلى منصة هديل"
                >
                  <LogIn
                    size={17}
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginLeft: '6px',
                    }}
                  />
                  تسجيل الدخول
                </a>

                <a
                  href="/auth/register"
                  onClick={closeMenu}
                  aria-label="إنشاء حساب طالب جديد"
                >
                  <UserRoundPlus
                    size={17}
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      marginLeft: '6px',
                    }}
                  />
                  إنشاء حساب
                </a>
              </>
            )}
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="header-search-toggle"
              aria-label="فتح صفحة البحث"
              onClick={handleSearch}
            >
              <Search size={19} />
            </button>

            <a
              className="primary-button header-order"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} />
              اطلب خدمتك الآن
            </a>

            <button
              type="button"
              className="menu-button"
              aria-label={
                menuOpen
                  ? 'إغلاق القائمة'
                  : 'فتح القائمة'
              }
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen((current) => !current)
              }}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
