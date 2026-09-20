'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  FileText,
  GraduationCap,
  Laptop,
  MessageCircle,
  PencilLine,
  Presentation,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { useState } from 'react'

import {
  whatsappNumber,
  type Service,
} from '../../components/Services'

type Props = {
  service: Omit<Service, 'icon'>
}

const serviceIcons: Record<
  string,
  LucideIcon
> = {
  research: BookOpen,
  reports: FileText,
  assignments: ClipboardList,
  homework: PencilLine,
  lms: Laptop,
  presentation: Presentation,
  cv: UserRound,
  'case-study': Search,
  feasibility: BarChart3,
  graduation: GraduationCap,
}

export default function ServiceDetailsClient({
  service,
}: Props) {
  const [openFaq, setOpenFaq] =
    useState<number | null>(0)

  const Icon =
    serviceIcons[service.id] ?? BookOpen

  const categoryLabel =
    service.category === 'research'
      ? 'الخدمات البحثية'
      : service.category === 'academic'
        ? 'الخدمات الأكاديمية'
        : 'التصميم والخدمات المهنية'

  const whatsappMessage = encodeURIComponent(
    service.orderText,
  )

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <main className="service-details-page">

      {/* =========================
          Hero
      ========================= */}

      <section className="service-details-hero">
        <div className="container">

          <Link
            href="/services"
            className="service-back-link"
          >
            <ArrowRight size={17} />

            <span>
              العودة إلى جميع الخدمات
            </span>
          </Link>

          <div className="service-details-hero-content">

            <div className="service-details-icon-wrap">
              <div className="service-details-icon">
                <Icon
                  size={42}
                  strokeWidth={1.7}
                />
              </div>
            </div>

            <div className="service-details-category">
              <Sparkles size={14} />

              <span>
                {categoryLabel}
              </span>
            </div>

            <h1>
              {service.title}
            </h1>

            <p>
              {service.subtitle}
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-order-button"
            >
              <Send size={18} />

              <span>
                اطلب خدمتك الآن
              </span>

              <ArrowRight
                size={17}
                className="hero-order-arrow"
              />
            </a>

          </div>
        </div>
      </section>

      {/* =========================
          Main Content
      ========================= */}

      <section className="service-details-content">
        <div className="container">

          <div className="service-details-layout">

            {/* المحتوى الرئيسي */}

            <div className="service-details-main">

              {/* عن الخدمة */}

              <section className="details-card">

                <div className="details-card-heading">

                  <div className="details-heading-icon">
                    <ClipboardCheck
                      size={22}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <span>
                      عن الخدمة
                    </span>

                    <h2>
                      نبذة عن الخدمة
                    </h2>
                  </div>

                </div>

                <p className="details-description">
                  {service.about}
                </p>

              </section>

              {/* ماذا نقدم */}

              <section className="details-card">

                <div className="details-card-heading">

                  <div className="details-heading-icon">
                    <CheckCircle2
                      size={22}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <span>
                      ماذا نقدم؟
                    </span>

                    <h2>
                      ما تتضمنه الخدمة
                    </h2>
                  </div>

                </div>

                <div className="details-list">

                  {service.whatWeOffer.map(
                    (item, index) => (
                      <div
                        key={item}
                        className="details-list-item"
                      >
                        <span className="list-number">
                          {String(index + 1).padStart(
                            2,
                            '0',
                          )}
                        </span>

                        <CheckCircle2
                          size={18}
                        />

                        <span>
                          {item}
                        </span>
                      </div>
                    ),
                  )}

                </div>

              </section>

              {/* المتطلبات */}

              <section className="details-card">

                <div className="details-card-heading">

                  <div className="details-heading-icon">
                    <ShieldCheck
                      size={22}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <span>
                      قبل الطلب
                    </span>

                    <h2>
                      متطلبات الخدمة
                    </h2>
                  </div>

                </div>

                <div className="requirements-grid">

                  {service.requirements.map(
                    (item, index) => (
                      <div
                        key={item}
                        className="requirement-item"
                      >
                        <span className="requirement-number">
                          {String(index + 1).padStart(
                            2,
                            '0',
                          )}
                        </span>

                        <span>
                          {item}
                        </span>
                      </div>
                    ),
                  )}

                </div>

              </section>

              {/* FAQ */}

              {service.faqs.length > 0 && (
                <section className="details-card faq-card">

                  <div className="details-card-heading">

                    <div className="details-heading-icon">
                      <MessageCircle
                        size={22}
                        strokeWidth={1.8}
                      />
                    </div>

                    <div>
                      <span>
                        الأسئلة الشائعة
                      </span>

                      <h2>
                        هل لديك استفسار؟
                      </h2>
                    </div>

                  </div>

                  <div className="faq-list">

                    {service.faqs.map(
                      (faq, index) => {
                        const isOpen =
                          openFaq === index

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
                                setOpenFaq(
                                  isOpen
                                    ? null
                                    : index,
                                )
                              }
                              aria-expanded={isOpen}
                            >

                              <span>
                                {faq.q}
                              </span>

                              <span className="faq-arrow">
                                <ChevronDown
                                  size={18}
                                />
                              </span>

                            </button>

                            {isOpen && (
                              <div className="faq-answer">
                                {faq.a}
                              </div>
                            )}

                          </div>
                        )
                      },
                    )}

                  </div>

                </section>
              )}

            </div>

            {/* بطاقة الطلب */}

            <aside className="service-order-column">

              <div className="service-order-card">

                <div className="order-card-decoration" />

                <div className="order-card-top">

                  <div className="order-card-icon">
                    <Send
                      size={25}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div>
                    <span>
                      طلب الخدمة
                    </span>

                    <strong>
                      منصة هديل
                    </strong>
                  </div>

                </div>

                <h2>
                  هل أنت جاهز
                  <br />
                  لطلب الخدمة؟
                </h2>

                <p>
                  أرسل طلبك الآن عبر واتساب وسنتواصل
                  معك لمعرفة التفاصيل المطلوبة والبدء
                  في تنفيذ الخدمة.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="order-whatsapp-button"
                >
                  <MessageCircle
                    size={20}
                  />

                  <span>
                    اطلب خدمتك الآن
                  </span>
                </a>

                <div className="order-notes">

                  <div className="order-note">
                    <CheckCircle2 size={16} />

                    <span>
                      تواصل مباشر وسهل
                    </span>
                  </div>

                  <div className="order-note">
                    <CheckCircle2 size={16} />

                    <span>
                      تحديد المتطلبات قبل البدء
                    </span>
                  </div>

                  <div className="order-note">
                    <CheckCircle2 size={16} />

                    <span>
                      متابعة تفاصيل الطلب
                    </span>
                  </div>

                </div>

                <div className="order-card-footer">
                  <ShieldCheck size={17} />

                  <span>
                    خصوصية وسرية في التعامل
                  </span>
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
           HERO
        ========================= */

        .service-details-hero {
          position: relative;
          overflow: hidden;
          padding: 105px 0 72px;
          color: white;
          background:
            linear-gradient(
              145deg,
              #173f91 0%,
              #2455c4 50%,
              #163878 100%
            );
        }

        .service-details-hero::before {
          content: '';
          position: absolute;
          width: 460px;
          height: 460px;
          top: -330px;
          left: -150px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(255,255,255,0.14),
              transparent 70%
            );
          pointer-events: none;
        }

        .service-details-hero::after {
          content: '';
          position: absolute;
          width: 340px;
          height: 340px;
          right: -190px;
          bottom: -240px;
          border:
            1px solid
            rgba(213,170,84,0.28);
          border-radius: 50%;
          pointer-events: none;
        }

        .service-back-link {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: rgba(255,255,255,0.82);
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .service-back-link:hover {
          color: white;
        }

        .service-details-hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-top: 38px;
        }

        .service-details-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 17px;
        }

        .service-details-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 94px;
          height: 94px;
          color: #174fae;
          background:
            radial-gradient(
              circle at 30% 25%,
              #ffffff,
              #dceaff
            );
          border:
            4px solid
            #d5aa54;
          border-radius: 26px;
          box-shadow:
            0 17px 35px
              rgba(0,0,0,0.18),
            inset 8px 8px 15px
              rgba(255,255,255,0.88),
            inset -8px -9px 16px
              rgba(36,85,196,0.18);
        }

        .service-details-category {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 8px 14px;
          color: #173f91;
          background: #fff8e8;
          border:
            1px solid
            #f1d89e;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          box-shadow:
            0 7px 18px
              rgba(0,0,0,0.12);
        }

        .service-details-category svg {
          color: #c98b25;
        }

        .service-details-hero h1 {
          margin: 17px 0 8px;
          color: white;
          font-size: clamp(32px, 5vw, 50px);
          font-weight: 900;
          line-height: 1.3;
          text-align: center;
          text-shadow:
            0 3px 9px
              rgba(0,0,0,0.18);
        }

        .service-details-hero p {
          max-width: 700px;
          margin: 0 auto;
          color: rgba(255,255,255,0.84);
          font-size: 16px;
          line-height: 1.9;
          text-align: center;
        }

        .hero-order-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 51px;
          margin-top: 25px;
          padding: 0 23px;
          color: #173f91;
          background: white;
          border:
            2px solid
            #d5aa54;
          border-radius: 13px;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          box-shadow:
            0 12px 25px
              rgba(0,0,0,0.16);
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .hero-order-button:hover {
          background: #fff8e8;
          transform: translateY(-3px);
          box-shadow:
            0 16px 30px
              rgba(0,0,0,0.2);
        }

        .hero-order-arrow {
          transition:
            transform 0.2s ease;
        }

        .hero-order-button:hover
          .hero-order-arrow {
          transform: translateX(4px);
        }

        /* =========================
           CONTENT
        ========================= */

        .service-details-content {
          padding: 65px 0 90px;
        }

        .service-details-layout {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            350px;
          align-items: start;
          gap: 25px;
        }

        .service-details-main {
          display: grid;
          gap: 22px;
          min-width: 0;
        }

        .details-card {
          position: relative;
          overflow: hidden;
          padding: 29px;
          background:
            linear-gradient(
              145deg,
              #ffffff 0%,
              #f7faff 100%
            );
          border:
            1px solid
            #dbe6f5;
          border-radius: 20px;
          box-shadow:
            0 15px 35px
              rgba(23,63,145,0.07),
            inset 0 1px 0
              rgba(255,255,255,0.95);
        }

        .details-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background:
            linear-gradient(
              90deg,
              #173f91,
              #d5aa54,
              #2455c4
            );
          opacity: 0.7;
        }

        /* =========================
           HEADINGS
        ========================= */

        .details-card-heading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 23px;
          text-align: center;
        }

        .details-heading-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          color: #174fae;
          background:
            radial-gradient(
              circle at 30% 25%,
              #ffffff,
              #dceaff
            );
          border:
            3px solid
            #d5aa54;
          border-radius: 16px;
          box-shadow:
            0 8px 18px
              rgba(23,63,145,0.12);
        }

        .details-card-heading > div:last-child {
          text-align: center;
        }

        .details-card-heading span {
          display: block;
          margin-bottom: 3px;
          color: #c98b25;
          font-size: 12px;
          font-weight: 850;
        }

        .details-card-heading h2 {
          margin: 0;
          color: var(--foreground);
          font-size: 23px;
          font-weight: 900;
        }

        .details-description {
          margin: 0;
          color: var(--muted-foreground);
          font-size: 15px;
          line-height: 2.05;
          text-align: right;
          direction: rtl;
        }

        /* =========================
           LIST
        ========================= */

        .details-list {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 11px;
        }

        .details-list-item {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          min-width: 0;
          padding: 14px;
          color: #53627a;
          background: #f7faff;
          border:
            1px solid
            #e3ecf8;
          border-radius: 13px;
          font-size: 13px;
          line-height: 1.8;
          text-align: right;
          direction: rtl;
          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .details-list-item:hover {
          transform: translateY(-2px);
          border-color: #c8d9ef;
          box-shadow:
            0 8px 18px
              rgba(23,63,145,0.06);
        }

        .details-list-item > svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: #2455c4;
        }

        .list-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          color: #173f91;
          background: #e8f1ff;
          border-radius: 8px;
          font-size: 9px;
          font-weight: 900;
        }

        /* =========================
           REQUIREMENTS
        ========================= */

        .requirements-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .requirement-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px;
          color: #59677d;
          background: #f8fbff;
          border:
            1px solid
            #e1eaf6;
          border-radius: 13px;
          font-size: 13px;
          line-height: 1.7;
          text-align: right;
          direction: rtl;
        }

        .requirement-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          color: #173f91;
          background:
            radial-gradient(
              circle at 30% 25%,
              #ffffff,
              #dceaff
            );
          border:
            2px solid
            #d5aa54;
          border-radius: 11px;
          font-size: 10px;
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
          border:
            1px solid
            #dfe8f4;
          border-radius: 13px;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .faq-item.open {
          border-color: #d5aa54;
          box-shadow:
            0 8px 20px
              rgba(23,63,145,0.06);
        }

        .faq-question {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          width: 100%;
          min-height: 57px;
          padding: 0 16px;
          color: var(--foreground);
          background: transparent;
          border: 0;
          font: inherit;
          font-size: 13px;
          font-weight: 850;
          text-align: right;
          direction: rtl;
          cursor: pointer;
        }

        .faq-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 31px;
          height: 31px;
          flex-shrink: 0;
          color: #173f91;
          background: #e8f1ff;
          border-radius: 50%;
          transition:
            transform 0.25s ease,
            background 0.25s ease,
            color 0.25s ease;
        }

        .faq-item.open .faq-arrow {
          color: white;
          background: #173f91;
          transform: rotate(180deg);
        }

        .faq-answer {
          position: relative;
          padding: 0 16px 18px;
          color: var(--muted-foreground);
          font-size: 13px;
          line-height: 1.95;
          text-align: right;
          direction: rtl;
        }

        .faq-answer::before {
          content: '';
          display: block;
          width: 45px;
          height: 2px;
          margin: 0 0 10px auto;
          background: #d5aa54;
          border-radius: 99px;
        }

        /* =========================
           ORDER CARD
        ========================= */

        .service-order-column {
          position: sticky;
          top: 100px;
        }

        .service-order-card {
          position: relative;
          overflow: hidden;
          padding: 27px;
          color: white;
          background:
            linear-gradient(
              145deg,
              #173f91 0%,
              #2455c4 52%,
              #163878 100%
            );
          border:
            2px solid
            rgba(213,170,84,0.65);
          border-radius: 22px;
          box-shadow:
            0 22px 45px
              rgba(23,63,145,0.18),
            inset 0 1px 0
              rgba(255,255,255,0.18);
          text-align: right;
          direction: rtl;
        }

        .order-card-decoration {
          position: absolute;
          width: 250px;
          height: 250px;
          top: -180px;
          left: -120px;
          border-radius: 50%;
          background:
            radial-gradient(
              circle,
              rgba(255,255,255,0.13),
              transparent 70%
            );
          pointer-events: none;
        }

        .order-card-top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 20px;
        }

        .order-card-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 53px;
          height: 53px;
          flex-shrink: 0;
          color: #174fae;
          background:
            radial-gradient(
              circle at 30% 25%,
              #ffffff,
              #dceaff
            );
          border:
            3px solid
            #d5aa54;
          border-radius: 15px;
          box-shadow:
            0 9px 18px
              rgba(0,0,0,0.16);
        }

        .order-card-top span {
          display: block;
          margin-bottom: 2px;
          color: #f0c56d;
          font-size: 12px;
          font-weight: 800;
        }

        .order-card-top strong {
          display: block;
          color: white;
          font-size: 14px;
          font-weight: 900;
        }

        .service-order-card h2 {
          position: relative;
          z-index: 1;
          margin: 0;
          color: white;
          font-size: 24px;
          font-weight: 900;
          line-height: 1.55;
          text-align: right;
        }

        .service-order-card > p {
          position: relative;
          z-index: 1;
          margin: 11px 0 21px;
          color: rgba(255,255,255,0.76);
          font-size: 13px;
          line-height: 1.95;
          text-align: right;
        }

        .order-whatsapp-button {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          min-height: 53px;
          color: white;
          background: #1fa463;
          border:
            1px solid
            rgba(255,255,255,0.22);
          border-radius: 13px;
          font-size: 14px;
          font-weight: 900;
          text-decoration: none;
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .order-whatsapp-button:hover {
          background: #198e56;
          transform: translateY(-2px);
          box-shadow:
            0 11px 22px
              rgba(31,164,99,0.22);
        }

        .order-notes {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 10px;
          margin-top: 20px;
          padding-top: 18px;
          border-top:
            1px solid
            rgba(255,255,255,0.16);
        }

        .order-note {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.78);
          font-size: 12px;
          text-align: right;
        }

        .order-note svg {
          flex-shrink: 0;
          color: #f0c56d;
        }

        .order-card-footer {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 21px;
          padding: 11px;
          color: #173f91;
          background: rgba(255,255,255,0.92);
          border-radius: 10px;
          font-size: 11px;
          font-weight: 850;
        }

        .order-card-footer svg {
          color: #c98b25;
        }

        /* =========================
           RESPONSIVE
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
            padding: 90px 0 55px;
          }

          .service-details-hero-content {
            margin-top: 28px;
          }

          .service-details-icon {
            width: 78px;
            height: 78px;
            border-width: 4px;
            border-radius: 22px;
          }

          .service-details-icon svg {
            width: 34px;
            height: 34px;
          }

          .service-details-hero h1 {
            font-size: 30px;
          }

          .service-details-hero p {
            font-size: 14px;
          }

          .hero-order-button {
            width: 100%;
            max-width: 330px;
          }

          .service-details-content {
            padding: 43px 0 65px;
          }

          .details-card {
            padding: 23px 18px;
            border-radius: 17px;
          }

          .details-card-heading h2 {
            font-size: 20px;
          }

          .details-list,
          .requirements-grid {
            grid-template-columns: 1fr;
          }

          .details-description {
            font-size: 14px;
          }

          .service-order-card {
            padding: 23px 18px;
            border-radius: 19px;
          }
        }

        @media (max-width: 400px) {
          .service-details-hero h1 {
            font-size: 27px;
          }

          .service-details-category {
            font-size: 11px;
          }

          .details-card {
            padding: 21px 15px;
          }

          .details-list-item,
          .requirement-item {
            font-size: 12px;
          }

          .service-order-card h2 {
            font-size: 21px;
          }
        }

      `}</style>
    </main>
  )
}