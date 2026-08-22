// src/app/api/chat/route.ts
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";
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
// ---------------------------------------------------------------------------
function buildSearchQuery(messages: UIMessage[]): string {
  const recent = messages.slice(-6);
  const userMessages = recent
    .filter((m) => m.role === "user")
    .map((m) => {
      const textPart = m.parts?.find((p) => p.type === "text");
      return textPart?.type === "text" ? textPart.text : "";
    })
    .filter(Boolean);

  if (userMessages.length === 0) return "";
  if (userMessages.length === 1) return userMessages[0];

  const latest = userMessages[userMessages.length - 1];
  const isFollowUp =
    latest.length < 40 ||
    /^(what|how|tell|and|but|ok|so|what about|what about the|how about|and the|is it|does it|can you|could you|would you|i want|i need|i'm looking|what's the|whats the)/i.test(
      latest
    );

  if (isFollowUp && userMessages.length >= 2) {
    const prev = userMessages[userMessages.length - 2];
    return `${prev} ${latest}`.trim();
  }

  return latest;
}

// ---------------------------------------------------------------------------
// Route handler — pre-search (no tool-calling roundtrip)
// ---------------------------------------------------------------------------
export async function POST(req: Request) {
  const startTime = Date.now();

  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const lastMsg = messages[messages.length - 1];
    const userText =
      lastMsg?.parts?.find((p) => p.type === "text")?.type === "text"
        ? lastMsg.parts.find((p) => p.type === "text")?.text ?? ""
        : "";

    console.log("[Chat] Request received:", {
      messageCount: messages.length,
      userText: userText.substring(0, 80),
    });

    const skipSearch = isNonSearchIntent(userText);
    const searchQuery = skipSearch ? "" : buildSearchQuery(messages);

    // Pre-search: run embedding + vector search before LLM call
    let searchContext = "";
    if (!skipSearch && searchQuery) {
      console.log("[Chat] Pre-search:", { query: searchQuery.substring(0, 80) });
      try {
        const results = await searchDocuments(searchQuery, 8, 0.35);
        console.log("[Chat] Search results:", {
          count: results.length,
          topScore: results[0]?.similarity,
        });
        searchContext = results
          .map((r, i) => `[Source ${i + 1}]\n${r.content}`)
          .join("\n\n");
      } catch (err) {
        console.error("[Chat] Search error:", err);
      }
    }

    const systemPrompt = skipSearch
      ? `You are the friendly AI assistant for MedAesthetics Bristol. Be warm, concise, conversational. This is a greeting — respond briefly and invite them to ask a question.`
      : `You are the friendly AI assistant for MedAesthetics Bristol — a medical-led facial aesthetics clinic in Bristol.

RULES:
- Only use facts from the knowledge base below. Never invent details.
- If the knowledge base has no relevant info, say: "I don't have that on file — please call us on 0117 123 4567 or book a consultation and we'll be happy to help!"
- Keep replies to 2-4 sentences unless more detail is genuinely needed.
- Always end warmly (e.g. "Let me know if you have any other questions!").

LINKS:
- Only include a booking link when the knowledge base contains a specific FaceConsent or booking URL for that exact treatment.
- Match the URL to the correct treatment category — do NOT use a generic/all-category URL for a specific treatment.
- If no specific booking URL is found for the treatment mentioned, do NOT include any link.
- Use the exact URL from the knowledge base. Format: [Treatment name](exact-url)
- Never invent or guess URLs. If unsure, omit the link.

KNOWLEDGE BASE:
${searchContext || "No relevant documents found."}`;

    const result = streamText({
      model: google("gemini-3.6-flash"),
      messages: await convertToModelMessages(messages),
      system: systemPrompt,
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
