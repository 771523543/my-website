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
          'إعداد ملاحظات المتحدث (Speaker Notes) لدعم الأداء أمام الل��نة.'
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
          'تسليم الملف بصيغتين قابلة للتعديل (PPTX) وللعرض (PDF).'
        ]
      }
    ],
    steps: [
      { step: '01', title: 'إرسال الطلب والمرفقات', desc: 'تحديد موضوع العرض، عدد الشرائح، وأي محتوى أو بيانات جاهزة.' },
      { step: '02', title: 'المراجعة والتسعير', desc: 'تقييم المتطلبات وتحديد التكلفة والمدة الزمنية للتسليم.' },
      { step: '03', title: 'المعاينة والمسودة', desc: 'تسليم نسخة أولية من الشرائح لإبداء ملاحظاتك وتعديلها.' },
      { step: '04', title: 'التسليم النهائي', desc: 'استلام العرض جاهزًا للتقديم بصيغتين قابلتين للتعديل والعرض.' }
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
  const [presentationDetailsOpen, setPresentationDetailsOpen] = useState(false)
  const [assignmentsDetailsOpen, setAssignmentsDetailsOpen] = useState(false)
  const [cvDetailsOpen, setCvDetailsOpen] = useState(false)
  const [invitationsDetailsOpen, setInvitationsDetailsOpen] = useState(false)
  const [graduationDetailsOpen, setGraduationDetailsOpen] = useState(false)
  const [blackboardFollowDetailsOpen, setBlackboardFollowDetailsOpen] = useState(false)
  const [blackboardSolveDetailsOpen, setBlackboardSolveDetailsOpen] = useState(false)
  const previousWorks = [{ title: 'تأثير التكنولوجيا على الخدمات التعليمية', preview: 'https://drive.google.com/file/d/1eFtsqZqRJsWDCcTYcZQXSmIeU0w02NLI/preview' }, { title: 'حماية البيئة في ظل رؤية المملكة 2030', preview: 'https://drive.google.com/file/d/1KriLId4ui_lb8UusGwanwVUHQ4dk3oLC/preview' }, { title: 'تطوير الصناعات المحلية والخدمات اللوجستية', preview: 'https://drive.google.com/file/d/1nDeMLBHtyiyNn_N6EZ0mAsmdOQ_qTiyG/preview' }, { title: 'المبتدأ والخبر في القرآن الكريم', preview: 'https://drive.google.com/file/d/15tZAI1j_ppP-YiKWwJQtMlStvqnRebMJ/preview' }]
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
          <a className="brand" href="#top"><Image className="brand-logo" src="/hadeel-platform-logo.png" alt="شعار منصة هديل للخدمات الطلابية" width={54} height={54} pr[...]
