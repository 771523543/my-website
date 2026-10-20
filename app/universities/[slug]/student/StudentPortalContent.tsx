"use client"

import Link from "next/link"
import {
ArrowRight,
BookOpen,
FileText,
GraduationCap,
FolderOpen,
Search,
Sparkles,
} from "lucide-react"
import { useMemo, useState } from "react"

import type { University } from "@/app/components/universities/data"

type Props = {
university: University
}

export default function StudentPortalContent({ university }: Props) {
const [search, setSearch] = useState("")

const resources = useMemo(() => {
const query = search.trim().toLowerCase()

return university.colleges
  .flatMap((college) =>
    college.majors.map((major) => ({
      college: college.name,
      name: major.name,
      degree: "تخصص جامعي",
    }))
  )
  .filter(
    (item) =>
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.college.toLowerCase().includes(query)
  )

}, [university, search])

return (
<main
dir="rtl"
className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8"
>
<div className="mx-auto max-w-6xl">
<Link
href="/universities"
className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-700"
>
<ArrowRight size={18} />
العودة إلى الجامعات
</Link>

    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-blue-950 via-blue-800 to-blue-600 p-6 text-white shadow-xl sm:p-10">
      <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 right-1/3 h-48 w-48 rounded-full bg-white/5" />

      <div className="relative z-10">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
          <GraduationCap size={19} />
          بوابة الطالب
        </div>

        <h1 className="text-2xl font-extrabold leading-relaxed sm:text-4xl">
          أهلاً بك في بوابة طالب {university.name}
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-8 text-blue-50 sm:text-base">
          مساحة تجمع المعلومات والملفات والأدلة الأكاديمية التي تساعدك
          على الوصول إلى مواردك الجامعية بسهولة.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/universities/${university.slug}/colleges`}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-blue-900 transition hover:bg-blue-50"
          >
            <BookOpen size={19} />
            الكليات والتخصصات
          </Link>

          <a
            href="#student-resources"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/20"
          >
            <FolderOpen size={19} />
            استعراض الموارد
          </a>
        </div>
      </div>
    </section>

    <section className="mt-8 grid gap-4 sm:grid-cols-3">
      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
          <BookOpen size={25} />
        </div>
        <h2 className="font-bold text-slate-800">الكليات والتخصصات</h2>
        <p className="mt-2 text-sm leading-7 text-slate-500">
          تعرّف على الكليات والتخصصات المتاحة في الجامعة.
        </p>
        <p className="mt-3 text-sm font-bold text-blue-700">
          {university.colleges.length} كلية
        </p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
          <FileText size={25} />
        </div>
        <h2 className="font-bold text-slate-800">الملفات والأدلة</h2>
        <p className="mt-2 text-sm leading-7 text-slate-500">
          ستكون هنا الملفات والأدلة التي تضيفها إدارة منصة هديل.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Sparkles size={25} />
        </div>
        <h2 className="font-bold text-slate-800">الموارد الأكاديمية</h2>
        <p className="mt-2 text-sm leading-7 text-slate-500">
          تنظيم الموارد الجامعية في مكان واحد لتسهيل الوصول إليها.
        </p>
      </div>
    </section>

    <section
      id="student-resources"
      className="mt-8 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            الموارد الأكاديمية
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            استعرض التخصصات الموجودة حاليًا، وستظهر الملفات المنشورة
            للجامعة هنا بعد ربطها بقاعدة البيانات.
          </p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search
            size={19}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="ابحث عن كلية أو تخصص..."
            aria-label="البحث عن كلية أو تخصص"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-10 pl-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {resources.length > 0 ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((item, index) => (
            <article
              key={`${item.college}-${item.name}-${index}`}
              className="rounded-2xl border border-slate-100 p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <BookOpen size={20} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold leading-7 text-slate-800">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs leading-6 text-slate-500">
                    {item.college}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                    {item.degree}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center">
          <Search size={30} className="mx-auto text-slate-400" />
          <p className="mt-3 font-semibold text-slate-700">
            لا توجد نتائج مطابقة
          </p>
          <p className="mt-1 text-sm text-slate-500">
            جرّب البحث باسم كلية أو تخصص آخر.
          </p>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-7 text-amber-900">
        <strong>تنبيه:</strong> هذه النسخة تعرض البيانات المحلية الحالية
        للجامعة. لم نربط ملفات Supabase بعد؛ سننفذ ذلك في الخطوة التالية
        بعد التأكد من أن الصفحة تعمل.
      </div>
    </section>
  </div>
</main>

)
}