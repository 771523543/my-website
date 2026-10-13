'use client'

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
const BUCKET = 'request-attachments'

const categories = [
  { value: 'research', label: 'كتابة الأبحاث وتقارير التخرج', icon: FileText },
  { value: 'data', label: 'تحليل البيانات وتفريغ الاستبانات (SPSS / Excel)', icon: BarChart3 },
  { value: 'presentations', label: 'تصميم العروض التقديمية (PowerPoint)', icon: Presentation },
  { value: 'software', label: 'مشاريع وبرمجيات (علوم حاسب / تصميم مواقع)', icon: Code2 },
  { value: 'study', label: 'تلخيص المقررات وحل الواجبات', icon: BookOpen },
  { value: 'other', label: 'أخرى (تحديد يدوي)', icon: Wrench },
] as const

const allowedExtensions = /\.(pdf|doc|docx|ppt|pptx|xls|xlsx|png|jpe?g|webp)$/i

function safeFileName(name: string) {
  return name
    .normalize('NFKD')
    .replace(/[^\w.-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(-100) || 'attachment'
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

      const selectedCategory = categories.find(item => item.value === category)
      const categoryName =
        category === 'other'
          ? otherCategory.trim()
          : selectedCategory?.label ?? ''

      const { data: serviceData, error: serviceError } = await supabase
        .from('services')
        .select('id,slug')
        .eq('is_active', true)
        .eq('slug', category)
        .maybeSingle()

      if (serviceError) throw serviceError

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
          service_id: serviceData?.id ?? null,
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
        const path = `${user.id}/${inserted.id}/${crypto.randomUUID()}-${safeFileName(file.name)}`

        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, {
            cacheControl: '3600',
            contentType: file.type || 'application/octet-stream',
            upsert: false,
          })

        if (uploadError) {
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
        setSuccess('تم إرسال طلبك بنجاح! يمكنك متابعة حالته من صفحة طلباتي.')
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
      <main className="request-page">
        <div className="loading-card">
          <LoaderCircle className="spin" size={30} />
          <p>جارٍ تجهيز صفحة الطلب...</p>
        </div>
        <RequestStyles />
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
                  <div className="file-item" key={`${file.name}-${file.lastModified}`}>
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
                  <p className="request-number">
                    رقم الطلب: {requestId}
                  </p>
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
                <LoaderCircle className="spin" size={21} />
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

      <RequestStyles />
    </main>
  )
}

function RequestStyles() {
  return (
    <style jsx global>{`
      .request-page {
        --request-blue: #2459a9;
        --request-blue-dark: #173e78;
        --request-yellow: #f5c542;
        --request-text: #243247;
        --request-muted: #6b778c;
        --request-border: #dfe6f0;
        min-height: 100vh;
        padding: 28px 16px 64px;
        background: #f4f6fa;
        color: var(--request-text);
        direction: rtl;
      }

      .request-shell {
        width: 100%;
        max-width: 850px;
        margin: 0 auto;
      }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin: 0 0 18px;
        color: var(--request-blue);
        font-weight: 700;
        text-decoration: none;
      }

      .welcome-card {
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        padding: 32px 26px;
        border-radius: 22px;
        background: linear-gradient(140deg, #2459a9 0%, #173e78 100%);
        color: #fff;
        text-align: center;
        box-shadow: 0 12px 32px rgb(36 89 169 / 16%);
      }

      .welcome-card::before,
      .welcome-card::after {
        content: '';
        position: absolute;
        border: 1px solid rgb(255 255 255 / 12%);
        border-radius: 50%;
        pointer-events: none;
      }

      .welcome-card::before {
        width: 210px;
        height: 210px;
        top: -135px;
        left: -70px;
      }

      .welcome-card::after {
        width: 150px;
        height: 150px;
        right: -95px;
        bottom: -95px;
      }

      .brand-icon {
        display: grid;
        place-items: center;
        width: 66px;
        height: 66px;
        border-radius: 20px;
        background: #fff;
        color: var(--request-blue);
        box-shadow: 0 5px 15px rgb(0 0 0 / 10%);
      }

      .welcome-card h1 {
        margin: 0;
        font-size: clamp(23px, 4vw, 31px);
        line-height: 1.6;
        font-weight: 850;
      }

      .welcome-card h1 span {
        display: inline-block;
        padding: 4px 14px;
        border-radius: 10px;
        background: var(--request-yellow);
        color: #17365d;
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;
      }

      .welcome-card p {
        max-width: 630px;
        margin: 0;
        color: #fff;
        font-size: 15px;
        line-height: 2;
      }

      .request-form {
        margin-top: 22px;
        padding: 10px 26px 26px;
        border: 1px solid #e8edf5;
        border-radius: 22px;
        background: #fff;
        box-shadow: 0 8px 28px rgb(25 48 84 / 5%);
      }

      .form-section {
        padding: 24px 0;
        border-bottom: 1px solid #edf0f5;
      }

      .form-section:last-of-type {
        border-bottom: 0;
      }

      .section-heading {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-bottom: 19px;
      }

      .section-number {
        display: grid;
        flex: 0 0 36px;
        place-items: center;
        width: 36px;
        height: 36px;
        border-radius: 12px;
        background: #eaf1ff;
        color: var(--request-blue);
        font-size: 16px;
        font-weight: 850;
      }

      .section-heading h2 {
        margin: 0 0 4px;
        color: #1c3559;
        font-size: 18px;
        font-weight: 800;
        line-height: 1.6;
      }

      .section-heading p {
        margin: 0;
        color: var(--request-muted);
        font-size: 13px;
        line-height: 1.8;
      }

      .category-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .category-option {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        min-height: 76px;
        padding: 13px;
        border: 1px solid var(--request-border);
        border-radius: 14px;
        background: #fff;
        color: var(--request-text);
        text-align: right;
        cursor: pointer;
        transition: border-color 160ms ease, background 160ms ease;
      }

      .category-option:hover {
        border-color: #9bb7e8;
        background: #f8faff;
      }

      .category-option.selected {
        border-color: var(--request-blue);
        background: #eef4ff;
        box-shadow: inset 0 0 0 1px var(--request-blue);
      }

      .category-icon {
        display: grid;
        flex: 0 0 42px;
        place-items: center;
        width: 42px;
        height: 42px;
        border-radius: 12px;
        background: #edf3ff;
        color: var(--request-blue);
      }

      .category-label {
        flex: 1;
        font-size: 13px;
        font-weight: 700;
        line-height: 1.8;
      }

      .radio-dot {
        position: relative;
        flex: 0 0 18px;
        width: 18px;
        height: 18px;
        border: 1.5px solid #c4cedd;
        border-radius: 50%;
      }

      .category-option.selected .radio-dot {
        border: 5px solid var(--request-blue);
      }

      .field {
        display: flex;
        flex-direction: column;
        gap: 9px;
      }

      .field label {
        color: #263852;
        font-size: 14px;
        font-weight: 750;
      }

      .field input,
      .field textarea {
        width: 100%;
        min-width: 0;
        padding: 14px 15px;
        border: 1px solid #dce4ef;
        border-radius: 12px;
        outline: none;
        background: #fff;
        color: #263852;
        font: inherit;
        font-size: 14px;
        line-height: 1.8;
        transition: border-color 160ms ease, box-shadow 160ms ease;
      }

      .field input:focus,
      .field textarea:focus {
        border-color: var(--request-blue);
        box-shadow: 0 0 0 3px rgb(36 89 169 / 10%);
      }

      .field input::placeholder,
      .field textarea::placeholder {
        color: #9aa5b5;
        opacity: 1;
      }

      .field textarea {
        resize: vertical;
        min-height: 150px;
      }

      .field-hint {
        color: var(--request-muted);
        font-size: 12px;
        text-align: left;
      }

      .other-field {
        margin-top: 15px;
      }

      .date-field {
        display: flex;
        align-items: center;
        gap: 10px;
        padding-right: 14px;
        border: 1px solid #dce4ef;
        border-radius: 12px;
        color: var(--request-blue);
      }

      .date-field input {
        border: 0;
        box-shadow: none !important;
      }

      .notice {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-top: 14px;
        padding: 13px 14px;
        border: 1px solid #f5e5b6;
        border-radius: 12px;
        background: #fff9e8;
        color: #805d11;
      }

      .notice svg {
        flex: 0 0 auto;
        margin-top: 2px;
      }

      .notice p {
        margin: 0;
        font-size: 13px;
        line-height: 1.9;
      }

      .upload-zone {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        min-height: 195px;
        padding: 24px 15px;
        border: 1.5px dashed #9db6dc;
        border-radius: 16px;
        background: #f8faff;
        color: #263852;
        text-align: center;
        cursor: pointer;
        transition: background 160ms ease, border-color 160ms ease;
      }

      .upload-zone:hover,
      .upload-zone.dragging {
        border-color: var(--request-blue);
        background: #edf4ff;
      }

      .upload-icon {
        display: grid;
        place-items: center;
        width: 54px;
        height: 54px;
        border-radius: 16px;
        background: #e5eeff;
        color: var(--request-blue);
      }

      .upload-zone strong {
        font-size: 14px;
      }

      .upload-zone > span:not(.upload-icon) {
        color: var(--request-muted);
        font-size: 12px;
        line-height: 1.8;
      }

      .upload-zone .upload-limit {
        color: #7d899c;
        font-size: 11px;
      }

      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        clip-path: inset(50%);
      }

      .file-list {
        display: grid;
        gap: 9px;
        margin-top: 12px;
      }

      .file-item {
        display: flex;
        align-items: center;
        gap: 11px;
        min-width: 0;
        padding: 12px;
        border: 1px solid var(--request-border);
        border-radius: 12px;
        color: var(--request-blue);
      }

      .file-info {
        display: flex;
        flex: 1;
        flex-direction: column;
        min-width: 0;
        gap: 3px;
      }

      .file-info strong {
        overflow-wrap: anywhere;
        color: #263852;
        font-size: 13px;
      }

      .file-info span {
        color: var(--request-muted);
        font-size: 11px;
      }

      .remove-file {
        display: grid;
        flex: 0 0 34px;
        place-items: center;
        width: 34px;
        height: 34px;
        border: 0;
        border-radius: 9px;
        background: #fff0f0;
        color: #bd3333;
        cursor: pointer;
      }

      .feedback {
        display: flex;
        align-items: flex-start;
        gap: 11px;
        margin: 18px 0;
        padding: 14px;
        border-radius: 12px;
        font-size: 13px;
        line-height: 1.9;
      }

      .feedback > svg {
        flex: 0 0 auto;
        margin-top: 2px;
      }

      .feedback p {
        margin: 5px 0;
      }

      .error-feedback {
        border: 1px solid #f3c7c7;
        background: #fff4f4;
        color: #a12b2b;
      }

      .success-feedback {
        border: 1px solid #b9e7cb;
        background: #f0fbf4;
        color: #176b3b;
      }

      .request-number {
        overflow-wrap: anywhere;
        font-size: 12px;
      }

      .requests-link {
        display: inline-block;
        margin-top: 5px;
        color: var(--request-blue);
        font-weight: 800;
        text-decoration: underline;
      }

      .submit-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        min-height: 54px;
        margin-top: 22px;
        padding: 14px 20px;
        border: 0;
        border-radius: 14px;
        background: var(--request-yellow);
        color: #17365d;
        font: inherit;
        font-size: 15px;
        font-weight: 850;
        cursor: pointer;
        box-shadow: 0 5px 14px rgb(245 197 66 / 22%);
        transition: transform 160ms ease, filter 160ms ease;
      }

      .submit-button:hover:not(:disabled) {
        filter: brightness(0.97);
        transform: translateY(-1px);
      }

      .submit-button:disabled {
        opacity: 0.7;
        cursor: wait;
      }

      .privacy-note {
        margin: 13px 0 0;
        color: var(--request-muted);
        font-size: 12px;
        line-height: 1.9;
        text-align: center;
      }

      .loading-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        min-height: 55vh;
        color: var(--request-blue);
      }

      .loading-card p {
        color: var(--request-muted);
      }

      .spin {
        animation: request-spin 1s linear infinite;
      }

      @keyframes request-spin {
        to {
          transform: rotate(360deg);
        }
      }

      @media (max-width: 600px) {
        .request-page {
          padding: 16px 11px 36px;
        }

        .welcome-card {
          gap: 13px;
          padding: 25px 17px;
          border-radius: 18px;
        }

        .welcome-card p {
          font-size: 13px;
          line-height: 1.95;
        }

        .brand-icon {
          width: 58px;
          height: 58px;
          border-radius: 17px;
        }

        .request-form {
          margin-top: 15px;
          padding: 5px 15px 19px;
          border-radius: 18px;
        }

        .form-section {
          padding: 21px 0;
        }

        .category-grid {
          grid-template-columns: minmax(0, 1fr);
          gap: 9px;
        }

        .category-option {
          min-height: 66px;
          padding: 10px;
        }

        .category-label {
          font-size: 12px;
        }

        .section-heading h2 {
          font-size: 16px;
        }

        .field input,
        .field textarea {
          font-size: 13px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .spin {
          animation-duration: 2s;
        }

        .category-option,
        .field input,
        .field textarea,
        .upload-zone,
        .submit-button {
          transition: none;
        }
      }
    `}</style>
  )
}