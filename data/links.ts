import { auth } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
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
    .orderBy(desc(links.createdAt));
}

export async function getLinksForCurrentUser() {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  return getLinksForUser(userId);
}
