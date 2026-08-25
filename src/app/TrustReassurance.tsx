import { Award, HeartPulse, ShieldCheck, UserCheck } from "lucide-react";
import type React from "react";

export const TrustReassurance: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Medical-Led Care",
      description:
        "Our clinic is led by fully qualified and insured medical professionals with a commitment to patient safety and ethical practice.",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Natural Results",
      description:
        "We believe in the 'untouched' look. Our goal is to enhance your natural beauty, never to overfill or dramatically change your features.",
    },
    {
      icon: <HeartPulse className="w-5 h-5" />,
      title: "Personalized Approach",
      description:
        "No two faces are the same. Every treatment plan is bespoke, starting with a comprehensive 45-minute consultation.",
    },
    {
      icon: <UserCheck className="w-5 h-5" />,
      title: "CQC Standards",
      description:
        "We operate with the highest clinical standards of hygiene and patient care, using only premium, CE-marked products.",
    },
  ];

  return (
    <div className="bg-[var(--color-paper-2)] py-[var(--space-3xl)] px-[var(--page-gutter)]">
      <div className="max-w-[var(--page-max)] mx-auto">
        <div className="text-center mb-[var(--space-2xl)]">
          <span className="text-[var(--color-accent-deep)] text-[var(--text-xs)] font-semibold tracking-[0.18em] uppercase mb-3 block">
            Your safety is our priority
          </span>
          <h2 className="font-[var(--font-display)] text-[var(--text-3xl)] font-bold text-[var(--color-ink)] tracking-[-0.02em]">
            Why patients trust MedAesthetics Bristol
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-[var(--color-paper)] p-[var(--space-lg)] rounded-[var(--radius-lg)] border border-[var(--color-rule)] hover:border-[var(--color-accent)]/30 transition-colors duration-[var(--dur-short)]"
            >
              <div className="text-[var(--color-accent-deep)] mb-[var(--space-md)] inline-block p-2.5 bg-[var(--color-accent)]/15 rounded-[var(--radius-md)]">
                {pillar.icon}
              </div>
              <h3 className="font-[var(--font-display)] text-[var(--text-lg)] font-semibold text-[var(--color-ink)] tracking-[-0.01em] mb-[var(--space-sm)]">
                {pillar.title}
              </h3>
              <p className="text-[var(--text-sm)] text-[var(--color-ink-2)] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
