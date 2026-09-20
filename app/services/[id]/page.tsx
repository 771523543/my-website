import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { services } from '../../components/Services'
import ServiceDetailsClient from './ServiceDetailsClient'

type Props = {
  params: Promise<{
    id: string
  }>
}

const serviceSeo: Record<
  string,
  {
    title: string
    description: string
    keywords: string[]
  }
> = {
  research: {
    title: 'الخدمات البحثية والأكاديمية',
    description:
      'خدمات بحثية وأكاديمية تشمل إعداد البحوث والدراسات وأوراق العمل والخطط البحثية وتنسيق المراجع والمحتوى الأكاديمي.',
    keywords: [
      'الخدمات البحثية',
      'الخدمات الأكاديمية',
      'إعداد البحوث',
      'البحوث الجامعية',
      'الدراسات الأكاديمية',
      'أوراق العمل',
      'خطط البحث',
      'تنسيق المراجع',
      'خدمات طلابية',
      'منصة هديل',
    ],
  },

  reports: {
    title: 'التقارير الجامعية',
    description:
      'خدمات إعداد التقارير الجامعية العلمية والعملية والميدانية مع تنظيم المعلومات وتحليلها وتنسيق التقرير بصورة أكاديمية.',
    keywords: [
      'التقارير الجامعية',
      'إعداد التقارير',
      'تقارير جامعية',
      'تقارير علمية',
      'تقارير ميدانية',
      'تقارير أكاديمية',
      'خدمات طلابية',
      'منصة هديل',
    ],
  },

  assignments: {
    title: 'التكاليف الجامعية',
    description:
      'خدمات إعداد وتنظيم التكاليف الجامعية والمشاريع الفصلية والمهام الأكاديمية وفق متطلبات المادة والجامعة.',
    keywords: [
      'التكاليف الجامعية',
      'التكاليف الفصلية',
      'مشاريع جامعية',
      'واجبات جامعية',
      'مهام أكاديمية',
      'خدمات طلابية',
      'منصة هديل',
    ],
  },

  homework: {
    title: 'الواجبات الدراسية',
    description:
      'خدمات مساعدة في إعداد وتنظيم الواجبات الدراسية اليومية والأسبوعية وحل الأسئلة والتدريبات وتنسيق الإجابات.',
    keywords: [
      'الواجبات الدراسية',
      'الواجبات الجامعية',
      'حل الواجبات',
      'التكاليف الدراسية',
      'المهام الدراسية',
      'خدمات طلابية',
      'منصة هديل',
    ],
  },

  lms: {
    title: 'إدارة المنصات والمهام الدراسية',
    description:
      'خدمات المساعدة في تنظيم ومتابعة المهام الدراسية المرتبطة بالمنصات التعليمية والاختبارات والأنشطة الإلكترونية.',
    keywords: [
      'إدارة المنصات التعليمية',
      'LMS',
      'المنصات التعليمية',
      'المهام الدراسية',
      'الاختبارات الإلكترونية',
      'الأنشطة الإلكترونية',
      'خدمات طلابية',
      'منصة هديل',
    ],
  },

  presentation: {
    title: 'العروض التقديمية والتصميم',
    description:
      'خدمات تصميم العروض التقديمية الأكاديمية وPowerPoint والإنفوجرافيك وتنظيم المحتوى بصورة احترافية.',
    keywords: [
      'العروض التقديمية',
      'PowerPoint',
      'تصميم عروض',
      'عروض جامعية',
      'عروض أكاديمية',
      'إنفوجرافيك',
      'تصميم أكاديمي',
      'منصة هديل',
    ],
  },

  cv: {
    title: 'السيرة الذاتية والخدمات المهنية',
    description:
      'خدمات إعداد وتصميم السيرة الذاتية CV بصورة احترافية ومنظمة للتقديم على الفرص الأكاديمية والمهنية.',
    keywords: [
      'السيرة الذاتية',
      'CV',
      'تصميم السيرة الذاتية',
      'إنشاء CV',
      'سيرة ذاتية احترافية',
      'الخدمات المهنية',
      'منصة هديل',
    ],
  },

  'case-study': {
    title: 'دراسة الحالة',
    description:
      'خدمات إعداد وتحليل دراسات الحالة الأكاديمية مع تنظيم الحالة والنتائج والتوصيات وفق المتطلبات التعليمية.',
    keywords: [
      'دراسة الحالة',
      'Case Study',
      'تحليل دراسة الحالة',
      'دراسات أكاديمية',
      'البحوث الجامعية',
      'خدمات بحثية',
      'منصة هديل',
    ],
  },

  feasibility: {
    title: 'دراسات الجدوى',
    description:
      'خدمات إعداد وتنظيم دراسات الجدوى الأكاديمية والمشاريع مع تحليل البيانات وإعداد الجداول والمحتوى المطلوب.',
    keywords: [
      'دراسات الجدوى',
      'دراسة جدوى',
      'Feasibility Study',
      'مشاريع جامعية',
      'تحليل المشاريع',
      'خدمات بحثية',
      'منصة هديل',
    ],
  },

  graduation: {
    title: 'مشاريع التخرج',
    description:
      'خدمات مساعدة في تنظيم وإعداد مشاريع التخرج ومراحلها المختلفة وتنسيق التقرير النهائي والعرض التقديمي.',
    keywords: [
      'مشاريع التخرج',
      'مشروع تخرج',
      'مشاريع جامعية',
      'تقرير التخرج',
      'العرض التقديمي',
      'الخدمات الأكاديمية',
      'خدمات طلابية',
      'منصة هديل',
    ],
  },
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { id } = await params

  const service = services.find((item) => item.id === id)

  if (!service) {
    return {
      title: 'الخدمة غير موجودة',
      description: 'الخدمة المطلوبة غير موجودة في منصة هديل.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const seo = serviceSeo[service.id]

  const title =
    seo?.title ?? `${service.title} | منصة هديل`

  const description =
    seo?.description ?? service.subtitle

  const keywords =
    seo?.keywords ?? [
      service.title,
      service.subtitle,
      'منصة هديل',
      'خدمات طلابية',
      'خدمات أكاديمية',
    ]

  const canonicalUrl =
    `https://hadeel-alpha.vercel.app/services/${service.id}`

  return {
    title,

    description,

    keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,

      description,

      url: canonicalUrl,

      siteName: 'منصة هديل',

      locale: 'ar_SA',

      type: 'website',

      images: [
        {
          url: service.image,
          alt: service.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',

      title,

      description,

      images: [service.image],
    },
  }
}

export default async function ServiceDetailsPage({
  params,
}: Props) {
  const { id } = await params

  const service = services.find(
    (item) => item.id === id,
  )

  if (!service) {
    notFound()
  }

  return (
    <ServiceDetailsClient
      service={service}
    />
  )
}