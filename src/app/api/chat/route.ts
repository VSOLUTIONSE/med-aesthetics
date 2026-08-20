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
      ? `You are the friendly AI Assistant for MedAesthetics Bristol, a premium clinical facial aesthetics and skin rejuvenation clinic in Bristol.

YOUR PERSONALITY:
- Warm, welcoming, and genuinely helpful — like a knowledgeable friend at the clinic.
- Be concise and direct. No waffle, no filler.
- Use a polite, conversational tone. Feel free to use "Hi there!", "Of course!", "Great question!" where natural.
- Never be robotic or overly formal. Speak like a real person who cares.

INSTRUCTIONS:
- This is a casual greeting or pleasantry — do NOT search the knowledge base.
- Respond warmly and briefly. If the conversation seems to be ending, wish them well.
- If they might have a question coming, gently invite them to ask.`
      : `You are the friendly AI Assistant for MedAesthetics Bristol, a premium clinical facial aesthetics and skin rejuvenation clinic in Bristol.

YOUR PERSONALITY:
- Warm, welcoming, and genuinely helpful — like a knowledgeable friend at the clinic.
- Be concise and direct. No waffle, no filler.
- Use a polite, conversational tone. Feel free to use "Hi there!", "Of course!", "Great question!" where natural.
- Never be robotic or overly formal. Speak like a real person who cares.

CRITICAL INSTRUCTIONS:
1. Search the knowledge base for this inquiry using the 'searchKnowledgeBase' tool with this query: "${searchQuery}"
2. You are ONLY allowed to answer questions using the facts retrieved from the 'searchKnowledgeBase' tool. Do NOT use any external knowledge.
3. If the search returned no relevant facts, politely say something like: "I'm sorry, I don't have that information on file. For the most accurate details, please contact us at 0117 123 4567 or book a consultation — we'd love to help!"
4. Never make up facts. If a price, duration, or practitioner name isn't in the search results, say so kindly and suggest they get in touch.
5. Keep responses short and helpful — aim for 2-3 sentences unless more detail is needed.
6. End responses warmly where appropriate (e.g., "Let me know if you have any other questions!" or "Hope that helps!").
7. ALWAYS produce a text response. You must NEVER return an empty response. If anything goes wrong, respond with a friendly message asking the user to try again.`;

    const result = streamText({
      model: google("gemini-3.6-flash"),
      messages: convertToModelMessages(messages),
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
