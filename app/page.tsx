import Header from './components/Header'
import Hero from './components/Hero'
import QuickSections from './components/QuickSections'
import Stats from './components/Stats'

import AboutGrid from './components/AboutGrid'

import ServicesPreview from './components/ServicesPreview'
import Packages from './components/Packages'
import PreviousWorks from './components/PreviousWorks'
import Achievements from './components/Achievements'
import Testimonials from './components/Testimonials'
import AcademicAd from './components/AcademicAd'
import GpaCalculator from './components/GpaCalculator'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import RevealObserver from './components/RevealObserver'

export default function Home() {
  return (
    <main id="top">

      <Header />

      <RevealObserver />

      <Hero />

      <QuickSections />

      <Stats />

      {/* ==================== ABOUT ==================== */}

      <AboutGrid />

      {/* ==================== SERVICES ==================== */}

      <ServicesPreview />

      {/* ==================== PACKAGES ==================== */}

      <Packages />

      {/* ==================== PREVIOUS WORKS ==================== */}

      <PreviousWorks />

      {/* ==================== ACHIEVEMENTS ==================== */}

      <Achievements />

      {/* ==================== TESTIMONIALS ==================== */}

      <Testimonials />

      {/* ==================== ACADEMIC AD ==================== */}

      <AcademicAd />

      {/* ==================== GPA CALCULATOR ==================== */}

      <GpaCalculator />

      {/* ==================== FAQ ==================== */}

      <FAQ />

      {/* ==================== CONTACT ==================== */}

      <Contact />

      {/* ==================== FOOTER ==================== */}

      <Footer />

      {/* ==================== FLOATING WHATSAPP ==================== */}

      <a
        className="floating-whatsapp"
        href="https://wa.me/967776280186"
        target="_blank"
        rel="noreferrer"
        aria-label="تواصل معنا عبر واتساب"
      >
        <img
          src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/whatsapp/default.svg"
          alt="واتساب"
        />

        <span>
          تواصل معنا
        </span>
      </a>

    </main>
  )
}