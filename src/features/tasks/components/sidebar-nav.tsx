"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CalendarIcon, InboxIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/app/inbox", label: "Inbox", count: "inbox", icon: InboxIcon },
  { href: "/app/today", label: "Today", count: "today", icon: CalendarIcon },
] as const

export type TaskCounts = Record<(typeof links)[number]["count"], number>

export function SidebarNav({
  counts,
  variant = "sidebar",
}: {
  // Omitted while the counts load.
  counts?: TaskCounts
  // "tabs" is the bottom tab bar on small screens.
  variant?: "sidebar" | "tabs"
}) {
  const pathname = usePathname()

  return (
    <nav aria-label="Views">
      <ul className={cn("flex gap-0.5", variant === "sidebar" ? "flex-col" : "gap-2")}>
        {links.map(({ href, label, count, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <li key={href} className={cn(variant === "tabs" && "flex-1")}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center rounded-lg text-sidebar-foreground hover:bg-sidebar-accent",
                  variant === "sidebar"
                    ? "min-h-11 gap-3 px-3 font-medium"
                    : "min-h-13 flex-col justify-center gap-0.5 text-[0.8125rem] font-medium text-muted-foreground",
                  isActive &&
                    "bg-sidebar-accent font-semibold text-sidebar-accent-foreground shadow-[0_1px_2px_rgb(50_40_30/0.08)]"
                )}
              >
                <Icon
                  aria-hidden
                  className={cn(
                    variant === "sidebar" ? "size-4.5" : "size-5",
                    isActive && "text-brand"
                  )}
                />
                <span className={cn(variant === "sidebar" && "flex-1")}>
                  {label}
                  {variant === "tabs" && counts && ` · ${counts[count]}`}
                </span>
                {variant === "sidebar" && counts && (
                  <span className="font-mono text-[0.8125rem] font-normal text-muted-foreground">
                    {counts[count]}
                  </span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
