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

          {/* =========================
              الخدمات الأكاديمية
             ========================= */}
          <article className="stats-3d-card stats-services">
            <div className="stats-3d-badge">
              <LibraryBig
                size={48}
                strokeWidth={1.8}
              />
            </div>

            <strong>
              {countValues.services}+
            </strong>

            <span>
              خدمة أكاديمية
            </span>
          </article>


          {/* =========================
              الطلاب المستفيدون
             ========================= */}
          <article className="stats-3d-card stats-students">
            <div className="stats-3d-badge">
              <UsersRound
                size={48}
                strokeWidth={1.8}
              />
            </div>

            <strong>
              {formatStudents()}
            </strong>

            <span>
              طالب مستفيد
            </span>
          </article>


          {/* =========================
              رضا العملاء
             ========================= */}
          <article className="stats-3d-card stats-satisfaction">
            <div className="stats-3d-badge">
              <Heart
                size={48}
                strokeWidth={1.8}
              />
            </div>

            <strong>
              {countValues.satisfaction}%
            </strong>

            <span>
              نسبة رضا العملاء
            </span>
          </article>


          {/* =========================
              سنوات الخبرة
             ========================= */}
          <article className="stats-3d-card stats-experience">
            <div className="stats-3d-badge">
              <Clock3
                size={48}
                strokeWidth={1.8}
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
          التصميم كامل داخل Stats.tsx
          لا يحتاج إلى تعديل globals.css
         ===================================================== */}

      <style jsx>{`
        .stats-3d-section {
          width: 100%;
          padding: 28px 16px;
          margin: 18px 0;
          direction: rtl;
        }

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

          padding: 28px;

          border-radius: 32px;

          background:
            linear-gradient(
              145deg,
              #1d2b42 0%,
              #101b2c 45%,
              #1b2a40 100%
            );

          border: 2px solid #b9944b;

          box-shadow:
            0 25px 60px
              rgba(10, 20, 35, 0.25),
            inset 0 1px 0
              rgba(255, 255, 255, 0.18),
            inset 0 -1px 0
              rgba(0, 0, 0, 0.5);

          overflow: hidden;
        }

        /* لمعان زجاجي خفيف */
        .stats-3d-panel::before {
          content: '';

          position: absolute;
          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              125deg,
              rgba(255,255,255,0.14),
              transparent 28%,
              transparent 72%,
              rgba(255,255,255,0.04)
            );
        }

        /* إضاءة داخلية */
        .stats-3d-panel::after {
          content: '';

          position: absolute;

          width: 360px;
          height: 360px;

          top: -220px;
          left: -150px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(93, 143, 230, 0.18),
              transparent 70%
            );

          pointer-events: none;
        }

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
              rgba(255,255,255,0.075),
              rgba(255,255,255,0.025)
            );

          border: 1px solid
            rgba(255,255,255,0.10);

          transition:
            transform 0.35s ease,
            background 0.35s ease;
        }

        .stats-services {
          grid-area: services;

          border-radius: 24px 8px 8px 8px;
        }

        .stats-students {
          grid-area: students;

          border-radius: 8px 24px 8px 8px;
        }

        .stats-satisfaction {
          grid-area: satisfaction;

          border-radius: 8px 8px 8px 24px;
        }

        .stats-experience {
          grid-area: experience;

          border-radius: 8px 8px 24px 8px;
        }

        .stats-3d-card:hover {
          transform: translateY(-4px);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.12),
              rgba(255,255,255,0.04)
            );
        }

        /* ==========================================
           الشارة الدائرية البارزة
           ========================================== */

        .stats-3d-badge {
          position: relative;

          width: 118px;
          height: 118px;

          display: grid;
          place-items: center;

          margin-bottom: 20px;

          color: #174fae;

          background:
            radial-gradient(
              circle at 35% 28%,
              #ffffff 0%,
              #dcecff 18%,
              #a9c9f5 48%,
              #5e91d8 78%,
              #3565a9 100%
            );

          border: 5px solid #d4ad5e;

          border-radius: 50%;

          box-shadow:
            0 15px 25px
              rgba(0,0,0,0.32),
            inset 8px 8px 15px
              rgba(255,255,255,0.5),
            inset -9px -10px 18px
              rgba(19,56,105,0.45),
            0 0 0 7px
              rgba(212,173,94,0.10);

          transform:
            perspective(500px)
            translateZ(0);

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }

        /* طبقة لامعة فوق الشارة */
        .stats-3d-badge::before {
          content: '';

          position: absolute;

          top: 12px;
          left: 18px;

          width: 38px;
          height: 20px;

          border-radius: 50%;

          background:
            rgba(255,255,255,0.48);

          filter: blur(4px);

          transform: rotate(-25deg);
        }

        .stats-3d-badge svg {
          position: relative;
          z-index: 1;

          width: 52px;
          height: 52px;

          filter:
            drop-shadow(
              3px 5px 2px
              rgba(11, 43, 91, 0.35)
            );
        }

        .stats-3d-card:hover
        .stats-3d-badge {
          transform:
            perspective(500px)
            translateY(-7px)
            rotateX(4deg)
            scale(1.05);

          box-shadow:
            0 22px 35px
              rgba(0,0,0,0.38),
            inset 8px 8px 15px
              rgba(255,255,255,0.55),
            inset -9px -10px 18px
              rgba(19,56,105,0.45),
            0 0 0 10px
              rgba(212,173,94,0.12);
        }

        /* ==========================================
           الأرقام
           ========================================== */

        .stats-3d-card strong {
          display: block;

          margin: 0 0 8px;

          color: #ffffff;

          font-family:
            Georgia,
            'Times New Roman',
            serif;

          font-size: clamp(
            36px,
            4vw,
            48px
          );

          font-weight: 900;

          line-height: 1;

          letter-spacing: -1px;

          text-shadow:
            0 3px 8px
              rgba(0,0,0,0.35);
        }

        /* ==========================================
           العناوين العربية
           ========================================== */

        .stats-3d-card span {
          display: block;

          color: #ffffff;

          font-size: 15px;

          font-weight: 800;

          line-height: 1.7;

          text-align: center;

          text-shadow:
            0 2px 5px
              rgba(0,0,0,0.3);
        }

        /* ==========================================
           الجوال
           ========================================== */

        @media (max-width: 650px) {
          .stats-3d-section {
            padding: 20px 10px;
          }

          .stats-3d-panel {
            padding: 12px;

            gap: 8px;

            border-radius: 24px;

            grid-template-areas:
              "students services"
              "experience satisfaction";
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

            margin-bottom: 6px;
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

        @media (max-width: 380px) {
          .stats-3d-panel {
            padding: 8px;
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