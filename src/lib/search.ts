// src/lib/search.ts
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { db } from "./db-config";
import { documents } from "./db-schema";
import { generateEmbedding } from "./embeddings";

// ---------------------------------------------------------------------------
// Response cache — avoids re-running identical searches
// Key: normalised query + limit + threshold → results JSON
// ---------------------------------------------------------------------------
const SEARCH_CACHE_MAX = 200;
const searchCache = new Map<string, string>();

function cacheGet(key: string) {
  const hit = searchCache.get(key);
  if (hit !== undefined) {
    searchCache.delete(key);
    searchCache.set(key, hit);
  }
  return hit !== undefined ? JSON.parse(hit) : undefined;
}

function cacheSet(key: string, value: unknown) {
  if (searchCache.size >= SEARCH_CACHE_MAX) {
    const oldest = searchCache.keys().next().value;
    if (oldest !== undefined) searchCache.delete(oldest);
  }
  searchCache.set(key, JSON.stringify(value));
}

/**
 * Search for similar documents using cosine similarity.
 * Results are cached in-memory for repeated identical queries.
 */
export async function searchDocuments(
  query: string,
  limit: number = 5,
  threshold: number = 0.5
) {
  const cacheKey = `${query.toLowerCase().trim()}|${limit}|${threshold}`;

  const cached = cacheGet(cacheKey);
  if (cached) {
    console.log("[Search] Cache hit:", { query: query.substring(0, 60) });
    return cached as { id: number; content: string; similarity: number }[];
  }

  console.log("[Search] Starting search:", { query, limit, threshold });

  const embedding = await generateEmbedding(query);

  const similarity = sql<number>`1 - (${cosineDistance(
    documents.embedding,
    embedding
  )})`;

  const similarDocuments = await db
    .select({
      id: documents.id,
      content: documents.content,
      similarity,
    })
    .from(documents)
    .where(gt(similarity, threshold))
    .orderBy(desc(similarity))
    .limit(limit);

  cacheSet(cacheKey, similarDocuments);

  console.log("[Search] Results:", {
    query: query.substring(0, 60),
    count: similarDocuments.length,
    topScore: similarDocuments[0]
      ? Number(similarDocuments[0].similarity.toFixed(4))
      : null,
  });

  return similarDocuments;
}
