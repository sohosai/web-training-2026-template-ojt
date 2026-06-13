import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { favoriteRoutes } from "./api/routes/favorite.js";
import { messageRoutes } from "./api/routes/message.js";
import { userRoutes } from "./api/routes/signup.js";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

app.get("/health", (c) => c.json({ status: "ok", message: "Hello, World!" }));
app.route("/messages", messageRoutes);
app.route("/messages", favoriteRoutes);
app.route("/signup", userRoutes);

const port = Number(process.env.PORT ?? 3000);

serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});
