
'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Send, ClipboardList, FileText, X } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { services, whatsappNumber } from '@/app/components/Services'

const serviceSlugMap: Record<string, string> = {
  research: 'research',
  reports: 'reports',
  assignments: 'assignments',
  homework: 'assignments',
  lms: 'assignments',
  presentation: 'presentations',
  cv: 'cv',
  'case-study': 'research',
  feasibility: 'research',
  graduation: 'graduation-projects',
}

const MAX_FILE_SIZE = 25 * 1024 * 1024
const MAX_FILES = 5
const BUCKET = 'hadeel-request-files'

type SelectedFile = { key: string; file: File }

function safeFileName(name: string) {
  return name.normalize('NFKC').replace(/[^\p{L}\p{N}._-]/gu, '_').slice(-150) || 'file'
}

export default function ServiceOrderPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const service = services.find((item) => item.id === params.id)

  const [userId, setUserId] = useState('')
  const [details, setDetails] = useState('')
  const [deadline, setDeadline] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [attachmentError, setAttachmentError] = useState('')
  const [createdId, setCreatedId] = useState('')

  useEffect(() => {
    let active = true

    async function checkUser() {
      try {
        const { data, error } = await supabase.auth.getUser()

        if (!active) return

        if (error || !data.user) {
          router.replace(
            `/auth/login?next=${encodeURIComponent(`/services/order/${params.id}`)}`
          )
          return
        }

        setUserId(data.user.id)
      } catch {
        if (active) {
          setError('تعذر التحقق من حسابك. حاول تسجيل الدخول مجددًا.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void checkUser()

    return () => {
      active = false
    }
  }, [params.id, router])

  function addFiles(fileList: FileList | null) {
    if (!fileList?.length) return

    setError('')
    setAttachmentError('')

    const incoming = Array.from(fileList)
    const existingKeys = new Set(
      selectedFiles.map(
        ({ file }) => `${file.name}:${file.size}:${file.lastModified}`
      )
    )

    const fresh = incoming.filter(
      (file) =>
        !existingKeys.has(`${file.name}:${file.size}:${file.lastModified}`)
    )

    if (selectedFiles.length + fresh.length > MAX_FILES) {
      setError(`يمكن إرفاق ${MAX_FILES} ملفات كحد أقصى للطلب.`)
      return
    }

    const tooLarge = fresh.find((file) => file.size > MAX_FILE_SIZE)

    if (tooLarge) {
      setError(
        `حجم الملف «${tooLarge.name}» يتجاوز 25 ميجابايت. اختر ملفًا أصغر.`
      )
      return
    }

    setSelectedFiles((current) => [
      ...current,
      ...fresh.map((file) => ({
        key: `${file.name}:${file.size}:${file.lastModified}:${crypto.randomUUID()}`,
        file,
      })),
    ])
  }

  async function uploadAttachments(requestId: string) {
    const failed: string[] = []

    for (const item of selectedFiles) {
      const file = item.file
      let storagePath = ''

      try {
        const path = `${requestId}/${crypto.randomUUID()}-${safeFileName(file.name)}`

        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, {
            contentType: file.type || 'application/octet-stream',
            upsert: false,
          })

        if (uploadError) throw uploadError

        storagePath = path

        const { error: metadataError } = await supabase
          .from('request_attachments')
          .insert({
            request_id: requestId,
            file_name: file.name,
            storage_path: storagePath,
            content_type: file.type || null,
            file_size: file.size,
            uploaded_by: userId,
          })

        if (metadataError) {
          await supabase.storage.from(BUCKET).remove([storagePath])
          throw metadataError
        }
      } catch (err) {
        failed.push(
          `${file.name}: ${
            err instanceof Error ? err.message : 'تعذر رفع الملف'
          }`
        )
      }
    }

    return failed
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setAttachmentError('')

    if (!service || !userId) {
      setError('تعذر التحقق من الخدمة أو حساب الطالب.')
      return
    }

    if (details.trim().length < 5) {
      setError('يرجى كتابة تفاصيل الطلب بشكل أوضح.')
      return
    }

    const serviceSlug = serviceSlugMap[service.id]

    if (!serviceSlug) {
      setError('تعذر ربط هذه الخدمة بقاعدة البيانات. يرجى التواصل معنا.')
      return
    }

    setSaving(true)

    try {
      const { data: serviceRow, error: serviceError } = await supabase
        .from('services')
        .select('id, name')
        .eq('slug', serviceSlug)
        .eq('is_active', true)
        .maybeSingle()

      if (serviceError) throw serviceError

      if (!serviceRow) {
        throw new Error(
          'الخدمة المرتبطة بهذا الطلب غير متاحة حاليًا. يرجى التواصل معنا.'
        )
      }

      const fullDetails = [
        details.trim(),
        deadline ? `موعد التسليم المطلوب: ${deadline}` : '',
      ]
        .filter(Boolean)
        .join('\n')

      const { data: request, error: insertError } = await supabase
        .from('service_requests')
        .insert({
          student_id: userId,
          service_id: serviceRow.id,
          title: service.title,
          details: fullDetails,
        })
        .select('id')
        .single()

      if (insertError) throw insertError

      if (selectedFiles.length) {
        const failed = await uploadAttachments(request.id)

        if (failed.length) {
          setAttachmentError(
            `تم حفظ الطلب، لكن تعذر رفع بعض المرفقات:\n${failed.join('\n')}`
          )
        }
      }

      setCreatedId(request.id)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر حفظ الطلب. يرجى المحاولة مرة أخرى.'
      )
    } finally {
      setSaving(false)
    }
  }

  function openWhatsApp() {
    if (!service || !createdId) return

    const message = [
      'السلام عليكم، أرسلت طلبًا جديدًا عبر منصة هديل.',
      `رقم الطلب: ${createdId}`,
      `الخدمة: ${service.title}`,
      `التفاصيل: ${details.trim()}`,
      deadline ? `موعد التسليم: ${deadline}` : '',
      selectedFiles.length
        ? `عدد الملفات المرفقة: ${selectedFiles.length}`
        : '',
      'يرجى تأكيد استلام الطلب.',
    ]
      .filter(Boolean)
      .join('\n')

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  if (!service) {
    return (
      <main dir="rtl" className="page">
        <section className="card">
          <h1>الخدمة غير موجودة</h1>
          <p>تحقق من الخدمة التي اخترتها ثم حاول مجددًا.</p>
          <Link href="/services">العودة إلى الخدمات</Link>
        </section>
        <style jsx>{styles}</style>
      </main>
    )
  }

  if (loading) {
    return (
      <main dir="rtl" className="page">
        <section className="card">جارٍ التحقق من حسابك...</section>
        <style jsx>{styles}</style>
      </main>
    )
  }

  return (
    <main dir="rtl" className="page">
      <div className="container">
        <Link href="/services" className="back">
          <ArrowRight size={17} /> العودة إلى الخدمات
        </Link>

        <header className="heading">
          <span className="heading-icon">
            <ClipboardList size={28} />
          </span>
          <div>
            <span className="kicker">منصة هديل للخدمات الطلابية</span>
            <h1>تقديم طلب جديد</h1>
            <p>{service.title}</p>
          </div>
        </header>

        {createdId ? (
          <section className="card success" role="status">
            <h2>تم حفظ طلبك</h2>
            <p>احتفظ برقم الطلب لمتابعته من حسابك.</p>

            <div className="request-number" dir="ltr">
              {createdId}
            </div>

            {selectedFiles.length > 0 && (
              <p>عدد الملفات التي اخترتها: {selectedFiles.length}</p>
            )}

            {attachmentError && (
              <p className="error" role="alert">
                {attachmentError}
              </p>
            )}

            <button
              type="button"
              className="primary"
              onClick={openWhatsApp}
            >
              <Send size={18} /> متابعة الطلب عبر واتساب
            </button>

            <Link className="secondary" href="/account/requests">
              عرض طلباتي
            </Link>
            <Link className="secondary" href="/account/tracking">
              متابعة حالة الطلب
            </Link>
          </section>
        ) : (
          <form className="card" onSubmit={submitOrder}>
            <label htmlFor="details">
              تفاصيل الطلب <span className="required">*</span>
            </label>

            <textarea
              id="details"
              required
              minLength={5}
              rows={6}
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              placeholder="اشرح المطلوب، وتعليمات الجامعة أو المادة، وأي متطلبات مهمة..."
            />

            <label htmlFor="attachment">
              إرفاق ملف البحث أو التكليف (اختياري)
            </label>

            <div className="file-box">
              <input
                id="attachment"
                type="file"
                multiple
                accept="*/*"
                disabled={saving}
                onChange={(event) => {
                  addFiles(event.currentTarget.files)
                  event.currentTarget.value = ''
                }}
              />

              <p className="hint">
                يمكنك اختيار أي صيغة ملف أو صورة. الحد الأقصى 25 ميجابايت لكل
                ملف، وبحد أقصى {MAX_FILES} ملفات للطلب.
              </p>

              {selectedFiles.length > 0 && (
                <ul className="file-list">
                  {selectedFiles.map(({ key, file }) => (
                    <li key={key}>
                      <FileText size={18} />

                      <div className="file-name">
                        <strong>{file.name}</strong>
                        <small>
                          {(file.size / (1024 * 1024)).toFixed(2)} ميجابايت
                        </small>
                      </div>

                      <button
                        type="button"
                        aria-label={`إزالة ${file.name}`}
                        disabled={saving}
                        onClick={() =>
                          setSelectedFiles((current) =>
                            current.filter((item) => item.key !== key)
                          )
                        }
                      >
                        <X size={17} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label htmlFor="deadline">
              موعد التسليم المطلوب (اختياري)
            </label>

            <input
              id="deadline"
              type="date"
              value={deadline}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(event) => setDeadline(event.target.value)}
            />

            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={saving} className="primary">
              <ClipboardList size={18} />
              {saving
                ? 'جارٍ حفظ الطلب ورفع الملفات...'
                : 'حفظ الطلب والمتابعة'}
            </button>

            <p className="hint">
              سيظهر الطلب ومرفقاته للمسؤول في لوحة الإدارة. لا ترفق كلمات مرور
              أو معلومات شديدة الحساسية.
            </p>
          </form>
        )}
      </div>

      <style jsx>{styles}</style>
    </main>
  )
}

const styles = `
  .page { min-height:70vh; padding:34px 16px 60px; background:#f7f9fd; color:#17233d; }
  .container { max-width:760px; margin:auto; }
  .card { display:flex; flex-direction:column; gap:12px; max-width:760px; margin:auto; padding:26px; border:1px solid #e4ebf4; border-radius:20px; background:#fff; box-shadow:0 8px 26px #17233d08; }
  .back { display:inline-flex; align-items:center; gap:8px; margin-bottom:22px; color:#2455c4; text-decoration:none; font-size:13px; font-weight:800; }
  .heading { display:flex; align-items:center; gap:16px; margin-bottom:24px; }
  .heading-icon { display:flex; align-items:center; justify-content:center; flex:0 0 60px; height:60px; border-radius:18px; background:#eaf1ff; color:#2455c4; }
  .kicker { color:#2455c4; font-size:12px; font-weight:800; }
  .heading h1 { margin:4px 0; font-size:clamp(25px,5vw,34px); font-weight:900; }
  .heading p { margin:0; color:#697791; line-height:1.8; }
  .card label { margin-top:5px; font-size:13px; font-weight:850; }
  .required { color:#c33; }
  .card textarea,.card input:not([type=file]) { width:100%; min-width:0; padding:13px 14px; border:1px solid #dce4f0; border-radius:12px; background:#fbfcff; color:#17233d; font:inherit; font-size:14px; outline:none; }
  .card textarea { resize:vertical; line-height:1.9; }
  .card textarea:focus,.card input:focus { border-color:#2455c4; box-shadow:0 0 0 3px #2455c414; }
  .file-box { display:grid; gap:8px; padding:12px; border:1px dashed #c7d5ed; border-radius:12px; background:#f8faff; }
  .file-box input[type=file] { width:100%; min-width:0; padding:8px; border:1px solid #dce4f0; border-radius:9px; background:#fff; font:inherit; font-size:12px; }
  .hint { margin:0; color:#697791; font-size:12px; line-height:1.9; }
  .file-list { display:grid; gap:8px; margin:0; padding:0; list-style:none; }
  .file-list li { display:flex; align-items:center; gap:8px; min-width:0; padding:9px; border:1px solid #dce5f5; border-radius:10px; background:#fff; color:#2455c4; }
  .file-name { display:grid; flex:1; min-width:0; gap:4px; }
  .file-name strong { overflow-wrap:anywhere; color:#39465e; font-size:12px; }
  .file-name small { color:#697791; font-size:11px; }
  .file-list button { display:grid; place-items:center; flex:0 0 30px; width:30px; height:30px; border:1px solid #f0d3d5; border-radius:8px; background:#fff7f7; color:#a72d35; cursor:pointer; }
  .primary { display:inline-flex; align-items:center; justify-content:center; gap:9px; min-height:48px; margin-top:8px; padding:12px 18px; border:0; border-radius:12px; background:#2455c4; color:#fff; font:inherit; font-size:14px; font-weight:850; text-decoration:none; cursor:pointer; }
  .primary:disabled { opacity:.6; cursor:wait; }
  .error { margin:0; color:#a72d35; font-size:13px; line-height:1.9; white-space:pre-wrap; overflow-wrap:anywhere; }
  .success h2 { margin:0; font-size:23px; }
  .success p { margin:0; color:#697791; line-height:1.8; overflow-wrap:anywhere; }
  .request-number { overflow-wrap:anywhere; padding:14px; border:1px dashed #cbd8f2; border-radius:12px; background:#f5f8ff; color:#2455c4; font-size:12px; }
  .secondary { align-self:center; margin-top:4px; color:#2455c4; font-size:13px; font-weight:800; }
  @media(max-width:520px) { .page { padding:22px 12px 40px; } .card { padding:19px 15px; border-radius:16px; } .heading { align-items:flex-start; gap:12px; } .heading-icon { flex-basis:50px; height:50px; border-radius:14px; } }
`
