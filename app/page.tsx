'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  ArrowLeft, BookOpen, Check, ChevronLeft, ChevronRight, FileText, GraduationCap, Headphones,
  Menu, MessageCircle, Presentation, ShieldCheck, Sparkles, UserRound, X,
} from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

const services = [
  { icon: BookOpen, image: '/images/62a97c13f14f5fd59ba3b7e15f3e3ecb.jpg', title: 'إعداد البحوث والتقارير', text: 'بحوث وتقارير علمية وفق منهجية أكا[...]' },
  { icon: Presentation, image: '/images/service-presentation.png', title: 'العروض التقديمية', text: 'تصميم شرائح PowerPoint احترافية لمشاريع التخرج و[...]' },
  { icon: GraduationCap, image: '/images/service-assignments.png', title: 'التكليفات والواجبات', text: 'حل ومتابعة وافية للأنشطة والواجبات الجا�[...]' },
  { icon: UserRound, image: '/images/service-cv.png', title: 'السيرة الذاتية CV', text: 'سير ذاتية عربية وإنجليزية متوافقة مع أنظمة ATS.' },
  { icon: Sparkles, image: '/images/service-invitations.png', title: 'الدعوات الإلكترونية', text: 'بطاقات تخرج ومناسبات بتصاميم حديثة تناسب ذ�[...]' },
  { icon: Headphones, image: '/images/service-followup.png', title: 'متابعة مواد البلاك بورد', text: 'إدارة ومتابعة المقررات والمحاضرات والاخ[...]' },
  // New services added below
  { icon: Presentation, image: '/images/service-presentation.png', title: 'خدمة تقديمية متقدمة', text: 'عروض تقديمية احترافية متقدمة مع تصميم مخصص وقوالب تفاعلية.' },
  { icon: Headphones, image: '/images/service-followup.png', title: 'متابعة بلاك بورد متقدمة', text: 'متابعة دورية للمقررات مع تقارير وتواصل مُباشر مع المدرّسين.' },
]

const researchDetails = [
  { title: 'إعداد وصياغة البحوث والتقارير', items: ['كتابة الأوراق البحثية، التقارير الجامعية، والواجبات والمهمات ا[...]'] },
  { title: 'التنسيق والتوثيق المرجعي', items: ['تنسيق الهوامش، الخطوط، الجداول، والعناوين حسب شروط كل جامعة.', 'توثيق [...]'] },
  { title: 'التدقيق اللغوي وإعادة الصياغة', items: ['تصحيح الأخطاء الإملائية والنحوية وتطوير الصياغة إلى أسلوب أكاد[...]'] },
  { title: 'تلخيص المراجع والدراسات', items: ['تلخيص الكتب والمقالات العلمية والفصول الدراسية في نقاط مركزة وسلسة.', '[...]'] },
]

const values = [
  ['الأمانة الأكاديمية', 'أصالة وجودة وخلو الأعمال من السرقات الأدبية.'],
  ['السرية والخصوصية', 'حماية كاملة لبيانات ومستندات ومعلومات الطلاب.'],
  ['التميز والدقة', 'أعمال متكاملة تفي بالمعايير والشروط الجامعية.'],
  ['الالتزام بالمواعيد', 'احترام وقتك وتسليم دقيق في الموعد المحدد.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedWork, setSelectedWork] = useState<{ title: string; preview: string } | null>(null)
  const previousWorks = [{ title: 'تأثير التكنولوجيا على الخدمات التعليمية', preview: 'https://drive.google.com/file/d/1eFtsqZqRJsWDCcTYcZQXSmIeU0w02NLI/preview' }]
  const [achievementIndex, setAchievementIndex] = useState(0)
  const [achievementPaused, setAchievementPaused] = useState(false)
  const achievementImages = ['/images/hadeel-achievements.png', '/images/hadeel-achievement-test.jpg']

  useEffect(() => {
    if (achievementPaused) return
    const timer = window.setInterval(() => setAchievementIndex((current) => (current + 1) % achievementImages.length), 3000)
    return () => window.clearInterval(timer)
  }, [achievementPaused, achievementImages.length])

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })

    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="announcement"><Sparkles size={15} /> خصم خاص على خدمات منصة هديل لفترة محدودة <ArrowLeft size={15} /></div>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#top"><Image className="brand-logo" src="/hadeel-platform-logo.png" alt="شعار منصة هديل للخدمات الطلابية" width={54} height={54} priority /></a>
          <nav className={menuOpen ? 'nav-links mobile-open' : 'nav-links'}>
            <a href="#top" onClick={() => setMenuOpen(false)}>الرئيسية</a><a href="#story" onClick={() => setMenuOpen(false)}>قصتنا</a><a href="#values" onClick={() => setMenuOpen(false)}>قيمنا</a><a href="#services" onClick={() => setMenuOpen(false)}>خدماتنا</a><a href="#why" onClick={() => setMenuOpen(false)}>لماذا نحن</a><a href="#contact" onClick={() => setMenuOpen(false)}>اتصل بنا</a>
          </nav>
          <div className="nav-actions"><a className="primary-button header-order" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} /> اطلب خدمتك الآن</a><button className="menu-button" aria-label="فتح القائمة" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
        </div>
      </header>

      <section id="top" className="hero container">
        <div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" /> شريكك الأكاديمي الموثوق</span><h1>نرتب لك طريقك<br /><strong>نحو النجاح الأكاديمي</strong></h1><p>منصة هديل للخدمات الطلابية والأكاديمية. حلول احترافية، جودة عالية، ومتابعة مستمرة تساعدك على إنجاز أعمالك بثقة.</p><div className="hero-buttons"><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">اطلب خدمتك الآن <MessageCircle size={18} /></a><a className="text-button" href="#services">استكشف خدماتنا <ArrowLeft size={18} /></a></div><div className="trust-row"><div className="avatars"><span>أ</span><span>م</span><span>س</span><span>+</span></div><div><strong>+10,000</strong><small>طالب وباحث يثقون بنا</small></div></div><div className="hero-blue-card"><div className="hero-card-badge">هديل</div><div className="art-top"><span>رحلتك الأكاديمية</span></div><p className="hero-card-caption">خطوات واضحة، إنجازات أكبر</p><div className="path-line"><span className="path-dot active" /><span /><span className="path-dot active" /><span /><span className="path-dot active" /></div><div className="art-labels"><span>خطط</span><span>أنجز</span><span>تفوّق</span></div><div className="floating-note"><Check size={16} /> عملك في أيدٍ أمينة</div></div></div>

      <section className="stats-strip"><div className="container stats"><div><strong>+10K</strong><span>طالب مستفيد</span></div><div><strong>+15</strong><span>خدمة أكاديمية</span></div><div><strong>4.9</strong><span>تقييم متوسط</span></div></div></section>

      <section id="story" className="section story-section container"><div className="story-visual"><div className="story-card"><BookOpen size={42} /><span>معرفة<br />تُنجز</span></div><div className="story-copy"><h2>قصتنا</h2><p>بدأت منصة هديل بهدف توفير حلول أكاديمية متكاملة للطلاب والباحثين...</p></div></div></section>

      <section id="values" data-reveal className="section soft-section reveal-section"><div className="container"><div className="center-heading"><span className="section-kicker">قيمنا الأساسية</span><h2>نلتزم بالجودة والمهنية</h2></div><div className="values-grid">
  {values.map((v) => (
    <div key={v[0]} className="value-card"><h3>{v[0]}</h3><p>{v[1]}</p></div>
  ))}
</div></div></section>

      <section id="services" data-reveal className="section container reveal-section"><div className="section-heading"><div><span className="section-kicker">خدماتنا</span><h2>حلول أكاديمية متكاملة</h2></div><div className="section-actions"><a className="secondary-button" href="#contact">اطلب الآن</a></div></div>
        <div className="services-grid">
          {services.map((s) => (
            <article key={s.title} className="service-card" onClick={() => setSelectedService(s.title)}>
              <div className="service-media"><Image src={s.image} alt={s.title} width={240} height={160} className="rounded-md" /></div>
              <div className="service-body"><h3>{s.title}</h3><p>{s.text}</p><div className="service-actions"><button className="ghost-button">عرض التفاصيل</button><a className="text-button" href={whatsapp} target="_blank" rel="noreferrer">اطلب عبر واتساب</a></div></div>
            </article>
          ))}
        </div>

      {selectedService === 'إعداد البحوث والتقارير' && <div className="service-modal-backdrop" role="presentation" onClick={() => setSelectedService(null)}><section className="service-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title"><header><h2 id="service-modal-title">إعداد البحوث والتقارير</h2><button onClick={() => setSelectedService(null)} aria-label="إغلاق">×</button></header><div className="service-modal-body"><ul>
        {researchDetails[0].items.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul><div className="modal-actions"><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">اطلب الخدمة <MessageCircle /></a></div></div></section></div>}

      <section id="portfolio" className="portfolio-section container"><div className="section-heading"><div><span className="section-kicker">أعمالنا السابقة</span><h2>نماذج من أعمالنا</h2></div><div className="section-actions"><a className="secondary-button" href="#contact">عرض الكل</a></div></div>

      {selectedWork && <div className="pdf-modal-backdrop" role="presentation" onClick={() => setSelectedWork(null)}><section className="pdf-modal" role="dialog" aria-modal="true" aria-labelledby="pdf-modal-title"><header><h2 id="pdf-modal-title">{selectedWork.title}</h2><button onClick={() => setSelectedWork(null)} aria-label="إغلاق">×</button></header><div className="pdf-modal-body"><iframe src={selectedWork.preview} width="100%" height={480} /></div></section></div>}

      <section className="student-showcase-section container"><div className="hero-art visual-hero"><div className="visual-orb" /><Image className="student-hero-image" src="/images/hadeel-student-hero.png" alt="طالب" width={420} height={420} /></div><div className="showcase-copy"><h2>قصص النجاح</h2><p>طلابنا يحققون نتائج مميزة بدعم من خدماتنا...</p></div></section>

      <section className="academic-ad-section container"><div className="academic-ad"><span className="ad-badge"><span>⚡</span> خدمات أكاديمية متكاملة</span><h2>ارفع معهدك الأكاديمي</h2><p>نقدّم حلول كاملة من الكتابة وحتى المتابعة.</p><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">اطلب الآن</a></div></section>

      <section className="achievements-section container"><div className="achievements-copy"><span className="section-kicker">إنجازاتنا بالأرقام</span><h2>نتائج تُثبت نجاحنا</h2><div className="achievements-slider"><Image src={achievementImages[achievementIndex]} alt="إنجاز" width={540} height={360} /></div></div></section>

      <section id="why" className="why-section"><div className="container why-inner"><div><span className="section-kicker">لماذا تختار منصة هديل؟</span><h2>معك من أول خطوة</h2><p>فريقنا مختص وملتزم بمواعيده ونحن نضمن جودة العمل.</p></div><div className="why-list"><div className="why-item"><ShieldCheck /> أمانة أكاديمية</div><div className="why-item"><UserRound /> متابعة شخصية</div></div></div></section>

      <section id="contact" className="cta-section container"><div><span className="section-kicker">جاهز تبدأ؟</span><h2>خلّنا ننجزها <em>معًا</em></h2><p>تواصل معنا عبر واتساب أو املأ نموذج التواصل لنعاود الاتصال بك.</p><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">تواصل عبر واتساب</a></div></section>
      <footer className="footer"><div className="container footer-grid"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">هـ</span><span>منصة هديل</span></a><p>حقوق النشر © منصة هديل 2026</p></div><div className="footer-links"><a href="#services">خدماتنا</a><a href="#contact">اتصل بنا</a></div><div className="footer-cta"><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">اطلب الآن</a></div></div></footer>

    </main>
  )
}
