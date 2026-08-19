// src/app/sign-in/[[...sign-in]]/page.tsx
// Custom branded admin sign-in. No sign-up — access is restricted to
// users whose Clerk publicMetadata.role === "admin" (enforced in middleware).
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs/legacy";
import { Sparkles, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isLoaded || !signIn) return;

    setIsPending(true);
    setError(null);

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete" && result.createdSessionId) {
        await setActive({ session: result.createdSessionId });
        router.push("/upload");
        router.refresh();
      } else {
        setError("Additional verification is required. Please contact the clinic.");
      }
    } catch (err) {
      const clerkError = err as { errors?: { longMessage?: string }[] };
      setError(
        clerkError.errors?.[0]?.longMessage ?? "Unable to sign in. Please try again."
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F7F2E8] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0E3F73] text-white shadow-lg">
            <Sparkles size={24} className="text-[#C8A45A]" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#0E3F73]">
            MedAesthetics Bristol
          </h1>
          <p className="mt-2 text-sm text-[#1E2833]/70">
            Admin sign in to manage the knowledge base.
          </p>
        </div>

        <div className="rounded-2xl border border-[#EAF1F7] bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-[#0E3F73]"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                disabled={isPending}
                placeholder="you@clinic.co.uk"
                className="h-11 rounded-xl border-[#EAF1F7] bg-[#FAF8F5] text-[#0E3F73] placeholder:text-[#0E3F73]/40 focus-visible:border-[#C8A45A] focus-visible:ring-0"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-[#0E3F73]"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
                placeholder="••••••••"
                className="h-11 rounded-xl border-[#EAF1F7] bg-[#FAF8F5] text-[#0E3F73] placeholder:text-[#0E3F73]/40 focus-visible:border-[#C8A45A] focus-visible:ring-0"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-800">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending || !isLoaded}
              className="h-11 w-full rounded-full bg-[#0E3F73] text-white hover:bg-[#082C52] disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <Lock size={16} />
                  Sign in
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-[10px] text-[#1E2833]/50">
            Access is restricted to authorised clinic administrators.
          </p>
        </div>
      </div>
    </div>
  );
}