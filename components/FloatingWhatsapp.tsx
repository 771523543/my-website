'use client'



const whatsapp = 'https://wa.me/967776280186'

export default function FloatingWhatsapp() {
  return (
<a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="تواصل معنا عبر واتساب"><img src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/whatsapp/default.svg" alt="واتساب" /><span>تواصل معنا</span></a>
  )
}
