'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Sparkles,
} from 'lucide-react'

import { services } from './Services'

export default function ServicesPreview() {
  return (
    <section
      id="services-preview"
      dir="rtl"
      className="relative overflow-hidden py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* العنوان */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-bold text-purple-700">
            <Sparkles className="h-4 w-4" />
            خدمات منصة هديل
          </div>

          <h2 className="text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
            خدمات أكاديمية
            <span className="mx-2 bg-gradient-to-l from-purple-600 to-blue-600 bg-clip-text text-transparent">
              متكاملة
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            نوفر لك مجموعة متكاملة من الخدمات الأكاديمية والبحثية والمهنية
            لمساعدتك على إنجاز أعمالك وتنظيمها بصورة احترافية.
          </p>
        </div>

        {/* بطاقات مختارة */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => {
            const Icon = service.icon

            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-2xl"
              >
                {/* زخرفة */}
                <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-purple-50 transition-transform duration-500 group-hover:scale-150" />

                <div className="relative">
                  {/* الأيقونة */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-200 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* رقم */}
                  <div className="absolute left-0 top-0 text-4xl font-black text-gray-100">
                    {service.number}
                  </div>

                  <div className="mb-2 text-xs font-bold text-purple-600">
                    {service.tag}
                  </div>

                  <h3 className="text-xl font-black leading-8 text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-gray-600">
                    {service.description}
                  </p>

                  <div className="mt-5 space-y-2">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-purple-600" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5 text-sm font-black text-purple-700">
                    <span>عرض التفاصيل</span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white">
                      <ArrowLeft className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* زر جميع الخدمات */}
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-l from-purple-600 to-blue-600 px-7 py-4 font-black text-white shadow-lg shadow-purple-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <GraduationCap className="h-5 w-5" />
            مشاهدة جميع الخدمات
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}