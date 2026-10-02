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
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return universities.map((university) => ({
    slug: university.slug,
  }))
}

export default async function CollegesPage({
  params,
}: PageProps) {
  const { slug } = await params

  const university = universities.find(
    (item) => item.slug === slug
  )

  if (!university) {
    notFound()
  }

  const totalColleges = university.colleges.length

  const totalMajors = university.colleges.reduce(
    (total, college) => total + college.majors.length,
    0
  )

  return (
    <main className="colleges-page">
      <div className="colleges-container">

        {/* العودة */}
        <div className="back-area">
          <Link
            href="/universities"
            className="back-link"
          >
            <ArrowRight size={18} />
            <span>العودة إلى الجامعات</span>
          </Link>
        </div>

        {/* رأس الصفحة */}
        <header className="page-header">

          <div className="university-logo">
            <Image
              src={university.logo}
              alt={university.name}
              width={90}
              height={90}
              priority
            />
          </div>

          <div className="header-content">

            <span className="eyebrow">
              <GraduationCap size={16} />
              الكليات والتخصصات
            </span>

            <h1>{university.name}</h1>

            <p>
              استعرض الكليات والتخصصات والبرامج الأكاديمية
              المتاحة في الجامعة.
            </p>

            <div className="university-meta">

              <div className="meta-item">
                <MapPin size={17} />
                <span>{university.city}</span>
              </div>

              <div className="meta-item">
                <BookOpen size={17} />
                <span>
                  {totalColleges} كلية
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

        </header>

        {/* عنوان الكليات */}
        <section className="colleges-section">

          <div className="section-heading">

            <span className="section-icon">
              <GraduationCap size={24} />
            </span>

            <div>
              <h2>كليات الجامعة</h2>

              <p>
                اختر الكلية للاطلاع على التخصصات والبرامج
                الأكاديمية المتاحة.
              </p>
            </div>

          </div>

          {/* بطاقات الكليات */}
          <div className="colleges-grid">

            {university.colleges.map((college, index) => (

              <article
                key={`${university.slug}-${college.name}`}
                className="college-card"
              >

                {/* أيقونة الكلية */}
                <div className="college-icon">
                  <GraduationCap size={30} />
                </div>

                {/* رقم الكلية */}
                <span className="college-number">
                  الكلية {index + 1}
                </span>

                {/* اسم الكلية */}
                <h3>{college.name}</h3>

                <div className="card-divider" />

                {/* عنوان التخصصات */}
                <div className="majors-title">
                  <BookOpen size={17} />
                  <span>التخصصات والبرامج</span>
                </div>

                {/* عدد التخصصات */}
                <div className="majors-count">
                  {college.majors.length > 0
                    ? `${college.majors.length} تخصص`
                    : "لا توجد تخصصات مضافة"}
                </div>

                {/* التخصصات */}
                {college.majors.length > 0 ? (
                  <div className="majors-list">

                    {college.majors.map((major) => (
                      <div
                        key={major}
                        className="major-item"
                      >
                        <span className="major-dot" />
                        <span>{major}</span>
                      </div>
                    ))}

                  </div>
                ) : (
                  <div className="empty-majors">
                    سيتم إضافة التخصصات قريبًا
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
          padding: 30px 20px 80px;
          background:
            linear-gradient(
              180deg,
              #f8fbff 0%,
              #ffffff 45%,
              #f8fbff 100%
            );
          direction: rtl;
        }

        .colleges-container {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
        }

        /* =========================
           Back
        ========================= */

        .back-area {
          margin-bottom: 28px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          padding: 10px 16px;

          border: 1px solid #e4ebf4;
          border-radius: 12px;

          background: #ffffff;
          color: #2455c4;

          font-size: 14px;
          font-weight: 700;

          text-decoration: none;

          box-shadow:
            0 4px 16px rgba(23, 35, 61, 0.05);

          transition:
            transform 0.2s ease,
            background 0.2s ease,
            color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .back-link:hover {
          background: #2455c4;
          color: #ffffff;

          transform: translateX(3px);

          box-shadow:
            0 8px 22px rgba(36, 85, 196, 0.15);
        }

        /* =========================
           Header
        ========================= */

        .page-header {
          display: flex;
          align-items: center;
          gap: 28px;

          padding: 34px;

          margin-bottom: 45px;

          border: 1px solid #e4ebf4;
          border-radius: 24px;

          background: #ffffff;

          box-shadow:
            0 12px 35px rgba(23, 35, 61, 0.06);
        }

        .university-logo {
          width: 120px;
          height: 120px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 22px;

          background:
            linear-gradient(
              145deg,
              #f4f8ff,
              #ffffff
            );

          border: 1px solid #e4ebf4;

          box-shadow:
            0 8px 22px rgba(36, 85, 196, 0.08);
        }

        .university-logo img {
          object-fit: contain;
        }

        .header-content {
          flex: 1;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          margin-bottom: 10px;

          color: #2455c4;

          font-size: 14px;
          font-weight: 800;
        }

        .header-content h1 {
          margin: 0 0 10px;

          color: #17233d;

          font-size: clamp(25px, 4vw, 36px);
          line-height: 1.35;

          font-weight: 900;
        }

        .header-content p {
          margin: 0;

          max-width: 720px;

          color: #697791;

          font-size: 15px;
          line-height: 1.9;
        }

        .university-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 10px;

          margin-top: 20px;
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          padding: 8px 12px;

          border-radius: 10px;

          background: #f4f7fb;

          color: #596982;

          font-size: 13px;
          font-weight: 700;
        }

        .meta-item svg {
          color: #2455c4;
        }

        /* =========================
           Section heading
        ========================= */

        .colleges-section {
          margin-top: 10px;
        }

        .section-heading {
          display: flex;
          align-items: center;
          gap: 14px;

          margin-bottom: 25px;
        }

        .section-icon {
          width: 52px;
          height: 52px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 15px;

          background: #2455c4;
          color: #ffffff;

          box-shadow:
            0 8px 18px rgba(36, 85, 196, 0.18);
        }

        .section-heading h2 {
          margin: 0 0 4px;

          color: #17233d;

          font-size: 24px;
          font-weight: 900;
        }

        .section-heading p {
          margin: 0;

          color: #697791;

          font-size: 14px;
          line-height: 1.7;
        }

        /* =========================
           Colleges Grid
        ========================= */

        .colleges-grid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 22px;
        }

        /* =========================
           College Card
        ========================= */

        .college-card {
          position: relative;

          display: flex;
          flex-direction: column;
          align-items: center;

          padding: 30px 24px 26px;

          min-height: 390px;

          text-align: center;

          border: 1px solid #e4ebf4;
          border-radius: 22px;

          background: #ffffff;

          box-shadow:
            0 8px 28px rgba(23, 35, 61, 0.05);

          overflow: hidden;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .college-card::before {
          content: "";

          position: absolute;

          top: 0;
          right: 0;
          left: 0;

          height: 4px;

          background:
            linear-gradient(
              90deg,
              #2455c4,
              #4d78d8,
              #e9b24c
            );

          opacity: 0.9;
        }

        .college-card:hover {
          transform: translateY(-5px);

          border-color: rgba(36, 85, 196, 0.18);

          box-shadow:
            0 16px 38px rgba(23, 35, 61, 0.09);
        }

        /* =========================
           College Icon
        ========================= */

        .college-icon {
          width: 72px;
          height: 72px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-bottom: 14px;

          border-radius: 20px;

          background:
            linear-gradient(
              145deg,
              #edf4ff,
              #f8fbff
            );

          color: #2455c4;

          border: 1px solid #dce8f8;

          box-shadow:
            0 8px 20px rgba(36, 85, 196, 0.08);
        }

        .college-number {
          margin-bottom: 8px;

          color: #8a96aa;

          font-size: 12px;
          font-weight: 800;
        }

        .college-card h3 {
          margin: 0;

          color: #17233d;

          font-size: 20px;
          line-height: 1.6;

          font-weight: 900;
        }

        .card-divider {
          width: 55px;
          height: 2px;

          margin: 18px auto;

          border-radius: 20px;

          background: #e9b24c;
        }

        /* =========================
           Majors Header
        ========================= */

        .majors-title {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          color: #2455c4;

          font-size: 14px;
          font-weight: 800;
        }

        .majors-count {
          margin-top: 7px;

          color: #697791;

          font-size: 12px;
          font-weight: 700;
        }

        /* =========================
           Majors
        ========================= */

        .majors-list {
          width: 100%;

          display: flex;
          flex-wrap: wrap;

          align-items: center;
          justify-content: center;

          gap: 8px;

          margin-top: 18px;
        }

        .major-item {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          min-height: 38px;

          padding: 7px 12px;

          border: 1px solid #e5ebf3;
          border-radius: 10px;

          background: #f9fbfe;

          color: #46566f;

          font-size: 12px;
          line-height: 1.5;

          font-weight: 700;

          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease;
        }

        .major-item:hover {
          background: #edf4ff;

          border-color: #cbdcf5;

          color: #2455c4;
        }

        .major-dot {
          width: 6px;
          height: 6px;

          flex-shrink: 0;

          border-radius: 50%;

          background: #e9b24c;
        }

        .empty-majors {
          margin-top: 18px;

          padding: 12px 16px;

          border-radius: 10px;

          background: #f7f9fc;

          color: #7a879a;

          font-size: 12px;
          font-weight: 700;
        }

        /* =========================
           Tablet
        ========================= */

        @media (max-width: 800px) {

          .colleges-grid {
            grid-template-columns: 1fr;
          }

          .page-header {
            padding: 26px;

            gap: 20px;
          }

          .university-logo {
            width: 100px;
            height: 100px;
          }

        }

        /* =========================
           Mobile
        ========================= */

        @media (max-width: 600px) {

          .colleges-page {
            padding:
              20px
              12px
              60px;
          }

          .back-area {
            margin-bottom: 20px;
          }

          .back-link {
            padding: 9px 13px;

            font-size: 13px;
          }

          .page-header {
            flex-direction: column;

            text-align: center;

            padding: 25px 18px;

            border-radius: 20px;
          }

          .university-logo {
            width: 90px;
            height: 90px;

            border-radius: 18px;
          }

          .header-content {
            width: 100%;
          }

          .header-content h1 {
            font-size: 24px;
          }

          .header-content p {
            font-size: 13px;
          }

          .university-meta {
            justify-content: center;
          }

          .meta-item {
            font-size: 12px;
          }

          .section-heading {
            flex-direction: column;

            text-align: center;
          }

          .section-heading h2 {
            font-size: 21px;
          }

          .section-heading p {
            font-size: 13px;
          }

          .college-card {
            min-height: auto;

            padding:
              28px
              16px
              24px;

            border-radius: 19px;
          }

          .college-card h3 {
            font-size: 18px;
          }

          .college-icon {
            width: 66px;
            height: 66px;
          }

          .major-item {
            font-size: 11px;

            padding:
              7px
              10px;
          }

        }

      `}</style>
    </main>
  )
}