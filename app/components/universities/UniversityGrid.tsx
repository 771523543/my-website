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
university_colleges: { id: string }[] | null
}

export default async function UniversityGrid() {
// منع عرض نسخة قديمة مخزنة من بيانات الجامعات
noStore()

const { data, error } = await supabase
.from("universities")
.select(
"id, slug, name, city, description, founded, logo_url, university_colleges(id)"
)
.eq("published", true)
.order("display_order", { ascending: true })
.order("name", { ascending: true })

if (error) {
console.error(
"تعذر تحميل الجامعات من قاعدة البيانات:",
error.message
)
}

const rows = (data || []) as UniversityRow[]

const databaseUniversities: University[] = rows.map((row) => {
const fallback = fallbackUniversities.find(
(university) => university.slug === row.slug
)

return {
  slug: row.slug,
  name: row.name,
  logo: row.logo_url?.trim() || fallback?.logo || "",
  founded: row.founded ? `${row.founded}م` : "غير محدد",
  city: row.city || "غير محدد",
  description: row.description || "",
  colleges: (row.university_colleges || []).map(() => ({
    name: "",
    majors: [],
  })),
}

})

const displayedUniversities =
!error && databaseUniversities.length > 0
? databaseUniversities
: fallbackUniversities

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