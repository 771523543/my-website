'use client'

import { useState } from 'react'
import { ChevronLeft, FileText, X } from 'lucide-react'
import { previousWorks } from '../data/siteData'

export default function Portfolio() {
  const [selectedWork, setSelectedWork] = useState<{ title: string; preview: string } | null>(null)
  return (
    <>
<section id="portfolio" className="portfolio-section container"><div className="section-heading"><div><span className="section-kicker">أعمالنا السابقة</span><h2>نماذج من <em>أعمالنا</em></h2></div></div><div className="portfolio-grid">{previousWorks.map((work) => <button className="portfolio-work-card" key={work.preview} onClick={() => setSelectedWork(work)}><span className="portfolio-file-icon"><FileText size={28} /><small>PDF</small></span><span className="portfolio-work-info"><strong>{work.title}</strong><small>اضغط للمعاينة</small></span><ChevronLeft size={18} /></button>)}</div></section>

{selectedWork && <div className="pdf-modal-backdrop" role="presentation" onClick={() => setSelectedWork(null)}><section className="pdf-modal" role="dialog" aria-modal="true" aria-labelledby="pdf-title" onClick={(event) => event.stopPropagation()}><div className="pdf-modal-header"><h2 id="pdf-title">{selectedWork.title}</h2><button onClick={() => setSelectedWork(null)} aria-label="إغلاق المعاينة"><X size={20} /></button></div><div className="pdf-viewer"><iframe src={selectedWork.preview} title={`معاينة ${selectedWork.title}`} /></div></section></div>}
    </>
  )
}
