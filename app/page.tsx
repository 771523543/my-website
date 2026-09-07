'use client'

import { useEffect } from 'react'
import Announcement from './components/Announcement'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Story from './components/Story'
import Values from './components/Values'
import Services from './components/Services'
import GpaCalculator from './components/GpaCalculator'
import Testimonials from './components/Testimonials'
import Portfolio from './components/Portfolio'
import StudentShowcase from './components/StudentShowcase'
import AcademicAd from './components/AcademicAd'
import Achievements from './components/Achievements'
import WhyChooseUs from './components/WhyChooseUs'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsapp from './components/FloatingWhatsapp'

export default function Page() {
  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })
    revealItems.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <main dir="rtl" className="min-h-screen overflow-hidden bg-background text-foreground">
      <Announcement />
      <Header />
      <Hero />
      <Stats />
      <Story />
      <Values />
      <Services />
      <GpaCalculator />
      <Testimonials />
      <Portfolio />
      <StudentShowcase />
      <AcademicAd />
      <Achievements />
      <WhyChooseUs />
      <Faq />
      <Contact />
      <Footer />
      <FloatingWhatsapp />
    </main>
  )
}
