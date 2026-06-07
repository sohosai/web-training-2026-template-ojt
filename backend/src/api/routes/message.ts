// biome-ignore lint/correctness/noUnusedImports: チュートリアルで使うため残す
import { eq } from "drizzle-orm";
import { Hono } from "hono";
// biome-ignore lint/correctness/noUnusedImports: チュートリアルで使うため残す
import { db } from "../../db/client.js";
// biome-ignore lint/correctness/noUnusedImports: チュートリアルで使うため残す
import { messages } from "../../db/schema.js";
// biome-ignore lint/correctness/noUnusedImports: チュートリアルで使うため残す
import { MessageRequest } from "../models/message.js";

export const messageRoutes = new Hono();

// ここに追記
