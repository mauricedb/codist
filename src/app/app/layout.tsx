import { Logo } from "@/components/landing/logo"
import { SidebarNav } from "@/features/tasks/components/sidebar-nav"

export default function AppLayout({ children }: LayoutProps<"/app">) {
  return (
    <div className="flex min-h-full flex-1">
      <aside className="flex w-60 shrink-0 flex-col gap-6 border-r bg-sidebar p-4">
        <Logo />
        <SidebarNav />
      </aside>
      <main className="flex-1 px-8 py-10">
        <div className="mx-auto max-w-2xl">{children}</div>
      </main>
    </div>
  )
}
