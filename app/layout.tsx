import type { Metadata } from "next";
import "./globals.css";

// Host + subpath are read from env so the same code works for:
//   - local dev (both empty)
//   - GitHub Pages project page (host=https://turrican128.github.io, basePath=/Zzap64-Magazine-Cover-Collection)
//   - future custom domain (host=https://your-domain, basePath empty)
const SITE_HOST =
  process.env.NEXT_PUBLIC_SITE_HOST ?? "https://turrican128.github.io";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SITE_URL = `${SITE_HOST}${BASE_PATH}`;
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

const TITLE = "ZZAP!64 — Cover Collection";
const DESCRIPTION =
  "A visual archive of all 107 covers from Zzap!64, the legendary British Commodore 64 games magazine (1985 – 1994 + 2002 special).";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL || "http://localhost:3000"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "ZZAP!64 Cover Collection",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: OG_IMAGE,
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
    images: [OG_IMAGE],
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
