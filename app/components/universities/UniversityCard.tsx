"use client"

import Link from "next/link"
import { ArrowLeft, GraduationCap } from "lucide-react"
import type { University } from "./data"

type Props = {
  university: University
}

export default function UniversityCard({ university }: Props) {
  return (
    <Link
      href={`/universities/${university.slug}`}
      className="university-card"
    >
      {/* الأيقونة */}
      <div className="university-icon-wrap">
        <div className="university-icon">
          <GraduationCap
            size={38}
            strokeWidth={1.8}
          />
        </div>
      </div>

      {/* المحتوى */}
      <div className="university-content">
        <h3>{university.name}</h3>

        <p>{university.description}</p>
      </div>

      {/* زر استكشف الجامعة */}
      <div className="university-explore">
        <span>استكشف الجامعة</span>

        <span className="university-arrow">
          <ArrowLeft size={17} />
        </span>
      </div>

      <style jsx>{`
        .university-card {
          position: relative;

          display: flex;
          flex-direction: column;
          align-items: center;

          width: 100%;
          min-height: 320px;

          padding: 30px 24px 24px;

          background: #ffffff;

          border: 1px solid #e4ebf4;
          border-radius: 24px;

          text-decoration: none;
          text-align: center;

          color: #17233d;

          box-shadow:
            0 8px 25px rgba(36, 85, 196, 0.06),
            0 2px 8px rgba(23, 35, 61, 0.03);

          overflow: hidden;

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        /* الخط العلوي */
        .university-card::before {
          content: "";

          position: absolute;
          top: 0;
          left: 50%;

          width: 120px;
          height: 3px;

          transform: translateX(-50%);

          background: #2455c4;

          border-radius: 0 0 10px 10px;

          transition:
            width 0.3s ease,
            background 0.3s ease;
        }

        .university-card:hover {
          transform: translateY(-7px);

          border-color: rgba(36, 85, 196, 0.3);

          box-shadow:
            0 18px 40px rgba(36, 85, 196, 0.12),
            0 5px 15px rgba(23, 35, 61, 0.05);
        }

        .university-card:hover::before {
          width: 180px;
          background: #e9b24c;
        }

        /* =========================
           الأيقونة
        ========================= */

        .university-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 94px;
          height: 94px;

          margin: 4px auto 20px;

          border-radius: 28px;

          background: #e8f1ff;

          box-shadow:
            0 10px 25px rgba(36, 85, 196, 0.12),
            inset 0 0 0 1px rgba(36, 85, 196, 0.08);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            background 0.3s ease;
        }

        .university-icon {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 66px;
          height: 66px;

          border-radius: 20px;

          background: #2455c4;
          color: #ffffff;

          box-shadow:
            0 8px 18px rgba(36, 85, 196, 0.25);

          transition:
            transform 0.3s ease,
            background 0.3s ease;
        }

        .university-card:hover .university-icon-wrap {
          transform: translateY(-4px);

          box-shadow:
            0 15px 32px rgba(36, 85, 196, 0.18),
            inset 0 0 0 1px rgba(36, 85, 196, 0.1);
        }

        .university-card:hover .university-icon {
          transform: scale(1.04);
          background: #1f4caf;
        }

        /* =========================
           النص
        ========================= */

        .university-content {
          width: 100%;
          max-width: 340px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          direction: rtl;
          text-align: center;

          flex: 1;
        }

        .university-content h3 {
          width: 100%;

          margin: 0 0 10px;

          color: #17233d;

          font-size: 21px;
          font-weight: 800;
          line-height: 1.5;

          text-align: center;
        }

        .university-content p {
          width: 100%;
          max-width: 310px;

          margin: 0 auto;

          color: #697791;

          font-size: 14px;
          font-weight: 500;
          line-height: 1.9;

          text-align: center;
        }

        /* =========================
           زر استكشف الجامعة
        ========================= */

        .university-explore {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          margin: 22px auto 0;

          padding: 11px 20px;

          border-radius: 12px;

          background: #2455c4;
          color: #ffffff;

          font-size: 14px;
          font-weight: 800;

          direction: rtl;

          box-shadow:
            0 7px 16px rgba(36, 85, 196, 0.18);

          transition:
            background 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .university-arrow {
          display: flex;
          align-items: center;
          justify-content: center;

          color: #ffffff;

          transition:
            transform 0.25s ease;
        }

        .university-card:hover .university-explore {
          background: #1f4caf;
          color: #ffffff;

          transform: translateY(-2px);

          box-shadow:
            0 10px 22px rgba(36, 85, 196, 0.25);
        }

        .university-card:hover .university-arrow {
          transform: translateX(-3px);
        }

        /* =========================
           الجوال
        ========================= */

        @media (max-width: 600px) {
          .university-card {
            min-height: 300px;

            padding: 27px 20px 22px;

            border-radius: 22px;
          }

          .university-icon-wrap {
            width: 84px;
            height: 84px;

            border-radius: 24px;
          }

          .university-icon {
            width: 60px;
            height: 60px;

            border-radius: 18px;
          }

          .university-content h3 {
            font-size: 19px;
          }

          .university-content p {
            font-size: 13px;
            line-height: 1.8;
          }

          .university-explore {
            font-size: 13px;

            padding: 10px 16px;
          }
        }
      `}</style>
    </Link>
  )
}