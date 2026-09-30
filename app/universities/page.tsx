import UniversityGrid from "@/app/components/universities/UniversityGrid"

export const metadata = {
  title: "الجامعات | منصة هديل",
  description:
    "دليل الجامعات والخدمات والشروحات الأكاديمية في منصة هديل.",
}

export default function UniversitiesPage() {
  return (
    <main className="universities-page">
      <section className="university-hero">
        <div className="container">
          <span className="section-kicker">
            الخدمات الجامعية
          </span>

          <h1>الجامعات</h1>

          <p>
            اختر جامعتك للوصول إلى الخدمات والشروحات
            والأنظمة التي يحتاجها الطالب.
          </p>
        </div>
      </section>

      <section className="university-list-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">
              اختر جامعتك
            </span>

            <h2>الخدمات حسب الجامعة</h2>

            <p>
              اختر الجامعة للوصول إلى الأدلة والخدمات
              المتعلقة بها.
            </p>
          </div>

          <UniversityGrid />
        </div>
      </section>

      <style jsx>{`
        .universities-page {
          min-height: 70vh;
        }

        .university-hero {
          padding: 80px 0 60px;
          text-align: center;
          background: linear-gradient(
            180deg,
            #f8fbff 0%,
            #ffffff 100%
          );
        }

        .university-hero h1 {
          margin: 14px 0 12px;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 800;
          color: #17233d;
        }

        .university-hero p {
          max-width: 650px;
          margin: 0 auto;
          color: #697791;
          font-size: 17px;
          line-height: 1.9;
        }

        .university-list-section {
          padding: 30px 0 90px;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-heading h2 {
          margin: 10px 0;
          color: #17233d;
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 800;
        }

        .section-heading p {
          margin: 0 auto;
          color: #697791;
          line-height: 1.8;
        }

        .section-kicker {
          display: inline-block;
          color: #2455c4;
          font-size: 14px;
          font-weight: 700;
        }

        .university-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }

        .university-card {
          display: flex;
          flex-direction: column;
          min-height: 260px;
          padding: 26px;
          background: #ffffff;
          border: 1px solid #e4ebf4;
          border-radius: 22px;
          text-decoration: none;
          box-shadow: 0 8px 30px rgba(23, 35, 61, 0.06);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .university-card:hover {
          transform: translateY(-5px);
          border-color: #cbdafa;
          box-shadow: 0 16px 40px rgba(36, 85, 196, 0.12);
        }

        .university-card-icon {
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          border-radius: 16px;
          background: #e8f1ff;
          color: #2455c4;
        }

        .university-card-content {
          flex: 1;
        }

        .university-card-content h3 {
          margin: 0 0 10px;
          color: #17233d;
          font-size: 21px;
          font-weight: 800;
        }

        .university-card-content p {
          margin: 0;
          color: #697791;
          line-height: 1.8;
          font-size: 15px;
        }

        .university-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 24px;
          padding-top: 18px;
          border-top: 1px solid #edf3fa;
          color: #2455c4;
          font-size: 14px;
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .university-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .university-hero {
            padding: 55px 0 40px;
          }

          .university-list-section {
            padding-bottom: 60px;
          }

          .university-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .university-card {
            min-height: 230px;
          }
        }
      `}</style>
    </main>
  )
}