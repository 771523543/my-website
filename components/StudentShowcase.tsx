'use client'

import Image from 'next/image'
import { BookOpen, Check, Headphones, Presentation, Sparkles } from 'lucide-react'

export default function StudentShowcase() {
  return (
<section className="student-showcase-section container"><div className="hero-art visual-hero"><div className="visual-orb" /><Image className="student-hero-image" src="/images/hadeel-student-hero.png" alt="طالبة وباحثة عربية تمثل خدمات منصة هديل" width={390} height={480} priority /><div className="floating-badge badge-research"><BookOpen size={18} /><span>إعداد البحوث<br /><small>والأوراق العلمية</small></span></div><div className="floating-badge badge-presentation"><Presentation size={18} /><span>تصميم العروض<br /><small>التقديمية PowerPoint</small></span></div><div className="floating-badge badge-assignments"><Check size={18} /><span>متابعة التكليفات<br /><small>والواجبات</small></span></div><div className="floating-badge badge-blackboard"><Headphones size={18} /><span>إدارة البلاك بورد<br /><small>متابعة مستمرة</small></span></div><div className="floating-badge badge-package"><Sparkles size={17} /><span>الباقة الأكاديمية الشاملة للطلاب</span></div></div></section>
  )
}
