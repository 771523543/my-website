'use client';
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', service: 'بحوث أبحاث وأوراق علمية', details: '' });

  const handleSendWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `السلام عليكم، أرغب في الاستفسار عن خدمة:\n*الاسم:* ${formData.name}\n*رقم التواصل:* ${formData.phone}\n*الخدمة:* ${formData.service}\n*التفاصيل:* ${formData.details}`;
    window.open(`https://wa.me/966500000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">تواصل معنا والطلب المباشر</h2>
          <p className="text-slate-600">أرسل طلبك مباشرة وسنرد عليك بالسرعة الممكنة</p>
        </div>

        <form onSubmit={handleSendWhatsapp} className="bg-slate-50 border border-slate-100 p-8 rounded-2xl shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">الاسم الكريم</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسمك"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">رقم الجوال / الواتساب</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="05xxxxxxxx"
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">نوع الخدمة المطلوب</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-600"
            >
              <option value="بحوث أبحاث وأوراق علمية">بحوث وأوراق علمية</option>
              <option value="عروض تقديمية باوربوينت">عروض تقديمية (PowerPoint)</option>
              <option value="حل واجبات وتكليفات">حل واجبات وتكليفات</option>
              <option value="تصميم سيرة ذاتية CV">تصميم سيرة ذاتية (CV)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">تفاصيل الطلب</label>
            <textarea
              rows={4}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="اذكر التفاصيل، التخصص، أو عدد الصفحات..."
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-600"
            ></textarea>
          </div>

          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
            <MessageCircle size={20} /> إرسال عبر الواتساب مباشرة
          </button>
        </form>
      </div>
    </section>
  );
}
