import Link from 'next/link'
import {
  ArrowLeft,
  MessageCircle,
} from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link
            className="brand footer-brand"
            href="/"
          >
            <span className="brand-mark">
              هـ
            </span>

            <span>
              منصة هديل
              <span className="brand-dot">
                .
              </span>
            </span>
          </Link>

          <p>
            منصة هديل للخدمات الطلابية والأكاديمية، شريكك نحو إنجاز
            أكاديمي أفضل.
          </p>
        </div>

        <div>
          <h4>روابط سريعة</h4>

          <Link href="/#story">
            قصتنا
          </Link>

          <Link href="/#services">
            خدماتنا
          </Link>

          <Link href="/#gpa-calculator">
            حاسبة المعدل
          </Link>

          <Link href="/#testimonials">
            آراء العملاء
          </Link>
        </div>

        <div>
          <h4>تواصل معنا</h4>

          <a href="mailto:Hadeelmubarak387@gmail.com">
            Hadeelmubarak387@gmail.com
          </a>
        </div>

        <div className="footer-note">
          <MessageCircle size={30} />

          <h4>
            تحتاج مساعدة؟
          </h4>

          <p>
            فريقنا جاهز للإجابة عن استفساراتك.
          </p>

          <a
            className="footer-whatsapp"
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            راسلنا مباشرة

            <ArrowLeft size={15} />
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © 2026 منصة هديل للخدمات الطلابية والأكاديمية. جميع
          الحقوق محفوظة.
        </span>

        <span>
          صُنع بعناية للطلاب والباحثين
        </span>
      </div>
    </footer>
  )
}