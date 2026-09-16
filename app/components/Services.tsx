'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  FileText,
  ClipboardList,
  PencilLine,
  Laptop,
  Presentation,
  UserRound,
  Search,
  BarChart3,
  GraduationCap,
  ArrowLeft,
} from 'lucide-react'

type Category = 'all' | 'research' | 'design' | 'academic'

export const services = [
  {
    id: 'research',
    category: 'research' as Category,
    icon: BookOpen,
    title: 'الخدمات البحثية والأكاديمية',
    subtitle: 'بحوث، أوراق عمل، خطط بحوث',
    shortText:
      'خدمة متكاملة لمساعدة الطلاب والباحثين في إعداد البحوث العلمية وأوراق العمل وخطط البحوث بأعلى المعايير الأكاديمية.',
    about:
      'خدمة متكاملة مخصصة لمساعدة الطلاب والباحثين في إعداد البحوث العلمية، أوراق العمل، وخطط البحوث (Proposals) بأعلى معايير الجودة والأصول المنهجية الأكاديمية.',
    whatWeOffer: [
      'كتابة وتنسيق البحوث العلمية والتقارير الأكاديمية ومشاريع التخرج.',
      'صياغة مقترحات البحوث (Proposals) وتحديد الإشكالية والأسئلة والأهداف.',
      'إعداد المراجعات المرجعية (Literature Reviews) وتلخيص الدراسات السابقة.',
      'التوثيق العلمي الدقيق للمراجع والمصادر وفق نظام (APA، Harvard، وغيرها).',
    ],
    requirements: [
      'عنوان البحث أو موضوعه بدقة.',
      'عدد الكلمات أو الصفحات المطلوب.',
      'نظام التوثيق المعتمد (APA، إلخ).',
      'الموعد النهائي للتسليم وأي شروط خاصة من أستاذ المادة.',
    ],
    faqs: [
      {
        q: 'هل البحوث خالية من الاقتباس والانتحال؟',
        a: 'نعم، جميع الأعمال تُكتب حصرياً وتُفحص ببرامج كشف السرقة الأدبية لضمان الأصالة.',
      },
    ],
    orderText:
      'لطلب الخدمة، يرجى تزويدنا بتفاصيل موضوع البحث والموعد النهائي.',
  },

  {
    id: 'reports',
    category: 'research' as Category,
    icon: FileText,
    title: 'التقارير الجامعية',
    subtitle: 'تقارير علمية وعملية وميدانية',
    shortText:
      'إعداد وصياغة التقارير العلمية والعملية للمقررات الجامعية المختلفة باحترافية.',
    about:
      'خدمة متخصصة لإعداد وصياغة التقارير العلمية والعملية للمقررات الجامعية المختلفة، بما يشمل التقارير المخبرية، الميدانية، والتقييمية.',
    whatWeOffer: [
      'بناء هيكل تقرير متكامل (مقدمة، عرض، تحليل، نتائج، وتوصيات).',
      'تنظيم وتحليل البيانات الخاصة بالتقارير العملية والمخبرية أو الزيارات الميدانية.',
      'التدقيق اللغوي والإملائي والتنسيق الاحترافي للشرائح والجداول داخل التقرير.',
    ],
    requirements: [
      'نموذج التقرير أو التعليمات الخاصة به (Guidelines).',
      'البيانات أو النتائج الأولية (إن وجدت) المراد تحليلها وكتابتها.',
      'عدد الصفحات والموعد النهائي للتسليم.',
    ],
    faqs: [
      {
        q: 'هل تخدمون التقارير الطبية والتمريضية؟',
        a: 'نعم، نوفر تغطية شاملة للتقارير والمهام الخاصة بالتخصصات الصحية والتمريضية.',
      },
    ],
    orderText:
      'لطلب الخدمة، شاركنا تفاصيل التقرير وشروطه لنبدأ العمل فوراً.',
  },

  {
    id: 'assignments',
    category: 'academic' as Category,
    icon: ClipboardList,
    title: 'التكاليف الجامعية',
    subtitle: 'التكاليف الفصلية والكبرى',
    shortText:
      'حل وإنجاز التكاليف الفصلية الكبرى والمشاريع الدراسية وفق متطلبات المقرر.',
    about:
      'خدمة مخصصة لحل وإنجاز التكاليف الفصلية الكبرى والمشاريع الدراسية التي تشكل وزناً نسبياً عالياً في درجات المقررات.',
    whatWeOffer: [
      'دراسة وتحليل متطلبات التكليف بعناية فائقة لضمان مطابقة معايير التقييم.',
      'إعداد الحلول والإجابات النموذجية للمشاريع الفصلية والمهام الكبرى.',
      'مراجعة العمل وتدقيقه للتأكد من خلوه من أي أخطاء حسابية أو منهجية.',
    ],
    requirements: [
      'ملف التكليف أو الأسئلة بصيغة (PDF أو Word).',
      'المراجع أو المحاضرات المرتبطة بالتكليف (إن توفرت).',
      'موعد التسليم النهائي.',
    ],
    faqs: [
      {
        q: 'هل تضمنون الدرجات العالية في التكاليف؟',
        a: 'نعمل بأعلى معايير الدقة والاحترافية لمساعدتك في تحقيق أفضل الدرجات الممكنة.',
      },
    ],
    orderText:
      'أرسل ملف التكليف الآن لتحديد الوقت والتكلفة المناسبة.',
  },

  {
    id: 'homework',
    category: 'academic' as Category,
    icon: PencilLine,
    title: 'الواجبات الدراسية',
    subtitle: 'اليومية والأسبوعية',
    shortText:
      'متابعة وحل الواجبات والمهام القصيرة الدورية للمقررات الدراسية المختلفة.',
    about:
      'متابعة وحل الواجبات والمهام القصيرة الدورية للمقررات الدراسية المختلفة لضمان جمع الدرجات باستمرار دون تأخير.',
    whatWeOffer: [
      'حل الواجبات الأسبوعية واليومية لمختلف التخصصات (العلمية، النظرية، والإدارية).',
      'الالتزام التام بتسليم الواجب في وقته المحدد وقبل الموعد النهائي.',
      'تقديم الإجابات بطريقة واضحة ومبسطة تدعم فهم الطالب.',
    ],
    requirements: [
      'تفاصيل السؤال أو الواجب المطلوب.',
      'موعد التسليم باليوم والساعة.',
    ],
    faqs: [
      {
        q: 'هل يمكن تسليم الواجب في نفس يوم الطلب؟',
        a: 'نعم، حسب طبيعة وحجم الواجب وقابليته للإنجاز السريع.',
      },
    ],
    orderText:
      'ارسل واجبك الآن لنقوم بإنجازه في أسرع وقت.',
  },

  {
    id: 'lms',
    category: 'academic' as Category,
    icon: Laptop,
    title: 'إدارة المنصات والمهام الدراسية',
    subtitle: 'LMS & Quizzes',
    shortText:
      'إدارة ومتابعة منصات التعلم عن بعد مثل Blackboard وCanvas وMoodle.',
    about:
      'خدمة احترافية لإدارة ومتابعة منصات التعلم عن بعد (Blackboard، Canvas، Moodle وغيرها) لضمان عدم تفويت أي مهمة أو اختبار قصير.',
    whatWeOffer: [
      'المتابعة الدورية والدخول المنتظم للمنصات التعليمية.',
      'تسليم المهام والواجبات في مواعيدها بدقة.',
      'المشاركة الفعالة في المنتديات النقاشية الخاصة بالمقررات.',
      'المساعدة في حل الاختبارات القصيرة (Quizzes) ضمن وقتها المحدد.',
    ],
    requirements: [
      'بيانات الدخول الخاصة بالمنصة التعليمية (بسرية وخصوصية تامة).',
      'جدول المقررات والمواعيد الهامة للاختبارات والمهام.',
    ],
    faqs: [
      {
        q: 'هل بيانات حسابي آمنة؟',
        a: 'نعم، نضمن لك سرية تامة وأمان كامل لبيانات الدخول الخاصة بك.',
      },
    ],
    orderText:
      'تواصل معنا لتنظيم متابعة منصتك التعليمية بشكل دوري.',
  },

  {
    id: 'presentation',
    category: 'design' as Category,
    icon: Presentation,
    title: 'العروض التقديمية والتصميم',
    subtitle: 'PowerPoint & Infographics',
    shortText:
      'تحويل البحوث والتقارير إلى عروض تقديمية جذابة وتصاميم وإنفوجرافيك احترافية.',
    about:
      'خدمة تحويل النصوص والبحوث والتقارير إلى عروض تقديمية (PowerPoint) جذابة وتصاميم بصرية وإنفوجرافيك تسهل الشرح والعرض أمام الأساتذة والزملاء.',
    whatWeOffer: [
      'تصميم عروض PowerPoint احترافية ومتناسقة بصرياً.',
      'تحويل الأبحاث المعقدة إلى شرائح عرض ملخصة ومباشرة.',
      'إعداد خرائط ذهنية وإنفوجرافيك توضيحي للمشاريع.',
    ],
    requirements: [
      'المحتوى أو الملف المراد تحويله إلى عرض تقديمي.',
      'عدد الشرائح المطلوبة أو الوقت المخصص للعرض.',
      'النمط المفضل (رسمي، أكاديمي، إبداعي، إلخ).',
    ],
    faqs: [
      {
        q: 'هل تتضمن الشرائح تأثيرات حركية ورسوم؟',
        a: 'نعم، نصممها بصور وتنسيقات عصرية تدعم جمالية العرض وتجتذب الانتباه.',
      },
    ],
    orderText:
      'أرسل محتواك وحدد موعد العرض لنبدأ بتصميم شرائحك الاحترافية.',
  },

  {
    id: 'cv',
    category: 'design' as Category,
    icon: UserRound,
    title: 'السيرة الذاتية والخدمات المهنية',
    subtitle: 'CV',
    shortText:
      'تصميم وتطوير السيرة الذاتية بالعربية أو الإنجليزية بما يتوافق مع ATS.',
    about:
      'خدمة تصميم وتطوير السيرة الذاتية (CV) احترافياً لتبرز مؤهلاتك وخبراتك التعليمية والتدريبية بالشكل الأمثل أمام جهات العمل وأنظمة الفرز الآلي (ATS).',
    whatWeOffer: [
      'بناء وصياغة السيرة الذاتية باللغتين العربية أو الإنجليزية.',
      'تنسيق القوالب الحديثة المتوافقة مع أنظمة الفرز الإلكتروني (ATS).',
      'إبراز المؤهلات الأكاديمية والمهارات والتدريب العملي بأسلوب تسويقي مهني.',
    ],
    requirements: [
      'المؤهل العلمي والتخصص.',
      'الخبرات، التدريب، أو الدورات الحاصل عليها.',
      'معلومات الاتصال واللغة المطلوبة (عربي / إنجليزي).',
    ],
    faqs: [
      {
        q: 'هل السيرة الذاتية متوافقة مع أنظمة الـ ATS؟',
        a: 'نعم، نصممها بعناية لتعبر الفلاتر الإلكترونية لجهات التوظيف بنجاح.',
      },
    ],
    orderText:
      'أرسل بياناتك الحالية أو تواصل معنا لبناء سيرة ذاتية جديدة كلياً.',
  },

  {
    id: 'case-study',
    category: 'research' as Category,
    icon: Search,
    title: 'دراسة الحالة',
    subtitle: 'Case Studies',
    shortText:
      'تحليل وحل دراسات الحالة الواقعية والأكاديمية بأسلوب منهجي وعلمي دقيق.',
    about:
      'خدمة متخصصة لتحليل وحل دراسات الحالة الواقعية والأكاديمية لمختلف المقررات (مثل إدارة الأعمال، الموارد البشرية، الرعاية الصحية، والاقتصاد) بأسلوب منهجي وعلمي دقيق.',
    whatWeOffer: [
      'تحليل تفصيلي لمعطيات المشكلة أو الحالة المطروحة.',
      'ربط المشكلة والنظريات العلمية المقررة بالمنهج الدراسي.',
      'صياغة التوصيات، الحلول الاستراتيجية، واتخاذ القرارات بدقة.',
      'كتابة التقرير النهائي بالهيكل الأكاديمي المطلوب (المشكلة، التحليل، الحلول).',
    ],
    requirements: [
      'نص دراسة الحالة أو الملف المرفق.',
      'الأسئلة المطلوبة الإجابة عنها بشأن الحالة (إن وجدت).',
      'نظام التوثيق والموعد النهائي للتسليم.',
    ],
    faqs: [
      {
        q: 'هل الحلول مبنية على أسس أكاديمية؟',
        a: 'نعم، نعتمد على النظريات والنماذج العلمية المرتبطة بمقرر دراسة الحالة لضمان أعلى الدرجات.',
      },
    ],
    orderText:
      'أرسل نص دراسة الحالة والأسئلة لنبدأ التحليل فوراً.',
  },

  {
    id: 'feasibility',
    category: 'research' as Category,
    icon: BarChart3,
    title: 'دراسات الجدوى',
    subtitle: 'Feasibility Studies',
    shortText:
      'إعداد دراسات الجدوى الاقتصادية والتشغيلية للمشاريع التجارية والريادية.',
    about:
      'خدمة متكاملة لإعداد دراسات الجدوى الاقتصادية والتشغيلية للمشاريع التجارية والريادية، بما يشمل الجوانب التسويقية، المالية، والفنية بدقة عالية.',
    whatWeOffer: [
      'الدراسة التسويقية: تحليل السوق، المستهدفين، والمنافسين.',
      'الدراسة الفنية والتشغيلية: تحديد المتطلبات، الموارد، وخطوات سير العمل.',
      'الدراسة المالية: تقدير التكاليف، الأرباح المتوقعة، والجدوى الاستثمارية.',
      'إخراج التقرير النهائي بتنسيق احترافي جاهز للعرض أو التسليم الأكاديمي.',
    ],
    requirements: [
      'فكرة المشروع أو نوع النشاط المقترح.',
      'النطاق الجغرافي أو حجم المشروع المطلوب.',
      'المتطلبات الخاصة بالدراسة (أكاديمية أم تطبيقية لعمل مشروع حقيقي).',
    ],
    faqs: [
      {
        q: 'هل تشمل الدراسة جداول وحسابات مالية واضحة؟',
        a: 'نعم، نتكفل بتقدير التكاليف والجداول المالية بدقة متناهية.',
      },
    ],
    orderText:
      'شاركنا فكرة مشروعك لنبدأ في صياغة دراسة الجدوى المتكاملة.',
  },

  {
    id: 'graduation',
    category: 'research' as Category,
    icon: GraduationCap,
    title: 'مشاريع التخرج',
    subtitle: 'Graduation Projects',
    shortText:
      'دعم شامل لمشروع التخرج من الفكرة حتى التسليم النهائي لمختلف التخصصات.',
    about:
      'دعم شامل ومواكب لخطوات مشروع التخرج من الفكرة حتى التسليم النهائي، لمختلف التخصصات العلمية، الإدارية، الصحية، والتقنية.',
    whatWeOffer: [
      'المساعدة في اختيار واقتراح عناوين مبتكرة لمشاريع التخرج.',
      'إعداد خطة المشروع (Project Proposal) وهيكل البحث أو النظام.',
      'كتابة فصول المشروع كاملة (المقدمة، الأدبيات، المنهجية، التحليل، والنتائج).',
      'توفير الجانب التطبيقي أو البرمجي أو الميداني (حسب تخصص المشروع).',
      'التنسيق والتوثيق العلمي الكامل وفقاً لدليل الجامعة المعتمد.',
    ],
    requirements: [
      'دليل مشروع التخرج أو الشروط الخاصة بالجامعة.',
      'التخصص ومجال المشروع المطلوب.',
      'الموعد النهائي للمراحل المختلفة أو التسليم النهائي.',
    ],
    faqs: [
      {
        q: 'هل يتم تسليم المشروع على مراحل للمراجعة؟',
        a: 'نعم، يتم تقسيم العمل إلى مراحل (Proposal، الفصول الأولى، التطبيق، التقرير النهائي) لضمان المتابعة المستمرة مع الطالب.',
      },
    ],
    orderText:
      'تواصل معنا بتفاصيل تخصصك وشروط مشروع التخرج لنبدأ العمل خطوة بخطوة.',
  },
]

const categories = [
  { id: 'all' as Category, label: 'جميع الخدمات' },
  { id: 'research' as Category, label: 'البحوث' },
  { id: 'design' as Category, label: 'التصاميم' },
  { id: 'academic' as Category, label: 'الخدمات الأكاديمية' },
]

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  const sliderRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const isInteractingRef = useRef(false)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const startScrollLeftRef = useRef(0)

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter((service) => service.category === activeCategory)

  /*
   * نكرر البطاقات حتى تستمر الحركة بدون ظهور فراغ.
   */
  const marqueeServices = [
    ...filteredServices,
    ...filteredServices,
    ...filteredServices,
  ]

  /*
   * الحركة التلقائية.
   * المستخدم يستطيع إيقافها باللمس أو الماوس والسحب بشكل طبيعي.
   */
  useEffect(() => {
    const slider = sliderRef.current

    if (!slider || filteredServices.length === 0) return

    let lastTime = performance.now()

    const animate = (time: number) => {
      const currentSlider = sliderRef.current

      if (!currentSlider) return

      const delta = time - lastTime
      lastTime = time

      if (!isInteractingRef.current && !isDraggingRef.current) {
        /*
         * سرعة الحركة منخفضة وناعمة حتى تكون مناسبة للجوال والكمبيوتر.
         */
        currentSlider.scrollLeft += delta * 0.035

        /*
         * عند الوصول إلى نهاية المجموعة الأولى
         * نرجع للخلف بدون أن يشعر المستخدم بالقفزة.
         */
        const oneThird = currentSlider.scrollWidth / 3

        if (currentSlider.scrollLeft >= oneThird) {
          currentSlider.scrollLeft -= oneThird
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [activeCategory, filteredServices.length])

  /*
   * سحب بالماوس + اللمس.
   */
  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const slider = sliderRef.current

    if (!slider) return

    isDraggingRef.current = true
    isInteractingRef.current = true

    startXRef.current = event.clientX
    startScrollLeftRef.current = slider.scrollLeft

    slider.setPointerCapture(event.pointerId)

    slider.style.cursor = 'grabbing'
    slider.style.scrollBehavior = 'auto'
  }

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const slider = sliderRef.current

    if (!slider || !isDraggingRef.current) return

    const distance = event.clientX - startXRef.current

    /*
     * الاتجاه عكسي حتى يكون السحب طبيعيًا.
     */
    slider.scrollLeft = startScrollLeftRef.current - distance
  }

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const slider = sliderRef.current

    isDraggingRef.current = false

    if (slider) {
      try {
        slider.releasePointerCapture(event.pointerId)
      } catch {
        // لا شيء
      }

      slider.style.cursor = 'grab'
    }

    /*
     * نترك الحركة متوقفة لحظة قصيرة بعد السحب
     * حتى لا يبدأ الكرت بالتحرك مباشرة تحت إصبع المستخدم.
     */
    window.setTimeout(() => {
      isInteractingRef.current = false
    }, 700)
  }

  const handleMouseEnter = () => {
    isInteractingRef.current = true
  }

  const handleMouseLeave = () => {
    if (!isDraggingRef.current) {
      isInteractingRef.current = false
    }
  }

  /*
   * عجلة الماوس تتحول إلى تمرير أفقي.
   */
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const slider = sliderRef.current

    if (!slider) return

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      event.preventDefault()
      slider.scrollLeft += event.deltaY
    }
  }

  return (
    <section id="services" className="section soft-section">
      <style jsx>{`
        .services-wrapper {
          position: relative;
          width: 100%;
        }

        .services-category-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin: 0 auto 2.5rem;
        }

        .services-category {
          position: relative;
          border: 1px solid rgba(15, 23, 42, 0.1);
          border-radius: 999px;
          padding: 0.85rem 1.5rem;
          min-width: 125px;
          background: rgba(255, 255, 255, 0.8);
          color: inherit;
          cursor: pointer;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 800;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease;
          backdrop-filter: blur(12px);
        }

        .services-category:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.1);
        }

        .services-category.active {
          background: var(--foreground, #111827);
          color: var(--background, #ffffff);
          border-color: var(--foreground, #111827);
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.18);
        }

        .services-slider-shell {
          position: relative;
          width: 100%;
        }

        .services-slider-shell::before,
        .services-slider-shell::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 70px;
          z-index: 3;
          pointer-events: none;
        }

        .services-slider-shell::before {
          left: 0;
          background: linear-gradient(
            to right,
            var(--background, #ffffff),
            transparent
          );
        }

        .services-slider-shell::after {
          right: 0;
          background: linear-gradient(
            to left,
            var(--background, #ffffff),
            transparent
          );
        }

        .services-slider {
          width: 100%;
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 1.25rem 3rem 2rem;
          cursor: grab;
          user-select: none;
          -webkit-user-select: none;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          scroll-behavior: auto;
          overscroll-behavior-x: contain;
          touch-action: pan-x;
          direction: ltr;
        }

        .services-slider::-webkit-scrollbar {
          display: none;
        }

        .service-card {
          position: relative;
          flex: 0 0 360px;
          min-height: 430px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          direction: rtl;
          padding: 2rem 1.8rem 1.65rem;
          border-radius: 28px;
          border: 1px solid rgba(15, 23, 42, 0.09);
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(59, 130, 246, 0.09),
              transparent 42%
            ),
            rgba(255, 255, 255, 0.96);
          box-shadow:
            0 15px 45px rgba(15, 23, 42, 0.08),
            0 3px 12px rgba(15, 23, 42, 0.04);
          overflow: hidden;
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 3px;
          border-radius: 0 0 999px 999px;
          background: currentColor;
          opacity: 0.18;
        }

        .service-card::after {
          content: '';
          position: absolute;
          width: 180px;
          height: 180px;
          border-radius: 50%;
          top: -100px;
          right: -70px;
          background: currentColor;
          opacity: 0.035;
          pointer-events: none;
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow:
            0 25px 60px rgba(15, 23, 42, 0.13),
            0 8px 20px rgba(15, 23, 42, 0.06);
          border-color: rgba(15, 23, 42, 0.15);
        }

        .service-icon-wrap {
          position: relative;
          z-index: 1;
          width: 88px;
          height: 88px;
          flex: 0 0 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.35rem;
          border-radius: 25px;
          background:
            linear-gradient(
              145deg,
              rgba(59, 130, 246, 0.15),
              rgba(99, 102, 241, 0.06)
            );
          border: 1px solid rgba(59, 130, 246, 0.12);
          box-shadow:
            0 12px 30px rgba(59, 130, 246, 0.09),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }

        .service-card:hover .service-icon-wrap {
          transform: translateY(-4px) scale(1.04);
          box-shadow:
            0 18px 38px rgba(59, 130, 246, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .service-icon {
          width: 39px;
          height: 39px;
          stroke-width: 1.8;
        }

        .service-title {
          position: relative;
          z-index: 1;
          margin: 0;
          font-size: 1.3rem;
          line-height: 1.5;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .service-subtitle {
          position: relative;
          z-index: 1;
          margin-top: 0.6rem;
          min-height: 27px;
          font-size: 0.84rem;
          font-weight: 800;
          opacity: 0.58;
        }

        .service-description {
          position: relative;
          z-index: 1;
          margin: 1.15rem auto 0;
          max-width: 300px;
          font-size: 0.96rem;
          line-height: 1.95;
          opacity: 0.76;
        }

        .service-action {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 52px;
          margin-top: auto;
          padding: 0.85rem 1.15rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          border-radius: 16px;
          text-decoration: none;
          font-weight: 900;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .service-action:hover {
          transform: translateY(-2px);
        }

        .services-hint {
          margin-top: 0.35rem;
          text-align: center;
          font-size: 0.8rem;
          opacity: 0.48;
          user-select: none;
        }

        @media (max-width: 768px) {
          .services-category-bar {
            gap: 0.55rem;
            margin-bottom: 1.5rem;
          }

          .services-category {
            padding: 0.7rem 1rem;
            min-width: auto;
            font-size: 0.84rem;
          }

          .services-slider-shell::before,
          .services-slider-shell::after {
            width: 28px;
          }

          .services-slider {
            gap: 1rem;
            padding: 0.9rem 1.25rem 1.5rem;
          }

          .service-card {
            flex-basis: 310px;
            min-height: 410px;
            padding: 1.75rem 1.45rem 1.4rem;
            border-radius: 25px;
          }

          .service-icon-wrap {
            width: 80px;
            height: 80px;
            flex-basis: 80px;
            border-radius: 23px;
          }

          .service-icon {
            width: 35px;
            height: 35px;
          }

          .service-title {
            font-size: 1.2rem;
          }

          .service-description {
            font-size: 0.91rem;
            line-height: 1.85;
          }

          .services-hint {
            font-size: 0.75rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-card,
          .service-icon-wrap,
          .services-category,
          .service-action {
            transition: none;
          }
        }
      `}</style>

      <div className="container">
        <div className="center-heading">
          <span className="section-kicker">خدماتنا</span>

          <h2>
            خدمات مصممة من أجلك <em>ولنجاحك</em>
          </h2>

          <p>
            اختر التصنيف المناسب لتظهر لك الخدمات المرتبطة به.
          </p>
        </div>

        <div className="services-wrapper">
          {/* التصنيفات */}
          <div className="services-category-bar">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`services-category ${
                  activeCategory === category.id ? 'active' : ''
                }`}
                onClick={() => {
                  setActiveCategory(category.id)

                  /*
                   * نعيد الشريط للبداية عند تغيير التصنيف.
                   */
                  requestAnimationFrame(() => {
                    if (sliderRef.current) {
                      sliderRef.current.scrollLeft = 0
                    }
                  })
                }}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* بطاقات الخدمات */}
          <div className="services-slider-shell">
            <div
              ref={sliderRef}
              className="services-slider"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onWheel={handleWheel}
            >
              {marqueeServices.map((service, index) => {
                const Icon = service.icon

                return (
                  <article
                    key={`${service.id}-${index}`}
                    className="service-card"
                  >
                    <div className="service-icon-wrap">
                      <Icon className="service-icon" />
                    </div>

                    <h3 className="service-title">
                      {service.title}
                    </h3>

                    <div className="service-subtitle">
                      {service.subtitle}
                    </div>

                    <p className="service-description">
                      {service.shortText}
                    </p>

                    <Link
                      href={`/services/${service.id}`}
                      className="primary-button service-action"
                      onPointerDown={(event) => {
                        /*
                         * السماح للزر بالعمل بدون اعتباره سحبًا.
                         */
                        event.stopPropagation()
                      }}
                    >
                      <span>عرض الخدمة</span>
                      <ArrowLeft size={18} />
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="services-hint">
            اسحب البطاقات يمينًا ويسارًا لاستعراض جميع الخدمات
          </div>
        </div>
      </div>
    </section>
  )
}