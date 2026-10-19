import Link from "next/link"
import { CheckIcon } from "lucide-react"

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 text-xl font-bold tracking-tight"
    >
      <span className="flex size-5.5 items-center justify-center rounded-md bg-primary text-brand">
        <CheckIcon aria-hidden strokeWidth={3} className="size-3.5" />
      </span>
      codist
    </Link>
  )
}
