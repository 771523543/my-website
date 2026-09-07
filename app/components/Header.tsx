'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Menu, MessageCircle, X } from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
<header className="site-header">
  <div className="container nav-wrap">
    <a className="brand" href="#top"><Image className="brand-logo" src="/hadeel-platform-logo.png" alt="شعار منصة هديل للخدمات الطلابية" width={54} height={54} priority /><span>منصة هديل<span className="brand-dot">.</span></span></a>
    <nav className={menuOpen ? 'nav-links mobile-open' : 'nav-links'}>
      <a href="#top" onClick={() => setMenuOpen(false)}>الرئيسية</a>
      <a href="#story" onClick={() => setMenuOpen(false)}>قصتنا</a>
      <a href="#services" onClick={() => setMenuOpen(false)}>خدماتنا</a>
      <a href="#gpa-calculator" onClick={() => setMenuOpen(false)}>حاسبة المعدل</a>
      <a href="#testimonials" onClick={() => setMenuOpen(false)}>آراء العملاء</a>
      <a href="#faq" onClick={() => setMenuOpen(false)}>الأسئلة الشائعة</a>
      <a href="#contact" onClick={() => setMenuOpen(false)}>اتصل بنا</a>
    </nav>
    <div className="nav-actions"><a className="primary-button header-order" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} /> اطلب خدمتك الآن</a><button className="menu-button" aria-label="فتح القائمة" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
  </div>
</header>
  )
}
