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
  GraduationCap,
  ShieldCheck,
  Zap,
  Star,
  BookOpen,
  ClipboardCheck,
} from 'lucide-react'

import { packagesData } from '../../components/packagesData'

export default function PackageDetailsPage() {
  const params = useParams()
  const id = params?.id as string

  const packageData = packagesData.find(
    (item) => item.id === id
  )

  const [openSection, setOpenSection] =
    useState<number | null>(0)

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
        <div
          style={{
            maxWidth: '500px',
            padding: '45px 30px',
            borderRadius: '28px',
            background:
              'linear-gradient(145deg, rgba(120,90,255,0.12), rgba(0,190,255,0.06))',
            border:
              '1px solid rgba(120,90,255,0.2)',
            boxShadow:
              '0 25px 70px rgba(60,40,130,0.15)',
          }}
        >
          <Sparkles
            size={45}
            style={{ marginBottom: '15px' }}
          />

          <h1
            style={{
              fontSize: '30px',
              fontWeight: 900,
              marginBottom: '12px',
            }}
          >
            الباقة غير موجودة
          </h1>

          <p
            style={{
              lineHeight: 1.9,
              opacity: 0.7,
              marginBottom: '25px',
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
              fontWeight: 800,
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
        padding: '35px 18px 90px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1150px',
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
            marginBottom: '35px',
            fontWeight: 800,
            opacity: 0.8,
          }}
        >
          <ArrowRight size={20} />
          العودة إلى الباقات
        </Link>

        {/* Hero التفاصيل */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '32px',
            padding:
              'clamp(30px, 6vw, 65px) 25px',
            textAlign: 'center',
            background:
              'linear-gradient(145deg, rgba(105,75,255,0.14), rgba(0,190,255,0.07))',
            border:
              '1px solid rgba(120,100,255,0.22)',
            boxShadow:
              '0 30px 90px rgba(65,45,140,0.13)',
            marginBottom: '45px',
          }}
        >
          {/* دوائر زخرفية */}
          <div
            style={{
              position: 'absolute',
              width: '230px',
              height: '230px',
              borderRadius: '50%',
              top: '-100px',
              right: '-70px',
              background:
                'radial-gradient(circle, rgba(110,75,255,0.25), transparent 70%)',
              filter: 'blur(8px)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              width: '230px',
              height: '230px',
              borderRadius: '50%',
              bottom: '-120px',
              left: '-70px',
              background:
                'radial-gradient(circle, rgba(0,190,255,0.22), transparent 70%)',
              filter: 'blur(8px)',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* الشارة */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 17px',
                borderRadius: '999px',
                marginBottom: '18px',
                color: '#fff',
                background:
                  'linear-gradient(90deg, #694cff, #08aeea)',
                boxShadow:
                  '0 10px 30px rgba(90,70,220,0.25)',
                fontSize: '13px',
                fontWeight: 900,
              }}
            >
              <Sparkles size={16} />
              {packageData.badge}
            </div>

            <p
              style={{
                margin: '0 0 10px',
                fontSize: '14px',
                fontWeight: 800,
                opacity: 0.65,
              }}
            >
              {packageData.platform}
            </p>

            <h1
              style={{
                margin: 0,
                fontSize:
                  'clamp(32px, 7vw, 58px)',
                fontWeight: 950,
                lineHeight: 1.25,
                background:
                  'linear-gradient(90deg, #6748ff, #079fd7, #6748ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor:
                  'transparent',
                backgroundSize: '200% auto',
              }}
            >
              {packageData.title}
            </h1>

            <p
              style={{
                maxWidth: '800px',
                margin: '18px auto 0',
                fontSize:
                  'clamp(17px, 2.7vw, 22px)',
                lineHeight: 1.9,
                fontWeight: 700,
              }}
            >
              {packageData.subtitle}
            </p>
          </div>
        </section>

        {/* مقدمة */}
        <section
          style={{
            textAlign: 'center',
            maxWidth: '850px',
            margin: '0 auto 55px',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '58px',
              height: '58px',
              borderRadius: '18px',
              marginBottom: '16px',
              background:
                'linear-gradient(135deg, #694cff, #08aeea)',
              color: '#fff',
              boxShadow:
                '0 12px 30px rgba(90,70,220,0.2)',
            }}
          >
            <GraduationCap size={30} />
          </div>

          <h2
            style={{
              margin: '0 0 15px',
              fontSize:
                'clamp(25px, 4vw, 34px)',
              fontWeight: 900,
            }}
          >
            لماذا هذه الباقة؟
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: '17px',
              lineHeight: 2,
              opacity: 0.78,
            }}
          >
            {packageData.description}
          </p>
        </section>

        {/* شريط المزايا */}
        <section
          style={{
            marginBottom: '60px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '28px',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                fontSize: '14px',
                fontWeight: 900,
                color: '#6748ff',
              }}
            >
              <Zap size={17} />
              مميزات الباقة
            </span>

            <h2
              style={{
                margin: '8px 0 0',
                fontSize:
                  'clamp(27px, 4vw, 38px)',
                fontWeight: 900,
              }}
            >
              كل ما تحتاجه في مكان واحد
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '18px',
            }}
          >
            {packageData.features.map(
              (feature, index) => {
                const icons = [
                  <ClipboardCheck
                    key="1"
                    size={26}
                  />,
                  <BookOpen
                    key="2"
                    size={26}
                  />,
                  <ShieldCheck
                    key="3"
                    size={26}
                  />,
                  <Zap
                    key="4"
                    size={26}
                  />,
                ]

                return (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      padding: '25px 20px',
                      borderRadius: '24px',
                      background:
                        'linear-gradient(145deg, rgba(110,80,255,0.10), rgba(0,180,230,0.05))',
                      border:
                        '1px solid rgba(110,90,230,0.18)',
                      boxShadow:
                        '0 15px 40px rgba(60,45,130,0.08)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          'center',
                        width: '58px',
                        height: '58px',
                        borderRadius: '18px',
                        marginBottom: '18px',
                        color: '#fff',
                        background:
                          'linear-gradient(135deg, #694cff, #08aeea)',
                        boxShadow:
                          '0 10px 25px rgba(90,70,220,0.22)',
                      }}
                    >
                      {icons[index % icons.length]}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'flex-start',
                      }}
                    >
                      <CheckCircle2
                        size={18}
                        style={{
                          flexShrink: 0,
                          marginTop: '4px',
                        }}
                      />

                      <span
                        style={{
                          fontWeight: 800,
                          lineHeight: 1.8,
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  </div>
                )
              }
            )}
          </div>
        </section>

        {/* التفاصيل */}
        <section
          style={{
            maxWidth: '950px',
            margin: '0 auto 60px',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '28px',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                fontSize: '14px',
                fontWeight: 900,
                color: '#08a1d5',
              }}
            >
              <BookOpen size={17} />
              تفاصيل الخدمات
            </span>

            <h2
              style={{
                margin: '8px 0 0',
                fontSize:
                  'clamp(27px, 4vw, 38px)',
                fontWeight: 900,
              }}
            >
              تعرف على ما تحصل عليه
            </h2>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '13px',
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
                      overflow: 'hidden',
                      borderRadius: '22px',
                      border:
                        isOpen
                          ? '1px solid rgba(105,75,255,0.35)'
                          : '1px solid rgba(120,120,120,0.13)',
                      background:
                        isOpen
                          ? 'linear-gradient(145deg, rgba(105,75,255,0.09), rgba(0,180,230,0.04))'
                          : 'rgba(128,128,128,0.045)',
                      boxShadow: isOpen
                        ? '0 15px 40px rgba(80,60,170,0.10)'
                        : 'none',
                      transition:
                        'all 0.3s ease',
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
                        padding: '21px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent:
                          'space-between',
                        gap: '15px',
                        textAlign: 'right',
                        font: 'inherit',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                        }}
                      >
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent:
                              'center',
                            width: '42px',
                            height: '42px',
                            borderRadius: '13px',
                            flexShrink: 0,
                            color: '#fff',
                            background:
                              'linear-gradient(135deg, #694cff, #08aeea)',
                          }}
                        >
                          {index + 1}
                        </span>

                        <span
                          style={{
                            fontSize: '16px',
                            fontWeight: 900,
                            lineHeight: 1.6,
                          }}
                        >
                          {section.title}
                        </span>
                      </div>

                      <ChevronDown
                        size={22}
                        style={{
                          flexShrink: 0,
                          transform: isOpen
                            ? 'rotate(180deg)'
                            : 'rotate(0)',
                          transition:
                            'transform 0.25s ease',
                        }}
                      />
                    </button>

                    {isOpen && (
                      <div
                        style={{
                          padding:
                            '0 21px 24px',
                          paddingRight:
                            '77px',
                          lineHeight: 2,
                          fontSize: '15px',
                          opacity: 0.78,
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

        {/* دعوة للتواصل */}
        <section
          style={{
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
            borderRadius: '32px',
            padding:
              '45px 20px 50px',
            background:
              'linear-gradient(135deg, #6245ee, #079ed4)',
            color: '#fff',
            boxShadow:
              '0 25px 70px rgba(80,60,190,0.25)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              top: '-100px',
              right: '-60px',
              background:
                'rgba(255,255,255,0.10)',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '65px',
                height: '65px',
                borderRadius: '20px',
                marginBottom: '15px',
                background:
                  'rgba(255,255,255,0.16)',
                border:
                  '1px solid rgba(255,255,255,0.25)',
              }}
            >
              <MessageCircle size={31} />
            </div>

            <h2
              style={{
                margin: '0 0 12px',
                fontSize:
                  'clamp(27px, 5vw, 40px)',
                fontWeight: 950,
              }}
            >
              جاهز تبدأ رحلتك؟
            </h2>

            <p
              style={{
                maxWidth: '650px',
                margin: '0 auto 25px',
                lineHeight: 1.9,
                opacity: 0.9,
              }}
            >
              تواصل معنا الآن واحصل على المساعدة
              المناسبة لك وابدأ الاستفادة من
              باقتك.
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
                padding:
                  '15px 25px',
                borderRadius: '15px',
                background: '#fff',
                color: '#159447',
                textDecoration: 'none',
                fontWeight: 900,
                boxShadow:
                  '0 12px 30px rgba(0,0,0,0.15)',
                transition:
                  'transform 0.25s ease',
              }}
            >
              <MessageCircle size={21} />
              اطلب الباقة عبر الواتساب
              <ArrowLeft size={19} />
            </a>
          </div>
        </section>

        {/* العودة */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '35px',
          }}
        >
          <Link
            href="/#packages"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              fontWeight: 800,
              opacity: 0.75,
            }}
          >
            <ArrowRight size={18} />
            استعرض جميع الباقات
          </Link>
        </div>
      </div>
    </main>
  )
}