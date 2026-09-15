'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  CheckCircle2,
  ExternalLink,
  X,
  ChevronLeft,
} from 'lucide-react';

const packagesData = [
  {
    id: 'full-term',
    badge: 'راحتك طول الفصل 🎓',
    title: 'اشتراك الترم الكامل',
    subtitle: 'راحة بال وإنجاز مضمون طوال الفصل الدراسي',
    description: 'نرافقك خطوة بخطوة في رحلتك الجامعية للتعامل مع كافة متطلبات البلاك بورد والتكاليف اليومية.',
    image: '/images/banner1.png',
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
    description: 'حلول أكاديمية شاملة ومصممة خصيصاً للطلاب والطالبات للوصول إلى أقصى معدلات النجاح.',
    image: '/images/banner2.png',
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
    description: 'انضم لباقة التميز الآن واحصل على تجربة تعليمية متطورة تضمن لك الارتقاء بمستواك.',
    image: '/images/banner3.png',
    features: [
      'حلول تعليمية وتطويرية متكاملة',
      'تجهيز وتنسيق المشاريع والبحوث',
      'إنجاز التكاليف الجامعية أولاً بأول',
      'متابعة وإشراف أكاديمي مستمر',
    ],
    whatsappText: 'السلام عليكم، أرغب في الانضمام لباقة التميز والتعرف على خدمات منصة هديل.',
  },
];

export default function PackagesSection() {
  const [openPackageId, setOpenPackageId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setOpenPackageId(openPackageId === id ? null : id);
  };

  return (
    <div
      id="packages"
      style={{
        maxWidth: '1200px',
        margin: '4rem auto',
        padding: '0 1rem',
        direction: 'rtl',
      }}
    >
      {/* رأس القسم مع تأثير ظهور تدريجي */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span
          style={{
            display: 'inline-block',
            backgroundColor: 'rgba(0, 242, 254, 0.1)',
            padding: '0.4rem 1.2rem',
            borderRadius: '50px',
            fontSize: '0.85rem',
            color: '#00f2fe',
            marginBottom: '0.8rem',
            border: '1px solid rgba(0, 242, 254, 0.25)',
            boxShadow: '0 0 15px rgba(0, 242, 254, 0.15)',
          }}
        >
          حلول أكاديمية مصممة لأهدافك
        </span>
        <h2 style={{ fontSize: '2.4rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.6rem' }}>
          اختر الباقة المناسبة لنجاحك
        </h2>
        <p style={{ color: '#4cc9f0', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          باقات مرنة تمنحك التنظيم والدعم الأكاديمي الذي تحتاجه لتكمل رحلتك الجامعية بثقة.
        </p>
      </div>

      {/* شبكة البطاقات */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {packagesData.map((pkg) => {
          const isOpen = openPackageId === pkg.id;

          return (
            <div
              key={pkg.id}
              style={{
                background: 'linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #3a506b 100%)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: isOpen 
                  ? '0 25px 35px -5px rgba(0, 242, 254, 0.25)' 
                  : '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
                border: isOpen ? '1px solid #00f2fe' : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isOpen ? 'translateY(-6px)' : 'translateY(0)',
              }}
            >
              {/* الحالة العادية للبطاقة */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  opacity: isOpen ? 0 : 1,
                  maxHeight: isOpen ? '0px' : '1000px',
                  overflow: 'hidden',
                  transition: 'all 0.35s ease-in-out',
                  pointerEvents: isOpen ? 'none' : 'auto',
                }}
              >
                {/* صورة الباقة مع تأثير تكبير خفيف */}
                <div style={{ height: '210px', position: 'relative', width: '100%', overflow: 'hidden' }}>
                  <Image 
                    src={pkg.image} 
                    alt={pkg.title} 
                    fill 
                    style={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }} 
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      backgroundColor: 'rgba(11, 19, 43, 0.85)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.35rem 1rem',
                      borderRadius: '50px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      color: '#00f2fe',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <Sparkles size={14} style={{ display: 'inline', marginLeft: '4px' }} />
                    {pkg.badge}
                  </div>
                </div>

                {/* النصوص */}
                <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.4rem' }}>
                    {pkg.title}
                  </h3>

                  <p style={{ color: '#4cc9f0', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.8rem' }}>
                    {pkg.subtitle}
                  </p>

                  <p style={{ color: '#e0e1dd', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.8rem' }}>
                    {pkg.description}
                  </p>

                  {/* زر تفاصيل الباقة المتحرك */}
                  <div style={{ marginTop: 'auto' }}>
                    <button
                      onClick={() => toggleDetails(pkg.id)}
                      style={{
                        width: '100%',
                        backgroundColor: '#00f2fe',
                        color: '#0b132b',
                        border: 'none',
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(0, 242, 254, 0.3)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <span>تفاصيل الباقة</span>
                      <ChevronLeft size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* حالة فتح التفاصيل (تظهر بسلاسة عند الضغط) */}
              <div
                style={{
                  padding: '1.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  minHeight: '460px',
                  opacity: isOpen ? 1 : 0,
                  maxHeight: isOpen ? '1000px' : '0px',
                  overflow: 'hidden',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: isOpen ? 'relative' : 'absolute',
                  width: '100%',
                  pointerEvents: isOpen ? 'auto' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                  <h4 style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: 'bold' }}>
                    ماذا تشمل هذه الباقة؟
                  </h4>
                  <button
                    onClick={() => toggleDetails(pkg.id)}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* قائمة الميزات مع حركة انسيابية للعناصر */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                  {pkg.features.map((feature, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: 'rgba(255, 255, 255, 0.06)',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <span style={{ fontSize: '0.88rem', color: '#f8f9fa', fontWeight: '500' }}>
                        {feature}
                      </span>
                      <CheckCircle2 size={20} style={{ color: '#00f2fe', flexShrink: '0' }} />
                    </div>
                  ))}
                </div>

                {/* أزرار الإجراءات داخل تفاصيل الباقة */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  <a
                    href={`https://wa.me/967776280186?text=${encodeURIComponent(pkg.whatsappText)}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      backgroundColor: '#25d366',
                      color: '#ffffff',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      boxShadow: '0 8px 20px rgba(37, 211, 102, 0.35)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    اشترك الآن عبر الواتساب
                    <ExternalLink size={16} />
                  </a>

                  <button
                    onClick={() => toggleDetails(pkg.id)}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      padding: '0.75rem 1rem',
                      `borderRadius`: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    إخفاء التفاصيل
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
