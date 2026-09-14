'use client'

import Image from 'next/image'
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Headphones,
  Presentation,
  Sparkles,
  UserRound,
} from 'lucide-react'

export type Service = {
  id: string
  category: 'research' | 'design' | 'academic'
  icon: any
  image: string
  title: string
  shortText: string
  about: string
  features: string[]
}

export const services: Service[] = [
  {
    id: 'research',
    category: 'research',
    icon: BookOpen,
    image: '/images/service-research.png',
    title: 'إعداد البحوث والتقارير',
    shortText:
      'بحوث وتقارير علمية وفق منهجية أكاديمية وتوثيق معتمد خالية من الاقتباس.',
    about:
      'نقدم خدمة إعداد البحوث والتقارير الأكاديمية بأسلوب منظم واحترافي، مع الاهتمام بالمنهجية الأكاديمية والتنسيق والتوثيق وإخراج البحث بصورة مناسبة للتسليم الجامعي.',
    features: [
      'تنسيق أكاديمي احترافي.',
      'تنظيم العناوين والمراجع والمحتوى.',
      'توثيق المصادر والمراجع.',
      'مراجعة وتنسيق البحث قبل التسليم.',
    ],
  },

  {
    id: 'presentation',
    category: 'design',
    icon: Presentation,
    image: '/images/service-presentation.png',
    title: 'العروض التقديمية',
    shortText:
      'تصميم شرائح PowerPoint احترافية وتفاعلية لمشاريع التخرج والمناقشات.',
    about:
      'نصمم عروض PowerPoint احترافية تساعدك على تقديم مشروعك أو بحثك بصورة واضحة وجذابة، مع تنظيم المحتوى وتوزيعه على الشرائح بطريقة مناسبة.',
    features: [
      'تصميم احترافي للشرائح.',
      'تنظيم المحتوى بطريقة واضحة.',
      'مناسب لمشاريع التخرج والمناقشات.',
      'إضافة الصور والعناصر البصرية المناسبة.',
    ],
  },

  {
    id: 'assignments',
    category: 'academic',
    icon: GraduationCap,
    image: '/images/service-assignments.png',
    title: 'التكليفات والواجبات',
    shortText:
      'حل ومتابعة وافية للأنشطة والواجبات الجامعية بمختلف التخصصات.',
    about:
      'خدمة تساعدك في تنظيم وفهم متطلبات التكليفات والواجبات الجامعية وتجهيزها بصورة مرتبة وواضحة وفق المطلوب.',
    features: [
      'تنظيم متطلبات التكليف.',
      'مساعدة في إعداد المحتوى.',
      'تنسيق وتسليم العمل بصورة احترافية.',
    ],
  },

  {
    id: 'cv',
    category: 'design',
    icon: UserRound,
    image: '/images/service-cv.png',
    title: 'السيرة الذاتية CV',
    shortText:
      'سير ذاتية عربية وإنجليزية متوافقة مع أنظمة الفرز الآلي ATS.',
    about:
      'نصمم سيرًا ذاتية احترافية بالعربية والإنجليزية مع تنظيم الخبرات والمؤهلات والمهارات بطريقة مناسبة للتقديم على الفرص الوظيفية.',
    features: [
      'تصميم عربي وإنجليزي.',
      'تنسيق مناسب لأنظمة ATS.',
      'تنظيم الخبرات والمهارات والمؤهلات.',
    ],
  },

  {
    id: 'invitations',
    category: 'design',
    icon: Sparkles,
    image: '/images/service-invitations.png',
    title: 'الدعوات الإلكترونية',
    shortText:
      'بطاقات تخرج ومناسبات بتصاميم حديثة ومميزة تناسب ذوقك.',
    about:
      'نقدم تصاميم دعوات إلكترونية للمناسبات والتخرج وغيرها، مع إمكانية تخصيص النصوص والمعلومات حسب المناسبة.',
    features: [
      'تصاميم حديثة ومميزة.',
      'تخصيص النصوص والمعلومات.',
      'مناسبة للتخرج والمناسبات المختلفة.',
    ],
  },

  {
    id: 'blackboard',
    category: 'academic',
    icon: Headphones,
    image: '/images/service-followup.png',
    title: 'متابعة مواد البلاك بورد',
    shortText:
      'إدارة ومتابعة المقررات والمحاضرات والاختبارات طوال الترم.',
    about:
      'خدمة لمتابعة وتنظيم متطلبات المقررات الدراسية على منصة البلاك بورد خلال الفصل الدراسي.',
    features: [
      'متابعة المقررات والمحاضرات.',
      'تنظيم المهام والمتطلبات.',
      'متابعة الاختبارات والتنبيهات.',
    ],
  },
]

const whatsapp = 'https://wa.me/967776280186'

export default function Services() {
  return (
    <section
      id="services"
      data-reveal
      className="section container reveal-section"
    >
      <div className="section-heading">
        <div>
          <span className="section-kicker">خدماتنا</span>

          <h2>
            حلول أكاديمية <em>شاملة وباحترافية</em>
          </h2>
        </div>

        <a
          className="text-button"
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
        >
          اطلب الآن <ArrowLeft size={17} />
        </a>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.7rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}
      >
        <span
          style={{
            padding: '0.65rem 1.2rem',
            borderRadius: '999px',
            background: 'var(--primary, #2563eb)',
            color: '#fff',
            fontWeight: 700,
          }}
        >
          جميع الخدمات
        </span>

        <span
          style={{
            padding: '0.65rem 1.2rem',
            borderRadius: '999px',
            background: 'rgba(37, 99, 235, 0.08)',
          }}
        >
          البحوث
        </span>

        <span
          style={{
            padding: '0.65rem 1.2rem',
            borderRadius: '999px',
            background: 'rgba(37, 99, 235, 0.08)',
          }}
        >
          التصميم
        </span>

        <span
          style={{
            padding: '0.65rem 1.2rem',
            borderRadius: '999px',
            background: 'rgba(37, 99, 235, 0.08)',
          }}
        >
          الخدمات الأكاديمية
        </span>
      </div>

      <div
        className="services-marquee-container"
        style={{
          overflow: 'hidden',
          padding: '1rem 0',
        }}
      >
        <div className="services-marquee-track">
          {[...services, ...services].map((service, index) => {
            const Icon = service.icon

            return (
              <article
                className="service-card"
                key={`${service.id}-${index}`}
                style={{
                  width: '320px',
                  flexShrink: 0,
                  margin: 0,
                }}
              >
                <div
                  className="service-image"
                  style={{
                    height: '180px',
                    position: 'relative',
                  }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="320px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div
                  className="service-content"
                  style={{
                    padding: '1.25rem',
                    textAlign: 'center',
                  }}
                >
                  <div className="service-icon">
                    <Icon size={25} />
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.shortText}</p>

                  <a
                    href={`/services/${service.id}`}
                    className="text-button"
                    style={{
                      marginTop: '1rem',
                      display: 'inline-flex',
                    }}
                  >
                    عرض الخدمة
                    <ArrowLeft size={17} />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes servicesMarquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(50%);
          }
        }

        .services-marquee-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: servicesMarquee 35s linear infinite;
        }

        .services-marquee-container:hover .services-marquee-track {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}