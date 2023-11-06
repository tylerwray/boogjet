import type { Config } from "drizzle-kit";
import { env } from "./src/env.mjs";

export default {
  schema: "./src/data/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
