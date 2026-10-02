import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  ArrowRight,
  GraduationCap,
  MapPin,
  CalendarDays,
  BookOpen,
} from "lucide-react"

import { universities } from "@/app/components/universities/data"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return universities.map((university) => ({
    slug: university.slug,
  }))
}

export default async function UniversityPage({
  params,
}: Props) {
  const { slug } = await params

  const university = universities.find(
    (item) => item.slug === slug
  )

  if (!university) {
    notFound()
  }

  return (
    <main className="university-details-page" dir="rtl">

      {/* =========================
          University Hero
      ========================== */}

      <section className="university-details-hero">
        <div className="container">

          <Link
            href="/universities"
            className="back-link"
          >
            <ArrowRight size={18} />
            <span>العودة إلى الجامعات</span>
          </Link>

          <div className="university-profile">

            <div className="university-profile-logo">
              <Image
                src={university.logo}
                alt={`شعار ${university.name}`}
                width={130}
                height={130}
              />
            </div>

            <div className="university-profile-content">

              <span className="profile-kicker">
                دليل الجامعة
              </span>

              <h1>
                {university.name}
              </h1>

              <p>
                {university.description}
              </p>

              <div className="profile-meta">

                <span>
                  <CalendarDays size={17} />
                  تأسست {university.founded}
                </span>

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

          </div>

        </div>
      </section>


      {/* =========================
          University Sections
      ========================== */}

      <section className="university-sections">
        <div className="container">

          <div className="section-heading">

            <span className="section-kicker">
              خدمات الجامعة
            </span>

            <h2>
              اختر القسم الذي تريد الوصول إليه
            </h2>

            <p>
              استعرض الكليات والتخصصات أو انتقل إلى
              بوابة الطالب الخاصة بالجامعة.
            </p>

          </div>


          <div className="university-actions">

            {/* Colleges & Majors */}

            <Link
              href={`/universities/${university.slug}/colleges`}
              className="university-action university-action-primary"
            >

              <div className="action-icon">
                <GraduationCap size={30} />
              </div>

              <div className="action-content">

                <h3>
                  الكليات والتخصصات
                </h3>

                <p>
                  استعرض كليات الجامعة والتخصصات
                  والبرامج الأكاديمية المتاحة.
                </p>

              </div>

              <span className="action-arrow">
                <ArrowRight size={20} />
              </span>

            </Link>


            {/* Student Portal */}

            <Link
              href={`/universities/${university.slug}/student`}
              className="university-action university-action-secondary"
            >

              <div className="action-icon">
                <BookOpen size={30} />
              </div>

              <div className="action-content">

                <h3>
                  بوابة الطالب
                </h3>

                <p>
                  الوصول إلى الأدلة والملفات والشروحات
                  والخدمات المهمة للطلاب.
                </p>

              </div>

              <span className="action-arrow">
                <ArrowRight size={20} />
              </span>

            </Link>

          </div>

        </div>
      </section>


      {/* =========================
          Local CSS
      ========================== */}

      <style>{`

        .university-details-page {
          min-height: 100vh;
          background: #f8fbff;
        }


        /* =========================
           Hero
        ========================== */

        .university-details-hero {
          padding: 45px 0 70px;

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

          margin-bottom: 45px;

          color: rgba(255, 255, 255, 0.9);

          text-decoration: none;

          font-size: 14px;
          font-weight: 700;

          transition:
            opacity 0.2s ease;
        }


        .back-link:hover {
          opacity: 0.75;
        }


        .university-profile {
          display: flex;
          align-items: center;

          gap: 35px;

          direction: rtl;
        }


        .university-profile-logo {
          flex: 0 0 150px;

          width: 150px;
          height: 150px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 32px;

          background: #fff;

          box-shadow:
            0 18px 40px
            rgba(0, 0, 0, 0.16);
        }


        .university-profile-logo img {
          width: 120px;
          height: 120px;

          object-fit: contain;
        }


        .university-profile-content {
          flex: 1;
        }


        .profile-kicker {
          display: inline-block;

          margin-bottom: 10px;

          color: #f6d78d;

          font-size: 14px;
          font-weight: 800;
        }


        .university-profile h1 {
          margin: 0;

          color: #fff;

          font-size: clamp(
            32px,
            5vw,
            50px
          );

          font-weight: 900;

          line-height: 1.25;
        }


        .university-profile p {
          max-width: 800px;

          margin: 15px 0 0;

          color: rgba(
            255,
            255,
            255,
            0.88
          );

          font-size: 16px;

          line-height: 2;
        }


        .profile-meta {
          display: flex;
          align-items: center;

          flex-wrap: wrap;

          gap: 10px;

          margin-top: 22px;
        }


        .profile-meta span {
          display: inline-flex;
          align-items: center;

          gap: 7px;

          padding: 9px 13px;

          border-radius: 12px;

          background: rgba(
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
           Sections
        ========================== */

        .university-sections {
          padding: 80px 0;
        }


        .section-heading {
          margin-bottom: 38px;

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
            28px,
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
           University Actions
        ========================== */

        .university-actions {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 20px;

          max-width: 900px;

          margin: 0 auto;
        }


        .university-action {
          position: relative;

          display: flex;
          align-items: center;

          gap: 18px;

          min-height: 150px;

          padding: 25px;

          border-radius: 24px;

          text-decoration: none;

          border: 1px solid;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease,
            background 0.25s ease;
        }


        .university-action:hover {
          transform: translateY(-5px);
        }


        .university-action-primary {
          background: #2455c4;

          border-color: #2455c4;

          color: #fff;

          box-shadow:
            0 12px 30px
            rgba(
              36,
              85,
              196,
              0.16
            );
        }


        .university-action-primary:hover {
          background: #1f4caf;

          border-color: #1f4caf;

          box-shadow:
            0 18px 40px
            rgba(
              36,
              85,
              196,
              0.22
            );
        }


        .university-action-secondary {
          background: #fff;

          border-color: #e4ebf4;

          color: #17233d;

          box-shadow:
            0 10px 30px
            rgba(
              23,
              35,
              61,
              0.06
            );
        }


        .university-action-secondary:hover {
          border-color:
            rgba(
              36,
              85,
              196,
              0.25
            );

          box-shadow:
            0 18px 40px
            rgba(
              36,
              85,
              196,
              0.09
            );
        }


        .action-icon {
          width: 62px;
          height: 62px;

          flex: 0 0 62px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 18px;
        }


        .university-action-primary
        .action-icon {
          background:
            rgba(
              255,
              255,
              255,
              0.14
            );

          color: #fff;
        }


        .university-action-secondary
        .action-icon {
          background: #e8f1ff;

          color: #2455c4;
        }


        .action-content {
          flex: 1;
        }


        .action-content h3 {
          margin: 0 0 7px;

          font-size: 18px;

          font-weight: 900;

          line-height: 1.5;
        }


        .university-action-primary
        .action-content h3 {
          color: #fff;
        }


        .university-action-secondary
        .action-content h3 {
          color: #17233d;
        }


        .action-content p {
          margin: 0;

          font-size: 12px;

          line-height: 1.9;
        }


        .university-action-primary
        .action-content p {
          color:
            rgba(
              255,
              255,
              255,
              0.82
            );
        }


        .university-action-secondary
        .action-content p {
          color: #697791;
        }


        .action-arrow {
          width: 38px;
          height: 38px;

          flex: 0 0 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;
        }


        .university-action-primary
        .action-arrow {
          background:
            rgba(
              255,
              255,
              255,
              0.12
            );

          color: #fff;
        }


        .university-action-secondary
        .action-arrow {
          background: #f4f7fb;

          color: #2455c4;
        }


        /* =========================
           Responsive
        ========================== */

        @media (max-width: 800px) {

          .university-actions {
            grid-template-columns: 1fr;
          }

        }


        @media (max-width: 700px) {

          .university-profile {
            align-items: flex-start;

            flex-direction: column;
          }

        }


        @media (max-width: 480px) {

          .university-details-hero {
            padding:
              40px 0 50px;
          }


          .university-profile-logo {
            width: 125px;
            height: 125px;

            flex-basis: 125px;
          }


          .university-profile-logo img {
            width: 100px;
            height: 100px;
          }


          .university-sections {
            padding: 60px 0;
          }


          .university-action {
            min-height: 135px;

            padding: 20px;

            gap: 12px;
          }


          .action-icon {
            width: 52px;
            height: 52px;

            flex-basis: 52px;

            border-radius: 15px;
          }


          .action-content h3 {
            font-size: 16px;
          }

        }

      `}</style>

    </main>
  )
}