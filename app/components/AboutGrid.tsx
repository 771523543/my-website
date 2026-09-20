'use client'

import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'

const whatsapp = 'https://wa.me/967776280186'

const values = [
  {
    title: 'الأمانة الأكاديمية',
    short: 'أصالة وجودة في كل عمل.',
    long: 'نحرص على تقديم أعمال أصلية وذات جودة عالية، مع الالتزام بالأمانة الأكاديمية وتجنب السرقات الأدبية والانتحال.',
  },
  {
    title: 'السرية والخصوصية',
    short: 'حماية كاملة لبياناتك.',
    long: 'نحافظ على سرية بياناتك ومستنداتك ومعلوماتك الأكاديمية، ونتعامل معها باهتمام وخصوصية طوال فترة تنفيذ الخدمة.',
  },
  {
    title: 'التميز والدقة',
    short: 'جودة تواكب متطلباتك.',
    long: 'نراجع الأعمال بعناية ونحرص على توافقها مع المعايير والشروط المطلوبة، مع الاهتمام بالتفاصيل التي تصنع الفرق.',
  },
  {
    title: 'الالتزام بالمواعيد',
    short: 'تسليم في الوقت المحدد.',
    long: 'نقدّر وقتك ونلتزم بالمواعيد المتفق عليها، مع تنظيم مراحل العمل لضمان إنجاز الخدمة وتسليمها في الوقت المناسب.',
  },
]

const features = [
  {
    title: 'سرعة فائقة في الإنجاز',
    short: 'تنفيذ وتسليم سريع.',
    long: 'نعمل على إنجاز الخدمات بكفاءة وسرعة مع المحافظة على مستوى الجودة، بحيث تحصل على الخدمة في الوقت المناسب لاحتياجك.',
  },
  {
    title: 'جودة أكاديمية عالية',
    short: 'مراجعة دقيقة للأعمال.',
    long: 'تمر الأعمال بمراجعة دقيقة للتأكد من جودة المحتوى والتنظيم والتنسيق، بما يساعد على تقديم نتيجة احترافية ومتكاملة.',
  },
  {
    title: 'دعم ومتابعة مستمرة',
    short: 'نرافقك حتى النهاية.',
    long: 'نبقى على تواصل معك أثناء تنفيذ الخدمة، ونستقبل الملاحظات والتعديلات اللازمة حتى تصل إلى النتيجة التي تحتاجها.',
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
      {open ? 'عرض أقل' : 'اعرف أكثر'}

      <ChevronDown
        size={16}
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

        <div className="center-heading">
          <span className="section-kicker">
            عن منصة هديل
          </span>

          <h2>
            دعم أكاديمي
            <br />
            <em>بثقة واحتراف</em>
          </h2>

          <p>
            قصتنا وقيمنا وما يميزنا، في تجربة واحدة مختصرة.
          </p>
        </div>

        <div className="about-grid">

          {/* ==================== قصتنا ==================== */}

          <article
            data-reveal
            className="about-story-card reveal-section"
          >
            <div className="about-story-visual">

              <div className="story-card">
                <BookOpen size={36} />

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

            <div className="about-block-heading">

              <span className="section-kicker">
                قيمنا
              </span>

              <h3>
                مبادئ نبني عليها
              </h3>

            </div>

            <div className="about-mini-grid">

              {values.map((value, index) => {

                const isOpen =
                  openValue === index

                return (
                  <article
                    className={`about-mini-card ${
                      isOpen
                        ? 'is-expanded'
                        : ''
                    }`}
                    key={value.title}
                  >

                    <span className="value-number">
                      0{index + 1}
                    </span>

                    <ShieldCheck size={21} />

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
                          isOpen
                            ? null
                            : index
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

            <div className="about-block-heading">

              <span className="section-kicker">
                لماذا هديل؟
              </span>

              <h3>
                معك من الفكرة
                <br />
                <em>حتى التسليم</em>
              </h3>

              <p>
                فريق متخصص، تواصل واضح، وجودة نراجعها
                معك خطوة بخطوة.
              </p>

            </div>

            <div className="about-feature-grid">

              {features.map(
                (feature, index) => {

                  const isOpen =
                    openFeature === index

                  return (
                    <article
                      className={`about-feature-card ${
                        isOpen
                          ? 'is-expanded'
                          : ''
                      }`}
                      key={feature.title}
                    >

                      <Check size={19} />

                      <div>

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
                              isOpen
                                ? null
                                : index
                            )
                          }
                        />

                      </div>

                    </article>
                  )
                }
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}