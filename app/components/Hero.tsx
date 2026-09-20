import {
  ArrowLeft,
  GraduationCap,
  MessageCircle,
  Sparkles,
} from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

export default function Hero() {
  return (
    <section id="top" className="hero container">
      <div className="hero-copy">
        <div className="hero-badge">
          <span className="hero-badge-icon">
            <GraduationCap size={17} />
          </span>

          <span>شريكك في النجاح الأكاديمي</span>

          <Sparkles
            size={14}
            className="hero-badge-sparkle"
          />
        </div>

        <h1>
          نرتب لك طريقك
          <br />
          <strong>نحو النجاح الأكاديمي</strong>
        </h1>

        <p className="hero-description">
          منصة هديل للخدمات الطلابية والأكاديمية،
          نقدم لك حلولًا احترافية تساعدك على إنجاز
          متطلباتك الدراسية بثقة وجودة عالية.
        </p>

        <div className="hero-buttons">
          <a
            className="primary-button"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            اطلب خدمتك الآن
            <MessageCircle size={18} />
          </a>

          <a
            className="text-button"
            href="#services"
          >
            استكشف خدماتنا
            <ArrowLeft size={18} />
          </a>
        </div>
      </div>

      <div className="hero-art hero-photo">
        <img
          src="/images/hadeel-main-hero.jpeg"
          alt="منصة هديل للخدمات الطلابية والأكاديمية"
        />
      </div>
    </section>
  )
}