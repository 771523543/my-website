'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  ClipboardList,
  HelpCircle,
  MessageCircle,
  Sparkles,
} from 'lucide-react'

import { services } from '../../components/Services'

export default function ServiceDetailsPage() {
  const params = useParams()

  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const service = services.find((item) => item.id === id)

  if (!service) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-gray-50 px-4"
      >
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl">
          <h1 className="text-3xl font-black text-gray-900">
            الخدمة غير موجودة
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            يبدو أن الخدمة التي تبحث عنها غير متوفرة أو أن الرابط غير صحيح.
          </p>

          <Link
            href="/services"
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-purple-600 to-blue-600 px-6 py-3 font-black text-white"
          >
            العودة إلى الخدمات
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </main>
    )
  }

  const Icon = service.icon

  const whatsappUrl = `https://wa.me/967776280186?text=${encodeURIComponent(
    `مرحباً، أريد طلب خدمة: ${service.title}`
  )}`

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-white"
    >
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-br from-purple-50 via-white to-blue-50 py-16 sm:py-20">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-gray-600 transition-colors hover:text-purple-600"
          >
            <ArrowRight className="h-4 w-4" />
            العودة إلى الخدمات
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr]">
            {/* الأيقونة */}
            <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-200 sm:h-28 sm:w-28">
              <Icon className="h-12 w-12 sm:h-14 sm:w-14" />
            </div>

            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-purple-100 px-4 py-2 text-xs font-black text-purple-700">
                  {service.number}
                </span>

                <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-gray-600 shadow-sm">
                  {service.tag}
                </span>

                {service.subtitle && (
                  <span className="rounded-full bg-blue-50 px-4 py-2 text-xs font-black text-blue-700">
                    {service.subtitle}
                  </span>
                )}
              </div>

              <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
                {service.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* المحتوى */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* ماذا نقدم */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <FileText className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-black text-purple-600">
                  تفاصيل الخدمة
                </p>

                <h2 className="mt-1 text-2xl font-black text-gray-900">
                  ماذا نقدم؟
                </h2>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {service.offerings.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-purple-600" />
                  <p className="text-sm leading-7 text-gray-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* المتطلبات */}
          <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ClipboardList className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-black text-blue-600">
                  قبل البدء
                </p>

                <h2 className="mt-1 text-2xl font-black text-gray-900">
                  متطلبات الخدمة
                </h2>
              </div>
            </div>

            <div className="space-y-3">
              {service.requirements.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700">
                    {index + 1}
                  </span>

                  <p className="text-sm leading-7 text-gray-700">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-7 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <HelpCircle className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xs font-black text-amber-600">
                  سؤال شائع
                </p>

                <h2 className="mt-1 text-2xl font-black text-gray-900">
                  الأسئلة الشائعة
                </h2>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="font-black leading-7 text-gray-900">
                س: {service.faqQuestion}
              </h3>

              <p className="mt-3 text-sm leading-8 text-gray-600">
                ج: {service.faqAnswer}
              </p>
            </div>
          </div>

          {/* طلب الخدمة */}
          <div className="relative mt-8 overflow-hidden rounded-[2rem] bg-gradient-to-l from-purple-700 to-blue-700 p-7 text-white shadow-2xl sm:p-10">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-white/10" />

            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold">
                <Sparkles className="h-4 w-4" />
                جاهز للبدء؟
              </div>

              <h2 className="text-2xl font-black sm:text-3xl">
                اطلب خدمة {service.shortTitle}
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-8 text-white/85 sm:text-base">
                {service.requestText}
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-black text-purple-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                اطلب الخدمة عبر واتساب
                <ArrowLeft className="h-5 w-5" />
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}