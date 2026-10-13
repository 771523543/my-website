
'use client'

import './request-service.css'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  GraduationCap,
  FileText,
  BarChart3,
  Presentation,
  Code2,
  BookOpen,
  Wrench,
  UploadCloud,
  File as FileIcon,
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  LoaderCircle,
  CalendarDays,
  ArrowRight,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const MAX_FILES = 5
const BUCKET = 'hadeel-request-files'

const categories = [
  { value: 'research', label: 'كتابة الأبحاث وتقارير التخرج', icon: FileText },
  {
    value: 'data',
    label: 'تحليل البيانات وتفريغ الاستبانات (SPSS / Excel)',
    icon: BarChart3,
  },
  {
    value: 'presentations',
    label: 'تصميم العروض التقديمية (PowerPoint)',
    icon: Presentation,
  },
  {
    value: 'software',
    label: 'مشاريع وبرمجيات (علوم حاسب / تصميم مواقع)',
    icon: Code2,
  },
  {
    value: 'study',
    label: 'تلخيص المقررات وحل الواجبات',
    icon: BookOpen,
  },
  { value: 'other', label: 'أخرى (تحديد يدوي)', icon: Wrench },
] as const

const serviceSlugByCategory: Record<string, string | null> = {
  research: 'research',
  data: 'reports',
  presentations: 'presentations',
  software: 'graduation-projects',
  study: 'assignments',
  other: null,
}

const allowedExtensions =
  /\.(pdf|doc|docx|ppt|pptx|xls|xlsx|png|jpe?g|webp)$/i

function safeFileName(name: string) {
  return (
    name
      .normalize('NFKD')
      .replace(/[^\w.-]+/g, '_')
      .replace(/^_+|_+$/g, '')
      .slice(-100) || 'attachment'
  )
}

function tomorrowDate() {
  const date = new Date()
  date.setDate(date.getDate() + 1)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default function RequestServicePage() {
  const router = useRouter()
  const fileInput = useRef<HTMLInputElement>(null)

  const [category, setCategory] = useState<string>('research')
  const [otherCategory, setOtherCategory] = useState('')
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [deadline, setDeadline] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [requestId, setRequestId] = useState('')

  useEffect(() => {
    let active = true

    async function checkUser() {
      const { data, error: authError } = await supabase.auth.getUser()

      if (!active) return

      if (authError || !data.user) {
        router.replace('/auth/login?next=%2Frequest-service')
        return
      }

      setLoading(false)
    }

    void checkUser()

    return () => {
      active = false
    }
  }, [router])

  function addFiles(incoming: FileList | File[]) {
    setError('')

    const selected = Array.from(incoming)
    const combined = [...files]

    for (const file of selected) {
      if (!allowedExtensions.test(file.name)) {
        setError(`نوع الملف غير مسموح: ${file.name}`)
        continue
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(`حجم الملف ${file.name} أكبر من 10 ميجابايت.`)
        continue
      }

      if (combined.length >= MAX_FILES) {
        setError(`الحد الأقصى هو ${MAX_FILES} ملفات لكل طلب.`)
        break
      }

      const duplicate = combined.some(
        item =>
          item.name === file.name &&
          item.size === file.size &&
          item.lastModified === file.lastModified
      )

      if (!duplicate) combined.push(file)
    }

    setFiles(combined)
  }

  function removeFile(index: number) {
    setFiles(current => current.filter((_, i) => i !== index))
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')
    setRequestId('')

    if (category === 'other' && !otherCategory.trim()) {
      setError('يرجى كتابة اسم الخدمة التي تحتاجها.')
      return
    }

    if (title.trim().length < 3) {
      setError('يرجى كتابة عنوان واضح للطلب.')
      return
    }

    if (details.trim().length < 10) {
      setError('يرجى كتابة تفاصيل الطلب بشكل أوضح (10 أحرف على الأقل).')
      return
    }

    if (deadline && deadline < tomorrowDate()) {
      setError('يرجى اختيار موعد تسليم يبدأ من الغد على الأقل.')
      return
    }

    setSaving(true)

    let savedRequestId = ''

    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser()

      const user = authData.user

      if (authError || !user) {
        router.replace('/auth/login?next=%2Frequest-service')
        return
      }

      const selectedCategory = categories.find(
        item => item.value === category
      )

      const categoryName =
        category === 'other'
          ? otherCategory.trim()
          : selectedCategory?.label ?? ''

      let serviceId: string | null = null
      const serviceSlug = serviceSlugByCategory[category]

      if (serviceSlug) {
        const { data: serviceData, error: serviceError } = await supabase
          .from('services')
          .select('id,slug')
          .eq('is_active', true)
          .eq('slug', serviceSlug)
          .maybeSingle()

        if (serviceError) throw serviceError

        serviceId = serviceData?.id ?? null
      }

      const requestDetails = [
        `تصنيف الخدمة: ${categoryName}`,
        `تفاصيل الطلب:\n${details.trim()}`,
        deadline ? `تاريخ التسليم المطلوب: ${deadline}` : '',
      ]
        .filter(Boolean)
        .join('\n\n')

      const { data: inserted, error: insertError } = await supabase
        .from('service_requests')
        .insert({
          student_id: user.id,
          service_id: serviceId,
          title: title.trim(),
          details: requestDetails,
        })
        .select('id')
        .single()

      if (insertError) throw insertError

      savedRequestId = inserted.id
      setRequestId(inserted.id)

      const uploadErrors: string[] = []

      for (const file of files) {
        // يجب أن يبدأ المسار بمعرّف الطلب حتى تطابقه سياسات التخزين.
        const path = `${inserted.id}/${crypto.randomUUID()}-${safeFileName(file.name)}`

        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, {
            cacheControl: '3600',
            contentType: file.type || 'application/octet-stream',
            upsert: false,
          })

        if (uploadError) {
          console.error('Attachment upload error:', uploadError)
          uploadErrors.push(file.name)
          continue
        }

        const { error: attachmentError } = await supabase
          .from('request_attachments')
          .insert({
            request_id: inserted.id,
            file_name: file.name,
            storage_path: path,
            content_type: file.type || null,
            file_size: file.size,
            uploaded_by: user.id,
          })

        if (attachmentError) {
          console.error('Attachment record error:', attachmentError)
          uploadErrors.push(file.name)

          await supabase.storage.from(BUCKET).remove([path])
        }
      }

      setTitle('')
      setDetails('')
      setDeadline('')
      setFiles([])
      setCategory('research')
      setOtherCategory('')

      if (uploadErrors.length > 0) {
        setError(
          `تم حفظ الطلب، لكن تعذر إرفاق بعض الملفات: ${uploadErrors.join('، ')}. يمكنك إعادة المحاولة لاحقًا.`
        )
      } else {
        setSuccess(
          'تم إرسال طلبك بنجاح! يمكنك متابعة حالته من صفحة طلباتي.'
        )
      }
    } catch (err) {
      console.error('Request submission error:', err)

      if (savedRequestId) {
        setSuccess('تم حفظ الطلب. يمكنك متابعة حالته من صفحة طلباتي.')
      } else {
        setError(
          'تعذر إرسال الطلب. تحقق من اتصالك بالإنترنت ثم حاول مرة أخرى.'
        )
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="request-page" dir="rtl">
        <div className="loading-card">
          <LoaderCircle className="request-spin" size={30} />
          <p>جارٍ تجهيز صفحة الطلب...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="request-page" dir="rtl">
      <div className="request-shell">
        <Link href="/" className="back-link">
          <ArrowRight size={18} />
          العودة إلى الرئيسية
        </Link>

        <header className="welcome-card">
          <div className="brand-icon">
            <GraduationCap size={37} strokeWidth={1.8} />
          </div>

          <h1>
            <span>أهلاً بك في منصة هديل 🎓</span>
          </h1>

          <p>
            نحن نحرص على خدمتك وتلبية طلبك بدقة وسرعة. أخبرنا بالخدمة التي
            تحتاجها وقدم تفاصيلها لنبدأ العمل عليها فوراً.
          </p>
        </header>

        <form className="request-form" onSubmit={submitRequest}>
          <section className="form-section">
            <div className="section-heading">
              <span className="section-number">1</span>
              <div>
                <h2>اختر تصنيف الخدمة</h2>
                <p>حدد التصنيف الأقرب إلى الخدمة التي تحتاجها.</p>
              </div>
            </div>

            <div className="category-grid">
              {categories.map(item => {
                const Icon = item.icon
                const active = category === item.value

                return (
                  <button
                    key={item.value}
                    type="button"
                    className={`category-option ${active ? 'selected' : ''}`}
                    onClick={() => setCategory(item.value)}
                    aria-pressed={active}
                  >
                    <span className="category-icon">
                      <Icon size={22} />
                    </span>
                    <span className="category-label">{item.label}</span>
                    <span className="radio-dot" aria-hidden="true" />
                  </button>
                )
              })}
            </div>

            {category === 'other' && (
              <div className="field other-field">
                <label htmlFor="otherCategory">اسم الخدمة المطلوبة *</label>
                <input
                  id="otherCategory"
                  value={otherCategory}
                  onChange={event => setOtherCategory(event.target.value)}
                  placeholder="اكتب اسم الخدمة التي تحتاجها"
                  required
                  maxLength={150}
                />
              </div>
            )}
          </section>

          <section className="form-section">
            <div className="section-heading">
              <span className="section-number">2</span>
              <div>
                <h2>عنوان الطلب باختصار</h2>
                <p>اكتب عنوانًا يوضح المطلوب مباشرة.</p>
              </div>
            </div>

            <div className="field">
              <label htmlFor="requestTitle">عنوان الطلب *</label>
              <input
                id="requestTitle"
                value={title}
                onChange={event => setTitle(event.target.value)}
                placeholder="مثال: بحث تخرج في تخصص التمريض - إدارة الجودة الشاملة"
                required
                minLength={3}
                maxLength={180}
              />
            </div>
          </section>

          <section className="form-section">
            <div className="section-heading">
              <span className="section-number">3</span>
              <div>
                <h2>تفاصيل الطلب وشروطه</h2>
                <p>كلما كانت التفاصيل أوضح، ساعدنا ذلك على فهم طلبك.</p>
              </div>
            </div>

            <div className="field">
              <label htmlFor="requestDetails">تفاصيل الطلب *</label>
              <textarea
                id="requestDetails"
                value={details}
                onChange={event => setDetails(event.target.value)}
                placeholder="اكتب تفاصيل طلبك بدقة، عدد الصفحات المطلوبة، المراجع، أو أي تعليمات خاصة أرسلها الأستاذ..."
                required
                minLength={10}
                maxLength={10000}
                rows={6}
              />
              <span className="field-hint">
                {details.length.toLocaleString('ar')} / 10000
              </span>
            </div>
          </section>

          <section className="form-section">
            <div className="section-heading">
              <span className="section-number">4</span>
              <div>
                <h2>تاريخ التسليم المطلوب</h2>
                <p>حدد الموعد الذي تحتاج فيه إلى إنجاز الخدمة.</p>
              </div>
            </div>

            <div className="field">
              <label htmlFor="deadline">موعد التسليم (اختياري)</label>
              <div className="date-field">
                <CalendarDays size={20} />
                <input
                  id="deadline"
                  type="date"
                  min={tomorrowDate()}
                  value={deadline}
                  onChange={event => setDeadline(event.target.value)}
                />
              </div>
            </div>

            <div className="notice">
              <AlertCircle size={19} />
              <p>
                يرجى اختيار موعد يسبق الموعد النهائي لتسليم العمل بيوم على
                الأقل.
              </p>
            </div>
          </section>

          <section className="form-section">
            <div className="section-heading">
              <span className="section-number">5</span>
              <div>
                <h2>إرفاق الملفات والمستندات</h2>
                <p>أرفق الشروط أو النماذج أو المراجع إن وجدت.</p>
              </div>
            </div>

            <button
              type="button"
              className={`upload-zone ${dragging ? 'dragging' : ''}`}
              onClick={() => fileInput.current?.click()}
              onDragOver={event => {
                event.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={event => {
                event.preventDefault()
                setDragging(false)
                addFiles(event.dataTransfer.files)
              }}
            >
              <span className="upload-icon">
                <UploadCloud size={30} />
              </span>
              <strong>اضغط لاختيار الملفات أو اسحبها إلى هنا</strong>
              <span>PDF وWord وPowerPoint وExcel والصور</span>
              <span className="upload-limit">
                بحد أقصى 5 ملفات، وحجم 10 ميجابايت لكل ملف
              </span>
            </button>

            <input
              ref={fileInput}
              type="file"
              className="visually-hidden"
              multiple
              accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg,.webp"
              onChange={event => {
                if (event.target.files) addFiles(event.target.files)
                event.target.value = ''
              }}
            />

            {files.length > 0 && (
              <div className="file-list">
                {files.map((file, index) => (
                  <div
                    className="file-item"
                    key={`${file.name}-${file.lastModified}`}
                  >
                    <FileIcon size={20} />
                    <div className="file-info">
                      <strong>{file.name}</strong>
                      <span>
                        {(file.size / (1024 * 1024)).toFixed(2)} ميجابايت
                      </span>
                    </div>
                    <button
                      type="button"
                      className="remove-file"
                      aria-label={`حذف ${file.name}`}
                      onClick={() => removeFile(index)}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {error && (
            <div className="feedback error-feedback" role="alert">
              <AlertCircle size={21} />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="feedback success-feedback" role="status">
              <CheckCircle2 size={22} />
              <div>
                <strong>{success}</strong>
                {requestId && (
                  <p className="request-number">رقم الطلب: {requestId}</p>
                )}
                <Link href="/account/requests" className="requests-link">
                  متابعة طلباتي
                </Link>
              </div>
            </div>
          )}

          <button type="submit" className="submit-button" disabled={saving}>
            {saving ? (
              <>
                <LoaderCircle className="request-spin" size={21} />
                جارٍ إرسال الطلب...
              </>
            ) : (
              <>
                <Send size={20} />
                إرسال الطلب
              </>
            )}
          </button>

          <p className="privacy-note">
            بإرسال الطلب، سيتم حفظ تفاصيله ضمن حسابك لتتمكن من متابعة حالته.
          </p>
        </form>
      </div>
    </main>
  )
}
