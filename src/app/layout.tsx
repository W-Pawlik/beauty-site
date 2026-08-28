import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const headingFont = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Agnieszka Luzarska | Konsultacje pielęgnacyjne i makijaż",
    template: "%s | Agnieszka Luzarska",
  },
  description:
    "Konsultacje pielęgnacyjne, makijażowe i spotkania beauty z Agnieszką Luzarską. Spokojne, praktyczne wsparcie dopasowane do Twoich potrzeb.",
  applicationName: "Agnieszka Luzarska",
  authors: [{ name: "Agnieszka Luzarska" }],
  creator: "Agnieszka Luzarska",
  publisher: "Agnieszka Luzarska",
  keywords: [
    "Agnieszka Luzarska",
    "konsultacje pielęgnacyjne",
    "makijaż",
    "Mary Kay",
    "spotkania beauty",
  ],
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "Agnieszka Luzarska",
    title: "Agnieszka Luzarska | Konsultacje pielęgnacyjne i makijaż",
    description:
      "Spokojne, praktyczne konsultacje pielęgnacyjne, makijażowe i spotkania beauty.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/iconForWebsiteTab.png",
    shortcut: "/images/iconForWebsiteTab.png",
    apple: "/images/iconForWebsiteTab.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#eae2d9",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${headingFont.variable} ${bodyFont.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
