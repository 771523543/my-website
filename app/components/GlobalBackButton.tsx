"use client"

import { ArrowRight } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

export default function GlobalBackButton() {
  const router = useRouter()
  const pathname = usePathname()

  // لا يظهر في الصفحة الرئيسية
  if (pathname === "/") {
    return null
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="global-back-wrapper">
      <button
        type="button"
        onClick={handleBack}
        className="global-back-button"
        aria-label="العودة إلى الصفحة السابقة"
      >
        <ArrowRight size={18} strokeWidth={2.4} />
        <span>العودة</span>
      </button>

      <style jsx>{`
        .global-back-wrapper {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 14px 20px 0;
          box-sizing: border-box;
        }

        .global-back-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          padding: 9px 15px;

          border: 1px solid rgba(36, 85, 196, 0.12);
          border-radius: 10px;

          background: #ffffff;
          color: #2455c4;

          font-size: 14px;
          font-weight: 700;

          cursor: pointer;

          box-shadow: 0 3px 12px rgba(23, 35, 61, 0.06);

          transition:
            background 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .global-back-button:hover {
          background: #2455c4;
          color: #ffffff;
          transform: translateX(2px);
          box-shadow: 0 6px 18px rgba(36, 85, 196, 0.15);
        }

        .global-back-button:active {
          transform: translateX(0);
        }

        @media (max-width: 640px) {
          .global-back-wrapper {
            padding: 12px 14px 0;
          }

          .global-back-button {
            padding: 8px 12px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  )
}