import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { Footer } from "../Footer";
import { MedspaAssistant } from "../MedspaAssistant";
import { NavBar } from "../Navbar";

export const metadata: Metadata = {
  title: "Contact & location — MedAesthetics Bristol",
  description:
    "Find MedAesthetics Bristol at 18 Berkeley Square, Clifton. Call 0117 123 4567, email hello@medaestheticsbristol.co.uk, or book a consultation online.",
};

const bookingUrl =
  "https://facesconsent.com/v1/bookings/aisha-sahi?clinicSlug=medaesthetics-bristol-90bd55420410";

const hours = [
  { day: "Monday", time: "Closed" },
  { day: "Tuesday", time: "Closed" },
  { day: "Wednesday", time: "10:00 – 19:00" },
  { day: "Thursday", time: "10:00 – 19:00" },
  { day: "Friday", time: "09:00 – 17:00" },
  { day: "Saturday", time: "By appointment" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)]">
      <NavBar />

      <main>
        {/* Hero — Split diptych: copy left, proof image right */}
        <section
          className="px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)]"
          aria-labelledby="contact-hero-heading"
        >
          <div className="max-w-[var(--page-max)] mx-auto grid items-center gap-[var(--space-2xl)] lg:grid-cols-2 lg:gap-[var(--space-3xl)]">
            <div>
              <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
                Contact &amp; location
              </p>
              <h1
                id="contact-hero-heading"
                className="font-[var(--font-display)] text-[var(--text-display)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--color-primary)]"
              >
                Find us in the heart of{" "}
                <span className="text-[var(--color-accent-deep)]">
                  Clifton.
                </span>
              </h1>
              <p className="mt-[var(--space-lg)] max-w-lg text-[var(--text-base)] leading-[1.8] text-[var(--color-ink-2)]">
                The clinic sits just off Berkeley Square — a quiet, light-filled
                space where conversations are never rushed. Send a question any
                time, or book an appointment and we will take it from there.
              </p>
              <div className="mt-[var(--space-xl)] flex flex-col gap-3 sm:flex-row">
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] text-[var(--color-paper)] px-6 py-3 text-sm font-semibold rounded-full transition-all duration-[var(--dur-short)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  Book appointment <ArrowRight size={15} />
                </a>
                <a
                  href="mailto:hello@medaestheticsbristol.co.uk"
                  className="inline-flex items-center justify-center border border-[var(--color-primary)]/40 text-[var(--color-primary)] px-6 py-3 text-sm font-semibold rounded-full transition-all duration-[var(--dur-short)] hover:bg-[var(--color-primary)] hover:text-[var(--color-paper)]"
                >
                  Email the clinic
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-rule)]">
              {/* biome-ignore lint/performance/noImgElement: external Unsplash placeholder imagery */}
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop"
                alt="The calm, light-filled exterior of a clinic in the Clifton area of Bristol"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Details — contact methods + opening hours */}
        <section
          className="bg-[var(--color-paper-2)] px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)]"
          aria-labelledby="contact-details-heading"
        >
          <div className="max-w-[var(--page-max)] mx-auto grid gap-[var(--space-2xl)] lg:grid-cols-2 lg:gap-[var(--space-3xl)]">
            {/* Contact methods */}
            <div>
              <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
                Get in touch
              </p>
              <h2
                id="contact-details-heading"
                className="font-[var(--font-display)] max-w-md text-[var(--text-3xl)] font-bold leading-tight tracking-[-0.02em]"
              >
                A few ways to reach us.
              </h2>
              <ul className="mt-[var(--space-xl)] divide-y divide-[var(--color-rule)] text-[var(--text-sm)] leading-[1.7]">
                <li className="flex items-start gap-3 py-[var(--space-md)] first:pt-0">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-[var(--color-accent-deep)]"
                  />
                  <div>
                    <p className="font-semibold text-[var(--color-ink)]">
                      The clinic
                    </p>
                    <p className="mt-1 text-[var(--color-ink-2)]">
                      18 Berkeley Square, Clifton
                      <br />
                      Bristol, BS8 1HB
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 py-[var(--space-md)]">
                  <Phone
                    size={18}
                    className="mt-0.5 shrink-0 text-[var(--color-accent-deep)]"
                  />
                  <div>
                    <p className="font-semibold text-[var(--color-ink)]">
                      Call the clinic
                    </p>
                    <a
                      href="tel:+441171234567"
                      className="mt-1 block text-[var(--color-ink-2)] hover:text-[var(--color-accent-deep)] transition-colors duration-[var(--dur-short)]"
                    >
                      0117 123 4567
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3 py-[var(--space-md)] last:pb-0">
                  <Mail
                    size={18}
                    className="mt-0.5 shrink-0 text-[var(--color-accent-deep)]"
                  />
                  <div>
                    <p className="font-semibold text-[var(--color-ink)]">
                      Write to us
                    </p>
                    <a
                      href="mailto:hello@medaestheticsbristol.co.uk"
                      className="mt-1 block break-all text-[var(--color-ink-2)] hover:text-[var(--color-accent-deep)] transition-colors duration-[var(--dur-short)]"
                    >
                      hello@medaestheticsbristol.co.uk
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Opening hours */}
            <div>
              <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-deep)]">
                Opening hours
              </p>
              <h2 className="font-[var(--font-display)] max-w-md text-[var(--text-3xl)] font-bold leading-tight tracking-[-0.02em]">
                When we are here.
              </h2>
              <ul className="mt-[var(--space-xl)] divide-y divide-[var(--color-rule)]">
                {hours.map((row) => (
                  <li
                    key={row.day}
                    className="flex items-center justify-between py-[var(--space-md)] text-[var(--text-sm)]"
                  >
                    <div className="flex items-center gap-2 text-[var(--color-ink-2)]">
                      <Clock
                        size={14}
                        className="text-[var(--color-accent-deep)]"
                      />
                      <span>{row.day}</span>
                    </div>
                    <span
                      className={
                        row.time === "Closed"
                          ? "text-[var(--color-muted)]"
                          : "font-medium text-[var(--color-ink)]"
                      }
                    >
                      {row.time}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-[var(--space-lg)] text-[var(--text-sm)] leading-[1.7] text-[var(--color-muted)]">
                Same-day appointments are not available — we like to give
                everyone their full, unhurried time.
              </p>
            </div>
          </div>
        </section>

        {/* Closing CTA — dark section, photo under deep-navy overlay */}
        <section
          className="relative overflow-hidden bg-[var(--color-ink)] px-[var(--page-gutter)] py-[var(--space-3xl)] lg:py-[var(--space-4xl)] text-center"
          aria-labelledby="contact-cta-heading"
        >
          {/* biome-ignore lint/performance/noImgElement: decorative background photo under navy overlay */}
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1800&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-ink)]/25 via-[var(--color-ink)]/20 to-[var(--color-ink)]/30" />
          <div className="relative z-10">
            <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Begin somewhere simple
            </p>
            <h2
              id="contact-cta-heading"
              className="font-[var(--font-display)] text-[var(--text-3xl)] font-bold leading-tight tracking-[-0.02em] text-[var(--color-paper)] sm:text-[var(--text-4xl)]"
            >
              Start with a conversation.
            </h2>
            <p className="mx-auto mt-[var(--space-lg)] max-w-lg text-[var(--text-base)] leading-[1.8] text-[var(--color-accent)]">
              Bring your questions, your hopes, or simply your curiosity. We
              will meet you there.
            </p>
            <div className="mt-[var(--space-xl)] flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-accent)] text-[var(--color-accent-ink)] px-7 py-3.5 text-sm font-semibold rounded-full transition-all duration-[var(--dur-short)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                Book appointment
              </a>
              <a
                href="mailto:hello@medaestheticsbristol.co.uk"
                className="border border-[var(--color-paper)]/60 text-[var(--color-paper)] px-7 py-3.5 text-sm font-semibold rounded-full transition-all duration-[var(--dur-short)] hover:bg-[var(--color-paper)] hover:text-[var(--color-ink)]"
              >
                Email the clinic
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MedspaAssistant />
    </div>
  );
}
