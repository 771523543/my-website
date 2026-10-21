import { notFound } from "next/navigation"

import { supabase } from "@/lib/supabase"
import {
universities,
type University,
} from "@/app/components/universities/data"

import CollegesContent from "./CollegesContent"

type PageProps = {
params: { slug: string } | Promise<{ slug: string }>
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
display_order: number
}

type MajorRow = {
id: string
college_id: string
name: string
display_order: number
}

export default async function CollegesPage({
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

if (error) {
console.error("خطأ تحميل الجامعة:", error.message)
}

if (!data) {
const fallback = universities.find(
(item) => item.slug === slug
)

if (!fallback) {
  notFound()
}

return <CollegesContent university={fallback!} />

}

const universityRow = data as UniversityRow

const { data: collegesData, error: collegesError } =
await supabase
.from("university_colleges")
.select("id, name, display_order")
.eq("university_id", universityRow.id)
.order("display_order", { ascending: true })

if (collegesError) {
console.error(
"خطأ تحميل الكليات:",
collegesError.message
)
throw new Error("تعذر تحميل كليات الجامعة من قاعدة البيانات.")
}

const collegeRows = (collegesData ?? []) as CollegeRow[]
const collegeIds = collegeRows.map((college) => college.id)

let majorRows: MajorRow[] = []

if (collegeIds.length > 0) {
const { data: majorsData, error: majorsError } =
await supabase
.from("university_majors")
.select("id, college_id, name, display_order")
.in("college_id", collegeIds)
.order("display_order", { ascending: true })

if (majorsError) {
  console.error(
    "خطأ تحميل التخصصات:",
    majorsError.message
  )
  throw new Error(
    "تعذر تحميل تخصصات الجامعة من قاعدة البيانات."
  )
}

majorRows = (majorsData ?? []) as MajorRow[]

}

const fallbackUniversity = universities.find(
(item) => item.slug === universityRow.slug
)

const university: University = {
slug: universityRow.slug,
name: universityRow.name,
logo:
universityRow.logo_url ||
fallbackUniversity?.logo ||
"",
founded: universityRow.founded
? "${universityRow.founded}م"
: "غير محدد",
city: universityRow.city || "غير محدد",
description: universityRow.description || "",
colleges: collegeRows.map((college) => ({
name: college.name,
majors: majorRows
.filter((major) => major.college_id === college.id)
.map((major) => major.name),
})),
}

return <CollegesContent university={university} />
}