import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  GraduationCap,
} from "lucide-react"

import UniversityServiceCard from "@/app/components/universities/UniversityServiceCard"
import { universities } from "@/app/components/universities/data"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return universities.map((university) => ({
    slug: university.slug,
  }))
}

export default async function UniversityPage({ params }: Props) {
  const { slug } = await params

  const university = universities.find(
    (item) => item.slug === slug
  )

  if (!university) {
    notFound()
  }

  return (
    <main className="university-details-page">
      <section className="university-details-hero">
        <div className="container">
          <Link
            href="/universities"
            className="back-link"
          >
            <ArrowRight size={18} />
            العودة إلى الجامعات
          </Link>

          <div className="university-title">
            <div className="university-title-icon">
              <GraduationCap size={34} />
            </div>

            <div>
              <span>الخدمات الجامعية</span>
              <h1>{university.name}</h1>
            </div>
          </div>

          <p>{university.description}</p>
        </div>
      </section>

      <section className="university-services-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">
              خدمات الجامعة
            </span>

            <h2>ماذا تريد أن تعرف؟</h2>
          </div>

          <div className="services-grid">
            {university.services.map((service) => (
              <UniversityServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .university-details-page {
          min-height: 70vh;
        }

        .university-details-hero {
          padding: 55px 0 65px;
          background: linear-gradient(
            180deg,
            #f8fbff 0%,
            #ffffff 100%
          );
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 38px;
          color: #2455c4;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
        }

        .university-title {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .university-title-icon {
          width: 72px;
          height: 72px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          background: #e8f1ff;
          color: #2455c4;
        }

        .university-title span {
          color: #2455c4;
          font-size: 14px;
          font-weight: 700;
        }

        .university-title h1 {
          margin: 6px 0 0;
          color: #17233d;
          font-size: clamp(30px, 5vw, 46px);
          font-weight: 800;
        }

        .university-details-hero > .container > p {
          max-width: 700px;
          margin: 24px 0 0;
          color: #697791;
          line-height: 1.9;
          font-size: 17px;
        }

        .university-services-section {
          padding: 20px 0 90px;
        }

        .section-heading {
          margin-bottom: 35px;
        }

        .section-kicker {
          color: #2455c4;
          font-size: 14px;
          font-weight: 700;
        }

        .section-heading h2 {
          margin: 10px 0 0;
          color: #17233d;
          font-size: clamp(25px, 4vw, 36px);
          font-weight: 800;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
        }

        .university-service-card {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding: 24px;
          background: #ffffff;
          border: 1px solid #e4ebf4;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(23, 35, 61, 0.05);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .university-service-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 32px rgba(36, 85, 196, 0.1);
        }

        .university-service-icon {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          background: #e8f1ff;
          font-size: 24px;
        }

        .university-service-card h3 {
          margin: 0 0 8px;
          color: #17233d;
          font-size: 18px;
          font-weight: 800;
        }

        .university-service-card p {
          margin: 0;
          color: #697791;
          font-size: 14px;
          line-height: 1.8;
        }

        .university-service-arrow {
          position: absolute;
          left: 20px;
          bottom: 18px;
          color: #2455c4;
          font-size: 18px;
        }

        @media (max-width: 700px) {
          .university-title {
            align-items: flex-start;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .university-details-hero {
            padding: 40px 0 50px;
          }

          .university-title {
            gap: 14px;
          }

          .university-title-icon {
            width: 58px;
            height: 58px;
            border-radius: 16px;
          }

          .university-title h1 {
            font-size: 28px;
          }

          .university-service-card {
            padding: 20px;
          }
        }
      `}</style>
    </main>
  )
}