
'use client'

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  FolderOpen,
  LoaderCircle,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Upload,
  XCircle,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import './admin.css'

const BUCKET = 'hadeel-previous-works'
const MAX_FILE_SIZE = 25 * 1024 * 1024

const SERVICES = [
  { id: 'research', label: 'الخدمات البحثية والأكاديمية' },
  { id: 'reports', label: 'التقارير الجامعية' },
  { id: 'assignments', label: 'التكاليف الجامعية' },
  { id: 'homework', label: 'الواجبات الدراسية' },
  { id: 'lms', label: 'إدارة المنصات والمهام الدراسية' },
  { id: 'presentation', label: 'العروض التقديمية والتصميم' },
  { id: 'cv', label: 'السيرة الذاتية والخدمات المهنية' },
  { id: 'case-study', label: 'دراسة الحالة' },
  { id: 'feasibility', label: 'دراسات الجدوى' },
  { id: 'graduation', label: 'مشاريع التخرج' },
] as const

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/png',
  'image/jpeg',
  'image/webp',
]

type WorkItem = {
  id: string
  service_slug: string
  title: string
  description: string | null
  file_path: string
  file_name: string
  mime_type: string | null
  file_size: number | null
  is_published: boolean
  created_at: string
}

function formatSize(size: number | null) {
  if (!size) return 'حجم غير محدد'
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} كيلوبايت`
  return `${(size / (1024 * 1024)).toFixed(2)} ميجابايت`
}

function getServiceName(slug: string) {
  return SERVICES.find((service) => service.id === slug)?.label ?? slug
}

function getPublicUrl(path: string) {
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

export default function AdminPreviousWorksPage() {
  const router = useRouter()

  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [loadingItems, setLoadingItems] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)

  const [items, setItems] = useState<WorkItem[]>([])
  const [serviceSlug, setServiceSlug] =
    useState<(typeof SERVICES)[number]['id']>('research')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadItems = useCallback(async () => {
    setLoadingItems(true)
    setError('')

    try {
      const { data, error: queryError } = await supabase
        .from('previous_work_items')
        .select(
          'id, service_slug, title, description, file_path, file_name, mime_type, file_size, is_published, created_at'
        )
        .order('created_at', { ascending: false })

      if (queryError) throw queryError

      setItems((data ?? []) as WorkItem[])
    } catch (err) {
      setError(
        err instanceof Error
          ? `تعذر تحميل الأعمال: ${err.message}`
          : 'تعذر تحميل الأعمال السابقة.'
      )
    } finally {
      setLoadingItems(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    async function checkAdmin() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (!active) return

        if (userError || !user) {
          router.replace(
            '/auth/login?next=%2Fadmin%2Fprevious-works'
          )
          return
        }

        const { data, error: adminError } =
          await supabase.rpc('is_hadeel_admin')

        if (!active) return

        if (adminError) {
          setError(
            `تعذر التحقق من صلاحيات الإدارة: ${adminError.message}`
          )
          setChecking(false)
          return
        }

        if (data !== true) {
          setAllowed(false)
          setChecking(false)
          return
        }

        setAllowed(true)
        setChecking(false)
        await loadItems()
      } catch (err) {
        if (!active) return

        setError(
          err instanceof Error
            ? err.message
            : 'حدث خطأ أثناء التحقق من الحساب.'
        )
        setChecking(false)
      }
    }

    void checkAdmin()

    return () => {
      active = false
    }
  }, [router, loadItems])

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (!title.trim()) {
      setError('اكتب عنوان العمل أولاً.')
      return
    }

    if (!selectedFile) {
      setError('اختر الملف الذي تريد رفعه.')
      return
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('حجم الملف يتجاوز الحد المسموح، وهو 25 ميجابايت.')
      return
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError('نوع الملف غير مدعوم. استخدم PDF أو Word أو PowerPoint أو Excel أو صورة.')
      return
    }

    setUploading(true)

    let uploadedPath: string | null = null

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error('انتهت جلسة الدخول. سجل الدخول مجدداً.')
      }

      const safeName = selectedFile.name
        .normalize('NFKC')
        .replace(/[^\w.\-\u0600-\u06FF]/g, '_')
        .slice(-150)

      const filePath = `${serviceSlug}/${crypto.randomUUID()}-${safeName}`

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, selectedFile, {
          contentType: selectedFile.type || 'application/octet-stream',
          upsert: false,
        })

      if (uploadError) throw uploadError

      uploadedPath = filePath

      const { error: insertError } = await supabase
        .from('previous_work_items')
        .insert({
          service_slug: serviceSlug,
          title: title.trim(),
          description: description.trim() || null,
          file_path: filePath,
          file_name: selectedFile.name,
          mime_type: selectedFile.type || null,
          file_size: selectedFile.size,
          is_published: true,
          created_by: user.id,
        })

      if (insertError) throw insertError

      setTitle('')
      setDescription('')
      setSelectedFile(null)

      const form = event.currentTarget
      form.reset()

      setSuccess('تم رفع العمل وإضافته إلى قائمة الأعمال السابقة بنجاح.')
      await loadItems()
    } catch (err) {
      if (uploadedPath) {
        await supabase.storage.from(BUCKET).remove([uploadedPath])
      }

      setError(
        err instanceof Error
          ? `لم يكتمل رفع العمل: ${err.message}`
          : 'حدث خطأ أثناء رفع العمل.'
      )
    } finally {
      setUploading(false)
    }
  }

  async function togglePublished(item: WorkItem) {
    setError('')
    setSuccess('')
    setBusyId(item.id)

    try {
      const { error: updateError } = await supabase
        .from('previous_work_items')
        .update({ is_published: !item.is_published })
        .eq('id', item.id)

      if (updateError) throw updateError

      setItems((current) =>
        current.map((work) =>
          work.id === item.id
            ? { ...work, is_published: !work.is_published }
            : work
        )
      )

      setSuccess(
        item.is_published
          ? 'تم إخفاء العمل عن الزوار.'
          : 'تم نشر العمل للزوار.'
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? `تعذر تغيير حالة النشر: ${err.message}`
          : 'تعذر تغيير حالة النشر.'
      )
    } finally {
      setBusyId(null)
    }
  }

  async function deleteItem(item: WorkItem) {
    const confirmed = window.confirm(
      `هل أنت متأكد من حذف «${item.title}»؟ لا يمكن التراجع عن هذا الإجراء.`
    )

    if (!confirmed) return

    setError('')
    setSuccess('')
    setBusyId(item.id)

    try {
      const { error: deleteError } = await supabase
        .from('previous_work_items')
        .delete()
        .eq('id', item.id)

      if (deleteError) throw deleteError

      const { error: storageError } = await supabase.storage
        .from(BUCKET)
        .remove([item.file_path])

      setItems((current) =>
        current.filter((work) => work.id !== item.id)
      )

      if (storageError) {
        setError(
          'حُذف سجل العمل، لكن تعذر حذف الملف من التخزين. تحقق من صلاحيات التخزين.'
        )
      } else {
        setSuccess('تم حذف العمل وملفه بنجاح.')
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? `تعذر حذف العمل: ${err.message}`
          : 'حدث خطأ أثناء الحذف.'
      )
    } finally {
      setBusyId(null)
    }
  }

  async function handleLogout() {
    const { error: logoutError } = await supabase.auth.signOut()

    if (logoutError) {
      setError(`تعذر تسجيل الخروج: ${logoutError.message}`)
      return
    }

    router.replace('/auth/login')
  }

  if (checking) {
    return (
      <main className="hwa-page">
        <div className="hwa-state">
          <LoaderCircle className="hwa-spin" size={32} />
          <p>جارٍ التحقق من صلاحيات الدخول...</p>
        </div>
      </main>
    )
  }

  if (!allowed) {
    return (
      <main className="hwa-page">
        <section className="hwa-denied">
          <ShieldCheck size={48} />
          <h1>صفحة مخصصة للإدارة</h1>
          <p>
            {error ||
              'لا يملك هذا الحساب صلاحية إدارة الأعمال السابقة. سجل الدخول بحساب الإدارة المعتمد.'}
          </p>
          <Link href="/auth/login" className="hwa-back">
            <ArrowRight size={18} />
            العودة إلى تسجيل الدخول
          </Link>
          <Link href="/previous-works" className="hwa-back">
            عرض الأعمال السابقة
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="hwa-page">
      <header className="hwa-header">
        <Link href="/previous-works" className="hwa-back">
          <ArrowRight size={18} />
          صفحة الأعمال السابقة
        </Link>

        <button
          type="button"
          className="hwa-logout"
          onClick={handleLogout}
        >
          <LogOut size={17} />
          تسجيل الخروج
        </button>
      </header>

      <section className="hwa-hero">
        <div className="hwa-hero-icon">
          <FolderOpen size={32} />
        </div>
        <span>منصة هديل · لوحة التحكم</span>
        <h1>إدارة الأعمال السابقة</h1>
        <p>
          أضف نماذج أعمالك وصنّفها حسب الخدمة، وتحكّم في ظهورها
          للزوار من مكان واحد.
        </p>
      </section>

      {error && (
        <div className="hwa-alert hwa-alert-error" role="alert">
          <XCircle size={18} style={{ verticalAlign: 'middle', marginLeft: 6 }} />
          {error}
        </div>
      )}

      {success && (
        <div className="hwa-alert hwa-alert-success" role="status">
          <CheckCircle2
            size={18}
            style={{ verticalAlign: 'middle', marginLeft: 6 }}
          />
          {success}
        </div>
      )}

      <div className="hwa-layout">
        <section className="hwa-panel hwa-upload-panel">
          <div className="hwa-panel-title">
            <div className="hwa-title-icon">
              <Upload size={23} />
            </div>
            <div>
              <h2>إضافة عمل جديد</h2>
              <p>ارفع الملف وأضف بياناته</p>
            </div>
          </div>

          <form className="hwa-form" onSubmit={handleUpload}>
            <label htmlFor="hwa-service">الخدمة</label>
            <select
              id="hwa-service"
              value={serviceSlug}
              onChange={(event) =>
                setServiceSlug(
                  event.target.value as (typeof SERVICES)[number]['id']
                )
              }
              required
            >
              {SERVICES.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.label}
                </option>
              ))}
            </select>

            <label htmlFor="hwa-title">عنوان العمل</label>
            <input
              id="hwa-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="مثال: نموذج بحث أكاديمي"
              minLength={2}
              maxLength={180}
              required
            />

            <label htmlFor="hwa-description">
              وصف العمل <span>(اختياري)</span>
            </label>
            <textarea
              id="hwa-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="اكتب وصفًا مختصرًا للعمل..."
              rows={4}
              maxLength={2000}
            />

            <label htmlFor="hwa-file">الملف</label>
            <input
              id="hwa-file"
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg,.webp"
              onChange={(event) =>
                setSelectedFile(event.target.files?.[0] ?? null)
              }
              required
            />

            <p className="hwa-hint">
              الصيغ المدعومة: PDF وWord وPowerPoint وExcel والصور.
              الحد الأقصى 25 ميجابايت.
            </p>

            {selectedFile && (
              <div className="hwa-selected-file">
                <FileText size={19} />
                <span>{selectedFile.name}</span>
                <small>{formatSize(selectedFile.size)}</small>
              </div>
            )}

            <button
              type="submit"
              className="hwa-primary hwa-submit"
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <LoaderCircle className="hwa-spin" size={19} />
                  جارٍ الرفع...
                </>
              ) : (
                <>
                  <Upload size={19} />
                  رفع العمل ونشره
                </>
              )}
            </button>
          </form>
        </section>

        <section className="hwa-panel hwa-list-panel">
          <div className="hwa-panel-title hwa-list-heading">
            <div className="hwa-title-icon hwa-title-icon-purple">
              <BookOpen size={23} />
            </div>
            <div>
              <h2>الأعمال المضافة</h2>
              <p>
                إجمالي الأعمال: {items.length} · المنشور:{' '}
                {items.filter((item) => item.is_published).length}
              </p>
            </div>
            <button
              type="button"
              className="hwa-refresh"
              title="تحديث القائمة"
              aria-label="تحديث القائمة"
              onClick={() => void loadItems()}
              disabled={loadingItems}
            >
              <RefreshCw
                size={18}
                className={loadingItems ? 'hwa-spin' : ''}
              />
            </button>
          </div>

          {loadingItems && items.length === 0 ? (
            <div className="hwa-state">
              <LoaderCircle className="hwa-spin" size={28} />
              <p>جارٍ تحميل الأعمال...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="hwa-empty">
              <FolderOpen size={38} />
              <strong>لا توجد أعمال مضافة حتى الآن</strong>
              <span>استخدم نموذج الإضافة لرفع أول عمل.</span>
            </div>
          ) : (
            <div className="hwa-items">
              {items.map((item) => (
                <article className="hwa-item" key={item.id}>
                  <div className="hwa-item-file">
                    <FileText size={22} />
                  </div>

                  <div className="hwa-item-main">
                    <div className="hwa-item-title-row">
                      <h3>{item.title}</h3>
                      <span
                        className={`hwa-status ${
                          item.is_published
                            ? 'hwa-status-live'
                            : 'hwa-status-hidden'
                        }`}
                      >
                        {item.is_published ? 'منشور' : 'مخفي'}
                      </span>
                    </div>

                    <p>{getServiceName(item.service_slug)}</p>

                    {item.description && (
                      <p className="hwa-item-description">
                        {item.description}
                      </p>
                    )}

                    <small>
                      {item.file_name} · {formatSize(item.file_size)}
                    </small>

                    <small>
                      تاريخ الإضافة:{' '}
                      {new Date(item.created_at).toLocaleDateString('ar-SA')}
                    </small>

                    <div className="hwa-item-actions">
                      <a
                        href={getPublicUrl(item.file_path)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={14} />
                        فتح الملف
                      </a>

                      <button
                        type="button"
                        onClick={() => void togglePublished(item)}
                        disabled={busyId === item.id}
                      >
                        {item.is_published ? (
                          <>
                            <EyeOff size={14} />
                            إخفاء
                          </>
                        ) : (
                          <>
                            <Eye size={14} />
                            نشر
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        className="hwa-delete"
                        onClick={() => void deleteItem(item)}
                        disabled={busyId === item.id}
                      >
                        {busyId === item.id ? (
                          <LoaderCircle className="hwa-spin" size={14} />
                        ) : (
                          <Trash2 size={14} />
                        )}
                        حذف
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="hwa-security-note">
        <ShieldCheck size={17} />
        هذه الصفحة مخصصة لحسابات الإدارة المصرّح لها فقط.
      </div>
    </main>
  )
}
