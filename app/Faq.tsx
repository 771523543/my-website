'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { generalFaqs } from '../data/siteData'

export default function Faq() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  return (
    <>
{/* قسم الأسئلة الشائعة العامة (FAQ Accordion) */}
<section id="faq" className="section container">
  <div className="center-heading">
    <span className="section-kicker">الأسئلة الشائعة</span>
    <h2>إجابات عن <em>استفساراتك</em></h2>
    <p>إليك إجابات لأبرز الأسئلة والاستفسارات الشائعة حول خدماتنا وطريقة التعامل.</p>
  </div>

  <div style={{ maxWidth: '750px', margin: '2rem auto 0', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
    {generalFaqs.map((faq, idx) => (
      <div key={idx} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', overflow: 'hidden', background: '#fff' }}>
        <button 
          onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.2rem', border: 'none', background: 'transparent', textAlign: 'right', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', color: '#111827' }}
        >
          <span>{faq.q}</span>
          <ChevronDown size={18} style={{ transform: openFaqIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
        </button>
        {openFaqIndex === idx && (
          <div style={{ padding: '0 1.2rem 1rem', fontSize: '0.88rem', color: '#4b5563', lineHeight: '1.6', borderTop: '1px solid #f3f4f6', paddingTop: '0.8rem', textAlign: 'right' }}>
            {faq.a}
          </div>
        )}
      </div>
    ))}
  </div>
</section>
    </>
  )
}
