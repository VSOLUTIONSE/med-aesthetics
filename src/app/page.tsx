"use client";

import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Check, MessageCircle, Play, Sparkles } from "lucide-react";
import { NavBar } from "./Navbar";
import { Footer } from "./Footer";
import { MedspaAssistant } from "./MedspaAssistant";
import { TrustReassurance } from "./TrustReassurance";
import { TreatmentCard } from "./TreatmentCard";
const principles = [
  {
    number: "01",
    title: "Listen first",
    text: "We take time to understand what you want to change, and what you want to keep entirely your own.",
  },
  {
    number: "02",
    title: "Recommend carefully",
    text: "Thoughtful, evidence-led advice — never a sales pitch and never more treatment than you need.",
  },
  {
    number: "03",
    title: "Keep it personal",
    text: "Your face, your pace, your plan. Every recommendation is shaped around your features and your life.",
  },
  {
    number: "04",
    title: "Support your decision",
    text: "You will leave with clear information and space to decide. There is no pressure to proceed.",
  },
];
const steps = [
  {
    number: "1",
    title: "Tell us",
    text: "Share what has been on your mind using our simple booking form or by getting in touch.",
  },
  {
    number: "2",
    title: "Have a proper conversation",
    text: "Meet with an experienced practitioner for a calm, unrushed consultation tailored to you.",
  },
  {
    number: "3",
    title: "Choose your next step",
    text: "If treatment feels right, we will make a considered plan together. If not, that is okay too.",
  },
];
const reassurance = [
  "Experienced professionals",
  "Personalised consultations",
  "Clear treatment information",
  "Patient-led decision-making",
  "FaceConsent booking",
];
export default function Home() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setVideoPlaying(true); } else { v.pause(); setVideoPlaying(false); }
  };

  // Pause video when clicking anywhere on the page
  useEffect(() => {
    const handleBodyClick = (e: MouseEvent) => {
      const v = videoRef.current;
      if (!v || v.paused) return;
      const target = e.target as HTMLElement;
      // Don't pause if clicking the play button or the video itself
      if (target.closest("[data-play-btn]")) return;
      if (target === v || v.contains(target)) return;
      v.pause();
      setVideoPlaying(false);
    };
    document.addEventListener("click", handleBodyClick);
    return () => document.removeEventListener("click", handleBodyClick);
  }, []);
  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#1E2833]">
      <div className="bg-[#082C52] px-4 py-2.5 text-center text-[11px] font-medium tracking-[0.12em] text-[#C8A45A] sm:text-xs">
        <span>Now welcoming new consultation appointments in Bristol. </span>
        <a
          href="#booking"
          className="underline underline-offset-4 hover:text-white"
        >
          Book a consultation
        </a>
      </div>
      <NavBar />

      <main>
        <section
          className="grid min-h-[320px] lg:min-h-[380px] lg:grid-cols-2 lg:gap-6 lg:px-6"
          aria-labelledby="hero-heading"
        >
          <div className="flex items-center px-6 py-14 sm:px-12 lg:px-[10vw] lg:py-24">
            <div className="max-w-xl">
              <div className="mb-7 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
                <span>Bespoke aesthetics in Bristol</span>
              </div>
              <h1
                id="hero-heading"
                className="max-w-[620px] text-4xl leading-[0.95] tracking-[-0.03em] text-[#0E3F73] sm:text-5xl lg:text-7xl"
              >
                Clinical expertise.{" "}
                <em className="font-normal">Beautiful results.</em>
              </h1>
              <p className="mt-8 max-w-lg text-base leading-[1.8] text-[#1E2833]/85">
                MedAesthetics Bristol offers advanced facial aesthetic and skin
                rejuvenation treatments in a calm, professional setting. Every
                treatment journey begins with understanding your goals, your
                features, and what feels right for you.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#booking"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-[#0E3F73] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#082C52] rounded-full"
                >
                  Book a consultation <ArrowRight size={16} />
                </a>
                <a
                  href="#treatments"
                  className="inline-flex items-center justify-center whitespace-nowrap border border-[#0E3F73] px-5 py-2.5 text-sm font-medium text-[#0E3F73] transition hover:bg-[#0E3F73] hover:text-white rounded-full"
                >
                  Explore treatments
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-medium uppercase tracking-[0.13em] text-[#0E3F73]/70">
                <span>✦ Personalised consultations</span>
                <span>✦ Safety-led care</span>
                <span>✦ Experienced professionals</span>
              </div>
            </div>
          </div>
          <div data-hero-video className="relative mt-6 flex min-h-[220px] items-center justify-center overflow-hidden rounded-2xl bg-[#0E3F73] sm:rounded-3xl lg:mt-12 lg:min-h-[280px]">
            <video
              ref={videoRef}
              src="https://zecdvcub3srmcwgz.public.blob.vercel-storage.com/hero-intro.mp4"
              loop
              playsInline
              onClick={toggleVideo}
              className="absolute inset-0 h-full w-full cursor-pointer object-cover"
            />
            <div data-play-overlay className={`absolute inset-0 bg-gradient-to-t from-[#0E3F73]/60 via-transparent to-[#0E3F73]/20 transition-opacity duration-500 ${videoPlaying ? "opacity-0 pointer-events-none" : ""}`} />
            <button
              data-play-btn
              type="button"
              onClick={toggleVideo}
              className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#0E3F73] shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-2xl sm:h-14 sm:w-14 lg:h-16 lg:w-16 ${videoPlaying ? "opacity-0 pointer-events-none" : ""}`}
              aria-label="Play video"
            >
              <Play size={22} className="ml-0.5" fill="currentColor" />
            </button>
            <div className="absolute bottom-4 left-4 z-10 border-l border-[#F7F2E8]/80 pl-3 text-[9px] uppercase tracking-[0.2em] text-[#F7F2E8] sm:bottom-6 sm:left-6 sm:pl-4 sm:text-[10px]">
              Quietly considered care
            </div>
          </div>
        </section>

        <section
          className="px-6 py-24 text-center sm:px-10 lg:py-36"
          aria-labelledby="conversation-heading"
        >
          <div className="mx-auto mb-12 h-px w-20 bg-[#C8A45A]" />
          <h2
            id="conversation-heading"
            className="mx-auto max-w-3xl text-4xl leading-tight tracking-[-0.02em] sm:text-5xl"
          >
            You do not need to know the treatment name before you get in touch.
          </h2>
          <p className="mx-auto mt-7 max-w-[500px] text-base leading-8 text-[#1E2833]/75">
            The best place to begin is with an honest conversation about what
            you see, how you feel, and what you would like to explore. We will
            help you find the language — and the options — that feel right.
          </p>
          <a
            href="#consultation"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#0E3F73] underline decoration-[#C8A45A] decoration-2 underline-offset-8 hover:text-[#C8A45A]"
          >
            Learn about your consultation{" "}
            <ArrowRight size={16} className="text-[#C8A45A]" />
          </a>
        </section>

        <section
          id="treatments"
          className="bg-[#EAF1F7] px-6 py-24 sm:px-10 lg:px-[8vw] lg:py-32"
          aria-labelledby="treatments-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#C8A45A]">
                  Ways we can help
                </p>
                <h2
                  id="treatments-heading"
                  className="max-w-2xl text-4xl leading-tight sm:text-5xl"
                >
                  Care that starts with what matters to you.
                </h2>
              </div>
              <a
                href="#consultation"
                className="text-sm font-medium text-[#0E3F73] underline decoration-[#C8A45A] underline-offset-4"
              >
                View all treatments <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <TreatmentCard
                title="Anti-wrinkle injections"
                description="Subtle, precise treatment to soften the appearance of expression lines while keeping you looking like yourself."
                priceFrom="£195"
                duration="30–45 mins"
                imageUrl="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1000&auto=format&fit=crop"
              />
              <TreatmentCard
                title="Dermal fillers"
                description="Carefully considered volume and definition to restore balance, structure and a refreshed, natural look."
                priceFrom="£250"
                duration="45–60 mins"
                imageUrl="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop"
              />
              <TreatmentCard
                title="Skin rejuvenation"
                description="Evidence-led treatments that support healthier, brighter skin and a complexion that feels more confident."
                priceFrom="£150"
                duration="30–60 mins"
                imageUrl="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1000&auto=format&fit=crop"
              />
            </div>
          </div>
        </section>

        <section
          className="bg-[#0E3F73] px-6 py-24 text-white sm:px-10 lg:px-[8vw] lg:py-32"
          aria-labelledby="approach-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#C8A45A]">
                The MedAesthetics approach
              </p>
              <h2
                id="approach-heading"
                className="text-4xl leading-tight text-white sm:text-5xl"
              >
                A considered approach to facial aesthetics.
              </h2>
              <p className="mt-6 leading-7 text-white/70">
                Good aesthetic care is not about chasing perfection. It is about
                expert guidance, clear choices and results that still feel like
                you.
              </p>
            </div>
            <div className="mt-16 grid gap-10 border-t border-white/20 pt-10 sm:grid-cols-2 lg:grid-cols-4">
              {principles.map((principle) => (
                <article key={principle.number}>
                  <span className="text-sm text-[#C8A45A]">
                    {principle.number}
                  </span>
                  <h3 className="mt-5 text-2xl text-[#C8A45A]">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/75">
                    {principle.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="consultation"
          className="px-6 py-24 sm:px-10 lg:px-[8vw] lg:py-32"
          aria-labelledby="steps-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#C8A45A]">
                Your next step
              </p>
              <h2
                id="steps-heading"
                className="text-4xl leading-tight sm:text-5xl"
              >
                From your first question to your consultation.
              </h2>
            </div>
            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="relative border-t border-[#C8A45A] pt-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C8A45A] text-sm font-medium text-white">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-2xl">{step.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-7 text-[#1E2833]/75">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-14 text-center">
              <a
                href="#booking"
                className="inline-flex items-center gap-3 bg-[#0E3F73] px-8 py-4 text-sm font-medium text-white hover:bg-[#082C52] rounded-full"
              >
                Book your consultation <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section
          className="bg-[#EAF1F7] px-6 py-20 text-center sm:px-10 lg:py-28"
          aria-labelledby="reassurance-heading"
        >
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#C8A45A]">
              Reassurance, at every stage
            </p>
            <h2 id="reassurance-heading" className="text-4xl sm:text-5xl">
              You deserve clear answers before you decide.
            </h2>
            <p className="mx-auto mt-6 max-w-xl leading-7 text-[#1E2833]/75">
              Our role is to give you the context, care and confidence to make a
              decision that feels entirely your own.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {reassurance.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 border border-[#C8A45A]/60 bg-[#F7F2E8] px-4 py-3 text-xs font-medium text-[#0E3F73] rounded-full"
                >
                  <Check size={14} className="text-[#C8A45A]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section
          className="px-6 py-24 sm:px-10 lg:px-[8vw] lg:py-32"
          aria-labelledby="assistant-heading"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-12 border-l-4 border-[#C8A45A] bg-white/50 px-7 py-10 sm:px-12 lg:grid-cols-2 lg:gap-20 lg:px-16 lg:py-16">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#C8A45A]">
                Here to help
              </p>
              <h2
                id="assistant-heading"
                className="max-w-md text-4xl leading-tight sm:text-5xl"
              >
                Have a question before you book?
              </h2>
              <p className="mt-6 max-w-md leading-7 text-[#1E2833]/75">
                Our Medspa Assistant can help you explore treatments, understand
                the consultation process, or simply point you in the right
                direction.
              </p>
              <button
                type="button"
                className="mt-8 inline-flex items-center gap-3 bg-[#C8A45A] px-6 py-3.5 text-sm font-medium text-white hover:bg-[#b18f4c] rounded-full"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-medspa-assistant"))
                }
              >
                Ask the Medspa Assistant <MessageCircle size={16} />
              </button>
            </div>
            <div className="max-w-md rounded-2xl border border-[#D8D2C8] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 border-b border-[#EAF1F7] pb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C8A45A] text-white">
                  <Sparkles size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0E3F73]">
                    MedAesthetics Assistant
                  </p>
                  <p className="text-xs text-[#1E2833]/60">
                    Here to answer your questions
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-xs rounded-tl-none rounded-lg bg-[#EAF1F7] p-4 text-sm leading-6 text-[#0E3F73]">
                Hi, I&apos;m the MedAesthetics Assistant. What would you like to
                know?
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="border border-[#D8D2C8] px-3 py-2 text-xs text-[#0E3F73] hover:border-[#C8A45A] rounded-full"
                >
                  Treatments
                </button>
                <button
                  type="button"
                  className="border border-[#D8D2C8] px-3 py-2 text-xs text-[#0E3F73] hover:border-[#C8A45A] rounded-full"
                >
                  The consultation
                </button>
                <button
                  type="button"
                  className="border border-[#D8D2C8] px-3 py-2 text-xs text-[#0E3F73] hover:border-[#C8A45A] rounded-full"
                >
                  Pricing
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="booking"
          className="bg-[#082C52] px-6 py-24 text-center text-white sm:px-10 lg:py-32"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#C8A45A]">
            Begin somewhere simple
          </p>
          <h2 className="text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Start with a conversation.
          </h2>
          <p className="mx-auto mt-6 max-w-lg leading-7 text-white/75">
            Bring your questions, your hopes, or simply your curiosity. We will
            meet you there.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#consultation"
              className="bg-[#C8A45A] px-7 py-3.5 text-sm font-medium text-white hover:bg-[#b18f4c] rounded-full"
            >
              Book a consultation
            </a>
            <a
              href="#footer"
              className="border border-white/70 px-7 py-3.5 text-sm font-medium text-white hover:bg-white hover:text-[#082C52] rounded-full"
            >
              Contact the clinic
            </a>
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
