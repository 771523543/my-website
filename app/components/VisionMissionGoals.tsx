
'use client'

import { useState } from 'react'
import {
  BookOpen,
  Eye,
  Lightbulb,
  Target,
  GraduationCap,
  Code2,
  ShieldCheck,
  Smartphone,
  Rocket,
  ChevronDown,
} from 'lucide-react'

const identityText =
  'منصة هديل هي منصة رقمية متكاملة متخصصة في تقديم الحلول والخدمات الطلابية والأكاديمية، وخدمات التطوير الرقمي والتصاميم. نسعى لتسهيل المسيرة التعليمية والمهنية للطلاب والباحثين والمؤسسات من خلال تقديم خدمات عالية الجودة، تتسم بالدقة والسرعة والاحترافية.'

const visionMission = [
  {
    title: 'رؤيتنا',
    short: 'أن نكون الوجهة الأولى للخدمات الطلابية والأكاديمية الرقمية.',
    long: 'أن نكون المنصة الأولى والرائدة في تقديم الخدمات الطلابية والأكاديمية الرقمية، والوجهة الموثوقة التي تمكّن الطلاب والباحثين من تحقيق النجاح والتميز الأكاديمي والمهني بكل سهولة وابتكار.',
    icon: Eye,
  },
  {
    title: 'رسالتنا',
    short: 'خدمات شاملة ومبتكرة تدعم النجاح الأكاديمي والرقمي.',
    long: 'تقديم خدمات أكاديمية ورقمية شاملة ومبتكرة، بأعلى معايير الجودة والدقة، لمساندة الطلاب والباحثين وصنّاع المحتوى في إنجاز أعمالهم، وتذليل العقبات التعليمية والتقنية أمامهم عبر بيئة موثوقة وفريق متخصص.',
    icon: Lightbulb,
  },
]

const goals = [
  {
    title: 'دعم أكاديمي متميز',
    description:
      'مساعدة الطلاب والباحثين في إعداد وتنسيق البحوث والتقارير والعروض التقديمية وفق أفضل المعايير الأكاديمية.',
    icon: GraduationCap,
  },
  {
    title: 'حلول تقنية ورقمية',
    description:
      'تقديم خدمات الدعم التقني، وبرمجة وتصميم المواقع، والحلول الرقمية التي تلبي تطلعات مستخدمي المنصة.',
    icon: Code2,
  },
  {
    title: 'الجودة والدقة',
    description:
      'الالتزام بتسليم الأعمال في الأوقات المحددة وبأعلى درجات الدقة والاحترافية التي تعزز رضا العملاء.',
    icon: ShieldCheck,
  },
  {
    title: 'تجربة رقمية سهلة',
    description:
      'تطوير واجهات واستراتيجيات تواصل سلسة تضمن وصول المستخدم إلى الخدمة التي يحتاجها بأسرع وقت وأقل جهد.',
    icon: Smartphone,
  },
  {
    title: 'التطوير والابتكار',
    description:
      'التوسع في الخدمات المقدمة لمواكبة أحدث التقنيات والاتجاهات التعليمية والتقنية الحديثة.',
    icon: Rocket,
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
      className="about-more-button vmg-more-button"
      onClick={onClick}
      aria-expanded={open}
    >
      <span>{open ? 'عرض أقل' : 'اعرف أكثر'}</span>
      <ChevronDown
        size={17}
        strokeWidth={2.5}
        className={open ? 'is-open' : ''}
      />
    </button>
  )
}

export default function VisionMissionGoals() {
  const [openIdentity, setOpenIdentity] = useState(false)
  const [openVision, setOpenVision] = useState<number | null>(null)
  const [openGoals, setOpenGoals] = useState(false)

  return (
    <section
      id="vision-mission-goals"
      data-reveal
      className="section soft-section reveal-section vmg-section"
    >
      <div className="container">
        <div className="about-main-heading">
          <span className="section-kicker">
            من نحن وإلى أين نتجه؟
          </span>

          <h2>
            هويتنا وطموحنا
            <br />
            <em>نحو مستقبل أفضل</em>
          </h2>

          <p>
            تعرّف على منصة هديل ورؤيتها ورسالتها وأهدافها الاستراتيجية.
          </p>
        </div>

        <div className="about-grid vmg-grid">
          {/* التعريف بالمنصة */}

          <article
            data-reveal
            className="about-story-card reveal-section vmg-story-card"
          >
            <div className="about-story-visual vmg-story-visual">
              <div className="about-story-glow" />

              <div className="story-card">
                <BookOpen size={42} strokeWidth={1.8} />
                <span>
                  علم
                  <br />
                  وإنجاز
                </span>
              </div>

              <span className="story-badge">
                منصة هديل
              </span>
            </div>

            <div className="about-story-content vmg-story-content">
              <div className="vmg-centered-icon">
                <BookOpen size={30} strokeWidth={1.8} />
              </div>

              <span className="section-kicker">
                التعريف بالمنصة
              </span>

              <h3>
                بوابتك نحو
                <br />
                <em>الخدمات الأكاديمية والرقمية</em>
              </h3>

              <p>
                {openIdentity
                  ? identityText
                  : `${identityText.slice(0, 145)}...`}
              </p>

              <MoreButton
                open={openIdentity}
                onClick={() =>
                  setOpenIdentity((current) => !current)
                }
              />
            </div>
          </article>

          {/* الرؤية والرسالة */}

          <div
            data-reveal
            className="about-values reveal-section"
          >
            <div className="about-block-heading centered">
              <span className="section-kicker">
                رؤيتنا ورسالتنا
              </span>

              <h3>ما الذي نسعى إليه؟</h3>

              <p>
                طموح واضح ورسالة نعمل من أجل تحقيقها.
              </p>
            </div>

            <div className="about-mini-grid vmg-vision-grid">
              {visionMission.map((item, index) => {
                const Icon = item.icon
                const isOpen = openVision === index

                return (
                  <article
                    className={`about-mini-card vmg-mini-card ${
                      isOpen ? 'is-expanded' : ''
                    }`}
                    key={item.title}
                  >
                    <div className="vmg-centered-icon">
                      <Icon size={30} strokeWidth={1.8} />
                    </div>

                    <h4>{item.title}</h4>

                    <p>
                      {isOpen ? item.long : item.short}
                    </p>

                    <MoreButton
                      open={isOpen}
                      onClick={() =>
                        setOpenVision(isOpen ? null : index)
                      }
                    />
                  </article>
                )
              })}
            </div>
          </div>

          {/* الأهداف الاستراتيجية: بطاقة واحدة */}

          <div
            data-reveal
            className="about-why reveal-section vmg-goals-section"
          >
            <article className="about-mini-card vmg-goals-card">
              <div className="vmg-centered-icon vmg-goals-main-icon">
                <Target size={34} strokeWidth={1.8} />
              </div>

              <span className="section-kicker">
                أهدافنا الاستراتيجية
              </span>

              <h3 className="vmg-goals-title">
                أهدافنا نحو التميز والتطوير
              </h3>

              <p className="vmg-goals-intro">
                خمسة أهداف توجه عملنا وتساعدنا على تقديم خدمات
                أكاديمية ورقمية أفضل.
              </p>

              <div className="vmg-goals-list">
                {goals.map((goal, index) => {
                  const Icon = goal.icon

                  return (
                    <div className="vmg-goal-item" key={goal.title}>
                      <div className="vmg-goal-icon">
                        <Icon size={22} strokeWidth={1.8} />
                      </div>

                      <div className="vmg-goal-content">
                        <h4>
                          {index + 1}. {goal.title}
                        </h4>

                        <p>{goal.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <MoreButton
                open={openGoals}
                onClick={() =>
                  setOpenGoals((current) => !current)
                }
              />

              {openGoals && (
                <div className="vmg-goals-extra">
                  نعمل على تحقيق هذه الأهداف من خلال التطوير
                  المستمر، والاهتمام بجودة الخدمات، وتحسين تجربة
                  المستخدم، ومواكبة الاحتياجات الأكاديمية والتقنية.
                </div>
              )}
            </article>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vmg-centered-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 62px;
          height: 62px;
          margin: 0 auto 18px;
          border-radius: 18px;
          color: #2459a9;
          background: #edf4ff;
          border: 1px solid #dce8fb;
        }

        .vmg-story-content {
          text-align: center;
        }

        .vmg-story-content .vmg-centered-icon {
          margin-left: auto;
          margin-right: auto;
        }

        .vmg-story-content :global(.about-more-button) {
          margin-left: auto;
          margin-right: auto;
        }

        .vmg-more-button {
          color: #2459a9 !important;
          font-weight: 700;
          justify-content: center;
        }

        .vmg-more-button :global(svg) {
          color: #2459a9;
        }

        .vmg-vision-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .vmg-mini-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .vmg-mini-card h4,
        .vmg-mini-card p {
          text-align: center;
          width: 100%;
        }

        .vmg-mini-card :global(.about-more-button) {
          margin-top: auto;
          align-self: center;
        }

        .vmg-goals-section {
          width: 100%;
        }

        .vmg-goals-card {
          width: 100%;
          box-sizing: border-box;
          text-align: center;
          padding: 30px;
        }

        .vmg-goals-main-icon {
          width: 70px;
          height: 70px;
        }

        .vmg-goals-card > :global(.section-kicker) {
          display: block;
          text-align: center;
        }

        .vmg-goals-title {
          margin: 10px 0;
          text-align: center;
        }

        .vmg-goals-intro {
          max-width: 620px;
          margin: 0 auto 24px;
          text-align: center;
        }

        .vmg-goals-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          text-align: right;
        }

        .vmg-goal-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px;
          border: 1px solid #e3eaf4;
          border-radius: 16px;
          background: #fff;
          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .vmg-goal-item:hover {
          transform: translateY(-3px);
          border-color: #c8d9f4;
          box-shadow: 0 8px 22px rgba(36, 89, 169, 0.08);
        }

        .vmg-goal-icon {
          flex: 0 0 46px;
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          color: #2459a9;
          background: #edf4ff;
        }

        .vmg-goal-content {
          min-width: 0;
          flex: 1;
        }

        .vmg-goal-content h4 {
          margin: 2px 0 8px;
          color: #243247;
          font-size: 15px;
          font-weight: 800;
          line-height: 1.7;
        }

        .vmg-goal-content p {
          margin: 0;
          color: #68778c;
          font-size: 13px;
          line-height: 1.9;
        }

        .vmg-goals-card > :global(.about-more-button) {
          margin: 22px auto 0;
        }

        .vmg-goals-extra {
          margin: 16px auto 0;
          max-width: 700px;
          color: #52647c;
          line-height: 2;
          text-align: center;
        }

        @media (max-width: 640px) {
          .vmg-vision-grid {
            grid-template-columns: minmax(0, 1fr);
          }

          .vmg-goals-card {
            padding: 20px 14px;
          }

          .vmg-goals-list {
            grid-template-columns: minmax(0, 1fr);
            gap: 10px;
          }

          .vmg-goal-item {
            padding: 14px;
            gap: 11px;
          }

          .vmg-goal-icon {
            flex-basis: 42px;
            width: 42px;
            height: 42px;
          }
        }
      `}</style>
    </section>
  )
}
