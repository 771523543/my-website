
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, BookOpen, ClipboardList, FileText, GraduationCap, Laptop,
  Presentation, Search, BriefcaseBusiness, Scale, Calculator, FolderOpen,
  ExternalLink, LoaderCircle, FileCheck,
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
  { id: 'research', title: 'الخدمات البحثية والأكاديمية', description: 'البحوث والأوراق العلمية والخدمات الأكاديمية.', icon: Search, color: '#7551c8', tint: '#f0eaff' },
  { id: 'reports', title: 'التقارير الجامعية', description: 'إعداد وتنسيق التقارير والمشاريع الجامعية.', icon: FileText, color: '#187f77', tint: '#e5f7f3' },
  { id: 'assignments', title: 'التكاليف الجامعية', description: 'تنفيذ وتنسيق التكاليف والمتطلبات الجامعية.', icon: ClipboardList, color: '#c47b19', tint: '#fff3dc' },
  { id: 'homework', title: 'الواجبات الدراسية', description: 'مساعدة في إعداد الواجبات والمهام الدراسية.', icon: BookOpen, color: '#3269c8', tint: '#eaf1ff' },
  { id: 'lms', title: 'إدارة المنصات والمهام الدراسية', description: 'متابعة المهام وإدارة المنصات الدراسية.', icon: Laptop, color: '#16865b', tint: '#e4f7ed' },
  { id: 'presentation', title: 'العروض التقديمية والتصميم', description: 'تصميم العروض التقديمية والمحتوى البصري.', icon: Presentation, color: '#c04b83', tint: '#ffebf4' },
  { id: 'cv', title: 'السيرة الذاتية والخدمات المهنية', description: 'إعداد السير الذاتية والخدمات المهنية.', icon: BriefcaseBusiness, color: '#637184', tint: '#edf1f6' },
  { id: 'case-study', title: 'دراسة الحالة', description: 'إعداد وتحليل دراسات الحالة الأكاديمية.', icon: Scale, color: '#b65d3d', tint: '#fff0e9' },
  { id: 'feasibility', title: 'دراسات الجدوى', description: 'إعداد دراسات الجدوى وتحليل المشاريع.', icon: Calculator, color: '#4d6d29', tint: '#eff6e4' },
  { id: 'graduation', title: 'مشاريع التخرج', description: 'مشاريع التخرج والأعمال الأكاديمية المتخصصة.', icon: GraduationCap, color: '#8054b6', tint: '#f2eaff' },
] as const

export default function PreviousWorksPage() {
  const [items, setItems] = useState<WorkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<string | null>(null)
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
          <FolderOpen size={42} />
        </div>

        <span>منصة هديل</span>
        <h1>أعمالنا السابقة</h1>
        <p>
          تعرّف على نماذج من أعمالنا، واختر الخدمة لاستعراض الملفات المنشورة
          الخاصة بها.
        </p>
      </section>

      <section className="services-works-section">
        <div className="section-title">
          <span>خدمات المنصة</span>
          <h2>اختر الخدمة</h2>
          <p>
            تظهر الأعمال المنشورة أسفل قائمة الخدمات عند اختيار الخدمة المناسبة.
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
                  <Icon size={29} />
                </div>

                <div className="service-work-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <small>
                    {count} {count === 1 ? 'عمل منشور' : 'أعمال منشورة'}
                  </small>
                </div>

                <span className="service-work-arrow">
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
            <div>
              <span>معرض الخدمة</span>
              <h2>
                {services.find((s) => s.id === selectedService)?.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setSelectedService(null)}
            >
              عرض كل الخدمات
            </button>
          </div>

          {loading ? (
            <div className="works-state">
              <LoaderCircle className="works-spin" />
              جارٍ تحميل الأعمال…
            </div>
          ) : loadError ? (
            <p className="works-empty">{loadError}</p>
          ) : visibleItems.length === 0 ? (
            <div className="works-empty">
              <FileCheck size={34} />
              <strong>لا توجد أعمال منشورة لهذه الخدمة حتى الآن</strong>
              <span>
                سيتم عرض النماذج هنا عند إضافتها من إدارة المنصة.
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
                      <FileText size={25} />
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
                      فتح الملف
                      <ExternalLink size={16} />
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
          <ArrowRight size={18} />
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>

      <style jsx>{`
        .previous-works-page {
          min-height: 100vh;
          padding: 50px 20px 80px;
          background: #faf9fd;
          direction: rtl;
          color: #211936;
        }

        .previous-works-hero {
          max-width: 850px;
          margin: 0 auto 55px;
          text-align: center;
        }

        .previous-works-hero-icon {
          width: 90px;
          height: 90px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 26px;
          background: #f0eaff;
          color: #6d4bc3;
        }

        .previous-works-hero > span {
          color: #7956c7;
          font-size: 15px;
          font-weight: 700;
        }

        .previous-works-hero h1 {
          margin: 8px 0 14px;
          font-size: clamp(34px, 5vw, 52px);
          font-weight: 900;
          color: #211936;
        }

        .previous-works-hero p {
          max-width: 650px;
          margin: 0 auto;
          color: #6d6878;
          line-height: 2;
          font-size: 17px;
        }

        .services-works-section {
          max-width: 1150px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          margin-bottom: 30px;
        }

        .section-title > span {
          color: #7956c7;
          font-size: 14px;
          font-weight: 800;
        }

        .section-title h2 {
          margin: 6px 0;
          color: #211936;
          font-size: 32px;
          font-weight: 900;
        }

        .section-title p {
          margin: 0;
          color: #77717f;
        }

        .services-works-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .service-work-card {
          width: 100%;
          min-width: 0;
          min-height: 145px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 18px;
          text-align: right;
          border: 1px solid rgba(100, 70, 160, 0.12);
          border-radius: 22px;
          background: #fff;
          box-shadow: 0 8px 25px rgba(30, 20, 60, 0.06);
          cursor: pointer;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
          font-family: inherit;
        }

        .service-work-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 35px rgba(30, 20, 60, 0.11);
        }

        .service-work-card.is-selected {
          border-color: #9577dc;
          box-shadow:
            0 0 0 3px #9577dc20,
            0 12px 28px #30175b0d;
        }

        .service-work-icon {
          min-width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
        }

        .service-work-content {
          flex: 1;
          min-width: 0;
        }

        .service-work-content h3 {
          margin: 0 0 7px;
          color: #211936;
          font-size: 19px;
          font-weight: 800;
        }

        .service-work-content p {
          margin: 0;
          color: #77717f;
          line-height: 1.7;
          font-size: 14px;
        }

        .service-work-content small {
          display: inline-block;
          margin-top: 8px;
          color: #888095;
          font-size: 11px;
        }

        .service-work-arrow {
          color: #7956c7;
          font-size: 24px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .works-results {
          max-width: 1150px;
          margin: 35px auto 0;
          padding: 25px;
          background: white;
          border: 1px solid #ece7f5;
          border-radius: 22px;
          box-shadow: 0 8px 25px #1e143c08;
        }

        .works-results-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 20px;
        }

        .works-results-heading span {
          font-size: 12px;
          font-weight: 800;
          color: #7956c7;
        }

        .works-results-heading h2 {
          margin: 5px 0 0;
          font-size: 22px;
          font-weight: 900;
        }

        .works-results-heading button {
          border: 1px solid #e6def5;
          border-radius: 10px;
          background: #fff;
          color: #6d4bc3;
          padding: 9px 12px;
          font: inherit;
          font-size: 12px;
          font-weight: 750;
          cursor: pointer;
        }

        .works-files-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 13px;
        }

        .works-file-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          min-width: 0;
          padding: 16px;
          border: 1px solid #eeeaf5;
          border-radius: 16px;
        }

        .works-file-icon {
          width: 43px;
          height: 43px;
          flex: 0 0 43px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          background: #f0eaff;
          color: #7956c7;
        }

        .works-file-info {
          flex: 1;
          min-width: 0;
        }

        .works-file-info h3 {
          margin: 2px 0 7px;
          font-size: 15px;
          font-weight: 850;
          overflow-wrap: anywhere;
        }

        .works-file-info p {
          margin: 0 0 7px;
          color: #77717f;
          font-size: 12px;
          line-height: 1.8;
        }

        .works-file-info small {
          color: #938ca0;
          font-size: 10px;
          overflow-wrap: anywhere;
        }

        .works-open-file {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
          text-decoration: none;
          color: #6d4bc3;
          font-size: 12px;
          font-weight: 800;
        }

        .works-empty,
        .works-state {
          min-height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 10px;
          text-align: center;
          color: #898397;
          font-size: 13px;
          line-height: 1.8;
        }

        .works-empty strong {
          color: #403750;
        }

        .works-spin {
          animation: works-rotation 1s linear infinite;
        }

        @keyframes works-rotation {
          to {
            transform: rotate(360deg);
          }
        }

        .back-home {
          margin-top: 45px;
          text-align: center;
        }

        .back-home a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #6d4bc3;
          text-decoration: none;
          font-weight: 700;
        }

        @media (max-width: 700px) {
          .services-works-grid,
          .works-files-grid {
            grid-template-columns: 1fr;
          }

          .previous-works-page {
            padding: 35px 14px 55px;
          }

          .service-work-card {
            min-height: 125px;
            padding: 17px;
            gap: 13px;
          }

          .service-work-icon {
            min-width: 54px;
            height: 54px;
          }

          .service-work-content h3 {
            font-size: 16px;
          }

          .service-work-content p {
            font-size: 13px;
          }

          .works-results {
            padding: 17px 13px;
          }

          .works-file-card {
            flex-wrap: wrap;
          }

          .works-file-info {
            width: calc(100% - 60px);
          }

          .works-open-file {
            margin-right: 55px;
          }

          .works-results-heading h2 {
            font-size: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-work-card,
          .works-spin {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </main>
  )
}
