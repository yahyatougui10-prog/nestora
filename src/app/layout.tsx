import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import { CompareBar } from "@/components/property/CompareBar";
import Providers from "@/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NESTORA — Discover Morocco. Stay beautifully.",
  description: "Premium accommodation marketplace for unique riads, desert camps and unforgettable stays across Morocco and beyond.",
  metadataBase: new URL('https://nestora.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="glow-gold absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] opacity-70" />
          <div className="glow-lantern absolute top-[45%] -right-40 w-[720px] h-[720px] opacity-50" />
          <div className="pattern-zellige absolute inset-0 opacity-[0.6]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[760px] h-[420px] border-2 border-navy/10 dark:border-cream/10 rounded-[999px_999px_0_0]" />
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 opacity-40 animate-float-soft">
            <span className="zellige-star text-2xl text-gold/70" />
          </div>
        </div>
        <Providers>
          <Navbar />
          <main className="flex-grow relative z-0">
            {children}
          </main>
          <Footer />
          <MobileBottomNav />
          <CompareBar />
        </Providers>
      </body>
    </html>
  );
}
