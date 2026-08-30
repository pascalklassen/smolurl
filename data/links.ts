import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { links } from "@/db/schema";

async function getCurrentUserId() {
  const { userId } = await auth();
  return userId;
}

export async function getLinksForUser(userId: string) {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}

export async function getLinksForCurrentUser() {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  return getLinksForUser(userId);
}

export async function getLinkBySlug(slug: string) {
  const [link] = await db.select().from(links).where(eq(links.slug, slug));
  return link;
}

const SLUG_ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function generateSlug(length = 7) {
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += SLUG_ALPHABET[Math.floor(Math.random() * SLUG_ALPHABET.length)];
  }
  return slug;
}

export async function createLinkForUser(
  userId: string,
  data: { url: string; slug?: string }
) {
  const slug = data.slug || generateSlug();

  const [link] = await db
    .insert(links)
    .values({ userId, url: data.url, slug })
    .returning();

  return link;
}

export async function updateLinkForUser(
  userId: string,
  id: number,
  data: { url: string; slug: string }
) {
  const [link] = await db
    .update(links)
    .set({ url: data.url, slug: data.slug })
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();

  return link;
}

export async function deleteLinkForUser(userId: string, id: number) {
  const [link] = await db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();

  return link;
}
