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

      {/* =========================
          Hero
      ========================== */}

      <section className="university-colleges-hero">
        <div className="container">

          {/* العودة إلى قائمة الجامعات */}

          <Link
            href="/universities"
            className="back-link"
          >
            <ArrowRight size={18} />
            <span>العودة إلى الجامعات</span>
          </Link>

          <div className="colleges-hero-content">

            <div className="university-logo">
              <Image
                src={university.logo}
                alt={`شعار ${university.name}`}
                width={110}
                height={110}
              />
            </div>

            <div className="hero-text">

              <span className="hero-kicker">
                دليل الجامعة
              </span>

              <h1>
                الكليات والتخصصات
              </h1>

              <p>
                {university.name}
              </p>

              <div className="hero-meta">

                <span>
                  <MapPin size={16} />
                  {university.city}
                </span>

                <span>
                  <GraduationCap size={16} />
                  {university.colleges.length} كلية
                </span>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =========================
          Colleges
      ========================== */}

      <section className="university-colleges-section">
        <div className="container">

          <div className="section-heading">

            <span className="section-kicker">
              الكليات والتخصصات
            </span>

            <h2>
              كليات وتخصصات {university.name}
            </h2>

            <p>
              استعرض الكليات والبرامج والتخصصات الأكاديمية
              المتاحة في الجامعة.
            </p>

          </div>


          <div className="colleges-grid">

            {university.colleges.map((college, index) => (

              <article
                key={`${college.name}-${index}`}
                className="college-card"
              >

                <div className="college-icon">
                  <BookOpen size={24} />
                </div>

                <div className="college-content">

                  <h3>
                    {college.name}
                  </h3>

                  {college.majors.length > 0 && (
                    <div className="majors">

                      <span className="majors-title">
                        التخصصات:
                      </span>

                      <ul>
                        {college.majors.map(
                          (major, majorIndex) => (
                            <li key={`${major}-${majorIndex}`}>
                              {major}
                            </li>
                          )
                        )}
                      </ul>

                    </div>
                  )}

                </div>

              </article>

            ))}

          </div>

        </div>
      </section>


      {/* =========================
          Local CSS
      ========================== */}

      <style>{`

        .university-colleges-page {
          min-height: 100vh;
          background: #f8fbff;
        }


        /* =========================
           Hero
        ========================== */

        .university-colleges-hero {
          padding: 35px 0 65px;

          background:
            radial-gradient(
              circle at 15% 15%,
              rgba(233, 178, 76, 0.16),
              transparent 25%
            ),
            linear-gradient(
              135deg,
              #2455c4,
              #1f4caf,
              #183d91
            );

          color: #fff;
        }


        .back-link {
          display: inline-flex;
          align-items: center;

          gap: 8px;

          margin-bottom: 35px;

          color: rgba(
            255,
            255,
            255,
            0.92
          );

          text-decoration: none;

          font-size: 14px;
          font-weight: 700;

          transition:
            opacity 0.2s ease;
        }


        .back-link:hover {
          opacity: 0.75;
        }


        /* =========================
           Hero Content
        ========================== */

        .colleges-hero-content {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 25px;

          text-align: right;
        }


        .university-logo {
          width: 125px;
          height: 125px;

          flex: 0 0 125px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 28px;

          background: #fff;

          box-shadow:
            0 18px 40px
            rgba(0, 0, 0, 0.16);
        }


        .university-logo img {
          width: 100px;
          height: 100px;

          object-fit: contain;
        }


        .hero-text {
          display: flex;

          flex-direction: column;

          align-items: flex-start;
        }


        .hero-kicker {
          margin-bottom: 8px;

          color: #f6d78d;

          font-size: 14px;
          font-weight: 800;
        }


        .hero-text h1 {
          margin: 0;

          color: #fff;

          font-size: clamp(
            30px,
            5vw,
            48px
          );

          font-weight: 900;

          line-height: 1.3;
        }


        .hero-text p {
          margin: 8px 0 0;

          color:
            rgba(
              255,
              255,
              255,
              0.88
            );

          font-size: 17px;

          font-weight: 700;
        }


        .hero-meta {
          display: flex;

          align-items: center;

          flex-wrap: wrap;

          gap: 10px;

          margin-top: 18px;
        }


        .hero-meta span {
          display: inline-flex;

          align-items: center;

          gap: 7px;

          padding: 8px 12px;

          border-radius: 12px;

          background:
            rgba(
              255,
              255,
              255,
              0.11
            );

          color: #fff;

          font-size: 13px;

          font-weight: 700;
        }


        /* =========================
           Section
        ========================== */

        .university-colleges-section {
          padding: 75px 0;
        }


        .section-heading {
          margin-bottom: 40px;

          text-align: center;
        }


        .section-kicker {
          color: #2455c4;

          font-size: 14px;

          font-weight: 800;
        }


        .section-heading h2 {
          margin: 8px 0 10px;

          color: #17233d;

          font-size: clamp(
            27px,
            4vw,
            40px
          );

          font-weight: 900;

          line-height: 1.5;
        }


        .section-heading p {
          max-width: 650px;

          margin: 0 auto;

          color: #697791;

          line-height: 1.9;
        }


        /* =========================
           Colleges Grid
        ========================== */

        .colleges-grid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 20px;
        }


        .college-card {
          display: flex;

          align-items: flex-start;

          gap: 18px;

          padding: 25px;

          border: 1px solid #e4ebf4;

          border-radius: 22px;

          background: #fff;

          box-shadow:
            0 10px 30px
            rgba(
              23,
              35,
              61,
              0.05
            );

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }


        .college-card:hover {
          transform: translateY(-4px);

          border-color:
            rgba(
              36,
              85,
              196,
              0.2
            );

          box-shadow:
            0 18px 40px
            rgba(
              36,
              85,
              196,
              0.08
            );
        }


        .college-icon {
          width: 55px;
          height: 55px;

          flex: 0 0 55px;

          display: flex;

          align-items: center;
          justify-content: center;

          border-radius: 16px;

          background: #e8f1ff;

          color: #2455c4;
        }


        .college-content {
          flex: 1;
        }


        .college-content h3 {
          margin: 0;

          color: #17233d;

          font-size: 18px;

          font-weight: 900;

          line-height: 1.6;
        }


        .majors {
          margin-top: 12px;
        }


        .majors-title {
          display: block;

          margin-bottom: 6px;

          color: #2455c4;

          font-size: 13px;

          font-weight: 800;
        }


        .majors ul {
          display: flex;

          flex-wrap: wrap;

          gap: 6px;

          margin: 0;

          padding: 0;

          list-style: none;
        }


        .majors li {
          padding: 5px 9px;

          border-radius: 8px;

          background: #f4f7fb;

          color: #697791;

          font-size: 12px;

          line-height: 1.6;
        }


        /* =========================
           Responsive
        ========================== */

        @media (max-width: 800px) {

          .colleges-grid {
            grid-template-columns: 1fr;
          }

        }


        @media (max-width: 600px) {

          .university-colleges-hero {
            padding:
              30px 0 55px;
          }


          .colleges-hero-content {
            flex-direction: column;

            text-align: center;
          }


          .hero-text {
            align-items: center;
          }


          .university-logo {
            width: 115px;
            height: 115px;

            flex-basis: 115px;
          }


          .university-logo img {
            width: 90px;
            height: 90px;
          }


          .hero-text h1 {
            font-size: 30px;
          }


          .hero-text p {
            font-size: 15px;
          }


          .hero-meta {
            justify-content: center;
          }


          .university-colleges-section {
            padding: 60px 0;
          }


          .college-card {
            padding: 20px;

            gap: 12px;
          }


          .college-icon {
            width: 48px;
            height: 48px;

            flex-basis: 48px;

            border-radius: 14px;
          }


          .college-content h3 {
            font-size: 16px;
          }

        }

      `}</style>

    </main>
  )
}