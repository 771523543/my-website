'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  FileText,
  ClipboardList,
  PencilLine,
  Laptop,
  Presentation,
  UserRound,
  Search,
  BarChart3,
  GraduationCap,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
} from 'lucide-react'

type Category = 'all' | 'research' | 'design' | 'academic'

export const services = [
  {
    id: 'research',
    title: 'الخدمات البحثية والأكاديمية',
    shortTitle: 'البحوث الأكاديمية',
    description:
      'نساعدك في إعداد البحوث والدراسات الأكاديمية بصورة منظمة وواضحة، مع ترتيب الأفكار وتنسيق المحتوى والمراجع بما يتناسب مع متطلباتك الجامعية.',
    category: 'research' as Category,
    icon: Search,
    number: '01',
    tag: 'بحث وأكاديميا',
    features: ['إعداد البحث', 'تنسيق المراجع', 'تنظيم المحتوى'],
  },
  {
    id: 'reports',
    title: 'التقارير الجامعية',
    shortTitle: 'التقارير',
    description:
      'نجهز لك التقارير الجامعية بأسلوب احترافي ومنظم، بداية من ترتيب المعلومات وحتى التنسيق النهائي، لتقدم عملاً واضحًا وسهل القراءة.',
    category: 'research' as Category,
    icon: FileText,
    number: '02',
    tag: 'تقارير',
    features: ['كتابة منظمة', 'تنسيق احترافي', 'مراجع ومصادر'],
  },
  {
    id: 'assignments',
    title: 'التكاليف الجامعية',
    shortTitle: 'التكاليف',
    description:
      'حل وتنظيم التكاليف والمهمات الجامعية بمحتوى مرتب وواضح، مع الاهتمام بتفاصيل المطلوب وتجهيز الملف بالشكل المناسب للتسليم.',
    category: 'academic' as Category,
    icon: ClipboardList,
    number: '03',
    tag: 'أكاديمي',
    features: ['حل التكليف', 'تنسيق الملف', 'مراجعة المحتوى'],
  },
  {
    id: 'homework',
    title: 'الواجبات الدراسية',
    shortTitle: 'الواجبات',
    description:
      'مساعدة أكاديمية في إنجاز الواجبات الدراسية وفهم المطلوب وترتيب الإجابات بطريقة واضحة، مع الالتزام بالتعليمات والمواعيد المحددة.',
    category: 'academic' as Category,
    icon: PencilLine,
    number: '04',
    tag: 'دراسي',
    features: ['حل الواجبات', 'مراجعة الإجابات', 'تنظيم التسليم'],
  },
  {
    id: 'lms',
    title: 'إدارة المنصات والمهام الدراسية',
    shortTitle: 'إدارة المهام',
    description:
      'نساعدك في تنظيم ومتابعة المهام الدراسية والمنصات التعليمية، حتى تكون متطلباتك مرتبة أمامك ولا تضيع بين المواعيد والتكليفات.',
    category: 'academic' as Category,
    icon: Laptop,
    number: '05',
    tag: 'منصات تعليمية',
    features: ['تنظيم المهام', 'متابعة المواعيد', 'ترتيب المتطلبات'],
  },
  {
    id: 'presentation',
    title: 'العروض التقديمية والتصميم',
    shortTitle: 'العروض والتصميم',
    description:
      'نحوّل المحتوى الأكاديمي إلى عروض تقديمية جذابة ومنظمة بصريًا، مع توزيع مناسب للمعلومات وعناصر تصميم تساعد على إيصال الفكرة.',
    category: 'design' as Category,
    icon: Presentation,
    number: '06',
    tag: 'تصميم',
    features: ['PowerPoint', 'تصميم جذاب', 'تنظيم بصري'],
  },
  {
    id: 'cv',
    title: 'السيرة الذاتية والخدمات المهنية',
    shortTitle: 'السيرة الذاتية',
    description:
      'نساعدك في إعداد سيرة ذاتية احترافية ومنظمة تبرز مهاراتك وخبراتك بصورة واضحة، وتمنح ملفك المهني مظهرًا أكثر احترافية.',
    category: 'design' as Category,
    icon: UserRound,
    number: '07',
    tag: 'مهني',
    features: ['CV احترافي', 'تنسيق عصري', 'إبراز المهارات'],
  },
  {
    id: 'case-study',
    title: 'دراسة الحالة',
    shortTitle: 'دراسة الحالة',
    description:
      'إعداد وتنظيم دراسات الحالة بطريقة منهجية تساعد على عرض المشكلة وتحليلها ومناقشة النتائج والحلول بصورة مرتبة وواضحة.',
    category: 'research' as Category,
    icon: BarChart3,
    number: '08',
    tag: 'تحليل وبحث',
    features: ['تحليل الحالة', 'تنظيم البيانات', 'عرض النتائج'],
  },
  {
    id: 'feasibility',
    title: 'دراسات الجدوى',
    shortTitle: 'دراسة الجدوى',
    description:
      'تنظيم وتحليل عناصر دراسة الجدوى وتقديمها بصورة واضحة تشمل فكرة المشروع ومكوناته وتحليل السوق والجوانب المالية الأساسية.',
    category: 'research' as Category,
    icon: BookOpen,
    number: '09',
    tag: 'مشاريع',
    features: ['تحليل المشروع', 'دراسة السوق', 'تنظيم التقرير'],
  },
  {
    id: 'graduation',
    title: 'مشاريع التخرج',
    shortTitle: 'مشاريع التخرج',
    description:
      'نرافقك في تنظيم مشروع التخرج من الفكرة وحتى إخراج الملفات بصورة احترافية، مع الاهتمام بالتنسيق والعرض وترتيب أجزاء المشروع.',
    category: 'academic' as Category,
    icon: GraduationCap,
    number: '10',
    tag: 'تخرج',
    features: ['تنظيم المشروع', 'التقرير', 'العرض النهائي'],
  },
]

const categories = [
  { id: 'all' as Category, label: 'جميع الخدمات' },
  { id: 'research' as Category, label: 'البحوث' },
  { id: 'design' as Category, label: 'التصاميم' },
  { id: 'academic' as Category, label: 'الخدمات الأكاديمية' },
]

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement | null>(null)

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter((service) => service.category === activeCategory)

  useEffect(() => {
    setVisibleCards([])

    const timers = filteredServices.map((_, index) =>
      window.setTimeout(() => {
        setVisibleCards((current) => [...current, index])
      }, index * 70)
    )

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [activeCategory, filteredServices.length])

  return (
    <>
      <section
        ref={sectionRef}
        id="services"
        className="services-section"
      >
        <div className="services-background-orb services-orb-one" />
        <div className="services-background-orb services-orb-two" />

        <div className="container services-container">
          {/* عنوان القسم */}
          <div className="services-heading">
            <div className="services-heading-badge">
              <Sparkles size={16} />
              <span>خدمات منصة هديل</span>
            </div>

            <h2>
              كل ما تحتاجه
              <span> في مكان واحد</span>
            </h2>

            <p>
              خدمات أكاديمية وطلابية مصممة لتسهّل عليك رحلتك الدراسية،
              من البحوث والتكاليف إلى التصاميم والمشاريع الجامعية.
            </p>
          </div>

          {/* التصنيفات */}
          <div className="services-filters">
            {categories.map((category) => {
              const isActive = activeCategory === category.id

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`services-filter ${
                    isActive ? 'services-filter-active' : ''
                  }`}
                >
                  {isActive && <CheckCircle2 size={16} />}
                  <span>{category.label}</span>
                </button>
              )
            })}
          </div>

          {/* البطاقات */}
          <div className="services-grid">
            {filteredServices.map((service, index) => {
              const Icon = service.icon
              const isVisible = visibleCards.includes(index)

              return (
                <article
                  key={service.id}
                  className={`service-card ${
                    isVisible ? 'service-card-visible' : ''
                  }`}
                >
                  {/* رقم البطاقة */}
                  <div className="service-number">
                    {service.number}
                  </div>

                  {/* زخرفة */}
                  <div className="service-card-glow" />

                  {/* الأيقونة */}
                  <div className="service-icon-wrapper">
                    <div className="service-icon">
                      <Icon size={30} strokeWidth={1.8} />
                    </div>

                    <div className="service-icon-ring" />
                  </div>

                  {/* المحتوى */}
                  <div className="service-content">
                    <div className="service-tag">
                      <span />
                      {service.tag}
                    </div>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    {/* المميزات الصغيرة */}
                    <div className="service-features">
                      {service.features.map((feature) => (
                        <span key={feature}>
                          <CheckCircle2 size={14} />
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* الأزرار */}
                  <div className="service-actions">
                    <Link
                      href={`/services/${service.id}`}
                      className="service-details-button"
                    >
                      <span>عرض التفاصيل</span>
                      <ArrowLeft size={17} />
                    </Link>

                    <Link
                      href={`/services/${service.id}#order`}
                      className="service-order-button"
                    >
                      اطلب الخدمة
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          {/* أسفل الخدمات */}
          <div className="services-bottom">
            <div className="services-bottom-line" />

            <Link href="/services" className="services-all-button">
              <span>استعرض جميع خدماتنا</span>
              <ChevronLeft size={20} />
            </Link>

            <div className="services-bottom-line" />
          </div>
        </div>
      </section>

      {/* ============================================
          فاصل واضح بين الخدمات والباقات
          ============================================ */}
      <div className="services-packages-divider">
        <div className="services-packages-divider-line" />

        <div className="services-packages-divider-badge">
          <Sparkles size={15} />
          <span>اكتشف باقات منصة هديل</span>
          <Sparkles size={15} />
        </div>

        <div className="services-packages-divider-line" />
      </div>

      <style jsx>{`
        .services-section {
          position: relative;
          overflow: hidden;
          padding: 95px 0 80px;
          background:
            radial-gradient(
              circle at 8% 18%,
              rgba(37, 99, 235, 0.09),
              transparent 27%
            ),
            radial-gradient(
              circle at 92% 78%,
              rgba(124, 58, 237, 0.08),
              transparent 30%
            ),
            linear-gradient(180deg, #f8fbff 0%, #ffffff 52%, #f7f9ff 100%);
        }

        .services-container {
          position: relative;
          z-index: 2;
        }

        .services-background-orb {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
          filter: blur(1px);
        }

        .services-orb-one {
          width: 300px;
          height: 300px;
          top: 160px;
          right: -190px;
          background: rgba(37, 99, 235, 0.06);
        }

        .services-orb-two {
          width: 260px;
          height: 260px;
          bottom: 80px;
          left: -160px;
          background: rgba(124, 58, 237, 0.06);
        }

        .services-heading {
          max-width: 760px;
          margin: 0 auto 38px;
          text-align: center;
        }

        .services-heading-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          margin-bottom: 17px;
          color: #2563eb;
          font-size: 13px;
          font-weight: 800;
          border: 1px solid rgba(37, 99, 235, 0.15);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow:
            0 8px 25px rgba(37, 99, 235, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .services-heading h2 {
          margin: 0;
          color: #10203a;
          font-size: clamp(32px, 5vw, 50px);
          line-height: 1.2;
          font-weight: 950;
          letter-spacing: -1.5px;
        }

        .services-heading h2 span {
          display: inline-block;
          margin-right: 8px;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .services-heading p {
          max-width: 650px;
          margin: 17px auto 0;
          color: #64748b;
          font-size: 16px;
          line-height: 1.9;
        }

        .services-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 38px;
        }

        .services-filter {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 44px;
          padding: 0 18px;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.86);
          color: #64748b;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease,
            color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .services-filter:hover {
          transform: translateY(-2px);
          color: #2563eb;
          border-color: rgba(37, 99, 235, 0.25);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.08);
        }

        .services-filter-active {
          color: white;
          border-color: transparent;
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          box-shadow:
            0 10px 25px rgba(37, 99, 235, 0.24),
            0 2px 7px rgba(37, 99, 235, 0.15);
        }

        .services-filter-active:hover {
          color: white;
          border-color: transparent;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .service-card {
          position: relative;
          min-width: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          min-height: 475px;
          padding: 26px;
          border: 1px solid rgba(148, 163, 184, 0.22);
          border-radius: 26px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.98),
              rgba(248, 250, 255, 0.96)
            );
          box-shadow:
            0 15px 45px rgba(15, 23, 42, 0.07),
            0 3px 12px rgba(37, 99, 235, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.55s ease,
            transform 0.55s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .service-card-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            145deg,
            rgba(37, 99, 235, 0.2),
            transparent 38%,
            rgba(124, 58, 237, 0.15)
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .service-card:hover {
          transform: translateY(-9px);
          border-color: rgba(37, 99, 235, 0.25);
          box-shadow:
            0 25px 65px rgba(37, 99, 235, 0.12),
            0 10px 25px rgba(15, 23, 42, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .service-card-glow {
          position: absolute;
          width: 180px;
          height: 180px;
          top: -90px;
          right: -70px;
          border-radius: 50%;
          background: rgba(37, 99, 235, 0.08);
          filter: blur(5px);
          transition: transform 0.4s ease;
          pointer-events: none;
        }

        .service-card:hover .service-card-glow {
          transform: scale(1.35);
        }

        .service-number {
          position: absolute;
          top: 22px;
          left: 23px;
          color: #cbd5e1;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 1px;
        }

        .service-icon-wrapper {
          position: relative;
          width: 76px;
          height: 76px;
          margin-bottom: 23px;
        }

        .service-icon {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 68px;
          height: 68px;
          border: 1px solid rgba(37, 99, 235, 0.18);
          border-radius: 21px;
          color: #2563eb;
          background:
            linear-gradient(
              145deg,
              rgba(239, 246, 255, 0.98),
              rgba(238, 242, 255, 0.9)
            );
          box-shadow:
            0 13px 28px rgba(37, 99, 235, 0.13),
            inset 0 1px 0 white;
          transition:
            transform 0.35s ease,
            border-radius 0.35s ease,
            color 0.35s ease;
        }

        .service-icon-ring {
          position: absolute;
          width: 55px;
          height: 55px;
          right: -1px;
          bottom: -1px;
          border: 1px dashed rgba(124, 58, 237, 0.28);
          border-radius: 50%;
          transition: transform 0.4s ease;
        }

        .service-card:hover .service-icon {
          transform: translateY(-4px) rotate(-3deg);
          border-radius: 24px;
          color: #4f46e5;
        }

        .service-card:hover .service-icon-ring {
          transform: rotate(35deg) scale(1.08);
        }

        .service-content {
          flex: 1;
        }

        .service-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 9px;
          color: #64748b;
          font-size: 11px;
          font-weight: 800;
        }

        .service-tag span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          box-shadow: 0 0 8px rgba(37, 99, 235, 0.35);
        }

        .service-content h3 {
          margin: 0 0 12px;
          color: #17243a;
          font-size: 20px;
          line-height: 1.45;
          font-weight: 900;
        }

        .service-content p {
          margin: 0;
          color: #64748b;
          font-size: 13px;
          line-height: 1.9;
        }

        .service-features {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 19px;
        }

        .service-features span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 6px 9px;
          border: 1px solid #e5eaf2;
          border-radius: 9px;
          color: #64748b;
          background: #fff;
          font-size: 10px;
          font-weight: 800;
        }

        .service-features svg {
          color: #2563eb;
          flex-shrink: 0;
        }

        .service-actions {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 8px;
          margin-top: 25px;
        }

        .service-details-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 45px;
          padding: 0 13px;
          border-radius: 13px;
          color: white;
          background: linear-gradient(135deg, #2563eb, #4f46e5);
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.18);
          font-size: 12px;
          font-weight: 900;
          text-decoration: none;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .service-details-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(37, 99, 235, 0.26);
        }

        .service-order-button {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 45px;
          padding: 0 13px;
          border: 1px solid rgba(37, 99, 235, 0.18);
          border-radius: 13px;
          color: #2563eb;
          background: #f8fbff;
          font-size: 11px;
          font-weight: 900;
          text-decoration: none;
          transition:
            transform 0.25s ease,
            background 0.25s ease,
            color 0.25s ease;
        }

        .service-order-button:hover {
          transform: translateY(-2px);
          color: white;
          background: #2563eb;
        }

        .services-bottom {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 48px;
        }

        .services-bottom-line {
          width: min(180px, 18vw);
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(148, 163, 184, 0.4),
            transparent
          );
        }

        .services-all-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          color: #475569;
          background: white;
          box-shadow: 0 8px 25px rgba(15, 23, 42, 0.05);
          font-size: 12px;
          font-weight: 900;
          text-decoration: none;
          transition:
            transform 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease;
        }

        .services-all-button:hover {
          transform: translateY(-2px);
          color: #2563eb;
          border-color: rgba(37, 99, 235, 0.2);
        }

        /* ================================
           الفاصل بين الخدمات والباقات
           ================================ */

        .services-packages-divider {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 22px;
          min-height: 115px;
          padding: 20px;
          background:
            linear-gradient(
              180deg,
              #f7f9ff 0%,
              #eef4ff 48%,
              #f8f5ff 100%
            );
          border-top: 1px solid rgba(37, 99, 235, 0.08);
          border-bottom: 1px solid rgba(124, 58, 237, 0.08);
        }

        .services-packages-divider::before,
        .services-packages-divider::after {
          content: '';
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.45;
        }

        .services-packages-divider::before {
          left: -100px;
          background: rgba(37, 99, 235, 0.08);
          filter: blur(20px);
        }

        .services-packages-divider::after {
          right: -100px;
          background: rgba(124, 58, 237, 0.08);
          filter: blur(20px);
        }

        .services-packages-divider-line {
          width: min(230px, 22vw);
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(37, 99, 235, 0.28),
            rgba(124, 58, 237, 0.2),
            transparent
          );
        }

        .services-packages-divider-badge {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 11px 19px;
          border: 1px solid rgba(37, 99, 235, 0.13);
          border-radius: 999px;
          color: #334155;
          background: rgba(255, 255, 255, 0.8);
          box-shadow:
            0 10px 30px rgba(37, 99, 235, 0.08),
            inset 0 1px 0 white;
          font-size: 12px;
          font-weight: 900;
        }

        .services-packages-divider-badge svg {
          color: #6366f1;
        }

        @media (max-width: 1050px) {
          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 700px) {
          .services-section {
            padding: 70px 0 60px;
          }

          .services-heading {
            margin-bottom: 28px;
          }

          .services-heading h2 {
            font-size: 31px;
          }

          .services-heading p {
            padding: 0 8px;
            font-size: 14px;
          }

          .services-filters {
            gap: 7px;
            margin-bottom: 27px;
          }

          .services-filter {
            min-height: 41px;
            padding: 0 13px;
            font-size: 11px;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 17px;
          }

          .service-card {
            min-height: auto;
            padding: 23px;
            border-radius: 22px;
          }

          .service-content h3 {
            font-size: 19px;
          }

          .service-content p {
            font-size: 13px;
          }

          .service-actions {
            grid-template-columns: 1fr 1fr;
          }

          .services-bottom {
            margin-top: 35px;
          }

          .services-bottom-line {
            display: none;
          }

          .services-packages-divider {
            min-height: 95px;
            gap: 9px;
            padding: 16px 10px;
          }

          .services-packages-divider-line {
            width: 35px;
          }

          .services-packages-divider-badge {
            padding: 10px 13px;
            font-size: 10px;
            text-align: center;
          }
        }

        @media (max-width: 390px) {
          .service-actions {
            grid-template-columns: 1fr;
          }

          .services-filter {
            padding: 0 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-card,
          .service-icon,
          .service-icon-ring,
          .service-card-glow,
          .services-filter,
          .service-details-button,
          .service-order-button,
          .services-all-button {
            transition: none;
          }
        }
      `}</style>
    </>
  )
}