import {
  ArrowLeft,
  MessageCircle,
} from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a
            className="brand footer-logo"
            href="#top"
          >
            <span className="footer-logo-mark">
              هـ
            </span>

            <span>
              منصة هديل
              <span className="brand-dot">
                .
              </span>
            </span>
          </a>

          <p>
            منصة متخصصة في تقديم الخدمات الطلابية
            والأكاديمية باحترافية وجودة عالية.
          </p>

          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="footer-whatsapp"
          >
            <MessageCircle size={17} />
            تواصل معنا عبر الواتساب
          </a>
        </div>

        <div className="footer-column">
          <h3>روابط سريعة</h3>

          <a href="#top">
            الرئيسية
            <ArrowLeft size={14} />
          </a>

          <a href="#story">
            قصتنا
            <ArrowLeft size={14} />
          </a>

          <a href="#services">
            خدماتنا
            <ArrowLeft size={14} />
          </a>

          <a href="#gpa-calculator">
            حاسبة المعدل
            <ArrowLeft size={14} />
          </a>
        </div>

        <div className="footer-column">
          <h3>خدماتنا</h3>

          <a href="#services">
            الخدمات الأكاديمية
            <ArrowLeft size={14} />
          </a>

          <a href="#services">
            الخدمات البحثية
            <ArrowLeft size={14} />
          </a>

          <a href="#services">
            التصميم والخدمات المهنية
            <ArrowLeft size={14} />
          </a>
        </div>

        <div className="footer-column">
          <h3>تواصل معنا</h3>

          <a
            href="mailto:Hadeelmubarak387@gmail.com"
          >
            Hadeelmubarak387@gmail.com
          </a>

          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            +967 776 280 186
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} منصة هديل.
          جميع الحقوق محفوظة.
        </p>

        <span>
          خدمات طلابية وأكاديمية
        </span>
      </div>
    </footer>
  )
}