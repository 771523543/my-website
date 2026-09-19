'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

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
    <section
      id="faq"
      className="section container"
    >
      <div className="center-heading">
        <span className="section-kicker">
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

      <div className="faq-list">
        {generalFaqs.map(
          (item, index) => {
            const isOpen =
              openFaqIndex === index

            return (
              <div
                className={
                  isOpen
                    ? 'faq-item open'
                    : 'faq-item'
                }
                key={item.q}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() =>
                    setOpenFaqIndex(
                      isOpen ? null : index
                    )
                  }
                  aria-expanded={isOpen}
                >
                  <span>
                    {item.q}
                  </span>

                  <ChevronDown
                    size={19}
                    style={{
                      transform: isOpen
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                      transition:
                        'transform 0.2s ease',
                    }}
                  />
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            )
          }
        )}
      </div>
    </section>
  )
}