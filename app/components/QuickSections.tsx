'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  GraduationCap,
  Gem,
  Trophy,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'

const quickSections = [
  {
    id: 'services',
    title: 'خدماتنا',
    description: 'اكتشف خدماتنا الطلابية والأكاديمية',
    href: '/services',
    icon: GraduationCap,
    gradient:
      'linear-gradient(135deg, #6246ea, #8b5cf6)',
  },
  {
    id: 'packages',
    title: 'باقاتنا',
    description: 'اختر الباقة المناسبة لرحلتك التعليمية',
    href: '/#packages',
    icon: Gem,
    gradient:
      'linear-gradient(135deg, #0891b2, #06b6d4)',
  },
  {
    id: 'previous-works',
    title: 'أعمالنا السابقة',
    description: 'تعرّف على أعمالنا ومشاريعنا السابقة',
    href: '/previous-works',
    icon: Trophy,
    gradient:
      'linear-gradient(135deg, #d97706, #f59e0b)',
  },
]

export default function QuickSections() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  const startX = useRef(0)
  const startScrollLeft = useRef(0)

  const speed = 0.3

  const cards = [
    ...quickSections,
    ...quickSections,
    ...quickSections,
  ]

  useEffect(() => {
    const slider = sliderRef.current

    if (!slider) return

    const animate = () => {
      if (!isDragging && !isInteracting) {
        slider.scrollLeft += speed

        const resetPoint =
          slider.scrollWidth / 3

        if (slider.scrollLeft >= resetPoint) {
          slider.scrollLeft = 0
        }
      }

      animationRef.current =
        requestAnimationFrame(animate)
    }

    animationRef.current =
      requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDragging, isInteracting])

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    const slider = sliderRef.current

    if (!slider) return

    setIsDragging(true)
    setIsInteracting(true)

    startX.current = e.clientX
    startScrollLeft.current = slider.scrollLeft

    slider.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return

    const slider = sliderRef.current

    if (!slider) return

    const distance =
      e.clientX - startX.current

    slider.scrollLeft =
      startScrollLeft.current - distance
  }

  const handlePointerUp = () => {
    setIsDragging(false)

    setTimeout(() => {
      setIsInteracting(false)
    }, 700)
  }

  return (
    <section
      dir="rtl"
      style={{
        position: 'relative',
        width: '100%',
        padding: '35px 0 55px',
        overflow: 'hidden',
      }}
    >
      {/* إضاءة خلفية */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '-100px',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(105,76,255,0.15), transparent 70%)',
          filter: 'blur(25px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-100px',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,190,220,0.12), transparent 70%)',
          filter: 'blur(25px)',
          pointerEvents: 'none',
        }}
      />

      {/* العنوان */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 20px',
          marginBottom: '25px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '7px 14px',
            borderRadius: '999px',
            marginBottom: '10px',
            background:
              'rgba(105,76,255,0.08)',
            border:
              '1px solid rgba(105,76,255,0.18)',
            fontSize: '12px',
            fontWeight: 800,
          }}
        >
          <Sparkles size={14} />

          استكشف منصة هديل
        </div>

        <h2
          style={{
            margin: 0,
            fontSize:
              'clamp(24px, 4vw, 34px)',
            fontWeight: 900,
          }}
        >
          كل ما تحتاجه في مكان واحد
        </h2>

        <p
          style={{
            margin: '8px auto 0',
            maxWidth: '600px',
            fontSize: '14px',
            lineHeight: 1.8,
            opacity: 0.65,
          }}
        >
          خدمات أكاديمية، باقات مميزة، وأعمال
          نفتخر بها.
        </p>
      </div>

      {/* البطاقات */}
      <div
        ref={sliderRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={() =>
          setIsInteracting(true)
        }
        onPointerLeave={() => {
          if (!isDragging) {
            setIsInteracting(false)
          }
        }}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          overflowY: 'visible',
          padding:
            '12px 20px 25px',
          scrollbarWidth: 'none',
          cursor: isDragging
            ? 'grabbing'
            : 'grab',
          touchAction: 'pan-y',
          userSelect: 'none',
        }}
      >
        {cards.map((item, index) => {
          const Icon = item.icon
          const key =
            `${item.id}-${index}`

          const isHovered =
            hovered === key

          return (
            <Link
              key={key}
              href={item.href}
              draggable={false}
              onMouseEnter={() =>
                setHovered(key)
              }
              onMouseLeave={() =>
                setHovered(null)
              }
              style={{
                position: 'relative',
                flex:
                  '0 0 clamp(245px, 29vw, 330px)',
                minHeight:
                  '175px',
                borderRadius: '25px',
                overflow: 'hidden',
                textDecoration: 'none',
                color: '#fff',
                background:
                  item.gradient,
                transform: isHovered
                  ? 'translateY(-7px) scale(1.02)'
                  : 'translateY(0) scale(1)',
                transition:
                  'transform 0.3s ease, box-shadow 0.3s ease',
                boxShadow: isHovered
                  ? '0 22px 50px rgba(50,40,120,0.25)'
                  : '0 12px 32px rgba(0,0,0,0.12)',
                border:
                  '1px solid rgba(255,255,255,0.25)',
              }}
            >
              {/* زخرفة */}
              <div
                style={{
                  position: 'absolute',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  top: '-70px',
                  left: '-40px',
                  background:
                    'rgba(255,255,255,0.12)',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  bottom: '-55px',
                  right: '-30px',
                  background:
                    'rgba(255,255,255,0.10)',
                }}
              />

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  height: '100%',
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '17px',
                }}
              >
                {/* الأيقونة */}
                <div
                  style={{
                    flexShrink: 0,
                    width: '65px',
                    height: '65px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background:
                      'rgba(255,255,255,0.17)',
                    border:
                      '1px solid rgba(255,255,255,0.30)',
                    backdropFilter:
                      'blur(12px)',
                    boxShadow:
                      '0 10px 25px rgba(0,0,0,0.12)',
                    transform: isHovered
                      ? 'rotate(-6deg) scale(1.08)'
                      : 'rotate(0) scale(1)',
                    transition:
                      'transform 0.3s ease',
                  }}
                >
                  <Icon size={32} />
                </div>

                {/* النص */}
                <div
                  style={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '7px',
                      marginBottom: '5px',
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '21px',
                        fontWeight: 900,
                        color: '#fff',
                      }}
                    >
                      {item.title}
                    </h3>

                    <Sparkles
                      size={15}
                      style={{
                        opacity: 0.8,
                      }}
                    />
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: '12px',
                      lineHeight: 1.7,
                      opacity: 0.88,
                    }}
                  >
                    {item.description}
                  </p>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      marginTop: '10px',
                      fontSize: '12px',
                      fontWeight: 800,
                    }}
                  >
                    اكتشف الآن
                    <ArrowLeft size={14} />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* مؤشر */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '7px',
          marginTop: '2px',
          opacity: 0.5,
        }}
      >
        <span
          style={{
            width: '25px',
            height: '3px',
            borderRadius: '999px',
            background:
              'linear-gradient(90deg, #694cff, #08aeea)',
          }}
        />

        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
          }}
        >
          اسحب لاستكشاف الأقسام
        </span>

        <span
          style={{
            width: '25px',
            height: '3px',
            borderRadius: '999px',
            background:
              'linear-gradient(90deg, #08aeea, #694cff)',
          }}
        />
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}