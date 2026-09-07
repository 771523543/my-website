'use client'

import { ArrowLeft } from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

export default function AcademicAd() {
  return (
<section className="academic-ad-section container"><div className="academic-ad"><span className="ad-badge"><span>⚡</span> خدمات أكاديمية متكاملة</span><h2>ارفع معدلك.<br />ووفر وقتك.</h2><p>من إعداد البحوث الموثقة إلى إدارة حساب البلاك بورد، تقدم لك منصة هديل كافة الأدوات والخدمات التي توفر وقتك وتضمن لك التفوق الأكاديمي.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="ad-button">ابدأ طلبك الآن <ArrowLeft size={16} /></a></div></section>
  )
}
