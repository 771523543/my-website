'use client'

import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  GraduationCap,
  LogIn,
  MessageCircle,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const whatsapp = 'https://wa.me/967776280186'

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

  useEffect(() => {
    let active = true

    // قراءة حالة تسجيل الدخول الفعلية من Supabase
    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return

      setIsLoggedIn(!error && Boolean(data.session))
    })

    // تحديث الأزرار عند تسجيل الدخول أو الخروج
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) {
        setIsLoggedIn(Boolean(session))
      }
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  return (
    <section id="top" className="hero container">
      <div className="hero-copy">
        <div className="hero-badge">
          <span className="hero-badge-icon">
            <GraduationCap size={17} />
          </span>

          <span>شريكك في النجاح الأكاديمي</span>

          <Sparkles
            size={14}
            className="hero-badge-sparkle"
          />
        </div>

        <h1>
          نرتب لك طريقك
          <br />
          <strong>نحو النجاح الأكاديمي</strong>
        </h1>

        <p className="hero-description">
          منصة هديل للخدمات الطلابية والأكاديمية،
          نقدم لك حلولًا احترافية تساعدك على إنجاز
          متطلباتك الدراسية بثقة وجودة عالية.
        </p>

        {/* أزرار الحساب: تتغير حسب حالة تسجيل الدخول */}
        <div
          className="hero-account-actions"
          aria-label="خيارات حساب الطالب"
        >
          {isLoggedIn === null ? (
            // مساحة مؤقتة حتى يتم التحقق من الجلسة
            <div
              className="hero-account-placeholder"
              aria-hidden="true"
            />
          ) : isLoggedIn ? (
            <a
              href="/account"
              className="hero-account-button hero-account-button--register"
            >
              <UserRound size={19} aria-hidden="true" />
              <span>حسابي</span>
            </a>
          ) : (
            <>
              <a
                href="/auth/register"
                className="hero-account-button hero-account-button--register"
              >
                <UserRound size={19} aria-hidden="true" />
                <span>إنشاء حساب جديد</span>
              </a>

              <a
                href="/auth/login"
                className="hero-account-button hero-account-button--login"
              >
                <LogIn size={19} aria-hidden="true" />
                <span>تسجيل الدخول</span>
              </a>
            </>
          )}
        </div>

        {/* أزرار الخدمات الأصلية دون تغيير */}
        <div className="hero-buttons">
          <a
            className="primary-button"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            اطلب خدمتك الآن
            <MessageCircle size={18} />
          </a>

          <a
            className="text-button"
            href="#services"
          >
            استكشف خدماتنا
            <ArrowLeft size={18} />
          </a>
        </div>
      </div>

      {/* صورة العرض الأصلية دون تغيير */}
      <div className="hero-art hero-photo">
        <img
          src="/images/hadeel-main-hero.jpeg"
          alt="منصة هديل للخدمات الطلابية والأكاديمية"
        />
      </div>

      {/* التنسيق داخل هذا الملف فقط */}
      <style jsx>{`
        .hero-account-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin: 22px 0 16px;
        }

        .hero-account-placeholder {
          min-height: 48px;
          width: 1px;
        }

        .hero-account-button {
          min-height: 48px;
          padding: 0 20px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 800;
          line-height: 1.4;
          text-decoration: none;
          box-sizing: border-box;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease;
        }

        .hero-account-button:hover {
          transform: translateY(-2px);
        }

        .hero-account-button--register {
          color: #ffffff;
          background: #2455c4;
          border: 1px solid #2455c4;
          box-shadow: 0 8px 20px #2455c426;
        }

        .hero-account-button--register:hover {
          background: #1c46a8;
          box-shadow: 0 10px 24px #2455c433;
        }

        .hero-account-button--login {
          color: #2455c4;
          background: #ffffff;
          border: 1px solid #cbd8f1;
        }

        .hero-account-button--login:hover {
          background: #f3f7ff;
          border-color: #2455c4;
        }

        @media (max-width: 640px) {
          .hero-account-actions {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
            width: 100%;
            margin-top: 20px;
          }

          .hero-account-button {
            width: 100%;
            min-height: 47px;
          }
        }
      `}</style>
    </section>
  )
}