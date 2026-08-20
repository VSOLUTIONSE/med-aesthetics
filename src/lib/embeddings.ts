// src/lib/embeddings.ts
import { embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";

export async function generateEmbedding(text: string): Promise<number[]> {
  const input = text.replaceAll("\n", " ");

  console.log("[Embedding] Generating single embedding:", {
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

  console.log("[Embedding] Generated:", {
    dimensions: embedding.length,
  });

  return embedding;
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const inputs = texts.map((text) => text.replaceAll("\n", " "));

  console.log("[Embedding] Generating batch embeddings:", {
    count: inputs.length,
  });

  const { embeddings } = await embedMany({
    model: google.embedding("gemini-embedding-2"),
    values: inputs,
    providerOptions: {
      google: {
        outputDimensionality: 1536,
      },
    },
  });

  console.log("[Embedding] Batch generated:", {
    count: embeddings.length,
    dimensions: embeddings[0]?.length,
  });

  return embeddings;
}
