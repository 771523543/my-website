
'use client'

import { useState, type CSSProperties } from 'react'
import {
  GraduationCap,
  Eye,
  Target,
  ChevronDown,
  Sparkles,
  BookOpen,
  Code2,
  ShieldCheck,
  Smartphone,
  Lightbulb,
  Rocket,
} from 'lucide-react'

const items = [
  {
    number: '01',
    title: 'التعريف بمنصة هديل',
    subtitle: 'حلول طلابية وأكاديمية ورقمية',
    description:
      'منصة هديل هي منصة رقمية متكاملة متخصصة في تقديم الحلول والخدمات الطلابية والأكاديمية، وخدمات التطوير الرقمي والتصاميم. نسعى لتسهيل المسيرة التعليمية والمهنية للطلاب والباحثين والمؤسسات من خلال تقديم خدمات عالية الجودة، تتسم بالدقة والسرعة والاحترافية.',
    icon: GraduationCap,
    color: '#2459a9',
    tint: '#eaf1ff',
  },
  {
    number: '02',
    title: 'الرؤية',
    english: 'Vision',
    subtitle: 'طموح نحو الريادة والتميز',
    description:
      'أن نكون المنصة الأولى والرائدة في تقديم الخدمات الطلابية والأكاديمية الرقمية، والوجهة الموثوقة التي تمكّن الطلاب والباحثين من تحقيق النجاح والتميز الأكاديمي والمهني بكل سهولة وابتكار.',
    icon: Eye,
    color: '#7854c5',
    tint: '#f0eaff',
  },
  {
    number: '03',
    title: 'الرسالة',
    english: 'Mission',
    subtitle: 'نساندك في رحلتك التعليمية والرقمية',
    description:
      'تقديم خدمات أكاديمية ورقمية شاملة ومبتكرة، بأعلى معايير الجودة والدقة، لمساندة الطلاب والباحثين وصنّاع المحتوى في إنجاز أعمالهم، وتذليل العقبات التعليمية والتقنية أمامهم عبر بيئة موثوقة وفريق متخصص.',
    icon: Lightbulb,
    color: '#b77908',
    tint: '#fff4d6',
  },
]

const goals = [
  {
    title: 'تقديم دعم أكاديمي متميز',
    description:
      'مساعدة الطلاب والباحثين في إعداد وتنسيق البحوث والتقارير والعروض التقديمية وفق أفضل المعايير الأكاديمية.',
    icon: GraduationCap,
    color: '#2459a9',
    tint: '#eaf1ff',
  },
  {
    title: 'توفير حلول تقنية ورقمية',
    description:
      'تقديم خدمات الدعم التقني، وبرمجة وتصميم المواقع، والحلول الرقمية التي تلبي تطلعات مستخدمي المنصة.',
    icon: Code2,
    color: '#7854c5',
    tint: '#f0eaff',
  },
  {
    title: 'ضمان الجودة والدقة',
    description:
      'الالتزام بتسليم الأعمال في الأوقات المحددة وبأعلى درجات الدقة والاحترافية التي تسهم في رضا العملاء.',
    icon: ShieldCheck,
    color: '#168653',
    tint: '#e3f7ed',
  },
  {
    title: 'تسهيل التجربة الرقمية',
    description:
      'تطوير واجهات واستراتيجيات تواصل سلسة تضمن وصول المستخدم إلى الخدمة التي يحتاجها بأسرع وقت وأقل جهد.',
    icon: Smartphone,
    color: '#c16b32',
    tint: '#fff0e5',
  },
  {
    title: 'التطوير والابتكار المستمر',
    description:
      'التوسع في الخدمات المقدمة لمواكبة أحدث التقنيات والاتجاهات التعليمية والتقنية الحديثة.',
    icon: Rocket,
    color: '#167f91',
    tint: '#e3f7fa',
  },
]

export default function VisionMissionGoals() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section
      id="vision-mission-goals"
      className="section soft-section"
      dir="rtl"
    >
      <style jsx>{`
        .vmg-heading {
          max-width: 780px;
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
          max-width: 650px;
          margin: 0 auto;
          color: #69778b;
          font-size: 15px;
          line-height: 2;
        }

        .vmg-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .vmg-card {
          position: relative;
          min-width: 0;
          overflow: hidden;
          padding: 27px 23px 22px;
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
          gap: 11px;
          margin-bottom: 19px;
        }

        .vmg-icon {
          display: flex;
          width: 64px;
          height: 64px;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(36, 89, 169, 0.08);
          border-radius: 20px;
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
          margin: 0 0 7px;
          color: #1b2940;
          font-size: clamp(19px, 2vw, 23px);
          font-weight: 900;
          line-height: 1.7;
          text-align: center;
        }

        .vmg-english {
          display: block;
          margin-bottom: 8px;
          color: #8a96a8;
          font-size: 11px;
          font-weight: 700;
          direction: ltr;
        }

        .vmg-subtitle {
          display: block;
          margin-bottom: 13px;
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
          margin-top: 13px;
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

        .vmg-goals-heading {
          max-width: 700px;
          margin: 48px auto 25px;
          text-align: center;
        }

        .vmg-goals-heading h3 {
          margin: 12px 0 8px;
          color: #17243a;
          font-size: clamp(23px, 3vw, 30px);
          font-weight: 900;
          line-height: 1.6;
        }

        .vmg-goals-heading h3 span {
          color: #2459a9;
        }

        .vmg-goals-heading p {
          margin: 0;
          color: #69778b;
          font-size: 14px;
          line-height: 1.9;
        }

        .vmg-goals-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 17px;
        }

        .vmg-goal {
          min-width: 0;
          padding: 23px 20px 21px;
          border: 1px solid #e7ecf4;
          border-radius: 21px;
          background: #fff;
          box-shadow: 0 8px 24px rgba(24, 45, 78, 0.045);
          text-align: center;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
          --vmg-color: #2459a9;
          --vmg-tint: #eaf1ff;
        }

        .vmg-goal:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(24, 45, 78, 0.08);
        }

        .vmg-goal-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 55px;
          height: 55px;
          margin: 0 auto 15px;
          border-radius: 17px;
          background: var(--vmg-tint);
          color: var(--vmg-color);
        }

        .vmg-goal h4 {
          margin: 0 0 10px;
          color: #1b2940;
          font-size: 17px;
          font-weight: 900;
          line-height: 1.8;
          text-align: center;
        }

        .vmg-goal p {
          margin: 0;
          color: #647187;
          font-size: 13px;
          line-height: 2;
          text-align: center;
          overflow-wrap: anywhere;
        }

        .vmg-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 30px;
          color: #7b8799;
          font-size: 12px;
          line-height: 1.8;
          text-align: center;
        }

        .vmg-bottom :global(svg) {
          flex-shrink: 0;
          color: #2459a9;
        }

        @media (max-width: 900px) {
          .vmg-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .vmg-grid > :first-child {
            grid-column: 1 / -1;
          }

          .vmg-goals-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .vmg-heading {
            margin-bottom: 25px;
          }

          .vmg-heading p {
            font-size: 14px;
          }

          .vmg-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 15px;
          }

          .vmg-grid > :first-child {
            grid-column: auto;
          }

          .vmg-card {
            padding: 25px 19px 19px;
            border-radius: 21px;
          }

          .vmg-icon {
            width: 59px;
            height: 59px;
            border-radius: 18px;
          }

          .vmg-card h3 {
            font-size: 21px;
          }

          .vmg-description {
            font-size: 14px;
          }

          .vmg-goals-heading {
            margin-top: 37px;
          }

          .vmg-goals-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 14px;
          }

          .vmg-goal {
            padding: 22px 19px;
          }

          .vmg-bottom {
            align-items: flex-start;
            padding: 0 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vmg-card,
          .vmg-goal,
          .vmg-chevron {
            transition: none;
          }

          .vmg-card:hover,
          .vmg-goal:hover {
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
            التعريف بمنصة <span>هديل</span>
          </h2>

          <p>
            منصة رقمية متكاملة تجمع الخدمات الطلابية والأكاديمية
            والحلول الرقمية والتصاميم في تجربة واحدة.
          </p>
        </header>

        <div className="vmg-grid">
          {items.map((item, index) => {
            const Icon = item.icon
            const key = `item-${index}`
            const isExpanded = expanded === key

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
                      size={29}
                      strokeWidth={1.9}
                      aria-hidden="true"
                    />
                  </div>

                  <span className="vmg-number">
                    {item.number}
                  </span>
                </div>

                <h3>{item.title}</h3>

                {item.english && (
                  <span className="vmg-english">
                    {item.english}
                  </span>
                )}

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
                    setExpanded(isExpanded ? null : key)
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

        <header className="vmg-goals-heading">
          <span className="vmg-kicker">
            <Target size={16} aria-hidden="true" />
            خطتنا نحو التميز
          </span>

          <h3>
            أهدافنا <span>الاستراتيجية</span>
          </h3>

          <p>
            نعمل على تطوير خدماتنا وتحسين تجربة المستفيد من خلال
            أهداف واضحة تجمع بين الجودة والابتكار وسهولة الاستخدام.
          </p>
        </header>

        <div className="vmg-goals-grid">
          {goals.map((goal, index) => {
            const Icon = goal.icon
            const key = `goal-${index}`
            const isExpanded = expanded === key

            const goalStyle = {
              '--vmg-color': goal.color,
              '--vmg-tint': goal.tint,
            } as CSSProperties

            return (
              <article
                className="vmg-goal"
                key={goal.title}
                style={goalStyle}
              >
                <div className="vmg-goal-icon">
                  <Icon
                    size={27}
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                </div>

                <h4>{goal.title}</h4>

                <p>
                  {isExpanded
                    ? goal.description
                    : `${goal.description.slice(0, 95)}…`}
                </p>

                <button
                  className="vmg-more"
                  type="button"
                  onClick={() =>
                    setExpanded(isExpanded ? null : key)
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
            منصة هديل للخدمات الطلابية والأكاديمية والحلول الرقمية.
          </span>
        </div>
      </div>
    </section>
  )
}
