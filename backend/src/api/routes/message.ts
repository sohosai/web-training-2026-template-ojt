// biome-ignore lint/correctness/noUnusedImports: チュートリアルで使うため残す
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
// biome-ignore lint/correctness/noUnusedImports: チュートリアルで使うため残す
import { db } from "../../db/client.js";
// biome-ignore lint/correctness/noUnusedImports: チュートリアルで使うため残す
import { messages } from "../../db/schema.js";

// biome-ignore lint/correctness/noUnusedImports: チュートリアルで使うため残す

import { Users } from "../../db/schema.js";
import type { MessageRequest } from "../models/message.js";

export const messageRoutes = new Hono();
export const userRoutes = new Hono();

messageRoutes.get("/", async (c) => {
  const rows = await db.select().from(messages);
  return c.json(rows);
});

userRoutes.get("/", async (d) => {
  const rows = await db.select().from(Users);
  return d.json(rows);
});

messageRoutes.post("/", async (c) => {
  const body = await c.req.json<MessageRequest>();
  console.log(body);
  if (!body?.message || !body?.userName || !body?.thread || !body?.password) {
    return c.json({ error: "invalid format" }, 400);
  }

  if (
    !(await db
      .select()
      .from(Users)
      .where(
        and(eq(Users.name, body.userName), eq(Users.password, body.password)),
      ))
  ) {
    return c.json({ error: "invalid user credentials" }, 401);
  }

  const [result] = await db.insert(messages).values({
    message: body.message,
    userName: body.userName,
    thread: body.thread, // Assuming you want to include the thread ID
  });

  const [created] = await db
    .select()
    .from(messages)
    .where(eq(messages.id, result.insertId));
  return c.json(created, 201);
});
