
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
  Check,
} from 'lucide-react'

const identityText =
  'منصة هديل هي منصة رقمية متكاملة متخصصة في تقديم الحلول والخدمات الطلابية والأكاديمية، وخدمات التطوير الرقمي والتصاميم. نسعى لتسهيل المسيرة التعليمية والمهنية للطلاب والباحثين والمؤسسات من خلال تقديم خدمات عالية الجودة، تتسم بالدقة والسرعة والاحترافية.'

const visionMission = [
  {
    number: '01',
    title: 'رؤيتنا',
    short: 'أن نكون الوجهة الأولى للخدمات الطلابية والأكاديمية الرقمية.',
    long: 'أن نكون المنصة الأولى والرائدة في تقديم الخدمات الطلابية والأكاديمية الرقمية، والوجهة الموثوقة التي تمكّن الطلاب والباحثين من تحقيق النجاح والتميز الأكاديمي والمهني بكل سهولة وابتكار.',
    icon: Eye,
  },
  {
    number: '02',
    title: 'رسالتنا',
    short: 'خدمات شاملة ومبتكرة تدعم النجاح الأكاديمي والرقمي.',
    long: 'تقديم خدمات أكاديمية ورقمية شاملة ومبتكرة، بأعلى معايير الجودة والدقة، لمساندة الطلاب والباحثين وصنّاع المحتوى في إنجاز أعمالهم، وتذليل العقبات التعليمية والتقنية أمامهم عبر بيئة موثوقة وفريق متخصص.',
    icon: Lightbulb,
  },
]

const goals = [
  {
    title: 'دعم أكاديمي متميز',
    short: 'مساندة الطلاب والباحثين في إنجاز أعمالهم.',
    long: 'مساعدة الطلاب والباحثين في إعداد وتنسيق البحوث والتقارير والعروض التقديمية وفق أفضل المعايير الأكاديمية.',
    icon: GraduationCap,
  },
  {
    title: 'حلول تقنية ورقمية',
    short: 'خدمات تقنية تلبي احتياجات المستخدمين.',
    long: 'تقديم خدمات الدعم التقني، وبرمجة وتصميم المواقع، والحلول الرقمية التي تلبي تطلعات مستخدمي المنصة.',
    icon: Code2,
  },
  {
    title: 'الجودة والدقة',
    short: 'الاهتمام بالتفاصيل والالتزام بالمواعيد.',
    long: 'الالتزام بتسليم الأعمال في الأوقات المحددة وبأعلى درجات الدقة والاحترافية التي تعزز رضا العملاء.',
    icon: ShieldCheck,
  },
  {
    title: 'تجربة رقمية سهلة',
    short: 'الوصول إلى الخدمة بسهولة وسرعة.',
    long: 'تطوير واجهات واستراتيجيات تواصل سلسة تضمن وصول المستخدم إلى الخدمة التي يحتاجها بأسرع وقت وأقل جهد.',
    icon: Smartphone,
  },
  {
    title: 'التطوير والابتكار',
    short: 'تطوير الخدمات ومواكبة المستجدات.',
    long: 'التوسع في الخدمات المقدمة لمواكبة أحدث التقنيات والاتجاهات التعليمية والتقنية الحديثة.',
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
      className="about-more-button"
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
  const [openGoal, setOpenGoal] = useState<number | null>(null)

  return (
    <section
      id="vision-mission-goals"
      data-reveal
      className="section soft-section reveal-section"
    >
      <div className="container">
        {/* العنوان الرئيسي بنفس أسلوب قسم قصتنا وقيمنا */}

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

        <div className="about-grid">
          {/* التعريف بالمنصة: بطاقة رئيسية كبيرة */}

          <article
            data-reveal
            className="about-story-card reveal-section"
          >
            <div className="about-story-visual">
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

            <div className="about-story-content">
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

          {/* الرؤية والرسالة: بطاقات بنفس تصميم بطاقات القيم */}

          <div
            data-reveal
            className="about-values reveal-section"
          >
            <div className="about-block-heading centered">
              <span className="section-kicker">
                رؤيتنا ورسالتنا
              </span>

              <h3>
                ما الذي نسعى إليه؟
              </h3>

              <p>
                طموح واضح ورسالة نعمل من أجل تحقيقها.
              </p>
            </div>

            <div className="about-mini-grid">
              {visionMission.map((item, index) => {
                const Icon = item.icon
                const isOpen = openVision === index

                return (
                  <article
                    className={`about-mini-card ${
                      isOpen ? 'is-expanded' : ''
                    }`}
                    key={item.title}
                  >
                    <div className="about-card-top">
                      <span className="value-number">
                        {item.number}
                      </span>

                      <div className="about-icon-box">
                        <Icon
                          size={27}
                          strokeWidth={1.8}
                        />
                      </div>
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

          {/* الأهداف: بطاقات المزايا بنفس أسلوب القسم الأصلي */}

          <div
            data-reveal
            className="about-why reveal-section"
          >
            <div className="about-block-heading centered">
              <span className="section-kicker">
                أهدافنا الاستراتيجية
              </span>

              <h3>
                خطواتنا نحو
                <br />
                <em>التميز والتطوير</em>
              </h3>

              <p>
                أهداف نعمل عليها لتقديم تجربة أفضل لطلابنا وعملائنا.
              </p>
            </div>

            <div className="about-feature-grid">
              {goals.map((goal, index) => {
                const Icon = goal.icon
                const isOpen = openGoal === index

                return (
                  <article
                    className={`about-feature-card ${
                      isOpen ? 'is-expanded' : ''
                    }`}
                    key={goal.title}
                  >
                    <div className="feature-icon-box">
                      <Icon
                        size={28}
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="about-feature-content">
                      <strong>{goal.title}</strong>

                      <small>
                        {isOpen ? goal.long : goal.short}
                      </small>

                      <MoreButton
                        open={isOpen}
                        onClick={() =>
                          setOpenGoal(isOpen ? null : index)
                        }
                      />
                    </div>

                    <span className="feature-check">
                      <Check
                        size={14}
                        strokeWidth={3}
                      />
                    </span>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
