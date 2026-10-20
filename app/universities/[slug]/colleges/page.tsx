
import { notFound } from "next/navigation"

import { supabase } from "@/lib/supabase"
import {
  universities,
  type University,
} from "@/app/components/universities/data"

import CollegesContent from "./CollegesContent"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

type UniversityRow = {
  id: string
  slug: string
  name: string
  city: string | null
  description: string | null
  founded: number | null
  logo_url: string | null
}

type CollegeRow = {
  id: string
  name: string
  university_majors: { name: string }[] | null
}

export default async function CollegesPage({
  params,
}: PageProps) {
  // قراءة المسار بالطريقة المتوافقة مع صفحات الجامعة الأخرى
  const { slug } = await params

  const { data, error } = await supabase
    .from("universities")
    .select(
      "id, slug, name, city, description, founded, logo_url"
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle()

  if (error) {
    console.error(
      "تعذر تحميل بيانات الجامعة:",
      error.message
    )
  }

  if (!data) {
    const fallback = universities.find(
      (university) => university.slug === slug
    )

    // لا نعرض 404 إذا كانت الجامعة موجودة في البيانات المحلية
    if (!fallback) {
      notFound()
    }

    return <CollegesContent university={fallback!} />
  }

  const universityRow = data as UniversityRow

  const { data: collegeData, error: collegesError } =
    await supabase
      .from("university_colleges")
      .select("id, name, university_majors(name)")
      .eq("university_id", universityRow.id)
      .order("display_order", { ascending: true })

  if (collegesError) {
    console.error(
      "تعذر تحميل كليات الجامعة:",
      collegesError.message
    )
  }

  const fallbackUniversity = universities.find(
    (item) => item.slug === universityRow.slug
  )

  const collegeRows = (collegeData || []) as CollegeRow[]

  const university: University = {
    slug: universityRow.slug,
    name: universityRow.name,
    logo:
      universityRow.logo_url ||
      fallbackUniversity?.logo ||
      "",
    founded: universityRow.founded
      ? `${universityRow.founded}م`
      : "غير محدد",
    city: universityRow.city || "غير محدد",
    description: universityRow.description || "",
    colleges: collegeRows.map((college) => ({
      name: college.name,
      majors: (college.university_majors || []).map(
        (major) => major.name
      ),
    })),
  }

  return <CollegesContent university={university} />
}
