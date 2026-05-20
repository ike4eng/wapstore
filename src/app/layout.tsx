import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Wapstore — WhatsApp Store Builder",
    template: "%s — Wapstore"
  },
  description:
    "Build a lightweight WhatsApp-powered mini store. Upload products, share your link, and take orders on WhatsApp.",
  metadataBase: process.env.NEXT_PUBLIC_APP_URL
    ? new URL(process.env.NEXT_PUBLIC_APP_URL)
    : undefined,
  openGraph: {
    title: "Wapstore — WhatsApp Store Builder",
    description:
      "A modern, mobile-first mini online store builder that sells through WhatsApp.",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}

