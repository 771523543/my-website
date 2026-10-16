
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
  if (item.mime_type?.startsWith('image/')) return 'صورة'
  if (/\.pdf$/i.test(item.file_name)) return 'ملف PDF'
  if (/\.docx?$/i.test(item.file_name)) return 'ملف Word'
  if (/\.pptx?$/i.test(item.file_name)) return 'عرض تقديمي'
  if (/\.xlsx?$/i.test(item.file_name)) return 'ملف Excel'
  return 'ملف مرفق'
}

export default function PreviousWorksServicePage() {
  const params = useParams<{ service: string }>()
  const slug = params?.service ?? ''
  const service = services.find((item) => item.id === slug)

  const [items, setItems] = useState<WorkItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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
        setError('تعذر تحميل الأعمال حاليًا. يرجى المحاولة لاحقًا.')
      } else {
        setItems((data ?? []) as WorkItem[])
      }

      setLoading(false)
    }

    if (service) void loadWorks()
    else setLoading(false)

    return () => {
      active = false
    }
  }, [slug, service])

  const ServiceIcon = service?.icon ?? FolderOpen

  return (
    <main className="pw-page" dir="rtl">
      <div className="pw-container">
        <nav className="pw-breadcrumb">
          <Link href="/">الرئيسية</Link>
          <span>/</span>
          <Link href="/previous-works">الأعمال السابقة</Link>
          {service && <><span>/</span><span>{service.title}</span></>}
        </nav>

        {!service ? (
          <section className="pw-state">
            <FolderOpen size={42} />
            <h1>الخدمة غير موجودة</h1>
            <Link href="/previous-works" className="pw-button">
              العودة إلى الأعمال السابقة
            </Link>
          </section>
        ) : (
          <>
            <header
              className="pw-hero"
              style={{
                '--service-color': service.color,
                '--service-tint': service.tint,
              } as CSSProperties}
            >
              <div className="pw-hero-copy">
                <span className="pw-kicker">
                  <Sparkles size={15} /> نماذج من أعمال منصة هديل
                </span>
                <h1>{service.title}</h1>
                <p>{service.description}</p>
                <span className="pw-count">
                  <CheckCircle2 size={16} />
                  {items.length} {items.length === 1 ? 'عمل منشور' : 'أعمال منشورة'}
                </span>
              </div>

              <div className="pw-hero-icon">
                <ServiceIcon size={42} />
              </div>
            </header>

            <div className="pw-heading">
              <div>
                <span>معرض الخدمة</span>
                <h2>نماذج الأعمال</h2>
              </div>
              <Link href="/previous-works" className="pw-back">
                <ArrowRight size={16} /> جميع الخدمات
              </Link>
            </div>

            {loading ? (
              <section className="pw-state">
                <LoaderCircle className="pw-spin" size={32} />
                <strong>جارٍ تحميل الأعمال...</strong>
              </section>
            ) : error ? (
              <section className="pw-state">
                <FileText size={34} />
                <strong>{error}</strong>
              </section>
            ) : items.length === 0 ? (
              <section className="pw-state">
                <FolderOpen size={38} />
                <h2>لا توجد أعمال منشورة حتى الآن</h2>
                <p>ستظهر الأعمال هنا تلقائيًا عند إضافتها ونشرها من لوحة الإدارة.</p>
              </section>
            ) : (
              <section className="pw-grid">
                {items.map((item) => {
                  const url = supabase.storage
                    .from(BUCKET)
                    .getPublicUrl(item.file_path).data.publicUrl

                  const isImage =
                    Boolean(item.mime_type?.startsWith('image/')) ||
                    /\.(png|jpe?g|webp|gif)$/i.test(item.file_name)

                  return (
                    <article className="pw-card" key={item.id}>
                      <a
                        className="pw-preview"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={'فتح ' + item.title}
                      >
                        {isImage ? (
                          <img src={url} alt={item.title} loading="lazy" />
                        ) : (
                          <div className="pw-file-preview">
                            <FileText size={48} />
                            <strong>{fileLabel(item)}</strong>
                            <span>{item.file_name}</span>
                          </div>
                        )}
                        <span className="pw-preview-label">
                          <ExternalLink size={15} /> معاينة العمل
                        </span>
                      </a>

                      <div className="pw-card-content">
                        <span className="pw-file-type">{fileLabel(item)}</span>
                        <h3>{item.title}</h3>
                        {item.description && <p>{item.description}</p>}

                        <a
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="pw-open"
                        >
                          فتح الملف <ArrowUpLeft size={16} />
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
          <div>
            <strong>هل تبحث عن خدمة أخرى؟</strong>
            <p>استكشف بقية نماذج الأعمال المنشورة.</p>
          </div>
          <Link href="/previous-works">
            جميع الخدمات <ArrowRight size={16} />
          </Link>
        </footer>
      </div>

      <style jsx>{`
        .pw-page{min-height:100vh;padding:30px 18px 65px;background:radial-gradient(ellipse at 50% 0%,#eaf1ff,transparent 38%),#f8faff;color:#17233d}
        .pw-container{max-width:1160px;margin:auto}
        .pw-breadcrumb{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:22px;color:#8994a8;font-size:12px}
        .pw-breadcrumb a{color:#52658a;text-decoration:none;font-weight:800}
        .pw-hero{display:flex;align-items:center;justify-content:space-between;gap:22px;padding:36px;border:1px solid #e3eaf4;border-radius:27px;background:linear-gradient(120deg,#fff 45%,var(--service-tint));box-shadow:0 15px 40px #203d740d;position:relative;overflow:hidden}
        .pw-hero:before{content:'';position:absolute;right:0;top:0;bottom:0;width:6px;background:var(--service-color)}
        .pw-hero-copy{max-width:760px}.pw-kicker{display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border-radius:30px;background:#fff;border:1px solid #e4eaf3;color:var(--service-color);font-size:12px;font-weight:850}
        .pw-hero h1{margin:15px 0 8px;font-size:clamp(27px,4vw,42px);font-weight:950;line-height:1.5}
        .pw-hero p{margin:0;color:#697791;font-size:14px;line-height:2}
        .pw-count{display:inline-flex;align-items:center;gap:7px;margin-top:16px;padding:8px 11px;background:white;border:1px solid #e5eaf2;border-radius:10px;color:#218263;font-size:12px;font-weight:800}
        .pw-hero-icon{display:grid;place-items:center;flex:0 0 86px;width:86px;height:86px;border-radius:25px;background:#ffffffc9;color:var(--service-color)}
        .pw-heading{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:38px 0 20px}
        .pw-heading>div>span{color:#2455c4;font-size:12px;font-weight:900}.pw-heading h2{margin:5px 0 0;font-size:27px;font-weight:950}
        .pw-back,.pw-footer>a{display:inline-flex;align-items:center;gap:7px;color:#3158a3;text-decoration:none;font-size:12px;font-weight:850}
        .pw-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}
        .pw-card{min-width:0;overflow:hidden;border:1px solid #e3eaf4;border-radius:21px;background:white;box-shadow:0 8px 26px #1a356308;transition:transform .2s,box-shadow .2s}
        .pw-card:hover{transform:translateY(-4px);box-shadow:0 16px 35px #1a356312}
        .pw-preview{position:relative;display:flex;align-items:center;justify-content:center;aspect-ratio:4/3;overflow:hidden;background:#f0f5ff;text-decoration:none}
        .pw-preview img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .3s}
        .pw-card:hover .pw-preview img{transform:scale(1.035)}
        .pw-file-preview{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;width:100%;height:100%;padding:20px;color:#315bb0;background:linear-gradient(145deg,#fff,#eaf1ff);text-align:center}
        .pw-file-preview strong{font-size:14px}.pw-file-preview span{max-width:100%;font-size:11px;color:#71809a;overflow-wrap:anywhere}
        .pw-preview-label{position:absolute;right:12px;bottom:12px;display:flex;align-items:center;gap:6px;padding:8px 10px;border-radius:10px;background:#ffffffed;color:#244b92;font-size:11px;font-weight:900}
        .pw-card-content{padding:17px}.pw-file-type{display:inline-block;padding:5px 8px;border-radius:8px;background:#eff4ff;color:#315bb0;font-size:10px;font-weight:900}
        .pw-card h3{margin:10px 0 7px;font-size:17px;font-weight:900;line-height:1.7;overflow-wrap:anywhere}
        .pw-card-content p{margin:0 0 15px;color:#758198;font-size:12px;line-height:1.9;overflow-wrap:anywhere}
        .pw-open,.pw-button{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:10px 13px;border-radius:11px;background:#2455c4;color:white;text-decoration:none;font-size:12px;font-weight:900}
        .pw-state{min-height:230px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:12px;padding:30px;border:1px solid #e3eaf4;border-radius:22px;background:#fff;text-align:center;color:#697791}
        .pw-state h1,.pw-state h2{margin:0;color:#263752}.pw-state p{max-width:520px;line-height:1.9;font-size:13px}.pw-state strong{color:#34435d}
        .pw-spin{animation:pw-spin 1s linear infinite;color:#2455c4}
        .pw-footer{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:34px;padding:20px;border:1px solid #e3eaf4;border-radius:18px;background:#fff}
        .pw-footer strong{font-size:13px}.pw-footer p{margin:5px 0 0;color:#7c879b;font-size:11px}
        .pw-footer>a{white-space:nowrap}
        @keyframes pw-spin{to{transform:rotate(360deg)}}
        @media(max-width:900px){.pw-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.pw-hero{padding:28px}}
        @media(max-width:600px){.pw-page{padding:20px 12px 40px}.pw-hero{padding:23px 16px;gap:12px;border-radius:21px}.pw-hero h1{font-size:24px}.pw-hero p{font-size:12px}.pw-hero-icon{flex-basis:52px;width:52px;height:52px;border-radius:16px}.pw-hero-icon :global(svg){width:27px;height:27px}.pw-heading{align-items:flex-start;margin:28px 0 15px}.pw-heading h2{font-size:23px}.pw-back{font-size:10px}.pw-grid{grid-template-columns:minmax(0,1fr);gap:14px}.pw-card{border-radius:18px}.pw-preview{aspect-ratio:5/3}.pw-card-content{padding:15px}.pw-footer{align-items:flex-start;flex-wrap:wrap;padding:15px}.pw-footer>a{margin-right:0}}
        @media(prefers-reduced-motion:reduce){.pw-card,.pw-preview img{transition:none}}
      `}</style>
    </main>
  )
}
