'use client';
import React from 'react';
import { Sparkles, ArrowRight, Calculator, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          <Sparkles size={16} /> شريكك الأكاديمي الموثوق
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
          نحقق لك <span className="text-blue-600">التميز الأكاديمي</span> بسهولة وإتقان
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          نقدم أفضل الخدمات الطلابية والأكاديمية بكفاءة عالية، من إعداد البحوث المعتمدة وحتى التنسيق والتصميم الاحترافي لضمان نجاحك.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2">
            ابدأ مشروعك الآن <ArrowRight size={20} className="rotate-180" />
          </a>
          <a href="#gpa" className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold shadow-sm transition-all flex items-center justify-center gap-2">
            حاسبة المعدل التراكمي <Calculator size={20} />
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { title: 'جودة عالية', desc: 'معايير أكاديمية دقيقة' },
            { title: 'تسليم سريع', desc: 'التزام كامل بالمواعيد' },
            { title: 'سرية تامة', desc: 'حماية كاملة للبيانات' },
            { title: 'دعم مستمر', desc: 'تواصل مباشر مع الفريق' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur p-4 rounded-xl border border-slate-100 shadow-sm text-center">
              <CheckCircle className="text-blue-600 mx-auto mb-2" size={24} />
              <h4 className="font-bold text-slate-800">{item.title}</h4>
              <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
