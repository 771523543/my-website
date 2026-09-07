'use client';

import React, { useState } from 'react';
import {
  BookOpen, Calculator, Award, ArrowRight, MessageCircle,
  GraduationCap, CheckCircle, FileText, Sparkles, Copy, Layers,
  Menu, X, Phone, FileCheck, Brain, Search
} from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // GPA Calculator State
  const [gpaSystem, setGpaSystem] = useState<4 | 5>(5);
  const [courses, setCourses] = useState([
    { name: 'المادة 1', hours: 3, grade: 5 },
    { name: 'المادة 2', hours: 2, grade: 4.5 },
  ]);
  const [calculatedGpa, setCalculatedGpa] = useState<number | null>(null);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'إعداد الأبحاث والورقات العلمية',
    details: ''
  });

  const servicesData = [
    { 
      id: 1, 
      category: 'research', 
      title: 'إعداد الأبحاث والورقات العلمية', 
      desc: 'صياغة أبحاث متكاملة وفق معايير التوثيق المعتمدة (APA 7th) وتنسيق الهوامش والمراجع بدقة أكاديمية عالية.', 
      icon: BookOpen 
    },
    { 
      id: 2, 
      category: 'academic', 
      title: 'إعداد التقارير والمشاريع الميدانية', 
      desc: 'كتابة تقارير التدريب الميداني والتقارير الأكاديمية وتلخيص الدلائل والأنظمة وفق متطلبات كل كلية.', 
      icon: FileCheck 
    },
    { 
      id: 3, 
      category: 'academic', 
      title: 'حل التكليفات والواجبات', 
      desc: 'مساعدة دقيقة وحل واجبات مختلف المواد والتخصصات الأكاديمية بأسلوب علمي واضح.', 
      icon: FileText 
    },
    { 
      id: 4, 
      category: 'design', 
      title: 'تصميم العروض التقديمية (PowerPoint)', 
      desc: 'تصميم شرائح تفاعلية واحترافية تلخص المحتوى الأكاديمي والمهني لتقديم عرض ممتاز أمام اللجان.', 
      icon: Layers 
    },
    { 
      id: 5, 
      category: 'translation', 
      title: 'الترجمة الأكاديمية والتلخيص', 
      desc: 'ترجمة احترافية ومزدوجة بين العربية والإنجليزي للمقالات والمراجع مع تلخيص أهم الأفكار.', 
      icon: Sparkles 
    },
    { 
      id: 6, 
      category: 'design', 
      title: 'تصميم السير الذاتية (CV)', 
      desc: 'إنشاء وتنسيق سير ذاتية احترافية تتوافق مع نظام الفرز الآلي (ATS) لزيادة فرص القبول الوظيفي.', 
      icon: Award 
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeCategory);

  const handleCopyLink = (id: number) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const calculateGPA = () => {
    let totalHours = 0;
    let totalPoints = 0;
    courses.forEach(c => {
      totalHours += Number(c.hours);
      totalPoints += Number(c.hours) * Number(c.grade);
    });
    if (totalHours > 0) {
      setCalculatedGpa(Number((totalPoints / totalHours).toFixed(2)));
    }
  };

  const handleAddCourse = () => {
    setCourses([...courses, { name: `المادة ${courses.length + 1}`, hours: 3, grade: gpaSystem }]);
  };

  const handleRemoveCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const handleSendWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `السلام عليكم ورحمة الله، أرغب في الطلب من منصة هديل:\n*الاسم:* ${formData.name}\n*رقم التواصل:* ${formData.phone}\n*الخدمة:* ${formData.service}\n*تفاصيل الطلب:* ${formData.details}`;
    window.open(`https://wa.me/966500000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans" dir="rtl">
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              هديل
            </div>
            <div>
              <span className="text-xl font-bold text-slate-900 block leading-none">منصة هديل</span>
              <span className="text-xs text-slate-500 font-medium">مكتبة هديل للخدمات الطلابية والأكاديمية</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#services" className="hover:text-blue-600 transition-colors">الخدمات</a>
            <a href="#gpa" className="hover:text-blue-600 transition-colors">حاسبة المعدل</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">اطلب الآن</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all"
            >
              تواصل معنا
            </a>
          </div>

          <button 
            className="md:hidden text-slate-700 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-6 flex flex-col gap-4">
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-medium py-2">الخدمات</a>
            <a href="#gpa" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-medium py-2">حاسبة المعدل</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-slate-700 font-medium py-2">اطلب الآن</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-blue-50/50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Sparkles size={16} /> منصتكم الأولى لإنجاز الأعمال الأكاديمية
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            وجهتك الأكاديمية للإنجاز <span className="text-blue-600">والتميز العلمي</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            نساعدك في إعداد الأبحاث، التقارير الميدانية، حل الواجبات، وتصميم العروض التقديمية وفق المعايير واللوائح الجامعية المعتمدة.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#contact" 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
            >
              اطلب خدمتك عبر الواتساب <ArrowRight size={20} className="rotate-180" />
            </a>
            <a 
              href="#gpa" 
              className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
            >
              حاسبة المعدل التراكمي <Calculator size={20} />
            </a>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'توثيق أكاديمي', desc: 'معايير APA 7th المعتمدة' },
              { title: 'دقة وتسليم', desc: 'التزام تكتيكي بالمواعيد' },
              { title: 'سرية تامة', desc: 'حماية خصوصية بياناتك' },
              { title: 'مراجعة وتعديل', desc: 'متابعة مباشرة للطلب' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                <CheckCircle className="text-blue-600 mx-auto mb-2" size={24} />
                <h4 className="font-bold text-slate-800">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">خدمات منصة هديل</h2>
            <p className="text-slate-600">نقدم خيارات متكاملة تلبي احتياجات كافة التخصصات والجامعات</p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {[
                { id: 'all', label: 'كافة الخدمات' },
                { id: 'research', label: 'الأبحاث والتوثيق' },
                { id: 'academic', label: 'التقارير والتكليفات' },
                { id: 'translation', label: 'الترجمة والتلخيص' },
                { id: 'design', label: 'العروض والعروض الذاتية' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">{service.desc}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                    <button 
                      onClick={() => setSelectedService(service)}
                      className="text-blue-600 font-semibold text-sm hover:underline flex items-center gap-1"
                    >
                      عرض التفاصيل <ArrowRight size={16} className="rotate-180" />
                    </button>
                    <button 
                      onClick={() => handleCopyLink(service.id)}
                      className="text-slate-400 hover:text-slate-600 p-2 rounded-lg transition-colors"
                      title="مشاركة الرابط"
                    >
                      {copiedId === service.id ? <CheckCircle size={18} className="text-green-600" /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* GPA Calculator */}
      <section id="gpa" className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Calculator size={18} /> حاسبة منصة هديل
            </div>
            <h2 className="text-3xl font-bold">حاسبة المعدل التراكمي الفصلية والجامعية</h2>
            <p className="text-slate-400 mt-2">احسب معدلك بسهولة ودقة طبقاً للنظامين السداسي والخماسي</p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-6 md:p-8 border border-slate-700 shadow-2xl">
            <div className="flex justify-center mb-8 gap-4">
              <button
                onClick={() => { setGpaSystem(5); setCalculatedGpa(null); setCourses(courses.map(c => ({ ...c, grade: 5 }))); }}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${gpaSystem === 5 ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300'}`}
              >
                نظام من 5.00
              </button>
              <button
                onClick={() => { setGpaSystem(4); setCalculatedGpa(null); setCourses(courses.map(c => ({ ...c, grade: 4 }))); }}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${gpaSystem === 4 ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300'}`}
              >
                نظام من 4.00
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {courses.map((course, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center bg-slate-700/50 p-4 rounded-xl border border-slate-600">
                  <input
                    type="text"
                    value={course.name}
                    onChange={(e) => {
                      const updated = [...courses];
                      updated[idx].name = e.target.value;
                      setCourses(updated);
                    }}
                    placeholder="اسم المادة"
                    className="sm:col-span-5 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                  />
                  <select
                    value={course.hours}
                    onChange={(e) => {
                      const updated = [...courses];
                      updated[idx].hours = Number(e.target.value);
                      setCourses(updated);
                    }}
                    className="sm:col-span-3 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6].map(h => <option key={h} value={h}>{h} ساعات</option>)}
                  </select>
                  <select
                    value={course.grade}
                    onChange={(e) => {
                      const updated = [...courses];
                      updated[idx].grade = Number(e.target.value);
                      setCourses(updated);
                    }}
                    className="sm:col-span-3 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none"
                  >
                    {gpaSystem === 5 ? (
                      <>
                        <option value={5}>A+ ممتاز مرتفع (5.00)</option>
                        <option value={4.75}>A ممتاز (4.75)</option>
                        <option value={4.5}>B+ جيد جداً مرتفع (4.50)</option>
                        <option value={4.0}>B جيد جداً (4.00)</option>
                        <option value={3.5}>C+ جيد مرتفع (3.50)</option>
                        <option value={3.0}>C جيد (3.00)</option>
                        <option value={2.5}>D+ مقبول مرتفع (2.50)</option>
                        <option value={2.0}>D مقبول (2.00)</option>
                      </>
                    ) : (
                      <>
                        <option value={4}>A ممتاز (4.00)</option>
                        <option value={3.5}>B+ جيد جداً مرتفع (3.50)</option>
                        <option value={3.0}>B جيد جداً (3.00)</option>
                        <option value={2.5}>C+ جيد مرتفع (2.50)</option>
                        <option value={2.0}>C جيد (2.00)</option>
                      </>
                    )}
                  </select>
                  <button onClick={() => handleRemoveCourse(idx)} className="sm:col-span-1 text-red-400 hover:text-red-300 flex justify-center py-2">
                    <X size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
              <button
                onClick={handleAddCourse}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors"
              >
                + إضافة مادة جديدة
              </button>
              <button onClick={calculateGPA} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all">
                حساب المعدل الآن
              </button>
            </div>

            {calculatedGpa !== null && (
              <div className="bg-blue-600/20 border border-blue-500/40 rounded-xl p-6 text-center">
                <span className="text-slate-300 text-sm font-medium block mb-1">المعدل التراكمي المتوقع:</span>
                <span className="text-4xl font-extrabold text-blue-400">{calculatedGpa}</span>
                <span className="text-slate-400 text-sm"> / {gpaSystem}.00</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">نموذج طلب خدمة من مكتبة منصة هديل</h2>
            <p className="text-slate-600">تواصل مع فريقنا مباشرة لإنجاز أبحاثك وتكليفاتك بسرعة</p>
          </div>

          <form onSubmit={handleSendWhatsapp} className="bg-slate-50 border border-slate-100 p-8 rounded-2xl shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">اسم الطالب / الباحث</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="أدخل اسمك الكريم"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">رقم التواصل / الواتساب</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="05xxxxxxxx"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">نوع الخدمة المطلوب</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-600"
              >
                <option value="إعداد الأبحاث والورقات العلمية">إعداد الأبحاث والورقات العلمية</option>
                <option value="إعداد التقارير والمشاريع الميدانية">إعداد التقارير والمشاريع الميدانية</option>
                <option value="حل التكليفات والواجبات">حل التكليفات والواجبات الأكاديمية</option>
                <option value="تصميم العروض التقديمية (PowerPoint)">تصميم عروض تقديمية PowerPoint</option>
                <option value="الترجمة الأكاديمية والتلخيص">الترجمة الأكاديمية والتلخيص</option>
                <option value="تصميم السير الذاتية (CV)">تصميم سيرة ذاتية (CV)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">تفاصيل وحجم العمل (التخصص، عدد الصفحات، الموعد المطلوب)</label>
              <textarea
                rows={4}
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="اكتب هنا كافة تفاصيل وشروط الدكتور أو التكليف..."
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:border-blue-600"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} /> إرسال الطلب عبر الواتساب المباشر
            </button>
          </form>
        </div>
      </section>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-4 left-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{selectedService.title}</h3>
            <p className="text-slate-600 leading-relaxed mb-6">{selectedService.desc}</p>
            <a
              href="#contact"
              onClick={() => setSelectedService(null)}
              className="block w-full bg-blue-600 text-white text-center font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
            >
              اطلب هذه الخدمة الآن
            </a>
          </div>
        </div>
      )}

      {/* Floating Whatsapp Button */}
      <a
        href="https://wa.me/966500000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-600 hover:scale-110 transition-all flex items-center justify-center"
      >
        <MessageCircle size={28} />
      </a>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              هديل
            </div>
            <span className="text-white font-bold text-lg">منصة ومكتبة هديل للخدمات الطلابية</span>
          </div>
          <p className="text-sm text-center">جميع الحقوق محفوظة © {new Date().getFullYear()} منصة هديل</p>
        </div>
      </footer>

    </div>
  );
}
