"use client";

import {
  ArrowRight,
  Award,
  Check,
  HeartPulse,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { Footer } from "./Footer";
import { MedspaAssistant } from "./MedspaAssistant";
import { NavBar } from "./Navbar";
import { TreatmentCard } from "./TreatmentCard";

const principles = [
  {
    icon: <ShieldCheck size={20} />,
    title: "Medical-led care",
    text: "Fully qualified and insured medical professionals committed to patient safety and ethical practice.",
  },
  {
    icon: <Award size={20} />,
    title: "Natural results",
    text: "We enhance your natural beauty. No overfilling, no dramatic changes — just a refreshed, authentic you.",
  },
  {
    icon: <HeartPulse size={20} />,
    title: "Personalised approach",
    text: "No two faces are the same. Every treatment plan is bespoke, starting with a comprehensive consultation.",
  },
  {
    icon: <UserCheck size={20} />,
    title: "CQC standards",
    text: "The highest clinical standards of hygiene and patient care, using only premium, CE-marked products.",
  },
];

const steps = [
  {
    number: "01",
    title: "Tell us",
    text: "Share what has been on your mind using our simple booking form or by getting in touch.",
  },
  {
    number: "02",
    title: "Have a conversation",
    text: "Meet with an experienced practitioner for a calm, unrushed consultation tailored to you.",
  },
  {
    number: "03",
    title: "Choose your next step",
    text: "If treatment feels right, we will make a considered plan together. If not, that is okay too.",
  },
];

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
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      {/* Announcement bar */}
      <div className="bg-[var(--color-ink)] px-4 py-2 text-center text-[11px] font-medium tracking-[0.1em] text-[var(--color-paper)]/70">
        <span>Now welcoming new consultation appointments in Bristol. </span>
        <a
          href="#booking"
          className="underline underline-offset-4 hover:text-[var(--color-accent)] transition-colors"
        >
          Book a consultation
        </a>
      </div>

      <NavBar />

      <main>
        {/* Hero — full-bleed clear video; copy sits on its own navy panel */}
        <section
          className="relative flex h-[92svh] min-h-[560px] max-h-[900px] items-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Ambient footage — "Facial treatment close-up" by Gustavo Fring, Pexels (free licence) */}
          <video
            src="https://videos.pexels.com/video-files/4264884/4264884-hd_1920_1080_30fps.mp4"
            poster="https://images.pexels.com/photos/7446658/pexels-photo-7446658.jpeg?auto=compress&cs=tinysrgb&w=1600"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="relative z-10 mx-auto w-full max-w-[var(--page-max)] px-[var(--page-gutter)]">
            <div className="max-w-xl rounded-[var(--radius-xl)] border border-[var(--color-paper)]/60 bg-[var(--color-paper)]/75 p-[var(--space-xl)] shadow-2xl backdrop-blur-lg sm:p-[var(--space-2xl)]">
              <p className="mb-[var(--space-lg)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
                Bespoke aesthetics in Bristol
              </p>
              <h1
                id="hero-heading"
                className="font-[var(--font-display)] text-[var(--text-display)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--color-primary)]"
              >
                Clinical expertise.{" "}
                <span className="text-[var(--color-accent-deep)]">
                  Beautiful results.
                </span>
              </h1>
              <p className="mt-[var(--space-lg)] max-w-lg text-[var(--text-base)] leading-[1.8] text-[var(--color-primary)]/85">
                Advanced facial aesthetic and skin rejuvenation treatments in a
                calm, professional setting. Every journey begins with
                understanding your goals, your features, and what feels right
                for you.
              </p>
              <div className="mt-[var(--space-xl)] flex flex-col gap-3 sm:flex-row">
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-[var(--color-paper)] px-6 py-3 text-sm font-semibold rounded-full transition-all duration-[var(--dur-short)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  Book a consultation <ArrowRight size={15} />
                </a>
                <a
                  href="#treatments"
                  className="inline-flex items-center justify-center border border-[var(--color-primary)]/40 text-[var(--color-primary)] px-6 py-3 text-sm font-semibold rounded-full transition-all duration-[var(--dur-short)] hover:bg-[var(--color-primary)] hover:text-[var(--color-paper)]"
                >
                  Explore treatments
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Conversation opener — typographic section */}
        <section
          className="px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)] max-w-[var(--page-max)] mx-auto text-center"
          aria-labelledby="conversation-heading"
        >
          <div className="mx-auto mb-[var(--space-lg)] h-px w-16 bg-[var(--color-accent)]" />
          <h2
            id="conversation-heading"
            className="font-[var(--font-display)] mx-auto max-w-3xl text-[var(--text-display-s)] font-bold leading-tight tracking-[-0.02em]"
          >
            You do not need to know the treatment name before you get in touch.
          </h2>
          <p className="mx-auto mt-[var(--space-lg)] max-w-lg text-[var(--text-base)] leading-[1.8] text-[var(--color-ink-2)]">
            The best place to begin is with an honest conversation about what
            you see, how you feel, and what you would like to explore. We will
            help you find the language — and the options — that feel right.
          </p>
          <a
            href="#consultation"
            className="mt-[var(--space-lg)] inline-flex items-center gap-2 text-[var(--text-sm)] font-semibold text-[var(--color-ink)] underline decoration-[var(--color-accent)] decoration-2 underline-offset-8 hover:text-[var(--color-accent-deep)] transition-colors"
          >
            Learn about your consultation{" "}
            <ArrowRight size={15} className="text-[var(--color-accent-deep)]" />
          </a>
        </section>

        {/* Treatments — grid section */}
        <section
          id="treatments"
          className="bg-[var(--color-paper-2)] px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)]"
          aria-labelledby="treatments-heading"
        >
          <div className="max-w-[var(--page-max)] mx-auto">
            <div className="mb-[var(--space-2xl)] flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
                  Ways we can help
                </p>
                <h2
                  id="treatments-heading"
                  className="font-[var(--font-display)] max-w-2xl text-[var(--text-3xl)] font-bold leading-tight tracking-[-0.02em]"
                >
                  Care that starts with what matters to you.
                </h2>
              </div>
              <a
                href="#consultation"
                className="text-[var(--text-sm)] font-semibold text-[var(--color-ink)] underline decoration-[var(--color-accent)] underline-offset-4 hover:text-[var(--color-accent-deep)] transition-colors"
              >
                View all treatments <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {treatments.map((t) => (
                <TreatmentCard key={t.title} {...t} />
              ))}
            </div>
          </div>
        </section>

        {/* Approach — Split diptych: text left, principles right */}
        <section
          id="about"
          className="px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)]"
          aria-labelledby="approach-heading"
        >
          <div className="max-w-[var(--page-max)] mx-auto grid lg:grid-cols-2 gap-[var(--space-2xl)] lg:gap-[var(--space-4xl)] items-start">
            <div className="lg:sticky lg:top-24">
              <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
                The MedAesthetics approach
              </p>
              <h2
                id="approach-heading"
                className="font-[var(--font-display)] text-[var(--text-3xl)] font-bold leading-tight tracking-[-0.02em]"
              >
                A considered approach to facial aesthetics.
              </h2>
              <p className="mt-[var(--space-lg)] text-[var(--text-base)] leading-[1.8] text-[var(--color-ink-2)]">
                Good aesthetic care is not about chasing perfection. It is about
                expert guidance, clear choices and results that still feel like
                you.
              </p>
              <div className="mt-[var(--space-xl)]">
                <a
                  href="#booking"
                  className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-[var(--color-paper)] px-6 py-3 text-sm font-semibold rounded-full transition-all duration-[var(--dur-short)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  Book a consultation <ArrowRight size={15} />
                </a>
              </div>
              <figure className="mt-[var(--space-2xl)] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-rule)]">
                {/* biome-ignore lint/performance/noImgElement: external Unsplash placeholder imagery */}
                <img
                  src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1000&auto=format&fit=crop"
                  alt="A relaxed client with a natural, refreshed look after treatment at the clinic"
                  width={800}
                  height={1000}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
              </figure>
            </div>
            <div className="grid gap-6">
              {principles.map((p) => (
                <article
                  key={p.title}
                  className="flex gap-5 p-[var(--space-lg)] rounded-[var(--radius-lg)] border border-[var(--color-rule)] hover:border-[var(--color-accent)]/30 transition-colors duration-[var(--dur-short)]"
                >
                  <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent-deep)]">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-[var(--font-display)] text-[var(--text-lg)] font-semibold text-[var(--color-ink)] tracking-[-0.01em]">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-[var(--text-sm)] leading-[1.7] text-[var(--color-ink-2)]">
                      {p.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation steps — horizontal flow */}
        <section
          id="consultation"
          className="bg-[var(--color-paper-2)] px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)]"
          aria-labelledby="steps-heading"
        >
          <div className="max-w-[var(--page-max)] mx-auto">
            <div className="max-w-2xl">
              <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
                Your next step
              </p>
              <h2
                id="steps-heading"
                className="font-[var(--font-display)] text-[var(--text-3xl)] font-bold leading-tight tracking-[-0.02em]"
              >
                From your first question to your consultation.
              </h2>
            </div>
            <div className="mt-[var(--space-2xl)] grid gap-8 md:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="relative border-t border-[var(--color-accent)] pt-[var(--space-lg)]"
                >
                  <span className="font-[var(--font-display)] text-[var(--text-xs)] font-bold text-[var(--color-accent-deep)] tracking-wider">
                    {step.number}
                  </span>
                  <h3 className="mt-[var(--space-md)] font-[var(--font-display)] text-[var(--text-xl)] font-semibold text-[var(--color-ink)] tracking-[-0.01em]">
                    {step.title}
                  </h3>
                  <p className="mt-[var(--space-sm)] text-[var(--text-sm)] leading-[1.7] text-[var(--color-ink-2)]">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-[var(--space-2xl)] text-center">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-[var(--color-paper)] px-8 py-3.5 text-sm font-semibold rounded-full transition-all duration-[var(--dur-short)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Book your consultation <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* Reassurance — chips */}
        <section
          className="px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)] max-w-[var(--page-max)] mx-auto text-center"
          aria-labelledby="reassurance-heading"
        >
          <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
            Reassurance, at every stage
          </p>
          <h2
            id="reassurance-heading"
            className="font-[var(--font-display)] text-[var(--text-3xl)] font-bold tracking-[-0.02em]"
          >
            You deserve clear answers before you decide.
          </h2>
          <p className="mx-auto mt-[var(--space-lg)] max-w-xl text-[var(--text-base)] leading-[1.8] text-[var(--color-ink-2)]">
            Our role is to give you the context, care and confidence to make a
            decision that feels entirely your own.
          </p>
          <div className="mt-[var(--space-xl)] flex flex-wrap justify-center gap-3">
            {[
              "Experienced professionals",
              "Personalised consultations",
              "Clear treatment information",
              "Patient-led decisions",
              "FaceConsent booking",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 border border-[var(--color-rule)] bg-[var(--color-paper)] px-4 py-2.5 text-[var(--text-xs)] font-medium text-[var(--color-ink)] rounded-full"
              >
                <Check size={13} className="text-[var(--color-accent-deep)]" />
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* AI Assistant — Split diptych: text left, widget preview right */}
        <section
          className="bg-[var(--color-paper-2)] px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)]"
          aria-labelledby="assistant-heading"
        >
          <div className="max-w-[var(--page-max)] mx-auto grid lg:grid-cols-2 gap-[var(--space-2xl)] lg:gap-[var(--space-4xl)] items-center">
            <div>
              <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
                Here to help
              </p>
              <h2
                id="assistant-heading"
                className="font-[var(--font-display)] max-w-md text-[var(--text-3xl)] font-bold leading-tight tracking-[-0.02em]"
              >
                Have a question before you book?
              </h2>
              <p className="mt-[var(--space-lg)] max-w-md text-[var(--text-base)] leading-[1.8] text-[var(--color-ink-2)]">
                Our Medspa Assistant can help you explore treatments, understand
                the consultation process, or simply point you in the right
                direction.
              </p>
              <button
                type="button"
                className="mt-[var(--space-xl)] inline-flex items-center gap-2 bg-[var(--color-primary)] text-[var(--color-paper)] px-6 py-3 text-sm font-semibold rounded-full transition-all duration-[var(--dur-short)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-medspa-assistant"))
                }
              >
                Ask the Medspa Assistant <MessageCircle size={15} />
              </button>
            </div>
            <div className="max-w-md rounded-[var(--radius-xl)] border border-[var(--color-rule)] bg-[var(--color-paper)] p-[var(--space-lg)] shadow-[0_1px_3px_oklch(20%_0.01_30_/_0.04)]">
              <div className="flex items-center gap-3 border-b border-[var(--color-rule)] pb-[var(--space-md)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-ink)]">
                  <Sparkles size={15} />
                </div>
                <div>
                  <p className="text-[var(--text-sm)] font-semibold text-[var(--color-ink)]">
                    MedAesthetics Assistant
                  </p>
                  <p className="text-[var(--text-xs)] text-[var(--color-muted)]">
                    Here to answer your questions
                  </p>
                </div>
              </div>
              <p className="mt-[var(--space-md)] max-w-xs rounded-2xl rounded-tl-md bg-[var(--color-paper-2)] p-4 text-[var(--text-sm)] leading-[1.6] text-[var(--color-ink)]">
                Hi, I&apos;m the MedAesthetics Assistant. What would you like to
                know?
              </p>
              <div className="mt-[var(--space-md)] flex flex-wrap gap-2">
                {["Treatments", "The consultation", "Pricing"].map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="border border-[var(--color-rule)] px-3 py-1.5 text-[var(--text-xs)] text-[var(--color-ink)] hover:border-[var(--color-accent-deep)] hover:text-[var(--color-accent-deep)] rounded-full transition-colors duration-[var(--dur-short)]"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Booking CTA — dark section, photo under deep-navy overlay */}
        <section
          id="booking"
          className="relative overflow-hidden bg-[var(--color-ink)] px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)] text-center"
        >
          {/* biome-ignore lint/performance/noImgElement: decorative background photo under navy overlay */}
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1800&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/88 via-[var(--color-ink)]/85 to-[var(--color-ink)]/90" />
          <div className="relative z-10">
            <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Begin somewhere simple
            </p>
            <h2 className="font-[var(--font-display)] text-[var(--text-3xl)] font-bold leading-tight tracking-[-0.02em] text-[var(--color-paper)] sm:text-[var(--text-4xl)]">
              Start with a conversation.
            </h2>
            <p className="mx-auto mt-[var(--space-lg)] max-w-lg text-[var(--text-base)] leading-[1.8] text-[var(--color-accent)]">
              Bring your questions, your hopes, or simply your curiosity. We
              will meet you there.
            </p>
            <div className="mt-[var(--space-xl)] flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#consultation"
                className="bg-[var(--color-accent)] text-[var(--color-accent-ink)] px-7 py-3.5 text-sm font-semibold rounded-full transition-all duration-[var(--dur-short)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Book a consultation
              </a>
              <a
                href="#contact"
                className="border border-[var(--color-paper)]/60 text-[var(--color-paper)] px-7 py-3.5 text-sm font-semibold rounded-full transition-all duration-[var(--dur-short)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
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
