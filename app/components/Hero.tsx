import {
  ArrowLeft,
  MessageCircle,
} from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

export default function Hero() {
  return (
    <section id="top" className="hero container">
      <div className="hero-copy">
        <span className="eyebrow">
          <span className="eyebrow-dot" />
          شريكك الأكاديمي الموثوق
        </span>

        <h1>
          نرتب لك طريقك
          <br />
          <strong>نحو النجاح الأكاديمي</strong>
        </h1>

        <p>
          منصة هديل للخدمات الطلابية والأكاديمية.
          حلول احترافية، جودة عالية، ومتابعة مستمرة
          تساعدك على إنجاز أعمالك بثقة.
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

        <div className="trust-row">
          <div className="avatars">
            <span>أ</span>
            <span>م</span>
            <span>س</span>
            <span>+</span>
          </div>

          <div>
            <strong>+10,000</strong>
            <small>
              طالب وباحث يثقون بنا
            </small>
          </div>
        </div>
      </div>

      <div className="hero-art hero-photo">
        <img
          src="/images/hadeel-main-hero.jpeg"
          alt="منصة هديل للخدمات الطلابية والأكاديمية"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '20px',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    </section>
  )
}