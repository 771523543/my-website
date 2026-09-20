'use client'

import {
  ArrowLeft,
  Gem,
  GraduationCap,
  Sparkles,
  Trophy,
} from 'lucide-react'
import Link from 'next/link'

const cards = [
  {
    title: 'خدماتنا',
    description: 'اكتشف خدماتنا الطلابية والأكاديمية',
    href: '/services',
    icon: GraduationCap,
  },
  {
    title: 'باقاتنا',
    description: 'اختر الباقة المناسبة لرحلتك التعليمية',
    href: '#packages',
    icon: Gem,
  },
  {
    title: 'أعمالنا السابقة',
    description: 'تعرّف على أعمالنا ومشاريعنا السابقة',
    href: '/previous-works',
    icon: Trophy,
  },
]

export default function QuickSections() {
  return (
    <section className="quick-sections" aria-label="استكشف منصة هديل">
      {/* الخلفية */}
      <div className="quick-background" aria-hidden="true">
        <div className="quick-glow quick-glow-one" />
        <div className="quick-glow quick-glow-two" />
        <div className="quick-glow quick-glow-three" />

        <div className="quick-light quick-light-one" />
        <div className="quick-light quick-light-two" />

        <div className="quick-particles">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              className="quick-particle"
              style={{
                left: `${(index * 17) % 100}%`,
                top: `${(index * 29) % 100}%`,
                animationDelay: `${index * 0.35}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* البطاقات الثلاث */}
      <div className="quick-cards">
        {cards.map(({ title, description, href, icon: Icon }) => (
          <Link
            key={title}
            href={href}
            className="quick-card"
          >
            <div className="card-glow" aria-hidden="true" />

            <div className="quick-icon-wrap">
              <div className="quick-icon">
                <Icon size={40} strokeWidth={2.2} />
              </div>

              <Sparkles
                className="quick-icon-sparkle"
                size={15}
              />
            </div>

            <div className="quick-card-content">
              <h3>{title}</h3>

              <p>{description}</p>
            </div>

            <div className="quick-arrow" aria-hidden="true">
              <ArrowLeft size={18} />
            </div>

            <div className="quick-card-line" aria-hidden="true" />
          </Link>
        ))}
      </div>

      <style jsx>{`
        .quick-sections {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 55px 24px 65px;

          background:
            radial-gradient(
              circle at 15% 50%,
              rgba(37, 99, 235, 0.22),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 30%,
              rgba(212, 175, 55, 0.12),
              transparent 28%
            ),
            linear-gradient(
              135deg,
              #020617 0%,
              #06133a 45%,
              #071d52 100%
            );
        }

        /* =========================
           BACKGROUND
        ========================= */

        .quick-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .quick-glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(55px);
          opacity: 0.65;

          animation: glowMove 7s ease-in-out infinite;
        }

        .quick-glow-one {
          width: 260px;
          height: 260px;
          top: -90px;
          left: 8%;
          background: rgba(37, 99, 235, 0.25);
        }

        .quick-glow-two {
          width: 300px;
          height: 300px;
          right: 8%;
          bottom: -140px;

          background: rgba(212, 175, 55, 0.13);

          animation-delay: -2s;
        }

        .quick-glow-three {
          width: 190px;
          height: 190px;
          left: 47%;
          top: 45%;

          background: rgba(59, 130, 246, 0.16);

          animation-delay: -4s;
        }

        .quick-light {
          position: absolute;

          width: 2px;
          height: 180px;

          opacity: 0.35;

          background: linear-gradient(
            to bottom,
            transparent,
            rgba(212, 175, 55, 0.75),
            transparent
          );

          transform: rotate(24deg);

          animation: lightMove 8s linear infinite;
        }

        .quick-light-one {
          left: 20%;
          top: -70px;
        }

        .quick-light-two {
          right: 24%;
          top: -80px;
          animation-delay: -4s;
        }

        .quick-particles {
          position: absolute;
          inset: 0;
        }

        .quick-particle {
          position: absolute;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.7);

          box-shadow:
            0 0 12px rgba(147, 197, 253, 0.8);

          animation: particleFloat 5s ease-in-out infinite;
        }

        /* =========================
           CARDS CONTAINER
        ========================= */

        .quick-cards {
          position: relative;
          z-index: 10;

          width: 100%;
          max-width: 1150px;

          margin: 0 auto;

          display: flex;
          align-items: stretch;
          justify-content: center;

          gap: 28px;

          direction: rtl;
        }

        /* =========================
           CARD
        ========================= */

        .quick-card {
          position: relative;

          /*
            مهم:
            عرض ثابت وكبير حتى لا تنضغط البطاقات.
          */
          flex: 1 1 0;

          min-width: 0;
          max-width: 360px;

          min-height: 270px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          padding: 35px 28px;

          overflow: hidden;

          text-align: center;
          text-decoration: none;

          border-radius: 28px;

          background:
            linear-gradient(
              145deg,
              #1267df 0%,
              #0d56c5 50%,
              #08439c 100%
            );

          border:
            1px solid
            rgba(255, 255, 255, 0.38);

          box-shadow:
            0 20px 45px rgba(0, 0, 0, 0.42),
            inset 0 1px 0
              rgba(255, 255, 255, 0.25),
            inset 0 -25px 45px
              rgba(0, 20, 80, 0.18);

          /*
            لا توجد حركة للبطاقات.
          */
          transform: none;

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .quick-card:hover {
          transform: translateY(-6px);

          border-color:
            rgba(255, 255, 255, 0.75);

          box-shadow:
            0 28px 60px rgba(0, 0, 0, 0.5),
            0 0 30px
              rgba(37, 99, 235, 0.3),
            inset 0 1px 0
              rgba(255, 255, 255, 0.32);
        }

        /* =========================
           CARD GLOW
        ========================= */

        .card-glow {
          position: absolute;

          width: 220px;
          height: 150px;

          top: -80px;
          left: 50%;

          transform: translateX(-50%);

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.12);

          filter: blur(45px);

          pointer-events: none;
        }

        /* =========================
           ICON
        ========================= */

        .quick-icon-wrap {
          position: relative;
          z-index: 3;

          width: 88px;
          height: 88px;

          display: grid;
          place-items: center;

          margin-bottom: 20px;

          border-radius: 24px;

          background:
            rgba(255, 255, 255, 0.15);

          border:
            1px solid
            rgba(255, 255, 255, 0.5);

          box-shadow:
            0 12px 28px
              rgba(0, 0, 0, 0.28),
            inset 0 1px 0
              rgba(255, 255, 255, 0.22);
        }

        .quick-icon {
          display: grid;
          place-items: center;

          color: #ffffff;

          filter:
            drop-shadow(
              0 3px 7px
              rgba(0, 0, 0, 0.4)
            );

          transition:
            transform 0.3s ease;
        }

        .quick-card:hover .quick-icon {
          transform: scale(1.06);
        }

        .quick-icon-sparkle {
          position: absolute;

          top: -7px;
          right: -7px;

          color: #ffffff;

          filter:
            drop-shadow(
              0 0 7px
              rgba(255, 255, 255, 0.75)
            );
        }

        /* =========================
           TEXT
        ========================= */

        .quick-card-content {
          position: relative;
          z-index: 3;

          width: 100%;
        }

        .quick-card h3 {
          margin: 0;

          color: #ffffff;

          font-size: 27px;
          font-weight: 900;

          line-height: 1.35;

          text-shadow:
            0 2px 10px
            rgba(0, 0, 0, 0.35);
        }

        .quick-card p {
          margin: 11px auto 0;

          max-width: 280px;

          color: #ffffff;

          font-size: 15px;
          font-weight: 500;

          line-height: 1.8;

          opacity: 0.95;

          text-shadow:
            0 1px 7px
            rgba(0, 0, 0, 0.3);
        }

        /* =========================
           ARROW
        ========================= */

        .quick-arrow {
          position: absolute;

          left: 18px;
          bottom: 18px;

          width: 36px;
          height: 36px;

          display: grid;
          place-items: center;

          border-radius: 50%;

          color: #ffffff;

          background:
            rgba(255, 255, 255, 0.13);

          border:
            1px solid
            rgba(255, 255, 255, 0.3);

          transition:
            transform 0.3s ease,
            background 0.3s ease;
        }

        .quick-card:hover .quick-arrow {
          transform: translateX(-4px);

          background:
            rgba(255, 255, 255, 0.23);
        }

        /* =========================
           BOTTOM LINE
        ========================= */

        .quick-card-line {
          position: absolute;

          left: 22%;
          right: 22%;
          bottom: 9px;

          height: 2px;

          border-radius: 999px;

          background:
            rgba(255, 255, 255, 0.7);

          opacity: 0.75;
        }

        /* =========================
           BACKGROUND ANIMATIONS
        ========================= */

        @keyframes glowMove {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }

          50% {
            transform:
              translate3d(20px, -15px, 0)
              scale(1.08);
          }
        }

        @keyframes lightMove {
          0% {
            transform:
              translateY(-30px)
              rotate(24deg);

            opacity: 0;
          }

          20% {
            opacity: 0.4;
          }

          80% {
            opacity: 0.25;
          }

          100% {
            transform:
              translateY(280px)
              rotate(24deg);

            opacity: 0;
          }
        }

        @keyframes particleFloat {
          0%,
          100% {
            opacity: 0.2;

            transform:
              translateY(0)
              scale(0.8);
          }

          50% {
            opacity: 0.8;

            transform:
              translateY(-18px)
              scale(1.2);
          }
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 900px) {
          .quick-cards {
            gap: 18px;
          }

          .quick-card {
            min-height: 250px;
            padding: 30px 20px;
          }

          .quick-card h3 {
            font-size: 23px;
          }

          .quick-card p {
            font-size: 14px;
          }

          .quick-icon-wrap {
            width: 76px;
            height: 76px;
          }

          .quick-icon svg {
            width: 34px;
            height: 34px;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 680px) {
          .quick-sections {
            padding: 40px 18px 50px;
          }

          .quick-cards {
            flex-direction: column;

            align-items: center;

            gap: 18px;
          }

          .quick-card {
            width: 100%;
            max-width: 390px;

            flex: none;

            min-height: 225px;
          }

          .quick-card h3 {
            font-size: 24px;
          }

          .quick-card p {
            font-size: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .quick-glow,
          .quick-light,
          .quick-particle {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}