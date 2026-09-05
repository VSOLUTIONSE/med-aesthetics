import type { Metadata } from "next";
import { LegalArticle, type LegalSection } from "../LegalArticle";

export const metadata: Metadata = {
  title: "Cookie Policy — MedAesthetics Bristol",
  description:
    "The cookies the MedAesthetics Bristol website uses, why we use them, and how to control them in your browser.",
};

const sections: LegalSection[] = [
  {
    heading: "What cookies are",
    paragraphs: [
      "Cookies are small files placed on your device when you visit a website. They help the site work properly, remember preferences and understand how it is used.",
    ],
  },
  {
    heading: "What we use",
    bullets: [
      "Strictly necessary — keep the website secure and working as expected",
      "Authentication — for clinic staff tools, our sign-in provider uses cookies to keep staff signed in securely",
      "Analytics — only if enabled, anonymous usage statistics that help us improve the site",
    ],
  },
  {
    heading: "Third-party cookies",
    paragraphs: [
      "Some functionality is provided by trusted third parties — our authentication and hosting providers, and the service behind the AI assistant. These services may set their own strictly necessary cookies when they are used.",
    ],
  },
  {
    heading: "Managing cookies",
    paragraphs: [
      "You can control or delete cookies through your browser settings at any time. Blocking strictly necessary cookies may stop parts of the site — such as staff sign-in — from working.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this policy as the website changes. The current version is always published on this page.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about cookies or privacy? Email hello@medaestheticsbristol.co.uk or call 07981 084434.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <LegalArticle
      eyebrow="Cookie policy"
      title="Cookies, explained simply."
      updated="September 2026"
      intro="A short, honest explanation of the cookies this website uses — and the choices you have."
      sections={sections}
    />
  );
}
