// src/app/upload/page.tsx
"use client";

import { useState } from "react";
import { processPdfFile } from "./actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, UploadCloud, Database, Sparkles, FileText, CheckCircle2 } from "lucide-react";
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

    setIsLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const result = await processPdfFile(formData);

      if (result.success) {
        setMessage({
          type: "success",
          text: result.message || "PDF processed and inserted into the RAG database successfully.",
        });
        e.target.value = "";
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to process PDF",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "An error occurred while processing the PDF",
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
            <Database size={12} className="text-[#C8A45A]" />
            Admin Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            MedAesthetics Bristol Knowledge Base
          </h1>
          <p className="text-[#0E3F73]/70 max-w-xl mx-auto text-sm leading-relaxed">
            Upload new treatment lists, practitioner bios, clinic guidelines, or price lists. The AI Assistant will instantly index this content to answer client questions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          <Card className="bg-white border-[#EAF1F7] shadow-sm">
            <CardContent className="pt-6 space-y-2">
              <div className="flex justify-between items-center text-[#0E3F73]/60 text-xs font-semibold uppercase">
                <span>Vector Dimension</span>
                <Sparkles size={16} className="text-[#C8A45A]" />
              </div>
              <p className="text-2xl font-bold text-[#0E3F73]">1536</p>
              <p className="text-[10px] text-[#0E3F73]/50">text-embedding-3-small</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#EAF1F7] shadow-sm">
            <CardContent className="pt-6 space-y-2">
              <div className="flex justify-between items-center text-[#0E3F73]/60 text-xs font-semibold uppercase">
                <span>Embedding Model</span>
                <FileText size={16} className="text-[#C8A45A]" />
              </div>
              <p className="text-lg font-bold truncate text-[#0E3F73]">OpenAI v3</p>
              <p className="text-[10px] text-[#0E3F73]/50">Highly accurate semantic search</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-[#EAF1F7] shadow-sm">
            <CardContent className="pt-6 space-y-2">
              <div className="flex justify-between items-center text-[#0E3F73]/60 text-xs font-semibold uppercase">
                <span>System Status</span>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
              </div>
              <p className="text-2xl font-bold text-[#0E3F73]">Active</p>
              <p className="text-[10px] text-[#0E3F73]/50">RAG pipeline online</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Upload Card */}
        <Card className="bg-white border-[#EAF1F7] shadow-lg rounded-xl overflow-hidden">
          <CardHeader className="bg-[#0E3F73] text-white p-6">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <UploadCloud size={20} className="text-[#C8A45A]" />
              Sync PDF Documents
            </CardTitle>
            <CardDescription className="text-white/70 text-xs">
              Upload PDF files to slice into chunks and store in the Neon Postgres vector database.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div>
              <Label
                htmlFor="pdf-upload"
                className="block text-sm font-semibold text-[#0E3F73] mb-2"
              >
                Choose PDF File
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
                  {isLoading ? "Uploading..." : "Click or drag PDF file to upload"}
                </span>
                <span className="text-[10px] text-[#0E3F73]/60 mt-1">
                  Only .pdf format accepted
                </span>
              </div>
            </div>

            {isLoading && (
              <div className="flex items-center gap-3 bg-[#EAF1F7]/30 p-4 rounded-lg border border-[#EAF1F7]">
                <Loader2 className="h-5 w-5 animate-spin text-[#C8A45A]" />
                <span className="text-sm font-medium text-[#0E3F73]/80">
                  Splitting document, generating embeddings, and storing in Postgres vector index...
                </span>
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
                      {message.type === "error" ? "System Alert" : "Success"}
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
      </div>
      </div>
    </div>
  );
}

