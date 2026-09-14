'use client'

import Image from 'next/image'
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'
import HeroBanner from './components/HeroBanner';

const whatsapp = 'https://wa.me/967776280186'

export default function Page() {
  const [formData, setFormData] = useState({ fileName: '', notes: '' })
  const [achievementIndex, setAchievementIndex] = useState(0)
  const [achievementPaused, setAchievementPaused] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const achievementImages = [
    '/images/hadeel-achievement-test.jpg',
    '/images/hadeel-achievements.png'
  ]

  const generalFaqs = [
    { q: 'كيف يتم تسليم الأعمال المطلوبة؟', a: 'يتم تسليم الأعمال عبر الواتساب أو البريد الإلكتروني بالصيغة المطلوبة (Word, PDF, PowerPoint).' },
    { q: 'هل توجد تعديلات بعد إتمام العمل؟', a: 'نعم، نضمن لك تعديلات مجانية ومستمرة حتى تكون راضياً عن النتيجة النهائية.' },
    { q: 'ما هي طرق الدفع المتاحة؟', a: 'نوفر عدة طرق دفع مرنة تناسب الطلاب والعملاء.' }
  ]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = [
      'السلام عليكم، أرغب في طلب خدمة من منصة هديل.',
      formData.fileName ? `عنوان الملف أو الرابط: ${formData.fileName}` : '',
      formData.notes ? `الملاحظات: ${formData.notes}` : '',
    ].filter(Boolean).join('\n')

    window.open(`${whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main id="top">
      <form className="section container" onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            placeholder="أدخل عنوان الملف أو رابط جوجل درايف"
            required 
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
      </form>

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

      <section id="achievements" className="achievements-section container">
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
            <a href="#why">لماذا نحن</a>
            <a href="#services">خدماتنا</a>
            <a href="#gpa-calculator">حاسبة المعدل</a>
            <a href="#faq">الأسئلة الشائعة</a>
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
