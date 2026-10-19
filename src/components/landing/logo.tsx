import Link from "next/link"
import { CheckIcon } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
      <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <CheckIcon aria-hidden className="size-4" />
      </span>
      codist
    </Link>
  )
}
