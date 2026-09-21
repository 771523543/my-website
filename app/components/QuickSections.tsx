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
},
{
title: 'باقاتنا',
description: 'اختر الباقة المناسبة لرحلتك التعليمية',
href: '#packages',
icon: Gem,
button: 'عرض الباقات',
},
{
title: 'أعمالنا السابقة',
description: 'تعرّف على أعمالنا ومشاريعنا السابقة',
href: '/previous-works',
icon: Trophy,
button: 'شاهد الأعمال',
},
]

export default function QuickSections() {
return (
<section
className="quick-sections"
aria-label="الأقسام الرئيسية"
>
<div className="quick-sections-container">

    {/* العنوان */}

    <div className="quick-sections-heading">
      <span className="quick-sections-kicker">
        منصة هديل
      </span>

      <h2>
        كل ما تحتاجه
        <br />
        <span>في مكان واحد</span>
      </h2>

      <p>
        خدمات أكاديمية، باقات مميزة، وأعمال نفتخر بها
      </p>
    </div>


    {/* البطاقات */}

    <div className="quick-sections-grid">

      {cards.map((card) => {
        const Icon = card.icon

        return (
          <Link
            key={card.title}
            href={card.href}
            className="quick-card"
          >

            {/* الأيقونة */}

            <div className="quick-card-icon">
              <Icon
                size={30}
                strokeWidth={1.8}
              />
            </div>


            {/* المحتوى */}

            <div className="quick-card-content">

              <h3>
                {card.title}
              </h3>

              <p>
                {card.description}
              </p>

            </div>


            {/* الزر */}

            <span className="quick-card-button">
              {card.button}
              <span aria-hidden="true">←</span>
            </span>

          </Link>
        )
      })}

    </div>

  </div>


  <style jsx>{`

    /* =========================================
       القسم
       ========================================= */

    .quick-sections {
      width: 100%;
      padding: 20px 16px;
      margin: 10px 0;
      direction: rtl;
    }


    /* =========================================
       الحاوية الرئيسية
       ========================================= */

    .quick-sections-container {
      position: relative;

      width: 100%;
      max-width: 1080px;

      margin: 0 auto;

      padding: 25px 22px 22px;

      background:
        linear-gradient(
          135deg,
          #173f91 0%,
          #2455c4 50%,
          #173878 100%
        );

      border: 1.5px solid #d5aa54;

      border-radius: 24px;

      overflow: hidden;

      box-shadow:
        0 15px 35px
          rgba(23,35,61,0.20),

        inset 0 1px 0
          rgba(255,255,255,0.16);
    }


    /* إضاءة خلفية */

    .quick-sections-container::before {
      content: '';

      position: absolute;

      width: 260px;
      height: 260px;

      top: -170px;
      left: -80px;

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          rgba(255,255,255,0.12),
          transparent 70%
        );

      pointer-events: none;
    }


    .quick-sections-container::after {
      content: '';

      position: absolute;

      width: 220px;
      height: 220px;

      right: -120px;
      bottom: -140px;

      border-radius: 50%;

      background:
        radial-gradient(
          circle,
          rgba(213,170,84,0.12),
          transparent 70%
        );

      pointer-events: none;
    }


    /* =========================================
       العنوان
       ========================================= */

    .quick-sections-heading {
      position: relative;

      z-index: 2;

      text-align: center;

      margin-bottom: 18px;
    }


    .quick-sections-kicker {
      display: inline-block;

      margin-bottom: 4px;

      color: #e2bc68;

      font-size: 11px;

      font-weight: 800;
    }


    .quick-sections-heading h2 {
      margin: 0;

      color: #ffffff;

      font-size:
        clamp(25px, 3.5vw, 36px);

      font-weight: 900;

      line-height: 1.15;

      text-shadow:
        0 3px 9px
          rgba(0,0,0,0.20);
    }


    .quick-sections-heading h2 span {
      color: #ffffff;
    }


    .quick-sections-heading p {
      margin: 7px auto 0;

      color:
        rgba(255,255,255,0.82);

      font-size: 12px;

      line-height: 1.6;
    }


    /* =========================================
       شبكة البطاقات
       ========================================= */

    .quick-sections-grid {
      position: relative;

      z-index: 2;

      display: grid;

      grid-template-columns:
        repeat(3, minmax(0, 1fr));

      gap: 9px;
    }


    /* =========================================
       البطاقة
       ========================================= */

    .quick-card {
      position: relative;

      min-width: 0;

      min-height: 190px;

      display: flex;

      flex-direction: column;

      align-items: center;

      justify-content: center;

      padding: 17px 13px 14px;

      text-align: center;

      color: #ffffff;

      text-decoration: none;

      background:
        rgba(255,255,255,0.09);

      border:
        1px solid
        rgba(255,255,255,0.20);

      border-radius: 17px;

      overflow: hidden;

      transition:
        transform 0.25s ease,
        background 0.25s ease,
        border-color 0.25s ease,
        box-shadow 0.25s ease;
    }


    .quick-card::before {
      content: '';

      position: absolute;

      inset: 0;

      background:
        linear-gradient(
          135deg,
          rgba(255,255,255,0.08),
          transparent 45%
        );

      pointer-events: none;
    }


    .quick-card:hover {
      transform:
        translateY(-4px);

      background:
        rgba(255,255,255,0.14);

      border-color:
        rgba(213,170,84,0.65);

      box-shadow:
        0 12px 24px
          rgba(0,0,0,0.16);
    }


    .quick-card:focus-visible {
      outline:
        3px solid
        rgba(213,170,84,0.8);

      outline-offset: 3px;
    }


    /* =========================================
       الأيقونة
       ========================================= */

    .quick-card-icon {
      position: relative;

      z-index: 2;

      width: 58px;
      height: 58px;

      display: grid;

      place-items: center;

      margin-bottom: 10px;

      color: #174fae;

      background:
        linear-gradient(
          145deg,
          #ffffff,
          #e4efff
        );

      border:
        2.5px solid #d5aa54;

      border-radius: 50%;

      box-shadow:
        0 7px 15px
          rgba(0,0,0,0.20),

        inset 0 1px 2px
          rgba(255,255,255,0.9);

      transition:
        transform 0.25s ease,
        box-shadow 0.25s ease;
    }


    .quick-card-icon::before {
      content: '';

      position: absolute;

      width: 22px;
      height: 9px;

      top: 7px;
      left: 12px;

      border-radius: 50%;

      background:
        rgba(255,255,255,0.85);

      filter: blur(2px);

      transform:
        rotate(-25deg);
    }


    .quick-card-icon svg {
      position: relative;

      z-index: 1;

      width: 30px;
      height: 30px;

      filter:
        drop-shadow(
          2px 3px 2px
          rgba(23,63,145,0.28)
        );
    }


    .quick-card:hover
    .quick-card-icon {
      transform:
        translateY(-3px)
        scale(1.04);

      box-shadow:
        0 11px 20px
          rgba(0,0,0,0.25),

        inset 0 1px 2px
          rgba(255,255,255,0.9);
    }


    /* =========================================
       محتوى البطاقة
       ========================================= */

    .quick-card-content {
      position: relative;

      z-index: 2;

      width: 100%;
    }


    .quick-card-content h3 {
      margin: 0;

      color: #ffffff;

      font-size: 16px;

      font-weight: 900;

      line-height: 1.3;

      text-shadow:
        0 2px 6px
          rgba(0,0,0,0.20);
    }


    .quick-card-content p {
      max-width: 230px;

      margin: 5px auto 0;

      color:
        rgba(255,255,255,0.78);

      font-size: 10.5px;

      font-weight: 500;

      line-height: 1.55;
    }


    /* =========================================
       الزر
       ========================================= */

    .quick-card-button {
      position: relative;

      z-index: 2;

      display: inline-flex;

      align-items: center;

      justify-content: center;

      gap: 5px;

      width: 100%;

      min-height: 34px;

      margin-top: 11px;

      padding: 6px 9px;

      color: #173f91;

      background:
        linear-gradient(
          135deg,
          #ffffff,
          #edf4ff
        );

      border:
        1px solid #d5aa54;

      border-radius: 9px;

      font-size: 10px;

      font-weight: 900;

      line-height: 1.2;

      box-shadow:
        0 5px 11px
          rgba(0,0,0,0.15);

      transition:
        transform 0.2s ease,
        filter 0.2s ease;
    }


    .quick-card-button span {
      font-size: 12px;

      transition:
        transform 0.2s ease;
    }


    .quick-card:hover
    .quick-card-button {
      transform:
        translateY(-1px);

      filter:
        brightness(1.04);
    }


    .quick-card:hover
    .quick-card-button span {
      transform:
        translateX(-2px);
    }


    /* =========================================
       الجوال
       ========================================= */

    @media (max-width: 800px) {

      .quick-sections {
        padding: 15px 9px;
        margin: 8px 0;
      }


      .quick-sections-container {
        padding: 19px 8px 17px;

        border-radius: 20px;
      }


      .quick-sections-heading {
        margin-bottom: 13px;
      }


      .quick-sections-kicker {
        font-size: 9px;
      }


      .quick-sections-heading h2 {
        font-size: 24px;
      }


      .quick-sections-heading p {
        margin-top: 5px;

        font-size: 9.5px;
      }


      .quick-sections-grid {
        grid-template-columns:
          repeat(2, minmax(0, 1fr));

        gap: 6px;
      }


      .quick-card {
        min-height: 175px;

        padding: 13px 7px 11px;

        border-radius: 14px;
      }


      .quick-card-icon {
        width: 52px;
        height: 52px;

        margin-bottom: 8px;

        border-width: 2px;
      }


      .quick-card-icon svg {
        width: 27px;
        height: 27px;
      }


      .quick-card-content h3 {
        font-size: 14px;
      }


      .quick-card-content p {
        margin-top: 4px;

        font-size: 9px;

        line-height: 1.5;
      }


      .quick-card-button {
        min-height: 31px;

        margin-top: 8px;

        padding: 5px;

        border-radius: 8px;

        font-size: 8.5px;
      }

    }


    /* =========================================
       الجوال الصغير
       ========================================= */

    @media (max-width: 380px) {

      .quick-sections-container {
        padding: 16px 6px 14px;

        border-radius: 18px;
      }


      .quick-sections-heading h2 {
        font-size: 21px;
      }


      .quick-sections-heading p {
        font-size: 9px;
      }


      .quick-sections-grid {
        gap: 5px;
      }


      .quick-card {
        min-height: 160px;

        padding: 11px 5px 9px;
      }


      .quick-card-icon {
        width: 46px;
        height: 46px;

        margin-bottom: 7px;
      }


      .quick-card-icon svg {
        width: 24px;
        height: 24px;
      }


      .quick-card-content h3 {
        font-size: 12px;
      }


      .quick-card-content p {
        font-size: 8px;
      }


      .quick-card-button {
        min-height: 28px;

        margin-top: 7px;

        padding: 4px 3px;

        font-size: 7.5px;
      }


      .quick-card-button span {
        font-size: 10px;
      }

    }


    /* =========================================
       تقليل الحركة
       ========================================= */

    @media (prefers-reduced-motion: reduce) {

      .quick-card,
      .quick-card-icon,
      .quick-card-button,
      .quick-card-button span {
        transition: none;
      }


      .quick-card:hover,
      .quick-card:hover
      .quick-card-icon,
      .quick-card:hover
      .quick-card-button {
        transform: none;
      }

    }

  `}</style>
</section>

)
}