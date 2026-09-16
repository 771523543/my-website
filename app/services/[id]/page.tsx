'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  FileText,
  MessageCircle,
  ClipboardList,
  GraduationCap,
} from 'lucide-react'

import { services } from '../../components/Services'

const whatsapp = 'https://wa.me/967776280186'

export default function ServiceDetails({
  params,
}: {
  params: { id: string }
}) {
  const service = services.find((item) => item.id === params.id)

  const [openSection, setOpenSection] = useState<string | null>(null)

  if (!service) {
    return (
      <main dir="rtl" className="min-h-screen bg-background text-foreground">
        <div
          className="container"
          style={{
            padding: '5rem 1rem',
            textAlign: 'center',
          }}
        >
          <h1>الخدمة غير موجودة</h1>
          <p>عذرًا، لم نتمكن من العثور على الخدمة المطلوبة.</p>

          <Link
            href="/#services"
            className="primary-button"
            style={{ display: 'inline-flex', marginTop: '1rem' }}
          >
            <ArrowRight size={18} />
            العودة للخدمات
          </Link>
        </div>
      </main>
    )
  }

  const Icon = service.icon

  const toggleSection = (section: string) => {
    setOpenSection((current) => (current === section ? null : section))
  }

  return (
    <main dir="rtl" className="min-h-screen bg-background text-foreground">
      <div className="container" style={{ padding: '2rem 1rem 5rem' }}>
        <Link
          href="/#services"
          className="text-button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
          }}
        >
          <ArrowRight size={18} />
          العودة إلى الخدمات
        </Link>

        <div
          style={{
            maxWidth: 850,
            margin: '0 auto',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 24,
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 1rem',
                background: 'rgba(37, 99, 235, 0.09)',
              }}
            >
              <Icon size={40} />
            </div>

            <h1 style={{ marginBottom: '0.5rem' }}>{service.title}</h1>

            <p style={{ opacity: 0.65, fontWeight: 700 }}>
              {service.subtitle}
            </p>
          </div>

          <div style={{ display: 'grid', gap: '0.9rem' }}>
            <Accordion
              icon={<BookOpen size={21} />}
              title="نبذة عن الخدمة"
              isOpen={openSection === 'about'}
              onClick={() => toggleSection('about')}
            >
              <p>{service.about}</p>
            </Accordion>

            <Accordion
              icon={<ClipboardList size={21} />}
              title="ماذا نقدم؟"
              isOpen={openSection === 'offer'}
              onClick={() => toggleSection('offer')}
            >
              <ul>
                {service.whatWeOffer.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Accordion>

            <Accordion
              icon={<FileText size={21} />}
              title="متطلبات الخدمة"
              isOpen={openSection === 'requirements'}
              onClick={() => toggleSection('requirements')}
            >
              <ul>
                {service.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </Accordion>

            <Accordion
              icon={<GraduationCap size={21} />}
              title="الأسئلة الشائعة"
              isOpen={openSection === 'faq'}
              onClick={() => toggleSection('faq')}
            >
              <div style={{ display: 'grid', gap: '1rem' }}>
                {service.faqs.map((faq, index) => (
                  <div key={index}>
                    <strong>س: {faq.q}</strong>
                    <p style={{ marginTop: '0.35rem' }}>ج: {faq.a}</p>
                  </div>
                ))}
              </div>
            </Accordion>

            <Accordion
              icon={<MessageCircle size={21} />}
              title="طلب الخدمة"
              isOpen={openSection === 'order'}
              onClick={() => toggleSection('order')}
            >
              <p>{service.orderText}</p>

              <a
                href={`${whatsapp}?text=${encodeURIComponent(
                  `مرحباً منصة هديل، أرغب بطلب خدمة: ${service.title}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="primary-button"
                style={{
                  display: 'inline-flex',
                  marginTop: '1rem',
                }}
              >
                <MessageCircle size={18} />
                طلب الخدمة عبر واتساب
              </a>
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  )
}

function Accordion({
  icon,
  title,
  isOpen,
  onClick,
  children,
}: {
  icon: React.ReactNode
  title: string
  isOpen: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        border: '1px solid var(--border, #e5e7eb)',
        borderRadius: 18,
        overflow: 'hidden',
        background: 'var(--background, #fff)',
        boxShadow: '0 5px 20px rgba(0,0,0,0.04)',
      }}
    >
      <button
        type="button"
        onClick={onClick}
        style={{
          width: '100%',
          border: 0,
          background: 'transparent',
          padding: '1.15rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
          cursor: 'pointer',
          color: 'inherit',
          fontFamily: 'inherit',
          fontWeight: 800,
          fontSize: '1rem',
          textAlign: 'right',
        }}
      >
        <span
          style={{
            width: 42,
            height: 42,
            minWidth: 42,
            borderRadius: 12,
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(37, 99, 235, 0.09)',
          }}
        >
          {icon}
        </span>

        <span style={{ flex: 1 }}>{title}</span>

        <ChevronDown
          size={21}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s ease',
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            padding: '0 1.25rem 1.3rem',
            lineHeight: 1.9,
            borderTop: '1px solid var(--border, #e5e7eb)',
          }}
        >
          <div style={{ paddingTop: '1rem' }}>{children}</div>
        </div>
      )}
    </div>
  )
}