"use client"

import Image from "next/image"
import Link from "next/link"
import {
  GraduationCap,
  BookOpen,
  MapPin,
  CalendarDays,
  ArrowRight,
} from "lucide-react"

import type { University } from "./data"

type Props = {
  university: University
}

export default function UniversityCard({
  university,
}: Props) {
  return (
    <article className="university-card">

      {/* شعار الجامعة */}
      <div className="university-card-logo">
        <Image
          src={university.logo}
          alt={`شعار ${university.name}`}
          width={110}
          height={110}
        />
      </div>

      <div className="university-card-content">

        {/* اسم الجامعة */}
        <h3 className="university-card-title">
          {university.name}
        </h3>

        {/* وصف الجامعة */}
        <p className="university-card-description">
          {university.description}
        </p>

        {/* معلومات الجامعة */}
        <div className="university-card-meta">

          <span>
            <CalendarDays size={16} />
            تأسست {university.founded}
          </span>

          <span>
            <MapPin size={16} />
            {university.city}
          </span>

          <span>
            <GraduationCap size={16} />
            {university.colleges.length} كلية
          </span>

        </div>

        {/* نفس بطاقات الأقسام الموجودة تحت:
            اختر القسم الذي تريد الوصول إليه */}
        <div className="university-actions">

          {/* الكليات والتخصصات */}
          <Link
            href={`/universities/${university.slug}/colleges`}
            className="university-action university-action-primary"
          >
            <div className="university-action-icon">
              <GraduationCap size={30} />
            </div>

            <div className="university-action-content">
              <h4>
                الكليات والتخصصات
              </h4>

              <p>
                استعرض كليات الجامعة والتخصصات والبرامج الأكاديمية المتاحة.
              </p>
            </div>

            <div className="university-action-arrow">
              <ArrowRight size={20} />
            </div>
          </Link>

          {/* بوابة الطالب */}
          <Link
            href={`/universities/${university.slug}/student`}
            className="university-action university-action-secondary"
          >
            <div className="university-action-icon">
              <BookOpen size={30} />
            </div>

            <div className="university-action-content">
              <h4>
                بوابة الطالب
              </h4>

              <p>
                الوصول إلى الأدلة والملفات والشروحات والخدمات المهمة للطلاب.
              </p>
            </div>

            <div className="university-action-arrow">
              <ArrowRight size={20} />
            </div>
          </Link>

        </div>

      </div>

      <style>{`
        .university-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 24px;
          background: #ffffff;
          border: 1px solid #e4ebf4;
          border-radius: 24px;
          box-shadow:
            0 10px 30px
            rgba(23, 35, 61, 0.06);
          direction: rtl;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .university-card:hover {
          transform: translateY(-5px);
          border-color: rgba(36, 85, 196, 0.22);
          box-shadow:
            0 18px 42px
            rgba(36, 85, 196, 0.10);
        }

        /* شعار الجامعة */
        .university-card-logo {
          width: 110px;
          height: 110px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          background: #ffffff;
          border: 1px solid #edf1f7;
          border-radius: 22px;
          box-shadow:
            0 8px 20px
            rgba(23, 35, 61, 0.06);
        }

        .university-card-logo img {
          width: 88px;
          height: 88px;
          object-fit: contain;
        }

        .university-card-content {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* اسم الجامعة */
        .university-card-title {
          margin: 0;
          color: #17233d;
          font-size: 19px;
          font-weight: 900;
          line-height: 1.6;
          text-align: center;
        }

        /* الوصف */
        .university-card-description {
          min-height: 52px;
          margin: 10px 0 18px;
          color: #697791;
          font-size: 13px;
          line-height: 1.9;
          text-align: center;
        }

        /* معلومات الجامعة */
        .university-card-meta {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 22px;
        }

        .university-card-meta span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 9px;
          border-radius: 10px;
          background: #f4f7fb;
          color: #52617a;
          font-size: 11px;
          font-weight: 700;
        }

        .university-card-meta svg {
          color: #2455c4;
        }

        /* بطاقات الأقسام */
        .university-actions {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          margin-top: auto;
        }

        .university-action {
          min-height: 150px;
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 20px;
          border-radius: 22px;
          text-decoration: none;
          border: 1px solid transparent;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease,
            border-color 0.2s ease;
        }

        .university-action:hover {
          transform: translateY(-3px);
        }

        /* الأيقونة */
        .university-action-icon {
          width: 58px;
          height: 58px;
          flex: 0 0 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 17px;
        }

        .university-action-primary
          .university-action-icon {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .university-action-secondary
          .university-action-icon {
          background: #e8f1ff;
          color: #2455c4;
        }

        /* محتوى البطاقة */
        .university-action-content {
          flex: 1;
          min-width: 0;
        }

        .university-action-content h4 {
          margin: 0 0 7px;
          font-size: 16px;
          font-weight: 900;
          line-height: 1.5;
        }

        .university-action-content p {
          margin: 0;
          font-size: 11px;
          line-height: 1.8;
        }

        /* السهم */
        .university-action-arrow {
          width: 36px;
          height: 36px;
          flex: 0 0 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: transform 0.2s ease;
        }

        .university-action:hover
          .university-action-arrow {
          transform: translateX(-4px);
        }

        /* البطاقة الزرقاء */
        .university-action-primary {
          background: #2455c4;
          color: #ffffff;
          box-shadow:
            0 10px 24px
            rgba(36, 85, 196, 0.16);
        }

        .university-action-primary:hover {
          background: #1f4caf;
          box-shadow:
            0 14px 30px
            rgba(36, 85, 196, 0.24);
        }

        .university-action-primary
          .university-action-arrow {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        /* البطاقة البيضاء */
        .university-action-secondary {
          background: #ffffff;
          color: #17233d;
          border-color: #e4ebf4;
          box-shadow:
            0 8px 22px
            rgba(23, 35, 61, 0.06);
        }

        .university-action-secondary:hover {
          background: #f8fbff;
          border-color: rgba(36, 85, 196, 0.20);
          box-shadow:
            0 12px 28px
            rgba(36, 85, 196, 0.10);
        }

        .university-action-secondary
          .university-action-arrow {
          background: #e8f1ff;
          color: #2455c4;
        }

        /* الشاشات المتوسطة */
        @media (max-width: 800px) {
          .university-actions {
            grid-template-columns: 1fr;
          }

          .university-action {
            min-height: 135px;
          }
        }

        /* الجوال */
        @media (max-width: 500px) {
          .university-card {
            padding: 20px;
          }

          .university-actions {
            gap: 12px;
          }

          .university-action {
            min-height: 125px;
            padding: 17px;
            gap: 12px;
            border-radius: 19px;
          }

          .university-action-icon {
            width: 52px;
            height: 52px;
            flex-basis: 52px;
            border-radius: 15px;
          }

          .university-action-icon svg {
            width: 26px;
            height: 26px;
          }

          .university-action-content h4 {
            font-size: 14px;
          }

          .university-action-content p {
            font-size: 10px;
            line-height: 1.7;
          }

          .university-action-arrow {
            width: 32px;
            height: 32px;
            flex-basis: 32px;
          }
        }
      `}</style>
    </article>
  )
}