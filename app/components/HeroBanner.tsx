'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ChevronLeft } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      borderRadius: '20px',
      margin: '1.5rem 0 2.5rem',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
      color: '#ffffff',
      padding: '2rem',
      boxShadow: '0 10px 25px rgba(37, 99, 235, 0.2)',
      direction: 'rtl'
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'center', gap: '2rem' }}>
        
        {/* النص والإعلان */}
        <div style={{ flex: '1 1 300px', textAlign: 'right' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '6px 16px',
            borderRadius: '50px',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            <Sparkles size={16} /> مع بداية الترم
          </span>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem', color: '#fff' }}>
            خدمة اشتراك الترم كامل 🎓
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#e0f2fe', marginBottom: '1.5rem' }}>
            إذا مشغول وتبغى مساعدة في الأعمال الفصلية ومتابعة البلاك بورد، الاشتراك يشمل: متابعة البلاك كامل، حل الواجبات، الكويزات، البحوث، المشاريع، البوربوينت لضمان الدرجة الكاملة!
          </p>

          <a href="#services" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffffff',
            color: '#1e3a8a',
            padding: '0.8rem 1.8rem',
            borderRadius: '12px',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '1rem'
          }}>
            اشترك الآن <ChevronLeft size={18} />
          </a>
        </div>

        {/* الصورة الإعلانية */}
        <div style={{ flex: '1 1 300px', position: 'relative', height: '240px', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
          <Image src="/images/banner1.jpg" alt="اشتراك الترم كامل" fill style={{ objectFit: 'cover' }} priority />
        </div>

      </div>
    </div>
  );
}

