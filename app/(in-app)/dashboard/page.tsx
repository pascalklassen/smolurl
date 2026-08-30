import { getLinksForCurrentUser } from "@/data/links";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateLinkDialog } from "./create-link-dialog";
import { EditLinkDialog } from "./edit-link-dialog";
import { DeleteLinkDialog } from "./delete-link-dialog";

export default async function DashboardPage() {
  const links = await getLinksForCurrentUser();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          My Links
        </h1>
        <CreateLinkDialog />
      </div>

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
                  <CardAction className="flex items-center gap-1">
                    <EditLinkDialog link={link} />
                    <DeleteLinkDialog id={link.id} slug={link.slug} />
                  </CardAction>
                </CardHeader>
                <CardContent className="text-xs text-muted-foreground">
                  Updated {link.updatedAt.toLocaleDateString()}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
