import type { Metadata } from "next";
import { LegalArticle, type LegalSection } from "../LegalArticle";

export const metadata: Metadata = {
  title: "Privacy Policy — MedAesthetics Bristol",
  description:
    "How MedAesthetics Bristol collects, uses and protects your information, including enquiries, bookings and the on-site AI assistant.",
};

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "MedAesthetics Bristol is a medical-led facial aesthetics clinic at 18 Berkeley Square, Bristol, BS8 1HB. This policy explains how we handle information through our website, our booking process and the clinic itself.",
    ],
  },
  {
    heading: "What we collect",
    bullets: [
      "Contact details you give us — name, email address and phone number — when you enquire or book",
      "Health information you share during a consultation, kept as part of your clinical record",
      "Messages you send us, including through the on-site assistant",
      "Basic, anonymous usage data about how the website is used",
    ],
  },
  {
    heading: "How we use it",
    bullets: [
      "To answer enquiries and arrange appointments",
      "To plan and provide safe, appropriate treatment",
      "To keep the clinical records we are required to keep",
      "To understand and improve the website and the assistant",
    ],
  },
  {
    heading: "The AI assistant",
    paragraphs: [
      "Our on-site assistant answers general questions about treatments, pricing and booking. Your questions are processed to generate helpful answers.",
      "Please do not share sensitive medical details in chat. A conversation with the assistant is not a medical consultation and never replaces one.",
    ],
  },
  {
    heading: "Our legal basis",
    paragraphs: [
      "We rely on your consent where you have given it, on the performance of a contract for bookings, on our legal obligations for clinical records, and on our legitimate interests in keeping this website working well.",
    ],
  },
  {
    heading: "Sharing your information",
    paragraphs: [
      "We never sell your information. It is shared only with the practitioners caring for you and with carefully chosen providers — booking, hosting, messaging and AI services — who process it on our behalf under agreement, or where the law requires it.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "Clinical records are kept in line with regulatory guidance for aesthetic practice. Enquiry and website data are kept only as long as needed for the purpose they were collected.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "Under UK data protection law you can ask to access, correct or erase your information, restrict or object to how it is used, and withdraw consent at any time. You can also complain to the Information Commissioner's Office (ICO).",
    ],
  },
  {
    heading: "Get in touch",
    paragraphs: [
      "For any question about your privacy, email hello@medaestheticsbristol.co.uk or call 0117 123 4567.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalArticle
      eyebrow="Privacy policy"
      title="Your privacy, handled with care."
      updated="September 2026"
      intro="We handle your information the way we would want ours handled: carefully, transparently, and only for as long as it serves you."
      sections={sections}
    />
  );
}
