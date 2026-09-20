'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  Headphones,
  HeartHandshake,
} from 'lucide-react'

export default function Achievements() {
  const [achievementIndex, setAchievementIndex] =
    useState(0)

  const [achievementPaused, setAchievementPaused] =
    useState(false)

  const [countValues, setCountValues] = useState({
    completed: 0,
    satisfaction: 0,
    experience: 0,
  })

  const countStarted = useRef(false)

  const achievementImages = [
    '/images/hadeel-achievements.png',
    '/images/hadeel-achievement-test.jpg',
  ]

  /* =========================================
     تشغيل عداد الإنجازات
     ========================================= */

  useEffect(() => {
    const section =
      document.querySelector<HTMLElement>(
        '[data-count-achievements]'
      )

    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (
          !entry.isIntersecting ||
          countStarted.current
        ) {
          return
        }

        countStarted.current = true

        const targets = {
          completed: 1200,
          satisfaction: 98,
          experience: 8,
        }

        const duration = 1800
        const startTime = performance.now()

        const animate = (
          currentTime: number
        ) => {
          const elapsed =
            currentTime - startTime

          const progress = Math.min(
            elapsed / duration,
            1
          )

          const easedProgress =
            1 - Math.pow(1 - progress, 3)

          setCountValues({
            completed: Math.round(
              targets.completed *
                easedProgress
            ),

            satisfaction: Math.round(
              targets.satisfaction *
                easedProgress
            ),

            experience: Math.round(
              targets.experience *
                easedProgress
            ),
          })

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)

        observer.unobserve(section)
      },
      {
        threshold: 0.25,
      }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])


  /* =========================================
     تشغيل سلايدر الإنجازات
     ========================================= */

  useEffect(() => {
    if (achievementPaused) return

    const timer = window.setInterval(() => {
      setAchievementIndex(
        (current) =>
          (current + 1) %
          achievementImages.length
      )
    }, 3000)

    return () =>
      window.clearInterval(timer)
  }, [
    achievementPaused,
    achievementImages.length,
  ])


  /* =========================================
     تنسيق عدد الخدمات
     ========================================= */

  const formatCompleted = () => {
    return `+${countValues.completed.toLocaleString(
      'en-US'
    )}`
  }


  return (
    <>
      <section
        className="achievements-3d-section"
        data-count-achievements
      >

        <div className="achievements-3d-panel">

          {/* =====================================
              عنوان القسم
             ===================================== */}

          <div className="achievements-heading">

            <span className="section-kicker">
              إنجازاتنا بالأرقام
            </span>

            <h2>
              نتائج تُثبت
              <br />
              <em>ثقة طلابنا</em>
            </h2>

            <p>
              نفخر بكل طالب ساعدناه على تحويل
              التحديات الأكاديمية إلى إنجازات واضحة
              ونتائج ملموسة.
            </p>

          </div>


          {/* =====================================
              الإحصائيات
             ===================================== */}

          <div className="achievement-stats-3d">

            {/* ================================
                خدمة منجزة
               ================================= */}

            <article className="achievement-card achievement-completed">

              <div className="achievement-icon">

                <CheckCircle2
                  size={52}
                  strokeWidth={1.8}
                />

              </div>

              <strong>
                {formatCompleted()}
              </strong>

              <span>
                خدمة منجزة
              </span>

            </article>


            {/* ================================
                رضا العملاء
               ================================= */}

            <article className="achievement-card achievement-satisfaction">

              <div className="achievement-icon">

                <HeartHandshake
                  size={52}
                  strokeWidth={1.8}
                />

              </div>

              <strong>
                {countValues.satisfaction}%
              </strong>

              <span>
                رضا العملاء
              </span>

            </article>


            {/* ================================
                سنوات الخبرة
               ================================= */}

            <article className="achievement-card achievement-experience">

              <div className="achievement-icon">

                <Clock3
                  size={52}
                  strokeWidth={1.8}
                />

              </div>

              <strong>
                +{countValues.experience}
              </strong>

              <span>
                سنوات خبرة
              </span>

            </article>


            {/* ================================
                الدعم والمتابعة
               ================================= */}

            <article className="achievement-card achievement-support">

              <div className="achievement-icon">

                <Headphones
                  size={52}
                  strokeWidth={1.8}
                />

              </div>

              <strong>
                24/7
              </strong>

              <span>
                دعم ومتابعة
              </span>

            </article>

          </div>


          {/* =====================================
              معرض الإنجازات
             ===================================== */}

          <div
            className="achievements-image-3d"
            onMouseEnter={() =>
              setAchievementPaused(true)
            }
            onMouseLeave={() =>
              setAchievementPaused(false)
            }
          >

            <div
              className="achievement-slides-3d"
              aria-live="polite"
            >

              <Image
                key={
                  achievementImages[
                    achievementIndex
                  ]
                }
                className="achievement-slide-3d"
                src={
                  achievementImages[
                    achievementIndex
                  ]
                }
                alt={`نموذج إنجاز أكاديمي ${
                  achievementIndex + 1
                }`}
                fill
                sizes="(max-width: 800px) 100vw, 45vw"
              />

            </div>


            {/* السهم التالي */}

            <button
              type="button"
              className="achievement-arrow-3d achievement-next-3d"
              onClick={() =>
                setAchievementIndex(
                  (achievementIndex + 1) %
                    achievementImages.length
                )
              }
              aria-label="الصورة التالية"
            >
              <ChevronRight size={20} />
            </button>


            {/* السهم السابق */}

            <button
              type="button"
              className="achievement-arrow-3d achievement-prev-3d"
              onClick={() =>
                setAchievementIndex(
                  (achievementIndex -
                    1 +
                    achievementImages.length) %
                    achievementImages.length
                )
              }
              aria-label="الصورة السابقة"
            >
              <ChevronRight
                size={20}
                style={{
                  transform:
                    'rotate(180deg)',
                }}
              />
            </button>


            {/* النقاط */}

            <div className="achievement-dots-3d">

              {achievementImages.map(
                (image, index) => (
                  <button
                    type="button"
                    key={image}
                    className={
                      index ===
                      achievementIndex
                        ? 'active'
                        : ''
                    }
                    onClick={() =>
                      setAchievementIndex(index)
                    }
                    aria-label={`عرض الصورة ${
                      index + 1
                    }`}
                  />
                )
              )}

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          التصميم بالكامل داخل الملف
          لا يحتاج إلى تعديل globals.css
         ================================================= */}

      <style jsx>{`

        /* =========================================
           القسم الرئيسي
           ========================================= */

        .achievements-3d-section {
          width: 100%;

          padding: 32px 16px;

          margin: 20px 0;

          direction: rtl;
        }


        /* =========================================
           اللوحة الرئيسية
           ========================================= */

        .achievements-3d-panel {
          position: relative;

          max-width: 1100px;

          margin: 0 auto;

          padding: 38px;

          background:
            linear-gradient(
              145deg,
              #173f91 0%,
              #2455c4 48%,
              #163878 100%
            );

          border: 2px solid #d5aa54;

          border-radius: 32px;

          overflow: hidden;

          box-shadow:

            0 24px 60px
              rgba(23,35,61,0.28),

            0 0 0 7px
              rgba(213,170,84,0.07),

            inset 0 1px 0
              rgba(255,255,255,0.20),

            inset 0 -3px 0
              rgba(0,0,0,0.18);
        }


        /* =========================================
           اللمعة الرئيسية
           ========================================= */

        .achievements-3d-panel::before {
          content: '';

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              125deg,
              rgba(255,255,255,0.15),
              transparent 28%,
              transparent 72%,
              rgba(255,255,255,0.04)
            );
        }


        /* =========================================
           إضاءة ناعمة
           ========================================= */

        .achievements-3d-panel::after {
          content: '';

          position: absolute;

          width: 420px;

          height: 420px;

          top: -280px;

          left: -150px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,0.13),
              transparent 70%
            );

          pointer-events: none;
        }


        /* =========================================
           العنوان
           ========================================= */

        .achievements-heading {
          position: relative;

          z-index: 2;

          max-width: 650px;

          margin: 0 auto 30px;

          text-align: center;
        }


        .achievements-heading
        .section-kicker {
          display: inline-block;

          margin-bottom: 10px;

          color: #e2bc68;

          font-size: 13px;

          font-weight: 900;

          letter-spacing: 0.2px;
        }


        .achievements-heading h2 {
          margin: 0;

          color: #ffffff;

          font-size:
            clamp(30px, 4vw, 46px);

          font-weight: 900;

          line-height: 1.2;

          text-shadow:
            0 4px 12px
              rgba(0,0,0,0.25);
        }


        .achievements-heading h2 em {
          color: #ffffff;

          font-style: normal;
        }


        .achievements-heading p {
          max-width: 600px;

          margin: 15px auto 0;

          color:
            rgba(255,255,255,0.88);

          font-size: 15px;

          font-weight: 500;

          line-height: 1.9;
        }


        /* =========================================
           شبكة الإحصائيات
           ========================================= */

        .achievement-stats-3d {
          position: relative;

          z-index: 2;

          display: grid;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 10px;

          margin-top: 25px;
        }


        /* =========================================
           بطاقة الإحصائية
           ========================================= */

        .achievement-card {
          position: relative;

          min-width: 0;

          min-height: 255px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding: 24px 14px;

          text-align: center;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.11),
              rgba(255,255,255,0.035)
            );

          border:
            1px solid
            rgba(255,255,255,0.18);

          border-radius: 22px;

          transition:
            transform 0.35s ease,
            background 0.35s ease,
            box-shadow 0.35s ease;
        }


        .achievement-card:hover {
          transform:
            translateY(-6px);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.16),
              rgba(255,255,255,0.05)
            );

          box-shadow:
            0 18px 35px
              rgba(0,0,0,0.15);
        }


        /* =========================================
           دائرة الأيقونة
           ========================================= */

        .achievement-icon {
          position: relative;

          width: 112px;

          height: 112px;

          display: grid;

          place-items: center;

          margin-bottom: 20px;

          color: #174fae;

          background:
            radial-gradient(
              circle at 32% 25%,
              #ffffff 0%,
              #edf4ff 25%,
              #d8e8ff 55%,
              #b8d0f3 78%,
              #8eaddd 100%
            );

          border:
            5px solid #d5aa54;

          border-radius: 50%;

          box-shadow:

            0 15px 28px
              rgba(0,0,0,0.25),

            inset 7px 7px 14px
              rgba(255,255,255,0.85),

            inset -9px -10px 17px
              rgba(36,85,196,0.22),

            0 0 0 7px
              rgba(213,170,84,0.10);

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }


        /* =========================================
           لمعة الدائرة
           ========================================= */

        .achievement-icon::before {
          content: '';

          position: absolute;

          top: 12px;

          left: 19px;

          width: 39px;

          height: 20px;

          border-radius: 50%;

          background:
            rgba(255,255,255,0.75);

          filter: blur(4px);

          transform:
            rotate(-25deg);
        }


        .achievement-icon svg {
          position: relative;

          z-index: 1;

          width: 55px;

          height: 55px;

          filter:
            drop-shadow(
              3px 5px 3px
              rgba(23,63,145,0.38)
            );
        }


        .achievement-card:hover
        .achievement-icon {
          transform:
            translateY(-7px)
            scale(1.06);

          box-shadow:

            0 22px 35px
              rgba(0,0,0,0.30),

            inset 7px 7px 14px
              rgba(255,255,255,0.9),

            inset -9px -10px 17px
              rgba(36,85,196,0.25),

            0 0 0 10px
              rgba(213,170,84,0.12);
        }


        /* =========================================
           الأرقام
           ========================================= */

        .achievement-card strong {
          display: block;

          margin: 0 0 8px;

          color: #ffffff;

          font-family:
            Georgia,
            'Times New Roman',
            serif;

          font-size:
            clamp(32px, 3vw, 45px);

          font-weight: 900;

          line-height: 1;

          letter-spacing: -1px;

          text-shadow:
            0 3px 8px
              rgba(0,0,0,0.28);
        }


        /* =========================================
           النص
           ========================================= */

        .achievement-card span {
          display: block;

          color: #ffffff;

          font-size: 14px;

          font-weight: 800;

          line-height: 1.7;

          text-align: center;

          text-shadow:
            0 2px 5px
              rgba(0,0,0,0.22);
        }


        /* =========================================
           معرض الصور
           ========================================= */

        .achievements-image-3d {
          position: relative;

          z-index: 2;

          width: 100%;

          max-width: 850px;

          height: 330px;

          margin: 30px auto 0;

          overflow: hidden;

          border-radius: 24px;

          border:
            2px solid
            rgba(213,170,84,0.85);

          background:
            rgba(255,255,255,0.08);

          box-shadow:

            0 20px 40px
              rgba(0,0,0,0.22),

            inset 0 1px 0
              rgba(255,255,255,0.20);
        }


        .achievement-slides-3d {
          position: absolute;

          inset: 0;
        }


        .achievement-slide-3d {
          object-fit: cover;

          transition:
            opacity 0.45s ease,
            transform 0.6s ease;
        }


        /* =========================================
           الأسهم
           ========================================= */

        .achievement-arrow-3d {
          position: absolute;

          top: 50%;

          z-index: 4;

          width: 46px;

          height: 46px;

          display: grid;

          place-items: center;

          padding: 0;

          color: #174fae;

          background:
            rgba(255,255,255,0.92);

          border:
            2px solid #d5aa54;

          border-radius: 50%;

          cursor: pointer;

          transform:
            translateY(-50%);

          box-shadow:
            0 8px 20px
              rgba(0,0,0,0.22);

          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }


        .achievement-arrow-3d:hover {
          background: #ffffff;

          transform:
            translateY(-50%)
            scale(1.08);
        }


        .achievement-next-3d {
          right: 18px;
        }


        .achievement-prev-3d {
          left: 18px;
        }


        /* =========================================
           نقاط السلايدر
           ========================================= */

        .achievement-dots-3d {
          position: absolute;

          z-index: 4;

          bottom: 15px;

          left: 50%;

          display: flex;

          align-items: center;

          gap: 7px;

          transform:
            translateX(-50%);
        }


        .achievement-dots-3d button {
          width: 9px;

          height: 9px;

          padding: 0;

          border: 0;

          border-radius: 50%;

          background:
            rgba(255,255,255,0.55);

          cursor: pointer;

          transition:
            width 0.25s ease,
            background 0.25s ease;
        }


        .achievement-dots-3d button.active {
          width: 25px;

          border-radius: 20px;

          background: #d5aa54;
        }


        /* =========================================
           الجوال
           ========================================= */

        @media (max-width: 800px) {

          .achievements-3d-section {
            padding: 20px 10px;
          }

          .achievements-3d-panel {
            padding: 24px 12px;

            border-radius: 24px;
          }

          .achievement-stats-3d {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            gap: 7px;
          }

          .achievement-card {
            min-height: 220px;

            padding: 20px 8px;

            border-radius: 17px;
          }

          .achievement-icon {
            width: 84px;

            height: 84px;

            border-width: 4px;

            margin-bottom: 14px;
          }

          .achievement-icon svg {
            width: 40px;

            height: 40px;
          }

          .achievement-card strong {
            font-size: 29px;
          }

          .achievement-card span {
            font-size: 11px;
          }

          .achievements-image-3d {
            height: 250px;

            margin-top: 20px;

            border-radius: 18px;
          }

          .achievement-arrow-3d {
            width: 40px;

            height: 40px;
          }

          .achievement-next-3d {
            right: 10px;
          }

          .achievement-prev-3d {
            left: 10px;
          }
        }


        /* =========================================
           الجوال الصغير
           ========================================= */

        @media (max-width: 380px) {

          .achievements-3d-panel {
            padding: 20px 8px;
          }

          .achievement-card {
            min-height: 195px;
          }

          .achievement-icon {
            width: 70px;

            height: 70px;
          }

          .achievement-icon svg {
            width: 33px;

            height: 33px;
          }

          .achievement-card strong {
            font-size: 25px;
          }

          .achievement-card span {
            font-size: 10px;
          }

          .achievements-image-3d {
            height: 210px;
          }
        }

      `}</style>
    </>
  )
}