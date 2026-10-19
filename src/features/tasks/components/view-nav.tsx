import { SidebarNav } from "@/features/tasks/components/sidebar-nav"
import { getTaskCounts } from "@/features/tasks/queries"
import { getToday } from "@/features/tasks/today"

export async function ViewNav({ variant }: { variant?: "sidebar" | "tabs" }) {
  const counts = await getTaskCounts(await getToday())
  return <SidebarNav counts={counts} variant={variant} />
}
