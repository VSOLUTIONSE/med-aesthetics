"use client";

import { useChat } from "@ai-sdk/react";
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
  const { messages, sendMessage, status } = useChat();

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text) {
      return;
    }
    sendMessage({
      text: message.text,
    });
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full">
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
                            ? "bg-[var(--color-ink)] text-[var(--color-paper)] max-w-[80%] ml-auto px-4 py-3 rounded-2xl rounded-br-md"
                            : "bg-[var(--color-paper)] border border-[var(--color-rule)] text-[var(--color-ink)] px-4 py-3 rounded-2xl rounded-bl-md"
                        }
                      >
                        <Response>{displayText}</Response>
                      </MessageContent>
                    </Message>
                  )}
                </div>
              );
            })}
            {(status === "submitted" || status === "streaming") && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-[var(--color-rule)] bg-[var(--color-paper)] px-4 py-3 shadow-[0_1px_2px_oklch(20%_0.01_30_/_0.04)]">
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
      </div>
    </div>
  );
}
