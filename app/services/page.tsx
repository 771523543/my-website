'use client'

import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react'
import { services, type ServiceCategory } from '../components/Services'

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

      <section className="services-content">
        <div className="container">
          <div className="services-intro">
            <div>
              <span className="services-section-label">استكشف خدماتنا</span>
              <h2>اختر الخدمة المناسبة لاحتياجك</h2>
            </div>

            <p>
              نقدم مجموعة متنوعة من الخدمات البحثية والأكاديمية والتصميمية
              والمهنية.
            </p>
          </div>

          <div className="services-categories" aria-label="تصنيفات الخدمات">
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

          <div id="all-services" className="services-grid">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <article
                  key={service.id}
                  id={`category-${service.category}`}
                  className="service-page-card"
                >
                  <div className="service-page-card-top">
                    <div className="service-page-icon">
                      <Icon size={28} strokeWidth={1.8} />
                    </div>

                    <span className="service-page-category">
                      {service.category === 'research'
                        ? 'بحثي'
                        : service.category === 'academic'
                          ? 'أكاديمي'
                          : 'تصميم ومهني'}
                    </span>
                  </div>

                  <div className="service-page-card-body">
                    <h3>{service.title}</h3>

                    <p className="service-page-subtitle">
                      {service.subtitle}
                    </p>

                    <p className="service-page-about">{service.about}</p>

                    <div className="service-page-points">
                      {service.whatWeOffer.slice(0, 3).map((item) => (
                        <div key={item} className="service-page-point">
                          <CheckCircle2 size={16} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="service-page-card-footer">
                    <Link
                      href={`/services/${service.id}`}
                      className="service-details-button"
                    >
                      <span>تفاصيل الخدمة</span>
                      <ArrowLeft size={17} />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

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
              href="https://wa.me/967776280186"
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
        }

        .services-intro p {
          max-width: 390px;
          margin: 0;
          color: var(--muted-foreground);
          line-height: 1.9;
        }

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

        .service-page-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 23px 23px 0;
        }

        .service-page-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          color: var(--primary);
          background: #e6efff;
          border-radius: 15px;
          transition:
            color 0.2s ease,
            background 0.2s ease;
        }

        .service-page-card:hover .service-page-icon {
          color: white;
          background: var(--primary);
        }

        .service-page-category {
          padding: 6px 10px;
          color: var(--primary);
          background: var(--secondary);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
        }

        .service-page-card-body {
          flex: 1;
          padding: 20px 23px 23px;
        }

        .service-page-card h3 {
          margin: 0;
          color: var(--foreground);
          font-size: 21px;
          font-weight: 850;
          line-height: 1.5;
        }

        .service-page-subtitle {
          margin: 5px 0 13px;
          color: #d18d24;
          font-size: 13px;
          font-weight: 750;
        }

        .service-page-about {
          margin: 0;
          color: var(--muted-foreground);
          font-size: 14px;
          line-height: 1.9;
        }

        .service-page-points {
          display: grid;
          gap: 8px;
          margin-top: 17px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .service-page-point {
          display: flex;
          align-items: flex-start;
          gap: 7px;
          color: #66738b;
          font-size: 12px;
          line-height: 1.7;
        }

        .service-page-point svg {
          flex-shrink: 0;
          margin-top: 3px;
          color: var(--primary);
        }

        .service-page-card-footer {
          padding: 0 23px 23px;
        }

        .service-details-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 46px;
          color: var(--primary);
          background: var(--secondary);
          border: 1px solid #d4e3fa;
          border-radius: 11px;
          font-size: 13px;
          font-weight: 850;
          text-decoration: none;
          transition:
            color 0.2s ease,
            background 0.2s ease,
            transform 0.2s ease;
        }

        .service-details-button:hover {
          color: white;
          background: var(--primary);
          transform: translateY(-1px);
        }

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
          margin: 5px 0 5px;
          font-size: 25px;
          font-weight: 850;
        }

        .services-bottom-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.78);
          line-height: 1.8;
          font-size: 14px;
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

          .services-bottom-card {
            align-items: stretch;
            flex-direction: column;
            padding: 24px 20px;
          }

          .services-whatsapp-button {
            width: 100%;
          }
        }

        @media (max-width: 400px) {
          .services-categories {
            grid-template-columns: 1fr;
          }

          .service-page-card-top,
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