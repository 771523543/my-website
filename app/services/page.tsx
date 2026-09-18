'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Send, Sparkles } from 'lucide-react'
import {
  services,
  type ServiceCategory,
  whatsappNumber,
} from '../components/Services'

const categories: {
  id: 'all' | ServiceCategory
  label: string
}[] = [
  { id: 'all', label: 'جميع الخدمات' },
  { id: 'research', label: 'الخدمات البحثية' },
  { id: 'academic', label: 'الخدمات الأكاديمية' },
  { id: 'design', label: 'التصميم والخدمات المهنية' },
]

export default function ServicesPage() {
  return (
    <main className="services-page">
      {/* =========================
          Hero
      ========================= */}
      <section className="services-hero">
        <div className="container">
          <div className="services-hero-content">
            <div className="services-kicker">
              <span className="services-kicker-dot" />
              منصة هديل للخدمات الطلابية والأكاديمية
            </div>

            <h1>
              خدماتنا
              <span> الأكاديمية والطلابية</span>
            </h1>

            <p>
              اختر الخدمة التي تحتاجها واستكشف تفاصيلها ومتطلباتها، ثم أرسل
              طلبك بسهولة عبر منصة هديل.
            </p>

            <div className="services-hero-badge">
              <Sparkles size={17} />
              <span>خدمات متنوعة في مكان واحد</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Services Content
      ========================= */}
      <section className="services-content">
        <div className="container">
          <div className="services-intro">
            <div>
              <span className="services-section-label">
                استكشف خدماتنا
              </span>

              <h2>اختر الخدمة المناسبة لاحتياجك</h2>
            </div>

            <p>
              نقدم مجموعة متنوعة من الخدمات البحثية والأكاديمية والتصميمية
              والمهنية.
            </p>
          </div>

          {/* التصنيفات */}
          <div
            className="services-categories"
            aria-label="تصنيفات الخدمات"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`services-category ${
                  category.id === 'all' ? 'active' : ''
                }`}
                onClick={() => {
                  const element = document.getElementById(
                    category.id === 'all'
                      ? 'all-services'
                      : `category-${category.id}`,
                  )

                  element?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  })
                }}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* =========================
              بطاقات الخدمات
          ========================= */}
          <div id="all-services" className="services-grid">
            {services.map((service) => {
              const Icon = service.icon

              const whatsappMessage = encodeURIComponent(
                service.orderText,
              )

              const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

              return (
                <article
                  key={service.id}
                  id={`category-${service.category}-${service.id}`}
                  className="service-page-card"
                >
                  {/* =========================
                      صورة الخدمة
                  ========================= */}
                  <div className="service-page-image">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 650px) 100vw, (max-width: 950px) 50vw, 33vw"
                    />

                    <div className="service-page-image-overlay" />

                    <span className="service-page-category">
                      {service.category === 'research'
                        ? 'بحثي'
                        : service.category === 'academic'
                          ? 'أكاديمي'
                          : 'تصميم ومهني'}
                    </span>
                  </div>

                  {/* =========================
                      الأيقونة
                  ========================= */}
                  <div className="service-page-card-top">
                    <div className="service-page-icon">
                      <Icon size={30} strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* =========================
                      محتوى البطاقة
                  ========================= */}
                  <div className="service-page-card-body">
                    {/* العنوان في الوسط */}
                    <h3>{service.title}</h3>

                    {/* الوصف المختصر في الوسط */}
                    <p className="service-page-subtitle">
                      {service.subtitle}
                    </p>

                    {/* الشرح باليمين */}
                    <p className="service-page-about">
                      {service.about}
                    </p>

                    {/* التفاصيل باليمين */}
                    <div className="service-page-points">
                      {service.whatWeOffer
                        .slice(0, 3)
                        .map((item) => (
                          <div
                            key={item}
                            className="service-page-point"
                          >
                            <CheckCircle2 size={16} />
                            <span>{item}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* =========================
                      الأزرار
                  ========================= */}
                  <div className="service-page-card-footer">
                    <Link
                      href={`/services/${service.id}`}
                      className="service-details-button"
                    >
                      <span>تفاصيل الخدمة</span>
                      <ArrowLeft size={17} />
                    </Link>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="service-order-button"
                    >
                      <Send size={16} />
                      <span>اطلب خدمتك الآن</span>
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================
          Bottom CTA
      ========================= */}
      <section className="services-bottom-cta">
        <div className="container">
          <div className="services-bottom-card">
            <div>
              <span>هل تحتاج إلى مساعدة؟</span>

              <h2>لم تجد الخدمة المناسبة؟</h2>

              <p>
                تواصل معنا وسنساعدك في معرفة الخدمة المناسبة لاحتياجك.
              </p>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="services-whatsapp-button"
            >
              تواصل معنا
              <ArrowLeft size={18} />
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-page {
          min-height: 100vh;
          background: var(--background);
          color: var(--foreground);
        }

        /* =========================
           Hero
        ========================= */

        .services-hero {
          position: relative;
          overflow: hidden;
          padding: 125px 0 70px;
          background: linear-gradient(
            135deg,
            #2455c4 0%,
            #234da9 58%,
            #17233d 100%
          );
          color: white;
        }

        .services-hero::after {
          content: '';
          position: absolute;
          width: 280px;
          height: 280px;
          left: -90px;
          bottom: -160px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 50%;
        }

        .services-hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin-inline: auto;
          text-align: center;
        }

        .services-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          color: #f7c25e;
          font-size: 14px;
          font-weight: 800;
        }

        .services-kicker-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #f7c25e;
          box-shadow: 0 0 0 5px rgba(247, 194, 94, 0.13);
        }

        .services-hero h1 {
          margin: 0;
          font-size: clamp(36px, 6vw, 58px);
          font-weight: 900;
          line-height: 1.2;
          letter-spacing: -1px;
          text-align: center;
        }

        .services-hero h1 span {
          color: #f7c25e;
        }

        .services-hero p {
          max-width: 690px;
          margin: 20px auto 0;
          color: rgba(255, 255, 255, 0.84);
          font-size: 17px;
          line-height: 2;
          text-align: center;
        }

        .services-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 25px;
          padding: 9px 15px;
          color: #17233d;
          background: #fff8e8;
          border: 1px solid #f1d89e;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
        }

        .services-hero-badge svg {
          color: #d18d24;
        }

        /* =========================
           Content
        ========================= */

        .services-content {
          padding: 70px 0 85px;
        }

        .services-intro {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 28px;
        }

        .services-section-label {
          display: inline-block;
          margin-bottom: 7px;
          color: var(--primary);
          font-size: 14px;
          font-weight: 850;
        }

        .services-intro h2 {
          margin: 0;
          color: var(--foreground);
          font-size: clamp(27px, 4vw, 37px);
          font-weight: 900;
          text-align: center;
        }

        .services-intro p {
          max-width: 390px;
          margin: 0;
          color: var(--muted-foreground);
          line-height: 1.9;
          text-align: right;
        }

        /* =========================
           Categories
        ========================= */

        .services-categories {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
        }

        .services-category {
          min-height: 44px;
          padding: 0 17px;
          color: var(--muted-foreground);
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          font: inherit;
          font-size: 13px;
          font-weight: 750;
          cursor: pointer;
          transition:
            color 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease;
        }

        .services-category:hover {
          color: var(--primary);
          border-color: #9ebceb;
          transform: translateY(-1px);
        }

        .services-category.active {
          color: white;
          background: var(--primary);
          border-color: var(--primary);
        }

        /* =========================
           Services Grid
        ========================= */

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .service-page-card {
          display: flex;
          min-width: 0;
          flex-direction: column;
          overflow: hidden;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 17px;
          box-shadow: 0 10px 25px rgba(25, 56, 100, 0.055);
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .service-page-card:hover {
          transform: translateY(-7px);
          border-color: #8fb4ef;
          box-shadow: 0 18px 35px rgba(25, 56, 100, 0.1);
        }

        /* =========================
           صورة الخدمة
        ========================= */

        .service-page-image {
          position: relative;
          width: 100%;
          height: 205px;
          overflow: hidden;
          background: #e8f1ff;
        }

        .service-page-image img {
          object-fit: cover;
          transition: transform 0.45s ease;
        }

        .service-page-card:hover .service-page-image img {
          transform: scale(1.045);
        }

        .service-page-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(23, 35, 61, 0.02) 45%,
            rgba(23, 35, 61, 0.28) 100%
          );
          pointer-events: none;
        }

        /* التصنيف فوق الصورة */
        .service-page-category {
          position: absolute;
          top: 14px;
          inset-inline-end: 14px;
          z-index: 2;
          padding: 6px 10px;
          color: var(--primary);
          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          box-shadow: 0 5px 12px rgba(23, 35, 61, 0.08);
        }

        /* =========================
           Icon
        ========================= */

        .service-page-card-top {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0;
          margin-top: -31px;
          position: relative;
          z-index: 3;
        }

        .service-page-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 62px;
          height: 62px;
          color: var(--primary);
          background: white;
          border: 5px solid white;
          border-radius: 17px;
          box-shadow: 0 8px 20px rgba(25, 56, 100, 0.13);
          transition:
            color 0.2s ease,
            background 0.2s ease,
            transform 0.2s ease;
        }

        .service-page-card:hover .service-page-icon {
          color: white;
          background: var(--primary);
          transform: translateY(-2px);
        }

        /* =========================
           Card Body
        ========================= */

        .service-page-card-body {
          flex: 1;
          padding: 18px 23px 23px;
        }

        .service-page-card h3 {
          margin: 0;
          color: var(--foreground);
          font-size: 21px;
          font-weight: 850;
          line-height: 1.5;
          text-align: center;
        }

        .service-page-subtitle {
          margin: 6px 0 17px;
          color: #d18d24;
          font-size: 13px;
          font-weight: 750;
          line-height: 1.7;
          text-align: center;
        }

        .service-page-about {
          margin: 0;
          color: var(--muted-foreground);
          font-size: 14px;
          line-height: 1.9;
          text-align: right;
          direction: rtl;
        }

        /* =========================
           Points
        ========================= */

        .service-page-points {
          display: grid;
          gap: 9px;
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .service-page-point {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: #66738b;
          font-size: 12px;
          line-height: 1.8;
          text-align: right;
          direction: rtl;
        }

        .service-page-point svg {
          flex-shrink: 0;
          margin-top: 3px;
          color: var(--primary);
        }

        /* =========================
           Buttons
        ========================= */

        .service-page-card-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 9px;
          padding: 0 23px 23px;
        }

        .service-details-button,
        .service-order-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 46px;
          border-radius: 11px;
          font-size: 12px;
          font-weight: 850;
          text-decoration: none;
          transition:
            color 0.2s ease,
            background 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .service-details-button {
          color: var(--primary);
          background: var(--secondary);
          border: 1px solid #d4e3fa;
        }

        .service-details-button:hover {
          color: white;
          background: var(--primary);
          transform: translateY(-1px);
        }

        .service-order-button {
          color: white;
          background: #1fa463;
          border: 1px solid #1fa463;
        }

        .service-order-button:hover {
          background: #198e56;
          border-color: #198e56;
          transform: translateY(-1px);
          box-shadow: 0 8px 18px rgba(31, 164, 99, 0.18);
        }

        /* =========================
           Bottom CTA
        ========================= */

        .services-bottom-cta {
          padding: 0 0 80px;
        }

        .services-bottom-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          padding: 30px;
          background: var(--primary);
          border-radius: 18px;
          color: white;
        }

        .services-bottom-card > div > span {
          color: #f7c25e;
          font-size: 13px;
          font-weight: 800;
        }

        .services-bottom-card h2 {
          margin: 5px 0;
          font-size: 25px;
          font-weight: 850;
        }

        .services-bottom-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.8;
          font-size: 14px;
          text-align: right;
        }

        .services-whatsapp-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 48px;
          flex-shrink: 0;
          padding: 0 20px;
          color: var(--primary);
          background: white;
          border-radius: 11px;
          font-size: 13px;
          font-weight: 850;
          text-decoration: none;
          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .services-whatsapp-button:hover {
          background: #fff8e8;
          transform: translateY(-2px);
        }

        /* =========================
           Responsive
        ========================= */

        @media (max-width: 950px) {
          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .services-intro {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 650px) {
          .services-hero {
            padding: 105px 0 55px;
          }

          .services-hero h1 {
            font-size: 35px;
          }

          .services-hero p {
            font-size: 14px;
          }

          .services-content {
            padding: 55px 0 65px;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .services-categories {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          .services-category {
            width: 100%;
          }

          .service-page-card-footer {
            grid-template-columns: 1fr;
          }

          .services-bottom-card {
            align-items: stretch;
            flex-direction: column;
            padding: 24px 20px;
          }

          .services-whatsapp-button {
            width: 100%;
          }

          .service-page-image {
            height: 190px;
          }
        }

        @media (max-width: 400px) {
          .services-categories {
            grid-template-columns: 1fr;
          }

          .service-page-image {
            height: 180px;
          }

          .service-page-card-body {
            padding-inline: 18px;
          }

          .service-page-card-footer {
            padding-inline: 18px;
          }
        }
      `}</style>
    </main>
  )
}