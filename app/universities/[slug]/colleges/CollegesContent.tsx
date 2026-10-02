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

import { universities } from "@/app/components/universities/data"

type Props = {
  slug: string
}

export default function CollegesContent({ slug }: Props) {
  const university = universities.find(
    (item) => item.slug === slug
  )

  if (!university) {
    return (
      <main className="not-found-page">
        <div className="not-found-card">
          <h1>الجامعة غير موجودة</h1>
          <p>
            لم يتم العثور على بيانات الجامعة المطلوبة.
          </p>

          <Link href="/universities" className="back-link">
            <ArrowRight size={18} />
            العودة إلى الجامعات
          </Link>
        </div>

        <style jsx>{`
          .not-found-page {
            min-height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            background: #f8fbff;
          }

          .not-found-card {
            width: 100%;
            max-width: 520px;
            padding: 40px 25px;
            text-align: center;
            background: #ffffff;
            border: 1px solid #e4ebf4;
            border-radius: 20px;
            box-shadow: 0 12px 32px rgba(23, 35, 61, 0.08);
          }

          .not-found-card h1 {
            margin: 0 0 10px;
            color: #17233d;
            font-size: 24px;
            font-weight: 900;
          }

          .not-found-card p {
            margin: 0 0 25px;
            color: #697791;
            font-size: 14px;
          }

          .back-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 10px 16px;
            color: #ffffff;
            background: #2455c4;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 800;
            text-decoration: none;
          }
        `}</style>
      </main>
    )
  }

  return (
    <main className="colleges-page">
      {/* =========================
          القسم العلوي
      ========================== */}
      <section className="university-hero">
        <div className="university-container">
          <Link
            href="/universities"
            className="back-link"
          >
            <ArrowRight size={18} />
            العودة إلى الجامعات
          </Link>

          <div className="university-header">
            {/* شعار الجامعة */}
            <div className="university-logo-wrapper">
              <Image
                src={university.logo}
                alt={`شعار ${university.name}`}
                width={120}
                height={120}
                className="university-logo"
              />
            </div>

            {/* معلومات الجامعة */}
            <div className="header-content">
              <div className="eyebrow">
                <GraduationCap size={17} />
                <span>الجامعة</span>
              </div>

              <h1>{university.name}</h1>

              <p className="university-description">
                {university.description}
              </p>

              <div className="university-meta">
                <div className="meta-item">
                  <span className="meta-label">
                    سنة التأسيس
                  </span>

                  <strong>
                    {university.founded}
                  </strong>
                </div>

                <div className="meta-item">
                  <MapPin size={16} />

                  <strong>
                    {university.city}
                  </strong>
                </div>

                <div className="meta-item">
                  <GraduationCap size={16} />

                  <strong>
                    {university.colleges.length} كلية
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          محتوى الكليات
      ========================== */}
      <section className="colleges-content">
        <div className="colleges-container">

          {/* عنوان القسم */}
          <div className="section-heading">
            <div>
              <div className="section-eyebrow">
                <GraduationCap size={17} />
                <span>الكليات والتخصصات</span>
              </div>

              <h2>
                كليات {university.name}
              </h2>

              <p>
                استعرض الكليات والتخصصات والبرامج
                الأكاديمية المتاحة في الجامعة.
              </p>
            </div>

            <div className="college-count">
              {university.colleges.length}
              <span>كلية</span>
            </div>
          </div>

          {/* بطاقات الكليات */}
          <div className="colleges-grid">
            {university.colleges.map(
              (college, index) => (
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
                      {college.majors.map(
                        (major) => (
                          <span
                            key={major}
                            className="major-pill"
                          >
                            <Sparkles size={13} />
                            {major}
                          </span>
                        )
                      )}
                    </div>
                  ) : (
                    <div className="empty-majors">
                      لا توجد تخصصات مضافة حاليًا.
                    </div>
                  )}
                </article>
              )
            )}
          </div>

          {/* =========================
              تعريف مختصر بالخدمات
          ========================== */}
          <section className="services-teaser">
            <div className="services-teaser-icon">
              <BookOpen
                size={27}
                strokeWidth={1.8}
              />
            </div>

            <div className="services-teaser-content">
              <span className="services-eyebrow">
                خدمات طلابية
              </span>

              <h2>
                تحتاج إلى خدمات أو أدلة للطلاب؟
              </h2>

              <p>
                ستجد في بوابة الطالب مجموعة من
                الأدلة والشروحات والملفات والخدمات
                المهمة التي تساعدك أثناء دراستك.
              </p>
            </div>

            <Link
              href={`/universities/${university.slug}/student`}
              className="services-teaser-link"
            >
              <span>الدخول إلى بوابة الطالب</span>
              <ArrowRight size={18} />
            </Link>
          </section>

        </div>
      </section>

      <style jsx>{`
        /* =========================================
           الصفحة
        ========================================== */

        .colleges-page {
          min-height: 100vh;
          background: #f8fbff;
          padding-bottom: 60px;
        }

        /* =========================================
           القسم العلوي الأزرق
        ========================================== */

        .university-hero {
          width: 100%;
          background:
            linear-gradient(
              145deg,
              #173f91 0%,
              #2455c4 52%,
              #163878 100%
            );
          color: #ffffff;
        }

        .university-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 20px 42px;
          box-sizing: border-box;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          padding: 9px 14px;

          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);

          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;

          font-size: 14px;
          font-weight: 800;
          text-decoration: none;

          backdrop-filter: blur(8px);

          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .back-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(2px);
        }

        /* =========================================
           رأس الجامعة
        ========================================== */

        .university-header {
          display: flex;
          align-items: center;
          gap: 28px;

          padding: 28px;

          background: rgba(255, 255, 255, 0.08);

          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 24px;

          box-shadow:
            0 18px 45px rgba(0, 0, 0, 0.16);

          backdrop-filter: blur(10px);
        }

        /* =========================================
           شعار الجامعة
        ========================================== */

        .university-logo-wrapper {
          flex: 0 0 auto;

          width: 120px;
          height: 120px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 12px;

          box-sizing: border-box;
          overflow: hidden;

          background: #f8fbff;

          border: 1px solid #e4ebf4;
          border-radius: 21px;

          box-shadow:
            0 10px 25px rgba(0, 0, 0, 0.14);
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

        /* =========================================
           معلومات الجامعة
        ========================================== */

        .header-content {
          flex: 1;
          min-width: 0;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          margin-bottom: 8px;

          color: #f4cc79;

          font-size: 13px;
          font-weight: 800;
        }

        .header-content h1 {
          margin: 0;

          color: #ffffff;

          font-size: 32px;
          line-height: 1.45;
          font-weight: 900;
        }

        .university-description {
          max-width: 800px;
          margin: 9px 0 18px;

          color: rgba(255, 255, 255, 0.82);

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
          gap: 6px;

          padding: 8px 11px;

          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.09);

          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 9px;

          font-size: 12px;
        }

        .meta-item svg {
          color: #f0c56d;
          flex-shrink: 0;
        }

        .meta-label {
          color: rgba(255, 255, 255, 0.65);
        }

        /* =========================================
           محتوى الكليات
        ========================================== */

        .colleges-content {
          width: 100%;
          background: #f8fbff;
        }

        .colleges-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 42px 20px 0;
          box-sizing: border-box;
        }

        /* =========================================
           عنوان الكليات
        ========================================== */

        .section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;

          margin-bottom: 28px;
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;

          margin-bottom: 6px;

          color: #2455c4;

          font-size: 13px;
          font-weight: 850;
        }

        .section-eyebrow svg {
          color: #c98b25;
        }

        .section-heading h2 {
          margin: 0;

          color: #17233d;

          font-size: 29px;
          line-height: 1.5;
          font-weight: 900;
        }

        .section-heading p {
          margin: 5px 0 0;

          color: #697791;

          font-size: 14px;
          line-height: 1.8;
        }

        .college-count {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          min-width: 80px;

          color: #2455c4;

          font-size: 30px;
          line-height: 1;
          font-weight: 900;
        }

        .college-count span {
          margin-top: 6px;

          color: #8a96aa;

          font-size: 12px;
          font-weight: 800;
        }

        /* =========================================
           شبكة الكليات
        ========================================== */

        .colleges-grid {
          display: grid;

          grid-template-columns:
            repeat(3, minmax(0, 1fr));

          gap: 20px;
        }

        /* =========================================
           بطاقة الكلية
           نفس التصميم المطلوب
        ========================================== */

        .college-card {
          position: relative;
          overflow: hidden;

          padding: 29px 23px 25px;

          background: rgba(255, 255, 255, 0.98);

          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 21px;

          text-align: center;

          box-shadow:
            0 12px 32px rgba(0, 0, 0, 0.13);

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
          transform: translateY(-6px);

          border-color:
            rgba(233, 178, 76, 0.55);

          box-shadow:
            0 19px 42px rgba(0, 0, 0, 0.18);
        }

        /* =========================================
           أيقونة الكلية
        ========================================== */

        .college-icon-wrapper {
          width: 68px;
          height: 68px;

          margin: 0 auto 12px;

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

          border: 4px solid #d5aa54;
          border-radius: 20px;

          box-shadow:
            0 10px 20px rgba(23, 63, 145, 0.14),
            inset 5px 5px 9px
              rgba(255, 255, 255, 0.8);

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
              rgba(23, 63, 145, 0.2),
            0 0 0 7px
              rgba(213, 170, 84, 0.08);
        }

        /* =========================================
           رقم الكلية
        ========================================== */

        .college-number {
          margin-bottom: 6px;

          color: #8a96aa;

          font-size: 12px;
          font-weight: 800;
        }

        /* =========================================
           اسم الكلية
        ========================================== */

        .college-card h3 {
          margin: 0;

          color: #17233d;

          font-size: 19px;
          line-height: 1.6;
          font-weight: 900;
        }

        /* =========================================
           الفاصل الذهبي
        ========================================== */

        .gold-divider {
          width: 55px;
          height: 3px;

          margin: 15px auto 17px;

          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              #c98b25,
              #f0c56d,
              #c98b25
            );
        }

        /* =========================================
           عنوان التخصصات
        ========================================== */

        .majors-heading {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          color: #2455c4;

          font-size: 14px;
          font-weight: 850;
        }

        /* =========================================
           عدد التخصصات
        ========================================== */

        .major-count {
          margin-top: 5px;

          color: #8a96aa;

          font-size: 12px;
          font-weight: 700;
        }

        /* =========================================
           التخصصات
        ========================================== */

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

          padding: 6px 10px;

          color: #52617a;

          background: #f8fbff;

          border: 1px solid #e4ebf4;
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

          background: #e8f1ff;

          border-color:
            rgba(36, 85, 196, 0.18);

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

        /* =========================================
           الخدمات - تعريف مختصر
        ========================================== */

        .services-teaser {
          display: flex;
          align-items: center;
          gap: 20px;

          margin-top: 38px;
          padding: 22px 24px;

          background: #ffffff;

          border: 1px solid #e4ebf4;
          border-radius: 20px;

          box-shadow:
            0 10px 28px rgba(23, 35, 61, 0.07);
        }

        .services-teaser-icon {
          width: 58px;
          height: 58px;

          flex: 0 0 auto;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #2455c4;

          background: #e8f1ff;

          border: 1px solid
            rgba(36, 85, 196, 0.12);

          border-radius: 16px;
        }

        .services-teaser-content {
          flex: 1;
          min-width: 0;
        }

        .services-eyebrow {
          display: block;

          margin-bottom: 3px;

          color: #c98b25;

          font-size: 12px;
          font-weight: 850;
        }

        .services-teaser-content h2 {
          margin: 0;

          color: #17233d;

          font-size: 19px;
          line-height: 1.6;
          font-weight: 900;
        }

        .services-teaser-content p {
          max-width: 760px;

          margin: 4px 0 0;

          color: #697791;

          font-size: 13px;
          line-height: 1.8;
        }

        .services-teaser-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          flex: 0 0 auto;

          padding: 11px 16px;

          color: #ffffff;

          background: #2455c4;

          border-radius: 10px;

          font-size: 13px;
          font-weight: 850;

          text-decoration: none;

          transition:
            background 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .services-teaser-link:hover {
          background: #173f91;

          transform: translateY(-2px);

          box-shadow:
            0 8px 20px
              rgba(36, 85, 196, 0.2);
        }

        /* =========================================
           Responsive
        ========================================== */

        @media (max-width: 1000px) {
          .colleges-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 850px) {
          .university-header {
            align-items: flex-start;
          }

          .colleges-grid {
            grid-template-columns: 1fr;
          }

          .services-teaser {
            align-items: flex-start;
          }
        }

        @media (max-width: 640px) {
          .colleges-page {
            padding: 15px 0 50px;
          }

          .university-container {
            padding:
              12px 14px 30px;
          }

          .back-link {
            margin-bottom: 18px;

            padding: 8px 12px;

            font-size: 13px;
          }

          .university-header {
            flex-direction: column;
            align-items: center;

            gap: 18px;

            padding: 22px 17px;

            border-radius: 20px;

            text-align: center;
          }

          .university-logo-wrapper {
            width: 100px;
            height: 100px;

            padding: 10px;
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
            padding: 7px 9px;
            font-size: 12px;
          }

          .colleges-container {
            padding:
              30px 14px 0;
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
            padding: 26px 17px 22px;
            border-radius: 19px;
          }

          .college-card h3 {
            font-size: 17px;
          }

          .major-pill {
            font-size: 11px;
            padding: 5px 8px;
          }

          .services-teaser {
            flex-direction: column;
            align-items: stretch;

            margin-top: 30px;

            padding: 20px;
          }

          .services-teaser-icon {
            width: 52px;
            height: 52px;
          }

          .services-teaser-content h2 {
            font-size: 17px;
          }

          .services-teaser-content p {
            font-size: 12px;
          }

          .services-teaser-link {
            width: 100%;
            box-sizing: border-box;
          }
        }
      `}</style>
    </main>
  )
}