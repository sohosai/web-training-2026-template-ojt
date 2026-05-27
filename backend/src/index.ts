import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { usersRoute } from "./routes/users.js";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

app.get("/", (c) => c.json({ message: "Hello from Hono!" }));
app.get("/health", (c) => c.json({ status: "ok" }));

app.route("/users", usersRoute);

const port = Number(process.env.PORT ?? 3000);

serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});
