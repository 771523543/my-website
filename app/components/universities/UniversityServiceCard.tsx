type Props = {
  title: string
  description: string
  icon: string
}

export default function UniversityServiceCard({
  title,
  description,
  icon,
}: Props) {
  return (
    <div className="university-service-card">
      <div className="university-service-icon">
        {icon}
      </div>

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <span className="university-service-arrow">
        ←
      </span>
    </div>
  )
}