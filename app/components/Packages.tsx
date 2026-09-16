'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Star,
} from 'lucide-react'

import { packagesData } from './packagesData'

export default function Packages() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const startX = useRef(0)
  const startScrollLeft = useRef(0)

  const speed = 0.35

  const repeatedPackages = [
    ...packagesData,
    ...packagesData,
  ]

  useEffect(() => {
    const slider = sliderRef.current

    if (!slider) return

    const animate = () => {
      if (!isInteracting && !isDragging) {
        slider.scrollLeft += speed

        if (
          slider.scrollLeft >=
          slider.scrollWidth / 2
        ) {
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
  }, [isInteracting, isDragging])

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

  const stopDragging = () => {
    setIsDragging(false)

    setTimeout(() => {
      setIsInteracting(false)
    }, 700)
  }

  const moveSlider = (direction: number) => {
    const slider = sliderRef.current

    if (!slider) return

    setIsInteracting(true)

    slider.scrollBy({
      left: direction * 370,
      behavior: 'smooth',
    })

    setTimeout(() => {
      setIsInteracting(false)
    }, 1000)
  }

  return (
    <section
      id="packages"
      dir="rtl"
      style={{
        position: 'relative',
        width: '100%',
        padding: '90px 0 100px',
        overflow: 'hidden',
      }}
    >
      {/* خلفية زخرفية */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '-120px',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(120,90,255,0.18), transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-120px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(0,190,255,0.14), transparent 70%)',
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
          marginBottom: '38px',
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
            border:
              '1px solid rgba(130,100,255,0.3)',
            background:
              'linear-gradient(135deg, rgba(130,100,255,0.13), rgba(0,190,255,0.08))',
            boxShadow:
              '0 8px 30px rgba(80,70,180,0.10)',
            fontSize: '14px',
            fontWeight: 800,
          }}
        >
          <Sparkles size={17} />

          <span>
            باقات منصة هديل
          </span>

          <Star
            size={14}
            fill="currentColor"
          />
        </div>

        <h2
          style={{
            margin: 0,
            fontSize:
              'clamp(30px, 5vw, 48px)',
            fontWeight: 900,
            lineHeight: 1.25,
            background:
              'linear-gradient(90deg, #6c4cff, #08aeea, #6c4cff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:
              'transparent',
            backgroundSize: '200% auto',
            animation:
              'packagesGradient 5s linear infinite',
          }}
        >
          اختر باقتك وابدأ رحلة التميز
        </h2>

        <p
          style={{
            maxWidth: '700px',
            margin: '15px auto 0',
            fontSize:
              'clamp(15px, 2vw, 18px)',
            lineHeight: 1.9,
            opacity: 0.72,
          }}
        >
          حلول أكاديمية متكاملة صُممت لتمنحك
          تجربة أسهل، وتنظيماً أفضل، ودعماً
          مستمراً طوال رحلتك التعليمية.
        </p>
      </div>

      {/* أزرار التنقل */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}
      >
        <button
          type="button"
          onClick={() => moveSlider(1)}
          aria-label="الباقة التالية"
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            border:
              '1px solid rgba(120,100,255,0.25)',
            background:
              'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition:
              'all 0.25s ease',
          }}
        >
          <ChevronRight size={22} />
        </button>

        <button
          type="button"
          onClick={() => moveSlider(-1)}
          aria-label="الباقة السابقة"
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            border:
              '1px solid rgba(120,100,255,0.25)',
            background:
              'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition:
              'all 0.25s ease',
          }}
        >
          <ChevronLeft size={22} />
        </button>
      </div>

      {/* السلايدر */}
      <div
        ref={sliderRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
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
          gap: '22px',
          overflowX: 'auto',
          overflowY: 'visible',
          padding:
            '15px 25px 35px',
          scrollbarWidth: 'none',
          cursor: isDragging
            ? 'grabbing'
            : 'grab',
          touchAction: 'pan-y',
          userSelect: 'none',
        }}
      >
        {repeatedPackages.map(
          (pkg, index) => {
            const isHovered =
              hoveredCard ===
              `${pkg.id}-${index}`

            return (
              <Link
                key={`${pkg.id}-${index}`}
                href={`/packages/${pkg.id}`}
                draggable={false}
                onMouseEnter={() =>
                  setHoveredCard(
                    `${pkg.id}-${index}`
                  )
                }
                onMouseLeave={() =>
                  setHoveredCard(null)
                }
                style={{
                  position: 'relative',
                  flex:
                    '0 0 clamp(285px, 31vw, 370px)',
                  height:
                    'clamp(285px, 35vw, 365px)',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  display: 'block',
                  transform: isHovered
                    ? 'translateY(-10px) scale(1.015)'
                    : 'translateY(0) scale(1)',
                  transition:
                    'transform 0.35s ease, box-shadow 0.35s ease',
                  boxShadow: isHovered
                    ? '0 25px 60px rgba(70,55,160,0.28)'
                    : '0 15px 40px rgba(0,0,0,0.14)',
                  border:
                    '1px solid rgba(255,255,255,0.28)',
                  flexShrink: 0,
                }}
              >
                {/* الصورة */}
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  draggable={false}
                  sizes="
                    (max-width: 640px) 82vw,
                    (max-width: 1024px) 45vw,
                    370px
                  "
                  style={{
                    objectFit: 'cover',
                    transform: isHovered
                      ? 'scale(1.09)'
                      : 'scale(1)',
                    transition:
                      'transform 0.7s ease',
                  }}
                />

                {/* طبقة الصورة */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to bottom, rgba(20,10,50,0.05) 10%, rgba(10,5,30,0.15) 42%, rgba(8,5,25,0.92) 100%)',
                  }}
                />

                {/* لمعان علوي */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100px',
                    background:
                      'linear-gradient(to bottom, rgba(255,255,255,0.20), transparent)',
                    pointerEvents: 'none',
                  }}
                />

                {/* الشارة */}
                <div
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding:
                      '7px 12px',
                    borderRadius:
                      '999px',
                    background:
                      'rgba(255,255,255,0.16)',
                    border:
                      '1px solid rgba(255,255,255,0.3)',
                    backdropFilter:
                      'blur(12px)',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 800,
                  }}
                >
                  <Sparkles size={13} />
                  {pkg.badge}
                </div>

                {/* المحتوى السفلي */}
                <div
                  style={{
                    position: 'absolute',
                    right: '20px',
                    left: '20px',
                    bottom: '19px',
                    color: '#fff',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '8px',
                      fontSize: '12px',
                      opacity: 0.8,
                      fontWeight: 700,
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        background: '#fff',
                        boxShadow:
                          '0 0 12px rgba(255,255,255,0.8)',
                      }}
                    />

                    منصة هديل التعليمية
                  </div>

                  <h3
                    style={{
                      margin: 0,
                      fontSize:
                        'clamp(21px, 3vw, 29px)',
                      fontWeight: 900,
                      lineHeight: 1.35,
                      textShadow:
                        '0 3px 15px rgba(0,0,0,0.5)',
                    }}
                  >
                    {pkg.title}
                  </h3>

                  {/* زر صغير */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '7px',
                      marginTop: '13px',
                      padding:
                        '8px 14px',
                      borderRadius:
                        '999px',
                      background:
                        'rgba(255,255,255,0.15)',
                      border:
                        '1px solid rgba(255,255,255,0.25)',
                      backdropFilter:
                        'blur(10px)',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#fff',
                    }}
                  >
                    اكتشف الباقة
                    <ArrowLeft size={14} />
                  </div>
                </div>

                {/* الإطار المضيء عند Hover */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '28px',
                    border:
                      isHovered
                        ? '1px solid rgba(255,255,255,0.65)'
                        : '1px solid rgba(255,255,255,0.12)',
                    pointerEvents: 'none',
                    transition:
                      'border 0.3s ease',
                  }}
                />
              </Link>
            )
          }
        )}
      </div>

      {/* مؤشر أسفل البطاقات */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginTop: '5px',
          opacity: 0.6,
        }}
      >
        <span
          style={{
            width: '35px',
            height: '4px',
            borderRadius: '999px',
            background:
              'linear-gradient(90deg, #6c4cff, #08aeea)',
          }}
        />

        <span
          style={{
            fontSize: '12px',
            fontWeight: 700,
          }}
        >
          اسحب لاستعراض الباقات
        </span>

        <span
          style={{
            width: '35px',
            height: '4px',
            borderRadius: '999px',
            background:
              'linear-gradient(90deg, #08aeea, #6c4cff)',
          }}
        />
      </div>

      {/* Animation داخلي بدون globals.css */}
      <style jsx>{`
        @keyframes packagesGradient {
          0% {
            background-position: 0% center;
          }

          100% {
            background-position: 200% center;
          }
        }

        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}