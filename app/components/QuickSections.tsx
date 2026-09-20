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
    <section
      className="quick-sections"
      aria-label="استكشف منصة هديل"
    >
      {/* الخلفية */}
      <div
        className="quick-background"
        aria-hidden="true"
      >
        <div className="quick-glow quick-glow-one" />
        <div className="quick-glow quick-glow-two" />
        <div className="quick-grid" />
      </div>

      <div className="quick-container">

        {/* العنوان */}
        <div className="quick-heading">
          <span className="quick-eyebrow">
            منصة هديل
          </span>

          <h2>
            كل ما تحتاجه{' '}
            <span>في مكان واحد</span>
          </h2>

          <p>
            خدمات أكاديمية، باقات مميزة، وأعمال نفتخر بها
          </p>
        </div>

        {/* البطاقات */}
        <div className="quick-cards">
          {cards.map((card) => {
            const Icon = card.icon

            return (
              <Link
                key={card.title}
                href={card.href}
                className="quick-card"
              >
                {/* رقم البطاقة */}
                <span className="quick-card-number">
                  {card.number}
                </span>

                {/* الأيقونة */}
                <div className="quick-card-icon">
                  <Icon
                    size={30}
                    strokeWidth={1.9}
                  />
                </div>

                {/* النص */}
                <div className="quick-card-content">
                  <h3>{card.title}</h3>

                  <p>{card.description}</p>
                </div>

                {/* السهم */}
                <span className="quick-card-arrow">
                  <ArrowLeft size={16} />
                </span>

                {/* اللمعة */}
                <span
                  className="quick-card-shine"
                  aria-hidden="true"
                />
              </Link>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        /* =========================================
           القسم الرئيسي
        ========================================= */

        .quick-sections {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          padding: 42px 20px 40px;

          background:
            radial-gradient(
              circle at 12% 25%,
              rgba(37, 99, 235, 0.27),
              transparent 34%
            ),
            radial-gradient(
              circle at 88% 75%,
              rgba(14, 165, 233, 0.18),
              transparent 34%
            ),
            linear-gradient(
              135deg,
              #06142f 0%,
              #0a2454 48%,
              #071a3b 100%
            );
        }

        /* =========================================
           الخلفية
        ========================================= */

        .quick-background {
          position: absolute;
          inset: 0;

          pointer-events: none;
          z-index: -1;
        }

        .quick-grid {
          position: absolute;
          inset: 0;

          opacity: 0.08;

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

          background-size: 44px 44px;
        }

        .quick-glow {
          position: absolute;

          width: 340px;
          height: 340px;

          border-radius: 50%;

          filter: blur(75px);

          opacity: 0.18;
        }

        .quick-glow-one {
          top: -180px;
          right: -80px;

          background: #2563eb;
        }

        .quick-glow-two {
          bottom: -190px;
          left: -80px;

          background: #0ea5e9;
        }

        /* =========================================
           الحاوية
        ========================================= */

        .quick-container {
          width: min(1080px, 100%);
          margin: 0 auto;
        }

        /* =========================================
           عنوان القسم
        ========================================= */

        .quick-heading {
          text-align: center;

          margin-bottom: 25px;
        }

        .quick-eyebrow {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          padding: 5px 13px;

          margin-bottom: 8px;

          border:
            1px solid
            rgba(246, 215, 122, 0.32);

          border-radius: 999px;

          background:
            rgba(246, 215, 122, 0.07);

          color: #f6d77a;

          font-size: 12px;
          font-weight: 700;
        }

        .quick-heading h2 {
          margin: 0;

          color: #ffffff;

          font-size: clamp(
            25px,
            3.5vw,
            37px
          );

          line-height: 1.2;

          font-weight: 800;
        }

        .quick-heading h2 span {
          color: #f4d477;
        }

        .quick-heading p {
          margin: 7px 0 0;

          color:
            rgba(255, 255, 255, 0.67);

          font-size: 14px;
        }

        /* =========================================
           البطاقات
        ========================================= */

        .quick-cards {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 15px;
        }

        /* =========================================
           البطاقة
        ========================================= */

        .quick-card {
          position: relative;

          min-width: 0;

          height: 185px;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          padding: 20px 14px;

          overflow: hidden;
          isolation: isolate;

          text-decoration: none;

          text-align: center;

          border:
            1px solid
            rgba(255, 255, 255, 0.15);

          border-radius: 20px;

          background:
            linear-gradient(
              145deg,
              rgba(37, 99, 235, 0.97),
              rgba(13, 54, 130, 0.98)
            );

          box-shadow:
            0 13px 30px
              rgba(0, 0, 0, 0.22),
            inset 0 1px 0
              rgba(255, 255, 255, 0.13);

          transition:
            transform 0.28s ease,
            box-shadow 0.28s ease,
            border-color 0.28s ease;
        }

        .quick-card::before {
          content: '';

          position: absolute;

          width: 150px;
          height: 150px;

          top: -90px;
          right: -70px;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.07);

          z-index: -1;
        }

        .quick-card::after {
          content: '';

          position: absolute;
          inset: 0;

          border-radius: inherit;

          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.08),
              transparent 40%,
              transparent 70%,
              rgba(246, 215, 122, 0.06)
            );

          pointer-events: none;

          z-index: -1;
        }

        /* حركة بسيطة للكمبيوتر فقط */
        @media (hover: hover) and (pointer: fine) {
          .quick-card:hover {
            transform: translateY(-5px);

            border-color:
              rgba(246, 215, 122, 0.55);

            box-shadow:
              0 20px 38px
                rgba(0, 0, 0, 0.28),
              0 0 20px
                rgba(37, 99, 235, 0.22);
          }
        }

        /* =========================================
           رقم البطاقة
        ========================================= */

        .quick-card-number {
          position: absolute;

          top: 12px;
          right: 14px;

          color:
            rgba(255, 255, 255, 0.3);

          font-size: 10px;

          font-weight: 800;

          letter-spacing: 1px;
        }

        /* =========================================
           الأيقونة
        ========================================= */

        .quick-card-icon {
          width: 57px;
          height: 57px;

          flex-shrink: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          margin-bottom: 10px;

          border:
            1px solid
            rgba(255, 255, 255, 0.22);

          border-radius: 16px;

          background:
            rgba(255, 255, 255, 0.13);

          color: #ffffff;

          box-shadow:
            0 8px 18px
              rgba(0, 0, 0, 0.15),
            inset 0 1px 0
              rgba(255, 255, 255, 0.18);

          transition:
            transform 0.28s ease,
            background 0.28s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .quick-card:hover .quick-card-icon {
            transform: scale(1.06);

            background:
              rgba(255, 255, 255, 0.18);
          }
        }

        /* =========================================
           النص — كله في المنتصف
        ========================================= */

        .quick-card-content {
          width: 100%;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          direction: rtl;

          text-align: center;
        }

        .quick-card-content h3 {
          width: 100%;

          margin: 0 0 5px;

          color: #ffffff;

          font-size: 19px;

          line-height: 1.25;

          font-weight: 800;

          text-align: center;
        }

        .quick-card-content p {
          width: 100%;

          max-width: 260px;

          margin: 0 auto;

          color:
            rgba(255, 255, 255, 0.78);

          font-size: 12px;

          line-height: 1.5;

          text-align: center;
        }

        /* =========================================
           السهم
        ========================================= */

        .quick-card-arrow {
          position: absolute;

          left: 13px;
          bottom: 13px;

          width: 30px;
          height: 30px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.09);

          color: #ffffff;

          transition:
            transform 0.28s ease,
            color 0.28s ease,
            background 0.28s ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .quick-card:hover .quick-card-arrow {
            transform: translateX(-4px);

            color: #f6d77a;

            background:
              rgba(246, 215, 122, 0.16);
          }
        }

        /* =========================================
           اللمعة
        ========================================= */

        .quick-card-shine {
          position: absolute;

          top: 0;
          left: -120%;

          width: 55%;
          height: 100%;

          transform: skewX(-18deg);

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.08),
              transparent
            );

          transition:
            left 0.65s ease;

          pointer-events: none;
        }

        @media (hover: hover) and (pointer: fine) {
          .quick-card:hover .quick-card-shine {
            left: 150%;
          }
        }

        /* =========================================
           الجوال
           الثلاث بطاقات تبقى بجانب بعضها
        ========================================= */

        @media (max-width: 700px) {
          .quick-sections {
            padding: 32px 9px 32px;
          }

          .quick-heading {
            margin-bottom: 19px;
          }

          .quick-eyebrow {
            padding: 4px 11px;

            margin-bottom: 7px;

            font-size: 10px;
          }

          .quick-heading h2 {
            font-size: 23px;
          }

          .quick-heading p {
            margin-top: 5px;

            font-size: 11px;
          }

          .quick-cards {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));

            gap: 7px;
          }

          .quick-card {
            height: 154px;

            padding: 15px 6px;

            border-radius: 15px;
          }

          .quick-card-number {
            top: 8px;
            right: 9px;

            font-size: 8px;
          }

          .quick-card-icon {
            width: 43px;
            height: 43px;

            margin-bottom: 8px;

            border-radius: 12px;
          }

          .quick-card-icon svg {
            width: 23px;
            height: 23px;
          }

          .quick-card-content h3 {
            margin-bottom: 4px;

            font-size: 14px;

            line-height: 1.25;

            text-align: center;
          }

          .quick-card-content p {
            max-width: 105px;

            font-size: 9px;

            line-height: 1.45;

            text-align: center;
          }

          .quick-card-arrow {
            width: 24px;
            height: 24px;

            left: 7px;
            bottom: 7px;
          }

          .quick-card-arrow svg {
            width: 13px;
            height: 13px;
          }
        }

        /* =========================================
           الشاشات الصغيرة جدًا
        ========================================= */

        @media (max-width: 380px) {
          .quick-sections {
            padding-left: 6px;
            padding-right: 6px;
          }

          .quick-cards {
            gap: 5px;
          }

          .quick-card {
            height: 145px;

            padding-left: 4px;
            padding-right: 4px;

            border-radius: 13px;
          }

          .quick-card-icon {
            width: 40px;
            height: 40px;

            margin-bottom: 7px;
          }

          .quick-card-icon svg {
            width: 21px;
            height: 21px;
          }

          .quick-card-content h3 {
            font-size: 12px;
          }

          .quick-card-content p {
            max-width: 90px;

            font-size: 8px;

            line-height: 1.4;
          }

          .quick-card-arrow {
            width: 21px;
            height: 21px;

            left: 5px;
            bottom: 5px;
          }

          .quick-card-arrow svg {
            width: 11px;
            height: 11px;
          }
        }

        /* =========================================
           تقليل الحركة
        ========================================= */

        @media (prefers-reduced-motion: reduce) {
          .quick-card,
          .quick-card-icon,
          .quick-card-arrow,
          .quick-card-shine {
            transition: none;
          }
        }
      `}
      </style>
    </section>
  )
}