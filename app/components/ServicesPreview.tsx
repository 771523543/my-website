'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  GraduationCap,
  LayoutGrid,
  Sparkles,
} from 'lucide-react'

export default function ServicesPreview() {
  return (
    <section className="section services-preview" id="services">
      <div className="container">
        {/* رأس القسم */}
        <div className="section-heading services-preview-heading">
          <div className="section-kicker">
            <span className="section-kicker-dot" />
            خدمات منصة هديل
          </div>

          <h2>
            خدماتنا <span>الأكاديمية والطلابية</span>
          </h2>

          <p>
            مجموعة متكاملة من الخدمات الأكاديمية والبحثية والتصميمية لمساعدتك
            في إنجاز متطلباتك الدراسية والمهنية بصورة منظمة واحترافية.
          </p>
        </div>

        {/* بوابة الخدمات */}
        <div className="services-preview-card">
          {/* الشارة */}
          <div className="services-preview-badge">
            <Sparkles size={16} />
            <span>خدمات متنوعة تناسب احتياجاتك</span>
          </div>

          {/* المحتوى الرئيسي */}
          <div className="services-preview-content">
            {/* الأيقونة - في الوسط */}
            <div className="services-preview-icon">
              <LayoutGrid size={36} strokeWidth={1.8} />
            </div>

            {/* النصوص - في الوسط */}
            <div className="services-preview-main">
              <span className="services-preview-label">
                منصة هديل للخدمات الطلابية
              </span>

              <h3>كل ما تحتاجه في مكان واحد</h3>

              <p>
                استكشف خدماتنا المتنوعة في المجالات البحثية والأكاديمية
                والتصميمية، واختر الخدمة المناسبة لاحتياجك بسهولة.
              </p>

              <Link href="/services" className="services-preview-button">
                <span>استكشف خدماتنا</span>
                <ArrowLeft size={18} />
              </Link>
            </div>
          </div>

          {/* أنواع الخدمات */}
          <div className="services-preview-features">
            <div className="services-preview-feature">
              <div className="services-preview-feature-icon">
                <BookOpen size={21} strokeWidth={1.8} />
              </div>

              <div>
                <strong>خدمات بحثية</strong>
                <span>بحوث وتقارير ودراسات</span>
              </div>
            </div>

            <div className="services-preview-feature">
              <div className="services-preview-feature-icon">
                <GraduationCap size={21} strokeWidth={1.8} />
              </div>

              <div>
                <strong>خدمات أكاديمية</strong>
                <span>واجبات وتكاليف ومهام</span>
              </div>
            </div>

            <div className="services-preview-feature">
              <div className="services-preview-feature-icon">
                <BriefcaseBusiness size={21} strokeWidth={1.8} />
              </div>

              <div>
                <strong>خدمات مهنية</strong>
                <span>تصميم وعروض وسيرة ذاتية</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .services-preview {
          background: var(--background);
        }

        /* رأس القسم */
        .services-preview-heading {
          max-width: 760px;
          margin-inline: auto;
          text-align: center;
        }

        .services-preview-heading h2 {
          color: var(--foreground);
        }

        .services-preview-heading h2 span {
          color: var(--primary);
        }

        .services-preview-heading p {
          max-width: 650px;
          margin: 14px auto 0;
          color: var(--muted-foreground);
          line-height: 1.9;
        }

        /* بطاقة بوابة الخدمات */
        .services-preview-card {
          position: relative;
          overflow: hidden;
          margin-top: 38px;
          padding: 34px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: 0 12px 30px rgba(25, 56, 100, 0.07);
        }

        .services-preview-card::before {
          content: '';
          position: absolute;
          top: 0;
          inset-inline: 0;
          height: 4px;
          background: linear-gradient(
            90deg,
            var(--primary),
            var(--accent),
            var(--primary)
          );
        }

        /* الشارة */
        .services-preview-badge {
          position: absolute;
          top: 22px;
          inset-inline-end: 24px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 12px;
          color: var(--foreground);
          background: #fff8e8;
          border: 1px solid #f2d79e;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 750;
        }

        .services-preview-badge svg {
          color: #d18d24;
          flex-shrink: 0;
        }

        /* المحتوى */
        .services-preview-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-top: 32px;
        }

        /* الأيقونة في الوسط */
        .services-preview-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 76px;
          height: 76px;
          margin-bottom: 18px;
          color: var(--primary);
          background: var(--secondary);
          border: 1px solid #d5e4fb;
          border-radius: 20px;
          transition:
            color 0.2s ease,
            background 0.2s ease,
            transform 0.2s ease;
        }

        .services-preview-card:hover .services-preview-icon {
          color: white;
          background: var(--primary);
          transform: translateY(-2px);
        }

        /* النصوص في الوسط */
        .services-preview-main {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .services-preview-label {
          display: inline-block;
          margin-bottom: 8px;
          color: #d18d24;
          font-size: 13px;
          font-weight: 800;
        }

        .services-preview-content h3 {
          margin: 0;
          color: var(--foreground);
          font-size: clamp(25px, 3vw, 34px);
          font-weight: 850;
          line-height: 1.35;
          text-align: center;
        }

        .services-preview-content p {
          max-width: 680px;
          margin: 12px auto 20px;
          color: var(--muted-foreground);
          line-height: 1.9;
          text-align: center;
        }

        /* الزر */
        .services-preview-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 48px;
          padding: 0 20px;
          color: var(--primary-foreground);
          background: var(--primary);
          border: 1px solid var(--primary);
          border-radius: 12px;
          font-weight: 800;
          text-decoration: none;
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .services-preview-button:hover {
          background: #1e48a8;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(36, 85, 196, 0.2);
        }

        .services-preview-button svg {
          transition: transform 0.2s ease;
        }

        .services-preview-button:hover svg {
          transform: translateX(-3px);
        }

        /* أنواع الخدمات */
        .services-preview-features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 30px;
          padding-top: 26px;
          border-top: 1px solid var(--border);
        }

        .services-preview-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          padding: 15px;
          background: var(--muted);
          border: 1px solid var(--border);
          border-radius: 15px;
          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease;
        }

        .services-preview-feature:hover {
          transform: translateY(-3px);
          background: #f5f9ff;
          border-color: #cbdcf5;
        }

        .services-preview-feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          color: var(--primary);
          background: var(--secondary);
          border-radius: 12px;
        }

        .services-preview-feature strong,
        .services-preview-feature span {
          display: block;
        }

        .services-preview-feature strong {
          margin-bottom: 3px;
          color: var(--foreground);
          font-size: 14px;
          font-weight: 800;
        }

        .services-preview-feature span {
          color: var(--muted-foreground);
          font-size: 12px;
          line-height: 1.6;
        }

        /* الجوال */
        @media (max-width: 800px) {
          .services-preview-card {
            padding: 25px 20px;
            border-radius: 18px;
          }

          .services-preview-badge {
            position: static;
            width: fit-content;
            margin: 0 auto 18px;
          }

          .services-preview-content {
            padding-top: 0;
          }

          .services-preview-icon {
            width: 66px;
            height: 66px;
            margin-bottom: 16px;
            border-radius: 17px;
          }

          .services-preview-features {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .services-preview-card {
            padding: 22px 16px;
          }

          .services-preview-content h3 {
            font-size: 24px;
          }

          .services-preview-content p {
            font-size: 14px;
          }

          .services-preview-button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}