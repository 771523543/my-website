import UniversityCard from "./UniversityCard"
import { universities } from "./data"

export default function UniversityGrid() {
  return (
    <div className="university-grid">
      {universities.map((university) => (
        <UniversityCard
          key={university.slug}
          university={university}
        />
      ))}
    </div>
  )
}