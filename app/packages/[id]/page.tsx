'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  MessageCircle,
  Sparkles,
} from 'lucide-react'

import { packagesData } from '../../components/packagesData'

export default function PackageDetailsPage() {
  const params = useParams()
  const id = params?.id as string

  const packageData = packagesData.find(
    (item) => item.id === id
  )

  const [openSection, setOpenSection] = useState<
    number | null
  >(0)

  if (!packageData) {
    return (
      <main
        dir="rtl"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px 20px',
          textAlign: 'center',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 800,
              marginBottom: '15px',
            }}
          >
            الباقة غير موجودة
          </h1>

          <p
            style={{
              marginBottom: '25px',
              opacity: 0.75,
            }}
          >
            عذراً، لم يتم العثور على الباقة المطلوبة.
          </p>

          <Link
            href="/#packages"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
            }}
          >
            <ArrowRight size={19} />
            العودة إلى الباقات
          </Link>
        </div>
      </main>
    )
  }

  const whatsappUrl =
    `https://wa.me/967776280186?text=${encodeURIComponent(
      packageData.whatsappText
    )}`

  return (
    <main
      dir="rtl"
      style={{
        minHeight: '100vh',
        padding: '40px 20px 80px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {/* العودة */}
        <Link
          href="/#packages"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            marginBottom: '30px',
            fontWeight: 700,
          }}
        >
          <ArrowRight size={20} />
          العودة إلى الباقات
        </Link>

        {/* الهيدر */}
        <section
          style={{
            textAlign: 'center',
            marginBottom: '45px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '15px',
              fontWeight: 700,
            }}
          >
            <Sparkles size={20} />
            <span>{packageData.badge}</span>
          </div>

          <p
            style={{
              margin: '0 0 10px',
              fontSize: '15px',
              opacity: 0.7,
              fontWeight: 700,
            }}
          >
            {packageData.platform}
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(30px, 6vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.3,
            }}
          >
            {packageData.title}
          </h1>

          <p
            style={{
              maxWidth: '750px',
              margin: '18px auto 0',
              fontSize: 'clamp(17px, 2.5vw, 21px)',
              lineHeight: 1.8,
              fontWeight: 600,
            }}
          >
            {packageData.subtitle}
          </p>
        </section>

        {/* الوصف */}
        <section
          style={{
            maxWidth: '850px',
            margin: '0 auto 45px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '17px',
              lineHeight: 2,
              opacity: 0.85,
            }}
          >
            {packageData.description}
          </p>
        </section>

        {/* المميزات */}
        <section
          style={{
            marginBottom: '45px',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: '28px',
              fontWeight: 800,
              marginBottom: '25px',
            }}
          >
            ماذا تشمل الباقة؟
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '15px',
            }}
          >
            {packageData.features.map(
              (feature, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '20px',
                    borderRadius: '18px',
                    background:
                      'rgba(128,128,128,0.08)',
                  }}
                >
                  <CheckCircle2
                    size={22}
                    style={{
                      flexShrink: 0,
                      marginTop: '2px',
                    }}
                  />

                  <span
                    style={{
                      lineHeight: 1.7,
                      fontWeight: 600,
                    }}
                  >
                    {feature}
                  </span>
                </div>
              )
            )}
          </div>
        </section>

        {/* التفاصيل */}
        <section
          style={{
            maxWidth: '900px',
            margin: '0 auto 45px',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: '28px',
              fontWeight: 800,
              marginBottom: '25px',
            }}
          >
            تفاصيل الباقة
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {packageData.detailsSections.map(
              (section, index) => {
                const isOpen =
                  openSection === index

                return (
                  <div
                    key={index}
                    style={{
                      borderRadius: '18px',
                      overflow: 'hidden',
                      background:
                        'rgba(128,128,128,0.08)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenSection(
                          isOpen ? null : index
                        )
                      }
                      style={{
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          'space-between',
                        gap: '15px',
                        textAlign: 'right',
                        font: 'inherit',
                        fontWeight: 800,
                      }}
                    >
                      <span>
                        {section.title}
                      </span>

                      <ChevronDown
                        size={21}
                        style={{
                          flexShrink: 0,
                          transform: isOpen
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                          transition:
                            'transform 0.25s ease',
                        }}
                      />
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding:
                            '0 20px 22px',
                          lineHeight: 2,
                          opacity: 0.82,
                        }}
                      >
                        {section.content}
                      </div>
                    )}
                  </div>
                )
              }
            )}
          </div>
        </section>

        {/* زر الواتساب */}
        <section
          style={{
            textAlign: 'center',
            marginTop: '50px',
          }}
        >
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 800,
              marginBottom: '15px',
            }}
          >
            هل ترغب في الاشتراك؟
          </h2>

          <p
            style={{
              marginBottom: '25px',
              opacity: 0.75,
            }}
          >
            تواصل معنا عبر الواتساب للاستفسار والتسجيل.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '15px 28px',
              borderRadius: '14px',
              textDecoration: 'none',
              fontWeight: 800,
            }}
          >
            <MessageCircle size={21} />
            اطلب الخدمة الآن عبر الواتساب
            <ArrowLeft size={19} />
          </a>
        </section>
      </div>
    </main>
  )
}