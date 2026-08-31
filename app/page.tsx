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
    image: '/images/hadeel-academic-hero.png', 
    title: 'إعداد البحوث والتقارير', 
    text: 'إعداد وتنسيق الأبحاث والتقارير الجامعية وفق أحدث المعايير الأكاديمية وضوابط APA 7th. نضمن لك خلو العمل من الانتحال والأخطاء اللغوية، مع تقديم هيكل بحثي متكامل يدعم مسيرتك الدراسية.',
    link: '/services/research'
  },
  { icon: Presentation, image: '/images/hadeel-hero-family.png', title: 'العروض التقديمية', text: 'تصميم شرائح PowerPoint احترافية لمشاريع التخرج والمناقشات.' },
  { icon: GraduationCap, image: '/images/service-assignments.png', title: 'التكليفات والواجبات', text: 'حل ومتابعة وافية للأنشطة والواجبات الجامعية مع شرح وافٍ للمفاهيم.' },
  { icon: UserRound, image: '/images/hadeel-student-hero.png', title: 'السيرة الذاتية CV', text: 'سير ذاتية عربية وإنجليزية متوافقة مع أنظمة ATS.' },
  { icon: Sparkles, image: '/images/hadeel-academic-hero.png', title: 'الدعوات الإلكترونية', text: 'بطاقات تخرج ومناسبات بتصاميم حديثة تناسب ذوقك.' },
  { icon: Headphones, image: '/images/hadeel-achievements.png', title: 'متابعة مواد البلاك بورد', text: 'إدارة ومتابعة المقررات والمحاضرات والاختبارات طوال الفصل الدراسي.' },
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
  },
  'العروض التقديمية': {
    intro: 'تصميم عروض تقديمية احترافية تجمع بين الجودة البصرية ووضوح المحتوى لتترك انطباعًا قويًا أمام لجنة العرض.',
    sections: [
      {
        title: 'تصميم الشرائح والهوية البصرية',
        items: [
          'تصميم شرائح PowerPoint بأسلوب احترافي متناسق مع هوية المشروع.',
          'اختيار أنظمة ألوان وخطوط مناسبة تضمن وضوح القراءة وجاذبية العرض.',
          'إضافة رسوم بيانية وإنفوجرافيك يبسّط البيانات المعقدة.'
        ]
      },
      {
        title: 'تنظيم المحتوى وسرد القصة',
        items: [
          'هيكلة الشرائح بترتيب منطقي يخدم هدف العرض ويوصل الفكرة بوضوح.',
          'صياغة نصوص مختصرة وقوية تناسب طبيعة العروض التقديمية.',
          'إعداد ملاحظات المتحدث (Speaker Notes) لدعم الأداء ��مام اللجنة.'
        ]
      },
      {
        title: 'الرسوم المتحركة والانتقالات',
        items: [
          'إضافة انتقالات سلسة بين الشرائح دون إثقال العرض.',
          'تحريك العناصر لتسليط الضوء على النقاط الرئيسية في الوقت المناسب.'
        ]
      },
      {
        title: 'المراجعة والتسليم',
        items: [
          'مراجعة شاملة لضمان خلو الشرائح من الأخطاء اللغوية والتنسيقية.',
          'تسليم الملف بصيغتين قابلتين للتعديل (PPTX) وللعرض (PDF).'
        ]
      }
    ],
    steps: [
      { step: '01', title: 'إرسال الطلب والمرفقات', desc: 'تحديد موضوع العرض، عدد الشرائح، وأي محتوى أو بيانات جاهزة.' },
      { step: '02', title: 'المراجعة والتسعير', desc: 'تقييم المتطلبات وتحديد التكلفة والمدة الزمنية للتسليم.' },
      { step: '03', title: 'المعاينة والمسودة', desc: 'تسليم نسخة أولية من الشرائح لإبداء ملاحظاتك وتعديلها.' },
      { step: '04', title: 'التسل��م النهائي', desc: 'استلام العرض جاهزًا للتقديم بصيغتين قابلتين للتعديل والعرض.' }
    ],
    faq: [
      { question: 'هل يمكنني تعديل الشرائح بعد الاستلام؟', answer: 'نعم، نسلمك الملف بصيغة PPTX قابلة للتعديل بالكامل، مع إمكانية إجراء تعديلات إضافية وفق الاتفاق.' },
      { question: 'هل تدعمون برامج غير PowerPoint؟', answer: 'نعم، يمكننا تصميم العروض على PowerPoint و Google Slides و Canva حسب رغبتك.' }
    ],
    formFields: { academicLevels: ['دبلوم', 'بكالوريوس', 'ماجستير'], defaultDuration: 'حسب الموعد المحدد' },
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
      { step: '01', title: 'إرسال الطلب والمرفقات', desc: 'تحديد موضوع البحث، عدد الصفحات، والدليل الإرشادي المطلوب من الجامعة.' },
      { step: '02', title: 'المراجعة والتسعير', desc: 'تقييم الطلب أكاديميًا وتحديد التكلفة الإجمالية والمدة الزمنية للتنفيذ.' },
      { step: '03', title: 'المعاينة والمسودة', desc: 'تسليم نسخة أولية لإبداء ملاحظاتك وإجراء التعديلات الأكاديمية المطلوبة.' },
      { step: '04', title: 'التسليم النهائي', desc: 'استلام البحث منسقًا بالكامل وجاهزًا للطباعة والتقديم المباشر.' }
    ],
    faq: [
      { 
        question: 'هل تشمل الخدمة تعديل الملاحظات بعد الاستلام؟', 
        answer: 'نعم، نقدم تعديلات مجانية متوافقة مع الملاحظات الأكاديمية المطلوبة طوال فترة المراجعة.' 
      },
      { 
        question: 'كيف أضمن عدم وجود انتحال أو سرقة علمية (Plagiarism) في البحث؟', 
        answer: 'نفحص العمل عبر برامج كشف الانتحال المعتمدة ونوفر لك تقريرًا رسميًا يثبت نسبة الأمانة العلمية.' 
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
        { question: 'كيف ��تابع طلبي؟', answer: 'يمكنك التواصل معنا مباشرة عبر واتساب لمتابعة حالة الطلب.' },
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
  const [presentationDetailsOpen, setPresentationDetailsOpen] = useState(false)
  const [assignmentsDetailsOpen, setAssignmentsDetailsOpen] = useState(false)
  const [cvDetailsOpen, setCvDetailsOpen] = useState(false)
  const [invitationsDetailsOpen, setInvitationsDetailsOpen] = useState(false)
  const [graduationDetailsOpen, setGraduationDetailsOpen] = useState(false)
  const [blackboardFollowDetailsOpen, setBlackboardFollowDetailsOpen] = useState(false)
  const [blackboardSolveDetailsOpen, setBlackboardSolveDetailsOpen] = useState(false)
  const previousWorks = [{ title: 'تأثير التكنولوجيا على الخدمات التعليمية', preview: 'https://drive.google.com/file/d/1eFtsqZqRJsWDCcTYcZQXSmIeU0w02NLI/preview' }, { title: 'حماية البيئة في ظل رؤية المملكة 2030', preview: 'https://drive.google.com/file/d/1KriLId4ui_lb8UusGwanwVUHQ4dk3oLC/preview' }, { title: 'تطوير الصناعات المحلية والخدمات اللوجستية', preview: 'https://drive.google.com/file/d/1nDeMLBHtyiyNn_N6EZ0mAsmdOQ_qTiyG/preview' }, { title: 'المبتدأ في اللغة العربية', preview: 'https://drive.google.com/file/d/1Example/preview' }]
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
            <a href="#top" onClick={() => setMenuOpen(false)}>الرئيسية</a><a href="#story" onClick={() => setMenuOpen(false)}>قصتنا</a><a href="#values" onClick={() => setMenuOpen(false)}>ق[...]
          </nav>
          <div className="nav-actions"><a className="primary-button header-order" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={17} /> اطلب خدمتك الآن</a><button className="menu-toggle" onClick={() => setMenuOpen((s) => !s)} aria-label="قائمة"><Menu size={20} /></button></div>
        </div>
      </header>

      <section id="top" className="hero container">
        <div className="hero-copy"><span className="eyebrow"><span className="eyebrow-dot" /> شريكك الأكاديمي الموثوق</span><h1>نرتب لك طريقك<br /><strong>نحو التفوق</strong></h1><p>منصة هديل تقدم خدمات أكاديمية متكاملة تساعد الطلبة والباحثين على التسليم بجودة وموثوقية.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="primary-button">اطلب خدمتك الآن <ArrowLeft size={14} /></a></div>
        <div className="hero-art hero-photo"><Image src="/images/hadeel-hero-family.png" alt="معلمة عربية تساعد طالبًا على التعلم" fill priority sizes="(max-width: 800px) 100vw, 48vw" /></div>
      </section>

      <section className="stats-strip"><div className="container stats"><div><strong>+10K</strong><span>طالب مستفيد</span></div><div><strong>+15</strong><span>خدمة أكاديمية</span></div><div><strong>+8</strong><span>سنوات خبرة</span></div><div><strong>98%</strong><span>نسبة رضا العملاء</span></div></div></section>

      <section id="story" className="section story-section container"><div className="story-visual"><div className="story-card"><BookOpen size={42} /><span>معرفة<br />تُنجز</span></div></section>

      <section id="values" data-reveal className="section soft-section reveal-section"><div className="container"><div className="center-heading"><span className="section-kicker">قيمنا التي تميزنا</span><h2>نقدم خدمات بمقاييس <em>مهنية</em></h2></div></div></section>



      <section id="services" className="services-section container"><div className="services-heading"><span className="section-kicker">خدماتنا</span><h2>خدماتنا <em>الأكاديمية</em></h2><p>حلول أكاديمية متكاملة تساعدك على تقديم عمل منظم، موثق، وجاهز للتقديم بثقة في كل تخصص ومرحلة.</p></div>

        <div className="services-grid">
          {services.map((s) => (
            <button key={s.title} className="service-card" onClick={() => {
              if (s.title === 'إعداد البحوث والتقارير') setResearchDetailsOpen(true)
              if (s.title === 'العروض التقديمية') setPresentationDetailsOpen(true)
              if (s.title === 'التكليفات والواجبات') setAssignmentsDetailsOpen(true)
              if (s.title === 'السيرة الذاتية CV') setCvDetailsOpen(true)
              if (s.title === 'الدعوات الإلكترونية') setInvitationsDetailsOpen(true)
              if (s.title === 'متابعة مواد البلاك بورد') setBlackboardFollowDetailsOpen(true)
            }}>
              <div className="service-media"><img src={s.image} alt={s.title} /></div>
              <div className="service-body"><h3>{s.title}</h3><p>{s.text}</p><div className="service-actions"><a className="secondary-button" href={s.link ?? '#'}>اعرف أكثر</a><ChevronLeft size={18} /></div></div>
            </button>
          ))}
        </div>

      </section>

      {researchDetailsOpen && <div className="research-details-backdrop" role="presentation" onClick={() => setResearchDetailsOpen(false)}><section className="research-details-panel" role="dialog" aria-modal="true" aria-labelledby="research-details-title" onClick={(event) => event.stopPropagation()}><div className="research-details-header"><div><span className="section-kicker">تفاصيل الخدمة</span><h2 id="research-details-title">خدمات البحوث العلمية</h2></div><button type="button" onClick={() => setResearchDetailsOpen(false)} aria-label="إغلاق التفاصيل"><X size={20} /></button></div><div className="research-details-body"><div className="details-block details-overview"><h3>وصف الخدمة</h3><p>نساعدك على تحويل فكرتك إلى بحث علمي متكامل، من التخطيط إلى المراجعة النهائية والتنسيق.</p></div></div></section></div>

      {presentationDetailsOpen && <div className="research-details-backdrop" role="presentation" onClick={() => setPresentationDetailsOpen(false)}><section className="research-details-panel" role="dialog" aria-modal="true" aria-labelledby="presentation-details-title" onClick={(event) => event.stopPropagation()}><div className="research-details-header"><div><span className="section-kicker">تفاصيل الخدمة</span><h2 id="presentation-details-title">خدمات العروض التقديمية</h2></div><button type="button" onClick={() => setPresentationDetailsOpen(false)} aria-label="إغلاق التفاصيل"><X size={20} /></button></div><div className="research-details-body"><div className="details-block details-overview"><h3>وصف الخدمة</h3><p>نحوّل محتوى مشروعك إلى عرض تقديمي مؤثر يجمع بين التصميم الجذاب والوضوح الأكاديمي.</p></div></div></section></div>

      {assignmentsDetailsOpen && <div className="research-details-backdrop" role="presentation" onClick={() => setAssignmentsDetailsOpen(false)}><section className="research-details-panel" role="dialog" aria-modal="true" aria-labelledby="assignments-details-title" onClick={(event) => event.stopPropagation()}><div className="research-details-header"><div><span className="section-kicker">تفاصيل الخدمة</span><h2 id="assignments-details-title">خدمات التكليفات والواجبات</h2></div><button type="button" onClick={() => setAssignmentsDetailsOpen(false)} aria-label="إغلاق التفاصيل"><X size={20} /></button></div><div className="research-details-body"><div className="details-block details-overview"><h3>وصف الخدمة</h3><p>نقدم حلًا ومتابعة وافية للأنشطة والواجبات الأكاديمية مع توضيح للمفاهيم.</p></div></div></section></div>

      {cvDetailsOpen && <div className="research-details-backdrop" role="presentation" onClick={() => setCvDetailsOpen(false)}><section className="research-details-panel" role="dialog" aria-modal="true" aria-labelledby="cv-details-title" onClick={(event) => event.stopPropagation()}><div className="research-details-header"><div><span className="section-kicker">تفاصيل الخدمة</span><h2 id="cv-details-title">خدمات السيرة الذاتية CV</h2></div><button type="button" onClick={() => setCvDetailsOpen(false)} aria-label="إغلاق التفاصيل"><X size={20} /></button></div><div className="research-details-body"><div className="details-block details-overview"><h3>وصف الخدمة</h3><p>نعد لك سيرة ذاتية احترافية باللغتين العربية والإنجليزية ومتوافقة مع متطلبات سوق العمل.</p></div></div></section></div>

      {invitationsDetailsOpen && <div className="research-details-backdrop" role="presentation" onClick={() => setInvitationsDetailsOpen(false)}><section className="research-details-panel" role="dialog" aria-modal="true" aria-labelledby="invitations-details-title" onClick={(event) => event.stopPropagation()}><div className="research-details-header"><div><span className="section-kicker">تفاصيل الخدمة</span><h2 id="invitations-details-title">خدمات الدعوات الإلكترونية</h2></div><button type="button" onClick={() => setInvitationsDetailsOpen(false)} aria-label="إغلاق التفاصيل"><X size={20} /></button></div><div className="research-details-body"><div className="details-block details-overview"><h3>وصف الخدمة</h3><p>نصمم لك بطاقات تخرج ومناسبات بتصاميم حديثة وقابلة للطباعة أو المشاركة إلكترونيًا.</p></div></div></section></div>

      {graduationDetailsOpen && <div className="research-details-backdrop" role="presentation" onClick={() => setGraduationDetailsOpen(false)}><section className="research-details-panel" role="dialog" aria-modal="true" aria-labelledby="graduation-details-title" onClick={(event) => event.stopPropagation()}><div className="research-details-header"><div><span className="section-kicker">تفاصيل الخدمة</span><h2 id="graduation-details-title">خدمات مشاريع التخرج</h2></div><button type="button" onClick={() => setGraduationDetailsOpen(false)} aria-label="إغلاق التفاصيل"><X size={20} /></button></div><div className="research-details-body"><div className="details-block details-overview"><h3>وصف الخدمة</h3><p>نقدم دعمًا متكامل لمشاريع التخرج من اختيار الموضوع إلى التحضير للمناقشة.</p></div></div></section></div>

      {blackboardFollowDetailsOpen && <div className="research-details-backdrop" role="presentation" onClick={() => setBlackboardFollowDetailsOpen(false)}><section className="research-details-panel" role="dialog" aria-modal="true" aria-labelledby="bb-follow-details-title" onClick={(event) => event.stopPropagation()}><div className="research-details-header"><div><span className="section-kicker">تفاصيل الخدمة</span><h2 id="bb-follow-details-title">متابعة البلاك بورد</h2></div><button type="button" onClick={() => setBlackboardFollowDetailsOpen(false)} aria-label="إغلاق التفاصيل"><X size={20} /></button></div><div className="research-details-body"><div className="details-block details-overview"><h3>وصف الخدمة</h3><p>نساعد في إدارة الدخول، متابعة تسليم المهام، والتواصل مع المدرسين حسب الطلب.</p></div></div></section></div>

      {blackboardSolveDetailsOpen && <div className="research-details-backdrop" role="presentation" onClick={() => setBlackboardSolveDetailsOpen(false)}><section className="research-details-panel" role="dialog" aria-modal="true" aria-labelledby="bb-solve-details-title" onClick={(event) => event.stopPropagation()}><div className="research-details-header"><div><span className="section-kicker">تفاصيل الخدمة</span><h2 id="bb-solve-details-title">حل جميع الأعمال على البلاك بورد</h2></div><button type="button" onClick={() => setBlackboardSolveDetailsOpen(false)} aria-label="إغلاق التفاصيل"><X size={20} /></button></div><div className="research-details-body"><div className="details-block details-overview"><h3>وصف الخدمة</h3><p>نقوم بحل جميع الواجبات والاختبارات داخل نظام البلاك بورد حسب متطلبات المقرر.</p></div></div></section></div>

      <section id="portfolio" className="portfolio-section container"><div className="section-heading"><div><span className="section-kicker">أعمالنا السابقة</span><h2>نماذج من <em>أعمالنا</em></h2></div></div><div className="portfolio-grid">{previousWorks.map((work) => <button className="portfolio-work-card" key={work.preview} onClick={() => setSelectedWork(work)}><span className="portfolio-file-icon"><FileText size={28} /><small>PDF</small></span><span className="portfolio-work-info"><strong>{work.title}</strong><small>اضغط للمعاينة</small></span><ChevronLeft size={18} /></button>)}</div></section>

      {selectedWork && <div className="pdf-modal-backdrop" role="presentation" onClick={() => setSelectedWork(null)}><section className="pdf-modal" role="dialog" aria-modal="true" aria-labelledby="pdf-modal-title" onClick={(event) => event.stopPropagation()}><div className="pdf-header"><div><h2 id="pdf-modal-title">معاينة العمل</h2></div><button type="button" onClick={() => setSelectedWork(null)} aria-label="إغلاق المعاينة"><X size={20} /></button></div><div className="pdf-body"><iframe src={selectedWork.preview} title={selectedWork.title} /></div></section></div>

      <section className="student-showcase-section container"><div className="hero-art visual-hero"><div className="visual-orb" /><Image className="student-hero-image" src="/images/hadeel-student-hero.png" alt="طالب يستعرض عمله" fill /></div></section>

      <section className="academic-ad-section container"><div className="academic-ad"><span className="ad-badge"><span>⚡</span> خدمات أكاديمية متكاملة</span><h2>ارفع معدلك.<br />ووفر وقتك.</h2><p>من إعداد البحوث الموثقة إلى إدارة حساب البلاك بورد، تقدم لك منصة هديل كافة الأدوات والخدمات التي توفر وقتك وتضمن لك التفوق الأكاديمي.</p><a href={whatsapp} target="_blank" rel="noreferrer" className="ad-button">ابدأ طلبك الآن <ArrowLeft size={16} /></a></div></section>

      <section className="achievements-section container"><div className="achievements-copy"><span className="section-kicker">إنجازاتنا بالأرقام</span><h2>نتائج تُثبت<br /><em>ثقة طلابنا</em></h2><p>نفخر بكل طالب ساعدناه على تحويل التحديات الأكاديمية إلى إنجازات واضحة ونتائج ملموسة.</p><div className="achievement-stats"><div><strong>+1,200</strong><span>خدمة منجزة</span></div><div><strong>98%</strong><span>رضا العملاء</span></div><div><strong>+6</strong><span>سنوات خبرة</span></div><div><strong>24/7</strong><span>دعم فني</span></div></div></div><div className="achievements-visual"><img src={achievementImages[achievementIndex]} alt="إنجازات منصة هديل" onMouseEnter={() => setAchievementPaused(true)} onMouseLeave={() => setAchievementPaused(false)} /></div></section>

      <section id="why" className="why-section"><div className="container why-inner"><div><span className="section-kicker">لماذا تختار منصة هديل؟</span><h2>معك من أول خطوة حتى <em>النتيجة</em></h2><ul>{values.map((v) => <li key={v[0]}><strong>{v[0]}</strong><span>{v[1]}</span></li>)}</ul></div></div></section>

      <section id="contact" className="cta-section container"><div><span className="section-kicker">جاهز تبدأ؟</span><h2>خلّنا ننجزها <em>معًا</em></h2><p>تواصل معنا عبر واتساب لإرسال متطلباتك وملفاتك، وسنبدأ العمل فورًا.</p><a className="primary-button" href={whatsapp} target="_blank" rel="noreferrer">اطلب الآن <ArrowLeft size={14} /></a></div></section>
      <footer className="footer"><div className="container footer-grid"><div><a className="brand footer-brand" href="#top"><span className="brand-mark">هـ</span><span>منصة هديل<span className="sr-only">للخدمات الطلابية</span></span></a><p>حلول أكاديمية وخدمات احترافية للطلاب والباحثين.</p></div></div><a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="تواصل معنا عبر واتساب"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@master/whatsapp.svg" alt="واتساب" /></a></footer>

    </main>
  )
}
