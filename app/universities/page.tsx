import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowRight,
  GraduationCap,
  MapPin,
  CalendarDays,
  BookOpen,
  Search,
  Globe,
  FileText,
  ClipboardList,
  BarChart3,
  Mail,
  HelpCircle,
} from "lucide-react"

import {
  universities,
} from "@/app/components/universities/data"

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

export default async function UniversityPage({
  params,
}: Props) {
  const { slug } = await params

  const university = universities.find(
    (item) => item.slug === slug
  )

  if (!university) {
    notFound()
  }

  return (
    <main className="university-details-page">

      {/* رأس الجامعة */}
      <section className="university-details-hero">
        <div className="container">

          <Link
            href="/universities"
            className="back-link"
          >
            <ArrowRight size={18} />
            العودة إلى الجامعات
          </Link>

          <div className="university-profile">

            <div className="university-profile-logo">
              <Image
                src={university.logo}
                alt={`شعار ${university.name}`}
                width={130}
                height={130}
              />
            </div>

            <div className="university-profile-content">

              <span className="profile-kicker">
                دليل الجامعة
              </span>

              <h1>{university.name}</h1>

              <p>
                {university.description}
              </p>

              <div className="profile-meta">

                <span>
                  <CalendarDays size={17} />
                  تأسست {university.founded}
                </span>

                <span>
                  <MapPin size={17} />
                  {university.city}
                </span>

                <span>
                  <GraduationCap size={17} />
                  {university.colleges.length} كلية
                </span>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* الكليات */}
      <section className="colleges-section">
        <div className="container">

          <div className="section-heading">
            <span className="section-kicker">
              التخصصات الأكاديمية
            </span>

            <h2>كليات الجامعة</h2>

            <p>
              اختر الكلية للتعرف على التخصصات
              والبرامج المرتبطة بها.
            </p>
          </div>

          <div className="colleges-grid">

            {university.colleges.map(
              (college, index) => (
                <details
                  className="college-card"
                  key={college.name}
                >
                  <summary>
                    <span className="college-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="college-icon">
                      <GraduationCap size={22} />
                    </span>

                    <span className="college-name">
                      {college.name}
                    </span>

                    <span className="college-count">
                      {college.majors.length}
                    </span>
                  </summary>

                  <div className="majors-list">

                    <div className="majors-title">
                      <BookOpen size={17} />
                      التخصصات
                    </div>

                    <div className="majors-items">
                      {college.majors.map(
                        (major) => (
                          <span key={major}>
                            {major}
                          </span>
                        )
                      )}
                    </div>

                  </div>
                </details>
              )
            )}

          </div>
        </div>
      </section>

      {/* ماذا تريد أن تعرف */}
      <section className="student-section">
        <div className="container">

          <div className="section-heading">
            <span className="section-kicker">
              للطلاب
            </span>

            <h2>ماذا تريد أن تعرف؟</h2>

            <p>
              أهم المعلومات التي يحتاجها الطالب
              أثناء دراسته الجامعية.
            </p>
          </div>

          <div className="student-grid">

            <StudentCard
              icon={<Search size={23} />}
              title="القبول والتسجيل"
              description="معلومات القبول والتسجيل والبرامج المتاحة."
            />

            <StudentCard
              icon={<Globe size={23} />}
              title="البوابة الأكاديمية"
              description="الوصول إلى الأنظمة والبوابات الإلكترونية."
            />

            <StudentCard
              icon={<ClipboardList size={23} />}
              title="التسجيل في المقررات"
              description="معلومات التسجيل والحذف والإضافة."
            />

            <StudentCard
              icon={<CalendarDays size={23} />}
              title="التقويم الأكاديمي"
              description="مواعيد الدراسة والاختبارات والإجازات."
            />

            <StudentCard
              icon={<BarChart3 size={23} />}
              title="النتائج والسجل الأكاديمي"
              description="معلومات النتائج والمعدل والسجل الأكاديمي."
            />

            <StudentCard
              icon={<Mail size={23} />}
              title="البريد الجامعي"
              description="معلومات البريد والخدمات المرتبطة به."
            />

            <StudentCard
              icon={<FileText size={23} />}
              title="الأدلة والشروحات"
              description="شروحات مبسطة للأنظمة والخدمات الجامعية."
            />

            <StudentCard
              icon={<HelpCircle size={23} />}
              title="الأسئلة الشائعة"
              description="إجابات عن أكثر الاستفسارات التي يبحث عنها الطلاب."
            />

          </div>

        </div>
      </section>

      <style>{`

        .university-details-page {
          min-height: 100vh;
          background: #f8fbff;
        }

        .university-details-hero {
          padding: 45px 0 70px;
          background:
            radial-gradient(
              circle at 15% 15%,
              rgba(233, 178, 76, 0.16),
              transparent 25%
            ),
            linear-gradient(
              135deg,
              #2455c4,
              #1f4caf,
              #183d91
            );
          color: #fff;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 45px;
        }

        .back-link:hover {
          color: #fff;
        }

        .university-profile {
          display: flex;
          align-items: center;
          gap: 35px;
          direction: rtl;
        }

        .university-profile-logo {
          flex: 0 0 150px;
          width: 150px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 32px;
          background: #fff;
          box-shadow:
            0 18px 40px rgba(0, 0, 0, 0.16);
        }

        .university-profile-logo img {
          width: 120px;
          height: 120px;
          object-fit: contain;
        }

        .university-profile-content {
          flex: 1;
        }

        .profile-kicker {
          display: inline-block;
          margin-bottom: 10px;
          color: #f6d78d;
          font-size: 14px;
          font-weight: 800;
        }

        .university-profile h1 {
          margin: 0;
          color: #fff;
          font-size: clamp(32px, 5vw, 50px);
          font-weight: 900;
          line-height: 1.25;
        }

        .university-profile p {
          max-width: 800px;
          margin: 15px 0 0;
          color: rgba(255, 255, 255, 0.88);
          font-size: 16px;
          line-height: 2;
        }

        .profile-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 22px;
        }

        .profile-meta span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 13px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.11);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
        }

        .colleges-section,
        .student-section {
          padding: 80px 0;
        }

        .student-section {
          background: #fff;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 38px;
        }

        .section-kicker {
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
          max-width: 650px;
          margin: auto;
          color: #697791;
          line-height: 1.9;
        }

        .colleges-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .college-card {
          background: #fff;
          border: 1px solid #e4ebf4;
          border-radius: 18px;
          overflow: hidden;
          transition:
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            transform 0.25s ease;
        }

        .college-card:hover {
          transform: translateY(-3px);
          border-color: rgba(36, 85, 196, 0.25);
          box-shadow:
            0 12px 30px rgba(36, 85, 196, 0.08);
        }

        .college-card summary {
          list-style: none;
          cursor: pointer;
          display: grid;
          grid-template-columns: 34px 45px 1fr 28px;
          align-items: center;
          gap: 10px;
          padding: 17px;
          direction: rtl;
        }

        .college-card summary::-webkit-details-marker {
          display: none;
        }

        .college-number {
          color: #a4aec0;
          font-size: 11px;
          font-weight: 800;
          direction: ltr;
          text-align: center;
        }

        .college-icon {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          background: #e8f1ff;
          color: #2455c4;
        }

        .college-name {
          color: #17233d;
          font-size: 14px;
          font-weight: 800;
          line-height: 1.6;
        }

        .college-count {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f4f7fb;
          color: #2455c4;
          font-size: 11px;
          font-weight: 800;
        }

        .majors-list {
          padding: 0 20px 20px;
          direction: rtl;
        }

        .majors-title {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 12px;
          color: #2455c4;
          font-size: 13px;
          font-weight: 800;
        }

        .majors-items {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .majors-items span {
          padding: 8px 11px;
          border-radius: 10px;
          background: #f4f7fb;
          color: #697791;
          font-size: 12px;
          font-weight: 600;
        }

        .student-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .student-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 190px;
          padding: 25px 20px;
          border: 1px solid #e4ebf4;
          border-radius: 20px;
          background: #fff;
          text-align: center;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .student-card:hover {
          transform: translateY(-5px);
          border-color: rgba(36, 85, 196, 0.25);
          box-shadow:
            0 15px 35px rgba(36, 85, 196, 0.09);
        }

        .student-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          margin-bottom: 15px;
          border-radius: 16px;
          background: #e8f1ff;
          color: #2455c4;
        }

        .student-card h3 {
          margin: 0 0 8px;
          color: #17233d;
          font-size: 16px;
          font-weight: 800;
        }

        .student-card p {
          margin: 0;
          color: #697791;
          font-size: 13px;
          line-height: 1.8;
        }

        @media (max-width: 1000px) {
          .colleges-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .student-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 650px) {
          .university-details-hero {
            padding: 30px 0 55px;
          }

          .university-profile {
            flex-direction: column;
            text-align: center;
          }

          .university-profile-logo {
            width: 125px;
            height: 125px;
            flex-basis: 125px;
          }

          .university-profile-logo img {
            width: 100px;
            height: 100px;
          }

          .university-profile p {
            font-size: 14px;
          }

          .profile-meta {
            justify-content: center;
          }

          .colleges-section,
          .student-section {
            padding: 60px 0;
          }

          .colleges-grid,
          .student-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  )
}

function StudentCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="student-card">
      <div className="student-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  )
}