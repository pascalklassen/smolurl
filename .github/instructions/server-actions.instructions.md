---
description: Read this document before implementing or modifying data mutations (server actions) in the app.
---

# Server Actions

All data **mutations** in this app must go through Server Actions. Client
Components call these actions directly; do not mutate data via API routes or
inline server logic in a component.

## File location & naming

- Server actions live in a file named `actions.ts`, colocated in the same
  directory as the Client Component that calls them (e.g.
  `app/(in-app)/dashboard/actions.ts`).
- Every file must start with `"use server"`.

## Input types

- Action functions must accept a single argument typed with an explicit
  TypeScript `interface` (or `type`) describing its shape, e.g.:

  ```ts
  interface CreateLinkInput {
    url: string;
    slug: string;
  }
  ```

- Never type a parameter as `FormData`. If the caller has a `FormData`
  object, extract the fields into the typed input object on the client
  before calling the action.

## Validation

- Validate all incoming data with a **Zod** schema (`safeParse`) at the top
  of the action, before doing anything else. Return an error result on
  validation failure instead of passing unvalidated data further down.

## Authentication

- Every action must check for a signed-in user first, using `auth()` from
  `@clerk/nextjs/server`. If there is no `userId`, stop and return an error
  result — do not proceed to any database operation.

## Return values

- Server actions must **never** `throw`. Always return a plain object with
  either an `error` or a `success` property, e.g.
  `{ error: string } | { success: true }` (add data fields alongside
  `success` as needed). Validation failures, auth failures, and caught
  exceptions must all be converted into this same shape.

## Database access

- Server actions must **never** call Drizzle queries directly.
- All reads/writes go through helper functions in the [/data](../../data)
  directory. If a needed helper doesn't exist yet, add it there rather than
  querying the database from the action.

## Example shape

```ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLinkForUser } from "@/data/links";

const createLinkSchema = z.object({
  url: z.string().url(),
});

interface CreateLinkInput {
  url: string;
}

type CreateLinkResult = { error: string } | { success: true };

export async function createLink(
  input: CreateLinkInput
): Promise<CreateLinkResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  await createLinkForUser(userId, parsed.data.url);
  return { success: true };
}
```
