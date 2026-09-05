# Design — MedAesthetics Bristol

A locked design system for this app. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

## Genre
modern-minimal

## Macrostructure family
- Marketing pages: Split Studio (alternating text + proof diptychs)
- App pages: single-column, centered, generous whitespace
- Content pages: long document, editorial

## Audience & vibe
- **Audience:** 25–40, mostly women, Instagram-native, research-led. They arrive
  having saved Reels and read Reddit threads — they want safety *and* polish,
  warmth *and* evidence. Copy stays calm and honest; the interface feels
  editorial and quietly premium, never clinical-cold, never beauty-influencer
  loud.
- **Vibe:** "cool clinical-luxe" — cool deep-ink navy leads, warm gold accents,
  powder-gold washes for section tints. Glass/soft-shadow treatments are
  welcome on marketing pages (hero panel, cards); keep motion restrained.

## Theme
Brand anchor: deep ink-navy (cool) · gold `#C8A45A` (warm).

- `--color-paper`       oklch(97% 0.010 90)
- `--color-paper-2`     oklch(94% 0.013 90)
- `--color-paper-3`     oklch(90% 0.018 90)
- `--color-ink`         oklch(26% 0.095 260)
- `--color-ink-2`       oklch(42% 0.045 250)
- `--color-rule`        oklch(86% 0.015 90)
- `--color-muted`       oklch(56% 0.03 250)
- `--color-accent`      oklch(80% 0.128 85)
- `--color-accent-soft` oklch(95% 0.03 85)
- `--color-accent-ink`  oklch(26% 0.075 256)
- `--color-accent-deep` oklch(45% 0.1 75)
- `--color-focus`       oklch(60% 0.12 85)
- `--color-primary`     = var(--color-ink) — deep ink action surface

### Semantic states
- `--color-danger` (muted brick) + `--color-danger-soft` (blush wash) — form
  validation, upload failures, tool-call errors. Use `--color-danger` for
  text/icon and the soft wash for error-panel backgrounds. Wired to the
  shadcn/ui `--destructive` variable.
- `--color-success` (muted pine) + `--color-success-soft` (mint wash) — successful
  uploads, completed tool calls. Quiet — never celebratory.

### Colour hierarchy
- **Navy leads.** Nav bar, all primary buttons on light surfaces, chat-widget
  chrome, footer, and dark sections are deep navy (`--color-primary`/`--color-ink`).
- **Gold accents.** Eyebrow labels, hairline dividers, underline decorations,
  icon chips, hover details — and it inverts to the *action* colour for CTAs
  that sit ON navy (nav pill, hero primary button, booking CTA).

### Accent discipline
- `--color-accent` (bright gold) — surfaces only: button fills, icon chips,
  hairline dividers, underlines, borders, and text/icons on dark ink.
- `--color-accent-soft` (powder-gold wash) — section tints, badges, soft chips,
  quiet hover washes. Replaces raw `paper-2` when a warm lift is wanted.
- `--color-accent-deep` (antique gold) — accent **text and icons on light
  backgrounds** (eyebrows, step numbers, hover states). Bright gold fails
  contrast on paper; never use it as small-text colour on light surfaces.

### Semantic states
- `--color-danger` (muted brick) + `--color-danger-soft` (blush wash) — form
  validation, upload failures, tool-call errors. Uses `--color-danger` for
  text/icon and the soft wash for error-panel backgrounds. Wired to the
  shadcn/ui `--destructive` variable.
- `--color-success` (muted pine) + `--color-success-soft` (mint wash) — successful
  uploads, completed tool calls. Quiet — never celebratory.

## Typography
- Display: Manrope, weight 800 (extrabold) for h1/h2/wordmark; 700 acceptable
  for card titles and long sub-heads. Style normal.
- Body:    Geist, weight 400
- Mono:    Geist Mono, weight 400
- Display tracking: -0.03em on display sizes, -0.02em on section headings
- Type scale anchor: --text-display = clamp(2.5rem, 5vw + 0.75rem, 4.5rem)

## Spacing
4-point named scale. The values are in `tokens.css`. Pages must use named
tokens (`var(--space-md)`), never raw values.

## Motion
- Easings: cubic-bezier(0.16, 1, 0.3, 1) named `--ease-out`, etc.
- Reveal pattern: none (page is composed, not animated)
- Reduced-motion fallback: opacity-only, <= 150 ms.

## Microinteractions stance
- Silent success: no celebratory toasts
- Hover delay 800 ms on tooltips, 0 ms on focus
- Button hover: translateY(-1.5px) + background-fade, 200ms --ease-out
- Focus ring: instant, 2px, >= 3:1 contrast

## CTA voice
- Primary CTA on light: filled pill, navy background (`--color-primary`), paper text
- Primary CTA on navy/dark: filled pill, gold background, navy ink text
- Secondary CTA on light: outlined pill, ink border, ink text
- Secondary CTA on dark: outlined paper border, paper text
- Labels: "Book appointment" / "Explore treatments"

## Imagery
- Warm, natural-light photography of the clinic, treatments, and real moments
  of care. No cold blue clinical stock, no over-retouched faces.
- Placeholder source: Unsplash direct URLs (`images.unsplash.com/photo-…`).
- Every image carries meaningful alt text; below-fold images load lazy.
- Dark sections may use a photo under a deep-navy overlay (ink ≥ 80% opacity).

## Per-page allowances
- Marketing pages MAY use enrichment (Tier-A CSS art, Tier-B SVG, etc.).
- App pages MUST NOT use enrichment — function carries the page.
- Content pages: typography only.

## What pages MUST share
- The wordmark / logotype.
- The accent colour and its placement (<= 5% per viewport).
- The display + body fonts.
- The CTA voice (button shape, border-radius, padding rhythm).
- Section heading rhythm (eyebrow + heading pattern).

## What pages MAY differ on
- Macrostructure within the page-type family.
- Hero archetype (within the family's allowance).
- Enrichment — only on marketing pages, only Tier-A or Tier-B.

## Exports

### tokens.css
```css
:root {
  --color-paper:      oklch(97% 0.010 90);
  --color-paper-2:    oklch(94% 0.013 90);
  --color-paper-3:    oklch(90% 0.018 90);
  --color-ink:        oklch(26% 0.095 260);
  --color-ink-2:      oklch(42% 0.045 250);
  --color-rule:       oklch(86% 0.015 90);
  --color-muted:      oklch(56% 0.03 250);
  --color-accent:     oklch(80% 0.128 85);
  --color-accent-soft: oklch(95% 0.03 85);
  --color-accent-ink: oklch(26% 0.075 256);
  --color-accent-deep: oklch(45% 0.1 75);
  --color-focus: oklch(60% 0.12 85);
  --color-primary: var(--color-ink);

  --font-display: "Manrope", ui-sans-serif, system-ui, sans-serif;
  --font-body:    "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono:    "Geist Mono", ui-monospace, monospace;

  --space-3xs: 0.125rem;  --space-2xs: 0.25rem;  --space-xs:  0.5rem;
  --space-sm:  0.75rem;   --space-md:  1rem;      --space-lg:  1.5rem;
  --space-xl:  2.5rem;    --space-2xl: 4rem;      --space-3xl: 6rem;
  --space-4xl: 9rem;

  --text-xs:   0.64rem;
  --text-sm:   0.8rem;
  --text-base: 1rem;
  --text-md:   1.25rem;
  --text-lg:   1.5625rem;
  --text-xl:   1.9531rem;
  --text-2xl:  2.4414rem;
  --text-3xl:  3.0518rem;
  --text-4xl:  3.8147rem;
  --text-display: clamp(2.5rem, 5vw + 0.75rem, 4.5rem);

  --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in:      cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out:  cubic-bezier(0.65, 0, 0.35, 1);
  --dur-micro: 120ms;
  --dur-short: 220ms;
  --dur-long:  420ms;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 9999px;
}
```

### shadcn/ui CSS variables
```css
:root {
  --background:        oklch(97% 0.010 90);
  --foreground:        oklch(32% 0.085 256);
  --primary:           var(--color-primary);
  --primary-foreground: oklch(97% 0.010 90);
  --muted:             oklch(94% 0.013 90);
  --muted-foreground:  oklch(56% 0.03 256);
  --border:            oklch(86% 0.015 90);
  --input:             oklch(86% 0.015 90);
  --ring:              oklch(60% 0.12 85);
  --radius:            8px;
}
```
