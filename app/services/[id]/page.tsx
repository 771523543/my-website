'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  HelpCircle,
  FileText,
  MessageCircle,
  ChevronDown,
  Send,
} from 'lucide-react'

import { services } from '../../components/ServicesPreview'

export default function ServiceDetailsPage() {
  const params = useParams()
  const id = params?.id as string

  const service = services.find(
    (item) => item.id === id,
  )

  const [openSection, setOpenSection] =
    useState<string | null>('about')

  useEffect(() => {
    if (window.location.hash === '#order') {
      setOpenSection('order')

      setTimeout(() => {
        document
          .getElementById('order')
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
      }, 150)
    }
  }, [])

  if (!service) {
    return (
      <main
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem 1rem',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            maxWidth: 600,
          }}
        >
          <h1
            style={{
              fontSize: '2rem',
              marginBottom: '1rem',
            }}
          >
            الخدمة غير موجودة
          </h1>

          <p
            style={{
              opacity: 0.7,
              lineHeight: 1.8,
              marginBottom: '1.5rem',
            }}
          >
            عذرًا، لم نتمكن من العثور على الخدمة المطلوبة.
          </p>

          <Link
            href="/#services"
            className="primary-button"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
            }}
          >
            <ArrowRight size={18} />
            العودة إلى الخدمات
          </Link>
        </div>
      </main>
    )
  }

  const Icon = service.icon

  const toggleSection = (section: string) => {
    setOpenSection((current) =>
      current === section ? null : section,
    )
  }

  // WhatsApp
  const whatsappNumber = '967776280186'

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، أرغب في طلب خدمة: ${service.title}`,
  )

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <main>
      <style jsx>{`
        .service-page {
          min-height: 100vh;
          padding: 3rem 1rem 5rem;
        }

        .service-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          color: inherit;
          text-decoration: none;
          opacity: 0.75;
          transition: opacity 0.2s ease;
        }

        .back-link:hover {
          opacity: 1;
        }

        .service-hero {
          text-align: center;
          padding: 2rem 1rem 3rem;
        }

        .service-icon {
          width: 90px;
          height: 90px;
          margin: 0 auto 1.5rem;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.12),
            rgba(59, 130, 246, 0.06)
          );
          color: #2563eb;
        }

        .service-icon svg {
          width: 42px;
          height: 42px;
        }

        .service-kicker {
          display: inline-block;
          margin-bottom: 0.8rem;
          font-size: 0.9rem;
          opacity: 0.65;
        }

        .service-title {
          margin: 0;
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 800;
          line-height: 1.3;
        }

        .service-subtitle {
          margin-top: 0.8rem;
          font-size: 1.15rem;
          opacity: 0.7;
        }

        .service-about {
          max-width: 760px;
          margin: 1.5rem auto 0;
          font-size: 1.05rem;
          line-height: 2;
          opacity: 0.8;
        }

        .accordion {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .accordion-item {
          border: 1px solid rgba(128, 128, 128, 0.18);
          border-radius: 18px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
        }

        .accordion-button {
          width: 100%;
          border: 0;
          background: transparent;
          color: inherit;
          padding: 1.25rem 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          text-align: right;
          font: inherit;
        }

        .accordion-title {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-weight: 700;
          font-size: 1.05rem;
        }

        .accordion-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
          flex-shrink: 0;
        }

        .accordion-chevron {
          transition: transform 0.25s ease;
          opacity: 0.65;
        }

        .accordion-chevron.open {
          transform: rotate(180deg);
        }

        .accordion-content {
          border-top: 1px solid rgba(128, 128, 128, 0.12);
        }

        .accordion-content-inner {
          padding: 1.4rem;
          line-height: 2;
          opacity: 0.85;
        }

        .content-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .content-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.7rem;
        }

        .content-list li svg {
          flex-shrink: 0;
          margin-top: 0.35rem;
          color: #2563eb;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .faq-question {
          font-weight: 700;
          margin-bottom: 0.4rem;
        }

        .faq-answer {
          opacity: 0.75;
          line-height: 1.9;
        }

        .order-section {
          margin-top: 1rem;
          padding: 2.5rem 1.5rem;
          text-align: center;
          border-radius: 24px;
          background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.1),
            rgba(59, 130, 246, 0.04)
          );
          border: 1px solid rgba(37, 99, 235, 0.15);
        }

        .order-icon {
          width: 58px;
          height: 58px;
          margin: 0 auto 1rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(37, 99, 235, 0.12);
          color: #2563eb;
        }

        .order-title {
          margin: 0;
          font-size: 1.7rem;
          font-weight: 800;
        }

        .order-text {
          max-width: 650px;
          margin: 0.8rem auto 1.5rem;
          line-height: 1.9;
          opacity: 0.75;
        }

        .order-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }

        .whatsapp-button,
        .back-services-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          min-height: 48px;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          transition:
            transform 0.2s ease,
            opacity 0.2s ease;
        }

        .whatsapp-button {
          background: #25d366;
          color: white;
        }

        .back-services-button {
          background: rgba(128, 128, 128, 0.1);
          color: inherit;
          border: 1px solid rgba(128, 128, 128, 0.15);
        }

        .whatsapp-button:hover,
        .back-services-button:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        @media (max-width: 640px) {
          .service-page {
            padding: 2rem 0.8rem 4rem;
          }

          .service-hero {
            padding: 1rem 0.5rem 2rem;
          }

          .service-icon {
            width: 76px;
            height: 76px;
            border-radius: 20px;
          }

          .service-icon svg {
            width: 35px;
            height: 35px;
          }

          .accordion-button {
            padding: 1rem;
          }

          .accordion-title {
            font-size: 0.95rem;
          }

          .accordion-icon {
            width: 36px;
            height: 36px;
          }

          .accordion-content-inner {
            padding: 1.1rem;
          }

          .order-section {
            padding: 2rem 1rem;
          }

          .order-actions {
            flex-direction: column;
          }

          .whatsapp-button,
          .back-services-button {
            width: 100%;
          }
        }
      `}</style>

      <section className="service-page">
        <div className="service-container">

          <Link
            href="/#services"
            className="back-link"
          >
            <ArrowRight size={18} />
            العودة إلى الخدمات
          </Link>

          <div className="service-hero">

            <div className="service-icon">
              <Icon />
            </div>

            <span className="service-kicker">
              خدمة من خدمات منصة هديل
            </span>

            <h1 className="service-title">
              {service.title}
            </h1>

            <div className="service-subtitle">
              {service.subtitle}
            </div>

            <p className="service-about">
              {service.about}
            </p>

          </div>

          <div className="accordion">

            {/* نبذة عن الخدمة */}
            <div className="accordion-item">
              <button
                type="button"
                className="accordion-button"
                onClick={() =>
                  toggleSection('about')
                }
              >
                <span className="accordion-title">
                  <span className="accordion-icon">
                    <FileText size={20} />
                  </span>
                  نبذة عن الخدمة
                </span>

                <ChevronDown
                  size={20}
                  className={`accordion-chevron ${
                    openSection === 'about'
                      ? 'open'
                      : ''
                  }`}
                />
              </button>

              {openSection === 'about' && (
                <div className="accordion-content">
                  <div className="accordion-content-inner">
                    {service.about}
                  </div>
                </div>
              )}
            </div>

            {/* ماذا نقدم */}
            <div className="accordion-item">
              <button
                type="button"
                className="accordion-button"
                onClick={() =>
                  toggleSection('offer')
                }
              >
                <span className="accordion-title">
                  <span className="accordion-icon">
                    <CheckCircle2 size={20} />
                  </span>
                  ماذا نقدم؟
                </span>

                <ChevronDown
                  size={20}
                  className={`accordion-chevron ${
                    openSection === 'offer'
                      ? 'open'
                      : ''
                  }`}
                />
              </button>

              {openSection === 'offer' && (
                <div className="accordion-content">
                  <div className="accordion-content-inner">
                    <ul className="content-list">
                      {service.whatWeOffer.map(
                        (item, index) => (
                          <li key={index}>
                            <CheckCircle2 size={19} />
                            <span>{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* متطلبات الخدمة */}
            <div className="accordion-item">
              <button
                type="button"
                className="accordion-button"
                onClick={() =>
                  toggleSection('requirements')
                }
              >
                <span className="accordion-title">
                  <span className="accordion-icon">
                    <ClipboardList size={20} />
                  </span>
                  متطلبات الخدمة
                </span>

                <ChevronDown
                  size={20}
                  className={`accordion-chevron ${
                    openSection === 'requirements'
                      ? 'open'
                      : ''
                  }`}
                />
              </button>

              {openSection === 'requirements' && (
                <div className="accordion-content">
                  <div className="accordion-content-inner">
                    <ul className="content-list">
                      {service.requirements.map(
                        (item, index) => (
                          <li key={index}>
                            <CheckCircle2 size={19} />
                            <span>{item}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* الأسئلة الشائعة */}
            <div className="accordion-item">
              <button
                type="button"
                className="accordion-button"
                onClick={() =>
                  toggleSection('faq')
                }
              >
                <span className="accordion-title">
                  <span className="accordion-icon">
                    <HelpCircle size={20} />
                  </span>
                  الأسئلة الشائعة
                </span>

                <ChevronDown
                  size={20}
                  className={`accordion-chevron ${
                    openSection === 'faq'
                      ? 'open'
                      : ''
                  }`}
                />
              </button>

              {openSection === 'faq' && (
                <div className="accordion-content">
                  <div className="accordion-content-inner">
                    <div className="faq-list">
                      {service.faqs.map(
                        (faq, index) => (
                          <div key={index}>
                            <div className="faq-question">
                              {faq.q}
                            </div>

                            <div className="faq-answer">
                              {faq.a}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* طلب الخدمة */}
            <div
              id="order"
              className="order-section"
            >
              <div className="order-icon">
                <Send size={27} />
              </div>

              <h2 className="order-title">
                طلب الخدمة
              </h2>

              <p className="order-text">
                {service.orderText}
              </p>

              <div className="order-actions">

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-button"
                >
                  <MessageCircle size={21} />
                  اطلب الخدمة عبر واتساب
                </a>

                <Link
                  href="/#services"
                  className="back-services-button"
                >
                  <ArrowLeft size={18} />
                  تصفح باقي الخدمات
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}