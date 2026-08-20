// src/app/api/chat/route.ts
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  InferUITools,
  UIDataTypes,
  stepCountIs,
} from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { searchDocuments } from "@/lib/search";

const tools = {
  searchKnowledgeBase: tool({
    description: "Search the MedAesthetics Bristol knowledge base for relevant clinic details, treatments, pricing, and policies.",
    inputSchema: z.object({
      query: z.string().describe("The semantic search query to find documents"),
    }),
    execute: async ({ query }) => {
      console.log("[Chat] Tool called: searchKnowledgeBase", { query });
      try {
        const results = await searchDocuments(query, 4, 0.4);
        console.log("[Chat] Search results:", {
          query,
          count: results.length,
          topScore: results[0]?.similarity,
        });

        if (results.length === 0) {
          return "No relevant information found in the knowledge base.";
        }

        return results
          .map((r, i) => `[Source Document ${i + 1}]\n${r.content}`)
          .join("\n\n");
      } catch (error) {
        console.error("[Chat] Search error:", error);
        return "Error searching the knowledge base.";
      }
    },
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    console.log("[Chat] Request received:", {
      messageCount: messages.length,
      lastMessage: messages[messages.length - 1]?.content?.substring(0, 100),
    });

    const result = streamText({
      model: google("gemini-3.6-flash"),
      messages: await convertToModelMessages(messages),
      tools,
      chunking: { separator: /(?<=[.!?])\s+/ },
      system: `You are the friendly AI Assistant for MedAesthetics Bristol, a premium clinical facial aesthetics and skin rejuvenation clinic in Bristol.

YOUR PERSONALITY:
- Warm, welcoming, and genuinely helpful — like a knowledgeable friend at the clinic.
- Be concise and direct. No waffle, no filler.
- Use a polite, conversational tone. Feel free to use "Hi there!", "Of course!", "Great question!" where natural.
- Never be robotic or overly formal. Speak like a real person who cares.

CRITICAL INSTRUCTIONS:
1. You must search the knowledge base for EVERY inquiry using the 'searchKnowledgeBase' tool.
2. You are ONLY allowed to answer questions using the facts retrieved from the 'searchKnowledgeBase' tool. Do NOT use any external knowledge.
3. If the search returned no relevant facts, politely say something like: "I'm sorry, I don't have that information on file. For the most accurate details, please contact us at 0117 123 4567 or book a consultation — we'd love to help!"
4. Never make up facts. If a price, duration, or practitioner name isn't in the search results, say so kindly and suggest they get in touch.
5. Keep responses short and helpful — aim for 2-3 sentences unless more detail is needed.
6. End responses warmly where appropriate (e.g., "Let me know if you have any other questions!" or "Hope that helps!").`,
      stopWhen: stepCountIs(3),
      onFinish: ({ text, toolCalls, toolResults }) => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log("[Chat] Response complete:", {
          elapsed: `${elapsed}s`,
          textLength: text?.length,
          toolCallsCount: toolCalls?.length,
          toolResultsCount: toolResults?.length,
        });
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.error("[Chat] Error:", {
      elapsed: `${elapsed}s`,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
