'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  MessageCircle,
  Sparkles,
} from 'lucide-react'

const whatsappNumber = '967776280186'

export default function ServicesPreview() {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'السلام عليكم، أرغب في الاستفسار عن خدمات منصة هديل.',
  )}`

  return (
    <section
      className="services-preview-section"
      id="services"
    >
      <div className="services-preview-container">

        {/* =========================
            عنوان القسم
        ========================= */}

        <div className="services-preview-heading">

          <span className="services-preview-kicker">
            <Sparkles size={15} />
            خدمات منصة هديل
          </span>

          <h2>
            خدماتنا
            <span>.</span>
          </h2>

          <p>
            حلول طلابية وأكاديمية متكاملة تساعدك على
            تنظيم أعمالك الدراسية والبحثية وتقديمها
            بصورة احترافية.
          </p>

        </div>

        {/* =========================
            البطاقة الرئيسية
        ========================= */}

        <div className="services-preview-card">

          <div className="services-preview-glow glow-one" />
          <div className="services-preview-glow glow-two" />

          <div className="services-preview-content">

            {/* =========================
                الجانب البصري
            ========================= */}

            <div className="services-preview-visual">

              <div className="services-preview-icon">

                <div className="services-preview-icon-ring ring-one" />
                <div className="services-preview-icon-ring ring-two" />

                <div className="services-preview-icon-inner">
                  <BookOpen
                    size={43}
                    strokeWidth={1.7}
                  />
                </div>

                <span className="services-preview-mini-icon">
                  <GraduationCap size={19} />
                </span>

              </div>

              <div className="services-preview-visual-label">
                <span>منصة هديل</span>
                <strong>خدماتك تبدأ من هنا</strong>
              </div>

            </div>

            {/* =========================
                المحتوى
            ========================= */}

            <div className="services-preview-text">

              <span className="services-preview-small-title">
                خدمات طلابية وأكاديمية
              </span>

              <h3>
                كل ما تحتاجه
                <br />
                في مكان واحد
              </h3>

              <p>
                اكتشف مجموعة متنوعة من الخدمات البحثية
                والأكاديمية والتصميمية والمهنية المصممة
                لتناسب احتياجاتك الدراسية.
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
                  <span>تصاميم وعروض احترافية</span>
                </div>

              </div>

              {/* الأزرار */}

              <div className="services-preview-actions">

                <Link
                  href="/services"
                  className="services-preview-button"
                >
                  <span>استكشف خدماتنا</span>

                  <span className="services-preview-button-icon">
                    <ArrowLeft size={19} />
                  </span>
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="services-preview-whatsapp"
                >
                  <MessageCircle size={18} />
                  <span>استفسر عبر واتساب</span>
                </a>

              </div>

            </div>

          </div>
        </div>

        {/* =========================
            أسفل القسم
        ========================= */}

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

        /* =========================================
           القسم
        ========================================= */

        .services-preview-section {
          position: relative;
          padding: 90px 20px;
          overflow: hidden;

          background:
            radial-gradient(
              circle at 12% 18%,
              rgba(125, 93, 177, 0.075),
              transparent 32%
            ),
            radial-gradient(
              circle at 88% 82%,
              rgba(68, 145, 160, 0.065),
              transparent 32%
            );
        }

        .services-preview-container {
          width: min(1120px, 100%);
          margin: 0 auto;
        }

        /* =========================================
           العنوان
        ========================================= */

        .services-preview-heading {
          max-width: 720px;
          margin: 0 auto 42px;
          text-align: center;
        }

        .services-preview-kicker {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          padding: 8px 14px;
          border-radius: 999px;

          color: #7556a8;

          background:
            rgba(125, 93, 177, 0.09);

          border:
            1px solid rgba(125, 93, 177, 0.14);

          font-size: 13px;
          font-weight: 800;
        }

        .services-preview-heading h2 {
          margin: 17px 0 0;

          color: #28243a;

          font-size:
            clamp(35px, 5vw, 52px);

          line-height: 1.1;
          font-weight: 950;

          letter-spacing: -1.5px;
        }

        .services-preview-heading h2 span {
          color: #8160b5;
        }

        .services-preview-heading p {
          max-width: 650px;

          margin: 17px auto 0;

          color: #716c7e;

          font-size: 16px;
          line-height: 1.9;
        }

        /* =========================================
           البطاقة
        ========================================= */

        .services-preview-card {
          position: relative;

          overflow: hidden;

          padding: 1px;

          border-radius: 30px;

          background:
            linear-gradient(
              135deg,
              rgba(126, 94, 178, 0.34),
              rgba(255, 255, 255, 0.85),
              rgba(74, 145, 160, 0.25)
            );

          box-shadow:
            0 25px 70px
            rgba(50, 39, 76, 0.10),

            0 5px 20px
            rgba(50, 39, 76, 0.05);
        }

        .services-preview-card::before {
          content: '';

          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              120deg,
              rgba(255, 255, 255, 0.82),
              rgba(250, 248, 253, 0.95)
            );
        }

        .services-preview-content {
          position: relative;
          z-index: 2;

          display: grid;

          grid-template-columns:
            330px minmax(0, 1fr);

          gap: 55px;

          align-items: center;

          padding: 62px;
        }

        /* =========================================
           الجانب البصري
        ========================================= */

        .services-preview-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .services-preview-icon {
          position: relative;

          width: 245px;
          height: 245px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .services-preview-icon-ring {
          position: absolute;

          border-radius: 50%;

          pointer-events: none;
        }

        .ring-one {
          width: 215px;
          height: 215px;

          border:
            1px solid
            rgba(125, 93, 177, 0.17);

          background:
            radial-gradient(
              circle,
              rgba(132, 100, 184, 0.15),
              rgba(132, 100, 184, 0.035) 67%,
              transparent 69%
            );
        }

        .ring-two {
          width: 153px;
          height: 153px;

          border:
            1px dashed
            rgba(84, 139, 153, 0.27);
        }

        .services-preview-icon-inner {
          position: relative;
          z-index: 3;

          width: 112px;
          height: 112px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 32px;

          color: #7656a9;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #f1ecf8
            );

          border:
            1px solid
            rgba(125, 93, 177, 0.16);

          box-shadow:
            0 18px 35px
            rgba(100, 75, 139, 0.15),

            inset 0 1px 0
            rgba(255, 255, 255, 0.9);
        }

        .services-preview-mini-icon {
          position: absolute;

          z-index: 5;

          right: 13px;
          bottom: 23px;

          width: 43px;
          height: 43px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 14px;

          color: #4f8997;

          background: #ffffff;

          border:
            1px solid
            rgba(79, 137, 151, 0.15);

          box-shadow:
            0 10px 25px
            rgba(58, 93, 105, 0.12);
        }

        .services-preview-visual-label {
          display: flex;
          flex-direction: column;

          margin-top: 3px;

          text-align: center;
        }

        .services-preview-visual-label span {
          color: #8b8495;

          font-size: 11px;
          font-weight: 700;
        }

        .services-preview-visual-label strong {
          margin-top: 4px;

          color: #5f5770;

          font-size: 13px;
          font-weight: 850;
        }

        /* =========================================
           النص
        ========================================= */

        .services-preview-text {
          min-width: 0;
        }

        .services-preview-small-title {
          display: inline-block;

          margin-bottom: 11px;

          color: #795bad;

          font-size: 14px;
          font-weight: 850;
        }

        .services-preview-text h3 {
          margin: 0;

          color: #28243a;

          font-size:
            clamp(29px, 4vw, 43px);

          line-height: 1.3;

          font-weight: 950;

          letter-spacing: -0.9px;
        }

        .services-preview-text > p {
          max-width: 670px;

          margin: 17px 0 0;

          color: #6c6877;

          font-size: 16px;
          line-height: 1.95;
        }

        /* =========================================
           المميزات
        ========================================= */

        .services-preview-features {
          display: flex;
          flex-wrap: wrap;

          gap: 12px 20px;

          margin-top: 25px;
        }

        .services-preview-features div {
          display: inline-flex;
          align-items: center;

          gap: 7px;

          color: #575265;

          font-size: 12px;
          font-weight: 750;
        }

        .services-preview-features svg {
          flex-shrink: 0;

          color: #6d9e9e;
        }

        /* =========================================
           الأزرار
        ========================================= */

        .services-preview-actions {
          display: flex;
          flex-wrap: wrap;

          align-items: center;

          gap: 10px;

          margin-top: 30px;
        }

        .services-preview-button {
          display: inline-flex;
          align-items: center;

          gap: 12px;

          padding: 7px 8px 7px 20px;

          border-radius: 999px;

          color: #ffffff;

          background:
            linear-gradient(
              135deg,
              #7656aa,
              #624590
            );

          box-shadow:
            0 12px 28px
            rgba(103, 75, 147, 0.24);

          text-decoration: none;

          font-size: 13px;
          font-weight: 850;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            filter 0.25s ease;
        }

        .services-preview-button:hover {
          transform: translateY(-3px);

          filter: brightness(1.04);

          box-shadow:
            0 16px 34px
            rgba(103, 75, 147, 0.30);
        }

        .services-preview-button-icon {
          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.15);

          border:
            1px solid
            rgba(255, 255, 255, 0.16);
        }

        .services-preview-whatsapp {
          min-height: 52px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          padding: 0 17px;

          border-radius: 999px;

          color: #4d858b;

          background:
            rgba(79, 137, 151, 0.07);

          border:
            1px solid
            rgba(79, 137, 151, 0.15);

          text-decoration: none;

          font-size: 12px;
          font-weight: 850;

          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }

        .services-preview-whatsapp:hover {
          transform: translateY(-2px);

          background:
            rgba(79, 137, 151, 0.12);
        }

        .services-preview-whatsapp svg {
          color: #4d9295;
        }

        /* =========================================
           الزخارف
        ========================================= */

        .services-preview-glow {
          position: absolute;

          border-radius: 50%;

          pointer-events: none;
        }

        .glow-one {
          width: 180px;
          height: 180px;

          top: -90px;
          right: -60px;

          background:
            rgba(125, 93, 177, 0.09);

          filter: blur(3px);
        }

        .glow-two {
          width: 150px;
          height: 150px;

          bottom: -80px;
          left: 18%;

          background:
            rgba(73, 143, 157, 0.08);

          filter: blur(3px);
        }

        /* =========================================
           أسفل القسم
        ========================================= */

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

          background:
            linear-gradient(
              90deg,
              transparent,
              #c7c1d0,
              transparent
            );
        }

        /* =========================================
           الأجهزة المتوسطة
        ========================================= */

        @media (max-width: 900px) {

          .services-preview-content {
            grid-template-columns: 270px minmax(0, 1fr);

            gap: 35px;

            padding: 45px;
          }

          .services-preview-icon {
            width: 205px;
            height: 205px;
          }

          .ring-one {
            width: 180px;
            height: 180px;
          }

          .ring-two {
            width: 135px;
            height: 135px;
          }

          .services-preview-icon-inner {
            width: 96px;
            height: 96px;

            border-radius: 28px;
          }

          .services-preview-text h3 {
            font-size: 32px;
          }

          .services-preview-text > p {
            font-size: 14px;
          }

          .services-preview-features {
            flex-direction: column;
            gap: 9px;
          }
        }

        /* =========================================
           الجوال
        ========================================= */

        @media (max-width: 700px) {

          .services-preview-section {
            padding: 70px 15px;
          }

          .services-preview-heading {
            margin-bottom: 30px;
          }

          .services-preview-heading p {
            font-size: 14px;
            line-height: 1.85;
          }

          .services-preview-card {
            border-radius: 25px;
          }

          .services-preview-content {
            grid-template-columns: 1fr;

            gap: 20px;

            padding: 38px 22px 40px;

            text-align: center;
          }

          .services-preview-icon {
            width: 190px;
            height: 190px;
          }

          .ring-one {
            width: 165px;
            height: 165px;
          }

          .ring-two {
            width: 120px;
            height: 120px;
          }

          .services-preview-icon-inner {
            width: 88px;
            height: 88px;

            border-radius: 25px;
          }

          .services-preview-icon-inner svg {
            width: 34px;
            height: 34px;
          }

          .services-preview-mini-icon {
            width: 39px;
            height: 39px;

            right: 12px;
            bottom: 20px;
          }

          .services-preview-text h3 {
            font-size: 29px;
          }

          .services-preview-text > p {
            font-size: 14px;
            line-height: 1.9;
          }

          .services-preview-features {
            align-items: center;
          }

          .services-preview-actions {
            justify-content: center;

            flex-direction: column;
          }

          .services-preview-button,
          .services-preview-whatsapp {
            width: 100%;
          }

          .services-preview-button {
            justify-content: space-between;
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

          .services-preview-button,
          .services-preview-whatsapp {
            transition: none;
          }
        }

      `}</style>
    </section>
  )
}