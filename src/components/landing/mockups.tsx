import {
  CalendarIcon,
  FlagIcon,
  HashIcon,
  InboxIcon,
  MicIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Decorative app previews built from UI primitives; hidden from assistive tech.

type Task = { title: string; meta?: string; done?: boolean }

function TaskRow({ title, meta, done }: Task) {
  return (
    <li className="flex items-start gap-3 py-2">
      <span
        className={cn(
          "mt-0.5 size-4 shrink-0 rounded-full border border-muted-foreground",
          done && "border-primary bg-primary"
        )}
      />
      <span className="flex flex-col gap-0.5">
        <span className={cn(done && "text-muted-foreground line-through")}>
          {title}
        </span>
        {meta && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarIcon className="size-3" />
            {meta}
          </span>
        )}
      </span>
    </li>
  )
}

function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="divide-y">
      {tasks.map((task) => (
        <TaskRow key={task.title} {...task} />
      ))}
    </ul>
  )
}

const sidebarItems = [
  { label: "Inbox", icon: InboxIcon, count: 4 },
  { label: "Today", icon: CalendarIcon, count: 6, active: true },
  { label: "Upcoming", icon: CalendarIcon },
  { label: "Filters & Labels", icon: FlagIcon },
]

export function AppMockup() {
  return (
    <Card aria-hidden className="py-0 shadow-xl">
      <div className="grid sm:grid-cols-[180px_1fr]">
        <aside className="hidden flex-col gap-1 border-r bg-muted/50 p-3 sm:flex">
          {sidebarItems.map(({ label, icon: Icon, count, active }) => (
            <span
              key={label}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs",
                active && "bg-accent font-medium text-accent-foreground"
              )}
            >
              <Icon className="size-3.5" />
              <span className="flex-1">{label}</span>
              {count && <span className="text-muted-foreground">{count}</span>}
            </span>
          ))}
          <Separator className="my-2" />
          <span className="px-2 text-xs font-medium text-muted-foreground">
            My Projects
          </span>
          {["Home", "Fitness", "Work"].map((project) => (
            <span
              key={project}
              className="flex items-center gap-2 px-2 py-1 text-xs"
            >
              <HashIcon className="size-3.5 text-muted-foreground" />
              {project}
            </span>
          ))}
        </aside>
        <div className="p-4 text-sm">
          <p className="mb-2 text-lg font-semibold">Today</p>
          <TaskList
            tasks={[
              { title: "Do 30 minutes of yoga", meta: "Today" },
              { title: "Call Amy about the trip", meta: "Today" },
              { title: "Buy bread", meta: "Today", done: true },
              { title: "Prepare Q4 roadmap review", meta: "Tomorrow" },
              { title: "Book flights to Lisbon", meta: "Fri" },
            ]}
          />
        </div>
      </div>
    </Card>
  )
}

export function VoiceCaptureMockup() {
  return (
    <Card aria-hidden className="mx-auto w-full max-w-xs shadow-xl">
      <CardHeader>
        <CardTitle className="text-center">January campaign</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TaskList
          tasks={[
            { title: "Craft creative brief", meta: "Tomorrow 10:00 AM" },
            { title: "Record demo video", meta: "In 5 days" },
          ]}
        />
        <div className="flex flex-col items-center gap-3 rounded-lg bg-muted p-4 text-center">
          <span className="text-sm font-medium">Listening…</span>
          <span className="text-xs text-muted-foreground">
            Say everything you need to get done
          </span>
          <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <MicIcon className="size-5" />
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export function TodayMockup() {
  return (
    <Card aria-hidden className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Today</CardTitle>
      </CardHeader>
      <CardContent>
        <TaskList
          tasks={[
            { title: "Update the MLS listing", done: true },
            { title: "Do 30 minutes of yoga", meta: "Today" },
            { title: "Buy bread", meta: "Today" },
          ]}
        />
      </CardContent>
    </Card>
  )
}

const days = [
  { day: "Mon 18", events: ["Plan for the week"] },
  { day: "Tue 19", events: ["Inbox zero", "Record video"] },
  { day: "Wed 20", events: ["Publish video", "Customer interviews"] },
  { day: "Thu 21", events: ["Design tip newsletter"] },
]

export function CalendarMockup() {
  return (
    <Card aria-hidden className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upcoming</CardTitle>
        <p className="text-xs text-muted-foreground">August 2025</p>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {days.map(({ day, events }, index) => (
          <div key={day} className="flex flex-col gap-2">
            <span
              className={cn(
                "text-xs text-muted-foreground",
                index === 2 && "font-semibold text-foreground"
              )}
            >
              {day}
            </span>
            {events.map((event) => (
              <Badge
                key={event}
                variant="secondary"
                className="h-auto w-full justify-start rounded-md py-1.5 whitespace-normal"
              >
                {event}
              </Badge>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
