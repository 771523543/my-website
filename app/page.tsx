import Header from './components/Header'
import Hero from './components/Hero'
import QuickSections from './components/QuickSections'
import Stats from './components/Stats'
import Story from './components/Story'
import Values from './components/Values'
import ServicesPreview from './components/ServicesPreview'
import Packages from './components/Packages'
import PreviousWorks from './components/PreviousWorks'

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

      {/* ==================== PREVIOUS WORKS ==================== */}

      <PreviousWorks />
    </main>
  )
}