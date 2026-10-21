
import { unstable_noStore as noStore } from "next/cache"
import UniversityCard from "./UniversityCard"
import { universities as fallbackUniversities } from "./data"
import type { University } from "./data"
import { supabase } from "@/lib/supabase"

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
  university_id: string
}

export default async function UniversityGrid() {
  noStore()

  const { data, error } = await supabase
    .from("universities")
    .select(
      "id, slug, name, city, description, founded, logo_url"
    )
    .eq("published", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true })

  if (error) {
    console.error(
      "تعذر تحميل الجامعات من قاعدة البيانات:",
      error.message
    )

    return (
      <div className="university-grid">
        {fallbackUniversities.map((university) => (
          <UniversityCard
            key={university.slug}
            university={university}
          />
        ))}
      </div>
    )
  }

  const rows = (data ?? []) as UniversityRow[]

  if (rows.length === 0) {
    return (
      <div className="university-grid">
        <p>لا توجد جامعات منشورة حاليًا.</p>
      </div>
    )
  }

  const universityIds = rows.map((university) => university.id)

  const { data: collegeData, error: collegeError } = await supabase
    .from("university_colleges")
    .select("university_id")
    .in("university_id", universityIds)

  if (collegeError) {
    console.error(
      "تعذر تحميل أعداد الكليات:",
      collegeError.message
    )
  }

  const collegeRows = (collegeData ?? []) as CollegeRow[]
  const collegeCounts = new Map<string, number>()

  for (const college of collegeRows) {
    collegeCounts.set(
      college.university_id,
      (collegeCounts.get(college.university_id) ?? 0) + 1
    )
  }

  const displayedUniversities: University[] = rows.map((row) => {
    const fallback = fallbackUniversities.find(
      (university) => university.slug === row.slug
    )

    const collegeCount = collegeCounts.get(row.id) ?? 0

    return {
      slug: row.slug,
      name: row.name,
      logo: row.logo_url?.trim() || fallback?.logo || "",
      founded: row.founded ? `${row.founded}م` : "غير محدد",
      city: row.city || "غير محدد",
      description: row.description || "",
      colleges: Array.from({ length: collegeCount }, () => ({
        name: "",
        majors: [],
      })),
    }
  })

  return (
    <div className="university-grid">
      {displayedUniversities.map((university) => (
        <UniversityCard
          key={university.slug}
          university={university}
        />
      ))}
    </div>
  )
}
