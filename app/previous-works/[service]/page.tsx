
'use client'

import './previous-works-detail.css'

import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  FileSpreadsheet,
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
    color: '#8062bd',
    tint: '#f1ebfa',
  },
  {
    id: 'reports',
    title: 'التقارير الجامعية',
    description: 'إعداد وتنسيق التقارير والمشاريع الجامعية.',
    icon: FileText,
    color: '#277d73',
    tint: '#e8f4f0',
  },
  {
    id: 'assignments',
    title: 'التكاليف الجامعية',
    description: 'تنفيذ وتنسيق التكاليف والمتطلبات الجامعية.',
    icon: ClipboardList,
    color: '#b17b31',
    tint: '#f8f0e2',
  },
  {
    id: 'homework',
    title: 'الواجبات الدراسية',
    description: 'مساعدة في إعداد الواجبات والمهام الدراسية.',
    icon: BookOpen,
    color: '#3766a9',
    tint: '#eaf0f8',
  },
  {
    id: 'lms',
    title: 'إدارة المنصات والمهام الدراسية',
    description: 'متابعة المهام وإدارة المنصات الدراسية.',
    icon: Laptop,
    color: '#318365',
    tint: '#e8f4ed',
  },
  {
    id: 'presentation',
    title: 'العروض التقديمية والتصميم',
    description: 'تصميم العروض التقديمية والمحتوى البصري.',
    icon: Presentation,
    color: '#a7507b',
    tint: '#f8eaf0',
  },
  {
    id: 'cv',
    title: 'السيرة الذاتية والخدمات المهنية',
    description: 'إعداد السير الذاتية والخدمات المهنية.',
    icon: BriefcaseBusiness,
    color: '#5d6b7d',
    tint: '#edf0f4',
  },
  {
    id: 'case-study',
    title: 'دراسة الحالة',
    description: 'إعداد وتحليل دراسات الحالة الأكاديمية.',
    icon: Scale,
    color: '#a55f47',
    tint: '#f8ece6',
  },
  {
    id: 'feasibility',
    title: 'دراسات الجدوى',
    description: 'إعداد دراسات الجدوى وتحليل المشاريع.',
    icon: Calculator,
    color: '#667d3c',
    tint: '#eff3e7',
  },
  {
    id: 'graduation',
    title: 'مشاريع التخرج',
    description: 'مشاريع التخرج والأعمال الأكاديمية المتخصصة.',
    icon: GraduationCap,
    color: '#73549d',
    tint: '#f0ebf7',
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

function isImageFile(item: WorkItem) {
  return (
    Boolean(item.mime_type?.startsWith('image/')) ||
    /\.(png|jpe?g|webp|gif)$/i.test(item.file_name)
  )
}

function fileLabel(item: WorkItem) {
  if (isImageFile(item)) return 'صورة'
  if (/\.pdf$/i.test(item.file_name)) return 'PDF'
  if (/\.docx?$/i.test(item.file_name)) return 'Word'
  if (/\.pptx?$/i.test(item.file_name)) return 'PowerPoint'
  if (/\.xlsx?$/i.test(item.file_name)) return 'Excel'
  return 'ملف مرفق'
}

function formatFileSize(bytes: number | null) {
  if (!bytes || bytes <= 0) return ''

  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} كيلوبايت`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} ميجابايت`
}

function FileArtwork({ item }: { item: WorkItem }) {
  const extension = fileLabel(item)

  const Icon =
    extension === 'Excel'
      ? FileSpreadsheet
      : extension === 'PowerPoint'
        ? Presentation
        : FileText

  return (
    <div className="pw-file-artwork">
      <span className="pw-file-artwork-icon">
        <Icon size={46} strokeWidth={1.35} />
      </span>

      <span className="pw-file-artwork-label">{extension}</span>

      <span className="pw-file-artwork-caption">
        من أعمال منصة هديل
      </span>
    </div>
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

          <ArrowLeft size={13} />

          <Link href="/previous-works">أعمالنا السابقة</Link>

          {service && (
            <>
              <ArrowLeft size={13} />
              <span className="pw-breadcrumb-current">
                {service.title}
              </span>
            </>
          )}
        </nav>

        {!service ? (
          <section className="pw-state">
            <span className="pw-state-icon">
              <FolderOpen size={34} />
            </span>

            <span className="pw-eyebrow">منصة هديل</span>

            <h1>الخدمة غير موجودة</h1>

            <p>
              تعذر العثور على هذه الخدمة. يمكنك العودة إلى معرض
              الأعمال واستكشاف الخدمات المتاحة.
            </p>

            <Link
              href="/previous-works"
              className="pw-button pw-button-primary"
            >
              <ArrowRight size={17} />
              العودة إلى جميع الخدمات
            </Link>
          </section>
        ) : (
          <>
            <header className="pw-hero">
              <div className="pw-hero-content">
                <div className="pw-brand-line">
                  <span className="pw-brand-mark">
                    <Sparkles size={17} />
                  </span>

                  <span>منصة هديل</span>

                  <span className="pw-brand-divider" />

                  <span className="pw-brand-subtitle">
                    معرض الأعمال
                  </span>
                </div>

                <span className="pw-hero-overline">
                  نماذج مختارة من أعمالنا
                </span>

                <h1>{service.title}</h1>

                <p className="pw-hero-description">
                  {service.description}
                </p>

                <div className="pw-hero-stats">
                  <span>
                    <CheckCircle2 size={16} />
                    أعمال منشورة وموثقة
                  </span>

                  <span className="pw-stats-divider" />

                  <span>
                    <FolderOpen size={16} />
                    {loading
                      ? 'جارٍ تحميل الأعمال'
                      : `${items.length} عمل منشور`}
                  </span>
                </div>
              </div>

              <div
                className="pw-hero-emblem"
                style={
                  {
                    '--service-color': service.color,
                    '--service-tint': service.tint,
                  } as CSSProperties
                }
                aria-hidden="true"
              >
                <span className="pw-emblem-ring" />

                <span className="pw-emblem-icon">
                  <ServiceIcon size={52} strokeWidth={1.35} />
                </span>

                <span className="pw-emblem-sparkle">
                  <Sparkles size={20} />
                </span>
              </div>

              <span className="pw-hero-watermark" aria-hidden="true">
                H
              </span>

              <span className="pw-hero-gold-line" />
            </header>

            <section className="pw-gallery-section">
              <div className="pw-section-heading">
                <div>
                  <span className="pw-section-overline">
                    PORTFOLIO
                  </span>

                  <h2>نماذج من أعمالنا</h2>

                  <p>
                    تصفّح الأعمال والصور والملفات المنشورة ضمن هذه الخدمة.
                  </p>
                </div>

                <Link
                  href="/previous-works"
                  className="pw-back-link"
                >
                  <ArrowRight size={16} />
                  جميع الخدمات
                </Link>
              </div>

              {loading ? (
                <section className="pw-state" aria-live="polite">
                  <span className="pw-state-icon">
                    <LoaderCircle className="pw-spin" size={32} />
                  </span>

                  <h2>نجهّز لك معرض الأعمال</h2>

                  <p>
                    لحظات بسيطة وستظهر النماذج المنشورة هنا.
                  </p>
                </section>
              ) : error ? (
                <section className="pw-state" aria-live="polite">
                  <span className="pw-state-icon pw-state-icon-error">
                    <FileText size={32} />
                  </span>

                  <h2>تعذر تحميل الأعمال</h2>

                  <p>{error}</p>

                  <button
                    type="button"
                    className="pw-button pw-button-primary"
                    onClick={() =>
                      setRetryKey((value) => value + 1)
                    }
                  >
                    <ArrowUpLeft size={17} />
                    إعادة المحاولة
                  </button>
                </section>
              ) : items.length === 0 ? (
                <section className="pw-state">
                  <span className="pw-state-icon">
                    <FolderOpen size={34} />
                  </span>

                  <h2>المعرض قيد التجهيز</h2>

                  <p>
                    لا توجد أعمال منشورة لهذه الخدمة حاليًا.
                    ستظهر النماذج هنا تلقائيًا عند إضافتها ونشرها.
                  </p>

                  <Link
                    href="/previous-works"
                    className="pw-button pw-button-primary"
                  >
                    <ArrowRight size={17} />
                    استكشف الخدمات الأخرى
                  </Link>
                </section>
              ) : (
                <div
                  className="pw-grid"
                  aria-label="الأعمال المنشورة"
                >
                  {items.map((item, index) => {
                    const url = supabase.storage
                      .from(BUCKET)
                      .getPublicUrl(item.file_path).data.publicUrl

                    const image = isImageFile(item)

                    return (
                      <article className="pw-card" key={item.id}>
                        <a
                          className="pw-preview"
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`فتح معاينة ${item.title}`}
                        >
                          {image ? (
                            <img
                              src={url}
                              alt={`معاينة ${item.title}`}
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <FileArtwork item={item} />
                          )}

                          <span className="pw-preview-number">
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <span className="pw-preview-open">
                            <ExternalLink size={17} />
                          </span>
                        </a>

                        <div className="pw-card-body">
                          <div className="pw-card-meta">
                            <span className="pw-file-badge">
                              {fileLabel(item)}
                            </span>

                            {formatFileSize(item.file_size) && (
                              <span className="pw-file-size">
                                {formatFileSize(item.file_size)}
                              </span>
                            )}
                          </div>

                          <h3>{item.title}</h3>

                          <p className="pw-card-description">
                            {item.description ||
                              'نموذج من الأعمال المنشورة في منصة هديل.'}
                          </p>

                          <div className="pw-card-footer">
                            <span className="pw-card-brand">
                              <span className="pw-mini-mark">
                                <Sparkles size={12} />
                              </span>

                              منصة هديل
                            </span>

                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="pw-open-link"
                            >
                              عرض العمل
                              <ArrowLeft size={15} />
                            </a>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}
            </section>

            <footer className="pw-footer">
              <span className="pw-footer-icon">
                <Sparkles size={22} />
              </span>

              <div className="pw-footer-copy">
                <strong>
                  اكتشف المزيد من أعمال منصة هديل
                </strong>

                <p>
                  تعرّف على نماذج الخدمات الأخرى في معرضنا.
                </p>
              </div>

              <Link
                href="/previous-works"
                className="pw-footer-button"
              >
                استكشف الخدمات
                <ArrowLeft size={16} />
              </Link>
            </footer>
          </>
        )}
      </div>
    </main>
  )
}
