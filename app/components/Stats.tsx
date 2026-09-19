'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Clock3,
  HeartHandshake,
  Layers3,
  UsersRound,
} from 'lucide-react'

export default function Stats() {
  const [countValues, setCountValues] = useState({
    students: 0,
    services: 0,
    experience: 0,
    satisfaction: 0,
  })

  const countStarted = useRef(false)

  useEffect(() => {
    const section =
      document.querySelector<HTMLElement>(
        '[data-count-stats]'
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
          students: 10000,
          services: 15,
          experience: 8,
          satisfaction: 98,
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
            students: Math.round(
              targets.students *
                easedProgress
            ),
            services: Math.round(
              targets.services *
                easedProgress
            ),
            experience: Math.round(
              targets.experience *
                easedProgress
            ),
            satisfaction: Math.round(
              targets.satisfaction *
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

  const formatStudents = () => {
    if (countValues.students >= 10000) {
      return '+10K'
    }

    return `+${countValues.students.toLocaleString(
      'en-US'
    )}`
  }

  return (
    <section
      className="stats-strip"
      data-count-stats
    >
      <div className="container stats">
        <div>
          <UsersRound size={22} />

          <strong>
            {formatStudents()}
          </strong>

          <span>طالب مستفيد</span>
        </div>

        <div>
          <Layers3 size={22} />

          <strong>
            +{countValues.services}
          </strong>

          <span>خدمة أكاديمية</span>
        </div>

        <div>
          <Clock3 size={22} />

          <strong>
            +{countValues.experience}
          </strong>

          <span>سنوات خبرة</span>
        </div>

        <div>
          <HeartHandshake size={22} />

          <strong>
            {countValues.satisfaction}%
          </strong>

          <span>نسبة رضا العملاء</span>
        </div>
      </div>
    </section>
  )
}