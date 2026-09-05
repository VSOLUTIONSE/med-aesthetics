"use client";

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";

export default function RAGChatBot() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat<UIMessage>({
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hello! I'm the MedAesthetics Assistant. Ask me anything about our treatments, pricing, consultations or booking — I'll do my best to help.",
          },
        ],
      },
    ],
  });

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text) {
      return;
    }
    sendMessage({
      text: message.text,
    });
    setInput("");
  };

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="flex h-dvh flex-col bg-[var(--color-paper-2)]">
      {/* Brand header */}
      <header className="border-b border-[var(--color-rule)] bg-[var(--color-paper)]">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-[var(--page-gutter)]">
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/img/logo.jpg"
              alt="MedAesthetics Bristol"
              width={32}
              height={32}
              className="h-9 w-9 rounded-full border border-[var(--color-rule)] object-cover"
              priority
            />
            <span className="font-[var(--font-display)] text-[var(--text-md)] font-extrabold tracking-[-0.02em] text-[var(--color-ink)]">
              MedAesthetics
              <span className="text-[var(--color-accent-deep)]">
                {" "}
                Assistant
              </span>
            </span>
          </a>
          <span className="hidden items-center gap-1.5 rounded-full border border-[var(--color-rule)] bg-[var(--color-accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-ink)] sm:inline-flex">
            <Sparkles size={11} className="text-[var(--color-accent-deep)]" />
            Guide
          </span>
        </div>
      </header>

      {/* Chat */}
      <main className="mx-auto w-full max-w-5xl flex-1 overflow-hidden px-[var(--page-gutter)] py-[var(--space-lg)]">
        <div className="flex h-full flex-col">
          <Conversation className="h-full">
            <ConversationContent className="space-y-3">
              {messages.map((message) => {
                const isUser = message.role === "user";
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
                  <div key={message.id}>
                    {displayText && (
                      <Message from={message.role}>
                        <MessageContent
                          variant="flat"
                          className={
                            isUser
                              ? "ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[var(--color-primary)] px-4 py-3 text-[var(--color-paper)]"
                              : "max-w-[80%] rounded-2xl rounded-bl-md border border-[var(--color-rule)] bg-[var(--color-paper)] px-4 py-3 text-[var(--color-ink)]"
                          }
                        >
                          <Response>{displayText}</Response>
                        </MessageContent>
                      </Message>
                    )}
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-[var(--color-rule)] bg-[var(--color-paper)] px-4 py-3">
                    <Loader size={14} className="text-[var(--color-ink)]" />
                    <span className="text-[var(--text-xs)] text-[var(--color-muted)]">
                      Thinking...
                    </span>
                  </div>
                </div>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          <PromptInput onSubmit={handleSubmit} className="mt-4">
            <PromptInputBody>
              <PromptInputTextarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about treatments, pricing, booking..."
              />
            </PromptInputBody>
            <PromptInputToolbar>
              <PromptInputTools />
              <PromptInputSubmit disabled={!input && !status} status={status} />
            </PromptInputToolbar>
          </PromptInput>

          <p className="mt-3 text-center text-[10px] text-[var(--color-muted)]">
            Replies are general guidance only, not medical advice.
          </p>
        </div>
      </main>
    </div>
  );
}
