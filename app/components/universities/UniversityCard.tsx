"use client"

import Link from "next/link"
import { ArrowLeft, GraduationCap } from "lucide-react"
import type { University } from "./data"

type Props = {
  university: University
}

export default function UniversityCard({ university }: Props) {
  return (
    <Link
      href={`/universities/${university.slug}`}
      className="university-card"
    >
      <div className="university-card-icon">
        <GraduationCap size={28} />
      </div>

      <div className="university-card-content">
        <h3>{university.name}</h3>
        <p>{university.description}</p>
      </div>

      <div className="university-card-footer">
        <span>عرض الخدمات</span>
        <ArrowLeft size={18} />
      </div>
    </Link>
  )
}