import { Star } from 'lucide-react'

const testimonialsData = [
  {
    name: 'عبدالله العتيبي',
    role: 'طالب بكالوريوس',
    text: 'ما شاء الله تبارك الله، سرعة ودقة في إعداد البحث والتزام بالتوثيق المعتمد APA. أنقذتوني في الوقت المناسب!',
    rating: 5,
  },
  {
    name: 'سارة الشمري',
    role: 'طالبة ماجستير',
    text: 'عرض الباوربوينت كان أكثر من رائع وتفاعلي، الدكتور أثنى على تنسيق الشرائح وطريقة عرض الأفكار. شكراً منصة هديل.',
    rating: 5,
  },
  {
    name: 'محمد الغامدي',
    role: 'طالب جامعي',
    text: 'خدمة متابعة التكليفات والبلاك بورد احترافية جداً وبمنتهى الخصوصية والأمانة. تعامل راقي ومستمر معكم بإذن الله.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="section container"
    >
      <div className="center-heading">
        <span className="section-kicker">
          آراء العملاء
        </span>

        <h2>
          ماذا يقول{' '}
          <em>طلابنا عنّا؟</em>
        </h2>

        <p>
          تجارب حقيقية من طلاب وباحثين استفادوا
          من خدمات منصة هديل.
        </p>
      </div>

      <div
        className="testimonials-grid"
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(3, minmax(0, 1fr))',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        {testimonialsData.map((t) => (
          <article
            key={t.name}
            style={{
              background: '#fff',
              border:
                '1px solid #e4ebf4',
              borderRadius: '16px',
              padding: '1.25rem',
              boxShadow:
                '0 10px 30px rgba(23,35,61,0.06)',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '2px',
                color: '#f59e0b',
                marginBottom: '0.8rem',
              }}
            >
              {[
                ...Array(t.rating),
              ].map((_, starIndex) => (
                <Star
                  key={starIndex}
                  size={16}
                  fill="#f59e0b"
                />
              ))}
            </div>

            <p
              style={{
                fontSize: '0.9rem',
                color: '#374151',
                lineHeight: '1.6',
                marginBottom: '1rem',
              }}
            >
              "{t.text}"
            </p>

            <div>
              <strong
                style={{
                  display: 'block',
                  fontSize: '0.92rem',
                  color: '#111827',
                }}
              >
                {t.name}
              </strong>

              <small
                style={{
                  color: '#6b7280',
                  fontSize: '0.8rem',
                }}
              >
                {t.role}
              </small>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}