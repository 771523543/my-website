'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  Gem,
  GraduationCap,
  Trophy,
} from 'lucide-react'

const cards = [
  {
    title: 'خدماتنا',
    description: 'اكتشف خدماتنا الطلابية والأكاديمية',
    href: '/services',
    icon: GraduationCap,
    number: '01',
  },
  {
    title: 'باقاتنا',
    description: 'اختر الباقة المناسبة لرحلتك التعليمية',
    href: '#packages',
    icon: Gem,
    number: '02',
  },
  {
    title: 'أعمالنا السابقة',
    description: 'تعرّف على أعمالنا ومشاريعنا السابقة',
    href: '/previous-works',
    icon: Trophy,
    number: '03',
  },
]

export default function QuickSections() {
  return (
    <section className="quick-sections" aria-label="استكشف منصة هديل">
      {/* الخلفية */}
      <div className="quick-background" aria-hidden="true">
        <div className="quick-glow quick-glow-one" />
        <div className="quick-glow quick-glow-two" />
        <div className="quick-grid" />
        <div className="quick-orb quick-orb-one" />
        <div className="quick-orb quick-orb-two" />
      </div>

      <div className="quick-container">
        <div className="quick-heading">
          <span className="quick-eyebrow">منصة هديل</span>

          <h2>
            كل ما تحتاجه
            <span> في مكان واحد</span>
          </h2>

          <p>
            خدمات أكاديمية، باقات مميزة، وأعمال نفتخر بها
          </p>
        </div>

        <div className="quick-cards">
          {cards.map((card) => {
            const Icon = card.icon

            return (
              <Link
                key={card.title}
                href={card.href}
                className="quick-card"
              >
                <div className="quick-card-number">
                  {card.number}
                </div>

                <div className="quick-card-icon">
                  <Icon size={34} strokeWidth={1.8} />
                </div>

                <div className="quick-card-content">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>

                <div className="quick-card-arrow">
                  <ArrowLeft size={19} />
                </div>

                <div className="quick-card-shine" />
              </Link>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .quick-sections {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 76px 20px 82px;
          background:
            radial-gradient(
              circle at 15% 25%,
              rgba(43, 109, 224, 0.28),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 70%,
              rgba(30, 64, 175, 0.3),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              #06142f 0%,
              #0a2454 48%,
              #071a3b 100%
            );
        }

        .quick-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: -1;
        }

        .quick-grid {
          position: absolute;
          inset: 0;
          opacity: 0.12;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.12) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.12) 1px,
              transparent 1px
            );
          background-size: 46px 46px;
          mask-image: linear-gradient(
            to bottom,
            transparent,
            black 20%,
            black 80%,
            transparent
          );
        }

        .quick-glow {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.22;
        }

        .quick-glow-one {
          top: -180px;
          right: -100px;
          background: #2563eb;
          animation: glowMoveOne 9s ease-in-out infinite alternate;
        }

        .quick-glow-two {
          bottom: -220px;
          left: -100px;
          background: #0ea5e9;
          animation: glowMoveTwo 11s ease-in-out infinite alternate;
        }

        .quick-orb {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }

        .quick-orb-one {
          width: 280px;
          height: 280px;
          top: 50%;
          right: -180px;
        }

        .quick-orb-two {
          width: 180px;
          height: 180px;
          bottom: -90px;
          left: 8%;
        }

        .quick-container {
          position: relative;
          width: min(1120px, 100%);
          margin: 0 auto;
        }

        .quick-heading {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-bottom: 42px;
        }

        .quick-eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 16px;
          margin-bottom: 15px;
          border: 1px solid rgba(255, 215, 112, 0.3);
          border-radius: 999px;
          background: rgba(255, 215, 112, 0.08);
          color: #f6d77a;
          font-size: 13px;
          font-weight: 700;
        }

        .quick-heading h2 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(28px, 4vw, 43px);
          line-height: 1.2;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .quick-heading h2 span {
          color: #f4d477;
        }

        .quick-heading p {
          margin: 12px 0 0;
          color: rgba(255, 255, 255, 0.72);
          font-size: 16px;
        }

        .quick-cards {
          position: relative;
          z-index: 3;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .quick-card {
          position: relative;
          min-height: 265px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 30px;
          overflow: hidden;
          isolation: isolate;
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 24px;
          background:
            linear-gradient(
              145deg,
              rgba(37, 99, 235, 0.96),
              rgba(13, 54, 130, 0.97)
            );
          box-shadow:
            0 20px 45px rgba(0, 0, 0, 0.24),
            inset 0 1px 0 rgba(255, 255, 255, 0.13);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .quick-card::before {
          content: '';
          position: absolute;
          width: 180px;
          height: 180px;
          top: -95px;
          right: -70px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          z-index: -1;
        }

        .quick-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.1),
            transparent 35%,
            transparent 70%,
            rgba(255, 215, 112, 0.06)
          );
          pointer-events: none;
          z-index: -1;
        }

        .quick-card:hover {
          transform: translateY(-8px);
          border-color: rgba(246, 215, 122, 0.55);
          box-shadow:
            0 28px 55px rgba(0, 0, 0, 0.3),
            0 0 28px rgba(37, 99, 235, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .quick-card-number {
          position: absolute;
          top: 20px;
          right: 23px;
          color: rgba(255, 255, 255, 0.35);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .quick-card-icon {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.13);
          color: #ffffff;
          box-shadow:
            0 12px 25px rgba(0, 0, 0, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition:
            transform 0.3s ease,
            background 0.3s ease;
        }

        .quick-card:hover .quick-card-icon {
          transform: scale(1.08) rotate(-3deg);
          background: rgba(255, 255, 255, 0.19);
        }

        .quick-card-content {
          position: relative;
          z-index: 2;
          direction: rtl;
          text-align: right;
        }

        .quick-card-content h3 {
          margin: 0 0 9px;
          color: #ffffff;
          font-size: 24px;
          line-height: 1.2;
          font-weight: 800;
        }

        .quick-card-content p {
          margin: 0;
          color: rgba(255, 255, 255, 0.8);
          font-size: 15px;
          line-height: 1.8;
        }

        .quick-card-arrow {
          position: absolute;
          left: 25px;
          bottom: 25px;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          transition:
            transform 0.3s ease,
            background 0.3s ease;
        }

        .quick-card:hover .quick-card-arrow {
          transform: translateX(-5px);
          background: rgba(246, 215, 122, 0.2);
          color: #f6d77a;
        }

        .quick-card-shine {
          position: absolute;
          top: 0;
          left: -120%;
          width: 60%;
          height: 100%;
          transform: skewX(-18deg);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.08),
            transparent
          );
          transition: left 0.7s ease;
          pointer-events: none;
        }

        .quick-card:hover .quick-card-shine {
          left: 150%;
        }

        @keyframes glowMoveOne {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-60px, 40px, 0);
          }
        }

        @keyframes glowMoveTwo {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(70px, -35px, 0);
          }
        }

        @media (max-width: 850px) {
          .quick-cards {
            grid-template-columns: 1fr;
            max-width: 560px;
            margin: 0 auto;
          }

          .quick-card {
            min-height: 220px;
          }
        }

        @media (max-width: 520px) {
          .quick-sections {
            padding: 58px 16px 65px;
          }

          .quick-heading {
            margin-bottom: 30px;
          }

          .quick-heading p {
            font-size: 14px;
          }

          .quick-card {
            min-height: 210px;
            padding: 25px;
            border-radius: 21px;
          }

          .quick-card-icon {
            width: 62px;
            height: 62px;
            margin-bottom: 20px;
          }

          .quick-card-content h3 {
            font-size: 21px;
          }

          .quick-card-content p {
            font-size: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .quick-glow-one,
          .quick-glow-two {
            animation: none;
          }

          .quick-card,
          .quick-card-icon,
          .quick-card-arrow,
          .quick-card-shine {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}