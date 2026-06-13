import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const messages = mysqlTable("messages", {
  id: int("id").primaryKey().autoincrement(),
  thread: varchar("thread", { length: 255 }).notNull(),
  message: varchar("message", { length: 255 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
