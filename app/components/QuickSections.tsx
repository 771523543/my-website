'use client'

import Link from 'next/link'
import {
Gem,
GraduationCap,
Trophy,
Check,
} from 'lucide-react'

const cards = [
{
title: 'خدماتنا',
description: 'اكتشف خدماتنا الطلابية والأكاديمية.',
href: '/services',
icon: GraduationCap,
button: 'استكشف الخدمات',
},
{
title: 'باقاتنا',
description: 'اختر الباقة المناسبة لاحتياجك الأكاديمي.',
href: '#packages',
icon: Gem,
button: 'عرض الباقات',
},
{
title: 'أعمالنا السابقة',
description: 'تعرّف على أعمالنا ومشاريعنا السابقة.',
href: '/previous-works',
icon: Trophy,
button: 'شاهد الأعمال',
},
]

export default function QuickSections() {
return (
<section
data-reveal
className="quick-sections section soft-section reveal-section"
aria-label="الأقسام الرئيسية"
>
<div className="container">

    {/* ==================== العنوان ==================== */}

    <div className="quick-main-heading">
      <span className="section-kicker">
        منصة هديل
      </span>

      <h2>
        كل ما تحتاجه
        <br />
        <em>في مكان واحد</em>
      </h2>

      <p>
        خدمات أكاديمية، باقات مميزة، وأعمال نفتخر بها.
      </p>
    </div>

    {/* ==================== البطاقات ==================== */}

    <div className="quick-grid">

      {cards.map((card) => {
        const Icon = card.icon

        return (
          <article
            key={card.title}
            className="quick-card"
          >

            {/* الأيقونة */}

            <div className="quick-card-icon">
              <Icon
                size={28}
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

              <Link
                href={card.href}
                className="quick-more-button"
              >
                <span>
                  {card.button}
                </span>

                <span
                  className="quick-arrow"
                  aria-hidden="true"
                >
                  ←
                </span>
              </Link>

            </div>

            {/* علامة التحقق */}

            <span
              className="quick-check"
              aria-hidden="true"
            >
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

  <style jsx>{`

    /* =========================================
       القسم
       ========================================= */

    .quick-sections {
      direction: rtl;
    }


    /* =========================================
       العنوان
       ========================================= */

    .quick-main-heading {
      text-align: center;
      margin-bottom: 28px;
    }


    .quick-main-heading h2 {
      margin: 5px 0 0;

      color: #17233d;

      font-size:
        clamp(27px, 4vw, 40px);

      font-weight: 900;

      line-height: 1.2;

      letter-spacing: -0.5px;
    }


    .quick-main-heading h2 em {
      color: #2455c4;

      font-style: normal;
    }


    .quick-main-heading p {
      margin: 8px auto 0;

      max-width: 520px;

      color: #697791;

      font-size: 13px;

      line-height: 1.7;
    }


    /* =========================================
       الشبكة
       ========================================= */

    .quick-grid {
      display: grid;

      grid-template-columns:
        repeat(3, minmax(0, 1fr));

      gap: 14px;

      max-width: 1050px;

      margin: 0 auto;
    }


    /* =========================================
       البطاقة
       ========================================= */

    .quick-card {
      position: relative;

      min-width: 0;

      display: flex;

      align-items: flex-start;

      gap: 14px;

      padding: 20px 18px;

      background:
        rgba(255,255,255,0.96);

      border:
        1px solid #e4ebf4;

      border-radius: 18px;

      box-shadow:
        0 8px 24px
          rgba(23,35,61,0.06);

      transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        border-color 0.25s ease;

      overflow: hidden;
    }


    .quick-card::before {
      content: '';

      position: absolute;

      top: 0;
      right: 0;

      width: 100%;
      height: 3px;

      background:
        linear-gradient(
          90deg,
          #2455c4,
          #e9b24c
        );

      opacity: 0.8;
    }


    .quick-card:hover {
      transform:
        translateY(-4px);

      border-color:
        #d4deed;

      box-shadow:
        0 14px 30px
          rgba(23,35,61,0.11);
    }


    /* =========================================
       الأيقونة
       ========================================= */

    .quick-card-icon {
      flex:
        0 0 56px;

      width: 56px;
      height: 56px;

      display: grid;

      place-items: center;

      color: #2455c4;

      background:
        linear-gradient(
          145deg,
          #eef5ff,
          #ffffff
        );

      border:
        1px solid #dbe6f5;

      border-radius: 15px;

      box-shadow:
        inset 0 1px 0
          rgba(255,255,255,0.9);

      transition:
        transform 0.25s ease,
        background 0.25s ease;
    }


    .quick-card:hover
    .quick-card-icon {
      transform:
        translateY(-2px);

      background:
        linear-gradient(
          145deg,
          #e5efff,
          #ffffff
        );
    }


    .quick-card-icon svg {
      filter:
        drop-shadow(
          1px 2px 2px
          rgba(36,85,196,0.12)
        );
    }


    /* =========================================
       محتوى البطاقة
       ========================================= */

    .quick-card-content {
      min-width: 0;

      flex: 1;
    }


    .quick-card-content h3 {
      margin: 1px 0 0;

      color: #17233d;

      font-size: 17px;

      font-weight: 900;

      line-height: 1.35;
    }


    .quick-card-content p {
      margin: 5px 0 0;

      color: #697791;

      font-size: 11px;

      line-height: 1.65;
    }


    /* =========================================
       زر اعرف أكثر
       ========================================= */

    .quick-more-button {
      display: inline-flex;

      align-items: center;

      gap: 5px;

      margin-top: 11px;

      color: #2455c4;

      text-decoration: none;

      font-size: 10px;

      font-weight: 900;

      transition:
        color 0.2s ease;
    }


    .quick-more-button:hover {
      color: #173f91;
    }


    .quick-arrow {
      display: inline-flex;

      align-items: center;

      justify-content: center;

      transition:
        transform 0.2s ease;
    }


    .quick-more-button:hover
    .quick-arrow {
      transform:
        translateX(-3px);
    }


    .quick-more-button:focus-visible {
      outline:
        2px solid #2455c4;

      outline-offset: 4px;

      border-radius: 4px;
    }


    /* =========================================
       علامة التحقق
       ========================================= */

    .quick-check {
      position: absolute;

      top: 14px;
      left: 14px;

      width: 24px;
      height: 24px;

      display: grid;

      place-items: center;

      color: #ffffff;

      background:
        #2455c4;

      border:
        2px solid #ffffff;

      border-radius: 50%;

      box-shadow:
        0 3px 8px
          rgba(36,85,196,0.18);
    }


    /* =========================================
       الأجهزة المتوسطة
       ========================================= */

    @media (max-width: 900px) {

      .quick-grid {
        grid-template-columns:
          repeat(2, minmax(0, 1fr));

        gap: 10px;
      }


      .quick-card {
        padding: 17px 15px;
      }

    }


    /* =========================================
       الجوال
       ========================================= */

    @media (max-width: 620px) {

      .quick-main-heading {
        margin-bottom: 20px;
      }


      .quick-main-heading h2 {
        font-size: 25px;

        line-height: 1.25;
      }


      .quick-main-heading p {
        max-width: 320px;

        font-size: 11px;
      }


      .quick-grid {
        grid-template-columns: 1fr;

        gap: 9px;
      }


      .quick-card {
        min-height: 0;

        padding: 15px 14px;

        gap: 12px;

        border-radius: 16px;
      }


      .quick-card-icon {
        flex-basis: 50px;

        width: 50px;
        height: 50px;

        border-radius: 13px;
      }


      .quick-card-icon svg {
        width: 25px;
        height: 25px;
      }


      .quick-card-content h3 {
        font-size: 15px;
      }


      .quick-card-content p {
        margin-top: 4px;

        font-size: 10px;
      }


      .quick-more-button {
        margin-top: 8px;

        font-size: 9.5px;
      }


      .quick-check {
        top: 11px;
        left: 11px;

        width: 22px;
        height: 22px;
      }

    }


    /* =========================================
       الجوال الصغير
       ========================================= */

    @media (max-width: 380px) {

      .quick-card {
        padding: 13px 12px;

        gap: 10px;
      }


      .quick-card-icon {
        flex-basis: 46px;

        width: 46px;
        height: 46px;

        border-radius: 12px;
      }


      .quick-card-icon svg {
        width: 23px;
        height: 23px;
      }


      .quick-card-content h3 {
        font-size: 14px;
      }


      .quick-card-content p {
        font-size: 9px;
      }


      .quick-more-button {
        font-size: 9px;
      }


      .quick-check {
        width: 20px;
        height: 20px;

        top: 9px;
        left: 9px;
      }


      .quick-check svg {
        width: 12px;
        height: 12px;
      }

    }


    /* =========================================
       تقليل الحركة
       ========================================= */

    @media (prefers-reduced-motion: reduce) {

      .quick-card,
      .quick-card-icon,
      .quick-more-button,
      .quick-arrow {
        transition: none;
      }


      .quick-card:hover {
        transform: none;
      }


      .quick-card:hover
      .quick-card-icon,
      .quick-more-button:hover
      .quick-arrow {
        transform: none;
      }

    }

  `}</style>
</section>

)
}