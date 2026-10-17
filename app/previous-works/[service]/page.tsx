'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowRight,
  ArrowUpLeft,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileText,
  FolderOpen,
  GraduationCap,
  Laptop,
  LoaderCircle,
  Presentation,
  Scale,
  Search,
  Sparkles,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

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

type WorkItem = {
  id: string
  title: string
  description: string | null
  file_path: string
  file_name: string
  mime_type: string | null
  file_size: number | null
}

function fileLabel(item: WorkItem) {
  if (
    item.mime_type?.startsWith('image/') ||
    /\.(png|jpe?g|webp|gif|svg)$/i.test(item.file_name)
  ) {
    return 'صورة'
  }

  if (/\.pdf$/i.test(item.file_name)) return 'ملف PDF'
  if (/\.docx?$/i.test(item.file_name)) return 'ملف Word'
  if (/\.pptx?$/i.test(item.file_name)) return 'عرض تقديمي'
  if (/\.xlsx?$/i.test(item.file_name)) return 'ملف Excel'

  return 'ملف مرفق'
}

function isImageFile(item: WorkItem) {
  return (
    Boolean(item.mime_type?.startsWith('image/')) ||
    /\.(png|jpe?g|webp|gif)$/i.test(item.file_name)
  )
}

export default function PreviousWorksServicePage() {
  const params = useParams<{ service: string }>()
  const slug = params?.service ?? ''

  const service = services.find((item) => item.id === slug)

  const [items, setItems] = useState<WorkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    let active = true

    async function loadWorks() {
      setLoading(true)
      setError('')

      const { data, error: queryError } = await supabase
        .from('previous_work_items')
        .select(
          'id, title, description, file_path, file_name, mime_type, file_size'
        )
        .eq('service_slug', slug)
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (!active) return

      if (queryError) {
        setError('تعذر تحميل الأعمال حاليًا. يرجى المحاولة مرة أخرى.')
      } else {
        setItems((data ?? []) as WorkItem[])
      }

      setLoading(false)
    }

    if (service) {
      void loadWorks()
    } else {
      setLoading(false)
    }

    return () => {
      active = false
    }
  }, [slug, service, retryKey])

  const ServiceIcon = service?.icon ?? FolderOpen

  return (
    <main className="pw-page" dir="rtl">
      <div className="pw-container">
        {/* مسار التنقل */}
        <nav className="pw-breadcrumb" aria-label="مسار الصفحة">
          <Link href="/">الرئيسية</Link>
          <span className="pw-separator">/</span>
          <Link href="/previous-works">أعمالنا السابقة</Link>

          {service && (
            <>
              <span className="pw-separator">/</span>
              <span className="pw-current">{service.title}</span>
            </>
          )}
        </nav>

        {!service ? (
          <section className="pw-state">
            <div className="pw-state-icon">
              <FolderOpen size={32} />
            </div>

            <h1>الخدمة غير موجودة</h1>

            <p>
              تعذر العثور على هذه الخدمة. يمكنك العودة إلى معرض الأعمال
              واستكشاف الخدمات المتاحة.
            </p>

            <Link href="/previous-works" className="pw-primary">
              <ArrowRight size={17} />
              العودة إلى جميع الخدمات
            </Link>
          </section>
        ) : (
          <>
            {/* الواجهة الرئيسية للخدمة */}
            <header
              className="pw-hero"
              style={
                {
                  '--service-color': service.color,
                  '--service-tint': service.tint,
                } as CSSProperties
              }
            >
              <div className="pw-hero-copy">
                <span className="pw-kicker">
                  <Sparkles size={15} />
                  نماذج من أعمال منصة هديل
                </span>

                <h1>{service.title}</h1>

                <p className="pw-hero-description">
                  {service.description}
                </p>

                <div className="pw-hero-meta">
                  <span className="pw-meta-item">
                    <CheckCircle2 size={16} />
                    أعمال منشورة
                  </span>

                  <span className="pw-meta-item pw-meta-count">
                    <FolderOpen size={16} />
                    {loading
                      ? 'جارٍ تحميل الأعمال'
                      : `${items.length} ${
                          items.length === 1 ? 'عمل منشور' : 'أعمال منشورة'
                        }`}
                  </span>
                </div>
              </div>

              <div className="pw-hero-icon" aria-hidden="true">
                <ServiceIcon size={42} strokeWidth={1.8} />
              </div>

              <span className="pw-hero-decoration" aria-hidden="true" />
            </header>

            {/* عنوان معرض الأعمال */}
            <div className="pw-heading">
              <div className="pw-heading-copy">
                <span className="pw-section-label">اكتشف نماذجنا</span>
                <h2>معرض الأعمال</h2>
                <p>تصفّح نماذج الأعمال المنشورة لهذه الخدمة.</p>
              </div>

              <Link href="/previous-works" className="pw-back">
                <ArrowRight size={16} />
                <span>جميع الخدمات</span>
              </Link>
            </div>

            {/* حالات التحميل والنتائج */}
            {loading ? (
              <section className="pw-state" aria-live="polite">
                <div className="pw-state-icon">
                  <LoaderCircle className="pw-spin" size={30} />
                </div>

                <h2>نجهّز لك الأعمال</h2>

                <p>لحظات بسيطة وستظهر هنا النماذج المنشورة.</p>
              </section>
            ) : error ? (
              <section className="pw-state" aria-live="polite">
                <div className="pw-state-icon pw-state-error">
                  <FileText size={30} />
                </div>

                <h2>تعذر تحميل الأعمال</h2>

                <p>{error}</p>

                <button
                  type="button"
                  className="pw-primary"
                  onClick={() => setRetryKey((value) => value + 1)}
                >
                  <ArrowUpLeft size={17} />
                  إعادة المحاولة
                </button>
              </section>
            ) : items.length === 0 ? (
              <section className="pw-state">
                <div className="pw-state-icon">
                  <FolderOpen size={32} />
                </div>

                <h2>الأعمال قادمة قريبًا</h2>

                <p>
                  لا توجد نماذج منشورة لهذه الخدمة حاليًا. ستظهر الأعمال هنا
                  تلقائيًا عند إضافتها ونشرها.
                </p>

                <Link href="/previous-works" className="pw-primary">
                  <ArrowRight size={17} />
                  استكشف الخدمات الأخرى
                </Link>
              </section>
            ) : (
              <section className="pw-grid" aria-label="الأعمال المنشورة">
                {items.map((item, index) => {
                  const url = supabase.storage
                    .from(BUCKET)
                    .getPublicUrl(item.file_path).data.publicUrl

                  const image = isImageFile(item)

                  return (
                    <article
                      className="pw-card"
                      key={item.id}
                      style={
                        {
                          '--card-accent': service.color,
                          '--card-tint': service.tint,
                        } as CSSProperties
                      }
                    >
                      {/* معاينة واحدة فقط لكل عمل */}
                      <div className="pw-preview">
                        {image ? (
                          <img
                            src={url}
                            alt={`معاينة ${item.title}`}
                            loading="lazy"
                          />
                        ) : (
                          <div className="pw-file-preview">
                            <span className="pw-file-icon">
                              <FileText size={34} strokeWidth={1.7} />
                            </span>

                            <strong>{fileLabel(item)}</strong>

                            <span className="pw-filename">
                              {item.file_name}
                            </span>
                          </div>
                        )}

                        <span className="pw-preview-index">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* معلومات العمل وزر واحد واضح */}
                      <div className="pw-card-content">
                        <span className="pw-file-type">
                          {fileLabel(item)}
                        </span>

                        <h3>{item.title}</h3>

                        <p className="pw-description">
                          {item.description ||
                            'نموذج من الأعمال المنشورة في منصة هديل.'}
                        </p>

                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pw-open"
                        >
                          <span>عرض العمل</span>
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </article>
                  )
                })}
              </section>
            )}
          </>
        )}

        {/* دعوة لاستكشاف بقية الخدمات */}
        <footer className="pw-footer">
          <div className="pw-footer-icon">
            <Sparkles size={21} />
          </div>

          <div className="pw-footer-copy">
            <strong>هل تبحث عن خدمة أخرى؟</strong>
            <p>
              استكشف بقية الخدمات ونماذج الأعمال المنشورة في منصة هديل.
            </p>
          </div>

          <Link href="/previous-works" className="pw-footer-link">
            <span>استكشف الخدمات</span>
            <ArrowRight size={16} />
          </Link>
        </footer>
      </div>

      <style jsx>{`
        .pw-page {
          --pw-text: #192944;
          --pw-muted: #75839a;
          --pw-border: #e4eaf3;
          min-height: 100vh;
          padding: 30px 18px 64px;
          color: var(--pw-text);
          background:
            radial-gradient(
              ellipse at 50% 0%,
              rgba(225, 235, 255, 0.78) 0%,
              transparent 42%
            ),
            #f8faff;
          overflow: hidden;
        }

        .pw-container {
          width: 100%;
          max-width: 1160px;
          margin-inline: auto;
        }

        .pw-breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          margin: 0 0 23px;
          color: #8491a6;
          font-size: 12px;
          line-height: 1.9;
        }

        .pw-breadcrumb a {
          color: #52658a;
          font-weight: 800;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .pw-breadcrumb a:hover {
          color: #2455c4;
        }

        .pw-separator {
          color: #c0cad9;
        }

        .pw-current {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        /* رأس صفحة الخدمة */

        .pw-hero {
          isolation: isolate;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          min-height: 225px;
          padding: 36px 40px;
          overflow: hidden;
          border: 1px solid var(--pw-border);
          border-radius: 28px;
          background: linear-gradient(
            115deg,
            #ffffff 25%,
            var(--service-tint) 100%
          );
          box-shadow: 0 15px 42px rgba(28, 52, 92, 0.055);
        }

        .pw-hero::before {
          position: absolute;
          z-index: -1;
          top: 0;
          right: 0;
          bottom: 0;
          width: 6px;
          background: var(--service-color);
          content: '';
        }

        .pw-hero-copy {
          position: relative;
          z-index: 1;
          flex: 1;
          min-width: 0;
          max-width: 760px;
        }

        .pw-kicker {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          max-width: 100%;
          padding: 8px 12px;
          border: 1px solid #e6ebf4;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.9);
          color: var(--service-color);
          font-size: 12px;
          font-weight: 900;
          line-height: 1.6;
        }

        .pw-hero h1 {
          margin: 15px 0 8px;
          color: #1d2b45;
          font-size: clamp(27px, 3.5vw, 40px);
          font-weight: 950;
          line-height: 1.5;
          letter-spacing: -0.4px;
          overflow-wrap: anywhere;
        }

        .pw-hero-description {
          margin: 0;
          color: #6c7a92;
          font-size: 14px;
          line-height: 2;
        }

        .pw-hero-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 17px;
        }

        .pw-meta-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 34px;
          padding: 7px 11px;
          border: 1px solid #e4eaf2;
          border-radius: 10px;
          background: #fff;
          color: #287d67;
          font-size: 11px;
          font-weight: 850;
          line-height: 1.6;
        }

        .pw-meta-count {
          color: #526681;
        }

        .pw-hero-icon {
          position: relative;
          z-index: 1;
          display: grid;
          flex: 0 0 90px;
          place-items: center;
          width: 90px;
          height: 90px;
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 27px;
          background: rgba(255, 255, 255, 0.78);
          color: var(--service-color);
          box-shadow: 0 10px 30px rgba(31, 53, 91, 0.06);
        }

        .pw-hero-decoration {
          position: absolute;
          z-index: -1;
          bottom: -95px;
          left: 5%;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }

        /* عنوان المعرض */

        .pw-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin: 39px 0 21px;
        }

        .pw-heading-copy {
          min-width: 0;
        }

        .pw-section-label {
          color: #315db5;
          font-size: 11px;
          font-weight: 950;
        }

        .pw-heading h2 {
          margin: 5px 0 3px;
          color: #1e2d47;
          font-size: 27px;
          font-weight: 950;
          line-height: 1.5;
        }

        .pw-heading-copy p {
          margin: 0;
          color: #8490a4;
          font-size: 12px;
          line-height: 1.9;
        }

        .pw-back {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 41px;
          padding: 0 14px;
          border: 1px solid #e1e8f3;
          border-radius: 12px;
          background: #fff;
          color: #3158a3;
          font-size: 12px;
          font-weight: 900;
          text-decoration: none;
          transition:
            border-color 0.2s ease,
            background 0.2s ease;
        }

        .pw-back:hover {
          border-color: #b8c9ec;
          background: #f5f8ff;
        }

        /* بطاقات الأعمال */

        .pw-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: stretch;
          gap: 22px;
        }

        .pw-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
          border: 1px solid #e3eaf4;
          border-radius: 22px;
          background: #fff;
          box-shadow: 0 8px 26px rgba(26, 53, 99, 0.035);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
        }

        .pw-card:hover {
          transform: translateY(-3px);
          border-color: #d4e0f2;
          box-shadow: 0 16px 34px rgba(26, 53, 99, 0.075);
        }

        .pw-preview {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: linear-gradient(
            145deg,
            #fbfcff,
            var(--card-tint)
          );
        }

        .pw-preview img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pw-preview-index {
          position: absolute;
          top: 12px;
          right: 12px;
          display: grid;
          place-items: center;
          min-width: 34px;
          height: 30px;
          padding: 0 7px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.94);
          color: var(--card-accent);
          font-size: 10px;
          font-weight: 950;
          direction: ltr;
        }

        .pw-file-preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          height: 100%;
          padding: 22px;
          text-align: center;
        }

        .pw-file-icon {
          display: grid;
          place-items: center;
          width: 66px;
          height: 66px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 21px;
          background: rgba(255, 255, 255, 0.82);
          color: var(--card-accent);
        }

        .pw-file-preview strong {
          color: var(--card-accent);
          font-size: 14px;
          font-weight: 950;
        }

        .pw-filename {
          display: -webkit-box;
          max-width: 100%;
          overflow: hidden;
          color: #7d8aa0;
          font-size: 11px;
          line-height: 1.8;
          overflow-wrap: anywhere;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .pw-card-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: stretch;
          padding: 19px;
        }

        .pw-file-type {
          display: inline-flex;
          align-self: flex-start;
          align-items: center;
          min-height: 25px;
          padding: 4px 9px;
          border-radius: 8px;
          background: var(--card-tint);
          color: var(--card-accent);
          font-size: 10px;
          font-weight: 950;
          line-height: 1.6;
        }

        .pw-card h3 {
          margin: 12px 0 7px;
          color: #202e48;
          font-size: 16px;
          font-weight: 950;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .pw-description {
          display: -webkit-box;
          min-height: 44px;
          margin: 0 0 18px;
          overflow: hidden;
          color: #77849a;
          font-size: 12px;
          line-height: 1.9;
          overflow-wrap: anywhere;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .pw-open {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          min-height: 44px;
          margin-top: auto;
          padding: 10px 14px;
          border: 1px solid var(--card-accent);
          border-radius: 12px;
          background: var(--card-accent);
          color: #fff;
          font-size: 12px;
          font-weight: 950;
          text-align: center;
          text-decoration: none;
          transition:
            filter 0.2s ease,
            transform 0.2s ease;
        }

        .pw-open:hover {
          filter: brightness(0.94);
          transform: translateY(-1px);
        }

        /* حالات الصفحة */

        .pw-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 270px;
          padding: 34px 22px;
          border: 1px solid var(--pw-border);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.9);
          text-align: center;
          box-shadow: 0 10px 28px rgba(26, 53, 99, 0.025);
        }

        .pw-state-icon {
          display: grid;
          place-items: center;
          width: 66px;
          height: 66px;
          border: 1px solid #e3eafa;
          border-radius: 21px;
          background: #f1f5ff;
          color: #315db5;
        }

        .pw-state-error {
          border-color: #f2dddd;
          background: #fff5f5;
          color: #b54545;
        }

        .pw-state h1,
        .pw-state h2 {
          margin: 0;
          color: #253650;
          font-size: 20px;
          font-weight: 950;
          line-height: 1.6;
        }

        .pw-state p {
          max-width: 460px;
          margin: 0;
          color: #78869b;
          font-size: 13px;
          line-height: 2;
        }

        .pw-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 43px;
          max-width: 100%;
          margin-top: 7px;
          padding: 10px 16px;
          border: 0;
          border-radius: 12px;
          background: #2455c4;
          color: #fff;
          font-family: inherit;
          font-size: 12px;
          font-weight: 900;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .pw-primary:hover {
          background: #1946aa;
        }

        .pw-spin {
          animation: pw-spin 1s linear infinite;
        }

        /* الشريط الختامي */

        .pw-footer {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-top: 35px;
          padding: 21px 23px;
          border: 1px solid var(--pw-border);
          border-radius: 20px;
          background: linear-gradient(110deg, #fff, #f4f7ff);
        }

        .pw-footer-icon {
          display: grid;
          flex: 0 0 46px;
          place-items: center;
          width: 46px;
          height: 46px;
          border-radius: 15px;
          background: #eaf0ff;
          color: #315db5;
        }

        .pw-footer-copy {
          flex: 1;
          min-width: 0;
        }

        .pw-footer-copy strong {
          display: block;
          color: #263650;
          font-size: 13px;
          font-weight: 950;
          line-height: 1.8;
        }

        .pw-footer-copy p {
          margin: 5px 0 0;
          color: #7c899e;
          font-size: 11px;
          line-height: 1.9;
        }

        .pw-footer-link {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 40px;
          padding: 0 13px;
          border: 1px solid #dfe7f5;
          border-radius: 11px;
          background: #fff;
          color: #3158a3;
          font-size: 11px;
          font-weight: 900;
          text-decoration: none;
          transition: background 0.2s ease;
        }

        .pw-footer-link:hover {
          background: #f3f6ff;
        }

        @keyframes pw-spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* الأجهزة اللوحية */

        @media (max-width: 960px) {
          .pw-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .pw-hero {
            padding: 30px;
          }

          .pw-hero h1 {
            font-size: 32px;
          }
        }

        /* الجوال */

        @media (max-width: 600px) {
          .pw-page {
            padding: 18px 12px 38px;
          }

          .pw-breadcrumb {
            gap: 7px;
            margin-bottom: 16px;
            font-size: 10px;
          }

          .pw-hero {
            align-items: flex-start;
            gap: 12px;
            min-height: 0;
            padding: 23px 17px;
            border-radius: 21px;
          }

          .pw-hero::before {
            width: 4px;
          }

          .pw-hero-copy {
            flex: 1;
          }

          .pw-kicker {
            gap: 5px;
            padding: 7px 9px;
            font-size: 10px;
          }

          .pw-hero h1 {
            margin: 13px 0 7px;
            font-size: 23px;
            line-height: 1.55;
            letter-spacing: 0;
          }

          .pw-hero-description {
            font-size: 12px;
            line-height: 1.9;
          }

          .pw-hero-meta {
            gap: 7px;
            margin-top: 14px;
          }

          .pw-meta-item {
            min-height: 31px;
            padding: 6px 8px;
            font-size: 10px;
          }

          .pw-hero-icon {
            flex: 0 0 48px;
            width: 48px;
            height: 48px;
            border-radius: 15px;
          }

          .pw-hero-icon :global(svg) {
            width: 25px;
            height: 25px;
          }

          .pw-hero-decoration {
            bottom: -120px;
            left: -70px;
          }

          .pw-heading {
            align-items: flex-start;
            gap: 9px;
            margin: 29px 0 15px;
          }

          .pw-heading h2 {
            font-size: 23px;
          }

          .pw-heading-copy p {
            max-width: 230px;
            font-size: 11px;
          }

          .pw-back {
            min-height: 36px;
            gap: 5px;
            padding: 0 9px;
            font-size: 10px;
            white-space: nowrap;
          }

          .pw-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 15px;
          }

          .pw-card {
            border-radius: 19px;
          }

          .pw-preview {
            aspect-ratio: 5 / 3;
          }

          .pw-card-content {
            padding: 16px;
          }

          .pw-card h3 {
            margin-top: 10px;
            font-size: 16px;
          }

          .pw-description {
            min-height: 0;
            margin-bottom: 15px;
            font-size: 12px;
          }

          .pw-open {
            min-height: 43px;
          }

          .pw-state {
            min-height: 240px;
            padding: 27px 18px;
            border-radius: 20px;
          }

          .pw-state h1,
          .pw-state h2 {
            font-size: 18px;
          }

          .pw-state p {
            font-size: 12px;
          }

          .pw-footer {
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 11px;
            margin-top: 26px;
            padding: 16px;
            border-radius: 17px;
          }

          .pw-footer-icon {
            flex-basis: 40px;
            width: 40px;
            height: 40px;
            border-radius: 13px;
          }

          .pw-footer-copy {
            flex: 1 1 calc(100% - 60px);
            padding-top: 2px;
          }

          .pw-footer-copy p {
            font-size: 11px;
          }

          .pw-footer-link {
            width: 100%;
            min-height: 40px;
          }

          .pw-primary {
            max-width: 100%;
          }
        }

        @media (max-width: 360px) {
          .pw-hero {
            padding: 19px 13px;
          }

          .pw-hero h1 {
            font-size: 21px;
          }

          .pw-hero-icon {
            flex-basis: 42px;
            width: 42px;
            height: 42px;
          }

          .pw-meta-item {
            font-size: 9px;
          }

          .pw-heading h2 {
            font-size: 21px;
          }

          .pw-back {
            gap: 4px;
            padding: 0 7px;
            font-size: 9px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pw-card,
          .pw-open,
          .pw-back,
          .pw-primary,
          .pw-footer-link {
            transition: none;
          }

          .pw-spin {
            animation-duration: 2s;
          }
        }
      `}</style>
    </main>
  )
}