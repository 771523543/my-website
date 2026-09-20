'use client'

import {
  Gem,
  GraduationCap,
  Trophy,
  Sparkles,
  ArrowLeft,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const cards = [
  {
    title: 'خدماتنا',
    description: 'اكتشف خدماتنا الطلابية والأكاديمية',
    href: '/services',
    icon: GraduationCap,
    accent: 'الخدمات',
  },
  {
    title: 'باقاتنا',
    description: 'اختر الباقة المناسبة لرحلتك التعليمية',
    href: '#packages',
    icon: Gem,
    accent: 'الباقات',
  },
  {
    title: 'أعمالنا السابقة',
    description: 'تعرّف على أعمالنا ومشاريعنا السابقة',
    href: '/previous-works',
    icon: Trophy,
    accent: 'أعمالنا',
  },
]

export default function QuickSections() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const [isDragging, setIsDragging] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)

  const dragState = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  })

  const speed = 0.85

  useEffect(() => {
    const slider = sliderRef.current

    if (!slider) return

    let lastTime = performance.now()

    const animate = (time: number) => {
      const delta = Math.min(time - lastTime, 32)
      lastTime = time

      if (!isDragging && !isInteracting) {
        slider.scrollLeft += speed * (delta / 16)

        const resetPoint = slider.scrollWidth / 3

        if (slider.scrollLeft >= resetPoint) {
          slider.scrollLeft -= resetPoint
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
  }, [isDragging, isInteracting])

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const slider = sliderRef.current

    if (!slider) return

    dragState.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft: slider.scrollLeft,
    }

    setIsDragging(true)
    setIsInteracting(true)

    slider.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const slider = sliderRef.current

    if (!slider || !dragState.current.active) return

    const distance = event.clientX - dragState.current.startX

    slider.scrollLeft =
      dragState.current.startScrollLeft - distance
  }

  const stopDragging = () => {
    dragState.current.active = false
    setIsDragging(false)

    window.setTimeout(() => {
      setIsInteracting(false)
    }, 450)
  }

  return (
    <section
      className="quick-sections"
      aria-label="استكشف منصة هديل"
    >
      {/* Animated background */}
      <div className="quick-background" aria-hidden="true">
        <div className="quick-glow quick-glow-one" />
        <div className="quick-glow quick-glow-two" />
        <div className="quick-glow quick-glow-three" />

        <div className="quick-light quick-light-one" />
        <div className="quick-light quick-light-two" />

        <div className="quick-particles">
          {Array.from({ length: 18 }).map((_, index) => (
            <span
              key={index}
              className="quick-particle"
              style={{
                left: `${(index * 17) % 100}%`,
                top: `${(index * 29) % 100}%`,
                animationDelay: `${index * 0.35}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Cards */}
      <div
        ref={sliderRef}
        className={`quick-slider ${
          isDragging ? 'is-dragging' : ''
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={() => {
          if (dragState.current.active) {
            stopDragging()
          }
        }}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => {
          if (!dragState.current.active) {
            setIsInteracting(false)
          }
        }}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => {
          window.setTimeout(() => {
            setIsInteracting(false)
          }, 450)
        }}
      >
        {[...cards, ...cards, ...cards].map(
          (
            {
              title,
              description,
              href,
              icon: Icon,
              accent,
            },
            index,
          ) => (
            <Link
              href={href}
              className="quick-card"
              key={`${title}-${index}`}
              draggable={false}
              onClick={(event) => {
                if (Math.abs(
                  sliderRef.current
                    ? sliderRef.current.scrollLeft -
                        dragState.current.startScrollLeft
                    : 0,
                ) > 8) {
                  event.preventDefault()
                }
              }}
            >
              {/* Card glow */}
              <div className="card-glow" aria-hidden="true" />

              {/* Card shine */}
              <div className="card-shine" aria-hidden="true" />

              {/* Card border */}
              <div className="card-border" aria-hidden="true" />

              {/* Icon */}
              <div className="quick-icon-wrap">
                <div className="quick-icon-ring" />

                <div className="quick-icon">
                  <Icon size={34} strokeWidth={1.8} />
                </div>

                <Sparkles
                  className="quick-icon-sparkle"
                  size={14}
                />
              </div>

              {/* Text */}
              <div className="quick-card-content">
                <span className="quick-card-label">
                  {accent}
                </span>

                <h3>{title}</h3>

                <p>{description}</p>
              </div>

              {/* Arrow */}
              <div className="quick-arrow" aria-hidden="true">
                <ArrowLeft size={17} />
              </div>

              {/* Bottom decoration */}
              <div className="quick-card-line" aria-hidden="true" />
            </Link>
          ),
        )}
      </div>

      <style jsx>{`
        .quick-sections {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 48px 0 58px;
          background:
            radial-gradient(
              circle at 15% 50%,
              rgba(37, 99, 235, 0.22),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 30%,
              rgba(212, 175, 55, 0.12),
              transparent 28%
            ),
            linear-gradient(
              135deg,
              #020617 0%,
              #06133a 45%,
              #071d52 100%
            );
        }

        .quick-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .quick-glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(55px);
          opacity: 0.65;
          animation: glowMove 7s ease-in-out infinite;
        }

        .quick-glow-one {
          width: 260px;
          height: 260px;
          top: -90px;
          left: 8%;
          background: rgba(37, 99, 235, 0.25);
        }

        .quick-glow-two {
          width: 300px;
          height: 300px;
          right: 8%;
          bottom: -140px;
          background: rgba(212, 175, 55, 0.13);
          animation-delay: -2s;
        }

        .quick-glow-three {
          width: 190px;
          height: 190px;
          left: 47%;
          top: 45%;
          background: rgba(59, 130, 246, 0.16);
          animation-delay: -4s;
        }

        .quick-light {
          position: absolute;
          width: 2px;
          height: 180px;
          opacity: 0.35;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(212, 175, 55, 0.75),
            transparent
          );
          transform: rotate(24deg);
          animation: lightMove 8s linear infinite;
        }

        .quick-light-one {
          left: 20%;
          top: -70px;
        }

        .quick-light-two {
          right: 24%;
          top: -80px;
          animation-delay: -4s;
        }

        .quick-particles {
          position: absolute;
          inset: 0;
        }

        .quick-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 0 12px rgba(147, 197, 253, 0.8);
          animation: particleFloat 5s ease-in-out infinite;
        }

        .quick-slider {
          position: relative;
          z-index: 5;

          display: flex;
          gap: 24px;

          width: 100%;
          max-width: 1180px;
          margin: 0 auto;

          padding: 24px 28px 32px;

          overflow-x: auto;
          overflow-y: visible;

          scrollbar-width: none;

          cursor: grab;
          touch-action: pan-y;

          scroll-behavior: auto;
        }

        .quick-slider::-webkit-scrollbar {
          display: none;
        }

        .quick-slider.is-dragging {
          cursor: grabbing;
        }

        .quick-card {
          position: relative;
          flex: 0 0 330px;

          min-height: 245px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          padding: 30px 25px 27px;

          overflow: hidden;

          text-align: center;
          text-decoration: none;

          border-radius: 28px;

          /*
           * The card itself is deliberately much more opaque
           * than the background so the content stays readable.
           */
          background:
            linear-gradient(
              145deg,
              rgba(10, 31, 78, 0.96),
              rgba(4, 18, 50, 0.94)
            );

          border: 1px solid rgba(147, 197, 253, 0.42);

          box-shadow:
            0 18px 45px rgba(0, 0, 0, 0.38),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 0 35px rgba(37, 99, 235, 0.08);

          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);

          transform: translateY(0) scale(1);

          animation:
            quickCardFloat 5s ease-in-out infinite,
            quickCardPulse 5s ease-in-out infinite;

          transition:
            transform 0.4s ease,
            box-shadow 0.4s ease,
            border-color 0.4s ease;
        }

        .quick-card:nth-child(2) {
          animation-delay: -1.1s;
        }

        .quick-card:nth-child(3) {
          animation-delay: -2.2s;
        }

        .quick-card:nth-child(4) {
          animation-delay: -3.3s;
        }

        .quick-card:nth-child(5) {
          animation-delay: -4.4s;
        }

        .quick-card:nth-child(6) {
          animation-delay: -0.7s;
        }

        .quick-card:nth-child(7) {
          animation-delay: -1.8s;
        }

        .quick-card:nth-child(8) {
          animation-delay: -2.9s;
        }

        .quick-card:nth-child(9) {
          animation-delay: -4s;
        }

        .quick-card:hover {
          transform: translateY(-9px) scale(1.025);

          border-color: rgba(212, 175, 55, 0.8);

          box-shadow:
            0 25px 65px rgba(0, 0, 0, 0.5),
            0 0 32px rgba(37, 99, 235, 0.2),
            0 0 18px rgba(212, 175, 55, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.14);
        }

        /*
         * Keep the glow behind the content.
         */
        .card-glow {
          position: absolute;
          width: 180px;
          height: 180px;

          top: -100px;
          left: 50%;

          transform: translateX(-50%);

          border-radius: 50%;

          background: rgba(37, 99, 235, 0.18);

          filter: blur(40px);

          opacity: 0.75;

          animation: cardGlow 5s ease-in-out infinite;

          pointer-events: none;
        }

        .card-shine {
          position: absolute;
          top: -30%;
          left: -80%;

          width: 55%;
          height: 170%;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.12),
            transparent
          );

          transform: rotate(20deg);

          animation: shineMove 5.5s linear infinite;

          pointer-events: none;
        }

        .card-border {
          position: absolute;
          inset: 0;

          border-radius: inherit;

          border: 1px solid transparent;

          background:
            linear-gradient(
                145deg,
                rgba(147, 197, 253, 0.18),
                transparent 38%,
                rgba(212, 175, 55, 0.25)
              )
              border-box;

          -webkit-mask:
            linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);

          -webkit-mask-composite: xor;
          mask-composite: exclude;

          pointer-events: none;
        }

        .quick-icon-wrap {
          position: relative;
          z-index: 4;

          width: 76px;
          height: 76px;

          display: grid;
          place-items: center;

          margin-bottom: 17px;

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              rgba(37, 99, 235, 0.22),
              rgba(5, 18, 48, 0.85)
            );

          border: 1px solid rgba(212, 175, 55, 0.5);

          box-shadow:
            0 10px 25px rgba(0, 0, 0, 0.3),
            0 0 22px rgba(37, 99, 235, 0.18),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);

          animation: iconFloat 3.8s ease-in-out infinite;
        }

        .quick-icon-ring {
          position: absolute;
          inset: -7px;

          border-radius: 27px;

          border: 1px solid rgba(147, 197, 253, 0.18);

          animation: ringPulse 3s ease-in-out infinite;
        }

        .quick-icon {
          position: relative;
          z-index: 2;

          display: grid;
          place-items: center;

          color: #ffffff;

          filter:
            drop-shadow(0 0 7px rgba(147, 197, 253, 0.45))
            drop-shadow(0 0 12px rgba(37, 99, 235, 0.25));

          transition:
            transform 0.35s ease,
            color 0.35s ease;
        }

        .quick-card:hover .quick-icon {
          color: #f5d76e;
          transform: scale(1.08);
        }

        .quick-icon-sparkle {
          position: absolute;
          top: -7px;
          right: -7px;

          color: #f5d76e;

          filter: drop-shadow(
            0 0 6px rgba(212, 175, 55, 0.7)
          );

          animation: sparkle 1.8s ease-in-out infinite;
        }

        .quick-card-content {
          position: relative;
          z-index: 4;

          width: 100%;
        }

        .quick-card-label {
          display: inline-block;

          margin-bottom: 7px;

          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;

          color: #f5d76e;

          text-shadow:
            0 0 10px rgba(212, 175, 55, 0.22);
        }

        .quick-card h3 {
          margin: 0;

          font-size: 25px;
          line-height: 1.35;
          font-weight: 900;

          color: #ffffff;

          text-shadow:
            0 2px 12px rgba(0, 0, 0, 0.45);
        }

        .quick-card p {
          margin: 10px auto 0;

          max-width: 260px;

          font-size: 15px;
          line-height: 1.8;
          font-weight: 600;

          color: rgba(226, 232, 240, 0.94);

          text-shadow:
            0 1px 8px rgba(0, 0, 0, 0.45);
        }

        .quick-arrow {
          position: absolute;
          z-index: 4;

          left: 20px;
          bottom: 19px;

          width: 34px;
          height: 34px;

          display: grid;
          place-items: center;

          border-radius: 50%;

          color: #f5d76e;

          background: rgba(37, 99, 235, 0.18);
          border: 1px solid rgba(147, 197, 253, 0.25);

          transition:
            transform 0.35s ease,
            background 0.35s ease;
        }

        .quick-card:hover .quick-arrow {
          transform: translateX(-5px);
          background: rgba(37, 99, 235, 0.32);
        }

        .quick-card-line {
          position: absolute;
          z-index: 4;

          left: 24%;
          right: 24%;
          bottom: 8px;

          height: 2px;

          border-radius: 999px;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(212, 175, 55, 0.75),
            rgba(147, 197, 253, 0.5),
            transparent
          );

          opacity: 0.8;

          animation: linePulse 3s ease-in-out infinite;
        }

        @keyframes quickCardFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes quickCardPulse {
          0%,
          100% {
            box-shadow:
              0 18px 45px rgba(0, 0, 0, 0.38),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              inset 0 0 35px rgba(37, 99, 235, 0.08);
          }

          50% {
            box-shadow:
              0 22px 52px rgba(0, 0, 0, 0.44),
              0 0 24px rgba(37, 99, 235, 0.12),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              inset 0 0 40px rgba(37, 99, 235, 0.1);
          }
        }

        @keyframes iconFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes ringPulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }

          50% {
            opacity: 0.75;
            transform: scale(1.05);
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(0.8) rotate(0deg);
          }

          50% {
            opacity: 1;
            transform: scale(1.15) rotate(20deg);
          }
        }

        @keyframes shineMove {
          0% {
            left: -80%;
          }

          45%,
          100% {
            left: 150%;
          }
        }

        @keyframes cardGlow {
          0%,
          100% {
            opacity: 0.55;
            transform: translateX(-50%) scale(0.9);
          }

          50% {
            opacity: 0.85;
            transform: translateX(-50%) scale(1.1);
          }
        }

        @keyframes linePulse {
          0%,
          100% {
            opacity: 0.45;
            transform: scaleX(0.8);
          }

          50% {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @keyframes glowMove {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(20px, -15px, 0) scale(1.08);
          }
        }

        @keyframes lightMove {
          0% {
            transform: translateY(-30px) rotate(24deg);
            opacity: 0;
          }

          20% {
            opacity: 0.4;
          }

          80% {
            opacity: 0.25;
          }

          100% {
            transform: translateY(280px) rotate(24deg);
            opacity: 0;
          }
        }

        @keyframes particleFloat {
          0%,
          100% {
            opacity: 0.2;
            transform: translateY(0) scale(0.8);
          }

          50% {
            opacity: 0.8;
            transform: translateY(-18px) scale(1.2);
          }
        }

        @media (max-width: 768px) {
          .quick-sections {
            padding: 34px 0 42px;
          }

          .quick-slider {
            gap: 16px;
            padding: 20px 18px 28px;
          }

          .quick-card {
            flex-basis: 285px;
            min-height: 225px;
            padding: 25px 20px;
            border-radius: 24px;
          }

          .quick-icon-wrap {
            width: 68px;
            height: 68px;
            margin-bottom: 14px;
          }

          .quick-card h3 {
            font-size: 22px;
          }

          .quick-card p {
            font-size: 14px;
            line-height: 1.7;
          }

          .quick-arrow {
            left: 15px;
            bottom: 15px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .quick-glow,
          .quick-light,
          .quick-particle,
          .quick-card,
          .quick-icon-wrap,
          .quick-icon-ring,
          .quick-icon-sparkle,
          .card-glow,
          .card-shine,
          .quick-card-line {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}