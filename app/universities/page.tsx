import UniversityGrid from "@/app/components/universities/UniversityGrid"

export default function UniversitiesPage() {
  return (
    <main className="universities-page">
      <section className="universities-hero">
        <div className="container">
          <span className="universities-kicker">دليل الجامعات</span>

          <h1>الجامعات</h1>

          <p>
            اختر جامعتك للوصول إلى معلوماتها والكليات والتخصصات
            والخدمات والشروحات الجامعية.
          </p>
        </div>
      </section>

      <section className="universities-section">
        <div className="container">
          <div className="section-heading">
            <span>الجامعات السعودية</span>

            <h2>اختر جامعتك</h2>

            <p>
              استكشف الجامعة التي تدرس فيها وتعرّف على الكليات
              والتخصصات والمعلومات المتاحة للطلاب.
            </p>
          </div>

          <UniversityGrid />
        </div>
      </section>

      <style>{`
        .universities-page {
          min-height: 100vh;
          background: #f8fbff;
        }

        .universities-hero {
          padding: 70px 0 75px;
          background:
            radial-gradient(
              circle at 15% 15%,
              rgba(233, 178, 76, 0.16),
              transparent 25%
            ),
            linear-gradient(135deg, #2455c4, #1f4caf, #183d91);
          color: #fff;
          text-align: center;
        }

        .universities-kicker {
          display: inline-block;
          margin-bottom: 10px;
          color: #f6d78d;
          font-size: 14px;
          font-weight: 800;
        }

        .universities-hero h1 {
          margin: 0;
          color: #fff;
          font-size: clamp(34px, 6vw, 52px);
          font-weight: 900;
          line-height: 1.25;
        }

        .universities-hero p {
          max-width: 720px;
          margin: 16px auto 0;
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          line-height: 2;
        }

        .universities-section {
          padding: 80px 0;
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
          font-size: clamp(28px, 4vw, 40px);
          font-weight: 900;
        }

        .section-heading p {
          max-width: 680px;
          margin: 0 auto;
          color: #697791;
          line-height: 1.9;
        }

        @media (max-width: 600px) {
          .universities-hero {
            padding: 55px 0 60px;
          }

          .universities-section {
            padding: 60px 0;
          }
        }
      `}</style>
    </main>
  )
}