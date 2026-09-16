'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { services } from '../components/Services'

export default function ServicesPage() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startScrollLeft = useRef(0)
  const [isInteracting, setIsInteracting] = useState(false)

  useEffect(() => {
    const slider = sliderRef.current

    if (!slider) return

    const speed = 0.45

    const animate = () => {
      if (!isInteracting && !isDragging.current) {
        slider.scrollLeft -= speed

        /*
         * عند الوصول إلى بداية المحتوى نرجع للنهاية
         * حتى تستمر الحركة بشكل دائري.
         */
        if (Math.abs(slider.scrollLeft) >= slider.scrollWidth - slider.clientWidth - 2) {
          slider.scrollLeft = 0
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isInteracting])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current

    if (!slider) return

    isDragging.current = true
    setIsInteracting(true)

    startX.current = event.clientX
    startScrollLeft.current = slider.scrollLeft

    slider.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const slider = sliderRef.current

    if (!slider || !isDragging.current) return

    const distance = event.clientX - startX.current

    slider.scrollLeft = startScrollLeft.current - distance
  }

  const handlePointerUp = () => {
    isDragging.current = false
    setIsInteracting(false)
  }

  const handlePointerCancel = () => {
    isDragging.current = false
    setIsInteracting(false)
  }

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

      <section className="services-slider-section">
        <div
          ref={sliderRef}
          className={`services-slider ${
            isDragging.current ? 'is-dragging' : ''
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onPointerLeave={handlePointerUp}
        >
          <div className="services-track">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <Link
                  key={service.id}
                  href={`/services/${service.id}`}
                  className="service-card"
                  onClick={(event) => {
                    if (Math.abs(sliderRef.current?.scrollLeft ?? 0) > 0) {
                      // السماح بالضغط الطبيعي على البطاقة
                    }
                  }}
                >
                  <div className="service-icon">
                    <Icon size={38} strokeWidth={1.8} />
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
          </div>
        </div>

        <div className="slider-hint">
          <ArrowRight size={16} />
          اسحب للخلف أو للأمام لاستعراض الخدمات
          <ArrowLeft size={16} />
        </div>
      </section>

      <style jsx>{`
        .services-page {
          min-height: 100vh;
          padding: 40px 0 80px;
          overflow: hidden;
        }

        .services-header {
          max-width: 1200px;
          margin: 0 auto 45px;
          padding: 0 20px;
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
          margin: 0 auto;
          max-width: 650px;
          font-size: 17px;
          line-height: 1.8;
          opacity: 0.75;
        }

        .services-slider-section {
          width: 100%;
          position: relative;
        }

        .services-slider {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          cursor: grab;
          user-select: none;
          -webkit-user-select: none;
          touch-action: pan-x;
          scrollbar-width: none;
          padding: 20px 0 35px;
        }

        .services-slider::-webkit-scrollbar {
          display: none;
        }

        .services-slider:active {
          cursor: grabbing;
        }

        .services-track {
          display: flex;
          width: max-content;
          gap: 22px;
          padding: 0 30px;
        }

        .service-card {
          width: 350px;
          min-width: 350px;
          min-height: 330px;
          padding: 30px 26px;
          border-radius: 26px;
          text-decoration: none;
          color: inherit;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);

          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;

          transition:
            transform 0.3s ease,
            background 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;

          flex-shrink: 0;
        }

        .service-card:hover {
          transform: translateY(-8px) scale(1.015);
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.24);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.14);
        }

        .service-icon {
          width: 78px;
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 22px;
          margin-bottom: 22px;
          background: rgba(255, 255, 255, 0.08);
          flex-shrink: 0;
        }

        .service-content {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .service-content h2 {
          margin: 0 0 10px;
          font-size: 22px;
          font-weight: 800;
          line-height: 1.5;
        }

        .service-subtitle {
          margin: 0 0 12px;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.7;
          opacity: 0.75;
        }

        .service-description {
          max-width: 290px;
          margin: 0;
          font-size: 15px;
          line-height: 1.9;
          opacity: 0.68;
        }

        .service-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
          font-size: 14px;
          font-weight: 800;
          opacity: 0.9;
        }

        .slider-hint {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 5px;
          padding: 0 20px;
          font-size: 13px;
          opacity: 0.5;
          text-align: center;
        }

        @media (max-width: 700px) {
          .services-page {
            padding-top: 25px;
          }

          .services-header {
            margin-bottom: 30px;
          }

          .services-slider {
            padding-top: 10px;
          }

          .services-track {
            gap: 16px;
            padding: 0 18px;
          }

          .service-card {
            width: 290px;
            min-width: 290px;
            min-height: 315px;
            padding: 26px 20px;
          }

          .service-content h2 {
            font-size: 20px;
          }

          .service-description {
            max-width: 245px;
            font-size: 14px;
          }
        }

        @media (max-width: 400px) {
          .service-card {
            width: 275px;
            min-width: 275px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-card {
            transition: none;
          }
        }
      `}</style>
    </main>
  )
}