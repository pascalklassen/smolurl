"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createLinkForUser,
  deleteLinkForUser,
  updateLinkForUser,
} from "@/data/links";

const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9-]+$/, "Use only lowercase letters, numbers, and hyphens")
  .min(3, "Slug must be at least 3 characters")
  .max(30, "Slug must be at most 30 characters");

const createLinkSchema = z.object({
  url: z.url("Enter a valid URL").trim().min(1, "URL is required"),
  slug: slugSchema.optional().or(z.literal("")),
});

interface CreateLinkInput {
  url: string;
  slug?: string;
}

type CreateLinkResult = { error: string } | { success: true; slug: string };

export async function createLink(
  input: CreateLinkInput
): Promise<CreateLinkResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const link = await createLinkForUser(userId, {
      url: parsed.data.url,
      slug: parsed.data.slug || undefined,
    });
    revalidatePath("/dashboard");
    return { success: true, slug: link.slug };
  } catch (err) {
    if (isUniqueSlugViolation(err)) {
      return { error: "That slug is already taken. Try another one." };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

// Postgres unique_violation (23505) raised by the slug column's unique constraint
function isUniqueSlugViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code?: string }).code === "23505"
  );
}

const updateLinkSchema = z.object({
  id: z.number(),
  url: z.url("Enter a valid URL").trim().min(1, "URL is required"),
  slug: slugSchema,
});

interface UpdateLinkInput {
  id: number;
  url: string;
  slug: string;
}

type UpdateLinkResult = { error: string } | { success: true };

export async function updateLink(
  input: UpdateLinkInput
): Promise<UpdateLinkResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    const link = await updateLinkForUser(userId, parsed.data.id, {
      url: parsed.data.url,
      slug: parsed.data.slug,
    });
    if (!link) return { error: "Link not found" };
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    if (isUniqueSlugViolation(err)) {
      return { error: "That slug is already taken. Try another one." };
    }
    return { error: "Something went wrong. Please try again." };
  }
}

const deleteLinkSchema = z.object({
  id: z.number(),
});

interface DeleteLinkInput {
  id: number;
}

type DeleteLinkResult = { error: string } | { success: true };

export async function deleteLink(
  input: DeleteLinkInput
): Promise<DeleteLinkResult> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) return { error: "Invalid input" };

  const link = await deleteLinkForUser(userId, parsed.data.id);
  if (!link) return { error: "Link not found" };

  revalidatePath("/dashboard");
  return { success: true };
}
