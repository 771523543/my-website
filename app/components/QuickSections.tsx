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
    <section className="quick-sections" aria-label="الأقسام الرئيسية">
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
                className="quick-card"
              >
                <span className="quick-card-number">
                  {card.number}
                </span>

                <span className="quick-card-icon">
                  <Icon size={28} strokeWidth={2} />
                </span>

                <span className="quick-card-content">
                  <span className="quick-card-title">
                    {card.title}
                  </span>

                  <span className="quick-card-description">
                    {card.description}
                  </span>
                </span>

                <span className="quick-card-arrow">
                  <ArrowLeft size={16} />
                </span>

                <span className="quick-card-shine" />
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
          letter-spacing: 0.2px;
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

        .quick-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 15px;
        }

        .quick-card {
          position: relative;
          min-width: 0;
          height: 185px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 25px 14px 20px;
          overflow: hidden;
          isolation: isolate;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 22px;
          background:
            linear-gradient(
              145deg,
              #1265d8 0%,
              #0b4fb8 48%,
              #083c92 100%
            );
          box-shadow:
            0 14px 32px rgba(0, 0, 0, 0.22),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
          color: #ffffff;
          text-decoration: none;
          text-align: center;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .quick-card-number {
          position: absolute;
          top: 10px;
          right: 13px;
          z-index: 2;
          color: rgba(255, 255, 255, 0.28);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .quick-card-icon {
          width: 57px;
          height: 57px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 0 7px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.13);
          color: #ffffff;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.12),
            0 8px 18px rgba(0, 0, 0, 0.1);
        }

        .quick-card-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          direction: rtl;
          text-align: center;
        }

        .quick-card-title {
          width: 100%;
          margin: 0 0 3px;
          color: #ffffff;
          font-size: 19px;
          line-height: 1.25;
          font-weight: 800;
          text-align: center;
        }

        .quick-card-description {
          width: 100%;
          max-width: 260px;
          margin: 0;
          color: rgba(255, 255, 255, 0.78);
          font-size: 12px;
          line-height: 1.45;
          text-align: center;
        }

        .quick-card-arrow {
          position: absolute;
          left: 14px;
          bottom: 13px;
          width: 27px;
          height: 27px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.09);
          color: rgba(255, 255, 255, 0.82);
        }

        .quick-card-shine {
          position: absolute;
          top: -70%;
          left: -35%;
          width: 45%;
          height: 220%;
          z-index: -1;
          transform: rotate(25deg);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.09),
            transparent
          );
          pointer-events: none;
        }

        @media (hover: hover) and (pointer: fine) {
          .quick-card:hover {
            transform: translateY(-5px);
            border-color: rgba(245, 194, 67, 0.42);
            box-shadow:
              0 20px 40px rgba(0, 0, 0, 0.28),
              0 0 0 1px rgba(245, 194, 67, 0.06),
              inset 0 1px 0 rgba(255, 255, 255, 0.14);
          }

          .quick-card:hover .quick-card-icon {
            border-color: rgba(245, 194, 67, 0.4);
            color: #f5c243;
            background: rgba(245, 194, 67, 0.12);
          }

          .quick-card:hover .quick-card-arrow {
            color: #f5c243;
            border-color: rgba(245, 194, 67, 0.3);
          }
        }

        @media (max-width: 700px) {
          .quick-sections {
            padding: 27px 10px 22px;
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
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 7px;
          }

          .quick-card {
            height: 154px;
            padding: 17px 6px 12px;
            border-radius: 15px;
          }

          .quick-card-number {
            top: 7px;
            right: 7px;
            font-size: 7px;
          }

          .quick-card-icon {
            width: 43px;
            height: 43px;
            margin-bottom: 5px;
            border-radius: 12px;
          }

          .quick-card-icon svg {
            width: 23px;
            height: 23px;
          }

          .quick-card-title {
            margin-bottom: 2px;
            font-size: 14px;
            line-height: 1.25;
          }

          .quick-card-description {
            max-width: 105px;
            font-size: 9px;
            line-height: 1.4;
          }

          .quick-card-arrow {
            left: 7px;
            bottom: 7px;
            width: 21px;
            height: 21px;
          }

          .quick-card-arrow svg {
            width: 12px;
            height: 12px;
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
            height: 148px;
            padding: 15px 4px 10px;
            border-radius: 13px;
          }

          .quick-card-icon {
            width: 39px;
            height: 39px;
            margin-bottom: 4px;
            border-radius: 11px;
          }

          .quick-card-icon svg {
            width: 21px;
            height: 21px;
          }

          .quick-card-title {
            font-size: 12px;
          }

          .quick-card-description {
            max-width: 90px;
            font-size: 8px;
          }

          .quick-card-arrow {
            display: none;
          }
        }
      `}
      </style>
    </section>
  )
}
