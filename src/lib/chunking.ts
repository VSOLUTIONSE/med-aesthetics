// src/lib/chunking.ts
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

/**
 * 600-char chunks with 100-char overlap.
 * Separators respect paragraph → sentence → word boundaries
 * so chunks preserve semantic meaning instead of cutting mid-sentence.
 */
export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 600,
  chunkOverlap: 100,
  separators: ["\n\n", "\n", ". ", "! ", "? ", " "],
});

export async function chunkContent(content: string) {
  return await textSplitter.splitText(content.trim());
}
