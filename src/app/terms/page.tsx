import type { Metadata } from "next";
import { LegalArticle, type LegalSection } from "../LegalArticle";

export const metadata: Metadata = {
  title: "Terms of Service — MedAesthetics Bristol",
  description:
    "Plain-language terms for using the MedAesthetics Bristol website and booking consultations and treatments at the clinic.",
};

const sections: LegalSection[] = [
  {
    heading: "About these terms",
    paragraphs: [
      "These terms apply when you use our website or book an appointment with the clinic. They do not replace the personalised consent discussion that takes place before any treatment.",
    ],
  },
  {
    heading: "Eligibility",
    paragraphs: [
      "Consultations and treatments are available to people aged 18 and over. We do not offer aesthetic treatments to anyone under the age of 18.",
    ],
  },
  {
    heading: "Consultation comes first",
    paragraphs: [
      "Every treatment begins with a consultation. Nothing is carried out without your informed consent, and you are welcome to decline treatment at any point — including on the day.",
    ],
  },
  {
    heading: "Bookings & cancellations",
    bullets: [
      "Appointments are confirmed once booked; some appointments may require a deposit",
      "We ask for 48 hours' notice to cancel or move an appointment",
      "Deposits may be retained for late cancellations or non-attendance",
    ],
  },
  {
    heading: "Pricing",
    paragraphs: [
      "Prices shown on this website are “from” guides. Your personal quotation is confirmed at consultation, before anything is booked or carried out.",
    ],
  },
  {
    heading: "Results & medical disclaimer",
    paragraphs: [
      "Aesthetic treatments are medical procedures. Results vary from person to person and cannot be guaranteed; the risks, benefits and aftercare are discussed at your consultation.",
      "This website and our assistant are for general information only. They are not a substitute for advice from your GP or treating clinician.",
    ],
  },
  {
    heading: "Liability",
    paragraphs: [
      "Nothing in these terms limits our responsibility for the clinical care we provide. Otherwise, our liability is limited to the extent permitted by English law.",
    ],
  },
  {
    heading: "Changes & contact",
    paragraphs: [
      "We may update these terms from time to time; the latest version always lives on this page. Questions are welcome at hello@medaestheticsbristol.co.uk or 0117 123 4567.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalArticle
      eyebrow="Terms of service"
      title="Clear terms, in plain language."
      updated="September 2026"
      intro="Short, honest terms for using our website and booking with the clinic — so you always know where you stand."
      sections={sections}
    />
  );
}
