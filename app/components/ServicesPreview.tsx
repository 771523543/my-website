'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Sparkles,
} from 'lucide-react'

export default function ServicesPreview() {
  return (
    <section className="services-preview-section" id="services">
      <div className="services-preview-container">

        {/* العنوان */}
        <div className="services-preview-heading">
          <span className="services-preview-kicker">
            <Sparkles size={15} />
            خدمات منصة هديل
          </span>

          <h2>
            خدماتنا
            <span className="services-preview-title-dot">.</span>
          </h2>

          <p>
            حلول طلابية وأكاديمية متكاملة تساعدك على تنظيم أعمالك
            الدراسية والبحثية وتقديمها بصورة احترافية.
          </p>
        </div>

        {/* البطاقة الرئيسية */}
        <div className="services-preview-card">

          {/* الزخارف */}
          <div className="services-preview-glow glow-one" />
          <div className="services-preview-glow glow-two" />

          <div className="services-preview-content">

            {/* الأيقونة */}
            <div className="services-preview-icon">
              <div className="services-preview-icon-inner">
                <BookOpen size={42} strokeWidth={1.7} />
              </div>

              <span className="services-preview-mini-icon">
                <GraduationCap size={18} />
              </span>
            </div>

            {/* النص */}
            <div className="services-preview-text">

              <span className="services-preview-small-title">
                خدمات طلابية وأكاديمية
              </span>

              <h3>
                كل ما تحتاجه في مكان واحد
              </h3>

              <p>
                استكشف مجموعة متنوعة من الخدمات البحثية والأكاديمية
                والتصميمية والمهنية المصممة لتناسب احتياجاتك الدراسية.
              </p>

              {/* المميزات */}
              <div className="services-preview-features">
                <div>
                  <CheckCircle2 size={17} />
                  <span>خدمات أكاديمية متنوعة</span>
                </div>

                <div>
                  <CheckCircle2 size={17} />
                  <span>تنظيم واهتمام بالتفاصيل</span>
                </div>

                <div>
                  <CheckCircle2 size={17} />
                  <span>تصميمات وعروض احترافية</span>
                </div>
              </div>

              {/* الزر */}
              <Link
                href="/services"
                className="services-preview-button"
              >
                <span>استكشف خدماتنا</span>

                <span className="services-preview-button-icon">
                  <ArrowLeft size={19} />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* أسفل القسم */}
        <div className="services-preview-bottom">
          <span>
            اختر الخدمة المناسبة لك
          </span>

          <div className="services-preview-line" />

          <span>
            وابدأ طلبك بسهولة
          </span>
        </div>
      </div>

      <style jsx>{`
        .services-preview-section {
          position: relative;
          padding: 90px 20px;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(125, 93, 177, 0.08),
              transparent 34%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(68, 145, 160, 0.07),
              transparent 32%
            );
        }

        .services-preview-container {
          width: min(1120px, 100%);
          margin: 0 auto;
        }

        /* =========================
           العنوان
        ========================= */

        .services-preview-heading {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 42px;
        }

        .services-preview-kicker {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(125, 93, 177, 0.09);
          border: 1px solid rgba(125, 93, 177, 0.14);
          color: #7556a8;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .services-preview-heading h2 {
          margin: 0;
          color: #27233a;
          font-size: clamp(34px, 5vw, 52px);
          line-height: 1.1;
          font-weight: 900;
          letter-spacing: -1.5px;
        }

        .services-preview-title-dot {
          color: #8a68bd;
        }

        .services-preview-heading p {
          margin: 17px auto 0;
          max-width: 650px;
          color: #716c7e;
          font-size: 16px;
          line-height: 1.9;
        }

        /* =========================
           البطاقة
        ========================= */

        .services-preview-card {
          position: relative;
          overflow: hidden;
          border-radius: 30px;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(126, 94, 178, 0.34),
            rgba(255, 255, 255, 0.8),
            rgba(74, 145, 160, 0.24)
          );
          box-shadow:
            0 25px 70px rgba(50, 39, 76, 0.10),
            0 5px 20px rgba(50, 39, 76, 0.05);
        }

        .services-preview-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              120deg,
              rgba(255, 255, 255, 0.78),
              rgba(250, 248, 253, 0.94)
            );
          z-index: 0;
        }

        .services-preview-content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 310px 1fr;
          gap: 60px;
          align-items: center;
          padding: 65px;
        }

        /* =========================
           الأيقونة
        ========================= */

        .services-preview-icon {
          position: relative;
          width: 240px;
          height: 240px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .services-preview-icon::before {
          content: '';
          position: absolute;
          width: 205px;
          height: 205px;
          border-radius: 50%;
          border: 1px solid rgba(125, 93, 177, 0.16);
          background:
            radial-gradient(
              circle,
              rgba(132, 100, 184, 0.16),
              rgba(132, 100, 184, 0.035) 68%,
              transparent 70%
            );
        }

        .services-preview-icon::after {
          content: '';
          position: absolute;
          width: 145px;
          height: 145px;
          border-radius: 50%;
          border: 1px dashed rgba(84, 139, 153, 0.25);
        }

        .services-preview-icon-inner {
          position: relative;
          z-index: 3;
          width: 112px;
          height: 112px;
          border-radius: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7656a9;
          background: linear-gradient(
            145deg,
            #ffffff,
            #f2edf9
          );
          border: 1px solid rgba(125, 93, 177, 0.16);
          box-shadow:
            0 18px 35px rgba(100, 75, 139, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .services-preview-mini-icon {
          position: absolute;
          z-index: 5;
          right: 16px;
          bottom: 22px;
          width: 42px;
          height: 42px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4f8997;
          background: #ffffff;
          border: 1px solid rgba(79, 137, 151, 0.15);
          box-shadow: 0 10px 25px rgba(58, 93, 105, 0.12);
        }

        /* =========================
           النص
        ========================= */

        .services-preview-text {
          min-width: 0;
        }

        .services-preview-small-title {
          display: inline-block;
          color: #795bad;
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 11px;
        }

        .services-preview-text h3 {
          margin: 0;
          color: #28243a;
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.25;
          font-weight: 900;
          letter-spacing: -0.8px;
        }

        .services-preview-text > p {
          max-width: 670px;
          margin: 16px 0 0;
          color: #6c6877;
          font-size: 16px;
          line-height: 1.95;
        }

        /* =========================
           المميزات
        ========================= */

        .services-preview-features {
          display: flex;
          flex-wrap: wrap;
          gap: 12px 22px;
          margin-top: 25px;
        }

        .services-preview-features div {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #575265;
          font-size: 13px;
          font-weight: 700;
        }

        .services-preview-features svg {
          color: #6d9e9e;
          flex-shrink: 0;
        }

        /* =========================
           الزر
        ========================= */

        .services-preview-button {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 30px;
          padding: 7px 8px 7px 20px;
          border-radius: 999px;
          text-decoration: none;
          color: #ffffff;
          background: linear-gradient(
            135deg,
            #7656aa,
            #624590
          );
          box-shadow:
            0 12px 28px rgba(103, 75, 147, 0.24);
          font-size: 14px;
          font-weight: 800;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            filter 0.25s ease;
        }

        .services-preview-button:hover {
          transform: translateY(-3px);
          filter: brightness(1.04);
          box-shadow:
            0 16px 34px rgba(103, 75, 147, 0.30);
        }

        .services-preview-button-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.16);
        }

        /* =========================
           الزخارف
        ========================= */

        .services-preview-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(2px);
        }

        .glow-one {
          width: 170px;
          height: 170px;
          top: -85px;
          right: -55px;
          background: rgba(125, 93, 177, 0.10);
        }

        .glow-two {
          width: 140px;
          height: 140px;
          bottom: -75px;
          left: 18%;
          background: rgba(73, 143, 157, 0.08);
        }

        /* =========================
           أسفل القسم
        ========================= */

        .services-preview-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-top: 25px;
          color: #918c99;
          font-size: 12px;
          font-weight: 700;
        }

        .services-preview-line {
          width: 45px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            #c7c1d0,
            transparent
          );
        }

        /* =========================
           الجوال
        ========================= */

        @media (max-width: 850px) {
          .services-preview-section {
            padding: 70px 16px;
          }

          .services-preview-content {
            grid-template-columns: 1fr;
            gap: 25px;
            padding: 42px 25px;
            text-align: center;
          }

          .services-preview-icon {
            width: 190px;
            height: 190px;
          }

          .services-preview-icon::before {
            width: 165px;
            height: 165px;
          }

          .services-preview-icon::after {
            width: 120px;
            height: 120px;
          }

          .services-preview-icon-inner {
            width: 92px;
            height: 92px;
            border-radius: 27px;
          }

          .services-preview-features {
            justify-content: center;
          }

          .services-preview-button {
            margin-left: auto;
            margin-right: auto;
          }
        }

        @media (max-width: 520px) {
          .services-preview-heading {
            margin-bottom: 30px;
          }

          .services-preview-heading p {
            font-size: 14px;
            line-height: 1.85;
          }

          .services-preview-card {
            border-radius: 24px;
          }

          .services-preview-content {
            padding: 35px 19px 40px;
          }

          .services-preview-text h3 {
            font-size: 28px;
          }

          .services-preview-text > p {
            font-size: 14px;
            line-height: 1.9;
          }

          .services-preview-features {
            align-items: center;
            flex-direction: column;
            gap: 10px;
          }

          .services-preview-bottom {
            gap: 8px;
            font-size: 10px;
          }

          .services-preview-line {
            width: 28px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .services-preview-button {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}