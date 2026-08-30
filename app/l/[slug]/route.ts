import { notFound, redirect } from "next/navigation";
import { getLinkBySlug } from "@/data/links";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const link = await getLinkBySlug(slug);

  if (!link) notFound();

  redirect(link.url);
}
