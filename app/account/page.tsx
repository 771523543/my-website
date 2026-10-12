'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type StudentProfile = {
  full_name: string
  phone: string
  university: string
  major: string
  academic_level: string
}

const emptyProfile: StudentProfile = {
  full_name: '',
  phone: '',
  university: '',
  major: '',
  academic_level: '',
}

export default function AccountPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [profile, setProfile] =
    useState<StudentProfile>(emptyProfile)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadAccount() {
      try {
        const { data, error: userError } =
          await supabase.auth.getUser()

        if (userError || !data.user) {
          router.replace('/auth/login')
          return
        }

        if (!active) return

        setEmail(data.user.email ?? '')

        const { data: student, error: profileError } =
          await supabase
            .from('student_profiles')
            .select(
              'full_name, phone, university, major, academic_level'
            )
            .eq('id', data.user.id)
            .maybeSingle()

        if (profileError) throw profileError

        if (!active) return

        if (student) {
          setProfile({
            full_name: student.full_name ?? '',
            phone: student.phone ?? '',
            university: student.university ?? '',
            major: student.major ?? '',
            academic_level: student.academic_level ?? '',
          })
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'تعذر تحميل بيانات الحساب.'
          )
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    loadAccount()

    return () => {
      active = false
    }
  }, [router])

  function updateField(
    field: keyof StudentProfile,
    value: string
  ) {
    setProfile((current) => ({
      ...current,
      [field]: value,
    }))
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')
    setSaving(true)

    try {
      const { data, error: userError } =
        await supabase.auth.getUser()

      if (userError || !data.user) {
        router.replace('/auth/login')
        return
      }

      const { error: saveError } = await supabase
        .from('student_profiles')
        .upsert(
          {
            id: data.user.id,
            full_name: profile.full_name.trim() || null,
            phone: profile.phone.trim() || null,
            university: profile.university.trim() || null,
            major: profile.major.trim() || null,
            academic_level:
              profile.academic_level.trim() || null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        )

      if (saveError) throw saveError

      setMessage('تم حفظ بياناتك بنجاح.')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'تعذر حفظ البيانات. حاول مرة أخرى.'
      )
    } finally {
      setSaving(false)
    }
  }

  async function signOut() {
    setError('')

    const { error: signOutError } =
      await supabase.auth.signOut()

    if (signOutError) {
      setError(signOutError.message)
      return
    }

    router.replace('/auth/login')
    router.refresh()
  }

  const inputClass =
    'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100'

  const fields: {
    key: keyof StudentProfile
    label: string
    placeholder: string
    type?: string
  }[] = [
    {
      key: 'full_name',
      label: 'الاسم الكامل',
      placeholder: 'اكتب اسمك الكامل',
    },
    {
      key: 'phone',
      label: 'رقم الهاتف',
      placeholder: 'اكتب رقم الهاتف',
      type: 'tel',
    },
    {
      key: 'university',
      label: 'الجامعة',
      placeholder: 'اسم الجامعة',
    },
    {
      key: 'major',
      label: 'التخصص',
      placeholder: 'التخصص الدراسي',
    },
    {
      key: 'academic_level',
      label: 'المستوى الدراسي',
      placeholder: 'مثال: المستوى الثالث',
    },
  ]

  if (loading) {
    return (
      <main
        dir="rtl"
        className="mx-auto max-w-3xl px-4 py-16 text-center"
      >
        جارٍ تحميل بيانات حسابك...
      </main>
    )
  }

  return (
    <main
      dir="rtl"
      className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12"
    >
      <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
        <header className="bg-blue-700 px-6 py-8 text-white sm:px-8">
          <h1 className="text-2xl font-bold">
            حساب الطالب
          </h1>
          <p className="mt-3 break-all text-sm text-blue-50">
            البريد الإلكتروني: {email}
          </p>
        </header>

        <div className="p-5 sm:p-8">
          <h2 className="mb-2 text-lg font-bold text-gray-900">
            بياناتك الشخصية
          </h2>

          <p className="mb-6 text-sm leading-7 text-gray-600">
            يمكنك إضافة بياناتك أو تعديلها لاحقًا.
            لا يلزم تعبئة جميع الحقول.
          </p>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
            >
              {error}
            </div>
          )}

          {message && (
            <div
              role="status"
              className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
            >
              {message}
            </div>
          )}

          <form onSubmit={saveProfile} className="space-y-5">
            {fields.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={field.key}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  {field.label} (اختياري)
                </label>

                <input
                  id={field.key}
                  type={field.type ?? 'text'}
                  value={profile[field.key]}
                  onChange={(event) =>
                    updateField(field.key, event.target.value)
                  }
                  placeholder={field.placeholder}
                  className={inputClass}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-blue-700 px-4 py-3.5 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60"
            >
              {saving ? 'جارٍ الحفظ...' : 'حفظ البيانات'}
            </button>
          </form>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h2 className="mb-3 font-bold text-gray-900">
              الخدمات الطلابية
            </h2>

            <p className="mb-4 text-sm leading-7 text-gray-600">
              يمكنك العودة إلى المنصة لاستكشاف الخدمات المتاحة.
            </p>

            <Link
              href="/services"
              className="inline-flex rounded-xl border border-blue-700 px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              استعراض الخدمات
            </Link>
          </div>

          <button
            type="button"
            onClick={signOut}
            className="mt-6 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            تسجيل الخروج
          </button>
        </div>
      </section>
    </main>
  )
}