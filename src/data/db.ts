import { drizzle } from "drizzle-orm/mysql2";
import { env } from "../env.mjs";
import * as schema from "./schema";
import mysql from "mysql2/promise";

const poolConnection = mysql.createPool(env.DATABASE_URL);

export const db = drizzle(poolConnection, {
  schema,
  mode: "planetscale",
  logger: true,
});
