
'use client'

import { useState } from 'react'
import {
  GraduationCap,
  Eye,
  Lightbulb,
  Target,
  Code2,
  ShieldCheck,
  Smartphone,
  Rocket,
  ChevronDown,
  Sparkles,
  BookOpen,
} from 'lucide-react'

const sections = [
  {
    number: '01',
    title: 'الرؤية',
    english: 'VISION',
    short: 'الريادة في الخدمات الطلابية والأكاديمية الرقمية.',
    description:
      'أن نكون المنصة الأولى والرائدة في تقديم الخدمات الطلابية والأكاديمية الرقمية، والوجهة الموثوقة التي تمكّن الطلاب والباحثين من تحقيق النجاح والتميز الأكاديمي والمهني بكل سهولة وابتكار.',
    icon: Eye,
    color: '#2455c4',
    tint: '#e8f1ff',
  },
  {
    number: '02',
    title: 'الرسالة',
    english: 'MISSION',
    short: 'خدمات شاملة ومبتكرة بجودة واحترافية.',
    description:
      'تقديم خدمات أكاديمية ورقمية شاملة ومبتكرة، بأعلى معايير الجودة والدقة، لمساندة الطلاب والباحثين وصنّاع المحتوى في إنجاز أعمالهم، وتذليل العقبات التعليمية والتقنية أمامهم عبر بيئة موثوقة وفريق متخصص.',
    icon: Lightbulb,
    color: '#167b7b',
    tint: '#e5f5f3',
  },
]

const goals = [
  {
    title: 'تقديم دعم أكاديمي متميز',
    short: 'مساندة الطلاب والباحثين في أعمالهم الأكاديمية.',
    description:
      'مساعدة الطلاب والباحثين في إعداد وتنسيق البحوث والتقارير والعروض التقديمية وفق أفضل المعايير الأكاديمية.',
    icon: GraduationCap,
    color: '#2455c4',
    tint: '#e8f1ff',
  },
  {
    title: 'توفير حلول تقنية ورقمية',
    short: 'خدمات تقنية وحلول رقمية متطورة.',
    description:
      'تقديم خدمات الدعم التقني، وبرمجة وتصميم المواقع، والحلول الرقمية التي تلبي تطلعات مستخدمي المنصة.',
    icon: Code2,
    color: '#7355c7',
    tint: '#f0eaff',
  },
  {
    title: 'ضمان الجودة والدقة',
    short: 'عناية بالتفاصيل والتزام بالمواعيد.',
    description:
      'الالتزام بتسليم الأعمال في الأوقات المحددة وبأعلى درجات الدقة والاحترافية التي تسهم في رضا العملاء.',
    icon: ShieldCheck,
    color: '#168653',
    tint: '#e3f7ed',
  },
  {
    title: 'تسهيل التجربة الرقمية',
    short: 'الوصول إلى الخدمة بأقل جهد.',
    description:
      'تطوير واجهات واستراتيجيات تواصل سلسة تضمن وصول المستخدم إلى الخدمة التي يحتاجها بأسرع وقت وأقل جهد.',
    icon: Smartphone,
    color: '#c16b32',
    tint: '#fff0e5',
  },
  {
    title: 'التطوير والابتكار المستمر',
    short: 'مواكبة التطورات التعليمية والتقنية.',
    description:
      'التوسع في الخدمات المقدمة لمواكبة أحدث التقنيات والاتجاهات التعليمية والتقنية الحديثة.',
    icon: Rocket,
    color: '#167f91',
    tint: '#e3f7fa',
  },
]

function MoreButton({
  open,
  onClick,
}: {
  open: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className="vmg-more"
      onClick={onClick}
      aria-expanded={open}
    >
      <span>{open ? 'عرض أقل' : 'اعرف أكثر'}</span>
      <ChevronDown
        size={16}
        className={open ? 'vmg-chevron is-open' : 'vmg-chevron'}
      />
    </button>
  )
}

export default function VisionMissionGoals() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section
      id="vision-mission-goals"
      className="section soft-section reveal-section"
      data-reveal
      dir="rtl"
    >
      <style jsx>{`
        .vmg-heading {
          max-width: 700px;
          margin: 0 auto 34px;
          text-align: center;
        }

        .vmg-kicker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #2455c4;
          font-size: 12px;
          font-weight: 800;
        }

        .vmg-heading h2 {
          margin: 10px 0 12px;
          color: #17233d;
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 900;
          line-height: 1.4;
          letter-spacing: -1px;
        }

        .vmg-heading h2 em,
        .vmg-intro-content h3 em,
        .vmg-block-heading h3 em {
          color: #2455c4;
          font-style: normal;
        }

        .vmg-heading > p {
          margin: 0;
          color: #697791;
          font-size: 13px;
          line-height: 1.9;
        }

        .vmg-intro {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          align-items: center;
          gap: 35px;
          margin-bottom: 22px;
          padding: 27px;
          overflow: hidden;
          border: 1px solid #e4ebf4;
          border-radius: 26px;
          background: #fff;
          box-shadow: 0 14px 35px rgba(23, 35, 61, 0.065);
        }

        .vmg-intro-visual {
          position: relative;
          min-height: 250px;
          display: grid;
          place-items: center;
          overflow: hidden;
          border-radius: 22px;
          background: linear-gradient(145deg, #e8f1ff, #f5f9ff);
        }

        .vmg-glow {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: #2455c4;
          opacity: 0.08;
          filter: blur(2px);
        }

        .vmg-emblem {
          position: relative;
          z-index: 1;
          display: flex;
          width: 155px;
          height: 155px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          border-radius: 27px 27px 27px 9px;
          background: linear-gradient(145deg, #2d66df, #2455c4);
          color: #fff;
          box-shadow: 0 20px 42px rgba(36, 85, 196, 0.25);
          transform: rotate(-4deg);
          transition: transform 0.3s ease;
        }

        .vmg-intro:hover .vmg-emblem {
          transform: rotate(-1deg) translateY(-5px);
        }

        .vmg-emblem span {
          font-size: 21px;
          font-weight: 900;
          line-height: 1.4;
          text-align: center;
        }

        .vmg-gold-badge {
          position: absolute;
          right: 18px;
          bottom: 17px;
          padding: 9px 14px;
          border-radius: 999px;
          background: #f7c25e;
          color: #17233d;
          font-size: 11px;
          font-weight: 900;
          box-shadow: 0 9px 20px rgba(23, 35, 61, 0.12);
        }

        .vmg-intro-content {
          min-width: 0;
        }

        .vmg-intro-content h3 {
          margin: 12px 0 14px;
          color: #17233d;
          font-size: clamp(25px, 3vw, 36px);
          font-weight: 900;
          line-height: 1.5;
        }

        .vmg-intro-content > p {
          margin: 0;
          color: #697791;
          font-size: 14px;
          line-height: 2.1;
        }

        .vmg-block {
          min-width: 0;
          padding: 25px;
          border: 1px solid #e4ebf4;
          border-radius: 24px;
          background: #fff;
          box-shadow: 0 12px 30px rgba(23, 35, 61, 0.055);
        }

        .vmg-block-heading {
          max-width: 650px;
          margin: 0 auto 22px;
          text-align: center;
        }

        .vmg-block-heading h3 {
          margin: 10px 0 8px;
          color: #17233d;
          font-size: clamp(23px, 3vw, 30px);
          font-weight: 900;
          line-height: 1.5;
        }

        .vmg-block-heading > p {
          margin: 0;
          color: #697791;
          font-size: 12px;
          line-height: 1.9;
        }

        .vmg-vision-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
          margin-bottom: 22px;
        }

        .vmg-card {
          position: relative;
          min-width: 0;
          min-height: 230px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 21px;
          overflow: hidden;
          border: 1px solid #e3ebf5;
          border-radius: 19px;
          background: linear-gradient(145deg, #f8fbff, #f4f8fd);
          text-align: center;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
          --vmg-color: #2455c4;
          --vmg-tint: #e8f1ff;
        }

        .vmg-card::before {
          position: absolute;
          top: -45px;
          right: -45px;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: var(--vmg-color);
          opacity: 0.045;
          content: '';
        }

        .vmg-card:hover {
          transform: translateY(-5px);
          border-color: rgba(36, 85, 196, 0.18);
          box-shadow: 0 15px 28px rgba(23, 35, 61, 0.09);
        }

        .vmg-card-top {
          position: relative;
          z-index: 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .vmg-number {
          color: #dba33e;
          font-size: 11px;
          font-weight: 900;
        }

        .vmg-icon {
          display: grid;
          width: 58px;
          height: 58px;
          place-items: center;
          border: 1px solid rgba(36, 85, 196, 0.1);
          border-radius: 17px;
          background: linear-gradient(145deg, var(--vmg-tint), #fff);
          color: var(--vmg-color);
          box-shadow: 0 9px 20px rgba(36, 85, 196, 0.08);
          transition: transform 0.3s ease;
        }

        .vmg-card:hover .vmg-icon,
        .vmg-goal:hover .vmg-icon {
          transform: translateY(-3px) scale(1.04);
        }

        .vmg-card h4 {
          position: relative;
          z-index: 1;
          margin: 15px 0 7px;
          color: #17233d;
          font-size: 20px;
          font-weight: 900;
          line-height: 1.6;
        }

        .vmg-english {
          margin-bottom: 8px;
          color: #8a96a8;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          direction: ltr;
        }

        .vmg-short {
          position: relative;
          z-index: 1;
          margin: 0;
          color: #697791;
          font-size: 12px;
          line-height: 1.9;
        }

        .vmg-description {
          position: relative;
          z-index: 1;
          margin: 10px 0 0;
          color: #697791;
          font-size: 12px;
          line-height: 2;
        }

        .vmg-goals-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 13px;
        }

        .vmg-goal {
          position: relative;
          min-width: 0;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 17px;
          overflow: hidden;
          border: 1px solid #e3ebf5;
          border-radius: 19px;
          background: linear-gradient(145deg, #f8fbff, #f3f8fd);
          text-align: center;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
          --vmg-color: #2455c4;
          --vmg-tint: #e8f1ff;
        }

        .vmg-goal::before {
          position: absolute;
          top: -45px;
          right: -45px;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: var(--vmg-color);
          opacity: 0.045;
          content: '';
        }

        .vmg-goal:hover {
          transform: translateY(-5px);
          border-color: rgba(36, 85, 196, 0.18);
          box-shadow: 0 15px 28px rgba(23, 35, 61, 0.09);
        }

        .vmg-goal h4 {
          position: relative;
          z-index: 1;
          margin: 14px 0 7px;
          color: #17233d;
          font-size: 14px;
          font-weight: 900;
          line-height: 1.7;
        }

        .vmg-goal p {
          position: relative;
          z-index: 1;
          margin: 0;
          color: #697791;
          font-size: 11px;
          line-height: 1.9;
        }

        .vmg-more {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-height: 35px;
          margin-top: auto;
          padding: 8px 9px 0;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #2455c4;
          font: inherit;
          font-size: 11px;
          font-weight: 900;
          cursor: pointer;
        }

        .vmg-more:focus-visible {
          outline: 2px solid #2455c4;
          outline-offset: 3px;
        }

        .vmg-chevron {
          transition: transform 0.2s ease;
        }

        .vmg-chevron.is-open {
          transform: rotate(180deg);
        }

        .vmg-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 26px;
          color: #697791;
          font-size: 12px;
          line-height: 1.9;
          text-align: center;
        }

        .vmg-footer :global(svg) {
          flex-shrink: 0;
          color: #2455c4;
        }

        @media (max-width: 850px) {
          .vmg-goals-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 650px) {
          .vmg-heading {
            margin-bottom: 25px;
          }

          .vmg-intro {
            grid-template-columns: minmax(0, 1fr);
            gap: 22px;
            padding: 17px;
            border-radius: 22px;
          }

          .vmg-intro-visual {
            min-height: 205px;
          }

          .vmg-emblem {
            width: 130px;
            height: 130px;
          }

          .vmg-intro-content {
            padding: 0 4px 5px;
            text-align: center;
          }

          .vmg-intro-content h3 {
            font-size: 26px;
          }

          .vmg-intro-content > p {
            font-size: 13px;
          }

          .vmg-block {
            padding: 17px;
            border-radius: 21px;
          }

          .vmg-vision-grid,
          .vmg-goals-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 13px;
          }

          .vmg-card,
          .vmg-goal {
            min-height: 0;
            padding: 20px;
          }

          .vmg-card h4 {
            font-size: 19px;
          }

          .vmg-description {
            font-size: 13px;
          }

          .vmg-goal h4 {
            font-size: 15px;
          }

          .vmg-goal p {
            font-size: 12px;
          }

          .vmg-more {
            margin-top: 8px;
          }

          .vmg-footer {
            align-items: flex-start;
            padding: 0 8px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vmg-emblem,
          .vmg-card,
          .vmg-goal,
          .vmg-icon,
          .vmg-chevron {
            transition: none;
          }

          .vmg-intro:hover .vmg-emblem,
          .vmg-card:hover,
          .vmg-goal:hover,
          .vmg-card:hover .vmg-icon,
          .vmg-goal:hover .vmg-icon {
            transform: none;
          }
        }
      `}</style>

      <div className="container">
        <header className="vmg-heading">
          <span className="vmg-kicker">
            <Sparkles size={15} />
            عن منصة هديل
          </span>

          <h2>
            هويتنا <em>وطموحنا</em>
          </h2>

          <p>
            نتطلع إلى تقديم تجربة متكاملة تجمع الخدمات الأكاديمية
            والطلاب والحلول الرقمية في مكان واحد.
          </p>
        </header>

        <article className="vmg-intro" data-reveal>
          <div className="vmg-intro-visual">
            <div className="vmg-glow" />

            <div className="vmg-emblem">
              <GraduationCap size={43} strokeWidth={1.8} />
              <span>
                معرفة
                <br />
                تُنجز
              </span>
            </div>

            <span className="vmg-gold-badge">
              منصة هديل
            </span>
          </div>

          <div className="vmg-intro-content">
            <span className="vmg-kicker">
              <BookOpen size={15} />
              التعريف بمنصة هديل
            </span>

            <h3>
              حلول متكاملة
              <br />
              <em>بثقة واحتراف</em>
            </h3>

            <p>
              منصة هديل هي منصة رقمية متكاملة متخصصة في تقديم
              الحلول والخدمات الطلابية والأكاديمية، وخدمات
              التطوير الرقمي والتصاميم. نسعى لتسهيل المسيرة
              التعليمية والمهنية للطلاب والباحثين والمؤسسات
              من خلال تقديم خدمات عالية الجودة، تتسم بالدقة
              والسرعة والاحترافية.
            </p>
          </div>
        </article>

        <div className="vmg-vision-grid">
          {sections.map((item) => {
            const Icon = item.icon
            const isOpen = expanded === item.number

            return (
              <article
                className="vmg-card"
                key={item.number}
                style={{
                  '--vmg-color': item.color,
                  '--vmg-tint': item.tint,
                } as React.CSSProperties}
                data-reveal
              >
                <div className="vmg-card-top">
                  <span className="vmg-number">
                    {item.number}
                  </span>

                  <div className="vmg-icon">
                    <Icon size={27} strokeWidth={1.8} />
                  </div>
                </div>

                <h4>{item.title}</h4>

                <span className="vmg-english">
                  {item.english}
                </span>

                <p className="vmg-short">
                  {item.short}
                </p>

                {isOpen && (
                  <p className="vmg-description">
                    {item.description}
                  </p>
                )}

                <MoreButton
                  open={isOpen}
                  onClick={() =>
                    setExpanded(isOpen ? null : item.number)
                  }
                />
              </article>
            )
          })}
        </div>

        <section className="vmg-block" data-reveal>
          <header className="vmg-block-heading">
            <span className="vmg-kicker">
              <Target size={15} />
              خطتنا نحو التميز
            </span>

            <h3>
              أهدافنا <em>الاستراتيجية</em>
            </h3>

            <p>
              نعمل على تطوير خدماتنا والارتقاء بتجربة المستفيد
              من خلال أهداف واضحة تجمع الجودة والابتكار والسهولة.
            </p>
          </header>

          <div className="vmg-goals-grid">
            {goals.map((goal, index) => {
              const Icon = goal.icon
              const key = `goal-${index}`
              const isOpen = expanded === key

              return (
                <article
                  className="vmg-goal"
                  key={goal.title}
                  style={{
                    '--vmg-color': goal.color,
                    '--vmg-tint': goal.tint,
                  } as React.CSSProperties}
                >
                  <div className="vmg-card-top">
                    <span className="vmg-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="vmg-icon">
                      <Icon size={26} strokeWidth={1.8} />
                    </div>
                  </div>

                  <h4>{goal.title}</h4>

                  <p>
                    {isOpen
                      ? goal.description
                      : goal.short}
                  </p>

                  <MoreButton
                    open={isOpen}
                    onClick={() =>
                      setExpanded(isOpen ? null : key)
                    }
                  />
                </article>
              )
            })}
          </div>
        </section>

        <div className="vmg-footer">
          <ShieldCheck size={17} />
          <span>
            منصة هديل — جودة واهتمام وابتكار في الخدمات الطلابية والأكاديمية والرقمية.
          </span>
        </div>
      </div>
    </section>
  )
}
