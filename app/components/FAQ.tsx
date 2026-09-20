'use client'

import { useState } from 'react'
import {
  ChevronDown,
  CircleHelp,
  MessageCircleQuestion,
} from 'lucide-react'

const generalFaqs = [
  {
    q: 'كيف أستطيع طلب خدمة من منصة هديل؟',
    a: 'يمكنك اختيار الخدمة المطلوبة من الموقع، الضغط على زر التفاصيل وتعبئة النموذج، أو التواصل المباشر معنا عبر الواتساب وإرسال المتطلبات.',
  },
  {
    q: 'ما هي طرق الدفع المتاحة؟',
    a: 'نوفر طرق دفع إلكترونية متعددة وآمنة تناسب جميع الطلاب داخل وخارج المملكة.',
  },
  {
    q: 'هل يمكنني طلب تعديل على العمل بعد الاستلام؟',
    a: 'نعم بكل تأكيد، نضمن لك تعديلات مجانية لتلبية الملاحظات الأكاديمية والوصول بالعمل إلى مستوى القبول والرضا الكامل.',
  },
  {
    q: 'كيف يتم ضمان سرية الخصوصية والبيانات؟',
    a: 'جميع معلومات الطلاب، البيانات الأكاديمية، والملفات المُرسلة تُعامل بسرية تامة ولا يتم إظهارها أو مشاركتها مع أي جهة.',
  },
]

export default function FAQ() {
  const [openFaqIndex, setOpenFaqIndex] =
    useState<number | null>(null)

  return (
    <>
      <section
        id="faq"
        className="faq-3d-section"
      >
        <div className="faq-3d-panel">

          {/* =====================================
              العنوان
             ===================================== */}

          <div className="faq-3d-heading">

            <div className="faq-heading-icon">
              <MessageCircleQuestion
                size={34}
                strokeWidth={1.8}
              />
            </div>

            <span className="faq-kicker">
              الأسئلة الشائعة
            </span>

            <h2>
              لديك سؤال؟
              <br />
              <em>لدينا الإجابة</em>
            </h2>

            <p>
              أهم الأسئلة التي تصلنا من الطلاب
              والباحثين.
            </p>

          </div>


          {/* =====================================
              قائمة الأسئلة
             ===================================== */}

          <div className="faq-3d-list">

            {generalFaqs.map(
              (item, index) => {
                const isOpen =
                  openFaqIndex === index

                return (
                  <article
                    className={
                      isOpen
                        ? 'faq-3d-item open'
                        : 'faq-3d-item'
                    }
                    key={item.q}
                  >

                    <button
                      type="button"
                      className="faq-3d-question"
                      onClick={() =>
                        setOpenFaqIndex(
                          isOpen
                            ? null
                            : index
                        )
                      }
                      aria-expanded={isOpen}
                    >

                      <div className="faq-question-icon">
                        <CircleHelp
                          size={25}
                          strokeWidth={1.8}
                        />
                      </div>

                      <span>
                        {item.q}
                      </span>

                      <div className="faq-chevron">
                        <ChevronDown
                          size={20}
                          strokeWidth={2.3}
                        />
                      </div>

                    </button>


                    {/* =================================
                        الإجابة
                       ================================= */}

                    {isOpen && (
                      <div className="faq-3d-answer">
                        <div className="faq-answer-line" />

                        <p>
                          {item.a}
                        </p>
                      </div>
                    )}

                  </article>
                )
              }
            )}

          </div>


          {/* =====================================
              أسفل القسم
             ===================================== */}

          <div className="faq-bottom">

            <div className="faq-bottom-icon">
              <MessageCircleQuestion
                size={23}
                strokeWidth={1.8}
              />
            </div>

            <p>
              لم تجد إجابة على سؤالك؟
              <br />
              <span>
                تواصل معنا وسنساعدك.
              </span>
            </p>

          </div>

        </div>
      </section>


      {/* =================================================
          التصميم بالكامل داخل الملف
          لا يحتاج إلى تعديل globals.css
         ================================================= */}

      <style jsx>{`

        /* =========================================
           القسم الرئيسي
           ========================================= */

        .faq-3d-section {
          width: 100%;

          padding: 32px 16px;

          margin: 20px 0;

          direction: rtl;
        }


        /* =========================================
           اللوحة الزرقاء
           ========================================= */

        .faq-3d-panel {
          position: relative;

          max-width: 1000px;

          margin: 0 auto;

          padding: 42px;

          background:
            linear-gradient(
              145deg,
              #173f91 0%,
              #2455c4 48%,
              #163878 100%
            );

          border:
            2px solid #d5aa54;

          border-radius: 32px;

          overflow: hidden;

          box-shadow:

            0 24px 60px
              rgba(23,35,61,0.28),

            0 0 0 7px
              rgba(213,170,84,0.07),

            inset 0 1px 0
              rgba(255,255,255,0.20),

            inset 0 -3px 0
              rgba(0,0,0,0.18);
        }


        /* =========================================
           لمعان اللوحة
           ========================================= */

        .faq-3d-panel::before {
          content: '';

          position: absolute;

          inset: 0;

          pointer-events: none;

          background:
            linear-gradient(
              125deg,
              rgba(255,255,255,0.15),
              transparent 28%,
              transparent 72%,
              rgba(255,255,255,0.04)
            );
        }


        /* =========================================
           الإضاءة
           ========================================= */

        .faq-3d-panel::after {
          content: '';

          position: absolute;

          width: 420px;

          height: 420px;

          top: -280px;

          left: -150px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(255,255,255,0.13),
              transparent 70%
            );

          pointer-events: none;
        }


        /* =========================================
           رأس القسم
           ========================================= */

        .faq-3d-heading {
          position: relative;

          z-index: 2;

          max-width: 650px;

          margin: 0 auto 32px;

          text-align: center;
        }


        /* =========================================
           الأيقونة الرئيسية
           ========================================= */

        .faq-heading-icon {
          width: 82px;

          height: 82px;

          display: grid;

          place-items: center;

          margin: 0 auto 16px;

          color: #174fae;

          background:
            radial-gradient(
              circle at 32% 25%,
              #ffffff 0%,
              #edf4ff 25%,
              #d8e8ff 55%,
              #b8d0f3 78%,
              #8eaddd 100%
            );

          border:
            4px solid #d5aa54;

          border-radius: 50%;

          box-shadow:

            0 15px 28px
              rgba(0,0,0,0.24),

            inset 6px 6px 12px
              rgba(255,255,255,0.85),

            inset -8px -9px 15px
              rgba(36,85,196,0.20);
        }


        .faq-kicker {
          display: inline-block;

          margin-bottom: 9px;

          color: #e2bc68;

          font-size: 13px;

          font-weight: 900;
        }


        .faq-3d-heading h2 {
          margin: 0;

          color: #ffffff;

          font-size:
            clamp(30px, 4vw, 46px);

          font-weight: 900;

          line-height: 1.2;

          text-shadow:
            0 4px 12px
              rgba(0,0,0,0.25);
        }


        .faq-3d-heading h2 em {
          color: #ffffff;

          font-style: normal;
        }


        .faq-3d-heading p {
          max-width: 580px;

          margin: 14px auto 0;

          color:
            rgba(255,255,255,0.86);

          font-size: 15px;

          line-height: 1.9;
        }


        /* =========================================
           قائمة الأسئلة
           ========================================= */

        .faq-3d-list {
          position: relative;

          z-index: 2;

          display: flex;

          flex-direction: column;

          gap: 12px;
        }


        /* =========================================
           بطاقة السؤال
           ========================================= */

        .faq-3d-item {
          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.11),
              rgba(255,255,255,0.045)
            );

          border:
            1px solid
            rgba(255,255,255,0.19);

          border-radius: 18px;

          box-shadow:
            inset 0 1px 0
              rgba(255,255,255,0.08);

          transition:
            transform 0.3s ease,
            background 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }


        .faq-3d-item:hover {
          transform:
            translateY(-2px);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.14),
              rgba(255,255,255,0.055)
            );

          border-color:
            rgba(213,170,84,0.45);

          box-shadow:
            0 12px 25px
              rgba(0,0,0,0.12);
        }


        .faq-3d-item.open {
          border-color:
            rgba(213,170,84,0.85);

          background:
            linear-gradient(
              145deg,
              rgba(255,255,255,0.15),
              rgba(255,255,255,0.06)
            );

          box-shadow:
            0 12px 30px
              rgba(0,0,0,0.15),

            inset 0 1px 0
              rgba(255,255,255,0.13);
        }


        /* =========================================
           زر السؤال
           ========================================= */

        .faq-3d-question {
          width: 100%;

          min-height: 82px;

          display: grid;

          grid-template-columns:
            54px minmax(0,1fr) 44px;

          align-items: center;

          gap: 14px;

          padding: 12px 16px;

          color: #ffffff;

          background: transparent;

          border: 0;

          text-align: right;

          cursor: pointer;
        }


        /* =========================================
           أيقونة السؤال
           ========================================= */

        .faq-question-icon {
          width: 52px;

          height: 52px;

          display: grid;

          place-items: center;

          color: #174fae;

          background:
            radial-gradient(
              circle at 30% 25%,
              #ffffff,
              #dceaff 70%,
              #aec8ee
            );

          border:
            3px solid #d5aa54;

          border-radius: 50%;

          box-shadow:

            0 8px 16px
              rgba(0,0,0,0.18),

            inset 4px 4px 8px
              rgba(255,255,255,0.8),

            inset -5px -6px 10px
              rgba(36,85,196,0.16);

          transition:
            transform 0.3s ease;
        }


        .faq-3d-item.open
        .faq-question-icon {
          transform:
            scale(1.05)
            rotate(-4deg);
        }


        /* =========================================
           نص السؤال
           ========================================= */

        .faq-3d-question > span {
          color: #ffffff;

          font-size: 15px;

          font-weight: 850;

          line-height: 1.7;

          text-shadow:
            0 2px 5px
              rgba(0,0,0,0.18);
        }


        /* =========================================
           سهم السؤال
           ========================================= */

        .faq-chevron {
          width: 42px;

          height: 42px;

          display: grid;

          place-items: center;

          color: #173f91;

          background: #ffffff;

          border:
            2px solid #d5aa54;

          border-radius: 12px;

          transition:
            transform 0.3s ease,
            background 0.3s ease;
        }


        .faq-3d-item.open
        .faq-chevron {
          color: #ffffff;

          background:
            #d5aa54;

          transform:
            rotate(180deg);
        }


        /* =========================================
           الإجابة
           ========================================= */

        .faq-3d-answer {
          display: flex;

          gap: 15px;

          padding:
            0 28px
            20px 84px;

          animation:
            faqAnswerIn
            0.3s ease both;
        }


        @keyframes faqAnswerIn {
          from {
            opacity: 0;

            transform:
              translateY(-7px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }
        }


        .faq-answer-line {
          flex: 0 0 auto;

          width: 3px;

          min-height: 35px;

          border-radius: 10px;

          background:
            linear-gradient(
              #d5aa54,
              rgba(213,170,84,0.25)
            );
        }


        .faq-3d-answer p {
          margin: 0;

          color:
            rgba(255,255,255,0.82);

          font-size: 14px;

          line-height: 2;

          text-align: right;
        }


        /* =========================================
           الجزء السفلي
           ========================================= */

        .faq-bottom {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 13px;

          margin-top: 25px;

          padding: 17px;

          background:
            rgba(255,255,255,0.07);

          border:
            1px solid
            rgba(255,255,255,0.14);

          border-radius: 16px;

          text-align: center;
        }


        .faq-bottom-icon {
          width: 46px;

          height: 46px;

          flex: 0 0 auto;

          display: grid;

          place-items: center;

          color: #174fae;

          background: #ffffff;

          border:
            2px solid #d5aa54;

          border-radius: 50%;
        }


        .faq-bottom p {
          margin: 0;

          color:
            rgba(255,255,255,0.82);

          font-size: 13px;

          line-height: 1.7;
        }


        .faq-bottom p span {
          color: #ffffff;

          font-weight: 900;
        }


        /* =========================================
           الجوال
           ========================================= */

        @media (max-width: 700px) {

          .faq-3d-section {
            padding: 20px 10px;
          }


          .faq-3d-panel {
            padding: 26px 11px;

            border-radius: 24px;
          }


          .faq-heading-icon {
            width: 70px;

            height: 70px;
          }


          .faq-3d-heading {
            margin-bottom: 24px;
          }


          .faq-3d-heading h2 {
            font-size: 30px;
          }


          .faq-3d-heading p {
            font-size: 12px;
          }


          .faq-3d-question {
            min-height: 72px;

            grid-template-columns:
              44px minmax(0,1fr) 38px;

            gap: 9px;

            padding: 10px;
          }


          .faq-question-icon {
            width: 43px;

            height: 43px;

            border-width: 2px;
          }


          .faq-question-icon svg {
            width: 21px;

            height: 21px;
          }


          .faq-3d-question > span {
            font-size: 12px;

            line-height: 1.65;
          }


          .faq-chevron {
            width: 36px;

            height: 36px;

            border-radius: 10px;
          }


          .faq-chevron svg {
            width: 17px;

            height: 17px;
          }


          .faq-3d-answer {
            gap: 10px;

            padding:
              0 14px
              17px 63px;
          }


          .faq-3d-answer p {
            font-size: 11px;

            line-height: 1.9;
          }


          .faq-bottom {
            padding: 13px;

            gap: 9px;
          }


          .faq-bottom-icon {
            width: 40px;

            height: 40px;
          }


          .faq-bottom p {
            font-size: 11px;
          }

        }


        /* =========================================
           الجوال الصغير جدًا
           ========================================= */

        @media (max-width: 380px) {

          .faq-3d-question {
            grid-template-columns:
              38px minmax(0,1fr) 34px;

            gap: 7px;
          }


          .faq-question-icon {
            width: 37px;

            height: 37px;
          }


          .faq-chevron {
            width: 33px;

            height: 33px;
          }


          .faq-3d-question > span {
            font-size: 11px;
          }


          .faq-3d-answer {
            padding-right: 10px;

            padding-left: 50px;
          }

        }

      `}</style>
    </>
  )
}