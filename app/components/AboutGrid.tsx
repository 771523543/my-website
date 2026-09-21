'use client'

import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  ShieldCheck,
  Sparkles,
  Clock3,
  LockKeyhole,
  Target,
  Zap,
  MessageCircle,
  Award,
} from 'lucide-react'
import { useState } from 'react'

const whatsapp = 'https://wa.me/967776280186'

const values = [
  {
    number: '01',
    title: 'الأمانة الأكاديمية',
    short: 'أصالة وجودة في كل عمل.',
    long: 'نحرص على تقديم أعمال أصلية وذات جودة عالية، مع الالتزام بالأمانة الأكاديمية وتجنب السرقات الأدبية والانتحال.',
    icon: ShieldCheck,
  },
  {
    number: '02',
    title: 'السرية والخصوصية',
    short: 'حماية كاملة لبياناتك.',
    long: 'نحافظ على سرية بياناتك ومستنداتك ومعلوماتك الأكاديمية، ونتعامل معها باهتمام وخصوصية طوال فترة تنفيذ الخدمة.',
    icon: LockKeyhole,
  },
  {
    number: '03',
    title: 'التميز والدقة',
    short: 'جودة تواكب متطلباتك.',
    long: 'نراجع الأعمال بعناية ونحرص على توافقها مع المعايير والشروط المطلوبة، مع الاهتمام بالتفاصيل التي تصنع الفرق.',
    icon: Target,
  },
  {
    number: '04',
    title: 'الالتزام بالمواعيد',
    short: 'تسليم في الوقت المحدد.',
    long: 'نقدّر وقتك ونلتزم بالمواعيد المتفق عليها، مع تنظيم مراحل العمل لضمان إنجاز الخدمة وتسليمها في الوقت المناسب.',
    icon: Clock3,
  },
]

const features = [
  {
    title: 'سرعة فائقة في الإنجاز',
    short: 'تنفيذ وتسليم سريع.',
    long: 'نعمل على إنجاز الخدمات بكفاءة وسرعة مع المحافظة على مستوى الجودة، بحيث تحصل على الخدمة في الوقت المناسب لاحتياجك.',
    icon: Zap,
  },
  {
    title: 'جودة أكاديمية عالية',
    short: 'مراجعة دقيقة للأعمال.',
    long: 'تمر الأعمال بمراجعة دقيقة للتأكد من جودة المحتوى والتنظيم والتنسيق، بما يساعد على تقديم نتيجة احترافية ومتكاملة.',
    icon: Award,
  },
  {
    title: 'دعم ومتابعة مستمرة',
    short: 'نرافقك حتى النهاية.',
    long: 'نبقى على تواصل معك أثناء تنفيذ الخدمة، ونستقبل الملاحظات والتعديلات اللازمة حتى تصل إلى النتيجة التي تحتاجها.',
    icon: MessageCircle,
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

export default function AboutGrid() {
  const [openValue, setOpenValue] = useState<number | null>(null)
  const [openFeature, setOpenFeature] = useState<number | null>(null)

  return (
    <section
      id="about"
      data-reveal
      className="section soft-section reveal-section"
    >
      <div className="container">

        {/* ==================== العنوان الرئيسي ==================== */}

        <div className="about-main-heading">
          <span className="section-kicker">
            عن منصة هديل
          </span>

          <h2>
            دعم أكاديمي
            <br />
            <em>بثقة واحتراف</em>
          </h2>

          <p>
         قصتنا وقيمنا وما يميزنا
          </p>
        </div>

        {/* ==================== الشبكة ==================== */}

        <div className="about-grid">

          {/* ==================== قصتنا ==================== */}

          <article
            data-reveal
            className="about-story-card reveal-section"
          >
            <div className="about-story-visual">

              <div className="about-story-glow" />

              <div className="story-card">
                <BookOpen
                  size={42}
                  strokeWidth={1.8}
                />

                <span>
                  معرفة
                  <br />
                  تُنجز
                </span>
              </div>

              <span className="story-badge">
                منذ 2018
              </span>

            </div>

            <div className="about-story-content">

              <span className="section-kicker">
                قصتنا
              </span>

              <h3>
                بدأنا من إيماننا بأن
                <br />
                <em>كل طالب يستحق الدعم</em>
              </h3>

              <p>
                منصة هديل وجهة موثوقة للطلاب والباحثين،
                نحوّل التحديات الأكاديمية إلى خطوات واضحة
                وحلول احترافية قابلة للإنجاز.
              </p>

              <a
                className="text-button"
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                تعرّف على هديل
                <ArrowLeft size={17} />
              </a>

            </div>
          </article>

          {/* ==================== قيمنا ==================== */}

          <div
            data-reveal
            className="about-values reveal-section"
          >
            <div className="about-block-heading centered">
              <span className="section-kicker">
                قيمنا
              </span>

              <h3>
                مبادئ نبني عليها
              </h3>

              <p>
                قيم ثابتة تجعل كل تجربة مع هديل أكثر ثقة.
              </p>
            </div>

            <div className="about-mini-grid">

              {values.map((value, index) => {
                const Icon = value.icon
                const isOpen = openValue === index

                return (
                  <article
                    className={`about-mini-card ${
                      isOpen ? 'is-expanded' : ''
                    }`}
                    key={value.title}
                  >
                    <div className="about-card-top">
                      <span className="value-number">
                        {value.number}
                      </span>

                      <div className="about-icon-box">
                        <Icon
                          size={27}
                          strokeWidth={1.8}
                        />
                      </div>
                    </div>

                    <h4>
                      {value.title}
                    </h4>

                    <p>
                      {isOpen
                        ? value.long
                        : value.short}
                    </p>

                    <MoreButton
                      open={isOpen}
                      onClick={() =>
                        setOpenValue(
                          isOpen ? null : index
                        )
                      }
                    />
                  </article>
                )
              })}

            </div>
          </div>

          {/* ==================== لماذا هديل ==================== */}

          <div
            data-reveal
            className="about-why reveal-section"
          >

            <div className="about-block-heading centered">

              <span className="section-kicker">
                لماذا هديل؟
              </span>

              <h3>
                معك من الفكرة
                <br />
                <em>حتى التسليم</em>
              </h3>

              <p>
                كل ما تحتاجه لتجربة أكاديمية أكثر سهولة.
              </p>

            </div>

            <div className="about-feature-grid">

              {features.map((feature, index) => {
                const Icon = feature.icon
                const isOpen =
                  openFeature === index

                return (
                  <article
                    className={`about-feature-card ${
                      isOpen ? 'is-expanded' : ''
                    }`}
                    key={feature.title}
                  >

                    <div className="feature-icon-box">
                      <Icon
                        size={28}
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="about-feature-content">

                      <strong>
                        {feature.title}
                      </strong>

                      <small>
                        {isOpen
                          ? feature.long
                          : feature.short}
                      </small>

                      <MoreButton
                        open={isOpen}
                        onClick={() =>
                          setOpenFeature(
                            isOpen ? null : index
                          )
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