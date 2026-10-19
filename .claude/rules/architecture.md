# Application architecture

Codist is a single-user app: there is no auth, and models have no `userId` or ownership scoping.

## Folder layout

Organize code by feature. `app/` holds routing only.

```
src/
  app/                 # routes, layouts, loading/error files: thin, no business logic
  features/<feature>/  # e.g. tasks, projects, labels
    components/        # feature UI (Server Components by default)
    queries.ts         # reads: "server-only", "use cache" + cacheTag
    mutations.ts       # writes: "server-only", plain Prisma calls
    actions.ts         # "use server": validate, call mutations, updateTag
    schemas.ts         # Zod schemas + inferred types, shared by client and server
  components/ui/       # shared shadcn (Base UI) primitives
  components/landing/  # marketing page sections
  lib/                 # cross-cutting helpers (prisma, utils, action result type)
```

- A feature may import another feature's `queries`, `schemas`, and `components`. It may not import another feature's `mutations`; go through that feature's actions or move the logic.
- Promote code to `components/` or `lib/` once a second feature needs it, not before.

## Data access

- Only `queries.ts` and `mutations.ts` files import `prisma` from `@/lib/prisma`. Pages, components, and actions never touch Prisma directly.
- Both files start with `import "server-only"`.
- Every query function uses `"use cache"` and tags its data with `cacheTag` (e.g. `"tasks"`, `` `task:${id}` ``) so actions can invalidate it.
- Return plain serializable objects. Use Prisma `select` to shape data for the UI, not whole rows with relations.

## Mutations: Server Actions only

- All writes go through Server Actions in `actions.ts`. Do not add Route Handlers (`app/api/*`) for app UI; they are reserved for external integrations.
- Each action, in this order:
  1. parses its input with the feature's Zod schema (never trust the arguments' types),
  2. calls a mutation function,
  3. calls `updateTag(...)` for every affected tag (`updateTag` gives read-your-own-writes; it works only in Server Actions),
  4. returns an `ActionResult`.
- Expected failures (validation, not found, conflict) are returned, not thrown:

  ```ts
  type ActionResult<T = void> =
    | { ok: true; data: T }
    | { ok: false; error: string; fieldErrors?: Record<string, string[]> }
  ```

- Only unexpected errors throw; `error.tsx` boundaries handle them.

## Rendering

- Server-first: pages, layouts, and data-reading components are Server Components.
- Add `"use client"` only on small interactive leaves (checkbox, dialog, menu, inline editor). Pass them data and actions as props instead of turning a whole list or page into a client tree.
- Wrap dynamic or uncached reads in `<Suspense>` with a skeleton fallback, as Cache Components requires.

## Client state

- View state (current filter, sort, selected task, open panel) lives in the URL: route segments and `searchParams`.
- Pending mutations use React 19 `useOptimistic` and `useActionState`. Forms post with `<form action={...}>`.
- Do not add a global client store or a client data cache (Zustand, Redux, TanStack Query, SWR) without discussing it first.

## Validation

- Use Zod. Schemas live in the feature's `schemas.ts`, and types are inferred with `z.infer`, never written separately.
- The same schema validates on the server (always) and in client forms (optionally, for instant feedback).
