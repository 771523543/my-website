'use client';
import React, { useState } from 'react';
import { faqsData } from '../data/siteData';
import { ChevronDown } from 'lucide-react';

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">الأسئلة الشائعة</h2>
        <div className="space-y-4">
          {faqsData.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 text-right font-bold text-slate-800 flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown size={20} className={`transition-transform ${openIdx === idx ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>
              {openIdx === idx && (
                <div className="p-5 pt-0 text-slate-600 border-t border-slate-100 leading-relaxed text-sm">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
