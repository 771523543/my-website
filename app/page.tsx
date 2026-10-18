
import Hero from './components/Hero'
import AboutGrid from './components/AboutGrid'
import VisionMissionGoals from './components/VisionMissionGoals'
import QuickSections from './components/QuickSections'
import Stats from './components/Stats'
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
      {/* قسم الترحيب */}
      <Hero />

      {/* التعريف بمنصة هديل */}
      <AboutGrid />

      {/* الرؤية والرسالة والأهداف */}
      <VisionMissionGoals />

      {/* الأقسام السريعة */}
      <QuickSections />

      {/* الإحصائيات */}
      <Stats />

      {/* بقية أقسام الصفحة الرئيسية */}
      <ServicesPreview />

      <Packages />

      <PreviousWorks />

      <Achievements />

      <Testimonials />

      <AcademicAd />

      <GpaCalculator />

      <FAQ />

      <Contact />

      <RevealObserver />
    </main>
  )
}
