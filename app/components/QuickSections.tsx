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
          <span className="quick-eyebrow">
            منصة هديل
          </span>

          <h2>
            كل ما تحتاجه في مكان واحد
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
                className={`quick-card quick-card-${card.color}`}
              >
                <div className="quick-card-main">

                  <div className="quick-card-icon">
                    <Icon
                      size={30}
                      strokeWidth={2}
                    />
                  </div>

                  <div className="quick-card-content">
                    <h3>
                      {card.title}
                    </h3>

                    <p>
                      {card.description}
                    </p>
                  </div>

                </div>

                <span className="quick-card-button">
                  {card.button}
                </span>

                <span className="quick-card-glow" />
              </Link>
            )
          })}
        </div>

      </div>

      <style jsx>{`
        .quick-sections {
          position: relative;
          width: 100%;
          padding: 38px 20px 36px;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(30, 111, 255, 0.1),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(0, 190, 255, 0.06),
              transparent 30%
            ),
            linear-gradient(
              180deg,
              #07152f 0%,
              #081b3c 50%,
              #07162f 100%
            );
        }

        .quick-sections::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.1;

          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.04) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.04) 1px,
              transparent 1px
            );

          background-size: 36px 36px;
        }

        .quick-sections-inner {
          position: relative;
          z-index: 1;

          width: min(1120px, 100%);
          margin: 0 auto;
        }

        /* =========================
           العنوان
        ========================= */

        .quick-heading {
          margin: 0 auto 26px;
          text-align: center;
          direction: rtl;
        }

        .quick-eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          min-height: 28px;
          padding: 5px 13px;
          margin-bottom: 9px;

          border: 1px solid rgba(245, 194, 67, 0.3);
          border-radius: 999px;

          background: rgba(245, 194, 67, 0.07);
          color: #f5c243;

          font-size: 11px;
          font-weight: 800;
        }

        .quick-heading h2 {
          margin: 0;

          color: #ffffff;

          font-size: clamp(24px, 3vw, 32px);
          line-height: 1.3;
          font-weight: 900;
        }

        .quick-heading p {
          margin: 8px 0 0;

          color: rgba(255, 255, 255, 0.7);

          font-size: 13px;
          line-height: 1.6;
        }

        /* =========================
           البطاقات
        ========================= */

        .quick-cards {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 18px;
        }

        .quick-card {
          position: relative;

          min-width: 0;
          min-height: 250px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;

          padding: 27px 20px 20px;

          overflow: hidden;
          isolation: isolate;

          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 22px;

          color: #ffffff;
          text-decoration: none;
          text-align: center;

          box-shadow:
            0 14px 32px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .quick-card-blue {
          background:
            linear-gradient(
              145deg,
              #1265d8 0%,
              #0b4fb8 55%,
              #083c92 100%
            );
        }

        .quick-card-green {
          background:
            linear-gradient(
              145deg,
              #15966b 0%,
              #087553 55%,
              #075c45 100%
            );
        }

        .quick-card-purple {
          background:
            linear-gradient(
              145deg,
              #7654d8 0%,
              #5940ad 55%,
              #432e91 100%
            );
        }

        /* =========================
           محتوى البطاقة
        ========================= */

        .quick-card-main {
          width: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .quick-card-icon {
          width: 64px;
          height: 64px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 15px;

          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 18px;

          background: rgba(255, 255, 255, 0.12);

          color: #ffffff;

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 8px 18px rgba(0, 0, 0, 0.1);

          transition:
            transform 0.3s ease,
            background 0.3s ease,
            border-color 0.3s ease;
        }

        .quick-card-content {
          width: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;

          direction: rtl;
          text-align: center;
        }

        .quick-card-content h3 {
          margin: 0 0 7px;

          color: #ffffff;

          font-size: 20px;
          line-height: 1.35;
          font-weight: 900;
        }

        .quick-card-content p {
          width: 100%;
          max-width: 260px;

          margin: 0;

          color: rgba(255, 255, 255, 0.82);

          font-size: 13px;
          line-height: 1.7;

          text-align: center;
        }

        /* =========================
           الزر
        ========================= */

        .quick-card-button {
          width: 100%;
          min-height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 9px 14px;

          border-radius: 11px;

          color: #ffffff;

          font-size: 12px;
          font-weight: 900;

          text-align: center;

          box-shadow:
            0 7px 16px rgba(0, 0, 0, 0.16);

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            filter 0.25s ease;
        }

        .quick-card-blue .quick-card-button {
          background: #1475ee;
        }

        .quick-card-green .quick-card-button {
          background: #12a878;
        }

        .quick-card-purple .quick-card-button {
          background: #7957e6;
        }

        /* =========================
           الضوء
        ========================= */

        .quick-card-glow {
          position: absolute;

          top: -100px;
          right: -90px;

          width: 190px;
          height: 190px;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.08);

          filter: blur(30px);

          pointer-events: none;

          transition:
            transform 0.4s ease,
            opacity 0.4s ease;
        }

        /* =========================
           Hover
        ========================= */

        @media (hover: hover) and (pointer: fine) {
          .quick-card:hover {
            transform: translateY(-6px);

            border-color:
              rgba(255, 255, 255, 0.28);

            box-shadow:
              0 22px 42px rgba(0, 0, 0, 0.28),
              inset 0 1px 0
                rgba(255, 255, 255, 0.16);
          }

          .quick-card:hover .quick-card-icon {
            transform: translateY(-3px) scale(1.04);

            background: rgba(255, 255, 255, 0.19);

            border-color:
              rgba(255, 255, 255, 0.36);
          }

          .quick-card:hover .quick-card-button {
            transform: translateY(-2px);

            filter: brightness(1.08);

            box-shadow:
              0 10px 22px rgba(0, 0, 0, 0.22);
          }

          .quick-card:hover .quick-card-glow {
            transform: scale(1.3);
            opacity: 0.8;
          }
        }

        /* =========================
           الجوال
        ========================= */

        @media (max-width: 700px) {
          .quick-sections {
            padding: 28px 10px 25px;
          }

          .quick-heading {
            margin-bottom: 19px;
          }

          .quick-eyebrow {
            min-height: 25px;
            padding: 4px 11px;
            margin-bottom: 7px;

            font-size: 10px;
          }

          .quick-heading h2 {
            font-size: 22px;
            line-height: 1.35;
          }

          .quick-heading p {
            margin-top: 6px;
            font-size: 11px;
          }

          .quick-cards {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));

            gap: 8px;
          }

          .quick-card {
            min-height: 205px;

            padding: 16px 7px 10px;

            border-radius: 16px;
          }

          .quick-card-icon {
            width: 46px;
            height: 46px;

            margin-bottom: 9px;

            border-radius: 13px;
          }

          .quick-card-icon svg {
            width: 23px;
            height: 23px;
          }

          .quick-card-content h3 {
            margin-bottom: 5px;

            font-size: 12px;
            line-height: 1.4;
          }

          .quick-card-content p {
            max-width: 105px;

            font-size: 9.5px;
            line-height: 1.55;
          }

          .quick-card-button {
            min-height: 34px;

            padding: 6px 3px;

            border-radius: 8px;

            font-size: 8.5px;
            line-height: 1.25;
          }
        }

        /* =========================
           الجوالات الصغيرة
        ========================= */

        @media (max-width: 380px) {
          .quick-sections {
            padding-left: 7px;
            padding-right: 7px;
          }

          .quick-cards {
            gap: 6px;
          }

          .quick-card {
            min-height: 200px;

            padding: 15px 5px 9px;

            border-radius: 14px;
          }

          .quick-card-icon {
            width: 42px;
            height: 42px;

            margin-bottom: 8px;

            border-radius: 12px;
          }

          .quick-card-icon svg {
            width: 21px;
            height: 21px;
          }

          .quick-card-content h3 {
            font-size: 10.5px;
          }

          .quick-card-content p {
            max-width: 88px;

            font-size: 8.5px;
            line-height: 1.5;
          }

          .quick-card-button {
            min-height: 32px;

            font-size: 7.8px;
          }
        }

        /* =========================
           حركة أقل
        ========================= */

        @media (prefers-reduced-motion: reduce) {
          .quick-card,
          .quick-card-icon,
          .quick-card-button,
          .quick-card-glow {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  )
}