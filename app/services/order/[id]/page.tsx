'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Send, ClipboardList } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { services, whatsappNumber } from '@/app/components/Services'

export default function ServiceOrderPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const service = services.find((item) => item.id === params.id)

  const [userId, setUserId] = useState('')
  const [details, setDetails] = useState('')
  const [deadline, setDeadline] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [createdId, setCreatedId] = useState('')

  useEffect(() => {
    let active = true

    async function checkUser() {
      const { data, error } = await supabase.auth.getUser()

      if (!active) return

      if (error || !data.user) {
        router.replace(`/auth/login?next=${encodeURIComponent(`/services/order/${params.id}`)}`)
        return
      }

      setUserId(data.user.id)
      setLoading(false)
    }

    checkUser()
    return () => {
      active = false
    }
  }, [params.id, router])

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!service || !userId) {
      setError('تعذر التحقق من الخدمة أو حساب الطالب.')
      return
    }

    if (details.trim().length < 5) {
      setError('يرجى كتابة تفاصيل الطلب بشكل أوضح.')
      return
    }

    setSaving(true)

    try {
      const { data: serviceRow, error: serviceError } = await supabase
        .from('services')
        .select('id, name')
        .eq('slug', service.id)
        .eq('is_active', true)
        .maybeSingle()

      if (serviceError) throw serviceError

      if (!serviceRow) {
        throw new Error('هذه الخدمة غير متاحة حاليًا. يرجى التواصل معنا.')
      }

      const fullDetails = [
        details.trim(),
        deadline ? `موعد التسليم المطلوب: ${deadline}` : '',
      ].filter(Boolean).join('\n')

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
      'يرجى تأكيد استلام الطلب.',
    ].filter(Boolean).join('\n')

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  if (!service) {
    return (
      <main dir="rtl" className="order-page">
        <div className="order-card">
          <h1>الخدمة غير موجودة</h1>
          <Link href="/services">العودة إلى الخدمات</Link>
        </div>
        <style jsx>{`
          .order-page { min-height: 60vh; padding: 32px 16px; background: #f7f9fd; }
          .order-card { max-width: 650px; margin: auto; padding: 28px; background: white; border-radius: 18px; }
        `}</style>
      </main>
    )
  }

  if (loading) {
    return (
      <main dir="rtl" className="order-page">
        <div className="order-card">جارٍ التحقق من حسابك...</div>
        <style jsx>{`
          .order-page { min-height: 60vh; padding: 32px 16px; background: #f7f9fd; }
          .order-card { max-width: 650px; margin: auto; padding: 28px; background: white; border-radius: 18px; }
        `}</style>
      </main>
    )
  }

  return (
    <main dir="rtl" className="order-page">
      <div className="order-container">
        <Link href="/services" className="order-back">
          <ArrowRight size={17} /> العودة إلى الخدمات
        </Link>

        <header className="order-heading">
          <span className="order-icon"><ClipboardList size={28} /></span>
          <div>
            <span className="order-kicker">منصة هديل للخدمات الطلابية</span>
            <h1>تقديم طلب جديد</h1>
            <p>{service.title}</p>
          </div>
        </header>

        {createdId ? (
          <section className="order-card order-success" role="status">
            <h2>تم حفظ طلبك بنجاح</h2>
            <p>احتفظ برقم الطلب لمتابعته من حسابك.</p>
            <div className="order-number" dir="ltr">{createdId}</div>
            <button type="button" onClick={openWhatsApp} className="order-primary">
              <Send size={18} /> متابعة الطلب عبر واتساب
            </button>
            <Link className="order-secondary" href="/account/requests">
              عرض طلباتي
            </Link>
          </section>
        ) : (
          <form className="order-card" onSubmit={submitOrder}>
            <label htmlFor="details">تفاصيل الطلب <span>*</span></label>
            <textarea
              id="details"
              required
              minLength={5}
              rows={6}
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              placeholder="اشرح المطلوب، وتعليمات الجامعة أو المادة، وأي متطلبات مهمة..."
            />

            <label htmlFor="deadline">موعد التسليم المطلوب (اختياري)</label>
            <input
              id="deadline"
              type="date"
              value={deadline}
              min={new Date().toISOString().slice(0, 10)}
              onChange={(event) => setDeadline(event.target.value)}
            />

            {error && <p className="order-error" role="alert">{error}</p>}

            <button type="submit" disabled={saving} className="order-primary">
              <ClipboardList size={18} />
              {saving ? 'جارٍ حفظ الطلب...' : 'حفظ الطلب والمتابعة'}
            </button>
            <p className="order-hint">
              سيُحفظ الطلب أولًا في حسابك. بعد الحفظ يمكنك فتح واتساب وإرسال التفاصيل.
            </p>
          </form>
        )}
      </div>

      <style jsx>{`
        .order-page { min-height: 70vh; padding: 34px 16px 60px; background: #f7f9fd; color: #17233d; }
        .order-container { max-width: 760px; margin: auto; }
        .order-back { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 22px; color: #2455c4; text-decoration: none; font-size: 13px; font-weight: 800; }
        .order-heading { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
        .order-icon { display: flex; align-items: center; justify-content: center; flex: 0 0 60px; height: 60px; border-radius: 18px; background: #eaf1ff; color: #2455c4; }
        .order-kicker { color: #2455c4; font-size: 12px; font-weight: 800; }
        .order-heading h1 { margin: 4px 0; font-size: clamp(25px, 5vw, 34px); font-weight: 900; }
        .order-heading p { margin: 0; color: #697791; line-height: 1.8; }
        .order-card { display: flex; flex-direction: column; gap: 12px; padding: 26px; border: 1px solid #e4ebf4; border-radius: 20px; background: white; box-shadow: 0 8px 26px #17233d08; }
        .order-card label { margin-top: 5px; font-size: 13px; font-weight: 850; }
        .order-card label span { color: #c33; }
        .order-card textarea, .order-card input { width: 100%; min-width: 0; padding: 13px 14px; border: 1px solid #dce4f0; border-radius: 12px; background: #fbfcff; color: #17233d; font: inherit; font-size: 14px; outline: none; }
        .order-card textarea { resize: vertical; line-height: 1.9; }
        .order-card textarea:focus, .order-card input:focus { border-color: #2455c4; box-shadow: 0 0 0 3px #2455c414; }
        .order-primary { display: inline-flex; align-items: center; justify-content: center; gap: 9px; min-height: 48px; margin-top: 8px; padding: 12px 18px; border: 0; border-radius: 12px; background: #2455c4; color: white; font: inherit; font-size: 14px; font-weight: 850; text-decoration: none; cursor: pointer; }
        .order-primary:disabled { opacity: .6; cursor: wait; }
        .order-hint { margin: 0; color: #697791; font-size: 12px; line-height: 1.8; }
        .order-error { margin: 0; color: #a72d35; font-size: 13px; line-height: 1.8; }
        .order-success { align-items: stretch; }
        .order-success h2 { margin: 0; font-size: 23px; }
        .order-success p { margin: 0; color: #697791; line-height: 1.8; }
        .order-number { overflow-wrap: anywhere; padding: 14px; border: 1px dashed #cbd8f2; border-radius: 12px; background: #f5f8ff; color: #2455c4; font-size: 12px; }
        .order-secondary { align-self: center; margin-top: 4px; color: #2455c4; font-size: 13px; font-weight: 800; }
        @media (max-width: 520px) { .order-page { padding: 22px 12px 40px; } .order-card { padding: 19px 15px; border-radius: 16px; } .order-heading { align-items: flex-start; gap: 12px; } .order-icon { flex-basis: 50px; height: 50px; border-radius: 14px; } }
      `}</style>
    </main>
  )
}