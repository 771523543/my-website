import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  FileText,
  HelpCircle,
  MessageCircle,
  Sparkles,
  ListChecks,
} from 'lucide-react'

import { services } from '../../components/Services'

type ServicePageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ServiceDetailsPage({
  params,
}: ServicePageProps) {
  const { id } = await params

  const service = services.find((item) => item.id === id)

  if (!service) {
    notFound()
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white text-slate-900"
    >
      {/* =========================================
          Hero
      ========================================== */}
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-100/60 blur-3xl" />
          <div className="absolute -left-32 top-40 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-indigo-50/70 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {/* Breadcrumb */}
          <div className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link
              href="/"
              className="transition-colors hover:text-purple-600"
            >
              الرئيسية
            </Link>

            <ArrowLeft className="h-4 w-4" />

            <Link
              href="/services"
              className="transition-colors hover:text-purple-600"
            >
              الخدمات
            </Link>

            <ArrowLeft className="h-4 w-4" />

            <span className="font-semibold text-slate-800">
              {service.shortTitle}
            </span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_280px]">
            {/* المحتوى */}
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm font-bold text-purple-700">
                  <Sparkles className="h-4 w-4" />
                  {service.tag}
                </span>

                <span className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-500">
                  {service.category}
                </span>
              </div>

              <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {service.title}
              </h1>

              <p className="mt-4 text-base font-bold leading-8 text-purple-600 sm:text-lg">
                {service.subtitle}
              </p>

              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600">
                {service.description}
              </p>
            </div>

            {/* أيقونة الخدمة */}
            <div className="mx-auto flex w-full max-w-[220px] flex-col items-center justify-center rounded-[32px] border border-purple-100 bg-white p-8 shadow-xl shadow-purple-100/50">
              <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xl shadow-purple-200">
                <div className="[&>svg]:h-11 [&>svg]:w-11">
                  {service.icon}
                </div>
              </div>

              <div className="mt-5 text-center">
                <div className="text-4xl font-black text-slate-200">
                  {service.number}
                </div>

                <p className="mt-1 text-xs font-bold text-slate-500">
                  خدمة من خدمات منصة هديل
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          Main Content
      ========================================== */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            {/* المحتوى الرئيسي */}
            <div className="space-y-8">
              {/* ماذا نقدم */}
              <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 bg-slate-50/70 p-6 sm:p-7">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                      <ListChecks className="h-6 w-6" />
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-slate-900">
                        ماذا نقدم؟
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        تفاصيل الخدمات التي تشملها هذه الخدمة
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="grid gap-4">
                    {service.offerings.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-300 hover:border-purple-100 hover:bg-purple-50/40"
                      >
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>

                        <p className="text-sm leading-7 text-slate-700">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* المتطلبات */}
              <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 bg-slate-50/70 p-6 sm:p-7">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <ClipboardList className="h-6 w-6" />
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-slate-900">
                        متطلبات الخدمة
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        المعلومات والملفات المطلوبة لبدء العمل
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {service.requirements.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-black text-blue-700">
                          {index + 1}
                        </span>

                        <p className="text-sm leading-7 text-slate-700">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* FAQ */}
              <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 bg-slate-50/70 p-6 sm:p-7">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                      <HelpCircle className="h-6 w-6" />
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-slate-900">
                        الأسئلة الشائعة
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        إجابة عن أحد أكثر الأسئلة المتعلقة بالخدمة
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-600 text-sm font-black text-white">
                        س
                      </div>

                      <p className="font-bold leading-7 text-slate-900">
                        {service.faqQuestion}
                      </p>
                    </div>

                    <div className="mt-5 flex items-start gap-3 border-t border-purple-100 pt-5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-black text-purple-700 shadow-sm">
                        ج
                      </div>

                      <p className="leading-8 text-slate-600">
                        {service.faqAnswer}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* =====================================
                Sidebar
            ====================================== */}
            <aside className="lg:sticky lg:top-6 lg:h-fit">
              <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-lg shadow-slate-100">
                <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-6 text-white">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    <MessageCircle className="h-6 w-6" />
                  </div>

                  <h2 className="mt-5 text-xl font-black">
                    {service.requestText}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-white/80">
                    تواصل معنا الآن للحصول على تفاصيل الخدمة والبدء في
                    تنفيذ طلبك.
                  </p>
                </div>

                <div className="p-5">
                  <a
                    href={`https://wa.me/967776280186?text=${encodeURIComponent(
                      `مرحباً، أرغب في طلب خدمة: ${service.title}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-purple-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <MessageCircle className="h-5 w-5" />
                    طلب الخدمة عبر واتساب
                  </a>

                  <Link
                    href="/services"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-700 transition-all hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700"
                  >
                    <ArrowRight className="h-4 w-4" />
                    العودة لجميع الخدمات
                  </Link>
                </div>
              </div>

              {/* معلومات مختصرة */}
              <div className="mt-5 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-purple-600" />

                  <span className="text-sm font-black text-slate-800">
                    معلومات الخدمة
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <span className="text-xs text-slate-500">
                      التصنيف
                    </span>

                    <span className="text-xs font-bold text-slate-800">
                      {service.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      رقم الخدمة
                    </span>

                    <span className="text-xs font-black text-purple-700">
                      {service.number}
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* =========================================
          Bottom Navigation
      ========================================== */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition-colors hover:text-purple-700"
          >
            <ArrowRight className="h-5 w-5" />
            جميع الخدمات
          </Link>

          <a
            href={`https://wa.me/967776280186?text=${encodeURIComponent(
              `مرحباً، أريد الاستفسار عن خدمة: ${service.title}`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-purple-700 transition-colors hover:bg-purple-50"
          >
            هل لديك استفسار؟
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  )
}