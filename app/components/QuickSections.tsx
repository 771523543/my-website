'use client'

import Link from 'next/link'
import {
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
    button: 'استكشف الخدمات',
    color: 'blue',
  },
  {
    title: 'باقاتنا',
    description: 'اختر الباقة المناسبة لرحلتك التعليمية',
    href: '#packages',
    icon: Gem,
    button: 'عرض الباقات',
    color: 'green',
  },
  {
    title: 'أعمالنا السابقة',
    description: 'تعرّف على أعمالنا ومشاريعنا السابقة',
    href: '/previous-works',
    icon: Trophy,
    button: 'شاهد الأعمال',
    color: 'purple',
  },
]

export default function QuickSections() {
  return (
    <section
      className="quick-sections"
      aria-label="الأقسام الرئيسية"
    >
      <div className="quick-sections-inner">
        <div className="quick-heading">
          <span className="quick-eyebrow">منصة هديل</span>

          <h2>كل ما تحتاجه في مكان واحد</h2>

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
                className={`quick-card quick-card-${card.color}`}
              >
                <div className="quick-card-main">
                  <div className="quick-card-icon">
                    <Icon size={30} strokeWidth={2} />
                  </div>

                  <div className="quick-card-content">
                    <h3>{card.title}</h3>

                    <p>{card.description}</p>
                  </div>
                </div>

                <span className="quick-card-button">
                  {card.button}
                </span>

                <span
                  className="quick-card-glow"
                  aria-hidden="true"
                />
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
          padding: 72px 20px 78px;

          /* هوية منصة هديل: أزرق ملكي مع لمسات ذهبية */
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(255, 255, 255, 0.14),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 75%,
              rgba(226, 164, 61, 0.16),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #2455c4 0%,
              #1f4db2 45%,
              #173d91 100%
            );
        }

        .quick-sections::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: 0.07;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.35) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.35) 1px,
              transparent 1px
            );

          background-size: 34px 34px;
        }

        .quick-sections::after {
          content: '';
          position: absolute;
          width: 360px;
          height: 360px;
          left: -180px;
          bottom: -220px;
          z-index: -1;
          pointer-events: none;
          border-radius: 50%;
          background: rgba(226, 164, 61, 0.08);
          filter: blur(8px);
        }

        .quick-sections-inner {
          width: min(1180px, 100%);
          margin: 0 auto;
        }

        .quick-heading {
          position: relative;
          max-width: 720px;
          margin: 0 auto 38px;
          text-align: center;
        }

        .quick-eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 32px;
          padding: 6px 16px;
          margin-bottom: 12px;
          border: 1px solid rgba(226, 164, 61, 0.45);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
          box-shadow: 0 8px 24px rgba(23, 35, 61, 0.08);
          backdrop-filter: blur(8px);
        }

        .quick-heading h2 {
          margin: 0;
          color: #e2a43d;
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 900;
          line-height: 1.25;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 10px rgba(226, 164, 61, 0.2);
        }

        .quick-heading p {
          margin: 12px 0 0;
          color: rgba(255, 255, 255, 0.88);
          font-size: clamp(14px, 2vw, 16px);
          line-height: 1.8;
        }

        .quick-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          align-items: stretch;
        }

        .quick-card {
          position: relative;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          min-width: 0;
          min-height: 245px;
          padding: 27px 22px 22px;
          overflow: hidden;
          border: 1px solid rgba(228, 235, 244, 0.95);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.94);
          color: #17233d;
          text-decoration: none;
          box-shadow:
            0 14px 38px rgba(23, 35, 61, 0.1),
            0 3px 10px rgba(36, 85, 196, 0.08);
          backdrop-filter: blur(12px);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .quick-card::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: 0;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(36, 85, 196, 0.12),
              transparent 45%
            ),
            linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.35),
              transparent 65%
            );
          transition: opacity 0.3s ease;
        }

        .quick-card:hover {
          transform: translateY(-7px);
          border-color: rgba(36, 85, 196, 0.22);
          box-shadow:
            0 22px 50px rgba(23, 35, 61, 0.14),
            0 8px 22px rgba(36, 85, 196, 0.1);
        }

        .quick-card:hover::before {
          opacity: 1;
        }

        .quick-card:focus-visible {
          outline: 3px solid rgba(255, 255, 255, 0.55);
          outline-offset: 4px;
        }

        .quick-card-main {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .quick-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 68px;
          height: 68px;
          flex: 0 0 68px;
          margin-bottom: 17px;
          border-radius: 20px;
          color: #ffffff;
          box-shadow:
            0 12px 25px rgba(23, 35, 61, 0.13),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .quick-card:hover .quick-card-icon {
          transform: translateY(-2px) scale(1.04);
          box-shadow:
            0 16px 30px rgba(23, 35, 61, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.35);
        }

        .quick-card-blue .quick-card-icon {
          background:
            linear-gradient(
              145deg,
              #2455c4,
              #173d91
            );
        }

        .quick-card-green .quick-card-icon {
          background:
            linear-gradient(
              145deg,
              #218c70,
              #12614e
            );
        }

        .quick-card-purple .quick-card-icon {
          background:
            linear-gradient(
              145deg,
              #7652b7,
              #4b327f
            );
        }

        .quick-card-content {
          width: 100%;
          text-align: center;
        }

        .quick-card-content h3 {
          margin: 0;
          color: #17233d;
          font-size: 20px;
          font-weight: 900;
          line-height: 1.4;
        }

        .quick-card-content p {
          max-width: 280px;
          margin: 9px auto 0;
          color: #697791;
          font-size: 13.5px;
          font-weight: 500;
          line-height: 1.8;
        }

        .quick-card-button {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 43px;
          margin-top: 22px;
          padding: 9px 14px;
          border-radius: 13px;
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
          line-height: 1.3;
          box-shadow:
            0 8px 18px rgba(23, 35, 61, 0.1);
          transition:
            transform 0.25s ease,
            filter 0.25s ease;
        }

        .quick-card:hover .quick-card-button {
          transform: translateY(-1px);
          filter: brightness(1.04);
        }

        .quick-card-blue .quick-card-button {
          background: #2455c4;
        }

        .quick-card-green .quick-card-button {
          background: #218c70;
        }

        .quick-card-purple .quick-card-button {
          background: #7652b7;
        }

        .quick-card-glow {
          position: absolute;
          width: 130px;
          height: 130px;
          right: -65px;
          bottom: -65px;
          z-index: -1;
          border-radius: 50%;
          background: rgba(226, 164, 61, 0.08);
          filter: blur(3px);
          pointer-events: none;
        }

        @media (max-width: 900px) {
          .quick-sections {
            padding: 60px 16px 66px;
          }

          .quick-cards {
            gap: 14px;
          }

          .quick-card {
            min-height: 225px;
            padding: 22px 14px 17px;
            border-radius: 20px;
          }

          .quick-card-icon {
            width: 58px;
            height: 58px;
            flex-basis: 58px;
            margin-bottom: 13px;
            border-radius: 17px;
          }

          .quick-card-content h3 {
            font-size: 16px;
          }

          .quick-card-content p {
            margin-top: 7px;
            font-size: 11.5px;
            line-height: 1.7;
          }

          .quick-card-button {
            min-height: 39px;
            margin-top: 16px;
            padding: 8px 7px;
            border-radius: 11px;
            font-size: 10.5px;
          }
        }

        @media (max-width: 520px) {
          .quick-sections {
            padding: 48px 9px 54px;
          }

          .quick-sections::before {
            opacity: 0.07;
            background-size: 28px 28px;
          }

          .quick-heading {
            margin-bottom: 24px;
          }

          .quick-eyebrow {
            min-height: 28px;
            padding: 5px 12px;
            margin-bottom: 9px;
            font-size: 10px;
          }

          .quick-heading h2 {
            font-size: 21px;
            letter-spacing: 0;
          }

          .quick-heading p {
            margin-top: 8px;
            font-size: 11px;
            line-height: 1.7;
          }

          .quick-cards {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 7px;
          }

          .quick-card {
            min-height: 195px;
            padding: 15px 7px 10px;
            border-radius: 16px;
          }

          .quick-card-icon {
            width: 47px;
            height: 47px;
            flex-basis: 47px;
            margin-bottom: 10px;
            border-radius: 14px;
          }

          .quick-card-icon svg {
            width: 22px;
            height: 22px;
          }

          .quick-card-content h3 {
            font-size: 12px;
            line-height: 1.35;
          }

          .quick-card-content p {
            margin-top: 6px;
            font-size: 9px;
            line-height: 1.6;
          }

          .quick-card-button {
            min-height: 35px;
            margin-top: 12px;
            padding: 7px 4px;
            border-radius: 9px;
            font-size: 8.5px;
          }
        }

        @media (max-width: 380px) {
          .quick-sections {
            padding-left: 7px;
            padding-right: 7px;
          }

          .quick-cards {
            gap: 5px;
          }

          .quick-card {
            min-height: 188px;
            padding: 13px 5px 9px;
            border-radius: 14px;
          }

          .quick-card-icon {
            width: 43px;
            height: 43px;
            flex-basis: 43px;
            margin-bottom: 8px;
            border-radius: 12px;
          }

          .quick-card-icon svg {
            width: 20px;
            height: 20px;
          }

          .quick-card-content h3 {
            font-size: 10.5px;
          }

          .quick-card-content p {
            font-size: 8.3px;
          }

          .quick-card-button {
            min-height: 32px;
            margin-top: 10px;
            font-size: 7.8px;
            border-radius: 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .quick-card,
          .quick-card-icon,
          .quick-card-button {
            transition: none;
          }

          .quick-card:hover {
            transform: none;
          }

          .quick-card:hover .quick-card-icon,
          .quick-card:hover .quick-card-button {
            transform: none;
          }
        }
      `}</style>
    </section>
  )
}