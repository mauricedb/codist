// Temporary stand-in for the tasks table until the Prisma schema exists.

export type MockTask = {
  id: string
  title: string
  description?: string
  priority: 1 | 2 | 3 | 4
  inInbox: boolean
  // Days relative to today: negative is overdue, 0 is today, undefined is no date.
  dueInDays?: number
}

export type DueStatus = "overdue" | "today" | "upcoming"

const mockTasks: MockTask[] = [
  {
    id: "t6",
    title: "Submit the expense report",
    description: "Receipts from the September conference trip",
    priority: 1,
    inInbox: false,
    dueInDays: -3,
  },
  {
    id: "t7",
    title: "Return library books",
    priority: 3,
    inInbox: true,
    dueInDays: -1,
  },
  {
    id: "t1",
    title: "Review pull requests",
    description: "Check the open PRs on the codist repo",
    priority: 1,
    inInbox: false,
    dueInDays: 0,
  },
  {
    id: "t2",
    title: "Buy groceries",
    priority: 3,
    inInbox: true,
    dueInDays: 0,
  },
  {
    id: "t3",
    title: "Plan the weekly team sync",
    description: "Draft the agenda and share it in the channel",
    priority: 2,
    inInbox: false,
    dueInDays: 0,
  },
  {
    id: "t4",
    title: "Read the Next.js 16 release notes",
    priority: 4,
    inInbox: true,
  },
  {
    id: "t5",
    title: "Call the dentist",
    priority: 2,
    inInbox: true,
  },
]

export function getDueStatus(dueInDays: number): DueStatus {
  if (dueInDays < 0) return "overdue"
  if (dueInDays === 0) return "today"
  return "upcoming"
}

export function formatDueLabel(dueInDays: number) {
  if (dueInDays === 0) return "Today"
  if (dueInDays === -1) return "Yesterday"
  if (dueInDays === 1) return "Tomorrow"
  return dueInDays < 0
    ? `${-dueInDays} days ago`
    : `In ${dueInDays} days`
}

export function getOverdueTasks() {
  return mockTasks
    .filter((task) => task.dueInDays !== undefined && task.dueInDays < 0)
    .sort((a, b) => a.dueInDays! - b.dueInDays!)
}

export function getTodayTasks() {
  return mockTasks.filter((task) => task.dueInDays === 0)
}

export function getInboxTasks() {
  return mockTasks.filter((task) => task.inInbox)
}
