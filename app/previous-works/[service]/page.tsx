
'use client'

import './previous-works-detail.css'

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
                          items.length === 1
                            ? 'عمل منشور'
                            : 'أعمال منشورة'
                        }`}
                  </span>
                </div>
              </div>

              <div className="pw-hero-icon" aria-hidden="true">
                <ServiceIcon size={42} strokeWidth={1.8} />
              </div>

              <span className="pw-hero-decoration" aria-hidden="true" />
            </header>

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
                      <div className="pw-preview">
                        {image ? (
                          <img
                            src={url}
                            alt={`معاينة ${item.title}`}
                            loading="lazy"
                            decoding="async"
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
                          aria-label={`فتح العمل: ${item.title}`}
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
    </main>
  )
}
