"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import React from "react";

export const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: "Treatments", href: "/treatments" },
    { name: "Consultation", href: "/#consultation" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-paper)]/10 bg-[var(--color-primary)]">
      <div className="max-w-[var(--page-max)] mx-auto px-[var(--page-gutter)]">
        <div className="flex justify-between items-center h-16">
          {/* Wordmark — hard left */}
          <a href="/" className="flex items-center gap-3">
            <Image
              src="/img/logo.jpg"
              alt="MedAesthetics Bristol"
              width={32}
              height={32}
              className="h-9 w-9 rounded-full border-2 border-[var(--color-paper)]/30 object-cover"
              priority
            />
            <span className="font-[var(--font-display)] text-[var(--text-lg)] font-semibold tracking-[-0.02em] text-[var(--color-paper)]">
              MedAesthetics
            </span>
          </a>

          {/* Desktop nav links — centre / left-aligned next to wordmark */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-[var(--color-paper)]/80 hover:text-[var(--color-paper)] transition-colors rounded-lg hover:bg-[var(--color-paper)]/10 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-2"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA — hard right */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="https://facesconsent.com/v1/bookings/aisha-sahi?clinicSlug=medaesthetics-bristol-90bd55420410"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-accent-ink)] px-5 py-2 text-sm font-semibold rounded-full transition-all duration-[var(--dur-short)] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-2"
            >
              Book appointment
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--color-paper)] hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)] focus-visible:outline-offset-2 transition-colors p-2"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[var(--color-primary)] border-t border-[var(--color-paper)]/10">
          <div className="px-[var(--page-gutter)] py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-sm font-medium text-[var(--color-paper)]/90 hover:text-[var(--color-accent)] transition-colors rounded-lg hover:bg-[var(--color-paper)]/5"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3">
              <a
                href="https://facesconsent.com/v1/bookings/aisha-sahi?clinicSlug=medaesthetics-bristol-90bd55420410"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[var(--color-accent)] text-[var(--color-accent-ink)] px-5 py-3 rounded-full text-sm font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Book appointment
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
