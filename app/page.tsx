'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  ArrowLeft, BookOpen, Check, ChevronLeft, ChevronRight, FileText, GraduationCap, Headphones,
  Menu, MessageCircle, Presentation, ShieldCheck, Sparkles, UserRound, X,
} from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

const services = [
  { 
    icon: BookOpen, 
    image: '/images/service-research.png', 
    title: 'إعداد البحوث والتقارير', 
    text: 'إعداد وتنسيق الأبحاث والتقارير الجامعية وفق أحدث المعايير الأكاديمية وضوابط APA 7th. نضمن لك خلو العمل من الانتحال والأخطاء اللغوية، مع تقديم هيكل بحثي متكامل يدعم مسيرتك الدراسية.',
    link: '/services/research'
  },
  { icon: Presentation, image: '/images/service-presentation.png', title: 'العروض التقديمية', text: 'تصميم شرائح PowerPoint احترافية لمشاريع التخرج والمناقشات.' },
  { icon: GraduationCap, image: '/images/service-assignments.png', title: 'التكليفات والواجبات', text: 'حل ومتابعة وافية للأنشطة والواجبات الجامعية مع شرح وافٍ للمفاهيم.' },
  { icon: UserRound, image: '/images/service-cv.png', title: 'السيرة الذاتية CV', text: 'سير ذاتية عربية وإنجليزية متوافقة مع أنظمة ATS.' },
  { icon: Sparkles, image: '/images/service-invitations.png', title: 'الدعوات الإلكترونية', text: 'بطاقات تخرج ومناسبات بتصاميم حديثة تناسب ذوقك.' },
  { icon: Headphones, image: '/images/service-followup.png', title: 'متابعة مواد البلاك بورد', text: 'إدارة ومتابعة المقررات والمحاضرات والاختبارات طوال الفصل الدراسي.' },
]

type ServiceDetail = { 
  intro: string; 
  sections: { title: string; items: string[] }[];
  steps?: { step: string; title: string; desc: string }[];
  faq?: { question: string; answer: string }[];
  formFields?: {
    academicLevels: string[];
    defaultDuration: string;
  };
}

const serviceDetails: Record<string, ServiceDetail> = {
  'إعداد البحوث والتقارير': {
    intro: 'حلول بحثية متكاملة تساعدك على تقديم عمل أكاديمي منظم وموثق وفق أعلى المعايير.',
    sections: [
      { 
        title: 'إعداد وصياغة البحوث والتقارير', 
        items: [
          'كتابة الأوراق البحثية، التقارير الجامعية، والواجبات والمهمات الدراسية.',
          'إعداد مقترحات البحوث (Research Proposals) وخطط الدراسة المعتمدة.',
          'كتابة مراجعات الأدبيات والدراسات السابقة (Literature Review).'
        ] 
      },
      { 
        title: 'التنسيق والتوثيق المرجعي', 
        items: [
          'تنسيق الهوامش، الخطوط، الجداول، والعناوين حسب شروط كل جامعة.',
          'توثيق المصادر والمراجع بالأساليب العالمية المعتمدة (APA 7th, MLA, Harvard, Chicago, IEEE).'
        ] 
      },
      { 
        title: 'التدقيق اللغوي وإعادة الصياغة', 
        items: [
          'تصحيح الأخطاء الإملائية والنحوية وتطوير الصياغة إلى أسلوب أكاديمي قوي.',
          'إعادة الصياغة لخفض نسبة الانتحال العلمي (Plagiarism) وضمان الأصالة الأكاديمية.'
        ] 
      },
      { 
        title: 'تلخيص المراجع والدراسات', 
        items: [
          'تلخيص الكتب والمقالات العلمية والفصول الدراسية في نقاط مركزة وسلسة.',
          'كتابة الملخصات التنفيذية (Executive Summaries) للتقارير والبحوث الطويلة.'
        ] 
      }
    ],
    steps: [
      { step: '01', title: 'إرسال الطلب والمرفقات', desc: 'تحديد موضوع البحث، عدد الصفحات، والدليل الإرشادي المطلوب من المحاضر.' },
      { step: '02', title: 'المراجعة والتسعير', desc: 'تقييم الطلب أكاديمياً وتحديد التكلفة الإجمالية والمدى الزمني للتنفيذ.' },
      { step: '03', title: 'المعاينة والمسودة', desc: 'تسليم نسخة أولية لإبداء ملاحظاتك وإجراء التعديلات الأكاديمية المطلوبة.' },
      { step: '04', title: 'التسليم النهائي', desc: 'استلام البحث منسقاً بالكامل وجاهزاً للطباعة والتقديم المباشر.' }
    ],
    faq: [
      { 
        question: 'هل تشمل الخدمة تعديل الملاحظات بعد الاستلام؟', 
        answer: 'نعم، نقدم تعديلات مجانية متوافقة مع الملاحظات الأكاديمية المطلوبة طوال فترة المراجعة.' 
      },
      { 
        question: 'كيف أضمن عدم وجود انتحال أو سرقة علمية (Plagiarism) في البحث؟', 
        answer: 'نفحص العمل عبر برامج كشف الانتحال المعتمدة ونوفر لك تقريراً رسمياً يثبت نسبة الأمانة العلمية.' 
      }
    ],
    formFields: {
      academicLevels: ['دبلوم', 'بكالوريوس', 'ماجستير'],
      defaultDuration: 'حسب الموعد المحدد'
    }
  },
}

for (const service of services) {
  if (!serviceDetails[service.title]) {
    serviceDetails[service.title] = {
      intro: service.text,
      sections: [{ title: 'ما تشمله الخدمة', items: ['تنفيذ احترافي يناسب احتياجك.', 'مراجعة وتنسيق شامل قبل التسليم.', 'تعديلات ومتابعة حتى اعتماد العمل.'] }],
      steps: [
        { step: '01', title: 'إرسال الطلب', desc: 'أرسل التفاصيل والمتطلبات الخاصة بخدمتك.' },
        { step: '02', title: 'مراجعة الفريق', desc: 'نراجع الطلب ونحدد نطاق العمل والتكلفة.' },
        { step: '03', title: 'المعاينة والتعديل', desc: 'نشاركك النسخة الأولية ونطبق ملاحظاتك.' },
        { step: '04', title: 'التسليم النهائي', desc: 'تستلم العمل مكتملًا ومنسقًا وجاهزًا.' },
      ],
      faq: [
        { question: 'هل تشمل الخدمة التعديلات؟', answer: 'نعم، نقدم تعديلات متوافقة مع المتطلبات والملاحظات المطلوبة.' },
        { question: 'كيف أتابع طلبي؟', answer: 'يمكنك التواصل معنا مباشرة عبر واتساب لمتابعة حالة الطلب.' },
      ],
      formFields: { academicLevels: ['دبلوم', 'بكالوريوس', 'ماجستير'], defaultDuration: 'حسب الموعد المحدد' },
    }
  }
}



const values: [string, string][] = [
  ['الأمانة الأكاديمية', 'أصالة وجودة وخلو الأعمال من السرقات الأدبية.'],
  ['الجودة والاحترافية', 'نلتزم بمعايير أكاديمية عالية في كل خدمة نقدمها.'],
  ['السرية والخصوصية', 'نحافظ على بياناتك وملفاتك بسرية تامة.'],
  ['الدعم والمتابعة', 'نبقى معك خطوة بخطوة حتى إتمام طلبك بنجاح.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedWork, setSelectedWork] = useState<{ title: string; preview: string } | null>(null)
  const [researchDetailsOpen, setResearchDetailsOpen] = useState(false)
  const previousWorks = [{ title: 'تأثير التكنولوجيا على الخدمات التعليمية', preview: 'https://drive.google.com/file/d/1eFtsqZqRJsWDCcTYcZQXSmIeU0w02NLI/preview' }, { title: 'حماية البيئة في ظل رؤية المملكة 2030', preview: 'https://drive.google.com/file/d/1KriLId4ui_lb8UusGwanwVUHQ4dk3oLC/preview' }, { title: 'تطوير الصناعات المحلية والخدمات اللوجستية', preview: 'https://drive.google.com/file/d/1nDeMLBHtyiyNn_N6EZ0mAsmdOQ_qTiyG/preview' }, { title: 'المبتدأ والخبر في القرآن الكريم', preview: 'https://drive.google.com/file/d/15tZAI1j_ppP-YiKWwJQtMlStvqnRebMJ/preview' }, { title: 'مشروع إقامة ذكية SmartStay', preview: 'https://drive.google.com/file/d/1M3M6BW7RVOBvOMyH9MVnmJugwVwzrW1I/preview' }, { title: 'الفروق الفقهية في الأحوال الشخصية', preview: 'https://drive.google.com/file/d/1iaOiQbgtcqJUJdYeSEU48FBcgWR9E88M/preview' }]
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
          <a className="brand" href="#top"><Image className="brand-logo" src="/hadeel-platform-logo.png" alt="شعار منصة هديل للخدمات الطلابية" width={54} height={54} priority /><span>منصة هديل<span className="brand-dot">.</span></span></a>
          <nav className={menuOpen ? 'nav-links mobile-open' : 'nav-links'}>
            <a href="#top" onClick={() => setMenuOpen(false)}>الرئيسية</a><a href="#story" onClick={() => setMenuOpen(false)}>قصتنا</a><a href="#values" onClick={() => setMenuOpen(false)}>قيمنا</a><a href="#why" onClick={() => setMenuOpen(false)}>لماذا نحن</a><a href="#contact" onClick={() => setMenuOpen(false)}>اتصل بنا</a>
          </nav>
          <div className="nav-actions"><a className="primary-button header-order" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} /> اطلب خدمتك الآن</a><button className="menu-button" aria-label="فتح القائمة" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
        </div>
      </header>

      <section id="top" className="hero container">
        <div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" /> شريكك الأكاديمي الموثوق</span><h1>نرتب لك طريقك<br /><strong>نحو النجاح الأكاديمي</strong></h1><p>منصة هديل للخدمات الطلابية والأكاديمية. حلول احترافية، جودة عالية، ومتابعة مستمرة تساعدك على إنجاز أعمالك بثقة.</p><div className="hero-buttons"><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">اطلب خدمتك الآن <MessageCircle size={18} /></a><a className="text-button" href="#services">استكشف خدماتنا <ArrowLeft size={18} /></a></div><div className="trust-row"><div className="avatars"><span>أ</span><span>م</span><span>س</span><span>+</span></div><div><strong>+10,000</strong><small>طالب وباحث يثقون بنا</small></div></div><div className="hero-blue-card"><div className="hero-card-badge">هديل</div><div className="art-top"><span>رحلتك الأكاديمية</span></div><p className="hero-card-caption">خطوات واضحة، إنجازات أكبر</p><div className="path-line"><span className="path-dot active" /><span /><span className="path-dot active" /><span /><span className="path-dot active" /></div><div className="art-labels"><span>خطط</span><span>أنجز</span><span>تفوّق</span></div><div className="floating-note"><Check size={16} /> عملك في أيدٍ أمينة</div></div></div>
        <div className="hero-art hero-photo"><Image src="/images/hadeel-hero-family.png" alt="معلمة عربية تساعد طالبًا على التعلم" fill priority sizes="(max-width: 800px) 100vw, 48vw" /></div>
      </section>

      <section className="stats-strip"><div className="container stats"><div><strong>+10K</strong><span>طالب مستفيد</span></div><div><strong>+15</strong><span>خدمة أكاديمية</span></div><div><strong>+8</strong><span>سنوات خبرة</span></div><div><strong>98%</strong><span>نسبة رضا العملاء</span></div></div></section>

      <section id="story" className="section story-section container"><div className="story-visual"><div className="story-card"><BookOpen size={42} /><span>معرفة<br />تُنجز</span></div><div className="story-badge">منذ 2018</div></div><div className="story-copy"><span className="section-kicker">قصتنا</span><h2>بدأنا من إيماننا بأن<br /><em>كل طالب يستحق الدعم</em></h2><p>انطلقت منصة هديل لتكون الوجهة الموثوقة للطلاب والباحثين، وتحوّل التحديات الأكاديمية إلى خطوات واضحة قابلة للإنجاز. نعمل بشغف لنقدم حلولًا احترافية تراعي احتياجك وتساعدك على إكمال رحلتك بأعلى درجات الجودة.</p><a className="text-button" href={whatsapp} target="_blank" rel="noreferrer">تعرّف على هديل <ArrowLeft size={17} /></a></div></section>

      <section id="values" data-reveal className="section soft-section reveal-section"><div className="container"><div className="center-heading"><span className="section-kicker">قيمنا الأساسية</span><h2>ثقة تُبنى على <em>المبادئ</em></h2><p>نضع احتياجك ونجاحك في مقدمة كل ما نقدمه.</p></div><div className="values-grid">{values.map(([title, text], index) => <article data-reveal className="value-card reveal-section" key={title}><span className="value-number">0{index + 1}</span><ShieldCheck size={25} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>



      <section id="services" className="services-section container"><div className="services-heading"><span className="section-kicker">خدماتنا</span><h2>خدمات البحوث <em>العلمية</em></h2><p>حلول بحثية متكاملة تساعدك على تقديم عمل أكاديمي منظم، موثق، وجاهز للتقديم بثقة.</p></div><article className="research-service-card"><div className="research-service-media"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9c589a0df5766828c8bb04436f8936e9-YBqHFD6XerQGWc67zmDPCVhH08c5qc.jpg" alt="تحليل البيانات والبحوث العلمية" /><span className="research-media-label">بحث وتحليل</span></div><div className="research-service-content"><span className="service-index">01 / خدمة أكاديمية</span><h3>إعداد البحوث والتقارير</h3><p>نحوّل فكرتك إلى بحث متكامل بصياغة أكاديمية واضحة، توثيق دقيق، وتنسيق احترافي يوافق متطلبات جامعتك.</p><div className="research-points"><span><Check size={16} /> خطة بحث وإطار نظري</span><span><Check size={16} /> توثيق APA 7th</span><span><Check size={16} /> تدقيق لغوي وفحص استلال</span><span><Check size={16} /> جداول وفهارس وملاحق</span></div><button className="details-button" type="button" onClick={() => setResearchDetailsOpen(true)}>استعراض التفاصيل <ChevronLeft size={17} /></button><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">اطلب خدمة البحوث <MessageCircle size={17} /></a></div></article></section>

      {researchDetailsOpen && <div className="research-details-backdrop" role="presentation" onClick={() => setResearchDetailsOpen(false)}><section className="research-details-panel" role="dialog" aria-modal="true" aria-labelledby="research-details-title" onClick={(event) => event.stopPropagation()}><div className="research-details-header"><div><span className="section-kicker">تفاصيل الخدمة</span><h2 id="research-details-title">خدمات البحوث العلمية</h2></div><button type="button" onClick={() => setResearchDetailsOpen(false)} aria-label="إغلاق التفاصيل"><X size={20} /></button></div><div className="research-details-body"><div className="details-block details-overview"><h3>وصف الخدمة</h3><p>نساعدك على تحويل فكرتك إلى بحث علمي متكامل، من التخطيط والكتابة إلى التوثيق والتنسيق والمراجعة النهائية.</p></div><div className="details-block"><h3>ما الذي نحتاجه منك؟</h3><ul><li>عنوان الموضوع أو الفكرة البحثية.</li><li>اسم المقرر والتخصص والمرحلة الدراسية.</li><li>عدد الصفحات والموعد النهائي للتسليم.</li><li>دليل الجامعة أو تعليمات المحاضر إن وجدت.</li><li>أي مراجع أو ملفات أو ملاحظات ترغب بإضافتها.</li></ul></div><div className="details-block"><h3>أعمالنا السابقة</h3><div className="details-samples">{previousWorks.slice(0, 5).map((work) => <a href={work.preview} target="_blank" rel="noreferrer" key={work.preview}><FileText size={17} /><span>{work.title}</span><ChevronLeft size={16} /></a>)}</div></div></div><div className="research-details-footer"><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">ابدأ طلبك الآن <MessageCircle size={17} /></a></div></section></div>}

      <section id="portfolio" className="portfolio-section container"><div className="section-heading"><div><span className="section-kicker">أعمالنا السابقة</span><h2>نماذج من <em>أعمالنا</em></h2></div></div><div className="portfolio-grid">{previousWorks.map((work) => <button className="portfolio-work-card" key={work.preview} onClick={() => setSelectedWork(work)}><span className="portfolio-file-icon"><FileText size={28} /><small>PDF</small></span><span className="portfolio-work-info"><strong>{work.title}</strong><small>اضغط للمعاينة</small></span><ChevronLeft size={18} /></button>)}</div></section>

      {selectedWork && <div className="pdf-modal-backdrop" role="presentation" onClick={() => setSelectedWork(null)}><section className="pdf-modal" role="dialog" aria-modal="true" aria-labelledby="pdf-title" onClick={(event) => event.stopPropagation()}><div className="pdf-modal-header"><h2 id="pdf-title">{selectedWork.title}</h2><button onClick={() => setSelectedWork(null)} aria-label="إغلاق المعاينة"><X size={20} /></button></div><div className="pdf-viewer"><iframe src={selectedWork.preview} title={`معاينة ${selectedWork.title}`} /></div></section></div>}

      <section className="student-showcase-section container"><div className="hero-art visual-hero"><div className="visual-orb" /><Image className="student-hero-image" src="/images/hadeel-student-hero.png" alt="طالبة وباحثة عربية تمثل خدمات منصة هديل" width={390} height={480} priority /><div className="floating-badge badge-research"><BookOpen size={18} /><span>إعداد البحوث<br /><small>والأوراق العلمية</small></span></div><div className="floating-badge badge-presentation"><Presentation size={18} /><span>تصميم العروض<br /><small>التقديمية PowerPoint</small></span></div><div className="floating-badge badge-assignments"><Check size={18} /><span>متابعة التكليفات<br /><small>والواجبات</small></span></div><div className="floating-badge badge-blackboard"><Headphones size={18} /><span>إدارة البلاك بورد<br /><small>متابعة مستمرة</small></span></div><div className="floating-badge badge-package"><Sparkles size={17} /><span>الباقة الأكاديمية الشاملة للطلاب</span></div></div></section>

      <section className="academic-ad-section container"><div className="academic-ad"><span className="ad-badge"><span>⚡</span> خدمات أكاديمية متكاملة</span><h2>ارفع معدلك.<br />ووفر وقتك.</h2><p>من إعداد البحوث الموثقة إلى إدارة حساب البلاك بورد، تقدم لك منصة هديل كافة الأدوات والخدمات التي توفر وقتك وتضمن لك التفوق الأكاديمي.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="ad-button">ابدأ طلبك الآن <ArrowLeft size={16} /></a></div></section>

      <section className="achievements-section container"><div className="achievements-copy"><span className="section-kicker">إنجازاتنا بالأرقام</span><h2>نتائج تُثبت<br /><em>ثقة طلابنا</em></h2><p>نفخر بكل طالب ساعدناه على تحويل التحديات الأكاديمية إلى إنجازات واضحة ونتائج ملموسة.</p><div className="achievement-stats"><div><strong>+1,200</strong><span>خدمة منجزة</span></div><div><strong>98%</strong><span>رضا العملاء</span></div><div><strong>+6</strong><span>سنوات خبرة</span></div><div><strong>24/7</strong><span>دعم ومتابعة</span></div></div></div><div className="achievements-image" onMouseEnter={() => setAchievementPaused(true)} onMouseLeave={() => setAchievementPaused(false)}><div className="achievement-slides" aria-live="polite"><Image key={achievementImages[achievementIndex]} className="achievement-slide" src={achievementImages[achievementIndex]} alt={`نموذج إنجاز أكاديمي ${achievementIndex + 1}`} fill sizes="(max-width: 800px) 100vw, 45vw" /></div><button className="achievement-arrow achievement-next" onClick={() => setAchievementIndex((achievementIndex + 1) % achievementImages.length)} aria-label="الصورة التالية"><ChevronRight size={18} /></button><button className="achievement-arrow achievement-prev" onClick={() => setAchievementIndex((achievementIndex - 1 + achievementImages.length) % achievementImages.length)} aria-label="الصورة السابقة"><ChevronLeft size={18} /></button><div className="achievement-dots">{achievementImages.map((image, index) => <button key={image} className={index === achievementIndex ? 'active' : ''} onClick={() => setAchievementIndex(index)} aria-label={`عرض الصورة ${index + 1}`} />)}</div></div></section>

      <section id="why" className="why-section"><div className="container why-inner"><div><span className="section-kicker">لماذا تختار منصة هديل؟</span><h2>معك من أول فكرة<br /><em>حتى التسليم النهائي</em></h2><p>فريق متخصص، تواصل واضح، وجودة نراجعها معك خطوة بخطوة.</p></div><div className="feature-list"><div><Check /><span><strong>سرعة فائقة في الإنجاز</strong><small>تنفيذ وتسليم في وقت قياسي.</small></span></div><div><Check /><span><strong>جودة أكاديمية عالية</strong><small>مراجعة تدقيقية متكاملة لجميع الأعمال.</small></span></div><div><Check /><span><strong>دعم ومتابعة مستمرة</strong><small>تواصل وتعديل حتى اعتماد العمل نهائيًا.</small></span></div></div></div></section>

      <section id="contact" className="cta-section container"><div><span className="section-kicker">جاهز تبدأ؟</span><h2>خلّنا ننجزها <em>معًا</em></h2><p>تواصل معنا الآن واحصل على استشارة مجانية لخدمتك.</p></div><a className="light-button" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /> تواصل عبر واتساب</a></section>
      <footer className="footer"><div className="container footer-grid"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">هـ</span><span>منصة هديل<span className="brand-dot">.</span></span></a><p>منصة هديل للخدمات الطلابية والأكاديمية، شريكك نحو إنجاز أكاديمي أفضل.</p></div><div><h4>روابط سريعة</h4><a href="#story">قصتنا</a><a href="#values">قيمنا</a><a href="#why">لماذا نحن</a></div><div><h4>تواصل معنا</h4><a href="mailto:Hadeelmubarak387@gmail.com">Hadeelmubarak387@gmail.com</a></div><div className="footer-note"><MessageCircle size={30} /><h4>تحتاج مساعدة؟</h4><p>فريقنا جاهز للإجابة عن استفساراتك.</p><a className="footer-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">راسلنا مباشرة <ArrowLeft size={15} /></a></div></div><div className="container footer-bottom"><span>© 2026 منصة هديل للخدمات الطلابية والأكاديمية. جميع الحقوق محفوظة.</span><span>صُنع بعناية للطلاب والباحثين</span></div></footer>
      <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="تواصل معنا عبر واتساب"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/whatsapp/default.svg" alt="واتساب" /><span>تواصل معنا</span></a>

    </main>
  )
}
