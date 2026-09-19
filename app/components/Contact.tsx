import {
  ArrowLeft,
  MessageCircle,
} from 'lucide-react'

const whatsapp = 'https://wa.me/967776280186'

export default function Contact() {
  return (
    <section
      id="contact"
      className="contact-section container"
    >
      <div className="contact-card">
        <div className="contact-icon">
          <MessageCircle size={30} />
        </div>

        <div className="contact-copy">
          <span className="section-kicker">
            جاهز تبدأ؟
          </span>

          <h2>
            خلّنا ننجزها
            <br />
            <em>معًا</em>
          </h2>

          <p>
            تواصل معنا الآن واحصل على استشارة
            مجانية لمساعدتك في اختيار الخدمة
            المناسبة لاحتياجك الأكاديمي.
          </p>
        </div>

        <a
          className="primary-button"
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
        >
          تواصل معنا الآن
          <ArrowLeft size={18} />
        </a>
      </div>
    </section>
  )
}