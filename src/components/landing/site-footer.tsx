import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { Logo } from "./logo"

const columns = [
  {
    title: "Features",
    links: ["How It Works", "For Teams", "Pricing", "Compare", "Templates"],
  },
  {
    title: "Resources",
    links: [
      "Download Apps",
      "Help Center",
      "Customer Stories",
      "Productivity Methods",
      "Integrations",
      "Channel Partners",
      "Developer API",
      "Status",
    ],
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Inspiration Hub", "Press", "Twist"],
  },
]

const socials = ["YouTube", "LinkedIn", "Instagram", "X"]

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 py-12 md:grid-cols-[2fr_1fr_1fr_1fr_auto] md:px-8">
        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Join millions of people who organize work and life with Codist.
          </p>
        </div>
        {columns.map(({ title, links }) => (
          <nav
            key={title}
            aria-label={title}
            className="flex flex-col gap-3 text-sm"
          >
            <h2 className="font-semibold">{title}</h2>
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <ul
          aria-label="Social media"
          className="flex flex-col gap-2 text-sm"
        >
          {socials.map((social) => (
            <li key={social}>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                {social}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground md:px-8">
        © <CopyrightYear /> Codist. All rights reserved.
      </p>
    </footer>
  )
}

async function CopyrightYear() {
  "use cache"
  return new Date().getFullYear()
}
