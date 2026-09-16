import Link from 'next/link'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

import { services } from '../components/Services'

export default function ServicesPage() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white text-slate-900"
    >
      {/* =========================
          Hero
      ========================== */}
      <section className="relative overflow-hidden border-b border-slate-100">
        {/* خلفيات زخرفية */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-purple-100/60 blur-3xl" />
          <div className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute right-1/3 bottom-0 h-64 w-64 rounded-full bg-indigo-50/70 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {/* العودة للرئيسية */}
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all hover:-translate-x-1 hover:border-purple-200 hover:text-purple-700 hover:shadow-md"
          >
            <ArrowRight className="h-4 w-4" />
            العودة للرئيسية
          </Link>

          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
              <Sparkles className="h-4 w-4" />
              خدمات منصة هديل
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              خدماتنا
              <span className="block bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                الأكاديمية المتكاملة
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              مجموعة متكاملة من الخدمات الأكاديمية والطلابية المصممة
              لمساعدتك في إنجاز مهامك ومشاريعك باحترافية وتنظيم.
            </p>

            {/* إحصائية بسيطة */}
            <div className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                {services.length}
              </span>
              خدمة أكاديمية متخصصة
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Services Grid
      ========================== */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold text-purple-600">
                اختر الخدمة المناسبة لك
              </p>

              <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                جميع الخدمات
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-slate-500">
              استعرض تفاصيل كل خدمة لمعرفة ما نقدمه والمتطلبات وطريقة طلب
              الخدمة.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl"
              >
                {/* الخط العلوي */}
                <div className="h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

                <div className="relative p-6 sm:p-7">
                  {/* رقم الخدمة */}
                  <div className="pointer-events-none absolute left-4 top-2 text-7xl font-black text-slate-100 transition-colors duration-300 group-hover:text-purple-50">
                    {service.number}
                  </div>

                  {/* الأيقونة والتصنيف */}
                  <div className="relative mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-200 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1">
                      {service.icon}
                    </div>

                    <span className="rounded-full border border-purple-100 bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700">
                      {service.tag}
                    </span>
                  </div>

                  {/* العنوان */}
                  <div className="relative">
                    <h3 className="text-xl font-black leading-8 text-slate-900">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold leading-6 text-purple-600">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* الوصف الكامل */}
                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    {service.description}
                  </p>

                  {/* أبرز الخدمات */}
                  <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                    {service.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2.5 text-sm leading-6 text-slate-600"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-purple-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* زر التفاصيل */}
                  <Link
                    href={`/services/${service.id}`}
                    className="mt-7 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-bold text-slate-800 transition-all duration-300 group-hover:border-purple-200 group-hover:bg-purple-50 group-hover:text-purple-700"
                  >
                    <span>عرض تفاصيل الخدمة</span>

                    <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          CTA
      ========================== */}
      <section className="relative overflow-hidden border-t border-slate-100 bg-slate-50">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-100/50 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg">
            <Sparkles className="h-6 w-6" />
          </div>

          <h2 className="mt-6 text-2xl font-black text-slate-900 sm:text-3xl">
            هل وجدت الخدمة التي تبحث عنها؟
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            اختر الخدمة المناسبة لك واطلع على تفاصيلها ومتطلباتها، ثم
            تواصل معنا لبدء العمل.
          </p>

          <Link
            href="/#contact"
            className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            تواصل معنا
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}