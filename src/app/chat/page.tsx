// src/app/chat/page.tsx
"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
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
import { Loader } from "@/components/ai-elements/loader";

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

              // Fallback for empty assistant responses
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
                            ? "bg-[#C8A45A] text-white max-w-[80%] ml-auto px-4 py-3 rounded-2xl rounded-br-md"
                            : "bg-white border border-[#EAF1F7] text-[#1E2833] px-4 py-3 rounded-2xl rounded-bl-md"
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
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-[#EAF1F7] bg-white px-4 py-3 shadow-sm">
                  <Loader size={14} className="text-[#0E3F73]" />
                  <span className="text-xs text-[#0E3F73]/60">Thinking...</span>
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
