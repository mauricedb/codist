import Link from "next/link"

const links = [
  { label: "Features", href: "#features" },
  { label: "Principles", href: "#principles" },
  { label: "Open app", href: "/app/today" },
]

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 px-4 py-7 text-sm text-muted-foreground md:px-8">
        <p className="font-mono">
          codist · <CopyrightYear />
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-6">
            {links.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="hover:text-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}

async function CopyrightYear() {
  "use cache"
  return new Date().getFullYear()
}
