'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  LayoutGrid,
  Sparkles,
} from 'lucide-react'

export default function ServicesPreview() {
  return (
    <section
      className="section services-preview"
      id="services"
    >
      <div className="container">
        {/* =========================
            رأس القسم
        ========================= */}
        <div className="section-heading services-preview-heading">
          <div className="section-kicker">
            <span className="section-kicker-dot" />
            خدمات منصة هديل
          </div>

          <h2>
            خدماتنا{' '}
            <span>الأكاديمية والطلابية</span>
          </h2>

          <p>
            مجموعة متكاملة من الخدمات الأكاديمية والبحثية
            والتصميمية لمساعدتك في إنجاز متطلباتك الدراسية
            والمهنية بصورة منظمة واحترافية.
          </p>
        </div>

        {/* =========================
            بوابة الخدمات
        ========================= */}
        <div className="services-preview-card">
          {/* زخارف */}
          <div className="services-preview-glow" />
          <div className="services-preview-circle" />

          {/* الشارة */}
          <div className="services-preview-badge">
            <Sparkles size={16} />

            <span>
              خدمات متنوعة تناسب احتياجاتك
            </span>
          </div>

          {/* المحتوى الرئيسي */}
          <div className="services-preview-content">
            {/* الأيقونة */}
            <div className="services-preview-icon-wrap">
              <div className="services-preview-icon">
                <LayoutGrid
                  size={38}
                  strokeWidth={1.7}
                />
              </div>
            </div>

            {/* النص */}
            <div className="services-preview-main">
              <span className="services-preview-label">
                منصة هديل للخدمات الطلابية
              </span>

              <h3>
                كل ما تحتاجه
                <br />
                <em>في مكان واحد</em>
              </h3>

              <p>
                استكشف خدماتنا المتنوعة في المجالات البحثية
                والأكاديمية والتصميمية، واختر الخدمة المناسبة
                لاحتياجك بسهولة.
              </p>

              <Link
                href="/services"
                className="services-preview-button"
              >
                <span>
                  استكشف جميع الخدمات
                </span>

                <ArrowLeft size={18} />
              </Link>
            </div>
          </div>

          {/* =========================
              أنواع الخدمات
          ========================= */}
          <div className="services-preview-features">
            <div className="services-preview-feature">
              <div className="services-preview-feature-icon">
                <BookOpen
                  size={23}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <strong>
                  خدمات بحثية
                </strong>

                <span>
                  بحوث وتقارير ودراسات
                </span>
              </div>
            </div>

            <div className="services-preview-feature">
              <div className="services-preview-feature-icon">
                <GraduationCap
                  size={23}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <strong>
                  خدمات أكاديمية
                </strong>

                <span>
                  واجبات وتكاليف ومهام
                </span>
              </div>
            </div>

            <div className="services-preview-feature">
              <div className="services-preview-feature-icon">
                <BriefcaseBusiness
                  size={23}
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <strong>
                  خدمات مهنية
                </strong>

                <span>
                  تصميم وعروض وسيرة ذاتية
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .services-preview {
          position: relative;
          background: var(--background);
          overflow: hidden;
        }

        /* =========================
           رأس القسم
        ========================= */

        .services-preview-heading {
          max-width: 760px;
          margin-inline: auto;
          text-align: center;
        }

        .services-preview-heading h2 {
          color: var(--foreground);
        }

        .services-preview-heading h2 span {
          color: var(--primary);
        }

        .services-preview-heading p {
          max-width: 650px;
          margin: 14px auto 0;
          color: var(--muted-foreground);
          line-height: 1.9;
        }

        /* =========================
           بطاقة بوابة الخدمات
        ========================= */

        .services-preview-card {
          position: relative;
          overflow: hidden;

          margin-top: 38px;
          padding: 42px 34px 32px;

          background:
            linear-gradient(
              145deg,
              #173f91 0%,
              #2455c4 52%,
              #163878 100%
            );

          border:
            2px solid
            rgba(213, 170, 84, 0.72);

          border-radius: 28px;

          color: white;

          box-shadow:
            0 24px 55px
              rgba(23, 63, 145, 0.20),
            0 0 0 6px
              rgba(213, 170, 84, 0.06),
            inset 0 1px 0
              rgba(255, 255, 255, 0.18);

          isolation: isolate;
        }

        .services-preview-card::before {
          content: '';

          position: absolute;
          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              125deg,
              rgba(255, 255, 255, 0.13),
              transparent 30%,
              transparent 72%,
              rgba(255, 255, 255, 0.04)
            );

          z-index: -1;
        }

        /* =========================
           زخارف
        ========================= */

        .services-preview-glow {
          position: absolute;

          width: 430px;
          height: 430px;

          top: -300px;
          left: -130px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.14),
              transparent 68%
            );

          pointer-events: none;
        }

        .services-preview-circle {
          position: absolute;

          width: 330px;
          height: 330px;

          right: -190px;
          bottom: -230px;

          border:
            1px solid
            rgba(213, 170, 84, 0.28);

          border-radius: 50%;

          pointer-events: none;
        }

        /* =========================
           الشارة
        ========================= */

        .services-preview-badge {
          position: relative;
          z-index: 2;

          display: inline-flex;
          align-items: center;

          gap: 7px;

          padding: 9px 14px;

          color: #173f91;

          background: #fff8e8;

          border:
            1px solid
            #f2d79e;

          border-radius: 999px;

          font-size: 12px;
          font-weight: 850;

          box-shadow:
            0 8px 20px
            rgba(0, 0, 0, 0.12);
        }

        .services-preview-badge svg {
          color: #c98b25;
          flex-shrink: 0;
        }

        /* =========================
           المحتوى
        ========================= */

        .services-preview-content {
          position: relative;
          z-index: 2;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          text-align: center;

          padding:
            30px 10px 8px;
        }

        /* =========================
           الأيقونة
        ========================= */

        .services-preview-icon-wrap {
          position: relative;

          margin-bottom: 20px;
        }

        .services-preview-icon-wrap::before {
          content: '';

          position: absolute;

          inset: -10px;

          border:
            1px solid
            rgba(213, 170, 84, 0.25);

          border-radius: 27px;

          transform: rotate(6deg);
        }

        .services-preview-icon {
          position: relative;

          display: flex;

          align-items: center;
          justify-content: center;

          width: 94px;
          height: 94px;

          color: #174fae;

          background:
            radial-gradient(
              circle at 30% 24%,
              #ffffff 0%,
              #edf4ff 28%,
              #d8e8ff 58%,
              #b8d0f3 82%,
              #8eaddd 100%
            );

          border:
            5px solid
            #d5aa54;

          border-radius: 26px;

          box-shadow:
            0 17px 32px
              rgba(0, 0, 0, 0.24),
            inset 7px 7px 13px
              rgba(255, 255, 255, 0.88),
            inset -8px -9px 15px
              rgba(36, 85, 196, 0.18);

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }

        .services-preview-icon::before {
          content: '';

          position: absolute;

          top: 11px;
          left: 17px;

          width: 33px;
          height: 18px;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.75);

          filter: blur(3px);

          transform: rotate(-25deg);
        }

        .services-preview-card:hover
          .services-preview-icon {
          transform:
            translateY(-6px)
            scale(1.05);

          box-shadow:
            0 23px 38px
              rgba(0, 0, 0, 0.28),
            inset 7px 7px 13px
              rgba(255, 255, 255, 0.9),
            inset -8px -9px 15px
              rgba(36, 85, 196, 0.22),
            0 0 0 8px
              rgba(213, 170, 84, 0.10);
        }

        /* =========================
           النصوص
        ========================= */

        .services-preview-main {
          width: 100%;

          display: flex;

          flex-direction: column;

          align-items: center;

          text-align: center;
        }

        .services-preview-label {
          display: inline-block;

          margin-bottom: 7px;

          color: #f0c56d;

          font-size: 13px;
          font-weight: 850;
        }

        .services-preview-content h3 {
          margin: 0;

          color: white;

          font-size:
            clamp(28px, 4vw, 39px);

          font-weight: 900;

          line-height: 1.3;

          text-align: center;

          text-shadow:
            0 3px 8px
              rgba(0, 0, 0, 0.18);
        }

        .services-preview-content h3 em {
          color: #f0c56d;
          font-style: normal;
        }

        .services-preview-content p {
          max-width: 680px;

          margin:
            14px auto 22px;

          color:
            rgba(255, 255, 255, 0.82);

          line-height: 1.95;

          text-align: center;
        }

        /* =========================
           الزر
        ========================= */

        .services-preview-button {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          gap: 9px;

          min-height: 50px;

          padding:
            0 22px;

          color: #173f91;

          background: white;

          border:
            2px solid
            #d5aa54;

          border-radius: 13px;

          font-weight: 900;

          text-decoration: none;

          box-shadow:
            0 9px 20px
              rgba(0, 0, 0, 0.15);

          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .services-preview-button:hover {
          color: #173f91;

          background: #fff8e8;

          transform:
            translateY(-3px);

          box-shadow:
            0 14px 26px
              rgba(0, 0, 0, 0.20);
        }

        .services-preview-button svg {
          transition:
            transform 0.2s ease;
        }

        .services-preview-button:hover svg {
          transform:
            translateX(-4px);
        }

        /* =========================
           أنواع الخدمات
        ========================= */

        .services-preview-features {
          position: relative;
          z-index: 2;

          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 13px;

          margin-top: 31px;

          padding-top: 25px;

          border-top:
            1px solid
            rgba(255, 255, 255, 0.18);
        }

        .services-preview-feature {
          display: flex;

          align-items: center;

          gap: 12px;

          min-width: 0;

          padding: 15px;

          background:
            rgba(255, 255, 255, 0.075);

          border:
            1px solid
            rgba(255, 255, 255, 0.15);

          border-radius: 16px;

          backdrop-filter: blur(10px);

          transition:
            transform 0.25s ease,
            background 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .services-preview-feature:hover {
          transform:
            translateY(-4px);

          background:
            rgba(255, 255, 255, 0.12);

          border-color:
            rgba(213, 170, 84, 0.50);

          box-shadow:
            0 12px 25px
              rgba(0, 0, 0, 0.12);
        }

        .services-preview-feature-icon {
          display: flex;

          align-items: center;
          justify-content: center;

          width: 48px;
          height: 48px;

          flex-shrink: 0;

          color: #174fae;

          background:
            radial-gradient(
              circle at 30% 25%,
              #ffffff,
              #dceaff
            );

          border:
            3px solid
            #d5aa54;

          border-radius: 14px;

          box-shadow:
            0 8px 15px
              rgba(0, 0, 0, 0.14);
        }

        .services-preview-feature strong,
        .services-preview-feature span {
          display: block;
        }

        .services-preview-feature strong {
          margin-bottom: 3px;

          color: white;

          font-size: 14px;
          font-weight: 850;
        }

        .services-preview-feature span {
          color:
            rgba(255, 255, 255, 0.68);

          font-size: 12px;

          line-height: 1.6;
        }

        /* =========================
           Tablet
        ========================= */

        @media (max-width: 800px) {
          .services-preview-card {
            padding:
              28px 20px 23px;

            border-radius: 23px;
          }

          .services-preview-badge {
            margin-inline: auto;
          }

          .services-preview-content {
            padding-top: 27px;
          }

          .services-preview-icon {
            width: 80px;
            height: 80px;

            border-radius: 21px;
          }

          .services-preview-icon svg {
            width: 32px;
            height: 32px;
          }

          .services-preview-features {
            grid-template-columns: 1fr;

            gap: 10px;
          }

          .services-preview-feature {
            padding: 13px;
          }
        }

        /* =========================
           Mobile
        ========================= */

        @media (max-width: 480px) {
          .services-preview-card {
            padding:
              22px 15px 18px;

            border-radius: 20px;
          }

          .services-preview-badge {
            width: fit-content;

            max-width: 100%;

            text-align: center;

            font-size: 11px;
          }

          .services-preview-content {
            padding-inline: 3px;
          }

          .services-preview-icon {
            width: 72px;
            height: 72px;

            border-width: 4px;

            border-radius: 19px;
          }

          .services-preview-icon svg {
            width: 29px;
            height: 29px;
          }

          .services-preview-label {
            font-size: 12px;
          }

          .services-preview-content h3 {
            font-size: 27px;
          }

          .services-preview-content p {
            font-size: 13px;
          }

          .services-preview-button {
            width: 100%;
          }

          .services-preview-feature-icon {
            width: 44px;
            height: 44px;
          }

          .services-preview-feature strong {
            font-size: 13px;
          }

          .services-preview-feature span {
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  )
}