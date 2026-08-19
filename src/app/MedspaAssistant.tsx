// src/app/MedspaAssistant.tsx
// AI SDK UI chatbot pattern (docs: https://ai-sdk.dev/docs/ai-sdk-ui/chatbot)
// Uses useChat + DefaultChatTransport against the streaming /api/chat route.
"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const MedspaAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Hello! I'm your MedAesthetics Assistant. How can I help you today with your aesthetic goals? I can answer questions about our treatments, skincare advice, and booking procedures based on Aisha's knowledge",
          },
        ],
      },
    ],
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, status]);

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Assistant Bubble */}
      {!isOpen && (
        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative h-auto w-auto rounded-full bg-[#0E3F73] p-4 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#154b85] active:scale-95"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-500 group-hover:max-w-xs">
            Ask Aisha&apos;s Assistant
          </span>
          <MessageSquare size={24} />
          <span className="absolute -right-1 -top-1 size-4 rounded-full border-2 border-white bg-[#C8A45A] animate-pulse" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="flex w-80 flex-col gap-0 overflow-hidden rounded-2xl border-[#EAF1F7] bg-white p-0 shadow-2xl animate-in slide-in-from-bottom-5 duration-300 sm:w-96">
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
          <ScrollArea className="h-72 bg-[#F7F2E8]/30">
            <div className="flex flex-col gap-4 p-4">
              {messages.map((msg) => {
                const isBot = msg.role === "assistant";
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed whitespace-pre-wrap ${
                        isBot
                          ? "rounded-tl-none border border-[#EAF1F7] bg-white text-[#0E3F73] shadow-sm"
                          : "rounded-tr-none bg-[#C8A45A] text-white shadow-sm"
                      }`}
                    >
                      {msg.parts
                        .map((part) => (part.type === "text" ? part.text : ""))
                        .join("")}
                    </div>
                  </div>
                );
              })}

              {/* Loading / streaming state bubble */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-lg rounded-tl-none border border-[#EAF1F7] bg-white px-3 py-2 text-[#0E3F73] shadow-sm">
                    <span className="size-1.5 rounded-full bg-[#0E3F73]/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="size-1.5 rounded-full bg-[#0E3F73]/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="size-1.5 rounded-full bg-[#0E3F73]/60 animate-bounce" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <Separator className="bg-[#EAF1F7]" />

          {/* Input */}
          <CardContent className="flex gap-2 bg-white px-3 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if ((input ?? "").trim() && !isLoading) {
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
                disabled={!(input ?? "").trim() || isLoading}
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