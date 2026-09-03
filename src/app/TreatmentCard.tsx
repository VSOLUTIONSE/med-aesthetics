import { ArrowRight, Clock } from "lucide-react";
import type React from "react";

interface TreatmentCardProps {
  title: string;
  description: string;
  priceFrom: string;
  duration: string;
  imageUrl?: string;
  href?: string;
  ctaLabel?: string;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({
  title,
  description,
  priceFrom,
  duration,
  imageUrl = "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
  href,
  ctaLabel = "Learn more",
}) => {
  return (
    <div className="group bg-[var(--color-paper)] border border-[var(--color-rule)] hover:border-[var(--color-accent)]/40 transition-all duration-[var(--dur-long)] overflow-hidden flex flex-col h-full rounded-[var(--radius-lg)]">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {/* biome-ignore lint/performance/noImgElement: external Unsplash placeholder imagery */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-[var(--space-lg)] flex flex-col flex-grow">
        <h3 className="font-[var(--font-display)] text-[var(--text-xl)] font-semibold text-[var(--color-ink)] tracking-[-0.02em] leading-tight group-hover:text-[var(--color-accent-deep)] transition-colors duration-[var(--dur-short)]">
          {title}
        </h3>

        <p className="mt-[var(--space-sm)] text-[var(--text-sm)] text-[var(--color-ink-2)] leading-relaxed flex-grow">
          {description}
        </p>

        {/* Details */}
        <div className="flex items-center justify-between py-[var(--space-md)] border-t border-[var(--color-rule)] mt-[var(--space-md)]">
          <div className="flex items-center gap-1.5 text-[var(--text-xs)] text-[var(--color-muted)] font-medium">
            <Clock size={13} className="text-[var(--color-accent-deep)]" />
            <span>{duration}</span>
          </div>
          <div className="text-right">
            <span className="block text-[9px] uppercase tracking-wider text-[var(--color-muted)] mb-0.5">
              From
            </span>
            <span className="text-[var(--color-ink)] font-semibold text-sm">
              {priceFrom}
            </span>
          </div>
        </div>

        {href ? (
          <a
            href={href}
            {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-[var(--color-ink)] text-[var(--color-ink)] text-[var(--text-sm)] font-medium rounded-full hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-all duration-[var(--dur-short)]"
          >
            {ctaLabel}
            <ArrowRight
              size={14}
              className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-[var(--dur-short)]"
            />
          </a>
        ) : (
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-[var(--color-ink)] text-[var(--color-ink)] text-[var(--text-sm)] font-medium rounded-full hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-all duration-[var(--dur-short)]"
          >
            {ctaLabel}
            <ArrowRight
              size={14}
              className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-[var(--dur-short)]"
            />
          </button>
        )}
      </div>
    </div>
  );
};
