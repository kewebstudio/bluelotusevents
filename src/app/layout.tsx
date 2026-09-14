import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Montserrat,
  Noto_Sans_Telugu,
  Noto_Serif_Devanagari,
} from "next/font/google";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ScrollToTop from "@/components/ScrollToTop";

import "./globals.css";

/* -------------------------------------------------
   BRAND FONTS
------------------------------------------------- */

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoTelugu = Noto_Sans_Telugu({
  variable: "--font-telugu",
  subsets: ["telugu"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/* -------------------------------------------------
   SEO METADATA
------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bluelotusevents.in"),

  title: {
    default: "Blue Lotus Events & Decors | Hyderabad",
    template: "%s | Blue Lotus Events & Decors",
  },

  description:
    "Blue Lotus Events & Decors creates personalised weddings, private celebrations, home functions and corporate events in Hyderabad with creative concepts, elegant décor and seamless execution.",

  keywords: [
    "Blue Lotus Events",
    "Blue Lotus Events & Decors",
    "event planners Hyderabad",
    "event decorators Hyderabad",
    "wedding decorators Hyderabad",
    "wedding planners Hyderabad",
    "wedding decoration Hyderabad",
    "corporate event planners Hyderabad",
    "corporate event decoration Hyderabad",
    "private event planners Hyderabad",
    "home function decorators Hyderabad",
    "event management Hyderabad",
  ],

  authors: [
    {
      name: "Blue Lotus Events & Decors",
    },
  ],

  creator: "Blue Lotus Events & Decors",

  publisher: "Blue Lotus Events & Decors",

  alternates: {
    canonical: "https://www.bluelotusevents.in",
  },

  /* -------------------------------------------------
     OPEN GRAPH
  ------------------------------------------------- */

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.bluelotusevents.in",
    siteName: "Blue Lotus Events & Decors",

    title: "Blue Lotus Events & Decors | Hyderabad",

    description:
      "Creative concepts. Elegant décor. Seamless celebrations.",

    images: [
      {
        url: "/images/hero/hero.JPG",
        width: 1200,
        height: 630,
        alt: "Blue Lotus Events & Decors",
      },
    ],
  },

  /* -------------------------------------------------
     ROBOTS
  ------------------------------------------------- */

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  /* -------------------------------------------------
     FAVICON / BROWSER TAB ICON
  ------------------------------------------------- */

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

/* -------------------------------------------------
   ROOT LAYOUT
------------------------------------------------- */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={[
        cormorant.variable,
        montserrat.variable,
        notoTelugu.variable,
        notoDevanagari.variable,
      ].join(" ")}
    >
      <body>
        <Navbar />

        <main>{children}</main>

        <FloatingContact />

        <ScrollToTop />

        <Footer />
      </body>
    </html>
  );
}