# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Codist is a Todoist-style task manager built on Next.js 16 (App Router), React 19, Tailwind CSS v4, and Prisma 7 with SQLite. So far only the marketing landing page exists; `docs/images/` holds the Todoist reference screenshots it is modeled on.

## Commands

- `npm run dev`: start the dev server at http://localhost:3000
- `npm run build`: production build (also type-checks)
- `npm run lint`: ESLint (flat config, `eslint-config-next` core-web-vitals + typescript)
- `npx tsc --noEmit`: type-check only
- `npx prisma generate`: regenerate the Prisma client into `src/generated/prisma` (gitignored, so run it after a fresh clone or any schema change)
- `npx prisma migrate dev --name <name>`: create and apply a migration (migrations go in `prisma/migrations`)

There is no test runner set up yet.

## Architecture

- **Next.js config** (`next.config.ts`) enables `cacheComponents`, `partialPrefetching`, and the React Compiler. Because of `cacheComponents`, dynamic data access must follow the Cache Components rules (`"use cache"`, `<Suspense>` boundaries). Check `node_modules/next/dist/docs/` before relying on older Next.js patterns. Tailwind is loaded through a Turbopack CSS loader rule rather than PostCSS.
- **Database**: Prisma 7 uses the new `prisma-client` generator, which outputs to `src/generated/prisma`. Import the client from `@/generated/prisma/client`, not `@prisma/client`. The CLI reads its datasource URL from `prisma.config.ts` (via `dotenv` and `DATABASE_URL` in `.env`). At runtime, `src/lib/prisma.ts` exports a singleton `prisma` that uses the `better-sqlite3` driver adapter. `prisma/schema.prisma` has no models yet.
- **UI components**: `src/components/ui/` contains shadcn components in the `base-nova` style, built on **Base UI** (`@base-ui/react`), not Radix. Add new ones with `npx shadcn add <component>`. Theme tokens are CSS variables in `src/app/globals.css` (Tailwind v4 `@theme inline`; there is no `tailwind.config`). `cn` comes from the `cn` npm package and is re-exported from `@/lib/utils`.
- **Landing page**: `src/app/page.tsx` composes the section components in `src/components/landing/`.
- Path alias `@/*` maps to `src/*`. Components use no semicolons and double quotes; `src/lib/prisma.ts` is the exception.

## Agent skills

Prisma-specific skills (Prisma 7 upgrade, client API, CLI, driver adapters, etc.) are in `.agents/skills/`, mirrored in `.claude/skills/` and `.windsurf/skills/`.
