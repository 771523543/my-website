'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  MessageCircle,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { useState } from 'react'
import { services, whatsappNumber } from '../../components/Services'

export default function ServiceDetailsPage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const service = services.find((item) => item.id === id)

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  if (!service) {
    return (
      <main className="service-not-found">
        <div className="container">
          <div className="service-not-found-card">
            <div className="not-found-icon">
              <ClipboardCheck size={34} />
            </div>

            <h1>الخدمة غير موجودة</h1>

            <p>
              عذرًا، لم نتمكن من العثور على الخدمة المطلوبة.
            </p>

            <Link href="/services" className="back-services-button">
              <ArrowRight size={18} />
              العودة إلى الخدمات
            </Link>
          </div>
        </div>

        <style jsx>{`
          .service-not-found {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 100px 20px;
            background: var(--background);
          }

          .service-not-found-card {
            width: min(100%, 560px);
            padding: 45px 30px;
            text-align: center;
            background: var(--card);
            border: 1px solid var(--border);
            border-radius: 20px;
            box-shadow: 0 15px 40px rgba(25, 56, 100, 0.08);
          }

          .not-found-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70px;
            height: 70px;
            margin: 0 auto 20px;
            color: var(--primary);
            background: var(--secondary);
            border-radius: 18px;
          }

          .service-not-found h1 {
            margin: 0;
            color: var(--foreground);
            font-size: 30px;
            font-weight: 900;
          }

          .service-not-found p {
            margin: 10px 0 25px;
            color: var(--muted-foreground);
          }

          .back-services-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            min-height: 46px;
            padding: 0 20px;
            color: white;
            background: var(--primary);
            border-radius: 11px;
            font-weight: 800;
            text-decoration: none;
          }
        `}</style>
      </main>
    )
  }

  const Icon = service.icon

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، أرغب في طلب خدمة: ${service.title}`,
  )

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <main className="service-details-page">
      {/* Hero */}
      <section className="service-details-hero">
        <div className="container">
          <Link href="/services" className="service-back-link">
            <ArrowRight size={17} />
            العودة إلى جميع الخدمات
          </Link>

          <div className="service-details-hero-content">
            <div className="service-details-icon">
              <Icon size={40} strokeWidth={1.7} />
            </div>

            <div className="service-details-category">
              {service.category === 'research'
                ? 'الخدمات البحثية'
                : service.category === 'academic'
                  ? 'الخدمات الأكاديمية'
                  : 'التصميم والخدمات المهنية'}
            </div>

            <h1>{service.title}</h1>

            <p>{service.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="service-details-content">
        <div className="container">
          <div className="service-details-layout">
            {/* المحتوى */}
            <div className="service-details-main">
              <section className="details-card">
                <div className="details-card-heading">
                  <div className="details-heading-icon">
                    <ClipboardCheck size={21} />
                  </div>

                  <div>
                    <span>عن الخدمة</span>
                    <h2>نبذة عن الخدمة</h2>
                  </div>
                </div>

                <p className="details-description">
                  {service.about}
                </p>
              </section>

              <section className="details-card">
                <div className="details-card-heading">
                  <div className="details-heading-icon">
                    <CheckCircle2 size={21} />
                  </div>

                  <div>
                    <span>ماذا نقدم؟</span>
                    <h2>ما تتضمنه الخدمة</h2>
                  </div>
                </div>

                <div className="details-list">
                  {service.whatWeOffer.map((item) => (
                    <div key={item} className="details-list-item">
                      <CheckCircle2 size={18} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="details-card">
                <div className="details-card-heading">
                  <div className="details-heading-icon">
                    <ShieldCheck size={21} />
                  </div>

                  <div>
                    <span>قبل الطلب</span>
                    <h2>متطلبات الخدمة</h2>
                  </div>
                </div>

                <div className="requirements-grid">
                  {service.requirements.map((item, index) => (
                    <div
                      key={item}
                      className="requirement-item"
                    >
                      <span className="requirement-number">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* الأسئلة الشائعة */}
              {service.faqs.length > 0 && (
                <section className="details-card faq-card">
                  <div className="details-card-heading">
                    <div className="details-heading-icon">
                      <MessageCircle size={21} />
                    </div>

                    <div>
                      <span>الأسئلة الشائعة</span>
                      <h2>هل لديك استفسار؟</h2>
                    </div>
                  </div>

                  <div className="faq-list">
                    {service.faqs.map((faq, index) => {
                      const isOpen = openFaq === index

                      return (
                        <div
                          key={faq.q}
                          className={`faq-item ${
                            isOpen ? 'open' : ''
                          }`}
                        >
                          <button
                            type="button"
                            className="faq-question"
                            onClick={() =>
                              setOpenFaq(isOpen ? null : index)
                            }
                            aria-expanded={isOpen}
                          >
                            <span>{faq.q}</span>

                            <ChevronDown
                              size={19}
                              className="faq-chevron"
                            />
                          </button>

                          {isOpen && (
                            <div className="faq-answer">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* بطاقة الطلب */}
            <aside className="service-order-column">
              <div className="service-order-card">
                <div className="order-card-top">
                  <div className="order-card-icon">
                    <Send size={25} />
                  </div>

                  <span>طلب الخدمة</span>
                </div>

                <h2>هل أنت جاهز لطلب الخدمة؟</h2>

                <p>
                  أرسل طلبك الآن عبر واتساب وسنتواصل معك لمعرفة التفاصيل
                  المطلوبة والبدء في تنفيذ الخدمة.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-whatsapp-button"
                >
                  <MessageCircle size={20} />
                  طلب الخدمة عبر واتساب
                </a>

                <div className="order-note">
                  <CheckCircle2 size={16} />
                  <span>تواصل مباشر وسهل</span>
                </div>

                <div className="order-note">
                  <CheckCircle2 size={16} />
                  <span>تحديد المتطلبات قبل البدء</span>
                </div>

                <div className="order-note">
                  <CheckCircle2 size={16} />
                  <span>متابعة تفاصيل الطلب</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style jsx>{`
        .service-details-page {
          min-height: 100vh;
          background: var(--background);
          color: var(--foreground);
        }

        /* =========================
           Hero
        ========================= */

        .service-details-hero {
          position: relative;
          overflow: hidden;
          padding: 105px 0 65px;
          color: white;
          background: linear-gradient(
            135deg,
            #2455c4 0%,
            #234da9 58%,
            #17233d 100%
          );
        }

        .service-details-hero::before {
          content: '';
          position: absolute;
          width: 300px;
          height: 300px;
          top: -170px;
          inset-inline-end: -100px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }

        .service-details-hero::after {
          content: '';
          position: absolute;
          width: 220px;
          height: 220px;
          bottom: -145px;
          inset-inline-start: -80px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }

        .service-back-link {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: rgba(255, 255, 255, 0.82);
          font-size: 13px;
          font-weight: 750;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .service-back-link:hover {
          color: #f7c25e;
        }

        .service-details-hero-content {
          position: relative;
          z-index: 2;
          max-width: 850px;
          margin: 35px auto 0;
          text-align: center;
        }

        .service-details-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 86px;
          height: 86px;
          margin: 0 auto 20px;
          color: var(--primary);
          background: white;
          border: 5px solid rgba(255, 255, 255, 0.14);
          border-radius: 24px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
        }

        .service-details-category {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 13px;
          color: #17233d;
          background: #fff8e8;
          border: 1px solid #f1d89e;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 850;
        }

        .service-details-hero h1 {
          margin: 16px 0 8px;
          font-size: clamp(31px, 5vw, 48px);
          font-weight: 900;
          line-height: 1.3;
        }

        .service-details-hero p {
          margin: 0;
          color: rgba(255, 255, 255, 0.82);
          font-size: 16px;
          line-height: 1.8;
        }

        /* =========================
           Content
        ========================= */

        .service-details-content {
          padding: 60px 0 90px;
        }

        .service-details-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 350px;
          align-items: start;
          gap: 25px;
        }

        .service-details-main {
          display: grid;
          gap: 22px;
          min-width: 0;
        }

        .details-card {
          padding: 28px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 17px;
          box-shadow: 0 10px 25px rgba(25, 56, 100, 0.055);
        }

        .details-card-heading {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 20px;
        }

        .details-heading-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          color: var(--primary);
          background: var(--secondary);
          border-radius: 13px;
        }

        .details-card-heading span {
          display: block;
          margin-bottom: 2px;
          color: var(--accent);
          font-size: 12px;
          font-weight: 850;
        }

        .details-card-heading h2 {
          margin: 0;
          color: var(--foreground);
          font-size: 22px;
          font-weight: 850;
        }

        .details-description {
          margin: 0;
          color: var(--muted-foreground);
          font-size: 15px;
          line-height: 2;
        }

        /* =========================
           What we offer
        ========================= */

        .details-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 11px;
        }

        .details-list-item {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          padding: 13px 14px;
          color: #53627a;
          background: #f7faff;
          border: 1px solid #e5edf8;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.7;
        }

        .details-list-item svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--primary);
        }

        /* =========================
           Requirements
        ========================= */

        .requirements-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .requirement-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          color: #59677d;
          background: var(--muted);
          border: 1px solid var(--border);
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.6;
        }

        .requirement-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          color: var(--primary);
          background: var(--secondary);
          border-radius: 10px;
          font-size: 11px;
          font-weight: 900;
        }

        /* =========================
           FAQ
        ========================= */

        .faq-list {
          display: grid;
          gap: 10px;
        }

        .faq-item {
          overflow: hidden;
          background: #f8fbff;
          border: 1px solid var(--border);
          border-radius: 12px;
        }

        .faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          width: 100%;
          min-height: 54px;
          padding: 0 16px;
          color: var(--foreground);
          background: transparent;
          border: 0;
          font: inherit;
          font-size: 13px;
          font-weight: 800;
          text-align: right;
          cursor: pointer;
        }

        .faq-chevron {
          flex-shrink: 0;
          color: var(--primary);
          transition: transform 0.2s ease;
        }

        .faq-item.open .faq-chevron {
          transform: rotate(180deg);
        }

        .faq-answer {
          padding: 0 16px 17px;
          color: var(--muted-foreground);
          font-size: 13px;
          line-height: 1.9;
        }

        /* =========================
           Order Card
        ========================= */

        .service-order-column {
          position: sticky;
          top: 100px;
        }

        .service-order-card {
          padding: 26px;
          overflow: hidden;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: 0 14px 35px rgba(25, 56, 100, 0.08);
        }

        .order-card-top {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .order-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          color: white;
          background: var(--primary);
          border-radius: 13px;
        }

        .order-card-top > span {
          color: var(--accent);
          font-size: 13px;
          font-weight: 850;
        }

        .service-order-card h2 {
          margin: 0;
          color: var(--foreground);
          font-size: 23px;
          font-weight: 900;
          line-height: 1.5;
        }

        .service-order-card > p {
          margin: 10px 0 20px;
          color: var(--muted-foreground);
          font-size: 13px;
          line-height: 1.9;
        }

        .order-whatsapp-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          min-height: 50px;
          padding: 0 16px;
          color: white;
          background: #1fa463;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 850;
          text-decoration: none;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .order-whatsapp-button:hover {
          background: #198e56;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(31, 164, 99, 0.2);
        }

        .order-note {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
          color: #65738a;
          font-size: 12px;
        }

        .order-note svg {
          color: var(--primary);
          flex-shrink: 0;
        }

        /* =========================
           Responsive
        ========================= */

        @media (max-width: 950px) {
          .service-details-layout {
            grid-template-columns: 1fr;
          }

          .service-order-column {
            position: static;
          }

          .service-order-card {
            max-width: 650px;
            margin-inline: auto;
          }
        }

        @media (max-width: 650px) {
          .service-details-hero {
            padding: 90px 0 50px;
          }

          .service-details-hero-content {
            margin-top: 28px;
          }

          .service-details-icon {
            width: 74px;
            height: 74px;
            border-radius: 20px;
          }

          .service-details-hero h1 {
            font-size: 29px;
          }

          .service-details-hero p {
            font-size: 14px;
          }

          .service-details-content {
            padding: 42px 0 65px;
          }

          .details-card {
            padding: 22px 18px;
            border-radius: 15px;
          }

          .details-card-heading h2 {
            font-size: 19px;
          }

          .details-list,
          .requirements-grid {
            grid-template-columns: 1fr;
          }

          .service-order-card {
            padding: 22px 18px;
          }
        }
      `}</style>
    </main>
  )
}