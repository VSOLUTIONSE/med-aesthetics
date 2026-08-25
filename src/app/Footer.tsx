import { ArrowRight } from "lucide-react";
import type React from "react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-paper)]">
      {/* Statement section */}
      <div className="max-w-[var(--page-max)] mx-auto px-[var(--page-gutter)] py-[var(--space-4xl)]">
        <p className="font-[var(--font-display)] text-[clamp(1.75rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.02em] max-w-[28ch] mb-[var(--space-xl)]">
          Your face, your pace, your plan.
        </p>
        <a
          href="#booking"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-paper)] transition-colors duration-[var(--dur-short)]"
        >
          Book a consultation <ArrowRight size={14} />
        </a>
      </div>

      {/* Meta row — hairline above */}
      <div className="border-t border-[var(--color-paper)]/10">
        <div className="max-w-[var(--page-max)] mx-auto px-[var(--page-gutter)] py-[var(--space-lg)] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-[var(--font-display)] text-sm font-semibold tracking-[-0.01em]">
              MedAesthetics Bristol
            </span>
            <span className="text-[var(--text-xs)] text-[var(--color-paper)]/50">
              18 Berkeley Square, Bristol, BS8 1HB
            </span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.12em] text-[var(--color-paper)]/40">
            <a
              href="/privacy"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              Terms
            </a>
            <a
              href="/cookies"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              Cookies
            </a>
            <span>© {currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
