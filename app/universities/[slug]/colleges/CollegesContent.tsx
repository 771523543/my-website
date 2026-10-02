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

        {/* =========================
            معلومات الجامعة
        ========================= */}

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

        {/* =========================
            عنوان الكليات
        ========================= */}

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

          {/* =========================
              بطاقات الكليات
          ========================= */}

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

                {/* أيقونة الكلية */}
                <div className="college-icon-wrapper">
                  <GraduationCap
                    size={31}
                    strokeWidth={1.8}
                  />
                </div>

                {/* اسم الكلية */}
                <h3>{college.name}</h3>

                {/* الفاصل الذهبي */}
                <div className="gold-divider" />

                {/* عنوان التخصصات */}
                <div className="majors-heading">
                  <BookOpen
                    size={18}
                    strokeWidth={1.9}
                  />

                  <span>
                    التخصصات والبرامج
                  </span>
                </div>

                {/* عدد التخصصات */}
                <div className="major-count">
                  {college.majors.length} تخصص
                </div>

                {/* التخصصات */}
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

        </section>

      </div>

      <style jsx>{`

        /* =================================
           الصفحة
        ================================= */

        .colleges-page {
          min-height: 100vh;

          padding:
            24px 0 75px;

          direction: rtl;

          background:
            linear-gradient(
              145deg,
              #173f91 0%,
              #2455c4 52%,
              #163878 100%
            );

          position: relative;

          overflow: hidden;
        }

        .colleges-page::before {
          content: "";

          position: absolute;

          width: 520px;
          height: 520px;

          top: -350px;
          left: -170px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,0.14),
              transparent 68%
            );

          pointer-events: none;
        }

        .colleges-page::after {
          content: "";

          position: absolute;

          width: 420px;
          height: 420px;

          right: -250px;
          bottom: -280px;

          border:
            1px solid
            rgba(233,178,76,0.25);

          border-radius: 50%;

          pointer-events: none;
        }

        .colleges-container {
          position: relative;

          z-index: 2;

          width: 100%;
          max-width: 1200px;

          margin: 0 auto;

          padding:
            0 20px;

          box-sizing: border-box;
        }

        /* =================================
           العودة
        ================================= */

        .back-link {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          margin-bottom: 25px;

          padding:
            9px 15px;

          color: #173f91;

          background: #ffffff;

          border:
            1px solid
            rgba(213,170,84,0.35);

          border-radius: 11px;

          font-size: 14px;

          font-weight: 800;

          text-decoration: none;

          box-shadow:
            0 7px 20px
            rgba(0,0,0,0.12);

          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .back-link:hover {
          background: #fff8e8;

          transform:
            translateX(2px);

          box-shadow:
            0 10px 25px
            rgba(0,0,0,0.16);
        }

        /* =================================
           معلومات الجامعة
        ================================= */

        .university-header {
          display: flex;

          align-items: center;

          gap: 30px;

          padding: 30px;

          margin-bottom: 40px;

          background:
            rgba(255,255,255,0.98);

          border:
            1px solid
            rgba(255,255,255,0.55);

          border-radius: 24px;

          box-shadow:
            0 18px 45px
            rgba(0,0,0,0.16);
        }

        .university-logo-wrapper {
          flex: 0 0 auto;

          width: 120px;
          height: 120px;

          display: flex;

          align-items: center;
          justify-content: center;

          padding: 9px;

          background:
            #f8fbff;

          border:
            1px solid
            #e4ebf4;

          border-radius: 21px;

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

          margin-bottom: 9px;

          color: #2455c4;

          font-size: 14px;

          font-weight: 850;
        }

        .header-content h1 {
          margin: 0;

          color: #17233d;

          font-size:
            clamp(25px, 4vw, 38px);

          line-height: 1.3;

          font-weight: 900;
        }

        .university-description {
          max-width: 850px;

          margin:
            10px 0 18px;

          color: #697791;

          font-size: 15px;

          line-height: 1.9;
        }

        .university-meta {
          display: flex;

          flex-wrap: wrap;

          align-items: center;

          gap: 9px;
        }

        .meta-item {
          display: inline-flex;

          align-items: center;

          gap: 7px;

          padding:
            8px 11px;

          color: #59677f;

          background: #edf3fa;

          border-radius: 10px;

          font-size: 13px;

          font-weight: 750;
        }

        .meta-item svg {
          color: #2455c4;

          flex-shrink: 0;
        }

        /* =================================
           عنوان القسم
        ================================= */

        .colleges-section {
          width: 100%;
        }

        .section-heading {
          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          gap: 20px;

          margin-bottom: 24px;

          color: white;
        }

        .section-eyebrow {
          display: block;

          margin-bottom: 6px;

          color: #f0c56d;

          font-size: 13px;

          font-weight: 850;
        }

        .section-heading h2 {
          margin: 0 0 6px;

          color: #ffffff;

          font-size: 29px;

          font-weight: 900;
        }

        .section-heading p {
          margin: 0;

          color:
            rgba(255,255,255,0.76);

          font-size: 14px;

          line-height: 1.8;
        }

        .college-count {
          flex-shrink: 0;

          display: flex;

          align-items: baseline;

          gap: 5px;

          color: #ffffff;

          font-size: 31px;

          font-weight: 900;
        }

        .college-count span {
          color:
            rgba(255,255,255,0.7);

          font-size: 13px;

          font-weight: 700;
        }

        /* =================================
           شبكة الكليات
        ================================= */

        .colleges-grid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 20px;
        }

        /* =================================
           بطاقة الكلية
        ================================= */

        .college-card {
          position: relative;

          overflow: hidden;

          padding:
            29px 23px 25px;

          background:
            rgba(255,255,255,0.98);

          border:
            1px solid
            rgba(255,255,255,0.65);

          border-radius: 21px;

          text-align: center;

          box-shadow:
            0 12px 32px
            rgba(0,0,0,0.13);

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
              #e9b24c,
              #2455c4
            );
        }

        .college-card:hover {
          transform:
            translateY(-6px);

          border-color:
            rgba(233,178,76,0.55);

          box-shadow:
            0 19px 42px
            rgba(0,0,0,0.18);
        }

        /* =================================
           أيقونة الكلية
        ================================= */

        .college-icon-wrapper {
          width: 68px;
          height: 68px;

          margin:
            0 auto 12px;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #174fae;

          background:
            radial-gradient(
              circle at 30% 25%,
              #ffffff 0%,
              #edf4ff 30%,
              #d8e8ff 65%,
              #b8d0f3 100%
            );

          border:
            4px solid
            #d5aa54;

          border-radius: 20px;

          box-shadow:
            0 10px 20px
            rgba(23,63,145,0.14),
            inset 5px 5px 9px
            rgba(255,255,255,0.8);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .college-card:hover
          .college-icon-wrapper {
          transform:
            translateY(-4px)
            scale(1.04);

          box-shadow:
            0 15px 27px
            rgba(23,63,145,0.2),
            0 0 0 7px
            rgba(213,170,84,0.08);
        }

        /* =================================
           اسم الكلية
        ================================= */

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

          margin:
            15px auto 17px;

          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              #c98b25,
              #f0c56d,
              #c98b25
            );
        }

        /* =================================
           التخصصات
        ================================= */

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

          gap: 7px;

          margin-top: 17px;
        }

        .major-pill {
          display: inline-flex;

          align-items: center;

          justify-content: center;

          gap: 5px;

          min-height: 32px;

          padding:
            6px 10px;

          color: #52617a;

          background:
            #f8fbff;

          border:
            1px solid
            #e4ebf4;

          border-radius: 9px;

          font-size: 12px;

          font-weight: 700;

          line-height: 1.5;

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

          background:
            #e8f1ff;

          border-color:
            rgba(36,85,196,0.18);

          transform:
            translateY(-1px);
        }

        .empty-majors {
          margin-top: 17px;

          padding: 12px;

          color: #8a96aa;

          background: #f8fbff;

          border:
            1px solid
            #e4ebf4;

          border-radius: 10px;

          font-size: 12px;

          font-weight: 700;
        }

        /* =================================
           Tablet
        ================================= */

        @media (max-width: 850px) {

          .university-header {
            align-items: flex-start;
          }

          .colleges-grid {
            grid-template-columns: 1fr;
          }

        }

        /* =================================
           Mobile
        ================================= */

        @media (max-width: 640px) {

          .colleges-page {
            padding:
              15px 0 50px;
          }

          .colleges-container {
            padding:
              0 14px;
          }

          .back-link {
            margin-bottom: 18px;

            padding:
              8px 12px;

            font-size: 13px;
          }

          .university-header {
            flex-direction: column;

            align-items: center;

            gap: 18px;

            padding:
              22px 17px;

            border-radius: 20px;

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
            padding:
              7px 9px;

            font-size: 12px;
          }

          .section-heading {
            align-items: flex-start;

            flex-direction: column;

            gap: 9px;
          }

          .section-heading h2 {
            font-size: 24px;
          }

          .section-heading p {
            font-size: 13px;
          }

          .college-count {
            font-size: 24px;
          }

          .college-card {
            padding:
              26px 17px 22px;

            border-radius: 19px;
          }

          .college-card h3 {
            font-size: 17px;
          }

          .major-pill {
            font-size: 11px;

            padding:
              5px 8px;
          }

        }

      `}</style>
    </main>
  )
}