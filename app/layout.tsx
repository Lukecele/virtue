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

const title = "Virtue | Rule-based conversations & crypto calculations";
const description =
  "Rule-based conversational engine and crypto calculator with live market data. Built by Luca Celebrano (@Lukecele).";

export const metadata: Metadata = {
  metadataBase: new URL("https://virtue-ecru.vercel.app"),
  title,
  description,
  authors: [{ name: "Luca Celebrano", url: "https://github.com/Lukecele" }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Virtue",
    title,
    description,
    images: [{
      url: "/social-card.png",
      width: 1280,
      height: 640,
      alt: "Virtue — Rule-based conversations & crypto calculations, by Lukecele",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{
      url: "/social-card.png",
      alt: "Virtue — Rule-based conversations & crypto calculations, by Lukecele",
    }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
