import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { Navbar } from "@/components";
import { SITE_URL } from "@/constants/sitemap";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Burger Menu",
    template: "%s | Burger Menu",
  },

  description:
    "Browse burgers, view product details, and build your order online.",

  applicationName: "Burger Menu",

  authors: [
    {
      name: "Karla Espinosa",
    },
  ],

  creator: "Karla Espinosa",

  openGraph: {
    type: "website",
    siteName: "Burger Menu",
    title: "Burger Menu",
    description:
      "Browse burgers, view product details, and build your order online.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Burger Menu",
    description:
      "Browse burgers, view product details, and build your order online.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        {children}

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
