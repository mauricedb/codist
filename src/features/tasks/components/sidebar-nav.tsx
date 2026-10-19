"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarIcon, InboxIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/app/inbox", label: "Inbox", icon: InboxIcon },
  { href: "/app/today", label: "Today", icon: CalendarIcon },
] as const

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Views">
      <ul className="flex flex-col gap-0.5">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent",
                  isActive &&
                    "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                )}
              >
                <Icon aria-hidden className="size-4" />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
