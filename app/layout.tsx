import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZZAP!64 — Cover Collection",
  description:
    "A visual archive of all Zzap!64 magazine covers — the legendary Commodore 64 games magazine.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
