import {
  BriefcaseIcon,
  HandshakeIcon,
  ListIcon,
  NotebookPenIcon,
  PlaneIcon,
  TargetIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TextLink } from "./text-link"

const categories = [
  "Work",
  "Personal",
  "Education",
  "Management",
  "Marketing & Sales",
  "Customer Support",
]

const templates = [
  {
    title: "Accounting Tasks",
    description:
      "Create a system to keep your books, receipts, and invoices organized.",
    icon: BriefcaseIcon,
  },
  {
    title: "Business Travel Packing",
    description:
      "Never forget your laptop charger, lucky shoes, or passport again.",
    icon: PlaneIcon,
  },
  {
    title: "Client Management",
    description:
      "Organize your work with clients from the smallest to largest details.",
    icon: HandshakeIcon,
  },
  {
    title: "Deep Work",
    description:
      "Practice prioritizing focus and eliminating distraction with this template.",
    icon: TargetIcon,
  },
  {
    title: "Meeting Agenda",
    description:
      "Waste less time in meetings, ensuring they're efficient and action oriented.",
    icon: NotebookPenIcon,
  },
]

export function Templates() {
  return (
    <section
      id="templates"
      className="mx-auto max-w-6xl px-4 py-16 text-center md:px-8 lg:py-24"
    >
      <h2 className="text-3xl font-bold tracking-tight">
        Kickstart your next project with Codist Templates
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
        No need to create projects or setups from scratch when we have 50+
        templates made for you.
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((category, index) => (
          <li key={category}>
            <Badge
              variant={index === 0 ? "default" : "outline"}
              className="h-8 px-3 text-sm"
            >
              {category}
            </Badge>
          </li>
        ))}
      </ul>
      <ul className="mt-8 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-5">
        {templates.map(({ title, description, icon: Icon }) => (
          <li key={title} className="flex">
            <Card className="w-full">
              <div className="mx-(--card-spacing) flex h-24 items-center justify-center rounded-lg bg-muted">
                <Icon aria-hidden className="size-8 text-muted-foreground" />
              </div>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto gap-1 text-xs text-muted-foreground">
                <ListIcon aria-hidden className="size-3.5" />
                List
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <TextLink href="/templates">See more templates</TextLink>
      </div>
    </section>
  )
}
