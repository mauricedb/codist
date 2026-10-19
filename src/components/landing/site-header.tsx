import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Logo } from "./logo"

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Principles", href: "#principles" },
]

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-8">
        <Logo />
        <nav aria-label="Main" className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={buttonVariants({
                variant: "ghost",
                className: "hidden h-10 px-3 text-[0.9375rem] sm:inline-flex",
              })}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/app/today"
            className={buttonVariants({
              className: "ml-2 h-10 px-4 text-[0.9375rem]",
            })}
          >
            Open app
          </Link>
        </nav>
      </div>
    </header>
  )
}
