'use client'

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
      className="min-h-screen bg-white"
    >
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-gray-600 transition-colors hover:text-purple-600"
          >
            <ArrowRight className="h-4 w-4" />
            العودة للرئيسية
          </Link>

          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-sm font-bold text-purple-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              منصة هديل للخدمات الطلابية والأكاديمية
            </div>

            <h1 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
              خدماتنا
              <span className="mx-2 bg-gradient-to-l from-purple-600 to-blue-600 bg-clip-text text-transparent">
                الأكاديمية
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
              اكتشف جميع خدماتنا الأكاديمية والبحثية والمهنية، واختر الخدمة
              المناسبة لاحتياجك مع إمكانية الاطلاع على التفاصيل والمتطلبات
              وطريقة الطلب.
            </p>
          </div>
        </div>
      </section>

      {/* الخدمات */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="text-sm font-black text-purple-600">
                جميع الخدمات
              </p>

              <h2 className="mt-2 text-3xl font-black text-gray-900">
                اختر الخدمة المناسبة لك
              </h2>
            </div>

            <div className="hidden rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-600 sm:block">
              {services.length} خدمات
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon

              return (
                <article
                  key={service.id}
                  className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl sm:p-7"
                >
                  <div className="absolute -left-16 -top-16 h-36 w-36 rounded-full bg-purple-50 transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative flex flex-col gap-6 sm:flex-row">
                    {/* الأيقونة */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-200 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-8 w-8" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-xs font-black text-purple-600">
                          {service.number} · {service.tag}
                        </span>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500">
                          {service.shortTitle}
                        </span>
                      </div>

                      <h2 className="text-xl font-black leading-8 text-gray-900">
                        {service.title}
                      </h2>

                      {service.subtitle && (
                        <p className="mt-1 text-sm font-bold text-gray-500">
                          {service.subtitle}
                        </p>
                      )}

                      <p className="mt-4 text-sm leading-7 text-gray-600">
                        {service.description}
                      </p>

                      <div className="mt-5 grid gap-2 sm:grid-cols-2">
                        {service.features.map((feature) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2 text-sm font-medium text-gray-700"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-purple-600" />
                            {feature}
                          </div>
                        ))}
                      </div>

                      <Link
                        href={`/services/${service.id}`}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-50 px-4 py-3 text-sm font-black text-purple-700 transition-all duration-300 hover:bg-purple-600 hover:text-white"
                      >
                        عرض تفاصيل الخدمة
                        <ArrowLeft className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}