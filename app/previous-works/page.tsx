
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
    description: 'المساعدة في إعداد الواجبات والمهام الدراسية.',
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
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let active = true

    async function loadWorks() {
      setLoading(true)
      setLoadError('')

      const { data, error } = await supabase
        .from('previous_work_items')
        .select(
          'id, service_slug, title, description, file_path, file_name, mime_type, file_size, created_at'
        )
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (!active) return

      if (error) {
        setLoadError('تعذر تحميل أعداد الأعمال حاليًا.')
      } else {
        setItems((data ?? []) as WorkItem[])
      }

      setLoading(false)
    }

    void loadWorks()

    return () => {
      active = false
    }
  }, [])

  return (
    <main className="previous-works-page" dir="rtl">
      <section className="previous-works-hero">
        <div className="hero-icon">
          <FolderOpen size={38} strokeWidth={1.8} />
        </div>

        <span className="hero-brand">منصة هديل</span>

        <h1>أعمالنا السابقة</h1>

        <p>
          تعرّف على نماذج من أعمالنا، واختر الخدمة لاستعراض
          الأعمال المنشورة الخاصة بها.
        </p>

        <div className="hero-decoration" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>

      <section className="services-section">
        <header className="section-title">
          <span className="section-eyebrow">استكشف أعمالنا</span>
          <h2>اختر الخدمة المناسبة</h2>
          <p>
            لكل خدمة معرض مستقل يضم نماذج الأعمال المتعلقة بها.
          </p>
        </header>

        {loading ? (
          <div className="page-state">
            <LoaderCircle className="loading-icon" size={30} />
            <strong>جارٍ تحميل الأعمال...</strong>
          </div>
        ) : (
          <>
            {loadError && (
              <div className="page-state error-state" role="status">
                <FileText size={28} />
                <strong>{loadError}</strong>
                <span>
                  ستظل بطاقات الخدمات ظاهرة، وقد تتعذر قراءة الأعداد مؤقتًا.
                </span>
              </div>
            )}

            <div className="services-grid">
              {services.map((service) => {
                const Icon = service.icon
                const count = items.filter(
                  (item) => item.service_slug === service.id
                ).length

                return (
                  <Link
                    key={service.id}
                    href={`/previous-works/${service.id}`}
                    className="service-card"
                    aria-label={`استعراض أعمال ${service.title}`}
                    style={{
                      '--service-color': service.color,
                      '--service-tint': service.tint,
                    } as React.CSSProperties}
                  >
                    <span className="service-arrow" aria-hidden="true">
                      <ArrowRight size={17} />
                    </span>

                    <span className="service-icon">
                      <Icon size={30} strokeWidth={1.9} />
                    </span>

                    <span className="service-content">
                      <strong className="service-title">
                        {service.title}
                      </strong>

                      <span className="service-description">
                        {service.description}
                      </span>

                      <span className="service-count">
                        <FileCheck size={14} />
                        {loadError
                          ? 'تعذر تحميل العدد'
                          : `${count} ${count === 1 ? 'عمل منشور' : 'أعمال منشورة'}`}
                      </span>
                    </span>

                    <span className="service-cta">
                      استعرض الأعمال
                      <ArrowRight size={15} />
                    </span>
                  </Link>
                )
              })}
            </div>
          </>
        )}
      </section>

      <section className="works-note">
        <div className="note-icon">
          <FolderOpen size={23} />
        </div>

        <div>
          <strong>لكل خدمة معرضها الخاص</strong>
          <p>
            عند إضافة عمل جديد ونشره من لوحة الإدارة، سيظهر ضمن
            الخدمة المحددة عند إضافة العمل.
          </p>
        </div>
      </section>

      <div className="back-home">
        <Link href="/">
          <ArrowRight size={17} />
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>

      <style jsx>{`
        .previous-works-page {
          --text: #243247;
          --muted: #697791;
          --border: #e4ebf4;
          --blue: #2459a9;
          box-sizing: border-box;
          min-height: 100vh;
          padding: 42px 20px 64px;
          color: var(--text);
          background:
            radial-gradient(ellipse at 50% 0%, #e8f1ff 0%, transparent 48%),
            #f8fbff;
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
          margin: 0 auto 44px;
          padding: 34px 24px;
          text-align: center;
          border: 1px solid var(--border);
          border-radius: 28px;
          background: linear-gradient(145deg, #fff, #f4f8ff);
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
          background: linear-gradient(90deg, #2459a9, #f5c542, #2459a9);
        }

        .hero-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 78px;
          height: 78px;
          margin: 0 auto 17px;
          border: 1px solid #dbe5f1;
          border-radius: 24px;
          background: linear-gradient(145deg, #e8f1ff, #fff4df);
          color: var(--blue);
        }

        .hero-brand {
          display: inline-flex;
          justify-content: center;
          padding: 7px 14px;
          border: 1px solid #dbe5f1;
          border-radius: 999px;
          background: #fff;
          color: var(--blue);
          font-size: 13px;
          font-weight: 800;
        }

        .previous-works-hero h1 {
          margin: 15px 0 10px;
          font-size: clamp(29px, 5vw, 44px);
          font-weight: 900;
          line-height: 1.5;
        }

        .previous-works-hero p {
          max-width: 620px;
          margin: 0 auto;
          color: var(--muted);
          font-size: 15px;
          line-height: 2;
        }

        .hero-decoration {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-top: 20px;
        }

        .hero-decoration span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--blue);
          opacity: 0.3;
        }

        .hero-decoration span:nth-child(2) {
          width: 24px;
          border-radius: 10px;
          background: #f5c542;
          opacity: 1;
        }

        .services-section {
          width: 100%;
          max-width: 1150px;
          margin: 0 auto;
        }

        .section-title {
          margin-bottom: 28px;
          text-align: center;
        }

        .section-eyebrow {
          color: var(--blue);
          font-size: 13px;
          font-weight: 850;
        }

        .section-title h2 {
          margin: 7px 0;
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 900;
          line-height: 1.5;
        }

        .section-title p {
          max-width: 620px;
          margin: 0 auto;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.9;
        }

        /* شبكة مستقلة لبطاقات الخدمات */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
        }

        .service-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-width: 0;
          min-height: 260px;
          padding: 28px 17px 20px;
          border: 1px solid var(--border);
          border-radius: 23px;
          background:
            radial-gradient(
              circle at 5% 5%,
              var(--service-tint),
              transparent 48%
            ),
            #fff;
          color: var(--text);
          text-align: center;
          text-decoration: none;
          box-shadow: 0 8px 25px rgba(28, 59, 109, 0.06);
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease,
            border-color 0.22s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .service-card:hover {
          transform: translateY(-4px);
          border-color: var(--service-color);
          box-shadow: 0 15px 30px rgba(28, 59, 109, 0.12);
        }

        .service-card:focus-visible {
          outline: 3px solid #2459a955;
          outline-offset: 4px;
        }

        .service-arrow {
          position: absolute;
          top: 12px;
          left: 12px;
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border-radius: 10px;
          background: var(--service-tint);
          color: var(--service-color);
        }

        .service-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 68px;
          width: 68px;
          height: 68px;
          margin-bottom: 15px;
          border: 1px solid #17233d08;
          border-radius: 21px;
          background: var(--service-tint);
          color: var(--service-color);
        }

        .service-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          min-width: 0;
          flex: 1;
        }

        .service-title {
          display: block;
          margin-bottom: 7px;
          color: #173e78;
          font-size: 16px;
          font-weight: 900;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .service-description {
          display: block;
          max-width: 300px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.9;
          overflow-wrap: anywhere;
        }

        .service-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 12px;
          padding: 6px 10px;
          border-radius: 10px;
          background: var(--service-tint);
          color: var(--service-color);
          font-size: 11px;
          font-weight: 800;
        }

        .service-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          width: 100%;
          margin-top: 16px;
          padding: 10px 12px;
          border: 1px solid var(--service-color);
          border-radius: 12px;
          background: #fff;
          color: var(--service-color);
          font-size: 12px;
          font-weight: 850;
          transition:
            background 0.2s ease,
            color 0.2s ease;
        }

        .service-card:hover .service-cta {
          background: var(--service-color);
          color: #fff;
        }

        .page-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 160px;
          margin-bottom: 18px;
          padding: 24px;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: #fff;
          color: var(--muted);
          text-align: center;
          font-size: 13px;
        }

        .page-state strong {
          color: var(--text);
        }

        .error-state > svg {
          color: #c45a63;
        }

        .loading-icon {
          color: var(--blue);
          animation: rotation 1s linear infinite;
        }

        .works-note {
          display: flex;
          align-items: center;
          gap: 14px;
          max-width: 1150px;
          margin: 30px auto 0;
          padding: 19px 21px;
          border: 1px solid var(--border);
          border-radius: 19px;
          background: #fff;
          box-shadow: 0 7px 24px #17233d08;
        }

        .note-icon {
          display: grid;
          place-items: center;
          flex: 0 0 46px;
          width: 46px;
          height: 46px;
          border-radius: 15px;
          background: #edf3ff;
          color: var(--blue);
        }

        .works-note strong {
          display: block;
          font-size: 13px;
          font-weight: 900;
        }

        .works-note p {
          margin: 5px 0 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.9;
        }

        .back-home {
          margin-top: 34px;
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
          background: #fff;
          color: var(--blue);
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
        }

        @keyframes rotation {
          to {
            transform: rotate(360deg);
          }
        }

        /* الأجهزة اللوحية */
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .service-card {
            min-height: 250px;
          }
        }

        /* الجوال: بطاقتان في كل صف */
        @media (max-width: 600px) {
          .previous-works-page {
            padding: 24px 12px 42px;
          }

          .previous-works-hero {
            margin-bottom: 30px;
            padding: 27px 14px;
            border-radius: 22px;
          }

          .hero-icon {
            width: 66px;
            height: 66px;
            border-radius: 20px;
          }

          .previous-works-hero h1 {
            font-size: 28px;
          }

          .previous-works-hero p {
            font-size: 13px;
          }

          .section-title {
            margin-bottom: 20px;
          }

          .section-title h2 {
            font-size: 24px;
          }

          .section-title p {
            font-size: 12px;
          }

          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 11px;
          }

          .service-card {
            min-height: 240px;
            padding: 24px 9px 12px;
            border-radius: 17px;
            gap: 0;
          }

          .service-arrow {
            top: 8px;
            left: 8px;
            width: 25px;
            height: 25px;
            border-radius: 8px;
          }

          .service-icon {
            flex-basis: 54px;
            width: 54px;
            height: 54px;
            margin-bottom: 10px;
            border-radius: 16px;
          }

          .service-icon :global(svg) {
            width: 25px;
            height: 25px;
          }

          .service-title {
            font-size: 12px;
            line-height: 1.8;
          }

          .service-description {
            font-size: 10px;
            line-height: 1.8;
          }

          .service-count {
            gap: 4px;
            margin-top: 9px;
            padding: 5px 6px;
            font-size: 9px;
          }

          .service-cta {
            gap: 4px;
            margin-top: 12px;
            padding: 9px 4px;
            border-radius: 9px;
            font-size: 10px;
          }

          .works-note {
            align-items: flex-start;
            margin-top: 22px;
            padding: 14px;
            border-radius: 16px;
          }

          .note-icon {
            flex-basis: 38px;
            width: 38px;
            height: 38px;
          }
        }

        @media (max-width: 350px) {
          .services-grid {
            gap: 8px;
          }

          .service-card {
            min-height: 250px;
            padding-right: 7px;
            padding-left: 7px;
          }

          .service-title {
            font-size: 11px;
          }

          .service-description {
            font-size: 9px;
          }

          .service-cta {
            font-size: 9px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-card,
          .service-cta {
            transition: none;
          }

          .loading-icon {
            animation: none;
          }
        }
      `}</style>
    </main>
  )
}
