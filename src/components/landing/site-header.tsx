import Link from "next/link"
import { ChevronDownIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Logo } from "./logo"

const navItems = [
  { label: "Made For", href: "#features", hasMenu: true },
  { label: "Resources", href: "#templates", hasMenu: true },
  { label: "Pricing", href: "/pricing", hasMenu: false },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <Logo />
        <nav aria-label="Main" className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={buttonVariants({
                variant: "ghost",
                className: "hidden md:inline-flex",
              })}
            >
              {item.label}
              {item.hasMenu && <ChevronDownIcon aria-hidden />}
            </Link>
          ))}
          <Link
            href="/login"
            className={buttonVariants({
              variant: "ghost",
              className: "hidden sm:inline-flex",
            })}
          >
            Log in
          </Link>
          <Link href="/signup" className={buttonVariants()}>
            Start for free
          </Link>
        </nav>
      </div>
    </header>
  )
}
