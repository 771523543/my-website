
'use client'

import { useState } from 'react'
import {
  BookOpen,
  Eye,
  Lightbulb,
  ChevronDown,
  Sparkles,
  GraduationCap,
  ArrowUpLeft,
} from 'lucide-react'

const identityText =
  'منصة هديل هي منصة رقمية متكاملة متخصصة في تقديم الحلول والخدمات الطلابية والأكاديمية، وخدمات التطوير الرقمي والتصاميم. نسعى لتسهيل المسيرة التعليمية والمهنية للطلاب والباحثين والمؤسسات من خلال تقديم خدمات عالية الجودة، تتسم بالدقة والسرعة والاحترافية.'

const visionMission = [
  {
    title: 'رؤيتنا',
    short: 'أن نكون الوجهة الأولى للخدمات الطلابية والأكاديمية الرقمية.',
    long: 'أن نكون المنصة الأولى والرائدة في تقديم الخدمات الطلابية والأكاديمية الرقمية، والوجهة الموثوقة التي تمكّن الطلاب والباحثين من تحقيق النجاح والتميز الأكاديمي والمهني بكل سهولة وابتكار.',
    icon: Eye,
    className: 'vmg-vision',
  },
  {
    title: 'رسالتنا',
    short: 'خدمات شاملة ومبتكرة تدعم النجاح الأكاديمي والرقمي.',
    long: 'تقديم خدمات أكاديمية ورقمية شاملة ومبتكرة، بأعلى معايير الجودة والدقة، لمساندة الطلاب والباحثين وصنّاع المحتوى في إنجاز أعمالهم، وتذليل العقبات التعليمية والتقنية أمامهم عبر بيئة موثوقة وفريق متخصص.',
    icon: Lightbulb,
    className: 'vmg-mission',
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

  return (
    <section
      id="vision-mission-goals"
      data-reveal
      className="section soft-section reveal-section vmg-section"
      dir="rtl"
    >
      <div className="container">
        <div className="about-main-heading vmg-main-heading">
          <span className="section-kicker">
            من نحن وإلى أين نتجه؟
          </span>

          <h2>
            هويتنا وطموحنا
            <br />
            <em>نحو مستقبل أفضل</em>
          </h2>

          <p>
            نتطلع إلى مستقبل تعليمي ورقمي أفضل، ونضع احتياجات
            الطلاب والباحثين في مقدمة أولوياتنا.
          </p>
        </div>

        <div className="about-grid vmg-grid">
          {/* التعريف بالمنصة وبطاقة علم وإنجاز */}

          <article
            data-reveal
            className="about-story-card reveal-section vmg-story-card"
          >
            <div className="about-story-visual vmg-story-visual">
              <div className="vmg-visual-orbit vmg-orbit-one" />
              <div className="vmg-visual-orbit vmg-orbit-two" />
              <div className="vmg-visual-glow" />

              <div className="vmg-visual-spark vmg-spark-one">
                <Sparkles size={19} />
              </div>

              <div className="vmg-visual-spark vmg-spark-two">
                <Sparkles size={14} />
              </div>

              <div className="vmg-brand-emblem">
                <div className="vmg-emblem-inner">
                  <GraduationCap
                    className="vmg-cap-icon"
                    size={29}
                    strokeWidth={1.8}
                  />
                  <BookOpen
                    className="vmg-book-icon"
                    size={49}
                    strokeWidth={1.65}
                  />
                </div>

                <span className="vmg-emblem-dot" />
              </div>

              <div className="vmg-brand-title">
                <span className="vmg-brand-overline">
                  KNOWLEDGE & ACHIEVEMENT
                </span>

                <h3>
                  علم <span>وإنجاز</span>
                </h3>

                <p>معرفة تُلهم، وخدمات تصنع الفرق</p>
              </div>

              <div className="vmg-brand-badge">
                <Sparkles size={15} />
                <span>منصة هديل</span>
              </div>

              <div className="vmg-visual-bottom-line" />
            </div>

            <div className="about-story-content vmg-story-content">
              <div className="vmg-centered-icon vmg-identity-icon">
                <BookOpen size={29} strokeWidth={1.8} />
              </div>

              <span className="section-kicker">
                التعريف بالمنصة
              </span>

              <h3 className="vmg-identity-title">
                بوابتك نحو
                <br />
                <em>الخدمات الأكاديمية والرقمية</em>
              </h3>

              <p className="vmg-identity-description">
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
            className="about-values reveal-section vmg-values"
          >
            <div className="about-block-heading centered vmg-values-heading">
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
                    className={`about-mini-card vmg-mini-card ${item.className} ${
                      isOpen ? 'is-expanded' : ''
                    }`}
                    key={item.title}
                  >
                    <div className="vmg-centered-icon">
                      <Icon size={29} strokeWidth={1.8} />
                    </div>

                    <span className="vmg-card-label">
                      {index === 0 ? 'وجهتنا' : 'ما نلتزم به'}
                    </span>

                    <h4>{item.title}</h4>

                    <p className="vmg-vision-text">
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
        </div>
      </div>

      <style jsx>{`
        .vmg-section {
          overflow: hidden;
        }

        .vmg-main-heading {
          text-align: center;
          margin-bottom: 38px;
        }

        .vmg-main-heading p {
          max-width: 650px;
          margin-inline: auto;
          line-height: 2;
        }

        .vmg-grid {
          align-items: stretch;
          gap: 28px;
        }

        /* بطاقة التعريف */

        .vmg-story-card {
          overflow: hidden;
          border-radius: 26px;
          border: 1px solid #e5eaf2;
          background: #fff;
          box-shadow: 0 14px 42px rgba(26, 51, 92, 0.07);
        }

        /* تصميم علم وإنجاز */

        .vmg-story-visual {
          position: relative;
          isolation: isolate;
          min-height: 300px;
          padding: 34px 20px 28px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 15px;
          overflow: hidden;
          color: #fff;
          text-align: center;
          background:
            radial-gradient(
              circle at 50% 38%,
              rgba(80, 133, 219, 0.34),
              transparent 36%
            ),
            linear-gradient(
              145deg,
              #102b55 0%,
              #173f78 48%,
              #2459a9 100%
            );
        }

        .vmg-story-visual::before {
          content: '';
          position: absolute;
          inset: 12px;
          z-index: -1;
          border: 1px solid rgba(230, 196, 120, 0.35);
          border-radius: 19px;
          pointer-events: none;
        }

        .vmg-story-visual::after {
          content: '';
          position: absolute;
          width: 240px;
          height: 240px;
          top: -150px;
          left: -80px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            0 0 0 20px rgba(255, 255, 255, 0.025),
            0 0 0 42px rgba(255, 255, 255, 0.02);
          pointer-events: none;
        }

        .vmg-visual-orbit {
          position: absolute;
          z-index: -1;
          border: 1px solid rgba(236, 201, 128, 0.2);
          border-radius: 50%;
          pointer-events: none;
        }

        .vmg-orbit-one {
          width: 240px;
          height: 240px;
          top: 15px;
          right: -145px;
        }

        .vmg-orbit-two {
          width: 180px;
          height: 180px;
          bottom: -110px;
          left: -70px;
        }

        .vmg-visual-glow {
          position: absolute;
          z-index: -1;
          width: 160px;
          height: 160px;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          background: rgba(65, 126, 214, 0.17);
          filter: blur(32px);
        }

        .vmg-brand-emblem {
          position: relative;
          width: 96px;
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(244, 210, 142, 0.78);
          border-radius: 29px;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.16),
            rgba(255, 255, 255, 0.045)
          );
          box-shadow:
            0 14px 35px rgba(0, 0, 0, 0.15),
            inset 0 0 18px rgba(255, 255, 255, 0.045);
          transform: rotate(-3deg);
        }

        .vmg-emblem-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0;
          color: #f1d18c;
          transform: rotate(3deg);
        }

        .vmg-cap-icon {
          margin-bottom: -8px;
          color: #fff0c9;
        }

        .vmg-book-icon {
          color: #f1d18c;
        }

        .vmg-emblem-dot {
          position: absolute;
          right: -5px;
          bottom: 10px;
          width: 13px;
          height: 13px;
          border: 3px solid #173f78;
          border-radius: 50%;
          background: #f1d18c;
        }

        .vmg-brand-title {
          position: relative;
          z-index: 1;
        }

        .vmg-brand-overline {
          display: block;
          margin-bottom: 5px;
          color: #e8c983;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2.2px;
        }

        .vmg-brand-title h3 {
          margin: 0;
          color: #fff;
          font-size: clamp(29px, 4vw, 39px);
          font-weight: 900;
          line-height: 1.5;
          letter-spacing: -0.7px;
        }

        .vmg-brand-title h3 span {
          color: #f0d08b;
        }

        .vmg-brand-title p {
          margin: 2px 0 0;
          color: rgba(255, 255, 255, 0.8);
          font-size: 12px;
          line-height: 1.9;
        }

        .vmg-visual-spark {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f0d08b;
          opacity: 0.9;
        }

        .vmg-spark-one {
          top: 50px;
          right: 16%;
        }

        .vmg-spark-two {
          top: 110px;
          left: 15%;
          color: #fff;
        }

        .vmg-brand-badge {
          position: absolute;
          bottom: 22px;
          right: 26px;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 12px;
          border: 1px solid rgba(240, 208, 139, 0.3);
          border-radius: 999px;
          color: #f7e6bd;
          background: rgba(5, 23, 49, 0.25);
          font-size: 11px;
          font-weight: 700;
        }

        .vmg-visual-bottom-line {
          position: absolute;
          bottom: 0;
          right: 18%;
          left: 18%;
          height: 3px;
          border-radius: 5px 5px 0 0;
          background: linear-gradient(
            90deg,
            transparent,
            #f0d08b,
            transparent
          );
        }

        /* محتوى التعريف */

        .vmg-story-content {
          padding: 27px 26px 30px;
          text-align: center;
        }

        .vmg-centered-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #dce8fb;
          border-radius: 19px;
          color: #2459a9;
          background: linear-gradient(145deg, #f3f7ff, #e8f0ff);
          box-shadow: 0 7px 18px rgba(36, 89, 169, 0.06);
        }

        .vmg-identity-icon {
          margin-inline: auto;
        }

        .vmg-story-content > :global(.section-kicker) {
          display: block;
          text-align: center;
        }

        .vmg-identity-title {
          margin: 10px 0 12px;
          color: #243247;
          font-size: 23px;
          font-weight: 850;
          line-height: 1.8;
          text-align: center;
        }

        .vmg-identity-title em {
          color: #2459a9;
          font-style: normal;
        }

        .vmg-identity-description {
          max-width: 540px;
          margin: 0 auto;
          color: #65748a;
          font-size: 14px;
          line-height: 2.1;
          text-align: center;
        }

        /* الرؤية والرسالة */

        .vmg-values {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .vmg-values-heading {
          text-align: center;
        }

        .vmg-values-heading h3 {
          margin-top: 8px;
        }

        .vmg-values-heading p {
          line-height: 1.9;
        }

        .vmg-vision-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
        }

        .vmg-mini-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 25px 19px;
          min-width: 0;
          border: 1px solid #e5eaf2;
          border-radius: 22px;
          background: #fff;
          box-shadow: 0 10px 30px rgba(26, 51, 92, 0.045);
          text-align: center;
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease,
            border-color 0.22s ease;
        }

        .vmg-mini-card:hover {
          transform: translateY(-4px);
          border-color: #cbdaf2;
          box-shadow: 0 16px 34px rgba(36, 89, 169, 0.09);
        }

        .vmg-mini-card .vmg-centered-icon {
          margin-inline: auto;
          margin-bottom: 14px;
        }

        .vmg-vision .vmg-centered-icon {
          color: #2459a9;
          background: #edf4ff;
        }

        .vmg-mission .vmg-centered-icon {
          color: #9b7025;
          border-color: #f0e3c5;
          background: #fff8e8;
        }

        .vmg-card-label {
          margin-bottom: 4px;
          color: #8995a7;
          font-size: 11px;
          font-weight: 700;
        }

        .vmg-mini-card h4 {
          margin: 3px 0 10px;
          color: #243247;
          font-size: 20px;
          font-weight: 850;
          text-align: center;
        }

        .vmg-vision-text {
          width: 100%;
          margin: 0 0 17px;
          color: #69778b;
          font-size: 13px;
          line-height: 2;
          text-align: center;
        }

        .vmg-mini-card :global(.about-more-button) {
          align-self: center;
          margin-top: auto;
        }

        /* زر اعرف أكثر */

        .vmg-more-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin: 16px auto 0;
          color: #2459a9 !important;
          font-weight: 800;
          transition: opacity 0.2s ease;
        }

        .vmg-more-button:hover {
          opacity: 0.76;
        }

        .vmg-more-button :global(svg) {
          color: #2459a9;
          transition: transform 0.2s ease;
        }

        .vmg-more-button :global(svg.is-open) {
          transform: rotate(180deg);
        }

        .vmg-story-content :global(.about-more-button) {
          margin-inline: auto;
        }

        /* الجوال والأجهزة الصغيرة */

        @media (max-width: 900px) {
          .vmg-grid {
            gap: 22px;
          }

          .vmg-story-visual {
            min-height: 290px;
          }
        }

        @media (max-width: 640px) {
          .vmg-main-heading {
            margin-bottom: 25px;
          }

          .vmg-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 23px;
          }

          .vmg-story-card {
            border-radius: 22px;
          }

          .vmg-story-visual {
            min-height: 280px;
            padding: 30px 16px 35px;
          }

          .vmg-brand-emblem {
            width: 83px;
            height: 83px;
            border-radius: 25px;
          }

          .vmg-book-icon {
            width: 42px;
            height: 42px;
          }

          .vmg-brand-title h3 {
            font-size: 32px;
          }

          .vmg-brand-overline {
            font-size: 8px;
            letter-spacing: 1.7px;
          }

          .vmg-brand-badge {
            right: 21px;
            bottom: 18px;
            padding: 6px 10px;
          }

          .vmg-spark-one {
            right: 12%;
            top: 44px;
          }

          .vmg-spark-two {
            left: 11%;
            top: 100px;
          }

          .vmg-story-content {
            padding: 23px 18px 25px;
          }

          .vmg-identity-title {
            font-size: 21px;
          }

          .vmg-vision-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 14px;
          }

          .vmg-mini-card {
            padding: 23px 20px;
          }

          .vmg-vision-text {
            max-width: 420px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vmg-mini-card,
          .vmg-more-button,
          .vmg-more-button :global(svg) {
            transition: none;
          }

          .vmg-mini-card:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  )
}
