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
      'المؤهلات العلمية، الخبرات، والدورات.'
    ]
  }
]

export default function Page() {
  const [formData, setFormData] = useState({ fileName: '', notes: '' })
  const [achievementIndex, setAchievementIndex] = useState(0)
  const [achievementPaused, setAchievementPaused] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [selectedService, setSelectedService] = useState(servicesDetailsData[0])

  const achievementImages = [
    '/images/achievement-1.png',
    '/images/achievement-2.png',
    '/images/achievement-3.png'
  ]

  const generalFaqs = [
    { q: 'كيف يتم تسليم الأعمال المطلوبة؟', a: 'يتم تسليم الأعمال عبر الواتساب أو البريد الإلكتروني بالصيغة المطلوبة (Word, PDF, PowerPoint).' },
    { q: 'هل توجد تعديلات بعد إتمام العمل؟', a: 'نعم، نضمن لك تعديلات مجانية ومستمرة حتى تكون راضياً عن النتيجة النهائية.' },
    { q: 'ما هي طرق الدفع المتاحة؟', a: 'نوفر عدة طرق دفع مرنة تناسب الطلاب والعملاء.' }
  ]

  return (
    <main>
      <section className="section container">
        <div>
          <input 
            type="text" 
            placeholder="أدخل عنوان الملف أو رابط جوجل درايف" 
            value={formData.fileName} 
            onChange={(e) => setFormData({ ...formData, fileName: e.target.value })} 
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.88rem' }} 
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem', fontWeight: 'bold', textAlign: 'right' }}>ملاحظات وإرشادات إضافية</label>
          <textarea 
            rows={2} 
            placeholder="أدخل أي شروط خاصة أو موعد التسليم..." 
            value={formData.notes} 
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })} 
            style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.88rem' }} 
          />
        </div>
        <button 
          type="submit" 
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#25D366', color: '#fff', border: 'none', padding: '0.7rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', marginTop: '0.4rem' }}
        >
          تأكيد وإرسال الطلب عبر الواتساب <MessageCircle size={18} />
        </button>
      </section>

      <HeroBanner />

      <section id="gpa-calculator" className="section soft-section container" style={{ marginTop: '2rem', borderRadius: '16px', padding: '2rem' }}>
        <div className="center-heading">
          <span className="section-kicker">أداة تفاعلية</span>
          <h2>حاسبة <em>المعدل التراكمي (GPA)</em></h2>
          <p>احسب معدلك الفصلي والتراكمي بسهولة ودقة وفق السلم الأكاديمي المعتمد.</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '2rem auto 0', background: '#fff', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '0.95rem' }}>
            أدخل المواد والساعات لحساب معدلك بكل إتقان وسهولة.
          </p>
        </div>
      </section>

      <section className="achievements-section container">
        <div className="achievements-copy">
          <span className="section-kicker">إنجازاتنا بالأرقام</span>
          <h2>نتائج تُثبت<br /><em>ثقة طلابنا</em></h2>
          <p>نفخر بكل طالب ساعدناه على تحويل التحديات الأكاديمية إلى إنجازات واضحة ونتائج ملموسة.</p>
          <div className="achievement-stats">
            <div><strong>+1,200</strong><span>خدمة منجزة</span></div>
            <div><strong>98%</strong><span>رضا العملاء</span></div>
            <div><strong>+6</strong><span>سنوات خبرة</span></div>
            <div><strong>24/7</strong><span>دعم ومتابعة</span></div>
          </div>
        </div>
        <div 
          className="achievements-image" 
          onMouseEnter={() => setAchievementPaused(true)} 
          onMouseLeave={() => setAchievementPaused(false)}
        >
          <div className="achievement-slides" aria-live="polite">
            <Image 
              key={achievementImages[achievementIndex]} 
              className="achievement-slide" 
              src={achievementImages[achievementIndex]} 
              alt={`نموذج إنجاز أكاديمي ${achievementIndex + 1}`} 
              fill 
              sizes="(max-width: 800px) 100vw, 45vw" 
            />
          </div>
          <button className="achievement-arrow achievement-next" onClick={() => setAchievementIndex((achievementIndex + 1) % achievementImages.length)} aria-label="الصورة التالية">
            <ChevronRight size={18} />
          </button>
          <button className="achievement-arrow achievement-prev" onClick={() => setAchievementIndex((achievementIndex - 1 + achievementImages.length) % achievementImages.length)} aria-label="الصورة السابقة">
            <ChevronLeft size={18} />
          </button>
          <div className="achievement-dots">
            {achievementImages.map((image, index) => (
              <button key={image} className={index === achievementIndex ? 'active' : ''} onClick={() => setAchievementIndex(index)} aria-label={`عرض الصورة ${index + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="why-section">
        <div className="container why-inner">
          <div>
            <span className="section-kicker">لماذا تختار منصة هديل؟</span>
            <h2>معك من أول فكرة<br /><em>حتى التسليم النهائي</em></h2>
            <p>فريق متخصص، تواصل واضح، وجودة نراجعها معك خطوة بخطوة.</p>
          </div>
          <div className="feature-list">
            <div><Check /><span><strong>سرعة فائقة في الإنجاز</strong><small>تنفيذ وتسليم في وقت قياسي.</small></span></div>
            <div><Check /><span><strong>جودة أكاديمية عالية</strong><small>مراجعة تدقيقية متكاملة لجميع الأعمال.</small></span></div>
            <div><Check /><span><strong>دعم ومتابعة مستمرة</strong><small>تواصل وتعديل حتى اعتماد العمل نهائيًا.</small></span></div>
          </div>
        </div>
      </section>

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

      <section id="contact" className="cta-section container">
        <div>
          <span className="section-kicker">جاهز تبدأ؟</span>
          <h2>خلّنا ننجزها <em>معًا</em></h2>
          <p>تواصل معنا الآن واحصل على استشارة مجانية لخدمتك.</p>
        </div>
        <a className="light-button" href={whatsapp} target="_blank" rel="noreferrer">
          <MessageCircle size={18} /> تواصل عبر واتساب
        </a>
      </section>
      
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a className="brand footer-brand" href="#top">
              <span className="brand-mark">هـ</span>
              <span>منصة هديل<span className="brand-dot">.</span></span>
            </a>
            <p>منصة هديل للخدمات الطلابية والأكاديمية، شريكك نحو إنجاز أكاديمي أفضل.</p>
          </div>
          <div>
            <h4>روابط سريعة</h4>
            <a href="#story">قصتنا</a>
            <a href="#services">خدماتنا</a>
            <a href="#gpa-calculator">حاسبة المعدل</a>
            <a href="#testimonials">آراء العملاء</a>
          </div>
          <div>
            <h4>تواصل معنا</h4>
            <a href="mailto:Hadeelmubarak387@gmail.com">Hadeelmubarak387@gmail.com</a>
          </div>
          <div className="footer-note">
            <MessageCircle size={30} />
            <h4>تحتاج مساعدة؟</h4>
            <p>فريقنا جاهز للإجابة عن استفساراتك.</p>
            <a className="footer-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">
              راسلنا مباشرة <ArrowLeft size={15} />
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 منصة هديل للخدمات الطلابية والأكاديمية. جميع الحقوق محفوظة.</span>
          <span>صُنع بعناية للطلاب والباحثين</span>
        </div>
      </footer>

      <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="تواصل معنا عبر واتساب">
        <img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/whatsapp/default.svg" alt="واتساب" />
        <span>تواصل معنا</span>
      </a>
    </main>
  )
}
