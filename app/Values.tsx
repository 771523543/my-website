'use client'

import { ShieldCheck } from 'lucide-react'
import { values } from '../data/siteData'

export default function Values() {
  return (
<section id="values" data-reveal className="section soft-section reveal-section"><div className="container"><div className="center-heading"><span className="section-kicker">قيمنا الأساسية</span><h2>ثقة تُبنى على <em>المبادئ</em></h2><p>نضع احتياجك ونجاحك في مقدمة كل ما نقدمه.</p></div><div className="values-grid">{values.map(([title, text], index) => <article data-reveal className="value-card reveal-section" key={title}><span className="value-number">0{index + 1}</span><ShieldCheck size={25} /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
  )
}
