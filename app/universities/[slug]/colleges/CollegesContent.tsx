import { notFound } from "next/navigation"

import { supabase } from "@/lib/supabase"
import type { University } from "@/app/components/universities/data"

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
  const { slug } = await params

  // 1. جلب الجامعة المنشورة من قاعدة البيانات
  const {
    data: universityData,
    error: universityError,
  } = await supabase
    .from("universities")
    .select(
      "id, slug, name, city, description, founded, logo_url"
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle()

  if (universityError) {
    console.error(
      "خطأ في تحميل الجامعة:",
      universityError.message
    )

    throw new Error("تعذر تحميل بيانات الجامعة. يرجى المحاولة لاحقًا.")
  }

  if (!universityData) {
    notFound()
  }

  const universityRow = universityData as UniversityRow

  // 2. جلب كليات الجامعة وتخصصاتها المرتبطة بها
  const {
    data: collegeData,
    error: collegesError,
  } = await supabase
    .from("university_colleges")
    .select(
      "id, name, university_majors(name)"
    )
    .eq("university_id", universityRow.id)
    .order("display_order", { ascending: true })

  if (collegesError) {
    console.error(
      "خطأ في تحميل كليات الجامعة وتخصصاتها:",
      collegesError.message
    )

    throw new Error(
      "تعذر تحميل الكليات والتخصصات. يرجى المحاولة لاحقًا."
    )
  }

  const collegeRows = (collegeData ?? []) as CollegeRow[]

  // 3. تجهيز البيانات بنفس النوع الذي تستخدمه واجهة الصفحة الحالية
  const university: University = {
    slug: universityRow.slug,
    name: universityRow.name,
    logo: universityRow.logo_url || "",
    founded: universityRow.founded
      ? `${universityRow.founded}م`
      : "غير محدد",
    city: universityRow.city || "غير محدد",
    description: universityRow.description || "",
    colleges: collegeRows.map((college) => ({
      name: college.name,
      majors: (college.university_majors ?? []).map(
        (major) => major.name
      ),
    })),
  }

  return <CollegesContent university={university} />
}