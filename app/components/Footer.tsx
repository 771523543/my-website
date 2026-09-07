'use client';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
            هديل
          </div>
          <span className="text-white font-bold text-lg">منصة هديل للخدمات الطلابية</span>
        </div>
        <p className="text-sm text-center">جميع الحقوق محفوظة © {new Date().getFullYear()} منصة هديل</p>
      </div>
    </footer>
  );
}
