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

type Props = {
  university: University
}

export default function CollegesContent({
  university,
}: Props) {
  return (
    <main className="colleges-page">
      {/* =========================
          University Header
      ========================= */}
      <section className="university-hero">
        <div className="hero-decoration hero-decoration-one" />
        <div className="hero-decoration hero-decoration-two" />

        <div className="university-hero-inner">
          <Link
            href={`/universities/${university.slug}`}
            className="back-link"
          >
            <ArrowRight size={18} strokeWidth={2.2} />
            <span>العودة إلى صفحة الجامعة</span>
          </Link>

          <div className="university-header">
            <div className="university-logo-wrapper">
              <Image
                src={university.logo}
                alt={`شعار ${university.name}`}
                width={120}
                height={120}
                className="university-logo"
                priority
              />
            </div>

            <div className="university-info">
              <div className="university-label">
                الجامعات السعودية
              </div>

              <h1>{university.name}</h1>

              <p>{university.description}</p>

              <div className="university-meta">
                <span>
                  <MapPin size={16} strokeWidth={2} />
                  {university.city}
                </span>

                <span>
                  <GraduationCap size={16} strokeWidth={2} />
                  تأسست {university.founded}
                </span>

                <span>
                  <BookOpen size={16} strokeWidth={2} />
                  {university.colleges.length} كلية
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Colleges Section
      ========================= */}
      <section className="colleges-content">
        <div className="content-container">
          <div className="section-heading">
            <div className="section-icon">
              <GraduationCap
                size={25}
                strokeWidth={2}
              />
            </div>

            <div>
              <span className="section-kicker">
                التخصصات الأكاديمية
              </span>

              <h2>الكليات والتخصصات</h2>

              <p>
                استعرض الكليات والتخصصات والبرامج الأكاديمية المتاحة
                في {university.name}.
              </p>
            </div>
          </div>

          {university.colleges.length > 0 ? (
            <div className="colleges-grid">
              {university.colleges.map((college, index) => (
                <article
                  key={college.name}
                  className="college-card"
                >
                  <div className="college-number">
                    الكلية {index + 1}
                  </div>

                  <div className="college-icon-wrapper">
                    <GraduationCap
                      size={31}
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3>{college.name}</h3>

                  <div className="gold-divider" />

                  <div className="majors-heading">
                    <BookOpen
                      size={18}
                      strokeWidth={1.9}
                    />
                    <span>التخصصات والبرامج</span>
                  </div>

                  <div className="major-count">
                    {college.majors.length} تخصص
                  </div>

                  {college.majors.length > 0 ? (
                    <div className="majors-list">
                      {college.majors.map((major) => (
                        <span
                          key={major}
                          className="major-pill"
                        >
                          <Sparkles size={13} />
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
          ) : (
            <div className="no-colleges">
              <div className="no-colleges-icon">
                <GraduationCap
                  size={34}
                  strokeWidth={1.8}
                />
              </div>

              <h3>لا توجد كليات مضافة حاليًا</h3>

              <p>
                سيتم إضافة الكليات والتخصصات لهذه الجامعة قريبًا.
              </p>
            </div>
          )}

          {/* =========================
              Student Portal Teaser
          ========================= */}
          <div className="student-portal-box">
            <div className="student-portal-icon">
              <BookOpen
                size={28}
                strokeWidth={1.9}
              />
            </div>

            <div className="student-portal-content">
              <span>خدمات الجامعة</span>

              <h2>هل تبحث عن بوابة الطالب؟</h2>

              <p>
                يمكنك الانتقال إلى بوابة الطالب للوصول إلى الخدمات
                والأنظمة الإلكترونية الخاصة بالجامعة.
              </p>
            </div>

            <Link
              href={`/universities/${university.slug}/student`}
              className="student-portal-link"
            >
              <span>بوابة الطالب</span>
              <ArrowRight
                size={18}
                strokeWidth={2.2}
              />
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .colleges-page {
          width: 100%;
          min-height: 100vh;
          background: #f8fbff;
          direction: rtl;
        }

        /* =========================
           University Hero
        ========================= */

        .university-hero {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 85% 20%,
              rgba(233, 178, 76, 0.12),
              transparent 28%
            ),
            radial-gradient(
              circle at 10% 80%,
              rgba(255, 255, 255, 0.08),
              transparent 30%
            ),
            linear-gradient(
              145deg,
              #173f91 0%,
              #2455c4 52%,
              #163878 100%
            );
          color: #ffffff;
        }

        .university-hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 25px 20px 58px;
          box-sizing: border-box;
        }

        .hero-decoration {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-decoration-one {
          width: 260px;
          height: 260px;
          top: -150px;
          left: -90px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          box-shadow:
            0 0 0 25px rgba(255, 255, 255, 0.025),
            0 0 0 50px rgba(255, 255, 255, 0.018);
        }

        .hero-decoration-two {
          width: 180px;
          height: 180px;
          right: -70px;
          bottom: -90px;
          border: 1px solid rgba(233, 178, 76, 0.16);
          box-shadow:
            0 0 0 20px rgba(233, 178, 76, 0.035),
            0 0 0 40px rgba(233, 178, 76, 0.02);
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 30px;
          padding: 9px 14px;
          color: rgba(255, 255, 255, 0.92);
          background: rgba(255, 255, 255, 0.09);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 10px;
          font-size: 13px;
          font-weight: 750;
          text-decoration: none;
          backdrop-filter: blur(8px);
          transition:
            background 0.2s ease,
            transform 0.2s ease,
            border-color 0.2s ease;
        }

        .back-link:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.24);
          transform: translateX(3px);
        }

        .university-header {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .university-logo-wrapper {
          flex: 0 0 auto;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          background: #f8fbff;
          border: 1px solid #e4ebf4;
          border-radius: 21px;
          box-sizing: border-box;
          overflow: hidden;
          box-shadow:
            0 12px 28px rgba(0, 0, 0, 0.15),
            inset 0 0 0 1px rgba(255, 255, 255, 0.7);
        }

        .university-logo {
          display: block;
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          object-position: center;
        }

        .university-info {
          min-width: 0;
          flex: 1;
        }

        .university-label {
          display: inline-flex;
          align-items: center;
          margin-bottom: 8px;
          color: #f2c96e;
          font-size: 13px;
          font-weight: 800;
        }

        .university-info h1 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(27px, 4vw, 42px);
          line-height: 1.35;
          font-weight: 950;
          letter-spacing: -0.4px;
        }

        .university-info p {
          max-width: 780px;
          margin: 9px 0 16px;
          color: rgba(255, 255, 255, 0.82);
          font-size: 14px;
          line-height: 1.9;
          font-weight: 500;
        }

        .university-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 9px;
        }

        .university-meta span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 11px;
          color: rgba(255, 255, 255, 0.91);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9px;
          font-size: 12px;
          font-weight: 700;
        }

        .university-meta svg {
          color: #f0c56d;
          flex-shrink: 0;
        }

        /* =========================
           Colleges Content
        ========================= */

        .colleges-content {
          background: #f8fbff;
          padding: 58px 0 75px;
        }

        .content-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .section-heading {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
        }

        .section-icon {
          flex: 0 0 auto;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2455c4;
          background: #eaf2ff;
          border: 1px solid #d7e5fb;
          border-radius: 15px;
          box-shadow: 0 7px 18px rgba(36, 85, 196, 0.08);
        }

        .section-kicker {
          display: block;
          margin-bottom: 2px;
          color: #c98b25;
          font-size: 12px;
          font-weight: 850;
        }

        .section-heading h2 {
          margin: 0;
          color: #17233d;
          font-size: clamp(23px, 3vw, 30px);
          line-height: 1.4;
          font-weight: 950;
        }

        .section-heading p {
          margin: 4px 0 0;
          color: #7d899d;
          font-size: 13px;
          line-height: 1.8;
          font-weight: 600;
        }

        /* =========================
           Colleges Grid
        ========================= */

        .colleges-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        /* =========================
           College Card
        ========================= */

        .college-card {
          position: relative;
          overflow: hidden;
          padding: 29px 23px 25px;
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 21px;
          text-align: center;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.13);
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
          background: linear-gradient(
            90deg,
            #2455c4,
            #e9b24c,
            #2455c4
          );
        }

        .college-card:hover {
          transform: translateY(-6px);
          border-color: rgba(233, 178, 76, 0.55);
          box-shadow: 0 19px 42px rgba(0, 0, 0, 0.18);
        }

        .college-icon-wrapper {
          width: 68px;
          height: 68px;
          margin: 0 auto 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #174fae;
          background: radial-gradient(
            circle at 30% 25%,
            #ffffff 0%,
            #edf4ff 30%,
            #d8e8ff 65%,
            #b8d0f3 100%
          );
          border: 4px solid #d5aa54;
          border-radius: 20px;
          box-shadow:
            0 10px 20px rgba(23, 63, 145, 0.14),
            inset 5px 5px 9px rgba(255, 255, 255, 0.8);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .college-card:hover .college-icon-wrapper {
          transform: translateY(-4px) scale(1.04);
          box-shadow:
            0 15px 27px rgba(23, 63, 145, 0.2),
            0 0 0 7px rgba(213, 170, 84, 0.08);
        }

        .college-number {
          margin-bottom: 6px;
          color: #8a96aa;
          font-size: 12px;
          font-weight: 800;
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
          margin: 15px auto 17px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            #c98b25,
            #f0c56d,
            #c98b25
          );
        }

        .majors-heading {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #2455c4;
          font-size: 14px;
          font-weight: 850;
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
          align-items: center;
          gap: 7px;
          margin-top: 17px;
        }

        .major-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          min-height: 32px;
          padding: 6px 10px;
          color: #52617a;
          background: #f8fbff;
          border: 1px solid #e4ebf4;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.5;
          text-align: center;
          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease;
        }

        .major-pill svg {
          color: #c98b25;
          flex-shrink: 0;
        }

        .major-pill:hover {
          color: #2455c4;
          background: #e8f1ff;
          border-color: rgba(36, 85, 196, 0.18);
          transform: translateY(-1px);
        }

        .empty-majors {
          margin-top: 17px;
          padding: 12px;
          color: #8a96aa;
          background: #f8fbff;
          border: 1px solid #e4ebf4;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
        }

        /* =========================
           No Colleges
        ========================= */

        .no-colleges {
          padding: 55px 25px;
          text-align: center;
          background: #ffffff;
          border: 1px solid #e4ebf4;
          border-radius: 21px;
          box-shadow: 0 10px 28px rgba(23, 35, 61, 0.06);
        }

        .no-colleges-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2455c4;
          background: #edf4ff;
          border: 1px solid #dce9fb;
          border-radius: 20px;
        }

        .no-colleges h3 {
          margin: 0 0 7px;
          color: #17233d;
          font-size: 20px;
          font-weight: 900;
        }

        .no-colleges p {
          margin: 0;
          color: #8a96aa;
          font-size: 13px;
          font-weight: 600;
        }

        /* =========================
           Student Portal Box
        ========================= */

        .student-portal-box {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-top: 42px;
          padding: 23px 25px;
          background:
            radial-gradient(
              circle at 95% 20%,
              rgba(233, 178, 76, 0.09),
              transparent 28%
            ),
            #ffffff;
          border: 1px solid #e1e9f4;
          border-radius: 19px;
          box-shadow: 0 10px 28px rgba(23, 35, 61, 0.07);
        }

        .student-portal-icon {
          flex: 0 0 auto;
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2455c4;
          background: #edf4ff;
          border: 1px solid #dce8fa;
          border-radius: 16px;
        }

        .student-portal-content {
          flex: 1;
          min-width: 0;
        }

        .student-portal-content > span {
          display: block;
          margin-bottom: 2px;
          color: #c98b25;
          font-size: 12px;
          font-weight: 850;
        }

        .student-portal-content h2 {
          margin: 0;
          color: #17233d;
          font-size: 19px;
          font-weight: 900;
        }

        .student-portal-content p {
          margin: 4px 0 0;
          color: #7d899d;
          font-size: 12px;
          line-height: 1.8;
          font-weight: 600;
        }

        .student-portal-link {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-width: 145px;
          padding: 11px 17px;
          color: #ffffff;
          background: linear-gradient(
            135deg,
            #2455c4,
            #17479f
          );
          border: 1px solid rgba(36, 85, 196, 0.2);
          border-radius: 11px;
          font-size: 13px;
          font-weight: 850;
          text-decoration: none;
          box-shadow: 0 7px 18px rgba(36, 85, 196, 0.16);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .student-portal-link:hover {
          transform: translateY(-2px);
          background: linear-gradient(
            135deg,
            #2b62d8,
            #17479f
          );
          box-shadow: 0 10px 23px rgba(36, 85, 196, 0.22);
        }

        /* =========================
           Responsive
        ========================= */

        @media (max-width: 980px) {
          .colleges-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .university-header {
            gap: 22px;
          }
        }

        @media (max-width: 720px) {
          .university-hero-inner {
            padding: 18px 15px 42px;
          }

          .back-link {
            margin-bottom: 22px;
            font-size: 12px;
          }

          .university-header {
            align-items: flex-start;
            gap: 17px;
          }

          .university-logo-wrapper {
            width: 94px;
            height: 94px;
            padding: 9px;
            border-radius: 17px;
          }

          .university-info h1 {
            font-size: 25px;
          }

          .university-info p {
            font-size: 12px;
            line-height: 1.8;
          }

          .university-meta {
            gap: 6px;
          }

          .university-meta span {
            padding: 6px 8px;
            font-size: 11px;
          }

          .colleges-content {
            padding: 40px 0 55px;
          }

          .content-container {
            padding: 0 14px;
          }

          .section-heading {
            align-items: flex-start;
            gap: 11px;
            margin-bottom: 24px;
          }

          .section-icon {
            width: 45px;
            height: 45px;
            border-radius: 13px;
          }

          .section-heading h2 {
            font-size: 22px;
          }

          .section-heading p {
            font-size: 12px;
          }

          .colleges-grid {
            grid-template-columns: 1fr;
            gap: 17px;
          }

          .student-portal-box {
            flex-wrap: wrap;
            padding: 19px;
          }

          .student-portal-content {
            flex: 1 1 calc(100% - 80px);
          }

          .student-portal-link {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .university-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .university-info {
            width: 100%;
          }

          .university-info h1 {
            font-size: 23px;
          }

          .university-info p {
            margin-left: auto;
            margin-right: auto;
          }

          .university-meta {
            justify-content: center;
          }

          .college-card {
            padding: 27px 18px 23px;
          }

          .college-card h3 {
            font-size: 18px;
          }

          .major-pill {
            font-size: 11px;
            padding: 6px 9px;
          }

          .student-portal-box {
            gap: 13px;
          }

          .student-portal-icon {
            width: 52px;
            height: 52px;
          }

          .student-portal-content h2 {
            font-size: 17px;
          }
        }
      `}</style>
    </main>
  )
}