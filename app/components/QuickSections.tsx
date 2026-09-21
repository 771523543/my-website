'use client'

import Link from 'next/link'
import {
  Gem,
  GraduationCap,
  Trophy,
} from 'lucide-react'

const cards = [
  {
    title: 'خدماتنا',
    description: 'اكتشف خدماتنا الطلابية والأكاديمية',
    href: '/services',
    icon: GraduationCap,
    button: 'استكشف الخدمات',
    color: 'blue',
  },
  {
    title: 'باقاتنا',
    description: 'اختر الباقة المناسبة لرحلتك التعليمية',
    href: '#packages',
    icon: Gem,
    button: 'عرض الباقات',
    color: 'green',
  },
  {
    title: 'أعمالنا السابقة',
    description: 'تعرّف على أعمالنا ومشاريعنا السابقة',
    href: '/previous-works',
    icon: Trophy,
    button: 'شاهد الأعمال',
    color: 'purple',
  },
]

export default function QuickSections() {
  return (
    <section
      className="quick-sections-3d"
      aria-label="الأقسام الرئيسية"
    >
      <div className="quick-sections-panel">

        {/* =====================================
            العنوان
           ===================================== */}

        <div className="quick-heading-3d">

          <span className="quick-kicker">
            منصة هديل
          </span>

          <h2>
            كل ما تحتاجه
            <br />
            <em>في مكان واحد</em>
          </h2>

          <p>
            خدمات أكاديمية، باقات مميزة،
            وأعمال نفتخر بها
          </p>

        </div>


        {/* =====================================
            البطاقات
           ===================================== */}

        <div className="quick-cards-3d">

          {cards.map((card) => {
            const Icon = card.icon

            return (
              <Link
                key={card.title}
                href={card.href}
                className={`quick-card-3d quick-card-${card.color}`}
              >

                {/* اللمعة */}

                <span
                  className="quick-card-shine"
                  aria-hidden="true"
                />


                {/* الأيقونة */}

                <div className="quick-icon-3d">

                  <Icon
                    size={52}
                    strokeWidth={1.8}
                  />

                </div>


                {/* المحتوى */}

                <div className="quick-card-content-3d">

                  <h3>
                    {card.title}
                  </h3>

                  <p>
                    {card.description}
                  </p>

                </div>


                {/* الزر */}

                <span className="quick-card-button-3d">
                  {card.button}
                </span>


                {/* الإضاءة السفلية */}

                <span
                  className="quick-card-glow-3d"
                  aria-hidden="true"
                />

              </Link>
            )
          })}

        </div>

      </div>


      {/* =================================================
          التصميم بالكامل داخل الملف
          لا يحتاج إلى تعديل globals.css
         ================================================= */}

      <style jsx>{`

        /* =========================================
           القسم الرئيسي
           ========================================= */

        .quick-sections-3d {
          width: 100%;

          padding: 32px 16px;

          margin: 20px 0;

          direction: rtl;
        }


        /* =========================================
           اللوحة الرئيسية
           نفس هوية قسم الإنجازات
           ========================================= */

        .quick-sections-panel {
          position: relative;

          max-width: 1100px;

          margin: 0 auto;

          padding: 38px;

          background:
            linear-gradient(
              145deg,
              #173f91 0%,
              #2455c4 48%,
              #163878 100%
            );

          border: 2px solid #d5aa54;

          border-radius: 32px;

          overflow: hidden;

          box-shadow:
            0 24px 60px
              rgba(23,35,61,0.28),

            0 0 0 7px
              rgba(213,170,84,0.07),

            inset 0 1px 0
              rgba(255,255,255,0.20),

            inset 0 -3px 0
              rgba(0,0,0,0.18);
        }


        /* =========================================
           اللمعة الرئيسية
           ========================================= */

        .quick-sections-panel::before {
          content: '';

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              125deg,
              rgba(255,255,255,0.15),
              transparent 28%,
              transparent 72%,
              rgba(255,255,255,0.04)
            );
        }


        /* =========================================
           الإضاءة الناعمة
           ========================================= */

        .quick-sections-panel::after {
          content: '';

          position: absolute;

          width: 420px;

          height: 420px;

          top: -280px;

          left: -150px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,0.13),
              transparent 70%
            );

          pointer-events: none;
        }


        /* =========================================
           العنوان
           ========================================= */

        .quick-heading-3d {
          position: relative;

          z-index: 2;

          max-width: 650px;

          margin: 0 auto 30px;

          text-align: center;
        }


        .quick-kicker {
          display: inline-block;

          margin-bottom: 10px;

          color: #e2bc68;

          font-size: 13px;

          font-weight: 900;

          letter-spacing: 0.2px;
        }


        .quick-heading-3d h2 {
          margin: 0;

          color: #ffffff;

          font-size:
            clamp(30px, 4vw, 46px);

          font-weight: 900;

          line-height: 1.2;

          text-shadow:
            0 4px 12px
              rgba(0,0,0,0.25);
        }


        .quick-heading-3d h2 em {
          color: #ffffff;

          font-style: normal;
        }


        .quick-heading-3d p {
          max-width: 600px;

          margin: 15px auto 0;

          color:
            rgba(255,255,255,0.88);

          font-size: 15px;

          font-weight: 500;

          line-height: 1.9;
        }


        /* =========================================
           شبكة البطاقات
           ========================================= */

        .quick-cards-3d {
          position: relative;

          z-index: 2;

          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 10px;

          margin-top: 25px;
        }


        /* =========================================
           البطاقة
           ========================================= */

        .quick-card-3d {
          position: relative;

          min-width: 0;

          min-height: 330px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding: 28px 16px 22px;

          text-align: center;

          color: #ffffff;

          text-decoration: none;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.11),
              rgba(255,255,255,0.035)
            );

          border:
            1px solid
            rgba(255,255,255,0.18);

          border-radius: 22px;

          overflow: hidden;

          transition:
            transform 0.35s ease,
            background 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }


        .quick-card-3d:hover {
          transform:
            translateY(-7px);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.17),
              rgba(255,255,255,0.055)
            );

          border-color:
            rgba(213,170,84,0.42);

          box-shadow:
            0 20px 38px
              rgba(0,0,0,0.20);
        }


        .quick-card-3d:focus-visible {
          outline:
            3px solid
            rgba(213,170,84,0.75);

          outline-offset: 4px;
        }


        /* =========================================
           لمعة البطاقة
           ========================================= */

        .quick-card-shine {
          position: absolute;

          top: -80px;

          left: -80px;

          width: 180px;

          height: 180px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,0.13),
              transparent 70%
            );

          pointer-events: none;

          transition:
            transform 0.5s ease;
        }


        .quick-card-3d:hover
        .quick-card-shine {
          transform:
            translate(
              25px,
              25px
            );
        }


        /* =========================================
           دائرة الأيقونة
           نفس أسلوب إنجازاتنا بالأرقام
           ========================================= */

        .quick-icon-3d {
          position: relative;

          width: 112px;

          height: 112px;

          display: grid;

          place-items: center;

          flex-shrink: 0;

          margin-bottom: 20px;

          color: #174fae;

          background:
            radial-gradient(
              circle at 32% 25%,
              #ffffff 0%,
              #edf4ff 25%,
              #d8e8ff 55%,
              #b8d0f3 78%,
              #8eaddd 100%
            );

          border:
            5px solid #d5aa54;

          border-radius: 50%;

          box-shadow:

            0 15px 28px
              rgba(0,0,0,0.25),

            inset 7px 7px 14px
              rgba(255,255,255,0.85),

            inset -9px -10px 17px
              rgba(36,85,196,0.22),

            0 0 0 7px
              rgba(213,170,84,0.10);

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }


        /* =========================================
           لمعة دائرة الأيقونة
           ========================================= */

        .quick-icon-3d::before {
          content: '';

          position: absolute;

          top: 12px;

          left: 19px;

          width: 39px;

          height: 20px;

          border-radius: 50%;

          background:
            rgba(255,255,255,0.75);

          filter: blur(4px);

          transform:
            rotate(-25deg);
        }


        .quick-icon-3d svg {
          position: relative;

          z-index: 1;

          width: 55px;

          height: 55px;

          filter:
            drop-shadow(
              3px 5px 3px
              rgba(23,63,145,0.38)
            );
        }


        .quick-card-3d:hover
        .quick-icon-3d {
          transform:
            translateY(-7px)
            scale(1.06);

          box-shadow:

            0 22px 35px
              rgba(0,0,0,0.30),

            inset 7px 7px 14px
              rgba(255,255,255,0.9),

            inset -9px -10px 17px
              rgba(36,85,196,0.25),

            0 0 0 10px
              rgba(213,170,84,0.12);
        }


        /* =========================================
           محتوى البطاقة
           ========================================= */

        .quick-card-content-3d {
          position: relative;

          z-index: 2;

          width: 100%;

          text-align: center;
        }


        .quick-card-content-3d h3 {
          margin: 0;

          color: #ffffff;

          font-size: 21px;

          font-weight: 900;

          line-height: 1.4;

          text-shadow:
            0 3px 8px
              rgba(0,0,0,0.25);
        }


        .quick-card-content-3d p {
          max-width: 280px;

          margin: 9px auto 0;

          color:
            rgba(255,255,255,0.82);

          font-size: 13px;

          font-weight: 500;

          line-height: 1.8;
        }


        /* =========================================
           الزر
           ========================================= */

        .quick-card-button-3d {
          position: relative;

          z-index: 3;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          width: 100%;

          min-height: 44px;

          margin-top: 20px;

          padding: 9px 14px;

          color: #173f91;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #e9f1ff
            );

          border:
            2px solid
            #d5aa54;

          border-radius: 13px;

          font-size: 13px;

          font-weight: 900;

          line-height: 1.3;

          box-shadow:
            0 8px 18px
              rgba(0,0,0,0.18),

            inset 0 1px 0
              rgba(255,255,255,0.9);

          transition:
            transform 0.25s ease,
            filter 0.25s ease,
            box-shadow 0.25s ease;
        }


        .quick-card-3d:hover
        .quick-card-button-3d {
          transform:
            translateY(-2px);

          filter:
            brightness(1.04);

          box-shadow:
            0 12px 24px
              rgba(0,0,0,0.22);
        }


        /* =========================================
           ألوان البطاقات
           ========================================= */

        .quick-card-blue
        .quick-card-button-3d {
          border-color: #d5aa54;
        }


        .quick-card-green
        .quick-card-button-3d {
          border-color: #d5aa54;
        }


        .quick-card-purple
        .quick-card-button-3d {
          border-color: #d5aa54;
        }


        /* =========================================
           الإضاءة السفلية
           ========================================= */

        .quick-card-glow-3d {
          position: absolute;

          width: 150px;

          height: 150px;

          right: -75px;

          bottom: -75px;

          z-index: 0;

          border-radius: 50%;

          background:
            rgba(213,170,84,0.10);

          filter: blur(5px);

          pointer-events: none;
        }


        /* =========================================
           الجوال
           ========================================= */

        @media (max-width: 800px) {

          .quick-sections-3d {
            padding: 20px 10px;
          }


          .quick-sections-panel {
            padding: 24px 12px;

            border-radius: 24px;
          }


          .quick-cards-3d {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));

            gap: 7px;
          }


          .quick-card-3d {
            min-height: 275px;

            padding: 20px 8px;

            border-radius: 17px;
          }


          .quick-icon-3d {
            width: 84px;

            height: 84px;

            border-width: 4px;

            margin-bottom: 14px;
          }


          .quick-icon-3d svg {
            width: 40px;

            height: 40px;
          }


          .quick-card-content-3d h3 {
            font-size: 17px;
          }


          .quick-card-content-3d p {
            margin-top: 7px;

            font-size: 11px;

            line-height: 1.7;
          }


          .quick-card-button-3d {
            min-height: 40px;

            margin-top: 15px;

            padding: 8px 7px;

            border-radius: 11px;

            font-size: 10.5px;
          }

        }


        /* =========================================
           الجوال الصغير
           ========================================= */

        @media (max-width: 380px) {

          .quick-sections-panel {
            padding: 20px 8px;
          }


          .quick-heading-3d {
            margin-bottom: 24px;
          }


          .quick-heading-3d h2 {
            font-size: 27px;
          }


          .quick-heading-3d p {
            font-size: 11px;

            line-height: 1.7;
          }


          .quick-cards-3d {
            gap: 5px;
          }


          .quick-card-3d {
            min-height: 245px;

            padding: 16px 5px;

            border-radius: 14px;
          }


          .quick-icon-3d {
            width: 70px;

            height: 70px;

            margin-bottom: 11px;
          }


          .quick-icon-3d svg {
            width: 33px;

            height: 33px;
          }


          .quick-card-content-3d h3 {
            font-size: 13px;
          }


          .quick-card-content-3d p {
            font-size: 9px;

            line-height: 1.6;
          }


          .quick-card-button-3d {
            min-height: 35px;

            margin-top: 11px;

            padding: 7px 4px;

            font-size: 8.5px;

            border-radius: 9px;
          }

        }


        /* =========================================
           تقليل الحركة
           ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .quick-card-3d,
          .quick-icon-3d,
          .quick-card-button-3d,
          .quick-card-shine {
            transition: none;
          }


          .quick-card-3d:hover {
            transform: none;
          }


          .quick-card-3d:hover
          .quick-icon-3d,
          .quick-card-3d:hover
          .quick-card-button-3d,
          .quick-card-3d:hover
          .quick-card-shine {
            transform: none;
          }

        }

      `}</style>
    </section>
  )
}