'use client';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
            هديل
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900 block leading-none">منصة هديل</span>
            <span className="text-xs text-slate-500 font-medium">للخدمات الطلابية والأكاديمية</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <a href="#services" className="hover:text-blue-600 transition-colors">الخدمات</a>
          <a href="#gpa" className="hover:text-blue-600 transition-colors">حاسبة المعدل</a>
          <a href="#faq" className="hover:text-blue-600 transition-colors">الأسئلة الشائعة</a>
          <a href="#contact" className="hover:text-blue-600 transition-colors">تواصل معنا</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all">
            اطلب خدمتك الآن
          </a>
        </div>

        <button className="md:hidden text-slate-700 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-6 flex flex-col gap-4">
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-medium py-2">الخدمات</a>
          <a href="#gpa" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-medium py-2">حاسبة المعدل</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-medium py-2">الأسئلة الشائعة</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-medium py-2">تواصل معنا</a>
        </div>
      )}
    </header>
  );
}
