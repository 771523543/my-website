
'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  GraduationCap,
  Plus,
  Save,
  Pencil,
  Trash2,
  Upload,
  FileText,
  LoaderCircle,
  RefreshCw,
  ExternalLink,
  BookOpen,
  MapPin,
  Globe,
  FolderOpen,
  BookMarked,
  Search,
  X,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

type University = {
  id: string
  slug: string
  name: string
  name_en: string | null
  city: string | null
  description: string | null
  founded: number | null
  logo_url: string | null
  official_url: string | null
  student_portal_url: string | null
  published: boolean
  display_order: number
}

type College = {
  id: string
  university_id: string
  name: string
  description: string | null
  display_order: number
}

type Major = {
  id: string
  college_id: string
  name: string
  degree: string | null
  description: string | null
}

type UniversityFile = {
  id: string
  university_id: string
  title: string
  file_url: string
  file_type: string | null
  category: 'files' | 'resources'
  display_order: number
}

const emptyForm = {
  slug: '',
  name: '',
  name_en: '',
  city: '',
  description: '',
  founded: '',
  official_url: '',
  student_portal_url: '',
  published: false,
  display_order: '0',
}

const MAX_FILE_SIZE = 20 * 1024 * 1024
const MAX_LOGO_SIZE = 10 * 1024 * 1024

const allowedExtensions = [
  'pdf', 'doc', 'docx', 'ppt', 'pptx',
  'xls', 'xlsx', 'png', 'jpg', 'jpeg', 'webp',
]

export default function AdminUniversitiesPage() {
  const router = useRouter()

  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [search, setSearch] = useState('')

  const [universities, setUniversities] = useState<University[]>([])
  const [selectedId, setSelectedId] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [logoFile, setLogoFile] = useState<File | null>(null)

  const [colleges, setColleges] = useState<College[]>([])
  const [selectedCollegeId, setSelectedCollegeId] = useState('')
  const [collegeName, setCollegeName] = useState('')
  const [collegeDescription, setCollegeDescription] = useState('')

  const [majors, setMajors] = useState<Major[]>([])
  const [majorName, setMajorName] = useState('')
  const [majorDegree, setMajorDegree] = useState('')

  const [universityFiles, setUniversityFiles] = useState<UniversityFile[]>([])
  const [attachment, setAttachment] = useState<File | null>(null)
  const [attachmentTitle, setAttachmentTitle] = useState('')
  const [attachmentCategory, setAttachmentCategory] =
    useState<'files' | 'resources'>('files')

  const selectedUniversity =
    universities.find((item) => item.id === selectedId) ?? null

  const filteredUniversities = universities.filter((university) => {
    const term = search.trim().toLowerCase()
    if (!term) return true

    return (
      university.name.toLowerCase().includes(term) ||
      university.slug.toLowerCase().includes(term) ||
      (university.city ?? '').toLowerCase().includes(term)
    )
  })

  const loadUniversities = useCallback(async () => {
    setLoading(true)
    setError('')

    const { data, error: queryError } = await supabase
      .from('universities')
      .select('*')
      .order('display_order', { ascending: true })
      .order('name', { ascending: true })

    if (queryError) {
      setError(`تعذر تحميل الجامعات: ${queryError.message}`)
      setLoading(false)
      return
    }

    const rows = (data ?? []) as University[]
    setUniversities(rows)

    setSelectedId((current) =>
      rows.some((item) => item.id === current)
        ? current
        : rows[0]?.id ?? ''
    )

    setLoading(false)
  }, [])

  const loadUniversityDetails = useCallback(async (universityId: string) => {
    if (!universityId) {
      setColleges([])
      setMajors([])
      setUniversityFiles([])
      setSelectedCollegeId('')
      return
    }

    const [collegeResult, fileResult] = await Promise.all([
      supabase
        .from('university_colleges')
        .select('*')
        .eq('university_id', universityId)
        .order('display_order', { ascending: true }),

      supabase
        .from('university_files')
        .select('*')
        .eq('university_id', universityId)
        .order('display_order', { ascending: true }),
    ])

    if (collegeResult.error) {
      setError(`تعذر تحميل الكليات: ${collegeResult.error.message}`)
      return
    }

    if (fileResult.error) {
      setError(`تعذر تحميل الملفات: ${fileResult.error.message}`)
      return
    }

    const collegeRows = (collegeResult.data ?? []) as College[]
    setColleges(collegeRows)
    setUniversityFiles((fileResult.data ?? []) as UniversityFile[])

    setSelectedCollegeId((current) =>
      collegeRows.some((item) => item.id === current)
        ? current
        : collegeRows[0]?.id ?? ''
    )

    if (!collegeRows.some((item) => item.id === selectedCollegeId)) {
      setMajors([])
    }
  }, [selectedCollegeId])

  const loadMajors = useCallback(async (collegeId: string) => {
    if (!collegeId) {
      setMajors([])
      return
    }

    const { data, error: queryError } = await supabase
      .from('university_majors')
      .select('*')
      .eq('college_id', collegeId)
      .order('display_order', { ascending: true })

    if (queryError) {
      setError(`تعذر تحميل التخصصات: ${queryError.message}`)
      return
    }

    setMajors((data ?? []) as Major[])
  }, [])

  useEffect(() => {
    let active = true

    async function verifyAdmin() {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (!active) return

      if (authError || !user) {
        router.replace('/auth/login?next=%2Fadmin%2Funiversities')
        return
      }

      const { data, error: roleError } =
        await supabase.rpc('is_hadeel_admin')

      if (!active) return

      if (roleError || data !== true) {
        setAllowed(false)
        setChecking(false)
        return
      }

      setAllowed(true)
      setChecking(false)
      void loadUniversities()
    }

    void verifyAdmin()

    return () => {
      active = false
    }
  }, [router, loadUniversities])

  useEffect(() => {
    if (allowed && selectedId) {
      void loadUniversityDetails(selectedId)
    } else if (allowed) {
      setColleges([])
      setMajors([])
      setUniversityFiles([])
      setSelectedCollegeId('')
    }
  }, [allowed, selectedId, loadUniversityDetails])

  useEffect(() => {
    if (selectedCollegeId) {
      void loadMajors(selectedCollegeId)
    } else {
      setMajors([])
    }
  }, [selectedCollegeId, loadMajors])

  function startNewUniversity() {
    setEditingId(null)
    setForm(emptyForm)
    setLogoFile(null)
    setNotice('')
    setError('')
  }

  function startEditing(university: University) {
    setEditingId(university.id)
    setSelectedId(university.id)
    setLogoFile(null)

    setForm({
      slug: university.slug,
      name: university.name,
      name_en: university.name_en ?? '',
      city: university.city ?? '',
      description: university.description ?? '',
      founded: university.founded?.toString() ?? '',
      official_url: university.official_url ?? '',
      student_portal_url: university.student_portal_url ?? '',
      published: university.published,
      display_order: String(university.display_order ?? 0),
    })

    setNotice('')
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function saveUniversity(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setNotice('')

    try {
      const slug = form.slug.trim().toLowerCase()

      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        throw new Error(
          'اكتب المعرّف بالإنجليزية والأرقام والشرطة فقط، مثل king-saud-university.'
        )
      }

      const payload = {
        slug,
        name: form.name.trim(),
        name_en: form.name_en.trim() || null,
        city: form.city.trim() || null,
        description: form.description.trim() || null,
        founded: form.founded ? Number(form.founded) : null,
        official_url: form.official_url.trim() || null,
        student_portal_url: form.student_portal_url.trim() || null,
        published: form.published,
        display_order: Number(form.display_order) || 0,
        updated_at: new Date().toISOString(),
      }

      if (!payload.name) {
        throw new Error('اسم الجامعة مطلوب.')
      }

      if (
        payload.founded !== null &&
        (!Number.isInteger(payload.founded) ||
          payload.founded < 1800 ||
          payload.founded > new Date().getFullYear())
      ) {
        throw new Error('تحقق من سنة التأسيس.')
      }

      if (logoFile) {
        if (!logoFile.type.startsWith('image/')) {
          throw new Error('اختر ملف صورة صالحًا للشعار.')
        }

        if (logoFile.size > MAX_LOGO_SIZE) {
          throw new Error('حجم الشعار يجب ألا يتجاوز 10 ميجابايت.')
        }
      }

      let universityId = editingId

      if (editingId) {
        const { error: updateError } = await supabase
          .from('universities')
          .update(payload)
          .eq('id', editingId)

        if (updateError) throw updateError
      } else {
        const { data, error: insertError } = await supabase
          .from('universities')
          .insert(payload)
          .select('id')
          .single()

        if (insertError) throw insertError
        universityId = data.id
      }

      if (!universityId) {
        throw new Error('تعذر تحديد الجامعة بعد الحفظ.')
      }

      if (logoFile) {
        const extension =
          logoFile.name.split('.').pop()?.toLowerCase() || 'jpg'
        const path = `${universityId}/logo-${Date.now()}.${extension}`

        const { error: uploadError } = await supabase.storage
          .from('university-assets')
          .upload(path, logoFile, {
            upsert: false,
            contentType: logoFile.type,
          })

        if (uploadError) throw uploadError

        const { data: publicUrl } = supabase.storage
          .from('university-assets')
          .getPublicUrl(path)

        const { error: logoError } = await supabase
          .from('universities')
          .update({
            logo_url: publicUrl.publicUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', universityId)

        if (logoError) throw logoError
      }

      await loadUniversities()
      setSelectedId(universityId)
      setEditingId(universityId)
      setLogoFile(null)
      setNotice('تم حفظ بيانات الجامعة بنجاح.')
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'حدث خطأ أثناء حفظ الجامعة.'
      )
    } finally {
      setSaving(false)
    }
  }

  async function addCollege(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedId || !collegeName.trim()) return

    setError('')
    setNotice('')

    const { error: insertError } = await supabase
      .from('university_colleges')
      .insert({
        university_id: selectedId,
        name: collegeName.trim(),
        description: collegeDescription.trim() || null,
        display_order: colleges.length,
      })

    if (insertError) {
      setError(`تعذرت إضافة الكلية: ${insertError.message}`)
      return
    }

    setCollegeName('')
    setCollegeDescription('')
    setNotice('تمت إضافة الكلية بنجاح.')
    await loadUniversityDetails(selectedId)
  }

  async function deleteCollege(college: College) {
    if (
      !window.confirm(
        `هل تريد حذف "${college.name}"؟ قد يؤدي ذلك إلى حذف تخصصاتها المرتبطة وفق إعدادات قاعدة البيانات.`
      )
    ) return

    const { error: deleteError } = await supabase
      .from('university_colleges')
      .delete()
      .eq('id', college.id)

    if (deleteError) {
      setError(`تعذر حذف الكلية: ${deleteError.message}`)
      return
    }

    if (selectedCollegeId === college.id) {
      setSelectedCollegeId('')
      setMajors([])
    }

    setNotice('تم حذف الكلية.')
    await loadUniversityDetails(selectedId)
  }

  async function addMajor(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedCollegeId || !majorName.trim()) return

    setError('')
    setNotice('')

    const { error: insertError } = await supabase
      .from('university_majors')
      .insert({
        college_id: selectedCollegeId,
        name: majorName.trim(),
        degree: majorDegree.trim() || null,
        display_order: majors.length,
      })

    if (insertError) {
      setError(`تعذرت إضافة التخصص: ${insertError.message}`)
      return
    }

    setMajorName('')
    setMajorDegree('')
    setNotice('تمت إضافة التخصص بنجاح.')
    await loadMajors(selectedCollegeId)
  }

  async function deleteMajor(major: Major) {
    if (!window.confirm(`هل تريد حذف تخصص "${major.name}"؟`)) return

    const { error: deleteError } = await supabase
      .from('university_majors')
      .delete()
      .eq('id', major.id)

    if (deleteError) {
      setError(`تعذر حذف التخصص: ${deleteError.message}`)
      return
    }

    setNotice('تم حذف التخصص.')
    await loadMajors(selectedCollegeId)
  }

  async function uploadUniversityFile(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (!selectedId || !attachment || !attachmentTitle.trim()) {
      setError('أدخل اسم الملف واختر الملف المطلوب.')
      return
    }

    setError('')
    setNotice('')

    if (attachment.size > MAX_FILE_SIZE) {
      setError('حجم الملف يجب ألا يتجاوز 20 ميجابايت.')
      return
    }

    const extension =
      attachment.name.split('.').pop()?.toLowerCase() || ''

    if (!allowedExtensions.includes(extension)) {
      setError('نوع الملف غير مدعوم. اختر PDF أو Word أو PowerPoint أو Excel أو صورة.')
      return
    }

    setUploading(true)

    try {
      const path =
        `${selectedId}/files/${Date.now()}-${Math.random()
          .toString(36).slice(2, 8)}.${extension}`

      const { error: uploadError } = await supabase.storage
        .from('university-assets')
        .upload(path, attachment, {
          upsert: false,
          contentType: attachment.type || 'application/octet-stream',
        })

      if (uploadError) throw uploadError

      const { data: urlData } = supabase.storage
        .from('university-assets')
        .getPublicUrl(path)

      const { error: insertError } = await supabase
        .from('university_files')
        .insert({
          university_id: selectedId,
          title: attachmentTitle.trim(),
          file_url: urlData.publicUrl,
          file_type: extension,
          category: attachmentCategory,
          display_order: universityFiles.length,
        })

      if (insertError) {
        throw new Error(
          `تم رفع الملف إلى التخزين، لكن تعذر تسجيله في قاعدة البيانات: ${insertError.message}`
        )
      }

      setAttachment(null)
      setAttachmentTitle('')
      setAttachmentCategory('files')
      setNotice('تم رفع الملف وحفظه في القسم المحدد.')

      const input = document.getElementById(
        'university-attachment'
      ) as HTMLInputElement | null

      if (input) input.value = ''

      await loadUniversityDetails(selectedId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'تعذر رفع الملف.')
    } finally {
      setUploading(false)
    }
  }

  async function deleteUniversityFile(file: UniversityFile) {
    if (!window.confirm(`هل تريد حذف سجل الملف "${file.title}"؟`)) return

    const { error: deleteError } = await supabase
      .from('university_files')
      .delete()
      .eq('id', file.id)

    if (deleteError) {
      setError(`تعذر حذف سجل الملف: ${deleteError.message}`)
      return
    }

    setNotice('تم حذف سجل الملف. قد يبقى الملف نفسه في مساحة التخزين.')
    await loadUniversityDetails(selectedId)
  }

  async function deleteUniversity(university: University) {
    if (
      !window.confirm(
        `هل أنت متأكد من حذف "${university.name}"؟ سيُحذف معها سجل بياناتها المرتبطة وفق إعدادات قاعدة البيانات.`
      )
    ) return

    const { error: deleteError } = await supabase
      .from('universities')
      .delete()
      .eq('id', university.id)

    if (deleteError) {
      setError(`تعذر حذف الجامعة: ${deleteError.message}`)
      return
    }

    setNotice('تم حذف الجامعة.')
    if (editingId === university.id) startNewUniversity()
    setSelectedId('')
    await loadUniversities()
  }

  if (checking) {
    return (
      <main dir="rtl" className="ua-page ua-center">
        <LoaderCircle className="ua-spin" size={32} />
        <p>جارٍ التحقق من صلاحيات الإدارة...</p>
        <style jsx>{styles}</style>
      </main>
    )
  }

  if (!allowed) {
    return (
      <main dir="rtl" className="ua-page">
        <section className="ua-denied">
          <GraduationCap size={42} />
          <h1>إدارة الجامعات</h1>
          <p>هذه الصفحة مخصصة للمشرفين المعتمدين في منصة هديل.</p>
          <button
            className="ua-button"
            onClick={() => router.replace('/account')}
          >
            العودة إلى حسابي
          </button>
        </section>
        <style jsx>{styles}</style>
      </main>
    )
  }

  const fileSections = [
    {
      id: 'files' as const,
      title: 'الملفات والأدلة الجامعية',
      description: 'الأدلة واللوائح والتقويمات والنماذج الجامعية.',
      icon: FolderOpen,
      items: universityFiles.filter((file) => file.category !== 'resources'),
    },
    {
      id: 'resources' as const,
      title: 'الموارد الأكاديمية',
      description: 'المقررات والملخصات والمراجع والمواد التعليمية.',
      icon: BookMarked,
      items: universityFiles.filter((file) => file.category === 'resources'),
    },
  ]

  return (
    <main dir="rtl" className="ua-page">
      <div className="ua-container">
        <header className="ua-header">
          <button
            type="button"
            className="ua-back"
            onClick={() => router.push('/admin/center')}
          >
            <ArrowRight size={18} />
            مركز الإدارة
          </button>

          <button
            type="button"
            className="ua-refresh"
            onClick={() => {
              void loadUniversities()
              if (selectedId) void loadUniversityDetails(selectedId)
            }}
          >
            <RefreshCw size={16} />
            تحديث البيانات
          </button>
        </header>

        <section className="ua-hero">
          <span className="ua-hero-icon">
            <GraduationCap size={32} />
          </span>
          <div>
            <span className="ua-eyebrow">منصة هديل · لوحة المشرف</span>
            <h1>إدارة الجامعات</h1>
            <p>
              إدارة الجامعات والكليات والتخصصات وملفات بوابة الطالب من مكان واحد.
            </p>
          </div>
        </section>

        <section className="ua-stats">
          <article className="ua-stat">
            <span className="ua-stat-icon blue"><GraduationCap size={22} /></span>
            <div><strong>{universities.length}</strong><small>جامعة مسجلة</small></div>
          </article>
          <article className="ua-stat">
            <span className="ua-stat-icon green"><BookOpen size={22} /></span>
            <div><strong>{colleges.length}</strong><small>كلية في الجامعة المحددة</small></div>
          </article>
          <article className="ua-stat">
            <span className="ua-stat-icon purple"><FileText size={22} /></span>
            <div><strong>{universityFiles.length}</strong><small>ملف للجامعة المحددة</small></div>
          </article>
        </section>

        {error && (
          <div className="ua-alert ua-alert-error" role="alert">
            {error}
            <button type="button" onClick={() => setError('')} aria-label="إغلاق">
              <X size={16} />
            </button>
          </div>
        )}

        {notice && (
          <div className="ua-alert ua-alert-success" role="status">
            {notice}
            <button type="button" onClick={() => setNotice('')} aria-label="إغلاق">
              <X size={16} />
            </button>
          </div>
        )}

        <section className="ua-panel" id="university-form">
          <div className="ua-panel-heading">
            <div>
              <span className="ua-section-kicker">بيانات الجامعة</span>
              <h2>{editingId ? 'تعديل بيانات الجامعة' : 'إضافة جامعة جديدة'}</h2>
              <p>أدخل البيانات التي ستظهر في صفحات الجامعات بالموقع.</p>
            </div>
            <button
              type="button"
              className="ua-button ua-button-light"
              onClick={startNewUniversity}
            >
              <Plus size={17} />
              جامعة جديدة
            </button>
          </div>

          <form onSubmit={saveUniversity} className="ua-form">
            <label>
              اسم الجامعة *
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="جامعة الملك سعود"
              />
            </label>

            <label>
              المعرّف للرابط *
              <input
                required
                dir="ltr"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="king-saud-university"
              />
              <small>استخدم الإنجليزية والأرقام والشرطة فقط.</small>
            </label>

            <label>
              الاسم بالإنجليزية
              <input
                dir="ltr"
                value={form.name_en}
                onChange={(e) => setForm({ ...form, name_en: e.target.value })}
                placeholder="King Saud University"
              />
            </label>

            <label>
              المدينة
              <input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="الرياض"
              />
            </label>

            <label>
              سنة التأسيس
              <input
                type="number"
                min="1800"
                max={new Date().getFullYear()}
                value={form.founded}
                onChange={(e) => setForm({ ...form, founded: e.target.value })}
                placeholder="1957"
              />
            </label>

            <label>
              ترتيب الجامعة
              <input
                type="number"
                min="0"
                value={form.display_order}
                onChange={(e) => setForm({ ...form, display_order: e.target.value })}
              />
            </label>

            <label className="ua-full">
              وصف الجامعة
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="نبذة تعريفية عن الجامعة..."
              />
            </label>

            <label>
              رابط الموقع الرسمي
              <input
                type="url"
                dir="ltr"
                value={form.official_url}
                onChange={(e) => setForm({ ...form, official_url: e.target.value })}
                placeholder="https://..."
              />
            </label>

            <label>
              رابط بوابة الطالب الخارجية (اختياري)
              <input
                type="url"
                dir="ltr"
                value={form.student_portal_url}
                onChange={(e) => setForm({ ...form, student_portal_url: e.target.value })}
                placeholder="https://..."
              />
              <small>صفحة الملفات الداخلية للموقع مستقلة عن هذا الرابط.</small>
            </label>

            <label className="ua-upload ua-full">
              <span><Upload size={18} /> شعار الجامعة</span>
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
              />
              <small>
                اختياري. عند اختيار شعار جديد سيُرفع إلى مساحة university-assets.
              </small>
            </label>

            <label className="ua-publish ua-full">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              <span>
                <strong>نشر الجامعة في الموقع</strong>
                <small>عند إلغاء التحديد تُحفظ الجامعة كمسودة.</small>
              </span>
            </label>

            <div className="ua-form-actions ua-full">
              <button type="submit" className="ua-button" disabled={saving}>
                {saving ? (
                  <LoaderCircle className="ua-spin" size={17} />
                ) : (
                  <Save size={17} />
                )}
                {saving ? 'جارٍ الحفظ...' : 'حفظ بيانات الجامعة'}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="ua-button ua-button-danger"
                  onClick={() => {
                    const item = universities.find((u) => u.id === editingId)
                    if (item) void deleteUniversity(item)
                  }}
                >
                  <Trash2 size={17} />
                  حذف الجامعة
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="ua-panel">
          <div className="ua-panel-heading">
            <div>
              <span className="ua-section-kicker">قائمة الجامعات</span>
              <h2>الجامعات المسجلة</h2>
              <p>اختر جامعة لعرض كلياتها وتخصصاتها وملفات بوابة الطالب.</p>
            </div>
            <span className="ua-count">{universities.length} جامعة</span>
          </div>

          <div className="ua-search">
            <Search size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث باسم الجامعة أو المدينة..."
            />
          </div>

          {loading ? (
            <div className="ua-empty">
              <LoaderCircle className="ua-spin" />
              جارٍ تحميل الجامعات...
            </div>
          ) : filteredUniversities.length === 0 ? (
            <div className="ua-empty">
              لا توجد نتائج مطابقة للبحث.
            </div>
          ) : (
            <div className="ua-university-list">
              {filteredUniversities.map((university) => (
                <article
                  key={university.id}
                  className={`ua-university ${selectedId === university.id ? 'ua-selected' : ''}`}
                >
                  <button
                    type="button"
                    className="ua-university-main"
                    onClick={() => {
                      setSelectedId(university.id)
                      setError('')
                      setNotice('')
                    }}
                  >
                    {university.logo_url ? (
                      <img
                        src={university.logo_url}
                        alt={`شعار ${university.name}`}
                        className="ua-logo"
                      />
                    ) : (
                      <span className="ua-logo ua-logo-placeholder">
                        <GraduationCap size={24} />
                      </span>
                    )}

                    <span className="ua-university-info">
                      <strong>{university.name}</strong>
                      <small>
                        <MapPin size={13} />
                        {university.city || 'لم تُحدد المدينة'}
                      </small>
                      <small dir="ltr">{university.slug}</small>
                    </span>

                    <span className={`ua-status ${university.published ? 'ua-status-live' : ''}`}>
                      {university.published ? 'منشورة' : 'مسودة'}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="ua-icon-button"
                    aria-label={`تعديل ${university.name}`}
                    onClick={() => startEditing(university)}
                  >
                    <Pencil size={17} />
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        {selectedUniversity && (
          <>
            <section className="ua-panel">
              <div className="ua-panel-heading">
                <div>
                  <span className="ua-section-kicker">الهيكل الأكاديمي</span>
                  <h2><BookOpen size={21} /> الكليات والتخصصات</h2>
                  <p>الجامعة المحددة: <strong>{selectedUniversity.name}</strong></p>
                </div>
              </div>

              <form className="ua-inline-form" onSubmit={addCollege}>
                <label>
                  اسم الكلية *
                  <input
                    required
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="كلية علوم الحاسب"
                  />
                </label>
                <label>
                  وصف مختصر
                  <input
                    value={collegeDescription}
                    onChange={(e) => setCollegeDescription(e.target.value)}
                    placeholder="اختياري"
                  />
                </label>
                <button className="ua-button" type="submit">
                  <Plus size={17} /> إضافة كلية
                </button>
              </form>

              {colleges.length === 0 ? (
                <div className="ua-empty">لم تُضف كليات لهذه الجامعة بعد.</div>
              ) : (
                <div className="ua-college-layout">
                  <div className="ua-college-list">
                    {colleges.map((college) => (
                      <div
                        key={college.id}
                        className={`ua-college-row ${selectedCollegeId === college.id ? 'ua-college-active' : ''}`}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedCollegeId(college.id)}
                        >
                          <strong>{college.name}</strong>
                          <small>{college.description || 'عرض التخصصات'}</small>
                        </button>
                        <button
                          type="button"
                          className="ua-icon-button ua-delete-icon"
                          aria-label={`حذف ${college.name}`}
                          onClick={() => void deleteCollege(college)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="ua-major-area">
                    <h3>تخصصات الكلية</h3>

                    {selectedCollegeId ? (
                      <>
                        <form className="ua-inline-form" onSubmit={addMajor}>
                          <label>
                            اسم التخصص *
                            <input
                              required
                              value={majorName}
                              onChange={(e) => setMajorName(e.target.value)}
                              placeholder="علوم الحاسب"
                            />
                          </label>
                          <label>
                            الدرجة العلمية
                            <input
                              value={majorDegree}
                              onChange={(e) => setMajorDegree(e.target.value)}
                              placeholder="بكالوريوس"
                            />
                          </label>
                          <button type="submit" className="ua-button">
                            <Plus size={17} /> إضافة تخصص
                          </button>
                        </form>

                        {majors.length === 0 ? (
                          <div className="ua-empty">لا توجد تخصصات مسجلة لهذه الكلية.</div>
                        ) : (
                          <ul className="ua-major-list">
                            {majors.map((major) => (
                              <li key={major.id}>
                                <span>
                                  <strong>{major.name}</strong>
                                  {major.degree && <small>{major.degree}</small>}
                                </span>
                                <button
                                  type="button"
                                  className="ua-icon-button ua-delete-icon"
                                  aria-label={`حذف ${major.name}`}
                                  onClick={() => void deleteMajor(major)}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <div className="ua-empty">اختر كلية لعرض تخصصاتها.</div>
                    )}
                  </div>
                </div>
              )}
            </section>

            <section className="ua-panel">
              <div className="ua-panel-heading">
                <div>
                  <span className="ua-section-kicker">بوابة الطالب</span>
                  <h2><FolderOpen size={21} /> إدارة ملفات الجامعة</h2>
                  <p>
                    الملفات التي ترفعها هنا ستُربط بالجامعة المحددة وتُصنّف في بوابة الطالب.
                  </p>
                </div>
              </div>

              <div className="ua-file-categories">
                <div className="ua-category-summary">
                  <span className="ua-category-icon gold"><FolderOpen size={23} /></span>
                  <div>
                    <strong>الملفات والأدلة الجامعية</strong>
                    <small>الأدلة واللوائح والنماذج والتقويم الأكاديمي.</small>
                  </div>
                  <span className="ua-count">
                    {fileSections[0].items.length}
                  </span>
                </div>
                <div className="ua-category-summary">
                  <span className="ua-category-icon green"><BookMarked size={23} /></span>
                  <div>
                    <strong>الموارد الأكاديمية</strong>
                    <small>المقررات والملخصات والمراجع والمواد التعليمية.</small>
                  </div>
                  <span className="ua-count">
                    {fileSections[1].items.length}
                  </span>
                </div>
              </div>

              <form className="ua-file-form" onSubmit={uploadUniversityFile}>
                <label>
                  اسم الملف *
                  <input
                    required
                    value={attachmentTitle}
                    onChange={(e) => setAttachmentTitle(e.target.value)}
                    placeholder="مثال: دليل القبول الجامعي"
                  />
                </label>

                <label>
                  القسم الذي سيظهر فيه الملف *
                  <select
                    required
                    value={attachmentCategory}
                    onChange={(e) =>
                      setAttachmentCategory(
                        e.target.value as 'files' | 'resources'
                      )
                    }
                  >
                    <option value="files">الملفات والأدلة الجامعية</option>
                    <option value="resources">الموارد الأكاديمية</option>
                  </select>
                </label>

                <label className="ua-upload">
                  <span><Upload size={18} /> اختر الملف *</span>
                  <input
                    id="university-attachment"
                    required
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.png,.jpg,.jpeg,.webp"
                    onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
                  />
                  <small>الحد الأقصى 20 ميجابايت للملف الواحد.</small>
                </label>

                <button className="ua-button" type="submit" disabled={uploading}>
                  {uploading ? (
                    <LoaderCircle className="ua-spin" size={17} />
                  ) : (
                    <Upload size={17} />
                  )}
                  {uploading ? 'جارٍ رفع الملف...' : 'رفع الملف وحفظه'}
                </button>
              </form>

              {fileSections.map((section) => {
                const SectionIcon = section.icon

                return (
                  <div className="ua-file-section" key={section.id}>
                    <div className="ua-file-section-heading">
                      <span className="ua-section-file-icon">
                        <SectionIcon size={20} />
                      </span>
                      <div>
                        <h3>{section.title}</h3>
                        <p>{section.description}</p>
                      </div>
                      <span className="ua-count">{section.items.length}</span>
                    </div>

                    {section.items.length === 0 ? (
                      <div className="ua-empty">
                        لا توجد ملفات في هذا القسم حتى الآن.
                      </div>
                    ) : (
                      <div className="ua-file-list">
                        {section.items.map((file) => (
                          <article key={file.id} className="ua-file-row">
                            <FileText size={22} />
                            <div>
                              <strong>{file.title}</strong>
                              <small>
                                {file.file_type?.toUpperCase() || 'ملف'} · {section.title}
                              </small>
                            </div>
                            <a
                              href={file.file_url}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`فتح ${file.title}`}
                            >
                              <ExternalLink size={17} />
                            </a>
                            <button
                              type="button"
                              className="ua-icon-button ua-delete-icon"
                              aria-label={`حذف ${file.title}`}
                              onClick={() => void deleteUniversityFile(file)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </section>

            <section className="ua-panel ua-links-panel">
              <span className="ua-section-kicker">روابط خارجية</span>
              <h2><Globe size={21} /> روابط الجامعة</h2>
              <p>روابط الجامعة المحفوظة في قاعدة البيانات.</p>

              {selectedUniversity.official_url && (
                <a
                  href={selectedUniversity.official_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={16} /> الموقع الرسمي
                </a>
              )}

              {selectedUniversity.student_portal_url && (
                <a
                  href={selectedUniversity.student_portal_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={16} /> بوابة الطالب الخارجية
                </a>
              )}

              {!selectedUniversity.official_url &&
                !selectedUniversity.student_portal_url && (
                  <p>لم تُضف روابط لهذه الجامعة بعد. يمكنك إدخالها من نموذج بيانات الجامعة.</p>
                )}
            </section>
          </>
        )}

        <footer className="ua-footer">
          <GraduationCap size={17} />
          إدارة الجامعات · منصة هديل
        </footer>
      </div>

      <style jsx>{styles}</style>
    </main>
  )
}

const styles = `
  .ua-page {
    min-height: 100vh;
    padding: 24px 16px 56px;
    background: #f5f7fb;
    color: #1e2b43;
  }

  .ua-container { max-width: 1100px; margin: 0 auto; }

  .ua-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 22px;
  }

  .ua-back, .ua-refresh {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid #e0e7f1;
    border-radius: 12px;
    padding: 10px 13px;
    background: white;
    color: #3a4c68;
    font: inherit;
    font-size: 13px;
    font-weight: 750;
    cursor: pointer;
  }

  .ua-hero {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px;
    border: 1px solid #dce6f7;
    border-radius: 22px;
    background: linear-gradient(120deg, #eaf2ff, #f5efff);
    margin-bottom: 18px;
  }

  .ua-hero-icon {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 19px;
    background: white;
    color: #315fb2;
  }

  .ua-eyebrow, .ua-section-kicker {
    font-size: 12px;
    font-weight: 800;
    color: #637798;
  }

  .ua-hero h1 {
    margin: 5px 0;
    font-size: clamp(25px, 4vw, 34px);
  }

  .ua-hero p {
    margin: 0;
    color: #63718a;
    font-size: 14px;
    line-height: 1.9;
  }

  .ua-stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 18px;
  }

  .ua-stat {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 17px;
    border: 1px solid #e3e9f2;
    border-radius: 16px;
    background: white;
  }

  .ua-stat-icon, .ua-category-icon {
    display: grid;
    place-items: center;
    width: 45px;
    height: 45px;
    flex-shrink: 0;
    border-radius: 13px;
  }

  .blue { background: #eaf1ff; color: #315fb2; }
  .green { background: #e4f7ed; color: #16805a; }
  .purple { background: #f1eaff; color: #7952bb; }
  .gold { background: #fff2d9; color: #a97419; }

  .ua-stat div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .ua-stat strong { font-size: 23px; }
  .ua-stat small { color: #7b879b; font-size: 12px; }

  .ua-panel {
    margin-top: 20px;
    padding: 22px;
    border: 1px solid #e3e9f2;
    border-radius: 20px;
    background: white;
    box-shadow: 0 8px 26px #1b315408;
  }

  .ua-panel-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .ua-panel-heading h2, .ua-links-panel h2 {
    display: flex;
    align-items: center;
    gap: 9px;
    margin: 5px 0;
    font-size: 20px;
  }

  .ua-panel-heading p, .ua-links-panel p {
    margin: 0;
    color: #78849a;
    font-size: 13px;
    line-height: 1.8;
  }

  .ua-count {
    flex-shrink: 0;
    border-radius: 99px;
    padding: 7px 12px;
    background: #edf3ff;
    color: #315fb2;
    font-size: 12px;
    font-weight: 800;
  }

  .ua-form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  .ua-form label, .ua-inline-form label,
  .ua-file-form label {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    font-size: 13px;
    font-weight: 750;
    color: #35445d;
  }

  .ua-form input:not([type=checkbox]):not([type=file]),
  .ua-form textarea,
  .ua-inline-form input:not([type=file]),
  .ua-file-form input:not([type=file]),
  .ua-file-form select,
  .ua-search input {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    border: 1px solid #dfe6f0;
    border-radius: 11px;
    background: #fbfcff;
    padding: 12px;
    color: #1e2b43;
    font: inherit;
    font-size: 14px;
    outline: none;
  }

  .ua-form textarea {
    resize: vertical;
    line-height: 1.8;
  }

  .ua-form input:focus, .ua-form textarea:focus,
  .ua-inline-form input:focus, .ua-file-form input:focus,
  .ua-file-form select:focus, .ua-search input:focus {
    border-color: #7ca2e6;
    box-shadow: 0 0 0 3px #eaf1ff;
  }

  .ua-form small, .ua-upload small,
  .ua-publish small, .ua-file-form small {
    color: #7b879b;
    font-size: 11px;
    font-weight: 400;
    line-height: 1.8;
    overflow-wrap: anywhere;
  }

  .ua-full { grid-column: 1 / -1; }

  .ua-upload {
    padding: 14px;
    border: 1px dashed #b8c9e5;
    border-radius: 13px;
    background: #f8faff;
  }

  .ua-upload span {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #315fb2;
  }

  .ua-upload input { max-width: 100%; font-size: 12px; }

  .ua-publish {
    display: flex;
    flex-direction: row !important;
    align-items: flex-start;
    gap: 11px !important;
    padding: 14px;
    border: 1px solid #e3eaf5;
    border-radius: 13px;
    background: #fbfcff;
  }

  .ua-publish input {
    width: 18px;
    height: 18px;
    accent-color: #285eb5;
    margin-top: 2px;
  }

  .ua-publish span {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .ua-form-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .ua-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 0;
    border-radius: 11px;
    padding: 12px 16px;
    background: #285eb5;
    color: white;
    font: inherit;
    font-size: 13px;
    font-weight: 800;
    cursor: pointer;
  }

  .ua-button:disabled { opacity: .6; cursor: wait; }
  .ua-button-light { background: #edf3ff; color: #315fb2; }
  .ua-button-danger { background: #fff0f0; color: #b43b49; }

  .ua-search {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
    padding-right: 12px;
    border: 1px solid #dfe6f0;
    border-radius: 12px;
    color: #7b879b;
    background: #fbfcff;
  }

  .ua-search input {
    border: 0;
    box-shadow: none !important;
    background: transparent;
  }

  .ua-university-list { display: grid; gap: 10px; }

  .ua-university {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px;
    border: 1px solid #e5eaf2;
    border-radius: 14px;
    background: #fff;
  }

  .ua-selected { border-color: #8baeea; background: #f8faff; }

  .ua-university-main {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    gap: 12px;
    border: 0;
    background: transparent;
    text-align: right;
    cursor: pointer;
    color: inherit;
  }

  .ua-logo {
    width: 54px;
    height: 54px;
    flex-shrink: 0;
    border-radius: 12px;
    object-fit: contain;
    background: white;
    border: 1px solid #edf0f5;
  }

  .ua-logo-placeholder {
    display: grid;
    place-items: center;
    color: #5275b4;
  }

  .ua-university-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 4px;
  }

  .ua-university-info strong {
    font-size: 14px;
    overflow-wrap: anywhere;
  }

  .ua-university-info small {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #7b879a;
    font-size: 11px;
    overflow-wrap: anywhere;
  }

  .ua-status {
    flex-shrink: 0;
    padding: 6px 9px;
    border-radius: 99px;
    background: #f0f2f6;
    color: #707d91;
    font-size: 11px;
    font-weight: 800;
  }

  .ua-status-live { background: #e6f8ee; color: #16754c; }

  .ua-icon-button {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    flex-shrink: 0;
    border: 1px solid #e1e7f0;
    border-radius: 10px;
    background: white;
    color: #50627e;
    cursor: pointer;
  }

  .ua-delete-icon { color: #b33f4c; }

  .ua-inline-form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: end;
    gap: 12px;
    margin: 16px 0;
  }

  .ua-inline-form input[type=file] { max-width: 100%; font-size: 12px; }

  .ua-college-layout {
    display: grid;
    grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
    gap: 18px;
    margin-top: 20px;
  }

  .ua-college-list { display: grid; align-content: start; gap: 8px; }

  .ua-college-row {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 9px;
    border: 1px solid #e6ebf3;
    border-radius: 12px;
  }

  .ua-college-active { border-color: #9bb7e9; background: #f3f7ff; }

  .ua-college-row > button:first-child {
    flex: 1;
    min-width: 0;
    border: 0;
    background: transparent;
    text-align: right;
    color: #273650;
    cursor: pointer;
  }

  .ua-college-row strong, .ua-college-row small {
    display: block;
    overflow-wrap: anywhere;
  }

  .ua-college-row strong { font-size: 13px; }
  .ua-college-row small { margin-top: 4px; color: #8590a3; font-size: 11px; }

  .ua-major-area {
    min-width: 0;
    padding: 15px;
    border: 1px solid #e7edf5;
    border-radius: 15px;
    background: #fafbfe;
  }

  .ua-major-area h3 { margin: 0 0 10px; font-size: 16px; }

  .ua-major-list {
    display: grid;
    gap: 8px;
    margin: 14px 0 0;
    padding: 0;
    list-style: none;
  }

  .ua-major-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1px solid #e5eaf2;
    border-radius: 11px;
    background: white;
  }

  .ua-major-list li span {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .ua-major-list strong { font-size: 13px; overflow-wrap: anywhere; }
  .ua-major-list small { color: #7d899c; font-size: 11px; }

  .ua-file-categories { display: grid; gap: 10px; margin-bottom: 20px; }

  .ua-category-summary {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 13px;
    border: 1px solid #e5eaf2;
    border-radius: 14px;
    background: #fcfdff;
  }

  .ua-category-summary > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
  }

  .ua-category-summary strong { font-size: 13px; }
  .ua-category-summary small { color: #7b879b; font-size: 11px; line-height: 1.7; }

  .ua-file-form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
    align-items: end;
    padding: 16px;
    border: 1px solid #e2eaf7;
    border-radius: 16px;
    background: #f8faff;
  }

  .ua-file-form .ua-upload { grid-column: 1 / -1; }
  .ua-file-form > button { justify-self: start; }

  .ua-file-section { margin-top: 25px; }

  .ua-file-section-heading {
    display: flex;
    align-items: center;
    gap: 11px;
    margin-bottom: 12px;
  }

  .ua-section-file-icon {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    flex-shrink: 0;
    border-radius: 12px;
    background: #edf3ff;
    color: #315fb2;
  }

  .ua-file-section-heading > div { flex: 1; min-width: 0; }

  .ua-file-section-heading h3 { margin: 0 0 4px; font-size: 15px; }
  .ua-file-section-heading p { margin: 0; color: #7b879b; font-size: 12px; line-height: 1.7; }

  .ua-file-list { display: grid; gap: 9px; margin-top: 12px; }

  .ua-file-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border: 1px solid #e6ebf3;
    border-radius: 12px;
    color: #526b98;
  }

  .ua-file-row > div {
    display: flex;
    flex: 1;
    min-width: 0;
    flex-direction: column;
    gap: 4px;
  }

  .ua-file-row strong {
    color: #293851;
    font-size: 13px;
    overflow-wrap: anywhere;
  }

  .ua-file-row small { color: #8490a3; font-size: 11px; line-height: 1.7; }

  .ua-file-row a {
    display: grid;
    place-items: center;
    width: 35px;
    height: 35px;
    flex-shrink: 0;
    border: 1px solid #e2e8f2;
    border-radius: 10px;
    color: #315fb2;
  }

  .ua-links-panel { display: grid; gap: 12px; }

  .ua-links-panel a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #315fb2;
    font-size: 13px;
    font-weight: 750;
    text-decoration: none;
    overflow-wrap: anywhere;
  }

  .ua-alert {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 14px 0;
    padding: 12px 14px;
    border-radius: 12px;
    font-size: 13px;
    line-height: 1.8;
    overflow-wrap: anywhere;
  }

  .ua-alert button {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }

  .ua-alert-error { color: #a62f3e; border: 1px solid #f1caca; background: #fff2f2; }
  .ua-alert-success { color: #176f4a; border: 1px solid #c9ead7; background: #effbf4; }

  .ua-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    min-height: 90px;
    padding: 16px;
    color: #7d899c;
    font-size: 13px;
    line-height: 1.8;
    text-align: center;
  }

  .ua-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding-top: 25px;
    color: #8490a3;
    font-size: 12px;
  }

  .ua-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #6b778c;
  }

  .ua-denied {
    max-width: 440px;
    margin: 10vh auto;
    padding: 28px;
    border: 1px solid #e2e8f2;
    border-radius: 20px;
    background: white;
    text-align: center;
  }

  .ua-denied h1 { margin: 12px 0; }
  .ua-denied p { color: #718096; line-height: 1.9; }
  .ua-spin { animation: ua-spin 1s linear infinite; }
  @keyframes ua-spin { to { transform: rotate(360deg); } }

  @media (max-width: 720px) {
    .ua-page { padding: 16px 11px 36px; }
    .ua-hero { align-items: flex-start; padding: 17px; }
    .ua-hero-icon { width: 48px; height: 48px; border-radius: 14px; }
    .ua-panel { padding: 15px; }
    .ua-form, .ua-file-form { grid-template-columns: minmax(0, 1fr); gap: 13px; }
    .ua-full, .ua-file-form .ua-upload { grid-column: auto; }
    .ua-panel-heading { align-items: flex-start; }
    .ua-panel-heading h2 { font-size: 17px; }
    .ua-inline-form { grid-template-columns: minmax(0, 1fr); }
    .ua-college-layout { grid-template-columns: minmax(0, 1fr); }
    .ua-stats { grid-template-columns: minmax(0, 1fr); }
    .ua-stat { padding: 13px; }
    .ua-status { font-size: 10px; }
    .ua-university-main { gap: 8px; }
    .ua-logo { width: 43px; height: 43px; }
    .ua-university-info strong { font-size: 12px; }
    .ua-header { align-items: stretch; }
    .ua-back, .ua-refresh { padding: 9px; font-size: 12px; }
    .ua-file-form > button { justify-self: stretch; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ua-spin { animation: none; }
  }
`
