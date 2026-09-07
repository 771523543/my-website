'use client';
import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsapp() {
  return (
    <a
      href="https://wa.me/966500000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-600 hover:scale-110 transition-all flex items-center justify-center"
      aria-label="تواصل عبر الواتساب"
    >
      <MessageCircle size={28} />
    </a>
  );
}
