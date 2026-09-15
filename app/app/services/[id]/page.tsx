'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import { services } from '../../components/Services'

const whatsapp = 'https://wa.me/967776280186'

export default function ServiceDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const service = services.find((item) => item.id === params.id)

  if (!service) {
    return (
      <main
        style={{
          minHeight: '70vh',
          display: 'grid',
          placeItems: 'center',
          padding: '3rem 1rem',
          textAlign: 'center',
        }}
      >
        <div>
          <h1>الخدمة غير موجودة</h1>

          <p style={{ margin: '1rem 0 2rem' }}>
            عذرًا، لم يتم العثور على الخدمة المطلوبة.
          </p>

          <Link href="/#services" className="text-button">
            <ArrowRight size={18} />
            العودة للخدمات
          </Link>
        </div>
      </main>
    )
  }

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم، أرغب بطلب خدمة: ${service.title}`
  )

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '7rem 1rem 4rem',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <Link
          href="/#services"
          className="text-button"
          style={{
            display: 'inline-flex',
            marginBottom: '2rem',
          }}
        >
          <ArrowRight size={18} />
          العودة للخدمات
        </Link>

        <article
          style={{
            background: '#fff',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 15px 50px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              position: 'relative',
              height: '360px',
            }}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1000px"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div
            style={{
              padding: '2.5rem',
            }}
          >
            <div
              style={{
                marginBottom: '1rem',
                fontSize: '0.9rem',
                opacity: 0.7,
              }}
            >
              خدمات هديل الطلابية
            </div>

            <h1
              style={{
                marginBottom: '1rem',
              }}
            >
              {service.title}
            </h1>

            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 2,
                marginBottom: '2rem',
              }}
            >
              {service.about}
            </p>

            <h2 style={{ marginBottom: '1.2rem' }}>
              ماذا نقدم لك؟
            </h2>

            <div
              style={{
                display: 'grid',
                gap: '1rem',
                marginBottom: '2.5rem',
              }}
            >
              {service.features.map((feature) => (
                <div
                  key={feature}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                  }}
                >
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      background: 'rgba(37, 99, 235, 0.1)',
                      flexShrink: 0,
                    }}
                  >
                    <Check size={17} />
                  </span>

                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <a
                href={`${whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="text-button"
                style={{
                  display: 'inline-flex',
                  padding: '0.9rem 1.4rem',
                }}
              >
                <MessageCircle size={19} />
                اطلب الخدمة عبر واتساب
              </a>

              <Link
                href="/#services"
                className="text-button"
                style={{
                  display: 'inline-flex',
                  padding: '0.9rem 1.4rem',
                }}
              >
                <ArrowRight size={19} />
                جميع الخدمات
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}