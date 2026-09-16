'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ExternalLink,
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
  // تتبع أي باقة مفتوحة حالياً (حسب الـ id)
  const [openPackageId, setOpenPackageId] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setOpenPackageId(openPackageId === id ? null : id);
  };

  return (
    <div
      id="packages"
      style={{
        maxWidth: '1200px',
        margin: '3rem auto',
        padding: '0 1rem',
        direction: 'rtl',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#ffffff', marginBottom: '0.5rem' }}>
          باقات منصة هديل الأكاديمية
        </h2>
        <p style={{ color: '#4cc9f0', fontSize: '1.1rem' }}>
          اختر الباقة المناسبة لك واضمن تفوقك الدراسي بكل سهولة
        </p>
      </div>

      {/* شبكة عرض الباقات */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
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
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
              }}
            >
              {/* صورة الباقة */}
              <div
                style={{
                  height: '220px',
                  position: 'relative',
                  width: '100%',
                }}
              >
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    backgroundColor: 'rgba(11, 19, 43, 0.85)',
                    backdropFilter: 'blur(6px)',
                    padding: '0.3rem 0.9rem',
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

              {/* محتوى البطاقة الأساسي */}
              <div style={{ padding: '1.8rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: '#ffffff',
                    marginBottom: '0.4rem',
                  }}
                >
                  {pkg.title}
                </h3>

                <p
                  style={{
                    color: '#4cc9f0',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    marginBottom: '0.8rem',
                  }}
                >
                  {pkg.subtitle}
                </p>

                <p
                  style={{
                    color: '#e0e1dd',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                  }}
                >
                  {pkg.description}
                </p>

                {/* زر تفاصيل الباقة */}
                <button
                  onClick={() => toggleDetails(pkg.id)}
                  style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease',
                    marginBottom: '1rem',
                  }}
                >
                  <span>تفاصيل الباقة ومميزاتها</span>
                  {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>

                {/* قسم التفاصيل المنسدل (يظهر عند الضغط) */}
                {isOpen && (
                  <div
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      padding: '1.2rem',
                      borderRadius: '12px',
                      marginBottom: '1.2rem',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      animation: 'fadeIn 0.3s ease-in-out',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.8rem',
                      }}
                    >
                      {pkg.features.map((feature, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                          }}
                        >
                          <CheckCircle2
                            size={18}
                            style={{
                              color: '#00f2fe',
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: '0.88rem',
                              color: '#f8f9fa',
                              fontWeight: '500',
                            }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* زر الواتساب في الأسفل */}
                <div style={{ marginTop: 'auto' }}>
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
                      padding: '0.85rem 1.5rem',
                      borderRadius: '12px',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      boxShadow: '0 10px 15px -3px rgba(37, 211, 102, 0.3)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    اشترك الآن عبر الواتساب
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
