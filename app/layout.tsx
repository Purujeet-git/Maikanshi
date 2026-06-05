import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "maikanshi | Natural Beauty from Sake Treasures",
  description: "maikanshi is a gentle connection between hands and nature. Discover our vegan-certified, rice-enriched hand creams and cuticle oils born from a 130-year-old Japanese sake brewery.",
  keywords: ["skincare", "vegan skincare", "Japanese sake brewery", "hand cream", "cuticle oil", "natural beauty", "rice extract skincare", "Nihonsakari"],
  authors: [{ name: "maikanshi" }],
  openGraph: {
    title: "maikanshi | Natural Beauty from Sake Treasures",
    description: "Discover vegan-certified, rice-enriched hand creams and cuticle oils born from a 130-year-old Japanese sake brewery.",
    url: "https://maikanshi.com",
    siteName: "maikanshi",
    images: [
      {
        url: "/cream.png",
        width: 800,
        height: 600,
        alt: "maikanshi rice-enriched hand cream",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "maikanshi | Natural Beauty from Sake Treasures",
    description: "Discover vegan-certified, rice-enriched skincare born from a 130-year-old Japanese sake brewery.",
    images: ["/cream.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
