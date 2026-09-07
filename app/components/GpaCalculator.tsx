'use client';
import React, { useState } from 'react';
import { Calculator, X } from 'lucide-react';

export default function GpaCalculator() {
  const [gpaSystem, setGpaSystem] = useState<4 | 5>(5);
  const [courses, setCourses] = useState([
    { name: 'المادة 1', hours: 3, grade: 5 },
    { name: 'المادة 2', hours: 2, grade: 4.5 },
  ]);
  const [calculatedGpa, setCalculatedGpa] = useState<number | null>(null);

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

  return (
    <section id="gpa" className="py-20 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Calculator size={18} /> أداة تفاعلية
          </div>
          <h2 className="text-3xl font-bold">حاسبة المعدل التراكمي (GPA)</h2>
          <p className="text-slate-400 mt-2">احسب معدلك الفصلي أو التراكمي بدقة وسهولة</p>
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
                  className="sm:col-span-5 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
                <select
                  value={course.hours}
                  onChange={(e) => {
                    const updated = [...courses];
                    updated[idx].hours = Number(e.target.value);
                    setCourses(updated);
                  }}
                  className="sm:col-span-3 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
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
                  className="sm:col-span-3 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  {gpaSystem === 5 ? (
                    <>
                      <option value={5}>A+ (5.00)</option>
                      <option value={4.75}>A (4.75)</option>
                      <option value={4.5}>B+ (4.50)</option>
                      <option value={4.0}>B (4.00)</option>
                      <option value={3.5}>C+ (3.50)</option>
                      <option value={3.0}>C (3.00)</option>
                      <option value={2.5}>D+ (2.50)</option>
                      <option value={2.0}>D (2.00)</option>
                    </>
                  ) : (
                    <>
                      <option value={4}>A (4.00)</option>
                      <option value={3.5}>B+ (3.50)</option>
                      <option value={3.0}>B (3.00)</option>
                      <option value={2.5}>C+ (2.50)</option>
                      <option value={2.0}>C (2.00)</option>
                    </>
                  )}
                </select>
                <button onClick={() => setCourses(courses.filter((_, i) => i !== idx))} className="sm:col-span-1 text-red-400 hover:text-red-300 flex justify-center py-2">
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
            <button
              onClick={() => setCourses([...courses, { name: `المادة ${courses.length + 1}`, hours: 3, grade: gpaSystem }])}
              className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              + إضافة مادة
            </button>
            <button onClick={calculateGPA} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all">
              حساب المعدل الآن
            </button>
          </div>

          {calculatedGpa !== null && (
            <div className="bg-blue-600/20 border border-blue-500/40 rounded-xl p-6 text-center">
              <span className="text-slate-300 text-sm font-medium block mb-1">المعدل المحسوب:</span>
              <span className="text-4xl font-extrabold text-blue-400">{calculatedGpa}</span>
              <span className="text-slate-400 text-sm"> / {gpaSystem}.00</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

