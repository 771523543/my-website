'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  Headphones,
  HeartHandshake,
} from 'lucide-react'

export default function Achievements() {
  const [achievementIndex, setAchievementIndex] =
    useState(0)

  const [achievementPaused, setAchievementPaused] =
    useState(false)

  const [countValues, setCountValues] = useState({
    completed: 0,
    satisfaction: 0,
    experience: 0,
  })

  const countStarted = useRef(false)

  const achievementImages = [
    '/images/hadeel-achievements.png',
    '/images/hadeel-achievement-test.jpg',
  ]

  /*
   * تشغيل عداد الإنجازات عند ظهور القسم
   */
  useEffect(() => {
    const section =
      document.querySelector<HTMLElement>(
        '[data-count-achievements]'
      )

    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (
          !entry.isIntersecting ||
          countStarted.current
        ) {
          return
        }

        countStarted.current = true

        const targets = {
          completed: 1200,
          satisfaction: 98,
          experience: 8,
        }

        const duration = 1800
        const startTime = performance.now()

        const animate = (
          currentTime: number
        ) => {
          const elapsed =
            currentTime - startTime

          const progress = Math.min(
            elapsed / duration,
            1
          )

          const easedProgress =
            1 - Math.pow(1 - progress, 3)

          setCountValues({
            completed: Math.round(
              targets.completed *
                easedProgress
            ),
            satisfaction: Math.round(
              targets.satisfaction *
                easedProgress
            ),
            experience: Math.round(
              targets.experience *
                easedProgress
            ),
          })

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)

        observer.unobserve(section)
      },
      {
        threshold: 0.25,
      }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  /*
   * تشغيل سلايدر الإنجازات
   */
  useEffect(() => {
    if (achievementPaused) return

    const timer = window.setInterval(() => {
      setAchievementIndex(
        (current) =>
          (current + 1) %
          achievementImages.length
      )
    }, 3000)

    return () =>
      window.clearInterval(timer)
  }, [
    achievementPaused,
    achievementImages.length,
  ])

  const formatCompleted = () => {
    return `+${countValues.completed.toLocaleString(
      'en-US'
    )}`
  }

  return (
    <section
      className="achievements-section container"
      data-count-achievements
    >
      <div className="achievements-copy">
        <span className="section-kicker">
          إنجازاتنا بالأرقام
        </span>

        <h2>
          نتائج تُثبت
          <br />
          <em>ثقة طلابنا</em>
        </h2>

        <p>
          نفخر بكل طالب ساعدناه على تحويل
          التحديات الأكاديمية إلى إنجازات واضحة
          ونتائج ملموسة.
        </p>

        <div className="achievement-stats">
          <div>
            <CheckCircle2 size={20} />

            <strong>
              {formatCompleted()}
            </strong>

            <span>خدمة منجزة</span>
          </div>

          <div>
            <HeartHandshake size={20} />

            <strong>
              {countValues.satisfaction}%
            </strong>

            <span>رضا العملاء</span>
          </div>

          <div>
            <Clock3 size={20} />

            <strong>
              +{countValues.experience}
            </strong>

            <span>سنوات خبرة</span>
          </div>

          <div>
            <Headphones size={20} />

            <strong>24/7</strong>

            <span>دعم ومتابعة</span>
          </div>
        </div>
      </div>

      <div
        className="achievements-image"
        onMouseEnter={() =>
          setAchievementPaused(true)
        }
        onMouseLeave={() =>
          setAchievementPaused(false)
        }
      >
        <div
          className="achievement-slides"
          aria-live="polite"
        >
          <Image
            key={
              achievementImages[
                achievementIndex
              ]
            }
            className="achievement-slide"
            src={
              achievementImages[
                achievementIndex
              ]
            }
            alt={`نموذج إنجاز أكاديمي ${
              achievementIndex + 1
            }`}
            fill
            sizes="(max-width: 800px) 100vw, 45vw"
          />
        </div>

        <button
          type="button"
          className="achievement-arrow achievement-next"
          onClick={() =>
            setAchievementIndex(
              (achievementIndex + 1) %
                achievementImages.length
            )
          }
          aria-label="الصورة التالية"
        >
          <ChevronRight size={18} />
        </button>

        <button
          type="button"
          className="achievement-arrow achievement-prev"
          onClick={() =>
            setAchievementIndex(
              (achievementIndex -
                1 +
                achievementImages.length) %
                achievementImages.length
            )
          }
          aria-label="الصورة السابقة"
        >
          <ChevronRight
            size={18}
            style={{
              transform: 'rotate(180deg)',
            }}
          />
        </button>

        <div className="achievement-dots">
          {achievementImages.map(
            (image, index) => (
              <button
                type="button"
                key={image}
                className={
                  index === achievementIndex
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setAchievementIndex(index)
                }
                aria-label={`عرض الصورة ${
                  index + 1
                }`}
              />
            )
          )}
        </div>
      </div>
    </section>
  )
}