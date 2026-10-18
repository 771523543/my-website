
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  LoaderCircle,
  LockKeyhole,
  Printer,
  Sparkles,
  WandSparkles,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

type DocumentType =
  | 'research'
  | 'assignment'
  | 'presentation'
  | 'spreadsheet'
  | 'report'
  | 'plan'

const documentTypes: {
  value: DocumentType
  label: string
  description: string
}[] = [
  {
    value: 'research',
    label: 'بحث علمي',
    description: 'أبحاث أكاديمية بعناوين ومباحث ومراجع',
  },
  {
    value: 'assignment',
    label: 'تكليف جامعي',
    description: 'واجبات وتكاليف منظمة',
  },
  {
    value: 'report',
    label: 'تقرير إداري',
    description: 'تقارير مهنية وإدارية',
  },
  {
    value: 'presentation',
    label: 'عرض تقديمي',
    description: 'محتوى مرتب على شرائح',
  },
  {
    value: 'spreadsheet',
    label: 'جداول وتحليل بيانات',
    description: 'جداول وخطط وأفكار للتحليل',
  },
  {
    value: 'plan',
    label: 'خطة أو مشروع',
    description: 'خطط عمل ومشروعات منظمة',
  },
]

export default function FileGeneratorPage() {
  const [checking, setChecking] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [documentType, setDocumentType] =
    useState<DocumentType>('research')
  const [university, setUniversity] = useState('')
  const [requirements, setRequirements] = useState('')
  const [sourceText, setSourceText] = useState('')
  const [sourceName, setSourceName] = useState('')
  const [content, setContent] = useState('')
  const [model, setModel] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const [settings, setSettings] = useState({
    fontFamily: 'Arial',
    headingSize: 20,
    subheadingSize: 16,
    bodySize: 14,
    headingColor: '#173e78',
    bodyColor: '#243247',
    margin: 2.5,
    pageNumbers: true,
  })

  useEffect(() => {
    let active = true

    async function checkAccess() {
      try {
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession()

        const session = sessionData.session

        if (sessionError || !session?.access_token) {
          if (active) {
            setError('سجّل الدخول بحساب المدير أولًا.')
            setChecking(false)
          }
          return
        }

        const { data: adminData, error: adminError } =
          await supabase.rpc('is_hadeel_admin')

        if (adminError || adminData !== true) {
          if (active) {
            setError('هذه الصفحة مخصصة لمدير منصة هديل.')
            setChecking(false)
          }
          return
        }

        if (active) {
          setAuthorized(true)
          setChecking(false)
        }
      } catch {
        if (active) {
          setError('تعذر التحقق من صلاحيات الدخول.')
          setChecking(false)
        }
      }
    }

    checkAccess()

    return () => {
      active = false
    }
  }, [])

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    setSourceText('')
    setSourceName('')
    setNotice('')
    setError('')

    if (!file) return

    const allowedExtensions = ['txt', 'md']
    const extension = file.name.split('.').pop()?.toLowerCase()

    if (!extension || !allowedExtensions.includes(extension)) {
      setError(
        'الرفع النصي متاح حاليًا لملفات TXT وMD فقط. سنضيف قراءة Word وPDF في خطوة لاحقة.'
      )
      event.target.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('حجم الملف النصي يجب ألا يتجاوز 2 ميجابايت.')
      event.target.value = ''
      return
    }

    try {
      const text = await file.text()

      if (!text.trim()) {
        setError('الملف فارغ أو لا يحتوي على نص قابل للقراءة.')
        return
      }

      setSourceText(text.slice(0, 18000))
      setSourceName(file.name)
      setNotice('تمت قراءة الملف النصي وإرفاق محتواه بالتعليمات.')
    } catch {
      setError('تعذر قراءة الملف. حاول استخدام ملف نصي آخر.')
    }
  }

  async function generateContent() {
    setError('')
    setNotice('')
    setModel('')

    if (!prompt.trim()) {
      setError('اكتب وصف العمل الذي تريد إنشاءه أولًا.')
      return
    }

    setLoading(true)

    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession()

      const token = sessionData.session?.access_token

      if (sessionError || !token) {
        setError('انتهت جلسة الدخول. سجّل الدخول مجددًا.')
        return
      }

      const response = await fetch(
        '/api/admin/file-generator',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            prompt,
            documentType,
            university,
            requirements,
            sourceText,
            settings,
          }),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.error || 'تعذر إنشاء المحتوى.'
        )
      }

      setContent(result.content || '')
      setModel(result.model || '')
      setNotice(
        'تم إنشاء المسودة. راجع المحتوى والمراجع قبل استخدامه أو تسليمه.'
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'حدث خطأ أثناء إنشاء المحتوى.'
      )
    } finally {
      setLoading(false)
    }
  }

  function downloadText() {
    if (!content.trim()) return

    const blob = new Blob(
      ['\uFEFF', content],
      { type: 'text/plain;charset=utf-8' }
    )

    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')

    anchor.href = url
    anchor.download = 'hadeel-document.txt'
    anchor.click()

    URL.revokeObjectURL(url)
  }

  if (checking) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50 p-6"
      >
        <div className="flex items-center gap-3 rounded-2xl bg-white p-6 shadow-sm">
          <LoaderCircle className="animate-spin text-blue-700" />
          <span>جارٍ التحقق من صلاحيات المدير...</span>
        </div>
      </main>
    )
  }

  if (!authorized) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50 p-6"
      >
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <LockKeyhole className="mx-auto mb-4 h-12 w-12 text-amber-500" />
          <h1 className="text-xl font-bold text-slate-900">
            لا يمكن الوصول إلى مولّد الملفات
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            {error || 'هذه الصفحة مخصصة للمدير فقط.'}
          </p>
          <Link
            href="/auth/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white"
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/admin"
            className="mt-3 block text-sm text-blue-700"
          >
            العودة إلى لوحة المدير
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700"
        >
          <ArrowRight size={18} />
          العودة إلى لوحة المدير
        </Link>

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-slate-950 via-blue-950 to-blue-800 p-6 text-white shadow-lg sm:p-9">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              <Sparkles size={17} className="text-amber-300" />
              أداة داخلية لإدارة منصة هديل
            </div>

            <h1 className="text-2xl font-extrabold sm:text-4xl">
              مولّد الملفات الذكي
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base">
              اكتب المطلوب، وحدد نوع العمل وتنسيقه، ثم أنشئ
              مسودة قابلة للمراجعة والتحرير قبل التصدير.
            </p>
          </div>

          <GraduationCap
            className="absolute -bottom-8 left-5 h-36 w-36 text-white/10 sm:h-48 sm:w-48"
            strokeWidth={1}
          />
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    تفاصيل العمل
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    حدد المطلوب بدقة للحصول على نتيجة أفضل.
                  </p>
                </div>
              </div>

              <label
                htmlFor="documentType"
                className="mb-2 block text-sm font-semibold"
              >
                نوع العمل
              </label>

              <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {documentTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setDocumentType(type.value)}
                    className={`rounded-2xl border p-4 text-right transition ${
                      documentType === type.value
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100'
                        : 'border-slate-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <span className="block font-bold">
                      {type.label}
                    </span>
                    <span className="mt-2 block text-xs leading-6 text-slate-500">
                      {type.description}
                    </span>
                  </button>
                ))}
              </div>

              <label
                htmlFor="prompt"
                className="mb-2 block text-sm font-semibold"
              >
                ماذا تريد أن تنشئ؟
              </label>

              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                maxLength={30000}
                placeholder="مثال: أعد بحثًا أكاديميًا منظمًا عن تخطيط التعاقب الوظيفي في الإدارة العامة للتعليم بمنطقة عسير، مع مشكلة الدراسة وأهدافها وأهميتها ومنهجيتها ومراجع قابلة للتحقق..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-8 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />

              <p className="mt-2 text-xs text-slate-500">
                {prompt.length.toLocaleString('ar-SA')} / 30000 حرف
              </p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="university"
                    className="mb-2 block text-sm font-semibold"
                  >
                    الجامعة أو الجهة
                  </label>
                  <input
                    id="university"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="مثال: جامعة الملك سعود"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="sourceFile"
                    className="mb-2 block text-sm font-semibold"
                  >
                    ملف تعليمات (اختياري)
                  </label>
                  <input
                    id="sourceFile"
                    type="file"
                    accept=".txt,.md,text/plain,text/markdown"
                    onChange={handleFileChange}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2 text-sm file:ml-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-800"
                  />
                  {sourceName && (
                    <p className="mt-2 break-all text-xs text-emerald-700">
                      تم إرفاق: {sourceName}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="requirements"
                  className="mb-2 block text-sm font-semibold"
                >
                  متطلبات إضافية
                </label>
                <textarea
                  id="requirements"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  rows={3}
                  maxLength={6000}
                  placeholder="عدد الصفحات، طريقة التوثيق، العناوين المطلوبة، مستوى التفصيل..."
                  className="w-full rounded-xl border border-slate-200 p-4 text-sm leading-7 outline-none focus:border-blue-500"
                />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">
                  <FileText size={23} />
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    إعدادات التنسيق
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    اختر إعدادات أولية لاستخدامها في مرحلة التصدير.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    نوع الخط
                  </label>
                  <select
                    value={settings.fontFamily}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        fontFamily: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Traditional Arabic">
                      Traditional Arabic
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    الهوامش (سم)
                  </label>
                  <select
                    value={settings.margin}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        margin: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
                  >
                    <option value={1.5}>1.5 سم</option>
                    <option value={2}>2 سم</option>
                    <option value={2.5}>2.5 سم</option>
                    <option value={3}>3 سم</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    حجم العنوان الرئيسي
                  </label>
                  <input
                    type="number"
                    min={16}
                    max={36}
                    value={settings.headingSize}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        headingSize: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 p-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    حجم العنوان الفرعي
                  </label>
                  <input
                    type="number"
                    min={12}
                    max={28}
                    value={settings.subheadingSize}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        subheadingSize: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 p-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    حجم النص الأساسي
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={24}
                    value={settings.bodySize}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        bodySize: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 p-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    لون العناوين
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-2">
                    <input
                      type="color"
                      value={settings.headingColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          headingColor: e.target.value,
                        })
                      }
                      className="h-9 w-12 cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-sm">
                      {settings.headingColor}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    لون النص
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-2">
                    <input
                      type="color"
                      value={settings.bodyColor}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          bodyColor: e.target.value,
                        })
                      }
                      className="h-9 w-12 cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-sm">
                      {settings.bodyColor}
                    </span>
                  </div>
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm">
                <input
                  type="checkbox"
                  checked={settings.pageNumbers}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pageNumbers: e.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-blue-700"
                />
                إضافة أرقام الصفحات عند التصدير
              </label>
            </section>

            <button
              type="button"
              onClick={generateContent}
              disabled={loading}
              className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-blue-700 px-6 py-4 font-bold text-white shadow-md transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin" size={21} />
                  جارٍ إنشاء المسودة...
                </>
              ) : (
                <>
                  <WandSparkles size={21} />
                  إنشاء المحتوى بالذكاء الاصطناعي
                </>
              )}
            </button>

            {error && (
              <div
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-800"
              >
                {error}
              </div>
            )}

            {notice && (
              <div
                role="status"
                className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-800"
              >
                {notice}
              </div>
            )}

            {content && (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-extrabold">
                      مراجعة المحتوى الناتج
                    </h2>
                    {model && (
                      <p className="mt-2 text-xs text-slate-500">
                        النموذج: {model}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={downloadText}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                    >
                      تنزيل TXT
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                    >
                      <Printer size={16} />
                      طباعة / حفظ PDF
                    </button>
                  </div>
                </div>

                <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm leading-7 text-amber-900">
                  راجع دقة المعلومات والمراجع قبل اعتماد العمل.
                  إعدادات الخط والهوامش محفوظة للتصدير، لكن التصدير
                  الاحترافي إلى Word وPDF وPowerPoint وExcel سنضيفه
                  في الخطوات التالية.
                </p>

                <textarea
                  aria-label="المحتوى الناتج قابل للتحرير"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={24}
                  className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-8 outline-none focus:border-blue-500"
                />
              </section>
            )}
          </div>

          <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                <GraduationCap size={24} />
              </div>
              <h2 className="font-bold">مساحة العمل الخاصة بك</h2>
            </div>

            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
              <li>
                <strong className="block text-slate-800">
                  1. حدد نوع العمل
                </strong>
                اختر بحثًا أو تقريرًا أو عرضًا أو خطة.
              </li>
              <li>
                <strong className="block text-slate-800">
                  2. اكتب المتطلبات
                </strong>
                وضح الموضوع والجامعة والمنهج والمخرجات المطلوبة.
              </li>
              <li>
                <strong className="block text-slate-800">
                  3. أنشئ المسودة
                </strong>
                راجع الناتج وعدّله قبل استخدامه.
              </li>
              <li>
                <strong className="block text-slate-800">
                  4. صدّر العمل
                </strong>
                التصدير المتقدم والشعارات والقوالب الاحترافية
                ستُضاف في الملفات التالية.
              </li>
            </ul>

            <div className="mt-6 rounded-2xl bg-blue-50 p-4 text-sm leading-7 text-blue-900">
              هذه النسخة مخصصة لك كمدير. لا تجعل ملفات العملاء أو
              بياناتهم ضمن نماذج عامة، وراجع المراجع والنتائج قبل
              اعتماد أي مستند.
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
