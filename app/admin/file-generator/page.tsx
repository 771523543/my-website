
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

import './file-generator.css'
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
}[] = [
  {
    value: 'research',
    label: 'بحث علمي',
    description: 'مقدمة وأهداف ومنهجية ودراسات ومراجع',
    icon: GraduationCap,
  },
  {
    value: 'assignment',
    label: 'تكليف جامعي',
    description: 'واجبات ومهام وتقارير دراسية',
    icon: BookOpen,
  },
  {
    value: 'presentation',
    label: 'عرض تقديمي',
    description: 'محتوى مقسم إلى شرائح PowerPoint',
    icon: Presentation,
  },
  {
    value: 'spreadsheet',
    label: 'جداول وتحليل بيانات',
    description: 'جداول منظمة وملخصات بيانات',
    icon: FileSpreadsheet,
  },
  {
    value: 'report',
    label: 'تقرير مهني',
    description: 'تقارير إدارية ومهنية منظمة',
    icon: ClipboardList,
  },
  {
    value: 'plan',
    label: 'خطة أو مشروع',
    description: 'خطط تنفيذية ومراحل ومؤشرات',
    icon: Settings2,
  },
]

const initialSettings: FormatSettings = {
  title: '',
  university: '',
  fontFace: 'Arial',
  fontSize: 14,
  textColor: '#243247',
  headingColor: '#142743',
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

  const selectedType = documentTypes.find(
    (item) => item.value === documentType
  )

  if (checking) {
    return (
      <main className="file-generator fg-center-screen" dir="rtl">
        <LoaderCircle className="fg-spin" size={30} />
        <span>جارٍ التحقق من صلاحيات المدير...</span>
      </main>
    )
  }

  if (!authorized) {
    return (
      <main className="file-generator fg-center-screen" dir="rtl">
        <section className="fg-access-card">
          <div className="fg-access-icon">
            <LockKeyhole size={30} />
          </div>
          <h1>صلاحية المدير مطلوبة</h1>
          <p>
            هذه الأداة مخصصة لإدارة منصة هديل. سجّل الدخول بالحساب
            المعتمد للمدير.
          </p>
          <Link href="/auth/login" className="fg-button fg-button-primary">
            تسجيل الدخول
          </Link>
          <Link href="/account" className="fg-back-link">
            العودة إلى حسابي
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="file-generator" dir="rtl">
      <div className="fg-container">
        <header className="fg-hero">
          <div className="fg-hero-content">
            <div className="fg-topbar">
              <Link href="/admin" className="fg-button fg-button-glass">
                <ArrowRight size={17} />
                لوحة الإدارة
              </Link>

              <span className="fg-eyebrow">
                <ShieldCheck size={16} />
                مساحة إدارية خاصة
              </span>
            </div>

            <div className="fg-hero-main">
              <div className="fg-hero-copy">
                <div className="fg-hero-label">
                  <Sparkles size={17} />
                  استوديو الإنتاج الأكاديمي
                </div>

                <h1>مولّد الملفات الذكي</h1>

                <p>
                  أنشئ محتواك، نظّمه، راجعه، ثم جهّزه للتصدير.
                  مساحة عمل تجمع أدوات إعداد المحتوى في واجهة واحدة.
                </p>

                <div className="fg-tags">
                  <span>أبحاث وتقارير</span>
                  <span>عروض تقديمية</span>
                  <span>جداول وبيانات</span>
                </div>
              </div>

              <div className="fg-hero-art">
                <Bot size={64} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </header>

        {(error || notice) && (
          <div
            role="status"
            className={`fg-message ${
              error ? 'fg-message-error' : 'fg-message-success'
            }`}
          >
            {error ? (
              <LockKeyhole size={19} />
            ) : (
              <CheckCircle2 size={19} />
            )}

            <span className="fg-message-text">{error || notice}</span>

            <button
              type="button"
              onClick={() => {
                setError('')
                setNotice('')
              }}
              aria-label="إغلاق الرسالة"
              className="fg-close-button"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <section className="fg-stats">
          <div className="fg-stat-card">
            <div className="fg-stat-icon">
              <FileText size={23} />
            </div>
            <div className="fg-stat-copy">
              <span>نوع العمل</span>
              <strong>{selectedType?.label}</strong>
            </div>
          </div>

          <div className="fg-stat-card">
            <div className="fg-stat-icon">
              <CheckCircle2 size={23} />
            </div>
            <div className="fg-stat-copy">
              <span>حالة المحتوى</span>
              <strong>
                {content.trim() ? 'جاهز للمراجعة' : 'بانتظار الإنشاء'}
              </strong>
            </div>
          </div>

          <div className="fg-stat-card">
            <div className="fg-stat-icon">
              <Settings2 size={23} />
            </div>
            <div className="fg-stat-copy">
              <span>حجم النص الحالي</span>
              <strong>{content.length.toLocaleString('ar-SA')} حرف</strong>
            </div>
          </div>
        </section>

        <div className="fg-workspace">
          <section className="fg-panel">
            <div className="fg-panel-heading">
              <div className="fg-section-icon">
                <WandSparkles size={24} />
              </div>
              <div>
                <h2>إعداد وإنشاء العمل</h2>
                <p>حدد نوع الملف ثم اكتب التفاصيل المطلوبة.</p>
              </div>
            </div>

            <div className="fg-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'create'}
                onClick={() => setActiveTab('create')}
                className={`fg-tab ${
                  activeTab === 'create' ? 'is-active' : ''
                }`}
              >
                <WandSparkles size={17} />
                إعداد العمل
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'format'}
                onClick={() => setActiveTab('format')}
                className={`fg-tab ${
                  activeTab === 'format' ? 'is-active' : ''
                }`}
              >
                <Settings2 size={17} />
                التنسيق
              </button>
            </div>

            {activeTab === 'create' ? (
              <div className="fg-form-stack">
                <div className="fg-field">
                  <label>1. ماذا تريد أن تنشئ؟</label>

                  <div className="fg-type-grid">
                    {documentTypes.map((item) => {
                      const Icon = item.icon
                      const selected = documentType === item.value

                      return (
                        <button
                          key={item.value}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setDocumentType(item.value)}
                          className={`fg-type-card ${
                            selected ? 'is-active' : ''
                          }`}
                        >
                          <span className="fg-type-icon">
                            <Icon size={24} />
                          </span>
                          <strong>{item.label}</strong>
                          <span>{item.description}</span>
                          {selected && (
                            <span className="fg-selected-mark">
                              <CheckCircle2 size={17} />
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="fg-field">
                  <label htmlFor="file-title">2. عنوان العمل</label>
                  <input
                    id="file-title"
                    value={settings.title || ''}
                    onChange={(event) =>
                      updateSetting('title', event.target.value)
                    }
                    placeholder="اكتب عنوانًا واضحًا للعمل"
                  />
                </div>

                <div className="fg-field">
                  <label htmlFor="university">
                    الجامعة أو الجهة <span>(اختياري)</span>
                  </label>
                  <input
                    id="university"
                    value={university}
                    onChange={(event) => setUniversity(event.target.value)}
                    placeholder="مثال: جامعة الملك سعود"
                  />
                </div>

                <div className="fg-field">
                  <label htmlFor="prompt">3. تفاصيل المطلوب</label>
                  <span className="fg-field-hint">
                    {prompt.length.toLocaleString('ar-SA')} / 30,000
                  </span>
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)}
                    rows={6}
                    maxLength={30000}
                    placeholder="اشرح موضوع العمل، وأهدافه، وعدد الصفحات أو الشرائح، والفئة المستهدفة، والعناصر التي تريد تضمينها..."
                  />
                </div>

                <div className="fg-field">
                  <label htmlFor="requirements">
                    شروط ومتطلبات إضافية
                  </label>
                  <textarea
                    id="requirements"
                    value={requirements}
                    onChange={(event) =>
                      setRequirements(event.target.value)
                    }
                    rows={3}
                    maxLength={6000}
                    placeholder="التوثيق المطلوب، عدد الفصول، معايير التقييم، تعليمات الجهة..."
                  />
                </div>

                <div className="fg-upload-box">
                  <div className="fg-upload-icon">
                    <Upload size={22} />
                  </div>
                  <div className="fg-upload-content">
                    <strong>أضف ملفًا نصيًا مرجعيًا</strong>
                    <p>
                      يدعم TXT وMD حتى 2 ميجابايت. يُرسل النص ضمن طلب الإنشاء.
                    </p>

                    <label className="fg-button fg-button-secondary fg-file-label">
                      <Upload size={17} />
                      اختيار ملف
                      <input
                        type="file"
                        accept=".txt,.md,text/plain,text/markdown"
                        onChange={handleFileUpload}
                      />
                    </label>

                    {sourceText && (
                      <div className="fg-source-file">
                        <span>
                          {sourceName}
                          <small>
                            {sourceText.length.toLocaleString('ar-SA')} حرف
                          </small>
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setSourceText('')
                            setSourceName('')
                          }}
                          aria-label="إزالة الملف"
                        >
                          <X size={17} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="fg-form-stack">
                <div className="fg-settings-intro">
                  <h3>الخطوط والألوان</h3>
                  <p>
                    اختر المظهر الذي يناسب المستند. يعتمد تطبيق الإعدادات
                    على دعم محرك التصدير.
                  </p>
                </div>

                <div className="fg-field">
                  <label htmlFor="font-face">نوع الخط</label>
                  <select
                    id="font-face"
                    value={settings.fontFace}
                    onChange={(event) =>
                      updateSetting('fontFace', event.target.value)
                    }
                  >
                    <option value="Arial">Arial</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Traditional Arabic">Traditional Arabic</option>
                    <option value="Times New Roman">Times New Roman</option>
                  </select>
                </div>

                <div className="fg-field">
                  <label htmlFor="font-size">
                    حجم الخط: {settings.fontSize}
                  </label>
                  <input
                    id="font-size"
                    type="range"
                    min={10}
                    max={24}
                    value={settings.fontSize}
                    onChange={(event) =>
                      updateSetting('fontSize', Number(event.target.value))
                    }
                  />
                </div>

                <div className="fg-color-grid">
                  <div className="fg-field">
                    <label htmlFor="text-color">لون النص</label>
                    <input
                      id="text-color"
                      type="color"
                      value={settings.textColor}
                      onChange={(event) =>
                        updateSetting('textColor', event.target.value)
                      }
                    />
                  </div>

                  <div className="fg-field">
                    <label htmlFor="heading-color">لون العناوين</label>
                    <input
                      id="heading-color"
                      type="color"
                      value={settings.headingColor}
                      onChange={(event) =>
                        updateSetting('headingColor', event.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="fg-field">
                  <label htmlFor="margin">الهوامش التقريبية</label>
                  <select
                    id="margin"
                    value={settings.margin}
                    onChange={(event) =>
                      updateSetting('margin', Number(event.target.value))
                    }
                  >
                    <option value={1}>1 سم</option>
                    <option value={1.5}>1.5 سم</option>
                    <option value={2}>2 سم</option>
                    <option value={2.5}>2.5 سم</option>
                    <option value={3}>3 سم</option>
                  </select>
                </div>

                <label className="fg-check-option">
                  <input
                    type="checkbox"
                    checked={settings.includeCover}
                    onChange={(event) =>
                      updateSetting('includeCover', event.target.checked)
                    }
                  />
                  <span>
                    <strong>إضافة صفحة غلاف</strong>
                    <small>
                      يتوقف شكل الغلاف ومحتواه على دعم محرك التصدير.
                    </small>
                  </span>
                </label>

                <label className="fg-check-option">
                  <input
                    type="checkbox"
                    checked={settings.includePageNumbers}
                    onChange={(event) =>
                      updateSetting(
                        'includePageNumbers',
                        event.target.checked
                      )
                    }
                  />
                  <span>
                    <strong>طلب ترقيم الصفحات</strong>
                    <small>
                      يلزم دعم هذه الميزة داخل محرك التصدير نفسه.
                    </small>
                  </span>
                </label>

                <div className="fg-message fg-message-info">
                  الشعارات وترقيم الصفحات والتنسيق النهائي لا تُضمن بمجرد
                  تغيير الإعدادات؛ يجب أن يدعمها محرك التصدير.
                </div>
              </div>
            )}

            <button
              type="button"
              disabled={loading || !prompt.trim()}
              onClick={() => void generateContent()}
              className="fg-button fg-button-primary fg-generate-button"
            >
              {loading ? (
                <>
                  <LoaderCircle className="fg-spin" size={21} />
                  جارٍ إنشاء المحتوى...
                </>
              ) : (
                <>
                  <WandSparkles size={21} />
                  إنشاء المحتوى بالذكاء الاصطناعي
                </>
              )}
            </button>

            <p className="fg-footnote">
              راجع المعلومات والمراجع الناتجة قبل اعتماد أي مستند.
            </p>
          </section>

          <section className="fg-panel">
            <div className="fg-panel-heading fg-editor-heading">
              <div className="fg-section-icon">
                <FileText size={24} />
              </div>
              <div>
                <h2>مساحة المستند</h2>
                <p>حرّر المحتوى ثم اختر صيغة التصدير المناسبة.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setContent('')
                  setNotice('')
                  setError('')
                }}
                disabled={!content || loading || Boolean(exporting)}
                className="fg-button fg-button-secondary fg-clear-button"
              >
                <RefreshCw size={15} />
                مسح المحتوى
              </button>
            </div>

            <div className="fg-editor-toolbar">
              <strong>
                <span className="fg-status-dot" />
                محرر المحتوى
              </strong>
              <span>{content.length.toLocaleString('ar-SA')} حرف</span>
            </div>

            <textarea
              aria-label="المحتوى الناتج"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder={
                'سيظهر المحتوى هنا بعد الإنشاء...\n\nيمكنك تعديل النص يدويًا قبل التصدير.'
              }
              className="fg-document-editor"
              spellCheck
            />

            <div className="fg-editor-meta">
              <span>
                {content.trim()
                  ? 'يمكنك تعديل النص مباشرة'
                  : 'لم يُنشأ المحتوى بعد'}
              </span>
              <span>{settings.fontFace}</span>
            </div>

            <div className="fg-export-heading">
              <h3>تصدير وتنزيل</h3>
              <p>
                اختر نوع الملف بعد مراجعة النص. تعتمد النتيجة النهائية
                على محرك التصدير.
              </p>
            </div>

            <div className="fg-export-grid">
              <button
                type="button"
                onClick={() => void runExport('word')}
                disabled={!content.trim() || Boolean(exporting)}
                className="fg-export-card fg-export-word"
              >
                <span className="fg-export-icon">
                  {exporting === 'word' ? (
                    <LoaderCircle className="fg-spin" size={23} />
                  ) : (
                    <FileText size={23} />
                  )}
                </span>
                <span className="fg-export-copy">
                  <strong>ملف Word</strong>
                  <small>مستند قابل للتحرير</small>
                </span>
                <Download size={18} />
              </button>

              <button
                type="button"
                onClick={() => void runExport('powerpoint')}
                disabled={!content.trim() || Boolean(exporting)}
                className="fg-export-card fg-export-powerpoint"
              >
                <span className="fg-export-icon">
                  {exporting === 'powerpoint' ? (
                    <LoaderCircle className="fg-spin" size={23} />
                  ) : (
                    <Presentation size={23} />
                  )}
                </span>
                <span className="fg-export-copy">
                  <strong>PowerPoint</strong>
                  <small>عرض تقديمي</small>
                </span>
                <Download size={18} />
              </button>

              <button
                type="button"
                onClick={() => void runExport('excel')}
                disabled={!content.trim() || Boolean(exporting)}
                className="fg-export-card fg-export-excel"
              >
                <span className="fg-export-icon">
                  {exporting === 'excel' ? (
                    <LoaderCircle className="fg-spin" size={23} />
                  ) : (
                    <FileSpreadsheet size={23} />
                  )}
                </span>
                <span className="fg-export-copy">
                  <strong>Excel</strong>
                  <small>جداول قابلة للتحرير</small>
                </span>
                <Download size={18} />
              </button>

              <button
                type="button"
                onClick={printDocument}
                disabled={!content.trim() || Boolean(exporting)}
                className="fg-export-card fg-export-pdf"
              >
                <span className="fg-export-icon">
                  <Printer size={23} />
                </span>
                <span className="fg-export-copy">
                  <strong>طباعة أو PDF</strong>
                  <small>عبر نافذة الطباعة</small>
                </span>
                <Download size={18} />
              </button>
            </div>

            <div className="fg-message fg-message-info fg-security-note">
              <LockKeyhole size={18} />
              <span>
                هذه الأداة مخصصة للاستخدام الإداري. راجع دقة المعلومات
                والمراجع بنفسك. تصدير PDF هنا يعتمد على نافذة الطباعة،
                ولا يعني أن الشعارات أو أرقام الصفحات أو الهوامش الأكاديمية
                مطبقة تلقائيًا.
              </span>
            </div>
          </section>
        </div>

        <footer className="fg-footer">
          <Sparkles size={15} />
          منصة هديل · استوديو إعداد المحتوى
        </footer>
      </div>
    </main>
  )
}
