import { Suspense } from "react"
import { Logo } from "@/components/landing/logo"
import { SidebarNav } from "@/features/tasks/components/sidebar-nav"
import { TodayLabel } from "@/features/tasks/components/today-label"
import { ViewNav } from "@/features/tasks/components/view-nav"

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return (
    <div className="flex min-h-full flex-1 flex-col md:flex-row">
      <header className="flex items-center justify-between px-5 pt-4 pb-2 md:hidden">
        <Logo />
        <Suspense>
          <TodayLabel />
        </Suspense>
      </header>
      <aside className="hidden w-65 shrink-0 flex-col gap-6 border-r bg-sidebar px-4 py-6 md:flex">
        <div className="px-2.5">
          <Logo />
        </div>
        <Suspense fallback={<SidebarNav />}>
          <ViewNav />
        </Suspense>
        <Suspense>
          <TodayLabel className="mt-auto px-3" />
        </Suspense>
      </aside>
      <main className="flex-1 px-4 pt-4 pb-32 md:px-8 md:pt-14 md:pb-20">
        <div className="mx-auto max-w-190">{children}</div>
      </main>
      <div className="fixed inset-x-0 bottom-0 border-t bg-sidebar px-4 pt-2 pb-6 md:hidden">
        <Suspense fallback={<SidebarNav variant="tabs" />}>
          <ViewNav variant="tabs" />
        </Suspense>
      </div>
    </div>
  )
}
