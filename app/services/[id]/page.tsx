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

import { services } from '../../components/Services'

export default function ServiceDetailsPage() {
  const params = useParams()
  const id = params?.id as string

  const service = services.find(
    (item) => item.id === id,
  )

  const [openSection, setOpenSection] =
    useState<string | null>('about')

  /*
   * إذا دخل المستخدم من زر "اطلب الخدمة"
   * يتم فتح قسم الطلب تلقائيًا.
   */
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
            عذرًا، لم نتمكن من العثور على الخدمة
            المطلوبة.
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
          padding: 5rem 0 6rem;
        }

        .service-container {
          width: min(1050px, calc(100% - 2rem));
          margin: 0 auto;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2rem;
          color: inherit;
          text-decoration: none;
          font-weight: 800;
          opacity: 0.7;
          transition:
            opacity 0.2s ease,
            transform 0.2s ease;
        }

        .back-link:hover {
          opacity: 1;
          transform: translateX(4px);
        }

        .service-hero {
          position: relative;
          overflow: hidden;
          text-align: center;
          padding: 3.5rem 2rem;
          border-radius: 32px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(59, 130, 246, 0.12),
              transparent 45%
            ),
            rgba(255, 255, 255, 0.95);
          box-shadow:
            0 20px 60px rgba(15, 23, 42, 0.08);
        }

        .service-hero::before {
          content: '';
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          top: -150px;
          right: -100px;
          background: currentColor;
          opacity: 0.035;
        }

        .service-icon {
          position: relative;
          z-index: 1;
          width: 100px;
          height: 100px;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 28px;
          background:
            linear-gradient(
              145deg,
              rgba(59, 130, 246, 0.16),
              rgba(99, 102, 241, 0.06)
            );
          border: 1px solid rgba(59, 130, 246, 0.13);
          box-shadow:
            0 15px 40px rgba(59, 130, 246, 0.1);
        }

        .service-icon svg {
          width: 46px;
          height: 46px;
          stroke-width: 1.7;
        }

        .service-kicker {
          display: inline-block;
          margin-bottom: 0.7rem;
          font-size: 0.85rem;
          font-weight: 900;
          opacity: 0.55;
        }

        .service-title {
          position: relative;
          z-index: 1;
          margin: 0;
          font-size: clamp(2rem, 5vw, 3rem);
          line-height: 1.35;
          font-weight: 950;
        }

        .service-subtitle {
          position: relative;
          z-index: 1;
          margin-top: 0.75rem;
          font-size: 1rem;
          font-weight: 800;
          opacity: 0.58;
        }

        .service-about {
          max-width: 780px;
          margin: 1.5rem auto 0;
          font-size: 1.02rem;
          line-height: 2;
          opacity: 0.76;
        }

        .accordion {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .accordion-item {
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          background: rgba(255, 255, 255, 0.94);
          box-shadow:
            0 8px 30px rgba(15, 23, 42, 0.05);
        }

        .accordion-button {
          width: 100%;
          border: 0;
          background: transparent;
          color: inherit;
          padding: 1.3rem 1.4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          cursor: pointer;
          font-family: inherit;
          font-size: 1rem;
          font-weight: 900;
          text-align: right;
        }

        .accordion-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .accordion-icon {
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          background: rgba(59, 130, 246, 0.09);
        }

        .accordion-chevron {
          transition: transform 0.25s ease;
        }

        .accordion-chevron.open {
          transform: rotate(180deg);
        }

        .accordion-content {
          padding: 0 1.4rem 1.4rem;
        }

        .accordion-content-inner {
          padding: 1.1rem 1.2rem;
          border-radius: 16px;
          background: rgba(248, 250, 252, 0.85);
          line-height: 1.9;
        }

        .content-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .content-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
        }

        .content-list li svg {
          flex: 0 0 auto;
          margin-top: 0.35rem;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-question {
          font-weight: 900;
          margin-bottom: 0.35rem;
        }

        .faq-answer {
          opacity: 0.72;
          line-height: 1.9;
        }

        .order-section {
          scroll-margin-top: 100px;
          margin-top: 2rem;
          padding: 2.5rem 2rem;
          border-radius: 28px;
          text-align: center;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(59, 130, 246, 0.12),
              transparent 50%
            ),
            rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(15, 23, 42, 0.09);
          box-shadow:
            0 15px 45px rgba(15, 23, 42, 0.07);
        }

        .order-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          background: rgba(34, 197, 94, 0.1);
        }

        .order-title {
          margin: 0;
          font-size: 1.6rem;
          font-weight: 950;
        }

        .order-text {
          max-width: 700px;
          margin: 0.9rem auto 1.5rem;
          line-height: 1.9;
          opacity: 0.72;
        }

        .order-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .whatsapp-button {
          min-height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.9rem 1.5rem;
          border-radius: 16px;
          text-decoration: none;
          font-family: inherit;
          font-weight: 900;
          background: #22c55e;
          color: white;
          box-shadow:
            0 10px 25px rgba(34, 197, 94, 0.2);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .whatsapp-button:hover {
          transform: translateY(-3px);
          box-shadow:
            0 15px 35px rgba(34, 197, 94, 0.28);
        }

        .back-services-button {
          min-height: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.9rem 1.5rem;
          border-radius: 16px;
          text-decoration: none;
          font-family: inherit;
          font-weight: 900;
          border: 1px solid rgba(15, 23, 42, 0.12);
          background: rgba(255, 255, 255, 0.8);
          color: inherit;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .back-services-button:hover {
          transform: translateY(-3px);
          box-shadow:
            0 10px 25px rgba(15, 23, 42, 0.08);
        }

        @media (max-width: 768px) {
          .service-page {
            padding: 3rem 0 4rem;
          }

          .service-hero {
            padding: 2.5rem 1.25rem;
            border-radius: 25px;
          }

          .service-icon {
            width: 82px;
            height: 82px;
            border-radius: 24px;
          }

          .service-icon svg {
            width: 39px;
            height: 39px;
          }

          .service-title {
            font-size: 1.8rem;
          }

          .service-about {
            font-size: 0.93rem;
            line-height: 1.9;
          }

          .accordion-button {
            padding: 1.1rem;
          }

          .accordion-content {
            padding: 0 1.1rem 1.1rem;
          }

          .accordion-content-inner {
            padding: 1rem;
          }

          .order-section {
            padding: 2rem 1.2rem;
            border-radius: 24px;
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

          {/* العودة */}
          <Link
            href="/#services"
            className="back-link"
          >
            <ArrowRight size={18} />
            العودة إلى الخدمات
          </Link>

          {/* رأس الخدمة */}
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

          {/* الأقسام */}
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
                            <CheckCircle2
                              size={19}
                            />

                            <span>
                              {item}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* المتطلبات */}
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
                    openSection ===
                    'requirements'
                      ? 'open'
                      : ''
                  }`}
                />
              </button>

              {openSection ===
                'requirements' && (
                <div className="accordion-content">
                  <div className="accordion-content-inner">
                    <ul className="content-list">
                      {service.requirements.map(
                        (item, index) => (
                          <li key={index}>
                            <CheckCircle2
                              size={19}
                            />

                            <span>
                              {item}
                            </span>
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