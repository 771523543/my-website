'use client'

import { useState } from 'react'
import { Calculator, Plus, Trash2 } from 'lucide-react'

export default function GpaCalculator() {
  const [gpaSystem, setGpaSystem] = useState<5 | 4>(5)
  const [courses, setCourses] = useState([
    { id: 1, hours: 3, grade: 5 },
    { id: 2, hours: 3, grade: 4.75 },
    { id: 3, hours: 2, grade: 4.5 }
  ])
  const [calculatedGpa, setCalculatedGpa] = useState<string | null>(null)
  const handleAddCourse = () => {
    setCourses([...courses, { id: Date.now(), hours: 3, grade: gpaSystem }])
  }
  const handleRemoveCourse = (id: number) => {
    if (courses.length > 1) setCourses(courses.filter(c => c.id !== id))
  }
  const handleCalculateGpa = () => {
    let totalPoints = 0
    let totalHours = 0
    courses.forEach(c => {
      totalPoints += c.hours * c.grade
      totalHours += c.hours
    })
    if (totalHours > 0) setCalculatedGpa((totalPoints / totalHours).toFixed(2))
  }
  return (
    <>
{/* حاسبة المعدل التراكمي (GPA Calculator) */}
<section id="gpa-calculator" className="section soft-section container" style={{ marginTop: '2rem', borderRadius: '16px', padding: '2rem' }}>
  <div className="center-heading">
    <span className="section-kicker">أداة تفاعلية</span>
    <h2>حاسبة <em>المعدل التراكمي (GPA)</em></h2>
    <p>احسب معدلك الفصل المتوقع بسهولة ودقة وفق السلم الأكاديمي المعتمد.</p>
  </div>

  <div style={{ maxWidth: '650px', margin: '0 auto', background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', justifyContent: 'center' }}>
      <button onClick={() => { setGpaSystem(5); setCalculatedGpa(null) }} style={{ padding: '0.4rem 1rem', borderRadius: '6px', border: '1px solid #10b981', background: gpaSystem === 5 ? '#10b981' : '#fff', color: gpaSystem === 5 ? '#fff' : '#333', fontWeight: 'bold', cursor: 'pointer' }}>نظام من 5</button>
      <button onClick={() => { setGpaSystem(4); setCalculatedGpa(null) }} style={{ padding: '0.4rem 1rem', borderRadius: '6px', border: '1px solid #10b981', background: gpaSystem === 4 ? '#10b981' : '#fff', color: gpaSystem === 4 ? '#fff' : '#333', fontWeight: 'bold', cursor: 'pointer' }}>نظام من 4</button>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      {courses.map((course, idx) => (
        <div key={course.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 'bold', width: '60px' }}>مادة {idx + 1}</span>
          <input type="number" min="1" max="6" value={course.hours} onChange={(e) => {
            const updated = [...courses]
            updated[idx].hours = Number(e.target.value)
            setCourses(updated)
          }} style={{ width: '80px', padding: '0.4rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.85rem' }} placeholder="ساعات" />
          
          <select value={course.grade} onChange={(e) => {
            const updated = [...courses]
            updated[idx].grade = Number(e.target.value)
            setCourses(updated)
          }} style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.85rem' }}>
            {gpaSystem === 5 ? (
              <>
                <option value={5}>ممتاز مرتفع (+A) - 5.0</option>
                <option value={4.75}>ممتاز (A) - 4.75</option>
                <option value={4.5}>جيد جداً مرتفع (+B) - 4.5</option>
                <option value={4.0}>جيد جداً (B) - 4.0</option>
                <option value={3.5}>جيد مرتفع (+C) - 3.5</option>
                <option value={3.0}>جيد (C) - 3.0</option>
                <option value={2.5}>مقبول مرتفع (+D) - 2.5</option>
                <option value={2.0}>مقبول (D) - 2.0</option>
                <option value={1.0}>راسب (F) - 1.0</option>
              </>
            ) : (
              <>
                <option value={4.0}>ممتاز (A) - 4.0</option>
                <option value={3.5}>جيد جداً مرتفع (+B) - 3.5</option>
                <option value={3.0}>جيد جداً (B) - 3.0</option>
                <option value={2.5}>جيد مرتفع (+C) - 2.5</option>
                <option value={2.0}>جيد (C) - 2.0</option>
                <option value={1.5}>مقبول (+D) - 1.5</option>
                <option value={1.0}>مقبول (D) - 1.0</option>
                <option value={0.0}>راسب (F) - 0.0</option>
              </>
            )}
          </select>

          <button onClick={() => handleRemoveCourse(course.id)} style={{ background: '#fee2e2', border: 'none', borderRadius: '6px', padding: '0.4rem', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={16} /></button>
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
      <button onClick={handleAddCourse} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f3f4f6', border: '1px solid #ccc', padding: '0.5rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}><Plus size={16} /> إضافة مادة</button>
      <button onClick={handleCalculateGpa} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#10b981', color: '#fff', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}><Calculator size={16} /> حساب المعدل</button>
    </div>

    {calculatedGpa !== null && (
      <div style={{ marginTop: '1.2rem', padding: '1rem', background: '#ecfdf5', borderRadius: '8px', textAlign: 'center', border: '1px solid #a7f3d0' }}>
        <span style={{ fontSize: '0.9rem', color: '#065f46', fontWeight: 'bold' }}>معدلك المتوقع:</span>
        <strong style={{ display: 'block', fontSize: '1.8rem', color: '#047857', marginTop: '0.2rem' }}>{calculatedGpa} / {gpaSystem}</strong>
      </div>
    )}
  </div>
</section>
    </>
  )
}
