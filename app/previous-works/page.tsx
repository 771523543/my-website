
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  Laptop,
  Presentation,
  Search,
  BriefcaseBusiness,
  Scale,
  Calculator,
  FolderOpen,
  ExternalLink,
  LoaderCircle,
  FileCheck,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

type WorkItem = {
  id: string
  service_slug: string
  title: string
  description: string | null
  file_path: string
  file_name: string
  mime_type: string | null
  file_size: number | null
  created_at: string
}

const BUCKET = 'hadeel-previous-works'

const services = [
  {
    id: 'research',
    title: 'الخدمات البحثية والأكاديمية',
    description: 'البحوث والأوراق العلمية والخدمات الأكاديمية.',
    icon: Search,
    color: '#7551c8',
    tint: '#f0eaff',
  },
  {
    id: 'reports',
    title: 'التقارير الجامعية',
    description: 'إعداد وتنسيق التقارير والمشاريع الجامعية.',
    icon: FileText,
    color: '#187f77',
    tint: '#e5f7f3',
  },
  {
    id: 'assignments',
    title: 'التكاليف الجامعية',
    description: 'تنفيذ وتنسيق التكاليف والمتطلبات الجامعية.',
    icon: ClipboardList,
    color: '#c47b19',
    tint: '#fff3dc',
  },
  {
    id: 'homework',
    title: 'الواجبات الدراسية',
    description: 'مساعدة في إعداد الواجبات والمهام الدراسية.',
    icon: BookOpen,
    color: '#3269c8',
    tint: '#eaf1ff',
  },
  {
    id: 'lms',
    title: 'إدارة المنصات والمهام الدراسية',
    description: 'متابعة المهام وإدارة المنصات الدراسية.',
    icon: Laptop,
    color: '#16865b',
    tint: '#e4f7ed',
  },
  {
    id: 'presentation',
    title: 'العروض التقديمية والتصميم',
    description: 'تصميم العروض التقديمية والمحتوى البصري.',
    icon: Presentation,
    color: '#c04b83',
    tint: '#ffebf4',
  },
  {
    id: 'cv',
    title: 'السيرة الذاتية والخدمات المهنية',
    description: 'إعداد السير الذاتية والخدمات المهنية.',
    icon: BriefcaseBusiness,
    color: '#637184',
    tint: '#edf1f6',
  },
  {
    id: 'case-study',
    title: 'دراسة الحالة',
    description: 'إعداد وتحليل دراسات الحالة الأكاديمية.',
    icon: Scale,
    color: '#b65d3d',
    tint: '#fff0e9',
  },
  {
    id: 'feasibility',
    title: 'دراسات الجدوى',
    description: 'إعداد دراسات الجدوى وتحليل المشاريع.',
    icon: Calculator,
    color: '#4d6d29',
    tint: '#eff6e4',
  },
  {
    id: 'graduation',
    title: 'مشاريع التخرج',
    description: 'مشاريع التخرج والأعمال الأكاديمية المتخصصة.',
    icon: GraduationCap,
    color: '#8054b6',
    tint: '#f2eaff',
  },
] as const

export default function PreviousWorksPage() {
  const [items, setItems] = useState<WorkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<string | null>(
    null
  )
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let active = true

    const load = async () => {
      const { data, error } = await supabase
        .from('previous_work_items')
        .select(
          'id, service_slug, title, description, file_path, file_name, mime_type, file_size, created_at'
        )
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (!active) return

      if (error) {
        setLoadError('تعذر تحميل الأعمال الآن. يرجى المحاولة لاحقًا.')
      } else {
        setItems((data ?? []) as WorkItem[])
      }

      setLoading(false)
    }

    void load()

    return () => {
      active = false
    }
  }, [])

  const visibleItems = selectedService
    ? items.filter((item) => item.service_slug === selectedService)
    : []

  return (
    <main className="previous-works-page" dir="rtl">
      <section className="previous-works-hero">
        <div className="previous-works-hero-icon">
          <FolderOpen size={38} strokeWidth={1.8} />
        </div>

        <span>منصة هديل</span>

        <h1>أعمالنا السابقة</h1>

        <p>
          تعرّف على نماذج من أعمالنا، واختر الخدمة لاستعراض الملفات المنشورة
          الخاصة بها.
        </p>

        <div className="hero-decoration" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="services-works-section">
        <div className="section-title">
          <span className="section-eyebrow">استكشف أعمالنا</span>
          <h2>اختر الخدمة المناسبة</h2>
          <p>
            تصفّح الخدمات واختر إحداها للاطلاع على نماذج الأعمال المنشورة.
          </p>
        </div>

        <div className="services-works-grid">
          {services.map((service) => {
            const Icon = service.icon

            const count = items.filter(
              (item) => item.service_slug === service.id
            ).length

            const active = selectedService === service.id

            return (
              <button
                key={service.id}
                type="button"
                className={`service-work-card${active ? ' is-selected' : ''}`}
                aria-pressed={active}
                onClick={() =>
                  setSelectedService(active ? null : service.id)
                }
              >
                <div
                  className="service-work-icon"
                  style={{
                    color: service.color,
                    background: service.tint,
                  }}
                >
                  <Icon size={27} strokeWidth={1.9} />
                </div>

                <div className="service-work-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <small>
                    <FileCheck size={13} />
                    {count} {count === 1 ? 'عمل منشور' : 'أعمال منشورة'}
                  </small>
                </div>

                <span className="service-work-arrow" aria-hidden="true">
                  {active ? '−' : '←'}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {selectedService && (
        <section className="works-results" aria-live="polite">
          <div className="works-results-heading">
            <div className="results-title">
              <span>معرض الخدمة</span>
              <h2>
                {services.find((service) => service.id === selectedService)
                  ?.title}
              </h2>
            </div>

            <button
              type="button"
              className="show-all-button"
              onClick={() => setSelectedService(null)}
            >
              عرض كل الخدمات
            </button>
          </div>

          {loading ? (
            <div className="works-state">
              <LoaderCircle className="works-spin" size={30} />
              <span>جارٍ تحميل الأعمال...</span>
            </div>
          ) : loadError ? (
            <div className="works-empty">
              <FileText size={32} />
              <strong>{loadError}</strong>
            </div>
          ) : visibleItems.length === 0 ? (
            <div className="works-empty">
              <div className="empty-icon">
                <FolderOpen size={32} />
              </div>
              <strong>لا توجد أعمال منشورة لهذه الخدمة حتى الآن</strong>
              <span>
                ستظهر نماذج الأعمال هنا عند نشرها من إدارة المنصة.
              </span>
            </div>
          ) : (
            <div className="works-files-grid">
              {visibleItems.map((item) => {
                const url = supabase.storage
                  .from(BUCKET)
                  .getPublicUrl(item.file_path).data.publicUrl

                return (
                  <article className="works-file-card" key={item.id}>
                    <div className="works-file-icon">
                      <FileText size={23} strokeWidth={1.9} />
                    </div>

                    <div className="works-file-info">
                      <h3>{item.title}</h3>

                      {item.description && <p>{item.description}</p>}

                      <small>{item.file_name}</small>
                    </div>

                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="works-open-file"
                    >
                      <span>فتح الملف</span>
                      <ExternalLink size={15} />
                    </a>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      )}

      <div className="back-home">
        <Link href="/">
          <ArrowRight size={17} />
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>

      <style jsx>{`
        .previous-works-page {
          --works-blue: #2455c4;
          --works-blue-dark: #173e91;
          --works-gold: #e2a43d;
          --works-text: #17233d;
          --works-muted: #697791;
          --works-border: #e4ebf4;

          box-sizing: border-box;
          min-height: 100vh;
          padding: 48px 20px 72px;
          background:
            radial-gradient(
              ellipse at 50% 0%,
              #e8f1ff 0%,
              transparent 48%
            ),
            #f8fbff;
          color: var(--works-text);
          direction: rtl;
          overflow-x: clip;
        }

        .previous-works-page *,
        .previous-works-page *::before,
        .previous-works-page *::after {
          box-sizing: border-box;
        }

        .previous-works-hero {
          position: relative;
          max-width: 850px;
          margin: 0 auto 52px;
          padding: 36px 24px;
          text-align: center;
          border: 1px solid var(--works-border);
          border-radius: 30px;
          background: linear-gradient(145deg, #ffffff, #f4f8ff);
          box-shadow: 0 16px 45px #173e9110;
          overflow: hidden;
        }

        .previous-works-hero::before {
          content: '';
          position: absolute;
          top: 0;
          right: 12%;
          left: 12%;
          height: 4px;
          border-radius: 0 0 10px 10px;
          background: linear-gradient(
            90deg,
            var(--works-blue),
            var(--works-gold),
            var(--works-blue)
          );
        }

        .previous-works-hero-icon {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 82px;
          height: 82px;
          margin: 0 auto 20px;
          border: 1px solid #dbe5f1;
          border-radius: 25px;
          background: linear-gradient(145deg, #e8f1ff, #fff4df);
          color: var(--works-blue);
          box-shadow: 0 12px 28px #2455c414;
        }

        .previous-works-hero > span {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 14px;
          border: 1px solid #dbe5f1;
          border-radius: 999px;
          background: #ffffff;
          color: var(--works-blue);
          font-size: 13px;
          font-weight: 800;
        }

        .previous-works-hero h1 {
          position: relative;
          z-index: 1;
          margin: 16px 0 12px;
          color: var(--works-text);
          font-size: clamp(30px, 5vw, 48px);
          font-weight: 900;
          line-height: 1.4;
          letter-spacing: -0.8px;
        }

        .previous-works-hero p {
          position: relative;
          z-index: 1;
          max-width: 620px;
          margin: 0 auto;
          color: var(--works-muted);
          line-height: 2;
          font-size: 16px;
        }

        .hero-decoration {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          margin-top: 22px;
        }

        .hero-decoration span {
          display: block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--works-blue);
          opacity: 0.3;
        }

        .hero-decoration span:nth-child(2) {
          width: 24px;
          border-radius: 10px;
          background: var(--works-gold);
          opacity: 1;
        }

        .services-works-section {
          max-width: 1150px;
          margin: 0 auto;
        }

        .section-title {
          margin-bottom: 28px;
          text-align: center;
        }

        .section-eyebrow {
          display: inline-block;
          margin-bottom: 6px;
          color: var(--works-blue);
          font-size: 13px;
          font-weight: 850;
        }

        .section-title h2 {
          margin: 5px 0 8px;
          color: var(--works-text);
          font-size: clamp(25px, 3vw, 32px);
          font-weight: 900;
          line-height: 1.5;
        }

        .section-title p {
          max-width: 620px;
          margin: 0 auto;
          color: var(--works-muted);
          font-size: 14px;
          line-height: 1.9;
        }

        .services-works-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .service-work-card {
          display: flex;
          align-items: center;
          gap: 17px;
          width: 100%;
          min-width: 0;
          min-height: 145px;
          padding: 22px;
          border: 1px solid var(--works-border);
          border-radius: 22px;
          background: #ffffff;
          color: var(--works-text);
          box-shadow: 0 7px 24px #17233d08;
          text-align: right;
          cursor: pointer;
          font-family: inherit;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .service-work-card:hover {
          border-color: #b7ccef;
          background: #fcfdff;
          box-shadow: 0 12px 28px #2455c414;
        }

        .service-work-card:focus-visible {
          outline: 3px solid #2455c455;
          outline-offset: 3px;
        }

        .service-work-card.is-selected {
          border-color: var(--works-blue);
          background: linear-gradient(145deg, #ffffff, #f2f7ff);
          box-shadow:
            0 0 0 3px #2455c418,
            0 12px 28px #2455c410;
        }

        .service-work-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 62px;
          width: 62px;
          height: 62px;
          border: 1px solid #17233d08;
          border-radius: 19px;
        }

        .service-work-content {
          flex: 1;
          min-width: 0;
        }

        .service-work-content h3 {
          margin: 0 0 7px;
          color: var(--works-text);
          font-size: 17px;
          font-weight: 850;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .service-work-content p {
          margin: 0;
          color: var(--works-muted);
          font-size: 13px;
          line-height: 1.85;
          overflow-wrap: anywhere;
        }

        .service-work-content small {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-top: 10px;
          padding: 5px 9px;
          border-radius: 8px;
          background: #f0f5ff;
          color: var(--works-blue);
          font-size: 11px;
          font-weight: 750;
        }

        .service-work-arrow {
          display: grid;
          place-items: center;
          flex: 0 0 34px;
          width: 34px;
          height: 34px;
          border-radius: 11px;
          background: #f0f5ff;
          color: var(--works-blue);
          font-size: 22px;
          font-weight: 800;
        }

        .service-work-card.is-selected .service-work-arrow {
          background: var(--works-blue);
          color: #ffffff;
        }

        .works-results {
          max-width: 1150px;
          margin: 32px auto 0;
          padding: 26px;
          border: 1px solid var(--works-border);
          border-radius: 24px;
          background: #ffffff;
          box-shadow: 0 12px 32px #17233d09;
        }

        .works-results-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 22px;
          padding-bottom: 18px;
          border-bottom: 1px solid #edf1f7;
        }

        .results-title {
          min-width: 0;
        }

        .works-results-heading span {
          color: var(--works-blue);
          font-size: 12px;
          font-weight: 850;
        }

        .works-results-heading h2 {
          margin: 5px 0 0;
          color: var(--works-text);
          font-size: 22px;
          font-weight: 900;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .show-all-button {
          flex-shrink: 0;
          padding: 10px 14px;
          border: 1px solid #dbe5f1;
          border-radius: 11px;
          background: #f7faff;
          color: var(--works-blue);
          font-family: inherit;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
        }

        .show-all-button:hover {
          border-color: var(--works-blue);
          background: #edf4ff;
        }

        .works-files-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .works-file-card {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          min-width: 0;
          padding: 17px;
          border: 1px solid var(--works-border);
          border-radius: 17px;
          background: #ffffff;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .works-file-card:hover {
          border-color: #b7ccef;
          box-shadow: 0 8px 20px #2455c40c;
        }

        .works-file-icon {
          display: grid;
          place-items: center;
          flex: 0 0 46px;
          width: 46px;
          height: 46px;
          border: 1px solid #dbe5f1;
          border-radius: 14px;
          background: #e8f1ff;
          color: var(--works-blue);
        }

        .works-file-info {
          flex: 1;
          min-width: 0;
        }

        .works-file-info h3 {
          margin: 2px 0 7px;
          color: var(--works-text);
          font-size: 15px;
          font-weight: 850;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .works-file-info p {
          margin: 0 0 8px;
          color: var(--works-muted);
          font-size: 12px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .works-file-info small {
          display: block;
          color: var(--works-muted);
          font-size: 10px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .works-open-file {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          flex-shrink: 0;
          padding: 9px 11px;
          border: 1px solid #dbe5f1;
          border-radius: 10px;
          background: #f5f8ff;
          color: var(--works-blue);
          font-size: 12px;
          font-weight: 850;
          text-decoration: none;
          white-space: nowrap;
        }

        .works-open-file:hover {
          border-color: var(--works-blue);
          background: var(--works-blue);
          color: #ffffff;
        }

        .works-empty,
        .works-state {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 12px;
          min-height: 150px;
          padding: 24px 16px;
          border: 1px dashed #dbe5f1;
          border-radius: 18px;
          background: #f9fbff;
          color: var(--works-muted);
          font-size: 13px;
          line-height: 1.9;
          text-align: center;
        }

        .empty-icon {
          display: grid;
          place-items: center;
          width: 58px;
          height: 58px;
          border-radius: 18px;
          background: #e8f1ff;
          color: var(--works-blue);
        }

        .works-empty strong {
          color: var(--works-text);
          font-size: 14px;
        }

        .works-empty span {
          max-width: 440px;
        }

        .works-spin {
          color: var(--works-blue);
          animation: works-rotation 1s linear infinite;
        }

        @keyframes works-rotation {
          to {
            transform: rotate(360deg);
          }
        }

        .back-home {
          margin-top: 38px;
          text-align: center;
        }

        .back-home a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 12px 18px;
          border: 1px solid #dbe5f1;
          border-radius: 12px;
          background: #ffffff;
          color: var(--works-blue);
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 5px 16px #17233d08;
        }

        .back-home a:hover {
          border-color: var(--works-blue);
          background: #f1f6ff;
        }

        @media (max-width: 760px) {
          .previous-works-page {
            padding: 28px 14px 48px;
          }

          .previous-works-hero {
            margin-bottom: 34px;
            padding: 28px 16px;
            border-radius: 23px;
          }

          .previous-works-hero-icon {
            width: 70px;
            height: 70px;
            border-radius: 21px;
          }

          .previous-works-hero h1 {
            font-size: clamp(28px, 7vw, 38px);
          }

          .previous-works-hero p {
            font-size: 14px;
            line-height: 1.9;
          }

          .services-works-grid,
          .works-files-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 12px;
          }

          .service-work-card {
            min-height: 0;
            padding: 16px 14px;
            gap: 12px;
            border-radius: 18px;
          }

          .service-work-icon {
            flex-basis: 52px;
            width: 52px;
            height: 52px;
            border-radius: 15px;
          }

          .service-work-content h3 {
            font-size: 15px;
          }

          .service-work-content p {
            font-size: 12px;
          }

          .service-work-arrow {
            flex-basis: 30px;
            width: 30px;
            height: 30px;
          }

          .works-results {
            margin-top: 24px;
            padding: 16px 12px;
            border-radius: 19px;
          }

          .works-results-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
          }

          .works-results-heading h2 {
            font-size: 18px;
          }

          .works-file-card {
            flex-wrap: wrap;
            padding: 14px;
          }

          .works-file-info {
            flex: 1 1 calc(100% - 60px);
          }

          .works-open-file {
            margin-right: 58px;
          }

          .back-home {
            margin-top: 30px;
          }
        }

        @media (max-width: 380px) {
          .previous-works-page {
            padding-right: 10px;
            padding-left: 10px;
          }

          .previous-works-hero {
            padding-right: 12px;
            padding-left: 12px;
          }

          .service-work-card {
            gap: 9px;
            padding: 13px 10px;
          }

          .service-work-icon {
            flex-basis: 46px;
            width: 46px;
            height: 46px;
          }

          .service-work-content h3 {
            font-size: 14px;
          }

          .service-work-arrow {
            flex-basis: 26px;
            width: 26px;
            height: 26px;
          }

          .works-open-file {
            margin-right: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-work-card,
          .works-file-card,
          .works-spin {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </main>
  )
}
