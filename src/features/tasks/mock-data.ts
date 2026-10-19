// Temporary stand-in for the tasks table until the Prisma schema exists.

export type MockTask = {
  id: string
  title: string
  description?: string
  priority: 1 | 2 | 3 | 4
  inInbox: boolean
  dueToday: boolean
}

const mockTasks: MockTask[] = [
  {
    id: "t1",
    title: "Review pull requests",
    description: "Check the open PRs on the codist repo",
    priority: 1,
    inInbox: false,
    dueToday: true,
  },
  {
    id: "t2",
    title: "Buy groceries",
    priority: 3,
    inInbox: true,
    dueToday: true,
  },
  {
    id: "t3",
    title: "Plan the weekly team sync",
    description: "Draft the agenda and share it in the channel",
    priority: 2,
    inInbox: false,
    dueToday: true,
  },
  {
    id: "t4",
    title: "Read the Next.js 16 release notes",
    priority: 4,
    inInbox: true,
    dueToday: false,
  },
  {
    id: "t5",
    title: "Call the dentist",
    priority: 2,
    inInbox: true,
    dueToday: false,
  },
]

export function getTodayTasks() {
  return mockTasks.filter((task) => task.dueToday)
}

export function getInboxTasks() {
  return mockTasks.filter((task) => task.inInbox)
}
