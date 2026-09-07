'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowLeft, ChevronLeft, MessageCircle, Share2, Sparkles, X } from 'lucide-react'
import { servicesDetailsData } from '../data/siteData'

const whatsapp = 'https://wa.me/967776280186'

export default function Services() {
  const [selectedDetailService, setSelectedDetailService] = useState<typeof servicesDetailsData[0] | null>(null)
  const [formData, setFormData] = useState({ studentName: '', universityId: '', notes: '', fileName: '' })
  const [activeCategory, setActiveCategory] = useState<'all' | 'research' | 'design' | 'academic'>('all')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const handleCopyServiceLink = (serviceTitle: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setToastMessage(`تم نسخ رابط خدمة "${serviceTitle}" بنجاح!`)
      setTimeout(() => setToastMessage(null), 3000)
    }
  }
  const filteredServices = activeCategory === 'all' ? servicesDetailsData : servicesDetailsData.filter(s => s.category === activeCategory)
  const marqueeServices = [...filteredServices, ...filteredServices, ...filteredServices]
  const handleSendToWhatsapp = () => {
    if (!selectedDetailService) return
    let message = `مرحباً منصة هديل، أرغب بطلب خدمة: *${selectedDetailService.title}*\n\n`
    message += `👤 *اسم الطالب/الطالبة:* ${formData.studentName || 'لم يحدد'}\n`
    message += `🎓 *الرقم الجامعي:* ${formData.universityId || 'لم يحدد'}\n`
    if (formData.fileName) message += `📎 *اسم/وصف الملف المرفق:* ${formData.fileName}\n`
    if (formData.notes) message += `📝 *ملاحظات وإرشادات:* ${formData.notes}\n`
    message += `\nأرجو التواصل معي لتأكيد الطلب والتفاصيل.`
    window.open(`${whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }
  return (
    <>
      <style jsx global>{`
        @keyframes servicesMarquee { 0% { transform: translateX(0); } 100% { transform: translateX(33.333%); } }
        .services-marquee-track { display: flex; gap: 1.5rem; width: max-content; animation: servicesMarquee 35s linear infinite; }
        .services-marquee-container:hover .services-marquee-track { animation-play-state: paused; }
      `}</style>
      {toastMessage && (
        <div style={{ position: 'fixed', bottom: '20px', left: '20px', backgroundColor: '#10b981', color: '#fff', padding: '0.8rem 1.2rem', borderRadius: '8px', zIndex: 99999, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', fontWeight: 'bold', fontSize: '0.9rem' }}>
          {toastMessage}
        </div>
      )}
{/* قسم الخدمات التفاعلي المتحرك تلقائياً */}
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

  {/* مرشح/فلتر الخدمات */}
  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
    <button onClick={() => setActiveCategory('all')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #10b981', background: activeCategory === 'all' ? '#10b981' : 'transparent', color: activeCategory === 'all' ? '#fff' : 'inherit', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.88rem' }}>الكل</button>
    <button onClick={() => setActiveCategory('research')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #10b981', background: activeCategory === 'research' ? '#10b981' : 'transparent', color: activeCategory === 'research' ? '#fff' : 'inherit', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.88rem' }}>بحوث وتقارير</button>
    <button onClick={() => setActiveCategory('design')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #10b981', background: activeCategory === 'design' ? '#10b981' : 'transparent', color: activeCategory === 'design' ? '#fff' : 'inherit', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.88rem' }}>تصاميم وعروض</button>
    <button onClick={() => setActiveCategory('academic')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #10b981', background: activeCategory === 'academic' ? '#10b981' : 'transparent', color: activeCategory === 'academic' ? '#fff' : 'inherit', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.88rem' }}>خدمات ومتابعة</button>
  </div>

  {/* حاوية الحركة التلقائية للخدمات */}
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
            {/* تم تعديل المحاذاة للنص والأيقونة للوسط بالكامل */}
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

  {/* النافذة المنبثقة للخدمة */}
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
    </>
  )
}
