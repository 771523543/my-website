"use client"

import Link from "next/link"
import { useState } from "react"
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
Download,
ExternalLink,
FileQuestion,
} from "lucide-react"

import type { University } from "@/app/components/universities/data"
import "./student-portal.css"

type Props = {
university: University
}

export default function StudentPortalContent({ university }: Props) {
const [search, setSearch] = useState("")

const universityName = university.name

return (
<main className="student-portal" dir="rtl">
{/* الشريط العلوي */}
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

  {/* الواجهة الترحيبية */}
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
        <span>{universityName}</span>
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

  {/* البطاقات الرئيسية */}
  <section className="sp-shortcuts" aria-label="أقسام بوابة الطالب">
    <a href="#academic-resources" className="sp-shortcut-card">
      <span className="sp-shortcut-icon sp-icon-gold">
        <BookOpen size={30} />
      </span>
      <h2>الموارد الأكاديمية</h2>
      <p>شروحات وأدلة وروابط مفيدة لمساعدتك في مسيرتك الدراسية.</p>
      <span className="sp-round-arrow">
        <ArrowLeft size={17} />
      </span>
    </a>

    <a href="#university-files" className="sp-shortcut-card">
      <span className="sp-shortcut-icon sp-icon-blue">
        <FileText size={30} />
      </span>
      <h2>الملفات والأدلة الجامعية</h2>
      <p>ملفات PDF وWord والأدلة الجامعية التي تضيفها الإدارة.</p>
      <span className="sp-round-arrow">
        <ArrowLeft size={17} />
      </span>
    </a>
  </section>

  {/* البحث */}
  <section className="sp-search-panel">
    <div className="sp-search-decoration sp-search-books">
      <LibraryBig size={58} />
    </div>

    <div className="sp-search-content">
      <h2>
        <Search size={23} />
        ابحث عن ما تحتاجه
      </h2>
      <p>اكتب اسم الملف أو الدليل أو المورد الأكاديمي للبحث السريع.</p>

      <label className="sp-search-box">
        <Search size={21} />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="مثال: دليل التسجيل، الشروحات، المناهج..."
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
          ? "سيُستخدم البحث عند توفر محتوى منشور في هذا القسم."
          : "ابحث بسهولة للوصول إلى المحتوى الذي تحتاجه."}
      </p>
    </div>
  </section>

  {/* الملفات والأدلة الجامعية */}
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
        <p>الأدلة والوثائق والملفات التي تساعدك في رحلتك الجامعية.</p>
      </div>
    </div>

    <div className="sp-empty-state">
      <span className="sp-empty-icon sp-icon-blue">
        <FileQuestion size={34} />
      </span>
      <h3>الملفات الجامعية</h3>
      <p>
        ستظهر هنا الملفات والأدلة التي تنشرها إدارة منصة هديل لهذه الجامعة.
      </p>
      <span className="sp-admin-label">
        <GraduationCap size={15} />
        المحتوى يُدار من لوحة الإدارة
      </span>
    </div>
  </section>

  {/* الموارد الأكاديمية */}
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
        <p>مصادر تعليمية وشروحات وروابط مفيدة لمسيرتك الأكاديمية.</p>
      </div>
    </div>

    <div className="sp-empty-state">
      <span className="sp-empty-icon sp-icon-gold">
        <LibraryBig size={34} />
      </span>
      <h3>الموارد الأكاديمية</h3>
      <p>
        ستظهر هنا الشروحات والأدلة والروابط التعليمية التي تضيفها الإدارة.
      </p>
      <span className="sp-admin-label sp-admin-label-gold">
        <GraduationCap size={15} />
        المحتوى يُدار من لوحة الإدارة
      </span>
    </div>
  </section>

  {/* التذييل */}
  <footer className="sp-footer">
    <Link href="/" className="sp-footer-brand">
      <GraduationCap size={25} />
      <span>منصة هديل</span>
    </Link>

    <p>معك في رحلتك الأكاديمية</p>

    <Link href="/universities" className="sp-footer-link">
      استكشف الجامعات
      <ExternalLink size={15} />
    </Link>

    <span className="sp-footer-copy">
      © منصة هديل — جميع الحقوق محفوظة
    </span>
  </footer>
</main>

)
}