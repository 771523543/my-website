'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  Phone,
  Sparkles,
  HelpCircle,
  FileCheck2,
} from 'lucide-react'
import { useState } from 'react'

import {
  services,
  type ServiceCategory,
} from '../../components/Services'

const whatsappNumber = '967776280186'

const categoryLabels: Record<ServiceCategory, string> = {
  research: 'خدمة بحثية',
  academic: 'خدمة أكاديمية',
  design: 'تصميم وخدمات مهنية',
}

export default function ServiceDetailsPage() {
  const params = useParams()
  const serviceId = Array.isArray(params.id)
    ? params.id[0]
    : params.id

  const service = services.find(
    (item) => item.id === serviceId,
  )

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  if (!service) {
    return (
      <main className="not-found-page">
        <div className="not-found-card">
          <div className="not-found-icon">
            <Sparkles size={30} />
          </div>

          <h1>الخدمة غير موجودة</h1>

          <p>
            يبدو أن الخدمة التي تبحث عنها غير متاحة أو أن الرابط
            غير صحيح.
          </p>

          <Link href="/services" className="back-services">
            <ArrowRight size={18} />
            العودة إلى جميع الخدمات
          </Link>
        </div>

        <style jsx>{`
          .not-found-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 30px 20px;
            background:
              radial-gradient(
                circle at 10% 20%,
                rgba(118, 86, 169, 0.12),
                transparent 30%
              ),
              #faf8fc;
            direction: rtl;
          }

          .not-found-card {
            width: min(520px, 100%);
            padding: 45px 30px;
            text-align: center;
            background: white;
            border: 1px solid #e8e2ef;
            border-radius: 25px;
            box-shadow: 0 20px 50px rgba(54, 38, 76, 0.08);
          }

          .not-found-icon {
            width: 65px;
            height: 65px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 20px;
            color: white;
            background: linear-gradient(
              135deg,
              #7656a9,
              #4d9295
            );
          }

          .not-found-card h1 {
            margin: 0;
            color: #28243a;
            font-size: 28px;
            font-weight: 900;
          }

          .not-found-card p {
            margin: 12px 0 25px;
            color: #777487;
            font-size: 14px;
            line-height: 1.8;
          }

          .back-services {
            min-height: 46px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 0 20px;
            border-radius: 13px;
            color: white;
            background: linear-gradient(
              135deg,
              #7656a9,
              #4d9295
            );
            text-decoration: none;
            font-size: 13px;
            font-weight: 800;
          }
        `}</style>
      </main>
    )
  }

  const ServiceIcon = service.icon

  const whatsappMessage = encodeURIComponent(
    `${service.orderText}

أرغب في معرفة التفاصيل والتكلفة ومدة التنفيذ.`,
  )

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <main className="service-details-page">
      {/* =========================
          Hero
      ========================= */}
      <section className="details-hero">
        <div className="hero-circle hero-circle-one" />
        <div className="hero-circle hero-circle-two" />

        <div className="page-container">
          <Link href="/services" className="back-link">
            <ArrowRight size={18} />
            العودة إلى الخدمات
          </Link>

          <div className="hero-content">
            <div className="large-service-icon">
              <ServiceIcon size={40} strokeWidth={1.7} />
            </div>

            <div className="category-badge">
              <span />
              {categoryLabels[service.category]}
            </div>

            <h1>{service.title}</h1>

            <div className="subtitle">
              {service.subtitle}
            </div>

            <p>{service.about}</p>

            <div className="hero-actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-action"
              >
                <MessageCircle size={19} />
                طلب الخدمة عبر واتساب
                <ArrowLeft size={17} />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-action"
              >
                <Phone size={18} />
                استفسار
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Main Content
      ========================= */}
      <section className="details-section">
        <div className="page-container">
          <div className="details-layout">
            {/* Main */}
            <div className="details-main">
              {/* What we offer */}
              <section className="content-card">
                <div className="section-title">
                  <div className="section-icon purple">
                    <ClipboardCheck size={21} />
                  </div>

                  <div>
                    <span>الخدمة تشمل</span>
                    <h2>ماذا نقدم لك؟</h2>
                  </div>
                </div>

                <div className="offer-grid">
                  {service.whatWeOffer.map(
                    (item, index) => (
                      <div
                        className="offer-card"
                        key={item}
                      >
                        <div className="offer-number">
                          {String(index + 1).padStart(2, '0')}
                        </div>

                        <div>
                          <strong>{item}</strong>

                          <p>
                            يتم تنفيذ هذا الجزء وفق
                            متطلبات الخدمة والتعليمات
                            المرسلة.
                          </p>
                        </div>

                        <CheckCircle2
                          className="offer-check"
                          size={19}
                        />
                      </div>
                    ),
                  )}
                </div>
              </section>

              {/* Requirements */}
              <section className="content-card">
                <div className="section-title">
                  <div className="section-icon teal">
                    <FileCheck2 size={21} />
                  </div>

                  <div>
                    <span>قبل بدء العمل</span>
                    <h2>المعلومات المطلوبة</h2>
                  </div>
                </div>

                <p className="section-description">
                  لتسهيل تنفيذ طلبك، يرجى توفير المعلومات
                  التالية قدر الإمكان:
                </p>

                <div className="requirements-list">
                  {service.requirements.map(
                    (item, index) => (
                      <div
                        className="requirement-item"
                        key={item}
                      >
                        <div className="requirement-number">
                          {index + 1}
                        </div>

                        <span>{item}</span>

                        <CheckCircle2 size={17} />
                      </div>
                    ),
                  )}
                </div>
              </section>

              {/* FAQ */}
              <section className="content-card">
                <div className="section-title">
                  <div className="section-icon purple">
                    <HelpCircle size={21} />
                  </div>

                  <div>
                    <span>أسئلة شائعة</span>
                    <h2>هل لديك استفسار؟</h2>
                  </div>
                </div>

                <div className="faq-list">
                  {service.faqs.map((faq, index) => {
                    const isOpen = openFaq === index

                    return (
                      <div
                        className={`faq-item ${
                          isOpen ? 'open' : ''
                        }`}
                        key={faq.q}
                      >
                        <button
                          type="button"
                          className="faq-question"
                          onClick={() =>
                            setOpenFaq(
                              isOpen ? null : index,
                            )
                          }
                          aria-expanded={isOpen}
                        >
                          <span>{faq.q}</span>

                          <span className="faq-plus">
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>

                        <div
                          className={`faq-answer ${
                            isOpen ? 'show' : ''
                          }`}
                        >
                          <p>{faq.a}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="details-sidebar">
              <div className="order-card">
                <div className="order-card-icon">
                  <Sparkles size={24} />
                </div>

                <span className="order-kicker">
                  جاهز للبدء؟
                </span>

                <h2>اطلب خدمتك الآن</h2>

                <p>
                  أرسل لنا تفاصيل طلبك عبر واتساب، وسنساعدك
                  في معرفة التفاصيل والتكلفة والمدة المناسبة.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-card-button"
                >
                  <MessageCircle size={19} />
                  طلب الخدمة
                  <ArrowLeft size={17} />
                </a>

                <div className="order-note">
                  <CheckCircle2 size={16} />
                  <span>رد مباشر عبر واتساب</span>
                </div>

                <div className="order-note">
                  <CheckCircle2 size={16} />
                  <span>توضيح المتطلبات قبل البدء</span>
                </div>

                <div className="order-note">
                  <CheckCircle2 size={16} />
                  <span>تحديد التفاصيل والتكلفة</span>
                </div>
              </div>

              <Link
                href="/services"
                className="all-services-link"
              >
                <span>
                  <ArrowRight size={17} />
                  تصفح جميع الخدمات
                </span>

                <ArrowLeft size={17} />
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {/* =========================
          Bottom CTA
      ========================= */}
      <section className="bottom-cta">
        <div className="page-container">
          <div className="bottom-cta-content">
            <div>
              <span>منصة هديل للخدمات الطلابية</span>

              <h2>
                هل لديك طلب أو استفسار آخر؟
              </h2>

              <p>
                لا تتردد في التواصل معنا، وسنساعدك في معرفة
                الخدمة المناسبة لاحتياجك.
              </p>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                'السلام عليكم، لدي استفسار عن خدمات منصة هديل.',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bottom-button"
            >
              تواصل معنا
              <ArrowLeft size={18} />
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .service-details-page {
          --purple: #7656a9;
          --purple-dark: #5f438c;
          --purple-light: #f1ebf9;
          --teal: #4d9295;
          --teal-light: #eaf5f4;
          --text: #28243a;
          --muted: #777487;
          --border: #e8e2ef;
          --soft: #faf8fc;

          min-height: 100vh;
          background: var(--soft);
          color: var(--text);
          direction: rtl;
        }

        .page-container {
          width: min(1120px, calc(100% - 40px));
          margin: 0 auto;
        }

        /* =========================
           Hero
        ========================= */

        .details-hero {
          position: relative;
          overflow: hidden;
          padding: 30px 0 75px;
          background:
            radial-gradient(
              circle at 10% 30%,
              rgba(118, 86, 169, 0.13),
              transparent 30%
            ),
            radial-gradient(
              circle at 90% 80%,
              rgba(77, 146, 149, 0.12),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #fbf9fd,
              #f3eef8 52%,
              #eef7f6
            );
          border-bottom: 1px solid rgba(118, 86, 169, 0.08);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 45px;
          color: var(--muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          transition: 0.25s ease;
        }

        .back-link:hover {
          color: var(--purple);
          transform: translateX(3px);
        }

        .hero-content {
          max-width: 820px;
        }

        .large-service-icon {
          width: 82px;
          height: 82px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border-radius: 25px;
          color: white;
          background: linear-gradient(
            145deg,
            var(--purple),
            var(--teal)
          );
          box-shadow:
            0 18px 40px rgba(118, 86, 169, 0.2),
            0 5px 15px rgba(77, 146, 149, 0.12);
        }

        .category-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: var(--purple-dark);
          font-size: 13px;
          font-weight: 800;
        }

        .category-badge span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 0 5px rgba(77, 146, 149, 0.1);
        }

        .hero-content h1 {
          margin: 0;
          color: var(--text);
          font-size: clamp(34px, 5vw, 57px);
          line-height: 1.2;
          font-weight: 900;
          letter-spacing: -1px;
        }

        .subtitle {
          margin-top: 10px;
          color: var(--teal);
          font-size: 14px;
          font-weight: 800;
        }

        .hero-content > p {
          max-width: 760px;
          margin: 20px 0 0;
          color: var(--muted);
          font-size: 16px;
          line-height: 1.95;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 11px;
          margin-top: 30px;
        }

        .primary-action,
        .secondary-action {
          min-height: 49px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 20px;
          border-radius: 14px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 900;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .primary-action {
          color: white;
          background: linear-gradient(
            135deg,
            var(--purple),
            var(--teal)
          );
          box-shadow: 0 10px 25px rgba(118, 86, 169, 0.18);
        }

        .secondary-action {
          color: var(--purple-dark);
          background: white;
          border: 1px solid var(--border);
        }

        .primary-action:hover,
        .secondary-action:hover {
          transform: translateY(-2px);
        }

        .primary-action:hover {
          box-shadow: 0 15px 30px rgba(118, 86, 169, 0.25);
        }

        .hero-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-circle-one {
          width: 310px;
          height: 310px;
          left: -130px;
          top: -120px;
          border: 1px solid rgba(118, 86, 169, 0.1);
        }

        .hero-circle-two {
          width: 260px;
          height: 260px;
          right: -100px;
          bottom: -150px;
          border: 1px solid rgba(77, 146, 149, 0.12);
        }

        /* =========================
           Main
        ========================= */

        .details-section {
          padding: 75px 0;
        }

        .details-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 330px;
          gap: 25px;
          align-items: start;
        }

        .details-main {
          display: flex;
          flex-direction: column;
          gap: 22px;
          min-width: 0;
        }

        .content-card {
          padding: 28px;
          background: white;
          border: 1px solid var(--border);
          border-radius: 24px;
          box-shadow: 0 8px 30px rgba(54, 38, 76, 0.045);
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 25px;
        }

        .section-icon {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
        }

        .section-icon.purple {
          color: var(--purple);
          background: var(--purple-light);
        }

        .section-icon.teal {
          color: var(--teal);
          background: var(--teal-light);
        }

        .section-title span {
          display: block;
          margin-bottom: 2px;
          color: var(--muted);
          font-size: 11px;
          font-weight: 700;
        }

        .section-title h2 {
          margin: 0;
          color: var(--text);
          font-size: 22px;
          font-weight: 900;
        }

        .offer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 11px;
        }

        .offer-card {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          border: 1px solid #eeeaf3;
          border-radius: 17px;
          background: #fcfbfd;
          transition:
            transform 0.25s ease,
            border-color 0.25s ease;
        }

        .offer-card:hover {
          transform: translateY(-2px);
          border-color: rgba(118, 86, 169, 0.2);
        }

        .offer-number {
          width: 30px;
          height: 30px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          color: var(--purple);
          background: var(--purple-light);
          font-size: 10px;
          font-weight: 900;
        }

        .offer-card strong {
          display: block;
          color: var(--text);
          font-size: 13px;
          line-height: 1.5;
        }

        .offer-card p {
          margin: 4px 0 0;
          color: var(--muted);
          font-size: 10px;
          line-height: 1.6;
        }

        .offer-check {
          position: absolute;
          top: 14px;
          left: 14px;
          color: var(--teal);
        }

        .section-description {
          margin: -8px 0 20px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .requirements-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .requirement-item {
          min-height: 49px;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 8px 12px;
          border-radius: 14px;
          background: #faf9fc;
        }

        .requirement-number {
          width: 30px;
          height: 30px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          color: var(--teal);
          background: var(--teal-light);
          font-size: 11px;
          font-weight: 900;
        }

        .requirement-item span {
          flex: 1;
          color: #5f5a6d;
          font-size: 12px;
          font-weight: 700;
        }

        .requirement-item > svg {
          color: var(--teal);
          flex-shrink: 0;
        }

        /* =========================
           FAQ
        ========================= */

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .faq-item {
          overflow: hidden;
          border: 1px solid #eeeaf3;
          border-radius: 15px;
          background: #fcfbfd;
        }

        .faq-question {
          width: 100%;
          min-height: 55px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 0 17px;
          border: 0;
          background: transparent;
          color: var(--text);
          cursor: pointer;
          font: inherit;
          text-align: right;
          font-size: 13px;
          font-weight: 800;
        }

        .faq-plus {
          width: 27px;
          height: 27px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          color: var(--purple);
          background: var(--purple-light);
          font-size: 18px;
          line-height: 1;
        }

        .faq-answer {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.25s ease;
        }

        .faq-answer.show {
          grid-template-rows: 1fr;
        }

        .faq-answer p {
          min-height: 0;
          overflow: hidden;
          margin: 0;
          padding: 0 17px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.8;
        }

        .faq-answer.show p {
          padding-bottom: 17px;
        }

        /* =========================
           Sidebar
        ========================= */

        .details-sidebar {
          position: sticky;
          top: 25px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .order-card {
          padding: 27px;
          border-radius: 24px;
          color: white;
          background:
            radial-gradient(
              circle at 100% 0,
              rgba(255, 255, 255, 0.14),
              transparent 35%
            ),
            linear-gradient(
              145deg,
              var(--purple-dark),
              var(--teal)
            );
          box-shadow: 0 20px 45px rgba(76, 62, 102, 0.15);
        }

        .order-card-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.13);
        }

        .order-kicker {
          display: block;
          margin-bottom: 4px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 11px;
          font-weight: 700;
        }

        .order-card h2 {
          margin: 0;
          font-size: 24px;
          font-weight: 900;
        }

        .order-card > p {
          margin: 11px 0 22px;
          color: rgba(255, 255, 255, 0.76);
          font-size: 12px;
          line-height: 1.8;
        }

        .order-card-button {
          min-height: 49px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 13px;
          color: var(--purple-dark);
          background: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 900;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .order-card-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }

        .order-note {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 13px;
          color: rgba(255, 255, 255, 0.78);
          font-size: 10px;
          font-weight: 600;
        }

        .order-note svg {
          color: #c7efdf;
        }

        .all-services-link {
          min-height: 55px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 17px;
          border: 1px solid var(--border);
          border-radius: 16px;
          color: var(--purple-dark);
          background: white;
          text-decoration: none;
          font-size: 12px;
          font-weight: 800;
          transition: 0.25s ease;
        }

        .all-services-link span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .all-services-link:hover {
          transform: translateY(-2px);
          border-color: rgba(118, 86, 169, 0.25);
        }

        /* =========================
           Bottom CTA
        ========================= */

        .bottom-cta {
          padding: 0 0 70px;
        }

        .bottom-cta-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          padding: 30px;
          border-radius: 24px;
          background: linear-gradient(
            135deg,
            #f1ebf9,
            #eaf5f4
          );
          border: 1px solid var(--border);
        }

        .bottom-cta-content > div {
          flex: 1;
        }

        .bottom-cta-content span {
          display: block;
          margin-bottom: 5px;
          color: var(--teal);
          font-size: 11px;
          font-weight: 800;
        }

        .bottom-cta-content h2 {
          margin: 0;
          color: var(--text);
          font-size: 22px;
          font-weight: 900;
        }

        .bottom-cta-content p {
          margin: 7px 0 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .bottom-button {
          min-height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 20px;
          border-radius: 13px;
          color: white;
          background: linear-gradient(
            135deg,
            var(--purple),
            var(--teal)
          );
          text-decoration: none;
          font-size: 12px;
          font-weight: 900;
          box-shadow: 0 8px 20px rgba(118, 86, 169, 0.15);
          transition: 0.25s ease;
        }

        .bottom-button:hover {
          transform: translateY(-2px);
        }

        /* =========================
           Responsive
        ========================= */

        @media (max-width: 900px) {
          .details-layout {
            grid-template-columns: 1fr;
          }

          .details-sidebar {
            position: static;
          }

          .order-card {
            display: grid;
            grid-template-columns: auto 1fr;
            column-gap: 15px;
          }

          .order-card-icon {
            grid-row: span 3;
          }

          .order-card-button {
            grid-column: 1 / -1;
            margin-top: 10px;
          }

          .order-note {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 650px) {
          .page-container {
            width: min(100% - 24px, 1120px);
          }

          .details-hero {
            padding: 25px 0 55px;
          }

          .back-link {
            margin-bottom: 32px;
          }

          .large-service-icon {
            width: 68px;
            height: 68px;
            border-radius: 21px;
          }

          .hero-content h1 {
            font-size: 34px;
          }

          .hero-content > p {
            font-size: 14px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .primary-action,
          .secondary-action {
            width: 100%;
          }

          .details-section {
            padding: 50px 0;
          }

          .content-card {
            padding: 21px;
            border-radius: 20px;
          }

          .section-title h2 {
            font-size: 19px;
          }

          .offer-grid {
            grid-template-columns: 1fr;
          }

          .offer-card {
            padding: 14px;
          }

          .bottom-cta-content {
            flex-direction: column;
            align-items: stretch;
            padding: 23px;
          }

          .bottom-button {
            width: 100%;
          }

          .order-card {
            display: block;
          }

          .order-card-button {
            margin-top: 0;
          }
        }
      `}</style>
    </main>
  )
}