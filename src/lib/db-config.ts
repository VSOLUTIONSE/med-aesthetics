import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NEON_DATABASE_URL!);
export const db = drizzle(sql);

// ---------------------------------------------------------------------------
// Keep-alive: prevent Neon scale-to-zero cold starts
// Runs a lightweight ping on module load and every 4 minutes.
// ---------------------------------------------------------------------------
const KEEP_ALIVE_INTERVAL = 4 * 60 * 1000;

async function ping() {
  try {
    await sql`SELECT 1`;
  } catch {
    // Silently ignore — connection health is not critical for keep-alive
  }
}

// Initial ping on import
ping();

// Recurring ping
if (typeof setInterval !== "undefined") {
  setInterval(ping, KEEP_ALIVE_INTERVAL);
}
