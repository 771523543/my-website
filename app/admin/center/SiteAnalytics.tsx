'use client'

import { useEffect, useState } from 'react'
import { Activity, Download, Globe, Smartphone, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type DailyStat = {
  day: string
  site_opens: number
  app_installs: number
}

type AnalyticsStats = {
  site_opens: number
  app_installs: number
  website_opens: number
  installed_app_opens: number
  daily: DailyStat[]
}

const numberFormat = new Intl.NumberFormat('ar')

export default function SiteAnalytics() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadStats() {
    setLoading(true)
    setError('')

    const { data, error: queryError } = await supabase.rpc(
      'get_hadeel_site_analytics'
    )

    if (queryError) {
      setError('تعذر تحميل الإحصائيات. حدّث الصفحة وحاول مرة أخرى.')
      setLoading(false)
      return
    }

    setStats(data as AnalyticsStats)
    setLoading(false)
  }

  useEffect(() => {
    void loadStats()
  }, [])

  const maxDaily = Math.max(
    1,
    ...(stats?.daily ?? []).map((item) =>
      Math.max(item.site_opens, item.app_installs)
    )
  )

  return (
    <section dir="rtl" className="ha-analytics">
      <div className="ha-heading">
        <div>
          <span className="ha-eyebrow">إحصائيات المنصة</span>
          <h2>الزيارات والتثبيتات</h2>
          <p>متابعة عمليات فتح الموقع وتثبيت تطبيق منصة هديل.</p>
        </div>
        <button
          type="button"
          className="ha-refresh"
          onClick={() => void loadStats()}
          disabled={loading}
          aria-label="تحديث الإحصائيات"
        >
          <RefreshCw size={16} className={loading ? 'ha-spin' : ''} />
          تحديث
        </button>
      </div>

      {error && <p className="ha-error" role="alert">{error}</p>}

      <div className="ha-cards">
        <article className="ha-card ha-total">
          <span className="ha-icon"><Activity size={22} /></span>
          <span className="ha-label">إجمالي عمليات فتح الموقع</span>
          <strong>{loading ? '—' : numberFormat.format(stats?.site_opens ?? 0)}</strong>
          <small>كل زيارة أو فتح صفحة مسجل</small>
        </article>

        <article className="ha-card ha-installs">
          <span className="ha-icon"><Download size={22} /></span>
          <span className="ha-label">عمليات تثبيت التطبيق</span>
          <strong>{loading ? '—' : numberFormat.format(stats?.app_installs ?? 0)}</strong>
          <small>التثبيتات التي أبلغ عنها المتصفح</small>
        </article>

        <article className="ha-card ha-web">
          <span className="ha-icon"><Globe size={22} /></span>
          <span className="ha-label">فتح الموقع من المتصفح</span>
          <strong>{loading ? '—' : numberFormat.format(stats?.website_opens ?? 0)}</strong>
          <small>زيارات نسخة الموقع العادية</small>
        </article>

        <article className="ha-card ha-app">
          <span className="ha-icon"><Smartphone size={22} /></span>
          <span className="ha-label">فتح التطبيق المثبّت</span>
          <strong>{loading ? '—' : numberFormat.format(stats?.installed_app_opens ?? 0)}</strong>
          <small>مرات الفتح بوضع التطبيق</small>
        </article>
      </div>

      <div className="ha-chart">
        <div className="ha-chart-title">
          <h3>الحركة خلال آخر 30 يومًا</h3>
          <div className="ha-legend">
            <span><i className="ha-dot ha-dot-views" /> فتح الموقع</span>
            <span><i className="ha-dot ha-dot-installs" /> تثبيت التطبيق</span>
          </div>
        </div>

        {loading ? (
          <p className="ha-empty">جارٍ تحميل الإحصائيات...</p>
        ) : !stats?.daily?.length ? (
          <p className="ha-empty">لا توجد زيارات مسجلة حتى الآن. ستظهر الإحصائيات بعد بدء تسجيل الزيارات الجديدة.</p>
        ) : (
          <div className="ha-bars">
            {stats.daily.map((item) => (
              <div className="ha-day" key={item.day} title={item.day}>
                <div className="ha-bar-pair">
                  <span
                    className="ha-bar ha-bar-views"
                    style={{ height: `${Math.max(3, (item.site_opens / maxDaily) * 100)}%` }}
                  />
                  <span
                    className="ha-bar ha-bar-installs"
                    style={{ height: `${Math.max(item.app_installs ? 3 : 0, (item.app_installs / maxDaily) * 100)}%` }}
                  />
                </div>
                <small>{new Date(item.day + 'T00:00:00').toLocaleDateString('ar', { day: 'numeric', month: 'numeric' })}</small>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="ha-note">
        ملاحظة: يبدأ العد من تاريخ تفعيل الإحصائيات، ولا يمكن استرجاع الزيارات أو التثبيتات السابقة. قد لا ترسل بعض الأجهزة والمتصفحات إشعار التثبيت.
      </p>

      <style jsx>{`
        .ha-analytics { margin: 0 0 30px; padding: 22px; border: 1px solid #e5eaf3; border-radius: 20px; background: #fff; box-shadow: 0 8px 26px #1e335208; }
        .ha-heading { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:18px; }
        .ha-eyebrow { color:#6f7657; font-size:12px; font-weight:800; }
        .ha-heading h2 { margin:4px 0; font-size:21px; color:#17233d; }
        .ha-heading p { margin:0; color:#77839a; font-size:13px; line-height:1.8; }
        .ha-refresh { display:flex; align-items:center; gap:7px; padding:9px 12px; border:1px solid #e1e7f1; border-radius:11px; background:#f8fafc; color:#35445d; font:inherit; font-size:12px; font-weight:800; cursor:pointer; }
        .ha-refresh:disabled { opacity:.6; cursor:wait; }
        .ha-cards { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; }
        .ha-card { display:flex; flex-direction:column; align-items:flex-start; min-width:0; padding:15px; border:1px solid #edf0f5; border-radius:15px; background:#fbfcfe; }
        .ha-icon { display:grid; place-items:center; width:40px; height:40px; border-radius:12px; margin-bottom:12px; }
        .ha-total .ha-icon { background:#eaf2ff; color:#2865bd; }
        .ha-installs .ha-icon { background:#e5f8ef; color:#12845c; }
        .ha-web .ha-icon { background:#fff0df; color:#bd6a20; }
        .ha-app .ha-icon { background:#f1eaff; color:#7546bd; }
        .ha-label { color:#65738a; font-size:12px; line-height:1.7; }
        .ha-card strong { margin:5px 0; color:#17233d; font-size:27px; font-variant-numeric:tabular-nums; }
        .ha-card small { color:#929bad; font-size:10px; line-height:1.6; }
        .ha-chart { margin-top:18px; padding:16px; border:1px solid #edf0f5; border-radius:15px; }
        .ha-chart-title { display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; }
        .ha-chart-title h3 { margin:0; color:#25334a; font-size:14px; }
        .ha-legend { display:flex; gap:12px; color:#77839a; font-size:11px; }
        .ha-legend span { display:flex; align-items:center; gap:5px; }
        .ha-dot { width:8px; height:8px; border-radius:50%; display:inline-block; }
        .ha-dot-views { background:#2865bd; }
        .ha-dot-installs { background:#12845c; }
        .ha-bars { display:flex; align-items:stretch; gap:5px; height:150px; overflow-x:auto; padding:16px 2px 0; }
        .ha-day { display:flex; flex:1 0 24px; flex-direction:column; align-items:center; justify-content:flex-end; min-width:20px; gap:7px; }
        .ha-bar-pair { display:flex; align-items:flex-end; justify-content:center; gap:3px; width:100%; height:112px; border-bottom:1px solid #e8edf4; }
        .ha-bar { display:block; width:9px; min-height:0; border-radius:4px 4px 0 0; }
        .ha-bar-views { background:#2865bd; }
        .ha-bar-installs { background:#12845c; }
        .ha-day small { color:#929bad; font-size:9px; white-space:nowrap; }
        .ha-empty { margin:22px 0 8px; color:#929bad; font-size:12px; text-align:center; line-height:1.8; }
        .ha-note { margin:13px 0 0; color:#929bad; font-size:11px; line-height:1.8; }
        .ha-error { color:#a52c39; background:#fff3f3; padding:10px; border-radius:10px; font-size:12px; }
        .ha-spin { animation:ha-spin 1s linear infinite; }
        @keyframes ha-spin { to { transform:rotate(360deg); } }
        @media(max-width:850px) { .ha-cards { grid-template-columns:repeat(2,minmax(0,1fr)); } }
        @media(max-width:520px) { .ha-analytics { padding:15px; } .ha-heading { align-items:flex-start; } .ha-card { padding:12px; } .ha-card strong { font-size:23px; } }
      `}</style>
    </section>
  )
}
