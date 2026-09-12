'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  ArrowLeft, BookOpen, Check, ChevronDown, ChevronLeft, ChevronRight, Calculator,
  FileText, GraduationCap, Headphones, Menu, MessageCircle, Presentation,
  Share2, ShieldCheck, Sparkles, Star, UserRound, X, Plus, Trash2
} from 'lucide-react'
import HeroBanner from './components/HeroBanner';

const whatsapp = 'https://wa.me/967776280186'

const servicesDetailsData = [
  {
    id: 'research',
    category: 'research',
    icon: BookOpen,
    image: '/images/service-research.png',
    title: 'إعداد البحوث والتقارير',
    shortText: 'بحوث وتقارير علمية وفق منهجية أكاديمية وتوثيق معتمد خالية من الاقتباس.',
    about: 'نقدم لك إعداداً شاملاً للبحوث والتقارير الأكاديمية وفق المناهج العلمية المعتمدة. نلتزم بالأمانة العلمية وتقديم عمل أصيل خالي تماماً من السرقات الأدبية مع التوثيق المرجعي الدقيق (APA 7th, Harvard, IEEE).',
    previousWorks: [],
    requirements: [
      'عنوان البحث واسم المادة الدراسية.',
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
    category: 'design',
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
    category: 'academic',
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
    category: 'design',
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
    category: 'design',
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
    category: 'academic',
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

const generalFaqs = [
  { q: 'كيف أستطيع طلب خدمة من منصة هديل؟', a: 'يمكنك اختيار الخدمة المطلوبة من الموقع، الضغط على زر التفاصيل وتعبئة النموذج، أو التواصل المباشر معنا عبر الواتساب وإرسال المتطلبات.' },
  { q: 'ما هي طرق الدفع المتاحة؟', a: 'نوفر طرق دفع إلكترونية متعددة وآمنة تناسب جميع الطلاب داخل وخارج المملكة.' },
  { q: 'هل يمكنني طلب تعديل على العمل بعد الاستلام؟', a: 'نعم بكل تأكيد، نضمن لك تعديلات مجانية لتلبية الملاحظات الأكاديمية والوصول بالعمل إلى مستوى القبول والرضا الكامل.' },
  { q: 'كيف يتم ضمان سرية الخصوصية والبيانات؟', a: 'جميع معلومات الطلاب، البيانات الأكاديمية، والملفات المُرسلة تُعامل بسرية تامة ولا يتم إظهارها أو مشاركتها مع أي جهة.' }
]

const testimonialsData = [
  { name: 'عبدالله العتيبي', role: 'طالب بكالوريوس', text: 'ما شاء الله تبارك الله، سرعة ودقة في إعداد البحث والتزام بالتوثيق المعتمد APA. أنقذتوني في الوقت المناسب!', rating: 5 },
  { name: 'سارة الشمري', role: 'طالبة ماجستير', text: 'عرض الباوربوينت كان أكثر من رائع وتفاعلي، الدكتور أثنى على تنسيق الشرائح وطريقة عرض الأفكار. شكراً منصة هديل.', rating: 5 },
  { name: 'محمد الغامدي', role: 'طالب جامعي', text: 'خدمة متابعة التكليفات والبلاك بورد احترافية جداً وبمنتهى الخصوصية والأمانة. تعامل راقي ومستمر معكم بإذن الله.', rating: 5 }
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
  
  const [activeCategory, setActiveCategory] = useState<'all' | 'research' | 'design' | 'academic'>('all')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const [gpaSystem, setGpaSystem] = useState<5 | 4>(5)
  const [courses, setCourses] = useState([
    { id: 1, hours: 3, grade: 5 },
    { id: 2, hours: 3, grade: 4.75 },
    { id: 3, hours: 2, grade: 4.5 }
  ])
  const [calculatedGpa, setCalculatedGpa] = useState<string | null>(null)

  const handleAddCourse = () => {
    setCourses([...courses, { id: Date.now(), hours: 3, grade: gpaSystem }])
  }

  const handleRemoveCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id))
    }
  }

  const handleCalculateGpa = () => {
    let totalPoints = 0
    let totalHours = 0
    courses.forEach(c => {
      totalPoints += c.hours * c.grade
      totalHours += c.hours
    })
    if (totalHours > 0) {
      setCalculatedGpa((totalPoints / totalHours).toFixed(2))
    }
  }

  const handleCopyServiceLink = (serviceTitle: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setToastMessage(`تم نسخ رابط خدمة "${serviceTitle}" بنجاح!`)
      setTimeout(() => setToastMessage(null), 3000)
    }
  }

  const filteredServices = activeCategory === 'all' 
    ? servicesDetailsData 
    : servicesDetailsData.filter(s => s.category === activeCategory)

  const marqueeServices = [...filteredServices, ...filteredServices, ...filteredServices]

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
  const previousWorks = [
    { title: 'تأثير التكنولوجيا على الخدمات التعليمية', preview: 'https://drive.google.com/file/d/1eFtsqZqRJsWDCcTYcZQXSmIeU0w02NLI/preview' },
    { title: 'حماية البيئة في ظل رؤية المملكة 2030', preview: 'https://drive.google.com/file/d/1KriLId4ui_lb8UusGwanwVUHQ4dk3oLC/preview' },
    { title: 'تطوير الصناعات المحلية والخدمات اللوجستية', preview: 'https://drive.google.com/file/d/1nDeMLBHtyiyNn_N6EZ0mAsmdOQ_qTiyG/preview' },
    { title: 'المبتدأ والخبر في القرآن الكريم', preview: 'https://drive.google.com/file/d/15tZAI1j_ppP-YiKWwJQtMlStvqnRebMJ/preview' },
    { title: 'مشروع إقامة ذكية SmartStay', preview: 'https://drive.google.com/file/d/1M3M6BW7RVOBvOMyH9MVnmJugwVwzrW1I/preview' },
    { title: 'الفروق الفقهية في الأحوال الشخصية', preview: 'https://drive.google.com/file/d/1iaOiQbgtcqJUJdYeSEU48FBcgWR9E88M/preview' }
  ]
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
      <style jsx global>{`
        @keyframes servicesMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(33.333%);
          }
        }
        .services-marquee-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: servicesMarquee 35s linear infinite;
        }
        .services-marquee-container:hover .services-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '20px', left: '20px', backgroundColor: '#10b981', color: '#fff', padding: '0.8rem 1.2rem', borderRadius: '8px', zIndex: 99999, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontWeight: 'bold', fontSize: '0.9rem' }}>
          {toastMessage}
        </div>
      )}

      <div className="announcement"><Sparkles size={15} /> خصم خاص على خدمات منصة هديل لفترة محدودة <ArrowLeft size={15} /></div>
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
      
      <section id="top" className="hero container">
        <div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" /> شريكك الأكاديمي الموثوق</span><h1>نرتب لك طريقك<br /><strong>نحو النجاح الأكاديمي</strong></h1><p>منصة هديل للخدمات الطلابية والأكاديمية. حلول احترافية، جودة عالية، ومتابعة مستمرة تساعدك على إنجاز أعمالك بثقة.</p><div className="hero-buttons"><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">اطلب خدمتك الآن <MessageCircle size={18} /></a><a className="text-button" href="#services">استكشف خدماتنا <ArrowLeft size={18} /></a></div><div className="trust-row"><div className="avatars"><span>أ</span><span>م</span><span>س</span><span>+</span></div><div><strong>+10,000</strong><small>طالب وباحث يثقون بنا</small></div></div><div className="hero-blue-card"><div className="hero-card-badge">هديل</div><div className="art-top"><span>رحلتك الأكاديمية</span></div><p className="hero-card-caption">خطوات واضحة، إنجازات أكبر</p><div className="path-line"><span className="path-dot active" /><span /><span className="path-dot active" /><span /><span className="path-dot active" /></div><div className="art-labels"><span>خطط</span><span>أنجز</span><span>تفوّق</span></div><div className="floating-note"><Check size={16} /> عملك في أيدٍ أمينة</div></div></div>
        <div className="hero-art hero-photo">
  <Image 
    src="/images/hadeel.png" 
    alt="منصة هديل" 
    width={500} 
    height={500} 
    priority 
  />
</div>


      <section className="stats-strip">
        <div className="container stats">
          <div><strong>+10K</strong><span>طالب مستفيد</span></div>
          <div><strong>+15</strong><span>خدمة أكاديمية</span></div>
          <div><strong>+8</strong><span>سنوات خبرة</span></div>
          <div><strong>98%</strong><span>نسبة رضا العملاء</span></div>
        </div>
      </section>

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

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => setActiveCategory('all')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #10b981', background: activeCategory === 'all' ? '#10b981' : 'transparent', color: activeCategory === 'all' ? '#fff' : 'inherit', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.88rem' }}>الكل</button>
          <button onClick={() => setActiveCategory('research')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #10b981', background: activeCategory === 'research' ? '#10b981' : 'transparent', color: activeCategory === 'research' ? '#fff' : 'inherit', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.88rem' }}>بحوث وتقارير</button>
          <button onClick={() => setActiveCategory('design')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #10b981', background: activeCategory === 'design' ? '#10b981' : 'transparent', color: activeCategory === 'design' ? '#fff' : 'inherit', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.88rem' }}>تصاميم وعروض</button>
          <button onClick={() => setActiveCategory('academic')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #10b981', background: activeCategory === 'academic' ? '#10b981' : 'transparent', color: activeCategory === 'academic' ? '#fff' : 'inherit', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.88rem' }}>خدمات ومتابعة</button>
        </div>

        <div className="services-marquee-container" style={{ overflow: 'hidden', padding: '1rem 0' }}>
          <div className="services-marquee-track">
            {marqueeServices.map((service, index) => {
              const Icon = service.icon
              return (
                <article 
                  key={`${service.id}-${index}`} 
                  className="service-card" 
                  style={{ 
                    position: 'relative', 
                    width: '320px', 
                    flexShrink: 0,
                    margin: 0
                  }}
                >
                  <button 
                    onClick={() => handleCopyServiceLink(service.title)}
                    title="مشاركة/نسخ رابط الخدمة"
                    style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                  >
                    <Share2 size={16} style={{ color: '#333' }} />
                  </button>
                  <div className="service-image" style={{ height: '180px', position: 'relative' }}>
                    <Image src={service.image} alt={service.title} fill sizes="320px" />
                  </div>
                  <div className="service-content" style={{ padding: '1.2rem 1rem 1rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span className="service-icon" style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <Icon size={22} />
                      </span>
                      <h3 style={{ fontSize: '1.15rem', marginTop: '0.2rem', fontWeight: 'bold', textAlign: 'center', width: '100%' }}>{service.title}</h3>
                      <p style={{ margin: '0.5rem 0 1rem', fontSize: '0.88rem', color: '#111827', lineHeight: '1.5', fontWeight: '500', textAlign: 'center', direction: 'rtl', height: '2.8rem', overflow: 'hidden', width: '100%' }}>
                        {service.shortText}
                      </p>
                    </div>
                    <button 
                      className="primary-button" 
                      style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '0.55rem 0.8rem' }}
                      onClick={() => setSelectedDetailService(service)}
                    >
                      تفاصيل الخدمة والطلب <ChevronLeft size={16} />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {selectedDetailService && (
          <div 
            className="service-modal-backdrop" 
            role="presentation" 
            onClick={() => setSelectedDetailService(null)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, padding: '1rem' }}
          >
            <section 
              className="service-modal" 
              role="dialog" 
              aria-modal="true" 
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '1.5rem', width: '100%', maxWidth: '650px', maxHeight: '85vh', overflowY: 'auto', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', direction: 'rtl' }}
            >
              <button 
                className="service-modal-close" 
                onClick={() => setSelectedDetailService(null)} 
                aria-label="إغلاق"
                style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#f3f4f6', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1rem', textAlign: 'center' }}>
                {selectedDetailService.icon && <selectedDetailService.icon size={32} style={{ color: '#10b981' }} />}
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center' }}>{selectedDetailService.title}</h2>
              </div>

              <div style={{ marginBottom: '1.2rem', background: '#f9fafb', padding: '0.8rem 1rem', borderRadius: '8px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: '#111', fontWeight: 'bold' }}>📌 عن الخدمة</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#444' }}>{selectedDetailService.about}</p>
              </div>

              {selectedDetailService.requirements && (
                <div style={{ marginBottom: '1.2rem' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: '#111', fontWeight: 'bold', textAlign: 'center' }}>📋 ماذا نحتاج منك لطلب الخدمة؟</h3>
                  <ul style={{ listStyleType: 'none', paddingRight: 0, color: '#444', fontSize: '0.88rem', lineHeight: '1.6', textAlign: 'center' }}>
                    {selectedDetailService.requirements.map((req, idx) => <li key={idx} style={{ marginBottom: '0.2rem' }}>• {req}</li>)}
                  </ul>
                </div>
              )}

              {selectedDetailService.faqs && selectedDetailService.faqs.length > 0 && (
                <div style={{ marginBottom: '1.2rem' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem', color: '#111', fontWeight: 'bold', textAlign: 'center' }}>❓ الأسئلة الشائعة للخدمة</h3>
                  {selectedDetailService.faqs.map((faq, idx) => (
                    <div key={idx} style={{ marginBottom: '0.6rem', padding: '0.6rem 0.8rem', background: '#f8fafc', borderRadius: '6px', textAlign: 'center' }}>
                      <strong style={{ display: 'block', fontSize: '0.88rem', marginBottom: '0.2rem' }}>{faq.q}</strong>
                      <span style={{ fontSize: '0.83rem', color: '#555' }}>{faq.a}</span>
                    </div>
                  ))}
                </div>
              )}

              <hr style={{ margin: '1.2rem 0', borderColor: '#eee' }} />

              <div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.8rem', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold' }}>
                  <Sparkles size={16} /> طلب الخدمة ورفع المتطلبات
                </h3>
                <form onSubmit={(e) => { e.preventDefault(); handleSendToWhatsapp(); }} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem', fontWeight: 'bold', textAlign: 'right' }}>اسم الطالب / الطالبة *</label>
                    <input type="text" required placeholder="أدخل اسمك الكامـل" value={formData.studentName} onChange={(e) => setFormData({ ...formData, studentName: e.target.value })} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.88rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem', fontWeight: 'bold', textAlign: 'right' }}>الرقم الجامعي</label>
                    <input type="text" placeholder="أدخل الرقم الجامعي (اختياري)" value={formData.universityId} onChange={(e) => setFormData({ ...formData, universityId: e.target.value })} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.88rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem', fontWeight: 'bold', textAlign: 'right' }}>ملف المتطلبات أو اسم الملف</label>
                    <input type="text" placeholder="أدخل عنوان الملف أو رابط جوجل درايف" value={formData.fileName} onChange={(e) => setFormData({ ...formData, fileName: e.target.value })} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.88rem' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem', fontWeight: 'bold', textAlign: 'right' }}>ملاحظات وإرشادات إضافية</label>
                    <textarea rows={2} placeholder="أدخل أي شروط خاصة أو موعد التسليم..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.88rem' }} />
                  </div>
                  <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: '#fff', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', marginTop: '0.4rem' }}>
                    تأكيد وإرسال الطلب عبر الواتساب <MessageCircle size={18} />
                  </button>
                </form>
              </div>
            </section>
          </div>
        )}
      </section>
      <HeroBanner />

      <section id="gpa-calculator" className="section soft-section container" style={{ marginTop: '2rem', borderRadius: '16px', padding: '2rem' }}>
        <div className="center-heading">
          <span className="section-kicker">أداة تفاعلية</span>
          <h2>حاسبة <em>المعدل التراكمي (GPA)</em></h2>
          <p>احسب معدلك الفصل المتوقع بسهولة ودقة وفق السلم الأكاديمي المعتمد.</p>
        </div>

        <div style={{ maxWidth: '650px', margin: '0 auto', background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', justifyContent: 'center' }}>
            <button onClick={() => { setGpaSystem(5); setCalculatedGpa(null) }} style={{ padding: '0.4rem 1rem', borderRadius: '6px', border: '1px solid #10b981', background: gpaSystem === 5 ? '#10b981' : '#fff', color: gpaSystem === 5 ? '#fff' : '#333', fontWeight: 'bold', cursor: 'pointer' }}>نظام من 5</button>
            <button onClick={() => { setGpaSystem(4); setCalculatedGpa(null) }} style={{ padding: '0.4rem 1rem', borderRadius: '6px', border: '1px solid #10b981', background: gpaSystem === 4 ? '#10b981' : '#fff', color: gpaSystem === 4 ? '#fff' : '#333', fontWeight: 'bold', cursor: 'pointer' }}>نظام من 4</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {courses.map((course, idx) => (
              <div key={course.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', width: '60px' }}>مادة {idx + 1}</span>
                <input type="number" min="1" max="6" value={course.hours} onChange={(e) => {
                  const updated = [...courses]
                  updated[idx].hours = Number(e.target.value)
                  setCourses(updated)
                }} style={{ width: '80px', padding: '0.4rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.85rem' }} placeholder="ساعات" />
                
                <select value={course.grade} onChange={(e) => {
                  const updated = [...courses]
                  updated[idx].grade = Number(e.target.value)
                  setCourses(updated)
                }} style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.85rem' }}>
                  {gpaSystem === 5 ? (
                    <>
                      <option value={5}>ممتاز مرتفع (+A) - 5.0</option>
                      <option value={4.75}>ممتاز (A) - 4.75</option>
                      <option value={4.5}>جيد جداً مرتفع (+B) - 4.5</option>
                      <option value={4.0}>جيد جداً (B) - 4.0</option>
                      <option value={3.5}>جيد مرتفع (+C) - 3.5</option>
                      <option value={3.0}>جيد (C) - 3.0</option>
                      <option value={2.5}>مقبول مرتفع (+D) - 2.5</option>
                      <option value={2.0}>مقبول (D) - 2.0</option>
                      <option value={1.0}>راسب (F) - 1.0</option>
                    </>
                  ) : (
                    <>
                      <option value={4.0}>ممتاز (A) - 4.0</option>
                      <option value={3.5}>جيد جداً مرتفع (+B) - 3.5</option>
                      <option value={3.0}>جيد جداً (B) - 3.0</option>
                      <option value={2.5}>جيد مرتفع (+C) - 2.5</option>
                      <option value={2.0}>جيد (C) - 2.0</option>
                      <option value={1.5}>مقبول (+D) - 1.5</option>
                      <option value={1.0}>مقبول (D) - 1.0</option>
                      <option value={0.0}>راسب (F) - 0.0</option>
                    </>
                  )}
                </select>

                <button onClick={() => handleRemoveCourse(course.id)} style={{ background: '#fee2e2', border: 'none', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
            <button onClick={handleAddCourse} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f3f4f6', border: '1px solid #ccc', padding: '0.5rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}><Plus size={16} /> إضافة مادة</button>
            <button onClick={handleCalculateGpa} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#10b981', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}><Calculator size={16} /> حساب المعدل</button>
          </div>

          {calculatedGpa !== null && (
            <div style={{ marginTop: '1.2rem', padding: '1rem', background: '#ecfdf5', borderRadius: '8px', textAlign: 'center', border: '1px solid #a7f3d0' }}>
              <span style={{ fontSize: '0.9rem', color: '#065f46', fontWeight: 'bold' }}>معدلك المتوقع:</span>
              <strong style={{ display: 'block', fontSize: '1.8rem', color: '#047857', marginTop: '0.2rem' }}>{calculatedGpa} / {gpaSystem}</strong>
            </div>
          )}
        </div>
      </section>

      <section id="testimonials" className="section container">
        <div className="center-heading">
          <span className="section-kicker">آراء العملاء</span>
          <h2>ماذا يقول <em>طلابنا عنّا؟</em></h2>
          <p>تجارب حقيقية لطلاب وباحثين اعتمدوا على منصتنا لتسيير أبحاثهم ومسيرتهم الأكاديمية.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {testimonialsData.map((t, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', color: '#f59e0b', marginBottom: '0.8rem' }}>
                {[...Array(t.rating)].map((_, starIndex) => <Star key={starIndex} size={16} fill="#f59e0b" />)}
              </div>
              <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: '1.6', marginBottom: '1rem' }}>"{t.text}"</p>
              <div>
                <strong style={{ display: 'block', fontSize: '0.92rem', color: '#111827' }}>{t.name}</strong>
                <small style={{ color: '#6b7280', fontSize: '0.8rem' }}>{t.role}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="portfolio" className="portfolio-section container"><div className="section-heading"><div><span className="section-kicker">أعمالنا السابقة</span><h2>نماذج من <em>أعمالنا</em></h2></div></div><div className="portfolio-grid">{previousWorks.map((work) => <button className="portfolio-work-card" key={work.preview} onClick={() => setSelectedWork(work)}><span className="portfolio-file-icon"><FileText size={28} /><small>PDF</small></span><span className="portfolio-work-info"><strong>{work.title}</strong><small>اضغط للمعاينة</small></span><ChevronLeft size={18} /></button>)}</div></section>

      {selectedWork && <div className="pdf-modal-backdrop" role="presentation" onClick={() => setSelectedWork(null)}><section className="pdf-modal" role="dialog" aria-modal="true" aria-labelledby="pdf-title" onClick={(event) => event.stopPropagation()}><div className="pdf-modal-header"><h2 id="pdf-title">{selectedWork.title}</h2><button onClick={() => setSelectedWork(null)} aria-label="إغلاق المعاينة"><X size={20} /></button></div><div className="pdf-viewer"><iframe src={selectedWork.preview} title={`معاينة ${selectedWork.title}`} /></div></section></div>}

      <section className="student-showcase-section container"><div className="hero-art visual-hero"><div className="visual-orb" /><Image className="student-hero-image" src="/images/hadeel-student-hero.png" alt="طالبة وباحثة عربية تمثل خدمات منصة هديل" width={390} height={480} priority /><div className="floating-badge badge-research"><BookOpen size={18} /><span>إعداد البحوث<br /><small>والأوراق العلمية</small></span></div><div className="floating-badge badge-presentation"><Presentation size={18} /><span>تصميم العروض<br /><small>التقديمية PowerPoint</small></span></div><div className="floating-badge badge-assignments"><Check size={18} /><span>متابعة التكليفات<br /><small>والواجبات</small></span></div><div className="floating-badge badge-blackboard"><Headphones size={18} /><span>إدارة البلاك بورد<br /><small>متابعة مستمرة</small></span></div><div className="floating-badge badge-package"><Sparkles size={17} /><span>الباقة الأكاديمية الشاملة للطلاب</span></div></div></section>

      <section className="academic-ad-section container"><div className="academic-ad"><span className="ad-badge"><span>⚡</span> خدمات أكاديمية متكاملة</span><h2>ارفع معدلك.<br />ووفر وقتك.</h2><p>من إعداد البحوث الموثقة إلى إدارة حساب البلاك بورد، تقدم لك منصة هديل كافة الأدوات والخدمات التي توفر وقتك وتضمن لك التفوق الأكاديمي.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="ad-button">ابدأ طلبك الآن <ArrowLeft size={16} /></a></div></section>

      <section className="achievements-section container"><div className="achievements-copy"><span className="section-kicker">إنجازاتنا بالأرقام</span><h2>نتائج تُثبت<br /><em>ثقة طلابنا</em></h2><p>نفخر بكل طالب ساعدناه على تحويل التحديات الأكاديمية إلى إنجازات واضحة ونتائج ملموسة.</p><div className="achievement-stats"><div><strong>+1,200</strong><span>خدمة منجزة</span></div><div><strong>98%</strong><span>رضا العملاء</span></div><div><strong>+6</strong><span>سنوات خبرة</span></div><div><strong>24/7</strong><span>دعم ومتابعة</span></div></div></div><div className="achievements-image" onMouseEnter={() => setAchievementPaused(true)} onMouseLeave={() => setAchievementPaused(false)}><div className="achievement-slides" aria-live="polite"><Image key={achievementImages[achievementIndex]} className="achievement-slide" src={achievementImages[achievementIndex]} alt={`نموذج إنجاز أكاديمي ${achievementIndex + 1}`} fill sizes="(max-width: 800px) 100vw, 45vw" /></div><button className="achievement-arrow achievement-next" onClick={() => setAchievementIndex((achievementIndex + 1) % achievementImages.length)} aria-label="الصورة التالية"><ChevronRight size={18} /></button><button className="achievement-arrow achievement-prev" onClick={() => setAchievementIndex((achievementIndex - 1 + achievementImages.length) % achievementImages.length)} aria-label="الصورة السابقة"><ChevronLeft size={18} /></button><div className="achievement-dots">{achievementImages.map((image, index) => <button key={image} className={index === achievementIndex ? 'active' : ''} onClick={() => setAchievementIndex(index)} aria-label={`عرض الصورة ${index + 1}`} />)}</div></div></section>

      <section id="why" className="why-section"><div className="container why-inner"><div><span className="section-kicker">لماذا تختار منصة هديل؟</span><h2>معك من أول فكرة<br /><em>حتى التسليم النهائي</em></h2><p>فريق متخصص، تواصل واضح، وجودة نراجعها معك خطوة بخطوة.</p></div><div className="feature-list"><div><Check /><span><strong>سرعة فائقة في الإنجاز</strong><small>تنفيذ وتسليم في وقت قياسي.</small></span></div><div><Check /><span><strong>جودة أكاديمية عالية</strong><small>مراجعة تدقيقية متكاملة لجميع الأعمال.</small></span></div><div><Check /><span><strong>دعم ومتابعة مستمرة</strong><small>تواصل وتعديل حتى اعتماد العمل نهائيًا.</small></span></div></div></div></section>

      <section id="faq" className="section container">
        <div className="center-heading">
          <span className="section-kicker">الأسئلة الشائعة</span>
          <h2>إجابات عن <em>استفساراتك</em></h2>
          <p>إليك إجابات لأبرز الأسئلة والاستفسارات الشائعة حول خدماتنا وطريقة التعامل.</p>
        </div>

        <div style={{ maxWidth: '750px', margin: '2rem auto 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          {generalFaqs.map((faq, idx) => (
            <div key={idx} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', background: '#fff' }}>
              <button 
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.2rem', border: 'none', background: 'transparent', textAlign: 'right', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', color: '#111827' }}
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} style={{ transform: openFaqIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
              </button>
              {openFaqIndex === idx && (
                <div style={{ padding: '0 1.2rem 1rem', fontSize: '0.88rem', color: '#4b5563', lineHeight: '1.6', borderTop: '1px solid #f3f4f6', paddingTop: '0.8rem', textAlign: 'right' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="cta-section container"><div><span className="section-kicker">جاهز تبدأ؟</span><h2>خلّنا ننجزها <em>معًا</em></h2><p>تواصل معنا الآن واحصل على استشارة مجانية لخدمتك.</p></div><a className="light-button" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18} /> تواصل عبر واتساب</a></section>
      
      <footer className="footer"><div className="container footer-grid"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">هـ</span><span>منصة هديل<span className="brand-dot">.</span></span></a><p>منصة هديل للخدمات الطلابية والأكاديمية، شريكك نحو إنجاز أكاديمي أفضل.</p></div><div><h4>روابط سريعة</h4><a href="#story">قصتنا</a><a href="#services">خدماتنا</a><a href="#gpa-calculator">حاسبة المعدل</a><a href="#testimonials">آراء العملاء</a></div><div><h4>تواصل معنا</h4><a href="mailto:Hadeelmubarak387@gmail.com">Hadeelmubarak387@gmail.com</a></div><div className="footer-note"><MessageCircle size={30} /><h4>تحتاج مساعدة؟</h4><p>فريقنا جاهز للإجابة عن استفساراتك.</p><a className="footer-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">راسلنا مباشرة <ArrowLeft size={15} /></a></div></div><div className="container footer-bottom"><span>© 2026 منصة هديل للخدمات الطلابية والأكاديمية. جميع الحقوق محفوظة.</span><span>صُنع بعناية للطلاب والباحثين</span></div></footer>
      <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="تواصل معنا عبر واتساب"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/whatsapp/default.svg" alt="واتساب" /><span>تواصل معنا</span></a>
    </main>
  )
}

