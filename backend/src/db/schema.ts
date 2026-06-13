import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const messages = mysqlTable("messages", {
  id: int("id").primaryKey().autoincrement(),
  thread: varchar("thread", { length: 255 }).notNull(),
  message: varchar("message", { length: 255 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  favoriteCount: int("favorite_count").default(0).notNull(),
});

export const Users = mysqlTable("users", {
  name: varchar("name", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
export type User = typeof Users.$inferSelect;
export type NewUser = typeof Users.$inferInsert;
