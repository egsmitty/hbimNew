import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#19355e",
};

export const metadata: Metadata = {
  title: {
    default: "Hope Builders Ministries — Advancing the Gospel in Africa & Asia",
    template: "%s — Hope Builders Ministries",
  },
  description:
    "Hope Builders Ministries equips indigenous leaders with Bibles, training, and resources to advance the Gospel through the Great Commission in Africa and Asia.",
  keywords: ["missions", "Africa", "Asia", "Gospel", "church planting", "pastor training", "nonprofit", "Christian"],
  openGraph: {
    type: "website",
    siteName: "Hope Builders Ministries",
    title: "Hope Builders Ministries — Advancing the Gospel in Africa & Asia",
    description:
      "Equipping indigenous leaders with Bibles, training, and resources to plant churches across Africa and Asia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hope Builders Ministries",
    description: "Advancing the Gospel through the Great Commission in Africa and Asia.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        {/* Skip to main content — accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-white focus:px-4 focus:py-2 focus:rounded font-body text-sm font-semibold"
        >
          Skip to main content
        </a>
        <Nav />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
