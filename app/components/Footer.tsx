'use client'

import { ArrowLeft, MessageCircle } from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

export default function Footer() {
  return (
<footer className="footer"><div className="container footer-grid"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">هـ</span><span>منصة هديل<span className="brand-dot">.</span></span></a><p>منصة هديل للخدمات الطلابية والأكاديمية، شريكك نحو إنجاز أكاديمي أفضل.</p></div><div><h4>روابط سريعة</h4><a href="#story">قصتنا</a><a href="#services">خدماتنا</a><a href="#gpa-calculator">حاسبة المعدل</a><a href="#testimonials">آراء العملاء</a></div><div><h4>تواصل معنا</h4><a href="mailto:Hadeelmubarak387@gmail.com">Hadeelmubarak387@gmail.com</a></div><div className="footer-note"><MessageCircle size={30} /><h4>تحتاج مساعدة؟</h4><p>فريقنا جاهز للإجابة عن استفساراتك.</p><a className="footer-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">راسلنا مباشرة <ArrowLeft size={15} /></a></div></div><div className="container footer-bottom"><span>© 2026 منصة هديل للخدمات الطلابية والأكاديمية. جميع الحقوق محفوظة.</span><span>صُنع بعناية للطلاب والباحثين</span></div></footer>
  )
}
