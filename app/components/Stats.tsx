'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Clock3,
  Heart,
  LibraryBig,
  UsersRound,
} from 'lucide-react'

export default function Stats() {
  const [countValues, setCountValues] = useState({
    students: 0,
    services: 0,
    experience: 0,
    satisfaction: 0,
  })

  const countStarted = useRef(false)

  useEffect(() => {
    const section =
      document.querySelector<HTMLElement>(
        '[data-count-stats]'
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
          students: 10000,
          services: 15,
          experience: 8,
          satisfaction: 98,
        }

        const duration = 1800
        const startTime = performance.now()

        const animate = (currentTime: number) => {
          const elapsed =
            currentTime - startTime

          const progress = Math.min(
            elapsed / duration,
            1
          )

          const easedProgress =
            1 - Math.pow(1 - progress, 3)

          setCountValues({
            students: Math.round(
              targets.students *
                easedProgress
            ),
            services: Math.round(
              targets.services *
                easedProgress
            ),
            experience: Math.round(
              targets.experience *
                easedProgress
            ),
            satisfaction: Math.round(
              targets.satisfaction *
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

  const formatStudents = () => {
    if (countValues.students >= 10000) {
      return '10K+'
    }

    return `${countValues.students.toLocaleString(
      'en-US'
    )}+`
  }

  return (
    <>
      <section
        className="stats-3d-section"
        data-count-stats
      >
        <div className="stats-3d-panel">

          {/* ==============================
              الخدمات الأكاديمية
             ============================== */}

          <article className="stats-3d-card stats-services">

            <div className="stats-3d-badge">
              <LibraryBig
                size={48}
                strokeWidth={1.9}
              />
            </div>

            <strong>
              {countValues.services}+
            </strong>

            <span>
              خدمة أكاديمية
            </span>

          </article>


          {/* ==============================
              الطلاب المستفيدون
             ============================== */}

          <article className="stats-3d-card stats-students">

            <div className="stats-3d-badge">
              <UsersRound
                size={48}
                strokeWidth={1.9}
              />
            </div>

            <strong>
              {formatStudents()}
            </strong>

            <span>
              طالب مستفيد
            </span>

          </article>


          {/* ==============================
              رضا العملاء
             ============================== */}

          <article className="stats-3d-card stats-satisfaction">

            <div className="stats-3d-badge">
              <Heart
                size={48}
                strokeWidth={1.9}
              />
            </div>

            <strong>
              {countValues.satisfaction}%
            </strong>

            <span>
              نسبة رضا العملاء
            </span>

          </article>


          {/* ==============================
              سنوات الخبرة
             ============================== */}

          <article className="stats-3d-card stats-experience">

            <div className="stats-3d-badge">
              <Clock3
                size={48}
                strokeWidth={1.9}
              />
            </div>

            <strong>
              {countValues.experience}+
            </strong>

            <span>
              سنوات خبرة
            </span>

          </article>

        </div>
      </section>


      {/* =====================================================
          التصميم داخل Stats.tsx فقط
          لا يحتاج إلى تعديل globals.css
         ===================================================== */}

      <style jsx>{`

        /* ================================================
           القسم الرئيسي
           ================================================ */

        .stats-3d-section {
          width: 100%;

          padding: 28px 16px;

          margin: 18px 0;

          direction: rtl;
        }


        /* ================================================
           اللوحة الرئيسية
           ================================================ */

        .stats-3d-panel {
          position: relative;

          max-width: 1100px;

          margin: 0 auto;

          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          grid-template-areas:
            "students services"
            "experience satisfaction";

          gap: 1px;

          padding: 26px;

          background:
            linear-gradient(
              145deg,
              #ffffff 0%,
              #f7faff 50%,
              #eef4fc 100%
            );

          border: 2px solid #d6e2f2;

          border-radius: 30px;

          box-shadow:
            0 18px 45px
              rgba(23, 35, 61, 0.10),

            0 0 0 6px
              rgba(36, 85, 196, 0.035),

            inset 0 1px 0
              rgba(255, 255, 255, 0.95);

          overflow: hidden;
        }


        /* ================================================
           اللمعة الزجاجية
           ================================================ */

        .stats-3d-panel::before {
          content: '';

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              125deg,
              rgba(255,255,255,0.75),
              transparent 30%,
              transparent 70%,
              rgba(36,85,196,0.035)
            );
        }


        /* ================================================
           الإضاءة الخفيفة
           ================================================ */

        .stats-3d-panel::after {
          content: '';

          position: absolute;

          width: 380px;

          height: 380px;

          top: -250px;

          left: -150px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(36,85,196,0.08),
              transparent 70%
            );

          pointer-events: none;
        }


        /* ================================================
           البطاقات
           ================================================ */

        .stats-3d-card {
          position: relative;

          z-index: 1;

          min-width: 0;

          min-height: 280px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding: 28px 20px;

          text-align: center;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.98),
              rgba(246,249,253,0.92)
            );

          border: 1px solid #e2eaf4;

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            background 0.35s ease;
        }


        /* ================================================
           أماكن البطاقات
           ================================================ */

        .stats-services {
          grid-area: services;

          border-radius:
            24px 8px 8px 8px;
        }

        .stats-students {
          grid-area: students;

          border-radius:
            8px 24px 8px 8px;
        }

        .stats-satisfaction {
          grid-area: satisfaction;

          border-radius:
            8px 8px 8px 24px;
        }

        .stats-experience {
          grid-area: experience;

          border-radius:
            8px 8px 24px 8px;
        }


        /* ================================================
           حركة البطاقة
           ================================================ */

        .stats-3d-card:hover {
          transform: translateY(-4px);

          box-shadow:
            0 15px 30px
              rgba(36,85,196,0.09);
        }


        /* ================================================
           الشارة الدائرية
           ================================================ */

        .stats-3d-badge {
          position: relative;

          width: 118px;

          height: 118px;

          display: grid;

          place-items: center;

          margin-bottom: 20px;

          color: #2455c4;

          background:
            radial-gradient(
              circle at 32% 25%,
              #ffffff 0%,
              #edf4ff 25%,
              #d8e8ff 55%,
              #b8d0f3 78%,
              #8eaddd 100%
            );

          border: 5px solid #d5aa54;

          border-radius: 50%;

          box-shadow:

            0 15px 28px
              rgba(36,85,196,0.16),

            inset 7px 7px 14px
              rgba(255,255,255,0.85),

            inset -9px -10px 17px
              rgba(36,85,196,0.18),

            0 0 0 7px
              rgba(213,170,84,0.08);

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }


        /* ================================================
           لمعان الشارة
           ================================================ */

        .stats-3d-badge::before {
          content: '';

          position: absolute;

          top: 13px;

          left: 20px;

          width: 40px;

          height: 21px;

          border-radius: 50%;

          background:
            rgba(255,255,255,0.72);

          filter: blur(4px);

          transform:
            rotate(-25deg);
        }


        /* ================================================
           الأيقونة
           ================================================ */

        .stats-3d-badge svg {
          position: relative;

          z-index: 1;

          width: 54px;

          height: 54px;

          filter:
            drop-shadow(
              3px 5px 3px
              rgba(36,85,196,0.28)
            );
        }


        /* ================================================
           حركة الأيقونة
           ================================================ */

        .stats-3d-card:hover
        .stats-3d-badge {
          transform:
            translateY(-7px)
            scale(1.06);

          box-shadow:

            0 22px 35px
              rgba(36,85,196,0.20),

            inset 7px 7px 14px
              rgba(255,255,255,0.9),

            inset -9px -10px 17px
              rgba(36,85,196,0.20),

            0 0 0 10px
              rgba(213,170,84,0.10);
        }


        /* ================================================
           الأرقام
           ================================================ */

        .stats-3d-card strong {
          display: block;

          margin: 0 0 8px;

          color: #17233d;

          font-family:
            Georgia,
            'Times New Roman',
            serif;

          font-size:
            clamp(36px, 4vw, 48px);

          font-weight: 900;

          line-height: 1;

          letter-spacing: -1px;

          text-shadow:
            0 2px 5px
              rgba(23,35,61,0.10);
        }


        /* ================================================
           النصوص العربية
           ================================================ */

        .stats-3d-card span {
          display: block;

          color: #697791;

          font-size: 15px;

          font-weight: 800;

          line-height: 1.7;

          text-align: center;
        }


        /* ================================================
           الجوال
           ================================================ */

        @media (max-width: 650px) {

          .stats-3d-section {
            padding: 20px 10px;
          }

          .stats-3d-panel {
            padding: 10px;

            gap: 7px;

            border-radius: 23px;
          }

          .stats-3d-card {
            min-height: 215px;

            padding: 20px 10px;
          }

          .stats-3d-badge {
            width: 82px;

            height: 82px;

            margin-bottom: 14px;

            border-width: 4px;
          }

          .stats-3d-badge svg {
            width: 38px;

            height: 38px;
          }

          .stats-3d-card strong {
            font-size: 29px;
          }

          .stats-3d-card span {
            font-size: 11px;
          }

          .stats-services,
          .stats-students,
          .stats-satisfaction,
          .stats-experience {
            border-radius: 16px;
          }
        }


        /* ================================================
           الشاشات الصغيرة جدًا
           ================================================ */

        @media (max-width: 380px) {

          .stats-3d-panel {
            padding: 7px;
          }

          .stats-3d-card {
            min-height: 190px;

            padding: 16px 6px;
          }

          .stats-3d-badge {
            width: 70px;

            height: 70px;
          }

          .stats-3d-badge svg {
            width: 32px;

            height: 32px;
          }

          .stats-3d-card strong {
            font-size: 25px;
          }

          .stats-3d-card span {
            font-size: 10px;
          }
        }

      `}</style>
    </>
  )
}