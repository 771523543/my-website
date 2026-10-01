import UniversityGrid from "@/app/components/universities/UniversityGrid"

export const metadata = {
  title: "الجامعات | منصة هديل",
  description:
    "دليل الجامعات والكليات والتخصصات والاستفسارات الأكاديمية في منصة هديل.",
}

export default function UniversitiesPage() {
  return (
    <main className="universities-page">
      <section className="university-hero">
        <div className="container">
          <span className="section-kicker">
            الدليل الجامعي
          </span>

          <h1>الجامعات</h1>

          <p>
            اختر جامعتك للوصول إلى الكليات والتخصصات
            والمعلومات والخدمات التي يحتاجها الطالب.
          </p>
        </div>
      </section>

      <section className="university-list-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">
              اختر جامعتك
            </span>

            <h2>دليل الجامعات</h2>

            <p>
              تعرّف على جامعتك والكليات والتخصصات
              والمعلومات المهمة للطلاب.
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

        .university-hero {
          position: relative;
          padding: 90px 0 80px;
          background:
            radial-gradient(
              circle at 85% 20%,
              rgba(233, 178, 76, 0.16),
              transparent 28%
            ),
            linear-gradient(
              135deg,
              #2455c4 0%,
              #1f4caf 55%,
              #183d91 100%
            );
          color: #ffffff;
          overflow: hidden;
        }

        .university-hero::after {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          left: -100px;
          bottom: -180px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
        }

        .university-hero .container {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .university-hero .section-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 15px;
          color: #f6d78d;
          font-size: 14px;
          font-weight: 800;
        }

        .university-hero .section-kicker::before {
          content: "";
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e9b24c;
        }

        .university-hero h1 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(36px, 6vw, 58px);
          font-weight: 900;
          line-height: 1.2;
        }

        .university-hero p {
          max-width: 700px;
          margin: 18px auto 0;
          color: rgba(255, 255, 255, 0.88);
          font-size: 17px;
          line-height: 2;
        }

        .university-list-section {
          padding: 80px 0 100px;
        }

        .university-list-section .section-heading {
          margin-bottom: 40px;
          text-align: center;
        }

        .university-list-section .section-kicker {
          color: #2455c4;
          font-size: 14px;
          font-weight: 800;
        }

        .university-list-section h2 {
          margin: 8px 0 10px;
          color: #17233d;
          font-size: clamp(28px, 4vw, 38px);
          font-weight: 900;
        }

        .university-list-section .section-heading p {
          margin: 0 auto;
          max-width: 650px;
          color: #697791;
          line-height: 1.9;
        }

        .university-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }

        @media (max-width: 1050px) {
          .university-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 650px) {
          .university-hero {
            padding: 65px 0 60px;
          }

          .university-hero p {
            font-size: 15px;
          }

          .university-list-section {
            padding: 60px 0 75px;
          }

          .university-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  )
}