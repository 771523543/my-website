'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Share2, ChevronLeft, Sparkles, Headphones, GraduationCap, FileText, Layout, CheckCircle } from 'lucide-react'

// قائمة الخدمات (يمكنك تعديلها أو ربطها ببياناتك)
const servicesData = [
  {
    id: '1',
    title: 'الدعوات الإلكترونية',
    shortText: 'بطاقات تخرج ومناسبات بتصاميم حديثة ومميزة تناسب ذوقك.',
    image: '/images/invitation.jpg', // استبدل بمسار صورتك
    icon: Sparkles,
  },
  {
    id: '2',
    title: 'متابعة مواد البلاك بورد',
    shortText: 'إدارة ومتابعة المقررات والمحاضرات والاختبارات طوال الترم.',
    image: '/images/blackboard.jpg', // استبدل بمسار صورتك
    icon: Headphones,
  },
  {
    id: '3',
    title: 'حل الواجبات والتكاليف',
    shortText: 'مساعدة شاملا وأكاديمية في حل الأبحاث والواجبات اليومية.',
    image: '/images/homework.jpg', // استبدل بمسار صورتك
    icon: GraduationCap,
  },
  {
    id: '4',
    title: 'عروض تقديمية (PowerPoint)',
    shortText: 'تصميم شرائح احترافية وجذابة لشرح المشاريع والمحاضرات.',
    image: '/images/presentation.jpg', // استبدل بمسار صورتك
    icon: Layout,
  }
]

export default function HomePage() {
  const [services] = useState(servicesData)
  const [selectedDetailService, setSelectedDetailService] = useState<any>(null)

  // دالة مشاركة الخدمة
  const handleCopyServiceLink = (title: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
      alert(`تم نسخ رابط خدمة: ${title}`)
    }
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f9fafb', direction: 'rtl' }}>
      
      {/* هيدر المنصة */}
      <header style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1e3a8a' }}>منصة هديل</h1>
      </header>

      {/* قسم الخدمات - حركة تلقائية وبطاقات كبيرة */}
      <section className="services-section" style={{ padding: '3rem 0', overflow: 'hidden' }}>
        
        {/* عنوان القسم */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#111827' }}>خدماتنا المميزة</h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', marginTop: '0.4rem' }}>تصفح أبرز الخدمات الأكاديمية والتصميمية</p>
        </div>

        {/* حاوية الحركة المستمرة */}
        <div 
          className="infinite-scroll-container"
          style={{ 
            overflow: 'hidden', 
            width: '100%', 
            padding: '1.5rem 0',
            position: 'relative'
          }}
        >
          <div className="infinite-scroll-track">
            {/* تكرار القائمة لمشهد حركي دائم وبدون فراغات */}
            {[...services, ...services].map((service, index) => {
              const Icon = service.icon
              return (
                <article 
                  key={`${service.id}-${index}`} 
                  className="service-card" 
                  style={{ 
                    position: 'relative', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    direction: 'rtl',
                    width: '340px',             /* تكبير عرض البطاقة */
                    minHeight: '440px',          /* تكبير طول البطاقة */
                    flex: '0 0 auto',
                    borderRadius: '20px',        /* زوايا دائرية أكبر وأنيقة */
                    backgroundColor: '#ffffff',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.07)',
                    overflow: 'hidden',
                    border: '1px solid #e5e7eb'
                  }}
                >
                  {/* زر المشاركة */}
                  <button 
                    onClick={() => handleCopyServiceLink(service.title)}
                    title="مشاركة/نسخ رابط الخدمة"
                    style={{ 
                      position: 'absolute', 
                      top: '14px', 
                      left: '14px', 
                      zIndex: 10, 
                      background: 'rgba(255,255,255,0.92)', 
                      border: 'none', 
                      borderRadius: '50%', 
                      width: '38px', 
                      height: '38px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      cursor: 'pointer', 
                      boxShadow: '0 3px 8px rgba(0,0,0,0.15)' 
                    }}
                  >
                    <Share2 size={18} style={{ color: '#333' }} />
                  </button>

                  {/* صورة الخدمة بحجم أكبر */}
                  <div className="service-image" style={{ width: '100%', height: '200px', position: 'relative' }}>
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      sizes="350px" 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>

                  {/* محتوى البطاقة - كل المكونات في الوسط */}
                  <div 
                    className="service-content" 
                    style={{ 
                      padding: '1.5rem', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      textAlign: 'center', 
                      flex: 1 
                    }}
                  >
                    
                    {/* الأيقونة بارزة في الوسط */}
                    <div 
                      className="service-icon" 
                      style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        background: '#eff6ff', 
                        color: '#2563eb', 
                        padding: '0.85rem', 
                        borderRadius: '18px', 
                        marginBottom: '0.85rem' 
                      }}
                    >
                      <Icon size={30} />
                    </div>

                    {/* العنوان في الوسط */}
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.6rem 0', textAlign: 'center' }}>
                      {service.title}
                    </h3>

                    {/* النص/الوصف في الوسط */}
                    <p style={{ fontSize: '0.95rem', color: '#4b5563', lineHeight: '1.6', margin: '0 0 1.5rem 0', textAlign: 'center' }}>
                      {service.shortText}
                    </p>

                    {/* زر الطلب في الأسفل */}
                    <button 
                      className="primary-button" 
                      style={{ 
                        width: '100%', 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center', 
                        gap: '0.5rem',
                        fontSize: '0.98rem', 
                        padding: '0.75rem 1.25rem', 
                        marginTop: 'auto',
                        borderRadius: '12px',
                        fontWeight: '600',
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedDetailService(service)}
                    >
                      تفاصيل الخدمة والطلب <ChevronLeft size={18} />
                    </button>

                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

    </main>
  )
}
