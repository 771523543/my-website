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

    <div className="quick-cards-3d">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <Link
            key={card.title}
            href={card.href}
            className={`quick-card-3d quick-card-${card.color}`}
          >
            <span
              className="quick-card-shine"
              aria-hidden="true"
            />

            <div className="quick-icon-3d">
              <Icon
                size={38}
                strokeWidth={1.8}
              />
            </div>

            <div className="quick-card-content-3d">
              <h3>
                {card.title}
              </h3>

              <p>
                {card.description}
              </p>
            </div>

            <span className="quick-card-button-3d">
              {card.button}
            </span>

            <span
              className="quick-card-glow-3d"
              aria-hidden="true"
            />
          </Link>
        )
      })}
    </div>
  </div>

  <style jsx>{`

    /* =========================================
       القسم الرئيسي
       ========================================= */

    .quick-sections-3d {
      width: 100%;
      padding: 22px 14px;
      margin: 14px 0;
      direction: rtl;
    }


    /* =========================================
       اللوحة الرئيسية
       ========================================= */

    .quick-sections-panel {
      position: relative;
      max-width: 1050px;
      margin: 0 auto;
      padding: 25px 24px 24px;

      background:
        linear-gradient(
          145deg,
          #173f91 0%,
          #2455c4 48%,
          #163878 100%
        );

      border: 2px solid #d5aa54;
      border-radius: 26px;
      overflow: hidden;

      box-shadow:
        0 18px 42px
          rgba(23,35,61,0.24),

        0 0 0 5px
          rgba(213,170,84,0.06),

        inset 0 1px 0
          rgba(255,255,255,0.20),

        inset 0 -3px 0
          rgba(0,0,0,0.16);
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
          rgba(255,255,255,0.13),
          transparent 28%,
          transparent 72%,
          rgba(255,255,255,0.03)
        );
    }


    .quick-sections-panel::after {
      content: '';
      position: absolute;

      width: 300px;
      height: 300px;

      top: -210px;
      left: -100px;

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          rgba(255,255,255,0.11),
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

      max-width: 600px;
      margin: 0 auto 20px;

      text-align: center;
    }


    .quick-kicker {
      display: inline-block;

      margin-bottom: 5px;

      color: #e2bc68;

      font-size: 11px;
      font-weight: 900;
    }


    .quick-heading-3d h2 {
      margin: 0;

      color: #ffffff;

      font-size:
        clamp(25px, 3.5vw, 38px);

      font-weight: 900;
      line-height: 1.15;

      text-shadow:
        0 3px 9px
          rgba(0,0,0,0.23);
    }


    .quick-heading-3d h2 em {
      color: #ffffff;
      font-style: normal;
    }


    .quick-heading-3d p {
      max-width: 520px;

      margin: 8px auto 0;

      color:
        rgba(255,255,255,0.84);

      font-size: 12px;
      font-weight: 500;
      line-height: 1.6;
    }


    /* =========================================
       البطاقات
       ========================================= */

    .quick-cards-3d {
      position: relative;
      z-index: 2;

      display: grid;

      grid-template-columns:
        repeat(3, minmax(0, 1fr));

      gap: 9px;

      margin-top: 17px;
    }


    .quick-card-3d {
      position: relative;

      min-width: 0;
      min-height: 245px;

      display: flex;
      flex-direction: column;

      align-items: center;
      justify-content: center;

      padding: 18px 13px 15px;

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

      border-radius: 18px;
      overflow: hidden;

      transition:
        transform 0.3s ease,
        background 0.3s ease,
        box-shadow 0.3s ease,
        border-color 0.3s ease;
    }


    .quick-card-3d:hover {
      transform: translateY(-5px);

      background:
        linear-gradient(
          145deg,
          rgba(255,255,255,0.17),
          rgba(255,255,255,0.055)
        );

      border-color:
        rgba(213,170,84,0.42);

      box-shadow:
        0 14px 28px
          rgba(0,0,0,0.18);
    }


    .quick-card-3d:focus-visible {
      outline:
        3px solid
        rgba(213,170,84,0.75);

      outline-offset: 3px;
    }


    /* =========================================
       لمعة البطاقة
       ========================================= */

    .quick-card-shine {
      position: absolute;

      top: -65px;
      left: -65px;

      width: 145px;
      height: 145px;

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          rgba(255,255,255,0.12),
          transparent 70%
        );

      pointer-events: none;

      transition:
        transform 0.45s ease;
    }


    .quick-card-3d:hover
    .quick-card-shine {
      transform:
        translate(20px, 20px);
    }


    /* =========================================
       الأيقونة - أصغر
       ========================================= */

    .quick-icon-3d {
      position: relative;

      width: 78px;
      height: 78px;

      display: grid;
      place-items: center;

      flex-shrink: 0;

      margin-bottom: 12px;

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
        4px solid #d5aa54;

      border-radius: 50%;

      box-shadow:
        0 10px 21px
          rgba(0,0,0,0.22),

        inset 5px 5px 10px
          rgba(255,255,255,0.85),

        inset -7px -8px 13px
          rgba(36,85,196,0.20),

        0 0 0 5px
          rgba(213,170,84,0.08);

      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
    }


    .quick-icon-3d::before {
      content: '';

      position: absolute;

      top: 9px;
      left: 13px;

      width: 28px;
      height: 14px;

      border-radius: 50%;

      background:
        rgba(255,255,255,0.72);

      filter: blur(3px);

      transform:
        rotate(-25deg);
    }


    .quick-icon-3d svg {
      position: relative;
      z-index: 1;

      width: 38px;
      height: 38px;

      filter:
        drop-shadow(
          2px 4px 3px
          rgba(23,63,145,0.34)
        );
    }


    .quick-card-3d:hover
    .quick-icon-3d {
      transform:
        translateY(-4px)
        scale(1.04);

      box-shadow:
        0 16px 26px
          rgba(0,0,0,0.26),

        inset 5px 5px 10px
          rgba(255,255,255,0.9),

        inset -7px -8px 13px
          rgba(36,85,196,0.23),

        0 0 0 7px
          rgba(213,170,84,0.10);
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

      font-size: 17px;
      font-weight: 900;

      line-height: 1.3;

      text-shadow:
        0 2px 7px
          rgba(0,0,0,0.23);
    }


    .quick-card-content-3d p {
      max-width: 240px;

      margin: 6px auto 0;

      color:
        rgba(255,255,255,0.80);

      font-size: 11px;
      font-weight: 500;

      line-height: 1.6;
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

      min-height: 37px;

      margin-top: 13px;

      padding: 7px 11px;

      color: #173f91;

      background:
        linear-gradient(
          145deg,
          #ffffff,
          #e9f1ff
        );

      border:
        1.5px solid #d5aa54;

      border-radius: 10px;

      font-size: 11px;
      font-weight: 900;

      line-height: 1.2;

      box-shadow:
        0 6px 13px
          rgba(0,0,0,0.16),

        inset 0 1px 0
          rgba(255,255,255,0.9);

      transition:
        transform 0.2s ease,
        filter 0.2s ease,
        box-shadow 0.2s ease;
    }


    .quick-card-3d:hover
    .quick-card-button-3d {
      transform:
        translateY(-2px);

      filter:
        brightness(1.04);

      box-shadow:
        0 9px 17px
          rgba(0,0,0,0.20);
    }


    /* =========================================
       الإضاءة السفلية
       ========================================= */

    .quick-card-glow-3d {
      position: absolute;

      width: 120px;
      height: 120px;

      right: -60px;
      bottom: -60px;

      z-index: 0;

      border-radius: 50%;

      background:
        rgba(213,170,84,0.09);

      filter: blur(4px);

      pointer-events: none;
    }


    /* =========================================
       التابلت والجوال
       ========================================= */

    @media (max-width: 800px) {

      .quick-sections-3d {
        padding: 17px 9px;
        margin: 10px 0;
      }


      .quick-sections-panel {
        padding: 20px 9px;
        border-radius: 21px;
      }


      .quick-heading-3d {
        margin-bottom: 15px;
      }


      .quick-kicker {
        font-size: 10px;
      }


      .quick-heading-3d h2 {
        font-size: 25px;
      }


      .quick-heading-3d p {
        margin-top: 6px;
        font-size: 10.5px;
      }


      .quick-cards-3d {
        grid-template-columns:
          repeat(2, minmax(0, 1fr));

        gap: 6px;
        margin-top: 13px;
      }


      .quick-card-3d {
        min-height: 215px;
        padding: 15px 7px 12px;
        border-radius: 15px;
      }


      .quick-icon-3d {
        width: 65px;
        height: 65px;

        border-width: 3px;
        margin-bottom: 9px;
      }


      .quick-icon-3d svg {
        width: 31px;
        height: 31px;
      }


      .quick-card-content-3d h3 {
        font-size: 14px;
      }


      .quick-card-content-3d p {
        margin-top: 5px;
        font-size: 9.5px;
        line-height: 1.55;
      }


      .quick-card-button-3d {
        min-height: 34px;
        margin-top: 10px;

        padding: 6px 5px;

        border-radius: 9px;
        font-size: 9px;
      }

    }


    /* =========================================
       الجوال الصغير
       ========================================= */

    @media (max-width: 380px) {

      .quick-sections-panel {
        padding: 17px 6px;
      }


      .quick-heading-3d h2 {
        font-size: 22px;
      }


      .quick-heading-3d p {
        font-size: 9.5px;
      }


      .quick-cards-3d {
        gap: 5px;
      }


      .quick-card-3d {
        min-height: 195px;
        padding: 13px 5px 10px;
        border-radius: 13px;
      }


      .quick-icon-3d {
        width: 57px;
        height: 57px;

        margin-bottom: 8px;
      }


      .quick-icon-3d svg {
        width: 27px;
        height: 27px;
      }


      .quick-card-content-3d h3 {
        font-size: 12px;
      }


      .quick-card-content-3d p {
        font-size: 8.5px;
        line-height: 1.5;
      }


      .quick-card-button-3d {
        min-height: 31px;

        margin-top: 8px;

        padding: 5px 3px;

        font-size: 8px;
        border-radius: 8px;
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