'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  FileText,
  GraduationCap,
  Laptop,
  PencilLine,
  Presentation,
  Search,
  Sparkles,
  UserRound,
} from 'lucide-react'

import {
  services,
  type ServiceCategory,
} from '../components/Services'

const whatsappNumber = '967776280186'

type FilterKey = 'all' | ServiceCategory

const filters: {
  key: FilterKey
  label: string
}[] = [
  {
    key: 'all',
    label: 'جميع الخدمات',
  },
  {
    key: 'research',
    label: 'الخدمات البحثية',
  },
  {
    key: 'academic',
    label: 'الخدمات الأكاديمية',
  },
  {
    key: 'design',
    label: 'التصميم والخدمات المهنية',
  },
]

const categoryLabels: Record<ServiceCategory, string> = {
  research: 'بحثية',
  academic: 'أكاديمية',
  design: 'تصميم ومهنية',
}

const categoryIcons: Record<ServiceCategory, typeof BookOpen> = {
  research: BookOpen,
  academic: ClipboardList,
  design: Presentation,
}

export default function ServicesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filteredServices = useMemo(() => {
    if (activeFilter === 'all') {
      return services
    }

    return services.filter(
      (service) => service.category === activeFilter,
    )
  }, [activeFilter])

  const createWhatsappUrl = (serviceTitle: string) => {
    const message = encodeURIComponent(
      `السلام عليكم، أرغب في طلب خدمة: ${serviceTitle}`,
    )

    return `https://wa.me/${whatsappNumber}?text=${message}`
  }

  return (
    <main className="services-page">
      {/* =========================
          Hero
      ========================= */}
      <section className="services-hero">
        <div className="hero-decoration hero-decoration-one" />
        <div className="hero-decoration hero-decoration-two" />

        <div className="services-container">
          <Link href="/" className="back-home">
            <ArrowLeft size={17} />
            العودة للرئيسية
          </Link>

          <div className="hero-icon">
            <Sparkles size={30} />
          </div>

          <span className="hero-label">
            <span className="label-dot" />
            خدمات منصة هديل
          </span>

          <h1>
            خدماتنا
            <span> الأكاديمية والطلابية</span>
          </h1>

          <p>
            نقدم مجموعة متكاملة من الخدمات الطلابية والأكاديمية
            لمساعدتك على تنظيم أعمالك وإنجاز متطلباتك بطريقة
            مرتبة واحترافية.
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>{services.length}+</strong>
              <span>خدمات متنوعة</span>
            </div>

            <div className="stat-divider" />

            <div className="hero-stat">
              <strong>4</strong>
              <span>مجالات رئيسية</span>
            </div>

            <div className="stat-divider" />

            <div className="hero-stat">
              <strong>24/7</strong>
              <span>استقبال الطلبات</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Services
      ========================= */}
      <section className="services-section">
        <div className="services-container">
          <div className="section-heading">
            <div>
              <span className="section-kicker">
                اختر الخدمة المناسبة
              </span>

              <h2>
                كل ما تحتاجه
                <span> في مكان واحد</span>
              </h2>
            </div>

            <p>
              تصفح خدماتنا واختر المجال المناسب لك، ثم انتقل إلى
              تفاصيل الخدمة أو تواصل معنا مباشرة.
            </p>
          </div>

          {/* Filters */}
          <div className="filters-wrapper">
            <div className="filters">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.key

                return (
                  <button
                    key={filter.key}
                    type="button"
                    className={`filter-button ${
                      isActive ? 'active' : ''
                    }`}
                    onClick={() => setActiveFilter(filter.key)}
                  >
                    {filter.key !== 'all' && (
                      <span className="filter-icon">
                        {(() => {
                          const Icon =
                            categoryIcons[filter.key]

                          return <Icon size={17} />
                        })()}
                      </span>
                    )}

                    {filter.key === 'all' && (
                      <Sparkles size={17} />
                    )}

                    {filter.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Services Grid */}
          <div className="services-grid">
            {filteredServices.map((service, index) => {
              const Icon = service.icon

              return (
                <article
                  className="service-card"
                  key={service.id}
                  style={
                    {
                      '--delay': `${index * 45}ms`,
                    } as React.CSSProperties
                  }
                >
                  <div className="card-top">
                    <div className="service-icon">
                      <Icon size={28} strokeWidth={1.8} />
                    </div>

                    <span className="service-category">
                      {categoryLabels[service.category]}
                    </span>
                  </div>

                  <div className="service-content">
                    <h3>{service.title}</h3>

                    <div className="service-subtitle">
                      {service.subtitle}
                    </div>

                    <p>{service.about}</p>

                    <div className="offer-list">
                      {service.whatWeOffer
                        .slice(0, 3)
                        .map((item) => (
                          <div
                            className="offer-item"
                            key={item}
                          >
                            <CheckCircle2 size={16} />
                            <span>{item}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="card-actions">
                    <Link
                      href={`/services/${service.id}`}
                      className="details-button"
                    >
                      تفاصيل الخدمة
                      <ArrowLeft size={17} />
                    </Link>

                    <a
                      href={createWhatsappUrl(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="order-button"
                    >
                      طلب الخدمة
                    </a>
                  </div>
                </article>
              )
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="empty-state">
              <Sparkles size={28} />
              <h3>لا توجد خدمات في هذا التصنيف</h3>
              <p>
                اختر تصنيفًا آخر لعرض الخدمات المتاحة.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================
          Bottom CTA
      ========================= */}
      <section className="services-cta">
        <div className="cta-decoration" />

        <div className="services-container">
          <div className="cta-content">
            <div className="cta-icon">
              <Sparkles size={25} />
            </div>

            <div>
              <span>هل تحتاج إلى مساعدة؟</span>

              <h2>
                لم تجد الخدمة التي تبحث عنها؟
              </h2>

              <p>
                تواصل معنا وأخبرنا بما تحتاجه، وسنساعدك
                في معرفة الخدمة المناسبة لك.
              </p>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                'السلام عليكم، لدي استفسار عن الخدمات المتاحة في منصة هديل.',
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              تواصل معنا
              <ArrowLeft size={18} />
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .services-page {
          --purple: #7656a9;
          --purple-dark: #5f438c;
          --purple-light: #f1ebf9;
          --teal: #4d9295;
          --teal-light: #eaf5f4;
          --text: #28243a;
          --muted: #777487;
          --border: #e8e2ef;
          --surface: #ffffff;
          --soft: #faf8fc;

          min-height: 100vh;
          background: var(--soft);
          color: var(--text);
          direction: rtl;
        }

        .services-container {
          width: min(1180px, calc(100% - 40px));
          margin: 0 auto;
        }

        /* =========================
           Hero
        ========================= */

        .services-hero {
          position: relative;
          overflow: hidden;
          padding: 34px 0 70px;
          background:
            radial-gradient(
              circle at 10% 20%,
              rgba(118, 86, 169, 0.12),
              transparent 30%
            ),
            radial-gradient(
              circle at 90% 70%,
              rgba(77, 146, 149, 0.11),
              transparent 28%
            ),
            linear-gradient(
              135deg,
              #fbf9fd 0%,
              #f4eff9 48%,
              #eef7f6 100%
            );
          border-bottom: 1px solid rgba(118, 86, 169, 0.08);
        }

        .back-home {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 40px;
          transition: 0.25s ease;
        }

        .back-home:hover {
          color: var(--purple);
          transform: translateX(-3px);
        }

        .hero-icon {
          width: 68px;
          height: 68px;
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background: linear-gradient(
            145deg,
            var(--purple),
            var(--teal)
          );
          box-shadow:
            0 15px 35px rgba(118, 86, 169, 0.2),
            0 5px 15px rgba(77, 146, 149, 0.12);
          margin-bottom: 22px;
        }

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--purple-dark);
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 13px;
        }

        .label-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 0 5px rgba(77, 146, 149, 0.1);
        }

        .services-hero h1 {
          margin: 0;
          font-size: clamp(38px, 6vw, 68px);
          line-height: 1.1;
          letter-spacing: -1.5px;
          font-weight: 900;
          color: var(--text);
        }

        .services-hero h1 span {
          color: var(--purple);
        }

        .services-hero p {
          max-width: 700px;
          margin: 22px 0 0;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.9;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 30px;
          margin-top: 40px;
          width: fit-content;
        }

        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hero-stat strong {
          color: var(--purple-dark);
          font-size: 25px;
          line-height: 1;
          font-weight: 900;
        }

        .hero-stat span {
          color: var(--muted);
          font-size: 12px;
          font-weight: 600;
        }

        .stat-divider {
          width: 1px;
          height: 38px;
          background: var(--border);
        }

        .hero-decoration {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-decoration-one {
          width: 270px;
          height: 270px;
          top: -130px;
          left: -90px;
          border: 1px solid rgba(118, 86, 169, 0.1);
        }

        .hero-decoration-two {
          width: 220px;
          height: 220px;
          right: -80px;
          bottom: -110px;
          border: 1px solid rgba(77, 146, 149, 0.12);
        }

        /* =========================
           Section
        ========================= */

        .services-section {
          padding: 85px 0 100px;
        }

        .section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 35px;
        }

        .section-kicker {
          display: block;
          color: var(--teal);
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 9px;
        }

        .section-heading h2 {
          margin: 0;
          color: var(--text);
          font-size: clamp(28px, 4vw, 43px);
          line-height: 1.2;
          font-weight: 900;
        }

        .section-heading h2 span {
          color: var(--purple);
        }

        .section-heading > p {
          max-width: 390px;
          margin: 0;
          color: var(--muted);
          line-height: 1.8;
          font-size: 14px;
        }

        /* =========================
           Filters
        ========================= */

        .filters-wrapper {
          margin-bottom: 35px;
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .filter-button {
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 18px;
          border: 1px solid var(--border);
          border-radius: 14px;
          background: white;
          color: var(--muted);
          cursor: pointer;
          font: inherit;
          font-size: 13px;
          font-weight: 700;
          transition:
            transform 0.25s ease,
            background 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .filter-button:hover {
          transform: translateY(-2px);
          color: var(--purple);
          border-color: rgba(118, 86, 169, 0.25);
        }

        .filter-button.active {
          color: white;
          border-color: transparent;
          background: linear-gradient(
            135deg,
            var(--purple),
            var(--teal)
          );
          box-shadow: 0 8px 20px rgba(118, 86, 169, 0.16);
        }

        .filter-icon {
          display: flex;
        }

        /* =========================
           Grid
        ========================= */

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .service-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
          padding: 25px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 25px;
          box-shadow: 0 8px 30px rgba(54, 38, 76, 0.045);
          animation: cardIn 0.5s ease both;
          animation-delay: var(--delay);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            var(--purple),
            var(--teal)
          );
          opacity: 0;
          transition: 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-5px);
          border-color: rgba(118, 86, 169, 0.2);
          box-shadow: 0 18px 45px rgba(54, 38, 76, 0.09);
        }

        .service-card:hover::before {
          opacity: 1;
        }

        .card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
        }

        .service-icon {
          width: 58px;
          height: 58px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          color: var(--purple);
          background: linear-gradient(
            145deg,
            var(--purple-light),
            var(--teal-light)
          );
        }

        .service-category {
          display: inline-flex;
          align-items: center;
          padding: 7px 11px;
          border-radius: 999px;
          background: #f7f4fa;
          color: var(--purple-dark);
          font-size: 11px;
          font-weight: 800;
        }

        .service-content {
          flex: 1;
          padding-top: 22px;
        }

        .service-content h3 {
          margin: 0;
          color: var(--text);
          font-size: 21px;
          line-height: 1.45;
          font-weight: 850;
        }

        .service-subtitle {
          margin-top: 7px;
          color: var(--teal);
          font-size: 12px;
          font-weight: 800;
        }

        .service-content > p {
          margin: 15px 0 20px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.85;
        }

        .offer-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
          padding: 15px;
          border-radius: 17px;
          background: #faf9fc;
        }

        .offer-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #625e70;
          font-size: 12px;
          font-weight: 600;
        }

        .offer-item svg {
          flex-shrink: 0;
          color: var(--teal);
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 22px;
        }

        .details-button,
        .order-button {
          min-height: 45px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 13px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 800;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
        }

        .details-button {
          flex: 1;
          color: var(--purple-dark);
          background: var(--purple-light);
        }

        .details-button:hover {
          transform: translateY(-2px);
          background: #e9def5;
        }

        .order-button {
          flex: 0 0 120px;
          color: white;
          background: linear-gradient(
            135deg,
            var(--purple),
            var(--teal)
          );
          box-shadow: 0 7px 18px rgba(118, 86, 169, 0.14);
        }

        .order-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 11px 24px rgba(118, 86, 169, 0.22);
        }

        /* =========================
           Empty
        ========================= */

        .empty-state {
          padding: 55px 20px;
          text-align: center;
          background: white;
          border: 1px solid var(--border);
          border-radius: 24px;
          color: var(--muted);
        }

        .empty-state svg {
          color: var(--purple);
          margin-bottom: 12px;
        }

        .empty-state h3 {
          margin: 0 0 8px;
          color: var(--text);
          font-size: 20px;
        }

        .empty-state p {
          margin: 0;
          font-size: 13px;
        }

        /* =========================
           CTA
        ========================= */

        .services-cta {
          position: relative;
          overflow: hidden;
          padding: 0 0 70px;
        }

        .cta-content {
          position: relative;
          display: flex;
          align-items: center;
          gap: 22px;
          padding: 30px;
          border-radius: 25px;
          background:
            radial-gradient(
              circle at 100% 0,
              rgba(255, 255, 255, 0.13),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              var(--purple-dark),
              var(--teal)
            );
          color: white;
          box-shadow: 0 20px 45px rgba(77, 62, 103, 0.15);
        }

        .cta-icon {
          width: 58px;
          height: 58px;
          flex: 0 0 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.13);
        }

        .cta-content > div:nth-child(2) {
          flex: 1;
        }

        .cta-content span {
          display: block;
          margin-bottom: 4px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 12px;
          font-weight: 700;
        }

        .cta-content h2 {
          margin: 0;
          font-size: 23px;
          line-height: 1.4;
          font-weight: 900;
        }

        .cta-content p {
          margin: 6px 0 0;
          color: rgba(255, 255, 255, 0.76);
          font-size: 13px;
          line-height: 1.7;
        }

        .cta-button {
          min-height: 47px;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 20px;
          border-radius: 13px;
          background: white;
          color: var(--purple-dark);
          text-decoration: none;
          font-size: 13px;
          font-weight: 900;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
        }

        @keyframes cardIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =========================
           Responsive
        ========================= */

        @media (max-width: 850px) {
          .section-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 15px;
          }

          .section-heading > p {
            max-width: 600px;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .cta-content {
            align-items: flex-start;
            flex-wrap: wrap;
          }

          .cta-button {
            width: 100%;
          }
        }

        @media (max-width: 600px) {
          .services-container {
            width: min(100% - 24px, 1180px);
          }

          .services-hero {
            padding: 25px 0 50px;
          }

          .back-home {
            margin-bottom: 30px;
          }

          .hero-icon {
            width: 58px;
            height: 58px;
            border-radius: 18px;
          }

          .services-hero h1 {
            font-size: 39px;
            letter-spacing: -0.8px;
          }

          .services-hero p {
            font-size: 14px;
            line-height: 1.8;
          }

          .hero-stats {
            width: 100%;
            justify-content: space-between;
            gap: 12px;
          }

          .hero-stat {
            text-align: center;
          }

          .hero-stat strong {
            font-size: 21px;
          }

          .hero-stat span {
            font-size: 10px;
          }

          .services-section {
            padding: 55px 0 70px;
          }

          .section-heading h2 {
            font-size: 30px;
          }

          .filters {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          .filter-button {
            width: 100%;
            padding: 0 10px;
            font-size: 11px;
          }

          .service-card {
            padding: 20px;
            border-radius: 21px;
          }

          .service-content h3 {
            font-size: 19px;
          }

          .card-actions {
            flex-direction: column;
          }

          .details-button,
          .order-button {
            width: 100%;
            flex: none;
          }

          .cta-content {
            padding: 23px;
            border-radius: 21px;
          }

          .cta-icon {
            width: 52px;
            height: 52px;
            flex-basis: 52px;
          }

          .cta-content h2 {
            font-size: 19px;
          }

          .cta-content p {
            font-size: 12px;
          }
        }
      `}</style>
    </main>
  )
}