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
          padding: 34px 20px 30px;
          overflow: hidden;
          scroll-behavior: smooth;

          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(30, 111, 255, 0.14),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(0, 190, 255, 0.09),
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
          opacity: 0.18;

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

          background-size: 34px 34px;
        }

        .quick-sections-inner {
          position: relative;
          z-index: 1;
          width: min(1120px, 100%);
          margin: 0 auto;
        }

        /* العنوان */

        .quick-heading {
          margin: 0 auto 22px;
          text-align: center;
          direction: rtl;
        }

        .quick-eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          min-height: 27px;
          padding: 4px 12px;
          margin-bottom: 8px;

          border: 1px solid rgba(245, 194, 67, 0.32);
          border-radius: 999px;

          background: rgba(245, 194, 67, 0.08);
          color: #f5c243;

          font-size: 11px;
          font-weight: 800;
        }

        .quick-heading h2 {
          margin: 0;

          color: #ffffff;

          font-size: clamp(23px, 3vw, 31px);
          line-height: 1.25;
          font-weight: 900;
        }

        .quick-heading p {
          margin: 7px 0 0;

          color: rgba(255, 255, 255, 0.68);

          font-size: 13px;
          line-height: 1.5;
        }

        /* البطاقات */

        .quick-cards {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 15px;
        }

        .quick-card {
          position: relative;

          min-width: 0;
          height: 225px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;

          padding: 24px 16px 18px;

          overflow: hidden;
          isolation: isolate;

          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 22px;

          color: #ffffff;
          text-decoration: none;
          text-align: center;

          box-shadow:
            0 14px 32px rgba(0, 0, 0, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        /* خلفية البطاقات */

        .quick-card-blue {
          background:
            linear-gradient(
              145deg,
              #1265d8 0%,
              #0b4fb8 50%,
              #083c92 100%
            );
        }

        .quick-card-green {
          background:
            linear-gradient(
              145deg,
              #15966b 0%,
              #087553 50%,
              #075c45 100%
            );
        }

        .quick-card-purple {
          background:
            linear-gradient(
              145deg,
              #7654d8 0%,
              #5940ad 50%,
              #432e91 100%
            );
        }

        /* الأيقونة */

        .quick-card-icon {
          width: 60px;
          height: 60px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 12px;

          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 17px;

          background: rgba(255, 255, 255, 0.13);

          color: #ffffff;

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 8px 18px rgba(0, 0, 0, 0.1);

          transition:
            transform 0.3s ease,
            background 0.3s ease,
            border-color 0.3s ease;
        }

        /* النص */

        .quick-card-content {
          width: 100%;

          display: flex;
          flex-direction: column;
          align-items: center;

          direction: rtl;
          text-align: center;
        }

        .quick-card-content h3 {
          width: 100%;

          margin: 0 0 5px;

          color: #ffffff;

          font-size: 20px;
          line-height: 1.25;
          font-weight: 800;

          text-align: center;
        }

        .quick-card-content p {
          width: 100%;
          max-width: 270px;

          margin: 0;

          color: rgba(255, 255, 255, 0.8);

          font-size: 12px;
          line-height: 1.5;

          text-align: center;
        }

        /* الزر */

        .quick-card-button {
          position: absolute;

          left: 16px;
          right: 16px;
          bottom: 17px;

          min-height: 39px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 8px 14px;

          border-radius: 11px;

          color: #ffffff;

          font-size: 12px;
          font-weight: 800;

          text-align: center;

          box-shadow:
            0 7px 16px rgba(0, 0, 0, 0.16);

          transition:
            transform 0.25s ease,
            background 0.25s ease,
            box-shadow 0.25s ease;
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

        /* تأثير ضوء داخلي */

        .quick-card-glow {
          position: absolute;

          top: -100px;
          right: -90px;

          width: 190px;
          height: 190px;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.1);

          filter: blur(30px);

          pointer-events: none;

          transition:
            transform 0.4s ease,
            opacity 0.4s ease;
        }

        /* Hover */

        @media (hover: hover) and (pointer: fine) {
          .quick-card:hover {
            transform: translateY(-7px);

            border-color: rgba(255, 255, 255, 0.3);

            box-shadow:
              0 22px 42px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.18);
          }

          .quick-card:hover .quick-card-icon {
            transform: translateY(-3px) scale(1.05);

            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.4);
          }

          .quick-card:hover .quick-card-button {
            transform: translateY(-2px);

            box-shadow:
              0 10px 22px rgba(0, 0, 0, 0.24);
          }

          .quick-card:hover .quick-card-glow {
            transform: scale(1.35);
            opacity: 0.9;
          }
        }

        /* الجوال */

        @media (max-width: 700px) {
          .quick-sections {
            padding: 27px 9px 22px;
          }

          .quick-heading {
            margin-bottom: 16px;
          }

          .quick-eyebrow {
            min-height: 24px;
            padding: 3px 10px;
            margin-bottom: 6px;

            font-size: 9px;
          }

          .quick-heading h2 {
            font-size: 21px;
          }

          .quick-heading p {
            margin-top: 5px;
            font-size: 10px;
          }

          .quick-cards {
            grid-template-columns:
              repeat(3, minmax(0, 1fr));

            gap: 7px;
          }

          .quick-card {
            height: 181px;

            padding: 16px 5px 10px;

            border-radius: 15px;
          }

          .quick-card-icon {
            width: 42px;
            height: 42px;

            margin-bottom: 7px;

            border-radius: 12px;
          }

          .quick-card-icon svg {
            width: 22px;
            height: 22px;
          }

          .quick-card-content h3 {
            margin-bottom: 3px;

            font-size: 13px;
            line-height: 1.25;
          }

          .quick-card-content p {
            max-width: 105px;

            font-size: 8.5px;
            line-height: 1.4;
          }

          .quick-card-button {
            left: 5px;
            right: 5px;
            bottom: 8px;

            min-height: 30px;

            padding: 5px 3px;

            border-radius: 8px;

            font-size: 8px;
            line-height: 1.2;
          }
        }

        /* الشاشات الصغيرة جدًا */

        @media (max-width: 380px) {
          .quick-sections {
            padding-left: 6px;
            padding-right: 6px;
          }

          .quick-cards {
            gap: 5px;
          }

          .quick-card {
            height: 176px;

            padding: 14px 3px 9px;

            border-radius: 13px;
          }

          .quick-card-icon {
            width: 38px;
            height: 38px;

            margin-bottom: 6px;

            border-radius: 10px;
          }

          .quick-card-icon svg {
            width: 20px;
            height: 20px;
          }

          .quick-card-content h3 {
            font-size: 11px;
          }

          .quick-card-content p {
            max-width: 88px;

            font-size: 7.5px;
          }

          .quick-card-button {
            left: 3px;
            right: 3px;
            bottom: 7px;

            min-height: 28px;

            font-size: 7px;
          }
        }

        /* دعم الانتقال السلس */

        :global(html) {
          scroll-behavior: smooth;
        }

        :global(#packages) {
          scroll-margin-top: 90px;
        }

        :global(#services) {
          scroll-margin-top: 90px;
        }

        :global(#previous-works) {
          scroll-margin-top: 90px;
        }
      `}
      </style>
    </section>
  )
}