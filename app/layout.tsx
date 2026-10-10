import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#f0b90b",
  width: "device-width",
  initialScale: 1,
};

const title = "Virtue | Rule-based conversations & crypto calculations";
const description =
  "Rule-based conversational engine and crypto calculator with live market data. Built by Luca Celebrano (@Lukecele).";

export const metadata: Metadata = {
  metadataBase: new URL("https://virtue-ecru.vercel.app"),
  title,
  description,
  authors: [{ name: "Luca Celebrano", url: "https://github.com/Lukecele" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Virtue",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f0b90b" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
