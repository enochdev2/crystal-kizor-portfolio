import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Crystal Kizor — Architect, Designer & Founder",
    template: "%s | Crystal Kizor",
  },
  description:
    "Explore Crystal Kizor's work across climate-responsive architecture, design, education, research, speaking and community initiatives.",
  keywords: [
    "Crystal Kizor",
    "architect",
    "architecture",
    "interior design",
    "climate-responsive design",
    "African design",
    "Studio COKA",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Crystal Kizor",
    title: "Crystal Kizor — Architect, Designer & Founder",
    description: "Climate-responsive spaces, products and ideas for better living.",
    images: [
      {
        url: "/images/brand/og-crystal-kizor.jpg",
        width: 1200,
        height: 630,
        alt: "Crystal Kizor — Architect, Designer and Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Crystal Kizor — Architect, Designer & Founder",
    description: "Climate-responsive spaces, products and ideas for better living.",
    images: ["/images/brand/og-crystal-kizor.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={displayFont.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
