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
      {/* =========================
          الجزء العلوي الأزرق فقط
      ========================== */}
      <section className="university-hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-inner">
          <Link href="/universities" className="back-link">
            <ArrowRight size={18} />
            <span>العودة إلى الجامعات</span>
          </Link>

          <div className="university-intro">
            <div className="university-logo-wrap">
              <Image
                src={university.logo}
                alt={`شعار ${university.name}`}
                width={120}
                height={120}
                className="university-logo"
              />
            </div>

            <h1>{university.name}</h1>

            <p className="university-description">
              {university.description}
            </p>

            <div className="university-meta">
              <div className="meta-item">
                <MapPin size={18} />
                <span>{university.city}</span>
              </div>

              <div className="meta-divider" />

              <div className="meta-item">
                <span className="meta-label">تأسست</span>
                <span>{university.founded}</span>
              </div>

              <div className="meta-divider" />

              <div className="meta-item">
                <GraduationCap size={18} />
                <span>{university.colleges.length} كلية</span>
              </div>

              <div className="meta-divider" />

              <div className="meta-item">
                <BookOpen size={18} />
                <span>{totalMajors} تخصص</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          الخلفية الرسمية للموقع
          تبدأ من هنا
      ========================== */}
      <section className="colleges-content">
        <div className="content-container">
          <div className="section-heading">
            <span className="section-eyebrow">
              <GraduationCap size={17} />
              التعليم الجامعي
            </span>

            <h2>الكليات والتخصصات</h2>

            <p>
              استعرض كليات {university.name} والتخصصات والبرامج
              الأكاديمية المتاحة.
            </p>
          </div>

          {/* بطاقات الكليات */}
          <div className="colleges-grid">
            {university.colleges.map((college, index) => (
              <article
                key={college.name}
                className="college-card"
              >
                <div className="college-card-top">
                  <div className="college-icon">
                    <GraduationCap size={25} />
                  </div>

                  <span className="college-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3>{college.name}</h3>

                <div className="gold-line" />

                <div className="majors-header">
                  <div>
                    <span className="majors-title">
                      التخصصات والبرامج الأكاديمية
                    </span>

                    <span className="majors-count">
                      {college.majors.length} تخصص
                    </span>
                  </div>

                  <BookOpen size={20} />
                </div>

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
              </article>
            ))}
          </div>

          {/* =========================
              مساحة الخدمات لاحقًا
          ========================== */}
          <section className="services-preview">
            <div className="services-icon">
              <Sparkles size={23} />
            </div>

            <div className="services-text">
              <span>بوابة الطالب</span>

              <h2>الخدمات والملفات والأدلة</h2>

              <p>
                ستجد داخل بوابة الطالب الخدمات والملفات والشروحات
                والروابط المهمة الخاصة بطلاب الجامعة.
              </p>
            </div>

            <Link
              href={`/universities/${university.slug}/student`}
              className="services-link"
            >
              زيارة بوابة الطالب
              <ArrowRight size={18} />
            </Link>
          </section>
        </div>
      </section>

      <style jsx>{`
        /* =========================
           الصفحة
        ========================== */

        .colleges-page {
          min-height: 100vh;
          direction: rtl;
          background: #f8fbff;
        }

        /* =========================
           الجزء العلوي الأزرق
           فقط
        ========================== */

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

        .hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 20px 58px;
          box-sizing: border-box;
        }

        .hero-glow {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
        }

        .hero-glow-one {
          width: 260px;
          height: 260px;
          top: -120px;
          right: -90px;
          background: rgba(255, 255, 255, 0.055);
        }

        .hero-glow-two {
          width: 340px;
          height: 340px;
          bottom: -210px;
          left: -120px;
          background: rgba(233, 178, 76, 0.06);
        }

        /* =========================
           زر العودة
        ========================== */

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          padding: 9px 13px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.07);
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .back-link:hover {
          background: rgba(255, 255, 255, 0.13);
          transform: translateX(2px);
        }

        /* =========================
           بيانات الجامعة
        ========================== */

        .university-intro {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 850px;
          margin: 25px auto 0;
        }

        .university-logo-wrap {
          width: 126px;
          height: 126px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.98);
          border: 2px solid rgba(233, 178, 76, 0.75);
          box-shadow: 0 16px 40px rgba(8, 31, 78, 0.22);
          padding: 10px;
          box-sizing: border-box;
        }

        .university-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .university-intro h1 {
          margin: 19px 0 8px;
          color: #ffffff;
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 800;
          line-height: 1.35;
        }

        .university-description {
          max-width: 720px;
          margin: 0;
          color: rgba(255, 255, 255, 0.82);
          font-size: 15px;
          line-height: 1.9;
        }

        .university-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 13px;
          margin-top: 22px;
          padding: 11px 17px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.065);
          backdrop-filter: blur(8px);
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.92);
          font-size: 13px;
          font-weight: 700;
        }

        .meta-item svg {
          color: #f0c56c;
        }

        .meta-label {
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        .meta-divider {
          width: 1px;
          height: 18px;
          background: rgba(255, 255, 255, 0.18);
        }

        /* =========================
           الخلفية الرسمية
        ========================== */

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

        /* =========================
           عنوان الكليات
        ========================== */

        .section-heading {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 34px;
        }

        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #2455c4;
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 9px;
        }

        .section-heading h2 {
          margin: 0;
          color: #17233d;
          font-size: clamp(25px, 3.5vw, 34px);
          font-weight: 800;
        }

        .section-heading p {
          margin: 9px 0 0;
          color: #697791;
          font-size: 15px;
          line-height: 1.8;
        }

        /* =========================
           بطاقات الكليات
           بيضاء فوق الخلفية الرسمية
        ========================== */

        .colleges-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
        }

        .college-card {
          background: #ffffff;
          border: 1px solid #e4ebf4;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 8px 26px rgba(23, 35, 61, 0.07);
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease,
            border-color 0.22s ease;
        }

        .college-card:hover {
          transform: translateY(-3px);
          border-color: rgba(36, 85, 196, 0.2);
          box-shadow: 0 14px 34px rgba(23, 35, 61, 0.1);
        }

        .college-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .college-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          color: #2455c4;
          background:
            radial-gradient(
              circle at 35% 30%,
              rgba(36, 85, 196, 0.14),
              rgba(232, 241, 255, 0.8)
            );
          border: 1px solid rgba(233, 178, 76, 0.7);
        }

        .college-number {
          color: #a0acc0;
          font-size: 13px;
          font-weight: 800;
        }

        .college-card h3 {
          margin: 18px 0 0;
          color: #17233d;
          font-size: 20px;
          line-height: 1.5;
          font-weight: 800;
        }

        .gold-line {
          width: 42px;
          height: 3px;
          margin: 13px 0 18px;
          border-radius: 99px;
          background: #e9b24c;
        }

        .majors-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          color: #2455c4;
          margin-bottom: 14px;
        }

        .majors-header > svg {
          flex-shrink: 0;
          color: #e0a63e;
        }

        .majors-header > div {
          display: flex;
          align-items: center;
          gap: 9px;
          flex-wrap: wrap;
        }

        .majors-title {
          color: #4d5c76;
          font-size: 13px;
          font-weight: 800;
        }

        .majors-count {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 999px;
          background: #edf3fa;
          color: #697791;
          font-size: 11px;
          font-weight: 700;
        }

        .majors-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .major-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 10px;
          border-radius: 10px;
          background: #f7faff;
          border: 1px solid #e5edf7;
          color: #52627d;
          font-size: 12px;
          line-height: 1.5;
        }

        .major-item svg {
          flex-shrink: 0;
          color: #d9a43d;
        }

        /* =========================
           تعريف الخدمات
        ========================== */

        .services-preview {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-top: 45px;
          padding: 23px;
          border: 1px solid #e4ebf4;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 8px 26px rgba(23, 35, 61, 0.055);
        }

        .services-icon {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          background: #edf3fa;
          color: #2455c4;
        }

        .services-text {
          flex: 1;
        }

        .services-text > span {
          color: #e0a63e;
          font-size: 12px;
          font-weight: 800;
        }

        .services-text h2 {
          margin: 4px 0 4px;
          color: #17233d;
          font-size: 18px;
          font-weight: 800;
        }

        .services-text p {
          margin: 0;
          color: #697791;
          font-size: 13px;
          line-height: 1.7;
        }

        .services-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-shrink: 0;
          padding: 11px 16px;
          border-radius: 11px;
          background: #2455c4;
          color: #ffffff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .services-link:hover {
          background: #173f91;
          transform: translateX(-2px);
        }

        /* =========================
           الجوال
        ========================== */

        @media (max-width: 760px) {
          .hero-inner {
            padding: 14px 14px 42px;
          }

          .back-link {
            font-size: 13px;
          }

          .university-logo-wrap {
            width: 105px;
            height: 105px;
            border-radius: 23px;
          }

          .university-intro {
            margin-top: 21px;
          }

          .university-intro h1 {
            font-size: 25px;
          }

          .university-description {
            font-size: 14px;
          }

          .university-meta {
            gap: 9px 13px;
            padding: 10px 12px;
          }

          .meta-divider {
            display: none;
          }

          .colleges-content {
            padding: 42px 0 60px;
          }

          .content-container {
            padding: 0 14px;
          }

          .section-heading {
            margin-bottom: 26px;
          }

          .section-heading h2 {
            font-size: 26px;
          }

          .colleges-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .college-card {
            padding: 20px;
            border-radius: 17px;
          }

          .college-card h3 {
            font-size: 18px;
          }

          .services-preview {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
            padding: 20px;
          }

          .services-icon {
            margin: 0 auto;
          }

          .services-link {
            width: 100%;
          }
        }
      `}</style>
    </main>
  )
}