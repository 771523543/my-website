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
    <main
      className="university-colleges-page"
      dir="rtl"
    >

      {/* =========================
          Hero
      ========================== */}

      <section className="university-colleges-hero">
        <div className="container">

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
                الدليل الأكاديمي
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
          Colleges Section
      ========================== */}

      <section className="university-colleges-section">

        <div className="container">

          <div className="section-heading">

            <span className="section-kicker">
              الدليل الأكاديمي
            </span>

            <h2>
              كليات وتخصصات {university.name}
            </h2>

            <p>
              تعرّف على الكليات والتخصصات والبرامج
              الأكاديمية المتاحة في الجامعة.
            </p>

          </div>


          {/* =========================
              Colleges Grid
          ========================== */}

          <div className="colleges-grid">

            {university.colleges.map(
              (college, index) => (

                <article
                  key={`${college.name}-${index}`}
                  className="college-card"
                >

                  {/* College Header */}

                  <div className="college-card-header">

                    <div className="college-icon">
                      <GraduationCap size={25} />
                    </div>


                    <div className="college-title">

                      <span>
                        الكلية {index + 1}
                      </span>

                      <h3>
                        {college.name}
                      </h3>

                    </div>

                  </div>


                  <div className="college-divider" />


                  {/* Specialties */}

                  <div className="college-specialties">

                    <div className="specialties-heading">

                      <div>
                        <BookOpen size={18} />

                        <span>
                          التخصصات والبرامج
                        </span>
                      </div>


                      <span className="specialties-count">
                        {college.majors.length} تخصص
                      </span>

                    </div>


                    {college.majors.length > 0 ? (

                      <ul className="majors-list">

                        {college.majors.map(
                          (
                            major,
                            majorIndex
                          ) => (

                            <li
                              key={`${major}-${majorIndex}`}
                            >

                              <span className="major-dot" />

                              <span>
                                {major}
                              </span>

                            </li>

                          )
                        )}

                      </ul>

                    ) : (

                      <p className="no-majors">
                        لا توجد تخصصات مضافة حاليًا.
                      </p>

                    )}

                  </div>

                </article>

              )
            )}

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
              rgba(
                233,
                178,
                76,
                0.16
              ),
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


        /* =========================
           Back Link
        ========================== */

        .back-link {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          margin-bottom: 35px;

          color:
            rgba(
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
            rgba(
              0,
              0,
              0,
              0.16
            );
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

          font-size:
            clamp(
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

          padding:
            8px 12px;

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
          margin:
            8px 0 10px;

          color: #17233d;

          font-size:
            clamp(
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

          gap: 24px;

          max-width: 1050px;

          margin: 0 auto;
        }


        /* =========================
           College Card
        ========================== */

        .college-card {
          position: relative;

          padding: 26px;

          border:
            1px solid #e4ebf4;

          border-radius: 24px;

          background: #fff;

          box-shadow:
            0 8px 28px
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
          transform:
            translateY(-5px);

          border-color:
            rgba(
              36,
              85,
              196,
              0.22
            );

          box-shadow:
            0 18px 45px
            rgba(
              36,
              85,
              196,
              0.10
            );
        }


        /* =========================
           College Header
        ========================== */

        .college-card-header {
          display: flex;

          align-items: center;

          gap: 16px;
        }


        .college-icon {
          width: 58px;
          height: 58px;

          flex: 0 0 58px;

          display: flex;

          align-items: center;

          justify-content: center;

          border-radius: 17px;

          background:
            linear-gradient(
              135deg,
              #e8f1ff,
              #f3f7ff
            );

          color: #2455c4;
        }


        .college-title {
          min-width: 0;
        }


        .college-title > span {
          display: block;

          margin-bottom: 4px;

          color: #697791;

          font-size: 12px;

          font-weight: 700;
        }


        .college-title h3 {
          margin: 0;

          color: #17233d;

          font-size: 19px;

          font-weight: 900;

          line-height: 1.6;
        }


        /* =========================
           Divider
        ========================== */

        .college-divider {
          height: 1px;

          margin:
            22px 0;

          background: #edf1f6;
        }


        /* =========================
           Specialties
        ========================== */

        .college-specialties {
          width: 100%;
        }


        .specialties-heading {
          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 12px;

          margin-bottom: 14px;
        }


        .specialties-heading > div {
          display: flex;

          align-items: center;

          gap: 7px;

          color: #2455c4;

          font-size: 14px;

          font-weight: 900;
        }


        .specialties-count {
          padding:
            5px 9px;

          border-radius: 8px;

          background: #f4f7fb;

          color: #697791;

          font-size: 11px;

          font-weight: 800;

          white-space: nowrap;
        }


        /* =========================
           Majors
        ========================== */

        .majors-list {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 8px;

          margin: 0;

          padding: 0;

          list-style: none;
        }


        .majors-list li {
          display: flex;

          align-items: flex-start;

          gap: 8px;

          min-height: 42px;

          padding:
            9px 10px;

          border:
            1px solid #edf1f6;

          border-radius: 10px;

          background: #fafcff;

          color: #4f5f78;

          font-size: 12px;

          font-weight: 600;

          line-height: 1.7;

          transition:
            background 0.2s ease,
            border-color 0.2s ease;
        }


        .majors-list li:hover {
          background: #f3f7ff;

          border-color:
            rgba(
              36,
              85,
              196,
              0.15
            );
        }


        .major-dot {
          width: 6px;
          height: 6px;

          flex: 0 0 6px;

          margin-top: 8px;

          border-radius: 50%;

          background: #2455c4;
        }


        .no-majors {
          margin: 0;

          padding: 15px;

          border-radius: 12px;

          background: #f8fafc;

          color: #697791;

          font-size: 13px;

          text-align: center;
        }


        /* =========================
           Responsive
        ========================== */

        @media (max-width: 800px) {

          .colleges-grid {
            grid-template-columns: 1fr;

            max-width: 700px;
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

            border-radius: 20px;
          }


          .college-card-header {
            gap: 12px;
          }


          .college-icon {
            width: 50px;
            height: 50px;

            flex-basis: 50px;

            border-radius: 14px;
          }


          .college-title h3 {
            font-size: 17px;
          }


          .majors-list {
            grid-template-columns: 1fr;
          }


          .specialties-heading {
            align-items: flex-start;
          }

        }

      `}</style>

    </main>
  )
}