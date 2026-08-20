// src/app/upload/actions.ts
"use server";

import pdf from "pdf-parse";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db-config";
import { documents } from "@/lib/db-schema";
import { generateEmbeddings } from "@/lib/embeddings";
import { chunkContent } from "@/lib/chunking";

export async function processPdfFile(formData: FormData) {
  const startTime = Date.now();

  try {
    const { sessionClaims } = await auth();

    if (sessionClaims?.metadata?.role !== "admin") {
      console.error("[Upload] Unauthorized access attempt", {
        userId: sessionClaims?.sub,
        role: sessionClaims?.metadata?.role,
      });
      return {
        success: false,
        error: "Not authorized. Admin access required.",
      };
    }

    const file = formData.get("pdf") as File;
    console.log("[Upload] Processing file:", {
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type,
      userId: sessionClaims.sub,
    });

    // Convert File to Buffer and extract text
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const data = await pdf(buffer);

    if (!data.text || data.text.trim().length === 0) {
      console.error("[Upload] No text found in PDF:", file.name);
      return {
        success: false,
        error: "No text found in PDF",
      };
    }

    console.log("[Upload] Text extracted:", {
      file: file.name,
      characters: data.text.length,
      pages: data.numpages,
    });

    // Chunk the text
    const chunks = await chunkContent(data.text);
    console.log("[Upload] Text chunked:", {
      file: file.name,
      chunks: chunks.length,
    });

    // Generate embeddings
    const embeddings = await generateEmbeddings(chunks);
    console.log("[Upload] Embeddings generated:", {
      file: file.name,
      vectors: embeddings.length,
      dimensions: embeddings[0]?.length,
    });

    // Store in database
    const records = chunks.map((chunk, index) => ({
      content: chunk,
      embedding: embeddings[index],
    }));

    await db.insert(documents).values(records);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log("[Upload] Document saved:", {
      file: file.name,
      chunksInserted: records.length,
      elapsed: `${elapsed}s`,
    });

    return {
      success: true,
      message: `Created ${records.length} searchable chunks`,
    };
  } catch (error) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.error("[Upload] Processing error:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      elapsed: `${elapsed}s`,
    });
    return {
      success: false,
      error: "Failed to process PDF",
    };
  }
}
