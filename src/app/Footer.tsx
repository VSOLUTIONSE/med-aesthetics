import {
  ArrowRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import type React from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Treatments", href: "/treatments" },
  { name: "The consultation", href: "/#consultation" },
  { name: "About the clinic", href: "/#about" },
  { name: "Contact & location", href: "/contact" },
];

const openingHours = [
  { day: "Mon – Tue", time: "Closed" },
  { day: "Wednesday", time: "10:00 – 19:00" },
  { day: "Thursday", time: "10:00 – 19:00" },
  { day: "Friday", time: "09:00 – 17:00" },
  { day: "Saturday", time: "By appointment" },
  { day: "Sunday", time: "Closed" },
];

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/medaestheticsbristol",
    icon: Instagram,
  },
  { name: "Facebook", href: "https://www.facebook.com", icon: Facebook },
  {
    name: "Email",
    href: "mailto:hello@medaestheticsbristol.co.uk",
    icon: Mail,
  },
];

const mapUrl =
  "https://www.google.com/maps/place/MedAesthetics+Bristol/@51.4207682,-2.5642853,18z/data=!4m6!3m5!1s0x48718f8ebfc41b19:0x4e8c958f54b96551!8m2!3d51.420504!4d-2.55935!16s%2Fg%2F11mkc22t1j?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D";

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
          href="https://facesconsent.com/v1/bookings/aisha-sahi?clinicSlug=medaesthetics-bristol-90bd55420410"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-paper)] transition-colors duration-[var(--dur-short)]"
        >
          Book appointment <ArrowRight size={14} />
        </a>
      </div>

      {/* Link columns */}
      <div className="border-t border-[var(--color-paper)]/10">
        <div className="max-w-[var(--page-max)] mx-auto px-[var(--page-gutter)] py-[var(--space-2xl)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--space-xl)]">
          {/* Brand */}
          <div>
            <p className="font-[var(--font-display)] text-[var(--text-lg)] font-semibold tracking-[-0.01em] mb-[var(--space-lg)]">
              MedAesthetics{" "}
              <span className="text-[var(--color-accent)]">Bristol</span>
            </p>
            <p className="text-[var(--text-sm)] leading-[1.7] text-[var(--color-paper)]/60 max-w-xs mb-[var(--space-lg)]">
              Medical-led facial aesthetics and skin rejuvenation in the heart
              of Bristol. Our focus is safety, education and natural results.
            </p>
            <div className="flex gap-[var(--space-xs)]">
              {socials.map((social) => {
                const isExternal = social.href.startsWith("http");
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="p-2 text-[var(--color-paper)]/60 hover:text-[var(--color-accent)] transition-colors duration-[var(--dur-short)]"
                  >
                    <social.icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-[var(--space-lg)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-paper)]/50">
              Navigation
            </h3>
            <ul className="space-y-[var(--space-sm)] text-[var(--text-sm)]">
              {navigation.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[var(--color-paper)]/60 hover:text-[var(--color-accent)] transition-colors duration-[var(--dur-short)]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic info */}
          <div>
            <h3 className="mb-[var(--space-lg)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-paper)]/50">
              Clinic info
            </h3>
            <ul className="space-y-[var(--space-md)] text-[var(--text-sm)] leading-[1.7] text-[var(--color-paper)]/60">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[var(--color-accent)]"
                />
                <span>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-accent)] transition-colors duration-[var(--dur-short)]"
                  >
                    22 Acer Village
                    <br />
                    Bristol BS14 9BH
                  </a>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-[var(--text-xs)] font-semibold text-[var(--color-accent)] hover:text-[var(--color-paper)] transition-colors duration-[var(--dur-short)]"
                  >
                    Get directions <span aria-hidden="true">→</span>
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="shrink-0 text-[var(--color-accent)]"
                />
                <a
                  href="tel:+447981084434"
                  className="hover:text-[var(--color-accent)] transition-colors duration-[var(--dur-short)]"
                >
                  07981 084434
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-[var(--color-accent)]"
                />
                <a
                  href="mailto:hello@medaestheticsbristol.co.uk"
                  className="break-all hover:text-[var(--color-accent)] transition-colors duration-[var(--dur-short)]"
                >
                  hello@medaestheticsbristol.co.uk
                </a>
              </li>
            </ul>
          </div>

          {/* Opening hours */}
          <div>
            <h3 className="mb-[var(--space-lg)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-paper)]/50">
              Opening hours
            </h3>
            <ul className="divide-y divide-[var(--color-paper)]/10 text-[var(--text-sm)] text-[var(--color-paper)]/60">
              {openingHours.map((slot) => (
                <li
                  key={slot.day}
                  className="flex justify-between gap-4 py-[var(--space-2xs)] first:pt-0 last:pb-0"
                >
                  <span>{slot.day}</span>
                  <span className="text-right">{slot.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer & legal */}
      <div className="border-t border-[var(--color-paper)]/10">
        <div className="max-w-[var(--page-max)] mx-auto px-[var(--page-gutter)] py-[var(--space-xl)]">
          <div className="rounded-[var(--radius-md)] border border-[var(--color-paper)]/10 bg-[var(--color-paper)]/5 p-[var(--space-lg)] mb-[var(--space-xl)]">
            <p className="mb-[var(--space-sm)] text-[var(--text-xs)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Clinical disclaimer
            </p>
            <p className="text-[var(--text-sm)] italic leading-[1.7] text-[var(--color-paper)]/60">
              All aesthetic treatments are medical procedures and carry
              potential risks. Results may vary from person to person. A full
              consultation is mandatory prior to any treatment to assess
              suitability and discuss potential side effects. MedAesthetics
              Bristol is a medical-led clinic. We do not offer treatments to
              anyone under the age of 18.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[var(--text-xs)] uppercase tracking-[0.18em] text-[var(--color-paper)]/40">
            <p>
              &copy; {currentYear} MedAesthetics Bristol. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-[var(--space-lg)] gap-y-2">
              <a
                href="/privacy"
                className="hover:text-[var(--color-accent)] transition-colors duration-[var(--dur-short)]"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-[var(--color-accent)] transition-colors duration-[var(--dur-short)]"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="hover:text-[var(--color-accent)] transition-colors duration-[var(--dur-short)]"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
