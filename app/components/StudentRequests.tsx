'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, ClipboardList, Clock3, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type RequestRow = {
  id: string
  title: string
  details: string | null
  status: 'pending' | 'in_progress' | 'completed' | 'rejected'
  created_at: string
  updated_at: string
  services?: { name: string } | { name: string }[] | null
}

type HistoryRow = {
  id: string
  request_id: string
  status: RequestRow['status']
  note: string | null
  created_at: string
}

const statusLabels: Record<RequestRow['status'], string> = {
  pending: 'بانتظار المراجعة',
  in_progress: 'قيد التنفيذ',
  completed: 'مكتمل',
  rejected: 'تعذر التنفيذ',
}

const statusDescriptions: Record<RequestRow['status'], string> = {
  pending: 'تم استلام الطلب وهو بانتظار المراجعة.',
  in_progress: 'بدأ العمل على الطلب.',
  completed: 'اكتمل الطلب.',
  rejected: 'تعذر تنفيذ الطلب. يرجى التواصل مع فريق هديل للاستفسار.',
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('ar', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default function StudentRequests({
  mode,
}: {
  mode: 'requests' | 'tracking'
}) {
  const router = useRouter()
  const [rows, setRows] = useState<RequestRow[]>([])
  const [history, setHistory] = useState<HistoryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')

  async function loadData(showRefresh = false) {
    setError('')
    if (showRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const { data: authData, error: authError } = await supabase.auth.getUser()

      if (authError || !authData.user) {
        router.replace('/auth/login')
        return
      }

      const { data: requests, error: requestError } = await supabase
        .from('service_requests')
        .select('id, title, details, status, created_at, updated_at, services(name)')
        .eq('student_id', authData.user.id)
        .order('created_at', { ascending: false })

      if (requestError) throw requestError

      const safeRequests = (requests ?? []) as unknown as RequestRow[]
      setRows(safeRequests)

      if (safeRequests.length) {
        const { data: historyRows, error: historyError } = await supabase
          .from('service_request_status_history')
          .select('id, request_id, status, note, created_at')
          .in('request_id', safeRequests.map((request) => request.id))
          .order('created_at', { ascending: true })

        if (historyError) throw historyError
        setHistory((historyRows ?? []) as HistoryRow[])
      } else {
        setHistory([])
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر تحميل الطلبات. حاول مرة أخرى.'
      )
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadData()
    // التحميل عند فتح الصفحة فقط
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main dir="rtl" className="student-requests-page">
      <div className="sr-container">
        <Link href="/account" className="sr-back">
          <ArrowRight size={17} /> العودة إلى حساب الطالب
        </Link>

        <header className="sr-heading">
          <span className="sr-heading-icon">
            {mode === 'requests' ? <ClipboardList size={28} /> : <Clock3 size={28} />}
          </span>
          <div>
            <span className="sr-kicker">منصة هديل</span>
            <h1>{mode === 'requests' ? 'طلباتي' : 'متابعة الطلبات'}</h1>
            <p>
              {mode === 'requests'
                ? 'جميع الطلبات التي قدمتها من حسابك.'
                : 'تابع حالة كل طلب ومراحل تقدمه بالتاريخ والوقت.'}
            </p>
          </div>
        </header>

        <div className="sr-toolbar">
          <span>عدد الطلبات: {rows.length}</span>
          <button type="button" onClick={() => loadData(true)} disabled={refreshing}>
            <RefreshCw size={16} />
            {refreshing ? 'جارٍ التحديث...' : 'تحديث'}
          </button>
        </div>

        {error && <div className="sr-error" role="alert">{error}</div>}

        {loading ? (
          <div className="sr-empty">جارٍ تحميل طلباتك...</div>
        ) : rows.length === 0 ? (
          <section className="sr-empty">
            <ClipboardList size={34} />
            <h2>لا توجد طلبات حتى الآن</h2>
            <p>عندما تقدم طلبًا من الخدمات الطلابية، سيظهر هنا.</p>
            <Link href="/services" className="sr-primary">استعراض الخدمات</Link>
          </section>
        ) : (
          <div className="sr-list">
            {rows.map((request) => {
              const service = Array.isArray(request.services)
                ? request.services[0]
                : request.services
              const requestHistory = history.filter(
                (item) => item.request_id === request.id
              )

              return (
                <article className="sr-card" key={request.id}>
                  <div className="sr-card-top">
                    <div className="sr-card-title">
                      <h2>{request.title}</h2>
                      {service?.name && <p>{service.name}</p>}
                    </div>
                    <span className={`sr-status sr-status-${request.status}`}>
                      {statusLabels[request.status]}
                    </span>
                  </div>

                  <div className="sr-meta">
                    <span>رقم الطلب</span>
                    <code dir="ltr">{request.id}</code>
                  </div>
                  <div className="sr-meta">
                    <span>تاريخ التقديم</span>
                    <time>{formatDate(request.created_at)}</time>
                  </div>

                  {request.details && (
                    <details className="sr-details">
                      <summary>عرض تفاصيل الطلب</summary>
                      <p>{request.details}</p>
                    </details>
                  )}

                  {mode === 'tracking' && (
                    <section className="sr-timeline">
                      <h3>سجل مراحل الطلب</h3>
                      {requestHistory.length === 0 ? (
                        <p className="sr-muted">
                          لا توجد تحديثات زمنية مسجلة لهذا الطلب حتى الآن.
                        </p>
                      ) : (
                        <ol>
                          {requestHistory.map((item) => (
                            <li key={item.id}>
                              <span className={`sr-timeline-dot sr-dot-${item.status}`} />
                              <div>
                                <strong>{statusLabels[item.status]}</strong>
                                <p>{item.note || statusDescriptions[item.status]}</p>
                                <time>{formatDate(item.created_at)}</time>
                              </div>
                            </li>
                          ))}
                        </ol>
                      )}
                      <p className="sr-current-status">
                        الحالة الحالية: {statusLabels[request.status]}
                      </p>
                    </section>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .student-requests-page { min-height: 70vh; padding: 32px 16px 60px; background: #f7f9fd; color: #17233d; }
        .sr-container { max-width: 900px; margin: auto; }
        .sr-back { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 22px; color: #2455c4; text-decoration: none; font-size: 13px; font-weight: 800; }
        .sr-heading { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
        .sr-heading-icon { display: flex; align-items: center; justify-content: center; flex: 0 0 58px; height: 58px; border-radius: 17px; background: #eaf1ff; color: #2455c4; }
        .sr-kicker { color: #2455c4; font-size: 12px; font-weight: 850; }
        .sr-heading h1 { margin: 4px 0; font-size: clamp(26px, 5vw, 35px); font-weight: 900; }
        .sr-heading p { margin: 0; color: #697791; font-size: 13px; line-height: 1.8; }
        .sr-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 15px; color: #697791; font-size: 13px; }
        .sr-toolbar button { display: inline-flex; align-items: center; gap: 7px; padding: 9px 12px; border: 1px solid #dce5f5; border-radius: 10px; background: white; color: #2455c4; font: inherit; cursor: pointer; }
        .sr-toolbar button:disabled { opacity: .6; }
        .sr-list { display: grid; gap: 15px; }
        .sr-card { min-width: 0; padding: 22px; border: 1px solid #e4ebf4; border-radius: 18px; background: white; box-shadow: 0 6px 20px #17233d08; }
        .sr-card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
        .sr-card-title { min-width: 0; }
        .sr-card-title h2 { margin: 0; font-size: 18px; font-weight: 900; line-height: 1.7; }
        .sr-card-title p { margin: 3px 0 0; color: #697791; font-size: 12px; }
        .sr-status { flex-shrink: 0; padding: 7px 10px; border-radius: 999px; font-size: 11px; font-weight: 850; }
        .sr-status-pending { background: #fff4d9; color: #895a00; }
        .sr-status-in_progress { background: #eaf1ff; color: #2455c4; }
        .sr-status-completed { background: #e4f7ed; color: #176c40; }
        .sr-status-rejected { background: #fff0f0; color: #a72d35; }
        .sr-meta { display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px; margin-top: 13px; font-size: 12px; }
        .sr-meta > span { color: #697791; }
        .sr-meta code { max-width: 100%; overflow-wrap: anywhere; color: #2455c4; font-size: 11px; }
        .sr-meta time { color: #303d56; }
        .sr-details { margin-top: 15px; border-top: 1px solid #edf0f5; padding-top: 13px; font-size: 13px; }
        .sr-details summary { color: #2455c4; font-weight: 800; cursor: pointer; }
        .sr-details p { white-space: pre-wrap; overflow-wrap: anywhere; color: #49566e; line-height: 1.9; }
        .sr-timeline { margin-top: 20px; padding-top: 17px; border-top: 1px solid #edf0f5; }
        .sr-timeline h3 { margin: 0 0 17px; font-size: 15px; font-weight: 900; }
        .sr-timeline ol { display: grid; gap: 0; margin: 0; padding: 0; list-style: none; }
        .sr-timeline li { display: flex; gap: 12px; min-width: 0; padding-bottom: 20px; }
        .sr-timeline li:last-child { padding-bottom: 0; }
        .sr-timeline-dot { flex: 0 0 11px; width: 11px; height: 11px; margin-top: 5px; border: 2px solid #fff; border-radius: 50%; background: #2455c4; box-shadow: 0 0 0 2px #cbd8f2; }
        .sr-dot-completed { background: #21845b; box-shadow: 0 0 0 2px #ccebd8; }
        .sr-dot-rejected { background: #b72e39; box-shadow: 0 0 0 2px #f3cccc; }
        .sr-timeline li > div { min-width: 0; }
        .sr-timeline strong { font-size: 13px; }
        .sr-timeline li p { margin: 3px 0; color: #697791; font-size: 12px; line-height: 1.8; }
        .sr-timeline time { color: #8994a8; font-size: 11px; }
        .sr-current-status { margin: 17px 0 0; padding: 11px 13px; border-radius: 10px; background: #f0f5ff; color: #244b9c; font-size: 12px; font-weight: 850; }
        .sr-empty { display: flex; align-items: center; flex-direction: column; gap: 10px; padding: 38px 20px; border: 1px dashed #cbd8f2; border-radius: 18px; background: white; color: #697791; text-align: center; }
        .sr-empty h2 { margin: 0; color: #17233d; font-size: 19px; }
        .sr-empty p { margin: 0; font-size: 13px; line-height: 1.8; }
        .sr-primary { display: inline-flex; justify-content: center; margin-top: 8px; padding: 12px 18px; border-radius: 11px; background: #2455c4; color: white; text-decoration: none; font-size: 13px; font-weight: 850; }
        .sr-error { margin-bottom: 15px; padding: 13px; border: 1px solid #f3cccc; border-radius: 12px; background: #fff5f5; color: #a72d35; font-size: 13px; line-height: 1.8; overflow-wrap: anywhere; }
        .sr-muted { color: #697791; font-size: 12px; }
        @media (max-width: 560px) { .student-requests-page { padding: 22px 12px 40px; } .sr-card { padding: 17px 14px; } .sr-card-top { flex-direction: column; } .sr-heading { align-items: flex-start; gap: 12px; } .sr-heading-icon { flex-basis: 50px; height: 50px; } }
      `}</style>
    </main>
  )
}