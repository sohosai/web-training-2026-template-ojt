// biome-ignore lint/correctness/noUnusedImports: チュートリアルで使うため残す
import { eq } from "drizzle-orm";
import { Hono } from "hono";
// biome-ignore lint/correctness/noUnusedImports: チュートリアルで使うため残す
import { db } from "../../db/client.js";
// biome-ignore lint/correctness/noUnusedImports: チュートリアルで使うため残す
import { messages } from "../../db/schema.js";
// biome-ignore lint/correctness/noUnusedImports: チュートリアルで使うため残す

export const favoriteRoutes = new Hono();

favoriteRoutes.get("/", async (c) => {
  const rows = await db.select().from(messages);
  return c.json(rows);
});

favoriteRoutes.post("/:id/favorite", async (c) => {
  const { id } = c.req.param();
  console.log("Received request to favorite message with ID:", id);

  const rows = await db
    .select()
    .from(messages)
    .where(eq(messages.id, Number(id)));
  if (rows[0] === undefined) {
    return c.json({ error: "Message not found" }, 404);
  }
  const [result] = await db
    .update(messages)
    .set({
      favoriteCount: rows[0].favoriteCount + 1,
    })
    .where(eq(messages.id, Number(id)));
  const [created] = await db
    .select()
    .from(messages)
    .where(eq(messages.id, Number(id)));
  return c.json(created, 201);
});
