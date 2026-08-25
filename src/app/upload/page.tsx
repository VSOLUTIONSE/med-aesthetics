"use client";

import {
  CheckCircle2,
  FileText,
  Info,
  Loader2,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { NavBar } from "@/app/Navbar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { processPdfFile } from "./actions";

export default function PDFUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);
      const result = await processPdfFile(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "Document added successfully.",
        });
        e.target.value = "";
      } else {
        setMessage({
          type: "error",
          text: result.error || "Something went wrong.",
        });
      }
    } catch {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      <NavBar />
      <div className="py-[var(--space-3xl)] px-[var(--page-gutter)]">
        <div className="max-w-4xl mx-auto space-y-[var(--space-2xl)]">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center">
              <Image
                src="/img/logo.jpg"
                alt="MedAesthetics Bristol"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-[var(--color-paper-2)] object-cover"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-paper-2)] text-[var(--text-xs)] font-semibold uppercase tracking-wider text-[var(--color-ink)] border border-[var(--color-rule)]">
              <FileText size={12} className="text-[var(--color-accent-deep)]" />
              Knowledge Base
            </div>
            <h1 className="font-[var(--font-display)] text-[var(--text-3xl)] font-bold tracking-[-0.02em]">
              Add Documents to Your AI Assistant
            </h1>
            <p className="text-[var(--color-ink-2)] max-w-2xl mx-auto text-[var(--text-sm)] leading-relaxed">
              Upload your clinic&apos;s documents and the AI assistant will
              learn from them. When clients ask about treatments, prices, or
              policies, the assistant will use these documents to give accurate
              answers.
            </p>
          </div>

          {/* How It Works */}
          <Card className="bg-[var(--color-paper)] border-[var(--color-rule)]">
            <CardContent className="p-[var(--space-lg)]">
              <h2 className="text-[var(--text-sm)] font-bold text-[var(--color-ink)] uppercase tracking-wide mb-4">
                How it works
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    num: "1",
                    title: "Upload a PDF",
                    desc: "Choose a document like a price list, treatment guide, or clinic policy.",
                  },
                  {
                    num: "2",
                    title: "We read it for you",
                    desc: "The system breaks your document into small pieces so it can find the right information quickly.",
                  },
                  {
                    num: "3",
                    title: "AI answers questions",
                    desc: "Clients can now ask the chatbot about what's in that document and get instant answers.",
                  },
                ].map((item) => (
                  <div key={item.num} className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-paper-2)] text-sm font-bold text-[var(--color-ink)]">
                      {item.num}
                    </div>
                    <div>
                      <p className="text-[var(--text-sm)] font-semibold text-[var(--color-ink)]">
                        {item.title}
                      </p>
                      <p className="text-[var(--text-xs)] text-[var(--color-muted)] mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What to Upload */}
          <Card className="bg-[var(--color-paper)] border-[var(--color-rule)]">
            <CardContent className="p-[var(--space-lg)]">
              <h2 className="text-[var(--text-sm)] font-bold text-[var(--color-ink)] uppercase tracking-wide mb-4">
                What to upload
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    title: "Price lists",
                    desc: "Treatment costs and packages",
                  },
                  {
                    title: "Treatment guides",
                    desc: "What each treatment involves, how long it takes",
                  },
                  {
                    title: "Practitioner bios",
                    desc: "Who works at the clinic and their qualifications",
                  },
                  {
                    title: "Clinic policies",
                    desc: "Booking rules, cancellation terms, aftercare",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-[var(--radius-md)] bg-[var(--color-paper-2)] p-4 border border-[var(--color-rule)]"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--color-ink)]/5">
                      <FileText
                        size={14}
                        className="text-[var(--color-muted)]"
                      />
                    </div>
                    <div>
                      <p className="text-[var(--text-sm)] font-semibold text-[var(--color-ink)]">
                        {item.title}
                      </p>
                      <p className="text-[var(--text-xs)] text-[var(--color-muted)] mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Upload Card */}
          <Card className="bg-[var(--color-paper)] border-[var(--color-rule)] overflow-hidden">
            <CardHeader className="bg-[var(--color-ink)] text-[var(--color-paper)] p-[var(--space-lg)]">
              <CardTitle className="text-[var(--text-lg)] font-semibold flex items-center gap-2">
                <UploadCloud size={18} className="text-[var(--color-accent)]" />
                Upload a Document
              </CardTitle>
              <CardDescription className="text-[var(--color-paper)]/60 text-[var(--text-xs)]">
                Select a PDF file from your computer to add it to the AI
                assistant&apos;s knowledge.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-[var(--space-2xl)] space-y-6">
              <div>
                <Label
                  htmlFor="pdf-upload"
                  className="block text-[var(--text-sm)] font-semibold text-[var(--color-ink)] mb-2"
                >
                  Choose a PDF file
                </Label>
                <div className="relative border-2 border-dashed border-[var(--color-rule)] hover:border-[var(--color-accent)] rounded-[var(--radius-md)] p-8 transition-colors flex flex-col items-center justify-center bg-[var(--color-paper-2)]/30 group">
                  <Input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <UploadCloud
                    size={36}
                    className="text-[var(--color-muted)] group-hover:text-[var(--color-accent-deep)] transition-colors mb-3"
                  />
                  <span className="text-[var(--text-sm)] font-medium text-[var(--color-ink)]">
                    {isLoading
                      ? "Processing your document..."
                      : "Click to browse or drag a PDF here"}
                  </span>
                  <span className="text-[10px] text-[var(--color-muted)] mt-1">
                    PDF files only
                  </span>
                </div>
              </div>

              {isLoading && (
                <div className="flex items-center gap-3 bg-[var(--color-paper-2)]/50 p-4 rounded-[var(--radius-md)] border border-[var(--color-rule)]">
                  <Loader2 className="h-5 w-5 animate-spin text-[var(--color-accent-deep)]" />
                  <div>
                    <p className="text-[var(--text-sm)] font-medium text-[var(--color-ink)]/80">
                      Reading your document...
                    </p>
                    <p className="text-[10px] text-[var(--color-muted)] mt-0.5">
                      This usually takes a few seconds.
                    </p>
                  </div>
                </div>
              )}

              {message && (
                <Alert
                  variant={message.type === "error" ? "destructive" : "default"}
                  className={`border ${
                    message.type === "success"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === "success" && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <AlertTitle className="font-bold text-sm">
                        {message.type === "error" ? "Oops" : "All done"}
                      </AlertTitle>
                      <AlertDescription className="text-xs mt-1">
                        {message.text}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Tip */}
          <div className="flex items-start gap-3 rounded-[var(--radius-lg)] bg-[var(--color-paper-2)]/50 p-5 border border-[var(--color-rule)]">
            <Info
              size={15}
              className="text-[var(--color-muted)] shrink-0 mt-0.5"
            />
            <p className="text-[var(--text-xs)] text-[var(--color-ink-2)] leading-relaxed">
              <strong className="text-[var(--color-ink)]">Tip:</strong> Upload
              one document at a time. If you have a long document, it will be
              split into smaller sections automatically so the AI can find the
              right information when clients ask questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
