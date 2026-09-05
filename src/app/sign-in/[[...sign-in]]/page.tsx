"use client";

import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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

  const errorBoxClass =
    "flex items-start gap-2 rounded-[var(--radius-md)] border border-[var(--color-danger)]/20 bg-[var(--color-danger-soft)] px-4 py-3 text-sm text-[var(--color-danger)]";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-paper-2)] px-[var(--page-gutter)] py-[var(--space-3xl)]">
      <div className="w-full max-w-[26rem]">
        {/* Wordmark */}
        <div className="mb-[var(--space-xl)] text-center">
          <a
            href="/"
            className="inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-4"
          >
            <Image
              src="/img/logo.jpg"
              alt="MedAesthetics Bristol"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-[var(--color-rule)] object-cover"
              priority
            />
            <span className="font-[var(--font-display)] text-[var(--text-lg)] font-extrabold tracking-[-0.02em] text-[var(--color-ink)]">
              MedAesthetics
              <span className="text-[var(--color-accent-deep)]"> Bristol</span>
            </span>
          </a>
          <p className="mt-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
            Admin portal
          </p>
        </div>

        {/* Sign-in card */}
        <div className="rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-[var(--space-xl)] shadow-[0_1px_2px_oklch(20%_0.01_30_/_0.04),0_8px_24px_oklch(20%_0.01_30_/_0.06)] sm:p-[var(--space-2xl)]">
          <div className="mb-[var(--space-lg)]">
            <h1 className="font-[var(--font-display)] text-[var(--text-2xl)] font-extrabold tracking-[-0.02em] text-[var(--color-ink)]">
              Welcome back
            </h1>
            <p className="mt-[var(--space-2xs)] text-[var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
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
                    <FormLabel className="text-sm font-medium text-[var(--color-ink)]">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
                        />
                        <Input
                          {...field}
                          type="email"
                          autoComplete="email"
                          placeholder="you@clinic.co.uk"
                          disabled={isPending}
                          className="h-11 rounded-[var(--radius-md)] border-[var(--color-rule)] bg-[var(--color-paper)] pl-10 text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus-visible:border-[var(--color-focus)] focus-visible:ring-[var(--color-focus)]/20"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-[var(--color-danger)]" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-[var(--color-ink)]">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock
                          size={16}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
                        />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          disabled={isPending}
                          className="h-11 rounded-[var(--radius-md)] border-[var(--color-rule)] bg-[var(--color-paper)] pl-10 pr-10 text-[var(--color-ink)] placeholder:text-[var(--color-muted)] focus-visible:border-[var(--color-focus)] focus-visible:ring-[var(--color-focus)]/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
                          tabIndex={-1}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-[var(--color-danger)]" />
                  </FormItem>
                )}
              />

              {/* Clerk field-level errors */}
              {errors?.fields?.identifier && (
                <div className={errorBoxClass}>
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>
                    {errors.fields.identifier.longMessage ??
                      errors.fields.identifier.message}
                  </span>
                </div>
              )}
              {errors?.fields?.password && (
                <div className={errorBoxClass}>
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>
                    {errors.fields.password.longMessage ??
                      errors.fields.password.message}
                  </span>
                </div>
              )}

              {/* Server / global errors */}
              {serverError && (
                <div className={errorBoxClass}>
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 w-full rounded-full bg-[var(--color-primary)] text-[var(--color-paper)] font-semibold transition-all duration-[var(--dur-short)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 disabled:opacity-50"
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

          <div className="mt-6 border-t border-[var(--color-rule)] pt-4">
            <p className="text-center text-[var(--text-xs)] text-[var(--color-muted)]">
              Restricted to authorised clinic administrators.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-[var(--text-xs)] text-[var(--color-muted)]">
          &copy; {new Date().getFullYear()} MedAesthetics Bristol
        </p>
      </div>
    </div>
  );
}
