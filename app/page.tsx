'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  ArrowLeft, BookOpen, Check, ChevronLeft, ChevronRight, FileText, GraduationCap, Headphones,
  Menu, MessageCircle, Presentation, ShieldCheck, Sparkles, UserRound, X,
} from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

const servicesDetailsData = [
  {
    id: 'research',
    icon: BookOpen,
    image: '/images/service-research.png',
    title: 'إعداد البحوث والتقارير',
    shortText: 'بحوث وتقارير علمية وفق منهجية أكاديمية وتوثيق معتمد خالية من الاقتباس.',
    about: 'نقدم لك إعداداً شاملاً للبحوث والتقارير الأكاديمية وفق المناهج العلمية المعتمدة. نلتزم بالأمانة العلمية وتقديم عمل أصيل خالي تماماً من السرقات الأدبية مع التوثيق المرجعي الدقيق.',
    previousWorks: [],
    requirements: [
      'عنوان البحث و اسم المادة الدراسية.',
      'أسلوب التوثيق المعتمد (APA, Harvard, IEEE...).',
      'عدد الصفحات أو كلمات البحث المطلوبة.',
      'ملف التعليمات أو دليل الإرشادات من أستاذ المادة.'
    ],
    faqs: [
      { q: 'هل يتم الفحص ضد السرقات الأدبية (Plagiarism)؟', a: 'نعم، يتم فحص الأعمال ببرامج معتمدة لضمان أصالتها وتزويدك بتقارير نسبة الاقتباس.' },
      { q: 'هل يمكن التعديل بعد الاستلام؟', a: 'نعم، نقدم تعديلات مجانية حتى اعتماد العمل نهائياً وفق الشروط المحددة.' }
    ]
  },
  {
    id: 'presentation',
    icon: Presentation,
    image: '/images/service-presentation.png',
    title: 'العروض التقديمية',
    shortText: 'تصميم شرائح PowerPoint احترافية وتفاعلية لمشاريع التخرج والمناقشات.',
    about: 'تصميم عروض تقديمية جذابة وبصرية تعكس احترافية محتواك، مع مراعاة اختصار النصوص واستخدام الرسوم البيانية والأيقونات الموضحة لتسهيل الإلقاء أمام اللجان.',
    previousWorks: [],
    requirements: [
      'ملف البحث أو النص المراد تحويله لعرض.',
      'عدد الشرائح المطلوبة (إن وجد).',
      'الألوان المفضلة أو الهوية البصرية للجامعة.'
    ],
    faqs: [
      { q: 'هل يتم إضافة بطاقات وشروح للملقي؟', a: 'نعم، يمكننا إضافة ملاحظات الملقي (Speaker Notes) أسفل كل شريحة لمساعدتك أثناء العرض.' }
    ]
  },
  {
    id: 'assignments',
    icon: GraduationCap,
    image: '/images/service-assignments.png',
    title: 'التكليفات والواجبات',
    shortText: 'حل ومتابعة وافية للأنشطة والواجبات الجامعية بمختلف التخصصات.',
    about: 'تقديم حلول نموذجية ومفصلة لكافة التكليفات والأنشطة والواجبات اليومية لمختلف التخصصات مع توضيح خطوات الحل لضمان تحصيل كامل الدرجات.',
    previousWorks: [],
    requirements: [
      'ملف الواجب أو الأسئلة المطلوبة.',
      'الموعد النهائي للتسليم (Deadline).',
      'أي ملاحظات أو شروط خاصة من الدكتور.'
    ],
    faqs: [
      { q: 'كم يستغرق حل الواجب؟', a: 'يتم التسليم عادةً خلال 24 إلى 48 ساعة كحد أقصى حسب حجم الواجب.' }
    ]
  },
  {
    id: 'cv',
    icon: UserRound,
    image: '/images/service-cv.png',
    title: 'السيرة الذاتية CV',
    shortText: 'سير ذاتية عربية وإنجليزية متوافقة مع أنظمة الفرز الآلي ATS.',
    about: 'صياغة وتصميم سيرتك الذاتية بأسلوب تسويقي حديث متوافق مع أنظمة الفرز الآلي (ATS) باللغتين العربية والإنجليزية لزيادة فرص قبولك الوظيفي والتدريبي.',
    previousWorks: [],
    requirements: [
      'البيانات الشخصية ووسائل التواصل.',
      'المؤهلات العلمية، الخبرات، والدورات.',
      'المهارات والبرامج التي تجيدها.'
    ],
    faqs: [
      { q: 'هل يتم تسليم الملف بصيغة قابلة للتعديل؟', a: 'نعم، يتم تسليمك ملف PDF جاهز وملف Word أو رابط قابل للتعديل مستقبلاً.' }
    ]
  },
  {
    id: 'invitations',
    icon: Sparkles,
    image: '/images/service-invitations.png',
    title: 'الدعوات الإلكترونية',
    shortText: 'بطاقات تخرج ومناسبات بتصاميم حديثة ومميزة تناسب ذوقك.',
    about: 'تصميم دعوات تخرج ومناسبات أكاديمية تفاعلية وحديثة، تحتوي على مؤقت تنازلي، خريطة الموقع، وإمكانية تأكيد الحضور الفوري.',
    previousWorks: [],
    requirements: [
      'اسم الخريج / صاحب المناسبة.',
      'موعد ومكان المناسبة.',
      'العبارات أو الأبيات الشعرية المراد إضافتها.'
    ],
    faqs: [
      { q: 'هل تتضمن الدعوة مقطع فيديو أو موسيقى؟', a: 'نعم، نتيح تصاميم بطاقات ثابتة أو فيديوهات مع إضافة المؤثرات الصوتية المطلوبة.' }
    ]
  },
  {
    id: 'blackboard',
    icon: Headphones,
    image: '/images/service-followup.png',
    title: 'متابعة مواد البلاك بورد',
    shortText: 'إدارة ومتابعة المقررات والمحاضرات والاختبارات طوال الترم.',
    about: 'إدارة متكاملة ومتابعة دورية لحسابك في نظام البلاك بورد طوال الفصل الدراسي، تشمل متابعة المحاضرات، حل الكويزات، ورفع التكليفات في مواعيدها.',
    previousWorks: [],
    requirements: [
      'بيانات الدخول للمنصة (الاسم وكلمة المرور).',
      'أسماء المواد المراد متابعتها.',
      'أي شروط أو تعليمات خاصة بالجامعة.'
    ],
    faqs: [
      { q: 'كيف تضمنون سرية بيانات الحساب؟', a: 'الخصوصية أولويتنا، ولا يتم مشاركة أي بيانات دخول مع أي طرف ثالث مطلقاً.' }
    ]
  }
]


const values = [
  ['الأمانة الأكاديمية', 'أصالة وجودة وخلو الأعمال من السرقات الأدبية.'],
  ['السرية والخصوصية', 'حماية كاملة لبيانات ومستندات ومعلومات الطلاب.'],
  ['التميز والدقة', 'أعمال متكاملة تفي بالمعايير والشروط الجامعية.'],
  ['الالتزام بالمواعيد', 'احترام وقتك وتسليم دقيق في الموعد المحدد.'],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedDetailService, setSelectedDetailService] = useState<typeof servicesDetailsData[0] | null>(null)
  const [formData, setFormData] = useState({ studentName: '', universityId: '', notes: '', fileName: '' })

  const handleSendToWhatsapp = () => {
    if (!selectedDetailService) return
    let message = `مرحباً منصة هديل، أرغب بطلب خدمة: *${selectedDetailService.title}*\n\n`
    message += `👤 *اسم الطالب/الطالبة:* ${formData.studentName || 'لم يحدد'}\n`
    message += `🎓 *الرقم الجامعي:* ${formData.universityId || 'لم يحدد'}\n`
    if (formData.fileName) message += `📎 *اسم/وصف الملف المرفق:* ${formData.fileName}\n`
    if (formData.notes) message += `📝 *ملاحظات وإرشادات:* ${formData.notes}\n`
    message += `\nأرجو التواصل معي لتأكيد الطلب والتفاصيل.`

    window.open(`https://wa.me/967776280186?text=${encodeURIComponent(message)}`, '_blank')
  }

  const [selectedWork, setSelectedWork] = useState<{ title: string; preview: string } | null>(null)
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
            <a href="#top" onClick={() => setMenuOpen(false)}>الرئيسية</a><a href="#story" onClick={() => setMenuOpen(false)}>قصتنا</a><a href="#values" onClick={() => setMenuOpen(false)}>قيمنا</a><a href="#services" onClick={() => setMenuOpen(false)}>خدماتنا</a><a href="#why" onClick={() => setMenuOpen(false)}>لماذا نحن</a><a href="#contact" onClick={() => setMenuOpen(false)}>اتصل بنا</a>
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

            <section id="services" data-reveal className="section container reveal-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">خدماتنا</span>
            <h2>حلول أكاديمية <em>شاملة وباحترافية</em></h2>
          </div>
          <a className="text-button" href={whatsapp} target="_blank" rel="noreferrer">
            اطلب الآن <ArrowLeft size={17} />
          </a>
        </div>

        <div className="service-grid">
          {servicesDetailsData.map((service) => {
            const Icon = service.icon
            return (
              <article key={service.id} className="service-card reveal-section" data-reveal>
                <div className="service-image">
                  <Image src={service.image} alt={service.title} fill sizes="(max-width: 800px) 100vw, 30vw" />
                </div>
                <div className="service-content" style={{ padding: '1.5rem 1rem 1rem' }}>
                  <span className="service-icon"><Icon size={24} /></span>
                  <h3>{service.title}</h3>
                  <p style={{ margin: '0.5rem 0 1.2rem', fontSize: '0.92rem', color: '#666', lineHeight: '1.6' }}>
                    {service.shortText}
                  </p>
                  <button 
                    className="primary-button" 
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem', padding: '0.6rem 1rem' }}
                    onClick={() => setSelectedDetailService(service)}
                  >
                    تفاصيل الخدمة والطلب <ChevronLeft size={16} />
                  </button>
                </div>
              </article>
            )
          })}
        </div>

        {/* النافذة المنبثقة للتفاصيل ورفع الطلب */}
        {selectedDetailService && (
          <div className="service-modal-backdrop" role="presentation" onClick={() => setSelectedDetailService(null)}>
            <section className="service-modal" style={{ maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
              <button className="service-modal-close" onClick={() => setSelectedDetailService(null)} aria-label="إغلاق">
                <X size={20} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <selectedDetailService.icon size={28} style={{ color: 'var(--primary, #10b981)' }} />
                <h2>{selectedDetailService.title}</h2>
              </div>

              {/* عن الخدمة */}
              <div style={{ marginBottom: '1.5rem', background: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#111' }}>📌 عن الخدمة</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#444' }}>{selectedDetailService.about}</p>
              </div>

              {/* الأعمال السابقة */}
              {selectedDetailService.previousWorks.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#111' }}>📄 نماذج من أعمالنا السابقة</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedDetailService.previousWorks.map((work, idx) => (
                      <a key={idx} href={work.link} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '6px', color: '#2563eb', textDecoration: 'none' }}>
                        <FileText size={18} /> {work.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* ماذا نحتاج منك */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#111' }}>📋 ماذا نحتاج منك لطلب الخدمة؟</h3>
                <ul style={{ listStyleType: 'disc', paddingRight: '1.2rem', color: '#444', lineHeight: '1.7' }}>
                  {selectedDetailService.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* الأسئلة الشائعة */}
              {selectedDetailService.faqs.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#111' }}>❓ الأسئلة الشائعة</h3>
                  {selectedDetailService.faqs.map((faq, idx) => (
                    <div key={idx} style={{ marginBottom: '0.8rem', padding: '0.8rem', borderRight: '3px solid #10b981', background: '#f8fafc' }}>
                      <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{faq.q}</strong>
                      <span style={{ fontSize: '0.9rem', color: '#555' }}>{faq.a}</span>
                    </div>
                  ))}
                </div>
              )}

              <hr style={{ margin: '1.5rem 0', borderColor: '#eee' }} />

              {/* نموذج الطلب والملاحظات */}
              <div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: '#111', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} /> طلب الخدمة ورفع المتطلبات
                </h3>
                <form onSubmit={(e) => { e.preventDefault(); handleSendToWhatsapp(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 'bold' }}>اسم الطالب / الطالبة *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="أدخل اسمك الكامـل" 
                      value={formData.studentName} 
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 'bold' }}>الرقم الجامعي</label>
                    <input 
                      type="text" 
                      placeholder="أدخل الرقم الجامعي (اختياري)" 
                      value={formData.universityId} 
                      onChange={(e) => setFormData({ ...formData, universityId: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 'bold' }}>ملف المتطلبات أو اسم الملف</label>
                    <input 
                      type="text" 
                      placeholder="أدخل عنوان الملف أو رابط جوجل درايف للمستند" 
                      value={formData.fileName} 
                      onChange={(e) => setFormData({ ...formData, fileName: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }}
                    />
                    <small style={{ color: '#777', fontSize: '0.8rem' }}>* يمكنك إرسال الملفات والمستندات مباشرة أثناء المحادثة عبر الواتساب.</small>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.3rem', fontWeight: 'bold' }}>ملاحظات وإرشادات إضافية</label>
                    <textarea 
                      rows={3} 
                      placeholder="أدخل أي شروط خاصة أو مواعيد التسليم المطلوبة..." 
                      value={formData.notes} 
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }}
                    />
                  </div>

                  <button type="submit" className="primary-button" style={{ justifyContent: 'center', background: '#25D366', borderColor: '#25D366', marginTop: '0.5rem', color: '#fff' }}>
                    تأكيد وإرسال الطلب عبر الواتساب <MessageCircle size={18} />
                  </button>
                </form>
              </div>
            </section>
          </div>
        )}
      </section>


      <section id="portfolio" className="portfolio-section container"><div className="section-heading"><div><span className="section-kicker">أعمالنا السابقة</span><h2>نماذج من <em>أعمالنا</em></h2></div></div><div className="portfolio-grid">{previousWorks.map((work) => <button className="portfolio-work-card" key={work.preview} onClick={() => setSelectedWork(work)}><span className="portfolio-file-icon"><FileText size={28} /><small>PDF</small></span><span className="portfolio-work-info"><strong>{work.title}</strong><small>اضغط للمعاينة</small></span><ChevronLeft size={18} /></button>)}</div></section>

      {selectedWork && <div className="pdf-modal-backdrop" role="presentation" onClick={() => setSelectedWork(null)}><section className="pdf-modal" role="dialog" aria-modal="true" aria-labelledby="pdf-title" onClick={(event) => event.stopPropagation()}><div className="pdf-modal-header"><h2 id="pdf-title">{selectedWork.title}</h2><button onClick={() => setSelectedWork(null)} aria-label="إغلاق المعاينة"><X size={20} /></button></div><div className="pdf-viewer"><iframe src={selectedWork.preview} title={`معاينة ${selectedWork.title}`} /></div></section></div>}

      <section className="student-showcase-section container"><div className="hero-art visual-hero"><div className="visual-orb" /><Image className="student-hero-image" src="/images/hadeel-student-hero.png" alt="طالبة وباحثة عربية تمثل خدمات منصة هديل" width={390} height={480} priority /><div className="floating-badge badge-research"><BookOpen size={18} /><span>إعداد البحوث<br /><small>والأوراق العلمية</small></span></div><div className="floating-badge badge-presentation"><Presentation size={18} /><span>تصميم العروض<br /><small>التقديمية PowerPoint</small></span></div><div className="floating-badge badge-assignments"><Check size={18} /><span>متابعة التكليفات<br /><small>والواجبات</small></span></div><div className="floating-badge badge-blackboard"><Headphones size={18} /><span>إدارة البلاك بورد<br /><small>متابعة مستمرة</small></span></div><div className="floating-badge badge-package"><Sparkles size={17} /><span>الباقة الأكاديمية الشاملة للطلاب</span></div></div></section>

      <section className="academic-ad-section container"><div className="academic-ad"><span className="ad-badge"><span>⚡</span> خدمات أكاديمية متكاملة</span><h2>ارفع معدلك.<br />ووفر وقتك.</h2><p>من إعداد البحوث الموثقة إلى إدارة حساب البلاك بورد، تقدم لك منصة هديل كافة الأدوات والخدمات التي توفر وقتك وتضمن لك التفوق الأكاديمي.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="ad-button">ابدأ طلبك الآن <ArrowLeft size={16} /></a></div></section>

      <section className="achievements-section container"><div className="achievements-copy"><span className="section-kicker">إنجازاتنا بالأرقام</span><h2>نتائج تُثبت<br /><em>ثقة طلابنا</em></h2><p>نفخر بكل طالب ساعدناه على تحويل التحديات الأكاديمية إلى إنجازات واضحة ونتائج ملموسة.</p><div className="achievement-stats"><div><strong>+1,200</strong><span>خدمة منجزة</span></div><div><strong>98%</strong><span>رضا العملاء</span></div><div><strong>+6</strong><span>سنوات خبرة</span></div><div><strong>24/7</strong><span>دعم ومتابعة</span></div></div></div><div className="achievements-image" onMouseEnter={() => setAchievementPaused(true)} onMouseLeave={() => setAchievementPaused(false)}><div className="achievement-slides" aria-live="polite"><Image key={achievementImages[achievementIndex]} className="achievement-slide" src={achievementImages[achievementIndex]} alt={`نموذج إنجاز أكاديمي ${achievementIndex + 1}`} fill sizes="(max-width: 800px) 100vw, 45vw" /></div><button className="achievement-arrow achievement-next" onClick={() => setAchievementIndex((achievementIndex + 1) % achievementImages.length)} aria-label="الصورة التالية"><ChevronRight size={18} /></button><button className="achievement-arrow achievement-prev" onClick={() => setAchievementIndex((achievementIndex - 1 + achievementImages.length) % achievementImages.length)} aria-label="الصورة السابقة"><ChevronLeft size={18} /></button><div className="achievement-dots">{achievementImages.map((image, index) => <button key={image} className={index === achievementIndex ? 'active' : ''} onClick={() => setAchievementIndex(index)} aria-label={`عرض الصورة ${index + 1}`} />)}</div></div></section>

      <section id="why" className="why-section"><div className="container why-inner"><div><span className="section-kicker">لماذا تختار منصة هديل؟</span><h2>معك من أول فكرة<br /><em>حتى التسليم النهائي</em></h2><p>فريق متخصص، تواصل واضح، وجودة نراجعها معك خطوة بخطوة.</p></div><div className="feature-list"><div><Check /><span><strong>سرعة فائقة في الإنجاز</strong><small>تنفيذ وتسليم في وقت قياسي.</small></span></div><div><Check /><span><strong>جودة أكاديمية عالية</strong><small>مراجعة تدقيقية متكاملة لجميع الأعمال.</small></span></div><div><Check /><span><strong>دعم ومتابعة مستمرة</strong><small>تواصل وتعديل حتى اعتماد العمل نهائيًا.</small></span></div></div></div></section>

      <section id="contact" className="cta-section container"><div><span className="section-kicker">جاهز تبدأ؟</span><h2>خلّنا ننجزها <em>معًا</em></h2><p>تواصل معنا الآن واحصل على استشارة مجانية لخدمتك.</p></div><a className="light-button" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /> تواصل عبر واتساب</a></section>
      <footer className="footer"><div className="container footer-grid"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">هـ</span><span>منصة هديل<span className="brand-dot">.</span></span></a><p>منصة هديل للخدمات الطلابية والأكاديمية، شريكك نحو إنجاز أكاديمي أفضل.</p></div><div><h4>روابط سريعة</h4><a href="#story">قصتنا</a><a href="#values">قيمنا</a><a href="#services">خدماتنا</a><a href="#why">لماذا نحن</a></div><div><h4>تواصل معنا</h4><a href="mailto:Hadeelmubarak387@gmail.com">Hadeelmubarak387@gmail.com</a></div><div className="footer-note"><MessageCircle size={30} /><h4>تحتاج مساعدة؟</h4><p>فريقنا جاهز للإجابة عن استفساراتك.</p><a className="footer-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">راسلنا مباشرة <ArrowLeft size={15} /></a></div></div><div className="container footer-bottom"><span>© 2026 منصة هديل للخدمات الطلابية والأكاديمية. جميع الحقوق محفوظة.</span><span>صُنع بعناية للطلاب والباحثين</span></div></footer>
      <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="تواصل معنا عبر واتساب"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/whatsapp/default.svg" alt="واتساب" /><span>تواصل معنا</span></a>

    </main>
  )
}
