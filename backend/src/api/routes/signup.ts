import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
// biome-ignore lint/correctness/noUnusedImports: チュートリアルで使うため残す
import { db } from "../../db/client.js";

import { Users } from "../../db/schema.js";
import type { SignupRequest } from "../models/message.js";

export const userRoutes = new Hono();

userRoutes.post("/", async (c) => {
  const body = await c.req.json<SignupRequest>();
  console.log(body);
  if (!body?.userName || !body?.password) {
    return c.json({ error: "invalid format" }, 400);
  }
  if (
    await db
      .select()
      .from(Users)
      .where(and(eq(Users.name, body.userName)))
  ) {
    return c.json({ error: "invalid user credentials" }, 401);
  }
  const [result] = await db.insert(Users).values({
    name: body.userName,
    password: body.password,
  });
  return c.json({ message: "User created successfully" }, 201);
});
