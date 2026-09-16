'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { services } from '../components/Services'

export default function ServicesPage() {
  return (
    <main className="services-page" dir="rtl">
      <section className="services-header">
        <Link href="/" className="back-link">
          <ArrowRight size={18} />
          العودة للرئيسية
        </Link>

        <div className="services-title">
          <h1>خدماتنا</h1>
          <p>
            اختر الخدمة التي تحتاجها للاطلاع على تفاصيلها وطلبها.
          </p>
        </div>
      </section>

      <section className="services-grid">
        {services.map((service) => {
          const Icon = service.icon

          return (
            <Link
              key={service.id}
              href={`/services/${service.id}`}
              className="service-card"
            >
              <div className="service-icon">
                <Icon size={34} strokeWidth={1.8} />
              </div>

              <div className="service-content">
                <h2>{service.title}</h2>

                <p className="service-subtitle">
                  {service.subtitle}
                </p>

                <p className="service-description">
                  {service.shortText}
                </p>
              </div>

              <div className="service-link">
                عرض تفاصيل الخدمة
                <ArrowLeft size={18} />
              </div>
            </Link>
          )
        })}
      </section>

      <style jsx>{`
        .services-page {
          min-height: 100vh;
          padding: 40px 20px 80px;
        }

        .services-header {
          max-width: 1200px;
          margin: 0 auto 45px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: inherit;
          opacity: 0.8;
          font-weight: 600;
          margin-bottom: 35px;
          transition: opacity 0.2s ease;
        }

        .back-link:hover {
          opacity: 1;
        }

        .services-title {
          text-align: center;
        }

        .services-title h1 {
          margin: 0 0 12px;
          font-size: clamp(34px, 5vw, 52px);
          font-weight: 900;
        }

        .services-title p {
          margin: 0;
          font-size: 17px;
          line-height: 1.8;
          opacity: 0.75;
        }

        .services-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .service-card {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 28px;
          min-height: 260px;
          border-radius: 24px;
          text-decoration: none;
          color: inherit;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease;
        }

        .service-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.22);
        }

        .service-icon {
          width: 68px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          margin-bottom: 22px;
          background: rgba(255, 255, 255, 0.08);
        }

        .service-content {
          flex: 1;
        }

        .service-content h2 {
          margin: 0 0 9px;
          font-size: 22px;
          font-weight: 800;
          line-height: 1.5;
        }

        .service-subtitle {
          margin: 0 0 12px;
          font-size: 15px;
          font-weight: 700;
          opacity: 0.75;
        }

        .service-description {
          margin: 0;
          font-size: 15px;
          line-height: 1.8;
          opacity: 0.68;
        }

        .service-link {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 25px;
          font-size: 14px;
          font-weight: 800;
          opacity: 0.85;
        }

        @media (max-width: 800px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 500px) {
          .services-page {
            padding: 25px 15px 60px;
          }

          .service-card {
            padding: 23px;
          }

          .service-content h2 {
            font-size: 20px;
          }
        }
      `}</style>
    </main>
  )
}