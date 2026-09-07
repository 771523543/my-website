'use client'

import { Star } from 'lucide-react'
import { testimonialsData } from '../data/siteData'

export default function Testimonials() {
  return (
    <>
{/* قسم آراء العملاء والتجارب */}
<section id="testimonials" className="section container">
  <div className="center-heading">
    <span className="section-kicker">آراء العملاء</span>
    <h2>ماذا يقول <em>طلابنا عنّا؟</em></h2>
    <p>تجارب حقيقية لطلاب وباحثين اعتمدوا على منصتنا لتسيير أبحاثهم ومسيرتهم الأكاديمية.</p>
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
    {testimonialsData.map((t, i) => (
      <div key={i} style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', color: '#f59e0b', marginBottom: '0.8rem' }}>
          {[...Array(t.rating)].map((_, starIndex) => <Star key={starIndex} size={16} fill="#f59e0b" />)}
        </div>
        <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: '1.6', marginBottom: '1rem' }}>"{t.text}"</p>
        <div>
          <strong style={{ display: 'block', fontSize: '0.92rem', color: '#111827' }}>{t.name}</strong>
          <small style={{ color: '#6b7280', fontSize: '0.8rem' }}>{t.role}</small>
        </div>
      </div>
    ))}
  </div>
</section>
    </>
  )
}
