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
  title: "Agnieszka Luzarska Mary Kay",
  description: "Landing page for a Mary Kay beauty consultant.",
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
