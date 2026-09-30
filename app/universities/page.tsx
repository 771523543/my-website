import UniversityGrid from "@/app/components/universities/UniversityGrid"

export const metadata = {
  title: "الجامعات | منصة هديل",
  description:
    "دليل الجامعات والخدمات والشروحات الأكاديمية في منصة هديل.",
}

export default function UniversitiesPage() {
  return (
    <main className="universities-page">
      {/* Hero */}
      <section className="university-hero">
        <div className="container">
          <div className="hero-content">
            <span className="section-kicker">
              الخدمات الجامعية
            </span>

            <h1>
              الجامعات
              <span> والخدمات الأكاديمية</span>
            </h1>

            <p>
              اختر جامعتك للوصول إلى الخدمات والشروحات
              والأنظمة التي يحتاجها الطالب.
            </p>

            <div className="hero-badge">
              <span className="hero-badge-dot" />
              خدمات وشروحات جامعية منظمة
            </div>
          </div>
        </div>
      </section>

      {/* Universities */}
      <section className="university-list-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">
              اختر جامعتك
            </span>

            <h2>الخدمات حسب الجامعة</h2>

            <p>
              اختر الجامعة للوصول إلى الأدلة والخدمات
              والشروحات المتعلقة بها.
            </p>
          </div>

          <UniversityGrid />
        </div>
      </section>

      {/* CTA */}
      <section className="university-cta">
        <div className="container">
          <div className="university-cta-inner">
            <div>
              <span className="section-kicker">
                تحتاج مساعدة؟
              </span>

              <h2>
                لم تجد ما تبحث عنه؟
              </h2>

              <p>
                يمكنك التواصل معنا للحصول على المساعدة
                المناسبة لاحتياجك الأكاديمي والطلابي.
              </p>
            </div>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              تواصل معنا
              <span>←</span>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .universities-page {
          min-height: 70vh;
          background: #ffffff;
        }

        /* =========================
           HERO
        ========================= */

        .university-hero {
          position: relative;
          overflow: hidden;
          padding: 82px 0 76px;
          background:
            radial-gradient(
              circle at 85% 20%,
              rgba(255, 255, 255, 0.14),
              transparent 28%
            ),
            linear-gradient(
              135deg,
              #2455c4 0%,
              #1d4aaa 55%,
              #173d91 100%
            );
        }

        .university-hero::before {
          content: "";
          position: absolute;
          width: 280px;
          height: 280px;
          right: -100px;
          top: -130px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          pointer-events: none;
        }

        .university-hero::after {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          left: -100px;
          bottom: -130px;
          border-radius: 50%;
          background: rgba(233, 178, 76, 0.08);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
        }

        .university-hero .section-kicker {
          color: #f1c76f;
        }

        .university-hero h1 {
          margin: 15px 0 18px;
          color: #ffffff;
          font-size: clamp(34px, 5vw, 54px);
          line-height: 1.2;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .university-hero h1 span {
          color: #f1c76f;
        }

        .university-hero p {
          max-width: 680px;
          margin: 0 auto;
          color: rgba(255, 255, 255, 0.88);
          font-size: 17px;
          line-height: 1.9;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-top: 25px;
          padding: 9px 16px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.09);
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          font-weight: 700;
          backdrop-filter: blur(8px);
        }

        .hero-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #f1c76f;
          box-shadow: 0 0 0 4px rgba(241, 199, 111, 0.12);
        }

        /* =========================
           UNIVERSITIES SECTION
        ========================= */

        .university-list-section {
          padding: 82px 0 90px;
          background: #ffffff;
        }

        .section-heading {
          max-width: 720px;
          margin: 0 auto 42px;
          text-align: center;
        }

        .section-heading .section-kicker {
          display: inline-block;
          color: #2455c4;
          font-size: 14px;
          font-weight: 700;
        }

        .section-heading h2 {
          margin: 10px 0 12px;
          color: #17233d;
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.25;
          font-weight: 800;
        }

        .section-heading p {
          max-width: 620px;
          margin: 0 auto;
          color: #697791;
          font-size: 16px;
          line-height: 1.9;
        }

        /* =========================
           GRID
        ========================= */

        .university-list-section :global(.university-grid) {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }

        /* =========================
           CTA
        ========================= */

        .university-cta {
          padding: 0 0 90px;
        }

        .university-cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 35px;
          padding: 38px 42px;
          border: 1px solid #dce6f4;
          border-radius: 24px;
          background:
            linear-gradient(
              135deg,
              #f8fbff 0%,
              #edf4ff 100%
            );
          box-shadow: 0 10px 35px rgba(23, 35, 61, 0.06);
        }

        .university-cta .section-kicker {
          color: #2455c4;
          font-size: 14px;
          font-weight: 700;
        }

        .university-cta h2 {
          margin: 8px 0 8px;
          color: #17233d;
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 800;
        }

        .university-cta p {
          max-width: 620px;
          margin: 0;
          color: #697791;
          line-height: 1.8;
        }

        .cta-button {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-width: 150px;
          padding: 14px 22px;
          border-radius: 14px;
          background: #2455c4;
          color: #ffffff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 800;
          box-shadow: 0 8px 22px rgba(36, 85, 196, 0.2);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          background: #1d48aa;
          box-shadow: 0 12px 28px rgba(36, 85, 196, 0.26);
        }

        .cta-button span {
          font-size: 18px;
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 950px) {
          .university-list-section :global(.university-grid) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .university-cta-inner {
            align-items: flex-start;
            flex-direction: column;
          }

          .cta-button {
            width: 100%;
          }
        }

        @media (max-width: 650px) {
          .university-hero {
            padding: 58px 0 52px;
          }

          .university-hero h1 {
            font-size: 34px;
          }

          .university-hero p {
            font-size: 15px;
          }

          .university-list-section {
            padding: 60px 0 65px;
          }

          .section-heading {
            margin-bottom: 30px;
          }

          .university-list-section :global(.university-grid) {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .university-cta {
            padding-bottom: 65px;
          }

          .university-cta-inner {
            padding: 28px 24px;
            border-radius: 20px;
          }
        }

        @media (max-width: 400px) {
          .university-hero h1 {
            font-size: 30px;
          }

          .hero-badge {
            font-size: 12px;
          }
        }
      `}</style>
    </main>
  )
}