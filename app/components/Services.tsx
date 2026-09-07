'use client';
import React, { useState } from 'react';
import { servicesData } from '../data/siteData';
import { ArrowRight, Copy, CheckCircle, X } from 'lucide-react';

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredServices = activeCategory === 'all' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeCategory);

  const handleCopyLink = (id: number) => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">خدماتنا الأكاديمية</h2>
          <p className="text-slate-600">نغطي كافة احتياجاتك الأكاديمية والتنفيذية بأعلى جودة احترافية</p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'research', label: 'البحوث والترجمة' },
              { id: 'academic', label: 'التكليفات والتقارير' },
              { id: 'design', label: 'التصاميم والـ CV' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeCategory === cat.id ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.desc}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                  <button onClick={() => setSelectedService(service)} className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1">
                    التفاصيل <ArrowRight size={16} className="rotate-180" />
                  </button>
                  <button onClick={() => handleCopyLink(service.id)} className="text-slate-400 hover:text-slate-600 p-2 rounded-lg transition-colors">
                    {copiedId === service.id ? <CheckCircle size={18} className="text-green-600" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button onClick={() => setSelectedService(null)} className="absolute top-4 left-4 text-slate-400 hover:text-slate-600 p-1">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{selectedService.title}</h3>
            <p className="text-slate-600 leading-relaxed mb-6">{selectedService.desc}</p>
            <a href="#contact" onClick={() => setSelectedService(null)} className="block w-full bg-blue-600 text-white text-center font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors">
              اطلب هذه الخدمة الآن
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
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
