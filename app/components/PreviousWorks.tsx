'use client'

import { useState } from 'react'
import {
ChevronLeft,
FileText,
X,
} from 'lucide-react'

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

«(null)»

return (
<>
<section id="portfolio" className="portfolio-section container">
<div className="section-heading">
<div>
<span className="section-kicker">
أعمالنا السابقة
</span>

        <h2>
          نماذج من <em>أعمالنا</em>
        </h2>
      </div>
    </div>

    <div className="portfolio-grid">
      {previousWorks.map((work) => (
        <button
          className="portfolio-work-card"
          key={work.preview}
          onClick={() => setSelectedWork(work)}
          type="button"
        >
          <span className="portfolio-file-icon">
            <FileText size={28} />
            <small>PDF</small>
          </span>

          <span className="portfolio-work-info">
            <strong>{work.title}</strong>

            <small>{work.type}</small>

            <small>{work.description}</small>

            <small>اضغط للمعاينة</small>
          </span>

          <ChevronLeft size={18} />
        </button>
      ))}
    </div>
  </section>

  {selectedWork && (
    <div
      className="pdf-modal-backdrop"
      role="presentation"
      onClick={() => setSelectedWork(null)}
    >
      <section
        className="pdf-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pdf-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pdf-modal-header">
          <h2 id="pdf-title">
            {selectedWork.title}
          </h2>

          <button
            type="button"
            onClick={() => setSelectedWork(null)}
            aria-label="إغلاق المعاينة"
          >
            <X size={20} />
          </button>
        </div>

        <div className="pdf-viewer">
          <iframe
            src={selectedWork.preview}
            title={`معاينة ${selectedWork.title}`}
          />
        </div>
      </section>
    </div>
  )}
</>

)
}