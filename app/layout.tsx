import type { Metadata, Viewport } from "next";
import {
  Atkinson_Hyperlegible,
  Bangers,
  Space_Mono,
} from "next/font/google";
import { IntroLoader } from "./components/intro-loader";
import "./globals.css";

const displayFont = Bangers({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bodyFont = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const monoFont = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const configuredHost =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

function normalizeSiteUrl(value: string) {
  const trimmed = value.trim();
  const absolute = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    return new URL(absolute);
  } catch {
    return new URL("http://localhost:3000");
  }
}

const metadataBase = normalizeSiteUrl(configuredHost);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "$JIMSEM — Half Jimothy. Half Raccoon.",
    template: "%s | $JIMSEM",
  },
  description:
    "JIMSEM is a suspicious Jimothy-faced raccoon cryptid with zero explanations and one very round ticker.",
  applicationName: "JIMSEM",
  keywords: ["JIMSEM", "$JIMSEM", "meme coin", "cartoon", "raccoon"],
  icons: {
    icon: "/assets/logo-cropped.png",
    shortcut: "/assets/logo-cropped.png",
    apple: "/assets/logo-cropped.png",
  },
  openGraph: {
    type: "website",
    siteName: "JIMSEM",
    title: "$JIMSEM — Half Jimothy. Half Raccoon.",
    description:
      "A very serious internet animal. Zero thoughts, one suspicious ticker.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "$JIMSEM — Zero thoughts. One suspicious ticker.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "$JIMSEM — Half Jimothy. Half Raccoon.",
    description:
      "A very serious internet animal. Zero thoughts, one suspicious ticker.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#090a0d",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      suppressHydrationWarning
    >
      <body>
        <IntroLoader />
        {children}
      </body>
    </html>
  );
}
