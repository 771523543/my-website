"use client"

import Image from "next/image"
import Link from "next/link"

import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react"

import type { University } from "@/app/components/universities/data"

type CollegesContentProps = {
  university: University
}

export default function CollegesContent({
  university,
}: CollegesContentProps) {
  const totalMajors = university.colleges.reduce(
    (total, college) => total + college.majors.length,
    0
  )

  return (
    <main className="colleges-page">
      <div className="colleges-container">

        {/* العودة */}
        <Link href="/universities" className="back-link">
          <ArrowRight size={18} strokeWidth={2.2} />
          <span>العودة إلى الجامعات</span>
        </Link>

        {/* رأس الصفحة */}
        <section className="university-header">

          <div className="university-logo-wrapper">
            <Image
              src={university.logo}
              alt={`شعار ${university.name}`}
              width={110}
              height={110}
              className="university-logo"
            />
          </div>

          <div className="header-content">

            <div className="eyebrow">
              <GraduationCap size={17} />
              <span>الكليات والتخصصات</span>
            </div>

            <h1>{university.name}</h1>

            <p className="university-description">
              {university.description}
            </p>

            <div className="university-meta">

              <div className="meta-item">
                <MapPin size={17} />
                <span>{university.city}</span>
              </div>

              <div className="meta-item">
                <GraduationCap size={17} />
                <span>
                  تأسست عام {university.founded}
                </span>
              </div>

              <div className="meta-item">
                <BookOpen size={17} />
                <span>
                  {university.colleges.length} كلية
                </span>
              </div>

              <div className="meta-item">
                <Sparkles size={17} />
                <span>
                  {totalMajors} تخصص
                </span>
              </div>

            </div>
          </div>

        </section>

        {/* عنوان الكليات */}
        <section className="colleges-section">

          <div className="section-heading">

            <div>
              <span className="section-eyebrow">
                البرامج الأكاديمية
              </span>

              <h2>كليات الجامعة</h2>

              <p>
                استعرض الكليات والتخصصات والبرامج الأكاديمية
                المتاحة في الجامعة.
              </p>
            </div>

            <div className="college-count">
              {university.colleges.length}
              <span>كلية</span>
            </div>

          </div>

          {/* الكليات */}
          <div className="colleges-grid">

            {university.colleges.map((college, index) => (

              <article
                key={college.name}
                className="college-card"
              >

                {/* رقم الكلية */}
                <div className="college-number">
                  الكلية {index + 1}
                </div>

                {/* الأيقونة */}
                <div className="college-icon">
                  <GraduationCap
                    size={27}
                    strokeWidth={2}
                  />
                </div>

                {/* اسم الكلية */}
                <h3>{college.name}</h3>

                {/* الخط الذهبي */}
                <div className="gold-divider" />

                {/* التخصصات */}
                <div className="majors-heading">

                  <BookOpen size={17} />

                  <span>التخصصات والبرامج</span>

                </div>

                <div className="major-count">
                  {college.majors.length} تخصص
                </div>

                {/* قائمة التخصصات */}
                {college.majors.length > 0 ? (

                  <div className="majors-list">

                    {college.majors.map((major) => (

                      <span
                        key={major}
                        className="major-pill"
                      >
                        {major}
                      </span>

                    ))}

                  </div>

                ) : (

                  <div className="empty-majors">
                    لا توجد تخصصات مضافة حاليًا.
                  </div>

                )}

              </article>

            ))}

          </div>

        </section>

      </div>

      <style jsx>{`

        .colleges-page {
          min-height: 100vh;
          background: var(--background, #f8fbff);
          padding: 20px 0 70px;
          direction: rtl;
        }

        .colleges-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          box-sizing: border-box;
        }

        /* =========================
           Back Link
        ========================= */

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 28px;
          padding: 9px 15px;
          border: 1px solid rgba(36, 85, 196, 0.12);
          border-radius: 10px;
          background: #ffffff;
          color: #2455c4;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          box-shadow: 0 3px 12px rgba(23, 35, 61, 0.05);
          transition:
            background 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .back-link:hover {
          background: #2455c4;
          color: #ffffff;
          transform: translateX(2px);
          box-shadow: 0 6px 18px rgba(36, 85, 196, 0.15);
        }

        /* =========================
           University Header
        ========================= */

        .university-header {
          display: flex;
          align-items: center;
          gap: 30px;
          padding: 30px;
          background: #ffffff;
          border: 1px solid #e4ebf4;
          border-radius: 24px;
          box-shadow: 0 8px 30px rgba(23, 35, 61, 0.06);
          margin-bottom: 42px;
        }

        .university-logo-wrapper {
          flex: 0 0 auto;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 22px;
          background: #f8fbff;
          border: 1px solid #e4ebf4;
        }

        .university-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .header-content {
          flex: 1;
          min-width: 0;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #2455c4;
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 10px;
        }

        .header-content h1 {
          margin: 0 0 12px;
          color: #17233d;
          font-size: clamp(25px, 4vw, 38px);
          line-height: 1.3;
          font-weight: 900;
        }

        .university-description {
          max-width: 800px;
          margin: 0;
          color: #697791;
          font-size: 15px;
          line-height: 1.9;
        }

        .university-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-top: 20px;
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          border-radius: 10px;
          background: #f8fbff;
          border: 1px solid #e4ebf4;
          color: #59677f;
          font-size: 13px;
          font-weight: 700;
        }

        .meta-item svg {
          color: #2455c4;
          flex-shrink: 0;
        }

        /* =========================
           Section Heading
        ========================= */

        .colleges-section {
          width: 100%;
        }

        .section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 25px;
        }

        .section-eyebrow {
          display: block;
          margin-bottom: 7px;
          color: #c18b2c;
          font-size: 13px;
          font-weight: 800;
        }

        .section-heading h2 {
          margin: 0 0 7px;
          color: #17233d;
          font-size: 28px;
          font-weight: 900;
        }

        .section-heading p {
          margin: 0;
          color: #697791;
          font-size: 14px;
          line-height: 1.8;
        }

        .college-count {
          flex-shrink: 0;
          display: flex;
          align-items: baseline;
          gap: 5px;
          color: #2455c4;
          font-size: 30px;
          font-weight: 900;
        }

        .college-count span {
          color: #697791;
          font-size: 13px;
          font-weight: 700;
        }

        /* =========================
           Colleges Grid
        ========================= */

        .colleges-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .college-card {
          position: relative;
          overflow: hidden;
          padding: 28px 24px 25px;
          background: #ffffff;
          border: 1px solid #e4ebf4;
          border-radius: 20px;
          box-shadow: 0 7px 25px rgba(23, 35, 61, 0.05);
          text-align: center;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
        }

        .college-card::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          height: 4px;
          background: linear-gradient(
            90deg,
            #2455c4,
            #e9b24c,
            #2455c4
          );
          opacity: 0.9;
        }

        .college-card:hover {
          transform: translateY(-4px);
          border-color: rgba(36, 85, 196, 0.18);
          box-shadow: 0 14px 35px rgba(23, 35, 61, 0.09);
        }

        .college-number {
          margin-bottom: 15px;
          color: #8a96aa;
          font-size: 12px;
          font-weight: 800;
        }

        .college-icon {
          width: 58px;
          height: 58px;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: #e8f1ff;
          color: #2455c4;
        }

        .college-card h3 {
          margin: 0;
          color: #17233d;
          font-size: 19px;
          line-height: 1.6;
          font-weight: 900;
        }

        .gold-divider {
          width: 55px;
          height: 3px;
          margin: 16px auto 17px;
          border-radius: 10px;
          background: #e9b24c;
        }

        .majors-heading {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #2455c4;
          font-size: 14px;
          font-weight: 800;
        }

        .majors-heading svg {
          flex-shrink: 0;
        }

        .major-count {
          margin-top: 5px;
          color: #8a96aa;
          font-size: 12px;
          font-weight: 700;
        }

        .majors-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 7px;
          margin-top: 17px;
        }

        .major-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 32px;
          padding: 6px 10px;
          border-radius: 9px;
          background: #f8fbff;
          border: 1px solid #e4ebf4;
          color: #52617a;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.5;
          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease;
        }

        .major-pill:hover {
          background: #e8f1ff;
          border-color: rgba(36, 85, 196, 0.18);
          color: #2455c4;
        }

        .empty-majors {
          margin-top: 17px;
          padding: 12px;
          border-radius: 10px;
          background: #f8fbff;
          color: #8a96aa;
          font-size: 12px;
          font-weight: 700;
        }

        /* =========================
           Tablet
        ========================= */

        @media (max-width: 850px) {
          .university-header {
            align-items: flex-start;
          }

          .colleges-grid {
            grid-template-columns: 1fr;
          }
        }

        /* =========================
           Mobile
        ========================= */

        @media (max-width: 640px) {
          .colleges-page {
            padding: 14px 0 50px;
          }

          .colleges-container {
            padding: 0 14px;
          }

          .back-link {
            margin-bottom: 20px;
            padding: 8px 12px;
            font-size: 13px;
          }

          .university-header {
            flex-direction: column;
            align-items: center;
            gap: 18px;
            padding: 22px 17px;
            border-radius: 19px;
            text-align: center;
          }

          .university-logo-wrapper {
            width: 100px;
            height: 100px;
          }

          .header-content {
            width: 100%;
          }

          .eyebrow {
            justify-content: center;
          }

          .header-content h1 {
            font-size: 24px;
          }

          .university-description {
            font-size: 14px;
            line-height: 1.8;
          }

          .university-meta {
            justify-content: center;
          }

          .meta-item {
            font-size: 12px;
            padding: 7px 9px;
          }

          .section-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;
          }

          .section-heading h2 {
            font-size: 24px;
          }

          .college-count {
            font-size: 24px;
          }

          .college-card {
            padding: 25px 17px 22px;
            border-radius: 18px;
          }

          .college-card h3 {
            font-size: 17px;
          }

          .major-pill {
            font-size: 11px;
            padding: 5px 8px;
          }
        }

      `}</style>
    </main>
  )
}