
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  LoaderCircle,
  LockKeyhole,
  Presentation,
  Printer,
  RefreshCw,
  Settings2,
  Upload,
  WandSparkles,
} from 'lucide-react'

import { supabase } from '@/lib/supabase'
import {
  exportWord,
  exportPowerPoint,
  exportExcel,
  type ExportSettings,
} from '@/lib/file-generator-exports'

type DocumentType =
  | 'research'
  | 'assignment'
  | 'presentation'
  | 'spreadsheet'
  | 'report'
  | 'plan'

type FormatSettings = ExportSettings & {
  textColor: string
  headingColor: string
  fontSize: number
  fontFace: string
  margin: number
  includeCover: boolean
  includePageNumbers: boolean
}

const documentTypes: {
  value: DocumentType
  label: string
  description: string
}[] = [
  {
    value: 'research',
    label: 'بحث علمي',
    description: 'بحوث أكاديمية وعناصر البحث والمراجع',
  },
  {
    value: 'assignment',
    label: 'تكليف جامعي',
    description: 'واجبات وتقارير ومهام دراسية',
  },
  {
    value: 'presentation',
    label: 'عرض تقديمي',
    description: 'محتوى منظم لشرائح PowerPoint',
  },
  {
    value: 'spreadsheet',
    label: 'جداول وتحليل بيانات',
    description: 'جداول منظمة وملخصات بيانات',
  },
  {
    value: 'report',
    label: 'تقرير مهني',
    description: 'تقارير إدارية ومهنية',
  },
  {
    value: 'plan',
    label: 'خطة أو مشروع',
    description: 'خطط تنفيذية ومشروعات منظمة',
  },
]

const initialSettings: FormatSettings = {
  title: '',
  university: '',
  fontFace: 'Arial',
  fontSize: 14,
  textColor: '#243247',
  headingColor: '#2459A9',
  margin: 2,
  includeCover: true,
  includePageNumbers: true,
}

export default function FileGeneratorPage() {
  const [checking, setChecking] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(false)
  const [exporting, setExporting] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const [documentType, setDocumentType] =
    useState<DocumentType>('research')
  const [prompt, setPrompt] = useState('')
  const [university, setUniversity] = useState('')
  const [requirements, setRequirements] = useState('')
  const [sourceText, setSourceText] = useState('')
  const [content, setContent] = useState('')
  const [settings, setSettings] =
    useState<FormatSettings>(initialSettings)

  useEffect(() => {
    let active = true

    async function checkAdmin() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) {
          if (active) {
            setAuthorized(false)
            setChecking(false)
          }
          return
        }

        const { data, error: adminError } =
          await supabase.rpc('is_hadeel_admin')

        if (active) {
          setAuthorized(!adminError && data === true)
          setChecking(false)
        }
      } catch {
        if (active) {
          setAuthorized(false)
          setChecking(false)
        }
      }
    }

    void checkAdmin()

    return () => {
      active = false
    }
  }, [])

  function updateSetting<K extends keyof FormatSettings>(
    key: K,
    value: FormatSettings[K]
  ) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }))
  }

  async function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    const allowed = /\.(txt|md)$/i.test(file.name)

    if (!allowed) {
      setError('الرجاء اختيار ملف نصي بصيغة TXT أو MD.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('الحد الأقصى لحجم الملف النصي هو 2 ميجابايت.')
      return
    }

    try {
      const text = await file.text()
      setSourceText(text.slice(0, 18000))
      setNotice('تم تحميل النص بنجاح.')
      setError('')
    } catch {
      setError('تعذرت قراءة الملف. حاول استخدام ملف نصي آخر.')
    }
  }

  async function generateContent() {
    setError('')
    setNotice('')
    setLoading(true)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.access_token) {
        throw new Error('انتهت جلسة الدخول. سجّل الدخول مجددًا.')
      }

      const response = await fetch('/api/admin/file-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          prompt,
          documentType,
          university,
          requirements,
          sourceText,
          settings,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.error || 'تعذر إنشاء المحتوى.'
        )
      }

      setContent(result.content || '')
      setNotice('تم إنشاء المحتوى. راجعه قبل تنزيل الملف.')
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

  async function runExport(
    format: 'word' | 'powerpoint' | 'excel'
  ) {
    if (!content.trim()) {
      setError('أنشئ المحتوى أولًا قبل تصديره.')
      return
    }

    setError('')
    setNotice('')
    setExporting(format)

    try {
      const exportSettings: FormatSettings = {
        ...settings,
        title: settings.title.trim() ||
          documentTypes.find((item) => item.value === documentType)?.label ||
          'مستند منصة هديل',
        university: university.trim(),
      }

      if (format === 'word') {
        await exportWord(content, exportSettings)
      } else if (format === 'powerpoint') {
        await exportPowerPoint(content, exportSettings)
      } else {
        await exportExcel(content, exportSettings)
      }

      setNotice('تم تجهيز عملية التصدير. تحقق من مجلد التنزيلات.')
    } catch (err) {
      console.error('Hadeel export error:', err)
      setError(
        'تعذر تصدير الملف. تأكد من تثبيت المكتبات بنجاح ثم أعد المحاولة.'
      )
    } finally {
      setExporting('')
    }
  }

  function printDocument() {
    if (!content.trim()) {
      setError('أنشئ المحتوى أولًا قبل الطباعة.')
      return
    }

    setError('')
    setNotice(
      'في نافذة الطباعة، اختر حفظ بتنسيق PDF. راجع اتجاه العربية والخطوط قبل الحفظ.'
    )
    window.print()
  }

  if (checking) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50 p-6"
      >
        <LoaderCircle className="animate-spin text-blue-700" size={32} />
        <span className="mr-3 text-slate-700">
          جارٍ التحقق من صلاحيات الدخول...
        </span>
      </main>
    )
  }

  if (!authorized) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50 p-5"
      >
        <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <LockKeyhole
            className="mx-auto mb-4 text-amber-500"
            size={44}
          />
          <h1 className="text-xl font-bold text-slate-900">
            صلاحية المدير مطلوبة
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            هذه الأداة مخصصة لإدارة منصة هديل. سجّل الدخول بحساب المدير
            المعتمد للوصول إليها.
          </p>
          <Link
            href="/auth/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800"
          >
            تسجيل الدخول
          </Link>
          <div>
            <Link
              href="/account"
              className="mt-4 inline-block text-sm text-slate-500 hover:text-blue-700"
            >
              العودة إلى حسابي
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 overflow-hidden rounded-3xl bg-gradient-to-l from-slate-950 via-blue-950 to-blue-800 p-6 text-white shadow-lg sm:p-9">
          <Link
            href="/admin"
            className="mb-6 inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white"
          >
            <ArrowRight size={17} />
            العودة إلى لوحة الإدارة
          </Link>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm">
                <WandSparkles size={16} />
                أداة خاصة بإدارة المنصة
              </div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">
                مولّد الملفات الذكي
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                أنشئ المحتوى، راجعه، ثم صدّره إلى Word أو PowerPoint أو
                Excel، مع إعدادات أولية للتنسيق الأكاديمي.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
              <Bot size={35} />
            </div>
          </div>
        </header>

        {(error || notice) && (
          <div
            role="status"
            className={`mb-5 flex items-start gap-3 rounded-2xl border p-4 text-sm leading-6 ${
              error
                ? 'border-red-200 bg-red-50 text-red-800'
                : 'border-emerald-200 bg-emerald-50 text-emerald-800'
            }`}
          >
            {error ? (
              <LockKeyhole className="mt-0.5 shrink-0" size={18} />
            ) : (
              <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
            )}
            <span>{error || notice}</span>
          </div>
        )}

        <div className="grid items-start gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <WandSparkles size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    إعداد العمل
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    حدد نوع المستند واكتب المطلوب بالتفصيل.
                  </p>
                </div>
              </div>

              <label className="mb-2 block text-sm font-bold">
                نوع الملف
              </label>
              <div className="mb-5 grid gap-3 sm:grid-cols-2">
                {documentTypes.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setDocumentType(item.value)}
                    className={`rounded-2xl border p-4 text-right transition ${
                      documentType === item.value
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-100'
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block font-bold text-slate-900">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      {item.description}
                    </span>
                  </button>
                ))}
              </div>

              <label
                htmlFor="file-title"
                className="mb-2 block text-sm font-bold"
              >
                عنوان العمل
              </label>
              <input
                id="file-title"
                value={settings.title || ''}
                onChange={(event) =>
                  updateSetting('title', event.target.value)
                }
                placeholder="مثال: أثر التخطيط الاستراتيجي في الأداء المؤسسي"
                className="mb-5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <label
                htmlFor="university"
                className="mb-2 block text-sm font-bold"
              >
                الجامعة أو الجهة (اختياري)
              </label>
              <input
                id="university"
                value={university}
                onChange={(event) => setUniversity(event.target.value)}
                placeholder="اسم الجامعة أو الجهة"
                className="mb-5 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <label
                htmlFor="prompt"
                className="mb-2 block text-sm font-bold"
              >
                المطلوب من الذكاء الاصطناعي
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={6}
                maxLength={30000}
                placeholder="اكتب الموضوع، والأهداف، وعدد الصفحات أو الشرائح، والعناصر التي تريد تضمينها..."
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 leading-7 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <div className="mt-1 text-left text-xs text-slate-400">
                {prompt.length.toLocaleString('ar-SA')} / 30,000
              </div>

              <label
                htmlFor="requirements"
                className="mb-2 mt-4 block text-sm font-bold"
              >
                شروط إضافية
              </label>
              <textarea
                id="requirements"
                value={requirements}
                onChange={(event) => setRequirements(event.target.value)}
                rows={3}
                maxLength={6000}
                placeholder="نمط التوثيق، عدد الفصول، متطلبات الدكتور، معايير التقييم..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 leading-7 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <Upload className="text-blue-700" size={21} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">
                      الاستفادة من ملف نصي
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      TXT أو MD، بحد أقصى 2 ميجابايت.
                    </p>
                  </div>
                  <label className="cursor-pointer rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold hover:bg-slate-100">
                    اختيار ملف
                    <input
                      type="file"
                      accept=".txt,.md,text/plain,text/markdown"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {sourceText && (
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-white p-3 text-xs text-slate-600">
                    <span>
                      تم تحميل النص ({sourceText.length.toLocaleString('ar-SA')} حرف)
                    </span>
                    <button
                      type="button"
                      onClick={() => setSourceText('')}
                      className="font-bold text-red-600"
                    >
                      إزالة
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                disabled={loading || !prompt.trim()}
                onClick={generateContent}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-4 font-extrabold text-white shadow-md transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" size={21} />
                    جارٍ إنشاء المحتوى...
                  </>
                ) : (
                  <>
                    <WandSparkles size={21} />
                    إنشاء المحتوى بالذكاء الاصطناعي
                  </>
                )}
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                  <Settings2 size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    إعدادات التنسيق
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    تؤثر هذه الإعدادات في عمليات التصدير التي تدعمها.
                  </p>
                </div>
              </div>

              <label className="mb-2 block text-sm font-bold">
                نوع الخط
              </label>
              <select
                value={settings.fontFace}
                onChange={(event) =>
                  updateSetting('fontFace', event.target.value)
                }
                className="mb-5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <option value="Arial">Arial</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Traditional Arabic">Traditional Arabic</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>

              <label className="mb-2 block text-sm font-bold">
                حجم الخط: {settings.fontSize}
              </label>
              <input
                type="range"
                min={10}
                max={24}
                value={settings.fontSize}
                onChange={(event) =>
                  updateSetting('fontSize', Number(event.target.value))
                }
                className="mb-5 w-full accent-blue-700"
              />

              <div className="mb-5 grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="text-color"
                    className="mb-2 block text-sm font-bold"
                  >
                    لون النص
                  </label>
                  <input
                    id="text-color"
                    type="color"
                    value={settings.textColor}
                    onChange={(event) =>
                      updateSetting('textColor', event.target.value)
                    }
                    className="h-12 w-full cursor-pointer rounded-xl border border-slate-200 bg-white p-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="heading-color"
                    className="mb-2 block text-sm font-bold"
                  >
                    لون العناوين
                  </label>
                  <input
                    id="heading-color"
                    type="color"
                    value={settings.headingColor}
                    onChange={(event) =>
                      updateSetting('headingColor', event.target.value)
                    }
                    className="h-12 w-full cursor-pointer rounded-xl border border-slate-200 bg-white p-1"
                  />
                </div>
              </div>

              <label className="mb-2 block text-sm font-bold">
                الهوامش (سم تقريبًا)
              </label>
              <select
                value={settings.margin}
                onChange={(event) =>
                  updateSetting('margin', Number(event.target.value))
                }
                className="mb-5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <option value={1}>1 سم</option>
                <option value={1.5}>1.5 سم</option>
                <option value={2}>2 سم</option>
                <option value={2.5}>2.5 سم</option>
                <option value={3}>3 سم</option>
              </select>

              <label className="mb-3 flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={settings.includeCover}
                  onChange={(event) =>
                    updateSetting('includeCover', event.target.checked)
                  }
                  className="h-4 w-4 accent-blue-700"
                />
                إضافة صفحة غلاف أولية
              </label>

              <label className="flex cursor-pointer items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={settings.includePageNumbers}
                  onChange={(event) =>
                    updateSetting('includePageNumbers', event.target.checked)
                  }
                  className="h-4 w-4 accent-blue-700"
                />
                تفعيل خيار أرقام الصفحات للإصدارات التي تدعمه لاحقًا
              </label>

              <p className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-6 text-amber-900">
                ملاحظة: أرقام الصفحات والشعارات والتنسيق النهائي للغلاف
                لم تُفعّل بالكامل في محرك التصدير الحالي.
              </p>
            </div>
          </section>

          <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <FileText size={22} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    معاينة المحتوى وتحريره
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    راجع النص وصححه قبل تصدير الملفات.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setContent('')
                  setNotice('')
                  setError('')
                }}
                disabled={!content || loading || Boolean(exporting)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold hover:bg-slate-50 disabled:opacity-40"
              >
                <RefreshCw size={15} />
                مسح المحتوى
              </button>
            </div>

            <textarea
              aria-label="المحتوى الناتج"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="سيظهر المحتوى الذي تم إنشاؤه هنا، ويمكنك تعديله يدويًا..."
              className="min-h-[420px] w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-8 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 sm:min-h-[620px]"
              spellCheck
            />

            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
              <span>
                {content.length.toLocaleString('ar-SA')} حرف
              </span>
              <span>المحتوى قابل للتحرير</span>
            </div>

            <div className="mt-6">
              <h3 className="mb-3 font-bold text-slate-900">
                تنزيل الملف
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => void runExport('word')}
                  disabled={!content.trim() || Boolean(exporting)}
                  className="flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-right transition hover:bg-blue-100 disabled:opacity-50"
                >
                  <FileText className="shrink-0 text-blue-700" size={26} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-slate-900">
                      تنزيل Word
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      مستند قابل للتحرير
                    </span>
                  </span>
                  {exporting === 'word' ? (
                    <LoaderCircle className="animate-spin" size={18} />
                  ) : (
                    <Download size={18} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => void runExport('powerpoint')}
                  disabled={!content.trim() || Boolean(exporting)}
                  className="flex items-center gap-3 rounded-2xl border border-orange-200 bg-orange-50 p-4 text-right transition hover:bg-orange-100 disabled:opacity-50"
                >
                  <Presentation className="shrink-0 text-orange-700" size={26} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-slate-900">
                      تنزيل PowerPoint
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      عرض تقديمي أولي
                    </span>
                  </span>
                  {exporting === 'powerpoint' ? (
                    <LoaderCircle className="animate-spin" size={18} />
                  ) : (
                    <Download size={18} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => void runExport('excel')}
                  disabled={!content.trim() || Boolean(exporting)}
                  className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-right transition hover:bg-emerald-100 disabled:opacity-50"
                >
                  <FileSpreadsheet className="shrink-0 text-emerald-700" size={26} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-slate-900">
                      تنزيل Excel
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      جداول قابلة للتحرير
                    </span>
                  </span>
                  {exporting === 'excel' ? (
                    <LoaderCircle className="animate-spin" size={18} />
                  ) : (
                    <Download size={18} />
                  )}
                </button>

                <button
                  type="button"
                  onClick={printDocument}
                  disabled={!content.trim() || Boolean(exporting)}
                  className="flex items-center gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-right transition hover:bg-violet-100 disabled:opacity-50"
                >
                  <Printer className="shrink-0 text-violet-700" size={26} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-slate-900">
                      طباعة أو حفظ PDF
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      عبر نافذة الطباعة في المتصفح
                    </span>
                  </span>
                  <Download size={18} />
                </button>
              </div>

              <p className="mt-4 text-xs leading-6 text-slate-500">
                قبل تسليم أي ملف، راجع صحة المعلومات والمراجع وملاءمة
                التنسيق. حفظ PDF هنا يعتمد على نافذة الطباعة، وليس محرك
                PDF أكاديميًا مخصصًا.
              </p>
            </div>
          </section>
        </div>

        <footer className="mt-8 pb-4 text-center text-xs text-slate-400">
          منصة هديل · أدوات إعداد المحتوى للاستخدام الإداري
        </footer>
      </div>
    </main>
  )
}
