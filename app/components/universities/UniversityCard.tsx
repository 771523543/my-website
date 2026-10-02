"use client"

import Image from "next/image"
import Link from "next/link"
import {
  GraduationCap,
  BookOpen,
  MapPin,
  CalendarDays,
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

      {/* محتوى البطاقة */}
      <div className="university-card-content">

        <h3>
          {university.name}
        </h3>

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

        {/* أزرار البطاقة */}
        <div className="university-card-actions">

          {/* الكليات والتخصصات */}
          <Link
            href={`/universities/${university.slug}/colleges`}
            className="university-action university-action-primary"
          >
            <GraduationCap size={21} />

            <span>
              الكليات والتخصصات
            </span>
          </Link>

          {/* بوابة الطالب */}
          <Link
            href={`/universities/${university.slug}/student`}
            className="university-action university-action-secondary"
          >
            <BookOpen size={21} />

            <span>
              بوابة الطالب
            </span>
          </Link>

        </div>

      </div>

      <style>{`

        /* =========================
           بطاقة الجامعة
        ========================= */

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

          border-color:
            rgba(36, 85, 196, 0.22);

          box-shadow:
            0 18px 42px
            rgba(36, 85, 196, 0.10);
        }


        /* =========================
           شعار الجامعة
        ========================= */

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


        /* =========================
           محتوى البطاقة
        ========================= */

        .university-card-content {
          display: flex;
          flex-direction: column;

          flex: 1;
        }

        .university-card-content h3 {
          margin: 0;

          color: #17233d;

          font-size: 19px;
          font-weight: 900;

          line-height: 1.6;

          text-align: center;
        }


        /* =========================
           الوصف
        ========================= */

        .university-card-description {
          min-height: 52px;

          margin: 10px 0 18px;

          color: #697791;

          font-size: 13px;

          line-height: 1.9;

          text-align: center;
        }


        /* =========================
           معلومات الجامعة
        ========================= */

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


        /* =========================
           الأزرار
        ========================= */

        .university-card-actions {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 10px;

          margin-top: auto;
        }

        .university-action {
          min-height: 58px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          padding: 10px 12px;

          border-radius: 15px;

          text-decoration: none;

          font-size: 12px;

          font-weight: 800;

          line-height: 1.5;

          text-align: center;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .university-action:hover {
          transform: translateY(-2px);
        }


        /* =========================
           زر الكليات والتخصصات
        ========================= */

        .university-action-primary {
          background: #2455c4;

          color: #ffffff;

          box-shadow:
            0 8px 18px
            rgba(36, 85, 196, 0.18);
        }

        .university-action-primary:hover {
          background: #1f4caf;

          box-shadow:
            0 12px 24px
            rgba(36, 85, 196, 0.25);
        }


        /* =========================
           زر بوابة الطالب
        ========================= */

        .university-action-secondary {
          background: #e8f1ff;

          color: #2455c4;
        }

        .university-action-secondary:hover {
          background: #dceaff;
        }


        /* =========================
           الجوال
        ========================= */

        @media (max-width: 500px) {

          .university-card {
            padding: 20px;
          }

          .university-card-actions {
            grid-template-columns: 1fr;
          }

          .university-action {
            min-height: 52px;
          }

        }

      `}</style>

    </article>
  )
}