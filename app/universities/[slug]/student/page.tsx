
import { notFound } from "next/navigation"

import { supabase } from "@/lib/supabase"

import {
  universities as fallbackUniversities,
  type University,
} from "@/app/components/universities/data"

import StudentPortalContent from "./StudentPortalContent"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

type UniversityRow = {
  slug: string
  name: string
  city: string | null
  description: string | null
  founded: number | null
  logo_url: string | null
}

export default async function StudentPage({
  params,
}: PageProps) {
  const { slug } = await params

  const { data, error } = await supabase
    .from("universities")
    .select(
      "slug, name, city, description, founded, logo_url"
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle()

  const fallback = fallbackUniversities.find(
    (university) => university.slug === slug
  )

  if (error) {
    console.error(
      "تعذر تحميل بيانات الجامعة لبوابة الطالب:",
      error.message
    )
  }

  if (!data && !fallback) {
    notFound()
  }

  let university: University

  if (data) {
    const row = data as UniversityRow

    university = {
      slug: row.slug,
      name: row.name,
      logo:
        row.logo_url ||
        fallback?.logo ||
        "/images/king-saud-university.jpg",
      founded: row.founded
        ? `${row.founded}م`
        : fallback?.founded || "غير محدد",
      city: row.city || fallback?.city || "غير محدد",
      description:
        row.description ||
        fallback?.description ||
        "",
      colleges: fallback?.colleges || [],
    }
  } else {
    university = fallback!
  }

  return (
    <StudentPortalContent university={university} />
  )
}
