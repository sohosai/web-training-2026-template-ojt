import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../../db/client.js";
import { messages } from "../../db/schema.js";
import { MessageRequest } from "../models/message.js";

export const messageRoutes = new Hono();

messageRoutes.get("/", async (c) => {
  const rows = await db.select().from(messages);
  return c.json(rows);
});

messageRoutes.post("/", async (c) => {
  const body = await c.req.json<MessageRequest>();
  console.log(body)
  if (!body?.message || !body?.userName || !body?.thread) {
    return c.json({ error: "invalid format" }, 400);
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