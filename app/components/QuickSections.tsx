'use client'

import {
  ArrowLeft,
  Gem,
  GraduationCap,
  Sparkles,
  Trophy,
} from 'lucide-react'
import Link from 'next/link'

const cards = [
  {
    title: 'خدماتنا',
    description: 'اكتشف خدماتنا الطلابية والأكاديمية',
    href: '/services',
    icon: GraduationCap,
  },
  {
    title: 'باقاتنا',
    description: 'اختر الباقة المناسبة لرحلتك التعليمية',
    href: '#packages',
    icon: Gem,
  },
  {
    title: 'أعمالنا السابقة',
    description: 'تعرّف على أعمالنا ومشاريعنا السابقة',
    href: '/previous-works',
    icon: Trophy,
  },
]

export default function QuickSections() {
  return (
    <section
      className="quick-sections"
      aria-label="استكشف منصة هديل"
    >
      {/* الخلفية الأصلية والمؤثرات */}
      <div className="quick-background" aria-hidden="true">
        <div className="quick-glow quick-glow-one" />
        <div className="quick-glow quick-glow-two" />
        <div className="quick-glow quick-glow-three" />

        <div className="quick-light quick-light-one" />
        <div className="quick-light quick-light-two" />

        <div className="quick-particles">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              className="quick-particle"
              style={{
                left: `${(index * 17) % 100}%`,
                top: `${(index * 29) % 100}%`,
                animationDelay: `${index * 0.35}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* البطاقات */}
      <div className="quick-cards">
        {cards.map(
          ({ title, description, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              className="quick-card"
            >
              {/* توهج خلف البطاقة */}
              <div
                className="card-glow"
                aria-hidden="true"
              />

              {/* لمعان خفيف */}
              <div
                className="card-shine"
                aria-hidden="true"
              />

              {/* الأيقونة */}
              <div className="quick-icon-wrap">
                <div className="quick-icon-ring" />

                <div className="quick-icon">
                  <Icon
                    size={38}
                    strokeWidth={2.2}
                  />
                </div>

                <Sparkles
                  className="quick-icon-sparkle"
                  size={14}
                />
              </div>

              {/* المحتوى */}
              <div className="quick-card-content">
                <h3>{title}</h3>

                <p>{description}</p>
              </div>

              {/* السهم */}
              <div
                className="quick-arrow"
                aria-hidden="true"
              >
                <ArrowLeft size={18} />
              </div>

              {/* الخط السفلي */}
              <div
                className="quick-card-line"
                aria-hidden="true"
              />
            </Link>
          ),
        )}
      </div>

      <style jsx>{`
        .quick-sections {
          position: relative;
          width: 100%;
          overflow: hidden;

          padding: 48px 20px 58px;

          background:
            radial-gradient(
              circle at 15% 50%,
              rgba(37, 99, 235, 0.22),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 30%,
              rgba(212, 175, 55, 0.12),
              transparent 28%
            ),
            linear-gradient(
              135deg,
              #020617 0%,
              #06133a 45%,
              #071d52 100%
            );
        }

        /* =========================
           الخلفية والمؤثرات
        ========================= */

        .quick-background {
          position: absolute;
          inset: 0;

          overflow: hidden;

          pointer-events: none;
        }

        .quick-glow {
          position: absolute;

          border-radius: 999px;

          filter: blur(55px);

          opacity: 0.65;

          animation: glowMove 7s ease-in-out infinite;
        }

        .quick-glow-one {
          width: 260px;
          height: 260px;

          top: -90px;
          left: 8%;

          background: rgba(37, 99, 235, 0.25);
        }

        .quick-glow-two {
          width: 300px;
          height: 300px;

          right: 8%;
          bottom: -140px;

          background: rgba(212, 175, 55, 0.13);

          animation-delay: -2s;
        }

        .quick-glow-three {
          width: 190px;
          height: 190px;

          left: 47%;
          top: 45%;

          background: rgba(59, 130, 246, 0.16);

          animation-delay: -4s;
        }

        .quick-light {
          position: absolute;

          width: 2px;
          height: 180px;

          opacity: 0.35;

          background: linear-gradient(
            to bottom,
            transparent,
            rgba(212, 175, 55, 0.75),
            transparent
          );

          transform: rotate(24deg);

          animation: lightMove 8s linear infinite;
        }

        .quick-light-one {
          left: 20%;
          top: -70px;
        }

        .quick-light-two {
          right: 24%;
          top: -80px;

          animation-delay: -4s;
        }

        .quick-particles {
          position: absolute;
          inset: 0;
        }

        .quick-particle {
          position: absolute;

          width: 3px;
          height: 3px;

          border-radius: 50%;

          background: rgba(255, 255, 255, 0.7);

          box-shadow:
            0 0 12px rgba(147, 197, 253, 0.8);

          animation:
            particleFloat 5s ease-in-out infinite;
        }

        /* =========================
           البطاقات
        ========================= */

        .quick-cards {
          position: relative;
          z-index: 5;

          width: 100%;
          max-width: 1120px;

          margin: 0 auto;

          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 26px;

          direction: rtl;
        }

        .quick-card {
          position: relative;

          min-height: 255px;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          padding: 34px 28px 32px;

          overflow: hidden;

          text-align: center;

          text-decoration: none;

          /*
            أزرق واضح وثابت
          */
          background:
            linear-gradient(
              145deg,
              #1261d6 0%,
              #0b4db5 48%,
              #083b91 100%
            );

          border: 1px solid
            rgba(255, 255, 255, 0.35);

          border-radius: 26px;

          box-shadow:
            0 18px 45px
              rgba(0, 0, 0, 0.4),
            inset 0 1px 0
              rgba(255, 255, 255, 0.22),
            inset 0 -20px 45px
              rgba(0, 19, 70, 0.18);

          /*
            البطاقة ثابتة
            لا يوجد floating أو animation
          */
          transform: translateY(0);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        /*
          تأثير hover فقط عند لمس/مرور المستخدم
        */
        .quick-card:hover {
          transform: translateY(-7px);

          border-color:
            rgba(255, 255, 255, 0.72);

          box-shadow:
            0 25px 60px
              rgba(0, 0, 0, 0.5),
            0 0 28px
              rgba(37, 99, 235, 0.3),
            inset 0 1px 0
              rgba(255, 255, 255, 0.3);
        }

        /* =========================
           توهج داخل البطاقة
        ========================= */

        .card-glow {
          position: absolute;

          width: 190px;
          height: 190px;

          top: -120px;
          left: 50%;

          transform: translateX(-50%);

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.13);

          filter: blur(45px);

          pointer-events: none;
        }

        /*
          لمعان ثابت خفيف بدل الحركة
          حتى لا يشتت الانتباه
        */
        .card-shine {
          position: absolute;

          width: 55%;
          height: 180%;

          top: -40%;
          left: -65%;

          transform: rotate(20deg);

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.07),
              transparent
            );

          pointer-events: none;
        }

        /* =========================
           الأيقونة
        ========================= */

        .quick-icon-wrap {
          position: relative;

          z-index: 4;

          width: 82px;
          height: 82px;

          display: grid;

          place-items: center;

          margin-bottom: 19px;

          border-radius: 23px;

          background:
            rgba(255, 255, 255, 0.14);

          border:
            1px solid
            rgba(255, 255, 255, 0.48);

          box-shadow:
            0 10px 28px
              rgba(0, 0, 0, 0.28),
            inset 0 1px 0
              rgba(255, 255, 255, 0.22);
        }

        .quick-icon-ring {
          position: absolute;

          inset: -7px;

          border-radius: 28px;

          border:
            1px solid
            rgba(255, 255, 255, 0.2);
        }

        .quick-icon {
          position: relative;

          z-index: 2;

          display: grid;

          place-items: center;

          color: #ffffff;

          filter:
            drop-shadow(
              0 2px 5px
              rgba(0, 0, 0, 0.35)
            );
        }

        .quick-card:hover .quick-icon {
          transform: scale(1.06);
        }

        .quick-icon-sparkle {
          position: absolute;

          top: -7px;
          right: -7px;

          color: #ffffff;

          filter:
            drop-shadow(
              0 0 6px
              rgba(255, 255, 255, 0.7)
            );
        }

        /* =========================
           النص
        ========================= */

        .quick-card-content {
          position: relative;

          z-index: 4;

          width: 100%;
        }

        .quick-card h3 {
          margin: 0;

          color: #ffffff;

          font-size: 26px;

          line-height: 1.35;

          font-weight: 900;

          text-shadow:
            0 2px 10px
            rgba(0, 0, 0, 0.35);
        }

        .quick-card p {
          max-width: 275px;

          margin: 10px auto 0;

          color:
            rgba(255, 255, 255, 0.94);

          font-size: 15px;

          line-height: 1.8;

          font-weight: 600;

          text-shadow:
            0 1px 7px
            rgba(0, 0, 0, 0.3);
        }

        /* =========================
           السهم
        ========================= */

        .quick-arrow {
          position: absolute;

          z-index: 4;

          left: 18px;
          bottom: 18px;

          width: 35px;
          height: 35px;

          display: grid;

          place-items: center;

          border-radius: 50%;

          color: #ffffff;

          background:
            rgba(255, 255, 255, 0.13);

          border:
            1px solid
            rgba(255, 255, 255, 0.28);

          transition:
            transform 0.3s ease,
            background 0.3s ease;
        }

        .quick-card:hover .quick-arrow {
          transform: translateX(-4px);

          background:
            rgba(255, 255, 255, 0.22);
        }

        /* =========================
           الخط السفلي
        ========================= */

        .quick-card-line {
          position: absolute;

          z-index: 4;

          left: 22%;
          right: 22%;
          bottom: 9px;

          height: 2px;

          border-radius: 999px;

          background:
            rgba(255, 255, 255, 0.65);

          opacity: 0.75;
        }

        /* =========================
           حركة الخلفية فقط
        ========================= */

        @keyframes glowMove {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }

          50% {
            transform:
              translate3d(20px, -15px, 0)
              scale(1.08);
          }
        }

        @keyframes lightMove {
          0% {
            transform:
              translateY(-30px)
              rotate(24deg);

            opacity: 0;
          }

          20% {
            opacity: 0.4;
          }

          80% {
            opacity: 0.25;
          }

          100% {
            transform:
              translateY(280px)
              rotate(24deg);

            opacity: 0;
          }
        }

        @keyframes particleFloat {
          0%,
          100% {
            opacity: 0.2;

            transform:
              translateY(0)
              scale(0.8);
          }

          50% {
            opacity: 0.8;

            transform:
              translateY(-18px)
              scale(1.2);
          }
        }

        /* =========================
           الجوال
        ========================= */

        @media (max-width: 850px) {
          .quick-cards {
            grid-template-columns:
              repeat(3, minmax(270px, 1fr));

            overflow-x: auto;

            padding:
              8px 4px 18px;

            scrollbar-width: none;

            scroll-snap-type: x mandatory;
          }

          .quick-cards::-webkit-scrollbar {
            display: none;
          }

          .quick-card {
            scroll-snap-align: center;
          }
        }

        @media (max-width: 600px) {
          .quick-sections {
            padding:
              35px 14px 45px;
          }

          .quick-cards {
            gap: 16px;
          }

          .quick-card {
            min-height: 235px;

            padding:
              28px 20px 30px;

            border-radius: 23px;
          }

          .quick-icon-wrap {
            width: 74px;
            height: 74px;

            margin-bottom: 16px;
          }

          .quick-icon svg {
            width: 34px;
            height: 34px;
          }

          .quick-card h3 {
            font-size: 23px;
          }

          .quick-card p {
            font-size: 14px;

            line-height: 1.7;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .quick-glow,
          .quick-light,
          .quick-particle {
            animation: none !important;
          }

          .quick-card,
          .quick-card:hover {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}