'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Layers
} from 'lucide-react';

const packagesData = [
  {
    id: 'full-term',
    badge: 'راحتك طول الفصل 🎓',
    title: 'اشتراك الترم الكامل',
    platform: 'منصة هديل التعليمية',
    subtitle: 'راحة بال وإنجاز مضمون طوال الفصل الدراسي',
    description:
      'نرافقك خطوة بخطوة في رحلتك الجامعية للتعامل مع كافة متطلبات البلاك بورد والتكاليف اليومية لضمان التفوق.',
    image: '/images/banner1.png',
    features: [
      'متابعة شاملة للبلاك بورد',
      'حل الواجبات والتكاليف بدقة',
      'إعداد البحوث والعروض التقديمية',
      'تنبيهات فورية للمهام ودعم طلابي مخصص',
    ],
    detailsSections: [
      {
        title: 'متابعة شاملة ودقيقة للبلاك بورد (Blackboard)',
        content: 'نحن نتولى بالنيابة عنك المتابعة المستمرة واليومية لكافة إعلانات المقررات، التحديثات، الواجبات المستجدة، والمستندات المرفوعة من قبل أعضاء هيئة التدريس. نضمن لك عدم تفويت أي مهمة دراسية أو إعلان هام، مع تنظيم جدول زمني دقيق لكافة متطلبات المواد لتكون دائماً في المقدمة وبدون أي ضغوط نفسية أو قلق طوال الفصل الدراسي.'
      },
      {
        title: 'حل الواجبات والاختبارات القصيرة (Quizzes) بدقة',
        content: 'يضم فريقنا نخبة من المتخصصين والأكاديميين في مختلف التخصصات العلمية والنظرية للتعامل مع كافة الواجبات، الكويزات، والتكاليف الفصلية. نضمن لك الحصول على أعلى الدرجات والتقييمات من خلال حلول علمية دقيقة، موثوقة، وخالية تماماً من الأخطاء، مع مراعاة كافة الشروط والمعايير الأكاديمية الخاصة بالجامعة.'
      },
      {
        title: 'إعداد البحوث العلمية، التقارير، والعروض التقديمية',
        content: 'هل تواجه صعوبة في كتابة الأبحاث أو تلخيص الكتب؟ نوفر لك خدمة متكاملة لصياغة البحوث الأكاديمية وفق أحدث معايير التوثيق العلمي (مثل APA) وبنسبة اقتباس منخفضة جداً. بالإضافة إلى تصميم عروض تقديمية (PowerPoint) احترافية، جذابة، وبصرية عالية المستوى تضمن لك إبهار أستاذ المادة أثناء العرض.'
      },
      {
        title: 'تنبيهات ذكية للمهام ودعم طلابي فوري على مدار الساعة',
        content: 'مع باقة الترم الكامل، أنت لست وحدك! فريق الدعم الفني والأكاديمي متواجد طوال الـ 24 ساعة للإجابة على استفساراتك الطارئة، تزويدك بتنبيهات مبكرة ومخصصة قبل مواعيد تسليم المهام الحساسة، وتقديم إرشادات مستمرة لمساعدتك في تحقيق التفوق الأكاديمي والوصول إلى المعدل الذي طالما حلمت به.'
      }
    ],
    whatsappText:
      'السلام عليكم، أرغب في الاستفسار والتسجيل في اشتراك الترم الكامل مع منصة هديل.',
  },
  {
    id: 'academic-excellence',
    badge: 'شركاؤك في النجاح 🌟',
    title: 'باقة التميز الأكاديمي',
    platform: 'منصة هديل التعليمية',
    subtitle:
      'شركاؤك في رحلتك الجامعية نحو النجاح والتميز طوال الفصل',
    description:
      'حلول أكاديمية شاملة ومصممة خصيصاً للطلاب والطالبات للوصول إلى أقصى معدلات النجاح الأكاديمي.',
    image: '/images/banner2.png',
    features: [
      'متابعة شاملة للبلاك بورد',
      'حل الواجبات والتكاليف بدقة',
      'إعداد البحوث والعروض التقديمية',
      'إشعارات ذكية للمهام ودعم طلابي متكامل',
    ],
    detailsSections: [
      {
        title: 'الإشراف والمتابعة الشاملة لحسابك الجامعي',
        content: 'نقدم لك خدمة مراقبة وإشراف متكاملة لحسابك على البلاك بورد وأنظمة التعلم الإلكتروني المختلفة. نقوم بتنظيم المهام، ترتيب الأولويات، ومتابعة كل ما يستجد في مقرراتك الدراسية أولاً بأول، لنمنحك راحة البال التامة ونتيح لك التركيز على الحضور واستيعاب المحاضرات بينما نتولى نحن الجانب الإداري والتنظيمي.'
      },
      {
        title: 'إنجاز التكاليف الجامعية والواجبات بدقة متناهية',
        content: 'نضمن لك حلاً مثالياً ومتقناً لجميع الواجبات، التكاليف الأسبوعية، والمشاريع المطلوبة في مقرراتك. يعتمد فريقنا على مصادر موثوقة وأساليب بحثية علمية صحيحة تضمن تقديم إجابات نموذجية متكاملة تستحق الدرجة الكاملة، مع الالتزام التام بالمواعيد المحددة للتسليم دون أي تأخير.'
      },
      {
        title: 'تجهيز وتنسيق التقارير والمشاريع الجماعية والفردية',
        content: 'نساعدك في إعداد وتنسيق التقارير العلمية، المشاريع الفصلية، وملفات الإنجاز (Portfolios) بأعلى جودة تنظيمية ولغوية. نهتم بكل التفاصيل الدقيقة من تنسيق النصوص، المراجع، الجداول البيانية، وحتى إعداد الشرائح التقديمية التابعة لها لتكون جاهزة للعرض أو التسليم الفوري.'
      },
      {
        title: 'إشعارات ذكية ودعم أكاديمي متكامل طوال الفصل',
        content: 'نبقيك على اتصال دائم ومحدث بمواعيد الاختبارات، الفصول الافتراضية، ومهام التسليم الحرجة من خلال نظام تنبيهات ذكي ومخصص. كما يوفر لك فريقنا استشارات أكاديمية ودعم مستمر لضمان سير مسيرتك الجامعية بثبات نحو قمة التفوق.'
      }
    ],
    whatsappText:
      'السلام عليكم، أرغب في الاستفسار عن باقة التميز الأكاديمي عبر منصة هديل.',
  },
  {
    id: 'future-generation',
    badge: 'معاً نصنع التميز 🚀',
    title: 'باقة هدفنا تفوقكم!',
    platform: 'منصة هديل التعليمية',
    subtitle: 'منصة هديل - بوابتك للتعليم المتطور',
    description:
      'انضم لباقة التميز الآن واحصل على تجربة تعليمية متطورة تضمن لك الارتقاء بمستواك الأكاديمي بثقة.',
    image: '/images/banner3.png',
    features: [
      'حلول تعليمية وتطويرية متكاملة',
      'تجهيز وتنسيق المشاريع والبحوث',
      'إنجاز التكاليف الجامعية أولاً بأول',
      'متابعة وإشراف أكاديمي مستمر',
    ],
    detailsSections: [
      {
        title: 'حلول تعليمية وتطويرية شاملة ومبتكرة',
        content: 'نضع بين يديك حزمة متكاملة من الأدوات والحلول التقنية والأكاديمية التي صُممت خصيصاً لتذليل العقبات وتسهيل مسيرتك الدراسية. نحن نساعدك في فهم المتطلبات المعقدة وتحويلها إلى خطوات إنجاز واضحة وبسيطة تضمن لك الارتقاء بمستواك العلمي والثقة التامة في قدراتك.'
      },
      {
        title: 'تجهيز وصياغة البحوث والمشاريع بأعلى معايير الجودة',
        content: 'نرافقك في إعداد وتصميم الأبحاث، دراسات الحالة، والمشاريع الجامعية الكبرى. نعمل على صياغة الأفكار بترتيب منطقي وعلمي سليم، مع توفير مراجع دقيقة وواسعة النطاق تعزز من قيمة عملك الأكاديمي وتجعله متميزاً بين زملائك وتحت أنظار أستاذ المقرر.'
      },
      {
        title: 'إنجاز التكاليف الجامعية أولاً بأول وبدون تراكم',
        content: 'لا داعي للقلق بعد اليوم بشأن تراكم الواجبات والمهام في أوقات الاختبارات؛ فمن خلال هذه الباقة، نتولى إنجاز كل تكليف فور نزوله على المنصة بدقة وسرعة عالية. نمنحك الاستقرار الزمني وتوفير الساعات الطويلة لتركز على المذاكرة والاستعداد للاختبارات النهائية.'
      },
      {
        title: 'إشراف ومتابعة أكاديمية مستمرة لضمان أفضل النتائج',
        content: 'فريق متخصص من المعلمين والمشرفين الأكاديميين يتابعون تفاصيل دراستك خطوة بخطوة. نقدم لك تقارير دورية، إرشادات مستمرة، ودعماً لا يتوقف لضمان سير كل أمورك الدراسية على أكمل وجه وبأفضل النتائج الممكنة.'
      }
    ],
    whatsappText:
      'السلام عليكم، أرغب في الانضمام لباقة التميز والتعرف على خدمات منصة هديل.',
  },
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [activeCard, setActiveCard] = useState<number | null>(0);

  useEffect(() => {
    if (selectedPackage) return;

    const timer = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % packagesData.length
      );
    }, 6000);

    return () => clearInterval(timer);
  }, [selectedPackage]);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % packagesData.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + packagesData.length) % packagesData.length
    );
  };

  const currentPkg = packagesData[currentIndex];

  if (selectedPackage) {
    return (
      <div
        style={{
          maxWidth: '1000px',
          margin: '2rem auto',
          padding: '0 1rem',
          direction: 'rtl',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #0b132b 0%, #1c2541 100%)',
            borderRadius: '28px',
            padding: '2.5rem 2rem',
            color: '#fff',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(0, 242, 254, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(0, 242, 254, 0.1)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }} />

          <button
            onClick={() => {
              setSelectedPackage(null);
              setActiveCard(0);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fff',
              padding: '0.6rem 1.2rem',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '2rem',
              transition: 'all 0.3s ease',
            }}
          >
            <ChevronRight size={18} />
            العودة للباقات الرئيسية
          </button>

          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(0, 242, 254, 0.15)',
                color: '#00f2fe',
                padding: '0.4rem 1.2rem',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                border: '1px solid rgba(0, 242, 254, 0.3)',
              }}
            >
              <Sparkles size={16} />
              {selectedPackage.platform}
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: '#ffffff' }}>
              {selectedPackage.title}
            </h1>
            <p style={{ color: '#4cc9f0', fontSize: '1.05rem' }}>
              {selectedPackage.subtitle}
            </p>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#e0e1dd' }}>
              <Layers size={18} style={{ color: '#00f2fe' }} />
              <span style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>تفاصيل ومحاور الباقة الشاملة (اضغط على البطاقة لقراءة التفاصيل الكاملة):</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.2rem' }}>
              {selectedPackage.detailsSections.map((section: any, idx: number) => {
                const isActive = activeCard === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveCard(isActive ? null : idx)}
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, rgba(0, 242, 254, 0.12) 0%, rgba(28, 37, 65, 0.9) 100%)' 
                        : 'rgba(255, 255, 255, 0.04)',
                      border: `2px solid ${isActive ? '#00f2fe' : 'rgba(255, 255, 255, 0.1)'}`,
                      borderRadius: '18px',
                      padding: '1.6rem',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: isActive ? '0 10px 25px rgba(0, 242, 254, 0.15)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <div style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          background: isActive ? '#00f2fe' : 'rgba(255,255,255,0.1)',
                          color: isActive ? '#0b132b' : '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '0.95rem',
                          flexShrink: 0
                        }}>
                          {idx + 1}
                        </div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff', margin: 0 }}>
                          {section.title}
                        </h4>
                      </div>
                      <span style={{ fontSize: '0.85rem', color: '#00f2fe', fontWeight: 'bold' }}>
                        {isActive ? 'إخفاء التفاصيل ▲' : 'عرض التفاصيل الكاملة ▼'}
                      </span>
                    </div>

                    {isActive && (
                      <div style={{
                        marginTop: '1.2rem',
                        paddingTop: '1.2rem',
                        borderTop: '1px solid rgba(255,255,255,0.15)',
                        color: '#f8f9fa',
                        fontSize: '1rem',
                        lineHeight: '1.9',
                        textAlign: 'justify'
                      }}>
                        {section.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <a
              href={`https://wa.me/967776280186?text=${encodeURIComponent(
                selectedPackage.whatsappText
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#25d366',
                color: '#ffffff',
                padding: '1rem 2.5rem',
                borderRadius: '14px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                textDecoration: 'none',
                boxShadow: '0 10px 20px rgba(37, 211, 102, 0.4)',
                transition: 'transform 0.2s',
              }}
            >
              اطلب الخدمة الآن عبر الواتساب
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="packages"
      style={{
        maxWidth: '1200px',
        margin: '2rem auto',
        padding: '0 1rem',
        direction: 'rtl',
      }}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          background:
            'linear-gradient(135deg, #0b132b 0%, #1c2541 50%, #3a506b 100%)',
          color: '#ffffff',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          padding: '2.5rem 2rem',
          transition: 'all 0.5s ease-in-out',
        }}
      >
        <button
          onClick={prevSlide}
          aria-label="السلايد السابق"
          style={{
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            color: '#fff',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
          }}
        >
          <ChevronRight size={26} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="السلايد التالي"
          style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            color: '#fff',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(6px)',
          }}
        >
          <ChevronLeft size={26} />
        </button>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap-reverse',
            alignItems: 'center',
            gap: '2.5rem',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              flex: '1 1 480px',
              textAlign: 'right',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                padding: '0.4rem 1.2rem',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Sparkles
                size={16}
                style={{ color: '#00f2fe' }}
              />
              {currentPkg.badge}
            </span>

            <h2
              style={{
                fontSize: '2rem',
                fontWeight: '800',
                marginBottom: '0.4rem',
                color: '#ffffff',
              }}
            >
              {currentPkg.title}
            </h2>

            <p
              style={{
                color: '#4cc9f0',
                fontSize: '1.05rem',
                fontWeight: '600',
                marginBottom: '0.8rem',
              }}
            >
              {currentPkg.subtitle}
            </p>

            <p
              style={{
                color: '#e0e1dd',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                fontSize: '0.95rem',
              }}
            >
              {currentPkg.description}
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => {
                  setSelectedPackage(currentPkg);
                  setActiveCard(0);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  padding: '0.85rem 1.5rem',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
              >
                <BookOpen size={18} style={{ color: '#00f2fe' }} />
                تفاصيل الخدمة
              </button>

              <a
                href={`https://wa.me/967776280186?text=${encodeURIComponent(
                  currentPkg.whatsappText
                )}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#25d366',
                  color: '#ffffff',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  boxShadow:
                    '0 10px 15px -3px rgba(37, 211, 102, 0.3)',
                }}
              >
                اطلب الخدمة
                <ChevronLeft size={18} />
              </a>
            </div>
          </div>

          <div
            style={{
              flex: '1 1 360px',
              height: '380px',
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(0,0,0,0.4)',
              border:
                '2px solid rgba(255,255,255,0.1)',
            }}
          >
            <Image
              src={currentPkg.image}
              alt={currentPkg.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '1.8rem',
          }}
        >
          {packagesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`انتقال للسلايد ${idx + 1}`}
              style={{
                width:
                  currentIndex === idx ? '28px' : '9px',
                height: '9px',
                borderRadius: '5px',
                backgroundColor:
                  currentIndex === idx
                    ? '#00f2fe'
                    : 'rgba(255, 255, 255, 0.25)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
