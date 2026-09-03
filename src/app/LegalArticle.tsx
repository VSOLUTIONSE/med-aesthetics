import type React from "react";
import { Footer } from "./Footer";
import { NavBar } from "./Navbar";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface LegalArticleProps {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export const LegalArticle: React.FC<LegalArticleProps> = ({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}) => {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-paper)] text-[var(--color-ink)]">
      <NavBar />
      <main className="flex-1 px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)]">
        <div className="mx-auto max-w-[var(--page-max)]">
          <header className="max-w-2xl">
            <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
              {eyebrow}
            </p>
            <h1 className="font-[var(--font-display)] text-[var(--text-display-s)] font-bold leading-[1.1] tracking-[-0.025em] text-[var(--color-primary)]">
              {title}
            </h1>
            <p className="mt-[var(--space-md)] text-[var(--text-xs)] font-medium uppercase tracking-[0.14em] text-[var(--color-muted)]">
              Last updated {updated}
            </p>
            <p className="mt-[var(--space-lg)] text-[var(--text-base)] leading-[1.8] text-[var(--color-ink-2)]">
              {intro}
            </p>
          </header>

          <div className="mt-[var(--space-2xl)] max-w-2xl divide-y divide-[var(--color-rule)]">
            {sections.map((section) => (
              <section
                key={section.heading}
                className="py-[var(--space-lg)] first:pt-0 last:pb-0"
              >
                <h2 className="font-[var(--font-display)] text-[var(--text-md)] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-[var(--space-sm)] text-[var(--text-sm)] leading-[1.8] text-[var(--color-ink-2)]"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-[var(--space-sm)] space-y-[var(--space-xs)]">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-[var(--text-sm)] leading-[1.7] text-[var(--color-ink-2)]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] h-px w-3 shrink-0 bg-[var(--color-accent-deep)]"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
