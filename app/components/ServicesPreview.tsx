'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

import { services } from './Services'

export default function ServicesPreview() {
  // نعرض أول 6 خدمات فقط في الصفحة الرئيسية
  const previewServices = services.slice(0, 6)

  return (
    <section
      id="services-preview"
      dir="rtl"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
    >
      {/* خلفيات زخرفية */}
      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-purple-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* رأس القسم */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-bold text-purple-700">
            <Sparkles className="h-4 w-4" />
            خدمات منصة هديل
          </div>

          <h2 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            خدمات أكاديمية
            <span className="mx-2 bg-gradient-to-l from-purple-600 to-blue-600 bg-clip-text text-transparent">
              متكاملة
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            مجموعة متكاملة من الخدمات البحثية والأكاديمية والمهنية لمساعدتك
            على إنجاز أعمالك وتنظيمها بصورة احترافية.
          </p>
        </div>

        {/* الخدمات المختارة */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {previewServices.map((service) => {
            const Icon = service.icon

            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group relative overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-300 hover:shadow-xl"
              >
                {/* الخط العلوي */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-purple-600 to-blue-600 opacity-70" />

                {/* الرقم */}
                <div className="absolute left-5 top-5 select-none text-5xl font-black text-gray-100 transition-colors duration-300 group-hover:text-purple-50">
                  {service.number}
                </div>

                {/* الأيقونة */}
                <div className="relative mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-200 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-7 w-7" />
                  </div>

                  <span className="rounded-full bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-500">
                    {service.tag}
                  </span>
                </div>

                {/* العنوان */}
                <h3 className="text-xl font-black leading-8 text-gray-900">
                  {service.title}
                </h3>

                <p className="mt-1 text-sm font-bold text-purple-600">
                  {service.subtitle}
                </p>

                {/* الوصف */}
                <p className="mt-4 line-clamp-3 text-sm leading-7 text-gray-600">
                  {service.description}
                </p>

                {/* المميزات */}
                <div className="mt-5 space-y-2 border-t border-gray-100 pt-5">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm font-medium text-gray-700"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-purple-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* رابط التفاصيل */}
                <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5 text-sm font-black text-purple-700">
                  <span>عرض تفاصيل الخدمة</span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white">
                    <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* زر جميع الخدمات */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-l from-purple-600 to-blue-600 px-7 py-4 font-black text-white shadow-lg shadow-purple-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <span>استكشف جميع الخدمات</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}