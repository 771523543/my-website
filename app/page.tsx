import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import GpaCalculator from '../components/GpaCalculator';
import Faq from '../components/Faq';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import FloatingWhatsapp from '../components/FloatingWhatsapp';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans" dir="rtl">
      {/* 1. الهيدر والقائمة العلوي */}
      <Header />

      {/* 2. القسم الرئيسي الترحيبي */}
      <Hero />

      {/* 3. قسم عرض الخدمات الأكاديمية */}
      <Services />

      {/* 4. حاسبة المعدل التراكمي */}
      <GpaCalculator />

      {/* 5. قسم الأسئلة الشائعة */}
      <Faq />

      {/* 6. نموذج التواصل والطلب */}
      <Contact />

      {/* 7. الفوتر السفلي */}
      <Footer />

      {/* 8. زر الواتساب العائم */}
      <FloatingWhatsapp />
    </main>
  );
}
