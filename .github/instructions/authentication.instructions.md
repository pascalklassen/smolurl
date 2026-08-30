---
description: Read this document before implementing or modifying authentication in the app.
---


# Authentication

All authentication in this app is handled exclusively by **Clerk**
(`@clerk/nextjs`). Do not introduce any other auth method (custom sessions,
NextAuth, Passport, hand-rolled JWT/cookie auth, etc.).

## Route protection

- `proxy.ts` runs `clerkMiddleware()` for every matched request — do not remove
  or bypass it.
- `/dashboard` is a protected route: it must require a signed-in user. Enforce
  this with `auth.protect()` in `clerkMiddleware`, e.g.:

  ```ts
  // proxy.ts
  import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

  const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

  export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
      await auth.protect();
    }
  });
  ```

  Any new page that requires a signed-in user should be added to the
  `isProtectedRoute` matcher rather than checking auth state ad hoc in the
  page component.

## Home page redirect

- If a signed-in user visits the homepage (`/`), redirect them to
  `/dashboard`. Check auth state with `auth()` (from
  `@clerk/nextjs/server`) in the page/layout and call `redirect("/dashboard")`
  from `next/navigation` when a `userId` is present.

## Sign in / sign up UI

- Sign in and sign up must always be launched as **modals**, never as
  standalone pages users navigate to directly.
- Use `<SignInButton mode="modal">` and `<SignUpButton mode="modal">` (or
  `openSignIn()` / `openSignUp()` from `useClerk()`) instead of linking to
  `/sign-in` or `/sign-up` routes.
- The catch-all `sign-in`/`sign-up` route pages under `app/(in-app)/` should
  only exist as a fallback and are not the primary entry point — prefer the
  modal trigger components anywhere a sign-in/sign-up affordance is needed.

## Provider setup

- `ClerkProvider` wraps the app in `app/(in-app)/layout.tsx`.
  Keep all Clerk components (`SignInButton`, `SignUpButton`, `UserButton`,
  `SignedIn`/`SignedOut` or `Show`) inside this provider.
