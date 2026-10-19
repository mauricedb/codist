export function TaskListSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <ul aria-hidden className="flex flex-col gap-2">
      {Array.from({ length: rows }, (_, index) => (
        <li
          key={index}
          className="flex min-h-14 items-center gap-3.5 rounded-lg border border-border/60 bg-card px-4"
        >
          <div className="size-4.5 shrink-0 animate-pulse rounded-[5px] bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          <div className="ml-auto h-3 w-12 animate-pulse rounded bg-muted" />
        </li>
      ))}
    </ul>
  )
}
