import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { Footer } from "../Footer";
import { MedspaAssistant } from "../MedspaAssistant";
import { NavBar } from "../Navbar";
import { TreatmentCard } from "../TreatmentCard";

export const metadata: Metadata = {
  title: "Treatments — MedAesthetics Bristol",
  description:
    "Medical-led facial aesthetics in Bristol: anti-wrinkle injections, dermal fillers, skin rejuvenation and more. Every treatment begins with a consultation.",
};

const treatments = [
  {
    title: "Anti-wrinkle injections",
    description:
      "Subtle, precise treatment to soften the appearance of expression lines while keeping you looking like yourself.",
    priceFrom: "£195",
    duration: "30–45 mins",
    imageUrl:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Dermal fillers",
    description:
      "Carefully considered volume and definition to restore balance, structure and a refreshed, natural look.",
    priceFrom: "£250",
    duration: "45–60 mins",
    imageUrl:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Skin rejuvenation",
    description:
      "Evidence-led treatments that support healthier, brighter skin and a complexion that feels more confident.",
    priceFrom: "£150",
    duration: "30–60 mins",
    imageUrl:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Lip enhancement",
    description:
      "Subtle definition and hydration planned around your natural shape — balance first, never a one-size look.",
    priceFrom: "£250",
    duration: "45 mins",
    imageUrl:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Skin boosters",
    description:
      "Deep-acting hydration that improves skin quality, texture and glow from within, with results that build over time.",
    priceFrom: "£180",
    duration: "45 mins",
    imageUrl:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Chemical peels",
    description:
      "Gentle, medical-grade peels that renew dull or congested skin with minimal downtime and a considered recovery plan.",
    priceFrom: "£120",
    duration: "30 mins",
    imageUrl:
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1000&auto=format&fit=crop",
  },
];

const included = [
  "A full medical consultation before anything begins",
  "A bespoke plan built around your features and goals",
  "Treatment by qualified, insured medical professionals",
  "Written aftercare and a follow-up review",
];

export default function TreatmentsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <NavBar />

      <main>
        {/* Hero — Split diptych: copy left, proof image right */}
        <section
          className="px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)]"
          aria-labelledby="treatments-hero-heading"
        >
          <div className="max-w-[var(--page-max)] mx-auto grid items-center gap-[var(--space-2xl)] lg:grid-cols-2 lg:gap-[var(--space-3xl)]">
            <div>
              <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
                Treatments at MedAesthetics
              </p>
              <h1
                id="treatments-hero-heading"
                className="font-[var(--font-display)] text-[var(--text-display)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--color-primary)]"
              >
                Considered treatments,{" "}
                <span className="text-[var(--color-accent-deep)]">
                  chosen together.
                </span>
              </h1>
              <p className="mt-[var(--space-lg)] max-w-lg text-[var(--text-base)] leading-[1.8] text-[var(--color-ink-2)]">
                From anti-wrinkle injections to medical-grade skin care, every
                option here starts the same way — with a consultation, an honest
                conversation, and a plan that belongs to you alone.
              </p>
              <div className="mt-[var(--space-xl)] flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://facesconsent.com/v1/bookings/aisha-sahi?clinicSlug=medaesthetics-bristol-90bd55420410"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-paper)] transition-all duration-[var(--dur-short)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                >
                  Book appointment <ArrowRight size={15} />
                </a>
                <a
                  href="#included"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-primary)]/40 px-6 py-3 text-sm font-semibold text-[var(--color-primary)] transition-all duration-[var(--dur-short)] hover:bg-[var(--color-primary)] hover:text-[var(--color-paper)]"
                >
                  See what&rsquo;s included
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-rule)]">
              {/* biome-ignore lint/performance/noImgElement: external Unsplash placeholder imagery */}
              <img
                src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200&auto=format&fit=crop"
                alt="A calm, light-filled treatment room prepared for a consultation at MedAesthetics Bristol"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Treatment grid */}
        <section
          id="all-treatments"
          className="bg-[var(--color-paper-2)] px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)]"
          aria-labelledby="all-treatments-heading"
        >
          <div className="max-w-[var(--page-max)] mx-auto">
            <div className="mb-[var(--space-2xl)] flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
                  Ways we can help
                </p>
                <h2
                  id="all-treatments-heading"
                  className="font-[var(--font-display)] max-w-2xl text-[var(--text-3xl)] font-bold leading-tight tracking-[-0.02em]"
                >
                  Every treatment begins with listening.
                </h2>
              </div>
              <p className="max-w-xs text-[var(--text-sm)] leading-[1.7] text-[var(--color-muted)]">
                Prices shown are &ldquo;from&rdquo; guides. Your exact plan is
                quoted at consultation — never before, never after.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {treatments.map((treatment) => (
                <TreatmentCard
                  key={treatment.title}
                  {...treatment}
                  href="https://facesconsent.com/v1/bookings/aisha-sahi?clinicSlug=medaesthetics-bristol-90bd55420410"
                  ctaLabel="Book appointment"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Included in every treatment — Split diptych: image left, copy right */}
        <section
          id="included"
          className="px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)]"
          aria-labelledby="included-heading"
        >
          <div className="max-w-[var(--page-max)] mx-auto grid items-center gap-[var(--space-2xl)] lg:grid-cols-2 lg:gap-[var(--space-3xl)]">
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-rule)]">
              {/* biome-ignore lint/performance/noImgElement: external Unsplash placeholder imagery */}
              <img
                src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1200&auto=format&fit=crop"
                alt="Premium skincare products used within MedAesthetics Bristol treatments"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
                Included in every treatment
              </p>
              <h2
                id="included-heading"
                className="font-[var(--font-display)] max-w-md text-[var(--text-3xl)] font-bold leading-tight tracking-[-0.02em]"
              >
                The consultation comes first. Always.
              </h2>
              <p className="mt-[var(--space-lg)] max-w-md text-[var(--text-base)] leading-[1.8] text-[var(--color-ink-2)]">
                Whatever brings you to us, the shape of your visit stays the
                same — unhurried, informed, and led by clinicians who will tell
                you honestly if a treatment is not right for you.
              </p>
              <ul className="mt-[var(--space-xl)]">
                {included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-t border-[var(--color-rule)] pt-[var(--space-md)] text-[var(--text-sm)] leading-[1.7] text-[var(--color-ink)] [&:not(:first-child)]:mt-[var(--space-md)]"
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-[var(--color-accent-deep)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Pricing honesty — typography only */}
        <section
          className="bg-[var(--color-paper-3)] px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)]"
          aria-labelledby="pricing-heading"
        >
          <div className="max-w-[var(--page-max)] mx-auto text-center">
            <div className="mx-auto mb-[var(--space-lg)] h-px w-16 bg-[var(--color-accent)]" />
            <h2
              id="pricing-heading"
              className="font-[var(--font-display)] mx-auto max-w-3xl text-[var(--text-display-s)] font-bold leading-tight tracking-[-0.02em]"
            >
              Clear prices. Quoted in person. No surprises.
            </h2>
            <p className="mx-auto mt-[var(--space-lg)] max-w-xl text-[var(--text-base)] leading-[1.8] text-[var(--color-ink-2)]">
              The figures shown here are honest starting points. Your personal
              quote is confirmed at consultation, once we understand what you
              need — and treatment only ever proceeds with your informed
              consent. If nothing feels right, you leave with advice and no
              obligation.
            </p>
          </div>
        </section>

        {/* Closing CTA — dark navy, gold action */}
        <section
          className="bg-[var(--color-ink)] px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)] text-center"
          aria-labelledby="treatments-cta-heading"
        >
          <div className="max-w-[var(--page-max)] mx-auto">
            <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Ready when you are
            </p>
            <h2
              id="treatments-cta-heading"
              className="font-[var(--font-display)] text-[var(--text-3xl)] font-bold leading-tight tracking-[-0.02em] text-[var(--color-paper)] sm:text-[var(--text-4xl)]"
            >
              Start with a conversation.
            </h2>
            <p className="mx-auto mt-[var(--space-lg)] max-w-lg text-[var(--text-base)] leading-[1.8] text-[var(--color-accent)]">
              Bring your questions — about any treatment on this page, or
              something you have not found yet. We will help you find it.
            </p>
            <div className="mt-[var(--space-xl)] flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://facesconsent.com/v1/bookings/aisha-sahi?clinicSlug=medaesthetics-bristol-90bd55420410"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--color-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--color-accent-ink)] transition-all duration-[var(--dur-short)] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
              >
                Book appointment
              </a>
              <a
                href="/contact"
                className="rounded-full border border-[var(--color-paper)]/60 px-7 py-3.5 text-sm font-semibold text-[var(--color-paper)] transition-all duration-[var(--dur-short)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
              >
                Contact the clinic
              </a>
            </div>
          </div>
        </section>
      </main>

      <div id="footer">
        <Footer />
      </div>
      <MedspaAssistant />
    </div>
  );
}
