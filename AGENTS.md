# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Overview

MedAesthetics Bristol — a medspa website with an AI assistant (RAG chatbot) built on the AI SDK. Clients can chat about treatments/pricing and staff can upload PDF documents to train the assistant's knowledge base.

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build (Turbopack)
npm run lint     # Biome check
npm run format   # Biome format --write
```

## Agent Rules

- **NEVER run `npm run build`.** The user always runs builds themselves.
- **NEVER run `npx tsc --noEmit`** as a verification step either — it times out in this environment. Rely on careful code review instead; the user will build and report errors if any.
- Run `npm run lint` after edits when practical.
- Do not commit unless explicitly asked.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack), React 19, TypeScript 5
- **Styling:** Tailwind CSS v4 (CSS-first config via `globals.css`), shadcn/ui components on Radix primitives (`src/components/ui`)
- **AI:** Vercel AI SDK v7 (`ai`, `@ai-sdk/react`), Google model via `@ai-sdk/google`
- **Auth:** Clerk (`@clerk/nextjs`)
- **Database:** Neon serverless Postgres + Drizzle ORM
- **PDF processing:** `pdf-parse` + `@langchain/textsplitters`
- **Linting/formatting:** Biome
- **Icons:** lucide-react

## Structure

```
src/
  app/
    page.tsx            # Landing page
    Navbar.tsx          # Site navigation (client)
    Footer.tsx
    TreatmentCard.tsx
    MedspaAssistant.tsx # Floating AI chat widget (uses /api/chat)
    actions.ts          # Server actions (PDF upload)
    api/chat/           # Chat API route
    chat/page.tsx       # Full-page chatbot
    upload/page.tsx     # PDF knowledge-base upload UI
    sign-in/            # Clerk sign-in
  components/
    ai-elements/        # Conversation, Message, Response, PromptInput etc.
    ui/                 # shadcn/ui primitives
  lib/, hooks/, types/
design.md               # Locked design system (source of truth)
tokens.css              # Design tokens (--color-*, --font-*, --space-*, ...)
```

## Design System

**Read `design.md` before touching any UI.** The design system is locked:

- Palette: paper `oklch(97% 0.008 35)`, accent dusty rose `oklch(62% 0.14 5)`, dark ink `oklch(18% 0.010 30)`
- Typography: Manrope 700 display, Geist 400 body, Geist Mono mono
- All colors/fonts/spacing come from `tokens.css` custom properties used as Tailwind arbitrary values: `bg-[var(--color-paper)]`, `font-[var(--font-display)]`, etc.
- Do NOT use hardcoded hex colors or raw Tailwind palette classes (`bg-slate-500`) in app pages/components — use tokens.
- shadcn/ui variables are mapped to these tokens in `globals.css`.

## Conventions

- Server Components by default; add `"use client"` only where needed (interactivity, hooks).
- Use existing shadcn/ui components from `src/components/ui` rather than building new primitives.
- AI SDK v7 message shape: iterate `message.parts` (filter `type === "text"`), not `message.content`.
- Env vars live in `.env.local` (Clerk keys, Google AI key, Neon DB URL). Never commit or log them.
