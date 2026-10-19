import Link from "next/link"
import { ChevronRightIcon } from "lucide-react"

export function TextLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
    >
      {children}
      <ChevronRightIcon aria-hidden className="size-4" />
    </Link>
  )
}
