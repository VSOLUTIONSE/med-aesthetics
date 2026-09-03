"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { Loader2, Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const signInSchema = z.object({
  emailAddress: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type SignInValues = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const isPending = fetchStatus === "fetching";

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInValues) {
    if (!signIn) return;

    setServerError(null);

    try {
      const result = await signIn.password({
        identifier: values.emailAddress,
        password: values.password,
      });

      if (result.error) {
        setServerError(
          result.error.longMessage ?? "Unable to sign in. Please try again.",
        );
        return;
      }

      if (signIn.status === "complete") {
        await signIn.finalize();
        router.push("/upload");
        router.refresh();
      } else {
        setServerError(
          "Additional verification is required. Please contact the clinic.",
        );
      }
    } catch {
      setServerError("Unable to sign in. Please try again.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0E3F73] via-[#0a2d54] to-[#061a33] px-4">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#C8A45A]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#C8A45A]/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-8 w-8 text-[#C8A45A]"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-3xl font-bold tracking-tight text-white">
            MedAesthetics
          </h1>
          <p className="mt-2 text-sm text-white/60 font-['Cormorant_Garamond'] italic">
            Admin Portal
          </p>
        </div>

        {/* Sign-in card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white font-['Cormorant_Garamond']">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-white/50">
              Sign in to manage your knowledge base.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white/80">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                        />
                        <Input
                          {...field}
                          type="email"
                          autoComplete="email"
                          placeholder="you@clinic.co.uk"
                          disabled={isPending}
                          className="h-11 rounded-xl border-white/10 bg-white/10 pl-10 text-white placeholder:text-white/30 focus-visible:border-[#C8A45A]/50 focus-visible:ring-[#C8A45A]/20"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white/80">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
                        />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          disabled={isPending}
                          className="h-11 rounded-xl border-white/10 bg-white/10 pl-10 pr-10 text-white placeholder:text-white/30 focus-visible:border-[#C8A45A]/50 focus-visible:ring-[#C8A45A]/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />

              {/* Clerk field-level errors */}
              {errors?.fields?.identifier && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{errors.fields.identifier.longMessage ?? errors.fields.identifier.message}</span>
                </div>
              )}
              {errors?.fields?.password && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{errors.fields.password.longMessage ?? errors.fields.password.message}</span>
                </div>
              )}

              {/* Server / global errors */}
              {serverError && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 w-full rounded-xl bg-[#C8A45A] text-[#0E3F73] font-semibold hover:bg-[#d4b06a] disabled:opacity-50 transition-all duration-200 hover:shadow-lg hover:shadow-[#C8A45A]/20 cursor-pointer"
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 border-t border-white/10 pt-4">
            <p className="text-center text-[11px] text-white/30">
              Restricted to authorised clinic administrators.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/20">
          &copy; {new Date().getFullYear()} MedAesthetics Bristol
        </p>
      </div>
    </div>
  );
}
