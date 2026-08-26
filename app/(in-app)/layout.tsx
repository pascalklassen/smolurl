import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "oklch(0.922 0 0)",
          colorForeground: "oklch(0.985 0 0)",
          colorBackground: "oklch(0.205 0 0)",
          colorMutedForeground: "oklch(0.708 0 0)",
          colorInput: "oklch(0.269 0 0)",
          colorInputForeground: "oklch(0.985 0 0)",
          colorNeutral: "oklch(0.985 0 0)",
          colorDanger: "oklch(0.704 0.191 22.216)",
        },
      }}
    >
      <header className="flex items-center justify-end gap-4 border-b border-black/10 px-6 py-3 dark:border-white/10">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button variant="outline">Sign in</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Sign up</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      {children}
    </ClerkProvider>
  );
}
