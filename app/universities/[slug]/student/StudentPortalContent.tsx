
"use client"

import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  FolderOpen,
  ExternalLink,
  Download,
  Search,
  Sparkles,
  FileQuestion,
  LibraryBig,
} from "lucide-react"
import { useState } from "react"

import type { University } from "@/app/components/universities/data"

type Props = {
  university: University
}

export default function StudentPortalContent({ university }: Props) {
  const [search, setSearch] = useState("")

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-[#F5F7FC] text-slate-800"
    >
      <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
        <Link
          href="/universities"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-800"
        >
          <ArrowRight size={17} />
          العودة إلى الجامعات
        </Link>

        {/* واجهة الترحيب */}
        <section className="relative isolate overflow-hidden rounded-[30px] bg-gradient-to-br from-[#10264B] via-[#163D75] to-[#2459A9] px-5 py-10 text-center shadow-[0_20px_55px_rgba(22,61,117,0.18)] sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 -z-10 h-72 w-72 rounded-full bg-white/[0.04]" />
          <div className="pointer-events-none absolute right-1/2 top-0 -z-10 h-full w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent" />

          <div className="mx-auto flex max-w-3xl flex-col items-center">
            <div className="mb-5 flex h-[76px] w-[76px] items-center justify-center rounded-[25px] border border-white/20 bg-white/10 text-[#F5CD69] shadow-lg backdrop-blur-sm">
              <GraduationCap size={39} strokeWidth={1.7} />
            </div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F5CD69]/30 bg-[#F5CD69]/10 px-4 py-2 text-sm font-semibold text-[#FFE7A2]">
              <Sparkles size={16} />
              بوابتك الأكاديمية من منصة هديل
            </div>

            <h1 className="text-2xl font-black leading-relaxed tracking-tight text-white sm:text-4xl lg:text-[42px]">
              بوابة طالب {university.name}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-8 text-blue-100 sm:text-base sm:leading-9">
              وجهتك للوصول إلى الملفات والأدلة الجامعية والموارد الأكاديمية،
              في تجربة منظمة تساعدك على العثور على ما تحتاجه بسهولة.
            </p>

            <div className="mt-7 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <a
                href="#university-files"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#F5CD69] px-6 py-3.5 font-extrabold text-[#18345B] shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#FFDF89]"
              >
                <FolderOpen size={20} />
                اكتشف الملفات والأدلة
              </a>

              <a
                href="#academic-resources"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/25 bg-white/[0.08] px-6 py-3.5 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.15]"
              >
                <BookOpen size={20} />
                استكشف الموارد الأكاديمية
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-blue-100 sm:text-sm">
              <span className="inline-flex items-center gap-2">
                <FileText size={16} className="text-[#F5CD69]" />
                ملفات وأدلة جامعية
              </span>
              <span className="inline-flex items-center gap-2">
                <BookOpen size={16} className="text-[#F5CD69]" />
                موارد تعليمية
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles size={16} className="text-[#F5CD69]" />
                محتوى منظم
              </span>
            </div>
          </div>
        </section>

        {/* مقدمة الأقسام */}
        <section className="mt-10 text-center sm:mt-12">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-white text-[#2459A9] shadow-sm">
            <LibraryBig size={27} strokeWidth={1.8} />
          </div>

          <h2 className="mt-4 text-2xl font-black text-[#172B4D] sm:text-3xl">
            كل مواردك الجامعية في مكان واحد
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-8 text-slate-500 sm:text-base">
            تصفح أقسام البوابة للوصول إلى الأدلة والملفات والشروحات والروابط
            المفيدة لدراستك.
          </p>
        </section>

        {/* بطاقات الأقسام */}
        <section className="mt-7 grid gap-5 sm:grid-cols-2">
          <a
            href="#university-files"
            className="group rounded-[26px] border border-slate-200/80 bg-white p-6 text-center shadow-[0_5px_22px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_38px_rgba(36,89,169,0.10)] sm:p-8"
          >
            <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-[25px] bg-gradient-to-br from-blue-50 to-blue-100 text-[#2459A9] transition duration-300 group-hover:scale-105 group-hover:from-blue-100 group-hover:to-blue-200">
              <FileText size={35} strokeWidth={1.7} />
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#172B4D]">
              الملفات والأدلة الجامعية
            </h3>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-8 text-slate-500">
              الأدلة الجامعية والوثائق والملفات بصيغ PDF وWord وغيرها،
              لتصل إلى المعلومات التي تحتاجها بسهولة.
            </p>

            <span className="mt-5 inline-flex items-center justify-center gap-2 font-bold text-[#2459A9]">
              استعراض الملفات
              <ArrowRight
                size={17}
                className="transition-transform group-hover:-translate-x-1"
              />
            </span>
          </a>

          <a
            href="#academic-resources"
            className="group rounded-[26px] border border-slate-200/80 bg-white p-6 text-center shadow-[0_5px_22px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_18px_38px_rgba(166,106,0,0.09)] sm:p-8"
          >
            <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-[25px] bg-gradient-to-br from-amber-50 to-amber-100 text-[#A66A00] transition duration-300 group-hover:scale-105 group-hover:from-amber-100 group-hover:to-amber-200">
              <BookOpen size={35} strokeWidth={1.7} />
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-[#172B4D]">
              الموارد الأكاديمية
            </h3>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-8 text-slate-500">
              شروحات تعليمية وأدلة إرشادية وروابط أكاديمية مفيدة
              تساعدك على الوصول إلى الموارد المناسبة.
            </p>

            <span className="mt-5 inline-flex items-center justify-center gap-2 font-bold text-[#A66A00]">
              استعراض الموارد
              <ArrowRight
                size={17}
                className="transition-transform group-hover:-translate-x-1"
              />
            </span>
          </a>
        </section>

        {/* البحث */}
        <section className="mt-8 rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#2459A9]">
              <Search size={24} />
            </div>

            <h2 className="mt-3 text-lg font-extrabold text-[#172B4D]">
              ماذا تبحث عنه اليوم؟
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              ابحث عن ملف أو دليل أو مورد أكاديمي.
            </p>

            <div className="relative mt-5 w-full">
              <Search
                size={19}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="اكتب اسم الملف أو المورد..."
                aria-label="البحث عن ملف أو مورد أكاديمي"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-4 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <p className="mt-3 text-xs leading-6 text-slate-400">
              سيعمل البحث على المحتوى المنشور بعد ربط البوابة بقاعدة البيانات.
            </p>
          </div>
        </section>

        {/* الملفات والأدلة */}
        <section id="university-files" className="mt-10 scroll-mt-6 sm:mt-12">
          <div className="mb-5 flex flex-col items-center text-center">
            <div className="flex h-[66px] w-[66px] items-center justify-center rounded-[22px] bg-blue-100 text-[#2459A9]">
              <FolderOpen size={31} strokeWidth={1.8} />
            </div>

            <h2 className="mt-4 text-xl font-black text-[#172B4D] sm:text-2xl">
              الملفات والأدلة الجامعية
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-8 text-slate-500">
              ستجد هنا الملفات والأدلة التي تنشرها إدارة منصة هديل
              والمخصصة لطلاب هذه الجامعة.
            </p>
          </div>

          <EmptyState
            icon="file"
            search={search}
            title="لا توجد ملفات منشورة حاليًا"
            description="ستظهر هنا الأدلة والوثائق والملفات الجامعية فور إضافتها ونشرها من لوحة الإدارة."
          />
        </section>

        {/* الموارد الأكاديمية */}
        <section
          id="academic-resources"
          className="mt-10 scroll-mt-6 sm:mt-12"
        >
          <div className="mb-5 flex flex-col items-center text-center">
            <div className="flex h-[66px] w-[66px] items-center justify-center rounded-[22px] bg-amber-100 text-[#A66A00]">
              <Sparkles size={31} strokeWidth={1.8} />
            </div>

            <h2 className="mt-4 text-xl font-black text-[#172B4D] sm:text-2xl">
              الموارد الأكاديمية
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-8 text-slate-500">
              شروحات وأدلة وروابط تعليمية مفيدة، منظمة لتسهيل وصولك
              إلى المحتوى الأكاديمي.
            </p>
          </div>

          <EmptyState
            icon="book"
            search={search}
            title="موارد أكاديمية قريبًا"
            description="ستظهر هنا الشروحات والأدلة والروابط المفيدة التي تضيفها الإدارة وتنشرها للطلاب."
          />
        </section>

        {/* التذييل */}
        <footer className="mt-10 overflow-hidden rounded-[26px] border border-blue-100 bg-gradient-to-br from-white to-blue-50 px-5 py-8 text-center sm:py-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#2459A9] shadow-sm ring-1 ring-blue-100">
            <GraduationCap size={29} />
          </div>

          <h2 className="mt-4 text-lg font-black text-[#172B4D] sm:text-xl">
            منصة هديل — علم وإنجاز
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-8 text-slate-600">
            نسعى إلى تسهيل وصولك إلى الموارد الأكاديمية، وتنظيم الأدلة
            والملفات الجامعية في تجربة واحدة مريحة.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 text-xs font-semibold text-[#2459A9]">
            <Sparkles size={15} />
            <span>معك في رحلتك الأكاديمية</span>
          </div>
        </footer>
      </div>
    </main>
  )
}

function EmptyState({
  icon,
  search,
  title,
  description,
}: {
  icon: "file" | "book"
  search: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-[26px] border border-dashed border-slate-200 bg-white px-5 py-10 text-center sm:py-12">
      <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-[25px] bg-slate-50 text-slate-400 ring-1 ring-slate-100">
        {icon === "file" ? (
          <FileQuestion size={35} strokeWidth={1.5} />
        ) : (
          <BookOpen size={35} strokeWidth={1.5} />
        )}
      </div>

      <h3 className="mt-5 text-lg font-extrabold text-[#172B4D]">
        {search.trim() ? "سيظهر المحتوى المطابق هنا" : title}
      </h3>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-8 text-slate-500">
        {search.trim()
          ? "سيتم البحث ضمن الملفات والموارد المنشورة بعد إكمال ربط قاعدة البيانات."
          : description}
      </p>

      <div className="mx-auto mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-500">
        <FileText size={15} />
        <span>المحتوى المنشور من إدارة منصة هديل</span>
      </div>
    </div>
  )
}
