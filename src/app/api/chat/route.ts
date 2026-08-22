// src/app/api/chat/route.ts
import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  InferUITools,
  stepCountIs,
} from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { searchDocuments } from "@/lib/search";

// ---------------------------------------------------------------------------
// Intent filter — skip search for non-research messages
// ---------------------------------------------------------------------------
const NON_SEARCH_PATTERNS =
  /^(hi|hello|hey|yo|sup|good\s*(morning|afternoon|evening)|bye|goodbye|see\s*ya|thanks|thank\s*you|cheers|ok|okay|sure|got\s*it|nice|great|cool|awesome|perfect|sounds\s*good|no\s*problem|you\s*rock|love\s*it|amazing|fantastic|brilliant|super|yes|yeah|yep|nah|no|nope|not\s*really|nothing|i'm\s*good|i'm\s*ok|later|talk\s*soon|take\s*care|have\s*a\s*nice|ttyl|cya|bye bye|tnx|thx|ty|tysm|ofc|np|yw|lol|haha|hehe|lmao|omg|wow|uh|um|err|ah|oh|yo)\s*[!.?]*$/i;

function isNonSearchIntent(message: string): boolean {
  const trimmed = message.trim();
  if (trimmed.length <= 30 && NON_SEARCH_PATTERNS.test(trimmed)) return true;
  return false;
}

// ---------------------------------------------------------------------------
// Conversation-aware query builder
// Extracts the real search intent from chat context.
// ---------------------------------------------------------------------------
function buildSearchQuery(messages: UIMessage[]): string {
  const recent = messages.slice(-6); // last 3 exchanges
  const userMessages = recent
    .filter((m) => m.role === "user")
    .map((m) => {
      const textPart = m.parts?.find((p) => p.type === "text");
      return textPart?.type === "text" ? textPart.text : "";
    })
    .filter(Boolean);

  if (userMessages.length === 0) return "";
  if (userMessages.length === 1) return userMessages[0];

  // If the latest message is very short or references prior context
  // (e.g. "what about that", "and the price?", "tell me more"), combine
  const latest = userMessages[userMessages.length - 1];
  const isFollowUp =
    latest.length < 40 ||
    /^(what|how|tell|and|but|ok|so|what about|what about the|how about|and the|is it|does it|can you|could you|would you|i want|i need|i'm looking|what's the|whats the)/i.test(
      latest
    );

  if (isFollowUp && userMessages.length >= 2) {
    // Combine previous topic with current question for better retrieval
    const prev = userMessages[userMessages.length - 2];
    return `${prev} ${latest}`.trim();
  }

  return latest;
}

// ---------------------------------------------------------------------------
// Tools
// ---------------------------------------------------------------------------
const tools = {
  searchKnowledgeBase: tool({
    description:
      "Search the MedAesthetics Bristol knowledge base for relevant clinic details, treatments, pricing, and policies.",
    inputSchema: z.object({
      query: z
        .string()
        .describe("The semantic search query to find documents"),
    }),
    execute: async ({ query }) => {
      console.log("[Chat] Tool called: searchKnowledgeBase", { query });
      try {
        const results = await searchDocuments(query, 6, 0.4);
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
export type ChatMessage = UIMessage<unknown, never, ChatTools>;

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();

    const lastMsg = messages[messages.length - 1];
    const userText =
      lastMsg?.parts?.find((p) => p.type === "text")?.type === "text"
        ? lastMsg.parts.find((p) => p.type === "text")?.text ?? ""
        : "";

    console.log("[Chat] Request received:", {
      messageCount: messages.length,
      userText: userText.substring(0, 80),
    });

    // Decide whether to search or skip
    const skipSearch = isNonSearchIntent(userText);
    const searchQuery = skipSearch ? "" : buildSearchQuery(messages);

    if (skipSearch) {
      console.log("[Chat] Skipping search — non-research intent detected");
    } else {
      console.log("[Chat] Search query built:", {
        original: userText.substring(0, 80),
        built: searchQuery.substring(0, 80),
      });
    }

    const systemPrompt = skipSearch
      ? `You are the friendly AI assistant for MedAesthetics Bristol. Be warm, concise, conversational. This is a greeting — respond briefly and invite them to ask a question.`
      : `You are the friendly AI assistant for MedAesthetics Bristol — a medical-led facial aesthetics clinic in Bristol.

RULES:
- Only use facts from the search results. Never invent details.
- If no relevant facts found, say: "I don't have that on file — please call us on 0117 123 4567 or book a consultation and we'll be happy to help!"
- Keep replies to 2-4 sentences unless more detail is genuinely needed.
- Always end warmly (e.g. "Let me know if you have any other questions!").

LINKS:
When mentioning a specific treatment or service, ALWAYS include a clickable link to book. Never mention a treatment without a booking reference:
- Anti-wrinkle / Botox: [Book anti-wrinkle treatment](#booking)
- Dermal fillers: [Book dermal fillers consultation](#booking)
- Skin rejuvenation / Chemical peels / Microneedling: [Book skin treatment](#booking)
- Consultation: [Book a consultation](#booking)
- Pricing: [View pricing and book](#booking)
- General booking: [Book your appointment](#booking)

Format links naturally in your reply, e.g. "You can [book a consultation here](#consultation) or explore [our treatments](#treatments)."
Every treatment mention MUST have a booking link.

Search the knowledge base now using this query: "${searchQuery}"`;

    const result = streamText({
      model: google("gemini-3.6-flash"),
      messages: await convertToModelMessages(messages),
      tools: skipSearch ? {} : tools,
      system: systemPrompt,
      stopWhen: skipSearch ? undefined : stepCountIs(3),
      onEnd: ({ text }) => {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log("[Chat] Response complete:", {
          elapsed: `${elapsed}s`,
          textLength: text?.length,
          skippedSearch: skipSearch,
        });
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.error("[Chat] Error:", {
      elapsed: `${elapsed}s`,
      error: error instanceof Error ? error.message : String(error),
    });
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}
