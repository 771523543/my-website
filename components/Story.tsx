'use client'

import { ArrowLeft, BookOpen } from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

export default function Story() {
  return (
<section id="story" className="section story-section container"><div className="story-visual"><div className="story-card"><BookOpen size={42} /><span>معرفة<br />تُنجز</span></div><div className="story-badge">منذ 2018</div></div><div className="story-copy"><span className="section-kicker">قصتنا</span><h2>بدأنا من إيماننا بأن<br /><em>كل طالب يستحق الدعم</em></h2><p>انطلقت منصة هديل لتكون الوجهة الموثوقة للطلاب والباحثين، وتحوّل التحديات الأكاديمية إلى خطوات واضحة قابلة للإنجاز. نعمل بشغف لنقدم حلولًا احترافية تراعي احتياجك وتساعدك على إكمال رحلتك بأعلى درجات الجودة.</p><a className="text-button" href={whatsapp} target="_blank" rel="noreferrer">تعرّف على هديل <ArrowLeft size={17} /></a></div></section>
  )
}
