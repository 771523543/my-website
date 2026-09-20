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
  },
  {
    id: 'packages',
    title: 'باقاتنا',
    description: 'اختر الباقة المناسبة لرحلتك التعليمية',
    href: '/#packages',
    icon: Gem,
  },
  {
    id: 'previous-works',
    title: 'أعمالنا السابقة',
    description: 'تعرّف على أعمالنا ومشاريعنا السابقة',
    href: '/previous-works',
    icon: Trophy,
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

  const speed = 0.85

  const cards = [
    ...quickSections,
    ...quickSections,
    ...quickSections,
  ]

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
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const slider = sliderRef.current

    if (!slider) return

    setIsDragging(true)
    setIsInteracting(true)

    startX.current = event.clientX
    startScrollLeft.current = slider.scrollLeft

    slider.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!isDragging) return

    const slider = sliderRef.current

    if (!slider) return

    const distance =
      event.clientX - startX.current

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
      className="quick-sections"
      dir="rtl"
    >
      <div className="quick-sections-background">
        <div className="quick-glow quick-glow-one" />
        <div className="quick-glow quick-glow-two" />

        <div className="quick-light quick-light-one" />
        <div className="quick-light quick-light-two" />

        <div className="quick-particle quick-particle-one" />
        <div className="quick-particle quick-particle-two" />
        <div className="quick-particle quick-particle-three" />
        <div className="quick-particle quick-particle-four" />
        <div className="quick-particle quick-particle-five" />
      </div>

      <div
        ref={sliderRef}
        className={
          isDragging
            ? 'quick-sections-slider is-dragging'
            : 'quick-sections-slider'
        }
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
      >
        {cards.map((item, index) => {
          const Icon = item.icon
          const key = `${item.id}-${index}`
          const isHovered = hovered === key

          return (
            <Link
              key={key}
              href={item.href}
              draggable={false}
              className={
                isHovered
                  ? 'quick-card is-hovered'
                  : 'quick-card'
              }
              onMouseEnter={() =>
                setHovered(key)
              }
              onMouseLeave={() =>
                setHovered(null)
              }
            >
              <div className="quick-card-glow" />

              <div className="quick-card-shine" />

              <div className="quick-card-decoration quick-card-decoration-one" />

              <div className="quick-card-decoration quick-card-decoration-two" />

              <div className="quick-card-content">
                <div className="quick-card-icon">
                  <Icon
                    size={31}
                    strokeWidth={1.7}
                  />
                </div>

                <div className="quick-card-text">
                  <div className="quick-card-title">
                    <h3>{item.title}</h3>

                    <Sparkles
                      size={14}
                      className="quick-card-sparkle"
                    />
                  </div>

                  <p>{item.description}</p>

                  <span className="quick-card-link">
                    اكتشف الآن
                    <ArrowLeft size={14} />
                  </span>
                </div>
              </div>

              <div className="quick-card-border" />
            </Link>
          )
        })}
      </div>

      <div className="quick-sections-indicator">
        <span />

        <div className="quick-sections-dots">
          <i />
          <i />
          <i />
        </div>

        <span />
      </div>

      <style jsx>{`
        .quick-sections {
          position: relative;
          width: 100%;
          padding: 8px 0 54px;
          overflow: hidden;
        }

        .quick-sections-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .quick-glow {
          position: absolute;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          filter: blur(75px);
        }

        .quick-glow-one {
          top: -220px;
          right: -90px;
          background: rgba(35, 91, 190, 0.3);

          animation:
            quickGlowOne 6s ease-in-out infinite
            alternate;
        }

        .quick-glow-two {
          bottom: -230px;
          left: -90px;
          background: rgba(244, 190, 73, 0.18);

          animation:
            quickGlowTwo 7s ease-in-out infinite
            alternate;
        }

        .quick-light {
          position: absolute;
          width: 360px;
          height: 2px;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(246, 202, 104, 0.9),
            transparent
          );

          filter: blur(0.5px);
          opacity: 0.65;
        }

        .quick-light-one {
          top: 24%;
          right: -100px;
          transform: rotate(-5deg);

          animation:
            quickLightOne 4.5s ease-in-out infinite;
        }

        .quick-light-two {
          bottom: 24%;
          left: -100px;
          transform: rotate(5deg);

          animation:
            quickLightTwo 5s ease-in-out infinite;
        }

        .quick-particle {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;

          background: #f5cc70;

          box-shadow:
            0 0 10px rgba(245, 204, 112, 1),
            0 0 24px rgba(245, 204, 112, 0.6);

          animation:
            quickParticle 3.5s ease-in-out infinite;
        }

        .quick-particle-one {
          top: 20%;
          right: 12%;
        }

        .quick-particle-two {
          top: 65%;
          left: 16%;
          animation-delay: -1.2s;
        }

        .quick-particle-three {
          top: 38%;
          right: 42%;
          animation-delay: -2s;
        }

        .quick-particle-four {
          top: 72%;
          right: 30%;
          animation-delay: -2.8s;
        }

        .quick-particle-five {
          top: 28%;
          left: 38%;
          animation-delay: -0.7s;
        }

        .quick-sections-slider {
          position: relative;
          z-index: 2;

          display: flex;
          gap: 18px;

          overflow-x: auto;
          overflow-y: visible;

          padding: 18px 20px 32px;

          scrollbar-width: none;
          cursor: grab;

          touch-action: pan-y;
          user-select: none;
        }

        .quick-sections-slider::-webkit-scrollbar {
          display: none;
        }

        .quick-sections-slider.is-dragging {
          cursor: grabbing;
        }

        .quick-card {
          position: relative;

          flex: 0 0 clamp(250px, 29vw, 335px);

          min-height: 176px;

          overflow: hidden;
          border-radius: 28px;

          color: #fff;
          text-decoration: none;

          background:
            radial-gradient(
              circle at 82% 18%,
              rgba(255, 209, 105, 0.22),
              transparent 30%
            ),
            radial-gradient(
              circle at 15% 85%,
              rgba(40, 105, 220, 0.28),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              #06183f 0%,
              #092969 40%,
              #10449d 72%,
              #06183f 100%
            );

          border: 1px solid rgba(246, 202, 104, 0.36);

          box-shadow:
            0 16px 38px rgba(4, 22, 65, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.04) inset;

          animation:
            quickCardFloat 4s ease-in-out infinite,
            quickCardPulse 5s ease-in-out infinite;

          transition:
            transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1),
            box-shadow 0.45s ease,
            border-color 0.45s ease;

          isolation: isolate;
        }

        .quick-card:nth-child(2) {
          animation-delay: -1.2s, -0.8s;
        }

        .quick-card:nth-child(3) {
          animation-delay: -2.4s, -1.6s;
        }

        .quick-card:nth-child(4) {
          animation-delay: -3.6s, -2.4s;
        }

        .quick-card:nth-child(5) {
          animation-delay: -0.8s, -3.2s;
        }

        .quick-card:nth-child(6) {
          animation-delay: -2s, -4s;
        }

        .quick-card:hover,
        .quick-card.is-hovered {
          transform:
            translateY(-11px)
            scale(1.035);

          border-color: rgba(246, 202, 104, 0.85);

          box-shadow:
            0 28px 60px rgba(4, 22, 65, 0.3),
            0 0 42px rgba(246, 202, 104, 0.13);
        }

        .quick-card-glow {
          position: absolute;

          width: 190px;
          height: 190px;

          top: -105px;
          right: -40px;

          border-radius: 50%;

          background: rgba(255, 208, 100, 0.2);

          filter: blur(30px);

          animation:
            quickCardGlow 4s ease-in-out infinite
            alternate;
        }

        .quick-card-shine {
          position: absolute;

          top: -45%;
          left: -40%;

          width: 20%;
          height: 190%;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.14),
            rgba(255, 216, 125, 0.38),
            rgba(255, 255, 255, 0.14),
            transparent
          );

          transform: skewX(-20deg);

          filter: blur(1px);

          animation:
            quickCardShine 3.8s ease-in-out infinite;

          pointer-events: none;
        }

        .quick-card-decoration {
          position: absolute;
          border-radius: 50%;

          border: 1px solid rgba(255, 213, 120, 0.18);

          pointer-events: none;
        }

        .quick-card-decoration-one {
          width: 165px;
          height: 165px;

          left: -85px;
          bottom: -100px;

          animation:
            quickDecorationOne 7s ease-in-out infinite;
        }

        .quick-card-decoration-two {
          width: 95px;
          height: 95px;

          right: -48px;
          bottom: -44px;

          border-color: rgba(255, 255, 255, 0.12);

          animation:
            quickDecorationTwo 5s ease-in-out infinite;
        }

        .quick-card-content {
          position: relative;
          z-index: 3;

          min-height: 176px;

          padding: 22px;

          display: flex;
          align-items: center;

          gap: 17px;
        }

        .quick-card-icon {
          flex: 0 0 67px;

          width: 67px;
          height: 67px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 21px;

          color: #f8d477;

          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.19),
            rgba(255, 255, 255, 0.055)
          );

          border: 1px solid rgba(246, 202, 104, 0.42);

          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.16),
            0 0 25px rgba(246, 202, 104, 0.1);

          backdrop-filter: blur(12px);

          animation:
            quickIconFloat 2.8s ease-in-out infinite;

          transition:
            transform 0.45s ease,
            box-shadow 0.45s ease;
        }

        .quick-card:hover .quick-card-icon,
        .quick-card.is-hovered .quick-card-icon {
          transform:
            rotate(-9deg)
            scale(1.13);

          box-shadow:
            0 15px 35px rgba(0, 0, 0, 0.2),
            0 0 35px rgba(246, 202, 104, 0.25);
        }

        .quick-card-text {
          min-width: 0;
          flex: 1;
        }

        .quick-card-title {
          display: flex;
          align-items: center;

          gap: 7px;
          margin-bottom: 5px;
        }

        .quick-card-title h3 {
          margin: 0;

          color: #fff;

          font-size: 21px;
          font-weight: 900;
        }

        .quick-card-sparkle {
          color: #f7d47b;

          animation:
            quickSparkle 1.7s ease-in-out infinite;
        }

        .quick-card-text p {
          margin: 0;

          color: rgba(255, 255, 255, 0.82);

          font-size: 12px;
          line-height: 1.75;
        }

        .quick-card-link {
          display: inline-flex;
          align-items: center;

          gap: 5px;
          margin-top: 10px;

          color: #f7d47b;

          font-size: 12px;
          font-weight: 900;

          transition: gap 0.35s ease;
        }

        .quick-card:hover .quick-card-link,
        .quick-card.is-hovered .quick-card-link {
          gap: 10px;
        }

        .quick-card-border {
          position: absolute;
          inset: 0;

          z-index: 4;

          border-radius: inherit;
          pointer-events: none;

          border: 1px solid transparent;

          background:
            linear-gradient(
              135deg,
              rgba(246, 202, 104, 0.6),
              transparent 35%,
              transparent 65%,
              rgba(255, 255, 255, 0.2)
            )
            border-box;

          mask:
            linear-gradient(#000 0 0)
              padding-box,
            linear-gradient(#000 0 0);

          mask-composite: exclude;

          opacity: 0.55;

          animation:
            quickBorderGlow 3.5s ease-in-out infinite;
        }

        .quick-sections-indicator {
          position: relative;
          z-index: 3;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 12px;
          margin-top: 0;

          opacity: 0.7;
        }

        .quick-sections-indicator > span {
          width: 55px;
          height: 1px;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(246, 202, 104, 0.75)
          );
        }

        .quick-sections-indicator
          > span:last-child {
          background: linear-gradient(
            90deg,
            rgba(246, 202, 104, 0.75),
            transparent
          );
        }

        .quick-sections-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .quick-sections-dots i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #f3cb70;

          box-shadow:
            0 0 10px
              rgba(243, 203, 112, 0.8);

          animation:
            quickDot 1.4s ease-in-out infinite;
        }

        .quick-sections-dots i:nth-child(2) {
          animation-delay: 0.2s;
        }

        .quick-sections-dots i:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes quickCardFloat {
          0%,
          100% {
            translate: 0 0;
          }

          50% {
            translate: 0 -9px;
          }
        }

        @keyframes quickCardPulse {
          0%,
          100% {
            box-shadow:
              0 16px 38px
                rgba(4, 22, 65, 0.2),
              0 0 0
                rgba(246, 202, 104, 0);
          }

          50% {
            box-shadow:
              0 24px 52px
                rgba(4, 22, 65, 0.28),
              0 0 32px
                rgba(246, 202, 104, 0.17);
          }
        }

        @keyframes quickGlowOne {
          0% {
            transform:
              translate(0, 0)
              scale(0.85);
          }

          50% {
            transform:
              translate(-180px, 40px)
              scale(1.25);
          }

          100% {
            transform:
              translate(-320px, 0)
              scale(0.95);
          }
        }

        @keyframes quickGlowTwo {
          0% {
            transform:
              translate(0, 0)
              scale(0.85);
          }

          50% {
            transform:
              translate(170px, -35px)
              scale(1.3);
          }

          100% {
            transform:
              translate(300px, 20px)
              scale(0.95);
          }
        }

        @keyframes quickLightOne {
          0%,
          100% {
            transform:
              translateX(0)
              rotate(-5deg);

            opacity: 0.12;
          }

          45% {
            opacity: 0.9;
          }

          100% {
            transform:
              translateX(-600px)
              rotate(-5deg);

            opacity: 0;
          }
        }

        @keyframes quickLightTwo {
          0%,
          100% {
            transform:
              translateX(0)
              rotate(5deg);

            opacity: 0.12;
          }

          45% {
            opacity: 0.9;
          }

          100% {
            transform:
              translateX(600px)
              rotate(5deg);

            opacity: 0;
          }
        }

        @keyframes quickParticle {
          0%,
          100% {
            transform:
              translate(0, 0)
              scale(0.5);

            opacity: 0.25;
          }

          50% {
            transform:
              translate(35px, -25px)
              scale(1.5);

            opacity: 1;
          }
        }

        @keyframes quickCardGlow {
          0% {
            transform:
              translate(0, 0)
              scale(0.75);

            opacity: 0.35;
          }

          100% {
            transform:
              translate(-75px, 45px)
              scale(1.35);

            opacity: 0.85;
          }
        }

        @keyframes quickCardShine {
          0% {
            left: -40%;
            opacity: 0;
          }

          10% {
            opacity: 0.2;
          }

          30% {
            opacity: 1;
          }

          55% {
            opacity: 0.9;
          }

          75% {
            opacity: 0.2;
          }

          100% {
            left: 140%;
            opacity: 0;
          }
        }

        @keyframes quickIconFloat {
          0%,
          100% {
            transform:
              translateY(0)
              rotate(0);
          }

          50% {
            transform:
              translateY(-7px)
              rotate(-4deg);
          }
        }

        @keyframes quickSparkle {
          0%,
          100% {
            transform:
              scale(0.7)
              rotate(0);

            opacity: 0.4;
          }

          50% {
            transform:
              scale(1.3)
              rotate(18deg);

            opacity: 1;
          }
        }

        @keyframes quickDecorationOne {
          0%,
          100% {
            transform:
              scale(0.9)
              rotate(0);
          }

          50% {
            transform:
              scale(1.18)
              rotate(35deg);
          }
        }

        @keyframes quickDecorationTwo {
          0%,
          100% {
            transform: scale(0.8);
            opacity: 0.3;
          }

          50% {
            transform: scale(1.3);
            opacity: 0.8;
          }
        }

        @keyframes quickBorderGlow {
          0%,
          100% {
            opacity: 0.35;
          }

          50% {
            opacity: 0.9;
          }
        }

        @keyframes quickDot {
          0%,
          100% {
            transform: scale(0.65);
            opacity: 0.35;
          }

          50% {
            transform: scale(1.5);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .quick-sections {
            padding: 6px 0 40px;
          }

          .quick-sections-slider {
            gap: 13px;
            padding: 12px 14px 25px;
          }

          .quick-card {
            flex-basis: 285px;
            min-height: 158px;
            border-radius: 24px;
          }

          .quick-card-content {
            min-height: 158px;
            padding: 18px;
            gap: 13px;
          }

          .quick-card-icon {
            flex-basis: 57px;
            width: 57px;
            height: 57px;
            border-radius: 18px;
          }

          .quick-card-icon svg {
            width: 27px;
            height: 27px;
          }

          .quick-card-title h3 {
            font-size: 19px;
          }

          .quick-card-text p {
            font-size: 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .quick-sections *,
          .quick-sections *::before,
          .quick-sections *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </section>
  )
}