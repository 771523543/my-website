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
import RevealObserver from './components/RevealObserver'

export default function Home() {
  return (
    <main id="top">
      <Hero />

      <QuickSections />

      <Stats />

      <AboutGrid />

      <ServicesPreview />

      <Packages />

      <PreviousWorks />

      <Achievements />

      <Testimonials />

      <AcademicAd />

      <GpaCalculator />

      <FAQ />

      <Contact />

      <a
        className="floating-whatsapp"
        href="https://wa.me/967776280186"
        target="_blank"
        rel="noreferrer"
        aria-label="التواصل عبر واتساب"
      >
        <span className="floating-whatsapp-icon">◉</span>
        <span className="floating-whatsapp-text">
          <strong>واتساب</strong>
          <small>تواصل معنا مباشرة</small>
        </span>
      </a>

      <RevealObserver />
    </main>
  )
}