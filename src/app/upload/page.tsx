"use client";

import { useState } from "react";
import { processPdfFile } from "./actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, UploadCloud, FileText, CheckCircle2, Info } from "lucide-react";
import { NavBar } from "@/app/Navbar";

export default function PDFUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("[Upload] File selected:", {
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type,
    });

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const result = await processPdfFile(formData);

      if (result.success) {
        console.log("[Upload] Success:", result.message);
        setMessage({
          type: "success",
          text: result.message || "Document added successfully.",
        });
        e.target.value = "";
      } else {
        console.error("[Upload] Server error:", result.error);
        setMessage({
          type: "error",
          text: result.error || "Something went wrong.",
        });
      }
    } catch (err) {
      console.error("[Upload] Client error:", err);
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2E8]">
      <NavBar />
      <div className="bg-[#FAF8F5] py-16 px-6 text-[#0E3F73]">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1F7] text-xs font-semibold uppercase tracking-wider text-[#0E3F73] border border-[#EAF1F7]">
              <FileText size={12} className="text-[#C8A45A]" />
              Knowledge Base
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Add Documents to Your AI Assistant
            </h1>
            <p className="text-[#0E3F73]/70 max-w-2xl mx-auto text-sm leading-relaxed">
              Upload your clinic's documents and the AI assistant will learn from them.
              When clients ask about treatments, prices, or policies, the assistant
              will use these documents to give accurate answers.
            </p>
          </div>

          {/* How It Works */}
          <Card className="bg-white border-[#EAF1F7] shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-sm font-bold text-[#0E3F73] uppercase tracking-wide mb-4">
                How it works
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF1F7] text-sm font-bold text-[#0E3F73]">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0E3F73]">Upload a PDF</p>
                    <p className="text-xs text-[#0E3F73]/60 mt-1">
                      Choose a document like a price list, treatment guide, or clinic policy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF1F7] text-sm font-bold text-[#0E3F73]">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0E3F73]">We read it for you</p>
                    <p className="text-xs text-[#0E3F73]/60 mt-1">
                      The system breaks your document into small pieces so it can find the right information quickly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAF1F7] text-sm font-bold text-[#0E3F73]">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0E3F73]">AI answers questions</p>
                    <p className="text-xs text-[#0E3F73]/60 mt-1">
                      Clients can now ask the chatbot about what's in that document and get instant answers.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What to Upload */}
          <Card className="bg-white border-[#EAF1F7] shadow-sm">
            <CardContent className="p-6">
              <h2 className="text-sm font-bold text-[#0E3F73] uppercase tracking-wide mb-4">
                What to upload
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { title: "Price lists", desc: "Treatment costs and packages" },
                  { title: "Treatment guides", desc: "What each treatment involves, how long it takes" },
                  { title: "Practitioner bios", desc: "Who works at the clinic and their qualifications" },
                  { title: "Clinic policies", desc: "Booking rules, cancellation terms, aftercare" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl bg-[#FAF8F5] p-4 border border-[#EAF1F7]"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0E3F73]/5">
                      <FileText size={14} className="text-[#0E3F73]/60" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0E3F73]">{item.title}</p>
                      <p className="text-xs text-[#0E3F73]/60 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Upload Card */}
          <Card className="bg-white border-[#EAF1F7] shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="bg-[#0E3F73] text-white p-6">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <UploadCloud size={20} className="text-[#C8A45A]" />
                Upload a Document
              </CardTitle>
              <CardDescription className="text-white/70 text-xs">
                Select a PDF file from your computer to add it to the AI assistant's knowledge.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div>
                <Label
                  htmlFor="pdf-upload"
                  className="block text-sm font-semibold text-[#0E3F73] mb-2"
                >
                  Choose a PDF file
                </Label>
                <div className="relative border-2 border-dashed border-[#EAF1F7] hover:border-[#C8A45A] rounded-lg p-8 transition-colors flex flex-col items-center justify-center bg-[#FAF8F5]/50 group">
                  <Input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                  <UploadCloud size={40} className="text-[#0E3F73]/40 group-hover:text-[#C8A45A] transition-colors mb-3" />
                  <span className="text-sm font-medium text-[#0E3F73]">
                    {isLoading ? "Processing your document..." : "Click to browse or drag a PDF here"}
                  </span>
                  <span className="text-[10px] text-[#0E3F73]/60 mt-1">
                    PDF files only
                  </span>
                </div>
              </div>

              {isLoading && (
                <div className="flex items-center gap-3 bg-[#EAF1F7]/30 p-4 rounded-lg border border-[#EAF1F7]">
                  <Loader2 className="h-5 w-5 animate-spin text-[#C8A45A]" />
                  <div>
                    <p className="text-sm font-medium text-[#0E3F73]/80">
                      Reading your document...
                    </p>
                    <p className="text-[10px] text-[#0E3F73]/50 mt-0.5">
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
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === "success" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    ) : null}
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
          <div className="flex items-start gap-3 rounded-xl bg-[#EAF1F7]/50 p-5 border border-[#EAF1F7]">
            <Info size={16} className="text-[#0E3F73]/50 shrink-0 mt-0.5" />
            <p className="text-xs text-[#0E3F73]/70 leading-relaxed">
              <strong className="text-[#0E3F73]">Tip:</strong> Upload one document at a time.
              If you have a long document, it will be split into smaller sections automatically
              so the AI can find the right information when clients ask questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
