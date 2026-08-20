// src/lib/embeddings.ts
import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";

// ---------------------------------------------------------------------------
// In-memory LRU cache for query embeddings
// Avoids redundant Google API calls for repeated / similar queries.
// Max 500 entries; each 1536-dim float32 vector ≈ 6 KB → ~3 MB total.
// ---------------------------------------------------------------------------
const CACHE_MAX = 500;

const embeddingCache = new Map<string, number[]>();

function cacheGet(key: string): number[] | undefined {
  const hit = embeddingCache.get(key);
  if (hit !== undefined) {
    // Move to end (most recently used) by re-inserting
    embeddingCache.delete(key);
    embeddingCache.set(key, hit);
  }
  return hit;
}

function cacheSet(key: string, value: number[]) {
  if (embeddingCache.size >= CACHE_MAX) {
    // Evict oldest (first entry)
    const oldest = embeddingCache.keys().next().value;
    if (oldest !== undefined) embeddingCache.delete(oldest);
  }
  embeddingCache.set(key, value);
}

function normalise(text: string): string {
  return text.replaceAll("\n", " ").trim().toLowerCase();
}

export async function generateEmbedding(text: string): Promise<number[]> {
  const key = normalise(text);

  const cached = cacheGet(key);
  if (cached) {
    console.log("[Embedding] Cache hit:", { preview: text.substring(0, 60) });
    return cached;
  }

  const input = text.replaceAll("\n", " ");

  console.log("[Embedding] Generating:", {
    textLength: input.length,
    preview: input.substring(0, 80),
  });

  const { embedding } = await embed({
    model: google.embedding("gemini-embedding-2"),
    value: input,
    providerOptions: {
      google: {
        outputDimensionality: 1536,
      },
    },
  });

  cacheSet(key, embedding);

  console.log("[Embedding] Generated:", { dimensions: embedding.length });

  return embedding;
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  // Check cache first; only embed uncached texts
  const results: (number[] | null)[] = texts.map(
    (t) => cacheGet(normalise(t)) ?? null
  );

  const uncachedIndices: number[] = [];
  const uncachedTexts: string[] = [];

  results.forEach((r, i) => {
    if (r === null) {
      uncachedIndices.push(i);
      uncachedTexts.push(texts[i].replaceAll("\n", " "));
    }
  });

  if (uncachedTexts.length > 0) {
    console.log("[Embedding] Batch generating:", {
      total: texts.length,
      uncached: uncachedTexts.length,
    });

    const { embeddings } = await embedMany({
      model: google.embedding("gemini-embedding-2"),
      values: uncachedTexts,
      providerOptions: {
        google: {
          outputDimensionality: 1536,
        },
      },
    });

    uncachedIndices.forEach((origIdx, i) => {
      results[origIdx] = embeddings[i];
      cacheSet(normalise(texts[origIdx]), embeddings[i]);
    });
  } else {
    console.log("[Embedding] All batch entries cached:", { count: texts.length });
  }

  return results as number[][];
}
