export type University = {
  slug: string
  name: string
  shortName: string
  description: string
  services: {
    title: string
    description: string
    icon: string
  }[]
}

export const universities: University[] = [
  {
    slug: "university-1",
    name: "الجامعة الأولى",
    shortName: "الجامعة الأولى",
    description: "دليلك للخدمات والأنظمة والتعليمات الجامعية.",
    services: [
      {
        title: "تسجيل الدخول",
        description: "شرح طريقة الدخول إلى النظام الجامعي والوصول إلى حسابك.",
        icon: "🔐",
      },
      {
        title: "التسجيل في المقررات",
        description: "خطوات تسجيل المقررات الدراسية وإدارة الجدول.",
        icon: "📚",
      },
      {
        title: "الخدمات الإلكترونية",
        description: "الوصول إلى أهم الخدمات والأنظمة الإلكترونية.",
        icon: "💻",
      },
      {
        title: "اللوائح والتعليمات",
        description: "أهم اللوائح والتعليمات التي يحتاجها الطالب.",
        icon: "📋",
      },
    ],
  },

  {
    slug: "university-2",
    name: "الجامعة الثانية",
    shortName: "الجامعة الثانية",
    description: "الخدمات والأنظمة والشروحات المهمة لطلاب الجامعة.",
    services: [
      {
        title: "بوابة الطالب",
        description: "شرح الدخول واستخدام بوابة الطالب.",
        icon: "🎓",
      },
      {
        title: "الخدمات الأكاديمية",
        description: "أهم الخدمات الأكاديمية المتاحة للطلاب.",
        icon: "📖",
      },
      {
        title: "الجداول الدراسية",
        description: "شرح الوصول إلى الجدول الدراسي ومتابعته.",
        icon: "📅",
      },
      {
        title: "الأنظمة الإلكترونية",
        description: "دليل استخدام الأنظمة الإلكترونية الجامعية.",
        icon: "💻",
      },
    ],
  },
]