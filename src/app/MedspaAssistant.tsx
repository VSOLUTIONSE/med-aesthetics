// src/app/MedspaAssistant.tsx
// Floating chat widget with branded streaming responses.
"use client";

import { Fragment, useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Response } from "@/components/ai-elements/response";

export const MedspaAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hello! I'm your MedAesthetics Assistant. How can I help you today? I can answer questions about our treatments, pricing, and booking.",
          },
        ],
      },
    ],
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Find the last user message index
  const lastUserIdx = messages.findLastIndex((m) => (m.role as string) === "user");

  // Check if any assistant message after the last user message has text
  const hasResponseText = messages.some(
    (m, i) =>
      m.role === "assistant" &&
      i > lastUserIdx &&
      m.parts.some((p) => p.type === "text" && p.text.trim().length > 0)
  );

  const showThinking = isLoading && !hasResponseText;

  // Auto scroll to bottom when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  // Pop out hint 10s after load, then hide after 4s
  useEffect(() => {
    if (isOpen) return;
    const showTimer = setTimeout(() => setShowHint(true), 10_000);
    const hideTimer = setTimeout(() => setShowHint(false), 14_000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      {/* Assistant Bubble */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`group relative flex items-center rounded-full bg-[#0E3F73] text-white shadow-xl transition-all duration-300 hover:bg-[#154b85] hover:shadow-2xl hover:shadow-[#0E3F73]/30 active:scale-95 ${
            showHint
              ? "gap-2 p-4 pl-5 pr-6"
              : "gap-0 p-4"
          }`}
        >
          <MessageSquare size={22} className="shrink-0" />
          <span
            className={`overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 ${
              showHint
                ? "max-w-[200px] opacity-100"
                : "max-w-0 opacity-0"
            }`}
          >
            Ask Aisha&apos;s Assistant
          </span>
          <span className="absolute -right-1 -top-1 size-4 rounded-full border-2 border-white bg-[#C8A45A] animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="flex w-[min(360px,calc(100vw-2rem))] sm:w-[400px] flex-col gap-0 overflow-hidden rounded-2xl border-[#EAF1F7] bg-white p-0 shadow-2xl">
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between gap-3 bg-[#0E3F73] px-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-8 bg-[#C8A45A]">
                <AvatarFallback className="bg-[#C8A45A] text-white">
                  <Sparkles size={16} />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-semibold text-white">
                  MedAesthetics Assistant
                </CardTitle>
                <Badge
                  variant="outline"
                  className="mt-1 gap-1.5 border-0 bg-transparent p-0 text-[10px] font-normal uppercase tracking-wider text-white/70"
                >
                  <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
                  Online &amp; Ready
                </Badge>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="size-8 text-white/70 hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X size={20} />
            </Button>
          </CardHeader>

          {/* Messages */}
          <ScrollArea className="chat-scroll h-[400px] max-h-[60vh] bg-[#F7F2E8]/30">
            <div
              ref={scrollRef}
              className="flex flex-col gap-3 p-4"
            >
              {messages.map((message, index) => {
                const isUser = (message.role as string) === "user";
                // Skip streaming assistant messages with no text yet
                if (!isUser && index > lastUserIdx && status !== "ready") {
                  const hasText = message.parts.some(
                    (p) => p.type === "text" && p.text.trim().length > 0
                  );
                  if (!hasText) return null;
                }

                // Extract text content for this message
                const textParts = message.parts
                  .filter((p) => p.type === "text")
                  .map((p) => p.text)
                  .join("");
                const hasContent = textParts.trim().length > 0;

                // Fallback for empty assistant responses (after streaming is done)
                const displayText =
                  !isUser && !hasContent && status === "ready"
                    ? "I'm sorry, something went wrong. Please try again and I'll do my best to help!"
                    : textParts;

                return (
                  <div
                    key={message.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        isUser
                          ? "rounded-br-md bg-[#0E3F73] text-white"
                          : "rounded-bl-md border border-[#EAF1F7] bg-white text-[#1E2833] shadow-sm"
                      }`}
                    >
                      <Response className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                        {displayText}
                      </Response>
                    </div>
                  </div>
                );
              })}
              {showThinking && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-[#EAF1F7] bg-white px-4 py-3 shadow-sm">
                    <span className="size-1.5 rounded-full bg-[#0E3F73]/40 animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-1.5 rounded-full bg-[#0E3F73]/40 animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-1.5 rounded-full bg-[#0E3F73]/40 animate-bounce" />
                  </div>
                </div>
              )}
              <div />
            </div>
            <ScrollBar
              orientation="vertical"
              className="w-1.5 bg-transparent"
            />
          </ScrollArea>

          <Separator className="bg-[#EAF1F7]" />

          {/* Input */}
          <CardContent className="flex gap-2 bg-white px-3 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (input.trim() && !isLoading) {
                  sendMessage({ text: input });
                  setInput("");
                }
              }}
              className="flex flex-1 gap-2"
            >
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about treatments, pricing, booking..."
                disabled={isLoading}
                className="h-10 flex-1 rounded-full border-[#EAF1F7] bg-[#EAF1F7]/30 text-[#0E3F73] placeholder:text-[#0E3F73]/50 focus-visible:border-[#C8A45A] focus-visible:ring-0"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="size-10 shrink-0 rounded-full bg-[#0E3F73] text-white hover:bg-[#1a518a] disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={18} />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center border-t border-[#EAF1F7]/50 bg-[#EAF1F7] px-4 py-2">
            <p className="text-center text-[10px] italic text-[#0E3F73]/60">
              Replies are general guidance only, not medical advice.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
