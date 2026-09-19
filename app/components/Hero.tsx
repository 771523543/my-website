import {
  ArrowLeft,
  Award,
  Check,
  GraduationCap,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Sparkles,
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

        <div className="hero-blue-card">
          <div className="hero-card-badge">
            <GraduationCap size={27} />
          </div>

          <div className="art-top">
            <span>رحلتك الأكاديمية</span>

            <Award
              size={23}
              className="sparkle"
            />
          </div>

          <p className="hero-card-caption">
            خطوات واضحة، إنجازات أكبر
          </p>

          <div className="path-line">
            <span className="path-dot active" />
            <span />
            <span className="path-dot active" />
            <span />
            <span className="path-dot active" />
          </div>

          <div className="art-labels">
            <span>خطط</span>
            <span>أنجز</span>
            <span>تفوّق</span>
          </div>

          <div className="floating-note">
            <Check size={16} />
            عملك في أيدٍ أمينة
          </div>
        </div>
      </div>

      <div className="hero-art hero-photo">
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '20px 0',
            width: '100%',
            position: 'relative',
          }}
        >
          <img
            src="/images/hadel-1.png"
            alt="منصة هديل"
            style={{
              width: '100%',
              maxWidth: '100%',
              height: 'auto',
              borderRadius: '20px',
              objectFit: 'contain',
              display: 'block',
            }}
          />

          {/* الصف الأول من الأيقونات */}
          <div
            style={{
              position: 'absolute',
              bottom: '11%',
              left: '5%',
              width: '90%',
              display: 'grid',
              gridTemplateColumns:
                'repeat(3, 1fr)',
              gap: '7px',
              zIndex: 5,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: '#fff',
                color: '#17233d',
                padding: '9px 7px',
                borderRadius: '11px',
                boxShadow:
                  '0 10px 22px #17233d1c',
                fontSize: '9px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              <ShieldCheck
                size={16}
                color="#2455c4"
              />
              <span>جودة موثوقة</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: '#fff',
                color: '#17233d',
                padding: '9px 7px',
                borderRadius: '11px',
                boxShadow:
                  '0 10px 22px #17233d1c',
                fontSize: '9px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              <LockKeyhole
                size={16}
                color="#2455c4"
              />
              <span>خصوصية وأمان</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: '#fff',
                color: '#17233d',
                padding: '9px 7px',
                borderRadius: '11px',
                boxShadow:
                  '0 10px 22px #17233d1c',
                fontSize: '9px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              <MessageCircle
                size={16}
                color="#2455c4"
              />
              <span>دعم مستمر</span>
            </div>
          </div>

          {/* الصف الثاني من الأيقونات */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '5%',
              width: '90%',
              display: 'grid',
              gridTemplateColumns:
                'repeat(3, 1fr)',
              gap: '7px',
              zIndex: 5,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: '#fff',
                color: '#17233d',
                padding: '9px 7px',
                borderRadius:
                  '11px 11px 0 0',
                boxShadow:
                  '0 8px 20px #17233d1c',
                fontSize: '9px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              <GraduationCap
                size={16}
                color="#2455c4"
              />
              <span>خبرة أكاديمية</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: '#fff',
                color: '#17233d',
                padding: '9px 7px',
                borderRadius:
                  '11px 11px 0 0',
                boxShadow:
                  '0 8px 20px #17233d1c',
                fontSize: '9px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              <Award
                size={16}
                color="#2455c4"
              />
              <span>إنجازات موثوقة</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                background: '#fff',
                color: '#17233d',
                padding: '9px 7px',
                borderRadius:
                  '11px 11px 0 0',
                boxShadow:
                  '0 8px 20px #17233d1c',
                fontSize: '9px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              <Sparkles
                size={16}
                color="#2455c4"
              />
              <span>تميز وجودة</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}