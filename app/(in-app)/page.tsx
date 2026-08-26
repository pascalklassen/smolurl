import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpButton } from "@clerk/nextjs";
import { BarChart3, Link2, QrCode, ShieldCheck, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Link2,
    title: "Custom short links",
    description:
      "Turn long, unwieldy URLs into short, memorable links with your own custom alias.",
  },
  {
    icon: Zap,
    title: "Lightning-fast redirects",
    description:
      "Every short link resolves instantly, so your audience never waits to reach their destination.",
  },
  {
    icon: BarChart3,
    title: "Click analytics",
    description:
      "See how your links perform with clear, real-time click tracking for every short URL you create.",
  },
  {
    icon: QrCode,
    title: "QR codes included",
    description:
      "Generate a QR code for any short link, perfect for print, packaging, or in-person sharing.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description:
      "Your account and links are protected with Clerk-powered authentication out of the box.",
  },
];

export default async function Home() {
  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 flex-col">
      <section className="flex flex-col items-center gap-6 px-6 py-24 text-center sm:py-32">
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Shorten your links. Amplify your reach.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground text-balance">
          smolurl turns long links into short, trackable URLs in seconds, so
          you can share with confidence and see exactly how they perform.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SignUpButton mode="modal">
            <Button size="lg">Get started for free</Button>
          </SignUpButton>
        </div>
      </section>

      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-6 text-card-foreground"
            >
              <Icon className="size-6 text-primary" />
              <h2 className="text-lg font-medium">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
