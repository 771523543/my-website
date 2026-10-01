"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, CalendarDays } from "lucide-react"

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
      <div className="university-logo-wrap">
        <Image
          src={university.logo}
          alt={`شعار ${university.name}`}
          width={90}
          height={90}
          className="university-logo"
        />
      </div>

      <div className="university-content">
        <h3>{university.name}</h3>

        <p>{university.description}</p>

        <div className="university-meta">
          <span>
            <CalendarDays size={15} />
            تأسست {university.founded}
          </span>

          <span>
            <MapPin size={15} />
            {university.city}
          </span>
        </div>
      </div>

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
          min-height: 390px;
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

        .university-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 112px;
          height: 112px;
          margin: 4px auto 20px;
          border-radius: 28px;
          background: #f8fbff;
          border: 1px solid #e4ebf4;
          box-shadow:
            0 10px 25px rgba(36, 85, 196, 0.08);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .university-logo {
          width: 88px;
          height: 88px;
          object-fit: contain;
          display: block;
        }

        .university-card:hover .university-logo-wrap {
          transform: translateY(-4px);
          box-shadow:
            0 15px 32px rgba(36, 85, 196, 0.14);
        }

        .university-content {
          width: 100%;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          direction: rtl;
        }

        .university-content h3 {
          width: 100%;
          margin: 0 0 10px;
          color: #17233d;
          font-size: 20px;
          font-weight: 800;
          line-height: 1.5;
          text-align: center;
        }

        .university-content p {
          width: 100%;
          margin: 0;
          color: #697791;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.9;
          text-align: center;
        }

        .university-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 16px;
          direction: rtl;
        }

        .university-meta span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 10px;
          border-radius: 10px;
          background: #f4f7fb;
          color: #697791;
          font-size: 12px;
          font-weight: 700;
        }

        .university-meta svg {
          color: #2455c4;
        }

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
          color: #ffffff;
          transition: transform 0.25s ease;
        }

        .university-card:hover .university-explore {
          background: #1f4caf;
          transform: translateY(-2px);
          box-shadow:
            0 10px 22px rgba(36, 85, 196, 0.25);
        }

        .university-card:hover .university-arrow {
          transform: translateX(-3px);
        }

        @media (max-width: 600px) {
          .university-card {
            min-height: 370px;
            padding: 27px 20px 22px;
          }

          .university-logo-wrap {
            width: 96px;
            height: 96px;
          }

          .university-logo {
            width: 76px;
            height: 76px;
          }

          .university-content h3 {
            font-size: 19px;
          }

          .university-content p {
            font-size: 13px;
          }
        }
      `}</style>
    </Link>
  )
}