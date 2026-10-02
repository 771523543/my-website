import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  MapPin,
  Sparkles,
} from "lucide-react"

import { universities } from "@/app/components/universities/data"

type PageProps = {
  params: {
    slug: string
  }
}

export default async function CollegesPage({ params }: PageProps) {
  const { slug } = params

  const university = universities.find(
    (item) => item.slug === slug
  )

  if (!university) {
    notFound()
  }

  const totalMajors = university.colleges.reduce(
    (total, college) => total + college.majors.length,
    0
  )

  return (
    <main className="colleges-page">
      <div className="page-container">

        {/* العودة */}
        <Link href="/universities" className="back-link">
          <ArrowRight size={18} />
          <span>العودة إلى الجامعات</span>
        </Link>

        {/* رأس الصفحة */}
        <section className="university-header">

          <div className="university-logo-wrapper">
            <Image
              src={university.logo}
              alt={university.name}
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
                  {university.colleges.length} كلية
                </span>
              </div>

              <div className="meta-item">
                <BookOpen size={17} />
                <span>
                  {totalMajors} تخصص
                </span>
              </div>

            </div>

          </div>

        </section>

        {/* عنوان القسم */}
        <section className="colleges-section">

          <div className="section-heading">

            <div className="heading-icon">
              <GraduationCap size={23} />
            </div>

            <div>
              <h2>كليات الجامعة</h2>

              <p>
                استعرض الكليات والتخصصات والبرامج الأكاديمية المتاحة.
              </p>
            </div>

          </div>

          {/* بطاقات الكليات */}
          <div className="colleges-grid">

            {university.colleges.map((college, index) => (

              <article
                key={college.name}
                className="college-card"
              >

                {/* الأيقونة */}
                <div className="college-icon-wrapper">
                  <GraduationCap
                    size={32}
                    strokeWidth={1.8}
                  />
                </div>

                {/* رقم الكلية */}
                <span className="college-number">
                  الكلية {index + 1}
                </span>

                {/* اسم الكلية */}
                <h3>{college.name}</h3>

                <div className="gold-divider" />

                {/* عنوان التخصصات */}
                <div className="majors-title">
                  <BookOpen size={18} />
                  <span>التخصصات والبرامج</span>
                </div>

                {/* عدد التخصصات */}
                <div className="major-count">
                  {college.majors.length} تخصص
                </div>

                {/* التخصصات */}
                {college.majors.length > 0 ? (

                  <div className="majors-list">

                    {college.majors.map((major) => (

                      <div
                        key={major}
                        className="major-item"
                      >
                        <Sparkles size={14} />
                        <span>{major}</span>
                      </div>

                    ))}

                  </div>

                ) : (

                  <div className="no-majors">
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
          background: #f8fbff;
          padding: 25px 0 70px;
        }

        .page-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          box-sizing: border-box;
        }

        /* العودة */

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #2455c4;
          background: #ffffff;
          border: 1px solid #e4ebf4;
          border-radius: 12px;
          padding: 10px 15px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(23, 35, 61, 0.05);
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
          box-shadow: 0 7px 20px rgba(36, 85, 196, 0.14);
        }

        /* رأس الجامعة */

        .university-header {
          margin-top: 25px;
          background: #ffffff;
          border: 1px solid #e4ebf4;
          border-radius: 22px;
          padding: 30px;
          display: flex;
          align-items: center;
          gap: 28px;
          box-shadow: 0 8px 30px rgba(23, 35, 61, 0.06);
        }

        .university-logo-wrapper {
          flex: 0 0 120px;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fbff;
          border: 1px solid #e4ebf4;
          border-radius: 20px;
          padding: 10px;
          box-sizing: border-box;
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
          margin-bottom: 8px;
        }

        .header-content h1 {
          margin: 0;
          color: #17233d;
          font-size: clamp(24px, 4vw, 36px);
          line-height: 1.35;
          font-weight: 900;
        }

        .university-description {
          margin: 10px 0 18px;
          color: #697791;
          font-size: 15px;
          line-height: 1.9;
          max-width: 850px;
        }

        .university-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          background: #edf3fa;
          border-radius: 10px;
          color: #53627b;
          font-size: 13px;
          font-weight: 700;
        }

        .meta-item svg {
          color: #2455c4;
        }

        /* قسم الكليات */

        .colleges-section {
          margin-top: 42px;
        }

        .section-heading {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
        }

        .heading-icon {
          width: 48px;
          height: 48px;
          flex: 0 0 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2455c4;
          color: #ffffff;
          box-shadow: 0 8px 18px rgba(36, 85, 196, 0.15);
        }

        .section-heading h2 {
          margin: 0;
          color: #17233d;
          font-size: 25px;
          font-weight: 900;
        }

        .section-heading p {
          margin: 4px 0 0;
          color: #697791;
          font-size: 14px;
          line-height: 1.7;
        }

        /* شبكة الكليات */

        .colleges-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        /* بطاقة الكلية */

        .college-card {
          background: #ffffff;
          border: 1px solid #e4ebf4;
          border-radius: 20px;
          padding: 26px 22px;
          text-align: center;
          box-shadow: 0 7px 25px rgba(23, 35, 61, 0.05);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .college-card:hover {
          transform: translateY(-4px);
          border-color: rgba(36, 85, 196, 0.2);
          box-shadow: 0 14px 35px rgba(23, 35, 61, 0.09);
        }

        .college-icon-wrapper {
          width: 66px;
          height: 66px;
          margin: 0 auto 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          background: #e8f1ff;
          color: #2455c4;
        }

        .college-number {
          display: block;
          color: #697791;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .college-card h3 {
          margin: 0;
          color: #17233d;
          font-size: 20px;
          line-height: 1.6;
          font-weight: 900;
        }

        .gold-divider {
          width: 48px;
          height: 3px;
          margin: 15px auto;
          border-radius: 999px;
          background: #e9b24c;
        }

        .majors-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #2455c4;
          font-size: 14px;
          font-weight: 800;
        }

        .major-count {
          margin-top: 6px;
          color: #697791;
          font-size: 12px;
          font-weight: 700;
        }

        /* التخصصات */

        .majors-list {
          margin-top: 16px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        .major-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          min-height: 34px;
          padding: 7px 11px;
          box-sizing: border-box;
          border: 1px solid #e4ebf4;
          border-radius: 10px;
          background: #f8fbff;
          color: #53627b;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.5;
        }

        .major-item svg {
          flex: 0 0 auto;
          color: #e9b24c;
        }

        .no-majors {
          margin-top: 16px;
          padding: 12px;
          border-radius: 10px;
          background: #f8fbff;
          color: #697791;
          font-size: 13px;
        }

        /* الأجهزة اللوحية */

        @media (max-width: 900px) {

          .university-header {
            padding: 24px;
          }

          .colleges-grid {
            grid-template-columns: 1fr;
          }

        }

        /* الجوال */

        @media (max-width: 640px) {

          .colleges-page {
            padding-top: 18px;
          }

          .page-container {
            padding: 0 14px;
          }

          .back-link {
            font-size: 13px;
            padding: 9px 12px;
          }

          .university-header {
            margin-top: 18px;
            padding: 20px;
            border-radius: 18px;
            flex-direction: column;
            text-align: center;
          }

          .university-logo-wrapper {
            width: 100px;
            height: 100px;
            flex-basis: 100px;
          }

          .university-description {
            font-size: 14px;
          }

          .university-meta {
            justify-content: center;
          }

          .meta-item {
            font-size: 12px;
          }

          .colleges-section {
            margin-top: 32px;
          }

          .section-heading {
            align-items: flex-start;
          }

          .heading-icon {
            width: 43px;
            height: 43px;
            flex-basis: 43px;
          }

          .section-heading h2 {
            font-size: 21px;
          }

          .section-heading p {
            font-size: 13px;
          }

          .college-card {
            padding: 23px 16px;
            border-radius: 17px;
          }

          .college-card h3 {
            font-size: 18px;
          }

          .major-item {
            width: 100%;
          }

        }

      `}</style>
    </main>
  )
}