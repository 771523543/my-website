'use client'

import { MessageCircle } from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

export default function Contact() {
  return (
<section id="contact" className="cta-section container"><div><span className="section-kicker">جاهز تبدأ؟</span><h2>خلّنا ننجزها <em>معًا</em></h2><p>تواصل معنا الآن واحصل على استشارة مجانية لخدمتك.</p></div><a className="light-button" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /> تواصل عبر واتساب</a></section>
  )
}
