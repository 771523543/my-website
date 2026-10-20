import { notFound } from "next/navigation"

import { universities } from "@/app/components/universities/data"
import StudentPortalContent from "./StudentPortalContent"

type PageProps = {
params: {
slug: string
}
}

export default function StudentPage({ params }: PageProps) {
const university = universities.find(
(item) => item.slug === params.slug
)

if (!university) {
notFound()
}

return <StudentPortalContent university={university} />
}