'use client'

import { useState } from 'react'
import { ChevronLeft, FileText, X } from 'lucide-react'

const previousWorks = [
  {
    title: 'تأثير التكنولوجيا على الخدمات التعليمية',
    type: 'بحث أكاديمي',
    description:
      'بحث أكاديمي حول تأثير التكنولوجيا على الخدمات التعليمية وتطوير تجربة التعلم.',
    image: '/images/works/technology.jpg',
    preview:
      'https://drive.google.com/file/d/1eFtsqZqRJsWDCcTYcZQXSmIeU0w02NLI/preview',
  },
  {
    title: 'حماية البيئة في ظل رؤية المملكة 2030',
    type: 'بحث أكاديمي',
    description:
      'بحث حول حماية البيئة والمبادرات المرتبطة برؤية المملكة 2030.',
    image: '/images/works/environment.jpg',
    preview:
      'https://drive.google.com/file/d/1KriLId4ui_lb8UusGwanwVUHQ4dk3oLC/preview',
  },
  {
    title: 'تطوير الصناعات المحلية والخدمات اللوجستية',
    type: 'بحث أكاديمي',
    description:
      'دراسة حول تطوير الصناعات المحلية والخدمات اللوجستية ودورها في دعم الاقتصاد.',
    image: '/images/works/logistics.jpg',
    preview:
      'https://drive.google.com/file/d/1nDeMLBHtyiyNn_N6EZ0mAsmdOQ_qTiyG/preview',
  },
  {
    title: 'المبتدأ والخبر في القرآن الكريم',
    type: 'بحث لغوي',
    description:
      'دراسة لغوية متخصصة حول المبتدأ والخبر في القرآن الكريم.',
    image: '/images/works/arabic.jpg',
    preview:
      'https://drive.google.com/file/d/15tZAI1j_ppP-YiKWwJQtMlStvqnRebMJ/preview',
  },
  {
    title: 'مشروع إقامة ذكية SmartStay',
    type: 'مشروع تخرج',
    description:
      'مشروع SmartStay لفكرة الإقامة الذكية وتطوير تجربة المستخدم.',
    image: '/images/works/smartstay.jpg',
    preview:
      'https://drive.google.com/file/d/1M3M6BW7RVOBvOMyH9MVnmJugwVwzrW1I/preview',
  },
  {
    title: 'الفروق الفقهية في الأحوال الشخصية',
    type: 'بحث أكاديمي',
    description:
      'بحث متخصص في الفروق الفقهية المتعلقة بالأحوال الشخصية.',
    image: '/images/works/fiqh.jpg',
    preview:
      'https://drive.google.com/file/d/1iaOiQbgtcqJUJdYeSEU48FBcgWR9E88M/preview',
  },
]

export default function PreviousWorks() {
  const [selectedWork, setSelectedWork] = useState<
    (typeof previousWorks)[number] | null
  >(null)

  return (
    <>
      <section className="previous-works-section container" id="previous-works">
        <div className="section-heading">
          <span className="section-kicker">أعمالنا السابقة</span>

          <h2>نماذج من أعمالنا الأكاديمية</h2>

          <p>
            نستعرض لكم مجموعة من الأعمال والمشاريع الأكاديمية التي تم تنفيذها
            بعناية واهتمام بالتفاصيل.
          </p>
        </div>

        <div className="previous-works-grid">
          {previousWorks.map((work) => (
            <article className="previous-work-card" key={work.title}>
              <div className="previous-work-icon">
                <FileText size={28} />
              </div>

              <div className="previous-work-content">
                <span className="previous-work-type">{work.type}</span>

                <h3>{work.title}</h3>

                <p>{work.description}</p>

                <button
                  type="button"
                  className="previous-work-button"
                  onClick={() => setSelectedWork(work)}
                >
                  عرض العمل
                  <ChevronLeft size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedWork && (
        <div
          className="previous-work-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selectedWork.title}
        >
          <div
            className="previous-work-modal-overlay"
            onClick={() => setSelectedWork(null)}
          />

          <div className="previous-work-modal-content">
            <div className="previous-work-modal-header">
              <div>
                <span>{selectedWork.type}</span>
                <h3>{selectedWork.title}</h3>
              </div>

              <button
                type="button"
                className="previous-work-modal-close"
                onClick={() => setSelectedWork(null)}
                aria-label="إغلاق"
              >
                <X size={22} />
              </button>
            </div>

            <div className="previous-work-preview">
              <iframe
                src={selectedWork.preview}
                title={selectedWork.title}
                width="100%"
                height="100%"
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}