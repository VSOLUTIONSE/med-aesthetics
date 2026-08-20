// src/lib/search.ts
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { db } from "./db-config";
import { documents } from "./db-schema";
import { generateEmbedding } from "./embeddings";

/**
 * Search for similar documents using Drizzle ORM with cosineDistance
 */
export async function searchDocuments(
  query: string,
  limit: number = 5,
  threshold: number = 0.5
) {
  console.log("[Search] Starting search:", { query, limit, threshold });

  // Generate embedding for the search query
  const embedding = await generateEmbedding(query);
  console.log("[Search] Embedding generated:", {
    dimensions: embedding.length,
    sampleValues: embedding.slice(0, 3),
  });

  // Calculate similarity using Drizzle's cosineDistance function
  const similarity = sql<number>`1 - (${cosineDistance(
    documents.embedding,
    embedding
  )})`;

  // Use Drizzle's query builder for the search
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

  console.log("[Search] Results:", {
    query,
    count: similarDocuments.length,
    threshold,
    results: similarDocuments.map((r) => ({
      id: r.id,
      similarity: Number(r.similarity?.toFixed(4)),
      contentPreview: r.content.substring(0, 80),
    })),
  });

  return similarDocuments;
}
