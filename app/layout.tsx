import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://zzap64-magazine-cover-collection.vercel.app";
const TITLE = "ZZAP!64 — Cover Collection";
const DESCRIPTION =
  "A visual archive of all 107 covers from Zzap!64, the legendary British Commodore 64 games magazine (1985 – 1994 + 2002 special).";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "ZZAP!64 Cover Collection",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZZAP!64 Cover Collection — 107 issues, 1985 to 2002",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&family=Secular+One&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
