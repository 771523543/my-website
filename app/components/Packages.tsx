'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { packagesData } from './packagesData'

export default function Packages() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)

  const startX = useRef(0)
  const startScrollLeft = useRef(0)

  const speed = 0.35

  const repeatedPackages = [...packagesData, ...packagesData]

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

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

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

    const distance = e.clientX - startX.current

    slider.scrollLeft =
      startScrollLeft.current - distance
  }

  const handlePointerUp = () => {
    setIsDragging(false)

    setTimeout(() => {
      setIsInteracting(false)
    }, 700)
  }

  const handlePointerCancel = () => {
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
      left: direction * 360,
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
        width: '100%',
        padding: '70px 0',
        overflow: 'hidden',
      }}
    >
      {/* العنوان */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: '35px',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          <Sparkles size={18} />

          <span>
            باقات منصة هديل
          </span>
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 800,
          }}
        >
          اختر الباقة المناسبة لك
        </h2>

        <p
          style={{
            margin: '12px auto 0',
            maxWidth: '650px',
            fontSize: '16px',
            lineHeight: 1.8,
            opacity: 0.8,
          }}
        >
          باقات مصممة لتساعدك في رحلتك الأكاديمية
          وتوفر لك الدعم الذي تحتاجه.
        </p>
      </div>

      {/* أزرار التحكم */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => moveSlider(1)}
          aria-label="الباقة التالية"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronRight size={22} />
        </button>

        <button
          type="button"
          onClick={() => moveSlider(-1)}
          aria-label="الباقة السابقة"
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronLeft size={22} />
        </button>
      </div>

      {/* البطاقات */}
      <div
        ref={sliderRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerEnter={() => setIsInteracting(true)}
        onPointerLeave={() => {
          if (!isDragging) {
            setIsInteracting(false)
          }
        }}
        style={{
          display: 'flex',
          gap: '20px',
          overflowX: 'auto',
          overflowY: 'hidden',
          padding: '10px 20px 25px',
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          scrollbarWidth: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y',
          userSelect: 'none',
        }}
      >
        {repeatedPackages.map((pkg, index) => (
          <Link
            key={`${pkg.id}-${index}`}
            href={`/packages/${pkg.id}`}
            draggable={false}
            style={{
              flex:
                '0 0 clamp(275px, 31vw, 365px)',
              height:
                'clamp(250px, 34vw, 350px)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '24px',
              textDecoration: 'none',
              display: 'block',
              background: '#eee',
            }}
          >
            {/* الصورة */}
            <Image
              src={pkg.image}
              alt={pkg.title}
              fill
              draggable={false}
              sizes="
                (max-width: 640px) 85vw,
                (max-width: 1024px) 45vw,
                365px
              "
              style={{
                objectFit: 'cover',
              }}
            />

            {/* التدرج */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.05) 65%)',
              }}
            />

            {/* اسم الباقة فقط */}
            <div
              style={{
                position: 'absolute',
                right: '20px',
                left: '20px',
                bottom: '20px',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  color: '#fff',
                  fontSize:
                    'clamp(20px, 3vw, 27px)',
                  fontWeight: 800,
                  lineHeight: 1.4,
                  textShadow:
                    '0 2px 8px rgba(0,0,0,0.45)',
                }}
              >
                {pkg.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}