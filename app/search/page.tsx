'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  CheckCircle2,
  FileText,
  GraduationCap,
  HelpCircle,
  LayoutGrid,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
  Trophy,
  Users,
} from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { Suspense, useMemo } from 'react'

import { services } from '@/app/components/Services'
import { universities } from '@/app/components/universities/data'

type SearchItem = {
  id: string
  title: string
  description: string
  keywords: string
  href: string
  icon: typeof Search
  category: string
}

/* =========================================================
   تنظيف وتوحيد النص العربي
   ========================================================= */

function normalizeArabic(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ـ/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/* =========================================================
   حساب المسافة بين كلمتين
   يستخدم لاكتشاف الأخطاء الإملائية البسيطة
   ========================================================= */

function levenshteinDistance(a: string, b: string) {
  const matrix: number[][] = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] =
          Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + 1
          )
      }
    }
  }

  return matrix[b.length][a.length]
}

/* =========================================================
   درجة التشابه بين كلمتين
   ========================================================= */

function wordSimilarity(queryWord: string, targetWord: string) {
  if (!queryWord || !targetWord) {
    return 0
  }

  if (queryWord === targetWord) {
    return 1
  }

  if (
    targetWord.includes(queryWord) ||
    queryWord.includes(targetWord)
  ) {
    const shorter = Math.min(
      queryWord.length,
      targetWord.length
    )

    if (shorter >= 2) {
      return 0.92
    }
  }

  if (queryWord.length <= 2 || targetWord.length <= 2) {
    return 0
  }

  const distance = levenshteinDistance(
    queryWord,
    targetWord
  )

  const maxLength = Math.max(
    queryWord.length,
    targetWord.length
  )

  const similarity = 1 - distance / maxLength

  /*
   * لا نعتبر الكلمات شديدة الاختلاف متشابهة.
   */
  if (queryWord.length <= 3) {
    return distance <= 1 ? similarity : 0
  }

  if (queryWord.length <= 5) {
    return distance <= 1 ? similarity : 0
  }

  return distance <= 2 ? similarity : 0
}

/* =========================================================
   حساب نتيجة البحث
   ========================================================= */

function calculateSearchScore(
  query: string,
  item: SearchItem
) {
  const normalizedQuery = normalizeArabic(query)

  if (!normalizedQuery) {
    return 0
  }

  const title = normalizeArabic(item.title)
  const description = normalizeArabic(item.description)
  const keywords = normalizeArabic(item.keywords)
  const category = normalizeArabic(item.category)

  const searchableText = [
    title,
    description,
    keywords,
    category,
  ].join(' ')

  let score = 0

  /*
   * تطابق العبارة كاملة
   */
  if (title === normalizedQuery) {
    score += 100
  }

  if (title.includes(normalizedQuery)) {
    score += 70
  }

  if (description.includes(normalizedQuery)) {
    score += 45
  }

  if (keywords.includes(normalizedQuery)) {
    score += 40
  }

  if (category.includes(normalizedQuery)) {
    score += 25
  }

  /*
   * تقسيم البحث إلى كلمات
   */
  const queryWords = normalizedQuery
    .split(' ')
    .filter(Boolean)

  const searchableWords = searchableText
    .split(' ')
    .filter(Boolean)

  let matchedWords = 0
  let bestWordScore = 0

  for (const queryWord of queryWords) {
    let bestMatch = 0

    for (const targetWord of searchableWords) {
      const similarity = wordSimilarity(
        queryWord,
        targetWord
      )

      if (similarity > bestMatch) {
        bestMatch = similarity
      }
    }

    if (bestMatch >= 0.55) {
      matchedWords += 1
      bestWordScore += bestMatch
    }
  }

  if (queryWords.length > 0) {
    score +=
      (matchedWords / queryWords.length) * 55
  }

  if (matchedWords > 0) {
    score += bestWordScore * 12
  }

  /*
   * تطابق بدايات الكلمات
   */
  for (const queryWord of queryWords) {
    for (const targetWord of searchableWords) {
      if (
        queryWord.length >= 2 &&
        targetWord.startsWith(queryWord)
      ) {
        score += 18
        break
      }
    }
  }

  /*
   * وجود كل كلمات البحث داخل النص
   */
  if (
    queryWords.length > 1 &&
    queryWords.every((word) =>
      searchableWords.some(
        (target) =>
          target.includes(word) ||
          word.includes(target)
      )
    )
  ) {
    score += 40
  }

  return score
}

/* =========================================================
   النتائج الأساسية الموجودة في الموقع
   ========================================================= */

const baseSearchItems: SearchItem[] = [
  {
    id: 'story',
    title: 'قصتنا',
    description:
      'تعرف على منصة هديل ورؤيتنا في تقديم الخدمات الطلابية والأكاديمية.',
    keywords:
      'قصتنا هديل منصة رؤية رسالة خدمات طلابية أكاديمية نبذة عنا من نحن',
    href: '/#story',
    icon: BookOpen,
    category: 'عن المنصة',
  },
  {
    id: 'services',
    title: 'خدماتنا',
    description:
      'اكتشف الخدمات البحثية والأكاديمية والطلابية التي تقدمها منصة هديل.',
    keywords:
      'خدماتنا الخدمات الطلابية الأكاديمية البحثية واجبات تكاليف تقارير بحوث',
    href: '/services',
    icon: LayoutGrid,
    category: 'الخدمات',
  },
  {
    id: 'research-services',
    title: 'الخدمات البحثية',
    description:
      'خدمات البحوث والمشاريع والدراسات الأكاديمية بمختلف أنواعها.',
    keywords:
      'بحث بحث علمي بحث جامعي أبحاث دراسات مشاريع تخرج دراسة حالة',
    href: '/services',
    icon: FileText,
    category: 'الخدمات',
  },
  {
    id: 'packages',
    title: 'الباقات',
    description:
      'تعرف على باقات الخدمات المتاحة واختر ما يناسب احتياجك الأكاديمي.',
    keywords:
      'باقات أسعار عروض باقة خدمات طلب خدمة سعر تكلفة',
    href: '/#packages',
    icon: BriefcaseBusiness,
    category: 'الخدمات',
  },
  {
    id: 'previous-works',
    title: 'أعمالنا السابقة',
    description:
      'اطلع على نماذج من الأعمال والمشاريع التي تم إنجازها.',
    keywords:
      'أعمالنا السابقة مشاريع نماذج أعمال سابقة إنجازات مشاريع أكاديمية',
    href: '/#previous-works',
    icon: Trophy,
    category: 'أعمالنا',
  },
  {
    id: 'achievements',
    title: 'إنجازاتنا',
    description:
      'تعرف على أرقام وإنجازات منصة هديل وتجربة العملاء معنا.',
    keywords:
      'إنجازات أرقام عملاء خدمات رضا خبرة سنوات دعم متابعة',
    href: '/#achievements',
    icon: Trophy,
    category: 'إنجازاتنا',
  },
  {
    id: 'testimonials',
    title: 'آراء العملاء',
    description:
      'اقرأ تجارب وآراء العملاء حول الخدمات المقدمة من منصة هديل.',
    keywords:
      'آراء العملاء تقييمات تجارب رضا العملاء شهادات',
    href: '/#testimonials',
    icon: Users,
    category: 'آراء العملاء',
  },
  {
    id: 'gpa',
    title: 'حاسبة المعدل',
    description:
      'استخدم حاسبة المعدل لحساب المعدل الدراسي بسهولة.',
    keywords:
      'حاسبة المعدل GPA معدل تراكمي ساعات تقدير درجات درجاتي',
    href: '/#gpa-calculator',
    icon: Calculator,
    category: 'أدوات طلابية',
  },
  {
    id: 'faq',
    title: 'الأسئلة الشائعة',
    description:
      'إجابات عن الأسئلة والاستفسارات الأكثر شيوعًا حول خدمات منصة هديل.',
    keywords:
      'أسئلة شائعة سؤال جواب استفسارات معلومات خدمات طلب',
    href: '/#faq',
    icon: HelpCircle,
    category: 'المساعدة',
  },
  {
    id: 'contact',
    title: 'تواصل معنا',
    description:
      'تواصل مع فريق منصة هديل للاستفسار أو طلب إحدى الخدمات.',
    keywords:
      'تواصل معنا واتساب اتصال مساعدة طلب خدمة استفسار',
    href: '/#contact',
    icon: MessageCircle,
    category: 'التواصل',
  },
]

/* =========================================================
   بناء فهرس البحث الكامل
   ========================================================= */

const searchItems: SearchItem[] = [
  ...baseSearchItems,

  /*
   * الخدمات بكل تفاصيلها
   */
  ...services.map((service) => ({
    id: `service-${service.id}`,
    title: service.title,
    description: [
      service.subtitle,
      service.about,
      service.whatWeOffer.join(' '),
      service.requirements.join(' '),
      service.faqs
        .map((faq) => `${faq.q} ${faq.a}`)
        .join(' '),
      service.orderText,
    ].join(' '),
    keywords: [
      service.title,
      service.subtitle,
      service.category,
      service.about,
      service.whatWeOffer.join(' '),
      service.requirements.join(' '),
      service.faqs
        .map((faq) => `${faq.q} ${faq.a}`)
        .join(' '),
      service.orderText,
    ].join(' '),
    href: `/services/${service.id}`,
    icon: service.icon,
    category: 'خدمات منصة هديل',
  })),

  /*
   * الجامعات والكليات والتخصصات
   */
  ...universities.flatMap((university) => {
    const universityResult: SearchItem = {
      id: `university-${university.slug}`,
      title: university.name,
      description: university.description,
      keywords: [
        university.name,
        university.city,
        university.founded,
        university.description,
        'جامعة جامعات كلية كليات تخصص تخصصات بوابة الطالب',
      ].join(' '),
      href: `/universities/${university.slug}`,
      icon: GraduationCap,
      category: 'الجامعات',
    }

    const collegeResults: SearchItem[] =
      university.colleges.map((college, index) => ({
        id: `college-${university.slug}-${index}`,
        title: college.name,
        description: `كلية ${college.name} في ${university.name}. تضم تخصصات وبرامج أكاديمية متعددة.`,
        keywords: [
          university.name,
          university.city,
          college.name,
          college.majors.join(' '),
          'جامعة جامعة كلية كليات تخصص تخصصات برنامج برامج',
        ].join(' '),
        href: `/universities/${university.slug}/colleges`,
        icon: GraduationCap,
        category: `كليات ${university.name}`,
      }))

    const majorResults: SearchItem[] =
      university.colleges.flatMap(
        (college, collegeIndex) =>
          college.majors.map(
            (major, majorIndex) => ({
              id: `major-${university.slug}-${collegeIndex}-${majorIndex}`,
              title: major,
              description: `تخصص ${major} ضمن ${college.name} في ${university.name}.`,
              keywords: [
                major,
                college.name,
                university.name,
                university.city,
                'تخصص تخصصات كلية جامعة دراسة بكالوريوس برنامج',
              ].join(' '),
              href: `/universities/${university.slug}/colleges`,
              icon: GraduationCap,
              category: `تخصصات ${university.name}`,
            })
          )
      )

    return [
      universityResult,
      ...collegeResults,
      ...majorResults,
    ]
  }),
]

/* =========================================================
   صفحة البحث
   ========================================================= */

function SearchPageContent() {
  const searchParams = useSearchParams()

  const query = searchParams.get('q')?.trim() ?? ''

  const results = useMemo(() => {
    if (!query) {
      return baseSearchItems
    }

    const scoredResults = searchItems
      .map((item) => ({
        item,
        score: calculateSearchScore(
          query,
          item
        ),
      }))
      .filter((result) => {
        /*
         * الحد الأدنى حتى لا تظهر نتائج بعيدة جدًا.
         */
        return result.score >= 18
      })
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score
        }

        return a.item.title.localeCompare(
          b.item.title,
          'ar'
        )
      })

    return scoredResults.map(
      (result) => result.item
    )
  }, [query])

  return (
    <main className="search-page">
      <section className="search-hero">
        <div className="container">
          <div className="search-hero-icon">
            <Search size={28} />
          </div>

          <span className="search-eyebrow">
            <Sparkles size={15} />
            البحث في منصة هديل
          </span>

          <h1>
            {query
              ? `نتائج البحث عن «${query}»`
              : 'ابحث في منصة هديل'}
          </h1>

          <p>
            ابحث عن الخدمات، الجامعات، الكليات،
            التخصصات، الأقسام والمعلومات الموجودة
            في منصة هديل.
          </p>

          <form
            className="search-form"
            action="/search"
            method="get"
          >
            <Search size={21} />

            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="اكتب ما الذي تبحث عنه..."
              aria-label="البحث في الموقع"
              autoFocus
            />

            <button type="submit">
              بحث
            </button>
          </form>
        </div>
      </section>

      <section className="search-results-section">
        <div className="container">
          <div className="search-results-header">
            <div>
              <span className="section-label">
                نتائج البحث
              </span>

              <h2>
                {query
                  ? results.length > 0
                    ? `وجدنا ${results.length} نتيجة`
                    : 'لم نجد نتائج مطابقة'
                  : 'استكشف أقسام الموقع'}
              </h2>
            </div>

            {query && (
              <Link
                href="/search"
                className="clear-search"
              >
                مسح البحث
                <ArrowLeft size={16} />
              </Link>
            )}
          </div>

          {results.length > 0 ? (
            <div className="search-grid">
              {results.map((item) => {
                const Icon = item.icon

                return (
                  <Link
                    href={item.href}
                    className="search-card"
                    key={item.id}
                  >
                    <div className="search-card-icon">
                      <Icon size={24} />
                    </div>

                    <div className="search-card-content">
                      <span>{item.category}</span>

                      <h3>{item.title}</h3>

                      <p>{item.description}</p>

                      <strong>
                        الانتقال للقسم
                        <ArrowLeft size={16} />
                      </strong>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-icon">
                <Search size={32} />
              </div>

              <h3>لم نجد ما تبحث عنه</h3>

              <p>
                جرّب استخدام كلمة مختلفة أو اكتب جزءًا
                من الكلمة فقط.
                <br />
                مثال: جامعة، طب، حاسب، بحث، معدل، خدمات.
              </p>

              <Link
                href="/"
                className="primary-button"
              >
                العودة للرئيسية
                <ArrowLeft size={17} />
              </Link>
            </div>
          )}

          <div className="search-help">
            <div className="search-help-icon">
              <CheckCircle2 size={23} />
            </div>

            <div>
              <strong>
                لم تجد ما تبحث عنه؟
              </strong>

              <p>
                يمكنك التواصل معنا مباشرة وسيساعدك فريق
                منصة هديل.
              </p>
            </div>

            <a
              href="https://wa.me/967776280186"
              target="_blank"
              rel="noreferrer"
              className="search-whatsapp"
            >
              <MessageCircle size={17} />
              تواصل معنا
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .search-page {
          min-height: 70vh;
          background:
            radial-gradient(
              circle at 15% 10%,
              rgba(213, 170, 84, 0.12),
              transparent 28%
            ),
            linear-gradient(
              180deg,
              #f7faff 0%,
              #ffffff 45%,
              #f4f7fc 100%
            );
          color: #17305f;
        }

        .search-hero {
          position: relative;
          overflow: hidden;
          padding: 76px 0 72px;
          text-align: center;
          background:
            radial-gradient(
              circle at 50% -30%,
              rgba(247, 194, 94, 0.24),
              transparent 42%
            ),
            linear-gradient(
              135deg,
              #173f91 0%,
              #2455c4 52%,
              #163878 100%
            );
          color: #ffffff;
        }

        .search-hero::after {
          content: '';
          position: absolute;
          width: 280px;
          height: 280px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 50%;
          left: -100px;
          bottom: -170px;
        }

        .search-hero-icon {
          position: relative;
          z-index: 1;
          width: 64px;
          height: 64px;
          margin: 0 auto 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          color: #173f91;
          background: #ffffff;
          border: 2px solid #e2bc68;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.16);
        }

        .search-eyebrow {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 13px;
          color: #f7c25e;
          font-size: 13px;
          font-weight: 900;
        }

        .search-hero h1 {
          position: relative;
          z-index: 1;
          margin: 0;
          font-size: clamp(28px, 5vw, 46px);
          font-weight: 950;
          letter-spacing: -0.8px;
        }

        .search-hero p {
          position: relative;
          z-index: 1;
          max-width: 620px;
          margin: 14px auto 28px;
          color: rgba(255, 255, 255, 0.84);
          line-height: 1.9;
          font-size: 15px;
        }

        .search-form {
          position: relative;
          z-index: 2;
          max-width: 680px;
          min-height: 62px;
          margin: 0 auto;
          padding: 7px 8px 7px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          direction: rtl;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(16px);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
        }

        .search-form > svg {
          flex: 0 0 auto;
          color: #f7c25e;
        }

        .search-form input {
          min-width: 0;
          flex: 1;
          height: 46px;
          border: 0;
          outline: 0;
          background: transparent;
          color: #ffffff;
          font-size: 15px;
          font-family: inherit;
        }

        .search-form input::placeholder {
          color: rgba(255, 255, 255, 0.68);
        }

        .search-form button {
          flex: 0 0 auto;
          min-width: 82px;
          height: 46px;
          padding: 0 18px;
          border: 0;
          border-radius: 13px;
          background: linear-gradient(
            135deg,
            #f7c25e,
            #d5aa54
          );
          color: #17305f;
          font-family: inherit;
          font-size: 14px;
          font-weight: 950;
          cursor: pointer;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
        }

        .search-results-section {
          padding: 70px 0 90px;
        }

        .search-results-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 30px;
        }

        .section-label {
          display: block;
          margin-bottom: 7px;
          color: #d5aa54;
          font-size: 12px;
          font-weight: 950;
        }

        .search-results-header h2 {
          margin: 0;
          color: #173f91;
          font-size: clamp(23px, 4vw, 31px);
          font-weight: 950;
        }

        .clear-search {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #2455c4;
          font-size: 13px;
          font-weight: 850;
          text-decoration: none;
        }

        .search-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .search-card {
          min-width: 0;
          display: flex;
          align-items: flex-start;
          gap: 17px;
          padding: 22px;
          color: inherit;
          text-decoration: none;
          border: 1px solid rgba(36, 85, 196, 0.12);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 10px 28px rgba(23, 63, 145, 0.08);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
        }

        .search-card:hover {
          transform: translateY(-3px);
          border-color: rgba(213, 170, 84, 0.55);
          box-shadow: 0 16px 34px rgba(23, 63, 145, 0.13);
        }

        .search-card-icon {
          flex: 0 0 auto;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          color: #173f91;
          background: linear-gradient(
            145deg,
            #ffffff,
            #eef3fc
          );
          border: 1px solid rgba(213, 170, 84, 0.58);
        }

        .search-card-content {
          min-width: 0;
          flex: 1;
        }

        .search-card-content > span {
          display: block;
          margin-bottom: 4px;
          color: #d5aa54;
          font-size: 11px;
          font-weight: 900;
        }

        .search-card h3 {
          margin: 0 0 7px;
          color: #173f91;
          font-size: 18px;
          font-weight: 950;
        }

        .search-card p {
          margin: 0;
          color: #687895;
          font-size: 13px;
          line-height: 1.8;
        }

        .search-card strong {
          margin-top: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #2455c4;
          font-size: 12px;
          font-weight: 900;
        }

        .no-results {
          padding: 50px 25px;
          text-align: center;
          border: 1px solid rgba(36, 85, 196, 0.12);
          border-radius: 22px;
          background: #ffffff;
          box-shadow: 0 12px 30px rgba(23, 63, 145, 0.07);
        }

        .no-results-icon {
          width: 68px;
          height: 68px;
          margin: 0 auto 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #173f91;
          background: #eef3fc;
          border: 1px solid #d5aa54;
        }

        .no-results h3 {
          margin: 0 0 8px;
          color: #173f91;
          font-size: 21px;
          font-weight: 950;
        }

        .no-results p {
          margin: 0 auto 22px;
          color: #687895;
          line-height: 1.9;
          font-size: 14px;
        }

        .primary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 46px;
          padding: 0 18px;
          border-radius: 13px;
          color: #17305f;
          background: linear-gradient(
            135deg,
            #f7c25e,
            #d5aa54
          );
          font-size: 13px;
          font-weight: 950;
          text-decoration: none;
        }

        .search-help {
          margin-top: 35px;
          padding: 19px 21px;
          display: flex;
          align-items: center;
          gap: 15px;
          border: 1px solid rgba(213, 170, 84, 0.32);
          border-radius: 18px;
          background: linear-gradient(
            135deg,
            rgba(23, 63, 145, 0.06),
            rgba(213, 170, 84, 0.07)
          );
        }

        .search-help-icon {
          flex: 0 0 auto;
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          color: #173f91;
          background: #ffffff;
          border: 1px solid rgba(213, 170, 84, 0.5);
        }

        .search-help > div:nth-child(2) {
          min-width: 0;
          flex: 1;
        }

        .search-help strong {
          color: #173f91;
          font-size: 14px;
          font-weight: 950;
        }

        .search-help p {
          margin: 4px 0 0;
          color: #687895;
          font-size: 12px;
        }

        .search-whatsapp {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          min-height: 42px;
          padding: 0 14px;
          border-radius: 12px;
          color: #ffffff;
          background: #173f91;
          text-decoration: none;
          font-size: 12px;
          font-weight: 900;
        }

        @media (max-width: 700px) {
          .search-hero {
            padding: 55px 0 52px;
          }

          .search-form {
            min-height: 58px;
            padding-left: 7px;
          }

          .search-form button {
            min-width: 72px;
            padding: 0 13px;
          }

          .search-results-section {
            padding: 52px 0 65px;
          }

          .search-results-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 12px;
          }

          .search-grid {
            grid-template-columns: 1fr;
          }

          .search-help {
            align-items: flex-start;
            flex-wrap: wrap;
          }

          .search-whatsapp {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 420px) {
          .search-form {
            gap: 7px;
          }

          .search-form > svg {
            display: none;
          }

          .search-form input {
            font-size: 14px;
          }

          .search-card {
            padding: 17px;
          }

          .search-card-icon {
            width: 46px;
            height: 46px;
          }
        }
      `}</style>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageContent />
    </Suspense>
  )
}