import { notFound } from "next/navigation"

import { universities } from "@/app/components/universities/data"
import CollegesContent from "./CollegesContent"

type PageProps = {
  params: {
    slug: string
  }
}

export default function CollegesPage({ params }: PageProps) {
  const university = universities.find(
    (item) => item.slug === params.slug
  )

  if (!university) {
    notFound()
  }

  return <CollegesContent university={university} />
}