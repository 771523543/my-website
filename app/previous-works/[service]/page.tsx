'use client'

import './previous-works-detail.css'

import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  Eye,
  FileSpreadsheet,
  FileText,
  FolderOpen,
  GraduationCap,
  Image as ImageIcon,
  Laptop,
  LoaderCircle,
  Presentation,
  Scale,
  Search,
  ShoppingBag,
  Sparkles,
  X,
  ZoomIn,
  Globe,
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
    description: 'المساعدة في إعداد الواجبات والمهام الدراسية.',
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

type FilterType = 'all' | 'images' | 'documents' | 'web'

type PreviewItem = {
  item: WorkItem
  url: string
  type: 'image' | 'pdf'
}

function isImageFile(item: WorkItem) {
  return (
    Boolean(item.mime_type?.startsWith('image/')) ||
    /\.(png|jpe?g|webp|gif|bmp|avif|svg)$/i.test(item.file_name)
  )
}

function isWebProject(item: WorkItem) {
  return (
    /^https?:\/\//i.test(item.file_path) ||
    item.mime_type === 'text/html' ||
    /\.(html?|url)$/i.test(item.file_name)
  )
}

function isPdfFile(item: WorkItem) {
  return (
    item.mime_type === 'application/pdf' ||
    /\.pdf$/i.test(item.file_name)
  )
}

function fileLabel(item: WorkItem) {
  if (isWebProject(item)) return 'مشروع ويب'
  if (isImageFile(item)) return 'تصميم وصورة'
  if (isPdfFile(item)) return 'PDF'
  if (/\.docx?$/i.test(item.file_name)) return 'Word'
  if (/\.pptx?$/i.test(item.file_name)) return 'PowerPoint'
  if (/\.xlsx?$/i.test(item.file_name)) return 'Excel'
  if (/\.zip$/i.test(item.file_name)) return 'ZIP'
  return 'ملف مستند'
}

function formatFileSize(bytes: number | null) {
  if (!bytes || bytes <= 0) return ''

  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} كيلوبايت`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} ميجابايت`
}

function getWorkUrl(item: WorkItem) {
  if (/^https?:\/\//i.test(item.file_path)) {
    return item.file_path
  }

  return supabase.storage.from(BUCKET).getPublicUrl(item.file_path)
    .data.publicUrl
}

function FileArtwork({ item }: { item: WorkItem }) {
  const extension = fileLabel(item)

  const Icon = isWebProject(item)
    ? Globe
    : extension === 'Excel'
      ? FileSpreadsheet
      : extension === 'PowerPoint'
        ? Presentation
        : FileText

  return (
    <div className="pw-file-artwork">
      <span className="pw-file-artwork-glow" />

      <span className={`pw-file-artwork-icon ${isPdfFile(item) ? 'is-pdf' : ''}`}>
        <Icon size={48} strokeWidth={1.5} />
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
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [preview, setPreview] = useState<PreviewItem | null>(null)

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

  useEffect(() => {
    if (!preview) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setPreview(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [preview])

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'images') return isImageFile(item)
    if (activeFilter === 'web') return isWebProject(item)

    return !isImageFile(item) && !isWebProject(item)
  })

  const ServiceIcon = service?.icon ?? FolderOpen

  function openPreview(item: WorkItem, url: string) {
    if (isImageFile(item)) {
      setPreview({ item, url, type: 'image' })
      return
    }

    if (isPdfFile(item)) {
      setPreview({ item, url, type: 'pdf' })
      return
    }

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="pw-page" dir="rtl">
      <div className="pw-container">
        <nav className="pw-breadcrumb" aria-label="مسار الصفحة">
          <Link href="/">الرئيسية</Link>
          <ArrowLeft size={14} />
          <Link href="/previous-works">أعمالنا السابقة</Link>

          {service && (
            <>
              <ArrowLeft size={14} />
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
                  <span className="pw-brand-subtitle">معرض الأعمال</span>
                </div>

                <span className="pw-hero-overline">
                  أعمال مختارة بعناية
                </span>

                <h1>معرض الأعمال والملفات</h1>

                <p className="pw-hero-description">
                  {service.description} اكتشف النماذج والتصاميم
                  والملفات، واختر العمل الذي يلهمك لخدمتك القادمة.
                </p>

                <div className="pw-hero-stats">
                  <span>
                    <CheckCircle2 size={16} />
                    نماذج منشورة
                  </span>

                  <span className="pw-stats-divider" />

                  <span>
                    <FolderOpen size={16} />
                    {loading
                      ? 'جارٍ تحميل الأعمال'
                      : `${items.length} عمل متاح`}
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
                    HADEEL PORTFOLIO
                  </span>

                  <h2>استكشف معرض الأعمال</h2>

                  <p>
                    تصاميم وصور ومستندات ومشاريع؛ اختر التصنيف
                    المناسب لعرض الأعمال التي تهمك.
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

              <div
                className="pw-filter-tabs"
                role="group"
                aria-label="تصفية الأعمال"
              >
                <button
                  type="button"
                  className={`pw-filter-tab ${activeFilter === 'all' ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                  aria-pressed={activeFilter === 'all'}
                >
                  <FolderOpen size={16} />
                  الكل
                  <span>{items.length}</span>
                </button>

                <button
                  type="button"
                  className={`pw-filter-tab ${activeFilter === 'images' ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter('images')}
                  aria-pressed={activeFilter === 'images'}
                >
                  <ImageIcon size={16} />
                  تصاميم وصور
                  <span>{items.filter(isImageFile).length}</span>
                </button>

                <button
                  type="button"
                  className={`pw-filter-tab ${activeFilter === 'documents' ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter('documents')}
                  aria-pressed={activeFilter === 'documents'}
                >
                  <FileText size={16} />
                  ملفات وتقارير PDF
                  <span>
                    {
                      items.filter(
                        (item) =>
                          !isImageFile(item) && !isWebProject(item)
                      ).length
                    }
                  </span>
                </button>

                <button
                  type="button"
                  className={`pw-filter-tab ${activeFilter === 'web' ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter('web')}
                  aria-pressed={activeFilter === 'web'}
                >
                  <Globe size={16} />
                  مشاريع ويب
                  <span>{items.filter(isWebProject).length}</span>
                </button>
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
                    onClick={() => setRetryKey((value) => value + 1)}
                  >
                    <ArrowLeft size={17} />
                    إعادة المحاولة
                  </button>
                </section>
              ) : filteredItems.length === 0 ? (
                <section className="pw-state">
                  <span className="pw-state-icon">
                    {activeFilter === 'images' ? (
                      <ImageIcon size={34} />
                    ) : activeFilter === 'web' ? (
                      <Globe size={34} />
                    ) : (
                      <FolderOpen size={34} />
                    )}
                  </span>

                  <h2>
                    {items.length === 0
                      ? 'المعرض قيد التجهيز'
                      : 'لا توجد أعمال في هذا التصنيف'}
                  </h2>

                  <p>
                    {items.length === 0
                      ? 'ستظهر الأعمال هنا تلقائيًا عند إضافتها ونشرها من لوحة إدارة المنصة.'
                      : 'جرّب تصنيفًا آخر لاستكشاف بقية الأعمال المنشورة.'}
                  </p>

                  {items.length > 0 ? (
                    <button
                      type="button"
                      className="pw-button pw-button-primary"
                      onClick={() => setActiveFilter('all')}
                    >
                      <FolderOpen size={16} />
                      عرض جميع الأعمال
                    </button>
                  ) : (
                    <Link
                      href="/previous-works"
                      className="pw-button pw-button-primary"
                    >
                      <ArrowRight size={17} />
                      استكشف الخدمات الأخرى
                    </Link>
                  )}
                </section>
              ) : (
                <>
                  <div className="pw-results-line">
                    <span>
                      عرض <strong>{filteredItems.length}</strong> من{' '}
                      <strong>{items.length}</strong> عمل
                    </span>

                    <span className="pw-results-decoration">
                      <Sparkles size={15} />
                      أعمال منصة هديل
                    </span>
                  </div>

                  <div
                    className="pw-grid"
                    aria-label="الأعمال المنشورة"
                  >
                    {filteredItems.map((item, index) => {
                      const url = getWorkUrl(item)
                      const image = isImageFile(item)
                      const web = isWebProject(item)
                      const pdf = isPdfFile(item)
                      const label = fileLabel(item)

                      return (
                        <article className="pw-card" key={item.id}>
                          <div
                            className={`pw-card-preview ${image ? 'pw-image-preview' : 'pw-document-preview'}`}
                          >
                            {image ? (
                              <button
                                type="button"
                                className="pw-image-trigger"
                                onClick={() => openPreview(item, url)}
                                aria-label={`تكبير صورة ${item.title}`}
                              >
                                <img
                                  src={url}
                                  alt={`معاينة ${item.title}`}
                                  loading="lazy"
                                  decoding="async"
                                />

                                <span className="pw-image-zoom">
                                  <ZoomIn size={21} />
                                </span>
                              </button>
                            ) : (
                              <FileArtwork item={item} />
                            )}

                            <span className={`pw-type-badge ${image ? 'is-image' : web ? 'is-web' : pdf ? 'is-pdf' : 'is-document'}`}>
                              {image ? (
                                <ImageIcon size={14} />
                              ) : web ? (
                                <Globe size={14} />
                              ) : (
                                <FileText size={14} />
                              )}
                              {label}
                            </span>

                            <span className="pw-preview-number">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>

                          <div className="pw-card-body">
                            <div className="pw-card-meta">
                              <span className="pw-file-badge">
                                {label}
                              </span>

                              {formatFileSize(item.file_size) && (
                                <span className="pw-file-size">
                                  {formatFileSize(item.file_size)}
                                </span>
                              )}
                            </div>

                            <h3 className="pw-card-title">
                              {item.title}
                            </h3>

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
                            </div>

                            <div className="pw-card-actions">
                              {image || pdf ? (
                                <button
                                  type="button"
                                  className="pw-open-link"
                                  onClick={() => openPreview(item, url)}
                                >
                                  {image ? (
                                    <ZoomIn size={17} />
                                  ) : (
                                    <Eye size={17} />
                                  )}
                                  {image
                                    ? 'تكبير ومعاينة'
                                    : 'معاينة المستند'}
                                </button>
                              ) : (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="pw-open-link"
                                >
                                  <ExternalLink size={16} />
                                  {web ? 'فتح المشروع' : 'فتح الملف'}
                                </a>
                              )}

                              <Link
                                href="/request-service"
                                className="pw-request-link"
                                aria-label={`طلب خدمة مشابهة لـ ${item.title}`}
                              >
                                <ShoppingBag size={16} />
                                اطلب خدمة مشابهة
                              </Link>
                            </div>
                          </div>
                        </article>
                      )
                    })}
                  </div>
                </>
              )}
            </section>

            <footer className="pw-footer">
              <span className="pw-footer-icon">
                <Sparkles size={22} />
              </span>

              <div className="pw-footer-copy">
                <strong>هل تريد عملًا مشابهًا؟</strong>

                <p>
                  ابدأ طلبك عبر منصة هديل، وحدد الخدمة التي تحتاجها
                  لنساعدك في الوصول إلى النتيجة المناسبة.
                </p>
              </div>

              <Link
                href="/request-service"
                className="pw-footer-button"
              >
                اطلب خدمتك الآن
                <ArrowLeft size={16} />
              </Link>
            </footer>
          </>
        )}
      </div>

      {preview && (
        <div
          className="pw-modal-backdrop"
          role="presentation"
          onClick={() => setPreview(null)}
        >
          <section
            className={`pw-preview-modal ${preview.type === 'pdf' ? 'is-pdf-modal' : 'is-image-modal'}`}
            role="dialog"
            aria-modal="true"
            aria-label={`معاينة ${preview.item.title}`}
            onClick={(event) => event.stopPropagation()}
          >
            <header className="pw-modal-header">
              <div className="pw-modal-heading">
                <span className="pw-modal-icon">
                  {preview.type === 'image' ? (
                    <ImageIcon size={20} />
                  ) : (
                    <FileText size={20} />
                  )}
                </span>

                <div>
                  <h2>{preview.item.title}</h2>
                  <p>
                    {preview.type === 'image'
                      ? 'معاينة الصورة بالحجم الكامل'
                      : 'معاينة المستند'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="pw-modal-close"
                onClick={() => setPreview(null)}
                aria-label="إغلاق المعاينة"
              >
                <X size={22} />
              </button>
            </header>

            <div className="pw-modal-content">
              {preview.type === 'image' ? (
                <img
                  className="pw-modal-image"
                  src={preview.url}
                  alt={preview.item.title}
                />
              ) : (
                <iframe
                  className="pw-pdf-frame"
                  src={`${preview.url}#toolbar=1&navpanes=0`}
                  title={`معاينة ${preview.item.title}`}
                />
              )}
            </div>

            <footer className="pw-modal-footer">
              <span className="pw-modal-file-name">
                {preview.item.file_name}
              </span>

              <a
                href={preview.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pw-modal-open"
              >
                <ExternalLink size={16} />
                فتح في نافذة مستقلة
              </a>

              <button
                type="button"
                className="pw-modal-done"
                onClick={() => setPreview(null)}
              >
                إغلاق
              </button>
            </footer>
          </section>
        </div>
      )}
    </main>
  )
}