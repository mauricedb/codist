import { StarIcon } from "lucide-react"

export function FiveStars() {
  return (
    <span role="img" aria-label="5 stars" className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} aria-hidden className="size-3.5 fill-current" />
      ))}
    </span>
  )
}
