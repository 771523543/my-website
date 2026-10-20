
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Database,
  GraduationCap,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react"

import { supabase } from "@/lib/supabase"
import { universities } from "@/app/components/universities/data"

type CollegeRow = {
  id: string
  name: string
}

type UniversityRow = {
  id: string
}

type MajorRow = {
  college_id: string
  name: string
}

type ImportSummary = {
  universitiesAdded: number
  collegesAdded: number
  majorsAdded: number
}

export default function ImportUniversitiesPage() {
  const router = useRouter()

  const [checking, setChecking] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const [running, setRunning] = useState(false)
  const [progress, setProgress] = useState("")
  const [error, setError] = useState("")
  const [summary, setSummary] = useState<ImportSummary | null>(null)

  useEffect(() => {
    let active = true

    async function checkAdmin() {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser()

      if (!active) return

      if (authError || !user) {
        router.replace(
          "/auth/login?next=%2Fadmin%2Funiversities%2Fimport"
        )
        return
      }

      const { data, error: roleError } =
        await supabase.rpc("is_hadeel_admin")

      if (!active) return

      setAllowed(!roleError && data === true)
      setChecking(false)
    }

    void checkAdmin()

    return () => {
      active = false
    }
  }, [router])

  async function importData() {
    if (running || !allowed) return

    setRunning(true)
    setError("")
    setSummary(null)

    const result: ImportSummary = {
      universitiesAdded: 0,
      collegesAdded: 0,
      majorsAdded: 0,
    }

    try {
      for (let index = 0; index < universities.length; index++) {
        const source = universities[index]

        setProgress(
          `جاري معالجة الجامعة ${index + 1} من ${universities.length}: ${source.name}`
        )

        // البحث عن الجامعة أولًا حتى لا تتكرر.
        const { data: existingUniversity, error: findError } =
          await supabase
            .from("universities")
            .select("id")
            .eq("slug", source.slug)
            .maybeSingle()

        if (findError) throw findError

        let universityId: string

        if (existingUniversity) {
          universityId = (existingUniversity as UniversityRow).id
        } else {
          const foundedMatch = source.founded.match(/\d{4}/)

          const { data: insertedUniversity, error: insertError } =
            await supabase
              .from("universities")
              .insert({
                slug: source.slug,
                name: source.name,
                city: source.city,
                description: source.description,
                founded: foundedMatch
                  ? Number(foundedMatch[0])
                  : null,
                logo_url: source.logo,
                published: true,
                display_order: index,
              })
              .select("id")
              .single()

          if (insertError) throw insertError

          universityId = insertedUniversity.id
          result.universitiesAdded++
        }

        // جلب الكليات الموجودة لهذه الجامعة.
        const { data: currentColleges, error: collegesError } =
          await supabase
            .from("university_colleges")
            .select("id, name")
            .eq("university_id", universityId)

        if (collegesError) throw collegesError

        const knownCollegeNames = new Set(
          ((currentColleges ?? []) as CollegeRow[]).map(
            (college) => college.name
          )
        )

        const collegesToAdd = source.colleges
          .map((college, collegeIndex) => ({
            university_id: universityId,
            name: college.name,
            description: null,
            display_order: collegeIndex,
          }))
          .filter((college) => {
            if (knownCollegeNames.has(college.name)) return false
            knownCollegeNames.add(college.name)
            return true
          })

        if (collegesToAdd.length > 0) {
          const { error: addCollegesError } = await supabase
            .from("university_colleges")
            .insert(collegesToAdd)

          if (addCollegesError) throw addCollegesError

          result.collegesAdded += collegesToAdd.length
        }

        // إعادة جلب الكليات للحصول على معرف كل كلية.
        const { data: allColleges, error: reloadError } =
          await supabase
            .from("university_colleges")
            .select("id, name")
            .eq("university_id", universityId)

        if (reloadError) throw reloadError

        const collegeRows = (allColleges ?? []) as CollegeRow[]
        const collegeByName = new Map(
          collegeRows.map((college) => [college.name, college.id])
        )

        if (collegeRows.length === 0) continue

        // جلب التخصصات الحالية دفعة واحدة.
        const collegeIds = collegeRows.map((college) => college.id)

        const { data: currentMajors, error: majorsError } =
          await supabase
            .from("university_majors")
            .select("college_id, name")
            .in("college_id", collegeIds)

        if (majorsError) throw majorsError

        const knownMajors = new Set(
          ((currentMajors ?? []) as MajorRow[]).map(
            (major) => `${major.college_id}::${major.name}`
          )
        )

        const majorsToAdd: {
          college_id: string
          name: string
          degree: null
          description: null
          display_order: number
        }[] = []

        for (const sourceCollege of source.colleges) {
          const collegeId = collegeByName.get(sourceCollege.name)

          if (!collegeId) continue

          sourceCollege.majors.forEach((majorName, majorIndex) => {
            const key = `${collegeId}::${majorName}`

            if (knownMajors.has(key)) return

            knownMajors.add(key)

            majorsToAdd.push({
              college_id: collegeId,
              name: majorName,
              degree: null,
              description: null,
              display_order: majorIndex,
            })
          })
        }

        if (majorsToAdd.length > 0) {
          const { error: addMajorsError } = await supabase
            .from("university_majors")
            .insert(majorsToAdd)

          if (addMajorsError) throw addMajorsError

          result.majorsAdded += majorsToAdd.length
        }
      }

      setSummary(result)
      setProgress("اكتمل نقل البيانات بنجاح.")
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ أثناء نقل البيانات."
      )
      setProgress(
        "توقفت العملية بسبب خطأ. يمكنك معالجة الخطأ ثم إعادة المحاولة."
      )
    } finally {
      setRunning(false)
    }
  }

  if (checking) {
    return (
      <main
        dir="rtl"
        className="min-h-screen flex items-center justify-center p-6"
      >
        <LoaderCircle className="animate-spin" size={30} />
        <p className="mr-3">جارٍ التحقق من صلاحيات الإدارة...</p>
      </main>
    )
  }

  if (!allowed) {
    return (
      <main
        dir="rtl"
        className="min-h-screen flex items-center justify-center p-6"
      >
        <section className="max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
          <ShieldCheck className="mx-auto mb-4" size={42} />
          <h1 className="text-xl font-bold">صلاحيات الإدارة مطلوبة</h1>
          <p className="mt-3 text-gray-600">
            هذه العملية متاحة للمشرفين المعتمدين فقط.
          </p>
          <button
            onClick={() => router.push("/admin/universities")}
            className="mt-5 rounded-xl bg-blue-700 px-5 py-3 text-white"
          >
            العودة إلى إدارة الجامعات
          </button>
        </section>
      </main>
    )
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6"
    >
      <div className="mx-auto max-w-3xl space-y-6">
        <button
          onClick={() => router.push("/admin/universities")}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-700"
        >
          <ArrowRight size={18} />
          العودة إلى إدارة الجامعات
        </button>

        <section className="rounded-3xl bg-gradient-to-br from-blue-950 to-blue-700 p-7 text-white shadow-lg sm:p-9">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <GraduationCap size={32} />
          </div>

          <p className="text-sm text-blue-100">
            منصة هديل · أدوات إدارة البيانات
          </p>

          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
            نقل بيانات الجامعات
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-blue-50">
            نقل بيانات الجامعات والكليات والتخصصات من الملف الحالي
            إلى قاعدة البيانات، لتصبح جاهزة للربط مع صفحات الموقع.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Database size={25} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                البيانات التي ستُنقل
              </h2>

              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>
                  • الجامعات الموجودة في الملف: {universities.length} جامعة.
                </li>
                <li>• الكليات التابعة لكل جامعة.</li>
                <li>• التخصصات التابعة لكل كلية.</li>
                <li>• شعارات الجامعات المحلية المسجلة في الملف.</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            العملية لا تحذف البيانات الموجودة ولا تستبدل بيانات الجامعات
            المسجلة مسبقًا. وهي تتجاوز الجامعة أو الكلية أو التخصص الموجود
            بالاسم نفسه لتجنب التكرار.
          </div>

          {progress && (
            <div
              className="mt-5 rounded-xl bg-slate-100 p-4 text-sm leading-6 text-slate-700"
              role="status"
            >
              {running && (
                <LoaderCircle
                  className="ml-2 inline animate-spin"
                  size={16}
                />
              )}
              {progress}
            </div>
          )}

          {error && (
            <div
              className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
              role="alert"
            >
              تعذر إكمال العملية: {error}
            </div>
          )}

          {summary && (
            <div
              className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-5"
              role="status"
            >
              <h3 className="font-bold text-emerald-900">
                ملخص عملية النقل
              </h3>

              <ul className="mt-3 space-y-2 text-sm text-emerald-900">
                <li>الجامعات الجديدة: {summary.universitiesAdded}</li>
                <li>الكليات الجديدة: {summary.collegesAdded}</li>
                <li>التخصصات الجديدة: {summary.majorsAdded}</li>
              </ul>

              <p className="mt-3 text-sm leading-6 text-emerald-800">
                هذه أعداد السجلات التي أُضيفت خلال هذه العملية فقط؛
                وقد تكون هناك سجلات موجودة مسبقًا تم تجاوزها.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={importData}
            disabled={running}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-4 font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {running ? (
              <>
                <LoaderCircle className="animate-spin" size={20} />
                جارٍ نقل البيانات...
              </>
            ) : (
              <>
                <Database size={20} />
                بدء نقل البيانات إلى Supabase
              </>
            )}
          </button>
        </section>
      </div>
    </main>
  )
}
