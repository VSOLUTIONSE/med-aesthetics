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
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { searchDocuments } from "@/lib/search";

const tools = {
  searchKnowledgeBase: tool({
    description: "Search the Aura MedSpa knowledge base for relevant clinic details, treatments, pricing, and policies.",
    inputSchema: z.object({
      query: z.string().describe("The semantic search query to find documents"),
    }),
    execute: async ({ query }) => {
      try {
        // Search the vector database for matching chunks
        const results = await searchDocuments(query, 4, 0.4);

        if (results.length === 0) {
          return "No relevant information found in the knowledge base.";
        }

        // Format retrieved documents for the AI model
        return results
          .map((r, i) => `[Source Document ${i + 1}]\n${r.content}`)
          .join("\n\n");
      } catch (error) {
        console.error("Search error in knowledge base:", error);
        return "Error searching the knowledge base.";
      }
    },
  }),
};

export type ChatTools = InferUITools<typeof tools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: await convertToModelMessages(messages),
      tools,
      system: `You are the AI Assistant for MedAesthetics Bristol, a premium clinical facial aesthetics and skin rejuvenation clinic in Bristol.
      
      CRITICAL INSTRUCTIONS:
      1. You must search the knowledge base for EVERY inquiry using the 'searchKnowledgeBase' tool.
      2. You are ONLY allowed to answer questions using the facts retrieved from the 'searchKnowledgeBase' tool. Do NOT use any external or training-data knowledge about medical treatments, procedures, pricing, or locations.
      3. If the user's query cannot be answered using the retrieved context from the search results, or if the search returned no relevant facts, you must politely refuse to answer using this exact guideline:
         "I am sorry, but I can only answer questions related to MedAesthetics Bristol's services, pricing, and procedures based on our official knowledge base. For further details, please contact our clinic at 0117 123 4567 or book an in-person consultation."
      4. Never make up or assume any facts. If a price, duration, or doctor name is not explicitly mentioned in the search results, state that the information is not available in the knowledge base and suggest they contact the desk.
      5. Keep responses concise, warm, professional, and directly focused on the retrieved facts.`,
      stopWhen: stepCountIs(2),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
