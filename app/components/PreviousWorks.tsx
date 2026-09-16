'use client'

import Link from 'next/link'
import { ArrowLeft, FolderOpen } from 'lucide-react'

export default function PreviousWorks() {
  return (
    <section className="previous-works-preview container" id="previous-works">
      <div className="previous-works-preview-card">
        <div className="previous-works-preview-icon">
          <FolderOpen size={34} />
        </div>

        <div className="previous-works-preview-content">
          <span>أعمالنا السابقة</span>

          <h2>أعمالنا السابقة</h2>

          <p>
            تعرّف على نماذج الأعمال السابقة لكل خدمة من خدمات منصة هديل.
          </p>
        </div>

        <Link
          href="/previous-works"
          className="previous-works-preview-button"
        >
          انظر إلى أعمالنا السابقة
          <ArrowLeft size={19} />
        </Link>
      </div>

      <style jsx>{`
        .previous-works-preview {
          margin-top: 70px;
          margin-bottom: 70px;
        }

        .previous-works-preview-card {
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 30px;
          border-radius: 24px;
          background: linear-gradient(135deg, #ffffff, #f8f6ff);
          border: 1px solid rgba(100, 70, 160, 0.12);
          box-shadow: 0 12px 35px rgba(30, 20, 60, 0.08);
        }

        .previous-works-preview-icon {
          min-width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          background: #f0eaff;
          color: #6d4bc3;
        }

        .previous-works-preview-content {
          flex: 1;
        }

        .previous-works-preview-content span {
          display: inline-block;
          margin-bottom: 6px;
          font-size: 14px;
          font-weight: 700;
          color: #7956c7;
        }

        .previous-works-preview-content h2 {
          margin: 0 0 8px;
          font-size: 28px;
          font-weight: 800;
          color: #211936;
        }

        .previous-works-preview-content p {
          margin: 0;
          color: #6d6878;
          line-height: 1.8;
        }

        .previous-works-preview-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px 20px;
          border-radius: 14px;
          background: #6d4bc3;
          color: white;
          text-decoration: none;
          font-weight: 700;
          white-space: nowrap;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .previous-works-preview-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(109, 75, 195, 0.25);
        }

        @media (max-width: 768px) {
          .previous-works-preview-card {
            flex-direction: column;
            text-align: center;
            padding: 25px 20px;
          }

          .previous-works-preview-button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}