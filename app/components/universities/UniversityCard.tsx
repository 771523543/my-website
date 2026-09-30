"use client"

import Link from "next/link"
import {
  ArrowLeft,
  GraduationCap,
  Sparkles,
} from "lucide-react"

import type { University } from "./data"

type Props = {
  university: University
}

export default function UniversityCard({
  university,
}: Props) {
  return (
    <Link
      href={`/universities/${university.slug}`}
      className="university-card"
    >
      <div className="university-card-top">
        <div className="university-card-icon">
          <GraduationCap size={28} strokeWidth={2} />
        </div>

        <div className="university-card-label">
          <Sparkles size={14} />
          <span>خدمات جامعية</span>
        </div>
      </div>

      <div className="university-card-content">
        <h3>{university.name}</h3>

        <p>
          {university.description}
        </p>
      </div>

      <div className="university-card-services">
        <span>
          {university.services.length} خدمات متاحة
        </span>

        <span className="services-line" />
      </div>

      <div className="university-card-footer">
        <span>استكشف خدمات الجامعة</span>

        <span className="university-card-arrow">
          <ArrowLeft size={18} />
        </span>
      </div>

      <style jsx>{`
        .university-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 285px;
          padding: 25px;
          overflow: hidden;
          border: 1px solid #e4ebf4;
          border-radius: 22px;
          background: #ffffff;
          color: inherit;
          text-decoration: none;
          box-shadow:
            0 8px 30px rgba(23, 35, 61, 0.06);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .university-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(
            90deg,
            #2455c4,
            #e9b24c
          );
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .university-card:hover {
          transform: translateY(-6px);
          border-color: #cbdafa;
          box-shadow:
            0 18px 42px rgba(36, 85, 196, 0.12);
        }

        .university-card:hover::before {
          opacity: 1;
        }

        .university-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 22px;
        }

        .university-card-icon {
          width: 58px;
          height: 58px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #d8e5fa;
          border-radius: 16px;
          background: #e8f1ff;
          color: #2455c4;
          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }

        .university-card:hover .university-card-icon {
          transform: translateY(-2px);
          background: #dfebff;
        }

        .university-card-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 10px;
          border-radius: 999px;
          background: #f7f9fc;
          color: #697791;
          font-size: 11px;
          font-weight: 700;
        }

        .university-card-label svg {
          color: #e0a63e;
        }

        .university-card-content {
          flex: 1;
        }

        .university-card-content h3 {
          margin: 0 0 10px;
          color: #17233d;
          font-size: 21px;
          line-height: 1.4;
          font-weight: 800;
        }

        .university-card-content p {
          margin: 0;
          color: #697791;
          font-size: 14px;
          line-height: 1.9;
        }

        .university-card-services {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 22px;
          color: #2455c4;
          font-size: 12px;
          font-weight: 700;
        }

        .services-line {
          width: 28px;
          height: 1px;
          background: #d6e1f2;
        }

        .university-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-top: 18px;
          padding-top: 17px;
          border-top: 1px solid #edf3fa;
          color: #2455c4;
          font-size: 13px;
          font-weight: 800;
        }

        .university-card-arrow {
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #f0f5ff;
          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }

        .university-card:hover
          .university-card-arrow {
          transform: translateX(-3px);
          background: #e4edff;
        }

        @media (max-width: 600px) {
          .university-card {
            min-height: 260px;
            padding: 22px;
          }

          .university-card-content h3 {
            font-size: 20px;
          }
        }
      `}</style>
    </Link>
  )
}