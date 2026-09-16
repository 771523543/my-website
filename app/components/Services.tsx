'use client'

import Link from 'next/link'
import {
  BookOpen,
  FileText,
  ClipboardList,
  PencilLine,
  Laptop,
  Presentation,
  UserRound,
  Search,
  BarChart3,
  GraduationCap,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'

type Category = 'all' | 'research' | 'design' | 'academic'

export const services = [
  {
    id: 'research',
    title: 'الخدمات البحثية والأكاديمية',
    shortTitle: 'البحوث الأكاديمية',
    subtitle: 'بحوث، أوراق عمل، خطط بحوث',
    description:
      'خدمة متكاملة مخصصة لمساعدة الطلاب والباحثين في إعداد البحوث العلمية، أوراق العمل، وخطط البحوث (Proposals) بأعلى معايير الجودة والأصول المنهجية الأكاديمية.',
    category: 'research' as Category,
    icon: Search,
    number: '01',
    tag: 'بحث وأكاديميا',

    features: [
      'إعداد البحث',
      'تنسيق المراجع',
      'تنظيم المحتوى',
    ],

    offerings: [
      'كتابة وتنسيق البحوث العلمية والتقارير الأكاديمية ومشاريع التخرج.',
      'صياغة مقترحات البحوث (Proposals) وتحديد الإشكالية والأسئلة والأهداف.',
      'إعداد المراجعات المرجعية (Literature Reviews) وتلخيص الدراسات السابقة.',
      'التوثيق العلمي الدقيق للمراجع والمصادر وفق نظام (APA، Harvard، وغيرها).',
    ],

    requirements: [
      'عنوان البحث أو موضوعه بدقة.',
      'عدد الكلمات أو الصفحات المطلوب.',
      'نظام التوثيق المعتمد (APA، إلخ).',
      'الموعد النهائي للتسليم وأي شروط خاصة من أستاذ المادة.',
    ],

    faqQuestion: 'هل البحوث خالية من الاقتباس والانتحال؟',
    faqAnswer:
      'نعم، جميع الأعمال تُكتب حصرياً وتُفحص ببرامج كشف السرقة الأدبية لضمان الأصالة.',

    requestText:
      'لطلب الخدمة، يرجى تزويدنا بتفاصيل موضوع البحث والموعد النهائي.',
  },

  {
    id: 'reports',
    title: 'التقارير الجامعية',
    shortTitle: 'التقارير',
    subtitle: 'التقارير العلمية والعملية',
    description:
      'خدمة متخصصة لإعداد وصياغة التقارير العلمية والعملية للمقررات الجامعية المختلفة، بما يشمل التقارير المخبرية، الميدانية، والتقييمية.',
    category: 'research' as Category,
    icon: FileText,
    number: '02',
    tag: 'تقارير',

    features: [
      'كتابة منظمة',
      'تنسيق احترافي',
      'مراجع ومصادر',
    ],

    offerings: [
      'بناء هيكل تقرير متكامل (مقدمة، عرض، تحليل، نتائج، وتوصيات).',
      'تنظيم وتحليل البيانات الخاصة بالتقارير العملية والمخبرية أو الزيارات الميدانية.',
      'التدقيق اللغوي والإملائي والتنسيق الاحترافي للشرائح والجداول داخل التقرير.',
    ],

    requirements: [
      'نموذج التقرير أو التعليمات الخاصة به (Guidelines).',
      'البيانات أو النتائج الأولية (إن وجدت) المراد تحليلها وكتابتها.',
      'عدد الصفحات والموعد النهائي للتسليم.',
    ],

    faqQuestion: 'هل تخدمون التقارير الطبية والتمريضية؟',
    faqAnswer:
      'نعم، نوفر تغطية شاملة للتقارير والمهام الخاصة بالتخصصات الصحية والتمريضية.',

    requestText:
      'لطلب الخدمة، شاركنا تفاصيل التقرير وشروطه لنبدأ العمل فوراً.',
  },

  {
    id: 'assignments',
    title: 'التكاليف الجامعية',
    shortTitle: 'التكاليف',
    subtitle: 'الفصلية والكبرى',
    description:
      'خدمة مخصصة لحل وإنجاز التكاليف الفصلية الكبرى والمشاريع الدراسية التي تشكل وزناً نسبياً عالياً في درجات المقررات.',
    category: 'academic' as Category,
    icon: ClipboardList,
    number: '03',
    tag: 'أكاديمي',

    features: [
      'حل التكليف',
      'تنسيق الملف',
      'مراجعة المحتوى',
    ],

    offerings: [
      'دراسة وتحليل متطلبات التكليف بعناية فائقة لضمان مطابقة معايير التقييم.',
      'إعداد الحلول والإجابات النموذجية للمشاريع الفصلية والمهام الكبرى.',
      'مراجعة العمل وتدقيقه للتأكد من خلوه من أي أخطاء حسابية أو منهجية.',
    ],

    requirements: [
      'ملف التكليف أو الأسئلة بصيغة (PDF أو Word).',
      'المراجع أو المحاضرات المرتبطة بالتكليف (إن توفرت).',
      'موعد التسليم النهائي.',
    ],

    faqQuestion: 'هل تضمنون الدرجات العالية في التكاليف؟',
    faqAnswer:
      'نعمل بأعلى معايير الدقة والاحترافية لمساعدتك في تحقيق أفضل الدرجات الممكنة.',

    requestText:
      'أرسل ملف التكليف الآن لتحديد الوقت والتكلفة المناسبة.',
  },

  {
    id: 'homework',
    title: 'الواجبات الدراسية',
    shortTitle: 'الواجبات',
    subtitle: 'اليومية والأسبوعية',
    description:
      'متابعة وحل الواجبات والمهام القصيرة الدورية للمقررات الدراسية المختلفة لضمان جمع الدرجات باستمرار دون تأخير.',
    category: 'academic' as Category,
    icon: PencilLine,
    number: '04',
    tag: 'دراسي',

    features: [
      'حل الواجبات',
      'مراجعة الإجابات',
      'تنظيم التسليم',
    ],

    offerings: [
      'حل الواجبات الأسبوعية واليومية لمختلف التخصصات (العلمية، النظرية، والإدارية).',
      'الالتزام التام بتسليم الواجب في وقته المحدد وقبل الموعد النهائي.',
      'تقديم الإجابات بطريقة واضحة ومبسطة تدعم فهم الطالب.',
    ],

    requirements: [
      'تفاصيل السؤال أو الواجب المطلوب.',
      'موعد التسليم باليوم والساعة.',
    ],

    faqQuestion: 'هل يمكن تسليم الواجب في نفس يوم الطلب؟',
    faqAnswer:
      'نعم، حسب طبيعة وحجم الواجب وقابليته للإنجاز السريع.',

    requestText:
      'ارسل واجبك الآن لنقوم بإنجازه في أسرع وقت.',
  },

  {
    id: 'lms',
    title: 'إدارة المنصات والمهام الدراسية',
    shortTitle: 'إدارة المهام',
    subtitle: 'LMS & Quizzes',
    description:
      'خدمة احترافية لإدارة ومتابعة منصات التعلم عن بعد (Blackboard، Canvas، Moodle وغيرها) لضمان عدم تفويت أي مهمة أو اختبار قصير.',
    category: 'academic' as Category,
    icon: Laptop,
    number: '05',
    tag: 'منصات تعليمية',

    features: [
      'تنظيم المهام',
      'متابعة المواعيد',
      'ترتيب المتطلبات',
    ],

    offerings: [
      'المتابعة الدورية والدخول المنتظم للمنصات التعليمية.',
      'تسليم المهام والواجبات في مواعيدها بدقة.',
      'المشاركة الفعالة في المنتديات النقاشية الخاصة بالمقررات.',
      'المساعدة في حل الاختبارات القصيرة (Quizzes) ضمن وقتها المحدد.',
    ],

    requirements: [
      'بيانات الدخول الخاصة بالمنصة التعليمية (بسرية وخصوصية تامة).',
      'جدول المقررات والمواعيد الهامة للاختبارات والمهام.',
    ],

    faqQuestion: 'هل بيانات حسابي آمنة؟',
    faqAnswer:
      'نعم، نضمن لك سرية تامة وأمان كامل لبيانات الدخول الخاصة بك.',

    requestText:
      'تواصل معنا لتنظيم متابعة منصتك التعليمية بشكل دوري.',
  },

  {
    id: 'presentation',
    title: 'العروض التقديمية والتصميم',
    shortTitle: 'العروض والتصميم',
    subtitle: 'PowerPoint & Infographics',
    description:
      'خدمة تحويل النصوص والبحوث والتقارير إلى عروض تقديمية (PowerPoint) جذابة وتصاميم بصرية وإنفوجرافيك تسهل الشرح والعرض أمام الأساتذة والزملاء.',
    category: 'design' as Category,
    icon: Presentation,
    number: '06',
    tag: 'تصميم',

    features: [
      'PowerPoint',
      'تصميم جذاب',
      'تنظيم بصري',
    ],

    offerings: [
      'تصميم عروض PowerPoint احترافية ومتناسقة بصرياً.',
      'تحويل الأبحاث المعقدة إلى شرائح عرض ملخصة ومباشرة.',
      'إعداد خرائط ذهنية وإنفوجرافيك توضيحي للمشاريع.',
    ],

    requirements: [
      'المحتوى أو الملف المراد تحويله إلى عرض تقديمي.',
      'عدد الشرائح المطلوبة أو الوقت المخصص للعرض.',
      'النمط المفضل (رسمي، أكاديمي، إبداعي، إلخ).',
    ],

    faqQuestion: 'هل تتضمن الشرائح تأثيرات حركية ورسوم؟',
    faqAnswer:
      'نعم، نصممها بصور وتنسيقات عصرية تدعم جمالية العرض وتجتذب الانتباه.',

    requestText:
      'أرسل محتواك وحدد موعد العرض لنبدأ بتصميم شرائحك الاحترافية.',
  },

  {
    id: 'cv',
    title: 'السيرة الذاتية والخدمات المهنية',
    shortTitle: 'السيرة الذاتية',
    subtitle: 'CV احترافي',
    description:
      'خدمة تصميم وتطوير السيرة الذاتية (CV) احترافياً لتبرز مؤهلاتك وخبراتك التعليمية والتدريبية بالشكل الأمثل أمام جهات العمل وأنظمة الفرز الآلي (ATS).',
    category: 'design' as Category,
    icon: UserRound,
    number: '07',
    tag: 'مهني',

    features: [
      'CV احترافي',
      'تنسيق عصري',
      'إبراز المهارات',
    ],

    offerings: [
      'بناء وصياغة السيرة الذاتية باللغتين العربية أو الإنجليزية.',
      'تنسيق القوالب الحديثة المتوافقة مع أنظمة الفرز الإلكتروني (ATS).',
      'إبراز المؤهلات الأكاديمية والمهارات والتدريب العملي بأسلوب تسويقي مهني.',
    ],

    requirements: [
      'المؤهل العلمي والتخصص.',
      'الخبرات، التدريب، أو الدورات الحاصل عليها.',
      'معلومات الاتصال واللغة المطلوبة (عربي / إنجليزي).',
    ],

    faqQuestion: 'هل السيرة الذاتية متوافقة مع أنظمة الـ ATS؟',
    faqAnswer:
      'نعم، نصممها بعناية لتعبر الفلاتر الإلكترونية لجهات التوظيف بنجاح.',

    requestText:
      'أرسل بياناتك الحالية أو تواصل معنا لبناء سيرة ذاتية جديدة كلياً.',
  },

  {
    id: 'case-study',
    title: 'دراسة الحالة',
    shortTitle: 'دراسة الحالة',
    subtitle: 'Case Studies',
    description:
      'خدمة متخصصة لتحليل وحل دراسات الحالة الواقعية والأكاديمية لمختلف المقررات (مثل إدارة الأعمال، الموارد البشرية، الرعاية الصحية، والاقتصاد) بأسلوب منهجي وعلمي دقيق.',
    category: 'research' as Category,
    icon: BarChart3,
    number: '08',
    tag: 'تحليل وبحث',

    features: [
      'تحليل الحالة',
      'تنظيم البيانات',
      'عرض النتائج',
    ],

    offerings: [
      'تحليل تفصيلي لمعطيات المشكلة أو الحالة المطروحة.',
      'ربط المشكلة والنظريات العلمية المقررة بالمنهج الدراسي.',
      'صياغة التوصيات، الحلول الاستراتيجية، واتخاذ القرارات بدقة.',
      'كتابة التقرير النهائي بالهيكل الأكاديمي المطلوب (المشكلة، التحليل، الحلول).',
    ],

    requirements: [
      'نص دراسة الحالة أو الملف المرفق.',
      'الأسئلة المطلوبة الإجابة عنها بشأن الحالة (إن وجدت).',
      'نظام التوثيق والموعد النهائي للتسليم.',
    ],

    faqQuestion: 'هل الحلول مبنية على أسس أكاديمية؟',
    faqAnswer:
      'نعم، نعتمد على النظريات والنماذج العلمية المرتبطة بمقرر دراسة الحالة لضمان أعلى الدرجات.',

    requestText:
      'أرسل نص دراسة الحالة والأسئلة لنبدأ التحليل فوراً.',
  },

  {
    id: 'feasibility',
    title: 'دراسات الجدوى',
    shortTitle: 'دراسة الجدوى',
    subtitle: 'Feasibility Studies',
    description:
      'خدمة متكاملة لإعداد دراسات الجدوى الاقتصادية والتشغيلية للمشاريع التجارية والريادية، بما يشمل الجوانب التسويقية، المالية، والفنية بدقة عالية.',
    category: 'research' as Category,
    icon: BookOpen,
    number: '09',
    tag: 'مشاريع',

    features: [
      'تحليل المشروع',
      'دراسة السوق',
      'تنظيم التقرير',
    ],

    offerings: [
      'الدراسة التسويقية: تحليل السوق، المستهدفين، والمنافسين.',
      'الدراسة الفنية والتشغيلية: تحديد المتطلبات، الموارد، وخطوات سير العمل.',
      'الدراسة المالية: تقدير التكاليف، الأرباح المتوقعة، والجدوى الاستثمارية.',
      'إخراج التقرير النهائي بتنسيق احترافي جاهز للعرض أو التسليم الأكاديمي.',
    ],

    requirements: [
      'فكرة المشروع أو نوع النشاط المقترح.',
      'النطاق الجغرافي أو حجم المشروع المطلوب.',
      'المتطلبات الخاصة بالدراسة (أكاديمية أم تطبيقية لعمل مشروع حقيقي).',
    ],

    faqQuestion: 'هل تشمل الدراسة جداول وحسابات مالية واضحة؟',
    faqAnswer:
      'نعم، نتكفل بتقدير التكاليف والجداول المالية بدقة متناهية.',

    requestText:
      'شاركنا فكرة مشروعك لنبدأ في صياغة دراسة الجدوى المتكاملة.',
  },

  {
    id: 'graduation',
    title: 'مشاريع التخرج',
    shortTitle: 'مشاريع التخرج',
    subtitle: 'Graduation Projects',
    description:
      'دعم شامل ومواكب لخطوات مشروع التخرج من الفكرة حتى التسليم النهائي، لمختلف التخصصات العلمية، الإدارية، الصحية، والتقنية.',
    category: 'academic' as Category,
    icon: GraduationCap,
    number: '10',
    tag: 'تخرج',

    features: [
      'تنظيم المشروع',
      'التقرير',
      'العرض النهائي',
    ],

    offerings: [
      'المساعدة في اختيار واقتراح عناوين مبتكرة لمشاريع التخرج.',
      'إعداد خطة المشروع (Project Proposal) وهيكل البحث أو النظام.',
      'كتابة فصول المشروع كاملة (المقدمة، الأدبيات، المنهجية، التحليل، والنتائج).',
      'توفير الجانب التطبيقي أو البرمجي أو الميداني (حسب تخصص المشروع).',
      'التنسيق والتوثيق العلمي الكامل وفقاً لدليل الجامعة المعتمد.',
    ],

    requirements: [
      'دليل مشروع التخرج أو الشروط الخاصة بالجامعة.',
      'التخصص ومجال المشروع المطلوب.',
      'الموعد النهائي للمراحل المختلفة أو التسليم النهائي.',
    ],

    faqQuestion: 'هل يتم تسليم المشروع على مراحل للمراجعة؟',
    faqAnswer:
      'نعم، يتم تقسيم العمل إلى مراحل (Proposal، الفصول الأولى، التطبيق، التقرير النهائي) لضمان المتابعة المستمرة مع الطالب.',

    requestText:
      'تواصل معنا بتفاصيل تخصصك وشروط مشروع التخرج لنبدأ العمل خطوة بخطوة.',
  },
]

const categories = [
  { id: 'all' as Category, label: 'جميع الخدمات' },
  { id: 'research' as Category, label: 'البحوث' },
  { id: 'design' as Category, label: 'التصاميم' },
  { id: 'academic' as Category, label: 'الخدمات الأكاديمية' },
]

export default function Services() {
  return (
    <section
      id="services"
      dir="rtl"
      className="relative overflow-hidden py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* العنوان */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-bold text-purple-700">
            <Sparkles className="h-4 w-4" />
            خدماتنا الأكاديمية
          </div>

          <h2 className="text-3xl font-black text-gray-900 sm:text-4xl lg:text-5xl">
            كل ما تحتاجه
            <span className="mx-2 bg-gradient-to-l from-purple-600 to-blue-600 bg-clip-text text-transparent">
              في مكان واحد
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            خدمات أكاديمية ومهنية متكاملة تساعدك على تنظيم أعمالك الدراسية
            وتقديمها بصورة احترافية.
          </p>
        </div>

        {/* التصنيفات */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <span
              key={category.id}
              className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-700 shadow-sm"
            >
              {category.label}
            </span>
          ))}
        </div>

        {/* الخدمات */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon

            return (
              <article
                key={service.id}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-2xl"
              >
                {/* الرقم */}
                <div className="absolute left-5 top-5 text-5xl font-black text-gray-100 transition-colors duration-300 group-hover:text-purple-100">
                  {service.number}
                </div>

                {/* الأيقونة */}
                <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-200 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-8 w-8" />
                </div>

                {/* المحتوى */}
                <div className="relative">
                  <div className="mb-2 text-xs font-bold text-purple-600">
                    {service.tag}
                  </div>

                  <h3 className="text-xl font-black leading-8 text-gray-900">
                    {service.title}
                  </h3>

                  <p className="mt-1 text-sm font-bold text-gray-500">
                    {service.shortTitle}
                    {service.subtitle && ` — ${service.subtitle}`}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    {service.description}
                  </p>

                  {/* المميزات */}
                  <div className="mt-5 space-y-2">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-purple-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* الرابط */}
                  <Link
                    href={`/services/${service.id}`}
                    className="mt-7 flex items-center justify-between rounded-2xl border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-black text-purple-700 transition-all duration-300 hover:bg-purple-600 hover:text-white"
                  >
                    <span>عرض تفاصيل الخدمة</span>
                    <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {/* زر جميع الخدمات */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-l from-purple-600 to-blue-600 px-7 py-4 font-black text-white shadow-lg shadow-purple-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            استكشف جميع الخدمات
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}