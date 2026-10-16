
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
        <div className="previous-works-hero-icon">
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

      <section className="services-works-section">
        <div className="section-title">
          <span className="section-eyebrow">استكشف أعمالنا</span>
          <h2>اختر الخدمة المناسبة</h2>
          <p>
            اضغط على الخدمة للانتقال إلى معرض مستقل يضم نماذج
            الأعمال المتعلقة بها.
          </p>
        </div>

        {loading ? (
          <div className="page-state">
            <LoaderCircle className="loading-icon" size={30} />
            <strong>جارٍ تحميل الأعمال...</strong>
          </div>
        ) : loadError ? (
          <div className="page-state error-state">
            <FileText size={30} />
            <strong>{loadError}</strong>
            <span>يمكنك المحاولة مرة أخرى لاحقًا.</span>
          </div>
        ) : (
          <div className="services-works-grid">
            {services.map((service) => {
              const Icon = service.icon

              const count = items.filter(
                (item) => item.service_slug === service.id
              ).length

              return (
                <Link
                  key={service.id}
                  href={`/previous-works/${service.id}`}
                  className="service-work-card"
                  aria-label={`استعراض أعمال ${service.title}`}
                  style={{
                    '--service-color': service.color,
                    '--service-tint': service.tint,
                  } as React.CSSProperties}
                >
                  <div className="service-work-icon">
                    <Icon size={27} strokeWidth={1.9} />
                  </div>

                  <div className="service-work-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>

                    <small>
                      <FileCheck size={14} />
                      {count} {count === 1 ? 'عمل منشور' : 'أعمال منشورة'}
                    </small>
                  </div>

                  <span className="service-work-arrow" aria-hidden="true">
                    ←
                  </span>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <section className="works-note">
        <div className="works-note-icon">
          <FolderOpen size={23} />
        </div>

        <div className="works-note-content">
          <strong>لكل خدمة معرضها الخاص</strong>
          <p>
            عند إضافة عمل جديد ونشره من لوحة الإدارة، سيظهر ضمن
            الخدمة التي اخترتها عند إضافة العمل.
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

        .hero-brand {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 14px;
          border: 1px solid #dbe5f1;
          border-radius: 999px;
          background: #fff;
          color: var(--works-blue);
          font-size: 13px;
          font-weight: 800;
        }

        .previous-works-hero h1 {
          margin: 16px 0 12px;
          color: var(--works-text);
          font-size: clamp(30px, 5vw, 48px);
          font-weight: 900;
          line-height: 1.4;
          letter-spacing: -0.8px;
        }

        .previous-works-hero p {
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
          min-width: 0;
          min-height: 145px;
          padding: 22px;
          border: 1px solid var(--works-border);
          border-radius: 22px;
          background: #fff;
          color: var(--works-text);
          box-shadow: 0 7px 24px #17233d08;
          text-align: right;
          text-decoration: none;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease,
            transform 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .service-work-card:hover {
          transform: translateY(-3px);
          border-color: var(--service-color, #b7ccef);
          background: linear-gradient(
            145deg,
            #fff,
            var(--service-tint, #f4f8ff)
          );
          box-shadow: 0 12px 28px #2455c414;
        }

        .service-work-card:focus-visible {
          outline: 3px solid #2455c455;
          outline-offset: 3px;
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
          background: var(--service-tint);
          color: var(--service-color);
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
          background: var(--service-tint);
          color: var(--service-color);
          font-size: 22px;
          font-weight: 800;
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            color 0.2s ease;
        }

        .service-work-card:hover .service-work-arrow {
          transform: translateX(-3px);
          background: var(--service-color);
          color: #fff;
        }

        .page-state {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 12px;
          min-height: 180px;
          padding: 25px;
          border: 1px solid var(--works-border);
          border-radius: 22px;
          background: #fff;
          color: var(--works-muted);
          text-align: center;
          font-size: 13px;
        }

        .page-state strong {
          color: var(--works-text);
        }

        .error-state > svg {
          color: #c45a63;
        }

        .loading-icon {
          color: var(--works-blue);
          animation: works-rotation 1s linear infinite;
        }

        .works-note {
          display: flex;
          align-items: center;
          gap: 14px;
          max-width: 1150px;
          margin: 32px auto 0;
          padding: 20px 22px;
          border: 1px solid var(--works-border);
          border-radius: 20px;
          background: #fff;
        }

        .works-note-icon {
          display: grid;
          place-items: center;
          flex: 0 0 46px;
          width: 46px;
          height: 46px;
          border-radius: 15px;
          background: #edf3ff;
          color: var(--works-blue);
        }

        .works-note-content {
          min-width: 0;
        }

        .works-note-content strong {
          display: block;
          color: var(--works-text);
          font-size: 13px;
          font-weight: 900;
        }

        .works-note-content p {
          margin: 5px 0 0;
          color: var(--works-muted);
          font-size: 12px;
          line-height: 1.9;
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
          background: #fff;
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

        @keyframes works-rotation {
          to {
            transform: rotate(360deg);
          }
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

          .services-works-grid {
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

          .works-note {
            align-items: flex-start;
            padding: 15px;
            border-radius: 17px;
          }

          .works-note-icon {
            flex-basis: 40px;
            width: 40px;
            height: 40px;
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
        }

        @media (prefers-reduced-motion: reduce) {
          .service-work-card,
          .service-work-arrow,
          .loading-icon {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </main>
  )
}
