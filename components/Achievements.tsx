'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Achievements() {
  const [achievementIndex, setAchievementIndex] = useState(0)
  const [achievementPaused, setAchievementPaused] = useState(false)
  const achievementImages = ['/images/hadeel-achievements.png', '/images/hadeel-achievement-test.jpg']
  useEffect(() => {
    if (achievementPaused) return
    const timer = window.setInterval(() => setAchievementIndex((current) => (current + 1) % achievementImages.length), 3000)
    return () => window.clearInterval(timer)
  }, [achievementPaused, achievementImages.length])
  return (
<section className="achievements-section container"><div className="achievements-copy"><span className="section-kicker">إنجازاتنا بالأرقام</span><h2>نتائج تُثبت<br /><em>ثقة طلابنا</em></h2><p>نفخر بكل طالب ساعدناه على تحويل التحديات الأكاديمية إلى إنجازات واضحة ونتائج ملموسة.</p><div className="achievement-stats"><div><strong>+1,200</strong><span>خدمة منجزة</span></div><div><strong>98%</strong><span>رضا العملاء</span></div><div><strong>+6</strong><span>سنوات خبرة</span></div><div><strong>24/7</strong><span>دعم ومتابعة</span></div></div></div><div className="achievements-image" onMouseEnter={() => setAchievementPaused(true)} onMouseLeave={() => setAchievementPaused(false)}><div className="achievement-slides" aria-live="polite"><Image key={achievementImages[achievementIndex]} className="achievement-slide" src={achievementImages[achievementIndex]} alt={`نموذج إنجاز أكاديمي ${achievementIndex + 1}`} fill sizes="(max-width: 800px) 100vw, 45vw" /></div><button className="achievement-arrow achievement-next" onClick={() => setAchievementIndex((achievementIndex + 1) % achievementImages.length)} aria-label="الصورة التالية"><ChevronRight size={18} /></button><button className="achievement-arrow achievement-prev" onClick={() => setAchievementIndex((achievementIndex - 1 + achievementImages.length) % achievementImages.length)} aria-label="الصورة السابقة"><ChevronLeft size={18} /></button><div className="achievement-dots">{achievementImages.map((image, index) => <button key={image} className={index === achievementIndex ? 'active' : ''} onClick={() => setAchievementIndex(index)} aria-label={`عرض الصورة ${index + 1}`} />)}</div></div></section>
  )
}
