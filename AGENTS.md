<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# smolurl — Agent Instructions

> [!IMPORTANT]
> The compatibility warning above is part of this repo's rules, not a standalone notice:
> this project runs a modified Next.js 16, so read the relevant guide in
> `node_modules/next/dist/docs/` for framework behavior.

## Project Overview

`smolurl` is a Next.js 16 (App Router) application using:

- **Auth:** Clerk (`@clerk/nextjs`)
- **Database:** Drizzle ORM on Neon serverless Postgres
- **UI:** Tailwind CSS v4 + shadcn/ui (`base-nova` style) on top of Base UI
  (`@base-ui/react`) primitives
- **Language:** TypeScript in strict mode

The app is early-stage: [db/schema.ts](db/schema.ts) is not yet populated and
`app/(in-app)/page.tsx` still has the default `create-next-app` starter content.

> [!IMPORTANT]
> **Terminal & Commands:** When in a windows environent, only run commands in the command prompt — do not > use PowerShell or any other terminal.

## Coding Standards (summary)

- Match the existing project structure: routes in `app/`, shared UI in
  `components/`, data access in `db/`, small helpers in `lib/`.
- Prefer editing/extending existing files over creating new ones; only split code
  into a new file when it doesn't fit an existing module's purpose.
- Keep components as Server Components unless client-only APIs are required.
- Use the `@/*` import alias instead of relative paths that cross multiple
  directories.
- Run `npm run lint` after making changes.
