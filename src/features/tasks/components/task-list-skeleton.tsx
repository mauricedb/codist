export function TaskListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <ul aria-hidden className="divide-y border-y">
      {Array.from({ length: rows }, (_, index) => (
        <li key={index} className="flex items-start gap-3 py-3">
          <div className="mt-0.5 size-4 shrink-0 animate-pulse rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            <div className="h-3 w-16 animate-pulse rounded bg-muted" />
          </div>
        </li>
      ))}
    </ul>
  )
}
