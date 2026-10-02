import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  MapPin,
} from "lucide-react"

import { universities } from "@/app/components/universities/data"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return universities.map((university) => ({
    slug: university.slug,
  }))
}

export default async function UniversityCollegesPage({
  params,
}: PageProps) {
  const { slug } = await params

  const university = universities.find(
    (item) => item.slug === slug
  )

  if (!university) {
    notFound()
  }

  return (
    <main className="university-colleges-page" dir="rtl">
      {/* Hero */}
      <section className="university-colleges-hero">
        <div className="container">

          <Link
            href={`/universities/${university.slug}`}
            className="back-link"
          >
            <ArrowRight size={18} />
            <span>العودة إلى الجامعة</span>
          </Link>

          <div className="university-hero-content">

            <div className="university-logo">
              <Image
                src={university.logo}
                alt={`شعار ${university.name}`}
                width={110}
                height={110}
              />
            </div>

            <div>
              <span className="hero-kicker">
                دليل الجامعة
              </span>

              <h1>
                الكليات والتخصصات
              </h1>

              <p>
                {university.name}
              </p>
            </div>

          </div>

          <div className="university-info">

            <span>
              <MapPin size={17} />
              {university.city}
            </span>

            <span>
              <GraduationCap size={17} />
              {university.colleges.length} كلية
            </span>

          </div>

        </div>
      </section>

      {/* Colleges */}
      <section className="colleges-section">
        <div className="container">

          <div className="section-heading">
            <span>الكليات</span>

            <h2>
              كليات وتخصصات {university.name}
            </h2>

            <p>
              استعرض الكليات والتخصصات المتاحة في الجامعة.
            </p>
          </div>

          <div className="colleges-grid">

            {university.colleges.map((college, index) => (
              <article
                key={college.name}
                className="college-card"
              >

                <div className="college-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="college-icon">
                  <GraduationCap size={24} />
                </div>

                <div className="college-content">

                  <h3>
                    {college.name}
                  </h3>

                  <div className="majors-title">
                    <BookOpen size={17} />
                    <span>التخصصات</span>
                  </div>

                  {college.majors?.length > 0 ? (
                    <ul className="majors-list">
                      {college.majors.map((major) => (
                        <li key={major}>
                          {major}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-majors">
                      سيتم إضافة التخصصات قريبًا.
                    </p>
                  )}

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

      <style>{`
        .university-colleges-page {
          min-height: 100vh;
          background: #f8fbff;
        }

        .university-colleges-hero {
          padding: 35px 0 60px;
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(233, 178, 76, 0.16),
              transparent 25%
            ),
            linear-gradient(
              135deg,
              #2455c4,
              #1f4caf,
              #183d91
            );
          color: #ffffff;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 35px;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          transition: opacity 0.2s ease;
        }

        .back-link:hover {
          opacity: 0.75;
        }

        .university-hero-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 25px;
          text-align: right;
        }

        .university-logo {
          width: 110px;
          height: 110px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border-radius: 22px;
          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.14);
        }

        .university-logo img {
          width: 88px;
          height: 88px;
          object-fit: contain;
        }

        .hero-kicker {
          display: block;
          margin-bottom: 7px;
          color: #f6d78d;
          font-size: 14px;
          font-weight: 800;
        }

        .university-hero h1 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(30px, 5vw, 46px);
          font-weight: 900;
          line-height: 1.3;
        }

        .university-hero p {
          margin: 8px 0 0;
          color: rgba(255, 255, 255, 0.88);
          font-size: 16px;
          line-height: 1.8;
        }

        .university-info {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 30px;
        }

        .university-info span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 13px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 12px;
          font-weight: 700;
        }

        .colleges-section {
          padding: 75px 0;
        }

        .section-heading {
          margin-bottom: 38px;
          text-align: center;
        }

        .section-heading > span {
          color: #2455c4;
          font-size: 14px;
          font-weight: 800;
        }

        .section-heading h2 {
          margin: 8px 0 10px;
          color: #17233d;
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 900;
          line-height: 1.5;
        }

        .section-heading p {
          margin: 0 auto;
          max-width: 650px;
          color: #697791;
          line-height: 1.9;
        }

        .colleges-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .college-card {
          position: relative;
          display: flex;
          gap: 16px;
          min-width: 0;
          padding: 24px;
          overflow: hidden;
          background: #ffffff;
          border: 1px solid #e4ebf4;
          border-radius: 22px;
          box-shadow:
            0 10px 30px
            rgba(23, 35, 61, 0.055);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .college-card:hover {
          transform: translateY(-4px);
          border-color:
            rgba(36, 85, 196, 0.2);
          box-shadow:
            0 18px 40px
            rgba(36, 85, 196, 0.09);
        }

        .college-number {
          position: absolute;
          top: 15px;
          left: 18px;
          color: #dce5f3;
          font-size: 25px;
          font-weight: 900;
        }

        .college-icon {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          background: #e8f1ff;
          color: #2455c4;
        }

        .college-content {
          min-width: 0;
          flex: 1;
        }

        .college-content h3 {
          margin: 0 35px 15px 0;
          color: #17233d;
          font-size: 18px;
          font-weight: 900;
          line-height: 1.7;
        }

        .majors-title {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
          color: #2455c4;
          font-size: 13px;
          font-weight: 800;
        }

        .majors-list {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .majors-list li {
          padding: 6px 9px;
          border-radius: 9px;
          background: #f4f7fb;
          color: #52617a;
          font-size: 11px;
          font-weight: 600;
          line-height: 1.6;
        }

        .no-majors {
          margin: 0;
          color: #697791;
          font-size: 12px;
        }

        @media (max-width: 800px) {
          .colleges-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .university-colleges-hero {
            padding: 28px 0 50px;
          }

          .university-hero-content {
            flex-direction: column;
            text-align: center;
          }

          .university-hero h1 {
            font-size: 30px;
          }

          .university-hero p {
            font-size: 14px;
          }

          .colleges-section {
            padding: 55px 0;
          }

          .college-card {
            padding: 20px;
          }
        }

        @media (max-width: 420px) {
          .college-card {
            flex-direction: column;
          }

          .college-icon {
            width: 46px;
            height: 46px;
          }
        }
      `}</style>
    </main>
  )
}