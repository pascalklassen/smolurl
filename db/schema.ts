import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  userId: text("user_id").notNull(), // Clerk user id; no local users table to reference
  slug: text("slug").notNull().unique(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
