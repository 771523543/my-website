import { BookOpen, Layers, FileText, GraduationCap, Award, Sparkles } from 'lucide-react';

export const servicesData = [
  { id: 1, category: 'research', title: 'إعداد البحوث والأوراق العلمية', desc: 'بحوث متكاملة وفق المعايير الأكاديمية وحسب دليل الجامعات مع التوثيق المعتمد.', icon: BookOpen },
  { id: 2, category: 'design', title: 'تصميم العروض التقديمية (PowerPoint)', desc: 'تصاميم احترافية تفاعلية تعكس جودة محتواك الأكاديمي والمهني.', icon: Layers },
  { id: 3, category: 'academic', title: 'حل الواجبات والتكليفات', desc: 'مساعدة دقيقة في إنجاز الواجبات الأكاديمية لمختلف التخصصات.', icon: FileText },
  { id: 4, category: 'academic', title: 'كتابة التقارير والمشاريع', desc: 'صياغة تقارير ميدانية ومشاريع تخرج وفق أعلى المعايير.', icon: GraduationCap },
  { id: 5, category: 'design', title: 'تصميم السير الذاتية (CV)', desc: 'تصميم سيرة ذاتية احترافية باللغتين العربية والإنجليزي لزيادة فرص القبول.', icon: Award },
  { id: 6, category: 'research', title: 'الترجمة الأكاديمية والتلخيص', desc: 'ترجمة دقيقة وتلخيص شامل للمراجع والمقالات العلمية.', icon: Sparkles }
];

export const faqsData = [
  { q: 'كيف يتم تسليم الأعمال والبحوث؟', a: 'يتم تسليم الأعمال بصيغ جاهزة للطباعة والتعديل (PDF و Word) عبر الواتساب أو البريد الإلكتروني.' },
  { q: 'هل توجد إمكانية للتعديل بعد التسليم؟', a: 'نعم، نوفر تعديلات مجانية لضمان رضاك التام ومطابقة العمل للتعليمات المطلوبة.' },
  { q: 'ما هي طرق الدفع المتاحة؟', a: 'نوفر طرق دفع إلكترونية متعددة وآمنة تناسب الجميع.' }
];

export const generalFaqs = [
  { q: 'كيف أستطيع طلب خدمة من منصة هديل؟', a: 'يمكنك اختيار الخدمة المطلوبة من الموقع، الضغط على زر التفاصيل وتعبئة النموذج، أو التواصل المباشر معنا عبر الواتساب وإرسال المتطلبات.' },
  { q: 'ما هي طرق الدفع المتاحة؟', a: 'نوفر طرق دفع إلكترونية متعددة وآمنة تناسب جميع الطلاب داخل وخارج المملكة.' },
  { q: 'هل يمكنني طلب تعديل على العمل بعد الاستلام؟', a: 'نعم بكل تأكيد، نضمن لك تعديلات مجانية لتلبية الملاحظات الأكاديمية والوصول بالعمل إلى مستوى القبول والرضا الكامل.' },
  { q: 'كيف يتم ضمان سرية الخصوصية والبيانات؟', a: 'جميع معلومات الطلاب، البيانات الأكاديمية، والملفات المُرسلة تُعامل بسرية تامة ولا يتم إظهارها أو مشاركتها مع أي جهة.' }
]


  { name: 'عبدالله العتيبي', role: 'طالب بكالوريوس', text: 'ما شاء الله تبارك الله، سرعة ودقة في إعداد البحث والتزام بالتوثيق المعتمد APA. أنقذتوني في الوقت المناسب!', rating: 5 },
  { name: 'سارة الشمري', role: 'طالبة ماجستير', text: 'عرض الباوربوينت كان أكثر من رائع وتفاعلي، الدكتور أثنى على تنسيق الشرائح وطريقة عرض الأفكار. شكراً منصة هديل.', rating: 5 },
  { name: 'محمد الغامدي', role: 'طالب جامعي', text: 'خدمة متابعة التكليفات والبلاك بورد احترافية جداً وبمنتهى الخصوصية والأمانة. تعامل راقي ومستمر معكم بإذن الله.', rating: 5 }
]


  ['السرية والخصوصية', 'حماية كاملة لبيانات ومستندات ومعلومات الطلاب.'],
  ['التميز والدقة', 'أعمال متكاملة تفي بالمعايير والشروط الجامعية.'],
  ['الالتزام بالمواعيد', 'احترام وقتك وتسليم دقيق في الموعد المحدد.'],
]

  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedDetailService, setSelectedDetailService] = useState<typeof servicesDetailsData[0] | null>(null)
  const [formData, setFormData] = useState({ studentName: '', universityId: '', notes: '', fileName: '' })
  
  // تصفية الخدمات
  const [activeCategory, setActiveCategory] = useState<'all' | 'research' | 'design' | 'academic'>('all')

  ]
  const [achievementIndex, setAchievementIndex] = useState(0)
  const [achievementPaused, setAchievementPaused] = useState(false)
  const achievementImages = ['/images/hadeel-achievements.png', '/images/hadeel-achievement-test.jpg']

  useEffect(() => {
    if (achievementPaused) return
    const timer = window.setInterval(() => setAchievementIndex((current) => (current + 1) % achievementImages.length), 3000)
    return () => window.clearInterval(timer)
