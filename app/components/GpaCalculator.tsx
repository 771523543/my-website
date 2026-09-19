'use client'

import { useState } from 'react'
import {
  Calculator,
  Plus,
  Trash2,
} from 'lucide-react'

type Course = {
  id: number
  hours: number
  grade: number
}

export default function GpaCalculator() {
  const [gpaSystem, setGpaSystem] =
    useState<5 | 4>(5)

  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      hours: 3,
      grade: 5,
    },
    {
      id: 2,
      hours: 3,
      grade: 4.75,
    },
    {
      id: 3,
      hours: 2,
      grade: 4.5,
    },
  ])

  const [calculatedGpa, setCalculatedGpa] =
    useState<string | null>(null)

  const addCourse = () => {
    setCourses((current) => [
      ...current,
      {
        id: Date.now(),
        hours: 3,
        grade: gpaSystem,
      },
    ])
  }

  const removeCourse = (id: number) => {
    setCourses((current) =>
      current.filter(
        (course) => course.id !== id
      )
    )

    setCalculatedGpa(null)
  }

  const updateCourse = (
    id: number,
    field: 'hours' | 'grade',
    value: number
  ) => {
    setCourses((current) =>
      current.map((course) =>
        course.id === id
          ? {
              ...course,
              [field]: value,
            }
          : course
      )
    )

    setCalculatedGpa(null)
  }

  const calculateGpa = () => {
    let totalPoints = 0
    let totalHours = 0

    courses.forEach((course) => {
      totalPoints +=
        course.hours * course.grade

      totalHours += course.hours
    })

    if (totalHours > 0) {
      setCalculatedGpa(
        (totalPoints / totalHours).toFixed(2)
      )
    }
  }

  return (
    <section
      id="gpa-calculator"
      className="soft-section container"
    >
      <div className="center-heading">
        <span className="section-kicker">
          حاسبة المعدل
        </span>

        <h2>
          احسب معدلك
          <br />
          <em>بسهولة ودقة</em>
        </h2>

        <p>
          أدخل الساعات والتقديرات واحصل على
          معدلك التراكمي مباشرة.
        </p>
      </div>

      <div className="gpa-calculator-card">
        <div className="gpa-header">
          <div>
            <div className="gpa-icon">
              <Calculator size={24} />
            </div>

            <h3>حاسبة المعدل التراكمي</h3>

            <p>
              اختر نظام المعدل ثم أدخل بيانات
              مقرراتك.
            </p>
          </div>

          <div className="gpa-system">
            <span>نظام المعدل</span>

            <div className="gpa-system-buttons">
              <button
                type="button"
                className={
                  gpaSystem === 5
                    ? 'active'
                    : ''
                }
                onClick={() => {
                  setGpaSystem(5)
                  setCalculatedGpa(null)
                }}
              >
                من 5
              </button>

              <button
                type="button"
                className={
                  gpaSystem === 4
                    ? 'active'
                    : ''
                }
                onClick={() => {
                  setGpaSystem(4)
                  setCalculatedGpa(null)
                }}
              >
                من 4
              </button>
            </div>
          </div>
        </div>

        <div className="gpa-courses">
          {courses.map(
            (course, index) => (
              <div
                className="gpa-course"
                key={course.id}
              >
                <div className="gpa-course-number">
                  {index + 1}
                </div>

                <label>
                  الساعات
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={course.hours}
                    onChange={(event) =>
                      updateCourse(
                        course.id,
                        'hours',
                        Number(
                          event.target.value
                        )
                      )
                    }
                  />
                </label>

                <label>
                  التقدير
                  <select
                    value={course.grade}
                    onChange={(event) =>
                      updateCourse(
                        course.id,
                        'grade',
                        Number(
                          event.target.value
                        )
                      )
                    }
                  >
                    {gpaSystem === 5 ? (
                      <>
                        <option value="5">
                          5.00
                        </option>
                        <option value="4.75">
                          4.75
                        </option>
                        <option value="4.5">
                          4.50
                        </option>
                        <option value="4.25">
                          4.25
                        </option>
                        <option value="4">
                          4.00
                        </option>
                        <option value="3.75">
                          3.75
                        </option>
                        <option value="3.5">
                          3.50
                        </option>
                        <option value="3">
                          3.00
                        </option>
                        <option value="2.5">
                          2.50
                        </option>
                        <option value="2">
                          2.00
                        </option>
                        <option value="1">
                          1.00
                        </option>
                        <option value="0">
                          0.00
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="4">
                          4.00
                        </option>
                        <option value="3.75">
                          3.75
                        </option>
                        <option value="3.5">
                          3.50
                        </option>
                        <option value="3.25">
                          3.25
                        </option>
                        <option value="3">
                          3.00
                        </option>
                        <option value="2.75">
                          2.75
                        </option>
                        <option value="2.5">
                          2.50
                        </option>
                        <option value="2">
                          2.00
                        </option>
                        <option value="1">
                          1.00
                        </option>
                        <option value="0">
                          0.00
                        </option>
                      </>
                    )}
                  </select>
                </label>

                <button
                  type="button"
                  className="gpa-remove"
                  onClick={() =>
                    removeCourse(course.id)
                  }
                  disabled={
                    courses.length === 1
                  }
                  aria-label="حذف المقرر"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )
          )}
        </div>

        <div className="gpa-actions">
          <button
            type="button"
            className="gpa-add"
            onClick={addCourse}
          >
            <Plus size={17} />
            إضافة مقرر
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={calculateGpa}
          >
            <Calculator size={17} />
            احسب المعدل
          </button>
        </div>

        {calculatedGpa !== null && (
          <div className="gpa-result">
            <span>معدلك التراكمي</span>

            <strong>
              {calculatedGpa}
            </strong>

            <small>
              من {gpaSystem}
            </small>
          </div>
        )}
      </div>
    </section>
  )
}