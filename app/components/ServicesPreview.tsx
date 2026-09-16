'use client'

import Link from 'next/link'
import { ArrowLeft, BriefcaseBusiness } from 'lucide-react'

export default function ServicesPreview() {
  return (
    <section className="services-preview" aria-label="خدماتنا">
      <div className="services-preview-card">
        <div className="services-preview-icon">
          <BriefcaseBusiness size={42} strokeWidth={1.8} />
        </div>

        <div className="services-preview-content">
          <h2>خدماتنا</h2>

          <p>
            اكتشف جميع الخدمات الطلابية والأكاديمية التي تقدمها منصة هديل.
          </p>

          <Link href="/services" className="services-preview-button">
            استعرض خدماتنا
            <ArrowLeft size={19} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .services-preview {
          width: 100%;
          padding: 30px 20px;
        }

        .services-preview-card {
          max-width: 1100px;
          margin: 0 auto;
          padding: 45px 30px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          text-align: right;
        }

        .services-preview-icon {
          width: 88px;
          height: 88px;
          min-width: 88px;
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.08);
        }

        .services-preview-content {
          flex: 1;
        }

        .services-preview-content h2 {
          margin: 0 0 10px;
          font-size: 32px;
          font-weight: 800;
        }

        .services-preview-content p {
          margin: 0 0 22px;
          font-size: 17px;
          line-height: 1.8;
          opacity: 0.8;
        }

        .services-preview-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 12px 20px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 700;
          transition: transform 0.2s ease, opacity 0.2s ease;
          background: rgba(255, 255, 255, 0.1);
          color: inherit;
        }

        .services-preview-button:hover {
          transform: translateY(-2px);
          opacity: 0.85;
        }

        @media (max-width: 700px) {
          .services-preview-card {
            flex-direction: column;
            text-align: center;
            padding: 35px 22px;
          }

          .services-preview-content h2 {
            font-size: 27px;
          }

          .services-preview-content p {
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  )
}