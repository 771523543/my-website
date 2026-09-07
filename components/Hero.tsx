'use client'

import Image from 'next/image'
import { ArrowLeft, Check, MessageCircle } from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

export default function Hero() {
  return (
<section id="top" className="hero container">
  <div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" /> شريكك الأكاديمي الموثوق</span><h1>نرتب لك طريقك<br /><strong>نحو النجاح الأكاديمي</strong></h1><p>منصة هديل للخدمات الطلابية والأكاديمية. حلول احترافية، جودة عالية، ومتابعة مستمرة تساعدك على إنجاز أعمالك بثقة.</p><div className="hero-buttons"><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">اطلب خدمتك الآن <MessageCircle size={18} /></a><a className="text-button" href="#services">استكشف خدماتنا <ArrowLeft size={18} /></a></div><div className="trust-row"><div className="avatars"><span>أ</span><span>م</span><span>س</span><span>+</span></div><div><strong>+10,000</strong><small>طالب وباحث يثقون بنا</small></div></div><div className="hero-blue-card"><div className="hero-card-badge">هديل</div><div className="art-top"><span>رحلتك الأكاديمية</span></div><p className="hero-card-caption">خطوات واضحة، إنجازات أكبر</p><div className="path-line"><span className="path-dot active" /><span /><span className="path-dot active" /><span /><span className="path-dot active" /></div><div className="art-labels"><span>خطط</span><span>أنجز</span><span>تفوّق</span></div><div className="floating-note"><Check size={16} /> عملك في أيدٍ أمينة</div></div></div>
  <div className="hero-art hero-photo"><Image src="/images/hadeel-hero-family.png" alt="معلمة عربية تساعد طالبًا على التعلم" fill priority sizes="(max-width: 800px) 100vw, 48vw" /></div>
</section>
  )
}
