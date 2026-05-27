import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DATABASE_URL is not set");
}

const pool = mysql.createPool({ uri: url });

export const db = drizzle(pool);
