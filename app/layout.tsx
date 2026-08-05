import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sebastian Obert | Portfolio",
  description: "Portfolio of Sebastian Obert - Informatics student at Multimedia Nusantara University. Specialized in cross-platform development with a user-centric design approach.",
  keywords: ["Sebastian Obert", "portfolio", "web developer", "mobile developer", "Next.js", "React", "TypeScript", "Kotlin", "UMN", "Informatics"],
  authors: [{ name: "Sebastian Obert" }],
  creator: "Sebastian Obert",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sebastianobert.site",
    siteName: "Sebastian Obert Portfolio",
    title: "Sebastian Obert | Portfolio",
    description: "Portfolio of Sebastian Obert - Informatics student at Multimedia Nusantara University. Specialized in cross-platform development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sebastian Obert Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastian Obert | Portfolio",
    description: "Portfolio of Sebastian Obert - Informatics student at Multimedia Nusantara University.",
    images: ["/og-image.png"],
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
    <html lang="en">
      <head>
        <link rel="canonical" href="https://sebastianobert.site" />
      </head>
      <body className={inter.className}><Providers>{children}</Providers></body>
    </html>
  );
}
