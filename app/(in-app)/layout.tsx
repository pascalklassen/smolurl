import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";

import { Button } from "@/components/ui/button";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>
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
