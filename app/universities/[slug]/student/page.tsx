
import { notFound } from "next/navigation"

import { supabase } from "@/lib/supabase"

import {
  universities as fallbackUniversities,
  type University,
} from "@/app/components/universities/data"

import StudentPortalContent, {
  type StudentFile,
} from "./StudentPortalContent"

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

export default async function StudentPage({
  params,
}: PageProps) {
  const { slug } = await params

  const { data, error } = await supabase
    .from("universities")
    .select(
      "id, slug, name, city, description, founded, logo_url"
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
  let files: StudentFile[] = []

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

    const { data: fileData, error: filesError } =
      await supabase
        .from("university_files")
        .select(
          "id, title, file_url, file_type, display_order"
        )
        .eq("university_id", row.id)
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false })

    if (filesError) {
      console.error(
        "تعذر تحميل ملفات بوابة الطالب:",
        filesError.message
      )
    } else {
      files = (fileData || []) as StudentFile[]
    }
  } else {
    university = fallback!
  }

  return (
    <StudentPortalContent
      university={university}
      files={files}
    />
  )
}
