'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  FileCheck,
  FileText,
  GraduationCap,
  Laptop,
  Presentation,
  Search,
  BriefcaseBusiness,
  Scale,
  Calculator,
  FolderOpen,
} from 'lucide-react'

const services = [
  {
    id: 'research',
    title: 'الخدمات البحثية والأكاديمية',
    description: 'البحوث والأوراق العلمية والخدمات الأكاديمية.',
    icon: Search,
  },
  {
    id: 'reports',
    title: 'التقارير الجامعية',
    description: 'إعداد وتنسيق التقارير والمشاريع الجامعية.',
    icon: FileText,
  },
  {
    id: 'assignments',
    title: 'التكاليف الجامعية',
    description: 'تنفيذ وتنسيق التكاليف والمتطلبات الجامعية.',
    icon: ClipboardList,
  },
  {
    id: 'homework',
    title: 'الواجبات الدراسية',
    description: 'مساعدة في إعداد الواجبات والمهام الدراسية.',
    icon: BookOpen,
  },
  {
    id: 'lms',
    title: 'إدارة المنصات والمهام الدراسية',
    description: 'متابعة المهام وإدارة المنصات الدراسية.',
    icon: Laptop,
  },
  {
    id: 'presentation',
    title: 'العروض التقديمية والتصميم',
    description: 'تصميم العروض التقديمية والمحتوى البصري.',
    icon: Presentation,
  },
  {
    id: 'cv',
    title: 'السيرة الذاتية والخدمات المهنية',
    description: 'إعداد السير الذاتية والخدمات المهنية.',
    icon: BriefcaseBusiness,
  },
  {
    id: 'case-study',
    title: 'دراسة الحالة',
    description: 'إعداد وتحليل دراسات الحالة الأكاديمية.',
    icon: Scale,
  },
  {
    id: 'feasibility',
    title: 'دراسات الجدوى',
    description: 'إعداد دراسات الجدوى وتحليل المشاريع.',
    icon: Calculator,
  },
  {
    id: 'graduation',
    title: 'مشاريع التخرج',
    description: 'مشاريع التخرج والأعمال الأكاديمية المتخصصة.',
    icon: GraduationCap,
  },
]

export default function PreviousWorksPage() {
  return (
    <main className="previous-works-page">
      <section className="previous-works-hero">
        <div className="previous-works-hero-icon">
          <FolderOpen size={42} />
        </div>

        <span>منصة هديل</span>

        <h1>أعمالنا السابقة</h1>

        <p>
          استعرض نماذج أعمالنا السابقة حسب الخدمة. سيتم إضافة الأعمال الخاصة
          بكل خدمة هنا تباعًا.
        </p>
      </section>

      <section className="services-works-section">
        <div className="section-title">
          <span>خدمات المنصة</span>
          <h2>اختر الخدمة</h2>
          <p>
            اضغط على أي خدمة لمعرفة الأعمال السابقة الخاصة بها.
          </p>
        </div>

        <div className="services-works-grid">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <button
                key={service.id}
                type="button"
                className="service-work-card"
                onClick={() => {
                  alert(
                    `سيتم رفع الأعمال السابقة لخدمة ${service.title} هنا.`
                  )
                }}
              >
                <div className="service-work-icon">
                  <Icon size={30} />
                </div>

                <div className="service-work-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>

                <span className="service-work-arrow">←</span>
              </button>
            )
          })}
        </div>
      </section>

      <div className="back-home">
        <Link href="/">
          <ArrowRight size={18} />
          العودة إلى الصفحة الرئيسية
        </Link>
      </div>

      <style jsx>{`
        .previous-works-page {
          min-height: 100vh;
          padding: 50px 20px 80px;
          background: #faf9fd;
          direction: rtl;
        }

        .previous-works-hero {
          max-width: 850px;
          margin: 0 auto 55px;
          text-align: center;
        }

        .previous-works-hero-icon {
          width: 90px;
          height: 90px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 26px;
          background: #f0eaff;
          color: #6d4bc3;
        }

        .previous-works-hero span {
          color: #7956c7;
          font-size: 15px;
          font-weight: 700;
        }

        .previous-works-hero h1 {
          margin: 8px 0 14px;
          font-size: clamp(34px, 5vw, 52px);
          font-weight: 900;
          color: #211936;
        }

        .previous-works-hero p {
          max-width: 650px;
          margin: 0 auto;
          color: #6d6878;
          line-height: 2;
          font-size: 17px;
        }

        .services-works-section {
          max-width: 1150px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          margin-bottom: 30px;
        }

        .section-title span {
          color: #7956c7;
          font-size: 14px;
          font-weight: 800;
        }

        .section-title h2 {
          margin: 6px 0;
          color: #211936;
          font-size: 32px;
          font-weight: 900;
        }

        .section-title p {
          margin: 0;
          color: #77717f;
        }

        .services-works-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .service-work-card {
          width: 100%;
          min-height: 145px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 18px;
          text-align: right;
          border: 1px solid rgba(100, 70, 160, 0.12);
          border-radius: 22px;
          background: white;
          box-shadow: 0 8px 25px rgba(30, 20, 60, 0.06);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          font-family: inherit;
        }

        .service-work-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 35px rgba(30, 20, 60, 0.11);
        }

        .service-work-icon {
          min-width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          background: #f0eaff;
          color: #6d4bc3;
        }

        .service-work-content {
          flex: 1;
        }

        .service-work-content h3 {
          margin: 0 0 7px;
          color: #211936;
          font-size: 19px;
          font-weight: 800;
        }

        .service-work-content p {
          margin: 0;
          color: #77717f;
          line-height: 1.7;
          font-size: 14px;
        }

        .service-work-arrow {
          color: #7956c7;
          font-size: 24px;
          font-weight: 700;
        }

        .back-home {
          margin-top: 45px;
          text-align: center;
        }

        .back-home a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #6d4bc3;
          text-decoration: none;
          font-weight: 700;
        }

        @media (max-width: 700px) {
          .services-works-grid {
            grid-template-columns: 1fr;
          }

          .previous-works-page {
            padding-top: 35px;
          }

          .service-work-card {
            min-height: 130px;
            padding: 18px;
          }

          .service-work-icon {
            min-width: 55px;
            height: 55px;
          }

          .service-work-content h3 {
            font-size: 16px;
          }
        }
      `}</style>
    </main>
  )
}