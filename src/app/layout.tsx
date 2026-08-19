import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DevToolbar } from "./DevToolbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedAesthetics Bristol — Facial Aesthetics & Skin Rejuvenation",
  description:
    "Medical-led facial aesthetics and skin rejuvenation in the heart of Bristol. Personalised consultations, safety-led care, experienced professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <DevToolbar />
      </body>
    </html>
  );
}

