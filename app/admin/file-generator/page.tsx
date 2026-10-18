
'use client'

import { useEffect, useState, type ChangeEvent } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  LoaderCircle,
  LockKeyhole,
  Presentation,
  Printer,
  RefreshCw,
  Settings2,
  ShieldCheck,
  Sparkles,
  Upload,
  WandSparkles,
  X,
  BookOpen,
  ClipboardList,
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
  icon: typeof FileText
  color: string
  active: string
}[] = [
  {
    value: 'research',
    label: 'بحث علمي',
    description: 'مقدمة وأهداف ومنهجية ودراسات ومراجع',
    icon: GraduationCap,
    color: 'text-blue-700 bg-blue-50',
    active: 'border-blue-500 bg-blue-50 ring-2 ring-blue-100',
  },
  {
    value: 'assignment',
    label: 'تكليف جامعي',
    description: 'واجبات ومهام وتقارير دراسية',
    icon: BookOpen,
    color: 'text-violet-700 bg-violet-50',
    active: 'border-violet-500 bg-violet-50 ring-2 ring-violet-100',
  },
  {
    value: 'presentation',
    label: 'عرض تقديمي',
    description: 'محتوى مقسم إلى شرائح PowerPoint',
    icon: Presentation,
    color: 'text-orange-700 bg-orange-50',
    active: 'border-orange-500 bg-orange-50 ring-2 ring-orange-100',
  },
  {
    value: 'spreadsheet',
    label: 'جداول وتحليل بيانات',
    description: 'جداول منظمة وملخصات بيانات',
    icon: FileSpreadsheet,
    color: 'text-emerald-700 bg-emerald-50',
    active: 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100',
  },
  {
    value: 'report',
    label: 'تقرير مهني',
    description: 'تقارير إدارية ومهنية منظمة',
    icon: ClipboardList,
    color: 'text-amber-700 bg-amber-50',
    active: 'border-amber-500 bg-amber-50 ring-2 ring-amber-100',
  },
  {
    value: 'plan',
    label: 'خطة أو مشروع',
    description: 'خطط تنفيذية ومراحل ومؤشرات',
    icon: Settings2,
    color: 'text-cyan-700 bg-cyan-50',
    active: 'border-cyan-500 bg-cyan-50 ring-2 ring-cyan-100',
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
  const [activeTab, setActiveTab] = useState<'create' | 'format'>('create')

  const [documentType, setDocumentType] =
    useState<DocumentType>('research')
  const [prompt, setPrompt] = useState('')
  const [university, setUniversity] = useState('')
  const [requirements, setRequirements] = useState('')
  const [sourceText, setSourceText] = useState('')
  const [sourceName, setSourceName] = useState('')
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
    setSettings((current) => ({ ...current, [key]: value }))
  }

  async function handleFileUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    if (!/\.(txt|md)$/i.test(file.name)) {
      setError('اختر ملفًا نصيًا بصيغة TXT أو MD.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('الحد الأقصى لحجم الملف هو 2 ميجابايت.')
      return
    }

    try {
      const text = await file.text()
      setSourceText(text.slice(0, 18000))
      setSourceName(file.name)
      setError('')
      setNotice('تم تحميل النص بنجاح، ويمكنك استخدامه ضمن طلبك.')
    } catch {
      setError('تعذرت قراءة الملف. حاول استخدام ملف نصي آخر.')
    }
  }

  async function generateContent() {
    if (!prompt.trim()) {
      setError('اكتب موضوع العمل المطلوب أولًا.')
      return
    }

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
        throw new Error(result.error || 'تعذر إنشاء المحتوى.')
      }

      setContent(result.content || '')
      setNotice('تم إنشاء المحتوى. راجعه وعدّله قبل التصدير.')
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
        title:
          settings.title.trim() ||
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

      setNotice('تمت عملية التصدير. تحقق من مجلد التنزيلات.')
    } catch (err) {
      console.error('Hadeel export error:', err)
      setError(
        'تعذر تصدير الملف. تحقق من مكتبات التصدير ثم أعد المحاولة.'
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
      'اختر «حفظ بتنسيق PDF» من نافذة الطباعة. راجع اتجاه النص وتنسيقه قبل الحفظ.'
    )
    window.print()
  }

  if (checking) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center gap-3 bg-slate-50 p-6"
      >
        <LoaderCircle className="animate-spin text-blue-700" size={30} />
        <span className="text-sm font-bold text-slate-700">
          جارٍ التحقق من صلاحيات المدير...
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
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <LockKeyhole size={32} />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900">
            صلاحية المدير مطلوبة
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            هذه الأداة مخصصة لإدارة منصة هديل. سجّل الدخول بالحساب
            المعتمد للمدير.
          </p>
          <Link
            href="/auth/login"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-5 py-3 font-bold text-white transition hover:bg-blue-800"
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/account"
            className="mt-4 inline-block text-sm text-slate-500 hover:text-blue-700"
          >
            العودة إلى حسابي
          </Link>
        </section>
      </main>
    )
  }

  const selectedType = documentTypes.find(
    (item) => item.value === documentType
  )
  const SelectedIcon = selectedType?.icon || FileText

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#f4f7fc] px-3 py-4 text-slate-800 sm:px-6 sm:py-7 lg:px-8"
    >
      <div className="mx-auto max-w-[1500px]">
        <header className="relative mb-6 overflow-hidden rounded-[28px] bg-gradient-to-l from-[#10294f] via-[#173f78] to-[#2459a9] p-5 text-white shadow-xl sm:p-8 lg:p-9">
          <div className="pointer-events-none absolute -left-10 -top-16 h-56 w-56 rounded-full border-[35px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

          <div className="relative">
            <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
              >
                <ArrowRight size={17} />
                لوحة الإدارة
              </Link>

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-2 text-xs font-bold text-emerald-100">
                <ShieldCheck size={16} />
                مساحة إدارية خاصة
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-blue-100">
                  <Sparkles size={17} />
                  استوديو الإنتاج الأكاديمي
                </div>
                <h1 className="text-2xl font-black leading-tight sm:text-4xl lg:text-[42px]">
                  مولّد الملفات الذكي
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
                  أنشئ محتواك، نظّمه، راجعه، ثم جهّزه للتصدير.
                  مساحة عمل تجمع أدوات إعداد المحتوى في واجهة واحدة.
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-blue-50">
                  <span className="rounded-full bg-white/10 px-3 py-2">
                    أبحاث وتقارير
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-2">
                    عروض تقديمية
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-2">
                    جداول وبيانات
                  </span>
                </div>
              </div>

              <div className="hidden h-28 w-28 shrink-0 items-center justify-center rounded-[30px] border border-white/20 bg-white/10 shadow-inner sm:flex lg:h-36 lg:w-36">
                <Bot size={66} strokeWidth={1.4} />
              </div>
            </div>
          </div>
        </header>

        {(error || notice) && (
          <div
            role="status"
            className={`mb-5 flex items-start gap-3 rounded-2xl border p-4 text-sm leading-7 ${
              error
                ? 'border-red-200 bg-red-50 text-red-800'
                : 'border-emerald-200 bg-emerald-50 text-emerald-800'
            }`}
          >
            {error ? (
              <LockKeyhole className="mt-1 shrink-0" size={19} />
            ) : (
              <CheckCircle2 className="mt-1 shrink-0" size={19} />
            )}
            <span className="flex-1">{error || notice}</span>
            <button
              type="button"
              onClick={() => {
                setError('')
                setNotice('')
              }}
              aria-label="إغلاق الرسالة"
              className="rounded-lg p-1 opacity-70 hover:bg-black/5 hover:opacity-100"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <FileText size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-500">نوع العمل</p>
              <p className="mt-1 font-extrabold text-slate-900">
                {selectedType?.label}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-500">حالة المحتوى</p>
              <p className="mt-1 font-extrabold text-slate-900">
                {content.trim() ? 'جاهز للمراجعة' : 'بانتظار الإنشاء'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <Settings2 size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-500">حجم النص الحالي</p>
              <p className="mt-1 font-extrabold text-slate-900">
                {content.length.toLocaleString('ar-SA')} حرف
              </p>
            </div>
          </div>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <section className="min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <WandSparkles size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    إعداد وإنشاء العمل
                  </h2>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    حدد نوع الملف ثم اكتب التفاصيل المطلوبة.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('create')}
                  className={`rounded-lg px-3 py-3 text-sm font-extrabold transition ${
                    activeTab === 'create'
                      ? 'bg-white text-blue-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <WandSparkles size={16} />
                    إعداد العمل
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('format')}
                  className={`rounded-lg px-3 py-3 text-sm font-extrabold transition ${
                    activeTab === 'format'
                      ? 'bg-white text-blue-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <Settings2 size={16} />
                    التنسيق
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              {activeTab === 'create' ? (
                <>
                  <div>
                    <label className="mb-3 block text-sm font-extrabold text-slate-800">
                      1. ماذا تريد أن تنشئ؟
                    </label>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {documentTypes.map((item) => {
                        const Icon = item.icon
                        const selected = documentType === item.value

                        return (
                          <button
                            key={item.value}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => setDocumentType(item.value)}
                            className={`flex min-h-[100px] items-start gap-3 rounded-2xl border p-3 text-right transition duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
                              selected
                                ? item.active
                                : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                            >
                              <Icon size={21} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-extrabold text-slate-900">
                                {item.label}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-slate-500">
                                {item.description}
                              </span>
                            </span>
                            {selected && (
                              <CheckCircle2
                                size={17}
                                className="shrink-0 text-blue-700"
                              />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="file-title"
                      className="mb-2 block text-sm font-bold"
                    >
                      2. عنوان العمل
                    </label>
                    <input
                      id="file-title"
                      value={settings.title || ''}
                      onChange={(event) =>
                        updateSetting('title', event.target.value)
                      }
                      placeholder="اكتب عنوانًا واضحًا للعمل"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="university"
                      className="mb-2 block text-sm font-bold"
                    >
                      الجامعة أو الجهة <span className="font-normal text-slate-400">(اختياري)</span>
                    </label>
                    <input
                      id="university"
                      value={university}
                      onChange={(event) => setUniversity(event.target.value)}
                      placeholder="مثال: جامعة الملك سعود"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <label
                        htmlFor="prompt"
                        className="text-sm font-extrabold"
                      >
                        3. تفاصيل المطلوب
                      </label>
                      <span className="text-xs text-slate-400">
                        {prompt.length.toLocaleString('ar-SA')} / 30,000
                      </span>
                    </div>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(event) => setPrompt(event.target.value)}
                      rows={6}
                      maxLength={30000}
                      placeholder="اشرح موضوع العمل، وأهدافه، وعدد الصفحات أو الشرائح، والفئة المستهدفة، والعناصر التي تريد تضمينها..."
                      className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="requirements"
                      className="mb-2 block text-sm font-bold"
                    >
                      شروط ومتطلبات إضافية
                    </label>
                    <textarea
                      id="requirements"
                      value={requirements}
                      onChange={(event) => setRequirements(event.target.value)}
                      rows={3}
                      maxLength={6000}
                      placeholder="التوثيق المطلوب، عدد الفصول، معايير التقييم، تعليمات الجهة..."
                      className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/60 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                        <Upload size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-extrabold text-slate-800">
                          أضف ملفًا نصيًا مرجعيًا
                        </p>
                        <p className="mt-1 text-xs leading-6 text-slate-500">
                          يدعم TXT وMD حتى 2 ميجابايت. يُرسل النص ضمن طلب الإنشاء.
                        </p>
                        <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-bold text-blue-800 transition hover:bg-blue-50">
                          <Upload size={16} />
                          اختيار ملف
                          <input
                            type="file"
                            accept=".txt,.md,text/plain,text/markdown"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                        {sourceText && (
                          <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-blue-100 bg-white p-3">
                            <span className="min-w-0 text-xs leading-5 text-slate-600">
                              {sourceName}
                              <span className="block text-slate-400">
                                {sourceText.length.toLocaleString('ar-SA')} حرف
                              </span>
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setSourceText('')
                                setSourceName('')
                              }}
                              className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                              aria-label="إزالة الملف"
                            >
                              <X size={17} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-extrabold text-slate-900">
                      الخطوط والألوان
                    </h3>
                    <p className="mt-1 text-xs leading-6 text-slate-500">
                      اختر المظهر الذي يناسب المستند. يعتمد تطبيق الإعدادات على دعم محرك التصدير.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      نوع الخط
                    </label>
                    <select
                      value={settings.fontFace}
                      onChange={(event) =>
                        updateSetting('fontFace', event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Tahoma">Tahoma</option>
                      <option value="Traditional Arabic">Traditional Arabic</option>
                      <option value="Times New Roman">Times New Roman</option>
                    </select>
                  </div>

                  <div>
                    <div className="mb-2 flex justify-between text-sm font-bold">
                      <label htmlFor="font-size">حجم الخط</label>
                      <span className="text-blue-700">
                        {settings.fontSize}
                      </span>
                    </div>
                    <input
                      id="font-size"
                      type="range"
                      min={10}
                      max={24}
                      value={settings.fontSize}
                      onChange={(event) =>
                        updateSetting('fontSize', Number(event.target.value))
                      }
                      className="w-full accent-blue-700"
                    />
                    <div className="mt-1 flex justify-between text-xs text-slate-400">
                      <span>10</span>
                      <span>24</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 p-3">
                      <label
                        htmlFor="text-color"
                        className="mb-3 block text-sm font-bold"
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
                        className="h-12 w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
                      />
                    </div>
                    <div className="rounded-2xl border border-slate-200 p-3">
                      <label
                        htmlFor="heading-color"
                        className="mb-3 block text-sm font-bold"
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
                        className="h-12 w-full cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold">
                      الهوامش التقريبية
                    </label>
                    <select
                      value={settings.margin}
                      onChange={(event) =>
                        updateSetting('margin', Number(event.target.value))
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
                    >
                      <option value={1}>1 سم</option>
                      <option value={1.5}>1.5 سم</option>
                      <option value={2}>2 سم</option>
                      <option value={2.5}>2.5 سم</option>
                      <option value={3}>3 سم</option>
                    </select>
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
                    <input
                      type="checkbox"
                      checked={settings.includeCover}
                      onChange={(event) =>
                        updateSetting('includeCover', event.target.checked)
                      }
                      className="mt-1 h-4 w-4 accent-blue-700"
                    />
                    <span>
                      <span className="block text-sm font-bold">
                        إضافة صفحة غلاف
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">
                        يتوقف شكل الغلاف ومحتواه على دعم محرك التصدير.
                      </span>
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4">
                    <input
                      type="checkbox"
                      checked={settings.includePageNumbers}
                      onChange={(event) =>
                        updateSetting('includePageNumbers', event.target.checked)
                      }
                      className="mt-1 h-4 w-4 accent-blue-700"
                    />
                    <span>
                      <span className="block text-sm font-bold">
                        طلب ترقيم الصفحات
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">
                        يلزم دعم هذه الميزة داخل محرك التصدير نفسه.
                      </span>
                    </span>
                  </label>

                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-900">
                    الشعارات وترقيم الصفحات والتنسيق النهائي لا تُضمن بمجرد تغيير الإعدادات؛ يجب أن يدعمها محرك التصدير.
                  </div>
                </div>
              )}

              <button
                type="button"
                disabled={loading || !prompt.trim()}
                onClick={() => void generateContent()}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-l from-blue-800 to-blue-600 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-blue-900/10 transition hover:-translate-y-0.5 hover:from-blue-900 hover:to-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
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

              <p className="text-center text-xs leading-6 text-slate-400">
                راجع المعلومات والمراجع الناتجة قبل اعتماد أي مستند.
              </p>
            </div>
          </section>

          <section className="min-w-0 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-slate-900">
                      مساحة المستند
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      حرّر المحتوى ثم اختر صيغة التصدير المناسبة.
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
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-40"
                >
                  <RefreshCw size={15} />
                  مسح المحتوى
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  محرر المحتوى
                </div>
                <span className="text-xs text-slate-400">
                  {content.length.toLocaleString('ar-SA')} حرف
                </span>
              </div>

              <textarea
                aria-label="المحتوى الناتج"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder={'سيظهر المحتوى هنا بعد الإنشاء...\n\nيمكنك تعديل النص يدويًا قبل التصدير.'}
                className="min-h-[420px] w-full resize-y rounded-2xl border border-slate-200 bg-[#fbfcff] p-4 text-sm leading-8 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50 sm:min-h-[650px] sm:p-5"
                spellCheck
              />

              <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-400">
                <span>
                  {content.trim() ? 'يمكنك تعديل النص مباشرة' : 'لم يُنشأ المحتوى بعد'}
                </span>
                <span>{settings.fontFace}</span>
              </div>

              <div className="my-6 border-t border-slate-100" />

              <div className="mb-4">
                <h3 className="font-extrabold text-slate-900">
                  تصدير وتنزيل
                </h3>
                <p className="mt-1 text-xs leading-6 text-slate-500">
                  اختر نوع الملف بعد مراجعة النص. تعتمد النتيجة النهائية على محرك التصدير.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => void runExport('word')}
                  disabled={!content.trim() || Boolean(exporting)}
                  className="group flex items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50/70 p-4 text-right transition hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                    {exporting === 'word' ? (
                      <LoaderCircle className="animate-spin" size={23} />
                    ) : (
                      <FileText size={23} />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-extrabold text-slate-900">
                      ملف Word
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      مستند قابل للتحرير
                    </span>
                  </span>
                  <Download size={18} className="shrink-0 text-blue-700" />
                </button>

                <button
                  type="button"
                  onClick={() => void runExport('powerpoint')}
                  disabled={!content.trim() || Boolean(exporting)}
                  className="group flex items-center gap-3 rounded-2xl border border-orange-200 bg-orange-50/70 p-4 text-right transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-50 hover:shadow-sm disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-orange-700 shadow-sm">
                    {exporting === 'powerpoint' ? (
                      <LoaderCircle className="animate-spin" size={23} />
                    ) : (
                      <Presentation size={23} />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-extrabold text-slate-900">
                      PowerPoint
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      عرض تقديمي
                    </span>
                  </span>
                  <Download size={18} className="shrink-0 text-orange-700" />
                </button>

                <button
                  type="button"
                  onClick={() => void runExport('excel')}
                  disabled={!content.trim() || Boolean(exporting)}
                  className="group flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-right transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-sm disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                    {exporting === 'excel' ? (
                      <LoaderCircle className="animate-spin" size={23} />
                    ) : (
                      <FileSpreadsheet size={23} />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-extrabold text-slate-900">
                      Excel
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      جداول قابلة للتحرير
                    </span>
                  </span>
                  <Download size={18} className="shrink-0 text-emerald-700" />
                </button>

                <button
                  type="button"
                  onClick={printDocument}
                  disabled={!content.trim() || Boolean(exporting)}
                  className="group flex items-center gap-3 rounded-2xl border border-violet-200 bg-violet-50/70 p-4 text-right transition hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50 hover:shadow-sm disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-violet-700 shadow-sm">
                    <Printer size={23} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-extrabold text-slate-900">
                      طباعة أو PDF
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      عبر نافذة الطباعة
                    </span>
                  </span>
                  <Download size={18} className="shrink-0 text-violet-700" />
                </button>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <LockKeyhole className="mt-0.5 shrink-0 text-amber-700" size={18} />
                <p className="text-xs leading-6 text-amber-900">
                  هذه الأداة مخصصة للاستخدام الإداري. راجع دقة المعلومات والمراجع بنفسك. تصدير PDF هنا يعتمد على نافذة الطباعة، ولا يعني أن الشعارات أو أرقام الصفحات أو الهوامش الأكاديمية مطبقة تلقائيًا.
                </p>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-8 pb-4 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
            <Sparkles size={14} />
            منصة هديل · استوديو إعداد المحتوى
          </div>
        </footer>
      </div>
    </main>
  )
}
