'use client'

import { useState } from 'react'
import {
  Calculator,
  Plus,
  Trash2,
  GraduationCap,
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

  /* =========================================
     إضافة مقرر
     ========================================= */

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


  /* =========================================
     حذف مقرر
     ========================================= */

  const removeCourse = (id: number) => {
    setCourses((current) =>
      current.filter(
        (course) => course.id !== id
      )
    )

    setCalculatedGpa(null)
  }


  /* =========================================
     تحديث بيانات المقرر
     ========================================= */

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


  /* =========================================
     حساب المعدل
     ========================================= */

  const calculateGpa = () => {
    let totalPoints = 0
    let totalHours = 0

    courses.forEach((course) => {
      const hours = Math.max(
        0,
        Number(course.hours) || 0
      )

      const grade = Math.max(
        0,
        Number(course.grade) || 0
      )

      totalPoints += hours * grade
      totalHours += hours
    })

    if (totalHours > 0) {
      setCalculatedGpa(
        (totalPoints / totalHours).toFixed(2)
      )
    }
  }


  return (
    <>
      <section
        id="gpa-calculator"
        className="gpa-3d-section"
      >

        <div className="gpa-3d-panel">

          {/* =====================================
              العنوان
             ===================================== */}

          <div className="gpa-3d-heading">

            <span className="gpa-kicker">
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


          {/* =====================================
              رأس الحاسبة
             ===================================== */}

          <div className="gpa-main-card">

            <div className="gpa-main-header">

              <div className="gpa-title-area">

                <div className="gpa-main-icon">
                  <GraduationCap
                    size={42}
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <h3>
                    حاسبة المعدل التراكمي
                  </h3>

                  <p>
                    اختر نظام المعدل ثم أدخل بيانات
                    مقرراتك.
                  </p>
                </div>

              </div>


              {/* =================================
                  نظام المعدل
                 ================================= */}

              <div className="gpa-system-box">

                <span>
                  نظام المعدل
                </span>

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


            {/* =====================================
                المقررات
               ===================================== */}

            <div className="gpa-courses-3d">

              {courses.map(
                (course, index) => (

                  <div
                    className="gpa-course-3d"
                    key={course.id}
                  >

                    <div className="gpa-course-number">
                      {index + 1}
                    </div>


                    {/* الساعات */}

                    <label>
                      <span>
                        الساعات
                      </span>

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


                    {/* التقدير */}

                    <label>
                      <span>
                        التقدير
                      </span>

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


                    {/* حذف */}

                    <button
                      type="button"
                      className="gpa-remove-3d"
                      onClick={() =>
                        removeCourse(
                          course.id
                        )
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


            {/* =====================================
                الأزرار
               ===================================== */}

            <div className="gpa-actions-3d">

              <button
                type="button"
                className="gpa-add-3d"
                onClick={addCourse}
              >
                <Plus size={18} />
                إضافة مقرر
              </button>


              <button
                type="button"
                className="gpa-calculate-3d"
                onClick={calculateGpa}
              >
                <Calculator size={18} />
                احسب المعدل
              </button>

            </div>


            {/* =====================================
                النتيجة
               ===================================== */}

            {calculatedGpa !== null && (

              <div className="gpa-result-3d">

                <div className="gpa-result-icon">
                  <Calculator
                    size={30}
                    strokeWidth={1.8}
                  />
                </div>

                <div className="gpa-result-text">

                  <span>
                    معدلك التراكمي
                  </span>

                  <strong>
                    {calculatedGpa}
                  </strong>

                  <small>
                    من {gpaSystem}
                  </small>

                </div>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =================================================
          التصميم بالكامل داخل الملف
          لا يحتاج إلى تعديل globals.css
         ================================================= */}

      <style jsx>{`

        /* =========================================
           القسم الرئيسي
           ========================================= */

        .gpa-3d-section {
          width: 100%;

          padding: 32px 16px;

          margin: 20px 0;

          direction: rtl;
        }


        /* =========================================
           اللوحة الزرقاء
           ========================================= */

        .gpa-3d-panel {
          position: relative;

          max-width: 1100px;

          margin: 0 auto;

          padding: 40px;

          background:
            linear-gradient(
              145deg,
              #173f91 0%,
              #2455c4 48%,
              #163878 100%
            );

          border:
            2px solid #d5aa54;

          border-radius: 32px;

          overflow: hidden;

          box-shadow:

            0 24px 60px
              rgba(23,35,61,0.28),

            0 0 0 7px
              rgba(213,170,84,0.07),

            inset 0 1px 0
              rgba(255,255,255,0.20),

            inset 0 -3px 0
              rgba(0,0,0,0.18);
        }


        /* =========================================
           لمعان اللوحة
           ========================================= */

        .gpa-3d-panel::before {
          content: '';

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              125deg,
              rgba(255,255,255,0.15),
              transparent 28%,
              transparent 72%,
              rgba(255,255,255,0.04)
            );
        }


        /* =========================================
           إضاءة ناعمة
           ========================================= */

        .gpa-3d-panel::after {
          content: '';

          position: absolute;

          width: 420px;

          height: 420px;

          top: -280px;

          left: -150px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,0.13),
              transparent 70%
            );

          pointer-events: none;
        }


        /* =========================================
           العنوان
           ========================================= */

        .gpa-3d-heading {
          position: relative;

          z-index: 2;

          max-width: 650px;

          margin: 0 auto 30px;

          text-align: center;
        }


        .gpa-kicker {
          display: inline-block;

          margin-bottom: 10px;

          color: #e2bc68;

          font-size: 13px;

          font-weight: 900;
        }


        .gpa-3d-heading h2 {
          margin: 0;

          color: #ffffff;

          font-size:
            clamp(30px, 4vw, 46px);

          font-weight: 900;

          line-height: 1.2;

          text-shadow:
            0 4px 12px
              rgba(0,0,0,0.25);
        }


        .gpa-3d-heading h2 em {
          color: #ffffff;

          font-style: normal;
        }


        .gpa-3d-heading p {
          max-width: 600px;

          margin: 15px auto 0;

          color:
            rgba(255,255,255,0.88);

          font-size: 15px;

          line-height: 1.9;
        }


        /* =========================================
           بطاقة الحاسبة
           ========================================= */

        .gpa-main-card {
          position: relative;

          z-index: 2;

          padding: 28px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.12),
              rgba(255,255,255,0.045)
            );

          border:
            1px solid
            rgba(255,255,255,0.22);

          border-radius: 25px;

          box-shadow:

            inset 0 1px 0
              rgba(255,255,255,0.15),

            0 15px 35px
              rgba(0,0,0,0.14);
        }


        /* =========================================
           رأس الحاسبة
           ========================================= */

        .gpa-main-header {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 25px;

          padding-bottom: 24px;

          border-bottom:
            1px solid
            rgba(255,255,255,0.15);
        }


        .gpa-title-area {
          display: flex;

          align-items: center;

          gap: 18px;

          min-width: 0;
        }


        /* =========================================
           أيقونة الحاسبة الكبيرة
           ========================================= */

        .gpa-main-icon {
          flex: 0 0 auto;

          width: 82px;

          height: 82px;

          display: grid;

          place-items: center;

          color: #174fae;

          background:
            radial-gradient(
              circle at 32% 25%,
              #ffffff 0%,
              #edf4ff 25%,
              #d8e8ff 55%,
              #b8d0f3 78%,
              #8eaddd 100%
            );

          border:
            4px solid #d5aa54;

          border-radius: 50%;

          box-shadow:

            0 13px 25px
              rgba(0,0,0,0.22),

            inset 6px 6px 12px
              rgba(255,255,255,0.85),

            inset -8px -8px 14px
              rgba(36,85,196,0.20);
        }


        .gpa-title-area h3 {
          margin: 0 0 7px;

          color: #ffffff;

          font-size: 22px;

          font-weight: 900;
        }


        .gpa-title-area p {
          margin: 0;

          color:
            rgba(255,255,255,0.78);

          font-size: 13px;

          line-height: 1.7;
        }


        /* =========================================
           اختيار النظام
           ========================================= */

        .gpa-system-box {
          flex: 0 0 auto;

          text-align: center;
        }


        .gpa-system-box > span {
          display: block;

          margin-bottom: 8px;

          color: #ffffff;

          font-size: 12px;

          font-weight: 800;
        }


        .gpa-system-buttons {
          display: flex;

          gap: 6px;

          padding: 5px;

          background:
            rgba(0,0,0,0.13);

          border:
            1px solid
            rgba(255,255,255,0.15);

          border-radius: 13px;
        }


        .gpa-system-buttons button {
          min-width: 65px;

          min-height: 40px;

          padding: 8px 14px;

          color: #ffffff;

          background:
            transparent;

          border: 0;

          border-radius: 9px;

          font-size: 13px;

          font-weight: 800;

          cursor: pointer;

          transition:
            background 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease;
        }


        .gpa-system-buttons button.active {
          color: #173f91;

          background: #ffffff;

          box-shadow:
            0 5px 12px
              rgba(0,0,0,0.15);
        }


        .gpa-system-buttons button:hover {
          transform: translateY(-1px);
        }


        /* =========================================
           المقررات
           ========================================= */

        .gpa-courses-3d {
          display: flex;

          flex-direction: column;

          gap: 10px;

          margin-top: 24px;
        }


        .gpa-course-3d {
          display: grid;

          grid-template-columns:
            48px minmax(0,1fr)
            minmax(0,1fr) 46px;

          align-items: end;

          gap: 12px;

          padding: 13px;

          background:
            rgba(255,255,255,0.075);

          border:
            1px solid
            rgba(255,255,255,0.14);

          border-radius: 17px;

          transition:
            background 0.25s ease,
            transform 0.25s ease;
        }


        .gpa-course-3d:hover {
          background:
            rgba(255,255,255,0.11);

          transform:
            translateY(-2px);
        }


        /* =========================================
           رقم المقرر
           ========================================= */

        .gpa-course-number {
          width: 42px;

          height: 42px;

          display: grid;

          place-items: center;

          margin-bottom: 1px;

          color: #173f91;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #dceaff
            );

          border:
            2px solid #d5aa54;

          border-radius: 13px;

          font-size: 15px;

          font-weight: 900;

          box-shadow:
            0 6px 13px
              rgba(0,0,0,0.16);
        }


        /* =========================================
           حقول الإدخال
           ========================================= */

        .gpa-course-3d label {
          display: flex;

          flex-direction: column;

          gap: 7px;

          color: #ffffff;

          font-size: 12px;

          font-weight: 800;
        }


        .gpa-course-3d input,
        .gpa-course-3d select {
          width: 100%;

          min-height: 46px;

          padding: 9px 12px;

          color: #173f91;

          background:
            rgba(255,255,255,0.96);

          border:
            1px solid
            rgba(255,255,255,0.45);

          border-radius: 11px;

          outline: none;

          font-size: 14px;

          font-weight: 800;

          text-align: center;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }


        .gpa-course-3d input:focus,
        .gpa-course-3d select:focus {
          border-color: #d5aa54;

          box-shadow:
            0 0 0 3px
              rgba(213,170,84,0.20);
        }


        /* =========================================
           زر الحذف
           ========================================= */

        .gpa-remove-3d {
          width: 44px;

          height: 44px;

          display: grid;

          place-items: center;

          margin-bottom: 1px;

          color: #ffffff;

          background:
            rgba(255,255,255,0.08);

          border:
            1px solid
            rgba(255,255,255,0.20);

          border-radius: 12px;

          cursor: pointer;

          transition:
            background 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease;
        }


        .gpa-remove-3d:hover {
          color: #ffffff;

          background:
            rgba(190,55,55,0.75);

          transform:
            translateY(-2px);
        }


        .gpa-remove-3d:disabled {
          opacity: 0.35;

          cursor: not-allowed;

          transform: none;
        }


        /* =========================================
           أزرار الحاسبة
           ========================================= */

        .gpa-actions-3d {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 12px;

          margin-top: 22px;
        }


        .gpa-add-3d,
        .gpa-calculate-3d {
          min-height: 50px;

          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          padding: 10px 20px;

          border-radius: 13px;

          font-size: 14px;

          font-weight: 900;

          cursor: pointer;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
        }


        .gpa-add-3d {
          color: #ffffff;

          background:
            rgba(255,255,255,0.09);

          border:
            1px solid
            rgba(255,255,255,0.25);
        }


        .gpa-calculate-3d {
          color: #173f91;

          background:
            linear-gradient(
              145deg,
              #ffffff,
              #e6efff
            );

          border:
            2px solid #d5aa54;

          box-shadow:
            0 9px 20px
              rgba(0,0,0,0.18);
        }


        .gpa-add-3d:hover,
        .gpa-calculate-3d:hover {
          transform:
            translateY(-3px);
        }


        .gpa-calculate-3d:hover {
          box-shadow:
            0 14px 25px
              rgba(0,0,0,0.24);
        }


        /* =========================================
           النتيجة
           ========================================= */

        .gpa-result-3d {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 18px;

          margin-top: 24px;

          padding: 20px;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.14),
              rgba(255,255,255,0.06)
            );

          border:
            2px solid #d5aa54;

          border-radius: 20px;

          box-shadow:
            inset 0 1px 0
              rgba(255,255,255,0.18),

            0 12px 25px
              rgba(0,0,0,0.15);

          animation:
            gpaResultIn 0.45s ease both;
        }


        @keyframes gpaResultIn {
          from {
            opacity: 0;
            transform:
              translateY(12px)
              scale(0.97);
          }

          to {
            opacity: 1;
            transform:
              translateY(0)
              scale(1);
          }
        }


        .gpa-result-icon {
          width: 62px;

          height: 62px;

          flex: 0 0 auto;

          display: grid;

          place-items: center;

          color: #174fae;

          background:
            radial-gradient(
              circle at 30% 25%,
              #ffffff,
              #d9e8ff
            );

          border:
            3px solid #d5aa54;

          border-radius: 50%;

          box-shadow:
            0 9px 18px
              rgba(0,0,0,0.20),

            inset 4px 4px 9px
              rgba(255,255,255,0.85);
        }


        .gpa-result-text {
          display: flex;

          align-items: center;

          gap: 13px;

          color: #ffffff;
        }


        .gpa-result-text span {
          font-size: 14px;

          font-weight: 800;
        }


        .gpa-result-text strong {
          color: #ffffff;

          font-family:
            Georgia,
            'Times New Roman',
            serif;

          font-size: 42px;

          font-weight: 900;

          line-height: 1;

          text-shadow:
            0 3px 8px
              rgba(0,0,0,0.25);
        }


        .gpa-result-text small {
          padding: 7px 11px;

          color: #173f91;

          background: #ffffff;

          border-radius: 9px;

          font-size: 12px;

          font-weight: 900;
        }


        /* =========================================
           الجوال
           ========================================= */

        @media (max-width: 800px) {

          .gpa-3d-section {
            padding: 20px 10px;
          }


          .gpa-3d-panel {
            padding: 24px 12px;

            border-radius: 24px;
          }


          .gpa-main-card {
            padding: 18px 10px;

            border-radius: 19px;
          }


          .gpa-main-header {
            flex-direction: column;

            align-items: stretch;

            gap: 18px;
          }


          .gpa-title-area {
            justify-content: center;

            text-align: center;
          }


          .gpa-title-area h3 {
            font-size: 18px;
          }


          .gpa-title-area p {
            font-size: 11px;
          }


          .gpa-main-icon {
            width: 68px;

            height: 68px;
          }


          .gpa-system-box {
            width: 100%;
          }


          .gpa-system-buttons {
            width: 100%;
          }


          .gpa-system-buttons button {
            flex: 1;
          }


          .gpa-course-3d {
            grid-template-columns:
              42px minmax(0,1fr)
              minmax(0,1fr) 40px;

            gap: 7px;

            padding: 9px;
          }


          .gpa-course-number {
            width: 36px;

            height: 36px;

            font-size: 13px;
          }


          .gpa-remove-3d {
            width: 38px;

            height: 42px;
          }


          .gpa-course-3d input,
          .gpa-course-3d select {
            min-height: 42px;

            padding: 7px 5px;

            font-size: 12px;
          }


          .gpa-actions-3d {
            flex-direction: column;

            align-items: stretch;
          }


          .gpa-add-3d,
          .gpa-calculate-3d {
            width: 100%;
          }


          .gpa-result-3d {
            gap: 12px;

            padding: 16px;

            flex-wrap: wrap;
          }


          .gpa-result-text {
            flex-wrap: wrap;

            justify-content: center;
          }


          .gpa-result-text strong {
            font-size: 36px;
          }

        }


        /* =========================================
           الجوال الصغير
           ========================================= */

        @media (max-width: 380px) {

          .gpa-title-area {
            flex-direction: column;
          }


          .gpa-course-3d {
            grid-template-columns:
              34px minmax(0,1fr)
              minmax(0,1fr) 36px;
          }


          .gpa-course-number {
            width: 32px;

            height: 32px;
          }


          .gpa-remove-3d {
            width: 34px;

            height: 40px;
          }


          .gpa-result-text strong {
            font-size: 31px;
          }

        }

      `}</style>
    </>
  )
}