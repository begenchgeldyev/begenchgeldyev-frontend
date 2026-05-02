import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const project = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  content: text('content'),
  image: text('image'),
  isHidden: boolean('is_hidden').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type Project = typeof project.$inferSelect;
export type NewProject = typeof project.$inferInsert;
