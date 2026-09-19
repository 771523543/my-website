'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Calculator,
  Menu,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  X,
  Plus,
  Trash2,
  GraduationCap,
  Award,
  LockKeyhole,
  UsersRound,
  Layers3,
  Clock3,
  HeartHandshake,
  CheckCircle2,
  Headphones,
} from 'lucide-react'

import QuickSections from './components/QuickSections'
import ServicesPreview from './components/ServicesPreview'
import Packages from './components/Packages'
import PreviousWorks from './components/PreviousWorks'

const whatsapp = 'https://wa.me/967776280186'

const generalFaqs = [
  {
    q: 'كيف أستطيع طلب خدمة من منصة هديل؟',
    a: 'يمكنك اختيار الخدمة المطلوبة من الموقع، الضغط على زر التفاصيل وتعبئة النموذج، أو التواصل المباشر معنا عبر الواتساب وإرسال المتطلبات.',
  },
  {
    q: 'ما هي طرق الدفع المتاحة؟',
    a: 'نوفر طرق دفع إلكترونية متعددة وآمنة تناسب جميع الطلاب داخل وخارج المملكة.',
  },
  {
    q: 'هل يمكنني طلب تعديل على العمل بعد الاستلام؟',
    a: 'نعم بكل تأكيد، نضمن لك تعديلات مجانية لتلبية الملاحظات الأكاديمية والوصول بالعمل إلى مستوى القبول والرضا الكامل.',
  },
  {
    q: 'كيف يتم ضمان سرية الخصوصية والبيانات؟',
    a: 'جميع معلومات الطلاب، البيانات الأكاديمية، والملفات المُرسلة تُعامل بسرية تامة ولا يتم إظهارها أو مشاركتها مع أي جهة.',
  },
]

const testimonialsData = [
  {
    name: 'عبدالله العتيبي',
    role: 'طالب بكالوريوس',
    text: 'ما شاء الله تبارك الله، سرعة ودقة في إعداد البحث والتزام بالتوثيق المعتمد APA. أنقذتوني في الوقت المناسب!',
    rating: 5,
  },
  {
    name: 'سارة الشمري',
    role: 'طالبة ماجستير',
    text: 'عرض الباوربوينت كان أكثر من رائع وتفاعلي، الدكتور أثنى على تنسيق الشرائح وطريقة عرض الأفكار. شكراً منصة هديل.',
    rating: 5,
  },
  {
    name: 'محمد الغامدي',
    role: 'طالب جامعي',
    text: 'خدمة متابعة التكليفات والبلاك بورد احترافية جداً وبمنتهى الخصوصية والأمانة. تعامل راقي ومستمر معكم بإذن الله.',
    rating: 5,
  },
]

const values = [
  [
    'الأمانة الأكاديمية',
    'أصالة وجودة وخلو الأعمال من السرقات الأدبية.',
  ],
  [
    'السرية والخصوصية',
    'حماية كاملة لبيانات ومستندات ومعلومات الطلاب.',
  ],
  [
    'التميز والدقة',
    'أعمال متكاملة تفي بالمعايير والشروط الجامعية.',
  ],
  [
    'الالتزام بالمواعيد',
    'احترام وقتك وتسليم دقيق في الموعد المحدد.',
  ],
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)

  const [openFaqIndex, setOpenFaqIndex] =
    useState<number | null>(null)

  const [gpaSystem, setGpaSystem] = useState<5 | 4>(5)

  const [courses, setCourses] = useState([
    { id: 1, hours: 3, grade: 5 },
    { id: 2, hours: 3, grade: 4.75 },
    { id: 3, hours: 2, grade: 4.5 },
  ])

  const [calculatedGpa, setCalculatedGpa] =
    useState<string | null>(null)

  const [achievementIndex, setAchievementIndex] = useState(0)
  const [achievementPaused, setAchievementPaused] =
    useState(false)

  const [countValues, setCountValues] = useState({
    students: 0,
    services: 0,
    experience: 0,
    satisfaction: 0,
    completed: 0,
  })

  const countStarted = useRef(false)

  const achievementImages = [
    '/images/hadeel-achievements.png',
    '/images/hadeel-achievement-test.jpg',
  ]

  const handleAddCourse = () => {
    setCourses([
      ...courses,
      {
        id: Date.now(),
        hours: 3,
        grade: gpaSystem,
      },
    ])
  }

  const handleRemoveCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter((c) => c.id !== id))
    }
  }

  const handleCalculateGpa = () => {
    let totalPoints = 0
    let totalHours = 0

    courses.forEach((c) => {
      totalPoints += c.hours * c.grade
      totalHours += c.hours
    })

    if (totalHours > 0) {
      setCalculatedGpa(
        (totalPoints / totalHours).toFixed(2)
      )
    }
  }

  const startCountAnimation = () => {
    if (countStarted.current) return

    countStarted.current = true

    const targets = {
      students: 10000,
      services: 15,
      experience: 8,
      satisfaction: 98,
      completed: 1200,
    }

    const duration = 1800
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easedProgress =
        1 - Math.pow(1 - progress, 3)

      setCountValues({
        students: Math.round(
          targets.students * easedProgress
        ),
        services: Math.round(
          targets.services * easedProgress
        ),
        experience: Math.round(
          targets.experience * easedProgress
        ),
        satisfaction: Math.round(
          targets.satisfaction * easedProgress
        ),
        completed: Math.round(
          targets.completed * easedProgress
        ),
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (achievementPaused) return

    const timer = window.setInterval(() => {
      setAchievementIndex(
        (current) =>
          (current + 1) % achievementImages.length
      )
    }, 3000)

    return () => window.clearInterval(timer)
  }, [
    achievementPaused,
    achievementImages.length,
  ])

  useEffect(() => {
    const revealItems =
      document.querySelectorAll<HTMLElement>(
        '[data-reveal]'
      )

    const countSections =
      document.querySelectorAll<HTMLElement>(
        '[data-count-group]'
      )

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('is-visible')

          if (
            entry.target.hasAttribute(
              'data-count-group'
            )
          ) {
            startCountAnimation()
          }

          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.14,
      }
    )

    revealItems.forEach((item) =>
      observer.observe(item)
    )

    countSections.forEach((item) =>
      observer.observe(item)
    )

    return () => observer.disconnect()
  }, [])

  const formatStudents = () => {
    if (countValues.students >= 10000) {
      return '+10K'
    }

    return `+${countValues.students.toLocaleString('en-US')}`
  }

  const formatCompleted = () => {
    return `+${countValues.completed.toLocaleString(
      'en-US'
    )}`
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-background text-foreground"
    >
      {/* ==================== ANNOUNCEMENT ==================== */}

      <div className="announcement">
        <Sparkles size={15} />
        خصم خاص على خدمات منصة هديل لفترة محدودة
        <ArrowLeft size={15} />
      </div>

      {/* ==================== HEADER ==================== */}

      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#top">
            <Image
              className="brand-logo"
              src="/hadeel-platform-logo.png"
              alt="شعار منصة هديل للخدمات الطلابية"
              width={54}
              height={54}
              priority
            />

            <span>
              منصة هديل
              <span className="brand-dot">.</span>
            </span>
          </a>

          <nav
            className={
              menuOpen
                ? 'nav-links mobile-open'
                : 'nav-links'
            }
          >
            <a
              href="#top"
              onClick={() => setMenuOpen(false)}
            >
              الرئيسية
            </a>

            <a
              href="#story"
              onClick={() => setMenuOpen(false)}
            >
              قصتنا
            </a>

            <a
              href="#services"
              onClick={() => setMenuOpen(false)}
            >
              خدماتنا
            </a>

            <a
              href="#gpa-calculator"
              onClick={() => setMenuOpen(false)}
            >
              حاسبة المعدل
            </a>

            <a
              href="#testimonials"
              onClick={() => setMenuOpen(false)}
            >
              آراء العملاء
            </a>

            <a
              href="#faq"
              onClick={() => setMenuOpen(false)}
            >
              الأسئلة الشائعة
            </a>

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              اتصل بنا
            </a>
          </nav>

          <div className="nav-actions">
            <a
              className="primary-button header-order"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={17} />
              اطلب خدمتك الآن
            </a>

            <button
              className="menu-button"
              aria-label="فتح القائمة"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* ==================== HERO ==================== */}

      <section id="top" className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            شريكك الأكاديمي الموثوق
          </span>

          <h1>
            نرتب لك طريقك
            <br />
            <strong>نحو النجاح الأكاديمي</strong>
          </h1>

          <p>
            منصة هديل للخدمات الطلابية والأكاديمية.
            حلول احترافية، جودة عالية، ومتابعة مستمرة
            تساعدك على إنجاز أعمالك بثقة.
          </p>

          <div className="hero-buttons">
            <a
              className="primary-button"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              اطلب خدمتك الآن
              <MessageCircle size={18} />
            </a>

            <a
              className="text-button"
              href="#services"
            >
              استكشف خدماتنا
              <ArrowLeft size={18} />
            </a>
          </div>

          <div className="trust-row">
            <div className="avatars">
              <span>أ</span>
              <span>م</span>
              <span>س</span>
              <span>+</span>
            </div>

            <div>
              <strong>+10,000</strong>
              <small>
                طالب وباحث يثقون بنا
              </small>
            </div>
          </div>

          <div className="hero-blue-card">
            <div className="hero-card-badge">
              <GraduationCap size={27} />
            </div>

            <div className="art-top">
              <span>رحلتك الأكاديمية</span>

              <Award
                size={23}
                className="sparkle"
              />
            </div>

            <p className="hero-card-caption">
              خطوات واضحة، إنجازات أكبر
            </p>

            <div className="path-line">
              <span className="path-dot active" />
              <span />
              <span className="path-dot active" />
              <span />
              <span className="path-dot active" />
            </div>

            <div className="art-labels">
              <span>خطط</span>
              <span>أنجز</span>
              <span>تفوّق</span>
            </div>

            <div className="floating-note">
              <Check size={16} />
              عملك في أيدٍ أمينة
            </div>
          </div>
        </div>

        <div className="hero-art hero-photo">
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '20px 0',
              width: '100%',
              position: 'relative',
            }}
          >
            <img
              src="/images/hadel-1.png"
              alt="منصة هديل"
              style={{
                width: '100%',
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '20px',
                objectFit: 'contain',
                display: 'block',
              }}
            />

            <div
              style={{
                position: 'absolute',
                bottom: '11%',
                left: '5%',
                width: '90%',
                display: 'grid',
                gridTemplateColumns:
                  'repeat(3, 1fr)',
                gap: '7px',
                zIndex: 5,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#fff',
                  color: '#17233d',
                  padding: '9px 7px',
                  borderRadius: '11px',
                  boxShadow:
                    '0 10px 22px #17233d1c',
                  fontSize: '9px',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                }}
              >
                <ShieldCheck
                  size={16}
                  color="#2455c4"
                />
                <span>جودة موثوقة</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#fff',
                  color: '#17233d',
                  padding: '9px 7px',
                  borderRadius: '11px',
                  boxShadow:
                    '0 10px 22px #17233d1c',
                  fontSize: '9px',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                }}
              >
                <LockKeyhole
                  size={16}
                  color="#2455c4"
                />
                <span>خصوصية وأمان</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#fff',
                  color: '#17233d',
                  padding: '9px 7px',
                  borderRadius: '11px',
                  boxShadow:
                    '0 10px 22px #17233d1c',
                  fontSize: '9px',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                }}
              >
                <MessageCircle
                  size={16}
                  color="#2455c4"
                />
                <span>دعم مستمر</span>
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '5%',
                width: '90%',
                display: 'grid',
                gridTemplateColumns:
                  'repeat(3, 1fr)',
                gap: '7px',
                zIndex: 5,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#fff',
                  color: '#17233d',
                  padding: '9px 7px',
                  borderRadius:
                    '11px 11px 0 0',
                  boxShadow:
                    '0 8px 20px #17233d1c',
                  fontSize: '9px',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                }}
              >
                <GraduationCap
                  size={16}
                  color="#2455c4"
                />
                <span>خبرة أكاديمية</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#fff',
                  color: '#17233d',
                  padding: '9px 7px',
                  borderRadius:
                    '11px 11px 0 0',
                  boxShadow:
                    '0 8px 20px #17233d1c',
                  fontSize: '9px',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                }}
              >
                <Award
                  size={16}
                  color="#2455c4"
                />
                <span>إنجازات موثوقة</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: '#fff',
                  color: '#17233d',
                  padding: '9px 7px',
                  borderRadius:
                    '11px 11px 0 0',
                  boxShadow:
                    '0 8px 20px #17233d1c',
                  fontSize: '9px',
                  fontWeight: 800,
                  whiteSpace: 'nowrap',
                }}
              >
                <Sparkles
                  size={16}
                  color="#2455c4"
                />
                <span>تميز وجودة</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== QUICK SECTIONS ==================== */}

      <QuickSections />

      {/* ==================== STATS ==================== */}

      <section
        className="stats-strip"
        data-count-group
      >
        <div className="container stats">
          <div>
            <UsersRound size={22} />
            <strong>
              {formatStudents()}
            </strong>
            <span>طالب مستفيد</span>
          </div>

          <div>
            <Layers3 size={22} />
            <strong>
              +{countValues.services}
            </strong>
            <span>خدمة أكاديمية</span>
          </div>

          <div>
            <Clock3 size={22} />
            <strong>
              +{countValues.experience}
            </strong>
            <span>سنوات خبرة</span>
          </div>

          <div>
            <HeartHandshake size={22} />
            <strong>
              {countValues.satisfaction}%
            </strong>
            <span>نسبة رضا العملاء</span>
          </div>
        </div>
      </section>

      {/* ==================== STORY ==================== */}

      <section
        id="story"
        className="section story-section container"
      >
        <div className="story-visual">
          <div className="story-card">
            <BookOpen size={42} />

            <span>
              معرفة
              <br />
              تُنجز
            </span>
          </div>

          <div className="story-badge">
            منذ 2018
          </div>
        </div>

        <div className="story-copy">
          <span className="section-kicker">
            قصتنا
          </span>

          <h2>
            بدأنا من إيماننا بأن
            <br />
            <em>كل طالب يستحق الدعم</em>
          </h2>

          <p>
            انطلقت منصة هديل لتكون الوجهة الموثوقة
            للطلاب والباحثين، وتحوّل التحديات
            الأكاديمية إلى خطوات واضحة قابلة للإنجاز.
            نعمل بشغف لنقدم حلولًا احترافية تراعي
            احتياجك وتساعدك على إكمال رحلتك بأعلى
            درجات الجودة.
          </p>

          <a
            className="text-button"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            تعرّف على هديل
            <ArrowLeft size={17} />
          </a>
        </div>
      </section>

      {/* ==================== VALUES ==================== */}

      <section
        id="values"
        data-reveal
        className="section soft-section reveal-section"
      >
        <div className="container">
          <div className="center-heading">
            <span className="section-kicker">
              قيمنا الأساسية
            </span>

            <h2>
              ثقة تُبنى على <em>المبادئ</em>
            </h2>

            <p>
              نضع احتياجك ونجاحك في مقدمة كل ما نقدمه.
            </p>
          </div>

          <div className="values-grid">
            {values.map(
              ([title, text], index) => (
                <article
                  data-reveal
                  className="value-card reveal-section"
                  key={title}
                >
                  <span className="value-number">
                    0{index + 1}
                  </span>

                  <ShieldCheck size={25} />

                  <h3>{title}</h3>

                  <p>{text}</p>
                </article>
              )
            )}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES ==================== */}

      <ServicesPreview />

      {/* ==================== PACKAGES ==================== */}

      <Packages />

      {/* ==================== WHY ==================== */}

      <section
        id="why"
        className="why-section"
      >
        <div className="container why-inner">
          <div>
            <span className="section-kicker">
              لماذا تختار منصة هديل؟
            </span>

            <h2>
              معك من أول فكرة
              <br />
              <em>حتى التسليم النهائي</em>
            </h2>

            <p>
              فريق متخصص، تواصل واضح، وجودة نراجعها
              معك خطوة بخطوة.
            </p>
          </div>

          <div className="feature-list">
            <div>
              <Check />

              <span>
                <strong>
                  سرعة فائقة في الإنجاز
                </strong>

                <small>
                  تنفيذ وتسليم في وقت قياسي.
                </small>
              </span>
            </div>

            <div>
              <Check />

              <span>
                <strong>
                  جودة أكاديمية عالية
                </strong>

                <small>
                  مراجعة تدقيقية متكاملة لجميع
                  الأعمال.
                </small>
              </span>
            </div>

            <div>
              <Check />

              <span>
                <strong>
                  دعم ومتابعة مستمرة
                </strong>

                <small>
                  تواصل وتعديل حتى اعتماد العمل
                  نهائيًا.
                </small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PREVIOUS WORKS ==================== */}

      <PreviousWorks />

      {/* ==================== ACHIEVEMENTS ==================== */}

      <section
        className="achievements-section container"
        data-count-group
      >
        <div className="achievements-copy">
          <span className="section-kicker">
            إنجازاتنا بالأرقام
          </span>

          <h2>
            نتائج تُثبت
            <br />
            <em>ثقة طلابنا</em>
          </h2>

          <p>
            نفخر بكل طالب ساعدناه على تحويل
            التحديات الأكاديمية إلى إنجازات واضحة
            ونتائج ملموسة.
          </p>

          <div className="achievement-stats">
            <div>
              <CheckCircle2 size={20} />

              <strong>
                {formatCompleted()}
              </strong>

              <span>خدمة منجزة</span>
            </div>

            <div>
              <HeartHandshake size={20} />

              <strong>
                {countValues.satisfaction}%
              </strong>

              <span>رضا العملاء</span>
            </div>

            <div>
              <Clock3 size={20} />

              <strong>
                +{countValues.experience}
              </strong>

              <span>سنوات خبرة</span>
            </div>

            <div>
              <Headphones size={20} />

              <strong>24/7</strong>

              <span>دعم ومتابعة</span>
            </div>
          </div>
        </div>

        <div
          className="achievements-image"
          onMouseEnter={() =>
            setAchievementPaused(true)
          }
          onMouseLeave={() =>
            setAchievementPaused(false)
          }
        >
          <div
            className="achievement-slides"
            aria-live="polite"
          >
            <Image
              key={
                achievementImages[
                  achievementIndex
                ]
              }
              className="achievement-slide"
              src={
                achievementImages[
                  achievementIndex
                ]
              }
              alt={`نموذج إنجاز أكاديمي ${
                achievementIndex + 1
              }`}
              fill
              sizes="(max-width: 800px) 100vw, 45vw"
            />
          </div>

          <button
            className="achievement-arrow achievement-next"
            onClick={() =>
              setAchievementIndex(
                (achievementIndex + 1) %
                  achievementImages.length
              )
            }
            aria-label="الصورة التالية"
          >
            <ChevronRight size={18} />
          </button>

          <button
            className="achievement-arrow achievement-prev"
            onClick={() =>
              setAchievementIndex(
                (achievementIndex -
                  1 +
                  achievementImages.length) %
                  achievementImages.length
              )
            }
            aria-label="الصورة السابقة"
          >
            <ChevronRight
              size={18}
              style={{
                transform: 'rotate(180deg)',
              }}
            />
          </button>

          <div className="achievement-dots">
            {achievementImages.map(
              (image, index) => (
                <button
                  key={image}
                  className={
                    index === achievementIndex
                      ? 'active'
                      : ''
                  }
                  onClick={() =>
                    setAchievementIndex(index)
                  }
                  aria-label={`عرض الصورة ${
                    index + 1
                  }`}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}

      <section
        id="testimonials"
        className="section container"
      >
        <div className="center-heading">
          <span className="section-kicker">
            آراء العملاء
          </span>

          <h2>
            ماذا يقول{' '}
            <em>طلابنا عنّا؟</em>
          </h2>

          <p>
            تجارب حقيقية لطلاب وباحثين اعتمدوا على
            منصتنا لتسيير أبحاثهم ومسيرتهم الأكاديمية.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem',
          }}
        >
          {testimonialsData.map((t, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                border:
                  '1px solid #e5e7eb',
                padding: '1.5rem',
                borderRadius: '12px',
                boxShadow:
                  '0 2px 8px rgba(0,0,0,0.03)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '2px',
                  color: '#f59e0b',
                  marginBottom: '0.8rem',
                }}
              >
                {[...Array(t.rating)].map(
                  (_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={16}
                      fill="#f59e0b"
                    />
                  )
                )}
              </div>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: '#374151',
                  lineHeight: '1.6',
                  marginBottom: '1rem',
                }}
              >
                "{t.text}"
              </p>

              <div>
                <strong
                  style={{
                    display: 'block',
                    fontSize: '0.92rem',
                    color: '#111827',
                  }}
                >
                  {t.name}
                </strong>

                <small
                  style={{
                    color: '#6b7280',
                    fontSize: '0.8rem',
                  }}
                >
                  {t.role}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== ACADEMIC AD ==================== */}

      <section className="academic-ad-section container">
        <div className="academic-ad">
          <span className="ad-badge">
            <span>⚡</span>
            خدمات أكاديمية متكاملة
          </span>

          <h2>
            ارفع معدلك.
            <br />
            ووفر وقتك.
          </h2>

          <p>
            من إعداد البحوث الموثقة إلى إدارة حساب
            البلاك بورد، تقدم لك منصة هديل كافة
            الأدوات والخدمات التي توفر وقتك وتضمن
            لك التفوق الأكاديمي.
          </p>

          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="ad-button"
          >
            ابدأ طلبك الآن
            <ArrowLeft size={16} />
          </a>
        </div>
      </section>

      {/* ==================== GPA CALCULATOR ==================== */}

      <section
        id="gpa-calculator"
        className="section soft-section container"
        style={{
          marginTop: '2rem',
          borderRadius: '16px',
          padding: '2rem',
        }}
      >
        <div className="center-heading">
          <span className="section-kicker">
            أداة تفاعلية
          </span>

          <h2>
            حاسبة{' '}
            <em>المعدل التراكمي (GPA)</em>
          </h2>

          <p>
            احسب معدلك الفصل المتوقع بسهولة ودقة
            وفق السلم الأكاديمي المعتمد.
          </p>
        </div>

        <div
          style={{
            maxWidth: '650px',
            margin: '0 auto',
            background: '#fff',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow:
              '0 4px 15px rgba(0,0,0,0.05)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1.2rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => {
                setGpaSystem(5)
                setCalculatedGpa(null)
              }}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '6px',
                border:
                  '1px solid #10b981',
                background:
                  gpaSystem === 5
                    ? '#10b981'
                    : '#fff',
                color:
                  gpaSystem === 5
                    ? '#fff'
                    : '#333',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              نظام من 5
            </button>

            <button
              onClick={() => {
                setGpaSystem(4)
                setCalculatedGpa(null)
              }}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '6px',
                border:
                  '1px solid #10b981',
                background:
                  gpaSystem === 4
                    ? '#10b981'
                    : '#fff',
                color:
                  gpaSystem === 4
                    ? '#fff'
                    : '#333',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              نظام من 4
            </button>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
            }}
          >
            {courses.map((course, idx) => (
              <div
                key={course.id}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    width: '60px',
                  }}
                >
                  مادة {idx + 1}
                </span>

                <input
                  type="number"
                  min="1"
                  max="6"
                  value={course.hours}
                  onChange={(e) => {
                    const updated = [
                      ...courses,
                    ]

                    updated[idx].hours =
                      Number(
                        e.target.value
                      )

                    setCourses(updated)
                  }}
                  style={{
                    width: '80px',
                    padding: '0.4rem',
                    borderRadius: '6px',
                    border:
                      '1px solid #ccc',
                    fontSize: '0.85rem',
                  }}
                  placeholder="ساعات"
                />

                <select
                  value={course.grade}
                  onChange={(e) => {
                    const updated = [
                      ...courses,
                    ]

                    updated[idx].grade =
                      Number(
                        e.target.value
                      )

                    setCourses(updated)
                  }}
                  style={{
                    flex: 1,
                    minWidth: '180px',
                    padding: '0.4rem',
                    borderRadius: '6px',
                    border:
                      '1px solid #ccc',
                    fontSize: '0.85rem',
                  }}
                >
                  {gpaSystem === 5 ? (
                    <>
                      <option value={5}>
                        ممتاز مرتفع (+A) - 5.0
                      </option>

                      <option value={4.75}>
                        ممتاز (A) - 4.75
                      </option>

                      <option value={4.5}>
                        جيد جداً مرتفع (+B) - 4.5
                      </option>

                      <option value={4}>
                        جيد جداً (B) - 4.0
                      </option>

                      <option value={3.5}>
                        جيد مرتفع (+C) - 3.5
                      </option>

                      <option value={3}>
                        جيد (C) - 3.0
                      </option>

                      <option value={2.5}>
                        مقبول مرتفع (+D) - 2.5
                      </option>

                      <option value={2}>
                        مقبول (D) - 2.0
                      </option>

                      <option value={1}>
                        راسب (F) - 1.0
                      </option>
                    </>
                  ) : (
                    <>
                      <option value={4}>
                        ممتاز (A) - 4.0
                      </option>

                      <option value={3.5}>
                        جيد جداً مرتفع (+B) - 3.5
                      </option>

                      <option value={3}>
                        جيد جداً (B) - 3.0
                      </option>

                      <option value={2.5}>
                        جيد مرتفع (+C) - 2.5
                      </option>

                      <option value={2}>
                        جيد (C) - 2.0
                      </option>

                      <option value={1.5}>
                        مقبول (+D) - 1.5
                      </option>

                      <option value={1}>
                        مقبول (D) - 1.0
                      </option>

                      <option value={0}>
                        راسب (F) - 0.0
                      </option>
                    </>
                  )}
                </select>

                <button
                  onClick={() =>
                    handleRemoveCourse(
                      course.id
                    )
                  }
                  style={{
                    background: '#fee2e2',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.4rem',
                    cursor: 'pointer',
                    color: '#ef4444',
                  }}
                  aria-label={`حذف مادة ${
                    idx + 1
                  }`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.8rem',
              marginTop: '1.2rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={handleAddCourse}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: '#f3f4f6',
                border:
                  '1px solid #ccc',
                padding:
                  '0.5rem 0.8rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 'bold',
              }}
            >
              <Plus size={16} />
              إضافة مادة
            </button>

            <button
              onClick={handleCalculateGpa}
              style={{
                flex: 1,
                minWidth: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: '#10b981',
                color: '#fff',
                border: 'none',
                padding: '0.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.9rem',
              }}
            >
              <Calculator size={16} />
              حساب المعدل
            </button>
          </div>

          {calculatedGpa !== null && (
            <div
              style={{
                marginTop: '1.2rem',
                padding: '1rem',
                background: '#ecfdf5',
                borderRadius: '8px',
                textAlign: 'center',
                border:
                  '1px solid #a7f3d0',
              }}
            >
              <span
                style={{
                  fontSize: '0.9rem',
                  color: '#065f46',
                  fontWeight: 'bold',
                }}
              >
                معدلك المتوقع:
              </span>

              <strong
                style={{
                  display: 'block',
                  fontSize: '1.8rem',
                  color: '#047857',
                  marginTop: '0.2rem',
                }}
              >
                {calculatedGpa} /{' '}
                {gpaSystem}
              </strong>
            </div>
          )}
        </div>
      </section>

      {/* ==================== FAQ ==================== */}

      <section
        id="faq"
        className="section container"
      >
        <div className="center-heading">
          <span className="section-kicker">
            الأسئلة الشائعة
          </span>

          <h2>
            إجابات عن <em>استفساراتك</em>
          </h2>

          <p>
            إليك إجابات لأبرز الأسئلة والاستفسارات
            الشائعة حول خدماتنا وطريقة التعامل.
          </p>
        </div>

        <div
          style={{
            maxWidth: '750px',
            margin: '2rem auto 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
          }}
        >
          {generalFaqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                border:
                  '1px solid #e5e7eb',
                borderRadius: '10px',
                overflow: 'hidden',
                background: '#fff',
              }}
            >
              <button
                onClick={() =>
                  setOpenFaqIndex(
                    openFaqIndex === idx
                      ? null
                      : idx
                  )
                }
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent:
                    'space-between',
                  alignItems: 'center',
                  padding:
                    '1rem 1.2rem',
                  border: 'none',
                  background:
                    'transparent',
                  textAlign: 'right',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  color: '#111827',
                }}
              >
                <span>{faq.q}</span>

                <ChevronDown
                  size={18}
                  style={{
                    transform:
                      openFaqIndex === idx
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                    transition:
                      'transform 0.2s',
                  }}
                />
              </button>

              {openFaqIndex === idx && (
                <div
                  style={{
                    padding:
                      '0 1.2rem 1rem',
                    fontSize: '0.88rem',
                    color: '#4b5563',
                    lineHeight: '1.6',
                    borderTop:
                      '1px solid #f3f4f6',
                    paddingTop: '0.8rem',
                    textAlign: 'right',
                  }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}

      <section
        id="contact"
        className="cta-section container"
      >
        <div>
          <span className="section-kicker">
            جاهز تبدأ؟
          </span>

          <h2>
            خلّنا ننجزها <em>معًا</em>
          </h2>

          <p>
            تواصل معنا الآن واحصل على استشارة مجانية
            لخدمتك.
          </p>
        </div>

        <a
          className="light-button"
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle size={18} />
          تواصل عبر واتساب
        </a>
      </section>

      {/* ==================== FOOTER ==================== */}

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a
              className="brand footer-brand"
              href="#top"
            >
              <span className="brand-mark">
                هـ
              </span>

              <span>
                منصة هديل
                <span className="brand-dot">
                  .
                </span>
              </span>
            </a>

            <p>
              منصة هديل للخدمات الطلابية
              والأكاديمية، شريكك نحو إنجاز أكاديمي
              أفضل.
            </p>
          </div>

          <div>
            <h4>روابط سريعة</h4>

            <a href="#story">قصتنا</a>
            <a href="#services">خدماتنا</a>
            <a href="#gpa-calculator">
              حاسبة المعدل
            </a>
            <a href="#testimonials">
              آراء العملاء
            </a>
          </div>

          <div>
            <h4>تواصل معنا</h4>

            <a href="mailto:Hadeelmubarak387@gmail.com">
              Hadeelmubarak387@gmail.com
            </a>
          </div>

          <div className="footer-note">
            <MessageCircle size={30} />

            <h4>تحتاج مساعدة؟</h4>

            <p>
              فريقنا جاهز للإجابة عن استفساراتك.
            </p>

            <a
              className="footer-whatsapp"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              راسلنا مباشرة
              <ArrowLeft size={15} />
            </a>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>
            © 2026 منصة هديل للخدمات الطلابية
            والأكاديمية. جميع الحقوق محفوظة.
          </span>

          <span>
            صُنع بعناية للطلاب والباحثين
          </span>
        </div>
      </footer>

      {/* ==================== FLOATING WHATSAPP ==================== */}

      <a
        className="floating-whatsapp"
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="تواصل معنا عبر واتساب"
      >
        <img
          src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/whatsapp/default.svg"
          alt="واتساب"
        />

        <span>تواصل معنا</span>
      </a>
    </main>
  )
}