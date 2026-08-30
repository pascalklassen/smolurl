import { getLinksForCurrentUser } from "@/data/links";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const links = await getLinksForCurrentUser();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
      <h1 className="font-heading text-3xl font-semibold tracking-tight">
        My Links
      </h1>

      {links.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          You haven&apos;t created any links yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {links.map((link) => (
            <li key={link.id}>
              <Card size="sm">
                <CardHeader>
                  <CardTitle>/{link.slug}</CardTitle>
                  <CardDescription>{link.url}</CardDescription>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  Created {link.createdAt.toLocaleDateString()}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
