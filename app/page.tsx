import Header from './components/Header'
import Hero from './components/Hero'
import QuickSections from './components/QuickSections'
import Stats from './components/Stats'
import Story from './components/Story'
import Values from './components/Values'
import ServicesPreview from './components/ServicesPreview'
import Packages from './components/Packages'
import WhyHadeel from './components/WhyHadeel'
import PreviousWorks from './components/PreviousWorks'
import Achievements from './components/Achievements'
import Testimonials from './components/Testimonials'
import AcademicAd from './components/AcademicAd'
import GpaCalculator from './components/GpaCalculator'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function Page() {
  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-hidden bg-background text-foreground"
    >
      {/* ==================== HEADER ==================== */}

      <Header />

      {/* ==================== HERO ==================== */}

      <Hero />

      {/* ==================== QUICK SECTIONS ==================== */}

      <QuickSections />

      {/* ==================== STATS ==================== */}

      <Stats />

      {/* ==================== STORY ==================== */}

      <Story />

      {/* ==================== VALUES ==================== */}

      <Values />

      {/* ==================== SERVICES ==================== */}

      <ServicesPreview />

      {/* ==================== PACKAGES ==================== */}

      <Packages />

      {/* ==================== WHY HADEEL ==================== */}

      <WhyHadeel />

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
        href="https://wa.me/967776280186"
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        aria-label="تواصل معنا عبر واتساب"
      >
        <img
          src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/whatsapp/default.svg"
          alt="واتساب"
        />
      </a>
    </main>
  )
}