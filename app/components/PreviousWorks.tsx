
'use client'

import Link from 'next/link'
import { ArrowLeft, FolderOpen, Sparkles, CheckCircle2 } from 'lucide-react'

export default function PreviousWorks() {
  return (
    <section
      className="previous-works-preview container"
      id="previous-works"
      dir="rtl"
      aria-labelledby="previous-works-title"
    >
      <div className="previous-works-preview-card">
        {/* الزخارف الخلفية */}
        <div className="previous-works-decoration previous-works-decoration-one" />
        <div className="previous-works-decoration previous-works-decoration-two" />

        {/* أيقونة الأعمال */}
        <div className="previous-works-preview-icon">
          <div className="previous-works-icon-inner">
            <FolderOpen size={36} strokeWidth={1.8} />
          </div>
          <span className="previous-works-icon-sparkle">
            <Sparkles size={17} />
          </span>
        </div>

        {/* النصوص */}
        <div className="previous-works-preview-content">
          <span className="previous-works-eyebrow">
            <span className="previous-works-eyebrow-dot" />
            من إنجازات منصة هديل
          </span>

          <h2 id="previous-works-title">
            أعمالنا السابقة
          </h2>

          <p>
            اكتشف نماذج من أعمالنا ومشاريعنا الأكاديمية،
            وتعرّف على جودة الخدمات التي نقدمها لطلابنا.
          </p>

          <div className="previous-works-features">
            <span>
              <CheckCircle2 size={16} />
              نماذج متنوعة
            </span>
            <span>
              <CheckCircle2 size={16} />
              خدمات أكاديمية
            </span>
          </div>
        </div>

        {/* زر الانتقال */}
        <div className="previous-works-preview-action">
          <Link
            href="/previous-works"
            className="previous-works-preview-button"
          >
            <span>استكشف أعمالنا</span>
            <span className="previous-works-button-icon">
              <ArrowLeft size={19} />
            </span>
          </Link>

          <span className="previous-works-action-caption">
            اكتشف نماذج من أعمالنا
          </span>
        </div>
      </div>

      <style jsx>{`
        .previous-works-preview {
          position: relative;
          box-sizing: border-box;
          width: 100%;
          margin-top: 56px;
          margin-bottom: 64px;
          padding-inline: 16px;
          overflow: hidden;
        }

        .previous-works-preview-card {
          position: relative;
          isolation: isolate;
          display: flex;
          align-items: center;
          gap: 28px;
          width: 100%;
          box-sizing: border-box;
          padding: 34px;
          overflow: hidden;
          border: 1px solid rgba(36, 89, 169, 0.14);
          border-radius: 26px;
          background:
            radial-gradient(
              circle at 5% 10%,
              rgba(245, 197, 66, 0.12),
              transparent 30%
            ),
            linear-gradient(125deg, #ffffff 0%, #f5f8ff 100%);
          box-shadow:
            0 12px 36px rgba(28, 59, 109, 0.07),
            0 2px 8px rgba(28, 59, 109, 0.03);
          transition:
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .previous-works-preview-card:hover {
          border-color: rgba(36, 89, 169, 0.25);
          box-shadow: 0 18px 42px rgba(28, 59, 109, 0.11);
        }

        .previous-works-decoration {
          position: absolute;
          z-index: -1;
          pointer-events: none;
          border-radius: 50%;
        }

        .previous-works-decoration-one {
          top: -85px;
          left: 22%;
          width: 190px;
          height: 190px;
          border: 28px solid rgba(36, 89, 169, 0.035);
        }

        .previous-works-decoration-two {
          right: -40px;
          bottom: -100px;
          width: 210px;
          height: 210px;
          background: rgba(36, 89, 169, 0.035);
        }

        .previous-works-preview-icon {
          position: relative;
          flex: 0 0 86px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 86px;
          height: 86px;
          border-radius: 25px;
          background: linear-gradient(145deg, #2459a9, #173e78);
          box-shadow:
            0 12px 24px rgba(36, 89, 169, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .previous-works-icon-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

        .previous-works-icon-sparkle {
          position: absolute;
          top: -8px;
          left: -8px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 31px;
          height: 31px;
          border: 3px solid #ffffff;
          border-radius: 11px;
          background: #f5c542;
          color: #173e78;
          box-shadow: 0 4px 12px rgba(23, 62, 120, 0.12);
        }

        .previous-works-preview-content {
          position: relative;
          flex: 1 1 auto;
          min-width: 0;
        }

        .previous-works-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 9px;
          color: #2459a9;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.1px;
        }

        .previous-works-eyebrow-dot {
          width: 8px;
          height: 8px;
          flex: 0 0 8px;
          border-radius: 50%;
          background: #f0b91e;
          box-shadow: 0 0 0 4px rgba(245, 197, 66, 0.17);
        }

        .previous-works-preview-content h2 {
          margin: 0 0 10px;
          color: #173e78;
          font-size: clamp(24px, 2.5vw, 31px);
          font-weight: 900;
          line-height: 1.45;
          letter-spacing: -0.5px;
        }

        .previous-works-preview-content p {
          max-width: 540px;
          margin: 0;
          color: #58677d;
          font-size: 15px;
          font-weight: 500;
          line-height: 1.95;
          overflow-wrap: anywhere;
        }

        .previous-works-features {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 18px;
          margin-top: 17px;
        }

        .previous-works-features span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #425773;
          font-size: 12px;
          font-weight: 700;
        }

        .previous-works-features :global(svg) {
          flex: 0 0 auto;
          color: #2459a9;
        }

        .previous-works-preview-action {
          position: relative;
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 11px;
        }

        .previous-works-preview-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          min-height: 54px;
          box-sizing: border-box;
          padding: 9px 10px 9px 19px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 16px;
          background: linear-gradient(135deg, #2459a9, #173e78);
          color: #ffffff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 800;
          white-space: nowrap;
          box-shadow: 0 8px 18px rgba(36, 89, 169, 0.18);
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease,
            background 0.22s ease;
        }

        .previous-works-preview-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(36, 89, 169, 0.26);
          background: linear-gradient(135deg, #2d67bd, #1b4788);
        }

        .previous-works-preview-button:focus-visible {
          outline: 3px solid #f5c542;
          outline-offset: 4px;
        }

        .previous-works-button-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          border-radius: 11px;
          background: #f5c542;
          color: #173e78;
          transition: transform 0.22s ease;
        }

        .previous-works-preview-button:hover
          .previous-works-button-icon {
          transform: translateX(-3px);
        }

        .previous-works-action-caption {
          color: #718096;
          font-size: 11px;
          font-weight: 600;
          text-align: center;
        }

        @media (max-width: 900px) {
          .previous-works-preview {
            margin-top: 42px;
            margin-bottom: 48px;
          }

          .previous-works-preview-card {
            gap: 20px;
            padding: 26px;
            border-radius: 23px;
          }

          .previous-works-preview-icon {
            flex-basis: 72px;
            width: 72px;
            height: 72px;
            border-radius: 22px;
          }

          .previous-works-icon-inner :global(svg) {
            width: 31px;
            height: 31px;
          }

          .previous-works-preview-content p {
            font-size: 14px;
          }

          .previous-works-preview-button {
            gap: 9px;
            padding-inline: 9px 12px;
            font-size: 13px;
          }
        }

        @media (max-width: 640px) {
          .previous-works-preview {
            margin-top: 30px;
            margin-bottom: 38px;
            padding-inline: 12px;
          }

          .previous-works-preview-card {
            flex-direction: column;
            align-items: center;
            gap: 19px;
            padding: 26px 20px 22px;
            border-radius: 23px;
            text-align: center;
          }

          .previous-works-preview-icon {
            flex: 0 0 76px;
            width: 76px;
            height: 76px;
            border-radius: 23px;
          }

          .previous-works-icon-sparkle {
            width: 29px;
            height: 29px;
          }

          .previous-works-preview-content {
            width: 100%;
          }

          .previous-works-eyebrow {
            justify-content: center;
            margin-bottom: 7px;
            font-size: 12px;
          }

          .previous-works-preview-content h2 {
            margin-bottom: 8px;
            font-size: 25px;
          }

          .previous-works-preview-content p {
            max-width: 420px;
            margin-inline: auto;
            font-size: 13px;
            line-height: 1.9;
          }

          .previous-works-features {
            justify-content: center;
            gap: 10px 14px;
            margin-top: 14px;
          }

          .previous-works-features span {
            font-size: 11px;
          }

          .previous-works-preview-action {
            width: 100%;
            gap: 9px;
          }

          .previous-works-preview-button {
            width: 100%;
            max-width: 340px;
            min-height: 52px;
            justify-content: space-between;
            padding: 8px 10px 8px 15px;
            border-radius: 15px;
            font-size: 14px;
          }

          .previous-works-button-icon {
            width: 34px;
            height: 34px;
            flex-basis: 34px;
          }

          .previous-works-action-caption {
            font-size: 10px;
          }
        }

        @media (max-width: 360px) {
          .previous-works-preview {
            padding-inline: 9px;
          }

          .previous-works-preview-card {
            padding: 22px 14px 19px;
          }

          .previous-works-preview-content h2 {
            font-size: 23px;
          }

          .previous-works-preview-content p {
            font-size: 12px;
          }

          .previous-works-features {
            gap: 9px;
          }

          .previous-works-features span {
            font-size: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .previous-works-preview-card,
          .previous-works-preview-button,
          .previous-works-button-icon {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}
