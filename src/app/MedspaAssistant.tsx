"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Response } from "@/components/ai-elements/response";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
  const lastUserIdx = messages.findLastIndex(
    (m) => (m.role as string) === "user",
  );
  const hasResponseText = messages.some(
    (m, i) =>
      m.role === "assistant" &&
      i > lastUserIdx &&
      m.parts.some((p) => p.type === "text" && p.text.trim().length > 0),
  );
  const showThinking = isLoading && !hasResponseText;

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll must follow new messages and streaming status
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-medspa-assistant", handleOpen);
    return () =>
      window.removeEventListener("open-medspa-assistant", handleOpen);
  }, []);

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
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`group relative flex items-center rounded-full bg-[var(--color-primary)] text-[var(--color-paper)] shadow-xl transition-all duration-[var(--dur-short)] hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 ${
            showHint ? "gap-2 p-4 pl-5 pr-6" : "gap-0 p-4"
          }`}
        >
          <MessageSquare size={20} className="shrink-0" />
          <span
            className={`overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-[var(--dur-short)] ${
              showHint ? "max-w-[200px] opacity-100" : "max-w-0 opacity-0"
            }`}
          >
            Ask Aisha&apos;s Assistant
          </span>
          <span className="absolute -right-1 -top-1 size-3.5 rounded-full border-2 border-[var(--color-primary)] bg-[var(--color-accent)] animate-pulse" />
        </button>
      )}

      {isOpen && (
        <Card className="flex w-[min(360px,calc(100vw-2rem))] sm:w-[400px] flex-col gap-0 overflow-hidden rounded-[var(--radius-xl)] border-[var(--color-rule)] bg-[var(--color-paper)] p-0 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between gap-3 bg-[var(--color-ink)] px-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-8 bg-[var(--color-accent)]">
                <AvatarFallback className="bg-[var(--color-accent)] text-[var(--color-accent-ink)]">
                  <Sparkles size={14} />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-semibold text-[var(--color-paper)]">
                  MedAesthetics Assistant
                </CardTitle>
                <Badge
                  variant="outline"
                  className="mt-1 gap-1.5 border-0 bg-transparent p-0 text-[10px] font-normal uppercase tracking-wider text-[var(--color-paper)]/60"
                >
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online &amp; Ready
                </Badge>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="size-8 text-[var(--color-paper)]/60 hover:bg-[var(--color-paper)]/10 hover:text-[var(--color-paper)]"
              aria-label="Close chat"
            >
              <X size={18} />
            </Button>
          </CardHeader>

          <ScrollArea className="chat-scroll h-[400px] max-h-[60vh] bg-[var(--color-paper-2)]/30">
            <div ref={scrollRef} className="flex flex-col gap-3 p-4">
              {messages.map((message, index) => {
                const isUser = (message.role as string) === "user";
                if (!isUser && index > lastUserIdx && status !== "ready") {
                  const hasText = message.parts.some(
                    (p) => p.type === "text" && p.text.trim().length > 0,
                  );
                  if (!hasText) return null;
                }

                const textParts = message.parts
                  .filter((p) => p.type === "text")
                  .map((p) => p.text)
                  .join("");
                const hasContent = textParts.trim().length > 0;
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
                          ? "rounded-br-md bg-[var(--color-ink)] text-[var(--color-paper)]"
                          : "rounded-bl-md border border-[var(--color-rule)] bg-[var(--color-paper)] text-[var(--color-ink)] shadow-[0_1px_2px_oklch(20%_0.01_30_/_0.04)]"
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
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-[var(--color-rule)] bg-[var(--color-paper)] px-4 py-3 shadow-[0_1px_2px_oklch(20%_0.01_30_/_0.04)]">
                    <span className="size-1.5 rounded-full bg-[var(--color-ink)]/30 animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-1.5 rounded-full bg-[var(--color-ink)]/30 animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-1.5 rounded-full bg-[var(--color-ink)]/30 animate-bounce" />
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

          <Separator className="bg-[var(--color-rule)]" />

          <CardContent className="flex gap-2 bg-[var(--color-paper)] px-3 py-3">
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
                className="h-10 flex-1 rounded-full border-[var(--color-rule)] bg-[var(--color-paper-2)]/30 text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus-visible:border-[var(--color-accent)] focus-visible:ring-0"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="size-10 shrink-0 rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-ink)]/90 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send size={16} />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center border-t border-[var(--color-rule)]/50 bg-[var(--color-paper-2)]/50 px-4 py-2">
            <p className="text-center text-[10px] text-[var(--color-muted)]">
              Replies are general guidance only, not medical advice.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
