
"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  FolderOpen,
  Search,
  Sparkles,
  LibraryBig,
  Files,
  Download,
  ExternalLink,
  File,
} from "lucide-react"

import type { University } from "@/app/components/universities/data"
import "./student-portal.css"

export type StudentFile = {
  id: string
  title: string
  file_url: string
  file_type: string | null
  display_order?: number | null
}

type Props = {
  university: University
  files?: StudentFile[]
}

function getFileLabel(file: StudentFile) {
  const type = (file.file_type || "").toLowerCase()
  const url = file.file_url.toLowerCase()

  if (type.includes("pdf") || url.includes(".pdf")) return "PDF"
  if (type.includes("word") || /\.(doc|docx)(\?|$)/.test(url)) return "Word"
  if (type.includes("powerpoint") || /\.(ppt|pptx)(\?|$)/.test(url)) return "PowerPoint"
  if (type.includes("excel") || /\.(xls|xlsx)(\?|$)/.test(url)) return "Excel"
  if (/\.(png|jpg|jpeg|webp)(\?|$)/.test(url)) return "صورة"

  return file.file_type || "ملف"
}

export default function StudentPortalContent({
  university,
  files = [],
}: Props) {
  const [search, setSearch] = useState("")

  const filteredFiles = useMemo(() => {
    const query = search.trim().toLowerCase()

    const sortedFiles = [...files].sort(
      (a, b) =>
        (a.display_order ?? 0) - (b.display_order ?? 0)
    )

    if (!query) return sortedFiles

    return sortedFiles.filter((file) => {
      const title = file.title.toLowerCase()
      const type = (file.file_type || "").toLowerCase()

      return (
        title.includes(query) ||
        type.includes(query) ||
        getFileLabel(file).toLowerCase().includes(query)
      )
    })
  }, [files, search])

  return (
    <main className="student-portal" dir="rtl">
      <header className="sp-header">
        <Link href="/universities" className="sp-back">
          <ArrowRight size={17} />
          <span>العودة إلى الجامعات</span>
        </Link>

        <Link href="/" className="sp-brand" aria-label="منصة هديل">
          <span className="sp-brand-mark">
            <GraduationCap size={30} />
          </span>

          <span className="sp-brand-copy">
            <strong>منصة هديل</strong>
            <small>تعليم يصنع المستقبل</small>
          </span>
        </Link>
      </header>

      <section className="sp-hero">
        <div className="sp-hero-decoration sp-decoration-one" />
        <div className="sp-hero-decoration sp-decoration-two" />

        <div className="sp-hero-content">
          <div className="sp-eyebrow">
            <GraduationCap size={18} />
            <span>بوابة الطالب</span>
          </div>

          <div className="sp-hero-icon">
            <GraduationCap size={60} strokeWidth={1.5} />
          </div>

          <h1>
            أهلًا بك في بوابة طالب
            <span>{university.name}</span>
          </h1>

          <p>
            مساحة تجمع المعلومات والملفات والأدلة الأكاديمية التي تساعدك
            على الوصول إلى مواردك الجامعية بسهولة.
          </p>

          <div className="sp-hero-actions">
            <a href="#university-files" className="sp-button sp-button-gold">
              <FileText size={19} />
              استعراض الملفات والأدلة
              <ArrowLeft size={16} />
            </a>

            <a
              href="#academic-resources"
              className="sp-button sp-button-outline"
            >
              <BookOpen size={19} />
              استعراض الموارد الأكاديمية
              <ArrowLeft size={16} />
            </a>
          </div>
        </div>

        <div className="sp-hero-note">
          <Sparkles size={18} />
          <span>مستقبلك يبدأ من هنا</span>
        </div>
      </section>

      <section className="sp-shortcuts" aria-label="أقسام بوابة الطالب">
        <a href="#academic-resources" className="sp-shortcut-card">
          <span className="sp-shortcut-icon sp-icon-gold">
            <BookOpen size={30} />
          </span>

          <h2>الموارد الأكاديمية</h2>

          <p>
            شروحات وأدلة وروابط مفيدة لمساعدتك في مسيرتك الدراسية.
          </p>

          <span className="sp-round-arrow">
            <ArrowLeft size={17} />
          </span>
        </a>

        <a href="#university-files" className="sp-shortcut-card">
          <span className="sp-shortcut-icon sp-icon-blue">
            <Files size={30} />
          </span>

          <h2>الملفات والأدلة الجامعية</h2>

          <p>
            ملفات PDF وWord والأدلة الجامعية المتاحة للطلاب.
          </p>

          <span className="sp-round-arrow">
            <ArrowLeft size={17} />
          </span>
        </a>
      </section>

      <section className="sp-search-panel">
        <div className="sp-search-decoration sp-search-books">
          <LibraryBig size={58} />
        </div>

        <div className="sp-search-content">
          <h2>
            <Search size={23} />
            ابحث عن ما تحتاجه
          </h2>

          <p>
            اكتب اسم الملف أو نوعه للوصول إلى الملف المطلوب بسرعة.
          </p>

          <label className="sp-search-box">
            <Search size={21} />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="مثال: دليل التسجيل، PDF، المناهج..."
              aria-label="البحث عن الملفات والموارد الأكاديمية"
            />

            {search && (
              <button
                type="button"
                className="sp-clear-search"
                onClick={() => setSearch("")}
                aria-label="مسح البحث"
              >
                مسح
              </button>
            )}
          </label>

          <p className="sp-search-hint">
            {search
              ? `عدد الملفات المطابقة: ${filteredFiles.length}`
              : `يتوفر حاليًا ${files.length} ملف في هذه البوابة.`}
          </p>
        </div>
      </section>

      <section
        id="university-files"
        className="sp-content-section sp-files-section"
      >
        <div className="sp-section-heading">
          <span className="sp-section-icon sp-icon-blue">
            <FolderOpen size={25} />
          </span>

          <div>
            <h2>الملفات والأدلة الجامعية</h2>
            <p>
              الأدلة والوثائق والملفات التي تساعدك في رحلتك الجامعية.
            </p>
          </div>
        </div>

        {filteredFiles.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFiles.map((file) => (
              <article
                key={file.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <File size={25} />
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                    {getFileLabel(file)}
                  </span>
                </div>

                <h3 className="mb-4 break-words text-base font-bold leading-7 text-slate-800">
                  {file.title}
                </h3>

                <div className="mt-auto flex flex-wrap gap-2">
                  <a
                    href={file.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-3 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                  >
                    <ExternalLink size={17} />
                    فتح الملف
                  </a>

                  <a
                    href={file.file_url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    aria-label={`تنزيل ${file.title}`}
                  >
                    <Download size={17} />
                    تنزيل
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="sp-empty-state">
            <span className="sp-empty-icon sp-icon-blue">
              <Files size={34} />
            </span>

            <h3>
              {search ? "لم نعثر على ملفات مطابقة" : "الملفات الجامعية"}
            </h3>

            <p>
              {search
                ? "جرّب البحث بكلمات أخرى أو امسح عبارة البحث."
                : "لا توجد ملفات متاحة حاليًا. ستظهر الملفات هنا بعد إضافتها من لوحة إدارة الجامعات."}
            </p>

            {search && (
              <button
                type="button"
                className="mt-3 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white"
                onClick={() => setSearch("")}
              >
                عرض جميع الملفات
              </button>
            )}
          </div>
        )}
      </section>

      <section
        id="academic-resources"
        className="sp-content-section sp-resources-section"
      >
        <div className="sp-section-heading">
          <span className="sp-section-icon sp-icon-gold">
            <BookOpen size={25} />
          </span>

          <div>
            <h2>الموارد الأكاديمية</h2>
            <p>
              مصادر تعليمية وشروحات وروابط مفيدة لمسيرتك الأكاديمية.
            </p>
          </div>
        </div>

        <div className="sp-empty-state">
          <span className="sp-empty-icon sp-icon-gold">
            <BookOpen size={34} />
          </span>

          <h3>الموارد الأكاديمية</h3>

          <p>
            ستظهر الموارد الأكاديمية هنا عند تخصيصها وإضافتها من لوحة الإدارة.
          </p>
        </div>
      </section>
    </main>
  )
}
