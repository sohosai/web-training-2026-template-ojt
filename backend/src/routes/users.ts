import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db/client.js";
import { users } from "../db/schema.js";

export const usersRoute = new Hono();

usersRoute.get("/", async (c) => {
  const rows = await db.select().from(users);
  return c.json(rows);
});

usersRoute.post("/", async (c) => {
  const body = await c.req.json<{ name: string; email: string }>();
  if (!body?.name || !body?.email) {
    return c.json({ error: "name and email are required" }, 400);
  }
  const [result] = await db.insert(users).values({
    name: body.name,
    email: body.email,
  });
  const [created] = await db
    .select()
    .from(users)
    .where(eq(users.id, result.insertId));
  return c.json(created, 201);
});
