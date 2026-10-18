
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
      {/* 1. الترحيب بمنصة هديل */}
      <Hero />

      {/* 2. عن منصة هديل: علم وإنجاز، الرؤية والرسالة */}
      <VisionMissionGoals />

      {/* 3. الأقسام السريعة */}
      <QuickSections />

      {/* 4. قصتنا وقيمنا وما يميزنا */}
      <AboutGrid />

      {/* 5. الإحصائيات */}
      <Stats />

      {/* 6. الخدمات الطلابية */}
      <ServicesPreview />

      {/* 7. الباقات */}
      <Packages />

      {/* 8. معرض الأعمال والملفات */}
      <PreviousWorks />

      {/* 9. الإنجازات */}
      <Achievements />

      {/* 10. آراء العملاء */}
      <Testimonials />

      {/* 11. الإعلان الأكاديمي */}
      <AcademicAd />

      {/* 12. حاسبة المعدل */}
      <GpaCalculator />

      {/* 13. الأسئلة الشائعة */}
      <FAQ />

      {/* 14. التواصل */}
      <Contact />

      {/* مراقب ظهور العناصر */}
      <RevealObserver />
    </main>
  )
}
