
'use client'

import { useState, type CSSProperties } from 'react'
import {
  GraduationCap,
  Eye,
  Send,
  Target,
  ChevronDown,
  Sparkles,
  BookOpen,
} from 'lucide-react'

const items = [
  {
    number: '01',
    title: 'التعريف بمنصة هديل',
    subtitle: 'خدمات طلابية في مكان واحد',
    description:
      'منصة هديل هي منصة للخدمات الطلابية، تهدف إلى تسهيل وصول الطلاب والطالبات إلى خدمات أكاديمية وتقنية متنوعة من خلال تجربة رقمية منظمة وسهلة الاستخدام. تجمع المنصة الخدمات في مكان واحد، وتساعد المستفيدين على التعرف على الخدمات المتاحة وتقديم طلباتهم ومتابعتها بسهولة ووضوح.',
    icon: GraduationCap,
    color: '#2459a9',
    tint: '#eaf1ff',
  },
  {
    number: '02',
    title: 'رؤيتنا',
    subtitle: 'طموح نحو تجربة طلابية أفضل',
    description:
      'أن تكون منصة هديل وجهة موثوقة ومتميزة في تقديم الخدمات الطلابية في المملكة العربية السعودية، وأن تسهم في تطوير تجربة الطلاب والطالبات من خلال حلول رقمية سهلة وخدمات متنوعة والاهتمام بالجودة والابتكار والتحسين المستمر.',
    icon: Eye,
    color: '#7854c5',
    tint: '#f0eaff',
  },
  {
    number: '03',
    title: 'رسالتنا',
    subtitle: 'نفهم احتياجاتك ونسعى لخدمتك',
    description:
      'تقديم خدمات طلابية متنوعة تلبي احتياجات الطلاب والطالبات، من خلال تجربة استخدام واضحة، وتواصل فعّال، واهتمام بجودة المخرجات والالتزام بالمتطلبات المتفق عليها، بما يساعد على تسهيل الوصول إلى الخدمات وتوفير تجربة أكثر مرونة وراحة.',
    icon: Send,
    color: '#b77908',
    tint: '#fff4d6',
  },
  {
    number: '04',
    title: 'أهدافنا',
    subtitle: 'خطوات عملية نحو التميز',
    description:
      'تسهيل الوصول إلى الخدمات الطلابية، وتوفير خدمات أكاديمية وتقنية متنوعة في منصة واحدة، وتحسين تجربة المستخدم على الجوال والحاسوب، والاهتمام بجودة الأعمال المقدمة، وتوضيح خطوات طلب الخدمة ومتابعتها، وبناء علاقة قائمة على الثقة والوضوح والاهتمام باحتياجات المستفيدين.',
    icon: Target,
    color: '#168653',
    tint: '#e3f7ed',
  },
]

export default function VisionMissionGoals() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section
      id="vision-mission-goals"
      className="section soft-section"
      dir="rtl"
    >
      <style jsx>{`
        .vmg-heading {
          max-width: 760px;
          margin: 0 auto 38px;
          text-align: center;
        }

        .vmg-kicker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 16px;
          border: 1px solid #e0eaff;
          border-radius: 999px;
          background: #f0f5ff;
          color: #2459a9;
          font-size: 13px;
          font-weight: 800;
        }

        .vmg-heading h2 {
          margin: 17px 0 12px;
          color: #17243a;
          font-size: clamp(27px, 4vw, 40px);
          font-weight: 900;
          line-height: 1.5;
        }

        .vmg-heading h2 span {
          color: #2459a9;
        }

        .vmg-heading p {
          max-width: 620px;
          margin: 0 auto;
          color: #69778b;
          font-size: 15px;
          line-height: 2;
        }

        .vmg-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .vmg-card {
          position: relative;
          min-width: 0;
          overflow: hidden;
          padding: 28px 24px 22px;
          border: 1px solid #e7ecf4;
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 10px 28px rgba(24, 45, 78, 0.055);
          text-align: center;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
          --vmg-color: #2459a9;
          --vmg-tint: #eaf1ff;
        }

        .vmg-card::before {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          height: 4px;
          background: var(--vmg-color);
          content: '';
        }

        .vmg-card:hover {
          transform: translateY(-4px);
          border-color: #dce5f2;
          box-shadow: 0 17px 36px rgba(24, 45, 78, 0.09);
        }

        .vmg-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .vmg-icon {
          display: flex;
          width: 68px;
          height: 68px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(36, 89, 169, 0.08);
          border-radius: 21px;
          background: var(--vmg-tint);
          color: var(--vmg-color);
          box-shadow: 0 5px 15px rgba(24, 45, 78, 0.04);
        }

        .vmg-number {
          color: #a0aabb;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
        }

        .vmg-card h3 {
          margin: 0 0 10px;
          color: #1b2940;
          font-size: clamp(20px, 2.5vw, 24px);
          font-weight: 900;
          line-height: 1.6;
          text-align: center;
        }

        .vmg-subtitle {
          display: block;
          margin-bottom: 14px;
          color: var(--vmg-color);
          font-size: 13px;
          font-weight: 800;
          text-align: center;
        }

        .vmg-description {
          margin: 0;
          color: #647187;
          font-size: 14px;
          line-height: 2.05;
          text-align: center;
          overflow-wrap: anywhere;
        }

        .vmg-more {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 14px;
          padding: 9px 0;
          border: 0;
          border-radius: 6px;
          background: transparent;
          color: var(--vmg-color);
          font: inherit;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
        }

        .vmg-more:focus-visible {
          outline: 2px solid var(--vmg-color);
          outline-offset: 4px;
        }

        .vmg-chevron {
          transition: transform 0.2s ease;
        }

        .vmg-chevron-open {
          transform: rotate(180deg);
        }

        .vmg-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 28px;
          color: #7b8799;
          font-size: 12px;
          line-height: 1.8;
          text-align: center;
        }

        .vmg-bottom :global(svg) {
          flex-shrink: 0;
          color: #2459a9;
        }

        @media (max-width: 650px) {
          .vmg-heading {
            margin-bottom: 25px;
          }

          .vmg-heading p {
            font-size: 14px;
          }

          .vmg-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
          }

          .vmg-card {
            padding: 25px 19px 19px;
            border-radius: 21px;
          }

          .vmg-icon {
            width: 60px;
            height: 60px;
            border-radius: 19px;
          }

          .vmg-card h3 {
            font-size: 21px;
          }

          .vmg-description {
            font-size: 14px;
          }

          .vmg-bottom {
            align-items: flex-start;
            padding: 0 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vmg-card,
          .vmg-chevron {
            transition: none;
          }

          .vmg-card:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="container">
        <header className="vmg-heading">
          <span className="vmg-kicker">
            <Sparkles size={16} aria-hidden="true" />
            هويتنا وطموحنا
          </span>

          <h2>
            تعرّف على <span>منصة هديل</span>
          </h2>

          <p>
            منصتنا، رؤيتنا، رسالتنا وأهدافنا؛
            خطواتنا نحو تجربة طلابية أسهل وأكثر تنظيمًا.
          </p>
        </header>

        <div className="vmg-grid">
          {items.map((item, index) => {
            const Icon = item.icon
            const isExpanded = expanded === index

            const cardStyle = {
              '--vmg-color': item.color,
              '--vmg-tint': item.tint,
            } as CSSProperties

            return (
              <article
                className="vmg-card"
                key={item.title}
                style={cardStyle}
              >
                <div className="vmg-top">
                  <div className="vmg-icon">
                    <Icon
                      size={30}
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="vmg-number">
                    {item.number}
                  </span>
                </div>

                <h3>{item.title}</h3>

                <span className="vmg-subtitle">
                  {item.subtitle}
                </span>

                <p className="vmg-description">
                  {isExpanded
                    ? item.description
                    : `${item.description.slice(0, 125)}…`}
                </p>

                <button
                  className="vmg-more"
                  type="button"
                  onClick={() =>
                    setExpanded(isExpanded ? null : index)
                  }
                  aria-expanded={isExpanded}
                >
                  {isExpanded ? 'عرض أقل' : 'اقرأ المزيد'}

                  <ChevronDown
                    size={16}
                    className={
                      isExpanded
                        ? 'vmg-chevron vmg-chevron-open'
                        : 'vmg-chevron'
                    }
                    aria-hidden="true"
                  />
                </button>
              </article>
            )
          })}
        </div>

        <div className="vmg-bottom">
          <BookOpen size={16} aria-hidden="true" />
          <span>
            منصة هديل للخدمات الطلابية — نهتم بتجربتك
            ونسعى إلى تسهيل وصولك إلى الخدمات.
          </span>
        </div>
      </div>
    </section>
  )
}
