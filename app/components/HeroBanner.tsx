'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

const packagesData = [
  {
    id: 'full-term',
    badge: 'راحتك طول الفصل 🎓',
    title: 'اشتراك الترم الكامل',
    subtitle: 'راحة بال وإنجاز مضمون طوال الفصل الدراسي',
    description: 'نرافقك خطوة بخطوة في رحلتك الجامعية للتعامل مع كافة متطلبات البلاك بورد والتكاليف اليومية لضمان التفوق.',
    image: '/images/banner1.png', // أو banner1.jpg حسب امتداد الملف لديك
    features: [
      'متابعة شاملة للبلاك بورد',
      'حل الواجبات والتكاليف بدقة',
      'إعداد البحوث والعروض التقديمية',
      'تنبيهات فورية للمهام ودعم طلابي مخصص',
    ],
    whatsappText: 'السلام عليكم، أرغب في الاستفسار والتسجيل في اشتراك الترم الكامل مع منصة هديل.',
  },
  {
    id: 'academic-excellence',
    badge: 'شركاؤك في النجاح 🌟',
    title: 'باقة التميز الأكاديمي',
    subtitle: 'شركاؤك في رحلتك الجامعية نحو النجاح والتميز طوال الفصل',
    description: 'حلول أكاديمية شاملة ومصممة خصيصاً للطلاب والطالبات للوصول إلى أقصى معدلات النجاح الأكاديمي.',
    image: '/images/banner2.png', // أو banner2.jpg
    features: [
      'متابعة شاملة للبلاك بورد',
      'حل الواجبات والتكاليف بدقة',
      'إعداد البحوث والعروض التقديمية',
      'إشعارات ذكية للمهام ودعم طلابي متكامل',
    ],
    whatsappText: 'السلام عليكم، أرغب في الاستفسار عن باقة التميز الأكاديمي عبر منصة هديل.',
  },
  {
    id: 'future-generation',
    badge: 'معاً نصنع التميز 🚀',
    title: 'باقة هدفنا تفوقكم!',
    subtitle: 'منصة هديل - بوابتك للتعليم المتطور',
    description: 'انضم لباقة التميز الآن واحصل على تجربة تعليمية متطورة تضمن لك الارتقاء بمستواك الأكاديمي بثقة.',
    image: '/images/banner3.png', // أو banner3.jpg
    features: [
      'حلول تعليمية وتطويرية متكاملة',
      'تجهيز وتنسيق المشاريع والبحوث',
      'إنجاز التكاليف الجامعية أولاً بأول',
      'متابعة وإشراف أكاديمي مستمر',
    ],
    whatsappText: 'السلام عليكم، أرغب في الانضمام لباقة التميز والتعرف على خدمات منصة هديل.',
  },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % packagesData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % packagesData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + packagesData.length) % packagesData.length);
  };

  const currentPkg = packagesData[currentIndex];

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem', direction: 'rtl' }}>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #3a506b 100%)',
          color: '#ffffff',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          padding: '2.5rem 2rem',
          transition: 'all 0.5s ease-in-out',
        }}
      >
        {/* أسهم التنقل */}
        <button
          onClick={prevSlide}
          aria-label="السلايد السابق"
          style={{
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            color: '#fff',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
          }}
        >
          <ChevronRight size={26} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="السلايد التالي"
          style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            color: '#fff',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
          }}
        >
          <ChevronLeft size={26} />
        </button>

        {/* محتوى الباقة */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap-reverse',
            alignItems: 'center',
            gap: '2.5rem',
            justifyContent: 'space-between',
          }}
        >
          {/* النص والبيانات */}
          <div style={{ flex: '1 1 480px', textAlign: 'right' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                padding: '0.4rem 1.2rem',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Sparkles size={16} style={{ color: '#00f2fe' }} /> {currentPkg.badge}
            </span>

            <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.4rem', color: '#ffffff' }}>
              {currentPkg.title}
            </h2>

            <p style={{ color: '#4cc9f0', fontSize: '1.05rem', fontWeight: '600', marginBottom: '0.8rem' }}>
              {currentPkg.subtitle}
            </p>

            <p style={{ color: '#e0e1dd', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              {currentPkg.description}
            </p>

            {/* شبكة المميزات */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                gap: '0.8rem',
                marginBottom: '2rem',
              }}
            >
              {currentPkg.features.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <CheckCircle2 size={18} style={{ color: '#00f2fe', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: '#f8f9fa', fontWeight: '500' }}>{feature}</span>
                </div>
              ))}
            </div>

            {/* أزرار الإجراءات */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/967776280186?text=${encodeURIComponent(currentPkg.whatsappText)}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#25d366',
                  color: '#ffffff',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  boxShadow: '0 10px 15px -3px rgba(37, 211, 102, 0.3)',
                }}
              >
                اشترك الآن عبر الواتساب <ChevronLeft size={18} />
              </a>
            </div>
          </div>

          {/* المعرض والصور */}
          <div
            style={{
              flex: '1 1 360px',
              height: '380px',
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
              border: '2px solid rgba(255,255,255,0.1)',
            }}
          >
            <Image
              src={currentPkg.image}
              alt={currentPkg.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>

        {/* المؤشرات السفلية */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '1.8rem' }}>
          {packagesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`انتقال للسلايد ${idx + 1}`}
              style={{
                width: currentIndex === idx ? '28px' : '9px',
                height: '9px',
                borderRadius: '5px',
                backgroundColor: currentIndex === idx ? '#00f2fe' : 'rgba(255, 255, 255, 0.25)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
