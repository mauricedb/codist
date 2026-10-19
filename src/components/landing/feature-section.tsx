import { cn } from "@/lib/utils"

import { TextLink } from "./text-link"

type FeatureSectionProps = {
  eyebrow?: string
  title: string
  description: string
  link?: { label: string; href: string }
  visual: React.ReactNode
  reversed?: boolean
  children?: React.ReactNode
}

export function FeatureSection({
  eyebrow,
  title,
  description,
  link,
  visual,
  reversed,
  children,
}: FeatureSectionProps) {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:px-8 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <div
        className={cn(
          "flex flex-col items-start gap-4",
          reversed && "lg:order-last"
        )}
      >
        {eyebrow && (
          <p className="text-sm font-semibold text-muted-foreground">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="max-w-md text-muted-foreground">{description}</p>
        {link && <TextLink href={link.href}>{link.label}</TextLink>}
        {children}
      </div>
      <div className="rounded-2xl bg-muted p-6 md:p-10">{visual}</div>
    </section>
  )
}
